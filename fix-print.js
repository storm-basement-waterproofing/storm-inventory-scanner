/* fix-print.js (Hark, 2026-11-13, Dave's fix list items 29-35: manager controls and printing). Loaded by Index.html right after
   storm-clean-theme.js. Everything here is an overlay: CSS with higher specificity, window capture-phase click handlers registered
   before the Index inline blocks, and only EXISTING server functions (managerLogin, unstageJob, removeStagedJob via the v204 sheet,
   getStaging). No server change.
   v1: 29 + 30. v2: 31-35 (print), second block below.
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

/* fix-print v2 (Hark, 2026-11-13, Dave's fix list 31-35): one Staging Checklist printout, used everywhere a job prints.
   31. Print preview rebuilt in the app's staging checklist layout: STORM logo, customer / address / Jobber # / staged date, then every item
       as a row with its photo, name, SKU + bin, quantity and check boxes (same rounded green boxes as the app).
   32. Print preview + Print on the Pull list, on the "Staged Job Complete" screen right after staging, and on a job's Ready to load on truck
       screen (the staged job page).
   33. Two check columns: Staged (pulled off the shelf) and Loaded on truck.
   34. The boxes are exactly what is checked: the Pull list's own boxes, the load screen's own boxes, else the server's marks
       (getStaging(jobKey) for Pulled, getStaging("ld:" + jobKey) for Loaded; read-only). Partly checked lists print partly checked.
   35. Count circles (18/18 style) for Staged and Loaded: blue while incomplete, green when complete, on screen and on paper.
   Print goes through the wrapper's existing printPull hand-off (the app frame can't print); opened on its own, the app prints itself. Letter paper. */
(function () {
  if (window.__fixPrint2) return; window.__fixPrint2 = 1;
  var EZ = 'cubic-bezier(.32,.72,0,1)', NAVY = '#1B2735', BLUE = '#29ABE2', GREEN = '#16A34A';
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var LOGO = BASE + 'assets/logos/STORM-logo-black-text-transparent.svg';
  var HD = BASE + 'assets/items-hd/';
  function E(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(m, bad) { try { showToast(m, !!bad); } catch (e) {} }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }
  function item(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function cust() { try { return JSON.parse(localStorage.getItem('stormJobCustomerV1') || '{}') || {}; } catch (e) { return {}; } }
  function fin() { try { return (window.stormSJFin203 && stormSJFin203()) || {}; } catch (e) { return {}; } }
  var PRINTER = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>';
  var EYE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

  /* ---------- the printed sheet (same CSS on screen and on paper) ---------- */
  var DC = '.fpd { font-family: Montserrat, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #0F1720; font-size: 12px; line-height: 1.3; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
    + ' .fpd * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
    + ' .fpd .fphd { text-align: center; padding: 0 0 10px; border-bottom: 2px solid ' + NAVY + '; margin: 0 0 12px; }'
    + ' .fpd .fphd img { display: block; height: 46px; width: auto; max-width: 70%; margin: 0 auto 6px; }'
    + ' .fpd .fphd .fptt { font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #4B5563; }'
    + ' .fpd .fpcu { display: flex; align-items: center; gap: 12px; margin: 0 0 14px; padding: 12px 14px; border: 1.5px solid ' + NAVY + '; border-radius: 14px; }'
    + ' .fpd .fpci { flex: 1; min-width: 0; } .fpd .fpnm { font-size: 19px; font-weight: 800; line-height: 1.15; } .fpd .fpad { margin-top: 2px; font-size: 12.5px; font-weight: 600; color: #374151; }'
    + ' .fpd .fpmt { margin-top: 5px; font-size: 11px; font-weight: 600; color: #6B7280; } .fpd .fpmt b { color: #0F1720; }'
    + ' .fpd .fprg { flex: none; display: flex; gap: 10px; } .fpd .fpring { width: 66px; text-align: center; } .fpd .fpring svg { display: block; width: 62px; height: 62px; margin: 0 auto; }'
    + ' .fpd .fpring span { display: block; margin-top: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #4B5563; white-space: nowrap; }'
    + ' .fpd table { width: 100%; border-collapse: separate; border-spacing: 0 6px; table-layout: fixed; }'
    + ' .fpd th { padding: 0 6px 2px; font-size: 9.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #4B5563; text-align: left; }'
    + ' .fpd th.fpc, .fpd td.fpc { text-align: center; } .fpd col.fpwp { width: 52px; } .fpd col.fpwq { width: 46px; } .fpd col.fpwb { width: 64px; }'
    + ' .fpd td { padding: 6px; vertical-align: middle; background: #fff; border-top: 1.5px solid ' + NAVY + '; border-bottom: 1.5px solid ' + NAVY + '; }'
    + ' .fpd td:first-child { border-left: 1.5px solid ' + NAVY + '; border-radius: 12px 0 0 12px; } .fpd td:last-child { border-right: 1.5px solid ' + NAVY + '; border-radius: 0 12px 12px 0; }'
    + ' .fpd tr { break-inside: avoid; page-break-inside: avoid; } .fpd thead { display: table-header-group; }'
    + ' .fpd .fpph { display: block; width: 40px; height: 40px; border-radius: 8px; background: #EEF2F7; overflow: hidden; } .fpd .fpph img { display: block; width: 100%; height: 100%; object-fit: contain; }'
    + ' .fpd .fpin { font-size: 12.5px; font-weight: 700; overflow-wrap: anywhere; } .fpd .fpsk { margin-top: 2px; font-size: 10.5px; font-weight: 600; color: #6B7280; overflow-wrap: anywhere; }'
    + ' .fpd .fpq { font-size: 15px; font-weight: 800; }'
    + ' .fpd .fpcb { display: inline-block; width: 26px; height: 26px; border-radius: 8px; border: 2.5px solid #9AA7B4; background: #fff; vertical-align: middle; }'
    + ' .fpd .fpcb svg { display: none; width: 100%; height: 100%; } .fpd .fpcb.on { border-color: ' + GREEN + '; background: ' + GREEN + '; } .fpd .fpcb.on svg { display: block; }'
    + ' .fpd .fpft { display: flex; justify-content: space-between; gap: 10px; margin-top: 12px; padding-top: 8px; border-top: 1px solid #C9D3DF; font-size: 10px; font-weight: 600; color: #6B7280; }'
    + ' .fpd .fpsg { display: flex; gap: 18px; margin-top: 18px; font-size: 11px; font-weight: 700; color: #374151; } .fpd .fpsg span { flex: 1; border-top: 1px solid #6B7280; padding-top: 4px; }'
    + ' .fpd .fpem { padding: 20px; text-align: center; color: #6B7280; font-weight: 700; }';
  var PAGE = '@page { size: letter portrait; margin: 0.45in 0.45in 0.5in; } html, body { margin: 0 !important; padding: 0 !important; }';

  function ring(d, n, label) {
    var p = n ? Math.min(1, d / n) : 0, done = n > 0 && d >= n, c = done ? GREEN : BLUE, r = 26, L = 2 * Math.PI * r;
    return '<div class="fpring"><svg viewBox="0 0 62 62" aria-hidden="true"><circle cx="31" cy="31" r="' + r + '" fill="#fff" stroke="#E3E8EF" stroke-width="6"/>'
      + (p > 0 ? '<circle cx="31" cy="31" r="' + r + '" fill="none" stroke="' + c + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + (L * p).toFixed(2) + ' ' + L.toFixed(2) + '" transform="rotate(-90 31 31)"/>' : '')
      + '<text x="31" y="35.5" text-anchor="middle" font-family="Montserrat, Arial, sans-serif" font-size="' + (String(d + '/' + n).length > 5 ? 11.5 : 14) + '" font-weight="800" fill="' + (done ? GREEN : '#0F1720') + '">' + d + '/' + n + '</text></svg><span>' + E(label) + '</span></div>';
  }
  function photo(bin) {
    var u = ''; try { u = window.stormPhoto215 ? stormPhoto215.url(bin) : ''; } catch (e) {}
    if (!u) { var it = item(bin), p = it && it.photoUrl; if (p && !/^sheetimg:/.test(String(p))) u = String(p); }
    if (!u) u = HD + encodeURIComponent(bin) + '.jpg?v=1';
    return u;
  }
  function when(ms) { if (!ms) return ''; try { return new Date(ms).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function html(D) {
    var n = D.lines.length, dp = D.lines.filter(function (l) { return l.pulled; }).length, dl = D.lines.filter(function (l) { return l.loaded; }).length;
    var meta = [D.jobNo ? 'Job <b>#' + E(D.jobNo) + '</b>' : '', D.title ? E(D.title) : '', D.staged && D.staged.at ? 'Staged <b>' + E(when(D.staged.at)) + '</b>' + (D.staged.by ? ' by ' + E(D.staged.by) : '') : 'Not staged yet', D.done ? '<b>Completed</b>' : ''].filter(Boolean).join(' \u00b7 ');
    var h = '<div class="fpd"><div class="fphd"><img src="' + LOGO + '" alt="STORM Basement Waterproofing"><div class="fptt">Staging checklist</div></div>'
      + '<div class="fpcu"><div class="fpci"><div class="fpnm">' + E(D.name || 'Job') + '</div>' + (D.addr ? '<div class="fpad">' + E(D.addr) + '</div>' : '') + '<div class="fpmt">' + meta + '</div></div>'
      + '<div class="fprg">' + ring(dp, n, 'Staged') + ring(dl, n, 'Loaded') + '</div></div>';
    if (!n) h += '<div class="fpem">No items on this list.</div>';
    else {
      h += '<table><colgroup><col class="fpwp"><col><col class="fpwq"><col class="fpwb"><col class="fpwb"></colgroup><thead><tr><th></th><th>Item</th><th class="fpc">Qty</th><th class="fpc">Staged</th><th class="fpc">Loaded on truck</th></tr></thead><tbody>';
      D.lines.forEach(function (l) {
        var it = item(l.bin) || {}, sku = it.sku ? 'SKU ' + it.sku : '';
        h += '<tr><td><span class="fpph"><img src="' + E(photo(l.bin)) + '" alt=""></span></td><td><div class="fpin">' + E(l.name || it.name || l.bin) + '</div><div class="fpsk">' + E([sku, 'Bin ' + String(l.bin).toUpperCase()].filter(Boolean).join(' \u00b7 ')) + '</div></td>'
          + '<td class="fpc"><span class="fpq">' + E(l.qty == null || l.qty === '' ? '\u2013' : l.qty) + '</span></td>'
          + '<td class="fpc"><span class="fpcb' + (l.pulled ? ' on' : '') + '">' + CHK + '</span></td><td class="fpc"><span class="fpcb' + (l.loaded ? ' on' : '') + '">' + CHK + '</span></td></tr>';
      });
      h += '</tbody></table>';
    }
    h += '<div class="fpsg"><span>Staged by</span><span>Loaded by</span></div>'
      + '<div class="fpft"><span>STORM Basement Waterproofing</span><span>' + dp + ' of ' + n + ' staged \u00b7 ' + dl + ' of ' + n + ' loaded</span><span>Printed ' + E(when(Date.now())) + '</span></div></div>';
    return h;
  }

  /* ---------- what is on screen ---------- */
  function splitCust(c) { var p = String(c || '').split(' \u00b7 '); return { name: p[0] || '', addr: p.slice(1).join(' \u00b7 ') }; }
  function jobInfo(k) {
    var c = cust(), a = window.stormStagingApi, key = ''; try { key = a ? a.key() : ''; } catch (e) {}
    if (key && key === k) return { jobNo: c.jobberJobNumber || c.quoteJobberNumber || '', title: c.jobberTitle || c.quoteJobberTitle || '' };
    return { jobNo: '', title: '' };
  }
  var lastPull = null;
  function fromPull() {
    var s = document.getElementById('pl196'); if (!s) return null;
    var rows = s.querySelectorAll('.l:not(.sk203)'); if (!rows.length) return null;
    var a = window.stormStagingApi, k = '', cu = ''; try { k = a.key(); cu = a.cust(); } catch (e) {}
    var L = [].map.call(rows, function (r) {
      var b = r.querySelector('[data-pl-bin]'), n = r.querySelector('.n'), sm = n && n.querySelector('small'), nm = '';
      if (n) [].forEach.call(n.childNodes, function (x) { if (x.nodeType === 3) nm += x.nodeValue; });
      return { bin: b ? b.getAttribute('data-pl-bin') : '', name: nm.trim(), qty: sm ? sm.textContent.replace(/^\s*Qty\s*/i, '').trim() : '', pulled: !!(b && b.classList.contains('on')), loaded: false };
    }).filter(function (l) { return l.bin; });
    var sc = splitCust(cu || ((s.querySelector('.h b') || {}).textContent || '')), ji = jobInfo(k);
    var D = { src: 'pull', k: k, name: sc.name, addr: sc.addr, jobNo: ji.jobNo, title: ji.title, staged: null, lines: L, screenPulled: true };
    lastPull = JSON.parse(JSON.stringify(D)); return D;
  }
  function fromDone() {
    var s = document.getElementById('pl196'); if (!s || !s.querySelector('.dn') || !lastPull) return null;
    var D = JSON.parse(JSON.stringify(lastPull)); D.src = 'done'; D.screenPulled = false; D.staged = { at: Date.now(), by: '' };
    try { var a = window.stormStagingApi, st = a && a.staged(D.k); if (st && st.at) D.staged = { at: st.at, by: st.by || '' }; } catch (e) {}
    return D;
  }
  function fromSJ() {
    var a = window.stormSJ215, k = a && a.cur(), j = k && a.job(k); if (!j) return null;
    var sc = splitCust(j.customer), ji = jobInfo(k);
    return { src: 'sj', k: k, name: sc.name, addr: sc.addr, jobNo: ji.jobNo, title: ji.title, staged: { at: j.at, by: j.by }, done: !!fin()[k], screenLoaded: true,
      lines: j.lines.map(function (l) { return { bin: l.bin, name: l.name, qty: l.qty, pulled: true, loaded: !!l.loaded }; }) };
  }
  function current() {
    var pv = document.getElementById('fp31');
    var s = document.getElementById('pl196');
    if (s && s.classList.contains('open') && !s.classList.contains('closing')) { if (s.querySelector('.dn')) return fromDone(); var p = fromPull(); if (p) return p; }
    var sj = document.getElementById('sj214'); if (sj && sj.classList.contains('open')) return fromSJ();
    return null;
  }
  /* exact marks from the server for whatever the screen itself doesn't show (read-only calls), then cb(D); cb runs once, at most 3 s later */
  function refine(D, cb) {
    var R = run(), left = 2, done = false; function fin2() { if (done) return; done = true; cb(D); }
    if (!R || !D.k) { fin2(); return; }
    setTimeout(fin2, 3000);
    function one() { if (--left === 0) fin2(); }
    if (D.screenPulled) one(); else R.withSuccessHandler(function (res) {
      if (done || !res || res.jobKey !== D.k) { one(); return; }
      var by = {}; (res.rows || []).forEach(function (r) { if (r && r.itemBin) by[r.itemBin] = r; });
      D.lines.forEach(function (l) { if (by[l.bin]) { l.pulled = !!by[l.bin].checked; delete by[l.bin]; } });
      Object.keys(by).forEach(function (b) { if (b === '__done__') return; var r = by[b]; D.lines.push({ bin: b, name: r.itemName || b, qty: r.qty == null ? '' : r.qty, pulled: !!r.checked, loaded: false }); });
      if (res.staged && res.staged.at) D.staged = { at: res.staged.at, by: res.staged.by || '' };
      one();
    }).withFailureHandler(one).getStaging(D.k);
    if (D.screenLoaded) one(); else R.withSuccessHandler(function (res) {
      if (done || !res || res.jobKey !== 'ld:' + D.k) { one(); return; }
      var on = {}; (res.rows || []).forEach(function (r) { if (r && r.itemBin && r.itemBin !== '__done__') on[r.itemBin] = !!r.checked; else if (r && r.itemBin === '__done__' && r.checked) D.done = true; });
      D.lines.forEach(function (l) { if (l.bin in on) l.loaded = on[l.bin]; });
      one();
    }).withFailureHandler(one).getStaging('ld:' + D.k);
  }

  /* ---------- buttons ---------- */
  var css = ''
    + '.fp-pb { display: flex; gap: 10px; max-width: 588px; margin: 0 auto 10px; }'
    + 'html body .fp-pb button { flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; border-radius: 24px; font-family: inherit; font-size: 14.5px; font-weight: 800;'
    + ' cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pv] { background: #fff !important; color: ' + NAVY + ' !important; -webkit-text-fill-color: ' + NAVY + ' !important; border: 1.5px solid ' + NAVY + ' !important; box-shadow: none !important; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pr] { background: ' + BLUE + ' !important; color: #fff !important; -webkit-text-fill-color: #fff !important; border: 0 !important; box-shadow: 0 4px 14px rgba(41,171,226,.25) !important; }'
    + 'html body .fp-pb button:active { transform: scale(.96); }'
    + 'html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pv] svg, html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pv] svg * { stroke: ' + NAVY + ' !important; fill: none !important; color: ' + NAVY + ' !important; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pr] svg, html:not(#scx):not(#scy):not(#fpz) body .fp-pb button[data-fp-pr] svg * { stroke: #fff !important; fill: none !important; }'
    + 'html body #pl196 .ft .pr228 { display: none !important; }'
    + '#sj214 .fp-sj { max-width: 588px; margin: 18px auto 4px; } #pl196 .dn .fp-pb { max-width: 420px; margin: 0 auto 18px; }'
    /* preview */
    + '#fp31 { position: fixed; inset: 0; z-index: 2147483647; display: flex; flex-direction: column; background: #EAF0F7; font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0F1720;'
    + ' opacity: 0; transform: translate3d(0,24px,0); transition: opacity .26s ' + EZ + ', transform .26s ' + EZ + '; }'
    + '#fp31.in { opacity: 1; transform: none; }'
    + '#fp31 .tb { flex: none; display: flex; align-items: center; gap: 10px; padding: calc(12px + env(safe-area-inset-top)) 16px 10px; }'
    + '#fp31 .tb h2 { flex: 1; margin: 0; font-size: 20px; font-weight: 800; } #fp31 .tb h2 small { display: block; font-size: 12px; font-weight: 700; color: #6B7280; }'
    + 'html:not(#scx):not(#scy):not(#fpz) body #fp31 .tb button { flex: none; width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid ' + NAVY + ' !important; background: #fff !important; color: #0F1720 !important; -webkit-text-fill-color: #0F1720 !important; font: inherit; font-size: 24px; line-height: 38px; padding: 0; box-shadow: none !important; }'
    + '#fp31 .pg { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 4px 12px 16px; }'
    + '#fp31 .sheet { max-width: 8.5in; margin: 0 auto; background: #fff; border-radius: 6px; padding: 22px 16px; box-shadow: 0 10px 30px rgba(15,23,32,.18); }'
    + '#fp31 .ld { text-align: center; margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #6B7280; min-height: 16px; }'
    + '#fp31 .bt { flex: none; padding: 10px 16px calc(14px + env(safe-area-inset-bottom)); background: #EAF0F7; } #fp31 .bt .fp-pb { margin: 0 auto; }'
    + '#fp31 ' + DC.replace(/\} \./g, '} #fp31 .')
    + '@media (max-width: 560px) { #fp31 .pg { padding: 4px 8px 14px; } #fp31 .sheet { padding: 16px 10px; }'
    + ' #fp31 .fpd col.fpwp { width: 44px; } #fp31 .fpd col.fpwq { width: 34px; } #fp31 .fpd col.fpwb { width: 50px; } #fp31 .fpd td { padding: 5px 4px; } #fp31 .fpd th { padding: 0 3px 2px; font-size: 8.5px; letter-spacing: .04em; }'
    + ' #fp31 .fpd .fpph { width: 36px; height: 36px; } #fp31 .fpd .fpin { font-size: 12px; } #fp31 .fpd .fpsk { font-size: 10px; } #fp31 .fpd .fpcb { width: 24px; height: 24px; }'
    + ' #fp31 .fpd .fpcu { padding: 10px; gap: 8px; } #fp31 .fpd .fpnm { font-size: 17px; } #fp31 .fpd .fprg { gap: 4px; } #fp31 .fpd .fpring { width: 54px; } #fp31 .fpd .fpring svg { width: 52px; height: 52px; }'
    + ' #fp31 .fpd .fpft { flex-wrap: wrap; } }'
    + '#fp-print-root { display: none; }'
    + '@media print { html:not(#fpa):not(#fpb):not(#fpc) body > *:not(#fp-print-root) { display: none !important; } html:not(#fpa):not(#fpb):not(#fpc) body > #fp-print-root { display: block !important; }'
    + ' html:not(#fpa):not(#fpb):not(#fpc), html:not(#fpa):not(#fpb):not(#fpc) body { background: #fff !important; height: auto !important; overflow: visible !important; } }'
    + '@media print { #fp31 { display: none !important; } }'
    + '@media (prefers-reduced-motion: reduce) { #fp31 { transition: none !important; } }';
  var st = document.createElement('style'); st.id = 'fix-print2-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);
  function btns(cls) { return '<div class="fp-pb dk-skip' + (cls ? ' ' + cls : '') + '" data-keep><button type="button" data-fp-pv>' + EYE + 'Print preview</button><button type="button" data-fp-pr>' + PRINTER + 'Print</button></div>'; }
  function place() {
    var s = document.getElementById('pl196');
    if (s) {
      var ft = s.querySelector('.ft'); if (ft && ft.querySelector('[data-pl-go]') && !ft.querySelector('.fp-pb')) ft.insertAdjacentHTML('afterbegin', btns());
      var dn = s.querySelector('.dn'); if (dn && lastPull && !dn.querySelector('.fp-pb')) { var p = dn.querySelector('p'); if (p) p.insertAdjacentHTML('afterend', btns()); else dn.insertAdjacentHTML('beforeend', btns()); }
      if (s.querySelector('.l:not(.sk203)')) fromPull();
    }
    var sj = document.getElementById('sj214'), w = sj && sj.classList.contains('open') ? sj.querySelector('.s-wrap[data-v215="job"]') : null;
    if (w) {
      var ex = w.querySelector(':scope > .fp-sj');
      var rm = w.querySelector(':scope > .rm204');
      if (!ex) { w.insertAdjacentHTML('beforeend', btns('fp-sj')); ex = w.querySelector(':scope > .fp-sj'); }
      if (rm && ex.nextElementSibling !== rm && rm.parentNode === w) w.insertBefore(ex, rm);
    }
  }
  var q = 0; function soon() { if (q) return; q = requestAnimationFrame(function () { q = 0; try { place(); } catch (e) {} }); }
  (function watch(n) {
    var hooked = 0;
    ['pl196', 'sj214'].forEach(function (id) { var el = document.getElementById(id); if (el && !el.__fp31 && window.MutationObserver) { el.__fp31 = 1; new MutationObserver(soon).observe(el, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }); } if (el && el.__fp31) hooked++; });
    soon(); if (hooked < 2 && n < 400) setTimeout(function () { watch(n + 1); }, 500);
  })(0);
  if (window.MutationObserver) new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) { var x = ms[i].addedNodes[j]; if (x.id === 'pl196' || x.id === 'sj214') { x.__fp31 = 0; soon(); } } }).observe(document.body || document.documentElement, { childList: true });

  /* ---------- preview + print ---------- */
  var PV = { D: null, gen: 0 };
  function host() { var s = document.getElementById('pl196'); if (s && s.classList.contains('open')) return s; return document.body; } /* inside the Pull list: an older block hides anything that covers it */
  function preview() {
    var D = current(); if (!D) { T('The list is still loading.'); return; }
    var o = document.getElementById('fp31'); if (o) o.remove();
    o = document.createElement('div'); o.id = 'fp31'; o.className = 'dk-skip'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Print preview');
    var g = ++PV.gen; PV.D = D;
    o.innerHTML = '<div class="tb"><h2>Print preview<small>Staging checklist \u00b7 Letter</small></h2><button type="button" data-fp-x aria-label="Close">\u00d7</button></div>'
      + '<div class="pg"><div class="ld">Checking the latest marks\u2026</div><div class="sheet">' + html(D) + '</div></div>'
      + '<div class="bt"><div class="fp-pb"><button type="button" data-fp-x>Close</button><button type="button" data-fp-go>' + PRINTER + 'Print</button></div></div>';
    o.querySelector('.bt [data-fp-x]').setAttribute('data-fp-pv', ''); /* same look as Print preview (white, navy line) */
    host().appendChild(o); void o.offsetWidth; requestAnimationFrame(function () { o.classList.add('in'); });
    refine(D, function (D2) {
      if (g !== PV.gen || !o.isConnected) return; PV.D = D2;
      var sh = o.querySelector('.sheet'), nh = html(D2); if (sh.innerHTML !== nh) sh.innerHTML = nh;
      var l = o.querySelector('.ld'); if (l) l.textContent = '';
    });
  }
  function unpreview() { var o = document.getElementById('fp31'); if (!o) return; PV.gen++; o.classList.remove('in'); setTimeout(function () { o.remove(); }, 270); }
  function send(D) {
    var body = html(D), css = PAGE + ' ' + DC;
    if (window.top !== window) { try { window.top.postMessage({ storm: 'printPull', css: css, body: body }, '*'); return; } catch (e) {} }
    var root = document.getElementById('fp-print-root'); if (!root) { root = document.createElement('div'); root.id = 'fp-print-root'; document.body.appendChild(root); }
    root.innerHTML = '<style>@media print{' + css + '}</style>' + body;
    var ims = root.querySelectorAll('img'), left = ims.length, fired = false;
    function go() { if (fired) return; fired = true; setTimeout(function () { try { window.print(); } catch (e) { T('Printing is not available here', true); } }, 80); }
    if (!left) go(); [].forEach.call(ims, function (im) { if (im.complete) { if (--left === 0) go(); } else im.onload = im.onerror = function () { if (--left === 0) go(); }; });
    setTimeout(go, 4000);
  }
  var printing = 0;
  function print(fromPv) {
    if (fromPv && PV.D) { send(PV.D); return; }
    var D = current(); if (!D) { T('The list is still loading.'); return; }
    if (printing) return; printing = 1; setTimeout(function () { printing = 0; }, 3500);
    refine(D, function (D2) { printing = 0; send(D2); });
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('#fp31')) {
      if (t.closest('[data-fp-go]')) { e.preventDefault(); e.stopImmediatePropagation(); print(true); return; }
      if (t.closest('[data-fp-x]')) { e.preventDefault(); e.stopImmediatePropagation(); unpreview(); return; }
      e.stopImmediatePropagation(); return;
    }
    if (t.closest('.fp-pb [data-fp-pv]')) { e.preventDefault(); e.stopImmediatePropagation(); preview(); return; }
    if (t.closest('.fp-pb [data-fp-pr]')) { e.preventDefault(); e.stopImmediatePropagation(); print(false); return; }
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.getElementById('fp31')) { e.stopImmediatePropagation(); unpreview(); } }, true);
  /* when the screen under the preview goes away, so does the preview */
  setInterval(function () { var o = document.getElementById('fp31'); if (!o || !o.classList.contains('in')) return; var D = PV.D; if (!D) return;
    if (D.src === 'sj') { var sj = document.getElementById('sj214'); if (!sj || !sj.classList.contains('open')) unpreview(); }
    else { var s = document.getElementById('pl196'); if (!s || !s.classList.contains('open')) unpreview(); } }, 700);
  try { window.stormFixPrint = window.stormFixPrint || {}; window.stormFixPrint.v = 2; window.stormFixPrint.doc = function () { var D = current(); return D ? { css: PAGE + ' ' + DC, body: html(D), data: D } : null; }; window.stormFixPrint.preview = preview; window.stormFixPrint.print = print; } catch (e) {}
})();
