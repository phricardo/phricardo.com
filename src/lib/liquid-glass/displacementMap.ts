/**
 * Generates a displacement map for an SVG `feDisplacementMap` that models a
 * rounded-rectangle slab of glass with a curved (convex) bezel.
 *
 * Encoding (consumed with xChannelSelector="R" yChannelSelector="G"):
 *   R = 128 + dx * 127, G = 128 + dy * 127, where (dx, dy) ∈ [-1, 1]
 *   is the direction/strength the backdrop is sampled from.
 *   B = rim weight (255 at the edge → 0 in the flat centre). The filter uses
 *   it as a mask to keep the refracted rim sharp while the centre is frosted.
 *
 * The centre of the surface is flat (neutral 128/128), so text placed on the
 * glass sits on an undistorted area. Inside the bezel band the backdrop is
 * sampled from further inward, following the edge normal with a circular
 * (lens-like) falloff: the closer to the edge, the stronger the bend. That
 * produces the characteristic magnified, curved rim of real glass.
 */

export type DisplacementMapOptions = {
  /** Element size in CSS pixels. */
  width: number;
  height: number;
  /** Corner radius in CSS pixels (clamped to half the shortest side). */
  radius: number;
  /** Width of the curved bezel band in CSS pixels. */
  bezel: number;
  /** Max map resolution per axis; larger surfaces are sampled more coarsely. */
  maxResolution?: number;
};

const cache = new Map<string, string>();
const MAX_CACHE_ENTRIES = 64;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const createDisplacementMap = ({
  width,
  height,
  radius,
  bezel,
  maxResolution = 320,
}: DisplacementMapOptions): string | null => {
  if (typeof document === "undefined") return null;

  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const r = clamp(radius, 0, Math.min(w, h) / 2);
  const band = clamp(bezel, 1, Math.min(w, h) / 2);

  const key = `${w}x${h}:${r.toFixed(1)}:${band.toFixed(1)}:${maxResolution}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const mapW = Math.min(w, maxResolution);
  const mapH = Math.min(h, maxResolution);

  const canvas = document.createElement("canvas");
  canvas.width = mapW;
  canvas.height = mapH;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const image = ctx.createImageData(mapW, mapH);
  const data = image.data;

  const halfW = w / 2;
  const halfH = h / 2;
  const innerW = halfW - r;
  const innerH = halfH - r;

  for (let j = 0; j < mapH; j++) {
    // Map pixel centre back into element space so normals stay correct even
    // when the map is scaled non-uniformly.
    const py = ((j + 0.5) / mapH) * h - halfH;

    for (let i = 0; i < mapW; i++) {
      const px = ((i + 0.5) / mapW) * w - halfW;
      const index = (j * mapW + i) * 4;

      // Signed distance to a rounded rectangle (negative inside).
      const qx = Math.abs(px) - innerW;
      const qy = Math.abs(py) - innerH;
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outside = Math.hypot(ox, oy);
      const sd = outside + Math.min(Math.max(qx, qy), 0) - r;

      let dx = 0;
      let dy = 0;
      let rim = 0;

      if (sd <= 0) {
        const depth = -sd; // distance from the edge, inward
        if (depth < band) {
          // Outward normal of the rounded rect at this point.
          let nx: number;
          let ny: number;
          if (qx > 0 && qy > 0) {
            nx = ox / (outside || 1);
            ny = oy / (outside || 1);
          } else if (qx > qy) {
            nx = 1;
            ny = 0;
          } else {
            nx = 0;
            ny = 1;
          }
          nx *= Math.sign(px) || 1;
          ny *= Math.sign(py) || 1;

          // Circular lens profile: 1 at the rim, 0 where the bezel meets the
          // flat centre, with a smooth tangent into the flat area.
          const t = 1 - depth / band; // 1 at edge → 0 at inner bezel
          const strength = 1 - Math.sqrt(1 - t * t);

          // Sample inward (negative normal) → magnified, bent rim.
          dx = -nx * strength;
          dy = -ny * strength;
          // Smoothstep so the sharp rim fades softly into the frosted centre.
          rim = t * t * (3 - 2 * t);
        }
      }

      data[index] = Math.round(128 + dx * 127);
      data[index + 1] = Math.round(128 + dy * 127);
      data[index + 2] = Math.round(rim * 255);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const url = canvas.toDataURL("image/png");

  if (cache.size >= MAX_CACHE_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(key, url);

  return url;
};
