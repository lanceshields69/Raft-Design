Theme switch. Dark is the default; the site persists the choice in `localStorage['raft-theme']` and sets `data-theme="light"` on `<html>`.

```jsx
<ThemeToggle theme={theme} onToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
```
