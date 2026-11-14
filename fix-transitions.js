/* fix-transitions.js (Hark, 2026-11-14, Dave's fix list batch 2, items 6-9: smooth screens). Loaded by Index.html after fix-search.js.
   Overlay only: CSS + observers + Web Animations on the app's own elements. No server calls, no data changes.
   6. Customer Search (the + menu button, #pull-fab) shows at once: a short rise + fade that starts the moment it is tapped (the old
      full-height slide lost its first frames to the work the tap does, so it looked late), and on a new job (no customer yet) the
      First name box is focused in the same tap, so the keyboard comes up and the crew can type right away. Find a Job (Staging Job)
      shows its card right away (cached jobs / grey rows) instead of waiting for the list, unless it is restoring where you left off.
   7. Jobber quote <-> Staging list (the floating JOBBER pill, or fix-custcard's Jobber button in the Stage Job row, which taps it): the two sheets crossfade in place (new one fades up over the old) instead of
      one sliding down while the other slides up.
   8. Print preview (fix-print #fp31 and fix-jobprint #jp14): fades up in and down out on the compositor, started after the sheet is drawn, and stays until its fade ends.
   9. Stage Job: slides in from the right after its first draw (no lost frames) and slides back out fully before it hides.
   Shared helper for other overlays: window.stormTx.open(el, {from:'right'|'bottom'|'up'|'fade', dur, wait}),
   stormTx.close(el, {to, dur, hold}), stormTx.play(el, keyframes, {dur, wait}), stormTx.settle(cb, maxMs), stormTx.EASE.
   v1. */
(function () {
  if (window.__fixTx) return; window.__fixTx = 1;
  var V = 1; window.STORM_FIX_TX = V;
  var EASE = 'cubic-bezier(.32,.72,0,1)'; /* same curve as fix-motion / fix-print / the v225 crossfade */
  var RM = false; try { RM = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var CAN = !!(document.documentElement && document.documentElement.animate);
  function $(id) { return document.getElementById(id); }
  function now() { return performance.now(); }

  var css = ''
    /* 9: Stage Job: the app's keyframe slide is replaced by ours */
    + 'html body #pl196.tx-a.open, html body #pl196.tx-a.closing { animation: none !important; }'
    + 'html body #pl196.tx-hold { display: block !important; animation: none !important; pointer-events: none !important; }'
    + 'html body #pl196.tx-a { will-change: transform; }'
    /* 7: while the Jobber quote and the Staging list swap, their own slides are off (the crossfade runs instead) */
    + 'html body.tx-qx #pull-sheet, html body.tx-qx #quote-sheet { transition: none !important; }'
    + 'html:not(#txz) body.tx-qx.mgr-qf #pull-sheet.tx-hq, html:not(#txz) body.tx-qx.mgr-qf #quote-sheet.tx-hq { transform: none !important; }'
    /* 6: the Customer Search rise replaces the slide for that one open */
    + 'html body #pull-sheet.tx-ns { transition: none !important; }'
    /* 6: Find a Job card at once (fix-motion holds it until the list is drawn) */
    + 'html:not(#fma):not(#txa) body #job-find.on.fm-wait.tx-now .jf-card { opacity: 1; transform: none !important; }'
    /* 8: print preview: our fade replaces its CSS transition */
    + 'html body #fp31.tx-pv, html body #fp31.tx-pv.in, html body #jp14.tx-pv, html body #jp14.tx-pv.in { transition: none !important; }';
  function putCss() { if ($('fix-tx-css')) return; var st = document.createElement('style'); st.id = 'fix-tx-css'; st.textContent = css; (document.head || document.documentElement).appendChild(st); }
  putCss();

  /* ---------- helper ---------- */
  /* settle: wait until the tap's own work has been drawn (one short frame after at least two frames), at most maxMs */
  function settle(cb, maxMs) {
    var t0 = now(), last = t0, n = 0, ok = 0, done = false;
    function go() { if (done) return; done = true; cb(); }
    setTimeout(go, (maxMs || 200) + 60); /* rAF can be held while hidden */
    requestAnimationFrame(function f() {
      var t = now(), d = t - last; last = t; n++;
      ok = d < 26 ? ok + 1 : 0; /* two smooth frames in a row = the tap's work is drawn */
      if ((n >= 2 && ok >= 2) || t - t0 >= (maxMs || 200)) { go(); return; }
      requestAnimationFrame(f);
    });
  }
  function play(el, kf, o) {
    o = o || {};
    if (!CAN || !el) return null;
    var a;
    try { a = el.animate(kf, { duration: RM ? 1 : (o.dur || 300), easing: o.ease || EASE, fill: 'both' }); } catch (e) { return null; }
    if (o.wait && !RM) { a.pause(); settle(function () { try { if (a.playState === 'paused') a.play(); } catch (e) {} }, o.wait); }
    else { try { a.startTime = document.timeline.currentTime; } catch (e) {} } /* time-based from the tap: late frames never stretch it */
    return a;
  }
  function fin(a, cb) { if (!a) { cb(); return; } var d = false; function f() { if (d) return; d = true; cb(); } try { a.finished.then(f, f); } catch (e) { f(); } }
  var OFF = { right: 'translate3d(100%,0,0)', bottom: 'translate3d(0,100%,0)', up: 'translate3d(0,28px,0)', fade: 'none' };
  function kIn(from) { var o = from === 'up' || from === 'fade' ? 0 : 1; return [{ transform: OFF[from] || OFF.right, opacity: o }, { transform: 'none', opacity: 1 }]; }
  function kOut(to) { var o = to === 'up' || to === 'fade' ? 0 : 1; return [{ transform: 'none', opacity: 1 }, { transform: OFF[to] || OFF.right, opacity: o }]; }
  function open(el, o) {
    o = o || {}; if (!el) return Promise.resolve();
    if (el.__txA) { try { el.__txA.cancel(); } catch (e) {} }
    var a = el.__txA = play(el, kIn(o.from || 'right'), { dur: o.dur || 360, wait: o.wait == null ? 200 : o.wait });
    return new Promise(function (res) { fin(a, function () { if (el.__txA === a) { el.__txA = null; try { a.cancel(); } catch (e) {} } res(); }); });
  }
  function close(el, o) {
    o = o || {}; if (!el) return Promise.resolve();
    if (el.__txA) { try { el.__txA.cancel(); } catch (e) {} }
    if (o.hold !== false) el.classList.add('tx-hold');
    var a = el.__txA = play(el, kOut(o.to || 'right'), { dur: o.dur || 300 });
    return new Promise(function (res) { fin(a, function () { if (el.__txA === a) { el.__txA = null; el.classList.remove('tx-hold'); try { a.cancel(); } catch (e) {} } res(); }); });
  }
  window.stormTx = { V: V, EASE: EASE, settle: settle, play: play, open: open, close: close, kIn: kIn, kOut: kOut };

  /* ---------- 9: Stage Job (#pl196) ---------- */
  function pl(el, had, has) {
    var wasOpen = /\bopen\b/.test(had), isOpen = /\bopen\b/.test(has), isClosing = /\bclosing\b/.test(has), wasClosing = /\bclosing\b/.test(had);
    if (isOpen && !wasOpen) {
      el.classList.add('tx-a'); el.classList.remove('tx-hold');
      open(el, { from: 'right', dur: 380, wait: 450 });
    } else if (isClosing && !wasClosing && !isOpen) {
      el.classList.add('tx-a');
      close(el, { to: 'right', dur: 320 });
    }
  }

  /* ---------- 6: Customer Search (#pull-sheet) from the + menu ---------- */
  var fabAt = 0;
  window.addEventListener('click', function (e) { var t = e.target; if (t && t.closest && t.closest('#pull-fab')) fabAt = now(); }, true);
  window.addEventListener('click', function (e) {
    var t = e.target; if (!(t && t.closest && t.closest('#pull-fab'))) return;
    var s = $('pull-sheet'); if (!s || !s.classList.contains('open') || !s.classList.contains('tc-empty')) return;
    if (document.body.classList.contains('mgr-show-quote')) return;
    var f = s.querySelector('input[data-jc="first"]'); if (!f || f.value) return;
    try { f.focus({ preventScroll: true }); } catch (x) { try { f.focus(); } catch (y) {} }
  }, false);
  function ps(el, had, has) {
    if (!/\bopen\b/.test(has) || /\bopen\b/.test(had)) return;
    if (now() - fabAt > 1200) return; /* only the + menu tap; other ways in keep their own motion */
    if (document.body.classList.contains('mgr-show-quote')) return;
    el.classList.add('tx-ns');
    if (el.__txA) { try { el.__txA.cancel(); } catch (e) {} }
    var a = el.__txA = play(el, [{ transform: 'translate3d(0,32px,0)', opacity: 0 }, { transform: 'none', opacity: 1 }], { dur: 280 });
    fin(a, function () { if (el.__txA === a) { el.__txA = null; try { a.cancel(); } catch (e) {} } el.classList.remove('tx-ns'); });
  }

  /* ---------- 7: Jobber quote <-> Staging list crossfade ---------- */
  var QS = null, QP = 0; /* 'q' | 's' | null (Customer Search not up in quote mode); QP: waiting for the quote sheet to be built */
  function qState() {
    var b = document.body, p = $('pull-sheet');
    if (!b || !p || !p.classList.contains('open') || !b.classList.contains('mgr-qf')) return null;
    return b.classList.contains('mgr-show-quote') ? 'q' : 's';
  }
  var qTimer = 0;
  function qCheck() {
    var st = qState(), was = QS; QS = st;
    if (st && was && st !== was) QP = 1;
    if (!st) QP = 0;
    if (!QP) return;
    var b = document.body, p = $('pull-sheet'), q = $('quote-sheet');
    if (!q) return; /* first open: the quote sheet is still being built; its insert calls us again */
    QP = 0; if (!CAN) return;
    b.classList.add('tx-qx'); clearTimeout(qTimer);
    if (q.__txQ) { try { q.__txQ.cancel(); } catch (e) {} q.__txQ = null; } p.classList.remove('tx-hq'); q.classList.remove('tx-hq');
    var D = 300, W = 300, top, held;
    if (st === 'q') { /* the quote fades up over the list, which stays put under it */
      held = p; p.classList.add('tx-hq');
      top = q.__txQ = play(q, [{ opacity: 0, transform: 'translate3d(0,18px,0)' }, { opacity: 1, transform: 'none' }], { dur: D, wait: W });
    } else { /* the quote (it sits above) fades off the list */
      held = q; q.classList.add('tx-hq');
      top = q.__txQ = play(q, [{ opacity: 1 }, { opacity: 0 }], { dur: D - 60, wait: W });
    }
    function end() { if (q.__txQ !== top) return; q.__txQ = null; p.classList.remove('tx-hq'); q.classList.remove('tx-hq'); try { top && top.cancel(); } catch (e) {}
      /* the held sheet jumps (unseen) to its closed spot while slides are still off; slides come back a frame later */
      void b.offsetWidth; requestAnimationFrame(function () { requestAnimationFrame(function () { if (!q.__txQ) b.classList.remove('tx-qx'); }); }); }
    fin(top, end); qTimer = setTimeout(end, D + W + 600);
  }
  var qQ = 0; function qSoon() { if (qQ) return; qQ = 1; Promise.resolve().then(function () { qQ = 0; qCheck(); }); }

  /* ---------- 8: Print preview (#fp31) ---------- */
  function pvIn(o) {
    if (o.__tx) return; o.__tx = 1; if (!CAN) return;
    o.classList.add('tx-pv');
    var a = o.__txA = play(o, [{ opacity: 0, transform: 'translate3d(0,24px,0)' }, { opacity: 1, transform: 'none' }], { dur: 340, wait: 400 });
    fin(a, function () { if (o.__txA === a) { o.__txA = null; try { a.cancel(); } catch (e) {} } });
    var rm = o.remove;
    o.remove = function () { /* fix-print removes it 270 ms after Close; let our fade finish first */
      var me = this, b = me.__txB;
      if (b && b.playState === 'running') { if (me.id === 'fp31' || me.id === 'jp14') me.id = me.id + '-out'; fin(b, function () { rm.call(me); }); return; }
      rm.call(me);
    };
  }
  function pvOut(o) {
    if (!CAN || !o.__tx) return;
    if (o.__txA) { try { o.__txA.cancel(); } catch (e) {} o.__txA = null; }
    o.__txB = play(o, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translate3d(0,24px,0)' }], { dur: 240 });
    o.style.pointerEvents = 'none';
  }

  /* ---------- 6b: Find a Job card at once ---------- */
  function jfOpen(w) {
    var st = null; try { st = JSON.parse(sessionStorage.getItem('fmFind24') || 'null'); } catch (e) {}
    var want = st && Date.now() - st.t < 30 * 60e3 && (String(st.q || '').trim() || st.y > 0 || (st.d && st.x));
    if (!want) w.classList.add('tx-now');
  }

  /* ---------- observer ---------- */
  function onMut(ms) {
    for (var i = 0; i < ms.length; i++) {
      var m = ms[i], t = m.target;
      if (m.type === 'attributes') {
        if (t === document.body) { qSoon(); continue; }
        var id = t.id; if (!id) continue;
        var had = m.oldValue || '', has = t.className || '';
        if (typeof has !== 'string') continue;
        if (id === 'pl196') pl(t, had, has);
        else if (id === 'pull-sheet') { ps(t, had, has); qSoon(); }
        else if (id === 'quote-sheet') qSoon();
        else if ((id === 'fp31' || id === 'jp14') && /\bin\b/.test(had) && !/\bin\b/.test(has)) pvOut(t);
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) {
          var n = m.addedNodes[j]; if (n.nodeType !== 1) continue;
          if (n.id === 'fp31' || n.id === 'jp14') pvIn(n);
          else if (n.id === 'job-find') jfOpen(n);
          else if (n.id === 'quote-sheet') qSoon();
          else if (n.id === 'pl196' && /\bopen\b/.test(n.className)) pl(n, '', n.className);
        }
      }
    }
  }
  (function boot(n) {
    if (!document.body) { if (n < 100) setTimeout(function () { boot(n + 1); }, 50); return; }
    putCss();
    if (window.MutationObserver) new MutationObserver(onMut).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'], attributeOldValue: true });
    QS = qState();
  })(0);
})();
