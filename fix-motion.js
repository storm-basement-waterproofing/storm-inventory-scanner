/* fix-motion.js (Hark, 2026-11-13, Dave's 35-item fix list: items 12, 17-28 = transitions, camera, customer search, back button, circles).
   Loaded by Index.html right after storm-clean-theme.js. Everything here is additive: CSS + capture-phase taps + observers.
   v1: 27 (Load on Truck job screen gets the N/M circle), 28 (Find a Job progress shows a N/M circle, blue -> green when complete). */
(function () {
  if (window.__fixMotion) return; window.__fixMotion = 1;
  var V = 1; var MC = 0;
  window.STORM_FIX_MOTION = V;
  var EASE = 'cubic-bezier(.32,.72,0,1)';
  function $(id) { return document.getElementById(id); }
  var css = ''
    /* shared ring: same look as the Ready to load on truck list ring */
    + '.fm-ring { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; border-radius: 50%; font-style: normal; }'
    + '.fm-ring > i { display: flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #fff; font-style: normal; font-size: 12px; font-weight: 800; color: #0F1720; letter-spacing: -.01em; white-space: nowrap; }'
    + '.fm-ring.big { width: 72px; height: 72px; } .fm-ring.big > i { width: 58px; height: 58px; font-size: 17px; }'
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

  var q = 0;
  function paintAll() { q = 0; try { paint28(); } catch (e) {} try { paint27(); } catch (e) {} }
  function soon() { if (!q) q = requestAnimationFrame(paintAll); }
  if (window.MutationObserver) new MutationObserver(function (ms) {
    MC += ms.length; window.__fmMC = MC;
    for (var i = 0; i < ms.length; i++) {
      var t = ms[i].target; if (!t || t.nodeType !== 1) t = t && t.parentNode; if (!t || !t.closest) continue;
      if (t.closest('.fm-ring')) continue;
      if (t.closest('#jf-list')) { try { paint28(); } catch (e) {} }
      if (t.closest('#sj214')) { try { paint27(); } catch (e) {} }
    }
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class', 'style'] });
  setInterval(function () { if (!document.hidden) soon(); }, 1500);
  soon();
})();
