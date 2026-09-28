Client logo marquee under the hero lockup.

```jsx
<ClientLogoMarquee theme={theme} />
```

Needs a `@keyframes raft-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }` rule on the page. The logos are white PNGs for dark mode; pass `theme="light"` to swap to the black set. Honor `prefers-reduced-motion` by disabling the animation.
