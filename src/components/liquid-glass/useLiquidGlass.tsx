import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createDisplacementMap } from "@/lib/liquid-glass/displacementMap";
import {
  detectGlassMode,
  prefersReducedMotion,
  type GlassMode,
} from "@/lib/liquid-glass/support";

export type LiquidGlassVariant =
  | "card"
  | "panel"
  | "button"
  | "nav"
  | "overlay"
  | "background";

export type LiquidGlassOptions = {
  /** Preset of CSS custom properties. Defaults to "panel". */
  variant?: LiquidGlassVariant;
  /** Corner radius (number = px). Maps to `--lg-radius`. */
  radius?: number | string;
  /** Any CSS color used to tint the glass. Maps to `--lg-tint`. */
  tint?: string;
  /** Backdrop blur in px. Maps to `--lg-blur`. */
  blur?: number;
  /** Max refraction offset at the rim, in px. Maps to `--lg-refraction`. */
  refraction?: number;
  /** Width of the curved bezel in px. Maps to `--lg-bezel`. */
  bezel?: number;
  /** RGB split as a fraction of the refraction (0–1). Maps to `--lg-chroma`. */
  chromaticAberration?: number;
  /** Specular highlight intensity (0–1). Maps to `--lg-highlight`. */
  highlight?: number;
  /** Backdrop saturation multiplier. Maps to `--lg-saturate`. */
  saturation?: number;
  /** Specular highlight follows the pointer (disabled for reduced motion). */
  interactive?: boolean;
  /** Set to false to force the frosted fallback (e.g. many tiny elements). */
  refract?: boolean;
};

type FilterGeometry = {
  width: number;
  height: number;
  scale: number;
  chroma: number;
  blur: number;
  map: string;
};

const toLength = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

const readNumber = (style: CSSStyleDeclaration, name: string, fallback: number) => {
  const parsed = parseFloat(style.getPropertyValue(name));
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sameGeometry = (a: FilterGeometry | null, b: FilterGeometry | null) =>
  !!a &&
  !!b &&
  a.width === b.width &&
  a.height === b.height &&
  a.scale === b.scale &&
  a.chroma === b.chroma &&
  a.blur === b.blur &&
  a.map === b.map;

const useGlassMode = (allowRefraction: boolean): GlassMode => {
  const [mode, setMode] = useState<GlassMode>(() => detectGlassMode());

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(prefers-reduced-transparency: reduce)");
    const update = () => setMode(detectGlassMode());
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return mode === "refract" && !allowRefraction ? "frost" : mode;
};

/**
 * Applies the liquid glass system to any element.
 *
 * Spread `className` and `style` on the host, attach `ref`, and render
 * `layer` as a child. The host carries the tint + backdrop-filter; the layer
 * adds the rim light and the SVG filter definition behind the host's content
 * (z-index: -1 inside the host's stacking context). Children are never
 * filtered, so they stay sharp and interactive.
 */
export const useLiquidGlass = <T extends HTMLElement = HTMLElement>(
  options: LiquidGlassOptions = {}
) => {
  const {
    variant = "panel",
    radius,
    tint,
    blur,
    refraction,
    bezel,
    chromaticAberration,
    highlight,
    saturation,
    interactive = false,
    refract = true,
  } = options;

  const mode = useGlassMode(refract);
  const rawId = useId();
  const filterId = `lg-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [node, setNode] = useState<T | null>(null);
  const [geometry, setGeometry] = useState<FilterGeometry | null>(null);
  const geometryRef = useRef<FilterGeometry | null>(null);

  const ref = useCallback((element: T | null) => setNode(element), []);

  // Measure the host and (re)build the displacement map when it resizes or
  // when the CSS custom properties that drive the filter change.
  useEffect(() => {
    if (!node || mode !== "refract") {
      geometryRef.current = null;
      setGeometry(null);
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      // offsetWidth/Height ignore transforms (dialog zoom animations etc.).
      const width = node.offsetWidth;
      const height = node.offsetHeight;
      if (width < 2 || height < 2) return;

      const style = getComputedStyle(node);
      const radiusRaw = style.borderTopLeftRadius;
      const radiusPx = radiusRaw.endsWith("%")
        ? (parseFloat(radiusRaw) / 100) * Math.min(width, height)
        : parseFloat(radiusRaw) || 0;

      const strength = readNumber(style, "--lg-refraction", 14);
      const bezelPx = readNumber(style, "--lg-bezel", 18);
      const chroma = readNumber(style, "--lg-chroma", 0.2);
      const blurPx = readNumber(style, "--lg-blur", 6);

      const map = createDisplacementMap({
        width,
        height,
        radius: radiusPx,
        bezel: Math.min(bezelPx, Math.min(width, height) / 2),
      });
      if (!map) return;

      const next: FilterGeometry = {
        width: Math.round(width),
        height: Math.round(height),
        // feDisplacementMap offsets by scale * (C - 0.5) → max = scale / 2.
        scale: strength * 2,
        chroma,
        blur: blurPx,
        map,
      };

      if (!sameGeometry(geometryRef.current, next)) {
        geometryRef.current = next;
        setGeometry(next);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [node, mode, radius, refraction, bezel, chromaticAberration, blur, variant]);

  // Pointer-following specular highlight.
  useEffect(() => {
    if (!node || !interactive || prefersReducedMotion()) return;

    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!lastEvent) return;
      const rect = node.getBoundingClientRect();
      const x = ((lastEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((lastEvent.clientY - rect.top) / rect.height) * 100;
      node.style.setProperty("--lg-px", `${x.toFixed(1)}%`);
      node.style.setProperty("--lg-py", `${y.toFixed(1)}%`);
    };

    const onMove = (event: PointerEvent) => {
      lastEvent = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      lastEvent = null;
      node.style.removeProperty("--lg-px");
      node.style.removeProperty("--lg-py");
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [node, interactive]);

  const activeMode: GlassMode =
    mode === "refract" && !geometry ? "frost" : mode;

  const style = useMemo(() => {
    const vars: Record<string, string> = {};
    const set = (name: string, value: string | number | undefined) => {
      if (value !== undefined && value !== "") vars[name] = String(value);
    };
    set("--lg-radius", toLength(radius));
    set("--lg-tint", tint);
    set("--lg-blur", blur !== undefined ? `${blur}px` : undefined);
    set("--lg-refraction", refraction);
    set("--lg-bezel", bezel !== undefined ? `${bezel}px` : undefined);
    set("--lg-chroma", chromaticAberration);
    set("--lg-highlight", highlight);
    set("--lg-saturate", saturation);
    if (activeMode === "refract") set("--lg-filter", `url(#${filterId})`);
    return vars as CSSProperties;
  }, [radius, tint, blur, refraction, bezel, chromaticAberration, highlight, saturation, activeMode, filterId]);

  const className = `lg lg--${variant}${interactive ? " lg--interactive" : ""}`;

  let filter: ReactNode = null;
  if (activeMode === "refract" && geometry) {
    const { width, height, scale, chroma, blur: blurPx, map } = geometry;
    const channels = [
      { key: "r", scale: scale * (1 + chroma), matrix: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" },
      { key: "g", scale, matrix: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" },
      { key: "b", scale: scale * (1 - chroma), matrix: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" },
    ];

    filter = (
      <svg className="lg__defs" aria-hidden="true" focusable="false" width="0" height="0">
        <filter
          id={filterId}
          x="0"
          y="0"
          width={width}
          height={height}
          filterUnits="userSpaceOnUse"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          {/* Frosted centre. */}
          <feGaussianBlur in="SourceGraphic" stdDeviation={blurPx} edgeMode="duplicate" result="soft" />
          <feImage
            href={map}
            x="0"
            y="0"
            width={width}
            height={height}
            preserveAspectRatio="none"
            result="map"
          />
          {/* Refracted rim: one displacement per channel → RGB separation. */}
          {channels.map((channel) => (
            <feDisplacementMap
              key={`d-${channel.key}`}
              in="SourceGraphic"
              in2="map"
              scale={channel.scale}
              xChannelSelector="R"
              yChannelSelector="G"
              result={`d-${channel.key}`}
            />
          ))}
          {channels.map((channel) => (
            <feColorMatrix
              key={`c-${channel.key}`}
              in={`d-${channel.key}`}
              type="matrix"
              values={channel.matrix}
              result={`c-${channel.key}`}
            />
          ))}
          <feBlend in="c-r" in2="c-g" mode="screen" result="rg" />
          <feBlend in="rg" in2="c-b" mode="screen" result="refracted" />
          {/* Blue channel of the map = rim weight → alpha mask. */}
          <feColorMatrix
            in="map"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0"
            result="rimMask"
          />
          <feComposite in="refracted" in2="rimMask" operator="in" result="rim" />
          <feComposite in="rim" in2="soft" operator="over" />
        </filter>
      </svg>
    );
  }

  const layer = (
    <>
      <span className="lg__edge" aria-hidden="true" />
      {filter}
    </>
  );

  return {
    ref,
    className,
    style,
    layer,
    mode: activeMode,
    /** Convenience bag: `<div {...glass.hostProps}>…{glass.layer}</div>` */
    hostProps: { ref, className, style, "data-lg-mode": activeMode },
  };
};
