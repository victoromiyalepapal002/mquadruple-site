/* M-Quadruple Biotek: builds the page from js/content.js, plus small interactions.
   You normally never need to edit this file. */
(function () {
  'use strict';
  var d = document, S = window.SITE;
  if (!S) { return; }
  d.documentElement.classList.remove('no-js');
  var $ = function (s, r) { return (r || d).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- tiny icon set (32x32, stroke style). Use the name in content.js ---------- */
  var ICONS = {
    flask: 'M11 4h10M13 4v8l-6 12a2 2 0 0 0 1.8 3h14.4a2 2 0 0 0 1.8-3l-6-12V4M9.5 20h13',
    dna: 'M10 3c0 8 12 8 12 13s-12 5-12 13M22 3c0 8-12 8-12 13s12 5 12 13M12 8h8M11 16h10M12 24h8',
    chip: 'M6 8h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2zM8 14h6l4 4h6M8 20h6l4-4',
    nodes: 'M9 7.5a3.2 3.2 0 1 0 0 .1M23 6.5a3.2 3.2 0 1 0 0 .1M16 21a3.2 3.2 0 1 0 0 .1M12.2 8h7.6M10.6 11l4 8M21.4 10l-4 9',
    plus: 'M16 5a11 11 0 1 0 0 .1M16 10v12M10 16h12',
    drop: 'M16 3S6 14 6 20a10 10 0 0 0 20 0C26 14 16 3 16 3z',
    chart: 'M4 26h24M7 22l6-7 5 4 8-10M21 9h5v5',
    tool: 'M20 6a6 6 0 0 0-5 8L5 24l3 3 10-10a6 6 0 0 0 8-5l-4 3-3-1-1-3z',
    users: 'M12 14a4 4 0 1 0 0-.1M4 27c0-5 3.5-8 8-8s8 3 8 8M22 13a3.5 3.5 0 1 0 0-.1M24 19c3 .8 4.5 3.2 4.5 7',
    book: 'M5 6h8a3 3 0 0 1 3 3v17a3 3 0 0 0-3-3H5zM27 6h-8a3 3 0 0 0-3 3v17a3 3 0 0 1 3-3h8z'
  };
  function icon(n) { return '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="' + (ICONS[n] || ICONS.plus) + '"/></svg>'; }
  var ARROW = '<svg class="ar" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 12L12 4M5 4h7v7"/></svg>';
  var CHECK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5"/></svg>';
  var GH = '<svg viewBox="0 0 16 16" aria-hidden="true" class="gh"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>';

  function host(u) { try { return new URL(u).host; } catch (e) { return u; } }
  function ext(href) { return /^https?:/.test(href) ? ' target="_blank" rel="noopener"' : ''; }
  function rvd(i, step) { return i ? ' style="--d:' + (i * (step || 0.08)).toFixed(2) + 's"' : ''; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function tags(list, cls) { return list && list.length ? '<ul class="tags' + (cls ? ' ' + cls : '') + '">' + list.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' : ''; }
  function head(c, dark) {
    return '<p class="eyebrow rv">' + c.eyebrow + '</p><h2 class="h2 rv">' + c.title + '</h2>' + (c.lead ? '<p class="lead rv">' + c.lead + '</p>' : '');
  }

  /* ---------- section builders ---------- */
  var B = {};

  B.software = function (c) {
    var items = c.items.map(function (s, i) {
      var feats = (s.features || []).map(function (f) { return '<li>' + CHECK + '<span>' + f + '</span></li>'; }).join('');
      var repo = s.repo ? '<a class="btn btn-ghost" href="' + s.repo + '"' + ext(s.repo) + '>' + GH + 'View code</a>' : '';
      return '' +
        '<article class="sw' + (i % 2 ? ' flip' : '') + (i === 0 ? ' lead-sw' : '') + '" id="software-' + (i + 1) + '">' +
          '<div class="sw-copy rv">' +
            '<div class="sw-meta"><span class="pill' + (i === 0 ? ' pill-hot' : '') + '">' + (s.badge || '') + '</span><span class="kick">' + (s.kicker || '') + '</span></div>' +
            '<h3>' + s.name + '</h3>' +
            '<p class="sw-tag">' + (s.tagline || '') + '</p>' +
            '<p class="sw-desc">' + (s.description || '') + '</p>' +
            '<ul class="checks">' + feats + '</ul>' +
            (s.audience ? '<p class="sw-aud"><b>Built for</b> ' + s.audience + '</p>' : '') +
            (s.note ? '<p class="sw-note">' + s.note + '</p>' : '') +
            '<div class="actions"><a class="btn btn-green" href="' + s.url + '"' + ext(s.url) + '>' + (s.buttonLabel || 'Launch the app') + ARROW + '</a>' + repo + '</div>' +
          '</div>' +
          '<div class="sw-shot rv" style="--d:.1s" data-tilt="5">' +
            '<a class="browser" href="' + s.url + '"' + ext(s.url) + ' aria-label="Open ' + s.name.replace(/"/g, '') + '">' +
              '<div class="bbar"><i></i><i></i><i></i><span class="url">' + host(s.url) + '</span></div>' +
              '<img src="' + s.image + '" alt="' + (s.imageAlt || s.name) + '" width="1200" height="750" ' + (i === 0 ? '' : 'loading="lazy" ') + 'decoding="async">' +
            '</a>' +
            (s.tags ? tags(s.tags, 'center') : '') +
          '</div>' +
        '</article>';
    }).join('');
    return '<section class="sec software" id="software"><div class="wrap">' + head(c) + '<div class="sw-list">' + items + '</div></div></section>';
  };

  B.about = function (c) {
    var stats = c.stats.map(function (s) { return '<div><b>' + s.value + '</b><span>' + s.label + '</span></div>'; }).join('');
    var svc = c.services.map(function (s, i) {
      return '<article class="sv rv"' + rvd(i) + '><div class="ic">' + icon(s.icon) + '</div><h3>' + s.title + '</h3><p>' + s.text + '</p></article>';
    }).join('');
    return '<section class="sec alt" id="about"><div class="wrap">' +
      '<div class="about-grid"><div class="copy rv"><p class="eyebrow">' + c.eyebrow + '</p><h2 class="h2">' + c.title + '</h2>' +
      c.paragraphs.map(function (p) { return '<p>' + p + '</p>'; }).join('') + '</div>' +
      '<div class="mission rv" style="--d:.1s" data-tilt="5"><blockquote>' + c.mission + '<cite>' + c.missionLabel + '</cite></blockquote></div></div>' +
      '<div class="stats rv">' + stats + '</div><div class="svc">' + svc + '</div></div></section>';
  };

  B.team = function (c) {
    var ppl = c.people.map(function (p, i) {
      var links = (p.links || []).map(function (l) { return '<a href="' + l.href + '"' + ext(l.href) + '>' + l.label + '</a>'; }).join('');
      return '<article class="person rv"' + rvd(i, 0.1) + ' data-tilt="3"><div class="ph"><img src="' + p.photo + '" alt="' + (p.photoAlt || p.name) + '" loading="lazy" decoding="async" style="object-position:' + (p.photoPosition || '50% 30%') + '"></div>' +
        '<div class="body"><h3>' + p.name + '</h3><p class="role">' + p.role + '</p><p>' + p.bio + '</p>' + tags(p.tags) + '<div class="links">' + links + '</div></div></article>';
    }).join('');
    return '<section class="sec" id="team"><div class="wrap">' + head(c) + '<div class="people">' + ppl + '</div></div></section>';
  };

  B.research = function (c) {
    var it = c.items.map(function (r, i) {
      return '<article class="rc rv"' + rvd(i % 3) + '>' + icon(r.icon) + '<h3>' + r.title + '</h3><p>' + r.text + '</p></article>';
    }).join('');
    return '<section class="sec dark" id="research"><div class="wrap">' + head(c) + '<div class="rgrid">' + it + '</div></div></section>';
  };

  B.journey = function (c) {
    var it = c.items.map(function (j) {
      return '<li class="rv"><div class="y">' + j.year + '</div><div class="t"><h3>' + j.title + '</h3><p>' + j.text + '</p></div></li>';
    }).join('');
    return '<section class="sec" id="journey"><div class="wrap">' + head(c) + '<ol class="tl">' + it + '</ol></div></section>';
  };

  B.publications = function (c) {
    var all = [];
    c.items.forEach(function (p) { (p.tags || []).forEach(function (t) { if (all.indexOf(t) < 0) all.push(t); }); });
    var chips = '<button class="chip" data-filter="all" aria-pressed="true">All</button>' +
      all.map(function (t) { return '<button class="chip" data-filter="' + t + '" aria-pressed="false">' + cap(t) + '</button>'; }).join('');
    var rows = c.items.map(function (p) {
      return '<article class="pub" data-tags="' + (p.tags || []).join(' ') + '"><div class="yr">' + p.year + '</div><div><h3>' + p.title + '</h3>' +
        '<p class="au">' + p.authors + '</p><p class="jr">' + p.journal + '</p>' + tags((p.tags || []).map(cap)) + '</div>' +
        (p.url ? '<a class="btn btn-ghost" href="' + p.url + '"' + ext(p.url) + '>' + (p.linkLabel || 'View paper') + '</a>' : '') + '</article>';
    }).join('');
    return '<section class="sec alt" id="publications"><div class="wrap">' + head(c) +
      '<div class="filters rv" role="group" aria-label="Filter publications">' + chips + '<span class="count" id="pub-count" aria-live="polite">' + c.items.length + ' publications</span></div>' +
      '<div class="pubs">' + rows + '</div>' +
      (c.scholarUrl ? '<div class="more rv"><a class="btn btn-green" href="' + c.scholarUrl + '"' + ext(c.scholarUrl) + '>' + c.scholarLabel + ARROW + '</a></div>' : '') +
      '</div></section>';
  };

  B.work = function (c) {
    var it = c.items.map(function (w, i) {
      return '<li class="rv"' + rvd(i) + '><span class="badge">' + w.status + '</span><h3>' + w.title + '</h3><p>' + w.text + '</p></li>';
    }).join('');
    return '<section class="sec dark" id="work"><div class="wrap">' + head(c) + '<div class="work"><div class="shot rv" data-tilt="5"><figure>' +
      '<img src="' + c.image + '" alt="' + (c.imageAlt || '') + '" loading="lazy" decoding="async"><figcaption>' + c.caption + '</figcaption></figure></div>' +
      '<ul class="wk">' + it + '</ul></div></div></section>';
  };

  B.gallery = function (c) {
    var it = c.items.map(function (g) {
      var cls = g.size === 'wide' ? ' w2' : g.size === 'tall' ? ' r2' : '';
      return '<button class="gt' + cls + ' rv" data-full="' + g.src + '" data-alt="' + (g.alt || '') + '" data-cap="' + (g.caption || '') + '">' +
        '<img src="' + g.src + '" alt="' + (g.alt || '') + '" loading="lazy" decoding="async"' + (g.position ? ' style="object-position:' + g.position + '"' : '') + '>' +
        (g.caption ? '<span>' + g.caption + '</span>' : '') + '</button>';
    }).join('');
    return '<section class="sec" id="gallery"><div class="wrap">' + head(c) + '<div class="gal">' + it + '</div></div></section>';
  };

  B.contact = function (c) {
    var rows = '<div><dt>Email</dt><dd><a href="mailto:' + c.email + '">' + c.email + '</a></dd></div>' +
      (c.phone ? '<div><dt>Phone</dt><dd><a href="tel:' + c.phone.replace(/\s/g, '') + '">' + c.phone + '</a></dd></div>' : '') +
      '<div><dt>Location</dt><dd>' + c.address + '</dd></div>' +
      (c.links && c.links.length ? '<div><dt>Elsewhere</dt><dd>' + c.links.map(function (l) { return '<a href="' + l.href + '"' + ext(l.href) + '>' + l.label + '</a>'; }).join(' &nbsp;&middot;&nbsp; ') + '</dd></div>' : '');
    return '<section class="sec dark" id="contact"><div class="wrap contact-grid"><div class="rv"><p class="eyebrow">' + c.eyebrow + '</p><h2 class="h2">' + c.title + '</h2>' +
      '<p class="lead">' + c.lead + '</p><dl class="cl">' + rows + '</dl></div>' +
      '<form class="form rv" id="contact-form" style="--d:.1s"><label>Your name<input name="name" type="text" autocomplete="name" required></label>' +
      '<label>Your email<input name="email" type="email" autocomplete="email" required></label>' +
      '<label>Topic<select name="topic">' + c.topics.map(function (t) { return '<option>' + t + '</option>'; }).join('') + '</select></label>' +
      '<label>Message<textarea name="message" required></textarea></label>' +
      '<button class="btn btn-mint" type="submit">Send message</button><p class="note" id="form-note" aria-live="polite"></p></form></div></section>';
  };

  /* ---------- header, hero, strip, footer ---------- */
  function brandHtml() {
    return '<img src="' + S.brand.logo + '" alt="" width="42" height="42"><span>' + S.brand.name + '<small>' + S.brand.suffix + '</small></span>';
  }

  function buildHeader() {
    var nav = S.nav.map(function (n) { return '<a href="' + n.href + '">' + n.label + '</a>'; }).join('') +
      (S.navButton ? '<a class="cta" href="' + S.navButton.href + '">' + S.navButton.label + '</a>' : '');
    $('#site-header').innerHTML = '<div class="wrap bar"><a class="brand" href="#top" aria-label="' + S.brand.name + ' ' + S.brand.suffix + ', home">' + brandHtml() + '</a>' +
      '<button class="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>' +
      '<nav class="nav" id="nav" aria-label="Main">' + nav + '</nav></div>';
  }

  function buildHero() {
    var h = S.hero, first = S.software && S.software.items[0];
    var btns = h.buttons.map(function (b) { return '<a class="btn ' + (b.style === 'outline' ? 'btn-line' : 'btn-mint') + '" href="' + b.href + '">' + b.label + '</a>'; }).join('');
    var facts = h.facts.map(function (f) { return '<li>' + f + '</li>'; }).join('');
    var chips = (h.floatingTags || []).slice(0, 3).map(function (t, i) { return '<div class="chip3 c' + 'ABC'.charAt(i) + '"><span>' + t + '</span></div>'; }).join('');
    var feat = h.showFeaturedSoftware && first ?
      '<a class="now" href="#software"><span class="live"><i></i>Now live</span><b>' + first.name + '</b><small>' + (first.kicker || '') + '</small><em>Open the software &rarr;</em></a>' : '';
    var stage = h.motion ? '<div class="stage" id="stage"><canvas id="helix" aria-hidden="true"></canvas>' + chips + feat + '</div>' :
      '<div class="stage static" id="stage">' + feat + '</div>';
    return '<section class="hero" id="top"><div class="wrap hero-grid"><div class="hero-copy"><p class="eyebrow">' + h.eyebrow + '</p><h1>' + h.title + '</h1>' +
      '<p class="sub">' + h.text + '</p><div class="actions">' + btns + '</div><ul class="facts">' + facts + '</ul></div>' + stage + '</section>';
  }

  function buildStrip() {
    var one = S.strip.map(function (t) { return '<span>' + t + '</span>'; }).join('');
    return '<div class="strip" aria-hidden="true"><div class="strip-track">' + one + one + '</div></div>';
  }

  function buildFooter() {
    var links = S.footer.links.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('');
    $('#site-footer').innerHTML = '<div class="wrap"><div class="foot-top"><div><a class="brand" href="#top">' + brandHtml() + '</a><p class="foot-tag">' + S.brand.tagline + '</p></div>' +
      '<nav aria-label="Footer">' + links + '</nav></div><p class="copy">&copy; <span id="year">' + new Date().getFullYear() + '</span> ' + S.brand.name + ' ' + S.brand.suffix + '. All rights reserved.</p></div>';
  }

  /* ---------- build the page ---------- */
  var html = buildHero() + buildStrip();
  S.sections.forEach(function (k) { if (B[k] && S[k]) html += B[k](S[k]); });
  $('#main').innerHTML = html;
  buildHeader();
  buildFooter();

  // favicon from content.js
  var fav = $('link[rel="icon"]');
  if (fav && S.brand.favicon) fav.setAttribute('href', S.brand.favicon);

  /* ---------- header solid on scroll + mobile menu ---------- */
  var header = $('#site-header');
  function onScroll() { header.classList.toggle('solid', window.scrollY > 40); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  var btn = $('.menu-btn'), nav = $('#nav');
  function setMenu(open) { nav.classList.toggle('open', open); btn.setAttribute('aria-expanded', open ? 'true' : 'false'); header.classList.toggle('menu-open', open); }
  btn.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- reveal on scroll ---------- */
  var rv = $$('.rv');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (it) { if (it.isIntersecting) { it.target.classList.add('in'); io.unobserve(it.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    rv.forEach(function (el) { io.observe(el); });
  } else { rv.forEach(function (el) { el.classList.add('in'); }); }

  /* ---------- light 3D tilt on hover (desktop only) ---------- */
  function tilt(el, max) {
    if (!fine || reduce) return;
    var raf = 0, rx = 0, ry = 0;
    function apply() { el.style.setProperty('--rx', rx.toFixed(2) + 'deg'); el.style.setProperty('--ry', ry.toFixed(2) + 'deg'); raf = 0; }
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      ry = ((e.clientX - r.left) / r.width - 0.5) * max * 2;
      rx = -((e.clientY - r.top) / r.height - 0.5) * max * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    });
    el.addEventListener('pointerleave', function () { rx = 0; ry = 0; if (!raf) raf = requestAnimationFrame(apply); });
  }
  $$('[data-tilt]').forEach(function (el) { tilt(el, parseFloat(el.getAttribute('data-tilt')) || 4); });

  /* ---------- publication filters ---------- */
  var chips = $$('.chip[data-filter]'), pubs = $$('.pub'), count = $('#pub-count');
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      var f = c.getAttribute('data-filter'), shown = 0;
      chips.forEach(function (x) { x.setAttribute('aria-pressed', x === c ? 'true' : 'false'); });
      pubs.forEach(function (p) {
        var hide = f !== 'all' && p.getAttribute('data-tags').split(' ').indexOf(f) < 0;
        p.hidden = hide; if (!hide) shown++;
      });
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
      var fd = new FormData(form), note = $('#form-note'), c = S.contact;
      if (c.formEndpoint) {
        fetch(c.formEndpoint, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw 0; form.reset(); note.textContent = 'Thank you. Your message has been sent.'; })
          .catch(function () { note.textContent = 'Sorry, that did not send. Please email ' + c.email + ' directly.'; });
        return;
      }
      var subject = fd.get('topic') + ' (from ' + fd.get('name') + ')';
      var body = fd.get('message') + '\n\n' + fd.get('name') + '\n' + fd.get('email');
      window.location.href = 'mailto:' + c.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      if (note) note.textContent = 'Your email app should open with the message ready to send.';
    });
  }

  /* ---------- 3D DNA double helix (canvas 2D, about 3 KB, pauses off-screen) ---------- */
  var cv = $('#helix');
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d'), W = 0, H = 0, dpr = 1, raf = 0, running = false, last = 0, phase = 0, px = 0;
    var N = 26, TURNS = 2.4;
    var MINT = '127,227,200', GOLD = '212,174,104';
    var size = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      var r = cv.getBoundingClientRect(); W = r.width; H = r.height;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var draw = function () {
      ctx.clearRect(0, 0, W, H);
      var cx = W * 0.6, top = H * 0.07, len = H * 0.8, R = Math.min(W * 0.17, 92), ops = [], a1 = [], a2 = [], i;
      ctx.save(); ctx.translate(cx, H / 2); ctx.rotate(-0.3); ctx.translate(-cx, -H / 2);
      for (i = 0; i < N; i++) {
        var t = i / (N - 1), y = top + len * t, a = phase + t * TURNS * 2 * Math.PI, c = Math.cos(a), s = Math.sin(a);
        var p1 = { x: cx + R * c, y: y, z: s, i: i }, p2 = { x: cx - R * c, y: y, z: -s, i: i };
        a1.push(p1); a2.push(p2);
        ops.push({ z: 0, k: 'rung', a: p1, b: p2 });
        ops.push({ z: p1.z, k: 'ball', p: p1, col: MINT });
        ops.push({ z: p2.z, k: 'ball', p: p2, col: GOLD });
        if (i) {
          ops.push({ z: (p1.z + a1[i - 1].z) / 2, k: 'seg', a: a1[i - 1], b: p1, col: MINT });
          ops.push({ z: (p2.z + a2[i - 1].z) / 2, k: 'seg', a: a2[i - 1], b: p2, col: GOLD });
        }
      }
      ops.sort(function (m, n) { return m.z - n.z; });
      ctx.lineCap = 'round';
      ops.forEach(function (o) {
        if (o.k === 'rung') {
          var g = ctx.createLinearGradient(o.a.x, o.a.y, o.b.x, o.b.y);
          g.addColorStop(0, 'rgba(' + MINT + ',.55)'); g.addColorStop(1, 'rgba(' + GOLD + ',.55)');
          ctx.strokeStyle = g; ctx.globalAlpha = 0.22 + 0.2 * (1 - Math.abs(o.a.z)); ctx.lineWidth = 2;
          ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke();
        } else if (o.k === 'seg') {
          var sc = 0.5 + 0.5 * (o.z + 1) / 2;
          ctx.globalAlpha = 0.35 + 0.65 * sc; ctx.strokeStyle = 'rgb(' + o.col + ')'; ctx.lineWidth = 2 + 4 * sc;
          ctx.beginPath(); ctx.moveTo(o.a.x, o.a.y); ctx.lineTo(o.b.x, o.b.y); ctx.stroke();
        } else {
          var f = (o.z + 1) / 2, r = 4 + 7 * f;
          ctx.globalAlpha = 0.3 + 0.7 * f;
          ctx.fillStyle = 'rgba(' + o.col + ',.18)'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r * 2.1, 0, 6.283); ctx.fill();
          ctx.fillStyle = 'rgb(' + o.col + ')'; ctx.beginPath(); ctx.arc(o.p.x, o.p.y, r, 0, 6.283); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.beginPath(); ctx.arc(o.p.x - r * 0.3, o.p.y - r * 0.3, r * 0.3, 0, 6.283); ctx.fill();
        }
      });
      ctx.restore(); ctx.globalAlpha = 1;
    };
    var loop = function (ts) {
      if (!running) return;
      var dt = last ? Math.min(ts - last, 50) : 16; last = ts;
      phase += dt * 0.0006; draw(); raf = requestAnimationFrame(loop);
    };
    var start = function () { if (running || reduce) return; running = true; last = 0; raf = requestAnimationFrame(loop); };
    var stop = function () { running = false; cancelAnimationFrame(raf); };
    size(); draw();
    window.addEventListener('resize', function () { size(); draw(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (e) { e[0].isIntersecting && !d.hidden ? start() : stop(); }, { threshold: 0.05 }).observe(cv);
    } else { start(); }
    d.addEventListener('visibilitychange', function () { d.hidden ? stop() : start(); });
  }
})();
