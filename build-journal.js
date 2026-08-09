#!/usr/bin/env node
/*
 * Static-site generator for the Journal section only. Zero dependencies —
 * reads /journal/data/*.json (the editorial content source) and writes
 * plain static HTML to /journal/, /ja/journal/, and /ja/journal/[slug]/.
 * Re-run this script (`node build-journal.js`) after editing a JSON file
 * or this script; the rest of the site has no build step and stays as-is.
 */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'journal', 'data');
const SITE = 'https://raftdesign.studio';

const THEME_TOGGLE_SVG = `
        <svg class="theme-toggle-icon theme-toggle-icon--moon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M17.5 10.6583C17.3689 12.0768 16.8365 13.4287 15.9652 14.5557C15.0939 15.6826 13.9196 16.5382 12.5798 17.0221C11.2399 17.5061 9.78999 17.5984 8.39958 17.2884C7.00918 16.9784 5.73583 16.2788 4.72852 15.2715C3.72121 14.2642 3.02162 12.9908 2.71159 11.6004C2.40156 10.21 2.49393 8.76007 2.97788 7.42025C3.46184 6.08042 4.31736 4.90614 5.44434 4.03479C6.57133 3.16345 7.92316 2.63109 9.34167 2.5C8.51118 3.62356 8.11154 5.00787 8.21544 6.40118C8.31935 7.79448 8.91988 9.10422 9.90783 10.0922C10.8958 11.0801 12.2055 11.6807 13.5988 11.7846C14.9921 11.8885 16.3764 11.4888 17.5 10.6583Z" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg class="theme-toggle-icon theme-toggle-icon--sun" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M10.5 14C12.433 14 14 12.433 14 10.5C14 8.567 12.433 7 10.5 7C8.567 7 7 8.567 7 10.5C7 12.433 8.567 14 10.5 14Z" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.5 1.75V4.375" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.5 16.625V19.25" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.6925 3.6925L5.5475 5.5475" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.4525 15.4525L17.3075 17.3075" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.75 10.5H4.375" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16.625 10.5H19.25" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.6925 17.3075L5.5475 15.4525" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M15.4525 5.5475L17.3075 3.6925" stroke="currentColor" stroke-width="1.83333" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;

const HAMBURGER_SVG = `<svg width="55" height="32" viewBox="0 0 55 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20.4167 24C19.6343 24 19 23.3657 19 22.5833C19 21.8009 19.6343 21.1667 20.4167 21.1667H35.2546C36.037 21.1667 36.6712 21.8009 36.6712 22.5833C36.6712 23.3657 36.037 24 35.2546 24H20.4167ZM20.4167 16.9167C19.6343 16.9167 19 16.2824 19 15.5C19 14.7176 19.6343 14.0833 20.4167 14.0833H35.2546C36.037 14.0833 36.6712 14.7176 36.6712 15.5C36.6712 16.2824 36.037 16.9167 35.2546 16.9167H20.4167ZM20.4167 9.83333C19.6343 9.83333 19 9.19907 19 8.41667C19 7.63426 19.6343 7 20.4167 7H35.2546C36.037 7 36.6712 7.63426 36.6712 8.41667C36.6712 9.19907 36.037 9.83333 35.2546 9.83333H20.4167Z" fill="currentColor"/>
      </svg>`;

const CLOSE_SVG = `<svg width="17" height="16" viewBox="0 0 16.5332 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.268262 0.259611C0.440253 0.0933737 0.673395 0 0.916476 0C1.15956 0 1.3927 0.0933737 1.56469 0.259611L16.2412 14.4628C16.3313 14.5441 16.4036 14.6421 16.4538 14.751C16.5039 14.8599 16.5309 14.9774 16.533 15.0966C16.5352 15.2158 16.5125 15.3342 16.4664 15.4448C16.4203 15.5553 16.3516 15.6557 16.2645 15.74C16.1774 15.8243 16.0736 15.8907 15.9594 15.9354C15.8452 15.98 15.7229 16.002 15.5997 15.9999C15.4765 15.9978 15.3551 15.9717 15.2426 15.9232C15.13 15.8746 15.0288 15.8047 14.9448 15.7175L0.268262 1.51423C0.0964852 1.34779 0 1.12216 0 0.886921C0 0.651679 0.0964852 0.426056 0.268262 0.259611Z" fill="currentColor"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2405 0.259611C16.4123 0.426056 16.5088 0.651679 16.5088 0.886921C16.5088 1.12216 16.4123 1.34779 16.2405 1.51423L1.564 15.7175C1.39011 15.8743 1.16012 15.9596 0.922484 15.9556C0.684845 15.9515 0.458111 15.8584 0.290049 15.6957C0.121987 15.5331 0.0257188 15.3136 0.021526 15.0837C0.0173331 14.8537 0.105543 14.6311 0.267572 14.4628L14.9441 0.259611C15.1161 0.0933737 15.3492 0 15.5923 0C15.8354 0 16.0685 0.0933737 16.2405 0.259611Z" fill="currentColor"/>
          </svg>`;

const NAV_ITEMS = {
  en: [
    ['approach', 'Approach'], ['expertise', 'Expertise'], ['projects', 'Projects'],
    ['build', 'Build'], ['studio', 'Studio'],
  ],
  ja: [
    ['approach', 'Approach'], ['expertise', 'Expertise'], ['projects', 'Projects'],
    ['build', 'Build'], ['studio', 'Studio'],
  ],
};
const JOURNAL_LABEL = { en: 'Journal', ja: 'Journal' };
const CONTACT_LABEL = { en: 'Contact', ja: 'Contact' };
const TOOLS_LABEL = { en: 'AI Tools', ja: 'AI Tools' };

// langSwitch: { activeLabel, otherHref, otherHreflang, otherTarget, otherRel }
function nav(lang, imagesPath, journalHref, langSwitch) {
  const items = NAV_ITEMS[lang];
  const homeHref = lang === 'ja' ? '/ja/' : '/';
  const anchorPrefix = lang === 'ja' ? '/ja/#' : '/#';
  const toolsHref = lang === 'ja' ? '/ja/tools/' : '/tools/';

  const linkList = (cls) => items.map(([id, label]) =>
    `      <a href="${anchorPrefix}${id}" class="${cls}">${label}</a>`).join('\n') +
    `\n      <a href="${journalHref}" class="${cls}">${JOURNAL_LABEL[lang]}</a>` +
    `\n      <a href="${anchorPrefix}contact" class="${cls}">${CONTACT_LABEL[lang]}</a>` +
    `\n      <a href="${toolsHref}" class="${cls}">${TOOLS_LABEL[lang]}</a>`;

  const langBlock = (extra) => {
    const otherAttrs = [
      langSwitch.otherTarget ? ` target="${langSwitch.otherTarget}"` : '',
      langSwitch.otherRel ? ` rel="${langSwitch.otherRel}"` : '',
    ].join('');
    if (lang === 'en') {
      return `      <div class="nav-lang"${extra}>
        <span class="nav-lang-active">EN</span>
        <span class="nav-lang-divider">|</span>
        <a href="${langSwitch.otherHref}" class="nav-lang-inactive" hreflang="${langSwitch.otherHreflang}"${otherAttrs}>JP</a>
      </div>`;
    }
    return `      <div class="nav-lang"${extra}>
        <a href="${langSwitch.otherHref}" class="nav-lang-inactive" hreflang="${langSwitch.otherHreflang}"${otherAttrs}>EN</a>
        <span class="nav-lang-divider">|</span>
        <span class="nav-lang-active">JP</span>
      </div>`;
  };

  const menuLabel = lang === 'ja' ? 'メニューを開く' : 'Open menu';
  const closeLabel = lang === 'ja' ? 'メニューを閉じる' : 'Close menu';
  const themeLabel = lang === 'ja' ? 'ライトモードに切り替え' : 'Switch to light mode';

  return `  <!-- Nav Header (sticky) -->
  <nav class="nav-header">
    <div class="nav-logotype">
      <a href="${homeHref}" class="nav-logo-text"><img src="${imagesPath}r-mark-dark.gif" width="50" height="50" alt="Raft Design" class="nav-logo-gif nav-logo-gif--dark">
          <img src="${imagesPath}r-mark-light.gif" width="50" height="50" alt="Raft Design" class="nav-logo-gif nav-logo-gif--light"></a>
    </div>
    <div class="nav-links">
${linkList('nav-link')}
      <button class="theme-toggle" id="theme-toggle" type="button" aria-label="${themeLabel}">${THEME_TOGGLE_SVG}
      </button>
${langBlock('')}
    </div>
    <button class="nav-hamburger" id="nav-hamburger" type="button" aria-label="${menuLabel}" aria-expanded="false" aria-controls="mobile-menu-overlay">
      ${HAMBURGER_SVG}
    </button>
  </nav>

  <!-- Mobile Menu Overlay -->
  <div class="mobile-menu-overlay" id="mobile-menu-overlay">
    <div class="mobile-menu-topbar">
      <span class="mobile-menu-logo"><img src="${imagesPath}r-mark-dark.gif" width="50" height="50" alt="Raft Design" class="nav-logo-gif nav-logo-gif--dark">
          <img src="${imagesPath}r-mark-light.gif" width="50" height="50" alt="Raft Design" class="nav-logo-gif nav-logo-gif--light"></span>
      <div class="mobile-menu-controls">
        <button class="theme-toggle" id="theme-toggle-mobile" type="button" aria-label="${themeLabel}">${THEME_TOGGLE_SVG}
        </button>
${langBlock('')}
        <button class="mobile-menu-close" id="mobile-menu-close" type="button" aria-label="${closeLabel}">
          ${CLOSE_SVG}
        </button>
      </div>
    </div>
    <nav class="mobile-menu-links">
${linkList('mobile-menu-link')}
    </nav>
  </div>`;
}

function footer(lang, imagesPath) {
  const office = lang === 'ja'
    ? { city: 'ハリウッド', region: 'ロサンゼルス、カリフォルニア州', office: '所在地', contact: '連絡先', social: 'ソーシャル' }
    : { city: 'Hollywood', region: 'Los Angeles, CA', office: 'OFFICE', contact: 'CONTACT', social: 'SOCIAL' };
  const colophon = lang === 'ja' ? '手で設計し、AIで実装。' : 'Designed by hand. Built by AI.';
  return `  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <p class="footer-mark-raft">RAFT</p>
        <p class="footer-mark-design">DESIGN</p>
      </div>
      <div class="footer-text">
        <div class="footer-column">
          <div class="footer-group">
            <p class="footer-heading">${office.office}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=Hollywood%2C+Los+Angeles%2C+CA" target="_blank" rel="noopener noreferrer" class="footer-link-block">
              <p>${office.city}</p>
              <p>${office.region}</p>
            </a>
          </div>
          <div class="footer-group">
            <p class="footer-heading">${office.contact}</p>
            <div class="footer-links">
              <a href="tel:4153619584" class="footer-link">(415) 361-9584</a>
              <a href="mailto:hello@raftdesign.studio" class="footer-link">hello@raftdesign.studio</a>
            </div>
          </div>
        </div>
        <div class="footer-column">
          <div class="footer-group">
            <p class="footer-heading">${office.social}</p>
            <div class="footer-links">
              <a href="https://www.linkedin.com/company/raftdesignstudio/" class="footer-link">LinkedIn</a>
              <a href="https://x.com/raftdesignco" class="footer-link">Twitter</a>
              <a href="https://www.instagram.com/raftdesignstudio" class="footer-link">Instagram</a>
              <a href="https://note.com/raftdesign" class="footer-link">Note</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="footer-colophon">${colophon}<span>|</span>
      <span class="footer-llm-icons">
        <svg class="footer-llm-icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Anthropic" role="img">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4.12038 13.9606L8.25037 11.6445L8.32037 11.4433L8.25037 11.3312H8.05L7.35875 11.2893L4.998 11.2254L2.95137 11.1405L0.968625 11.0337L0.469 10.9279L0 10.311L0.048125 10.003L0.468125 9.72213L1.06837 9.77462L2.39837 9.86475L4.39163 10.003L5.83713 10.0879L7.98 10.311H8.32037L8.3685 10.1736L8.25125 10.0879L8.16112 10.003L6.09787 8.6065L3.86487 7.1295L2.69588 6.279L2.06238 5.84937L1.74388 5.44513L1.60563 4.56313L2.17962 3.93138L2.9505 3.98387L3.14737 4.03725L3.92875 4.6375L5.59825 5.929L7.77787 7.53288L8.09725 7.79888L8.22413 7.70875L8.24075 7.64488L8.09725 7.40513L6.91163 5.26488L5.64638 3.08612L5.08288 2.18312L4.93412 1.6415C4.87745 1.43347 4.84688 1.2192 4.84312 1.00362L5.49762 0.11725L5.859 0L6.7305 0.11725L7.098 0.43575L7.6405 1.673L8.51725 3.62337L9.87787 6.27463L10.2769 7.06038L10.4895 7.78838L10.5691 8.0115H10.7074V7.88375L10.8194 6.391L11.0268 4.55788L11.228 2.19975L11.298 1.53475L11.627 0.7385L12.2806 0.308L12.7916 0.553L13.2116 1.15238L13.153 1.54088L12.9028 3.1605L12.4136 5.70062L12.0951 7.39987H12.2806L12.4932 7.18813L13.3551 6.04537L14.8006 4.23937L15.4394 3.52188L16.1831 2.73088L16.6617 2.35375H17.5656L18.2306 3.34163L17.9331 4.36188L17.0021 5.5405L16.2312 6.53975L15.1252 8.02725L14.434 9.21725L14.4979 9.3135L14.6624 9.296L17.1614 8.76575L18.5115 8.52075L20.1224 8.24513L20.8512 8.58462L20.9309 8.93025L20.6439 9.63637L18.921 10.0616L16.9006 10.4659L13.8915 11.1773L13.8547 11.2035L13.8976 11.2569L15.253 11.3846L15.8322 11.4161H17.2515L19.894 11.613L20.5852 12.0697L21 12.628L20.9309 13.0524L19.8677 13.5949L18.4327 13.2545L15.0824 12.4582L13.9344 12.1704H13.7751V12.2666L14.7315 13.2011L16.4867 14.7849L18.6821 16.8236L18.7933 17.3294L18.5115 17.7275L18.214 17.6846L16.2846 16.2348L15.54 15.5811L13.8547 14.1636H13.7428V14.3124L14.1312 14.8803L16.1831 17.9611L16.2899 18.9061L16.1411 19.215L15.6091 19.4014L15.0246 19.2946L13.8224 17.6102L12.5842 15.7141L11.5841 14.014L11.4616 14.084L10.8719 20.4313L10.5954 20.755L9.9575 21L9.42637 20.5966L9.14463 19.943L9.42637 18.6515L9.76675 16.968L10.0424 15.6292L10.2926 13.9667L10.4414 13.4137L10.4309 13.377L10.3084 13.3927L9.05363 15.1139L7.14612 17.6908L5.63587 19.3051L5.27362 19.4486L4.64625 19.1249L4.70487 18.5456L5.05575 18.0303L7.14525 15.3737L8.40525 13.727L9.219 12.7768L9.21375 12.6385H9.16563L3.6155 16.24L2.62675 16.3677L2.20063 15.9688L2.254 15.316L2.45612 15.1034L4.12563 13.9554L4.12038 13.9606Z" fill="currentColor"/>
        </svg>
        <svg class="footer-llm-icon" width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="OpenAI" role="img">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.4379 7.64359V5.64838C8.4379 5.48064 8.5039 5.35439 8.6561 5.27053L12.8205 2.96103C13.3879 2.64586 14.0635 2.49931 14.7611 2.49931C17.3773 2.49931 19.0346 4.45214 19.0346 6.53033C19.0346 6.67776 19.0346 6.8455 19.0126 7.01324L14.6951 4.5775C14.5778 4.50562 14.4417 4.46744 14.3028 4.46744C14.1638 4.46744 14.0277 4.50562 13.9104 4.5775L8.4379 7.64359ZM18.1628 15.4125V10.647C18.1628 10.353 18.0318 10.1438 17.7696 9.99634L12.2971 6.93026L14.0846 5.94325C14.1494 5.9022 14.2252 5.88032 14.3028 5.88032C14.3803 5.88032 14.4561 5.9022 14.5209 5.94325L18.6853 8.25363C19.8853 8.92458 20.6919 10.353 20.6919 11.7391C20.6919 13.3352 19.7111 14.8051 18.1619 15.4143L18.1628 15.4125ZM7.1518 11.2147L5.3643 10.2065C5.2113 10.1226 5.1453 9.99634 5.1453 9.8286V5.20784C5.1453 2.96103 6.9328 1.25981 9.3537 1.25981C10.2703 1.25981 11.1201 1.55379 11.8397 2.07908L7.5442 4.47333C7.2829 4.61988 7.1518 4.82999 7.1518 5.12398V11.2138V11.2147ZM11 13.3555L8.4379 11.9695V9.02964L11 7.64359L13.5621 9.02964V11.9695L11 13.3555ZM12.6463 19.7384C11.7297 19.7384 10.8799 19.4453 10.1603 18.92L14.4558 16.5258C14.7171 16.3792 14.8482 16.1691 14.8482 15.8751V9.78534L16.6577 10.7935C16.8108 10.8774 16.8758 11.0037 16.8758 11.1714V15.7913C16.8758 18.0381 15.0663 19.7384 12.6463 19.7384ZM7.4791 15.0568L3.3138 12.7464C2.1148 12.0745 1.3081 10.647 1.3081 9.26094C1.3053 8.47338 1.5465 7.70293 2.001 7.0482C2.4555 6.39346 3.1025 5.88424 3.8592 5.5857V10.3733C3.8592 10.6673 3.9903 10.8774 4.2515 11.0248L9.7029 14.0697L7.9154 15.0568C7.8507 15.0979 7.7748 15.1199 7.6973 15.1199C7.6197 15.1199 7.5438 15.0979 7.4791 15.0568ZM7.2389 18.4998C4.7749 18.4998 2.9654 16.7156 2.9654 14.5103C2.9654 14.3425 2.9874 14.1748 3.0085 14.0071L7.304 16.3995C7.5662 16.547 7.8274 16.547 8.0887 16.3995L13.5612 13.3555V15.3507C13.5612 15.5185 13.497 15.6447 13.3439 15.7286L9.1795 18.0381C8.6121 18.3533 7.9365 18.4998 7.2389 18.4998ZM12.6463 20.9982C13.9027 20.9983 15.1205 20.5805 16.0938 19.8154C17.0671 19.0503 17.7361 17.9849 17.9877 16.7995C20.4297 16.1903 22 13.9841 22 11.7382C22 10.2683 21.3464 8.84071 20.1685 7.81133C20.2776 7.36991 20.3427 6.92937 20.3427 6.48884C20.3427 3.48632 17.8136 1.23862 14.8922 1.23862C14.3037 1.23862 13.7372 1.32249 13.1688 1.5123C12.1513 0.547719 10.7823 0.00491616 9.3546 5.67147e-09C8.0981 -5.62172e-05 6.8802 0.417904 5.9069 1.18317C4.9335 1.94843 4.2646 3.01402 4.0132 4.19965C1.5702 4.8088 0 7.01412 0 9.26094C0 10.7317 0.6536 12.1593 1.8315 13.1878C1.7224 13.6292 1.6573 14.0706 1.6573 14.5112C1.6573 17.5137 4.1864 19.7605 7.1078 19.7605C7.6963 19.7605 8.2628 19.6766 8.8312 19.4877C9.8488 20.4527 11.2183 20.9955 12.6463 21V20.9982Z" fill="currentColor"/>
        </svg>
        <svg class="footer-llm-icon" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Lovable" role="img">
          <path d="M6.3012 0C9.7802 0 12.6016 2.78163 12.6016 6.2125V8.575H14.6988C18.1777 8.575 21 11.3557 21 14.7875C21 18.2201 18.1795 21 14.6988 21H0V6.2125C0 2.7825 2.8205 0 6.3012 0Z" fill="currentColor"/>
        </svg>
      </span>
    </p>
  </footer>`;
}

const BOTTOM_SCRIPT = `  <script>
    // Theme toggle — persisted via localStorage, default is dark (no
    // data-theme attribute). The head script above applies a stored
    // 'light' preference before first paint to avoid a flash of dark.
    (function() {
      const toggles = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
      if (!toggles.length) return;
      const initiallyLight = document.documentElement.dataset.theme === 'light';
      toggles.forEach(t => t.setAttribute('aria-label', initiallyLight ? 'Switch to dark mode' : 'Switch to light mode'));
      toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
          const isLight = document.documentElement.dataset.theme === 'light';
          const next = isLight ? 'dark' : 'light';
          if (next === 'dark') {
            delete document.documentElement.dataset.theme;
          } else {
            document.documentElement.dataset.theme = 'light';
          }
          localStorage.setItem('raft-theme', next);
          toggles.forEach(t => t.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
        });
      });
    })();

    // Mobile menu — hamburger opens a full-screen overlay (nav links,
    // theme toggle, language switch); closes via the X icon, Escape, or
    // tapping a link.
    (function() {
      const hamburger = document.getElementById('nav-hamburger');
      const overlay = document.getElementById('mobile-menu-overlay');
      const closeBtn = document.getElementById('mobile-menu-close');
      if (!hamburger || !overlay) return;

      function openMenu() {
        overlay.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }
      function closeMenu() {
        overlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', openMenu);
      closeBtn.addEventListener('click', closeMenu);
      overlay.querySelectorAll('.mobile-menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && overlay.classList.contains('open')) closeMenu();
      });
    })();
  </script>`;

const GTAG_SNIPPET = `  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-RW873N0SWM"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-RW873N0SWM');
  </script>`;

const THEME_HEAD_SCRIPT = `  <script>
    if (localStorage.getItem('raft-theme') === 'light') {
      document.documentElement.dataset.theme = 'light';
    }
  </script>`;

function fontLink(lang) {
  const jpWeights = lang === 'ja' ? '400;500;600;900' : '900';
  return `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,200;14..32,300;14..32,400;14..32,500;14..32,900&family=Noto+Sans+JP:wght@${jpWeights}&family=Fraunces:ital,opsz,SOFT,WONK,wght@0,9..144,0,1,600&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet">`;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Converts inline markdown — [text](url) links, <url> autolinks, and
// **bold** — inside a paragraph to real HTML tags, HTML-escaping
// everything else in the string.
function renderInline(raw) {
  const re = /\[([^\]]+)\]\(([^)]+)\)|<(https?:\/\/[^>]+)>|\*\*([^*]+)\*\*/g;
  let result = '';
  let lastIndex = 0;
  let m;
  while ((m = re.exec(raw))) {
    result += esc(raw.slice(lastIndex, m.index));
    if (m[1] !== undefined) {
      result += `<a href="${esc(m[2])}" target="_blank" rel="noopener noreferrer">${esc(m[1])}</a>`;
    } else if (m[3] !== undefined) {
      result += `<a href="${esc(m[3])}" target="_blank" rel="noopener noreferrer">${esc(m[3])}</a>`;
    } else if (m[4] !== undefined) {
      result += `<strong>${esc(m[4])}</strong>`;
    }
    lastIndex = re.lastIndex;
  }
  result += esc(raw.slice(lastIndex));
  return result;
}

// Renders one content item within a section: a plain string paragraph,
// an { h3 } subheading, or a { list } bullet list.
function renderContentItem(item) {
  if (typeof item === 'string') {
    return `          <p class="article-p">${renderInline(item)}</p>`;
  }
  if (item.h3) {
    return `          <h3 class="article-h3">${renderInline(item.h3)}</h3>`;
  }
  if (item.list) {
    const lis = item.list.map((li) => `            <li>${renderInline(li)}</li>`).join('\n');
    return `          <ul class="article-list">\n${lis}\n          </ul>`;
  }
  throw new Error(`Unrecognized content item: ${JSON.stringify(item)}`);
}

// The only two articles that form an actual series — prev/next nav and
// isPartOf schema are wired only between these two, in this order.
const UPSTREAM_SERIES = ['ai-native-designer-phase-one', 'stop-adding-ai-to-the-design-process'];
const UPSTREAM_SERIES_NAME = 'Upstream — The AI-Native Teams Series';

// Slugs excluded from regeneration by this script (see main()).
const PROTECTED_SLUGS = [];

function jsonLd(obj) {
  return `  <script type="application/ld+json">\n  ${JSON.stringify(obj, null, 2).split('\n').join('\n  ')}\n  </script>`;
}

function page({ lang, stylesPath, imagesPath, extraCss, head, journalHref, langSwitch, bodyMain }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${GTAG_SNIPPET}
    <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${head}
  <link rel="icon" type="image/png" href="${imagesPath}r-mark-favicon.png">
${fontLink(lang)}
  <link rel="stylesheet" href="${stylesPath}styles.css">
  <link rel="stylesheet" href="${stylesPath}work-index.css">
  <link rel="stylesheet" href="${stylesPath}journal.css">${extraCss || ''}
${THEME_HEAD_SCRIPT}
</head>
<body>

${nav(lang, imagesPath, journalHref, langSwitch)}

  <main>
${bodyMain}
  </main>

${footer(lang, imagesPath)}

${BOTTOM_SCRIPT}
</body>
</html>
`;
}

// ---------------------------------------------------------------------
// Journal index (EN + JA)
// ---------------------------------------------------------------------

function buildIndexPage(lang, articles) {
  const isJa = lang === 'ja';
  const stylesPath = isJa ? '../../' : '../';
  const imagesPath = isJa ? '../../images/' : '../images/';
  const url = isJa ? `${SITE}/ja/journal/` : `${SITE}/journal/`;
  const otherUrl = isJa ? `${SITE}/journal/` : `${SITE}/ja/journal/`;

  const title = isJa
    ? 'ジャーナル — デザインリーダーシップとAIネイティブな実践 | Raft Design'
    : 'Journal — Design Leadership & AI-Native Practice | Raft Design';
  const description = isJa
    ? 'デザインで導く、ということ。デザインの実践が、働き方の未来と交わる場所。Raft Design創業者ランス・シールズによるエッセイ。'
    : 'Leading through design. Where the practice of design meets the future of how we work — essays from Raft Design founder Lance Shields.';
  const heroTitle = 'Journal';
  const heroSub = isJa
    ? 'デザインで導く、ということ。<br aria-hidden>デザインの実践が、働き方の未来と交わる場所。'
    : 'Leading through design.<br aria-hidden>Where the practice of design meets the future of how we work.';
  const readLabel = isJa ? '記事を読む' : 'Read on Substack';
  const ogImage = `${SITE}/images/${articles[0].image}`;

  const head = `  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${isJa ? 'ja_JP' : 'en_US'}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="alternate" hreflang="${isJa ? 'ja' : 'en'}" href="${url}">
  <link rel="alternate" hreflang="${isJa ? 'en' : 'ja'}" href="${otherUrl}">
  <link rel="alternate" hreflang="x-default" href="${SITE}/journal/">
  <link rel="canonical" href="${url}">
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Raft Design',
  url: isJa ? `${SITE}/ja/` : SITE,
  description: isJa
    ? '日米をまたいでブランド、プロダクト、デジタル体験を手がけるAIネイティブなスタジオ。'
    : 'AI-native studio working across the U.S. and Japan on brand, product, and digital experience.',
  ...(isJa ? { inLanguage: 'ja' } : {}),
  founder: { '@type': 'Person', name: 'Lance Shields' },
  areaServed: ['US', 'JP'],
  knowsLanguage: ['en', 'ja'],
  sameAs: [
    'https://www.linkedin.com/company/raftdesignstudio/',
    'https://x.com/raftdesignco',
    'https://www.instagram.com/raftdesignstudio',
    'https://note.com/raftdesign',
  ],
})}
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: heroTitle,
  url,
  inLanguage: isJa ? 'ja' : 'en',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: articles.map((a, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: isJa ? `${SITE}/ja/journal/${a.slug}/` : a.en.substackUrl,
      name: isJa ? a.ja.title : a.en.title,
    })),
  },
})}
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: isJa ? 'ホーム' : 'Home', item: isJa ? `${SITE}/ja/` : `${SITE}/` },
    { '@type': 'ListItem', position: 2, name: heroTitle, item: url },
  ],
})}`;

  const cardsHtml = [];
  for (let i = 0; i < articles.length; i += 2) {
    const pair = articles.slice(i, i + 2);
    const cardsInRow = pair.map((a) => {
      const t = isJa ? a.ja.title : a.en.title;
      const excerpt = isJa ? a.ja.excerpt : a.en.excerpt;
      const alt = isJa ? a.ja.thumbnailAlt : `Thumbnail for "${a.en.title}"`;
      const href = isJa ? `/ja/journal/${a.slug}/` : a.en.substackUrl;
      const linkAttrs = isJa ? '' : ' target="_blank" rel="noopener"';
      return `        <a href="${href}" class="journal-card"${linkAttrs}>
          <img class="journal-card-image" src="${imagesPath}${a.image}" width="${a.imageWidth}" height="${a.imageHeight}" alt="${esc(alt)}" loading="lazy">
          <p class="journal-card-title">${esc(t)}</p>
          <p class="journal-card-excerpt">${esc(excerpt)}</p>
          <p class="journal-card-link text-link"><span class="arrow">→</span> ${readLabel}</p>
        </a>`;
    }).join('\n');
    cardsHtml.push(`      <div class="journal-row">\n${cardsInRow}\n      </div>`);
  }

  const bodyMain = `    <div class="work-hero">
      <h1 class="work-hero-title">${heroTitle}</h1>
      <p class="work-hero-intro">${heroSub}</p>
    </div>

    <div class="journal-grid">
${cardsHtml.join('\n')}
    </div>`;

  const journalHref = isJa ? '/ja/journal/' : '/journal/';
  const langSwitch = isJa
    ? { otherHref: '/journal/', otherHreflang: 'en' }
    : { otherHref: '/ja/journal/', otherHreflang: 'ja' };

  const extraCss = isJa ? '\n  <link rel="stylesheet" href="../ja.css">' : '';

  return page({ lang, stylesPath, imagesPath, extraCss, head, journalHref, langSwitch, bodyMain });
}

// ---------------------------------------------------------------------
// Article page (JA only)
// ---------------------------------------------------------------------

function formatDateJa(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}.${m}.${d}`;
}

function buildArticlePage(article, allArticles) {
  const j = article.ja;
  const stylesPath = '../../../';
  const imagesPath = '../../../images/';
  const url = `${SITE}/ja/journal/${article.slug}/`;
  const title = `${j.title} | Raft Design ジャーナル`;
  const ogImage = `${SITE}/images/${article.image}`;

  const authorUrl = 'https://www.linkedin.com/in/lanceshields/';

  // isPartOf/series schema is scoped to just the two Upstream pieces.
  const seriesIndex = UPSTREAM_SERIES.indexOf(article.slug);
  const inSeries = seriesIndex !== -1;

  // Bottom-of-article prev/next nav is chronological across all articles
  // (allArticles is sorted newest-first) — "next" is the newer post,
  // "previous" is the older one. Not restricted to the series pair.
  const chronoIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const nextArticle = chronoIndex > 0 ? allArticles[chronoIndex - 1] : null;
  const prevArticle = chronoIndex < allArticles.length - 1 ? allArticles[chronoIndex + 1] : null;

  const head = `  <title>${esc(title)}</title>
  <meta name="description" content="${esc(j.excerpt)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(j.excerpt)}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="ja_JP">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(j.excerpt)}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${url}">
${prevArticle ? `  <link rel="prev" href="${SITE}/ja/journal/${prevArticle.slug}/">\n` : ''}${nextArticle ? `  <link rel="next" href="${SITE}/ja/journal/${nextArticle.slug}/">\n` : ''}${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: j.title,
  datePublished: article.date,
  image: ogImage,
  inLanguage: 'ja',
  author: { '@type': 'Person', name: j.author, sameAs: [authorUrl] },
  publisher: { '@type': 'Organization', name: 'Raft Design', url: `${SITE}/ja/` },
  mainEntityOfPage: url,
  ...(inSeries ? {
    isPartOf: { '@type': 'CreativeWorkSeries', name: UPSTREAM_SERIES_NAME, url: `${SITE}/ja/journal/` },
    position: seriesIndex + 1,
  } : {}),
})}
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: j.author,
  sameAs: [authorUrl],
})}
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Raft Design',
  url: `${SITE}/ja/`,
  description: '日米をまたいでブランド、プロダクト、デジタル体験を手がけるAIネイティブなスタジオ。',
  inLanguage: 'ja',
  founder: { '@type': 'Person', name: 'Lance Shields' },
  areaServed: ['US', 'JP'],
  knowsLanguage: ['en', 'ja'],
  sameAs: [
    'https://www.linkedin.com/company/raftdesignstudio/',
    'https://x.com/raftdesignco',
    'https://www.instagram.com/raftdesignstudio',
    'https://note.com/raftdesign',
  ],
})}
${jsonLd({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'ホーム', item: `${SITE}/ja/` },
    { '@type': 'ListItem', position: 2, name: 'Journal', item: `${SITE}/ja/journal/` },
    { '@type': 'ListItem', position: 3, name: j.title, item: url },
  ],
})}`;

  const sectionsHtml = j.sections.map((s, i) => {
    const heading = s.heading ? `\n          <h2 class="article-h2">${esc(s.heading)}</h2>` : '';
    const paras = s.paragraphs.map(renderContentItem).join('\n');
    const cls = i === j.sections.length - 1 ? 'article-section article-section--last' : 'article-section';
    return `        <div class="${cls}">${heading}\n${paras}\n        </div>`;
  }).join('\n');

  const statBarHtml = j.stats && j.stats.length ? `
    <div class="stat-bar">
      <div class="stat-bar-inner">
${j.stats.map((s) => `        <div class="stat-bar-item">
          <p class="stat-bar-value">${esc(s.value)}</p>
          <p class="stat-bar-label">${esc(s.label)}</p>
        </div>`).join('\n')}
      </div>
    </div>` : '';

  const hasCitations = j.citations && j.citations.length;
  const authorCardHtml = hasCitations
    ? `      <div class="article-author-card">
        <div class="article-extras-row">
          <div class="article-citations-col">
            <p class="article-eyebrow">参考文献</p>
            <div class="article-citations-list">
${j.citations.map((c) => `              <p class="article-citation-item">${esc(c.name)}</p>`).join('\n')}
            </div>
          </div>
          <div class="article-author-col">
            <p class="article-eyebrow">著者について</p>
            <p class="article-author-name">${esc(j.author)}</p>
            <p class="article-author-bio">${esc(j.authorBio)}</p>
            <p class="article-author-link text-link"><a href="${authorUrl}" target="_blank" rel="noopener"><span class="arrow">→</span> LinkedInで</a></p>
          </div>
        </div>
      </div>`
    : `      <div class="article-author-card">
        <div class="article-author-row">
          <img class="article-author-avatar" src="${imagesPath}lance-shields.jpg" width="120" height="120" alt="${esc(j.author)}" loading="lazy">
          <div class="article-author-body">
            <p class="article-author-eyebrow">著者について</p>
            <p class="article-author-name">${esc(j.author)}</p>
            <p class="article-author-bio">${esc(j.authorBio)}</p>
            <p class="article-author-link text-link"><a href="${authorUrl}" target="_blank" rel="noopener"><span class="arrow">→</span> LinkedInで</a></p>
          </div>
        </div>
      </div>`;

  const bodyMain = `    <div class="article-hero">
      <div class="article-hero-inner">
        <div class="article-meta">
          <span>${formatDateJa(article.date)}</span>
          <span class="article-meta-divider" aria-hidden="true"></span>
          <span>${esc(j.author)}</span>
        </div>
        <h1 class="article-title">${esc(j.title)}</h1>
        <p class="article-subhead">${esc(j.subhead)}</p>
      </div>
      <img class="article-hero-image" src="${imagesPath}${article.image}" width="${article.imageWidth}" height="${article.imageHeight}" alt="${esc(j.heroImageAlt)}" loading="eager">
    </div>
${statBarHtml}
    <div class="article-body">
${sectionsHtml}
${authorCardHtml}
    </div>

    <nav class="article-nav" aria-label="記事ナビゲーション">
      ${prevArticle
        ? `<a href="/ja/journal/${prevArticle.slug}/" class="article-nav-link">← 前の記事</a>`
        : `<span class="article-nav-link article-nav-link--disabled">← 前の記事</span>`}
      ${nextArticle
        ? `<a href="/ja/journal/${nextArticle.slug}/" class="article-nav-link">次の記事 →</a>`
        : `<span class="article-nav-link article-nav-link--disabled">次の記事 →</span>`}
    </nav>`;

  const journalHref = '/ja/journal/';
  const langSwitch = {
    otherHref: article.en.substackUrl,
    otherHreflang: 'en',
    otherTarget: '_blank',
    otherRel: 'noopener',
  };

  const extraCss = '\n  <link rel="stylesheet" href="../../ja.css">';

  return page({ lang: 'ja', stylesPath, imagesPath, extraCss, head, journalHref, langSwitch, bodyMain });
}

// ---------------------------------------------------------------------
// Homepage Journal carousel (index.html, ja/index.html)
// ---------------------------------------------------------------------

const CAROUSEL_START = '<!-- JOURNAL_CAROUSEL:START -->';
const CAROUSEL_END = '<!-- JOURNAL_CAROUSEL:END -->';

function buildHomeCarousel(lang, articles) {
  const isJa = lang === 'ja';
  const imagesPath = isJa ? '../images/' : 'images/';
  const badge = 'JOURNAL';
  const viewAll = isJa ? 'すべての記事を見る →' : 'View all articles →';
  const viewAllHref = isJa ? '/ja/journal/' : '/journal/';
  const readLabel = isJa ? '記事を読む' : 'Read';
  const prevLabel = isJa ? '前の記事へ' : 'Previous articles';
  const nextLabel = isJa ? '次の記事へ' : 'Next articles';

  const cardsHtml = articles.map((a) => {
    const t = isJa ? a.ja.title : a.en.title;
    const alt = isJa ? a.ja.thumbnailAlt : `Thumbnail for "${a.en.title}"`;
    const href = isJa ? `/ja/journal/${a.slug}/` : a.en.substackUrl;
    const linkAttrs = isJa ? '' : ' target="_blank" rel="noopener"';
    return `          <a href="${href}" class="journal-carousel-card"${linkAttrs}>
            <div class="journal-carousel-card-image-wrap">
              <img class="journal-carousel-card-image" src="${imagesPath}${a.image}" width="${a.imageWidth}" height="${a.imageHeight}" alt="${esc(alt)}" loading="lazy">
            </div>
            <div class="journal-carousel-card-body">
              <p class="journal-carousel-card-title">${esc(t)}</p>
              <p class="journal-carousel-card-link">→ ${readLabel}</p>
            </div>
          </a>`;
  }).join('\n');

  return `${CAROUSEL_START}
    <section id="journal" class="journal-carousel-section">
      <div class="journal-carousel-header">
        <span class="journal-carousel-badge fade-in">${badge}</span>
        <div class="journal-carousel-controls fade-in">
          <a href="${viewAllHref}" class="journal-carousel-viewall">${viewAll}</a>
          <div class="journal-carousel-arrows">
            <button type="button" class="journal-carousel-arrow" data-carousel-prev aria-label="${prevLabel}">←</button>
            <button type="button" class="journal-carousel-arrow" data-carousel-next aria-label="${nextLabel}">→</button>
          </div>
        </div>
      </div>
      <div class="journal-carousel-track" data-carousel-track>
${cardsHtml}
      </div>
    </section>
    ${CAROUSEL_END}`;
}

function patchHomepage(filePath, lang, articles) {
  const content = fs.readFileSync(filePath, 'utf8');
  const startIdx = content.indexOf(CAROUSEL_START);
  const endIdx = content.indexOf(CAROUSEL_END);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error(`${filePath}: JOURNAL_CAROUSEL markers not found — insert them once by hand between Studio and FAQs.`);
  }
  const before = content.slice(0, startIdx);
  const after = content.slice(endIdx + CAROUSEL_END.length);
  const next = `${before}${buildHomeCarousel(lang, articles)}${after}`;
  fs.writeFileSync(filePath, next);
  console.log(`Patched Journal carousel into ${filePath}`);
}

// ---------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------

function main() {
  const files = fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'));
  const articles = files
    .map((f) => JSON.parse(fs.readFileSync(path.join(DATA_DIR, f), 'utf8')))
    .sort((a, b) => b.date.localeCompare(a.date));

  fs.mkdirSync(path.join(ROOT, 'journal'), { recursive: true });
  fs.mkdirSync(path.join(ROOT, 'ja', 'journal'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'journal', 'index.html'), buildIndexPage('en', articles));
  fs.writeFileSync(path.join(ROOT, 'ja', 'journal', 'index.html'), buildIndexPage('ja', articles));
  console.log('Wrote /journal/index.html and /ja/journal/index.html');

  for (const article of articles) {
    if (PROTECTED_SLUGS.includes(article.slug)) {
      console.log(`Skipped /ja/journal/${article.slug}/index.html (protected — left untouched)`);
      continue;
    }
    const dir = path.join(ROOT, 'ja', 'journal', article.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), buildArticlePage(article, articles));
    console.log(`Wrote /ja/journal/${article.slug}/index.html`);
  }

  patchHomepage(path.join(ROOT, 'index.html'), 'en', articles);
  patchHomepage(path.join(ROOT, 'ja', 'index.html'), 'ja', articles);
}

main();
