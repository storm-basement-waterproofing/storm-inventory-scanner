/* fix-motion.js (Hark, 2026-11-13, Dave's 35-item fix list: items 12, 17-28 = transitions, camera, customer search, back button, circles).
   Loaded by Index.html right after storm-clean-theme.js. Everything here is additive: CSS + capture-phase taps + observers.
   v1: 27 (Load on Truck job screen gets the N/M circle), 28 (Find a Job progress shows a N/M circle, blue -> green when complete).
   v2: 17 (top bar slides away from the very first scroll, also on the launch snapshot), 18 (All Items | Needs Ordering pill slides, list fades over).
   v3: 20 (Find a Job slides in like the other sheets, once its list is drawn), 21 + 22 (the camera's soft blur covers the main screen
   while Find a Job hands over to Customer Search and while Customer Search and the Jobber quote swap), 23 (saved jobs filter on the
   phone as you type, a late server answer never overwrites a newer search or an open job, clear "No customers match" wording),
   24 (closing Find a Job and reopening it comes back to the same search, scroll spot or open job), 25 (Back on Customer Search when it
   came from a job in Find a Job / Staging Job), 26 (the floating + stays on Item details).
   v4: 23 follow-up: when nothing matches, one line "No customers match ..." (the empty From Jobber heading under it is hidden). */
(function () {
  if (window.__fixMotion) return; window.__fixMotion = 1;
  var V = 4; var MC = 0;
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
    /* 26: Item details: the floating + (camera, cart, Customer Search...) stays with you instead of sliding away. Only Item details;
       other pages, open sheets, the side menu and the label sheet still tuck it away as before. */
    + 'html:not(#fma) body:has(#detail.detail-overlay.open):not(:has(.detail-overlay.open:not(#detail))):not(:has(.pick-sheet.open)):not(:has(.confirm-box.open)):not(:has(.drawer.open)):not(:has(#lbl-sheet.open)):not(.st-pre) #fab-dock.fab-dock { transform: none !important; opacity: 1 !important; pointer-events: auto !important; transition: transform .26s ' + EASE + ', opacity .22s ease !important; }'
    + 'html:not(#fma) body:has(#detail.detail-overlay.open):not(:has(.detail-overlay.open:not(#detail))):not(:has(.pick-sheet.open)):not(:has(.confirm-box.open)):not(:has(.drawer.open)):not(:has(#lbl-sheet.open)):not(.st-pre) #fab-dock.fab-dock > #st-plus { pointer-events: auto !important; }'
    + 'html:not(#fma) body:has(#detail.detail-overlay.open):not(:has(.detail-overlay.open:not(#detail))):not(:has(.pick-sheet.open)):not(:has(.confirm-box.open)):not(:has(.drawer.open)):not(:has(#lbl-sheet.open)):not(.st-pre) #fab-dock.fab-dock .cart-fab-total { opacity: 1 !important; }'
    /* 20: Find a Job opens with the app's sheet slide (transform + opacity); the card waits (max ~0.45 s) until its list is drawn so it
       never pops in half-built; the page behind gets the camera's soft blur (22) */
    + 'html:not(#fma) body #job-find { opacity: 1 !important; isolation: isolate; background: transparent !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; transition: none !important; }'
    + 'html:not(#fma) body #job-find::before { content: ""; position: fixed; inset: 0; z-index: -1; background: rgba(11,17,24,.30); -webkit-backdrop-filter: blur(18px) saturate(1.15); backdrop-filter: blur(18px) saturate(1.15); opacity: 0; transition: opacity .3s ' + EASE + '; pointer-events: none; }'
    + 'html:not(#fma) body #job-find.on::before { opacity: 1; }'
    + 'html:not(#fma) body #job-find .jf-card { opacity: 0; transform: translate3d(0,32px,0) !important; transition: transform .26s ' + EASE + ', opacity .2s ease !important; will-change: transform, opacity; }'
    + 'html:not(#fma) body #job-find.on:not(.fm-wait) .jf-card { opacity: 1; transform: none !important; }'
    + '#job-find .fm-sk { display: flex; gap: 12px; align-items: center; padding: 12px; border-radius: 12px; border: 1.5px solid #E3E8EF; }'
    + '#job-find .fm-sk span { flex: 1; min-width: 0; }'
    + '#job-find .fm-sk i { display: block; height: 10px; margin: 6px 0; border-radius: 6px; background: linear-gradient(90deg,#EEF2F7 0,#F6F8FB 50%,#EEF2F7 100%); background-size: 200% 100%; animation: fmsk 1.2s ease-in-out infinite; }'
    + '@keyframes fmsk { from { background-position: 100% 0; } to { background-position: -100% 0; } }'
    + '#job-find .fm-none { padding: 18px 6px 6px; text-align: center; color: #374151; font-size: 15px; font-weight: 700; }'
    + '#job-find .fm-none small { display: block; margin-top: 4px; color: #6B7280; font-size: 13px; font-weight: 500; }'
    + '#job-find .fm-sec { font-size: 12px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: #6B7280; margin-top: 2px; }'
    /* 22: one soft blur (the camera's) sits behind Customer Search and the Jobber quote, so switching never shows the main screen */
    + '#fm-qfblur { position: fixed; inset: 0; z-index: 101; background: rgba(11,17,24,.30); -webkit-backdrop-filter: blur(18px) saturate(1.15); backdrop-filter: blur(18px) saturate(1.15); opacity: 0; pointer-events: none; transition: opacity .3s ' + EASE + '; }'
    + 'body.mgr-qf #fm-qfblur, body.fm-bridge #fm-qfblur { opacity: 1; }'
    /* 25: Back on Customer Search when it was opened from a job in Find a Job / Staging Job */
    + '#pull-sheet .fm-back { position: absolute; left: 14px; top: 14px; z-index: 5; display: inline-flex; align-items: center; gap: 3px; height: 36px; padding: 0 14px 0 8px; border-radius: 18px; border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.12); color: #fff; font: 700 14.5px/1 Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; letter-spacing: .1px; -webkit-tap-highlight-color: transparent; cursor: pointer; opacity: 0; transform: translateX(-6px); transition: opacity .22s ease, transform .26s ' + EASE + '; }'
    + '#pull-sheet .fm-back.in { opacity: 1; transform: none; }'
    + '#pull-sheet .fm-back svg { width: 18px; height: 18px; display: block; }'
    + '#pull-sheet .fm-back.in:active { transform: scale(.94); background: rgba(255,255,255,.2); }'
    + '@media (prefers-reduced-motion: reduce) { html:not(#fma) body #job-find .jf-card { transition: opacity .15s ease !important; transform: none !important; } }'
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

  /* ================= 20 / 23 / 24 / 25 / 21 / 22: Find a Job + Customer Search ================= */
  function lc(t) { return String(t == null ? '' : t).replace(/\s+/g, ' ').trim().toLowerCase(); }
  function qNow() { var q = $('jf-q'); return q ? q.value : ''; }
  function escH(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---- 23: saved jobs answer from the phone at once (same matching as the server: every word in first + last + address),
     the server's answer follows and only redraws if it differs; an answer for an older query never lands ---- */
  var SJ = { all: null, full: false, pend: 0 };
  try { var c227 = JSON.parse(localStorage.getItem('storm227:sj') || 'null'); var a227 = c227 && JSON.parse(c227.j); if (Array.isArray(a227)) { SJ.all = a227; SJ.full = a227.length < 40; } } catch (e) {}
  function local(q) {
    var w = lc(q).split(' ').filter(String);
    return (SJ.all || []).filter(function (r) { var h = lc(r.first + ' ' + r.last + ' ' + r.address); return w.every(function (x) { return h.indexOf(x) !== -1; }); });
  }
  function sig(a) { return (Array.isArray(a) ? a : []).map(function (r) { return [r.id, r.first, r.last, r.address, r.lines, r.units, r.saved].join('|'); }).join('\n'); }
  function openDetail() { var L = $('jf-list'); return !!(L && L.querySelector('.jf-detail')); }
  function wrapRun(r, h) {
    return new Proxy(r, { get: function (t, p) {
      var v = t[p];
      if (p === 'withSuccessHandler') return function (fn) { return wrapRun(v.call(t, fn), { s: fn, f: h.f, u: h.u }); };
      if (p === 'withFailureHandler') return function (fn) { return wrapRun(v.call(t, fn), { s: h.s, f: fn, u: h.u }); };
      if (p === 'withUserObject') return function (o) { return wrapRun(v.call(t, o), { s: h.s, f: h.f, u: o }); };
      if (p === 'searchJobs') return function (q0) {
        var q = String(q0 == null ? '' : q0), typed = !!lc(q), gave = null;
        function cur() { return lc(qNow()) === lc(q); }
        if (typed && SJ.all) { gave = local(q); setTimeout(function () { if (cur() && h.s) h.s(gave, h.u); }, 0); }
        SJ.pend++; paintSoon23();
        var rr = t.withSuccessHandler(function (res) {
          SJ.pend = Math.max(0, SJ.pend - 1);
          if (!typed && Array.isArray(res)) { SJ.all = res; SJ.full = res.length < 40; }
          if (!cur()) { paintSoon23(); return; } /* the box has moved on: an older answer never redraws the list */
          if (gave && (sig(gave) === sig(res) || openDetail())) { paintSoon23(); return; } /* same list, or a job is open: the late answer never pulls it shut */
          if (h.s) h.s(res, h.u); paintSoon23();
        }).withFailureHandler(function (e) { SJ.pend = Math.max(0, SJ.pend - 1); if (gave) { paintSoon23(); return; } if (h.f) h.f(e, h.u); });
        return rr.searchJobs(q0);
      };
      return typeof v === 'function' ? v.bind(t) : v;
    } });
  }
  (function install(n) {
    var g = window.google && google.script;
    if (!g || !g.run || typeof Proxy !== 'function' || (!window.__v233run && n < 60)) { if (n < 80) setTimeout(function () { install(n + 1); }, 250); return; }
    if (window.__fmRun) return; window.__fmRun = 1;
    var w = wrapRun(g.run, {});
    try { g.run = w; } catch (e) {}
    if (g.run !== w) { try { Object.defineProperty(g, 'run', { configurable: true, get: function () { return w; } }); } catch (e) {} }
  })(0);
  /* typing: the app waits 300 ms after each key; with the answer coming from the phone, 120 ms is enough */
  var oST = null;
  window.addEventListener('input', function (e) { if (e.target && e.target.id === 'jf-q' && !oST) { oST = window.setTimeout; window.setTimeout = function (f, ms) { return oST.call(window, f, ms === 300 ? 120 : ms); }; } }, true);
  window.addEventListener('input', function () { if (oST) { window.setTimeout = oST; oST = null; } }, false);
  document.addEventListener('input', function () { if (oST) { window.setTimeout = oST; oST = null; } }, false);

  /* ---- 23: clear messages. Saved jobs = "In the app", Jobber jobs = "From Jobber"; one plain line when nothing matches ---- */
  function hide(e, on) { if (!e) return; if (on) { if (!e.hasAttribute('data-fm-h')) { e.setAttribute('data-fm-h', ''); e.style.setProperty('display', 'none', 'important'); } } else if (e.hasAttribute('data-fm-h')) { e.removeAttribute('data-fm-h'); e.style.removeProperty('display'); } }
  function paint23() {
    var L = $('jf-list'); if (!L || L.querySelector(':scope > .jf-detail')) return;
    var q = String(qNow()).trim(), em = [].slice.call(L.querySelectorAll(':scope > .jf-empty, :scope > [data-fm-sv], :scope > [data-fm-jb]'));
    var sv = null, jb = null, jbSec = null;
    em.forEach(function (e) { var t = e.textContent || ''; if (/^No saved jobs/.test(t) || e.hasAttribute('data-fm-sv')) sv = e; else if (/^No (upcoming )?Jobber jobs/.test(t) || e.hasAttribute('data-fm-jb')) jb = e; });
    [].forEach.call(L.querySelectorAll(':scope > .jf-sec'), function (x) { if (/jobber/i.test(x.textContent)) jbSec = x; });
    var hideSec = false;
    var hasSv = !!L.querySelector(':scope > .jf-item[data-jf-i]'), hasJb = !!L.querySelector(':scope > .jf-item[data-jf-jb]');
    var jbLoading = !!(jbSec && !hasJb && !jb && /Loading/.test(L.textContent || ''));
    /* section label over the saved jobs */
    var top = L.querySelector(':scope > .fm-sec');
    var first = L.firstElementChild && L.firstElementChild.classList.contains('fm-sec') ? L.firstElementChild.nextElementSibling : L.firstElementChild;
    if (hasSv) { if (!top) { top = document.createElement('div'); top.className = 'jf-sec fm-sec'; top.textContent = 'Started in the app'; L.insertBefore(top, L.firstChild); } }
    else if (top) top.remove();
    if (sv) {
      sv.setAttribute('data-fm-sv', '');
      if (SJ.pend && !SJ.all) { /* still loading: grey rows instead of "No saved jobs yet." */
        if (!sv.querySelector('.fm-sk')) { sv.className = 'fm-skw'; sv.innerHTML = [0, 1].map(function () { return '<div class="fm-sk"><span><i style="width:55%"></i><i style="width:80%"></i></span></div>'; }).join(''); }
      } else if (hasJb || jbLoading) { hide(sv, 1); }
      else if (q && jb) { hide(sv, 0); sv.className = 'fm-none'; var nh = 'No customers match \u201c' + escH(q) + '\u201d<small>Check the spelling, or try part of the name or the street.</small>'; if (sv.__h !== nh) { sv.__h = nh; sv.innerHTML = nh; } hide(jb, 1); if (jbSec) hideSec = true; }
      else if (q) { hide(sv, 0); sv.className = 'jf-empty'; sv.textContent = 'Nothing started in the app for \u201c' + q + '\u201d.'; }
      else { hide(sv, 0); sv.className = 'jf-empty'; sv.textContent = 'No jobs started in the app yet.'; }
    }
    hide(jbSec, hideSec);
    if (jb) { jb.setAttribute('data-fm-jb', ''); if (q && !(sv && !sv.hasAttribute('data-fm-h') && sv.classList.contains('fm-none'))) { var tx = 'No Jobber jobs match \u201c' + q + '\u201d.'; if (jb.textContent !== tx) jb.textContent = tx; } }
  }
  var p23 = 0; function paintSoon23() { if (!p23) p23 = requestAnimationFrame(function () { p23 = 0; try { paint23(); } catch (e) {} }); }

  /* ---- 24: where Find a Job was left (search, scroll, the job that was open) ---- */
  var ST = null, KS = 'fmFind24';
  try { ST = JSON.parse(sessionStorage.getItem(KS) || 'null'); } catch (e) {}
  function keep() { try { sessionStorage.setItem(KS, JSON.stringify(ST)); } catch (e) {} }
  function rowKey(b) { if (!b) return null; var n = b.querySelector('.jf-name'), a = b.querySelector('.jf-addr'); return { jb: b.hasAttribute('data-jf-jb'), n: lc(n && n.childNodes[0] ? n.childNodes[0].textContent : n ? n.textContent : ''), a: lc(a ? a.textContent : '') }; }
  function note(over) { var L = $('jf-list'); ST = Object.assign({ q: qNow(), y: L && !L.querySelector('.jf-detail') ? L.scrollTop : (ST && ST.y) || 0, d: (ST && ST.d) || null, t: Date.now(), x: 0 }, over || {}); keep(); }
  document.addEventListener('scroll', function (e) { if (e.target && e.target.id === 'jf-list' && !e.target.querySelector('.jf-detail') && !restoring) note(); }, true);
  window.addEventListener('input', function (e) { if (e.target && e.target.id === 'jf-q' && !restoring) note({ y: 0, d: null }); }, true);

  /* ---- 20: open: card waits for its list, then slides in; 24: restore ---- */
  var restoring = 0, openAt = 0;
  function ready(L) { if (!L) return false; if (L.querySelector('.jf-detail')) return true; var t = L.textContent || ''; return !!L.querySelector('.jf-item') || (!/Loading saved jobs/.test(t) && !SJ.pend); }
  function findRow(L, d) { var rows = L.querySelectorAll('.jf-item'); for (var i = 0; i < rows.length; i++) { var k = rowKey(rows[i]); if (k && k.jb === d.jb && k.n === d.n && (!d.a || k.a === d.a)) return rows[i]; } return null; }
  function onOpen(w) {
    if (w.__fm) return; w.__fm = 1; openAt = Date.now();
    w.classList.add('fm-wait');
    var st = ST && Date.now() - ST.t < 30 * 60e3 ? ST : null;
    var want = st && (lc(st.q) || st.y > 0 || (st.d && st.x)) ? st : null;
    restoring = want ? 1 : 0;
    var t0 = Date.now(), done = false, q = $('jf-q');
    if (want && q && lc(want.q)) { q.value = want.q; try { q.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {} }
    if (want && q) q.addEventListener('focus', function bl() { q.removeEventListener('focus', bl); if (Date.now() - openAt < 900) try { q.blur(); } catch (e) {} });
    function show() { if (done) return; done = true; requestAnimationFrame(function () { w.classList.remove('fm-wait'); }); setTimeout(function () { restoring = 0; }, 700); }
    (function tick() {
      if (!w.isConnected) return;
      var L = $('jf-list');
      var okQ = !want || (lc(qNow()) === lc(want.q) && (!lc(want.q) || Date.now() - t0 > 180));
      if (ready(L) && okQ) {
        if (want && want.d && want.x) { var r = findRow(L, want.d); if (r && !L.querySelector('.jf-detail')) { r.click(); } ST.x = 0; keep(); show(); return; }
        if (want && want.y && L) { L.scrollTop = want.y; if (Date.now() - t0 < 600 && L.scrollTop < want.y - 2) { setTimeout(tick, 60); return; } }
        show(); return;
      }
      if (Date.now() - t0 > 450) { show(); if (want && want.y && L) setTimeout(function () { var L2 = $('jf-list'); if (L2 && !L2.querySelector('.jf-detail')) L2.scrollTop = want.y; }, 300); return; }
      setTimeout(tick, 30);
    })();
  }

  /* ---- 25: Back on Customer Search ---- */
  var BACK = null;
  var BACKSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  function pullOpen() { var s = $('pull-sheet'); return !!(s && s.classList.contains('open')); }
  function paint25() {
    var s = $('pull-sheet'); if (!s) return;
    var b = s.querySelector(':scope > .fm-back');
    if (!BACK || !pullOpen()) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'fm-back'; b.setAttribute('aria-label', 'Back to Find a Job'); b.innerHTML = BACKSVG + '<span>Back</span>'; s.insertBefore(b, s.firstChild); requestAnimationFrame(function () { requestAnimationFrame(function () { b.classList.add('in'); }); }); }
    var x = s.querySelector('[data-pull-close]');
    if (x) { var rx = x.getBoundingClientRect(), rs = s.getBoundingClientRect(), tp = Math.round(rx.top - rs.top + (rx.height - 36) / 2) + 'px'; if (rx.height && b.style.top !== tp) b.style.top = tp; }
  }
  function openFindNow() {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-jc-find', '1');
    b.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';
    document.body.appendChild(b); try { b.click(); } finally { b.remove(); }
  }

  /* ---- taps ---- */
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var f = t.closest('#job-find');
    if (f) {
      var row = t.closest('.jf-item');
      if (row) { note({ d: rowKey(row), x: 0 }); return; }
      if (t.closest('[data-jf-back]')) { note({ d: null, x: 0 }); return; }
      if (t.closest('[data-jf-close]') || t === f) { if (ST) { ST.x = ST.d && f.querySelector('.jf-detail') ? 1 : 0; ST.t = Date.now(); keep(); } return; } /* 24: X by accident: come back to the same job */
      if (t.closest('[data-jf-jb-load], [data-jf-edit], [data-jf-load]')) {
        BACK = { d: ST && ST.d, t: Date.now() };
        /* 21 / 22: the soft blur stays up while Find a Job slides away and Customer Search slides in, so the main screen never flashes */
        document.body.classList.add('fm-bridge'); clearTimeout(window.__fmBr); window.__fmBr = setTimeout(function () { document.body.classList.remove('fm-bridge'); }, 1100);
        setTimeout(paint25, 60); setTimeout(paint25, 400);
        return;
      }
      return;
    }
    if (t.closest('#pull-sheet .fm-back')) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (ST && BACK) { ST.d = BACK.d; ST.x = BACK.d ? 1 : 0; ST.t = Date.now(); keep(); }
      openFindNow(); return;
    }
    if (t.closest('[data-jc-clear], [data-x199-c]')) { BACK = null; setTimeout(paint25, 0); }
  }, true);

  /* blur layer for 22 */
  function blurEl() { if ($('fm-qfblur') || !document.body) return; var d = document.createElement('div'); d.id = 'fm-qfblur'; d.setAttribute('aria-hidden', 'true'); document.body.appendChild(d); }

  if (window.MutationObserver) new MutationObserver(function (ms) {
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i];
      for (var j = 0; j < m.addedNodes.length; j++) { var n = m.addedNodes[j]; if (n.nodeType === 1 && n.id === 'job-find') onOpen(n); }
      if (m.target && m.target.id === 'jf-list' && m.type === 'childList') { try { paint23(); } catch (e) {} }
      if (m.target && m.target.id === 'pull-sheet' && m.type === 'attributes') { if (!pullOpen()) BACK = null; paint25(); }
    }
  }).observe(document.body || document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  (function boot(n) { if (document.body) { blurEl(); return; } if (n < 40) setTimeout(function () { boot(n + 1); }, 100); })(0);

  var q = 0;
  function paintAll() { q = 0; try { paint28(); } catch (e) {} try { paint27(); } catch (e) {} try { pill(); } catch (e) {} try { paint25(); } catch (e) {} }
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
