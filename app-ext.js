/* STORM app extensions v1 (Hark): bin label viewer + print list, Jobber/CompanyCam app launch */
(function () { var st = document.createElement('style'); st.id = 'storm-ext-css'; st.textContent = ".fab-dock { top: auto !important; bottom: calc(28px + env(safe-area-inset-bottom)) !important; right: 14px !important; } .label-tile { position: relative; cursor: pointer; padding: 8px 10px !important; } .label-tile img { display: block; height: 54px; width: auto; max-width: 140px; border-radius: 4px; margin-top: 4px; box-shadow: 0 1px 3px rgba(0,0,0,.15); } .label-add { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 999px; border: 0; background: var(--blue); color: #fff; font-size: 18px; font-weight: 800; line-height: 28px; padding: 0; box-shadow: 0 2px 6px rgba(0,0,0,.25); } .label-add.in { background: #16a34a; font-size: 14px; } #lbl-view { position: fixed; inset: 0; z-index: 130; background: rgba(15,23,32,.72); display: none; align-items: center; justify-content: center; padding: 16px; } #lbl-view.open { display: flex; } .lbl-view-box { position: relative; background: #fff; border-radius: 14px; padding: 14px; width: 100%; max-width: 640px; } .lbl-view-box img { display: block; width: 100%; height: auto; border-radius: 6px; } .lbl-view-name { font-size: 16px; font-weight: 700; margin: 10px 2px 0; } .lbl-view-add { display: block; width: 100%; margin-top: 12px; min-height: 52px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; } .lbl-view-add.in { background: #16a34a; } .lbl-view-x { position: absolute; top: -14px; right: -6px; width: 40px; height: 40px; border-radius: 999px; border: 0; background: #0F1720; color: #fff; font-size: 24px; line-height: 1; padding: 0; } .lbl-sec { padding: 8px 16px 4px; border-top: 1px solid #E5E7EB; max-height: 34vh; overflow-y: auto; } .lbl-sec-head { display: flex; align-items: center; justify-content: space-between; } .lbl-sec-head h3 { margin: 6px 0; font-size: 16px; } .lbl-sec-clear { border: 0; background: none; color: #6B7280; font-size: 14px; padding: 6px; } .lbl-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; } .lbl-row img { height: 40px; width: auto; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,.2); } .lbl-row-name { flex: 1; font-size: 14px; font-weight: 600; } .lbl-row-name small { display: block; color: #6B7280; font-weight: 400; } .lbl-row-x { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #F3F4F6; font-size: 20px; padding: 0; } .lbl-print { display: block; width: 100%; margin: 8px 0 6px; min-height: 48px; border: 0; border-radius: 10px; background: var(--dark); color: #fff; font-size: 16px; font-weight: 700; } #lbl-print { display: none; } @media print { body > *:not(#lbl-print) { display: none !important; } #lbl-print { display: block !important; } .lbl-pg-item { padding: 0.5in 0; text-align: center; } .lbl-pg-item img { width: 6.2in; max-width: 100%; height: auto; } .lbl-pg-break { break-after: page; page-break-after: always; } @page { size: letter; margin: 0.3in; } } .drawer-item img + .drawer-item-name { font-size: 0; color: transparent; } .drawer-ccam img { height: 26px; width: auto; max-width: 170px; object-fit: contain; }"; document.head.appendChild(st); })();
var LBL_BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/labels/'; var LBL_KEY = 'stormLabelPrintV1'; function lblList() { try { var a = JSON.parse(localStorage.getItem(LBL_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } } function lblSave(a) { try { localStorage.setItem(LBL_KEY, JSON.stringify(a)); } catch (e) {} } function lblUrl(bin) { return LBL_BASE + encodeURIComponent(bin) + '.jpg?v=1'; } function lblHas(bin) { return lblList().indexOf(bin) >= 0; } function lblToggle(bin, forceAdd) { var a = lblList(), i = a.indexOf(bin); if (i >= 0 && !forceAdd) { a.splice(i, 1); lblSave(a); try { showToast('Label removed from print list'); } catch (e) {} } else if (i < 0) { a.push(bin); lblSave(a); try { showToast('Bin label added to print list'); } catch (e) {} } lblSync(); } function lblSync() { var on = function (b) { return lblHas(b); }; document.querySelectorAll('[data-label-add]').forEach(function (b) { var x = on(b.getAttribute('data-label-add')); b.classList.toggle('in', x); b.innerHTML = x ? '&#10003;' : '+'; b.setAttribute('aria-label', x ? 'In print list' : 'Add label to print list'); }); var vb = document.getElementById('lbl-view-add'); if (vb) { var x2 = on(vb.getAttribute('data-bin')); vb.textContent = x2 ? '\u2713 In print list \u00b7 tap to remove' : '+ Add to print list'; vb.classList.toggle('in', x2); } try { if ($('pick-sheet').classList.contains('open')) renderPickSheet(); } catch (e) {} } function lblTile() { var it = currentDetailBin && findItem(currentDetailBin); var row = document.querySelector('#detail .detail-counts'); if (!it || !row || row.querySelector('.label-tile')) return; var d = document.createElement('div'); d.className = 'detail-count label-tile'; d.setAttribute('data-label-view', it.bin); d.innerHTML = '<span>Bin label</span><img src="' + lblUrl(it.bin) + '" alt="Bin label for ' + esc(it.name) + '"><button class="label-add" type="button" data-label-add="' + esc(it.bin) + '">+</button>'; d.querySelector('img').onerror = function () { d.style.display = 'none'; }; row.appendChild(d); lblSync(); } var _lblOpenDetail = openDetail; openDetail = function () { var r = _lblOpenDetail.apply(this, arguments); try { lblTile(); } catch (e) {} return r; }; function lblView(bin) { var it = findItem(bin); if (!it) return; var v = document.getElementById('lbl-view'); if (!v) { v = document.createElement('div'); v.id = 'lbl-view'; document.body.appendChild(v); } v.innerHTML = '<div class="lbl-view-box"><button class="lbl-view-x" type="button" data-lbl-close aria-label="Close">&times;</button><img src="' + lblUrl(bin) + '" alt=""><div class="lbl-view-name">' + esc(it.name) + '</div><button id="lbl-view-add" class="lbl-view-add" type="button" data-bin="' + esc(bin) + '">+ Add to print list</button></div>'; v.classList.add('open'); lblSync(); } function lblClose() { var v = document.getElementById('lbl-view'); if (v) v.classList.remove('open'); } document.addEventListener('click', function (e) { var t = e.target; var add = t.closest && t.closest('[data-label-add]'); if (add) { e.stopPropagation(); lblToggle(add.getAttribute('data-label-add')); return; } var va = t.closest && t.closest('#lbl-view-add'); if (va) { e.stopPropagation(); lblToggle(va.getAttribute('data-bin')); return; } if (t.closest && (t.closest('[data-lbl-close]') || t.id === 'lbl-view')) { e.stopPropagation(); lblClose(); return; } var tv = t.closest && t.closest('[data-label-view]'); if (tv) { e.stopPropagation(); lblView(tv.getAttribute('data-label-view')); return; } var rm = t.closest && t.closest('[data-lbl-rm]'); if (rm) { e.stopPropagation(); e.preventDefault(); lblToggle(rm.getAttribute('data-lbl-rm')); return; } if (t.closest && t.closest('[data-lbl-clear]')) { e.stopPropagation(); e.preventDefault(); lblSave([]); lblSync(); return; } if (t.closest && t.closest('[data-lbl-print]')) { e.stopPropagation(); e.preventDefault(); lblPrint(); return; } }, false); var _lblRender = renderPickSheet; renderPickSheet = function () { var r = _lblRender.apply(this, arguments); try { var a = lblList(); var el = $('pick-sheet'); if (!a.length || !el) return r; var h = '<div class="lbl-sec"><div class="lbl-sec-head"><h3>Bin labels to print (' + a.length + ')</h3><button type="button" class="lbl-sec-clear" data-lbl-clear>Clear</button></div>'; a.forEach(function (b) { var it = findItem(b); h += '<div class="lbl-row"><img src="' + lblUrl(b) + '" alt=""><div class="lbl-row-name">' + esc(it ? it.name : b) + '<small>' + esc(b) + '</small></div><button type="button" class="lbl-row-x" data-lbl-rm="' + esc(b) + '" aria-label="Remove">&times;</button></div>'; }); h += '<button type="button" class="lbl-print" data-lbl-print>Print ' + a.length + ' label' + (a.length === 1 ? '' : 's') + '</button></div>'; var tmp = document.createElement('div'); tmp.innerHTML = h; var sec = tmp.firstChild; var foot = el.querySelector('.pick-sheet-foot'); if (foot) el.insertBefore(sec, foot); else el.appendChild(sec); var em = el.querySelector('.pick-empty'); if (em) em.style.display = 'none'; } catch (e) {} return r; }; function lblPrint() { var a = lblList(); if (!a.length) return; var p = document.getElementById('lbl-print'); if (!p) { p = document.createElement('div'); p.id = 'lbl-print'; document.body.appendChild(p); } var h = ''; a.forEach(function (b, i) { h += '<div class="lbl-pg-item"><img src="' + lblUrl(b) + '" alt=""></div>' + (i % 2 === 1 && i < a.length - 1 ? '<div class="lbl-pg-break"></div>' : ''); }); p.innerHTML = h; var imgs = p.querySelectorAll('img'), left = imgs.length, done = false; function go() { if (done) return; done = true; try { window.print(); } catch (e) { try { showToast('Printing is blocked here. Use Bin Labels in the menu.', true); } catch (x) {} } } imgs.forEach(function (im) { if (im.complete) { if (--left === 0) setTimeout(go, 50); } else { im.onload = im.onerror = function () { if (--left === 0) setTimeout(go, 50); }; } }); setTimeout(go, 6000); }

function stormOpenApp(kind) { var ua = navigator.userAgent || ''; var isAndroid = /Android/i.test(ua); var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); var A = kind === 'cc' ? { pkg: 'com.agilx.companycam', ios: 'ccam://search', store: 'https://apps.apple.com/us/app/companycam/id960043499', web: 'https://app.companycam.com/' } : { pkg: 'com.getjobber.jobber', ios: 'jobber://', store: 'https://apps.apple.com/us/app/jobber-field-service-software/id1014146758', web: (typeof JOBBER_URL !== 'undefined' ? JOBBER_URL : 'https://secure.getjobber.com/') }; var play = 'https://play.google.com/store/apps/details?id=' + A.pkg; var url = isAndroid ? (kind === 'cc' ? 'intent://search#Intent;scheme=ccam;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end' : 'intent://#Intent;scheme=jobber;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end') : (isIOS ? A.ios : A.web); if (!isIOS) { var w = null; try { w = window.open(url, '_blank'); } catch (e) {} if (!w && isAndroid) { try { window.top.location.href = url; } catch (e) { location.href = url; } } return; } var left = false; var onHide = function () { if (document.hidden) left = true; }; document.addEventListener('visibilitychange', onHide); window.addEventListener('blur', function () { left = true; }, { once: true }); var a = document.createElement('a'); a.href = url; a.target = '_top'; a.rel = 'noopener'; a.style.display = 'none'; document.body.appendChild(a); try { a.click(); } catch (e) { try { window.open(url, '_blank'); } catch (x) {} } setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 500); if (isIOS) { setTimeout(function () { document.removeEventListener('visibilitychange', onHide); if (!left && !document.hidden) { try { window.open(A.store, '_blank'); } catch (e) {} } }, 1800); } } document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-jobber], [data-ccam]'); if (!b) return; e.preventDefault(); e.stopPropagation(); stormOpenApp(b.hasAttribute('data-ccam') ? 'cc' : 'jobber'); }, true);
/* STORM fx v1 (Hark): logo drop intro, detail fade, number fade, category headings */
(function () {
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var css = ''
  + '.storm-logo-anim { position: relative; display: block; width: min(240px, 248px); aspect-ratio: 800 / 206; margin: 0 auto; overflow: visible; pointer-events: none; }'
  + '.storm-logo-anim img { position: absolute; display: block; max-width: none; margin: 0; }'
  + '.sla-drop { left: 0; top: 0; width: 20.625%; height: 100%; transform-origin: 50% 100%; }'
  + '.sla-storm { left: 20.625%; top: 14.563%; width: 79.375%; height: 67.961%; transform-origin: 50% 100%; }'
  + '.sla-sub { left: 20.625%; top: 82.524%; width: 79.375%; height: 17.476%; }'
  + '.sla-ripple { position: absolute; left: 1%; width: 19%; bottom: -3%; height: 9%; border-radius: 50%; border: 1.5px solid rgba(64,190,255,.85); opacity: 0; transform: scale(.3); }'
  + '.sla-splash { position: absolute; bottom: 2%; width: 2.6%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #9fe0ff, #27abea 70%); opacity: 0; }'
  + '.sla-splash.l { left: 6%; } .sla-splash.r { left: 13%; }'
  + '.storm-logo-anim.go .sla-storm { animation: slaStorm 1s both; }'
  + '.storm-logo-anim.go .sla-sub { animation: slaSub .6s .62s ease-out both; }'
  + '.storm-logo-anim.go .sla-drop { animation: slaDrop 1.15s .5s both; }'
  + '.storm-logo-anim.go .sla-ripple { animation: slaRipple .75s 1.02s ease-out both; }'
  + '.storm-logo-anim.go .sla-splash.l { animation: slaSplashL .55s 1.03s ease-out both; }'
  + '.storm-logo-anim.go .sla-splash.r { animation: slaSplashR .55s 1.03s ease-out both; }'
  + '@keyframes slaStorm { 0% { transform: translateY(-260%); opacity: 0; filter: blur(3px); animation-timing-function: cubic-bezier(.5,0,.9,.55); } 40% { opacity: 1; filter: blur(0); } 52% { transform: translateY(0) scale(1,1); animation-timing-function: ease-out; } 60% { transform: translateY(0) scale(1.015,.93); } 72% { transform: translateY(-3%) scale(.995,1.015); animation-timing-function: ease-in-out; } 86%, 100% { transform: none; opacity: 1; } }'
  + '@keyframes slaSub { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }'
  + '@keyframes slaDrop { 0% { transform: translateY(-235%) scale(.8,1.2); opacity: 0; animation-timing-function: cubic-bezier(.55,0,1,.5); } 14% { opacity: 1; } 45% { transform: translateY(0) scale(.88,1.12); animation-timing-function: ease-out; } 53% { transform: translateY(0) scale(1.2,.78); animation-timing-function: ease-in-out; } 63% { transform: translateY(-5%) scale(.92,1.09); } 73% { transform: translateY(0) scale(1.06,.95); } 83% { transform: scale(.98,1.02); } 92% { transform: scale(1.01,.99); } 100% { transform: none; opacity: 1; } }'
  + '@keyframes slaRipple { 0% { opacity: .9; transform: scale(.3); } 100% { opacity: 0; transform: scale(2.1); } }'
  + '@keyframes slaSplashL { 0% { opacity: 0; transform: translate(0,0) scale(.6); } 15% { opacity: 1; } 55% { transform: translate(-260%,-420%) scale(1); } 100% { opacity: 0; transform: translate(-420%,-60%) scale(.5); } }'
  + '@keyframes slaSplashR { 0% { opacity: 0; transform: translate(0,0) scale(.6); } 15% { opacity: 1; } 55% { transform: translate(260%,-480%) scale(.9); } 100% { opacity: 0; transform: translate(430%,-80%) scale(.45); } }'
  + '@media (prefers-reduced-motion: reduce) { .storm-logo-anim.go * { animation: none !important; } .sla-ripple, .sla-splash { display: none; } }'
  /* detail window fade, matching the banner's fade */
  + '#detail.open.fx-in { animation: fxDetailIn .26s ease-out both; }'
  + '#detail.open.fx-out { animation: fxDetailOut .2s ease-in both; pointer-events: none; }'
  + '@keyframes fxDetailIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }'
  + '@keyframes fxDetailOut { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(12px); } }'
  /* number fade on +/- */
  + '.fx-num-up { animation: fxNumUp .26s ease-out; } .fx-num-down { animation: fxNumDown .26s ease-out; }'
  + '@keyframes fxNumUp { 0% { opacity: .15; transform: translateY(5px); } 100% { opacity: 1; transform: none; } }'
  + '@keyframes fxNumDown { 0% { opacity: .15; transform: translateY(-5px); } 100% { opacity: 1; transform: none; } }'
  /* category headings stand out */
  + '.cat-head { align-items: center; margin: 22px 2px 8px; padding: 2px 0 2px 10px; border-left: 4px solid #27ABEA; }'
  + '.cat-name { font-size: 14px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #0B7FC4; }'
  + '.cat-count { font-size: 12px; font-weight: 700; color: #0B7FC4; background: rgba(39,171,234,.12); padding: 2px 8px; border-radius: 999px; letter-spacing: 0; }'
  + '.detail-features h2, .detail-flow h2 { font-size: 13px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #0B7FC4; padding-left: 9px; border-left: 3px solid #27ABEA; }';
  var st = document.createElement('style'); st.id = 'storm-fx-css'; st.textContent = css; document.head.appendChild(st);

  /* 3) logo intro */
  try {
    var old = document.querySelector('header img.logo');
    if (old) {
      var w = document.createElement('div'); w.className = 'storm-logo-anim'; w.setAttribute('role', 'img'); w.setAttribute('aria-label', old.alt || 'Storm Basement Waterproofing');
      w.innerHTML = '<span class="sla-ripple"></span><span class="sla-splash l"></span><span class="sla-splash r"></span>'
        + '<img class="sla-sub" alt="" src="' + A + 'sub.png"><img class="sla-storm" alt="" src="' + A + 'storm.png"><img class="sla-drop" alt="" src="' + A + 'drop.png">';
      var imgs = w.querySelectorAll('img'), left = imgs.length, done = false;
      var swap = function () { if (done) return; done = true; if (!old.parentNode) return; old.parentNode.replaceChild(w, old); void w.offsetWidth; w.classList.add('go'); };
      var fail = function () { done = true; };
      Array.prototype.forEach.call(imgs, function (im) { im.addEventListener('load', function () { if (--left === 0) swap(); }); im.addEventListener('error', fail); });
      setTimeout(function () { if (left > 0) fail(); }, 2500);
    }
  } catch (e) {}

  /* 1) detail fade in/out */
  if (typeof openDetail === 'function' && typeof closeDetail === 'function') {
    var _od = openDetail, _cd = closeDetail, outT = null;
    openDetail = function (bin, isSwipe, enterDir) {
      var d = document.getElementById('detail');
      var was = d && d.classList.contains('open') && !d.classList.contains('fx-out');
      if (outT) { clearTimeout(outT); outT = null; if (d) d.classList.remove('fx-out'); _cd(); was = false; }
      var r = _od.apply(this, arguments);
      if (d && !was) { d.classList.remove('fx-in'); void d.offsetWidth; d.classList.add('fx-in'); }
      return r;
    };
    closeDetail = function () {
      var d = document.getElementById('detail'), self = this, args = arguments;
      if (!d || !d.classList.contains('open') || outT) { if (!outT) return _cd.apply(self, args); return; }
      d.classList.remove('fx-in'); d.classList.add('fx-out');
      outT = setTimeout(function () { outT = null; d.classList.remove('fx-out'); _cd.apply(self, args); }, 190);
    };
  }

  /* 2) number fade on +/- */
  var tick = function (el, up) { if (!el) return; el.classList.remove('fx-num-up', 'fx-num-down'); void el.offsetWidth; el.classList.add(up ? 'fx-num-up' : 'fx-num-down'); };
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.step, .pick-step, [data-detail-step]');
    if (!b) return;
    var box = b.closest('.stepper, .pick-stepper'); if (!box) return;
    var cls = box.classList.contains('pick-stepper') ? '.pick-stepper' : '.stepper';
    var all = Array.prototype.slice.call(document.querySelectorAll(cls)), idx = all.indexOf(box);
    var up = /plus|\+/.test((b.getAttribute('data-detail-step') || '') + (b.getAttribute('aria-label') || '') + b.textContent) && !/minus|decrease/i.test(b.getAttribute('aria-label') || '');
    requestAnimationFrame(function () {
      var bx = document.body.contains(box) ? box : document.querySelectorAll(cls)[idx];
      if (bx) tick(bx.querySelector('.count, .pick-qty'), up);
    });
  });
  var watch = function (id) { var el = document.getElementById(id); if (!el || !window.MutationObserver) return; var last = el.textContent; new MutationObserver(function () { var v = el.textContent; if (v === last) return; var up = parseFloat(String(v).replace(/[^0-9.]/g, '')) >= parseFloat(String(last).replace(/[^0-9.]/g, '')); last = v; tick(el, up); }).observe(el, { childList: true, characterData: true, subtree: true }); };
  watch('cart-fab-count'); watch('cart-fab-total'); watch('need-badge');
})();
/* STORM qr v1 (Hark): bin-label print list as a QR button under the cart */
(function () {
  var css = ''
  + '.fab-dock .lbl-fab { margin-top: 16px; opacity: 0; transform: scale(.6); pointer-events: none; transition: opacity .28s ease, transform .28s cubic-bezier(.3,1.4,.5,1); }'
  + '.fab-dock .lbl-fab.show { opacity: 1; transform: none; pointer-events: auto; }'
  + '.fab-dock .lbl-fab.gone { display: none; }'
  + 'body:has(#lbl-sheet.open) .fab-dock { opacity: 0; pointer-events: none; }'
  + '#pick-sheet .lbl-sec { display: none !important; }'
  + '#lbl-sheet .pick-lines { padding-bottom: 8px; } #lbl-sheet .lbl-sec { margin: 0; border: 0; padding: 0; } #lbl-sheet .lbl-sec-head { display: none; }';
  var st = document.createElement('style'); st.id = 'storm-qr-css'; st.textContent = css; document.head.appendChild(st);
  var ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4M20 17v3"/><path d="M6 6.5h1M17 6.5h1M6 17.5h1" stroke-width="2.4"/></svg>';
  var fab, cnt, sheet, scrim, lastN = -1, hideT = null;
  function build() {
    if (fab) return true;
    var dock = document.getElementById('fab-dock'); if (!dock) return false;
    fab = document.createElement('button'); fab.type = 'button'; fab.className = 'cart-fab lbl-fab gone'; fab.id = 'lbl-fab'; fab.setAttribute('aria-label', 'Bin labels to print');
    fab.innerHTML = ICON + '<span class="cart-fab-count" id="lbl-fab-count">0</span>';
    dock.appendChild(fab); cnt = fab.querySelector('.cart-fab-count');
    scrim = document.createElement('div'); scrim.id = 'lbl-scrim'; scrim.className = 'pick-scrim';
    sheet = document.createElement('div'); sheet.id = 'lbl-sheet'; sheet.className = 'pick-sheet'; sheet.setAttribute('aria-label', 'Bin labels to print');
    document.body.appendChild(scrim); document.body.appendChild(sheet);
    fab.addEventListener('click', function (e) { e.preventDefault(); openSheet(); });
    scrim.addEventListener('click', closeSheet);
    sheet.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-lbl-sheet-close]')) closeSheet(); });
    return true;
  }
  function render() {
    if (!sheet) return; var a = lblList();
    var h = '<div class="pick-sheet-head"><h2>Bin labels to print (' + a.length + ')</h2><button class="pick-sheet-close" type="button" data-lbl-sheet-close aria-label="Close">&times;</button></div><div class="pick-lines"><div class="lbl-sec">';
    if (!a.length) h += '<div class="pick-empty">No labels yet. Tap + on a bin label in item details.</div>';
    a.forEach(function (b) { var it = findItem(b); h += '<div class="lbl-row"><img src="' + lblUrl(b) + '" alt=""><div class="lbl-row-name">' + esc(it ? it.name : b) + '<small>' + esc(b) + '</small></div><button type="button" class="lbl-row-x" data-lbl-rm="' + esc(b) + '" aria-label="Remove">&times;</button></div>'; });
    h += '</div></div>';
    if (a.length) h += '<div class="pick-sheet-foot"><button type="button" class="pick-copy" data-lbl-print>Print ' + a.length + ' label' + (a.length === 1 ? '' : 's') + '</button><button type="button" class="pick-clear" data-lbl-clear>Clear all</button></div>';
    sheet.innerHTML = h;
  }
  function openSheet() { if (!build()) return; render(); scrim.classList.add('open'); sheet.classList.add('open'); }
  function closeSheet() { if (!sheet) return; scrim.classList.remove('open'); sheet.classList.remove('open'); }
  function update() {
    if (!build()) return; var n = lblList().length;
    if (n !== lastN) {
      cnt.textContent = n;
      if (lastN >= 0 && n > 0) { cnt.classList.remove('fx-num-up', 'fx-num-down'); void cnt.offsetWidth; cnt.classList.add(n > lastN ? 'fx-num-up' : 'fx-num-down'); }
      if (n > 0) { clearTimeout(hideT); fab.classList.remove('gone'); void fab.offsetWidth; fab.classList.add('show'); }
      else { fab.classList.remove('show'); hideT = setTimeout(function () { fab.classList.add('gone'); }, 300); }
      lastN = n;
    }
    if (sheet && sheet.classList.contains('open')) { if (n) render(); else closeSheet(); }
  }
  if (typeof lblSync === 'function') { var _ls = lblSync; lblSync = function () { var r = _ls.apply(this, arguments); try { update(); } catch (e) {} return r; }; }
  if (typeof renderPickSheet === 'function') { var _rp = renderPickSheet; renderPickSheet = function () { var r = _rp.apply(this, arguments); try { var el = document.getElementById('pick-sheet'); var sec = el && el.querySelector('.lbl-sec'); if (sec) sec.parentNode.removeChild(sec); var em = el && el.querySelector('.pick-empty'); if (em) em.style.display = ''; } catch (e) {} return r; }; }
  var tries = 0; (function boot() { if (build()) update(); else if (tries++ < 40) setTimeout(boot, 150); })();
})();
