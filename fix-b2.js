/* fix-b2.js (Hark, 2026-11-14, Dave's Batch 2 fix list, items 1-5). Loaded by Index.html after the other fix-*.js overlays.
   Additive only: CSS + one tap handler. No data, no server calls.
   v1:
   1  Menu button (three lines) opens on the first tap: it acts on the finger lifting (pointerup) instead of waiting for the
      browser's click, which a phone drops when the tap lands while the list is still gliding or the finger moves a few px;
      a slightly larger invisible hit area; the side menu stops catching taps the moment it starts sliding shut (it used to
      cover the button for ~0.45 s after closing, so a quick re-open tap hit the closing menu instead).
   2  Ready to load on truck: STORM logo the same size and spot as the main screen logo (226 x 58 at 18 px), title on its own
      line under it, centered, ALL CAPS; close X sits on the logo row at the right.
   3+4 Pull list: same logo treatment, title centered and ALL CAPS.
   5  Jobber quote: the blue "Jobber Quote" words are gone; the Jobber job number ("JOB #138") sits above the customer name
      as a small dark label lined up with the name. */
(function () {
  if (window.__fixB2) return; window.__fixB2 = 1;
  window.STORM_FIX_B2 = 1;
  var B = 'html:not(#scx):not(#scy):not(#b2a) body';
  var RL = B + ' #sj214 .s-top:not(:has([data-sj-back]))'; /* Ready to load list view only (a job inside it has a Back button + customer name) */
  var PL = B + ' #pl196 .t';
  var css = ''
    /* 1: bigger invisible hit area on the menu button; closing menu lets taps through */
    + B + ' #hamburger { touch-action: none !important; }'
    + B + ' #hamburger::after { content: ""; position: absolute; left: -10px; top: -10px; right: -10px; bottom: -10px; }'
    + B + ' #drawer.drw-out, ' + B + ' #drawer.drw-out * { pointer-events: none !important; }'
    + B + ' #drawer-scrim:not(.open) { pointer-events: none !important; }'
    /* 2 + 3: logo same size as the main screen (226 x 58, top 18 px) */
    + RL + ', ' + PL + ' { flex-wrap: wrap !important; justify-content: center !important; row-gap: 12px !important; }'
    + RL + '::before, ' + PL + '::before { height: 58px !important; background-size: auto 58px !important; margin-top: 4px !important; }'
    + RL + ' [data-sj-x], ' + PL + ' .x { position: absolute !important; top: calc(26px + env(safe-area-inset-top)) !important; right: 16px !important; margin: 0 !important; }'
    /* 2 + 4: title centered on its own line, ALL CAPS */
    + RL + ' h2, ' + PL + ' h2 { flex: 0 0 100% !important; text-align: center !important; text-transform: uppercase !important; letter-spacing: .03em !important; font-size: 21px !important; line-height: 1.2 !important; padding: 0 4px !important; box-sizing: border-box; }'
    /* 5: Jobber quote header: no "Jobber Quote" words, job number as a clean label above the name */
    + B + ' #quote-sheet .qs-head > span:not(.qs-job):first-child { display: none !important; }'
    + B + ' #quote-sheet .qs-head .qs-job, ' + B + ' .jqf-card .jqf-head .jq-job { display: inline-flex !important; align-items: center; margin: 0 !important; padding: 4px 10px !important; border-radius: 999px !important; background: #0F1720 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 11.5px !important; font-weight: 800 !important; letter-spacing: .08em !important; text-transform: uppercase !important; line-height: 1.2 !important; opacity: 1 !important; box-shadow: 0 0 0 1px rgba(255,255,255,.18) !important; }'
    + B + ' .jqf-card .jqf-head h2 { display: none !important; }';
  var st = document.createElement('style'); st.id = 'storm-fix-b2-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* 1: open/close on the finger lifting. The real click that follows (if the phone sends one) is swallowed so it can't toggle twice. */
  var down = null, fired = 0, fx = 0, fy = 0, own = false;
  function hb(t) { return t && t.closest && t.closest('#hamburger'); }
  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' || !hb(e.target)) { down = null; return; }
    down = { x: e.clientX, y: e.clientY, t: Date.now(), id: e.pointerId };
  }, true);
  document.addEventListener('pointercancel', function (e) { if (down && e.pointerId === down.id) down = null; }, true);
  document.addEventListener('pointerup', function (e) {
    var d = down; down = null;
    if (!d || e.pointerId !== d.id) return;
    if (Math.abs(e.clientX - d.x) > 24 || Math.abs(e.clientY - d.y) > 24 || Date.now() - d.t > 900) return;
    var h = document.getElementById('hamburger'); if (!h) return;
    fired = Date.now(); fx = e.clientX; fy = e.clientY;
    own = true; try { h.click(); } catch (x) {} own = false;
  }, true);
  window.addEventListener('click', function (e) {
    if (own || !e.isTrusted || !fired) return;
    if (Date.now() - fired > 700 || Math.abs(e.clientX - fx) > 40 || Math.abs(e.clientY - fy) > 40) return;
    fired = 0; e.stopImmediatePropagation(); e.preventDefault();
  }, true);
})();
