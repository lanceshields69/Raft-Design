The Design Intelligence Engine banner pattern — full-bleed, over an animated dither strip. No box, no card radius, no background fill.

```jsx
<CtaBanner heading="Design Intelligence Engine"
  body="Ever wondered if your site is designed or built well?"
  cta="Scan your site" onCta={openScan} />
```

The page must also load `dither-banner.js` once (see `guidelines/motion-shader.html`) or the strip renders as an empty rectangle instead of the moving dither pattern. The heading is Inter Black at 28px — quieter weight than the site's own section titles but still bold, not the old 36px regular-weight green heading this component rendered before the 2026-09 rebuild.
