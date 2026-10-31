/* M-Quadruple Biotek site: small, dependency-free behaviour. */
(function () {
  'use strict';
  var d = document;
  d.documentElement.classList.remove('no-js');
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Footer year
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Header turns solid after scrolling
  var header = $('.site-header');
  function onScroll() { header.classList.toggle('solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var btn = $('.menu-btn'), nav = $('#nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  // Reveal on scroll
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) {
        if (it.isIntersecting) { it.target.classList.add('in'); io.unobserve(it.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add('in'); });
  }

  // Light 3D tilt that follows the mouse (desktop only)
  function tilt(el, max) {
    if (!el || !fine || reduce) return;
    var raf = 0, rx = 0, ry = 0;
    function apply() {
      el.style.setProperty('--rx', rx.toFixed(2) + 'deg');
      el.style.setProperty('--ry', ry.toFixed(2) + 'deg');
      raf = 0;
    }
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      ry = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
      rx = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener('pointerleave', function () {
      rx = 0; ry = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }
  tilt($('#stage'), 9);
  $$('.person').forEach(function (el) { tilt(el, 4); });
  $$('.mission blockquote, .shot figure').forEach(function (el) { tilt(el, 5); });

  $$('.sw-shot').forEach(function (el) { tilt(el, 4); });
  $$('.fphoto').forEach(function (el) { tilt(el, 6); });

  // Publication filters
  var chips = $$('.chip[data-filter]'), pubs = $$('.pub'), count = $('#pub-count');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-filter');
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      var shown = 0;
      pubs.forEach(function (p) {
        var hide = f !== 'all' && p.getAttribute('data-tags').split(' ').indexOf(f) < 0;
        p.hidden = hide;
        if (!hide) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? ' publication' : ' publications');
    });
  });

  // Gallery lightbox
  var lb = $('#lightbox');
  if (lb && typeof lb.showModal === 'function') {
    var lbImg = $('img', lb), lbCap = $('figcaption', lb);
    $$('.gt').forEach(function (t) {
      t.addEventListener('click', function () {
        lbImg.src = t.getAttribute('data-full');
        lbImg.alt = t.getAttribute('data-alt') || '';
        lbCap.textContent = t.getAttribute('data-cap') || '';
        lb.showModal();
      });
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.hasAttribute('data-close')) lb.close();
    });
  }

  // Contact form opens the visitor's email app (no server needed)
  var form = $('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var subject = fd.get('topic') + ' (from ' + fd.get('name') + ')';
      var body = fd.get('message') + '\n\n' + fd.get('name') + '\n' + fd.get('email');
      window.location.href = 'mailto:' + form.getAttribute('data-to') +
        '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = $('#form-note');
      if (note) note.textContent = 'Your email app should open with the message ready to send.';
    });
  }

  // Lightweight 3D DNA helix (canvas 2D). Every <canvas class="helix"> gets one.
  // Options on the canvas: data-theme="light|dark", data-rot="-0.9" (tilt in radians).
  // To remove one, delete its <canvas class="helix"> line in index.html.
  function helix(cv) {
    if (!cv.getContext) return;
    var ctx = cv.getContext('2d'), W = 0, H = 0, phase = Math.random() * 6, raf = 0, running = false, last = 0, N = 22;
    var dark = cv.getAttribute('data-theme') === 'dark';
    var rot = parseFloat(cv.getAttribute('data-rot')) || -0.9;
    var C1 = dark ? '127,227,200' : '12,106,89', C2 = dark ? '212,174,104' : '176,134,52', RG = dark ? '255,255,255' : '11,29,43';
    var size = function () {
      var dpr = Math.min(window.devicePixelRatio || 1, 2), r = cv.getBoundingClientRect();
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      if (!W || !H) return;
      var R = Math.min(W, H) * 0.17, ca = Math.abs(Math.cos(rot)) || 0.01, sa = Math.abs(Math.sin(rot)) || 0.01;
      var len = 1.9 * Math.min((W / 2 - R * sa - 8) / ca, (H / 2 - R * ca - 8) / sa) * 0.5;
      var ops = [], a1 = [], a2 = [], i;
      ctx.save(); ctx.translate(W / 2, H / 2); ctx.rotate(rot); ctx.translate(-W / 2, -H / 2);
      for (i = 0; i < N; i++) {
        var t = i / (N - 1), a = phase + t * 2.2 * 6.2832, c = Math.cos(a), s = Math.sin(a), x = W / 2 + (t - 0.5) * len * 2;
        var p1 = { x: x, y: H / 2 + R * c, z: s }, p2 = { x: x, y: H / 2 - R * c, z: -s };
        a1.push(p1); a2.push(p2);
        ops.push({ z: 0, k: 'r', a: p1, b: p2 }, { z: p1.z, k: 'b', p: p1, c: C1 }, { z: p2.z, k: 'b', p: p2, c: C2 });
        if (i) { ops.push({ z: (p1.z + a1[i - 1].z) / 2, k: 's', a: a1[i - 1], b: p1, c: C1 }, { z: (p2.z + a2[i - 1].z) / 2, k: 's', a: a2[i - 1], b: p2, c: C2 }); }
      }
      ops.sort(function (m, n) { return m.z - n.z; });
      ctx.lineCap = 'round';
      ops.forEach(function (o) {
        if (o.k === 'r') { ctx.globalAlpha = dark ? 0.2 : 0.22; ctx.strokeStyle = 'rgb(' + RG + ')'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke(); }
        else if (o.k === 's') { var f = (o.z + 1) / 2; ctx.globalAlpha = 0.4 + 0.6 * f; ctx.strokeStyle = 'rgb(' + o.c + ')'; ctx.lineWidth = 2 + 3.5 * f; ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke(); }
        else {
          var g = (o.z + 1) / 2, r = 3.5 + 6 * g; ctx.globalAlpha = 0.45 + 0.55 * g;
          if (dark) { ctx.fillStyle = 'rgba(' + o.c + ',.16)'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r * 2, 0, 6.2832); ctx.fill(); }
          ctx.fillStyle = 'rgb(' + o.c + ')'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r, 0, 6.2832); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.arc(o.p.x - r * 0.3, o.p.y - r * 0.3, r * 0.3, 0, 6.2832); ctx.fill();
        }
      });
      ctx.restore(); ctx.globalAlpha = 1;
    };
    var loop = function (ts) { if (!running) return; var dt = last ? Math.min(ts - last, 50) : 16; last = ts; phase += dt * 0.0006; draw(); raf = requestAnimationFrame(loop); };
    var start = function () { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); };
    var stop = function () { running = false; cancelAnimationFrame(raf); };
    size(); draw();
    window.addEventListener('resize', function () { size(); draw(); });
    if ('IntersectionObserver' in window) { new IntersectionObserver(function (e) { e[0].isIntersecting && !d.hidden ? start() : stop(); }, { threshold: 0.05 }).observe(cv); } else { start(); }
    d.addEventListener('visibilitychange', function () { d.hidden ? stop() : start(); });
  }
  $$('canvas.helix').forEach(helix);
})();
