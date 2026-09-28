A fixed, floating video-preview panel — the source's one instance sits bottom-right of the home hero and morphs into a fullscreen player on click.

```jsx
<ShowreelLauncher videoSrc="/media/showreel-preview.mp4" onClick={openFullscreenPlayer} />
```

This models the launcher panel only, not the fullscreen player it opens into. The source's fullscreen shell (position/size morph, play/pause, mute, scrub bar, close) is bespoke behavior built for this one video, not a reusable pattern — build that part to fit your own player, not by generalizing this component. `onClick` is where that behavior would start.
