import * as React from 'react';

/**
 * The floating video-preview panel fixed bottom-right of the home hero
 * (.showreel-launcher). Models the launcher only — see the source comment
 * in ShowreelLauncher.jsx for why the fullscreen playback shell it morphs
 * into on click isn't included as part of this component.
 */
export interface ShowreelLauncherProps {
  /** Looping, muted preview clip shown inside the panel */
  videoSrc?: string;
  /** Pill label text; defaults to "Play showreel" */
  label?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function ShowreelLauncher(props: ShowreelLauncherProps): JSX.Element;
