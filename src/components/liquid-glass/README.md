# Liquid Glass

Reusable glass surface with **real optical refraction** (SVG displacement) and
restrained **chromatic aberration** on curved edges. Works with arbitrary
content: cards, panels, buttons, navigation, overlays and background sections.

```
src/lib/liquid-glass/displacementMap.ts   rounded-rect lens map generator (canvas → PNG, cached)
src/lib/liquid-glass/support.ts           capability + preference detection
src/components/liquid-glass/useLiquidGlass.tsx   hook: measurement, SVG filter, observers
src/components/liquid-glass/LiquidGlass.tsx      polymorphic wrapper component
src/components/liquid-glass/liquid-glass.css     surface, rim light, variants, fallbacks
```

## How it works

1. `createDisplacementMap` renders a map sized to the element: the centre is
   neutral (flat glass, so text sits on an undistorted area), and inside the
   bezel band the backdrop is sampled further inward along the edge normal
   with a circular lens profile. R/G hold the displacement, B holds a rim
   weight.
2. The hook builds a per-instance SVG `<filter>`:
   - three `feDisplacementMap` passes (scale `s·(1+c)`, `s`, `s·(1−c)`), each
     isolated to one colour channel and recombined with `screen` blending, so
     RGB separation is proportional to the bend: zero in the flat centre,
     strongest at the curved rim;
   - a blurred copy of the backdrop for the frosted centre;
   - the blue channel turned into a mask that keeps the rim sharp and lets the
     centre stay frosted.
3. The host gets `backdrop-filter: url(#filter) saturate() brightness()` plus a
   translucent tint. A `ResizeObserver` (rAF-throttled) regenerates the map when
   the element resizes. Observers, frames and listeners are cleaned up on unmount.

Children are never filtered. They render above the glass and stay sharp,
readable and interactive.

## Browser support and limitations

| Engine | Mode | What you get |
| --- | --- | --- |
| Chromium (Chrome, Edge, Opera, Brave, Arc) | `refract` | Refraction + RGB split + frost |
| Firefox, Safari / iOS | `frost` | CSS `blur()` + `saturate()` + tint + rim light. **No optical distortion.** |
| No `backdrop-filter`, or `prefers-reduced-transparency` | `solid` | Opaque `--lg-solid` surface + rim light |

- `backdrop-filter: url(#svg)` is only implemented by Chromium. Safari parses
  it but doesn't render it, so detection also checks the engine. The frosted
  fallback is a blur, not refraction, and isn't presented as one.
- The filter samples real DOM in Chromium, so any content behind the glass
  gets bent (text, images, the ambient background). Content that is flat
  (a solid colour) has nothing visible to refract; that is why the site uses
  `AmbientBackground` (soft glows + faint grid).
- An ancestor with `opacity < 1`, `filter`, `mask`, `clip-path`,
  `mix-blend-mode` or its own `backdrop-filter` becomes the *backdrop root*,
  and the glass can only see content inside it. Entrance animations that fade
  opacity show a plain tint until they finish.
- Each refracting surface costs a filter pass when it repaints. For many tiny
  elements, pass `refract={false}` to use the frosted path.
- The `forced-colors` mode swaps the effect for a plain system border.

The resolved mode is exposed as `data-lg-mode` on the host.

## API

### `<LiquidGlass>`

```tsx
<LiquidGlass
  as="section"            // any element or component: "button", "a", Card, motion.div…
  variant="card"          // card | panel | button | nav | overlay | background
  radius={16}             // --lg-radius
  tint="rgb(10 10 10 / .6)" // --lg-tint
  blur={4}                // --lg-blur (px)
  refraction={24}         // --lg-refraction (max rim offset, px)
  bezel={20}              // --lg-bezel (rim width, px)
  chromaticAberration={0.3} // --lg-chroma (fraction of refraction)
  highlight={1}           // --lg-highlight
  saturation={1.4}        // --lg-saturate
  interactive             // specular highlight follows the pointer (off for reduced motion)
  refract={false}         // force the frosted path
/>
```

All other props (`className`, `onClick`, `href`, motion props…) are forwarded.

### `useLiquidGlass(options)`

For elements you can't wrap (Radix portals, third-party components):

```tsx
const glass = useLiquidGlass<HTMLDivElement>({ variant: "panel" });

<DropdownMenuContent
  ref={glass.ref}
  data-lg-mode={glass.mode}
  style={glass.style}
  className={`${glass.className} my-menu`}
>
  …items
  {glass.layer}
</DropdownMenuContent>
```

### CSS custom properties

Override them anywhere (CSS module, inline style). The defaults use `:where()`,
so any class beats them:

| Property | Meaning |
| --- | --- |
| `--lg-radius` | corner radius |
| `--lg-tint` | translucent surface colour (main readability knob) |
| `--lg-blur` | frost amount (centre only in refract mode) |
| `--lg-saturate`, `--lg-brightness` | backdrop colour response |
| `--lg-refraction` | max rim displacement (unitless px) |
| `--lg-bezel` | width of the curved rim |
| `--lg-chroma` | RGB split as a fraction of refraction (0–1) |
| `--lg-highlight` | rim light / specular intensity |
| `--lg-shadow` | outer depth shadow |
| `--lg-solid` | opaque fallback colour |

Changes to the filter-driving properties (`--lg-refraction`, `--lg-bezel`,
`--lg-chroma`, `--lg-blur`) are read when the element is measured (mount and
resize, or when the matching prop changes).

## Examples

**Card**

```tsx
<LiquidGlass variant="card" interactive className="p-6">
  <h3>Title</h3>
  <p>Any content stays sharp and selectable.</p>
</LiquidGlass>
```

**Button / link**

```tsx
<LiquidGlass as="button" type="button" variant="button" onClick={save} className="h-10 px-4">
  Save
</LiquidGlass>

<LiquidGlass as="a" href="/docs" variant="button" refract={false} className="px-3 py-2">
  Docs
</LiquidGlass>
```

**Navigation bar**

```tsx
<LiquidGlass as="header" variant="nav" className="fixed inset-x-0 top-0 z-50">
  <nav>…</nav>
</LiquidGlass>
```

**Overlay / dialog** (hook on a Radix component)

```tsx
const glass = useLiquidGlass<HTMLDivElement>({ variant: "overlay" });

<DialogContent ref={glass.ref} data-lg-mode={glass.mode} style={glass.style} className={glass.className}>
  …
  {glass.layer}
</DialogContent>
```

**Background section**: a large slab of glass over page content or imagery

```tsx
<LiquidGlass
  as="section"
  variant="background"
  refraction={40}
  bezel={56}
  className="mx-auto my-16 max-w-5xl px-8 py-16"
>
  <h2>Featured</h2>
  <p>The wide rim bends whatever scrolls behind the section.</p>
</LiquidGlass>
```

**Motion component**

```tsx
<LiquidGlass as={motion.div} variant="card" initial={{ y: 12 }} animate={{ y: 0 }}>
  …
</LiquidGlass>
```
