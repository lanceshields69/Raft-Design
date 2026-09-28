Site footer. The RAFT/DESIGN lockup is the one place Inter appears at weights 200/300 — everywhere else headings are 900.

```jsx
<SiteFooter />
```

The colophon ("Designed by hand. Built by AI.") is followed by a blinking cursor and the Anthropic / OpenAI / Lovable marks from `assets/`.

When the page isn't at the project root, pass `assetBase` so the colophon marks resolve: `<SiteFooter assetBase="../../assets/" />`.
