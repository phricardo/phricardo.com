/**
 * Capability detection for the liquid glass system.
 *
 * The refraction path relies on `backdrop-filter: url(#svg-filter)`, which is
 * only implemented by Chromium-based engines (Chrome, Edge, Opera, Brave,
 * Arc...). Safari parses the syntax (so `CSS.supports` reports true) but does
 * not render SVG filters as backdrop filters, and Firefox does not support it
 * at all. Because feature queries lie in this case, we combine a CSS check
 * with an engine check.
 */

export type GlassMode = "refract" | "frost" | "solid";

type NavigatorUAData = {
  brands?: Array<{ brand: string; version: string }>;
};

const isBrowser = () =>
  typeof window !== "undefined" && typeof navigator !== "undefined";

export const isChromiumEngine = (): boolean => {
  if (!isBrowser()) return false;

  const uaData = (navigator as Navigator & { userAgentData?: NavigatorUAData })
    .userAgentData;

  if (uaData?.brands?.length) {
    return uaData.brands.some(({ brand }) => /Chromium|Google Chrome|Microsoft Edge/i.test(brand));
  }

  const ua = navigator.userAgent;
  // iOS browsers all use WebKit regardless of branding.
  if (/CriOS|FxiOS|EdgiOS|iPhone|iPad/i.test(ua)) return false;
  return /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Firefox\//.test(ua);
};

export const supportsBackdropFilter = (): boolean => {
  if (!isBrowser() || typeof CSS === "undefined" || !CSS.supports) return false;
  return (
    CSS.supports("backdrop-filter", "blur(1px)") ||
    CSS.supports("-webkit-backdrop-filter", "blur(1px)")
  );
};

export const supportsSvgBackdropFilter = (): boolean =>
  supportsBackdropFilter() &&
  CSS.supports("backdrop-filter", "url(#lg) blur(1px)") &&
  isChromiumEngine();

const matches = (query: string): boolean =>
  isBrowser() && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;

export const prefersReducedMotion = () => matches("(prefers-reduced-motion: reduce)");

export const prefersReducedTransparency = () =>
  matches("(prefers-reduced-transparency: reduce)");

/** Best rendering mode the current environment supports. */
export const detectGlassMode = (): GlassMode => {
  if (!supportsBackdropFilter() || prefersReducedTransparency()) return "solid";
  return supportsSvgBackdropFilter() ? "refract" : "frost";
};
