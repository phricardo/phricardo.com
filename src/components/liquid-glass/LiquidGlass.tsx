import {
  forwardRef,
  useCallback,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ForwardedRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "@/lib/utils";
import { useLiquidGlass, type LiquidGlassOptions } from "./useLiquidGlass";

export type LiquidGlassProps<C extends ElementType = "div"> = LiquidGlassOptions & {
  /** Element or component to render (div, section, button, a, Card, motion.div...). */
  as?: C;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<C>, keyof LiquidGlassOptions | "as" | "className" | "style" | "children">;

type InternalProps = LiquidGlassOptions & {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
} & Record<string, unknown>;

const assignRef = <T,>(ref: ForwardedRef<T>, value: T | null) => {
  if (typeof ref === "function") ref(value);
  else if (ref) ref.current = value;
};

/**
 * Wraps arbitrary content in a liquid glass surface.
 *
 * @example
 * <LiquidGlass variant="card" className="p-6">Content</LiquidGlass>
 * <LiquidGlass as="button" variant="button" type="button">Click</LiquidGlass>
 * <LiquidGlass as="section" variant="background" refraction={28}>…</LiquidGlass>
 */
const LiquidGlassImpl = (
  {
    as: Component = "div",
    variant,
    radius,
    tint,
    blur,
    refraction,
    bezel,
    chromaticAberration,
    highlight,
    saturation,
    interactive,
    refract,
    className,
    style,
    children,
    ...rest
  }: InternalProps,
  forwardedRef: ForwardedRef<HTMLElement>
) => {
  const glass = useLiquidGlass<HTMLElement>({
    variant,
    radius,
    tint,
    blur,
    refraction,
    bezel,
    chromaticAberration,
    highlight,
    saturation,
    interactive,
    refract,
  });

  const { ref: glassRef } = glass;
  const ref = useCallback(
    (element: HTMLElement | null) => {
      glassRef(element);
      assignRef(forwardedRef, element);
    },
    [glassRef, forwardedRef]
  );

  return (
    <Component
      {...rest}
      ref={ref}
      data-lg-mode={glass.mode}
      className={cn(glass.className, className)}
      style={{ ...glass.style, ...style }}
    >
      {children}
      {glass.layer}
    </Component>
  );
};

const ForwardedLiquidGlass = forwardRef(LiquidGlassImpl);
ForwardedLiquidGlass.displayName = "LiquidGlass";

export const LiquidGlass = ForwardedLiquidGlass as unknown as <C extends ElementType = "div">(
  props: LiquidGlassProps<C> & { ref?: Ref<HTMLElement> }
) => ReactElement | null;

export default LiquidGlass;
