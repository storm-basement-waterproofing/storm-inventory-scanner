/* fix-print.js (Hark, 2026-11-13, Dave's fix list items 29-35: manager controls and printing). Loaded by Index.html right after
   storm-clean-theme.js. Everything here is an overlay: CSS with higher specificity, window capture-phase click handlers registered
   before the Index inline blocks, and only EXISTING server functions (managerLogin, unstageJob, removeStagedJob via the v204 sheet,
   getStaging). No server change.
   v1: 29 + 30.
   29. A Completed job on Ready to load on truck: a manager can put its items back into inventory (unstageJob: exactly what staging
       took off On hand goes back, the job leaves Ready to load, its card shows Stage Job again). "Remove from list only" stays for
       material that went to the customer (the v204 sheet). Crew never see either.
   30. Keep on hand: black button with white writing and a small red lock (cards, Item details, the count sheet). Every Keep on hand
       change asks for the manager code again, even when a manager is logged in. The code is checked by the server (managerLogin);
       nothing is stored on the phone except the fresh manager token the server hands back (same place a normal login keeps it). */
(function () {
  if (window.__fixPrint) return; window.__fixPrint = 1;
  var EZ = 'cubic-bezier(.32,.72,0,1)', NAVY = '#1B2735', BLUE = '#29ABE2';
  var LOCK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M8 11V7.5a4 4 0 0 1 8 0V11' fill='none' stroke='%23EF4444' stroke-width='2.6' stroke-linecap='round'/%3E%3Crect x='4.5' y='10.5' width='15' height='11' rx='2.5' fill='%23EF4444'/%3E%3Ccircle cx='12' cy='16' r='1.6' fill='%23000'/%3E%3C/svg%3E";
  function E(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(m, bad) { try { showToast(m, !!bad); } catch (e) {} }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }
  function mgr() { try { return !!(window.stormAccess && stormAccess.isMgr()); } catch (e) { return false; } }
  function tok() { try { return window.stormAccess ? stormAccess.token() : ''; } catch (e) { return ''; } }
  function dev() { try { return window.stormStagingApi ? stormStagingApi.dev() : String(localStorage.getItem('stormDeviceNameV1') || ''); } catch (e) { return ''; } }
  function em(e) { return String(e && (e.message || e) || '').replace(/^Error:\s*/, ''); }
  function item(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function jobMode() { try { return typeof isJobMode === 'function' ? !!isJobMode() : false; } catch (e) { return false; } }

  var css = ''
    /* ---------- 30: Keep on hand look ---------- */
    + 'html:not(#scx):not(#scy):not(#fpz) body #list .card button.par.par, html:not(#scx):not(#scy):not(#fpz) body #detail .cl-stock button.qc-dpar.qc-dpar {'
    + ' background: #000 !important; background-image: none !important; color: #fff !important; -webkit-text-fill-color: #fff !important; border: 1px solid #000 !important;'
    + ' box-shadow: 0 2px 8px rgba(0,0,0,.18) !important; }'
    + 'html.storm-crew body #list .card button.par.par { display: none !important; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body #detail .cl-stock button.qc-dpar.qc-dpar { padding-left: 2px !important; padding-right: 2px !important; font-size: 12.5px !important; letter-spacing: -.2px; }'
    + 'html body #list .card button.par.par::before, html body #detail .cl-stock button.qc-dpar.qc-dpar::before, #qc-sheet .qc-col[data-qc-col="par"] .qc-lbl::before {'
    + ' content: ""; flex: none; display: inline-block; vertical-align: -1px; margin-right: 7px; width: 13px; height: 13px; background: url("' + LOCK + '") center / contain no-repeat; }'
    + '#qc-sheet .qc-col[data-qc-col="par"] .qc-lbl::before, html body #detail .cl-stock button.qc-dpar.qc-dpar::before { margin-right: 5px; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body #qc-sheet .qc-col[data-qc-col="par"] .qc-step[data-qc-d="1"] { background: #000 !important; color: #fff !important; border-color: #000 !important; }'
    /* code box (same look as the Manager Login box) */
    + '#kp30 { position: fixed; inset: 0; z-index: 2147483601; display: none; align-items: center; justify-content: center; padding: calc(20px + env(safe-area-inset-top)) 18px calc(20px + env(safe-area-inset-bottom)); box-sizing: border-box;'
    + ' background: rgba(15,23,32,.55); font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0F1720; opacity: 0; transition: opacity .26s ease; }'
    + '#kp30.on { display: flex; } #kp30.in { opacity: 1; }'
    + '#kp30 .bx { width: 100%; max-width: 380px; background: #fff; border: 1px solid ' + NAVY + '; border-radius: 22px; padding: 20px 16px 14px; text-align: center; box-shadow: 0 16px 40px rgba(15,23,32,.30);'
    + ' transform: translate3d(0,16px,0) scale(.96); opacity: 0; transition: transform .26s ' + EZ + ', opacity .26s ' + EZ + '; }'
    + '#kp30.in .bx { transform: none; opacity: 1; }'
    + '#kp30 .lk { width: 44px; height: 44px; margin: 0 auto 10px; border-radius: 50%; background: #000 url("' + LOCK + '") center / 20px no-repeat; }'
    + '#kp30 h3 { margin: 0 0 4px; font-size: 19px; font-weight: 800; } #kp30 p { margin: 0 0 14px; font-size: 13.5px; font-weight: 600; color: #6B7280; line-height: 1.4; }'
    + '#kp30 input { display: block; width: 100%; box-sizing: border-box; height: 56px; margin: 0 0 8px; border: 1.5px solid #D5DCE5; border-radius: 14px; background: #fff; color: #0F1720;'
    + ' font: 700 26px/1 inherit; font-family: inherit; letter-spacing: 10px; text-align: center; -webkit-user-select: text; user-select: text; }'
    + '#kp30 input:focus { outline: none; border-color: ' + BLUE + '; box-shadow: 0 0 0 3px rgba(41,171,226,.18); }'
    + '#kp30 .er { min-height: 18px; margin: 0 0 8px; font-size: 13.5px; font-weight: 700; color: #DC2626; }'
    + '#kp30 .go, #kp30 .no { display: block; width: 100%; min-height: 52px; border-radius: 26px; font-family: inherit; font-size: 16px; font-weight: 800; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease; }'
    + '#kp30 .go { border: 0; background: #000; color: #fff; } #kp30 .go:disabled { opacity: .6; }'
    + '#kp30 .no { margin-top: 8px; border: 1px solid ' + NAVY + '; background: #fff; color: #0F1720; }'
    + '#kp30 .go:not(:disabled):active, #kp30 .no:active { transform: scale(.97); }'
    /* ---------- 29: finished job -> put back ---------- */
    + 'html:not(#scx):not(#scy):not(#fpz) body #sj214 .lk216 .rm204 button[data-rm204] { font-size: 0 !important; }'
    + 'html body #sj214 .lk216 .rm204 button[data-rm204]::after { content: "Put items back into inventory"; font-size: 14.5px; }'
    + '#fp29 { position: fixed; inset: 0; z-index: 2147483000; display: none; font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0F1720; }'
    + '#fp29.on { display: block; }'
    + '#fp29 .scr { position: absolute; inset: 0; background: rgba(15,23,32,.38); opacity: 0; transition: opacity .26s ease; }'
    + '#fp29.in .scr { opacity: 1; }'
    + '#fp29 .sh { position: absolute; left: 0; right: 0; bottom: 0; max-width: 620px; margin: 0 auto; max-height: 88vh; display: flex; flex-direction: column; background: #EAF0F7; border-radius: 22px 22px 0 0;'
    + ' box-shadow: 0 -8px 30px rgba(15,23,32,.16); transform: translate3d(0,100%,0); transition: transform .26s ' + EZ + '; padding: 8px 16px calc(16px + env(safe-area-inset-bottom)); box-sizing: border-box; }'
    + '#fp29.in .sh { transform: none; }'
    + '#fp29 .gr { width: 40px; height: 5px; border-radius: 3px; background: #C9D3DF; margin: 2px auto 12px; flex: none; }'
    + '#fp29 h3 { margin: 0 2px 4px; font-size: 19px; font-weight: 800; flex: none; } #fp29 .su { margin: 0 2px 12px; color: #6B7280; font-size: 13.5px; font-weight: 600; flex: none; line-height: 1.4; }'
    + '#fp29 .ls { overflow-y: auto; -webkit-overflow-scrolling: touch; flex: 1 1 auto; min-height: 0; margin: 0 -2px 12px; padding: 0 2px; }'
    + '#fp29 .ln { display: flex; align-items: center; gap: 12px; margin: 0 0 8px; padding: 10px 12px; border-radius: 14px; background: #fff; border: 1px solid ' + NAVY + '; font-size: 14.5px; font-weight: 700; line-height: 1.3; }'
    + '#fp29 .ln b { color: #15803D; font-weight: 800; white-space: nowrap; } #fp29 .ln.z { opacity: .7; } #fp29 .ln em { display: block; font-style: normal; font-size: 12.5px; color: #6B7280; font-weight: 600; }'
    + '#fp29 .ph215 { flex: none; display: block; width: 40px; height: 40px; border-radius: 10px; background: #EEF2F7; overflow: hidden; }'
    + '#fp29 .ph215 img { display: block; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity .22s ease; } #fp29 .ph215 img.ld { opacity: 1; }'
    + '#fp29 .skl { display: block; height: 11px; margin: 5px 0; border-radius: 6px; background: #EEF2F7; }'
    + '#fp29 .er { margin: 0 0 10px; padding: 10px 12px; border-radius: 12px; background: #FEECEC; color: #B42318; font-size: 13.5px; font-weight: 700; flex: none; }'
    + '#fp29 .go, #fp29 .alt, #fp29 .no { display: block; width: 100%; min-height: 52px; margin: 0 0 10px; border-radius: 26px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer; flex: none;'
    + ' touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease, opacity .2s ease; }'
    + '#fp29 .go { border: 0; background: ' + BLUE + '; color: #fff; } #fp29 .go:disabled { opacity: .6; }'
    + '#fp29 .alt { border: 1px solid #F4C7C3; background: #fff; color: #B42318; font-size: 14px; }'
    + '#fp29 .no { border: 1px solid ' + NAVY + '; background: #fff; color: #0F1720; margin-bottom: 0; }'
    + '#fp29 .go:not(:disabled):active, #fp29 .alt:active, #fp29 .no:active { transform: scale(.97); }'
    + '@media (prefers-reduced-motion: reduce) { #kp30, #kp30 .bx, #fp29 .scr, #fp29 .sh { transition: none !important; } }';
  var st = document.createElement('style'); st.id = 'fix-print-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  /* =================== 30: manager code every time =================== */
  var K = { cb: null, busy: 0 };
  function kp() {
    var r = document.getElementById('kp30'); if (r) return r;
    r = document.createElement('div'); r.id = 'kp30'; r.className = 'dk-skip'; r.setAttribute('role', 'dialog'); r.setAttribute('aria-modal', 'true'); r.setAttribute('aria-label', 'Manager code');
    r.innerHTML = '<div class="bx"><div class="lk"></div><h3>Enter manager code</h3><p>Keep on hand is locked. Type the manager code to save this change.</p>'
      + '<input type="password" inputmode="numeric" pattern="[0-9]*" maxlength="8" autocomplete="off" placeholder="Code" data-kp-in>'
      + '<div class="er" data-kp-er></div><button type="button" class="go" data-kp-go>Unlock and save</button><button type="button" class="no" data-kp-no>Cancel</button></div>';
    document.body.appendChild(r); return r;
  }
  function askCode(cb) {
    var r = kp(); K.cb = cb; K.busy = 0;
    var i = r.querySelector('[data-kp-in]'); i.value = ''; r.querySelector('[data-kp-er]').textContent = ''; r.querySelector('[data-kp-go]').disabled = false; r.querySelector('[data-kp-go]').textContent = 'Unlock and save';
    clearTimeout(K.t); r.classList.add('on'); void r.offsetWidth; r.classList.add('in');
    setTimeout(function () { try { i.focus(); } catch (e) {} }, 60);
  }
  function shutCode(ok) {
    var r = document.getElementById('kp30'); if (!r) return; var cb = K.cb; K.cb = null;
    try { var a = document.activeElement; if (a && a.blur) a.blur(); } catch (e) {}
    r.classList.remove('in'); clearTimeout(K.t); K.t = setTimeout(function () { r.classList.remove('on'); }, 270);
    if (cb) setTimeout(function () { cb(!!ok); }, ok ? 0 : 0);
  }
  function submitCode() {
    var r = document.getElementById('kp30'); if (!r || K.busy) return;
    var v = (r.querySelector('[data-kp-in]').value || '').replace(/\D/g, ''), er = r.querySelector('[data-kp-er]'), g = r.querySelector('[data-kp-go]'), R = run();
    if (!/^\d{4,8}$/.test(v)) { er.textContent = 'Use 4 to 8 digits.'; return; }
    if (!R) { er.textContent = 'No connection. Try again in a moment.'; return; }
    K.busy = 1; g.disabled = true; g.textContent = 'Checking\u2026'; er.textContent = '';
    R.withSuccessHandler(function (res) {
      K.busy = 0; g.disabled = false; g.textContent = 'Unlock and save';
      if (res && res.ok && res.token) {
        /* the server's fresh manager token goes where a normal login keeps it; the code itself is never stored */
        try { localStorage.setItem('stormAccessV1', JSON.stringify({ role: 'mgr', tok: res.token, exp: res.exp })); } catch (e) {}
        shutCode(true); return;
      }
      if (res && res.set === false) { er.textContent = 'No manager code is set yet.'; return; }
      er.textContent = 'Wrong code. Try again.'; var i = r.querySelector('[data-kp-in]'); i.value = ''; try { i.focus(); } catch (e) {}
    }).withFailureHandler(function (e) {
      K.busy = 0; g.disabled = false; g.textContent = 'Unlock and save';
      er.textContent = /PIN_LOCKED/.test(em(e)) ? 'Too many wrong tries. Wait 10 minutes.' : 'Couldn\u2019t check the code. Try again.';
    }).managerLogin(v);
  }
  window.addEventListener('keydown', function (e) {
    var r = document.getElementById('kp30'); if (!r || !r.classList.contains('on')) return;
    if (e.key === 'Enter') { e.preventDefault(); e.stopImmediatePropagation(); submitCode(); }
    else if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); if (!K.busy) shutCode(false); }
  }, true);
  document.addEventListener('input', function (e) { if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-kp-in')) e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8); }, true);

  function parChanged() { var w = document.querySelector('#qc-sheet.open .qc-col[data-qc-col="par"] .qc-was'); return !!(w && w.textContent.trim()); }
  function editParChanged() {
    var b = document.querySelector('#ap-main .ap-id:not(#ap-id) b, #ap-sub .ap-id:not(#ap-id) b, .ap-id:not(#ap-id) b'), f = document.getElementById('ap-f-par');
    if (!b || !f) return false; var it = item(b.textContent.trim()); if (!it) return false;
    var o = it.par == null ? '' : String(it.par).trim(), n = String(f.value || '').trim();
    return o !== n && !(o === '' && n === '') && Number(o) !== Number(n === '' ? NaN : n);
  }
  var pass = 0;
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    /* code box */
    if (t.closest('#kp30')) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (t.closest('[data-kp-go]')) submitCode(); else if (t.closest('[data-kp-no]') || t.id === 'kp30') { if (!K.busy) shutCode(false); }
      return;
    }
    if (pass) return;
    /* count sheet Save with a Keep on hand change */
    var sv = t.closest('#qc-sheet .qc-save');
    if (sv && mgr() && parChanged()) {
      e.preventDefault(); e.stopImmediatePropagation();
      askCode(function (ok) { if (!ok) return; pass = 1; try { sv.click(); } finally { pass = 0; } });
      return;
    }
    /* Edit product Save with a Keep on hand change */
    var ap = t.closest('[data-ap-save]');
    if (ap && mgr() && editParChanged()) {
      e.preventDefault(); e.stopImmediatePropagation();
      askCode(function (ok) { if (!ok) return; pass = 1; try { ap.click(); } finally { pass = 0; } });
      return;
    }
    /* the old inline Keep on hand box (only reachable outside Inventory mode) */
    var pb = t.closest('#list .card[data-bin] button.par');
    if (pb && jobMode()) {
      e.preventDefault(); e.stopImmediatePropagation();
      var bin = pb.getAttribute('data-bin') || pb.closest('.card').getAttribute('data-bin');
      askCode(function (ok) { if (ok && pb.isConnected) { try { editPar(bin, pb); } catch (x) {} } });
    }
  }, true);
  window.addEventListener('keydown', function (e) {
    if (pass || e.key !== 'Enter') return;
    var kb = document.getElementById('kp30'); if (kb && kb.classList.contains('on')) return;
    var s = document.getElementById('qc-sheet'); if (!s || !s.classList.contains('open') || s.classList.contains('qc-padon')) return;
    if (e.target && e.target.closest && e.target.closest('button')) return;
    if (!mgr() || !parChanged()) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var sv = s.querySelector('.qc-save'); askCode(function (ok) { if (!ok || !sv) return; pass = 1; try { sv.click(); } finally { pass = 0; } });
  }, true);

  /* =================== 29: Completed job -> put items back (manager) =================== */
  function api() { return window.stormSJ215; }
  function fin() { try { return (window.stormSJFin203 && stormSJFin203()) || {}; } catch (e) { return {}; } }
  var C = { k: '', job: null, taken: null, err: '' }, P = {};
  function canBack(bin) { var it = item(bin); if (!it) return false; var o = it.onHand; return !(o === '' || o == null || isNaN(Number(o))); } /* same rule as the server (blank On hand stays blank) */
  function sheet() { var r = document.getElementById('fp29'); if (!r) { r = document.createElement('div'); r.id = 'fp29'; r.className = 'dk-skip'; r.setAttribute('role', 'dialog'); r.setAttribute('aria-label', 'Put items back into inventory'); document.body.appendChild(r); } return r; }
  function lines() { var j = C.job; if (!j) return []; return j.lines.map(function (l) { var t = l.taken; if (t == null && C.taken) t = C.taken[l.bin]; return { bin: l.bin, name: l.name || l.bin, t: t }; }); }
  function paint() {
    var r = sheet(), L = lines(), known = L.every(function (l) { return l.t != null; }), n = 0;
    L.forEach(function (l) { l.sk = Number(l.t) > 0 && !canBack(l.bin); if (!l.sk) n += Number(l.t) || 0; });
    var who = E(String(C.job && C.job.customer || '').split(' \u00b7 ')[0]);
    var h = '<div class="scr" data-fp-no></div><div class="sh"><div class="gr"></div><h3>Put items back into inventory?</h3>'
      + '<div class="su">' + who + ' is Completed. Only do this if the material came back to the shop. It comes off Ready to load on truck and these go back on the shelf:</div>';
    if (C.err) h += '<div class="er">' + E(C.err) + '</div>';
    h += '<div class="ls">';
    L.forEach(function (l) {
      var ph = window.stormPhoto215 ? stormPhoto215.html(l.bin) : '';
      if (l.t == null) { h += '<div class="ln">' + ph + '<span style="flex:1"><i class="skl" style="width:70%"></i><i class="skl" style="width:35%"></i></span></div>'; return; }
      if (l.sk) { h += '<div class="ln z">' + ph + '<span style="flex:1;min-width:0">' + E(l.name) + '<em>Can\u2019t go back: not in inventory or no On hand count (' + E(l.t) + ' skipped)</em></span></div>'; return; }
      h += '<div class="ln' + (l.t ? '' : ' z') + '">' + ph + '<span style="flex:1;min-width:0">Put back <b>' + E(l.t) + ' \u00d7</b> ' + E(l.name) + (l.t ? '' : '<em>Nothing came off the shelf for this one</em>') + '</span></div>';
    });
    h += '</div><button type="button" class="go" data-fp-go' + (known && n > 0 ? '' : ' disabled') + '>' + (!known ? 'Checking\u2026' : n ? 'Put back ' + n + ' item' + (n === 1 ? '' : 's') : 'Nothing to put back') + '</button>'
      + '<button type="button" class="alt" data-fp-rm>Remove from list only (went to the customer)</button><button type="button" class="no" data-fp-no>Cancel</button></div>';
    var ls = r.querySelector('.ls'), y = ls ? ls.scrollTop : 0;
    r.innerHTML = h; var l2 = r.querySelector('.ls'); if (l2) l2.scrollTop = y;
    try { if (window.stormPhoto215) stormPhoto215.wire(r); } catch (e) {}
  }
  function openPB() {
    var a = api(), k = a && a.cur(), j = k && a.job(k); if (!j || !mgr()) return;
    C.k = k; C.job = JSON.parse(JSON.stringify(j)); C.err = ''; C.taken = null;
    paint(); var r = sheet(); r.classList.add('on'); void r.offsetWidth; requestAnimationFrame(function () { r.classList.add('in'); });
    if (!C.job.lines.every(function (l) { return l.taken != null; }) && run()) {
      run().withSuccessHandler(function (s) { if (C.k !== k || !s) return; C.taken = {}; (s.rows || []).forEach(function (x) { C.taken[x.itemBin] = Math.max(0, Number(x.taken) || 0); }); C.job.lines.forEach(function (l) { if (C.taken[l.bin] == null) C.taken[l.bin] = 0; }); paint(); })
        .withFailureHandler(function () { if (C.k !== k) return; C.err = 'Couldn\u2019t get the counts. Check signal.'; paint(); }).getStaging(k);
    }
  }
  function shutPB(cb) {
    var r = sheet(); if (!r.classList.contains('on')) { if (cb) cb(); return; }
    r.classList.remove('in'); setTimeout(function () { r.classList.remove('on'); r.innerHTML = ''; C.k = ''; if (cb) cb(); }, 280);
  }
  function snap(k) { var o = {}; try { o.st = window.stormStagingApi ? stormStagingApi.staged(k) : null; } catch (e) {} try { o.mk = window.stormSJ202 ? stormSJ202.state(k) : ''; } catch (e) {}
    try { o.pl = (JSON.parse(localStorage.getItem('stormPullLinesV203') || '{}'))[k]; } catch (e) {} try { o.f = fin()[k]; } catch (e) {} return o; }
  function unsnap(k, o) {
    try { if (o.st && window.stormStagingApi) stormStagingApi.setStaged(k, o.st); } catch (e) {}
    try { if (o.mk === 'staged' && window.stormSJ202) stormSJ202.mark(k, 1); } catch (e) {}
    try { if (o.pl) { var m = JSON.parse(localStorage.getItem('stormPullLinesV203') || '{}'); m[k] = o.pl; localStorage.setItem('stormPullLinesV203', JSON.stringify(m)); } } catch (e) {}
    try { if (o.f) { var F = fin(); F[k] = o.f; localStorage.setItem('stormFinishedV203', JSON.stringify(F)); } } catch (e) {}
  }
  function cleared(k) {
    try { if (window.stormSJ202) stormSJ202.mark(k, 0); } catch (e) {}
    try { if (window.stormStagingApi && stormStagingApi.staged(k)) stormStagingApi.setStaged(k, null); } catch (e) {}
    try { var m = JSON.parse(localStorage.getItem('stormPullLinesV203') || '{}'); if (m[k]) { delete m[k]; localStorage.setItem('stormPullLinesV203', JSON.stringify(m)); } } catch (e) {}
    try { var F = fin(); if (F[k]) { delete F[k]; localStorage.setItem('stormFinishedV203', JSON.stringify(F)); } } catch (e) {}
  }
  function goPB() {
    var k = C.k, a = api(); if (!k || P[k] || !run()) { if (!run()) { C.err = 'No signal. Try again when you have signal.'; paint(); } return; }
    var o = snap(k); P[k] = 1;
    try { a.hide(k); } catch (e) {} cleared(k); shutPB();
    run().withSuccessHandler(function (res) {
      delete P[k]; cleared(k); try { api().gone(k); } catch (e) {}
      var u = 0; ((res && res.lines) || []).forEach(function (l) { u += Number(l.restored) || 0; });
      T(u ? 'Put back. ' + u + ' item' + (u === 1 ? ' is' : 's are') + ' back in inventory.' : 'Done. Nothing needed to go back.');
    }).withFailureHandler(function (e) {
      delete P[k]; var m = em(e);
      if (/NOT_STAGED/.test(m)) { cleared(k); try { api().gone(k); } catch (x) {} T('This job is no longer on Ready to load on truck.'); return; }
      unsnap(k, o); try { api().unhide(k); } catch (x) {}
      if (/MANAGER_REQUIRED/.test(m)) { T('Not put back: manager login expired. Log in and try again.', 1); try { stormAccess.expired(); } catch (x) {} return; }
      T('Not put back' + (m && !/Network|HTTP 0/i.test(m) ? ': ' + m : '. Check signal and try again.'), 1);
    }).unstageJob(k, dev(), tok());
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var b = t.closest('#sj214 [data-rm204]');
    if (b) {
      var a = api(), k = a && a.cur();
      if (k && fin()[k] && mgr()) { e.preventDefault(); e.stopImmediatePropagation(); openPB(); }
      return; /* not Completed: the v204 Remove & return sheet handles it */
    }
    if (!t.closest('#fp29')) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (!sheet().classList.contains('in')) return;
    if (t.closest('[data-fp-go]')) { if (!t.closest('[data-fp-go]').disabled) goPB(); return; }
    if (t.closest('[data-fp-rm]')) { shutPB(function () { try { if (window.stormRm204) stormRm204.open(); } catch (x) {} }); return; }
    if (t.closest('[data-fp-no]')) shutPB();
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && C.k) shutPB(); });
  window.stormFixPrint = { v: 1, askCode: askCode, putBack: openPB };
})();
