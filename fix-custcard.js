/* fix-custcard.js (Hark, 2026-11-14, Dave Batch 2 items 10-13)
   v1:
   10/11. Find a Job (customer search): tapping a Jobber job (or a saved job) opens a pull-up card instead of the old one-button
          detail. Card: Job # first, then the customer's name, then everything known about the job (title, date / status, address,
          phone, email, saved lines), and the choice: View List (opens the job's list = the same "Open job" / "Edit list" path as
          before) or Stage Job (opens the job and goes straight into its Pull list via the existing Stage job button).
   12.    Stage Job button, then a static circle with how many items are staged (pulled N/M), then the Jobber button, in one row -
          on the card and on the job card inside the opened job (Customer Search page). The floating Jobber bubble at the bottom
          of that page is hidden while the staging side shows; the new Jobber button does exactly what the bubble did.
   13.    Material progress on the card: Pulled N/M -> Staged -> Loaded on truck N/M -> Done, from the existing read-only
          getStaging (job rows and its "ld:" loaded rows) and the phone's Pull list / Ready to load copies. No new writes.
   Hook for other overlays (b2-print): window.stormCustCard.addAction(fn) - fn(ctx) returns an element for the card's action slot
   [data-cc-slot]; ctx = { job, kind:'jobber'|'saved', jobNumber, name, address, key, items, close }. Event 'storm-custcard-open'.
   No Code.js, sheet, stock, quote or Jobber changes. */
(function () {
  if (window.__fixCustCard) return; window.__fixCustCard = 1;
  var V = 1;
  function $(id) { return document.getElementById(id); }
  function E(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function lc(t) { return String(t == null ? '' : t).replace(/\s+/g, ' ').trim().toLowerCase(); }
  function T(m, bad) { try { showToast(m, !!bad); } catch (e) {} }
  function run() { try { return window.google && google.script && google.script.run; } catch (e) { return null; } }
  function jget(k, d) { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } }
  var MEMJ = null, MEMJT = 0, MEMJB = 0;
  function jobberJobs() { var o = jget('storm227:jj', null), r = null; try { r = o && JSON.parse(o.j); } catch (e) {} var a = (r && r.jobs) || []; return a.length ? a : (MEMJ || []); }
  /* the phone's job copy (app-ext v227) can be missing: ask the server once (its own 5-min cache answers) */
  function loadJobs(cb) {
    if (MEMJB) return; if (MEMJ && Date.now() - MEMJT < 120000) { if (cb) cb(); return; }
    var R = run(); if (!R) return; MEMJB = 1;
    R.withSuccessHandler(function (r) { MEMJB = 0; if (r && Array.isArray(r.jobs)) { MEMJ = r.jobs; MEMJT = Date.now(); } if (cb) cb(); })
     .withFailureHandler(function () { MEMJB = 0; if (cb) cb(); }).getJobberJobs(false);
  }
  function savedJobs() { var o = jget('storm227:sj', null); try { var r = o && JSON.parse(o.j); return Array.isArray(r) ? r : []; } catch (e) { return []; } }
  function cust() { return jget('stormJobCustomerV1', {}); }

  var JBLOGO = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/jobber-logo-white-open.png?v=1';
  /* ---------------- CSS ---------------- */
  var F = 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  var css = ''
    + '#cc-wrap { position: fixed; inset: 0; z-index: 2147483000; display: none; font-family: ' + F + '; }'
    + '#cc-wrap.on { display: block; }'
    + '#cc-wrap .cc-scrim { position: absolute; inset: 0; background: rgba(15,23,32,.45); opacity: 0; transition: opacity .28s ease; }'
    + '#cc-wrap.in .cc-scrim { opacity: 1; }'
    + '#cc-sheet { position: absolute; left: 0; right: 0; bottom: 0; margin: 0 auto; width: 100%; max-width: 560px; max-height: 88vh; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; box-sizing: border-box;'
    + ' background: #fff; color: #0F1720; border-radius: 22px 22px 0 0; padding: 8px 18px calc(18px + env(safe-area-inset-bottom)); box-shadow: 0 -12px 40px rgba(0,0,0,.28);'
    + ' transform: translateY(105%); transition: transform .32s cubic-bezier(.2,.7,.3,1); will-change: transform; }'
    + '#cc-wrap.in #cc-sheet { transform: none; }'
    + '#cc-sheet .cc-grab { width: 42px; height: 5px; border-radius: 3px; background: #D5DDE6; margin: 2px auto 10px; }'
    + '#cc-sheet .cc-x { position: absolute; right: 12px; top: 10px; width: 36px; height: 36px; border-radius: 18px; border: 0; background: #EEF2F6; color: #0F1720; font: 700 20px/36px ' + F + '; padding: 0; }'
    + '#cc-sheet .cc-num { font-size: 13px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #1A8FC4; }'
    + '#cc-sheet .cc-name { margin: 2px 44px 0 0; font-size: 24px; line-height: 1.2; font-weight: 800; color: #0F1720; }'
    + '#cc-sheet .cc-title { margin-top: 4px; font-size: 15.5px; font-weight: 600; color: #374151; }'
    + '#cc-sheet .cc-info { margin: 12px 0 0; padding: 0; border: 1.5px solid #1B2735; border-radius: 14px; overflow: hidden; }'
    + '#cc-sheet .cc-row { display: flex; gap: 12px; padding: 10px 14px; border-top: 1px solid #E5E9EF; font-size: 14.5px; line-height: 1.35; }'
    + '#cc-sheet .cc-row:first-child { border-top: 0; }'
    + '#cc-sheet .cc-row > span { flex: none; width: 74px; color: #6B7280; font-weight: 600; font-size: 13px; padding-top: 1px; }'
    + '#cc-sheet .cc-row > b { flex: 1; min-width: 0; font-weight: 600; color: #0F1720; overflow-wrap: anywhere; }'
    + '#cc-sheet .cc-row a { color: #1A8FC4; text-decoration: none; font-weight: 700; }'
    + '#cc-sheet .cc-sec { margin: 16px 0 8px; font-size: 12px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #6B7280; }'
    /* 13: progress */
    + '#cc-sheet .cc-prog { border: 1.5px solid #1B2735; border-radius: 14px; padding: 12px 14px; }'
    + '#cc-sheet .cc-bars { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }'
    + '#cc-sheet .cc-bars i { display: block; height: 8px; border-radius: 4px; background: #E3E8EF; overflow: hidden; }'
    + '#cc-sheet .cc-bars i b { display: block; height: 100%; width: 0; border-radius: 4px; background: #29ABE2; transition: width .4s ease; }'
    + '#cc-sheet .cc-bars i.ok b { background: #16A34A; }'
    + '#cc-sheet .cc-steps { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; margin-top: 7px; }'
    + '#cc-sheet .cc-steps div { font-size: 12.5px; font-weight: 700; color: #6B7280; line-height: 1.25; }'
    + '#cc-sheet .cc-steps div small { display: block; font-size: 13.5px; font-weight: 800; color: #0F1720; }'
    + '#cc-sheet .cc-steps div.ok small { color: #15803D; }'
    + '#cc-sheet .cc-pnote { margin-top: 9px; font-size: 13px; font-weight: 600; color: #374151; }'
    + '#cc-sheet .cc-prog.wait .cc-bars i b { width: 0 !important; } #cc-sheet .cc-prog.wait .cc-steps small { color: #9CA3AF; }'
    /* 10/12: actions */
    + '#cc-sheet .cc-acts { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }'
    + '#cc-sheet .cc-view { height: 52px; border-radius: 14px; border: 1.5px solid #1B2735; background: #fff; color: #0F1720; font: 800 16.5px/1 ' + F + '; }'
    + '.cc12 { display: flex; align-items: center; gap: 10px; }'
    + '.cc12 .cc-stage { flex: 1; min-width: 0; height: 52px; border-radius: 14px; border: 0; background: #29ABE2; color: #fff; -webkit-text-fill-color: #fff; font: 800 16.5px/1 ' + F + '; }'
    + 'html:not(#cc1):not(#cc2):not(#cc3) body .cc12 .cc-stage[disabled] { background: #E8F7EE !important; color: #15803D !important; -webkit-text-fill-color: #15803D !important; opacity: 1 !important; box-shadow: none !important; }'
    + '.cc12 .cc-stage[disabled] { background: #E8F7EE; color: #15803D; -webkit-text-fill-color: #15803D; opacity: 1; }'
    + '.cc12 .fm-ring.cc-ring { width: 52px; height: 52px; } .cc12 .fm-ring.cc-ring > i { width: 41px; height: 41px; font-size: 12.5px; }'
    + '.cc12 .cc-jb { flex: none; height: 52px; padding: 0 16px; border-radius: 14px; border: 0; background: #0F1720; color: #fff; -webkit-text-fill-color: #fff; font: 800 14px/1 ' + F + '; letter-spacing: .06em; display: inline-flex; align-items: center; gap: 7px; }'
    + '.cc12 .cc-jb svg { width: 18px; height: 18px; display: block; }'
    + '#cc-sheet [data-cc-slot]:empty { display: none; } #cc-sheet [data-cc-slot] { display: flex; gap: 10px; flex-wrap: wrap; } #cc-sheet [data-cc-slot] > * { flex: 1; }'
    + '#cc-sheet button { -webkit-tap-highlight-color: transparent; } #cc-sheet button:active { transform: scale(.97); }'
    + 'html:not(#cc1):not(#cc2):not(#cc3) body #cc-sheet .cc-more { background: none !important; box-shadow: none !important; color: #6B7280 !important; -webkit-text-fill-color: #6B7280 !important; border: 0 !important; }'
    + '#cc-sheet .cc-more { margin: 2px auto 0; display: block; border: 0; background: none; color: #6B7280; font: 700 14px/1 ' + F + '; padding: 10px; }'
    /* 12 on the opened job (Customer Search page): Stage Job | circle | Jobber in one row; the floating bubble steps aside on the staging side */
    + 'html body #pull-sheet .jc188.cc12h { display: grid !important; grid-template-columns: minmax(0,1fr) auto auto; column-gap: 10px; align-items: center; }'
    + 'html body #pull-sheet .jc188.cc12h > * { grid-column: 1 / -1; }'
    + 'html body #pull-sheet .jc188.cc12h > button[data-jc188-add] { grid-column: 1; grid-row: 3; margin: 0 !important; width: 100% !important; }'
    + 'html body #pull-sheet .jc188.cc12h > .cc-ring { grid-column: 2; grid-row: 3; width: 50px; height: 50px; } html body #pull-sheet .jc188.cc12h > .cc-ring > i { width: 40px; height: 40px; font-size: 12px; }'
    + 'html body #pull-sheet .jc188.cc12h > .cc-jb { grid-column: 3; grid-row: 3; height: 50px; padding: 0 14px; border-radius: 14px; border: 0; background: #0F1720; color: #fff; -webkit-text-fill-color: #fff; font: 800 13.5px/1 ' + F + '; letter-spacing: .06em; display: inline-flex; align-items: center; gap: 6px; }'
    + 'html body #pull-sheet .jc188.cc12h > .cc-jb svg { width: 17px; height: 17px; display: block; }'
    + 'html body #pull-sheet .jc188.cc12h > .pg233 { grid-row: 4; }'
    + 'html body.mgr-show-stage:not(.cc-nobub) #storm-bubble { display: none !important; }'
    + 'html:not(#cc1):not(#cc2):not(#cc3) body .cc12 .cc-jb, html:not(#cc1):not(#cc2):not(#cc3) body #pull-sheet .jc188.cc12h > .cc-jb { background: #0F1720 !important; background-image: none !important; color: #fff !important; -webkit-text-fill-color: #fff !important; border: 0 !important; margin: 0 !important; box-shadow: 0 1px 2px rgba(14,22,33,.12) !important; justify-content: center; }'
    + '.cc-jb .cc-jbl { display: block; width: 84px; height: 18px; background: url("' + JBLOGO + '") center / 84px auto no-repeat; }'
    + 'html:not(#cc1):not(#cc2):not(#cc3) body #pull-sheet .jc188.cc12h > button[data-jc188-add] { margin: 0 !important; }'
    + 'html:not(#cc1):not(#cc2):not(#cc3) body #pull-sheet .jc188.cc12h > .cc-ring { margin: 0 !important; }'
    + '@media (prefers-reduced-motion: reduce) { #cc-sheet { transition: none; } }';
  var st = document.createElement('style'); st.id = 'fix-custcard-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var JBSVG = '<span class="cc-jbl" aria-hidden="true"></span>'; /* the same white Jobber logo the bottom bubble shows */

  /* ---------------- ring (same look as fix-motion's circles) ---------------- */
  function ringBg(d, n) { var p = n ? Math.min(1, d / n) : 0; var c = p >= 1 ? '#16A34A' : p > 0 ? '#29ABE2' : '#D5DDE6'; return 'conic-gradient(' + c + ' ' + Math.round(p * 360) + 'deg,#E3E8EF 0)'; }
  function ringHtml(d, n) {
    if (n == null) return '<span class="fm-ring cc-ring" role="img" aria-label="Staged count loading" style="background:' + ringBg(0, 1) + '"><i>\u2013</i></span>';
    return '<span class="fm-ring cc-ring' + (n && d >= n ? ' done' : '') + '" role="img" aria-label="' + d + ' of ' + n + ' staged" style="background:' + ringBg(d, n) + '"><i>' + d + '/' + n + '</i></span>';
  }
  function setRing(r, d, n) {
    var t = n == null ? '\u2013' : d + '/' + n, bg = n == null ? ringBg(0, 1) : ringBg(d, n);
    if (r.firstChild && r.firstChild.textContent !== t) r.firstChild.textContent = t;
    if (r.__bg !== bg) { r.__bg = bg; r.style.background = bg; }
    if (n != null) r.setAttribute('aria-label', d + ' of ' + n + ' staged');
  }

  /* ---------------- progress (13) - read only ---------------- */
  var P = {}; /* key -> { t, n, pulled, staged, loaded, done, busy } */
  function localLines(k) { var m = jget('stormPullLinesV203', {})[k]; return m && m.l && m.l.length ? m : null; }
  function sjJob(k) { try { return window.stormSJ215 && stormSJ215.job(k); } catch (e) { return null; } }
  function finMap() { try { return (window.stormSJFin203 && stormSJFin203()) || {}; } catch (e) { return {}; } }
  function stagedLocal(k) {
    try { if (window.stormStagingApi && stormStagingApi.staged(k)) return true; } catch (e) {}
    try { if (window.stormSJ202 && stormSJ202.state(k) === 'staged') return true; } catch (e) {}
    var m = jget('stormStagedKeysV202', {})[k]; return !!(m && m.s);
  }
  /* best local answer, merged with what the server said last */
  function prog(k) {
    var o = P[k] || {}, r = { n: o.n, pulled: o.pulled, staged: !!o.staged || stagedLocal(k), loaded: o.loaded, done: !!o.done || !!finMap()[k], known: !!o.t };
    var j = sjJob(k);
    if (j && j.lines && j.lines.length) { r.n = j.lines.length; r.staged = true; r.loaded = j.lines.filter(function (l) { return l.loaded; }).length; }
    var L = localLines(k);
    if (L) { if (r.n == null) r.n = L.l.length; if (r.pulled == null || (L.t || 0) > (o.t || 0)) r.pulled = L.l.filter(function (l) { return (L.on || {})[l.bin]; }).length; } /* this phone's ticks are newer than the last server answer */
    if (r.staged && r.n != null) r.pulled = r.n;
    if (r.done && r.n != null) r.loaded = r.n;
    return r;
  }
  function quoteCount(jid, cb) {
    var R = run(); if (!R || !jid) { cb(null); return; }
    R.withSuccessHandler(function (r) {
      var q = r && r.quote, seen = {}, n = 0;
      ((q && q.lines) || []).forEach(function (ln) {
        if (!(Number(ln.quantity) > 0)) return;
        var m = {}; try { m = window.stormQuoteMatch(ln) || {}; } catch (x) {}
        if (m.skip || !m.bins) return;
        m.bins.forEach(function (b) { if (seen[b]) return; var it = null; try { it = findItem(b); } catch (x) {} if (it) { seen[b] = 1; n++; } });
      });
      cb(q ? n : null);
    }).withFailureHandler(function () { cb(null); }).getJobberQuote(jid, window.stormAccess ? stormAccess.token() : '');
  }
  function fetchProg(k, jid, cb) {
    var o = P[k] || (P[k] = {}); if (o.busy) return; if (o.t && Date.now() - o.t < (o.ttl || 20000)) { cb(); return; }
    var R = run(); if (!R) { cb(); return; }
    o.busy = 1; var left = 2, a = null, b = null;
    function fin() {
      if (--left) return;
      o.busy = 0; o.t = Date.now();
      if (a) {
        o.staged = !!a.staged;
        var rows = (a.rows || []).filter(function (x) { return x && x.itemBin; });
        var L = localLines(k), bins = L ? L.l.map(function (l) { return l.bin; }) : null;
        o.pulled = rows.filter(function (x) { return x.checked && (!bins || bins.indexOf(x.itemBin) >= 0); }).length;
        if (!o.n && o.staged) o.n = rows.length;
      }
      if (b) {
        var lr = (b.rows || []).filter(function (x) { return x && x.itemBin; });
        o.done = lr.some(function (x) { return x.itemBin === '__done__' && x.checked; });
        o.loaded = lr.filter(function (x) { return x.itemBin !== '__done__' && x.checked; }).length;
      }
      var p = prog(k);
      if (p.n == null && jid) { quoteCount(jid, function (n) { if (n != null) o.n = n; cb(); }); return; }
      cb();
    }
    try { R.withSuccessHandler(function (r) { a = r; fin(); }).withFailureHandler(function () { fin(); }).getStaging(k); } catch (e) { fin(); }
    try { run().withSuccessHandler(function (r) { b = r; fin(); }).withFailureHandler(function () { fin(); }).getStaging('ld:' + k); } catch (e) { fin(); }
  }
  function progHtml(k) {
    if (!k) return '<div class="cc-prog"><div class="cc-pnote">' + (CUR && CUR.kind === 'saved' ? 'Staging progress for this saved list shows on its row in the search results and in View List.' : 'Not linked to a Jobber job yet, so there is no staging progress to show.') + '</div></div>';
    var p = prog(k), wait = !p.known && p.n == null;
    var n = p.n, pu = p.pulled || 0, lo = p.loaded || 0;
    function pc(x) { return n ? Math.round(Math.min(1, x / n) * 100) : 0; }
    var b1 = p.staged ? 100 : pc(pu), b2 = p.staged ? 100 : 0, b3 = p.done ? 100 : p.staged ? pc(lo) : 0;
    var note = wait ? 'Checking progress\u2026'
      : p.done ? 'Job complete. Everything was loaded on the truck.'
      : p.staged ? (n && lo >= n ? 'Everything is loaded. Finish it on Ready to load on truck.' : 'Staged. Waiting to be loaded on the truck.')
      : pu ? (n ? pu + ' of ' + n + ' pulled for staging.' : pu + ' pulled for staging.') : 'Not started yet.';
    var nn = n == null ? '\u2013' : n;
    return '<div class="cc-prog' + (wait ? ' wait' : '') + '">'
      + '<div class="cc-bars"><i class="' + (b1 >= 100 ? 'ok' : '') + '"><b style="width:' + b1 + '%"></b></i><i class="' + (b2 >= 100 ? 'ok' : '') + '"><b style="width:' + b2 + '%"></b></i><i class="' + (b3 >= 100 ? 'ok' : '') + '"><b style="width:' + b3 + '%"></b></i></div>'
      + '<div class="cc-steps"><div class="' + (b1 >= 100 ? 'ok' : '') + '">Pulled<small>' + (p.staged ? nn + '/' + nn : pu + '/' + nn) + '</small></div>'
      + '<div class="' + (p.staged ? 'ok' : '') + '">Staged<small>' + (p.staged ? '\u2713 Yes' : 'Not yet') + '</small></div>'
      + '<div class="' + (b3 >= 100 ? 'ok' : '') + '">Loaded<small>' + (p.done ? '\u2713 Done' : p.staged ? lo + '/' + nn : '0/' + nn) + '</small></div></div>'
      + '<div class="cc-pnote">' + E(note) + '</div></div>';
  }
  function ringFor(k) { if (!k) return null; var p = prog(k); if (p.n == null) return { d: 0, n: null }; return { d: p.staged ? p.n : (p.pulled || 0), n: p.n }; }

  /* ---------------- the card (10 / 11) ---------------- */
  var CUR = null, ACTS = [];
  function fmtDate(s) { var d = new Date(String(s || '')); if (isNaN(d.getTime())) return ''; try { return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }); } catch (e) { return ''; } }
  function addr(c) { var a = (c && c.address) || {}; return [a.street1, a.street2, a.city, a.province, a.postalCode].filter(function (x) { return String(x || '').trim(); }).join(', '); }
  function ctxFromRow(row) {
    var meta = (row.querySelector('.jf-meta') || {}).textContent || '';
    if (row.hasAttribute('data-jf-jb')) {
      var m = /Job #\s*([A-Za-z0-9-]+)/.exec(meta), num = m ? m[1] : '', js = jobberJobs(), j = null;
      for (var i = 0; i < js.length; i++) if (num && String(js[i].jobNumber) === num) { j = js[i]; break; }
      if (!j) { /* not in the copy yet: what the row shows, filled in when the jobs arrive */
        var nmE = row.querySelector('.jf-name'), parts = meta.split(' \u00b7 ');
        var nmT = nmE && nmE.childNodes[0] ? String(nmE.childNodes[0].textContent || '').trim() : '';
        var tt = parts.filter(function (x) { return !/^Job #/.test(x) && x !== parts[0]; }).join(' \u00b7 ');
        var idm = num ? (jget('storm233:num', {})[num] || '') : '';
        return { kind: 'jobber', partial: 1, job: { jobNumber: num, title: tt, when: parts[0] || '', client: {} }, jobNumber: num, name: nmT,
          address: String((row.querySelector('.jf-addr') || {}).textContent || '').trim(), key: idm ? 'jb:' + idm : '', jid: idm, items: null };
      }
      var c = j.client || {}, nm = [c.firstName, c.lastName].filter(Boolean).join(' ') || c.companyName || '';
      return { kind: 'jobber', job: j, jobNumber: String(j.jobNumber || ''), name: nm, address: addr(c), key: j.id ? 'jb:' + j.id : '', jid: j.id || '', items: null };
    }
    var nmEl = row.querySelector('.jf-name'), ad = lc((row.querySelector('.jf-addr') || {}).textContent), nm2 = lc(nmEl && nmEl.childNodes[0] ? nmEl.childNodes[0].textContent : nmEl ? nmEl.textContent : '');
    var sv = savedJobs().filter(function (s) { return lc([s.first, s.last].filter(Boolean).join(' ')) === nm2 && lc(s.address) === ad; })[0];
    if (!sv) { /* not in the phone's copy: what the row shows */
      var mt = String(meta || '').split(' \u00b7 '), lm = /(\d+) lines?/.exec(meta), um = /(\d+) to pull/.exec(meta);
      return { kind: 'saved', job: { first: nm2, saved: mt[0] || '', lines: lm ? +lm[1] : null, units: um ? +um[1] : null }, jobNumber: '',
        name: String(nmEl && nmEl.childNodes[0] ? nmEl.childNodes[0].textContent : '').trim(), address: String((row.querySelector('.jf-addr') || {}).textContent || '').trim(),
        key: '', jid: '', items: null, rowIdx: row.getAttribute('data-jf-i') };
    }
    return { kind: 'saved', job: sv, jobNumber: String(sv.jobberJobNumber || ''), name: [sv.first, sv.last].filter(Boolean).join(' '), address: sv.address || '',
      key: sv.jobberJobId ? 'jb:' + sv.jobberJobId : '', jid: sv.jobberJobId || '', items: sv.items || null };
  }
  function infoRows(x) {
    var j = x.job, r = [];
    function row(k, v, raw) { if (v) r.push('<div class="cc-row"><span>' + E(k) + '</span><b>' + (raw ? v : E(v)) + '</b></div>'); }
    if (x.kind === 'jobber') {
      var c = j.client || {};
      row('When', j.when ? j.when : j.kind === 'unscheduled' ? 'Signed, not scheduled yet' : (fmtDate(j.startAt) || 'No date set'));
      row('Status', j.kind === 'past' ? 'Past job' : (j.status ? String(j.status).replace(/_/g, ' ') : ''));
      if (c.companyName && (c.firstName || c.lastName)) row('Company', c.companyName);
      if (x.address) row('Address', '<a href="https://maps.google.com/?q=' + encodeURIComponent(x.address) + '" target="_blank" rel="noopener">' + E(x.address) + '</a>', 1);
      if (c.phone) row('Phone', '<a href="tel:' + E(String(c.phone).replace(/[^\d+]/g, '')) + '">' + E(c.phone) + '</a>', 1);
      if (c.email) row('Email', '<a href="mailto:' + E(c.email) + '">' + E(c.email) + '</a>', 1);
    } else {
      if (x.address) row('Address', '<a href="https://maps.google.com/?q=' + encodeURIComponent(x.address) + '" target="_blank" rel="noopener">' + E(x.address) + '</a>', 1);
      row('Saved', j.saved || '');
      row('List', (j.lines != null ? j.lines + ' line' + (j.lines === 1 ? '' : 's') : '') + (j.units != null ? ' \u00b7 ' + j.units + ' to pull' : ''));
      if (j.jobberTitle) row('Job', j.jobberTitle);
    }
    return r.join('');
  }
  function stageState(x) {
    if (!x.key) return 'none';
    var p = prog(x.key); return p.staged ? 'staged' : 'stage';
  }
  function render() {
    var x = CUR, w = $('cc-wrap'); if (!x || !w) return;
    var s = w.querySelector('#cc-sheet'), y = s.scrollTop;
    var title = x.kind === 'jobber' ? (x.job.title || '') : (x.job.jobberTitle || '');
    var numTxt = x.jobNumber ? 'Job #' + x.jobNumber : (x.kind === 'saved' ? 'Saved job \u00b7 no Jobber job #' : 'Jobber job');
    var ss = stageState(x), rg = ringFor(x.key);
    s.innerHTML = '<div class="cc-grab"></div><button class="cc-x" type="button" data-cc-close aria-label="Close">\u00d7</button>'
      + '<div class="cc-num">' + E(numTxt) + '</div><div class="cc-name">' + E(x.name || 'Customer') + '</div>'
      + (title ? '<div class="cc-title">' + E(title) + '</div>' : '')
      + '<div class="cc-info">' + infoRows(x) + '</div>'
      + '<div class="cc-sec">Materials</div>' + progHtml(x.key)
      + '<div class="cc-acts"><button class="cc-view" type="button" data-cc-view>View List</button>'
      + '<div class="cc12">'
      + (ss === 'staged' ? '<button class="cc-stage" type="button" data-cc-stage disabled aria-disabled="true">\u2713 Staged</button>'
         : '<button class="cc-stage" type="button" data-cc-stage>Stage Job</button>')
      + (rg ? ringHtml(rg.d, rg.n) : '')
      + (x.jid ? '<button class="cc-jb" type="button" data-cc-jobber aria-label="Jobber quote">' + JBSVG + '</button>' : '')
      + '</div><div data-cc-slot></div></div>'
      + (x.kind === 'saved' ? '<button class="cc-more" type="button" data-cc-more>More options (print, delete)</button>' : '');
    s.scrollTop = y;
    var slot = s.querySelector('[data-cc-slot]'), ctx = pub();
    ACTS.forEach(function (fn) { try { var el = fn(ctx); if (el && el.nodeType === 1) slot.appendChild(el); } catch (e) {} });
    try { document.dispatchEvent(new CustomEvent('storm-custcard-open', { detail: ctx })); } catch (e) {}
  }
  function pub() { var x = CUR; if (!x) return null; return { job: x.job, kind: x.kind, jobNumber: x.jobNumber, name: x.name, address: x.address, key: x.key, items: x.items, close: function () { close(); } }; }
  function wrapEl() {
    var w = $('cc-wrap'); if (w) return w;
    w = document.createElement('div'); w.id = 'cc-wrap'; w.className = 'dk-skip';
    w.innerHTML = '<div class="cc-scrim" data-cc-close></div><div id="cc-sheet" role="dialog" aria-modal="true" aria-label="Job"></div>';
    document.body.appendChild(w);
    /* swipe down from the top of the card closes it */
    var s = w.querySelector('#cc-sheet'), y0 = null, dy = 0;
    s.addEventListener('touchstart', function (e) { y0 = s.scrollTop <= 0 ? e.touches[0].clientY : null; dy = 0; }, { passive: true });
    s.addEventListener('touchmove', function (e) { if (y0 == null) return; dy = e.touches[0].clientY - y0; if (dy > 0) { s.style.transition = 'none'; s.style.transform = 'translateY(' + dy + 'px)'; } }, { passive: true });
    s.addEventListener('touchend', function () { if (y0 == null) return; s.style.removeProperty('transition'); s.style.removeProperty('transform'); if (dy > 90) close(); y0 = null; }, { passive: true });
    return w;
  }
  function open(x) {
    CUR = x; var w = wrapEl();
    w.classList.remove('in'); w.classList.add('on'); render(); void w.offsetWidth;
    requestAnimationFrame(function () { w.classList.add('in'); });
    if (x.key) { if (P[x.key]) P[x.key].ttl = 3000; fetchProg(x.key, x.jid, function () { if (CUR === x) render(); }); }
    if (x.partial) loadJobs(function () {
      if (CUR !== x) return; var r = findRowFor(x), y = r && ctxFromRow(r); if (!y || y.partial) return;
      CUR = y; render(); if (y.key) fetchProg(y.key, y.jid, function () { if (CUR === y) render(); });
    });
  }
  function close(now, cb) {
    var w = $('cc-wrap'); CUR = null; if (!w) { if (cb) cb(); return; }
    if (now) { w.classList.remove('in', 'on'); if (cb) cb(); return; }
    w.classList.remove('in'); setTimeout(function () { if (!CUR) w.classList.remove('on'); if (cb) cb(); }, 260);
  }
  function findRowFor(x) {
    var L = $('jf-list'); if (!L) return null;
    var rows = L.querySelectorAll('.jf-item');
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (x.kind === 'jobber' && r.hasAttribute('data-jf-jb')) { var m = /Job #\s*([A-Za-z0-9-]+)/.exec((r.querySelector('.jf-meta') || {}).textContent || ''); if (m && m[1] === x.jobNumber) return r; }
      if (x.kind === 'saved' && r.hasAttribute('data-jf-i')) { var nE = r.querySelector('.jf-name'), aE = r.querySelector('.jf-addr');
        if (lc(nE && nE.childNodes[0] ? nE.childNodes[0].textContent : '') === lc(x.name) && lc(aE ? aE.textContent : '') === lc(x.address)) return r; continue; var c = ctxFromRow(r); if (c && c.job === x.job || (c && c.job && x.job && c.job.id && c.job.id === x.job.id)) return r; }
    }
    return null;
  }
  /* run the app's own button for this job (Open job / Edit list) from inside Find a Job, so every existing hook still fires */
  function appBtn(attr, val) {
    var f = $('jf-list'); if (!f) return false;
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute(attr, String(val));
    b.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';
    f.appendChild(b); try { b.click(); } finally { b.remove(); }
    return true;
  }
  function openList(x) {
    var r = findRowFor(x); if (!r) { T('That job is no longer in the list. Search again.', true); return false; }
    if (x.kind === 'jobber') return appBtn('data-jf-jb-load', r.getAttribute('data-jf-jb'));
    return appBtn('data-jf-edit', r.getAttribute('data-jf-i'));
  }
  function whenPull(fn) {
    var t0 = Date.now();
    (function w() {
      var s = $('pull-sheet'), b = s && s.classList.contains('open') && s.querySelector('[data-jc188-add]');
      var st = ''; try { st = window.stormSJ202 ? stormSJ202.state() : ''; } catch (e) {}
      if (b && st !== 'chk') { fn(b, s); return; }
      if (Date.now() - t0 > 6000) { if (b) fn(b, s); return; }
      setTimeout(w, 80);
    })();
  }
  function doView(x) { close(false); setTimeout(function () { openList(x); }, 120); }
  function doStage(x) {
    close(false);
    if (!x.jid) { /* a saved list: open it; if it is linked to a Jobber job its Stage job button is pressed, otherwise say so */
      setTimeout(function () { if (!openList(x)) return; var t0 = Date.now(); (function w() { var s = $('pull-sheet'), b = s && s.classList.contains('open') && s.querySelector('[data-jc188-add]'); var st = ''; try { st = window.stormSJ202 ? stormSJ202.state() : ''; } catch (e) {}
        if (b && st !== 'chk') { setTimeout(function () { if (!b.disabled) b.click(); }, 380); return; }
        if (Date.now() - t0 > 2500) return; /* not linked: its list (with the staging circles) is what opened */
        setTimeout(w, 80); })(); }, 120);
      return;
    }
    setTimeout(function () { if (openList(x)) whenPull(function (b) { setTimeout(function () { if (!b.disabled) b.click(); }, 380); }); }, 120);
  }
  function doJobber(x) {
    close(false);
    setTimeout(function () { if (openList(x)) whenPull(function () { setTimeout(clickBubble, 380); }); }, 120);
  }
  function clickBubble() { var bb = $('storm-bubble'); if (bb) bb.click(); }

  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var w = t.closest('#cc-wrap');
    if (w) {
      var x = CUR; if (!x) return;
      if (t.closest('[data-cc-close]')) { e.preventDefault(); close(); return; }
      if (t.closest('[data-cc-view]')) { e.preventDefault(); doView(x); return; }
      if (t.closest('[data-cc-stage]')) { e.preventDefault(); if (!t.closest('[data-cc-stage]').disabled) doStage(x); return; }
      if (t.closest('[data-cc-jobber]')) { e.preventDefault(); doJobber(x); return; }
      if (t.closest('[data-cc-more]')) { e.preventDefault(); var r = findRowFor(x); close(false); if (r) setTimeout(function () { appBtn('data-jf-i', r.getAttribute('data-jf-i')); }, 120); return; }
      return;
    }
    /* Find a Job row tapped: the card instead of the old one-button detail */
    var row = t.closest('#job-find #jf-list > .jf-item');
    if (row && (row.hasAttribute('data-jf-jb') || row.hasAttribute('data-jf-i'))) {
      if (t.closest('[data-cc-skip], .p-print, [data-print]')) return; /* buttons other overlays put on a row keep their own tap */
      var x2 = null; try { x2 = ctxFromRow(row); } catch (er) {}
      if (!x2) return; /* not in this phone's copy yet: the old detail opens as before */
      e.preventDefault(); e.stopImmediatePropagation();
      open(x2); return;
    }
    /* 12: Jobber button on the opened job's card */
    if (t.closest('#pull-sheet .jc188 [data-cc-jbh]')) { e.preventDefault(); e.stopImmediatePropagation(); clickBubble(); return; }
  }, true);
  if (window.MutationObserver) new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) { var a = ms[i].addedNodes; for (var j = 0; j < a.length; j++) if (a[j].id === 'job-find') { if (!jobberJobs().length) setTimeout(function () { loadJobs(); }, 600); return; } } })
    .observe(document.body || document.documentElement, { childList: true });
  /* Android back / Escape closes the card */
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && CUR) close(); }, true);

  /* ---------------- 12 on the opened job (Customer Search page) ---------------- */
  function paint12() {
    var box = document.querySelector('#pull-sheet .jc188'); if (!box) return;
    var b = box.querySelector(':scope > button[data-jc188-add]');
    if (!b) { box.classList.remove('cc12h'); [].forEach.call(box.querySelectorAll(':scope > .cc-ring, :scope > .cc-jb'), function (n) { n.remove(); }); return; }
    if (!box.classList.contains('cc12h')) box.classList.add('cc12h');
    var c = cust(), k = c.jobberJobId ? 'jb:' + c.jobberJobId : '';
    var ring = box.querySelector(':scope > .cc-ring'), rg = ringFor(k);
    if (rg) {
      if (!ring) { var tmp = document.createElement('div'); tmp.innerHTML = ringHtml(rg.d, rg.n); ring = tmp.firstChild; box.appendChild(ring); }
      setRing(ring, rg.d, rg.n);
    } else if (ring) ring.remove();
    var jb = box.querySelector(':scope > .cc-jb');
    if (!jb && $('storm-bubble')) { jb = document.createElement('button'); jb.type = 'button'; jb.className = 'cc-jb'; jb.setAttribute('data-cc-jbh', ''); jb.setAttribute('aria-label', 'Jobber quote'); jb.innerHTML = JBSVG; box.appendChild(jb); }
    if (k && !(P[k] && P[k].t) && !(P[k] && P[k].busy)) fetchProg(k, c.jobberJobId, function () { paint12(); });
  }
  var q12 = 0; function soon12() { if (!q12) q12 = requestAnimationFrame(function () { q12 = 0; try { paint12(); } catch (e) {} }); }
  if (window.MutationObserver) (function hook(n) {
    var ps = $('pull-sheet');
    if (!ps) { if (n < 120) setTimeout(function () { hook(n + 1); }, 500); return; }
    new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) { var m = ms[i]; if (m.target && m.target.nodeType === 1 && m.target.closest && m.target.closest('.cc-ring, .cc-jb')) continue; soon12(); return; } })
      .observe(ps, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    soon12();
  })(0);
  /* staging ticks change on the Pull list: keep the circle current (local only, cheap) */
  setInterval(function () { if (document.hidden) return; var ps = $('pull-sheet'); if (ps && ps.classList.contains('open')) { var c = cust(), k = c.jobberJobId ? 'jb:' + c.jobberJobId : ''; if (k && P[k] && P[k].t && Date.now() - P[k].t > 20000) P[k].t = 0; soon12(); } }, 1500);
  window.addEventListener('stormstaged', function () { var c = cust(); if (c.jobberJobId && P['jb:' + c.jobberJobId]) P['jb:' + c.jobberJobId].t = 0; soon12(); });

  window.stormCustCard = {
    v: V,
    addAction: function (fn) { if (typeof fn === 'function' && ACTS.indexOf(fn) < 0) { ACTS.push(fn); if (CUR) render(); } },
    current: pub,
    open: function (row) { var x = row && row.nodeType === 1 ? ctxFromRow(row) : null; if (x) open(x); return !!x; },
    close: function () { close(); },
    progress: function (k) { return k ? prog(k) : null; }
  };
})();
