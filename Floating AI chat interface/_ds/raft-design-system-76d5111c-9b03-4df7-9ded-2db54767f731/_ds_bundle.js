/* @ds-bundle: {"format":4,"namespace":"RaftDesignSystem_76d511","components":[{"name":"FaqItem","sourcePath":"components/content/FaqItem.jsx"},{"name":"GraveyardRow","sourcePath":"components/content/GraveyardRow.jsx"},{"name":"JournalCard","sourcePath":"components/content/JournalCard.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"ToolCard","sourcePath":"components/content/ToolCard.jsx"},{"name":"WorkCard","sourcePath":"components/content/WorkCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"SectionLabel","sourcePath":"components/core/SectionLabel.jsx"},{"name":"StatValue","sourcePath":"components/core/StatValue.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"TextLink","sourcePath":"components/core/TextLink.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"ClientLogoMarquee","sourcePath":"components/marketing/ClientLogoMarquee.jsx"},{"name":"CommunityStrip","sourcePath":"components/marketing/CommunityStrip.jsx"},{"name":"CtaBanner","sourcePath":"components/marketing/CtaBanner.jsx"},{"name":"LogoBlock","sourcePath":"components/marketing/LogoBlock.jsx"},{"name":"PageHero","sourcePath":"components/marketing/PageHero.jsx"},{"name":"NavHeader","sourcePath":"components/navigation/NavHeader.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"ThemeToggle","sourcePath":"components/navigation/ThemeToggle.jsx"}],"sourceHashes":{"components/content/FaqItem.jsx":"9ea55ef01046","components/content/GraveyardRow.jsx":"f803f9d81fa0","components/content/JournalCard.jsx":"b10b523fa3bf","components/content/ServiceCard.jsx":"459009a21287","components/content/ToolCard.jsx":"43367941c195","components/content/WorkCard.jsx":"3317ad5786ec","components/core/Button.jsx":"a9e0348bf21d","components/core/Card.jsx":"90365e7cd370","components/core/Eyebrow.jsx":"d48ae7c5158a","components/core/SectionLabel.jsx":"07715ac9879d","components/core/StatValue.jsx":"1a6aec7b2a92","components/core/StatusBadge.jsx":"7b57d88daa4b","components/core/Tag.jsx":"f35ccb5e2284","components/core/TextLink.jsx":"e28552c0f6d2","components/forms/TextField.jsx":"4db0141592ff","components/marketing/ClientLogoMarquee.jsx":"e9b7d1198535","components/marketing/CommunityStrip.jsx":"774d1fbf7139","components/marketing/CtaBanner.jsx":"5d7e07044eda","components/marketing/LogoBlock.jsx":"4184d799372c","components/marketing/PageHero.jsx":"9c0027d49d9c","components/navigation/NavHeader.jsx":"122980f00abe","components/navigation/SiteFooter.jsx":"348549a53d97","components/navigation/ThemeToggle.jsx":"310ff6df90e1","ui_kits/website/ContactModal.jsx":"6facf7b33902","ui_kits/website/Home.jsx":"253df1da5a28","ui_kits/website/JournalIndex.jsx":"af3b453c4b4f","ui_kits/website/ProjectsIndex.jsx":"41893197910e","ui_kits/website/ToolsPage.jsx":"0147d7680540"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RaftDesignSystem_76d511 = window.RaftDesignSystem_76d511 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/FaqItem.jsx
try { (() => {
/* .faq-item — always-open question/answer pair (no accordion in the source). */
function FaqItem({
  question,
  answer,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      flex: '1 0 0',
      minWidth: 0,
      ...style
    }
  }, [React.createElement('p', {
    key: 'q',
    style: {
      fontSize: 'var(--font-size-heading-2)',
      lineHeight: 1,
      color: 'var(--text-primary)',
      fontWeight: 'var(--weight-regular)'
    }
  }, question), React.createElement('p', {
    key: 'a',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 1.5,
      color: 'var(--text-primary)'
    }
  }, answer)]);
}
Object.assign(__ds_scope, { FaqItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/FaqItem.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
/* .service-card — Expertise/Build section card: title, body, green arrow tag line.
   No border, no fill; it's a text block on the canvas. */
function ServiceCard({
  title,
  body,
  tagline,
  width = 480,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 13,
      width,
      maxWidth: '100%',
      ...style
    }
  }, [React.createElement('p', {
    key: 't',
    style: {
      fontSize: 'var(--font-size-heading-2)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 0.95,
      color: 'var(--text-primary)'
    }
  }, title), React.createElement('p', {
    key: 'b',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 1.4,
      color: 'var(--text-primary)'
    }
  }, body), tagline ? React.createElement('p', {
    key: 'g',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 1.4,
      fontWeight: 'var(--weight-semibold)',
      color: 'var(--text-accent)'
    }
  }, '\u2192 ' + tagline) : null]);
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/WorkCard.jsx
try { (() => {
/* .work-card — Projects index card: 2000x1307 image, square corners, 28px title. */
function WorkCard({
  image,
  title,
  href = '#',
  alt = '',
  style
}) {
  return React.createElement('a', {
    href,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      flex: '1 0 0',
      minWidth: 0,
      textDecoration: 'none',
      color: 'inherit',
      ...style
    }
  }, [React.createElement('img', {
    key: 'i',
    src: image,
    alt,
    style: {
      width: '100%',
      height: 'auto',
      aspectRatio: '2000 / 1307',
      objectFit: 'cover',
      display: 'block'
    }
  }), React.createElement('p', {
    key: 't',
    style: {
      fontSize: 'var(--font-size-heading-2)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 'var(--line-height-heading-large)',
      letterSpacing: 0,
      color: 'var(--text-primary)'
    }
  }, title)]);
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/WorkCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const {
  useState
} = React;
/* .scan-cta — the one button in the system. Pill, 20px/30px padding,
   transparent with a brand border; inverts to a solid brand-green fill with
   ink text on hover. --wide swaps the horizontal padding to 60px. */
function Button({
  children,
  wide = false,
  arrow = true,
  href,
  onClick,
  type = 'button',
  disabled = false,
  style
}) {
  const [hover, setHover] = useState(false);
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    flexShrink: 0,
    padding: wide ? '20px var(--space-xxxl)' : '20px 30px',
    border: '1px solid var(--border-button)',
    borderRadius: 'var(--radius-pill)',
    background: hover && !disabled ? 'var(--bg-brand)' : 'none',
    color: hover && !disabled ? 'var(--accent-ink)' : 'var(--text-primary)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-body-lg)',
    lineHeight: 'var(--line-height-heading)',
    fontWeight: 'var(--weight-regular)',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background .2s, color .2s',
    textDecoration: 'none',
    ...style
  };
  const inner = [arrow ? React.createElement('span', {
    key: 'a',
    style: {
      fontWeight: 'var(--weight-bold)'
    }
  }, '\u2192') : null, children];
  if (href) return React.createElement('a', {
    href,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, inner);
  return React.createElement('button', {
    type,
    onClick,
    disabled,
    style: base,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false)
  }, inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
/* Card — elevated background, 1px rule border, md radius, lg padding.
   'sunken' is the recessed banner treatment (darker fill, bright border). */
function Card({
  children,
  tone = 'elevated',
  padding = 'var(--space-lg)',
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      padding,
      background: tone === 'sunken' ? 'var(--bg-sunken)' : tone === 'canvas' ? 'var(--bg-canvas)' : 'var(--bg-elevated)',
      border: '1px solid ' + (tone === 'sunken' ? 'var(--border-bright)' : 'var(--border-rule)'),
      borderRadius: tone === 'sunken' ? 0 : 'var(--radius-md)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/* .article-eyebrow / .project-section-label — flat uppercase field label,
   no pill. Uses --tracking-section-title (1px), not the eyebrow's 0.52px. */
function Eyebrow({
  children,
  tone = 'muted',
  style
}) {
  return React.createElement('p', {
    style: {
      fontSize: 'var(--font-size-eyebrow)',
      fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-section-title)',
      lineHeight: 'var(--line-height-eyebrow)',
      textTransform: 'uppercase',
      color: tone === 'accent' ? 'var(--text-accent)' : tone === 'primary' ? 'var(--text-primary)' : 'var(--text-muted)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionLabel.jsx
try { (() => {
/* .section-label — the brand-green eyebrow pill that opens every section
   (Approach, Expertise, Projects, Studio, FAQs, Active, Graveyard). */
function SectionLabel({
  children,
  style
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-block',
      alignSelf: 'flex-start',
      fontSize: 'var(--font-size-eyebrow)',
      fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-eyebrow)',
      lineHeight: 'var(--line-height-eyebrow)',
      textTransform: 'uppercase',
      background: 'var(--bg-brand)',
      color: 'var(--accent-ink)',
      padding: '5px 20px',
      borderRadius: 'var(--radius-sm)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/StatValue.jsx
try { (() => {
/* .stat-bar-value / .project-metric-value / .stat-number — Fraunces SemiBold,
   brand green, SOFT 0 / WONK 1. One shared spec, three sizes in use. */
const SIZES = {
  sm: ['var(--font-size-heading-1)', 'var(--line-height-heading-large)', '-0.4px'],
  lg: ['105px', 0.9, '-0.03em']
};
function StatValue({
  value,
  label,
  size = 'sm',
  italic = false,
  style
}) {
  const [fs, lh, ls] = SIZES[size] || SIZES.sm;
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: size === 'lg' ? '17px' : 'var(--space-6)',
      ...style
    }
  }, [React.createElement('p', {
    key: 'v',
    style: {
      fontFamily: 'var(--font-emphasis)',
      fontStyle: italic ? 'italic' : 'normal',
      fontWeight: 'var(--weight-semibold)',
      fontVariationSettings: "'SOFT' 0, 'WONK' 1",
      fontSize: fs,
      lineHeight: lh,
      letterSpacing: ls,
      color: 'var(--text-accent)'
    }
  }, value), label ? React.createElement('p', {
    key: 'l',
    style: {
      fontSize: 'var(--font-size-body-md)',
      fontWeight: size === 'lg' ? 'var(--weight-regular)' : 'var(--weight-semibold)',
      lineHeight: size === 'lg' ? 1.1 : 'var(--line-height-body)',
      letterSpacing: size === 'lg' ? '-0.48px' : 0,
      color: 'var(--text-muted)'
    }
  }, label) : null]);
}
Object.assign(__ds_scope, { StatValue });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatValue.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusBadge.jsx
try { (() => {
/* .status-badge — pill, dot + label, five color-coded variants. */
const MAP = {
  stack: ['--status-stack', '--status-stack-bg', '--status-stack-border'],
  rotation: ['--status-rotation', '--status-rotation-bg', '--status-rotation-border'],
  watching: ['--status-watching', '--status-watching-bg', '--status-watching-border'],
  overhyped: ['--status-overhyped', '--status-overhyped-bg', '--status-overhyped-border'],
  dropped: ['--status-dropped', '--status-dropped-bg', '--status-dropped-border']
};
function StatusBadge({
  status = 'stack',
  children,
  style
}) {
  const [dot, bg, border] = MAP[status] || MAP.stack;
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-6)',
      flexShrink: 0,
      padding: 'var(--space-xs) var(--space-12)',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid var(--' + border.slice(2) + ')',
      background: 'var(' + bg + ')',
      fontSize: 'var(--font-size-label-medium)',
      fontWeight: 'var(--weight-medium)',
      lineHeight: 'var(--line-height-label)',
      whiteSpace: 'nowrap',
      color: status === 'dropped' ? 'var(--status-dropped)' : 'var(--text-primary)',
      ...style
    }
  }, [React.createElement('span', {
    key: 'd',
    style: {
      flexShrink: 0,
      width: 'var(--space-6)',
      height: 'var(--space-6)',
      borderRadius: '50%',
      background: 'var(' + dot + ')'
    }
  }), children]);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/content/GraveyardRow.jsx
try { (() => {
/* .graveyard-row — dropped-tool list row inside a bordered list container. */
function GraveyardRow({
  name,
  note,
  status = 'dropped',
  statusLabel = 'dropped',
  tinted = false,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 'var(--space-12)',
      padding: 'var(--space-lg)',
      borderBottom: '1px solid var(--border-rule)',
      background: tinted ? 'rgb(from var(--bg-elevated) r g b / 40%)' : 'transparent',
      ...style
    }
  }, [React.createElement('div', {
    key: 'h',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-12)',
      flex: '0 0 260px'
    }
  }, [React.createElement(__ds_scope.StatusBadge, {
    key: 's',
    status
  }, statusLabel), React.createElement('p', {
    key: 'n',
    style: {
      fontSize: 'var(--font-size-body-md)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1.5,
      color: 'var(--text-primary)'
    }
  }, name)]), React.createElement('p', {
    key: 'no',
    style: {
      flex: '1 1 320px',
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body)',
      color: 'var(--text-muted)'
    }
  }, note)]);
}
Object.assign(__ds_scope, { GraveyardRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/GraveyardRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
/* .tool-card-tag — category tag: surface fill, rule border, sm radius,
   11px/900 uppercase accent text. */
function Tag({
  children,
  style
}) {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      alignSelf: 'flex-start',
      padding: 'var(--space-xs) var(--space-12)',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-sm)',
      fontSize: 'var(--font-size-label-small)',
      fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-eyebrow)',
      lineHeight: 1.5,
      textTransform: 'uppercase',
      color: 'var(--text-accent)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/content/ToolCard.jsx
try { (() => {
/* .tool-card — the AI Tools page card. Verdict block pinned to the bottom. */
function ToolCard({
  title,
  category,
  status = 'stack',
  statusLabel = 'core stack',
  summary,
  verdict,
  verdictLabel = 'Verdict',
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      padding: 'var(--space-lg)',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-md)',
      ...style
    }
  }, [React.createElement('div', {
    key: 't',
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-md)'
    }
  }, [React.createElement('div', {
    key: 'h',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      minWidth: 0
    }
  }, [React.createElement('h3', {
    key: 'ti',
    style: {
      fontSize: 'var(--font-size-heading-3)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1.2,
      color: 'var(--text-primary)'
    }
  }, title), category ? React.createElement(__ds_scope.Tag, {
    key: 'c'
  }, category) : null]), React.createElement(__ds_scope.StatusBadge, {
    key: 's',
    status
  }, statusLabel)]), summary ? React.createElement('p', {
    key: 'su',
    style: {
      fontSize: 'var(--font-size-body-md)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 'var(--line-height-body)',
      color: 'var(--text-muted)'
    }
  }, summary) : null, verdict ? React.createElement('div', {
    key: 'v',
    style: {
      marginTop: 'auto',
      paddingTop: 'var(--space-lg)',
      borderTop: '1px solid var(--border-rule)'
    }
  }, [React.createElement(__ds_scope.Eyebrow, {
    key: 'l',
    tone: 'accent',
    style: {
      marginBottom: 'var(--space-sm)',
      fontSize: 'var(--font-size-label-small)',
      letterSpacing: 'var(--tracking-eyebrow)',
      lineHeight: 1.5
    }
  }, verdictLabel), React.createElement('p', {
    key: 'x',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body)',
      color: 'var(--text-muted)'
    }
  }, verdict)]) : null]);
}
Object.assign(__ds_scope, { ToolCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ToolCard.jsx", error: String((e && e.message) || e) }); }

// components/core/TextLink.jsx
try { (() => {
const {
  useState
} = React;
/* .text-link — muted label with a brand-green arrow; brightens on hover. */
function TextLink({
  children,
  href = '#',
  large = false,
  arrow = 'trailing',
  style
}) {
  const [hover, setHover] = useState(false);
  const a = React.createElement('span', {
    key: 'a',
    style: {
      color: 'var(--text-accent)'
    }
  }, '\u2192');
  return React.createElement('a', {
    href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      color: hover ? 'var(--text-primary)' : 'var(--text-muted)',
      fontSize: 'var(--font-size-body-lg)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: large ? '-0.6px' : 0,
      transition: 'color .2s',
      ...style
    }
  }, arrow === 'leading' ? [a, children] : [children, a]);
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/content/JournalCard.jsx
try { (() => {
/* .journal-card (index, borderless) and .journal-carousel-card (homepage,
   bordered 440px card with a 10% dark scrim over the image). */
function JournalCard({
  image,
  title,
  excerpt,
  href = '#',
  variant = 'index',
  linkLabel = 'Read on Substack',
  style
}) {
  if (variant === 'carousel') {
    return React.createElement('a', {
      href,
      style: {
        flex: '0 0 auto',
        width: 440,
        maxWidth: '82vw',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-rule)',
        background: 'var(--bg-canvas)',
        textDecoration: 'none',
        color: 'inherit',
        ...style
      }
    }, [React.createElement('div', {
      key: 'w',
      style: {
        position: 'relative',
        width: '100%',
        height: 280
      }
    }, [React.createElement('img', {
      key: 'i',
      src: image,
      alt: '',
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block'
      }
    }), React.createElement('div', {
      key: 's',
      style: {
        position: 'absolute',
        inset: 0,
        background: 'rgb(from var(--dark) r g b / 10%)'
      }
    })]), React.createElement('div', {
      key: 'b',
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 'var(--space-lg)'
      }
    }, [React.createElement('p', {
      key: 't',
      style: {
        fontSize: 18,
        lineHeight: '26px',
        color: 'var(--text-primary)'
      }
    }, title), React.createElement('p', {
      key: 'l',
      style: {
        fontSize: 14,
        color: 'var(--text-accent)'
      }
    }, '\u2192 Read')])]);
  }
  return React.createElement('a', {
    href,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      flex: '0 1 calc(50% - 30px)',
      minWidth: 0,
      textDecoration: 'none',
      color: 'inherit',
      ...style
    }
  }, [React.createElement('img', {
    key: 'i',
    src: image,
    alt: '',
    style: {
      width: '100%',
      height: 'auto',
      aspectRatio: '2000 / 1307',
      objectFit: 'cover',
      display: 'block'
    }
  }), React.createElement('p', {
    key: 't',
    style: {
      fontSize: 'var(--font-size-heading-2)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 'var(--line-height-heading-large)',
      color: 'var(--text-primary)'
    }
  }, title), excerpt ? React.createElement('p', {
    key: 'e',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body)',
      color: 'var(--text-primary)'
    }
  }, excerpt) : null, React.createElement(__ds_scope.TextLink, {
    key: 'l',
    arrow: 'leading',
    href,
    style: {
      marginTop: 'var(--space-sm)',
      fontSize: 'var(--font-size-body-md)',
      fontWeight: 'var(--weight-semibold)'
    }
  }, linkLabel)]);
}
Object.assign(__ds_scope, { JournalCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/JournalCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
const {
  useState
} = React;
/* .contact-modal-field — uppercase muted label, translucent input on a
   rule border, focus turns the border brand-green. */
function TextField({
  label,
  name,
  type = 'text',
  placeholder,
  multiline = false,
  error,
  defaultValue,
  style
}) {
  const [focus, setFocus] = useState(false);
  const control = {
    width: '100%',
    padding: '13px 17px',
    background: 'rgba(44, 71, 54, 0.35)',
    border: '1px solid ' + (focus ? 'var(--border-button)' : 'var(--border-rule)'),
    borderRadius: 'var(--radius-sm)',
    fontFamily: 'inherit',
    fontSize: 'var(--font-size-body-md)',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color .2s',
    height: multiline ? 122 : 50,
    lineHeight: multiline ? 1.5 : 'normal',
    resize: multiline ? 'vertical' : undefined
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)',
      ...style
    }
  }, [label ? React.createElement('label', {
    key: 'l',
    htmlFor: name,
    style: {
      fontSize: 'var(--font-size-label-medium)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: '0.48px',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label) : null, React.createElement(multiline ? 'textarea' : 'input', {
    key: 'c',
    id: name,
    name,
    placeholder,
    defaultValue,
    type: multiline ? undefined : type,
    style: control,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }), error ? React.createElement('span', {
    key: 'e',
    style: {
      fontSize: 13,
      color: 'var(--color-error)'
    }
  }, error) : null]);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ClientLogoMarquee.jsx
try { (() => {
/* .client-logos — 125x35 white client marks scrolling left at 24s linear,
   held at 50% opacity. Light mode swaps to the -black variants. */
const DEFAULT = ['chase', 'hitachi', 'redbull', 'kddi', 'walmart', 'mitsubishi', 'adobe', 'yokogawa', 'visa', 'jal', 'chanel', 'mitsui', 'kraft', 'tepco', 'fitbit'];
function ClientLogoMarquee({
  clients = DEFAULT,
  theme = 'dark',
  assetBase = 'assets/',
  style
}) {
  const src = c => assetBase + 'client-' + c + (theme === 'light' ? '-black' : '') + '.png';
  const set = clients.concat(clients);
  return React.createElement('div', {
    'aria-hidden': true,
    style: {
      width: '100%',
      overflow: 'hidden',
      opacity: 0.5,
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 40,
      width: 'max-content',
      animation: 'raft-marquee 24s linear infinite'
    }
  }, set.map((c, i) => React.createElement('img', {
    key: c + i,
    src: src(c),
    alt: '',
    style: {
      flexShrink: 0,
      width: 125,
      height: 35,
      objectFit: 'contain'
    }
  }))));
}
Object.assign(__ds_scope, { ClientLogoMarquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ClientLogoMarquee.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CommunityStrip.jsx
try { (() => {
/* .community-strip — full-bleed surface bar: round lime icon, one line of
   text, trailing green arrow. Whole strip is one link, fades to 85% on hover. */
function CommunityStrip({
  text,
  icon,
  assetBase = 'assets/',
  href = '#',
  style
}) {
  const glyph = icon || assetBase + 'services-diamond.svg';
  return React.createElement('div', {
    style: {
      width: '100%',
      background: 'var(--bg-surface)',
      padding: 'var(--space-lg) 0',
      ...style
    }
  }, React.createElement('a', {
    href,
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 'var(--space-md)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'opacity .2s',
      maxWidth: 1200,
      margin: '0 auto',
      paddingLeft: 'var(--space-xl)',
      paddingRight: 'var(--space-xl)'
    }
  }, [React.createElement('span', {
    key: 'i',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-brand)',
      color: 'var(--accent-ink)'
    }
  }, React.createElement('img', {
    src: glyph,
    width: 14,
    height: 14,
    alt: '',
    style: {
      width: 14,
      height: 14
    }
  })), React.createElement('p', {
    key: 't',
    style: {
      flex: '0 1 auto',
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body)',
      color: 'var(--text-primary)'
    }
  }, text), React.createElement('span', {
    key: 'a',
    style: {
      flexShrink: 0,
      fontWeight: 'var(--weight-black)',
      fontSize: 'var(--font-size-body-lg)',
      color: 'var(--bg-brand)'
    }
  }, '\u2192')]));
}
Object.assign(__ds_scope, { CommunityStrip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CommunityStrip.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CtaBanner.jsx
try { (() => {
/* .scan-banner-box — sunken square panel with a bright border, accent-green
   36px heading, 20px body, and a wide CTA centered in the remaining space. */
function CtaBanner({
  heading,
  body,
  cta,
  onCta,
  href,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: 'var(--space-xxxl) var(--space-xxl)',
      background: 'var(--bg-sunken)',
      border: '1px solid var(--border-bright)',
      ...style
    }
  }, [React.createElement('div', {
    key: 't',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-md)',
      maxWidth: 832,
      flexShrink: 0
    }
  }, [React.createElement('h2', {
    key: 'h',
    style: {
      fontWeight: 'var(--weight-regular)',
      fontSize: 'var(--font-size-heading-1)',
      lineHeight: 'var(--font-size-heading-1)',
      letterSpacing: '0.4px',
      color: 'var(--text-accent)'
    }
  }, heading), body ? React.createElement('p', {
    key: 'b',
    style: {
      fontSize: 'var(--font-size-body-lg)',
      lineHeight: 'var(--line-height-heading)',
      fontWeight: 'var(--weight-regular)',
      color: 'var(--text-primary)'
    }
  }, body) : null]), cta ? React.createElement('div', {
    key: 'c',
    style: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1
    }
  }, React.createElement(__ds_scope.Button, {
    wide: true,
    onClick: onCta,
    href
  }, cta)) : null]);
}
Object.assign(__ds_scope, { CtaBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CtaBanner.jsx", error: String((e && e.message) || e) }); }

// components/marketing/LogoBlock.jsx
try { (() => {
/* .logo-block — the lime square holding the stacked RAFT / DESIGN wordmark.
   Letters are Inter 900, uppercase, tight tracking; RAFT reveals left-to-right
   and DESIGN right-to-left on load. */
function LogoBlock({
  size = 300,
  lines = ['RAFT', 'DESIGN'],
  style
}) {
  const fs = size * 0.29;
  return React.createElement('div', {
    role: 'img',
    'aria-label': 'Raft Design',
    style: {
      width: size,
      height: size,
      background: 'var(--lime)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0 4px'
    }
  }, lines.map((line, i) => React.createElement('div', {
    key: line,
    style: {
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      fontOpticalSizing: 'auto',
      textTransform: 'uppercase',
      letterSpacing: i === 0 ? '-0.06em' : '-0.04em',
      lineHeight: 0.85,
      whiteSpace: 'nowrap',
      fontSize: fs,
      color: i === 0 ? 'var(--dark)' : 'var(--white)'
    }
  }, line))));
}
Object.assign(__ds_scope, { LogoBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/LogoBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PageHero.jsx
try { (() => {
/* .work-hero / .tools-hero — centered 72px accent-green display title with a
   short 559px-measure intro under it. Shared by Projects, Journal, AI Tools. */
function PageHero({
  title,
  intro,
  style
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-sm)',
      width: '100%',
      padding: '120px clamp(20px, 8vw, 96px)',
      textAlign: 'center',
      ...style
    }
  }, [React.createElement('h1', {
    key: 't',
    style: {
      fontSize: 'var(--font-size-display)',
      fontWeight: 'var(--weight-black)',
      letterSpacing: 'var(--tracking-display)',
      textTransform: 'uppercase',
      lineHeight: 1,
      color: 'var(--text-accent)'
    }
  }, title), intro ? React.createElement('p', {
    key: 'i',
    style: {
      fontSize: 'var(--font-size-body-md)',
      lineHeight: 'var(--line-height-body)',
      maxWidth: 559,
      color: 'var(--text-primary)'
    }
  }, intro) : null]);
}
Object.assign(__ds_scope, { PageHero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PageHero.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
/* .footer — oversized thin RAFT / DESIGN lockup beside OFFICE / CONTACT /
   SOCIAL columns, then the colophon line. */
function SiteFooter({
  office = ['Hollywood', 'Los Angeles, CA 90068'],
  phone = '(415) 361-9584',
  email = 'hello@raftdesign.studio',
  social = ['LinkedIn', 'Twitter', 'Instagram', 'Note', 'Substack'],
  colophon = 'Designed by hand. Built by AI.',
  assetBase = 'assets/',
  style
}) {
  const heading = {
    fontSize: 'var(--font-size-body-lg)',
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1,
    color: 'var(--text-muted)'
  };
  const link = {
    fontSize: 'var(--font-size-body-lg)',
    lineHeight: 1,
    color: 'var(--text-primary)',
    textDecoration: 'none'
  };
  return React.createElement('footer', {
    style: {
      padding: '30px 15px 15px',
      display: 'flex',
      flexDirection: 'column',
      gap: 47,
      width: '100%',
      ...style
    }
  }, [React.createElement('div', {
    key: 'c',
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      width: '100%',
      gap: 40
    }
  }, [React.createElement('div', {
    key: 'l',
    style: {
      flex: 1,
      maxWidth: 625
    }
  }, [React.createElement('p', {
    key: 'r',
    style: {
      fontWeight: 200,
      fontSize: 105,
      lineHeight: '120px',
      letterSpacing: '-0.05em',
      marginBottom: -19,
      color: 'var(--text-accent)'
    }
  }, 'RAFT'), React.createElement('p', {
    key: 'd',
    style: {
      fontWeight: 300,
      fontSize: 66,
      lineHeight: '55px',
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)'
    }
  }, 'DESIGN')]), React.createElement('div', {
    key: 't',
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      width: 616,
      fontSize: 'var(--font-size-body-lg)',
      letterSpacing: '-1px'
    }
  }, [React.createElement('div', {
    key: 'c1',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 62
    }
  }, [React.createElement('div', {
    key: 'o',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }
  }, [React.createElement('p', {
    key: 'h',
    style: heading
  }, 'OFFICE'), React.createElement('div', {
    key: 'b',
    style: {
      lineHeight: 1.4,
      color: 'var(--text-primary)'
    }
  }, office.map((o, i) => React.createElement('p', {
    key: i
  }, o)))]), React.createElement('div', {
    key: 'ct',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }
  }, [React.createElement('p', {
    key: 'h',
    style: heading
  }, 'CONTACT'), React.createElement('div', {
    key: 'b',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, [React.createElement('a', {
    key: 'p',
    href: 'tel:' + phone.replace(/[^0-9]/g, ''),
    style: link
  }, phone), React.createElement('a', {
    key: 'e',
    href: 'mailto:' + email,
    style: link
  }, email)])])]), React.createElement('div', {
    key: 'c2',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }
  }, [React.createElement('p', {
    key: 'h',
    style: heading
  }, 'SOCIAL'), React.createElement('div', {
    key: 'b',
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, social.map(s => React.createElement('a', {
    key: s,
    href: '#',
    style: link
  }, s)))])])]), React.createElement('p', {
    key: 'x',
    style: {
      fontSize: 'var(--font-size-body-lg)',
      color: 'var(--text-primary)',
      paddingTop: 20,
      paddingBottom: 20,
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-sm)'
    }
  }, [colophon, React.createElement('img', {
    key: 'a',
    src: assetBase + 'llm-anthropic.svg',
    width: 16,
    height: 16,
    alt: 'Anthropic',
    style: {
      width: 16,
      height: 16
    }
  }), React.createElement('img', {
    key: 'o',
    src: assetBase + 'llm-openai.svg',
    width: 16,
    height: 16,
    alt: 'OpenAI',
    style: {
      width: 16,
      height: 16
    }
  }), React.createElement('img', {
    key: 'l',
    src: assetBase + 'llm-lovable.svg',
    width: 16,
    height: 16,
    alt: 'Lovable',
    style: {
      width: 16,
      height: 16
    }
  })])]);
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/ThemeToggle.jsx
try { (() => {
/* .theme-toggle — 36px pill on the chrome surface holding a moon/sun icon. */
function ThemeToggle({
  theme = 'dark',
  onToggle,
  style
}) {
  const moon = React.createElement('path', {
    d: 'M17.5 10.6583C17.3689 12.0768 16.8365 13.4287 15.9652 14.5557C15.0939 15.6826 13.9196 16.5382 12.5798 17.0221C11.2399 17.5061 9.78999 17.5984 8.39958 17.2884C7.00918 16.9784 5.73583 16.2788 4.72852 15.2715C3.72121 14.2642 3.02162 12.9908 2.71159 11.6004C2.40156 10.21 2.49393 8.76007 2.97788 7.42025C3.46184 6.08042 4.31736 4.90614 5.44434 4.03479C6.57133 3.16345 7.92316 2.63109 9.34167 2.5C8.51118 3.62356 8.11154 5.00787 8.21544 6.40118C8.31935 7.79448 8.91988 9.10422 9.90783 10.0922C10.8958 11.0801 12.2055 11.6807 13.5988 11.7846C14.9921 11.8885 16.3764 11.4888 17.5 10.6583Z',
    stroke: 'currentColor',
    strokeWidth: 1.66667,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  });
  const sunPaths = ['M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7C8.567 7 7 8.567 7 10.5C7 12.433 8.567 14 10.5 14Z', 'M10.5 1.75V4.375', 'M10.5 16.625V19.25', 'M3.6925 3.6925L5.5475 5.5475', 'M15.4525 15.4525L17.3075 17.3075', 'M1.75 10.5H4.375', 'M16.625 10.5H19.25', 'M3.6925 17.3075L5.5475 15.4525', 'M15.4525 5.5475L17.3075 3.6925'];
  const icon = theme === 'light' ? React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 21 21',
    fill: 'none'
  }, sunPaths.map((d, i) => React.createElement('path', {
    key: i,
    d,
    stroke: 'currentColor',
    strokeWidth: 1.83333,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }))) : React.createElement('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none'
  }, moon);
  return React.createElement('button', {
    type: 'button',
    onClick: onToggle,
    'aria-label': theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 36,
      height: 36,
      padding: 8,
      border: 'none',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      transition: 'background .2s',
      ...style
    }
  }, icon);
}
Object.assign(__ds_scope, { ThemeToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/ThemeToggle.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavHeader.jsx
try { (() => {
/* .nav-header — sticky, 66px, 85% canvas fill with a 12px backdrop blur.
   Animated R-mark on the left; the logotype cell and the links cell each
   carry their own bottom hairline. */
function NavHeader({
  links = [],
  logo = 'assets/r-mark-dark.gif',
  lang = 'EN',
  theme = 'dark',
  onToggleTheme,
  onNavigate,
  active,
  style
}) {
  const cellBorder = {
    borderBottom: '1px solid var(--border-rule)'
  };
  return React.createElement('nav', {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      height: 'var(--nav-height)',
      padding: '0 15px',
      background: 'rgb(from var(--bg-canvas) r g b / 85%)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      ...style
    }
  }, [React.createElement('div', {
    key: 'l',
    style: {
      flex: '0 0 auto',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      padding: '12px 20px 10px 0',
      ...cellBorder
    }
  }, React.createElement('img', {
    src: logo,
    width: 50,
    height: 50,
    alt: 'Raft Design',
    style: {
      width: 50,
      height: 50,
      objectFit: 'contain'
    }
  })), React.createElement('div', {
    key: 'r',
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      gap: 40,
      height: '100%',
      padding: '12px 30px 10px 20px',
      flex: 1,
      minWidth: 0,
      ...cellBorder
    }
  }, [...links.map(l => React.createElement('a', {
    key: l.label,
    href: l.href || '#',
    onClick: onNavigate ? e => {
      e.preventDefault();
      onNavigate(l);
    } : undefined,
    style: {
      fontSize: 'var(--font-size-body-md)',
      fontWeight: 'var(--weight-regular)',
      letterSpacing: '-0.02em',
      lineHeight: 1,
      paddingBottom: 4,
      flexShrink: 0,
      textDecoration: 'none',
      transition: 'color .2s',
      color: active === l.label ? 'var(--text-accent)' : 'var(--text-primary)'
    }
  }, l.label)), React.createElement(__ds_scope.ThemeToggle, {
    key: 'tt',
    theme,
    onToggle: onToggleTheme
  }), React.createElement('div', {
    key: 'lg',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0,
      fontSize: 'var(--font-size-body-md)',
      fontWeight: 'var(--weight-black)',
      lineHeight: 1
    }
  }, [React.createElement('span', {
    key: 'a',
    style: {
      color: lang === 'EN' ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, 'EN'), React.createElement('span', {
    key: 'd',
    style: {
      color: 'var(--text-muted)'
    }
  }, '|'), React.createElement('span', {
    key: 'b',
    style: {
      color: lang === 'JP' ? 'var(--text-primary)' : 'var(--text-muted)'
    }
  }, 'JP')])])]);
}
Object.assign(__ds_scope, { NavHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ContactModal.jsx
try { (() => {
const {
  SectionLabel,
  TextField,
  Button
} = window.RaftDesignSystem_76d511;
function ContactModal({
  open,
  onClose
}) {
  const [sent, setSent] = React.useState(false);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 950,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      background: 'rgba(0,0,0,0.5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    role: "dialog",
    "aria-modal": "true",
    style: {
      width: '100%',
      maxWidth: 540,
      maxHeight: 'calc(100vh - 32px)',
      overflowY: 'auto',
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-md)',
      padding: 'var(--space-xl) var(--space-xl) 25px',
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-sm)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Contact"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 22,
      lineHeight: 1.25,
      letterSpacing: '-0.5px'
    }
  }, "Let's explore your project's potential.")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    "aria-label": "Close",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 36,
      height: 36,
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-pill)',
      background: 'none',
      color: 'var(--text-primary)',
      cursor: 'pointer',
      fontSize: 16
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-xl)'
    }
  }, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-md)',
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-sm)',
      background: 'rgb(from var(--bg-brand) r g b / 12%)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5
    }
  }, "Thanks \u2014 I'll get back to you soon.")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement(TextField, {
    label: "Name",
    name: "name",
    placeholder: "Your name"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "you@company.com"
  }), /*#__PURE__*/React.createElement(TextField, {
    label: "Message",
    name: "message",
    multiline: true,
    placeholder: "Tell me about your project\u2026"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "submit",
    style: {
      fontSize: 16
    }
  }, "Send message"))))));
}
Object.assign(window, {
  ContactModal
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ContactModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Home.jsx
try { (() => {
const {
  LogoBlock,
  ClientLogoMarquee,
  SectionLabel,
  ServiceCard,
  TextLink,
  Button,
  StatValue,
  CtaBanner,
  JournalCard,
  FaqItem
} = window.RaftDesignSystem_76d511;
const section = {
  padding: '20px 15px 120px',
  maxWidth: 1920,
  borderTop: '1px solid var(--border-rule)'
};
const twoCol = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 40
};
const labelGap = {
  marginBottom: 133
};
function HeroLockup() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: '45px 15px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridTemplateRows: 'auto auto auto',
      columnGap: 30,
      rowGap: 25,
      paddingBottom: 80,
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 1,
      gridRow: 1,
      marginTop: 50,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement(LogoBlock, {
    size: 300
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      gridColumn: 2,
      gridRow: 1,
      minWidth: 0,
      marginTop: 50
    }
  }, ['DESIGNING', null, 'TIMES AHEAD.'].map((l, i) => l === null ? /*#__PURE__*/React.createElement("span", {
    key: "e",
    style: {
      display: 'block',
      fontSize: 128,
      lineHeight: 0.78,
      letterSpacing: '-0.03em',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap'
    }
  }, "FOR ", /*#__PURE__*/React.createElement("span", {
    className: "emphasis",
    style: {
      fontSize: 145,
      lineHeight: 0,
      display: 'inline-block'
    }
  }, "turbulent")) : /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'block',
      fontSize: 128,
      lineHeight: 0.78,
      letterSpacing: '-0.03em',
      color: 'var(--text-primary)',
      whiteSpace: 'nowrap'
    }
  }, l))), /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: 1,
      gridRow: 2,
      alignSelf: 'start',
      fontWeight: 900,
      fontSize: 16,
      letterSpacing: '-0.02em',
      color: 'var(--text-accent)'
    }
  }, "AI-Native Product Studio"), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: 2,
      gridRow: 2,
      alignSelf: 'start',
      display: 'flex',
      gap: 20
    }
  }, ['AI product design', 'Brand systems', 'Product strategy', 'Design through build'].map(t => /*#__PURE__*/React.createElement("p", {
    key: t,
    style: {
      fontSize: 16,
      lineHeight: 0.95
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)'
    }
  }, "\u2192"), " ", t))), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1',
      gridRow: 3,
      marginTop: 95
    }
  }, /*#__PURE__*/React.createElement(ClientLogoMarquee, null))));
}
function Approach() {
  return /*#__PURE__*/React.createElement("section", {
    id: "approach",
    style: section
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: labelGap
  }, "Approach"), /*#__PURE__*/React.createElement("div", {
    style: twoCol
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 28,
      fontWeight: 900,
      lineHeight: 0.95,
      maxWidth: 368
    }
  }, "Creating experiences to get you where you need to go, even as the water keeps changing."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.4,
      maxWidth: 615
    }
  }, "AI is changing how people find, trust, and use everything, and most companies feel it without knowing what to do next. Startups move fast on engineering but haven't built the brand people stay for. Established companies have the trust, and are still learning to carry it into an AI-first world. We work with both. Strategy, design, and build happen together, not handed off in sequence.")), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/Thesis.png",
    alt: "",
    style: {
      flexShrink: 0,
      width: 250,
      height: 250,
      objectFit: 'cover',
      background: 'var(--lime)',
      borderRadius: 'var(--radius-sm)'
    }
  })));
}
const EXPERTISE = [['Brand strategy & design', 'We define what brands stand for and how they show up. Positioning, identity, and systems built to scale and evolve. AI expands how we explore and create.', 'Brand strategy, identity systems, positioning, art direction'], ['Products & platforms', 'Websites, apps, and platforms built for adoption. Design that adapts as the product grows and holds up when the team scales past the people who started it.', 'Product design, UX, design systems, web, mobile'], ['AI product design', 'Companies are still catching up on agentic AI. The model working is not the same as the product working. Design decides whether people trust it and come back.', 'AI product design, agentic interfaces, conversational UI'], ['Global brand & product', 'Brands and products that work in one market rarely survive translation intact. Meaning has to be rebuilt, not converted. Bilingual design leadership across the US and Japan.', 'Global brand platforms, localization, bilingual leadership']];
function Expertise() {
  return /*#__PURE__*/React.createElement("section", {
    id: "expertise",
    style: section
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: labelGap
  }, "Expertise"), /*#__PURE__*/React.createElement("div", {
    style: twoCol
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  }, [[0, 1], [2, 3]].map(row => /*#__PURE__*/React.createElement("div", {
    key: row[0],
    style: {
      display: 'flex',
      gap: 40
    }
  }, row.map(i => /*#__PURE__*/React.createElement(ServiceCard, {
    key: i,
    title: EXPERTISE[i][0],
    body: EXPERTISE[i][1],
    tagline: EXPERTISE[i][2]
  }))))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/anime-1.gif",
    alt: "",
    style: {
      flexShrink: 0,
      width: 250,
      height: 250,
      borderRadius: 'var(--radius-sm)'
    }
  })));
}
const PROJECTS = [{
  id: 'legalon',
  name: "LegalOn's AI Brand Platform",
  subtitle: 'Global Brand & Product Platform',
  body: "LegalOn built Japan's leading legal AI, then expanded into a broader suite of AI-powered business products. The new platform had to hold two opposing demands at once: one coherent global identity across seven products, and enough room for each to stand on its own. The resolution was the “ON” concept: always on, always intelligent, always working.",
  images: ['../../assets/Modular-2.webp', '../../assets/Modular-5.webp', '../../assets/Modular-6.webp']
}, {
  id: 'adobe',
  name: 'Adobe Express Photos',
  subtitle: '0-to-1 AI Product Design',
  body: "Adobe wanted to democratize image editing. Adobe's new AI-powered desktop image editor transforms complex editing into one-click operations, making professional-quality enhancement accessible to marketers, SMBs, office workers, and consumers.",
  images: ['../../assets/Harmony-thumbnail-01.webp', '../../assets/Harmony-thumbnail-02.webp', '../../assets/Harmony-thumbnail-03.webp']
}];
function Project({
  p,
  onOpenImage
}) {
  return /*#__PURE__*/React.createElement("article", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      padding: '0 15px 50px',
      maxWidth: 1920
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      overflowX: 'auto'
    }
  }, p.images.map(src => /*#__PURE__*/React.createElement("img", {
    key: src,
    src: src,
    alt: "",
    onClick: () => onOpenImage(src),
    style: {
      flex: '0 0 calc(42% - 5px)',
      width: 'calc(42% - 5px)',
      objectFit: 'cover',
      aspectRatio: 1,
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-rule)',
      cursor: 'zoom-in'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      fontSize: 16,
      letterSpacing: '-0.48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-md)',
      fontWeight: 600,
      fontSize: 24,
      width: 682,
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)',
      flexShrink: 0
    }
  }, "Project"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      width: 572
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontWeight: 900,
      letterSpacing: '-0.02em',
      lineHeight: 1
    }
  }, p.name), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 500
    }
  }, p.subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 30,
      width: 316,
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("p", null, p.body), /*#__PURE__*/React.createElement(TextLink, {
    href: "#"
  }, "See Project"))));
}
function Studio() {
  const stats = [['540M+', 'Users and visitors interacted with our design in Walmart app'], ['114%', 'Increase of monthly active users from our strategy'], ['5X', 'Increase in add-on discovery and use in Express']];
  const awards = ['Webby Winner - All-in-One AI-Powered Creativity App, 2024, For Adobe Express', 'Webby Winner - Best Nonprofit Website, 2016, For Thatsnotcool.com', 'W3 Award - Gold: Mobile Apps - Education, 2017, For Respect Effect mobile app', 'Good Design Award - Best Global Website, 2008, For Hitachi.com'];
  return /*#__PURE__*/React.createElement("section", {
    id: "studio",
    style: {
      padding: '0 15px 50px',
      maxWidth: 1920,
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginTop: 20,
      marginBottom: 133
    }
  }, "Studio"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%',
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 633,
      flexShrink: 0,
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 30,
      lineHeight: 1,
      letterSpacing: '-0.6px',
      maxWidth: 325,
      marginBottom: 'var(--space-lg)'
    }
  }, "Raft Design is an AI-native studio collaborating with companies in the U.S. and Japan on brand, product, and innovation."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5,
      maxWidth: 500
    }
  }, "Twenty years of building brand, product, and platform work across Tokyo and San Francisco taught the same lesson twice: what survives isn't the work built to impress. It's the work built to move. Design leadership at Adobe and Walmart. Brand and product work with LegalOn, Visa, Hitachi, and Red Bull.")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      width: 417
    }
  }, stats.map(([v, l], i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: v
  }, /*#__PURE__*/React.createElement(StatValue, {
    size: "lg",
    italic: true,
    value: v,
    label: l
  }), i < stats.length - 1 ? /*#__PURE__*/React.createElement("hr", null) : null))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/anime-6.gif",
    alt: "",
    style: {
      flexShrink: 0,
      width: 250,
      height: 250,
      borderRadius: 'var(--radius-sm)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'var(--space-xxl)',
      marginBottom: 'var(--space-lg)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 30,
      fontWeight: 400,
      lineHeight: 1,
      letterSpacing: '-0.6px',
      marginBottom: 32
    }
  }, "Awards"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-xxl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: 'fit-content'
    }
  }, awards.map(a => /*#__PURE__*/React.createElement("div", {
    key: a,
    style: {
      padding: 'var(--space-md) 0',
      borderBottom: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.5
    }
  }, a)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/awards-logos.png",
    alt: "",
    style: {
      width: 'auto',
      height: 420
    }
  })))));
}
const FAQS = [['What is Raft Design?', "Raft Design is an AI-native studio working across the U.S. and Japan on brand, product, and digital experience. Twenty years of experience across Adobe, Walmart, and LegalOn shape how we work: hands-on, fast, and built to move with change rather than around it."], ['What does "AI-native studio" mean?', "It means AI is part of how the work gets made, not just what it's about. Strategy forms in conversation with language models, design and prototype move together, and working software gets built without the usual handoff between design and engineering."], ['Does Raft Design work in Japanese?', 'Yes. We work natively in both Japanese and English, with design leadership across both markets. For Japanese companies expanding abroad, or global brands entering Japan, we rebuild meaning for the new market rather than translating it — the harder and more important work.'], ['Does Raft Design design, or also build?', 'Both. Most studios hand off static designs for someone else to build. We take work through to functioning software — prototypes that behave like the real thing, testable and demoable, using tools like Claude Code, Cursor, and V0.']];
const ARTICLES = [['Stop Adding AI to the Design Process. Re-engineer It.', '../../assets/article-img-stop-adding-ai.jpg'], ['The AI-Native Designer Was Only Phase One', '../../assets/article-img-ai-native-designer-was-phase-1.webp'], ['How I Use AI', '../../assets/article-img-how-i-use-ai.webp'], ['Designing for Awareness: How Multimodal AI Is Reshaping the Future of Interaction', '../../assets/article-img-Designing-for-Awareness.png']];
function Home({
  onContact,
  onScan,
  onOpenImage,
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(HeroLockup, null), /*#__PURE__*/React.createElement(Approach, null), /*#__PURE__*/React.createElement(Expertise, null), /*#__PURE__*/React.createElement("section", {
    id: "projects",
    style: {
      padding: '20px 15px 50px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      maxWidth: 1920,
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: labelGap
  }, "Projects"), PROJECTS.map(p => /*#__PURE__*/React.createElement(Project, {
    key: p.id,
    p: p,
    onOpenImage: onOpenImage
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    href: "#",
    onClick: () => onNavigate({
      label: 'Projects'
    })
  }, "View all projects"))), /*#__PURE__*/React.createElement(Studio, null), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: 'var(--space-xl)',
      maxWidth: 1920,
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement(CtaBanner, {
    heading: "Design Intelligence Engine",
    body: "Ever wondered if your site is designed or built well? Is it readable by LLMs or search? Let our intelligent tool scan your site and give you a genuine score.",
    cta: "Scan your site",
    onCta: onScan
  })), /*#__PURE__*/React.createElement("section", {
    id: "journal",
    style: {
      padding: '0 15px 50px',
      maxWidth: 1920,
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 'var(--space-lg) 1px var(--space-xxl)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Journal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate({
        label: 'Journal'
      });
    },
    style: {
      fontSize: 16,
      color: 'var(--text-muted)'
    }
  }, "View all articles \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-sm)'
    }
  }, ['←', '→'].map(a => /*#__PURE__*/React.createElement("button", {
    key: a,
    type: "button",
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 48,
      height: 48,
      border: '1px solid var(--border-button)',
      borderRadius: 'var(--radius-pill)',
      background: 'none',
      color: 'var(--text-accent)',
      fontSize: 18,
      fontWeight: 700,
      cursor: 'pointer'
    }
  }, a))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      width: '100%',
      overflowX: 'auto',
      paddingBottom: 'var(--space-sm)'
    }
  }, ARTICLES.map(([t, img]) => /*#__PURE__*/React.createElement(JournalCard, {
    key: t,
    variant: "carousel",
    title: t,
    image: img,
    href: "#"
  })))), /*#__PURE__*/React.createElement("section", {
    id: "faqs",
    style: {
      padding: 'var(--space-lg) var(--space-md) var(--space-huge)',
      maxWidth: 1920,
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    style: {
      marginBottom: 'var(--space-xxl)'
    }
  }, "FAQs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xxl)'
    }
  }, [[0, 1], [2, 3]].map(row => /*#__PURE__*/React.createElement("div", {
    key: row[0],
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-xxxl)'
    }
  }, row.map(i => /*#__PURE__*/React.createElement(FaqItem, {
    key: i,
    question: FAQS[i][0],
    answer: FAQS[i][1]
  })))))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: '0 30px 50px',
      display: 'flex',
      flexDirection: 'column',
      gap: 34,
      maxWidth: 1920
    }
  }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.025em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)'
    }
  }, "Connect"), " with me to explore your project's potential."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-md)',
      flex: '1 1 auto'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: onContact
  }, "Send a message"))), /*#__PURE__*/React.createElement("hr", null)));
}
Object.assign(window, {
  Home
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/JournalIndex.jsx
try { (() => {
const {
  PageHero,
  JournalCard
} = window.RaftDesignSystem_76d511;
const POSTS = [['Stop Adding AI to the Design Process. Re-engineer It.', 'Putting AI into every stage of a broken process just makes the same process run faster. Re-engineering the workflow itself—not bolting tools onto it—is the real work.', '../../assets/article-img-stop-adding-ai.jpg'], ['Why I Built a Raft, Not a Ship', 'On choosing to build something built to move with change, rather than something built to look finished.', '../../assets/article-img-the-contradiction.webp'], ['The AI-Native Designer Was Only Phase One', 'A team of faster designers can be a slower team. We spent the past year obsessed with getting individual designers faster with AI.', '../../assets/article-img-ai-native-designer-was-phase-1.webp'], ['How I Use AI', "The designers who thrive in the AI era aren't just fluent with the tools—they know exactly where human judgment takes over.", '../../assets/article-img-how-i-use-ai.webp'], ['Designing for Awareness: How Multimodal AI Is Reshaping the Future of Interaction', 'For most of its history, AI has been blind and deaf—reasoning only from text. Multimodal AI changes what design is responsible for.', '../../assets/article-img-Designing-for-Awareness.png'], ['Stop Treating AI Like Cheating on Your Homework', 'In 2026, as AI becomes standard in everyday tools, the real edge will go to design teams that stop treating it like cheating.', '../../assets/article-img-stop-treating-ai.webp']];
function JournalIndex() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    title: "Journal",
    intro: /*#__PURE__*/React.createElement(React.Fragment, null, "Leading through design.", /*#__PURE__*/React.createElement("br", null), "Where the practice of design meets the future of how we work.")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: 'var(--space-huge)'
    }
  }, [[0, 1], [2, 3], [4, 5]].map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: 'flex',
      gap: 'var(--space-xxxl)',
      width: '100%',
      padding: 'var(--space-lg) clamp(20px, 6vw, 60px) var(--space-xxl)'
    }
  }, row.map(i => /*#__PURE__*/React.createElement(JournalCard, {
    key: i,
    title: POSTS[i][0],
    excerpt: POSTS[i][1],
    image: POSTS[i][2],
    href: "#"
  }))))));
}
Object.assign(window, {
  JournalIndex
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/JournalIndex.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProjectsIndex.jsx
try { (() => {
const {
  PageHero,
  WorkCard
} = window.RaftDesignSystem_76d511;
const WORK = [["LegalOn's AI Brand Platform", '../../assets/Modular-2.webp'], ['Adobe Express Photos', '../../assets/adp-hero.jpg'], ["Walmart's AI-First Shopping Experience", '../../assets/ADP-thumbnail-1.webp'], ['Adobe Express Enterprise Platform', '../../assets/ADP-thumbnail-8.webp'], ['Modere eCommerce', '../../assets/Harmony-thumbnail-01.webp'], ['Modular Suite for XD', '../../assets/Modular-6.webp']];
function ProjectsIndex() {
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    title: "Projects",
    intro: "Brand and AI product work across the U.S. and Japan, for companies from category-defining startups to the Fortune 1."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      paddingBottom: 'var(--space-huge)'
    }
  }, [[0, 1], [2, 3], [4, 5]].map((row, ri) => /*#__PURE__*/React.createElement("div", {
    key: ri,
    style: {
      display: 'flex',
      gap: 'var(--space-xxxl)',
      width: '100%',
      padding: ri === 0 ? '0 clamp(20px, 6vw, 60px) var(--space-lg)' : 'var(--space-xxl) clamp(20px, 6vw, 60px) var(--space-lg)'
    }
  }, row.map(i => /*#__PURE__*/React.createElement(WorkCard, {
    key: i,
    title: WORK[i][0],
    image: WORK[i][1],
    href: "#"
  }))))));
}
Object.assign(window, {
  ProjectsIndex
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProjectsIndex.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ToolsPage.jsx
try { (() => {
const {
  PageHero,
  CommunityStrip,
  SectionLabel,
  ToolCard,
  GraveyardRow,
  Button
} = window.RaftDesignSystem_76d511;
const TOOLS = [['Claude', 'Reasoning / Writing', 'stack', 'core stack', 'Strategic briefs, long-form synthesis, prompt writing for coding.', 'Still the clearest reasoning model we have. The $20 Pro plan is usually enough.'], ['ChatGPT', 'Research / Reasoning / Visuals', 'stack', 'core stack', 'Research, synthesis, concept development, critique, image generation, translation.', 'Strong for research, synthesis, and ambiguous product problems. We use it when we want breadth and multiple perspectives.'], ['Claude Code', 'AI Code / Build', 'stack', 'core stack', 'Front-end builds, design-to-code handoff, live iteration during client sessions.', 'Workhorse for designer-builders — it closes the gap between Figma and shipped code without waiting on engineering.'], ['Cursor', 'AI Code Editor', 'rotation', 'in rotation', 'Front-end builds, design-to-code handoff, live iteration during client sessions.', 'Best for line-level work where you want to see the diff before it lands. We pair it with Claude Code for active building.'], ['Figma + Make + MCP', 'Design / Design-to-Code', 'stack', 'core stack', 'Design system source of truth, prompt-to-prototype drafts, and the token pipeline that feeds Claude Code directly.', 'Design workhorse. MCP means Claude Code pulls real tokens and component structure.'], ['Claude Design', 'Design / Prototyping', 'watching', 'watching', 'Create interactive prototypes, visual concepts, presentations, and design systems by working conversationally with Claude.', 'Potentially a very big deal. The advantage is the continuity from design intent into implementation.']];
const GRAVEYARD = [['Bolt', 'Still good. Lovable is easier when we want speed; Claude Code and Cursor give us more control.'], ['Uizard', 'Prompt-to-UI was impressive early. Now Figma Make, Claude Design, v0 and app builders do substantially more.'], ['Figma AI plugins', 'Superseded by the MCP workflow — real tokens, real component code, not a plugin guessing at both.'], ["DALL-E", "ChatGPT's image gen sits behind dedicated tools on generation speed and top-end aesthetics."]];
function ToolsPage({
  onContact
}) {
  const wrap = {
    maxWidth: 1200,
    margin: '0 auto',
    paddingLeft: 'var(--space-xl)',
    paddingRight: 'var(--space-xl)'
  };
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(PageHero, {
    title: "AI Tools",
    intro: "This is a collection of tested tools and resources for designing with AI. It's regularly updated to keep up with the fast-paced innovation in AI tooling."
  }), /*#__PURE__*/React.createElement(CommunityStrip, {
    assetBase: "../../assets/",
    text: "Many of these tools come from a meetup AI Design LA, where they're shared and tested.",
    href: "#"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: 'var(--bg-canvas)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-xl)',
      padding: 'var(--space-xxxl) 0 var(--space-xxl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Active"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--text-muted)'
    }
  }, TOOLS.length, " tools in rotation")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-lg)'
    }
  }, TOOLS.map(t => /*#__PURE__*/React.createElement(ToolCard, {
    key: t[0],
    title: t[0],
    category: t[1],
    status: t[2],
    statusLabel: t[3],
    summary: t[4],
    verdict: t[5]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-lg)',
      padding: 'var(--space-md) 0 var(--space-xxxl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)'
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Graveyard"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: '24px',
      color: 'var(--text-muted)'
    }
  }, "Dropped, and why")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid var(--border-rule)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, GRAVEYARD.map(([n, note], i) => /*#__PURE__*/React.createElement(GraveyardRow, {
    key: n,
    name: n,
    note: note,
    tinted: i === 1 || i === 2,
    style: i === GRAVEYARD.length - 1 ? {
      borderBottom: 'none'
    } : undefined
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-xl)',
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      fontSize: 16,
      lineHeight: '24px'
    }
  }, "Everything here is judged on real project work, not demos. Tools move between lists as they earn it.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-xxl) 0',
      borderTop: '1px solid var(--border-rule)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...wrap,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: 'var(--space-xl)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 36,
      fontWeight: 900,
      lineHeight: 0.95,
      letterSpacing: '-0.025em'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-accent)'
    }
  }, "Using"), " something we should test?"), /*#__PURE__*/React.createElement(Button, {
    wide: true,
    onClick: onContact
  }, "Tell us about it"))));
}
Object.assign(window, {
  ToolsPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ToolsPage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.FaqItem = __ds_scope.FaqItem;

__ds_ns.GraveyardRow = __ds_scope.GraveyardRow;

__ds_ns.JournalCard = __ds_scope.JournalCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.ToolCard = __ds_scope.ToolCard;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.SectionLabel = __ds_scope.SectionLabel;

__ds_ns.StatValue = __ds_scope.StatValue;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.ClientLogoMarquee = __ds_scope.ClientLogoMarquee;

__ds_ns.CommunityStrip = __ds_scope.CommunityStrip;

__ds_ns.CtaBanner = __ds_scope.CtaBanner;

__ds_ns.LogoBlock = __ds_scope.LogoBlock;

__ds_ns.PageHero = __ds_scope.PageHero;

__ds_ns.NavHeader = __ds_scope.NavHeader;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.ThemeToggle = __ds_scope.ThemeToggle;

})();
