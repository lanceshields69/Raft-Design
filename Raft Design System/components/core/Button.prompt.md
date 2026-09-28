The pill-outline button style in the Raft system — use it for every CTA, primary or not, except the light-mode-inverted solid button (use `SolidButton`).

```jsx
<Button href="/work/">View all projects</Button>
<Button wide onClick={openModal}>Scan your site</Button>
<Button arrow={false} type="submit">Send message</Button>
<Button arrowRotate={90} onClick={scrollToNext}>Explore</Button>
```

There is no secondary/ghost variant in the source. For a quieter action use `TextLink`. `wide` is the banner/hero size; disabled drops opacity to 0.4. `arrowRotate={90}` reproduces the hero's "scroll down" CTA — a rotated arrow on this same shell, not a different component.
