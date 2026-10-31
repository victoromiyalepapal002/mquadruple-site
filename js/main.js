/* M-Quadruple Biotek: shared header/footer, data-driven lists, and light animations.
   You normally never need to edit this file. Edit js/site.js, js/gallery-data.js, js/publications-data.js instead. */
(function () {
  'use strict';
  var d = document, S = window.SITE || {}, C = S.contact || {}, B = S.brand || {};
  d.documentElement.classList.remove('no-js');
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (page.indexOf('.') < 0) page += '.html';

  function ext(h) { return /^https?:/.test(h) ? ' target="_blank" rel="noopener"' : ''; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- icons ---------- */
  var I = {
    wa: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88zM20.52 3.45A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.4z"/></svg>',
    in: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    gh: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>',
    sch: '<svg class="st" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 9l10-5 10 5-10 5zM6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5M22 9v6"/></svg>',
    mail: '<svg class="st" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3.5 7l8.5 6.5L20.5 7"/></svg>',
    tel: '<svg class="st" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>'
  };
  var waUrl = 'https://wa.me/' + (C.whatsapp || '') + '?text=' + encodeURIComponent(C.whatsappText || '');
  function socialHtml() {
    return '<div class="social">' + (S.social || []).map(function (s) {
      var h = s.href || (s.icon === 'wa' ? waUrl : s.icon === 'mail' ? 'mailto:' + C.email : s.icon === 'tel' ? 'tel:' + String(C.phone || '').replace(/\s/g, '') : '#');
      return '<a href="' + h + '"' + ext(h) + ' aria-label="' + s.label + '" title="' + s.label + '">' + I[s.icon] + '</a>';
    }).join('') + '</div>';
  }
  function brandHtml() { return '<img src="' + B.logo + '" alt="" width="52" height="41"><span>' + B.name + '<small>' + B.suffix + '</small></span>'; }

  /* ---------- shared header, footer, call-to-action band, WhatsApp button ---------- */
  var hdr = $('#site-header');
  if (hdr) {
    hdr.className = 'site-header';
    var nav = (S.nav || []).map(function (n) {
      var cur = n.href.split('#')[0].toLowerCase() === page;
      return '<a href="' + n.href + '"' + (cur ? ' class="cur" aria-current="page"' : '') + '>' + n.label + '</a>';
    }).join('') + (S.navButton ? '<a class="cta" href="' + S.navButton.href + '">' + S.navButton.label + '</a>' : '');
    hdr.innerHTML = '<div class="wrap bar"><a class="brand" href="index.html" aria-label="' + B.name + ' ' + B.suffix + ', home">' + brandHtml() + '</a>' +
      '<button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + nav + '</nav></div>';
  }
  var ctaBox = $('#cta');
  if (ctaBox) {
    ctaBox.outerHTML = '<section class="cta-band"><div class="wrap cta-in"><div><h2>Let\'s build accessible <em>diagnostics together.</em></h2><p>Book a consultation, ask about training, equipment or our software, or discuss a research collaboration.</p></div>' +
      '<div class="cta-btns"><a class="btn btn-wa" href="' + waUrl + '" target="_blank" rel="noopener">' + I.wa + 'Chat on WhatsApp</a><a class="btn btn-line" href="index.html#contact">Send a message</a></div></div></section>';
  }
  var ftr = $('#site-footer');
  if (ftr) {
    ftr.className = 'foot';
    ftr.innerHTML = '<div class="wrap"><div class="foot-top"><div><a class="brand" href="index.html">' + brandHtml() + '</a><p class="foot-tag">' + (B.tagline || '') + '</p></div>' +
      '<nav aria-label="Footer">' + (S.footerLinks || []).map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('') + '</nav></div>' +
      '<div class="foot-social">' + socialHtml() + '</div>' +
      '<p class="copy">&copy; ' + new Date().getFullYear() + ' ' + B.name + ' ' + B.suffix + '. All rights reserved.</p></div>';
  }
  var wa = d.createElement('a');
  wa.className = 'wa-float'; wa.href = waUrl; wa.target = '_blank'; wa.rel = 'noopener'; wa.setAttribute('aria-label', 'Chat on WhatsApp'); wa.innerHTML = I.wa;
  d.body.appendChild(wa);

  // fill placeholders anywhere in a page
  $$('[data-social]').forEach(function (el) { el.outerHTML = socialHtml(); });
  $$('[data-wa]').forEach(function (el) { el.href = waUrl; el.target = '_blank'; el.rel = 'noopener'; if (el.hasAttribute('data-icon')) el.insertAdjacentHTML('afterbegin', I.wa); });
  $$('[data-email]').forEach(function (el) { el.href = 'mailto:' + C.email; el.textContent = C.email; });
  $$('[data-phone]').forEach(function (el) { el.href = 'tel:' + String(C.phone).replace(/\s/g, ''); el.textContent = C.phone; });
  $$('[data-address]').forEach(function (el) { el.innerHTML = C.address; });

  /* ---------- publications list (from js/publications-data.js) ---------- */
  $$('[data-pubs]').forEach(function (box) {
    var all = window.PUBLICATIONS || [], lim = parseInt(box.getAttribute('data-limit'), 10) || all.length, list = all.slice(0, lim);
    box.innerHTML = list.map(function (p) {
      return '<article class="pub" data-tags="' + (p.tags || []).join(' ') + '"><div class="yr">' + p.year + '</div><div><h3>' + p.title + '</h3>' +
        '<p class="au">' + p.authors + '</p><p class="jr">' + p.journal + '</p>' +
        '<ul class="tags">' + (p.tags || []).map(function (t) { return '<li>' + cap(t) + '</li>'; }).join('') + '</ul></div>' +
        (p.url ? '<a class="btn btn-ghost" href="' + p.url + '"' + ext(p.url) + '>' + (p.linkLabel || 'View paper') + '</a>' : '') + '</article>';
    }).join('');
  });
  var fbox = $('[data-pub-filters]');
  if (fbox) {
    var tagsSeen = [];
    (window.PUBLICATIONS || []).forEach(function (p) { (p.tags || []).forEach(function (t) { if (tagsSeen.indexOf(t) < 0) tagsSeen.push(t); }); });
    var label = { food: 'Food & biotech' };
    fbox.innerHTML = '<button class="chip" data-filter="all" aria-pressed="true">All</button>' +
      tagsSeen.map(function (t) { return '<button class="chip" data-filter="' + t + '" aria-pressed="false">' + (label[t] || cap(t)) + '</button>'; }).join('') +
      '<span class="count" id="pub-count" aria-live="polite">' + (window.PUBLICATIONS || []).length + ' publications</span>';
  }

  /* ---------- gallery (from js/gallery-data.js) ---------- */
  $$('[data-gallery]').forEach(function (box) {
    var homeOnly = box.getAttribute('data-gallery') === 'home';
    var list = (window.GALLERY || []).filter(function (g) { return !homeOnly || g.home; });
    box.innerHTML = list.map(function (g) {
      var cls = g.size === 'big' ? ' w2 r2' : g.size === 'wide' ? ' w2' : g.size === 'tall' ? ' r2' : '';
      return '<button class="gt' + cls + ' rv" data-full="' + g.src + '" data-alt="' + (g.alt || '') + '" data-cap="' + (g.caption || '') + '">' +
        '<img src="' + g.src + '" alt="' + (g.alt || '') + '" loading="lazy" decoding="async"' + (g.position ? ' style="object-position:' + g.position + '"' : '') + '>' +
        (g.caption ? '<span>' + g.caption + '</span>' : '') + '</button>';
    }).join('');
  });

  /* ---------- header solid on scroll + mobile menu ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('solid', window.scrollY > 40); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    var btn = $('.menu-btn'), navEl = $('#nav');
    var setMenu = function (open) { navEl.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); header.classList.toggle('menu-open', open); };
    btn.addEventListener('click', function () { setMenu(!navEl.classList.contains('open')); });
    $$('a', navEl).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* ---------- reveal on scroll ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('in'); io.unobserve(it.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- light 3D tilt on hover (desktop only). Add data-tilt="5" to any element ---------- */
  function tilt(el, max) {
    if (!fine || reduce) return;
    var raf = 0, rx = 0, ry = 0;
    function apply() { el.style.setProperty('--rx', rx.toFixed(2) + 'deg'); el.style.setProperty('--ry', ry.toFixed(2) + 'deg'); raf = 0; }
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      ry = ((e.clientX - r.left) / r.width - 0.5) * max * 2; rx = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener('pointerleave', function () { rx = 0; ry = 0; if (!raf) raf = requestAnimationFrame(apply); });
  }
  $$('[data-tilt]').forEach(function (el) { tilt(el, parseFloat(el.getAttribute('data-tilt')) || 4); });
  $$('#stage').forEach(function (el) { tilt(el, 9); });
  $$('.person, .mission blockquote, .shot figure').forEach(function (el) { tilt(el, 4); });

  /* ---------- publication filters ---------- */
  var chips = $$('.chip[data-filter]'), pubs = $$('.pub'), count = $('#pub-count');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-filter'), shown = 0;
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      pubs.forEach(function (p) { var hide = f !== 'all' && p.getAttribute('data-tags').split(' ').indexOf(f) < 0; p.hidden = hide; if (!hide) shown++; });
      if (count) count.textContent = shown + (shown === 1 ? ' publication' : ' publications');
    });
  });

  /* ---------- gallery lightbox ---------- */
  var lb = $('#lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = $('img', lb), lbCap = $('figcaption', lb);
    $$('.gt').forEach(function (t) {
      t.addEventListener('click', function () {
        lbImg.src = t.getAttribute('data-full'); lbImg.alt = t.getAttribute('data-alt') || '';
        lbCap.textContent = t.getAttribute('data-cap') || ''; lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.hasAttribute('data-close')) lb.close(); });
  }

  /* ---------- contact form ---------- */
  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form), note = $('#form-note');
      if (C.formEndpoint) {
        fetch(C.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw 0; form.reset(); note.textContent = 'Thank you. Your message has been sent.'; })
          .catch(function () { note.textContent = 'Sorry, that did not send. Please email ' + C.email + ' directly.'; });
        return;
      }
      var subject = fd.get('topic') + ' (from ' + fd.get('name') + ')';
      var body = fd.get('message') + '\n\n' + fd.get('name') + '\n' + fd.get('email');
      window.location.href = 'mailto:' + C.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (note) note.textContent = 'Your email app should open with the message ready to send.';
    });
  }

  /* ---------- animation helper: runs only while on screen ---------- */
  function animate(cv, draw, speed) {
    var ctx = cv.getContext('2d'), W = 0, H = 0, phase = Math.random() * 6, raf = 0, running = false, last = 0;
    function size() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function frame() { ctx.clearRect(0, 0, W, H); if (W && H) draw(ctx, W, H, phase); ctx.globalAlpha = 1; }
    function loop(ts) { if (!running) return; var dt = last ? Math.min(ts - last, 50) : 16; last = ts; phase += dt * speed; frame(); raf = requestAnimationFrame(loop); }
    function start() { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
    function stop() { running = false; cancelAnimationFrame(raf); }
    size(); frame();
    window.addEventListener('resize', function () { size(); frame(); });
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { e[0].isIntersecting && !d.hidden ? start() : stop(); }, { threshold: 0.05 }).observe(cv); else start();
    d.addEventListener('visibilitychange', function () { d.hidden ? stop() : start(); });
  }

  /* ---------- 3D DNA double helix. <canvas class="helix" data-theme="light|dark" data-rot="-0.9"> ---------- */
  function helix(cv) {
    var N = 22, dark = cv.getAttribute('data-theme') === 'dark', rot = parseFloat(cv.getAttribute('data-rot'));
    if (isNaN(rot)) rot = -0.9;
    var C1 = dark ? '127,227,200' : '12,106,89', C2 = dark ? '212,174,104' : '176,134,52', RG = dark ? '255,255,255' : '11,29,43';
    animate(cv, function (ctx, W, H, phase) {
      var R = Math.min(W, H) * 0.17, ca = Math.abs(Math.cos(rot)) || 0.01, sa = Math.abs(Math.sin(rot)) || 0.01;
      var len = Math.min((W / 2 - R * sa - 8) / ca, (H / 2 - R * ca - 8) / sa) * 0.95;
      var ops = [], a1 = [], a2 = [], i;
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(rot); ctx.translate(-W / 2, -H / 2);
      for (i = 0; i < N; i++) {
        var t = i / (N - 1), a = phase + t * 2.2 * 6.2832, c = Math.cos(a), s = Math.sin(a), x = W / 2 + (t - 0.5) * len * 2;
        var p1 = { x: x, y: H / 2 + R * c, z: s }, p2 = { x: x, y: H / 2 - R * c, z: -s };
        a1.push(p1); a2.push(p2);
        ops.push({ z: 0, k: 'r', a: p1, b: p2 }, { z: p1.z, k: 'b', p: p1, c: C1 }, { z: p2.z, k: 'b', p: p2, c: C2 });
        if (i) ops.push({ z: (p1.z + a1[i - 1].z) / 2, k: 's', a: a1[i - 1], b: p1, c: C1 }, { z: (p2.z + a2[i - 1].z) / 2, k: 's', a: a2[i - 1], b: p2, c: C2 });
      }
      ops.sort(function (m, n) { return m.z - n.z; });
      ctx.lineCap = 'round';
      ops.forEach(function (o) {
        if (o.k === 'r') { ctx.globalAlpha = 0.22; ctx.strokeStyle = 'rgb(' + RG + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke(); }
        else if (o.k === 's') { var f = (o.z + 1) / 2; ctx.globalAlpha = 0.4 + 0.6 * f; ctx.strokeStyle = 'rgb(' + o.c + ')'; ctx.lineWidth = 2 + 3.5 * f; ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke(); }
        else {
          var g = (o.z + 1) / 2, r = 3.5 + 6 * g; ctx.globalAlpha = 0.45 + 0.55 * g;
          if (dark) { ctx.fillStyle = 'rgba(' + o.c + ',.16)'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r * 2, 0, 6.2832); ctx.fill(); }
          ctx.fillStyle = 'rgb(' + o.c + ')'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r, 0, 6.2832); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(o.p.x - r * 0.3, o.p.y - r * 0.3, r * 0.3, 0, 6.2832); ctx.fill();
        }
      });
      ctx.restore();
    }, 0.0006);
  }
  $$('canvas.helix').forEach(function (cv) { if (cv.getContext) helix(cv); });

  /* ---------- 3D molecule network (rotating nodes). <canvas class="mol" data-theme="dark"> ---------- */
  function mol(cv) {
    var dark = cv.getAttribute('data-theme') !== 'light', N = 38, pts = [], pairs = [], i, j;
    for (i = 0; i < N; i++) { var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.39996; pts.push([Math.cos(th) * r, y, Math.sin(th) * r]); }
    for (i = 0; i < N; i++) for (j = i + 1; j < N; j++) {
      var dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], dz = pts[i][2] - pts[j][2];
      if (dx * dx + dy * dy + dz * dz < 0.62) pairs.push([i, j]);
    }
    var G = dark ? '127,227,200' : '12,106,89', Y = dark ? '212,174,104' : '176,134,52';
    animate(cv, function (ctx, W, H, ph) {
      var R = Math.min(W, H) * 0.4, cx = W / 2, cy = H / 2, ca = Math.cos(ph), sa = Math.sin(ph), cb = Math.cos(0.5), sb = Math.sin(0.5), P = [];
      for (var k = 0; k < N; k++) {
        var x = pts[k][0] * ca + pts[k][2] * sa, z = -pts[k][0] * sa + pts[k][2] * ca, y2 = pts[k][1] * cb - z * sb, z2 = pts[k][1] * sb + z * cb, sc = 1 / (1.8 - z2 * 0.5);
        P.push({ x: cx + x * R * sc * 1.7, y: cy + y2 * R * sc * 1.7, z: z2, s: sc });
      }
      ctx.lineWidth = 1;
      pairs.forEach(function (p) { var a = P[p[0]], b = P[p[1]]; ctx.globalAlpha = 0.12 + 0.25 * ((a.z + b.z) / 2 + 1) / 2; ctx.strokeStyle = 'rgb(' + G + ')'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      P.map(function (p, n) { p.n = n; return p; }).sort(function (a, b) { return a.z - b.z; }).forEach(function (p) {
        var f = (p.z + 1) / 2, rr = 2.5 + 5 * p.s * f * 1.4;
        ctx.globalAlpha = 0.35 + 0.65 * f; ctx.fillStyle = 'rgb(' + (p.n % 5 === 0 ? Y : G) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, rr, 0, 6.2832); ctx.fill();
      });
    }, 0.0004);
  }
  $$('canvas.mol').forEach(function (cv) { if (cv.getContext) mol(cv); });
})();
