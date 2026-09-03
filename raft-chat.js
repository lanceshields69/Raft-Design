/* Ishmael — Raft Design's live chatbot, floating field + expandable panel.
   Backend: POST /api/chat (Anthropic Messages API server-side, system
   prompt in api/system-prompt.js, generated verbatim from
   raft-chatbot-system-prompt.md). No scripted Q&A here anymore — every
   reply, chip set, and contact-form summary comes from the live model.
   UI/interaction shell (typing reveal, thinking dots, bubbles, scroll,
   speech-to-text) is unchanged from the original Claude Design port. */

(function () {
  'use strict';

  var OPENERS = ['What does Raft actually do?', 'Show me the work', 'Do you work in Japanese?', 'I have a project in mind'];

  var NETWORK_ERROR_REPLY = {
    reply: "Lost the connection there. Try again, or reach Lance directly.",
    chips: OPENERS.slice(0, 3),
    cta: true,
    summary: { working_on: '', blocker: '', looking_for: '' }
  };

  var MIC_ICON = '<svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"><path d="M8 1.5a3 3 0 0 1 3 3v4.5a3 3 0 0 1-6 0V4.5a3 3 0 0 1 3-3Z"></path><path d="M14 9a6 6 0 0 1-12 0"></path><path d="M8 15v3.5"></path></svg>';
  var SEND_ICON = '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15.5V3"></path><path d="M3.5 8.5 9 3l5.5 5.5"></path></svg>';

  var SUMMARY_LABELS = [
    ['working_on', "What you're working on"],
    ['blocker', "What seems to be getting in the way"],
    ['looking_for', "What you're looking for"]
  ];

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function formatSummary(summary) {
    if (!summary) return '';
    return SUMMARY_LABELS
      .map(function (pair) { return summary[pair[0]] ? pair[1] + ': ' + summary[pair[0]] : null; })
      .filter(Boolean)
      .join('\n');
  }

  function RaftChat(root, opts) {
    opts = opts || {};
    this.root = root;
    this.apiUrl = opts.apiUrl || '/api/chat';
    this.placeholder = opts.placeholder || 'Ask me anything about Raft...';
    this.showMic = opts.showMic !== false;
    this.onCta = typeof opts.onCta === 'function' ? opts.onCta : this.defaultCta.bind(this);
    this.avatarSrc = opts.avatarSrc || 'images/Ishmael-avatar.svg';

    this.state = {
      mode: 'rest', draft: '', messages: [], thinking: false,
      followUps: OPENERS.slice(), busy: false, history: [], lastSummary: null
    };
    this.timers = [];
    this.nextId = 1;
    // render() rebuilds the whole message list from scratch on every
    // setState (including every ~26ms word-reveal tick), so a message's DOM
    // node is destroyed and recreated many times over its lifetime. Track
    // which ids have already played their entrance animation so it's only
    // applied once, on first render — otherwise the fade-in restarts every
    // tick and the text never reaches full opacity while "typing."
    this.enteredIds = {};

    this.build();
    this.bind();
    this.render();
    this.exposePrefillHook();
  }

  RaftChat.prototype.defaultCta = function () {
    window.location.href = 'mailto:hello@raftdesign.studio';
  };

  RaftChat.prototype.exposePrefillHook = function () {
    var self = this;
    window.raftChatPrefillSummary = function () {
      var field = document.getElementById('contact-message');
      if (!field) return;
      var text = formatSummary(self.state.lastSummary);
      if (text) field.value = text;
    };
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
    this.avatar = el('img', { class: 'raft-chat-avatar', src: this.avatarSrc, alt: '', width: '25', height: '25' });
    var label = el('p', { class: 'raft-chat-label' }, 'Ishmael');
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

  RaftChat.prototype.fetchReply = function (text, historyBeforeThisTurn) {
    var self = this;
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timeout = controller ? this.after(20000, function () { controller.abort(); }) : null;

    return fetch(this.apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: historyBeforeThisTurn }),
      signal: controller ? controller.signal : undefined
    })
      .then(function (res) {
        if (timeout) clearTimeout(timeout);
        if (!res.ok) throw new Error('bad status ' + res.status);
        return res.json();
      })
      .catch(function () {
        return NETWORK_ERROR_REPLY;
      });
  };

  RaftChat.prototype.send = function (text) {
    var self = this;
    text = text.trim();
    if (!text || this.state.busy) return;
    var id = this.nextId++;
    // Snapshot history as it stood BEFORE this turn — the server appends the
    // current message itself (`[...history, {role:'user', content:message}]`),
    // so state.history must not already contain it or the newest turn gets
    // sent twice.
    var historyBeforeThisTurn = this.state.history;

    this.setState({
      mode: 'open', busy: true, draft: '', thinking: true, followUps: [],
      messages: this.state.messages.concat({ id: id, isUser: true, text: text })
    });

    this.fetchReply(text, historyBeforeThisTurn).then(function (data) {
      // The response is already complete when it arrives — this is a
      // client-side staged reveal over static text, not real token
      // streaming. Line-by-line (paragraph-by-paragraph) rather than
      // word-by-word: far fewer re-renders over the reveal's lifetime, and
      // each line's fade-in is tracked as entered-once (see renderMessage),
      // so — unlike the old word-by-word version — a line can't get caught
      // mid-animation and left translucent by an unrelated re-render.
      var full = data.reply || '';
      var lines = full.split(/\n{2,}/).filter(function (p) { return p.length; });
      if (!lines.length) lines = [''];
      var botId = self.nextId++;

      self.setState({
        thinking: false,
        messages: self.state.messages.concat({
          id: botId, isBot: true, text: full, revealedLines: 0, hasCta: false, projects: [], journal: []
        })
      });

      var stepLine = function (i) {
        var isLast = i + 1 >= lines.length;
        var patch = {
          messages: self.state.messages.map(function (m) {
            if (m.id !== botId) return m;
            var next = Object.assign({}, m, { revealedLines: i + 1 });
            if (isLast) {
              next.hasCta = !!data.cta;
              next.projects = Array.isArray(data.projects) ? data.projects : [];
              next.journal = Array.isArray(data.journal) ? data.journal : [];
            }
            return next;
          })
        };
        if (isLast) {
          patch.busy = false;
          patch.followUps = Array.isArray(data.chips) && data.chips.length ? data.chips : OPENERS.slice(0, 3);
          patch.lastSummary = data.summary || self.state.lastSummary;
          patch.history = historyBeforeThisTurn.concat(
            { role: 'user', content: text },
            { role: 'assistant', content: full }
          );
        }
        self.setState(patch);
        if (!isLast) self.after(350, function () { stepLine(i + 1); });
      };
      stepLine(0);
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
    var isFirstRender = !this.enteredIds[m.id];
    if (isFirstRender) this.enteredIds[m.id] = true;
    var enterClass = isFirstRender ? ' raft-chat-msg--enter' : '';

    if (m.isUser) {
      var wrap = el('div', { class: 'raft-chat-msg--user' + enterClass });
      var bubble = el('p', { class: 'raft-chat-bubble--user' });
      bubble.textContent = m.text;
      wrap.appendChild(bubble);
      return wrap;
    }

    var botWrap = el('div', { class: 'raft-chat-msg--bot' + enterClass });
    botWrap.appendChild(el('span', { class: 'raft-chat-bot-arrow' }, '&#8594;'));
    var content = el('div', { class: 'raft-chat-bot-content' });

    var paragraphs = m.text.split(/\n{2,}/).filter(function (p) { return p.length; });
    if (!paragraphs.length) paragraphs = [''];
    var revealCount = typeof m.revealedLines === 'number' ? m.revealedLines : paragraphs.length;
    var self3 = this;
    paragraphs.slice(0, revealCount).forEach(function (para, idx) {
      // Each line's fade-in is tracked as entered-once, keyed by message id
      // + line index — a re-render (e.g. the next line arriving) must not
      // restart an already-settled line's animation, same reasoning as the
      // message-level enteredIds above.
      var lineKey = m.id + ':' + idx;
      var lineIsFirstRender = !self3.enteredIds[lineKey];
      if (lineIsFirstRender) self3.enteredIds[lineKey] = true;
      var p = el('p', { class: 'raft-chat-bot-text' + (lineIsFirstRender ? ' raft-chat-msg--enter' : '') });
      p.textContent = para;
      content.appendChild(p);
    });

    if (m.journal && m.journal.length) {
      m.journal.forEach(function (j) {
        var card = el('a', {
          class: 'raft-chat-journal-card', href: j.url || '#',
          target: '_blank', rel: 'noopener noreferrer'
        });
        card.appendChild(el('span', { class: 'raft-chat-journal-label' }, 'Journal'));
        var title = el('span', { class: 'raft-chat-journal-title' });
        title.textContent = j.title;
        card.appendChild(title);
        card.appendChild(el('span', { class: 'raft-chat-journal-go' }, 'Read &#8594;'));
        content.appendChild(card);
      });
    }

    if (m.projects && m.projects.length) {
      var projects = el('div', { class: 'raft-chat-projects' });
      m.projects.forEach(function (p) {
        var card = el('a', { class: 'raft-chat-project-card', href: p.url || '#' });
        var thumb = el('div', { class: 'raft-chat-project-thumb' });
        thumb.style.backgroundImage = 'url(' + p.image + ')';
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
    // Measured, not fixed: chips can wrap to 2+ rows at the narrower field
    // width, so a hardcoded single-row height would clip the wrapped rows.
    this.chipsWrap.style.height = chipsVisible ? this.chipsEl.offsetHeight + 'px' : '0px';

    if (this.input.value !== s.draft) this.input.value = s.draft;
  };

  window.RaftChat = RaftChat;
})();
