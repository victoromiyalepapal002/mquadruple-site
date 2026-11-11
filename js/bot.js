/* Chat assistant: loaded only when needed (see main.js). Reads js/bot-data.js. No external services. */
(function () {
  'use strict';
  var D = window.BOT, S = window.SITE || {}, C = S.contact || {}, B = S.brand || {};
  if (!D) return;
  var d = document, reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
  var root = d.getElementById('bot'), fab = d.getElementById('bot-fab');
  if (!root || !fab) return;

  /* ---------- helpers ---------- */
  var waBase = 'https://wa.me/' + (C.whatsapp || '') + '?text=';
  function fill(s) { return String(s).replace(/\{phone\}/g, C.phone || '').replace(/\{email\}/g, C.email || '').replace(/\{wa\}/g, waBase + encodeURIComponent(C.whatsappText || 'Hello')); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return ' ' + String(s).toLowerCase().replace(/µ/g, 'u').replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim() + ' '; }
  function stem(w) { if (w.length > 4) w = w.replace(/s$/, ''); return w.length > 5 ? w.replace(/(ing|ed)$/, '') : w; }
  var topics = {}; D.topics.forEach(function (t) { topics[t.id] = t; });

  /* ---------- understanding a question: score every topic by the words and phrases it shares ---------- */
  function lev1(a, b) { // true if the words differ by at most one letter (typo tolerance)
    if (a === b) return true; if (Math.abs(a.length - b.length) > 1 || a.length < 5) return false;
    var i = 0, j = 0, e = 0;
    while (i < a.length && j < b.length) {
      if (a[i] === b[j]) { i++; j++; continue; }
      if (++e > 1) return false;
      if (a.length > b.length) i++; else if (a.length < b.length) j++; else { i++; j++; }
    }
    return e + (a.length - i) + (b.length - j) <= 1;
  }
  var index = D.topics.map(function (t) {
    return { t: t, keys: (t.k || []).map(function (k) { var n = norm(k).trim(); return { n: n, multi: n.indexOf(' ') > -1, w: n.split(' ').map(stem) }; }) };
  });
  function match(text) {
    var n = norm(text), words = n.trim().split(' ').filter(Boolean), st = words.map(stem), best = null, bs = 0;
    index.forEach(function (it) {
      var s = 0;
      it.keys.forEach(function (k) {
        if (k.multi) { if (n.indexOf(' ' + k.n + ' ') > -1 || n.indexOf(k.n) > -1) s += 2.5; }
        else {
          var kw = k.w[0];
          for (var i = 0; i < st.length; i++) { var wt = 0.8 + Math.min(kw.length, 10) * 0.1; if (st[i] === kw || words[i] === k.n) { s += wt; break; } if (lev1(st[i], kw)) { s += wt * 0.7; break; } }
        }
      });
      if (it.t.id === 'greet' || it.t.id === 'thanks') s = words.length <= 4 ? s : s * 0.3;
      if (s > bs) { bs = s; best = it.t; }
    });
    return bs >= 1.0 ? best : null;
  }

  var ROBOT = '<svg class="rb" viewBox="0 0 48 48" aria-hidden="true"><g class="rb-ant"><path d="M24 14V9"/><circle class="rb-ball" cx="24" cy="6.5" r="3"/></g><rect class="rb-ear" x="3.5" y="23" width="5" height="10" rx="2.5"/><rect class="rb-ear" x="39.5" y="23" width="5" height="10" rx="2.5"/><rect class="rb-head" x="7" y="14" width="34" height="27" rx="10"/><rect class="rb-face" x="11.5" y="18.5" width="25" height="18" rx="7"/><g class="rb-eyes"><ellipse cx="18.5" cy="26" rx="2.7" ry="3.3"/><ellipse cx="29.5" cy="26" rx="2.7" ry="3.3"/></g><path class="rb-mouth" d="M20 32q4 3.2 8 0"/></svg>';

  /* ---------- panel markup ---------- */
  root.innerHTML =
    '<div class="bot-panel" role="dialog" aria-label="' + esc(D.name) + '" aria-modal="false">' +
      '<header class="bot-head"><span class="bot-av">'+ ROBOT +'</span>' +
        '<div class="bot-ttl"><b>' + esc(D.name) + '</b><small><i></i>' + esc(D.status) + '</small></div>' +
        '<button class="bot-x" type="button" aria-label="Close chat">&times;</button></header>' +
      '<div class="bot-log" role="log" aria-live="polite"></div>' +
      '<div class="bot-chips" aria-label="Suggested questions"></div>' +
      '<form class="bot-form" autocomplete="off"><input type="text" maxlength="200" placeholder="' + esc(D.placeholder) + '" aria-label="Your question"><button type="submit" aria-label="Send"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11.5 20.5 4 13 21.5l-2.2-7.3z"/></svg></button></form>' +
      '<a class="bot-wa" href="' + esc(fill('{wa}')) + '" target="_blank" rel="noopener">Prefer a person? Chat on WhatsApp</a>' +
    '</div>';
  var panel = root.firstChild, log = panel.querySelector('.bot-log'), chips = panel.querySelector('.bot-chips'),
      form = panel.querySelector('form'), input = form.querySelector('input');

  /* ---------- messages ---------- */
  var KEY = 'mq-bot', hist = [];
  try { hist = JSON.parse(sessionStorage.getItem('mq-bot') || '[]'); } catch (e) { hist = []; }
  function save() { try { sessionStorage.setItem(KEY, JSON.stringify(hist.slice(-30))); } catch (e) {} }
  function scroll() { log.scrollTop = log.scrollHeight; }
  function addMsg(who, html, go, store) {
    var m = d.createElement('div'); m.className = 'bot-m ' + who; m.innerHTML = html;
    if (go && go.length) {
      var g = d.createElement('div'); g.className = 'bot-go';
      go.forEach(function (x) {
        var h = fill(x.h), a = d.createElement('a'); a.textContent = x.t; a.href = h;
        if (/^https?:/.test(h)) { a.target = '_blank'; a.rel = 'noopener'; }
        g.appendChild(a);
      });
      m.appendChild(g);
    }
    log.appendChild(m); scroll();
    if (store !== false) { hist.push({ w: who, h: html, g: go || null }); save(); }
    return m;
  }
  function setChips(ids, extra) {
    chips.innerHTML = '';
    (ids || []).forEach(function (id) {
      var t = topics[id]; if (!t) return;
      var b = d.createElement('button'); b.type = 'button'; b.textContent = t.q || t.id; b.setAttribute('data-id', id); chips.appendChild(b);
    });
    (extra || []).forEach(function (x) { chips.appendChild(x); });
  }
  var starters = D.topics.filter(function (t) { return t.q; }).map(function (t) { return t.id; });
  function startIds() { return ['software', 'training', 'consult', 'contact', 'about', 'location']; }

  var busy = false;
  function typing(cb) {
    root.classList.add('busy');
    var t = d.createElement('div'); t.className = 'bot-m bot typing'; t.innerHTML = '<span></span><span></span><span></span>'; log.appendChild(t); scroll();
    setTimeout(function () { t.remove(); root.classList.remove('busy'); cb(); }, reduce ? 0 : 420 + Math.random() * 260);
  }
  function answer(t, userText) {
    busy = true; chips.innerHTML = '';
    typing(function () {
      if (t) { addMsg('bot', fill(t.a), t.go); setChips(t.next && t.next.length ? t.next : startIds()); }
      else {
        var go = [{ t: 'Send this question on WhatsApp', h: waBase + encodeURIComponent('Hello M-Quadruple Biotek. ' + userText) }, { t: 'Send an email', h: 'mailto:' + (C.email || '') + '?subject=' + encodeURIComponent('Question from the website') + '&body=' + encodeURIComponent(userText) }];
        addMsg('bot', esc(D.fallback), go); setChips(startIds());
      }
      busy = false;
    });
  }
  function ask(text, id) {
    text = String(text || '').trim(); if (!text || busy) return;
    addMsg('me', esc(text));
    answer(id ? topics[id] : match(text), text);
  }
  chips.addEventListener('click', function (e) { var b = e.target.closest('button[data-id]'); if (b) ask(b.textContent, b.getAttribute('data-id')); });
  form.addEventListener('submit', function (e) { e.preventDefault(); var v = input.value; input.value = ''; ask(v); });

  /* restore the conversation (kept while the tab is open, across pages) */
  if (hist.length) { var h0 = hist.slice(); hist = []; h0.forEach(function (m) { addMsg(m.w, m.h, m.g, false); hist.push(m); }); setChips(startIds()); }
  else { addMsg('bot', esc(D.hello)); setChips(startIds()); }

  /* ---------- open / close ---------- */
  function setOpen(o) {
    root.classList.toggle('open', o); fab.setAttribute('aria-expanded', o ? 'true' : 'false'); fab.setAttribute('aria-label', o ? 'Close chat' : 'Chat with our assistant');
    d.documentElement.classList.toggle('bot-lock', o && window.innerWidth < 600);
    if (o) { var tz = d.getElementById('bot-teaser'); if (tz) tz.remove(); setTimeout(function () { scroll(); if (window.innerWidth >= 600) input.focus(); }, 60); }
  }
  window.mqBot = { open: function () { setOpen(true); }, close: function () { setOpen(false); }, toggle: function () { setOpen(!root.classList.contains('open')); } };
  panel.querySelector('.bot-x').addEventListener('click', function () { setOpen(false); fab.focus(); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('open')) { setOpen(false); fab.focus(); } });
  d.addEventListener('click', function (e) { var t = e.target; if (root.classList.contains('open') && window.innerWidth >= 600 && t.isConnected && !root.contains(t) && !fab.contains(t)) setOpen(false); });
  fab.addEventListener('click', function () { window.mqBot.toggle(); });
  root.setAttribute('data-ready', '1');
  if (root.getAttribute('data-want-open')) { root.removeAttribute('data-want-open'); setOpen(true); }
})();
