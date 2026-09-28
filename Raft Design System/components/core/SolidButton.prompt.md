The one solid, always-filled button in the system — used for the single highest-commitment CTA on a page (the site's only instance is "Book a consultation" on the closing Connect panel). Everything else uses `Button`.

```jsx
<SolidButton onClick={openCalendly}>Book a consultation</SolidButton>
```

Colors are `--pure-white`/`--pure-black`, not `--bg-canvas`/`--text-primary` — this is a deliberate true black/white inversion, the one place in the system that isn't built from the off-white/near-black palette. Reach for `Button` first; only use this when the source specifically calls for the solid-invert treatment.
