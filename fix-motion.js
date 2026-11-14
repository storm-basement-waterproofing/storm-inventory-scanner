/* fix-motion.js (Hark, 2026-11-13, Dave's 35-item fix list: items 12, 17-28 = transitions, camera, customer search, back button, circles).
   Loaded by Index.html right after storm-clean-theme.js. Everything here is additive: CSS + capture-phase taps + observers.
   v1: 27 (Load on Truck job screen gets the N/M circle), 28 (Find a Job progress shows a N/M circle, blue -> green when complete).
   v2: 17 (top bar slides away from the very first scroll, also on the launch snapshot), 18 (All Items | Needs Ordering pill slides, list fades over). */
(function () {
  if (window.__fixMotion) return; window.__fixMotion = 1;
  var V = 2; var MC = 0;
  window.STORM_FIX_MOTION = V;
  var EASE = 'cubic-bezier(.32,.72,0,1)';
  function $(id) { return document.getElementById(id); }
  var css = ''
    /* shared ring: same look as the Ready to load on truck list ring */
    + '.fm-ring { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%; font-style: normal; }'
    + '.fm-ring > i { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #fff; font-style: normal; font-size: 12px; font-weight: 800; color: #0F1720; letter-spacing: -.01em; white-space: nowrap; }'
    + '.fm-ring.big { width: 72px; height: 72px; } .fm-ring.big > i { width: 58px; height: 58px; font-size: 17px; }'
    /* 17: the launch snapshot (a still copy of the home screen the wrapper shows and scrolls while the app starts) runs no script,
       so its top bar stayed put until the real app took over: in that copy the bar scrolls away with the page from the first move */
    + '@media (scripting: none) { html body #topbar { position: relative !important; } }'
    /* 18: All Items | Needs Ordering: a white pill slides under the tabs; the tab text colour eases */
    + 'html:not(#fma):not(#fmb):not(#fmc) body #topbar .tabs { position: relative !important; isolation: isolate; }'
    + 'html:not(#fma):not(#fmb):not(#fmc) body #topbar .tabs.fm-pilled > .tab, html:not(#fma):not(#fmb):not(#fmc) body #topbar .tabs.fm-pilled > .tab.active { background: transparent !important; box-shadow: none !important; position: relative; z-index: 1; transition: color .22s ease, transform .08s !important; }'
    + '#topbar .tabs > .fm-pill { position: absolute; left: 0; top: 0; z-index: 0; display: block; background: #fff; pointer-events: none; will-change: transform; box-shadow: 0 1px 3px rgba(15,23,32,.12); }'
    + '#topbar .tabs > .fm-pill.fm-go { transition: transform .26s ' + EASE + ', width .26s ' + EASE + ', opacity .2s ease; }'
    + '#list.fm-tabfade { transition: opacity .13s ease !important; opacity: 0 !important; }'
    + '#list.fm-tabin { transition: opacity .2s ease !important; }'
    + '@media (prefers-reduced-motion: reduce) { #topbar .tabs > .fm-pill.fm-go { transition: none; } }'
    /* 28: Find a Job: circle instead of "N of M" (bar stays) */
    + 'html body #job-find .tk-jp .tk-row { align-items: center !important; }'
    + 'html body #job-find .tk-jp .tk-row > span.fm-n { display: none !important; }'
    + 'html body #job-find .tk-jp .fm-ring { margin-left: 10px; }'
    + 'html body #job-find .tk-jp:has(.fm-ring.done) .tk-bar i { background: #16A34A !important; }'
    /* 27: Load on Truck job screen: circle at the left of the job card */
    /* the app redraws this screen in place after each tap, which dropped the outline look from the cards: keep it */
    + 'html body #sj214 .s-head, html body #sj214 .s-line:not(.on) { background: #fff !important; border: 1.5px solid #1B2735 !important; box-shadow: 0 1px 2px rgba(14,22,33,.04), 0 4px 14px rgba(14,22,33,.06) !important; }'
    + '#sj214 .s-head:has(> .fm-ring) { display: grid; grid-template-columns: auto 1fr; column-gap: 16px; align-items: center; }'
    + '#sj214 .s-head:has(> .fm-ring) > .fm-ring { grid-column: 1; grid-row: 1 / span 4; }'
    + '#sj214 .s-head:has(> .fm-ring) > :not(.fm-ring) { grid-column: 2; }';
  var st = document.createElement('style'); st.id = 'fix-motion-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function ringBg(d, n) { var p = n ? Math.min(1, d / n) : 0; var c = p >= 1 ? '#16A34A' : p > 0 ? '#29ABE2' : '#D5DDE6'; return 'conic-gradient(' + c + ' ' + Math.round(p * 360) + 'deg,#E3E8EF 0)'; }
  function setRing(r, d, n) {
    var t = d + '/' + n, bg = ringBg(d, n);
    if (r.__t !== t) { r.__t = t; r.firstChild.textContent = t; r.setAttribute('aria-label', d + ' of ' + n); }
    if (r.__bg !== bg) { r.__bg = bg; r.style.background = bg; }
    var dn = n > 0 && d >= n; if (r.classList.contains('done') !== dn) r.classList.toggle('done', dn);
  }
  function mkRing(big) { var r = document.createElement('span'); r.className = 'fm-ring' + (big ? ' big' : ''); r.setAttribute('role', 'img'); r.appendChild(document.createElement('i')); return r; }

  /* ---------- 28: Find a Job progress circle ---------- */
  function paint28() {
    var L = $('jf-list'); if (!L) return;
    [].forEach.call(L.querySelectorAll('.tk-jp'), function (p) {
      var row = p.querySelector('.tk-row'); if (!row) return;
      var sp = row.children[1], ring = row.querySelector('.fm-ring');
      var d = null, n = null;
      if (sp && !sp.classList.contains('fm-ring')) {
        var m = /(\d+)\s*of\s*(\d+)/.exec(sp.textContent || '');
        if (m) { d = +m[1]; n = +m[2]; if (!sp.classList.contains('fm-n')) sp.classList.add('fm-n'); }
      }
      if (n == null && p.classList.contains('p233') && p.classList.contains('full')) {
        /* staged / completed: no count in the text; show it complete when the bar is full */
        var i = p.querySelector('.tk-bar i'); if (i && /100%/.test(i.style.width || '')) { d = 1; n = 1; }
      }
      if (n == null || !n) { if (ring) ring.remove(); return; }
      if (!ring) { ring = mkRing(); row.appendChild(ring); }
      if (n === 1 && d === 1 && !(sp && /of/.test(sp.textContent || ''))) { ring.firstChild.textContent = '\u2713'; ring.__t = '\u2713'; ring.style.background = ringBg(1, 1); ring.__bg = ring.style.background; if (!ring.classList.contains('done')) ring.classList.add('done'); return; }
      setRing(ring, d, n);
    });
  }

  /* ---------- 27: Load on Truck job screen circle ---------- */
  function paint27() {
    var s = $('sj214'); if (!s) return;
    var head = s.querySelector('.s-wrap[data-v215="job"] > .s-head');
    if (!head) return;
    var k = null, j = null;
    try { k = window.stormSJ215 && stormSJ215.cur(); j = k && stormSJ215.job(k); } catch (e) {}
    var ring = head.querySelector(':scope > .fm-ring');
    if (!j || !j.lines) { if (ring) ring.remove(); return; }
    var n = j.lines.length, d = j.lines.filter(function (l) { return l.loaded; }).length;
    if (!ring) { ring = mkRing(true); ring.setAttribute('data-keep', ''); head.insertBefore(ring, head.firstChild); }
    setRing(ring, d, n);
  }

  /* ---------- 18: All Items | Needs Ordering ---------- */
  function pill(anim) {
    var tabs = document.querySelector('#topbar .tabs'); if (!tabs) return;
    var p = tabs.querySelector(':scope > .fm-pill'), a = tabs.querySelector(':scope > .tab.active');
    if (!a || !a.offsetWidth) { if (p) p.style.opacity = '0'; return; }
    if (!p) { p = document.createElement('i'); p.className = 'fm-pill'; p.setAttribute('aria-hidden', 'true'); tabs.insertBefore(p, tabs.firstChild); anim = false; }
    if (!tabs.classList.contains('fm-pilled')) tabs.classList.add('fm-pilled');
    var cs = getComputedStyle(a), w = a.offsetWidth + 'px', h = a.offsetHeight + 'px', tr = 'translate(' + a.offsetLeft + 'px,' + a.offsetTop + 'px)';
    if (anim === false) p.classList.remove('fm-go'); else if (!p.classList.contains('fm-go')) p.classList.add('fm-go');
    if (p.style.width !== w) p.style.width = w; if (p.style.height !== h) p.style.height = h;
    if (p.style.transform !== tr) p.style.transform = tr;
    if (p.style.borderRadius !== cs.borderRadius) p.style.borderRadius = cs.borderRadius;
    if (p.style.opacity !== '1') p.style.opacity = '1';
    if (anim === false) { void p.offsetWidth; requestAnimationFrame(function () { p.classList.add('fm-go'); }); }
  }
  var tabBusy = 0;
  window.addEventListener('click', function (e) {
    var t = e.target, b = t && t.closest && t.closest('#tab-all, #tab-need'); if (!b) return;
    var want = b.id === 'tab-need' ? 'need' : 'all';
    var L = $('list'); if (!L || typeof window.render !== 'function') return; /* base handler as before */
    e.stopImmediatePropagation();
    if (b.classList.contains('active') && window.tab === want) return;
    var other = $(want === 'need' ? 'tab-all' : 'tab-need');
    b.classList.add('active'); if (other) other.classList.remove('active');
    pill(true);
    var my = ++tabBusy;
    L.classList.remove('fm-tabin'); L.classList.add('fm-tabfade');
    setTimeout(function () {
      if (my !== tabBusy) return;
      window.tab = want;
      try { window.render(); } catch (x) {}
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        if (my !== tabBusy) return;
        L.classList.add('fm-tabin'); L.classList.remove('fm-tabfade');
        setTimeout(function () { if (my === tabBusy) L.classList.remove('fm-tabin'); }, 240);
      }); });
    }, 140); /* the pill slides first; the list is rebuilt while it is faded out, so the slide never stutters */
  }, true);
  window.addEventListener('resize', function () { pill(false); });

  var q = 0;
  function paintAll() { q = 0; try { paint28(); } catch (e) {} try { paint27(); } catch (e) {} try { pill(); } catch (e) {} }
  function soon() { if (!q) q = requestAnimationFrame(paintAll); }
  if (window.MutationObserver) new MutationObserver(function (ms) {
    MC += ms.length; window.__fmMC = MC;
    for (var i = 0; i < ms.length; i++) {
      var t = ms[i].target; if (!t || t.nodeType !== 1) t = t && t.parentNode; if (!t || !t.closest) continue;
      if (t.closest('.fm-ring') || t.classList.contains('fm-pill')) continue;
      if (t.id === 'tab-all' || t.id === 'tab-need' || (t.closest('#topbar') && ms[i].type === 'attributes' && ms[i].attributeName === 'class')) soon();
      if (t.closest('#jf-list')) { try { paint28(); } catch (e) {} }
      if (t.closest('#sj214')) { try { paint27(); } catch (e) {} }
    }
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style'] });
  setInterval(function () { if (!document.hidden) soon(); }, 1500);
  soon();
})();
