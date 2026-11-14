/* fix-easy.js v1 (Hark, 2026-11-13, Dave's fix list items 1-11, 13-16: quick fixes). Loaded by the app (Index.html) right after
   storm-clean-theme.js. Everything here is an override layered on top: CSS with higher specificity, capture-phase listeners and a
   MutationObserver. Nothing in app-ext.js or the theme is edited.
   1  Cart +/-: the cart line is patched in place instead of the whole cart being rebuilt (no shake/jump); the number keeps one width.
   2  Ready to load on truck: job cards keep one steady look (the 5 s refresh used to strip and re-add the theme's look = "pressed in").
   3  Load on Truck checkboxes: no square highlight around the rounded box on tap; the box itself presses in.
   4  Customer screen: the small X that cleared the customer is gone (the window's X stays).
   5  Load on Truck page: no X in the top right (Back stays).
   6  The per-item "Order" button (copy + open the supplier page) is gone from item cards and the item details.
   7  Main screen: the Home Depot / RichTech / Hilti / AutoZone (and All) chips are gone (the drawer and the cart buttons stay).
   8  Floating + menu: the "Order for Jobs" button is gone (it is in the drawer).
   9-11 Vibration: ordinary taps no longer vibrate (Customer Search, jobs, every button). Only check-offs (Loaded / staged ticks) and
      non-tap events (scan, saves) give one short tick, max 3 ms.
   11 Jobs press in like the other buttons when tapped (only on a real tap: after a short hold without moving; a scroll cancels it).
   13 Jobber button at the bottom: always black with the white Jobber logo, in every state.
   14 Search bar: camera icon and search icon a bit bigger (same icons, same colours).
   15 Drawer labels: "Staging Job" and "Loading Materials".
   16 Load on Truck page: the customer name is centered under the STORM logo. */
(function () {
  if (window.__fixEasy) return; window.__fixEasy = 1;
  var P = 'html:not(#fe1):not(#fe2):not(#fe3) body';
  var EZ = 'cubic-bezier(.32,.72,0,1)';
  var JOBS = '#sj214 .s-job:not(.sk215), #job-find .jf-item, .jf-list .jf-item';
  var css = ''
    /* 6 */
    + P + ' button.order[data-order-single], ' + P + ' [data-order-single] { display: none !important; }'
    + P + ' #detail .controls .stepper { flex: 1 1 auto; }'
    /* 7 */
    + P + ' #gd-chips { display: none !important; }'
    /* 8 */
    + P + ' #oj-fab { display: none !important; }'
    /* 4 */
    + P + ' .x199-cx, ' + P + ' [data-x199-c] { display: none !important; }'
    /* 5 + 16: job page header = Back | name centered | (hidden X keeps the name centered on the page) */
    + P + ' #sj214 .s-top:has([data-sj-back]) [data-sj-x] { visibility: hidden !important; pointer-events: none !important; }'
    + P + ' #sj214 .s-top:has([data-sj-back]) h2 { text-align: center !important; }'
    /* 2: one steady look for the job cards and lines, whether or not the theme has tagged them yet */
    + P + ' #sj214 .s-job:not(.sk215), ' + P + ' #sj214 .s-head, ' + P + ' #sj214 .s-line { background: #fff !important; background-image: none !important; border: 1.5px solid #1B2735 !important; box-shadow: 0 1px 2px rgba(14,22,33,.04), 0 4px 14px rgba(14,22,33,.06) !important; }'
    + P + ' #sj214 .s-line.on { background: #F0FBF3 !important; }'
    + P + ' #sj214 .s-job .s-nm { color: #0E1621 !important; }'
    + P + ' #sj214 .s-job .s-sub { color: #6B7280 !important; }'
    + P + ' #sj214 .s-job .s-sub.s-done { color: #15803D !important; }'
    + P + ' #sj214 .s-job .s-ring i { color: #0E1621 !important; }'
    /* 3: the Loaded checkbox: no square tap highlight / press shadow on the button; the rounded box presses instead */
    + P + ' #sj214 .s-box, ' + P + ' #sj214 .s-box:active, ' + P + ' #sj214 .s-box:focus, ' + P + ' #sj214 .s-box:focus-visible, ' + P + ' #sj214 .s-box.pressed { -webkit-tap-highlight-color: transparent !important; outline: none !important; box-shadow: none !important; filter: none !important; background: none !important; transform: none !important; border-radius: 12px !important; }'
    + P + ' #sj214 .s-box b { transition: transform .12s ease, background-color .15s ease, border-color .15s ease !important; }'
    + P + ' #sj214 .s-box.fe-press b, ' + P + ' #sj214 .s-box:active b { transform: scale(.92) !important; }'
    + P + ' #sj214 .s-line, ' + P + ' #sj214 .s-line * { -webkit-tap-highlight-color: transparent !important; }'
    /* 1: cart number keeps one width, so the - and + don't shift between 9 and 10 */
    + P + ' #pick-sheet .pick-stepper .pick-qty { font-variant-numeric: tabular-nums !important; min-width: 2.6em !important; text-align: center !important; }'
    + P + ' #pick-sheet .pick-line, ' + P + ' #pick-sheet .pick-line * { -webkit-tap-highlight-color: transparent !important; }'
    /* 11: jobs press in like the other buttons, only on a real tap (class added by script, cancelled by any move/scroll) */
    + JOBS.split(', ').map(function (s) { return P + ' ' + s + ':active'; }).join(', ') + ' { transform: none !important; filter: none !important; }'
    + JOBS.split(', ').map(function (s) { return P + ' ' + s; }).join(', ') + ' { transition: transform .08s ease, filter .1s ease !important; -webkit-tap-highlight-color: transparent !important; }'
    + JOBS.split(', ').map(function (s) { return P + ' ' + s + '.fe-press'; }).join(', ') + ' { transform: translateY(1px) scale(.98) !important; filter: brightness(.95) !important; }'
    /* 13: Jobber button always black with the white Jobber logo */
    + P + ' #storm-bubble, ' + P + ' #storm-bubble.scx-act, ' + P + ' #storm-bubble:active, ' + P + ' #storm-bubble.pressed { background: #0F1720 !important; background-image: none !important; color: #fff !important; -webkit-text-fill-color: #fff !important; border: 0 !important; }'
    + P + ' #storm-bubble svg { color: #fff !important; stroke: #fff !important; }'
    + P + ' #storm-bubble #storm-bubble-t, ' + P + '.mgr-show-quote #storm-bubble #storm-bubble-t { font-size: 0 !important; color: transparent !important; -webkit-text-fill-color: transparent !important; background: url("https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/jobber-logo-white-open.png?v=1") center / 84px auto no-repeat !important; }'
    /* 14: search bar icons a pinch bigger */
    + P + ' #storm-qr-btn svg { width: 30px !important; height: 30px !important; }'
    + P + ' #gd-find svg, ' + P + ' #gd-find.st213 svg { width: 21px !important; height: 21px !important; }';
  var st = document.createElement('style'); st.id = 'fix-easy-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
  /* 13: use the logo the page already has built in (no download) when it is there */
  function logoFromPage() {
    if (logoFromPage.done) return;
    try {
      var s2 = document.getElementById('storm-v230-css'); if (!s2) return; logoFromPage.done = 1;
      var m = s2.textContent.match(/url\("(data:image\/png;base64,[^"]+)"\)/);
      if (m) st.textContent = st.textContent.split('https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/jobber-logo-white-open.png?v=1').join(m[1]);
    } catch (e) {}
  }

  /* ---------- 9 / 10 / 11: vibration ---------- */
  var KEY = '#sj214 [data-sj-bin], #pl196 [data-pl-bin]';
  var inClick = null;
  window.addEventListener('click', function (e) {
    var t = e.target; inClick = { key: !!(t && t.closest && t.closest(KEY)) };
    setTimeout(function () { inClick = null; }, 0);
  }, true);
  try {
    var NP = window.Navigator && Navigator.prototype, cur = NP && NP.vibrate;
    if (cur && !cur.__fe) {
      var last = 0;
      var soft = function (p) {
        try {
          var on = Array.isArray(p) ? p.some(function (x) { return Number(x) > 0; }) : Number(p) > 0;
          if (!on) return cur.call(this, p);           /* cancel still cancels */
          if (inClick && !inClick.key) return true;     /* ordinary taps: no buzz */
          var now = Date.now(); if (now - last < 120) return true; last = now;
          return cur.call(this, 3);                     /* one short tick */
        } catch (e) { return false; }
      };
      soft.__fe = 1; soft.__soft212 = 1;
      Object.defineProperty(NP, 'vibrate', { value: soft, writable: true, configurable: true });
    }
  } catch (e) {}

  /* ---------- 11 + 3: press effect on jobs and on the Loaded box, only on a real tap ---------- */
  var PRESS = JOBS + ', #sj214 .s-box';
  var pr = null;
  function clr() { if (!pr) return; clearTimeout(pr.t); var el = pr.el, w = Math.max(0, 110 - (Date.now() - (pr.on || 0))); if (pr.on) setTimeout(function () { el.classList.remove('fe-press'); }, w); else el.classList.remove('fe-press'); pr = null; }
  function cancel() { if (!pr) return; clearTimeout(pr.t); pr.el.classList.remove('fe-press'); pr = null; }
  document.addEventListener('pointerdown', function (e) {
    if (e.button) return; var el = e.target && e.target.closest && e.target.closest(PRESS); if (!el) return;
    cancel(); pr = { el: el, x: e.clientX, y: e.clientY, on: 0 };
    var me = pr; pr.t = setTimeout(function () { if (pr === me) { me.on = Date.now(); el.classList.add('fe-press'); } }, 80);
  }, true);
  document.addEventListener('pointermove', function (e) { if (pr && (Math.abs(e.clientX - pr.x) > 7 || Math.abs(e.clientY - pr.y) > 7)) cancel(); }, true);
  document.addEventListener('scroll', cancel, true);
  document.addEventListener('pointercancel', cancel, true);
  document.addEventListener('pointerup', function () { if (pr && !pr.on) { pr.on = Date.now(); pr.el.classList.add('fe-press'); } clr(); }, true);

  /* ---------- 1: cart +/- patches the cart in place ---------- */
  var KEEPC = /^(scx-|pressed$|fe-|ld$)/;
  function syncAttrs(a, b) {
    var i, n;
    for (i = a.attributes.length - 1; i >= 0; i--) { n = a.attributes[i].name; if (n !== 'class' && !b.hasAttribute(n)) a.removeAttribute(n); }
    for (i = 0; i < b.attributes.length; i++) { n = b.attributes[i]; if (n.name !== 'class' && a.getAttribute(n.name) !== n.value) a.setAttribute(n.name, n.value); }
    var keep = [].filter.call(a.classList, function (c) { return KEEPC.test(c); });
    var want = [].slice.call(b.classList); keep.forEach(function (c) { if (want.indexOf(c) < 0) want.push(c); });
    var now = [].slice.call(a.classList);
    if (now.join(' ') !== want.join(' ')) { now.forEach(function (c) { if (want.indexOf(c) < 0) a.classList.remove(c); }); want.forEach(function (c) { if (!a.classList.contains(c)) a.classList.add(c); }); }
  }
  function morph(a, b) {
    if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) { a.parentNode.replaceChild(b, a); return; }
    if (a.nodeType !== 1) { if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue; return; }
    if (a.nodeName === 'IMG') { var keepSrc = a.getAttribute('src') === b.getAttribute('src'); var s = a.getAttribute('src'); syncAttrs(a, b); if (keepSrc && a.getAttribute('src') !== s) a.setAttribute('src', s); return; }
    syncAttrs(a, b);
    if (a.nodeName === 'INPUT' && a.value !== b.value && document.activeElement !== a) a.value = b.value;
    if (a.nodeName === 'BUTTON' && a.disabled !== b.disabled) a.disabled = b.disabled;
    kids(a, b);
  }
  function kids(a, b) {
    var ka = [].slice.call(a.childNodes), kb = [].slice.call(b.childNodes), i;
    for (i = 0; i < kb.length; i++) { if (i < ka.length) morph(ka[i], kb[i]); else a.appendChild(kb[i]); }
    for (i = kb.length; i < ka.length; i++) if (ka[i].parentNode === a) a.removeChild(ka[i]);
  }
  /* The app (and the layers on top of it) redraw the whole cart on every +/-. We let that redraw and all its decorations run as
     usual, then, before the screen paints, put the cart that was on screen back and copy only what changed into it (the numbers
     and totals). Same nodes, same photos, same scroll spot: nothing jumps or flashes. */
  var pend = null;
  function settle() {
    var p = pend; pend = null; if (!p) return;
    restyle();
    try {
      var el = p.el; if (!el.isConnected) return;
      var tmp = document.createElement('div'); while (el.firstChild) tmp.appendChild(el.firstChild);
      p.old.forEach(function (n) { el.appendChild(n); });
      kids(el, tmp);
      if (el.scrollTop !== p.top) el.scrollTop = p.top;
      p.sc.forEach(function (q) { if (q[0].isConnected && q[0].scrollTop !== q[1]) q[0].scrollTop = q[1]; });
    } catch (e) { try { console.warn('fix-easy cart patch', e); } catch (x) {} }
  }
  function wrapRender() {
    var orig = window.renderPickSheet; if (typeof orig !== 'function' || orig.__fe) return null;
    var w = function () {
      var el = document.getElementById('pick-sheet'); if (!el) return orig.apply(this, arguments);
      if (!pend) {
        pend = { el: el, old: [].slice.call(el.childNodes), top: el.scrollTop,
          sc: [].map.call(el.querySelectorAll('*'), function (n) { return n.scrollTop ? [n, n.scrollTop] : null; }).filter(Boolean) };
        requestAnimationFrame(settle);
      }
      return orig.apply(this, arguments);
    };
    w.__fe = 1; return { o: orig, w: w };
  }
  window.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('#pick-sheet [data-pick-inc], #pick-sheet [data-pick-dec]'); if (!b) return;
    if (b.hasAttribute('data-pick-dec')) { var q = b.parentNode && b.parentNode.querySelector('.pick-qty'); var v = q ? parseFloat(String(q.textContent).replace(/[^0-9.]/g, '')) : 0; if (!(v > 1)) return; } /* last one off: the line goes, normal redraw */
    var W = wrapRender(); if (!W) return;
    window.renderPickSheet = W.w;
    setTimeout(function () { if (window.renderPickSheet === W.w) window.renderPickSheet = W.o; }, 0);
  }, true);
  /* a real tap: by the time the click reaches the window (bubble), the redraw and every decoration that hangs off it have run;
     copy the changes in now, before this frame paints (touch clicks run inside the frame, so a rAF would be one frame late) */
  function restyle() { try { if (typeof window.stormCl179All === 'function') window.stormCl179All(); } catch (e) {} }
  window.addEventListener('click', function (e) {
    var inCart = e.target && e.target.closest && e.target.closest('#pick-sheet');
    if (inCart || pend) restyle(); /* the cart's final look is normally applied 60 ms later (one raw frame = the jump); apply it now */
    if (pend && e.isTrusted) settle();
  }, false);

  /* ---------- 15: drawer labels ---------- */
  var LBL = [['#cl-menu [data-cl-go="staging"] .cl-name, [data-cl-go="staging"] .cl-name', 'Staging Job'], ['[data-sj214] .cl-name', 'Loading Materials']];
  function labels() {
    LBL.forEach(function (l) { [].forEach.call(document.querySelectorAll(l[0]), function (n) { if (n.textContent !== l[1]) n.textContent = l[1]; }); });
    logoFromPage();
  }
  labels();
  if (window.MutationObserver) new MutationObserver(labels).observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', labels);
})();
