/* Raft Assistant — floating chat field + expandable panel.
   Vanilla JS port of the Claude Design canvas (Raft Chat.dc.html). No
   framework dependency — ported from the canvas's DCLogic component so it
   can drop into the plain HTML/CSS/JS site build later. Scripted Q&A only;
   there is no live model behind this, same as the source design. */

(function () {
  'use strict';

  var SCRIPT = [
    {
      q: 'What does Raft actually do?',
      a: "Brand, product, and digital experience, usually all three inside the same engagement. Strategy, design, and build happen together rather than getting handed off in sequence. Twenty years of design leadership at Adobe and Walmart sits behind it, plus brand and product work with LegalOn, Visa, Hitachi, and Red Bull.",
      next: ['Show me the AI product work', 'Do you work in Japanese?', 'I have a project in mind']
    },
    {
      q: 'Show me the AI product work',
      a: "Two are worth your time. LegalOn's AI brand platform carries seven products under one identity. Adobe Express Photos was 0-to-1 AI product design: one-click editing for people who don't edit.",
      projects: [
        { image: 'Modular-2.webp', name: "LegalOn's AI Brand Platform", subtitle: 'Global brand & product platform', href: '../projects/legalon/' },
        { image: 'Harmony-thumbnail-01.webp', name: 'Adobe Express Photos', subtitle: '0-to-1 AI product design', href: '../projects/adobe-express-photos/' }
      ],
      next: ['How does the build part work?', 'Do you work in Japanese?', 'I have a project in mind']
    },
    {
      q: 'Do you work in Japanese?',
      a: "Natively, in both directions, with design leadership across the U.S. and Japan. For Japanese companies expanding abroad, or global brands entering Japan, meaning gets rebuilt for the new market rather than translated. That is the harder half of the work.",
      next: ['Show me the AI product work', 'I have a project in mind']
    },
    {
      q: 'How does the build part work?',
      a: "Design goes through to functioning software, not static screens for someone else to build. Prototypes behave like the real thing, so they can be tested and demoed. The build is directed, not just delegated.",
      next: ['Show me the AI product work', 'I have a project in mind']
    },
    {
      q: 'I have a project in mind',
      a: "Good. Two things tell me where to point you: what stage the work is at, and whether it is brand, product, or both. You can also skip ahead and send it straight to Lance.",
      cta: true,
      next: ['We are pre-launch, brand first', 'Existing product, AI features']
    },
    {
      q: 'We are pre-launch, brand first',
      a: "Then the first pass is positioning and identity before any interface work. Pre-launch teams usually have the engineering moving and no brand people stay for. Send the details and Lance will come back with how a first phase would be shaped.",
      cta: true,
      next: ['Show me the AI product work']
    },
    {
      q: 'Existing product, AI features',
      a: "That work starts with trust: what the model does, what the interface promises, and where people decide to come back. Adobe Express Photos and the LegalOn platform are the closest references.",
      projects: [
        { image: 'legalon-hero.jpg', name: 'LegalOn AI suite', subtitle: 'Seven products, one identity', href: '../projects/legalon/' }
      ],
      cta: true,
      next: ['How does the build part work?']
    }
  ];

  var OPENERS = ['What does Raft actually do?', 'Show me the AI product work', 'Do you work in Japanese?', 'I have a project in mind'];

  var FALLBACK = "Short version: Raft is an AI-native studio working on brand, product, and digital experience across the U.S. and Japan. Ask about the projects, the approach, or send the details and Lance will pick it up himself.";

  var MIC_ICON = '<svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 1.5a3 3 0 0 1 3 3v4.5a3 3 0 0 1-6 0V4.5a3 3 0 0 1 3-3Z"></path><path d="M14 9a6 6 0 0 1-12 0"></path><path d="M8 15v3.5"></path></svg>';
  var SEND_ICON = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15.5V3"></path><path d="M3.5 8.5 9 3l5.5 5.5"></path></svg>';

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function RaftChat(root, opts) {
    opts = opts || {};
    this.root = root;
    this.assetsBase = opts.assetsBase || './assets/';
    this.avatarSrc = opts.avatarSrc || './assets/r-mark-dark.gif';
    this.placeholder = opts.placeholder || 'Ask me anything about Raft...';
    this.showMic = opts.showMic !== false;
    this.onCta = typeof opts.onCta === 'function' ? opts.onCta : this.defaultCta.bind(this);

    this.state = { mode: 'rest', draft: '', messages: [], thinking: false, followUps: OPENERS.slice(), busy: false };
    this.timers = [];
    this.nextId = 1;

    this.build();
    this.bind();
    this.render();
  }

  RaftChat.prototype.defaultCta = function () {
    window.location.href = 'mailto:hello@raftdesign.studio';
  };

  RaftChat.prototype.after = function (ms, fn) {
    var t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  };

  RaftChat.prototype.clearTimers = function () {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  };

  RaftChat.prototype.setupSpeech = function (SpeechRecognitionImpl) {
    var self = this;
    var recognition = new SpeechRecognitionImpl();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    var finalTranscript = '';
    var listening = false;

    var setListening = function (val) {
      listening = val;
      self.micBtn.classList.toggle('raft-chat-mic--listening', val);
    };

    recognition.onstart = function () {
      finalTranscript = '';
      setListening(true);
      if (self.state.mode === 'rest') self.setState({ mode: 'focus' });
    };

    recognition.onresult = function (e) {
      var interim = '';
      for (var i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalTranscript += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      self.setState({ draft: (finalTranscript + interim).trim() });
    };

    recognition.onerror = function () {
      setListening(false);
    };

    recognition.onend = function () {
      setListening(false);
      var text = finalTranscript.trim();
      if (text) self.send(text);
    };

    this.micBtn.addEventListener('click', function () {
      if (listening) {
        recognition.stop();
      } else {
        try { recognition.start(); } catch (err) { /* already started */ }
      }
    });
  };

  RaftChat.prototype.build = function () {
    this.scrim = el('div', { class: 'raft-chat-scrim' });

    this.dock = el('div', { class: 'raft-chat-dock' });

    this.panel = el('div', { class: 'raft-chat-panel' });
    var panelInner = el('div', { class: 'raft-chat-panel-inner' });

    var header = el('div', { class: 'raft-chat-header' });
    var headerId = el('div', { class: 'raft-chat-header-id' });
    this.avatar = el('img', { class: 'raft-chat-avatar', src: this.avatarSrc, alt: '', width: '22', height: '22' });
    var label = el('p', { class: 'raft-chat-label' }, 'Raft assistant');
    headerId.appendChild(this.avatar);
    headerId.appendChild(label);
    this.closeBtn = el('button', { type: 'button', class: 'raft-chat-close', 'aria-label': 'Close' }, '&#10005;');
    header.appendChild(headerId);
    header.appendChild(this.closeBtn);

    this.messagesEl = el('div', { class: 'raft-chat-messages' });

    panelInner.appendChild(header);
    panelInner.appendChild(this.messagesEl);
    this.panel.appendChild(panelInner);

    var inputWrap = el('div', { class: 'raft-chat-input-wrap' });
    var inputInner = el('div', { class: 'raft-chat-input-inner' });

    this.chipsWrap = el('div', { class: 'raft-chat-chips-wrap' });
    this.chipsEl = el('div', { class: 'raft-chat-chips' });
    this.chipsWrap.appendChild(this.chipsEl);

    this.form = el('form', { class: 'raft-chat-form' });
    this.input = el('input', {
      type: 'text', class: 'raft-chat-input', placeholder: this.placeholder, autocomplete: 'off'
    });
    this.form.appendChild(this.input);
    var SpeechRecognitionImpl = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (this.showMic && SpeechRecognitionImpl) {
      this.micBtn = el('button', { type: 'button', class: 'raft-chat-mic', 'aria-label': 'Voice input' }, MIC_ICON);
      this.form.appendChild(this.micBtn);
      this.setupSpeech(SpeechRecognitionImpl);
    }
    var sendBtn = el('button', { type: 'submit', class: 'raft-chat-send', 'aria-label': 'Send' }, SEND_ICON);
    this.form.appendChild(sendBtn);

    inputInner.appendChild(this.chipsWrap);
    inputInner.appendChild(this.form);
    inputWrap.appendChild(inputInner);

    this.dock.appendChild(this.panel);
    this.dock.appendChild(inputWrap);

    this.root.appendChild(this.scrim);
    this.root.appendChild(this.dock);
  };

  RaftChat.prototype.bind = function () {
    var self = this;
    this.scrim.addEventListener('click', function () { self.collapse(); });
    this.closeBtn.addEventListener('click', function () { self.collapse(); });
    this.input.addEventListener('focus', function () {
      if (self.state.mode === 'rest') self.setState({ mode: 'focus' });
    });
    this.input.addEventListener('input', function (e) {
      self.setState({ draft: e.target.value });
    });
    this.form.addEventListener('submit', function (e) {
      e.preventDefault();
      self.send(self.state.draft);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && self.state.mode !== 'rest') self.collapse();
    });
  };

  RaftChat.prototype.setState = function (patch) {
    Object.assign(this.state, patch);
    this.render();
  };

  RaftChat.prototype.collapse = function () {
    this.clearTimers();
    this.setState({ mode: 'rest', thinking: false, busy: false, draft: '' });
  };

  RaftChat.prototype.answerFor = function (text) {
    var t = text.trim().toLowerCase();
    var exact = SCRIPT.filter(function (s) { return s.q.toLowerCase() === t; })[0];
    if (exact) return exact;
    if (t.length > 6) {
      var partial = SCRIPT.filter(function (s) { return s.q.toLowerCase().indexOf(t) !== -1; })[0];
      if (partial) return partial;
    }
    return null;
  };

  RaftChat.prototype.send = function (text) {
    var self = this;
    if (!text.trim() || this.state.busy) return;
    var entry = this.answerFor(text);
    var id = this.nextId++;

    this.setState({
      mode: 'open', busy: true, draft: '', thinking: true, followUps: [],
      messages: this.state.messages.concat({ id: id, isUser: true, text: text.trim() })
    });

    this.after(900, function () {
      var full = entry ? entry.a : FALLBACK;
      var words = full.split(' ');
      var botId = self.nextId++;

      self.setState({
        thinking: false,
        messages: self.state.messages.concat({
          id: botId, isBot: true, text: words[0],
          hasProjects: false, projects: entry && entry.projects ? entry.projects : [], hasCta: false
        })
      });

      var step = function (i) {
        if (i >= words.length) {
          self.setState({
            busy: false,
            followUps: entry ? entry.next : OPENERS.slice(0, 3),
            messages: self.state.messages.map(function (m) {
              return m.id === botId ? Object.assign({}, m, { hasProjects: !!(entry && entry.projects), hasCta: !!(entry && entry.cta) }) : m;
            })
          });
          return;
        }
        self.after(26, function () {
          self.setState({
            messages: self.state.messages.map(function (m) {
              return m.id === botId ? Object.assign({}, m, { text: m.text + ' ' + words[i] }) : m;
            })
          });
          step(i + 1);
        });
      };
      step(1);
    });
  };

  RaftChat.prototype.ask = function (text) {
    var self = this;
    if (this.state.busy) return;
    this.setState({ mode: 'open', draft: '', busy: true });
    var type = function (i) {
      if (i > text.length) {
        self.after(320, function () { self.setState({ busy: false }); self.send(text); });
        return;
      }
      self.after(i === 0 ? 120 : 16, function () {
        self.setState({ draft: text.slice(0, i) });
        type(i + 1);
      });
    };
    type(0);
  };

  RaftChat.prototype.renderMessage = function (m) {
    if (m.isUser) {
      var wrap = el('div', { class: 'raft-chat-msg--user' });
      var bubble = el('p', { class: 'raft-chat-bubble--user' });
      bubble.textContent = m.text;
      wrap.appendChild(bubble);
      return wrap;
    }

    var botWrap = el('div', { class: 'raft-chat-msg--bot' });
    botWrap.appendChild(el('span', { class: 'raft-chat-bot-arrow' }, '&#8594;'));
    var content = el('div', { class: 'raft-chat-bot-content' });
    var text = el('p', { class: 'raft-chat-bot-text' });
    text.textContent = m.text;
    content.appendChild(text);

    if (m.hasProjects && m.projects && m.projects.length) {
      var self = this;
      var projects = el('div', { class: 'raft-chat-projects' });
      m.projects.forEach(function (p) {
        var card = el('a', { class: 'raft-chat-project-card', href: p.href || '#' });
        var thumb = el('div', { class: 'raft-chat-project-thumb' });
        thumb.style.backgroundImage = 'url(' + self.assetsBase + p.image + ')';
        var body = el('div');
        var name = el('p', { class: 'raft-chat-project-name' });
        name.textContent = p.name;
        var sub = el('p', { class: 'raft-chat-project-sub' });
        sub.textContent = p.subtitle;
        body.appendChild(name);
        body.appendChild(sub);
        var go = el('p', { class: 'raft-chat-project-go' }, 'See project &#8594;');
        card.appendChild(thumb);
        card.appendChild(body);
        card.appendChild(go);
        projects.appendChild(card);
      });
      content.appendChild(projects);
    }

    if (m.hasCta) {
      var self2 = this;
      var cta = el('button', { type: 'button', class: 'raft-chat-cta' }, 'Send a message');
      cta.addEventListener('click', function () { self2.onCta(); });
      content.appendChild(cta);
    }

    botWrap.appendChild(content);
    return botWrap;
  };

  RaftChat.prototype.render = function () {
    var s = this.state;
    var open = s.mode === 'open';

    this.dock.setAttribute('data-mode', s.mode);
    this.scrim.setAttribute('data-active', s.mode);

    this.messagesEl.innerHTML = '';
    var self = this;
    s.messages.forEach(function (m) { self.messagesEl.appendChild(self.renderMessage(m)); });

    if (s.thinking) {
      var thinking = el('div', { class: 'raft-chat-thinking' });
      thinking.appendChild(el('span', { class: 'raft-chat-thinking-arrow' }, '&#8594;'));
      var dots = el('div', { class: 'raft-chat-thinking-dots' });
      dots.appendChild(el('span', { class: 'raft-chat-dot' }));
      dots.appendChild(el('span', { class: 'raft-chat-dot' }));
      dots.appendChild(el('span', { class: 'raft-chat-dot' }));
      thinking.appendChild(dots);
      this.messagesEl.appendChild(thinking);
    }

    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;

    var chipLabels = open ? s.followUps : OPENERS;
    var chipsVisible = s.mode === 'focus' || (open && s.followUps.length > 0 && !s.thinking);
    this.chipsWrap.setAttribute('data-visible', String(chipsVisible));
    this.chipsEl.innerHTML = '';
    chipLabels.forEach(function (label) {
      var chip = el('button', { type: 'button', class: 'raft-chat-chip' });
      chip.textContent = label;
      chip.addEventListener('click', function () { self.ask(label); });
      self.chipsEl.appendChild(chip);
    });
    // Measured, not fixed: chips can wrap to 2+ rows at the narrower 650px
    // width, so a hardcoded single-row height would clip the wrapped rows.
    this.chipsWrap.style.height = chipsVisible ? this.chipsEl.offsetHeight + 'px' : '0px';

    if (this.input.value !== s.draft) this.input.value = s.draft;
  };

  window.RaftChat = RaftChat;
})();
