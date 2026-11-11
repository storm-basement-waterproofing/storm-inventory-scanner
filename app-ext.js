/* EDITORS (any Hark chat or AI tool): this file is edited from more than one place. Before every save, download the newest app-ext.js from GitHub main, add your change on top of it, and keep every existing vNNN block. Never save from an older copy. */
/* STORM app extensions v1 (Hark): bin label viewer + print list, Jobber/CompanyCam app launch */
(function () { var st = document.createElement('style'); st.id = 'storm-ext-css'; st.textContent = ".fab-dock { top: auto !important; bottom: calc(46px + env(safe-area-inset-bottom)) !important; right: 14px !important; } .label-tile { position: relative; cursor: pointer; padding: 8px 10px !important; } .label-tile img { display: block; height: 54px; width: auto; max-width: 140px; border-radius: 4px; margin-top: 4px; box-shadow: 0 1px 3px rgba(0,0,0,.15); } .label-add { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 999px; border: 0; background: var(--blue); color: #fff; font-size: 18px; font-weight: 800; line-height: 28px; padding: 0; box-shadow: 0 2px 6px rgba(0,0,0,.25); } .label-add.in { background: #16a34a; font-size: 14px; } #lbl-view { position: fixed; inset: 0; z-index: 130; background: rgba(15,23,32,.72); display: none; align-items: center; justify-content: center; padding: 16px; } #lbl-view.open { display: flex; } .lbl-view-box { position: relative; background: #fff; border-radius: 14px; padding: 14px; width: 100%; max-width: 640px; } .lbl-view-box img { display: block; width: 100%; height: auto; border-radius: 6px; } .lbl-view-name { font-size: 16px; font-weight: 700; margin: 10px 2px 0; } .lbl-view-add { display: block; width: 100%; margin-top: 12px; min-height: 52px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; } .lbl-view-add.in { background: #16a34a; } .lbl-view-x { position: absolute; top: -14px; right: -6px; width: 40px; height: 40px; border-radius: 999px; border: 0; background: #0F1720; color: #fff; font-size: 24px; line-height: 1; padding: 0; } .lbl-sec { padding: 8px 16px 4px; border-top: 1px solid #E5E7EB; max-height: 34vh; overflow-y: auto; } .lbl-sec-head { display: flex; align-items: center; justify-content: space-between; } .lbl-sec-head h3 { margin: 6px 0; font-size: 16px; } .lbl-sec-clear { border: 0; background: none; color: #6B7280; font-size: 14px; padding: 6px; } .lbl-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; } .lbl-row img { height: 40px; width: auto; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,.2); } .lbl-row-name { flex: 1; font-size: 14px; font-weight: 600; } .lbl-row-name small { display: block; color: #6B7280; font-weight: 400; } .lbl-row-x { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #F3F4F6; font-size: 20px; padding: 0; } .lbl-print { display: block; width: 100%; margin: 8px 0 6px; min-height: 48px; border: 0; border-radius: 10px; background: var(--dark); color: #fff; font-size: 16px; font-weight: 700; } #lbl-print { display: none; } @media print { body > *:not(#lbl-print) { display: none !important; } #lbl-print { display: block !important; } .lbl-pg-item { padding: 0.5in 0; text-align: center; } .lbl-pg-item img { width: 6.2in; max-width: 100%; height: auto; } .lbl-pg-break { break-after: page; page-break-after: always; } @page { size: letter; margin: 0.3in; } } .drawer-item img + .drawer-item-name { font-size: 0; color: transparent; } .drawer-ccam img { height: 26px; width: auto; max-width: 170px; object-fit: contain; }"; document.head.appendChild(st); })();
var LBL_BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/labels/'; var LBL_KEY = 'stormLabelPrintV1'; function lblList() { try { var a = JSON.parse(localStorage.getItem(LBL_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } } function lblSave(a) { try { localStorage.setItem(LBL_KEY, JSON.stringify(a)); } catch (e) {} } function lblUrl(bin) { return LBL_BASE + encodeURIComponent(bin) + '.jpg?v=1'; } function lblHas(bin) { return lblList().indexOf(bin) >= 0; } function lblToggle(bin, forceAdd) { var a = lblList(), i = a.indexOf(bin); if (i >= 0 && !forceAdd) { a.splice(i, 1); lblSave(a); try { showToast('Label removed from print list'); } catch (e) {} } else if (i < 0) { a.push(bin); lblSave(a); try { showToast('Bin label added to print list'); } catch (e) {} } lblSync(); } function lblSync() { var on = function (b) { return lblHas(b); }; document.querySelectorAll('[data-label-add]').forEach(function (b) { var x = on(b.getAttribute('data-label-add')); b.classList.toggle('in', x); b.innerHTML = x ? '&#10003;' : '+'; b.setAttribute('aria-label', x ? 'In print list' : 'Add label to print list'); }); var vb = document.getElementById('lbl-view-add'); if (vb) { var x2 = on(vb.getAttribute('data-bin')); vb.textContent = x2 ? '\u2713 In print list \u00b7 tap to remove' : '+ Add to print list'; vb.classList.toggle('in', x2); } try { if ($('pick-sheet').classList.contains('open')) renderPickSheet(); } catch (e) {} } function lblTile() { var it = currentDetailBin && findItem(currentDetailBin); var row = document.querySelector('#detail .detail-counts'); if (!it || !row || row.querySelector('.label-tile')) return; var d = document.createElement('div'); d.className = 'detail-count label-tile'; d.setAttribute('data-label-view', it.bin); d.innerHTML = '<span>Bin label</span><img src="' + lblUrl(it.bin) + '" alt="Bin label for ' + esc(it.name) + '"><button class="label-add" type="button" data-label-add="' + esc(it.bin) + '">+</button>'; d.querySelector('img').onerror = function () { d.style.display = 'none'; }; row.appendChild(d); lblSync(); } var _lblOpenDetail = openDetail; openDetail = function () { var r = _lblOpenDetail.apply(this, arguments); try { lblTile(); } catch (e) {} return r; }; function lblView(bin) { var it = findItem(bin); if (!it) return; var v = document.getElementById('lbl-view'); if (!v) { v = document.createElement('div'); v.id = 'lbl-view'; document.body.appendChild(v); } v.innerHTML = '<div class="lbl-view-box"><button class="lbl-view-x" type="button" data-lbl-close aria-label="Close">&times;</button><img src="' + lblUrl(bin) + '" alt=""><div class="lbl-view-name">' + esc(it.name) + '</div><button id="lbl-view-add" class="lbl-view-add" type="button" data-bin="' + esc(bin) + '">+ Add to print list</button></div>'; v.classList.add('open'); lblSync(); } function lblClose() { var v = document.getElementById('lbl-view'); if (v) v.classList.remove('open'); } document.addEventListener('click', function (e) { var t = e.target; var add = t.closest && t.closest('[data-label-add]'); if (add) { e.stopPropagation(); lblToggle(add.getAttribute('data-label-add')); return; } var va = t.closest && t.closest('#lbl-view-add'); if (va) { e.stopPropagation(); lblToggle(va.getAttribute('data-bin')); return; } if (t.closest && (t.closest('[data-lbl-close]') || t.id === 'lbl-view')) { e.stopPropagation(); lblClose(); return; } var tv = t.closest && t.closest('[data-label-view]'); if (tv) { e.stopPropagation(); lblView(tv.getAttribute('data-label-view')); return; } var rm = t.closest && t.closest('[data-lbl-rm]'); if (rm) { e.stopPropagation(); e.preventDefault(); lblToggle(rm.getAttribute('data-lbl-rm')); return; } if (t.closest && t.closest('[data-lbl-clear]')) { e.stopPropagation(); e.preventDefault(); lblSave([]); lblSync(); return; } if (t.closest && t.closest('[data-lbl-print]')) { e.stopPropagation(); e.preventDefault(); lblPrint(); return; } }, false); var _lblRender = renderPickSheet; renderPickSheet = function () { var r = _lblRender.apply(this, arguments); try { var a = lblList(); var el = $('pick-sheet'); if (!a.length || !el) return r; var h = '<div class="lbl-sec"><div class="lbl-sec-head"><h3>Bin labels to print (' + a.length + ')</h3><button type="button" class="lbl-sec-clear" data-lbl-clear>Clear</button></div>'; a.forEach(function (b) { var it = findItem(b); h += '<div class="lbl-row"><img src="' + lblUrl(b) + '" alt=""><div class="lbl-row-name">' + esc(it ? it.name : b) + '<small>' + esc(b) + '</small></div><button type="button" class="lbl-row-x" data-lbl-rm="' + esc(b) + '" aria-label="Remove">&times;</button></div>'; }); h += '<button type="button" class="lbl-print" data-lbl-print>Print ' + a.length + ' label' + (a.length === 1 ? '' : 's') + '</button></div>'; var tmp = document.createElement('div'); tmp.innerHTML = h; var sec = tmp.firstChild; var foot = el.querySelector('.pick-sheet-foot'); if (foot) el.insertBefore(sec, foot); else el.appendChild(sec); var em = el.querySelector('.pick-empty'); if (em) em.style.display = 'none'; } catch (e) {} return r; }; function lblPrint() { var a = lblList(); if (!a.length) return; var p = document.getElementById('lbl-print'); if (!p) { p = document.createElement('div'); p.id = 'lbl-print'; document.body.appendChild(p); } var h = ''; a.forEach(function (b, i) { h += '<div class="lbl-pg-item"><img src="' + lblUrl(b) + '" alt=""></div>' + (i % 2 === 1 && i < a.length - 1 ? '<div class="lbl-pg-break"></div>' : ''); }); p.innerHTML = h; var imgs = p.querySelectorAll('img'), left = imgs.length, done = false; function go() { if (done) return; done = true; try { window.print(); } catch (e) { try { showToast('Printing is blocked here. Use Bin Labels in the menu.', true); } catch (x) {} } } imgs.forEach(function (im) { if (im.complete) { if (--left === 0) setTimeout(go, 50); } else { im.onload = im.onerror = function () { if (--left === 0) setTimeout(go, 50); }; } }); setTimeout(go, 6000); }

function stormOpenApp(kind) { var ua = navigator.userAgent || ''; var isAndroid = /Android/i.test(ua); var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); var A = kind === 'cc' ? { pkg: 'com.agilx.companycam', ios: 'ccam://search', store: 'https://apps.apple.com/us/app/companycam/id960043499', web: 'https://app.companycam.com/' } : { pkg: 'com.getjobber.jobber', ios: 'jobber://', store: 'https://apps.apple.com/us/app/jobber-field-service-software/id1014146758', web: (typeof JOBBER_URL !== 'undefined' ? JOBBER_URL : 'https://secure.getjobber.com/') }; var play = 'https://play.google.com/store/apps/details?id=' + A.pkg; var url = isAndroid ? (kind === 'cc' ? 'intent://search#Intent;scheme=ccam;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end' : 'intent://#Intent;scheme=jobber;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end') : (isIOS ? A.ios : A.web); if (!isIOS) { var w = null; try { w = window.open(url, '_blank'); } catch (e) {} if (!w && isAndroid) { try { window.top.location.href = url; } catch (e) { location.href = url; } } return; } var left = false; var onHide = function () { if (document.hidden) left = true; }; document.addEventListener('visibilitychange', onHide); window.addEventListener('blur', function () { left = true; }, { once: true }); var a = document.createElement('a'); a.href = url; a.target = '_top'; a.rel = 'noopener'; a.style.display = 'none'; document.body.appendChild(a); try { a.click(); } catch (e) { try { window.open(url, '_blank'); } catch (x) {} } setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 500); /* v126 (Hark, 2026-11-09): no App Store fallback on iPhone/iPad (it fired a pop-up prompt and opened the App Store even when the app opened). */ setTimeout(function () { document.removeEventListener('visibilitychange', onHide); }, 1800); } document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-jobber], [data-ccam]'); if (!b) return; e.preventDefault(); e.stopPropagation(); stormOpenApp(b.hasAttribute('data-ccam') ? 'cc' : 'jobber'); }, true);
/* STORM fx v1 (Hark): logo drop intro, detail fade, number fade, category headings */
(function () {
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var css = ''
  + '.storm-logo-anim { position: relative; display: block; width: min(240px, 248px); aspect-ratio: 800 / 206; margin: 0 auto; overflow: visible; cursor: pointer; -webkit-tap-highlight-color: transparent; }'
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
  + '.sla-p { position: absolute; left: 10.2%; bottom: 3%; width: 1.4%; aspect-ratio: 1; margin-left: -.7%; border-radius: 50%; opacity: 0; transform: translate(0,0) scale(var(--s)); }'
  + '.sla-w { background: radial-gradient(circle at 35% 30%, #d9f4ff, #3fb6f0 60%, #1b8fd6); }'
  + '.sla-m { background: radial-gradient(circle at 40% 35%, #8a6a48, #5a4128 70%); border-radius: 46% 54% 40% 60%; }'
  + '.sla-d { width: 5%; margin-left: -2.5%; background: radial-gradient(circle, rgba(196,170,132,.55), rgba(196,170,132,0) 70%); filter: blur(1.5px); }'
  + '.storm-logo-anim.go .sla-w { animation: slaArc .62s cubic-bezier(.2,.7,.4,1) both; }'
  + '.storm-logo-anim.go .sla-m { animation: slaArcM .7s cubic-bezier(.25,.65,.45,1) both; }'
  + '.storm-logo-anim.go .sla-d { animation: slaDust 1.1s ease-out both; }'
  + '@keyframes slaArc { 0% { opacity: 0; transform: translate(0,0) scale(calc(var(--s)*.5)); } 12% { opacity: 1; } 50% { transform: translate(calc(var(--dx)*.65), var(--dy)) scale(var(--s)); opacity: 1; } 100% { transform: translate(var(--dx), 4px) scale(calc(var(--s)*.4)); opacity: 0; } }'
  + '@keyframes slaArcM { 0% { opacity: 0; transform: translate(0,0) rotate(0) scale(calc(var(--s)*.5)); } 12% { opacity: .95; } 48% { transform: translate(calc(var(--dx)*.6), calc(var(--dy)*.8)) rotate(140deg) scale(var(--s)); } 85% { opacity: .85; } 100% { transform: translate(calc(var(--dx)*.9), 3px) rotate(260deg) scale(calc(var(--s)*.8)); opacity: 0; } }'
  + '@keyframes slaDust { 0% { opacity: 0; transform: translate(0,0) scale(.4); } 20% { opacity: .9; } 100% { opacity: 0; transform: translate(calc(var(--dx)*.5), calc(var(--dy)*.6)) scale(3.2); } }'
  + '.sla-crown { position: absolute; left: 1.5%; width: 17.5%; bottom: 0; height: 16%; opacity: 0; transform-origin: 50% 100%; background: radial-gradient(ellipse at 50% 100%, rgba(80,195,250,0) 38%, rgba(80,195,250,.75) 46%, rgba(170,230,255,.5) 52%, rgba(80,195,250,0) 62%); }'
  + '.storm-logo-anim.go .sla-crown { animation: slaCrown .5s 1.0s ease-out both; }'
  + '@keyframes slaCrown { 0% { opacity: 0; transform: scale(.4,.2); } 25% { opacity: 1; } 100% { opacity: 0; transform: scale(1.7,1.4); } }'
  + '.sla-dust { position: absolute; left: -6%; width: 33%; bottom: -10%; height: 30%; border-radius: 50%; opacity: 0; background: radial-gradient(ellipse, rgba(176,150,112,.42), rgba(176,150,112,0) 68%); filter: blur(4px); }'
  + '.sla-dust.b { left: -2%; width: 25%; bottom: -4%; background: radial-gradient(ellipse, rgba(120,95,66,.4), rgba(120,95,66,0) 66%); }'
  + '.storm-logo-anim.go .sla-dust { animation: slaPuff 1.3s 1.0s ease-out both; } .storm-logo-anim.go .sla-dust.b { animation-duration: 1s; animation-delay: 1.03s; }'
  + '@keyframes slaPuff { 0% { opacity: 0; transform: scale(.3,.2); } 22% { opacity: 1; } 100% { opacity: 0; transform: translateY(-18%) scale(1.5,1.2); } }'
  + '.storm-logo-anim.go .sla-ripple { animation-duration: .9s; }'
  + 'header { overflow: hidden; } header > *:not(.sla-wave) { position: relative; z-index: 1; } header > .scan-btn { position: absolute; }'
  + '.sla-wave { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }'
  + '.sla-wave i { position: absolute; left: var(--x); top: var(--y); width: var(--r); height: calc(var(--r) * .16); margin-left: calc(var(--r) / -2); margin-top: calc(var(--r) * -.08); border-radius: 50%; border: 0; box-shadow: none; background: radial-gradient(ellipse closest-side, rgba(90,190,255,0) 62%, rgba(110,200,255,.28) 78%, rgba(160,220,255,.12) 88%, rgba(90,190,255,0) 100%); opacity: 0; transform: scale(.05); }'
  + '.sla-wave b { position: absolute; left: var(--x); top: var(--y); width: calc(var(--r) * .5); height: calc(var(--r) * .06); margin-left: calc(var(--r) / -4); margin-top: calc(var(--r) * -.03); border-radius: 50%; background: radial-gradient(ellipse, rgba(70,185,250,.35), rgba(70,185,250,0) 70%); opacity: 0; transform: scale(.05); }'
  + '.sla-wave.go i { animation: slaWave 1.5s cubic-bezier(.15,.6,.35,1) forwards; } .sla-wave.go i:nth-child(2) { animation-delay: .16s; } .sla-wave.go i:nth-child(3) { animation-delay: .34s; }'
  + '.sla-wave.go b { animation: slaGlow 1.1s ease-out forwards; }'
  + '@keyframes slaWave { 0% { opacity: 0; transform: scale(.05); } 12% { opacity: .9; } 55% { opacity: .45; } 100% { opacity: 0; transform: scale(1); } }'
  + '@keyframes slaGlow { 0% { opacity: 0; transform: scale(.05); } 15% { opacity: 1; } 100% { opacity: 0; transform: scale(1.6); } }'
  + '.sla-wave img { position: absolute; left: var(--x); top: var(--y); width: var(--r); height: calc(var(--r) * .25); margin-left: calc(var(--r) / -2); margin-top: calc(var(--r) * -.125); max-width: none; mix-blend-mode: screen; opacity: 0; transform: scale(.08, .05); -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%); mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%); }'
  + '.sla-wave.go img { animation: slaPool 1.9s cubic-bezier(.12,.7,.3,1) forwards; }'
  + '@keyframes slaPool { 0% { opacity: 0; transform: scale(.08, .05); } 10% { opacity: .95; } 45% { opacity: .8; } 100% { opacity: 0; transform: scale(1, 1); } }'
  + '.sla-ripple { display: none !important; }'
  + '@media (prefers-reduced-motion: reduce) { .storm-logo-anim.go * { animation: none !important; } .sla-ripple, .sla-splash, .sla-p, .sla-crown, .sla-dust, .sla-wave { display: none; } }'
  /* detail window fade, matching the banner's fade */
  + '#detail.open.fx-in { animation: fxDetailIn .26s ease-out both; }'
  + '#detail.open.fx-out { animation: fxDetailOut .26s ease-in both; pointer-events: none; }' /* v154: exact reverse of the way in */
  + '@keyframes fxDetailIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }'
  + '@keyframes fxDetailOut { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(12px); } }'
  /* number fade on +/- */
  + '.fx-num-up { animation: fxNumUp .26s ease-out; } .fx-num-down { animation: fxNumDown .26s ease-out; }'
  + '@keyframes fxNumUp { 0% { opacity: .15; transform: translateY(5px); } 100% { opacity: 1; transform: none; } }'
  + '@keyframes fxNumDown { 0% { opacity: .15; transform: translateY(-5px); } 100% { opacity: 1; transform: none; } }'
  /* category headings stand out */
  + '.cat-head { position: relative; align-items: center; margin: 22px -12px 8px; padding: 9px 12px 9px 28px; border-left: 0; background: linear-gradient(90deg, #000 0%, #000 55%, rgba(0,0,0,.6) 75%, rgba(0,0,0,0) 96%); }'
  + '.cat-head::before { content: ""; position: absolute; left: 12px; top: 8px; bottom: 8px; width: 4px; border-radius: 2px; background: #fff; }'
  + '.cat-name { font-size: 14px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #fff; }'
  + '.cat-count { font-size: 12px; font-weight: 700; color: #fff; background: rgba(255,255,255,.18); padding: 2px 8px; border-radius: 999px; letter-spacing: 0; }'
  + '.detail-features h2, .detail-flow h2 { font-size: 13px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #0B7FC4; padding-left: 9px; border-left: 3px solid #27ABEA; }';
  var st = document.createElement('style'); st.id = 'storm-fx-css'; st.textContent = css; document.head.appendChild(st);

  /* 3) logo intro: backlit slow flash on first landing; minimal white glow after */
  try {
    var old = document.querySelector('header img.logo');
    if (old) {
      var lc = ''
        + '.storm-logo-lit { position: relative; display: block; width: min(240px, 248px); aspect-ratio: 800 / 206; margin: 0 auto; cursor: pointer; -webkit-tap-highlight-color: transparent; filter: drop-shadow(0 0 .6px rgba(255,255,255,.55)) drop-shadow(0 0 3px rgba(255,255,255,.14)); }'
        + '.storm-logo-lit img { position: absolute; display: block; max-width: none; margin: 0; }'
        + '.storm-logo-lit .sla-drop { left: 0; top: 0; width: 20.625%; height: 100%; } .storm-logo-lit .sla-storm { left: 20.625%; top: 14.563%; width: 79.375%; height: 67.961%; } .storm-logo-lit .sla-sub { left: 20.625%; top: 82.524%; width: 79.375%; height: 17.476%; }'
        + '.sll-back { position: absolute; left: 50%; top: 50%; width: 150%; height: 300%; margin: -150% 0 0 -75%; margin-top: 0; transform: translate(0,-50%) scale(.6); border-radius: 50%; background: radial-gradient(ellipse at 50% 50%, rgba(255,255,255,.95) 0%, rgba(225,242,255,.55) 22%, rgba(160,210,255,.18) 45%, rgba(255,255,255,0) 68%); opacity: 0; pointer-events: none; z-index: -1; }'
        + '.storm-logo-lit.flash { animation: sllLogo 5.2s ease-in-out both; } .sll-back { display: none !important; }'
        + '@keyframes sllLogo { 0% { filter: brightness(1) drop-shadow(0 0 0 rgba(255,255,255,0)); } 40% { filter: brightness(1) drop-shadow(0 0 1px rgba(255,255,255,.5)) drop-shadow(0 0 3px rgba(90,190,255,.35)); } 60% { filter: brightness(1.35) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 5px rgba(200,235,255,.9)) drop-shadow(0 0 14px rgba(70,180,255,.55)); } 100% { filter: brightness(1) drop-shadow(0 0 .6px rgba(255,255,255,.55)) drop-shadow(0 0 3px rgba(255,255,255,.14)); } }'
  + '.sll-trace { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; z-index: 2; opacity: 0; filter: drop-shadow(0 0 1.5px rgba(90,195,255,.95)) drop-shadow(0 0 5px rgba(60,170,255,.55)); }'
  + '.sll-trace path { fill: none; stroke: #effaff; stroke-width: 1.7; stroke-linejoin: round; stroke-linecap: round; vector-effect: non-scaling-stroke; stroke-dasharray: 1; stroke-dashoffset: 1; }'
  + '.storm-logo-lit.flash .sll-trace { animation: sllTraceVis 5.2s ease both; } .storm-logo-lit.flash .sll-trace path { animation: sllDraw 1.6s cubic-bezier(.45,.05,.25,1) var(--d) both; }'
  + '.storm-logo-lit.flash img { animation: sllFill 5.2s ease-in-out both; }'
  + '@keyframes sllDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }'
  + '@keyframes sllTraceVis { 0% { opacity: 1; } 62% { opacity: 1; } 100% { opacity: 0; } }'
  + '@keyframes sllFill { 0% { opacity: 0; } 36% { opacity: 0; } 54% { opacity: 1; } 100% { opacity: 1; } }'
        + '@keyframes sllBack { 0% { opacity: 0; transform: translate(0,-50%) scale(.5); } 20% { opacity: .15; } 50% { opacity: 1; transform: translate(0,-50%) scale(1.05); } 100% { opacity: 0; transform: translate(0,-50%) scale(1.15); } }'
        + '#sll-shade { position: fixed; inset: 0; z-index: 60; pointer-events: none; opacity: 0; background: radial-gradient(ellipse 120% 85% at 50% 0%, rgba(0,0,0,0) 18%, rgba(0,0,0,.16) 55%, rgba(0,0,0,.30) 100%); }'
        + '#sll-shade, #sll-shade.flash { display: none !important; animation: none !important; }'
        + '@keyframes sllShade { 0% { opacity: 0; } 35% { opacity: .25; } 60% { opacity: 1; } 100% { opacity: 0; } }'
        + '@media (prefers-reduced-motion: reduce) { .storm-logo-lit.flash, .storm-logo-lit.flash .sll-back, .storm-logo-lit.flash img, .storm-logo-lit.flash .sll-trace, .storm-logo-lit.flash .sll-trace path, #sll-shade.flash { animation: none !important; } .sll-trace { display: none; } }';
      var st2 = document.createElement('style'); st2.textContent = lc; document.head.appendChild(st2);
      var w = document.createElement('div'); w.className = 'storm-logo-lit'; w.setAttribute('role', 'img'); w.setAttribute('aria-label', old.alt || 'Storm Basement Waterproofing');
      w.innerHTML = '<svg class="sll-trace" viewBox="0 0 800 206" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" style="--d:0.00s" d="M73.5 2.8 L72.8 2.8 L72.2 4.5 L71.5 5.5 L71.2 7.0 L70.5 8.0 L70.2 9.2 L65.5 18.8 L64.8 19.5 L63.2 22.5 L62.5 23.2 L62.2 24.0 L61.5 24.8 L59.8 27.8 L57.5 30.5 L57.2 31.2 L55.5 33.2 L54.5 35.0 L52.2 37.5 L51.5 38.8 L50.5 39.5 L50.2 40.2 L48.8 42.2 L47.2 43.8 L47.2 44.0 L46.5 44.5 L45.2 46.2 L44.5 46.8 L43.2 48.8 L39.5 52.8 L38.5 54.2 L37.0 55.8 L36.2 57.0 L35.5 57.5 L34.5 59.0 L32.8 60.8 L31.2 63.0 L30.5 63.5 L29.5 65.0 L27.5 67.0 L27.0 68.0 L23.5 72.2 L21.2 75.8 L20.2 76.8 L19.0 78.8 L17.5 80.5 L16.0 83.2 L14.8 84.8 L14.2 86.0 L12.5 88.5 L12.5 89.0 L11.8 90.0 L11.0 91.8 L10.5 92.2 L9.2 94.8 L9.2 95.2 L8.2 96.8 L7.5 99.2 L5.8 102.8 L5.2 104.8 L4.5 106.2 L4.2 107.8 L3.8 108.5 L3.2 111.2 L2.5 112.8 L2.2 115.8 L2.0 116.0 L2.0 116.8 L1.5 118.0 L1.5 119.2 L1.0 120.5 L0.8 123.2 L0.5 123.5 L0.5 124.2 L0.0 124.5 L0.0 140.8 L0.8 141.8 L1.0 144.5 L1.2 144.8 L1.5 147.2 L1.8 147.5 L2.0 149.2 L2.2 149.5 L2.5 152.2 L3.2 153.8 L3.5 155.2 L4.2 156.8 L4.2 157.2 L4.8 158.2 L4.8 159.0 L5.2 159.8 L5.5 161.0 L6.0 161.8 L6.0 162.2 L6.5 162.8 L6.5 163.2 L7.0 164.2 L7.5 164.8 L7.5 165.2 L8.2 166.5 L8.2 167.0 L8.8 168.0 L9.5 168.8 L9.5 169.2 L10.0 169.8 L10.5 171.0 L11.2 171.8 L12.5 174.0 L15.5 178.0 L17.0 179.5 L17.0 179.8 L19.2 182.0 L19.2 182.2 L22.5 185.2 L23.0 186.0 L23.2 186.0 L24.8 187.5 L26.0 188.2 L28.2 190.2 L30.5 191.8 L31.0 191.8 L34.0 194.0 L35.0 194.2 L35.8 195.0 L38.8 196.5 L39.2 196.5 L40.8 197.5 L41.2 197.5 L46.0 199.8 L48.0 200.2 L48.5 200.8 L51.2 201.2 L54.0 202.2 L55.2 202.2 L56.0 202.8 L57.5 203.0 L57.8 203.2 L61.0 203.5 L61.2 203.8 L62.2 203.8 L62.5 204.0 L63.5 204.0 L63.8 204.2 L68.5 204.5 L68.8 204.8 L71.2 204.8 L71.5 205.0 L73.2 205.0 L73.5 204.8 L77.0 204.8 L77.2 204.5 L79.8 204.5 L80.0 204.2 L83.5 204.0 L83.8 203.8 L84.8 203.8 L85.0 203.5 L88.8 203.2 L90.2 202.5 L93.5 202.0 L93.8 201.8 L95.2 201.5 L95.5 201.2 L97.5 200.8 L98.2 200.2 L100.2 199.8 L104.5 197.8 L105.8 197.5 L107.8 196.2 L108.2 196.2 L109.5 195.2 L110.0 195.2 L110.5 194.8 L114.0 193.0 L114.5 192.5 L116.8 191.2 L119.0 189.2 L120.0 188.8 L121.8 187.0 L123.2 186.0 L123.2 185.8 L124.0 185.2 L124.8 184.2 L126.2 183.2 L126.2 183.0 L127.5 181.8 L127.5 181.5 L128.0 181.2 L129.0 179.8 L130.0 179.0 L131.2 177.5 L131.5 176.8 L133.0 175.0 L135.5 171.0 L136.2 170.2 L136.2 169.8 L136.8 169.2 L137.5 167.5 L138.0 167.0 L138.2 166.0 L139.2 164.5 L139.2 164.0 L140.2 162.2 L140.2 161.8 L141.2 160.2 L141.5 158.5 L142.2 157.0 L142.5 155.0 L143.0 154.2 L143.0 153.8 L143.5 152.8 L143.5 152.0 L143.8 151.8 L143.8 151.0 L144.2 149.8 L144.2 148.8 L144.5 148.5 L144.5 147.5 L144.8 147.2 L144.8 145.8 L145.0 145.5 L145.2 142.5 L145.5 142.2 L145.5 140.0 L145.8 139.8 L145.8 125.5 L145.5 125.2 L145.5 122.8 L145.2 122.5 L145.2 120.5 L144.8 119.2 L144.5 116.2 L144.2 116.0 L144.2 115.2 L143.8 114.0 L143.8 112.8 L143.5 112.5 L143.0 110.5 L142.5 109.8 L142.2 107.5 L141.5 106.2 L141.2 104.5 L140.2 102.8 L140.2 102.0 L139.5 100.8 L139.2 99.5 L138.0 97.2 L137.8 96.2 L137.0 95.2 L137.0 94.8 L135.8 92.2 L135.2 91.8 L133.2 87.8 L132.5 87.0 L132.0 85.8 L131.5 85.2 L131.5 84.8 L129.0 81.2 L128.8 80.5 L127.2 78.8 L126.5 77.2 L125.2 76.0 L125.2 75.5 L124.8 74.8 L123.2 73.2 L123.0 72.5 L122.0 71.5 L120.8 69.5 L119.2 68.0 L118.5 66.8 L117.5 65.8 L117.0 64.8 L115.2 63.0 L115.2 62.8 L114.5 62.2 L114.2 61.5 L112.2 59.5 L111.8 58.5 L109.5 56.2 L109.2 55.5 L109.0 55.5 L108.2 54.5 L107.2 53.8 L104.2 49.8 L103.5 49.2 L103.5 49.0 L102.2 47.8 L100.0 44.8 L98.2 43.0 L98.2 42.8 L96.2 40.5 L95.8 39.5 L95.2 39.2 L95.2 39.0 L92.2 35.5 L90.2 32.5 L87.5 29.2 L86.8 27.5 L85.5 26.2 L85.2 25.5 L84.2 24.2 L83.0 22.0 L82.2 21.2 L82.0 20.2 L80.5 18.2 L79.8 16.5 L79.2 16.0 L78.2 14.0 L78.2 13.5 L77.2 12.0 L77.2 11.5 L76.5 10.2 L76.5 9.8 L76.0 9.0 L76.0 8.5 L74.5 5.5 L74.5 4.8Z"/><path pathLength="1" style="--d:0.48s" d="M276.0 52.5 L275.0 52.2 L270.8 50.0 L268.8 49.5 L268.0 49.0 L267.5 49.0 L266.5 48.5 L265.8 48.5 L264.0 47.5 L263.5 47.5 L263.2 47.2 L261.8 47.2 L260.2 46.5 L258.0 46.2 L255.5 45.2 L253.8 45.2 L253.5 45.0 L252.5 45.0 L252.2 44.8 L250.0 44.5 L249.8 44.2 L246.2 44.2 L246.0 44.0 L244.2 44.0 L244.0 43.8 L238.2 43.5 L238.0 43.2 L229.8 43.2 L229.5 43.5 L226.0 43.5 L225.8 43.8 L223.5 43.8 L223.2 44.0 L221.5 44.0 L221.2 44.2 L218.5 44.2 L218.2 44.5 L217.5 44.5 L216.2 45.0 L215.0 45.0 L214.8 45.2 L212.5 45.5 L211.2 46.2 L209.2 46.5 L209.0 46.8 L208.5 46.8 L208.0 47.2 L206.0 47.5 L204.5 48.5 L204.0 48.5 L202.2 49.5 L201.8 49.5 L200.0 50.5 L199.5 50.5 L197.2 52.2 L196.5 52.2 L194.2 54.2 L193.5 54.5 L192.5 55.5 L192.2 55.5 L188.5 59.2 L188.5 59.5 L187.2 60.5 L187.2 61.0 L184.5 64.5 L184.5 65.0 L183.5 66.8 L183.5 67.2 L182.5 68.5 L182.2 70.0 L181.8 70.8 L181.8 71.2 L181.2 72.2 L181.2 73.8 L180.2 76.5 L180.2 79.0 L180.0 79.2 L180.0 84.8 L180.2 85.0 L180.2 87.5 L180.5 87.8 L180.8 89.8 L181.2 90.8 L181.5 93.0 L182.2 94.2 L182.8 96.0 L183.5 96.8 L183.5 97.2 L184.5 98.8 L184.5 99.2 L185.5 100.2 L186.0 101.2 L187.0 102.0 L187.2 102.8 L190.8 106.0 L191.8 106.5 L192.5 107.2 L193.2 107.5 L195.5 109.2 L196.5 109.5 L197.5 110.2 L200.5 111.8 L201.0 111.8 L201.8 112.2 L205.0 113.2 L206.2 114.0 L206.8 114.0 L207.0 114.2 L208.2 114.2 L209.5 115.0 L212.5 115.5 L214.0 116.2 L217.0 116.5 L217.2 116.8 L219.8 117.2 L220.0 117.5 L221.5 117.5 L222.5 118.0 L223.2 118.0 L224.5 118.5 L225.8 118.5 L226.0 118.8 L227.8 119.0 L229.8 119.8 L231.0 119.8 L231.2 120.0 L232.0 120.0 L233.2 120.5 L234.2 120.5 L234.5 120.8 L236.2 121.0 L237.5 121.8 L239.2 122.2 L240.5 123.2 L241.5 123.5 L243.5 125.8 L244.0 128.2 L243.8 128.5 L243.8 129.2 L243.2 130.5 L241.5 132.2 L240.2 132.5 L239.2 133.2 L238.8 133.2 L238.5 133.5 L237.0 133.5 L236.8 133.8 L233.8 134.0 L233.5 134.2 L229.5 134.2 L229.2 134.5 L227.2 134.5 L227.0 134.2 L223.5 134.2 L223.2 134.0 L221.5 134.0 L221.2 133.8 L220.2 133.8 L220.0 133.5 L217.5 133.5 L217.2 133.2 L216.2 133.2 L214.2 132.5 L212.8 132.5 L212.5 132.2 L211.5 132.2 L209.8 131.5 L207.8 131.2 L206.2 130.5 L204.8 130.2 L203.5 129.5 L201.0 129.0 L198.2 127.5 L197.8 127.5 L197.2 127.0 L195.5 126.5 L194.0 125.5 L193.0 125.2 L191.8 124.2 L190.8 124.2 L190.2 124.8 L190.2 125.2 L189.2 126.8 L189.0 128.0 L188.2 129.0 L188.0 130.0 L187.2 131.2 L186.8 133.2 L186.2 133.8 L186.2 134.2 L185.8 134.8 L185.8 135.2 L184.8 136.8 L184.8 137.2 L184.5 137.5 L184.2 138.8 L183.5 140.0 L183.5 140.5 L182.5 141.8 L182.5 142.2 L181.5 144.2 L181.2 145.5 L180.5 146.5 L180.0 148.2 L179.2 149.2 L179.2 149.8 L178.8 150.8 L178.8 152.0 L179.5 152.8 L180.2 153.0 L180.8 153.5 L182.0 153.8 L185.5 155.8 L186.8 156.0 L189.5 157.2 L191.0 157.5 L192.0 158.2 L194.0 158.5 L195.5 159.2 L197.5 159.5 L199.0 160.2 L201.2 160.5 L203.2 161.2 L208.2 161.8 L208.5 162.0 L209.5 162.0 L210.8 162.5 L214.8 162.8 L215.0 163.0 L216.5 163.0 L216.8 163.2 L220.0 163.2 L220.2 163.5 L223.2 163.5 L223.5 163.8 L232.2 163.8 L232.5 163.5 L236.2 163.5 L236.5 163.2 L238.5 163.2 L238.8 163.0 L240.2 163.0 L240.5 162.8 L242.8 162.8 L243.0 162.5 L244.0 162.5 L244.2 162.2 L245.0 162.2 L246.2 161.8 L247.2 161.8 L247.5 161.5 L249.2 161.5 L251.8 160.5 L253.5 160.2 L254.5 159.5 L256.2 159.2 L256.8 158.8 L258.8 158.2 L259.8 157.5 L262.8 156.0 L263.2 156.0 L264.0 155.2 L267.0 153.5 L267.8 152.8 L268.8 152.2 L270.5 150.5 L270.8 150.5 L274.0 147.2 L274.5 146.2 L275.8 145.0 L276.5 143.5 L277.2 142.8 L277.8 141.5 L278.5 140.5 L278.5 140.0 L279.2 139.0 L279.5 137.8 L280.5 135.8 L280.5 135.0 L280.8 134.8 L280.8 134.0 L281.0 133.8 L281.0 133.0 L281.2 132.8 L281.2 132.0 L281.8 130.8 L281.8 129.5 L282.0 129.2 L282.0 120.2 L281.8 120.0 L281.8 118.8 L281.2 117.5 L281.2 116.5 L280.8 115.5 L280.5 114.0 L279.8 112.8 L279.2 110.8 L276.0 105.8 L275.5 105.5 L275.2 105.0 L272.5 102.2 L272.2 102.2 L271.0 101.0 L268.2 99.0 L267.8 99.0 L265.8 97.5 L265.2 97.5 L263.2 96.2 L262.5 96.2 L258.5 94.2 L257.0 94.0 L256.8 93.8 L256.2 93.8 L254.5 93.0 L253.8 93.0 L252.8 92.5 L252.0 92.5 L250.5 91.8 L248.0 91.5 L247.8 91.2 L246.0 91.0 L245.0 90.5 L243.2 90.5 L240.8 89.5 L237.8 89.2 L237.5 89.0 L236.8 89.0 L236.0 88.5 L235.0 88.5 L234.8 88.2 L232.8 88.2 L230.0 87.2 L227.5 87.0 L226.8 86.5 L225.2 86.2 L225.0 86.0 L223.8 85.8 L223.0 85.2 L222.5 85.2 L220.8 84.2 L218.5 81.8 L218.5 81.2 L218.2 81.0 L218.2 79.5 L218.5 79.2 L218.5 78.0 L219.2 76.8 L220.8 75.2 L222.5 74.2 L223.0 74.2 L224.5 73.5 L225.5 73.5 L225.8 73.2 L227.5 73.2 L227.8 73.0 L228.8 73.0 L229.0 72.8 L233.5 72.5 L233.8 72.8 L237.5 72.8 L237.8 73.0 L239.2 73.0 L239.5 73.2 L244.0 73.5 L246.0 74.2 L248.8 74.5 L250.8 75.5 L251.8 75.5 L252.0 75.8 L253.2 76.0 L253.8 76.5 L256.0 76.8 L256.5 77.2 L257.0 77.2 L258.8 78.2 L259.2 78.2 L260.5 79.0 L262.2 79.5 L264.5 80.8 L265.5 80.8 L266.0 80.2 L266.0 79.8 L267.2 77.0 L267.2 76.5 L268.2 75.0 L268.5 73.8 L269.5 71.8 L269.5 71.0 L270.2 70.0 L270.5 69.0 L271.5 67.2 L271.8 65.5 L272.8 64.0 L273.0 62.8 L274.0 61.0 L274.0 60.5 L274.5 59.8 L275.2 57.2 L276.2 55.8 L276.2 55.2 L276.8 54.2 L276.8 53.5Z"/><path pathLength="1" style="--d:0.78s" d="M288.5 46.0 L287.8 47.0 L287.8 74.8 L288.5 75.8 L320.8 75.8 L321.8 76.8 L321.8 160.2 L322.2 161.0 L323.5 161.0 L323.8 161.2 L327.0 161.2 L327.2 161.0 L358.5 161.0 L358.8 161.2 L359.2 161.2 L359.8 161.0 L360.2 160.2 L360.2 76.8 L361.2 75.8 L393.5 75.8 L394.2 75.0 L394.2 47.0 L393.5 46.0Z"/><path pathLength="1" style="--d:1.08s" d="M449.2 44.2 L449.0 44.5 L448.0 44.5 L447.0 45.0 L443.5 45.5 L442.2 46.2 L440.2 46.5 L439.0 47.2 L437.8 47.2 L437.5 47.5 L437.0 47.5 L436.0 48.2 L434.8 48.5 L433.0 49.5 L432.5 49.5 L430.2 50.8 L429.8 50.8 L428.5 51.8 L426.5 52.5 L425.8 53.2 L423.5 54.5 L422.8 55.2 L422.0 55.5 L421.0 56.5 L419.0 57.8 L417.0 59.8 L416.8 59.8 L411.8 64.8 L411.0 66.0 L410.5 66.2 L410.2 67.0 L407.8 70.0 L407.5 70.8 L406.5 72.0 L406.0 73.2 L405.0 74.5 L404.2 76.0 L404.2 76.5 L403.8 77.0 L403.2 78.0 L403.2 78.5 L402.2 80.0 L402.2 80.8 L401.2 82.5 L401.0 84.5 L400.0 86.5 L400.0 87.5 L399.5 88.5 L399.2 90.5 L399.0 90.8 L399.0 92.2 L398.8 92.5 L398.5 95.5 L398.2 95.8 L398.2 97.8 L398.0 98.0 L398.0 100.5 L397.8 100.8 L397.8 106.0 L398.0 106.2 L398.0 109.2 L398.2 109.5 L398.2 111.0 L398.5 111.2 L398.5 113.0 L398.8 113.2 L398.8 114.5 L399.0 114.8 L399.0 116.2 L399.2 116.5 L400.0 120.2 L400.2 120.5 L400.5 121.8 L401.0 122.5 L401.2 124.2 L402.2 126.2 L402.5 127.5 L403.2 128.5 L404.8 132.0 L405.2 132.5 L407.2 136.2 L411.8 142.2 L412.0 142.2 L412.5 143.0 L418.8 149.0 L419.8 149.5 L421.8 151.2 L422.5 151.5 L424.5 153.2 L425.0 153.2 L426.0 153.8 L426.8 154.5 L428.5 155.2 L430.0 156.2 L431.0 156.5 L431.5 157.0 L432.0 157.0 L433.5 157.8 L434.0 158.2 L435.5 158.5 L436.8 159.2 L438.2 159.5 L439.5 160.2 L442.0 160.8 L443.5 161.5 L445.5 161.5 L445.8 161.8 L447.5 162.0 L448.5 162.5 L449.8 162.5 L450.0 162.8 L451.8 162.8 L452.0 163.0 L455.5 163.2 L455.8 163.5 L458.8 163.5 L459.0 163.8 L467.0 163.8 L467.2 163.5 L469.5 163.5 L469.8 163.2 L472.2 163.2 L472.5 163.0 L473.8 163.0 L474.0 162.8 L477.2 162.5 L479.2 161.8 L482.0 161.5 L484.5 160.5 L485.5 160.5 L487.5 159.5 L489.0 159.2 L490.2 158.5 L491.8 158.2 L492.2 157.8 L493.2 157.2 L493.8 157.2 L494.8 156.5 L495.2 156.5 L497.2 155.5 L499.8 153.8 L500.8 153.5 L501.5 152.8 L502.2 152.5 L503.2 151.5 L505.5 150.2 L506.2 149.2 L507.2 148.8 L508.8 147.2 L509.0 147.2 L509.2 146.8 L513.2 143.0 L514.2 141.5 L515.0 141.0 L515.5 140.0 L518.0 137.0 L519.5 134.2 L520.0 133.8 L520.5 132.5 L521.0 132.0 L522.0 130.0 L522.0 129.5 L523.2 127.5 L523.5 126.2 L524.2 125.2 L524.2 124.8 L524.5 124.5 L524.5 123.5 L525.2 122.0 L525.5 120.2 L526.5 117.5 L526.8 115.0 L527.0 114.8 L527.2 112.2 L527.5 112.0 L527.5 109.5 L527.8 109.2 L527.8 98.0 L527.5 97.8 L527.5 94.8 L527.2 94.5 L527.2 93.5 L527.0 93.2 L527.0 92.2 L526.8 92.0 L526.8 90.5 L526.5 90.2 L526.2 88.5 L525.8 87.8 L525.5 85.5 L524.8 84.2 L524.2 81.8 L523.5 80.8 L523.2 79.5 L522.5 78.5 L522.2 77.5 L520.8 74.5 L519.8 73.2 L519.8 72.8 L519.2 72.2 L519.0 71.5 L518.0 70.0 L517.0 69.0 L515.5 66.5 L514.5 65.8 L513.8 64.5 L510.2 61.0 L510.2 60.8 L509.0 60.0 L507.0 58.0 L504.8 56.5 L503.8 55.5 L503.0 55.2 L502.0 54.2 L501.5 54.2 L499.2 52.5 L498.2 52.2 L493.2 49.5 L492.8 49.5 L491.0 48.5 L489.8 48.2 L488.8 47.5 L487.8 47.5 L486.2 46.8 L484.5 46.5 L481.2 45.2 L480.0 45.2 L479.8 45.0 L478.8 45.0 L478.5 44.8 L476.5 44.5 L476.2 44.2 L473.5 44.2 L473.2 44.0 L471.8 44.0 L471.5 43.8 L466.5 43.5 L466.2 43.2 L459.5 43.2 L459.2 43.5 L454.2 43.8 L454.0 44.0 L452.5 44.0 L452.2 44.2Z"/><path pathLength="1" style="--d:1.18s" d="M459.2 74.5 L466.5 74.5 L466.8 74.8 L470.5 75.5 L470.8 75.8 L472.0 76.0 L472.8 76.5 L474.0 76.8 L477.8 79.0 L482.8 83.8 L484.2 85.8 L484.2 86.2 L486.0 88.8 L486.2 90.2 L487.0 91.2 L487.2 93.0 L488.2 95.5 L488.2 97.2 L488.5 97.5 L488.5 99.2 L488.8 99.5 L488.8 101.2 L489.0 101.5 L489.0 105.2 L488.8 105.5 L488.8 107.5 L488.5 107.8 L488.5 109.2 L488.2 109.5 L488.2 111.5 L487.2 114.0 L487.2 115.0 L486.5 116.2 L486.2 117.5 L485.5 119.0 L485.0 119.5 L484.8 120.2 L483.8 121.5 L483.0 123.0 L481.2 124.5 L481.0 125.2 L476.2 129.0 L475.8 129.0 L475.2 129.5 L474.8 129.5 L473.8 130.2 L472.8 130.5 L472.2 131.0 L469.5 131.5 L467.8 132.2 L463.8 132.2 L463.5 132.5 L462.2 132.5 L462.0 132.2 L458.5 132.2 L458.2 132.0 L457.2 132.0 L455.2 131.2 L454.2 131.2 L453.2 130.5 L452.0 130.2 L451.0 129.5 L449.0 128.8 L446.5 126.5 L446.2 126.5 L442.2 122.2 L442.0 121.5 L441.0 120.2 L440.2 118.5 L439.5 117.5 L439.5 116.8 L438.5 115.0 L438.2 113.0 L437.8 112.2 L437.5 110.8 L437.2 110.5 L437.0 106.5 L436.8 106.2 L436.8 101.5 L437.0 101.2 L437.2 96.5 L438.2 94.0 L438.5 92.0 L439.5 90.2 L439.5 89.5 L440.5 88.0 L440.5 87.5 L443.5 83.2 L446.8 80.0 L448.8 78.5 L450.0 78.0 L451.5 76.8 L453.2 76.5 L454.5 75.8 L455.2 75.8 L456.2 75.2 L457.0 75.2 L457.2 75.0 L458.0 75.0Z"/><path pathLength="1" style="--d:1.45s" d="M536.5 46.0 L536.0 46.8 L536.0 160.2 L536.5 161.0 L538.2 161.0 L538.5 161.2 L539.0 161.2 L539.2 161.0 L567.8 161.0 L568.0 161.2 L569.5 161.2 L569.8 161.0 L573.2 161.2 L573.5 161.0 L574.0 161.0 L574.5 160.0 L574.5 132.8 L575.5 132.0 L584.8 132.0 L586.0 133.0 L586.5 134.0 L587.5 135.0 L588.5 137.0 L591.2 140.5 L591.2 141.0 L592.5 142.5 L594.5 145.8 L595.2 146.5 L595.5 147.2 L596.2 148.0 L597.5 150.2 L599.2 152.5 L599.5 153.2 L600.5 154.2 L600.8 155.0 L601.5 155.8 L602.8 158.0 L605.2 161.0 L607.8 161.0 L608.0 161.2 L615.8 161.2 L616.0 161.0 L638.8 161.0 L639.0 161.2 L639.2 161.0 L643.8 161.0 L644.2 161.2 L644.5 161.0 L645.2 161.0 L645.5 160.5 L645.2 159.5 L644.5 158.8 L644.2 158.0 L643.5 157.2 L642.2 155.0 L640.5 153.0 L640.0 151.8 L638.5 150.0 L638.2 149.2 L637.5 148.5 L637.2 147.8 L635.5 145.5 L634.2 143.2 L633.2 142.2 L633.2 141.8 L631.8 140.0 L631.0 138.5 L629.5 136.8 L629.2 136.0 L627.5 133.8 L626.2 131.5 L625.8 131.2 L625.0 129.8 L624.0 128.8 L623.5 128.0 L623.5 127.5 L622.5 126.2 L623.0 125.2 L623.8 124.5 L626.2 123.2 L630.2 120.2 L630.2 120.0 L630.8 119.8 L636.2 114.0 L636.8 113.0 L637.5 112.2 L638.2 110.5 L639.2 109.2 L639.8 108.2 L639.8 107.8 L640.8 106.0 L640.8 105.5 L641.2 104.8 L641.2 104.0 L642.0 103.0 L642.0 102.5 L642.2 102.2 L642.5 99.8 L643.2 97.8 L643.5 93.0 L643.8 92.8 L643.8 86.0 L643.5 85.8 L643.5 82.5 L643.2 82.2 L643.2 81.0 L643.0 80.8 L643.0 79.8 L642.5 78.5 L642.2 76.5 L641.5 75.0 L640.8 72.5 L640.0 71.2 L640.0 70.8 L639.0 68.8 L637.8 67.0 L637.2 65.8 L633.0 60.8 L633.0 60.5 L632.8 60.5 L630.8 58.5 L630.5 58.5 L627.0 55.5 L626.2 55.2 L625.5 54.5 L624.2 54.0 L621.8 52.2 L620.5 52.0 L616.0 49.8 L614.2 49.5 L612.8 48.8 L610.8 48.5 L610.0 48.0 L609.5 48.0 L608.5 47.5 L607.5 47.5 L607.2 47.2 L605.2 47.2 L605.0 47.0 L602.8 46.8 L602.5 46.5 L595.8 46.2 L595.5 46.0Z"/><path pathLength="1" style="--d:1.55s" d="M574.5 76.5 L575.2 75.8 L576.2 75.8 L576.5 75.5 L577.0 75.5 L577.2 75.8 L587.5 75.8 L587.8 75.5 L589.0 75.5 L589.2 75.8 L592.8 75.8 L594.8 76.5 L597.0 76.8 L601.0 79.2 L602.2 80.5 L602.5 81.2 L603.5 82.5 L603.5 83.0 L604.0 83.8 L604.0 84.2 L604.5 85.2 L604.8 87.2 L605.0 87.5 L605.0 91.2 L604.8 91.5 L604.2 94.2 L603.5 96.0 L603.0 96.5 L602.2 98.0 L599.5 100.5 L598.8 100.8 L598.2 101.2 L596.2 102.0 L593.5 102.5 L593.2 102.8 L591.2 102.8 L591.0 103.0 L575.8 103.0 L574.5 102.2Z"/><path pathLength="1" style="--d:1.78s" d="M656.8 46.8 L656.8 160.0 L657.5 161.0 L658.0 161.2 L661.2 161.2 L661.5 161.0 L691.2 161.0 L692.0 160.2 L692.0 112.2 L692.5 111.8 L694.0 113.0 L694.5 114.2 L695.2 115.0 L696.5 117.5 L697.8 119.0 L698.5 120.8 L699.2 121.5 L700.2 123.5 L701.2 124.8 L701.2 125.2 L702.5 126.8 L702.8 127.5 L704.2 129.5 L705.0 131.2 L705.8 132.0 L706.5 133.5 L707.0 134.0 L707.5 135.2 L709.2 137.5 L709.2 138.0 L710.2 139.2 L710.5 140.0 L711.2 140.8 L711.8 142.0 L712.2 142.5 L713.8 145.2 L715.0 146.8 L715.5 148.2 L716.2 149.0 L716.8 150.0 L717.5 150.5 L734.0 150.5 L735.2 149.2 L735.2 148.8 L737.0 146.2 L737.8 144.5 L738.2 144.0 L738.5 143.2 L739.5 142.0 L740.0 140.8 L741.8 138.2 L741.8 137.8 L742.8 136.5 L743.2 135.2 L744.2 134.0 L745.5 131.5 L746.5 130.2 L746.5 129.8 L747.2 129.0 L747.8 128.0 L747.8 127.5 L749.5 125.2 L749.5 124.8 L751.2 122.2 L751.2 121.8 L752.5 120.2 L752.5 119.8 L753.0 119.2 L753.5 118.0 L754.2 117.2 L756.8 112.5 L757.5 111.8 L757.8 110.8 L758.8 110.0 L759.5 110.8 L759.5 124.0 L759.8 124.2 L759.8 126.0 L759.5 126.2 L759.5 127.5 L759.8 127.8 L759.8 152.2 L760.0 152.5 L760.0 158.5 L759.8 158.8 L759.8 159.2 L760.0 159.5 L760.2 160.8 L761.5 161.2 L762.0 161.2 L762.2 161.0 L765.8 161.0 L766.0 161.2 L766.8 161.2 L767.0 161.0 L794.8 161.0 L795.2 160.5 L795.2 80.2 L795.0 80.0 L795.0 47.0 L794.8 46.5 L794.0 46.0 L763.5 46.0 L763.0 46.2 L762.2 47.0 L761.2 49.0 L760.5 49.8 L759.0 52.8 L756.2 57.0 L755.5 58.8 L754.8 59.5 L754.5 60.2 L753.5 61.5 L753.2 62.5 L752.5 63.2 L751.2 65.8 L750.5 66.5 L750.0 68.0 L748.8 69.5 L748.0 71.2 L747.0 72.5 L747.0 73.0 L745.8 74.5 L744.5 77.2 L743.2 78.8 L743.0 79.5 L742.2 80.5 L742.2 81.0 L741.0 82.5 L740.8 83.2 L740.2 83.8 L740.2 84.2 L739.2 85.5 L739.2 86.0 L737.2 88.8 L737.2 89.2 L736.8 89.8 L736.2 91.0 L735.5 91.8 L734.0 94.8 L732.5 96.8 L731.8 98.5 L731.2 99.0 L731.0 99.8 L730.5 100.2 L730.2 101.0 L729.8 101.5 L729.5 102.2 L726.8 106.5 L725.8 106.5 L724.8 105.2 L724.0 103.8 L723.2 103.0 L721.5 99.5 L720.5 98.5 L720.2 97.5 L718.5 95.2 L716.2 91.0 L715.0 89.5 L714.2 87.8 L713.5 87.0 L712.2 84.5 L711.5 83.8 L711.2 82.8 L710.5 82.0 L710.0 80.8 L709.2 80.0 L708.0 77.5 L706.8 76.0 L706.2 74.8 L703.8 71.0 L702.5 68.5 L700.5 65.8 L700.2 64.8 L699.5 64.0 L699.2 63.2 L697.8 61.2 L697.2 60.0 L695.8 58.0 L694.2 55.0 L693.2 54.0 L693.2 53.5 L692.8 53.0 L692.2 51.8 L691.5 51.0 L691.0 49.8 L689.8 48.2 L689.5 47.2 L688.5 46.2 L688.0 46.0 L657.5 46.0Z"/></svg><span class="sll-back"></span><img class="sla-sub" alt="" src="' + A + 'sub.png"><img class="sla-storm" alt="" src="' + A + 'storm.png"><img class="sla-drop" alt="" src="' + A + 'drop.png">';
      var shade = document.createElement('div'); shade.id = 'sll-shade';
      var first = true;
      var flash = function () { w.classList.remove('flash'); shade.classList.remove('flash'); void w.offsetWidth; w.classList.add('flash'); shade.classList.add('flash'); };
      var imgs = w.querySelectorAll('img'), left = imgs.length, done = false;
      var swap = function () { if (done) return; done = true; if (!old.parentNode) return; old.parentNode.replaceChild(w, old); if (!shade.parentNode) document.body.appendChild(shade); if (first) { void w.offsetWidth; flash(); } };
      var fail = function () { if (done) return; done = true; };
      Array.prototype.forEach.call(imgs, function (im) { im.addEventListener('load', function () { if (--left === 0) swap(); }); im.addEventListener('error', fail); });
      setTimeout(function () { if (left > 0 && !done) swap(); }, 2500);
      w.addEventListener('click', flash);
      window.stormLogoFlash = function () { if (w.parentNode) flash(); };
      var wrapReplay = function (name, delay) { var f = window[name]; if (typeof f !== 'function') return; window[name] = function () { var r = f.apply(this, arguments); setTimeout(window.stormLogoFlash, delay); return r; }; };
      setTimeout(function () { wrapReplay('closeDetail', 220); wrapReplay('closePickSheet', 60); }, 0);
      window.addEventListener('pageshow', function (e) { if (e.persisted) window.stormLogoFlash(); });
      document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'visible' && window.__stormHid) { window.__stormHid = false; window.stormLogoFlash(); } else if (document.visibilityState === 'hidden') window.__stormHid = true; });
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
      outT = setTimeout(function () { outT = null; d.classList.remove('fx-out'); _cd.apply(self, args); }, 250);
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
  + '.lbl-zoom { position: fixed; inset: 0; z-index: 150; background: rgba(8,12,18,0); -webkit-backdrop-filter: blur(0); backdrop-filter: blur(0); transition: background .32s ease, backdrop-filter .32s ease, -webkit-backdrop-filter .32s ease; }'
  + '.lbl-zoom.open { background: rgba(8,12,18,.82); -webkit-backdrop-filter: blur(6px); backdrop-filter: blur(6px); }'
  + '.lbl-zoom-img { position: fixed; margin: 0; max-width: none; object-fit: contain; background: #fff; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,.45); transform-origin: 0 0; transition: transform .34s cubic-bezier(.2,.8,.2,1), opacity .34s ease; }'
  + '.lbl-zoom-img.back { opacity: .35; transition: transform .34s cubic-bezier(.4,0,.2,1), opacity .34s ease-in; }'
  + '.lbl-zoom-x { position: fixed; top: calc(14px + env(safe-area-inset-top)); right: 14px; width: 44px; height: 44px; border-radius: 12px; border: 1px solid rgba(255,255,255,.5); background: rgba(15,23,32,.38); -webkit-backdrop-filter: blur(10px) saturate(1.4); backdrop-filter: blur(10px) saturate(1.4); color: #fff; font-size: 28px; line-height: 1; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity .25s ease .1s; }'
  + '.lbl-zoom.open .lbl-zoom-x { opacity: 1; }'
  + '#lbl-sheet .lbl-row img { cursor: zoom-in; }'
  + '.pick-scrim { z-index: 102 !important; } .pick-sheet { z-index: 103 !important; } .confirm-scrim { z-index: 104 !important; } .confirm-box { z-index: 105 !important; } #toast { z-index: 140 !important; }'
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
    sheet.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-lbl-sheet-close]')) { closeSheet(); return; } var im = e.target.closest && e.target.closest('.lbl-row img'); if (im) { e.preventDefault(); e.stopPropagation(); zoomOpen(im); } });
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
  var zm = null;
  function zoomOpen(th, bigSrc) {
    if (zm) return; var r0 = th.getBoundingClientRect(); var nw = th.naturalWidth || r0.width, nh = th.naturalHeight || r0.height;
    var vw = window.innerWidth, vh = window.innerHeight, pad = 18, top = 70;
    var sc = Math.min((vw - pad * 2) / nw, (vh - top - pad * 2) / nh); var fw = nw * sc, fh = nh * sc; var fx = (vw - fw) / 2, fy = top + (vh - top - fh) / 2 - pad / 2;
    var ov = document.createElement('div'); ov.className = 'lbl-zoom'; ov.innerHTML = '<button type="button" class="lbl-zoom-x" aria-label="Close preview">&times;</button>';
    var big = document.createElement('img'); big.className = 'lbl-zoom-img'; big.src = th.src; if (bigSrc) { var hi = new Image(); hi.onload = function () { big.src = bigSrc; }; hi.src = bigSrc; } big.alt = 'Bin label preview';
    big.style.left = fx + 'px'; big.style.top = fy + 'px'; big.style.width = fw + 'px'; big.style.height = fh + 'px';
    var from = 'translate(' + (r0.left - fx) + 'px,' + (r0.top - fy) + 'px) scale(' + (r0.width / fw) + ',' + (r0.height / fh) + ')';
    big.style.transform = from; ov.appendChild(big); document.body.appendChild(ov); th.style.visibility = 'hidden';
    zm = { ov: ov, big: big, th: th };
    void big.offsetWidth; ov.classList.add('open'); big.style.transform = 'none';
    var close = function (e) { if (e) { e.preventDefault(); e.stopPropagation(); } zoomClose(); };
    ov.querySelector('.lbl-zoom-x').addEventListener('click', close); ov.addEventListener('click', function (e) { if (e.target === ov) close(e); });
  }
  window.stormZoom = function (th, b) { zoomOpen(th, b); };
  function zoomClose() {
    if (!zm || zm.closing) return; zm.closing = true; var z = zm, r = z.th.getBoundingClientRect();
    var fx = parseFloat(z.big.style.left), fy = parseFloat(z.big.style.top), fw = parseFloat(z.big.style.width), fh = parseFloat(z.big.style.height);
    if (r.width) z.big.style.transform = 'translate(' + (r.left - fx) + 'px,' + (r.top - fy) + 'px) scale(' + (r.width / fw) + ',' + (r.height / fh) + ')';
    z.big.classList.add('back'); z.ov.classList.remove('open');
    setTimeout(function () { z.th.style.visibility = ''; if (z.ov.parentNode) z.ov.parentNode.removeChild(z.ov); zm = null; }, 380);
  }
  function openSheet() { if (!build()) return; render(); scrim.classList.add('open'); sheet.classList.add('open'); }
  function closeSheet() { if (zm) { zm.th.style.visibility = ''; if (zm.ov.parentNode) zm.ov.parentNode.removeChild(zm.ov); zm = null; } if (!sheet) return; scrim.classList.remove('open'); sheet.classList.remove('open'); }
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

/* STORM category regroup (Hark, 2026-11-06): preview via app-ext; sheet Category column unchanged */
(function () {
  if (typeof render !== 'function' || typeof CATEGORY_ORDER === 'undefined') return;
  var BY_BIN = { 'rt-25': 'AprilAire Accessories', 'rt-26': 'AprilAire Accessories', 'rt-03': 'Battery Backup', 'rt-04': 'High Water Alarms', 'hd-103': 'Extension Cords',
    /* v79 (2026-11-07, Dave's reorganize) */ 'rt-13': 'Check Valves', 'rt-34': 'Vapor Barrier', 'rt-41': 'Vapor Barrier', 'rt-36': 'Vapor Barrier', 'rt-29': 'CFS Carbon Fiber',
    /* v85 (2026-11-08, Dave's 15-point list) */ 'hd-63': 'AprilAire Accessories', 'hd-77': 'Exterior Discharge / Downspout Extensions', 'hd-78': 'Exterior Discharge / Downspout Extensions', 'hd-79': 'Exterior Discharge / Downspout Extensions', 'rt-37': 'Exterior Discharge / Downspout Extensions', 'rt-35': 'Vapor Barrier', 'hd-08': 'Exterior Waterproofing', 'hd-18': 'Exterior Waterproofing',
    /* v127 (Hark, 2026-11-09, Dave's regroup) */ 'hd-64': 'AprilAire Accessories', 'az-02': 'Box Truck Oil Change', 'az-05': 'Box Truck Oil Change', 'az-06': 'Box Truck Oil Change', 'az-07': 'Box Truck Oil Change',
    'hd-03': 'Support Poles', 'hd-04': 'Support Poles', 'hd-61': 'Support Poles', 'hd-62': 'Support Poles', 'hd-66': 'J Hooks & Pipe Hangers', 'hd-67': 'J Hooks & Pipe Hangers', 'hd-68': 'J Hooks & Pipe Hangers',
    'rt-33': 'Vapor Barrier Tape', 'hd-58': 'Job Site Cleanup', 'hd-59': 'Job Site Cleanup', 'hd-19': 'Job Site Cleanup', 'hd-45': 'Job Site Cleanup', 'hd-50': 'Job Site Cleanup',
    'hd-71': 'Wall Treatment Spray', 'hd-72': 'Wall Treatment Spray', 'rt-39': 'Vapor Barrier', 'hd-36': 'DECKMATE Fasteners', 'hd-37': 'DECKMATE Fasteners', 'hd-38': 'DECKMATE Fasteners', 'hd-39': 'DECKMATE Fasteners', 'hd-40': 'DECKMATE Fasteners',
    'hd-44': 'Drainage', 'hd-76': 'Exterior Discharge / Downspout Extensions',
    /* v165 (Hark, 2026-11-10, Dave's round 3; later keys win) */ 'hd-01': 'Specialty 1-1/2 Fittings', 'hd-69': 'Specialty 1-1/2 Fittings', 'rt-14': 'Specialty 1-1/2 Fittings',
    'hd-81': 'Exterior Discharge / Downspout Extensions', 'hd-80': 'Exterior Discharge / Downspout Extensions', 'hd-74': 'Exterior Discharge / Downspout Extensions', 'hd-75': 'Exterior Discharge / Downspout Extensions', 'hd-17': 'Exterior Discharge / Downspout Extensions',
    'hd-41': 'Tapcon Concrete Screws', 'hd-42': 'Tapcon Concrete Screws', 'hd-43': 'Tapcon Concrete Screws', 'hd-99': 'Wall Treatment Spray', 'hd-60': 'Wall Treatment Spray', 'hd-73': 'Job Site Cleanup', 'hd-101': 'Job Site Cleanup' };
  var PHOTO = { 'hd-45': 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/items/hd-45.jpg?v=2' }; /* v127: hd-45 shows the 500-pack it is (list, details, bin labels) */
  var SUFFIX = { 'hd-103': ' (15AMP)', 'hi-03': ' (TE-2000)' }; /* v85: Dave's description adds */
  var RENAME = { 'Power & Backup': 'Battery Backup', 'Sump Basins & Liners': 'Sump Basins & Lids', 'Wall Treatments': 'Vapor Barrier', 'Pumps': 'Pumps & Accessories', 'Jobsite Protection': 'Job Site Cleanup', 'Vehicle': 'Box Truck Parts', 'Fasteners & Hardware': 'Worm Clamps' /* v165 */ };
  function fix() { if (!items || !items.forEach) return; for (var q = items.length - 1; q >= 0; q--) { var z = items[q]; if (z && !String(z.name || '').trim() && !String(z.sku || '').trim()) items.splice(q, 1); } items.forEach(function (it) { if (PHOTO[(it.bin || '').toLowerCase()]) it.photoUrl = PHOTO[(it.bin || '').toLowerCase()]; var b = (it.bin || '').toLowerCase(); if (BY_BIN[b]) it.category = BY_BIN[b]; else if (/hanging\s*strap/i.test(it.name || '')) it.category = 'AprilAire Accessories'; else if ((it.supplier === 'Hilti' || /^hi-/.test(b)) && /cord/i.test(it.name || '')) it.category = 'Extension Cords'; else if (RENAME[it.category]) it.category = RENAME[it.category]; var sx = SUFFIX[b]; if (sx && it.name && it.name.slice(-sx.length) !== sx) it.name += sx; }); }
  var want = ['Sump Basins & Lids', 'Pumps & Accessories', 'Battery Backup', 'Check Valves', 'Switches & Floats', 'High Water Alarms', 'Dehumidifiers', 'AprilAire Accessories', 'Extension Cords', 'Drainage', 'Exterior Discharge / Downspout Extensions', 'Exterior Waterproofing', 'Vapor Barrier', 'Vapor Barrier Tape', 'Wall Treatment Spray', 'CFS Carbon Fiber', 'Support Poles', 'J Hooks & Pipe Hangers', 'DECKMATE Fasteners', 'Worm Clamps', 'Tapcon Concrete Screws', 'Job Site Cleanup', 'Box Truck Oil Change', 'Box Truck Parts'];
  var rest = CATEGORY_ORDER.filter(function (c) { return want.indexOf(c) < 0 && !RENAME[c] && !/^PVC & Fittings .{1,3}Other sizes$/.test(c); });
  /* set order inside a category (listed bins first, in this order; everything else stays A to Z after them) */
  var RANK = {}; ['rt-20', 'rt-21', 'rt-10', 'rt-11', 'rt-13', 'hd-103', 'HILTI-CORD', 'rt-18', 'rt-17', 'rt-19', 'rt-16', 'rt-34', 'rt-41', 'rt-36', 'rt-35', 'rt-39'].forEach(function (b, i) { RANK[b] = i + 1; });
  function rk(it) { var b = (it.bin || '').toLowerCase(); if (RANK[b]) return RANK[b]; if (it.category === 'Extension Cords' && /^hi-/.test(b)) return RANK['HILTI-CORD']; return 0; }
  if (typeof byName === 'function') { var _bn = byName; byName = function (a, b) { if (a && b && a.category === b.category) { var x = rk(a), y = rk(b); if (x || y) { if (!x) return 1; if (!y) return -1; return x - y; } } return _bn(a, b); }; }
  var all = want.concat(rest); /* v165: Specialty 1-1/2 Fittings sits right after PVC & Fittings 1-1/2 in */
  if (all.indexOf('Specialty 1-1/2 Fittings') < 0) { var pi = -1; all.forEach(function (x, i) { if (/^PVC & Fittings .{1,3}1-1\/2 in$/.test(x)) pi = i; }); if (pi < 0) all.push('Specialty 1-1/2 Fittings'); else all.splice(pi + 1, 0, 'Specialty 1-1/2 Fittings'); }
  CATEGORY_ORDER.length = 0; all.forEach(function (c) { CATEGORY_ORDER.push(c); });
  var _r = render; render = function () { try { fix(); } catch (e) {} return _r.apply(this, arguments); };
  try { if (items && items.length) { fix(); render(); if (typeof buildDrawerCats === 'function') buildDrawerCats(); } } catch (e) {}
})();

/* cart: tap a line photo to zoom (same as label preview); X exits with bounce + speed off right */
(function () {
  var c = '#pick-sheet .pick-line img { cursor: zoom-in; }'
    + '#pick-sheet.fx-exit { animation: cartExit .46s cubic-bezier(.5,0,.75,0) forwards !important; transition: none !important; }'
    + '@keyframes cartExit { 0% { transform: translate(0,0) scale(1); opacity: 1; animation-timing-function: cubic-bezier(.3,0,.3,1); } 26% { transform: translate(-16px,-6px) scale(1.015); opacity: 1; animation-timing-function: cubic-bezier(.6,0,.9,.4); } 100% { transform: translate(115%,-2px) scale(.98); opacity: 0; } }';
  var st = document.createElement('style'); st.textContent = c; document.head.appendChild(st);
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t.closest) return;
    var im = t.closest('#pick-sheet .pick-line img');
    if (im && window.stormZoom) { e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation(); var b = (im.getAttribute('src') || '').replace(/([?&]sz=)w\d+/, '$1w1600'); window.stormZoom(im, b !== im.getAttribute('src') ? b : null); return; }
    var x = t.closest('#pick-sheet [data-pick-close]');
    if (x && typeof closePickSheet === 'function') {
      e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
      var sh = document.getElementById('pick-sheet'); if (!sh || !sh.classList.contains('open') || sh.classList.contains('fx-exit')) return;
      var sc = document.getElementById('pick-scrim'); if (sc) sc.classList.remove('open');
      sh.classList.add('fx-exit');
      setTimeout(function () { sh.style.transition = 'none'; try { closePickSheet(); } catch (er) { sh.classList.remove('open'); } void sh.offsetWidth; sh.classList.remove('fx-exit'); void sh.offsetWidth; setTimeout(function () { sh.style.transition = ''; }, 30); }, 470);
    }
  }, true);
})();

/* v73: Order controls under the item photo in Item details, so the cart/QR buttons never cover them (2026-11-07) */
(function () {
  var st = document.createElement('style');
  st.textContent = '#detail .detail-body > .controls.ctl-top { margin-top: 12px; margin-bottom: 4px; }';
  document.head.appendChild(st);
  function lift() {
    var body = document.querySelector('#detail .detail-body'); if (!body) return;
    var ctl = body.querySelector(':scope > .controls'); if (!ctl || ctl.classList.contains('ctl-top')) return;
    var photo = body.querySelector(':scope > .detail-photo');
    var name = body.querySelector(':scope > .detail-name');
    var anchor = photo ? photo.nextSibling : (name || body.firstChild);
    body.insertBefore(ctl, anchor);
    ctl.classList.add('ctl-top');
  }
  if (typeof openDetail === 'function') {
    var _o = openDetail;
    openDetail = function () { var r = _o.apply(this, arguments); try { lift(); } catch (e) {} return r; };
  }
  var d = document.getElementById('detail');
  if (d && window.MutationObserver) new MutationObserver(function () { try { lift(); } catch (e) {} }).observe(d, { childList: true });
})();

/* v74: boot handoff - wrapper's pulsing logo flies into the header, then the header intro plays (2026-11-07) */
(function () {
  var inWrap = false;
  try { var ao = location.ancestorOrigins; if (ao) for (var i = 0; i < ao.length; i++) if (/github\.io$/.test(ao[i])) inWrap = true; } catch (e) {}
  if (!inWrap) return;
  var de = document.documentElement; de.classList.add('storm-handoff');
  var st = document.createElement('style');
  st.textContent = 'html.storm-handoff header .storm-logo-lit, html.storm-handoff header img.logo { visibility: hidden !important; } html.storm-handoff header .storm-logo-lit, html.storm-handoff header .storm-logo-lit * { animation: none !important; }';
  document.head.appendChild(st);
  var FLY = 1380, sent = false, t0 = Date.now(), shown = false;
  window.addEventListener('message', function (ev) { if (ev.data && ev.data.storm === 'landed') reveal(!!ev.data.present); });
  /* v89 (Hark, 2026-11-08): when the wrapper already traced the logo during loading, the header logo appears with one flash, in step with the edge flash */
  var pst = document.createElement('style');
  pst.textContent = 'header .storm-logo-lit.present { animation: sllPresent 1.8s ease-out both !important; }'
    + '@keyframes sllPresent { 0% { filter: brightness(1.2) drop-shadow(0 0 1px #fff) drop-shadow(0 0 3px rgba(200,235,255,.8)); } 18% { filter: brightness(1.45) drop-shadow(0 0 1px #fff) drop-shadow(0 0 1.5px #fff) drop-shadow(0 0 6px rgba(200,235,255,.95)) drop-shadow(0 0 16px rgba(70,180,255,.6)); } 100% { filter: brightness(1) drop-shadow(0 0 .6px rgba(255,255,255,.55)) drop-shadow(0 0 3px rgba(255,255,255,.14)); } }';
  document.head.appendChild(pst);
  function reveal(present) {
    if (shown) return; shown = true;
    var lit = document.querySelector('header .storm-logo-lit');
    if (present && lit) { lit.classList.remove('flash'); void lit.offsetWidth; lit.classList.add('present'); de.classList.remove('storm-handoff'); setTimeout(function () { lit.classList.remove('flash'); lit.classList.remove('present'); }, 1900); return; }
    de.classList.remove('storm-handoff'); try { if (window.stormLogoFlash) window.stormLogoFlash(); } catch (e) {}
  }
  (function find() {
    if (sent) return;
    var el = document.querySelector('header .storm-logo-lit') || (Date.now() - t0 > 2600 ? document.querySelector('header img.logo') : null);
    var r = el && el.getBoundingClientRect();
    if (r && r.width > 20) {
      sent = true;
      try { window.top.postMessage({ storm: 'logo', x: r.left, y: r.top, w: r.width, h: r.height, fly: FLY }, '*'); } catch (e) {}
      setTimeout(reveal, 9000); /* v88: fallback if the wrapper never says the edge loop closed (the loop waits for this page) */
      return;
    }
    if (Date.now() - t0 > 4000) { sent = true; reveal(); return; }
    setTimeout(find, 40);
  })();
})();

/* v75 (Hark, 2026-11-07): drawer arrows, drawer-nav slide, Bin Labels grid + label details, Checklists */
(function () {
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var CHEV = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='M9 5l7 7-7 7'/></svg>";
  var css = ''
    /* arrows: one style everywhere; right when closed, turns clockwise to point down when open */
    + '.drawer-chevron { font-size: 0 !important; color: transparent !important; display: inline-block !important; flex: none; width: 18px; height: 18px; margin-left: 8px; background: url("' + CHEV + '") center / 18px 18px no-repeat; transform: rotate(0deg) !important; transition: transform .38s cubic-bezier(.4,0,.2,1) !important; }'
    + '.drawer-section.expanded > .drawer-section-head .drawer-chevron, .drawer-supplier.open > .drawer-item .drawer-chevron { transform: rotate(90deg) !important; }'
    /* drawer-style slide in from the left */
    + '@keyframes stormSlideL { from { transform: translateX(-102%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }'
    + '.storm-slide-in { animation: stormSlideL .3s ease both; }'
    + '#list.storm-slide-in { animation-duration: .32s; }'
    /* Bin Labels grid */
    + '.bl-intro { font-size: 15px; color: #6B7280; margin: 0 0 14px; }'
    + '.bl-cat { margin: 18px 0 8px; padding: 6px 10px; border-left: 3px solid var(--blue); background: #F3F4F6; border-radius: 6px; font-size: 13px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase; color: var(--dark); }'
    + '.bl-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; }'
    + '.bl-card { position: relative; display: flex; gap: 12px; align-items: center; background: #fff; border: 1px solid #E5E7EB; border-radius: 12px; padding: 10px; cursor: pointer; transition: border-color .2s ease, box-shadow .2s ease, transform .1s ease; -webkit-user-select: none; user-select: none; }'
    + '.bl-card:active { transform: scale(.98); }'
    + '.bl-card.in { border-color: #16a34a; box-shadow: 0 0 0 2px rgba(22,163,74,.25); }'
    + '.bl-card img { flex: none; width: 120px; height: 62px; object-fit: contain; background: #fff; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,.18); }'
    + '.bl-info { flex: 1; min-width: 0; }'
    + '.bl-bin { font-size: 12px; font-weight: 800; letter-spacing: .4px; text-transform: uppercase; color: var(--dark); }'
    + '.bl-name { font-size: 15px; font-weight: 700; line-height: 1.3; margin-top: 2px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }'
    + '.bl-state { margin-top: 6px; font-size: 13px; font-weight: 700; color: var(--blue); }'
    + '.bl-card.in .bl-state { color: #16a34a; }'
    + '.bl-none { color: #6B7280; font-size: 15px; }'
    + '#lbl-detail { z-index: 101; }'
    + '#lbl-detail .bld-label { display: block; width: 100%; height: auto; border: 1px solid #E5E7EB; border-radius: 10px; background: #fff; }'
    + '#lbl-detail .bld-add { display: block; width: 100%; margin-top: 16px; min-height: 54px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; }'
    + '#lbl-detail .bld-add.in { background: #16a34a; }'
    + '#lbl-detail .bld-photo { display: block; width: 96px; height: 96px; object-fit: contain; border: 1px solid #E5E7EB; border-radius: 10px; background: #fff; flex: none; }'
    + '#lbl-detail .bld-row { display: flex; gap: 12px; align-items: center; margin-top: 14px; }'
    /* Checklists */
    + '#chk-view { z-index: 101; background: #F3F4F6; }'
    + '.chk-page { display: block; width: 100%; height: auto; margin: 0 0 12px; background: #fff; border-radius: 6px; box-shadow: 0 2px 10px rgba(0,0,0,.12); }'
    + '.chk-open { display: flex; align-items: center; justify-content: center; width: 100%; min-height: 54px; margin: 0 0 14px; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; text-decoration: none; }'
    + '.drawer-chk-ico { width: 20px; height: 20px; flex: none; }'
    + '.chk-page { cursor: zoom-in; } .chk-hint { text-align: center; color: #6B7280; font-size: 13px; margin: 2px 0 18px; }'
    + '#chk-zoom { position: fixed; inset: 0; z-index: 200; background: #0B0F14; touch-action: none; overflow: hidden; opacity: 0; transition: opacity .2s ease; }'
    + '#chk-zoom.open { opacity: 1; } #chk-zoom canvas { position: absolute; left: 0; top: 0; display: block; }'
    + '#chk-zoom .cz-x { position: absolute; top: calc(10px + env(safe-area-inset-top, 0px)); right: 12px; z-index: 2; width: 44px; height: 44px; border: 0; border-radius: 22px; background: rgba(255,255,255,.16); color: #fff; font-size: 28px; line-height: 44px; }'
    + '#chk-zoom .cz-tip { position: absolute; left: 0; right: 0; bottom: calc(14px + env(safe-area-inset-bottom, 0px)); text-align: center; color: rgba(255,255,255,.7); font-size: 13px; pointer-events: none; transition: opacity .6s ease; }';
  var st = document.createElement('style'); st.id = 'storm-v75-css'; st.textContent = css; document.head.appendChild(st);

  function slideIn(el) { if (!el) return; el.classList.remove('storm-slide-in'); void el.offsetWidth; el.classList.add('storm-slide-in'); setTimeout(function () { el.classList.remove('storm-slide-in'); }, 420); }
  function e$(s) { return document.getElementById(s); }
  function h(s) { try { return esc(s); } catch (x) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); } }
  function lurl(bin) { try { return lblUrl(bin); } catch (x) { return BASE + 'labels/' + encodeURIComponent(bin) + '.jpg?v=1'; } }
  function inList(bin) { try { return lblHas(bin); } catch (x) { return false; } }
  function pushOverlay(name) { try { history.pushState({ overlay: name }, ''); } catch (x) {} }

  /* ---- Checklists drawer section ---- */
  var CHECKLISTS = [
    { id: 'box-truck', name: 'Box Truck Pre Check', pdf: BASE + 'checklists/box-truck-pre-check.pdf', pages: [BASE + 'checklists/box-truck-pre-check-hd-1.jpg'] },
    { id: 'tools', name: 'Tool Checklist', pdf: BASE + 'checklists/tool-checklist.pdf', pages: [BASE + 'checklists/tool-checklist-hd-1.jpg', BASE + 'checklists/tool-checklist-hd-2.jpg'] }
  ];
  var ICO = '<svg class="drawer-chk-ico" viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6v2H9z"/><path d="M8.5 11l2 2 4-4"/><path d="M8.5 17h7"/></svg>';
  function addChecklistSection() {
    var dr = e$('drawer'); if (!dr || e$('drawer-checklists')) return;
    var sec = document.createElement('div'); sec.className = 'drawer-section'; sec.id = 'drawer-checklists';
    var hh = '<button class="drawer-section-head" type="button">Checklists <span class="drawer-chevron">&#9662;</span></button><div class="drawer-items">';
    CHECKLISTS.forEach(function (c) { hh += '<button class="drawer-item" type="button" data-drawer-checklist="' + c.id + '">' + ICO + '<span class="drawer-item-name" style="font-size:16px;color:#111827">' + h(c.name) + '</span></button>'; });
    sec.innerHTML = hh + '</div>';
    var after = e$('drawer-labels'), foot = dr.querySelector('.drawer-foot');
    if (after && after.parentNode === dr) dr.insertBefore(sec, after.nextSibling); else if (foot) dr.insertBefore(sec, foot); else dr.appendChild(sec);
    sec.querySelector('.drawer-section-head').addEventListener('click', function () { sec.classList.toggle('expanded'); });
  }
  function overlayEl(id) { var v = e$(id); if (!v) { v = document.createElement('div'); v.id = id; v.className = 'detail-overlay'; document.body.appendChild(v); } return v; }
  function openChecklist(id) {
    var c = CHECKLISTS.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    var v = overlayEl('chk-view');
    var hh = '<div class="detail-bar"><button class="detail-close" type="button" data-chk-close aria-label="Close">&times;</button><div style="font-weight:700;font-size:17px">' + h(c.name) + '</div></div><div class="detail-body">'
      + '<a class="chk-open" href="' + c.pdf + '" target="_blank" rel="noopener">Open PDF to print</a>';
    c.pages.forEach(function (p, i) { hh += '<img class="chk-page" data-chk-zoom="' + p + '" src="' + p + '" alt="' + h(c.name) + ' page ' + (i + 1) + '">'; });
    hh += '<div class="chk-hint">Tap a page to zoom</div>';
    v.innerHTML = hh + '</div>';
    v.classList.add('open'); v.scrollTop = 0; slideIn(v);
    pushOverlay('chk');
  }
  /* v92 (Hark, 2026-11-08): tap a checklist page to open it full screen in high res; pinch to zoom, drag to move around, double-tap to zoom in/out */
  function openZoom(src) {
    if (document.getElementById('chk-zoom')) return;
    var z = document.createElement('div'); z.id = 'chk-zoom';
    z.innerHTML = '<button class="cz-x" type="button" aria-label="Close">&times;</button><canvas></canvas><div class="cz-tip">Pinch to zoom &middot; drag to move &middot; double-tap</div>';
    document.body.appendChild(z);
    /* v105 canvas zoom: only the visible part is drawn, so deep zoom never goes white */ var cv = z.querySelector('canvas'), ctx = cv.getContext('2d'), im = new Image(), dpr = 1, ds = 1, dx = 0, dy = 0, raf = 0, tw = null, s = 1, x = 0, y = 0, fit = 1, W = 0, H = 0, pts = {}, start = null, lastTap = 0, moved = false;
    function size() { if (!W && im.naturalWidth) { W = im.naturalWidth; H = im.naturalHeight; im.style.width = W + 'px'; im.style.height = H + 'px'; fit = Math.min(z.clientWidth / W, z.clientHeight / H); s = fit; } }
    function clamp() { size(); var vw = z.clientWidth, vh = z.clientHeight, iw = W * s, ih = H * s;
      x = iw <= vw ? (vw - iw) / 2 : Math.min(0, Math.max(vw - iw, x)); y = ih <= vh ? (vh - ih) / 2 : Math.min(0, Math.max(vh - ih, y)); }
    function size() { var vw = z.clientWidth, vh = z.clientHeight; dpr = Math.min(window.devicePixelRatio || 1, 3); cv.width = Math.round(vw * dpr); cv.height = Math.round(vh * dpr); cv.style.width = vw + 'px'; cv.style.height = vh + 'px'; }
    function paint() { raf = 0; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#0B0F14'; ctx.fillRect(0, 0, cv.width, cv.height); if (!W) return;
      var vw = z.clientWidth, vh = z.clientHeight, sx = Math.max(0, -dx / ds), sy = Math.max(0, -dy / ds), ex = Math.min(W, (vw - dx) / ds), ey = Math.min(H, (vh - dy) / ds);
      if (ex <= sx || ey <= sy) return; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(im, sx, sy, ex - sx, ey - sy, dx + sx * ds, dy + sy * ds, (ex - sx) * ds, (ey - sy) * ds); }
    function req() { if (!raf) raf = requestAnimationFrame(paint); }
    function draw(anim) { clamp();
      if (!anim) { tw = null; ds = s; dx = x; dy = y; req(); return; }
      tw = { t0: performance.now(), s0: ds, x0: dx, y0: dy, s1: s, x1: x, y1: y };
      (function step(now) { if (!tw) return; var k = Math.min(1, (now - tw.t0) / 250), q = 1 - Math.pow(1 - k, 3); ds = tw.s0 + (tw.s1 - tw.s0) * q; dx = tw.x0 + (tw.x1 - tw.x0) * q; dy = tw.y0 + (tw.y1 - tw.y0) * q; paint(); if (k < 1) requestAnimationFrame(step); else tw = null; })(performance.now()); }
    function zoomAt(ns, cx, cy, anim) { ns = Math.max(fit, Math.min(fit * 10, ns)); x = cx - (cx - x) * ns / s; y = cy - (cy - y) * ns / s; s = ns; draw(anim); }
    function toggleAt(cx, cy) { zoomAt(s > fit * 1.3 ? fit : fit * 2.6, cx, cy, true); }
    size(); req(); im.onload = function () { W = im.naturalWidth; H = im.naturalHeight; size(); fit = Math.min(z.clientWidth / W, z.clientHeight / H); s = fit; x = 0; y = 0; draw(false); };
    im.src = src;
    requestAnimationFrame(function () { z.classList.add('open'); });
    setTimeout(function () { var t = z.querySelector('.cz-tip'); if (t) t.style.opacity = '0'; }, 2600);
    function list() { return Object.keys(pts).map(function (k) { return pts[k]; }); }
    function snap() { var p = list(); if (p.length >= 2) { var a = p[0], b = p[1]; start = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2, s: s, x: x, y: y }; } else if (p.length === 1) { start = { px: p[0].x, py: p[0].y, x: x, y: y }; } else start = null; }
    z.addEventListener('pointerdown', function (ev) { if (ev.target.closest('.cz-x')) return; ev.preventDefault(); try { z.setPointerCapture(ev.pointerId); } catch (q) {} pts[ev.pointerId] = { x: ev.clientX, y: ev.clientY }; moved = false; snap(); });
    z.addEventListener('pointermove', function (ev) {
      if (!pts[ev.pointerId] || !start) return; pts[ev.pointerId] = { x: ev.clientX, y: ev.clientY }; var p = list(), r = z.getBoundingClientRect();
      if (p.length >= 2 && start.d) { var a = p[0], b = p[1], d = Math.hypot(a.x - b.x, a.y - b.y), cx = (a.x + b.x) / 2 - r.left, cy = (a.y + b.y) / 2 - r.top, scx = start.cx - r.left, scy = start.cy - r.top;
        var ns = Math.max(fit * .85, Math.min(fit * 10, start.s * d / start.d)); x = cx - (scx - start.x) * ns / start.s; y = cy - (scy - start.y) * ns / start.s; s = ns; moved = true; draw(false); }
      else if (p.length === 1 && start.px != null) { var dx = p[0].x - start.px, dy = p[0].y - start.py; if (Math.abs(dx) + Math.abs(dy) > 6) moved = true; x = start.x + dx; y = start.y + dy; draw(false); }
    });
    function up(ev) {
      if (!pts[ev.pointerId]) return; delete pts[ev.pointerId];
      if (!list().length) { if (s < fit) { s = fit; draw(true); }
        if (!moved) { var now = Date.now(); if (now - lastTap < 400) { var r = z.getBoundingClientRect(); toggleAt(ev.clientX - r.left, ev.clientY - r.top); lastTap = 0; } else lastTap = now; } }
      snap();
    }
    z.addEventListener('pointerup', up); z.addEventListener('pointercancel', up);
    z.addEventListener('dblclick', function (ev) { ev.preventDefault(); });
    z.addEventListener('click', function (ev) { ev.stopPropagation(); }, false);
    z.addEventListener('wheel', function (ev) { ev.preventDefault(); var r = z.getBoundingClientRect(); zoomAt(s * (ev.deltaY < 0 ? 1.15 : 1 / 1.15), ev.clientX - r.left, ev.clientY - r.top, false); }, { passive: false });
    z.querySelector('.cz-x').addEventListener('click', function (ev) { ev.stopPropagation(); closeZoom(); });
    window.addEventListener('resize', function () { size(); if (!W) return; fit = Math.min(z.clientWidth / W, z.clientHeight / H); if (s < fit) s = fit; draw(false); });
  }
  function closeZoom() { var z = document.getElementById('chk-zoom'); if (!z) return false; z.id = 'chk-zoom-closing'; z.classList.remove('open'); setTimeout(function () { z.remove(); }, 200); return true; }
  function closeChecklist(fromPop) { closeZoom(); var v = e$('chk-view'); if (!v || !v.classList.contains('open')) return; v.classList.remove('open'); v.innerHTML = ''; if (!fromPop) { try { history.back(); } catch (x) {} } }

  /* ---- Bin Labels grid ---- */
  var blStore = null;
  function natBin(a, b) { var re = /(\d+)/; var x = String(a.bin), y = String(b.bin); var px = x.replace(re, ''), py = y.replace(re, ''); if (px !== py) return px < py ? -1 : 1; return (parseInt((x.match(re) || [0, 0])[1], 10) - parseInt((y.match(re) || [0, 0])[1], 10)); }
  function openLabelGrid(store) {
    blStore = store;
    var list = (window.items || items || []).filter(function (it) { return it && it.supplier === store ; }).sort(natBin);
    var cats = [], by = {};
    list.forEach(function (it) { var c = it.category || 'Other'; if (!by[c]) { by[c] = []; cats.push(c); } by[c].push(it); });
    var hh = '<div class="detail-bar"><button class="detail-close" type="button" id="labels-close" aria-label="Close">&times;</button><div style="font-weight:700;font-size:17px">Bin Labels &middot; ' + h(store) + '</div></div><div class="detail-body" style="max-width:1100px">'
      + '<p class="bl-intro">Tap a label to add it to the print list (the QR button). Tap the label picture to see what the item is for.</p>';
    if (!list.length) hh += '<p class="bl-none">No labels for this store yet.</p>';
    cats.forEach(function (c) {
      hh += '<div class="bl-cat">' + h(c) + '</div><div class="bl-grid">';
      by[c].forEach(function (it) {
        var on = inList(it.bin);
        hh += '<div class="bl-card' + (on ? ' in' : '') + '" role="button" tabindex="0" data-bl-card="' + h(it.bin) + '">'
          + '<img src="' + lurl(it.bin) + '" alt="Bin label ' + h(it.bin) + '" loading="lazy" data-bl-detail="' + h(it.bin) + '" onerror="this.style.visibility=\'hidden\'">'
          + '<div class="bl-info"><div class="bl-bin">' + h(it.bin) + '</div><div class="bl-name">' + h(it.name) + '</div><div class="bl-state">' + (on ? '&#10003; In print list' : '+ Tap to add') + '</div></div></div>';
      });
      hh += '</div>';
    });
    hh += '</div>';
    var v = e$('labels'); if (!v) return;
    v.innerHTML = hh; v.classList.add('open'); v.scrollTop = 0; slideIn(v);
    pushOverlay('labels');
    try { overlayOpen = 'labels'; } catch (x) {}
  }
  function refreshGrid() {
    document.querySelectorAll('[data-bl-card]').forEach(function (c) { var on = inList(c.getAttribute('data-bl-card')); c.classList.toggle('in', on); var s = c.querySelector('.bl-state'); if (s) s.innerHTML = on ? '&#10003; In print list' : '+ Tap to add'; });
    var b = document.querySelector('#lbl-detail [data-bld-add]'); if (b) { var on2 = inList(b.getAttribute('data-bld-add')); b.classList.toggle('in', on2); b.innerHTML = on2 ? '&#10003; In print list &middot; tap to remove' : '+ Add to print list'; }
  }
  if (typeof lblSync === 'function') { var _ls = lblSync; lblSync = function () { var r = _ls.apply(this, arguments); try { refreshGrid(); } catch (x) {} return r; }; }
  function openLabelDetail(bin) {
    var it = findItem(bin); if (!it) return;
    var feats = String(it.features || '').split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
    var fh = feats.length ? '<ul>' + feats.map(function (f) { return '<li>' + h(f) + '</li>'; }).join('') + '</ul>' : '<p style="color:#6B7280">No key features listed for this item yet.</p>';
    var v = overlayEl('lbl-detail');
    v.innerHTML = '<div class="detail-bar"><button class="detail-close" type="button" data-bld-close aria-label="Close">&times;</button><div style="font-weight:700;font-size:17px">Label details</div></div><div class="detail-body">'
      + '<img class="bld-label" src="' + lurl(bin) + '" alt="Bin label ' + h(bin) + '">'
      + '<div class="bld-row">' + (it.photoUrl ? '<img class="bld-photo" src="' + h(it.photoUrl) + '" alt="">' : '') + '<div><div class="detail-name" style="margin-top:0">' + h(it.name) + '</div><div class="detail-meta">' + h(it.bin) + ' &middot; ' + h(it.supplier) + (it.category ? ' &middot; ' + h(it.category) : '') + '<br>SKU: ' + h(it.sku || '\u2014') + '</div></div></div>'
      + (it.specs ? '<div class="detail-flow"><h2>Flow rate</h2><ul>' + String(it.specs).split('\n').map(function (s) { return s.trim(); }).filter(Boolean).map(function (s) { return '<li>' + h(s) + '</li>'; }).join('') + '</ul></div>' : '')
      + '<div class="detail-features"><h2>Key features</h2>' + fh + '</div>'
      + '<button type="button" class="bld-add" data-bld-add="' + h(bin) + '">+ Add to print list</button></div>';
    v.classList.add('open'); v.scrollTop = 0;
    try { v.classList.remove('fx-in'); void v.offsetWidth; v.classList.add('fx-in'); } catch (x) {}
    refreshGrid();
    pushOverlay('lbldetail');
  }
  function closeLabelDetail(fromPop) { var v = e$('lbl-detail'); if (!v || !v.classList.contains('open')) return false; v.classList.remove('open'); v.innerHTML = ''; if (!fromPop) { try { history.back(); } catch (x) {} } return true; }

  /* ---- clicks (window capture runs before the app's own drawer handler) ---- */
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var lab = t.closest('[data-drawer-labels]');
    if (lab) { e.stopImmediatePropagation(); e.preventDefault(); var s = lab.getAttribute('data-drawer-labels'); try { closeDrawer(); } catch (x) {} setTimeout(function () { openLabelGrid(s); }, 170); return; }
    var ck = t.closest('[data-drawer-checklist]');
    if (ck) { e.stopImmediatePropagation(); e.preventDefault(); var id = ck.getAttribute('data-drawer-checklist'); try { closeDrawer(); } catch (x) {} setTimeout(function () { openChecklist(id); }, 170); return; }
    if (t.closest('[data-chk-close]')) { e.stopImmediatePropagation(); closeChecklist(false); return; }
    var zm = t.closest('[data-chk-zoom]'); if (zm) { e.stopImmediatePropagation(); openZoom(zm.getAttribute('data-chk-zoom')); return; }
    if (t.closest('[data-bld-close]')) { e.stopImmediatePropagation(); closeLabelDetail(false); return; }
    var ba = t.closest('[data-bld-add]');
    if (ba) { e.stopImmediatePropagation(); try { lblToggle(ba.getAttribute('data-bld-add')); } catch (x) {} refreshGrid(); return; }
    var bd = t.closest('[data-bl-detail]');
    if (bd) { e.stopImmediatePropagation(); openLabelDetail(bd.getAttribute('data-bl-detail')); return; }
    var bc = t.closest('[data-bl-card]');
    if (bc) { e.stopImmediatePropagation(); try { lblToggle(bc.getAttribute('data-bl-card')); } catch (x) {} refreshGrid(); return; }
    /* drawer navigation that lands on the main list: slide it in like the drawer */
    if (t.closest('#drawer') && t.closest('[data-drawer-category], [data-drawer-template], [data-drawer-supplier="All"]')) {
      setTimeout(function () { slideIn(e$('list')); }, 160);
    }
  }, true);
  window.addEventListener('popstate', function () {
    var st2 = history.state && history.state.overlay;
    if (st2 !== 'lbldetail') closeLabelDetail(true);
    if (st2 !== 'chk') closeChecklist(true);
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', addChecklistSection); else addChecklistSection();
  setTimeout(addChecklistSection, 1500);
})();

/* v77 (Hark, 2026-11-07): coming back from a page opened from the drawer reopens the drawer just as it was
   (same sections expanded, same scroll), so nobody has to tap the menu again. Covers Bin Labels, Checklists, and Jobber. */
(function () {
  var back = null; /* saved drawer state while a drawer page is open */
  function d() { return document.getElementById('drawer'); }
  function scrollers() { var dr = d(); if (!dr) return []; var a = [dr]; dr.querySelectorAll('*').forEach(function (n) { if (n.scrollHeight > n.clientHeight + 4 && /(auto|scroll)/.test(getComputedStyle(n).overflowY)) a.push(n); }); return a; }
  function save() { back = { at: Date.now(), s: scrollers().map(function (n) { return [n, n.scrollTop]; }) }; }
  function anyPageOpen() { return ['labels', 'chk-view', 'lbl-detail', 'detail'].some(function (id) { var v = document.getElementById(id); return v && v.classList.contains('open'); }); }
  function reopen() {
    if (!back) return; var b = back; back = null;
    try { openDrawer(); } catch (x) { return; }
    b.s.forEach(function (p) { try { p[0].scrollTop = p[1]; } catch (x) {} });
    requestAnimationFrame(function () { b.s.forEach(function (p) { try { p[0].scrollTop = p[1]; } catch (x) {} }); });
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest || !t.closest('#drawer')) return;
    if (t.closest('[data-drawer-labels], [data-drawer-checklist]')) save();
    else if (t.closest('[data-jobber]')) { save(); back.ext = true; }
  }, true);
  /* every page close (its X or the phone's back) goes through history.back(), so check once the page has closed */
  window.addEventListener('popstate', function () {
    if (!back || back.ext) return;
    setTimeout(function () { if (back && !back.ext && !anyPageOpen() && !d().classList.contains('open')) reopen(); }, 90);
  });
  /* back from Jobber (another app): reopen the drawer when STORM Inventory is showing again */
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden && back && back.ext) setTimeout(reopen, 120);
  });
})();

/* v82 (Hark, 2026-11-07): camera as a layer in the wrapper. The X brings you back to the same spot, no reload. */
(function () {
  var inWrap = false;
  try { var ao = location.ancestorOrigins; if (ao) for (var i = 0; i < ao.length; i++) if (/github\.io$/.test(ao[i])) inWrap = true; } catch (e) {}
  if (!inWrap || typeof openScanner !== 'function') return;
  var WRAP = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var _os = openScanner;
  openScanner = function () {
    var q = '';
    try { q = '?return=' + encodeURIComponent(WRAP) + (typeof scanCartParams === 'function' ? scanCartParams() : ''); } catch (e) { return _os.apply(this, arguments); }
    try { var hb = 0; try { var hh = document.querySelector('header') || document.getElementById('topbar'); if (hh) { var r = hh.getBoundingClientRect(); if (r.bottom > 20) hb = Math.round(r.bottom); } } catch (e) {} window.top.postMessage({ storm: 'scan', q: q, hb: hb }, '*'); /* v146: tells the wrapper where the banner ends so the camera island starts right under it */ } catch (e) { return _os.apply(this, arguments); }
  };
  window.addEventListener('message', function (ev) {
    var m = ev.data; if (!m || m.storm !== 'scanResult' || !/github\.io$/.test(ev.origin)) return;
    try { if (m.ct && typeof applyCartParam === 'function') applyCartParam(m.cart || '', m.ct); } catch (x) {}
    try { if (m.scans && typeof applyScansParam === 'function') applyScansParam(m.scans); } catch (x) {}
    try { if (typeof updatePickBar === 'function') updatePickBar(); if (typeof renderPickSheet === 'function') renderPickSheet(); } catch (x) {}
  });
})();

/* v83 (Hark, 2026-11-07): fast taps on + / - (or any button) never start a text selection, a long-press menu, or a double-tap zoom */
(function () {
  var st = document.createElement('style');
  st.textContent = 'html, body { -webkit-tap-highlight-color: transparent; }'
    + 'button, [role="button"], .step, .card, .drawer-item, .drawer-cat, .drawer-section-head, .fab-dock, .pick-line, .bl-card, .cat-head, header { -webkit-user-select: none !important; user-select: none !important; -webkit-touch-callout: none !important; touch-action: manipulation; }'
    + 'input, textarea, [contenteditable], .detail-body p, .detail-body li { -webkit-user-select: text !important; user-select: text !important; }';
  document.head.appendChild(st);
  function onBtn(t) { return t && t.closest && t.closest('button, [role="button"], .step'); }
  /* stop the second tap of a fast double tap from selecting words */
  document.addEventListener('mousedown', function (e) { if (e.detail > 1 && onBtn(e.target)) e.preventDefault(); }, true);
  document.addEventListener('dblclick', function (e) { if (onBtn(e.target)) { e.preventDefault(); try { window.getSelection().removeAllRanges(); } catch (x) {} } }, true);
  document.addEventListener('selectstart', function (e) { if (onBtn(e.target) || (e.target.closest && e.target.closest('.card') && !e.target.closest('input, textarea'))) e.preventDefault(); }, true);
  document.addEventListener('contextmenu', function (e) { if (onBtn(e.target)) e.preventDefault(); }, true);
})();

/* v84 (Hark, 2026-11-07): rapid "+ Add to order" taps no longer bog down the page.
   While the cart sheet is closed, its rebuild waits for the next frame and runs once for a burst of taps; the toast updates in place. */
(function () {
  if (typeof renderPickSheet !== 'function') return;
  var _rp = renderPickSheet, queued = false;
  function sheetOpen() { var s = document.getElementById('pick-sheet'); return !!(s && s.classList.contains('open')); }
  renderPickSheet = function () {
    if (sheetOpen()) { queued = false; return _rp.apply(this, arguments); }
    if (queued) return; queued = true;
    requestAnimationFrame(function () { if (!queued) return; queued = false; try { _rp(); } catch (e) {} });
  };
  if (typeof openPickSheet === 'function') { var _op = openPickSheet; openPickSheet = function () { if (queued) { queued = false; try { _rp(); } catch (e) {} } return _op.apply(this, arguments); }; }
  if (typeof showToast === 'function') {
    var _st = showToast, last = 0, tm = null, pend = null;
    showToast = function (msg, isErr, ms) {
      var now = Date.now();
      if (!isErr && now - last < 250) { pend = [msg, isErr, ms]; clearTimeout(tm); tm = setTimeout(function () { var p = pend; pend = null; last = Date.now(); _st.apply(null, p); }, 250); return; }
      last = now; return _st.apply(this, arguments);
    };
  }
})();


/* v85 (Hark, 2026-11-08): Hilti gets its own Bin Labels entry (logo + item count) like the other stores */
(function () {
  function add() {
    var box = document.querySelector('#drawer-labels .drawer-items'); if (!box) return false;
    if (box.querySelector('[data-drawer-labels="Hilti"]')) return true;
    var n = (window.items || (typeof items !== 'undefined' ? items : []) || []).filter(function (it) { return it && it.supplier === 'Hilti'; }).length;
    if (!n) return false;
    var b = document.createElement('button'); b.className = 'drawer-item'; b.type = 'button'; b.setAttribute('data-drawer-labels', 'Hilti');
    b.innerHTML = '<img src="https://drive.google.com/thumbnail?id=1MKBIU1ENmbXftk3hgdv-yCUFJB7vcDKh&amp;sz=w400" alt=""><span class="drawer-item-name">Hilti</span><span class="drawer-count">' + n + '</span>';
    box.appendChild(b); return true;
  }
  var t = 0; (function go() { if (!add() && t++ < 60) setTimeout(go, 250); })();
})();

/* v85 (Hark, 2026-11-08): on a detail page (item details, Bin Labels, Checklists) the cart, camera and QR buttons slide right and fade,
   v87: they now slide fully off the page; they slide and fade back in on the main page */
(function () {
  var st = document.createElement('style');
  st.textContent = '#fab-dock.fab-dock { transition: transform .42s cubic-bezier(.34,1.3,.5,1), opacity .32s ease !important; }'
    + 'body:has(.detail-overlay.open) #fab-dock.fab-dock { transform: translateX(calc(100% + 40px)); opacity: 0; pointer-events: none; transition: transform .38s cubic-bezier(.5,-0.35,.6,1), opacity .3s ease !important; }'
    + 'body:has(.detail-overlay.open) #fab-dock.fab-dock .cart-fab-total { opacity: 0; }';
  document.head.appendChild(st);
})();

/* v86 (Hark, 2026-11-08): drawer arrows open and close with a soft scroll + fade. The list slides to its real height,
   and each row fades and drifts in one after another; closing plays the same motion backwards. */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer .drawer-cats { display: block !important; max-height: 0; opacity: 0; overflow: hidden; }'
    + '#drawer .drawer-cats, #drawer .drawer-items { transition: max-height .42s cubic-bezier(.4,0,.2,1), opacity .36s ease !important; }'
    + '#drawer .drawer-section:not(.expanded) > .drawer-items { opacity: 0; }'
    + '#drawer .drawer-supplier.open > .drawer-cats, #drawer .drawer-section.expanded > .drawer-items { opacity: 1; }'
    + '#drawer .drawer-cats > *, #drawer .drawer-items > * { opacity: 0; transform: translateY(-8px); transition: opacity .3s ease, transform .34s cubic-bezier(.3,.7,.4,1); }'
    + '#drawer .drawer-supplier.open > .drawer-cats > *, #drawer .drawer-section.expanded > .drawer-items > * { opacity: 1; transform: none; }';
  document.head.appendChild(st);
  function listOf(g) { return g.querySelector(':scope > .drawer-cats, :scope > .drawer-items'); }
  function isOpen(g) { return g.classList.contains('open') || g.classList.contains('expanded'); }
  function apply(g, animate) {
    var l = listOf(g); if (!l) return;
    var kids = Array.prototype.slice.call(l.children), n = kids.length, open = isOpen(g);
    kids.forEach(function (k, i) { k.style.transitionDelay = (open ? Math.min(i * 28, 280) : Math.min((n - 1 - i) * 16, 160)) + 'ms'; });
    if (open) {
      l.style.maxHeight = l.scrollHeight + 'px';
      clearTimeout(l._t); l._t = setTimeout(function () { if (isOpen(g)) l.style.maxHeight = 'none'; }, 460);
    } else {
      clearTimeout(l._t);
      if (animate && l.style.maxHeight === 'none') { l.style.maxHeight = l.scrollHeight + 'px'; void l.offsetHeight; }
      var d = Math.min(n * 10, 120);
      l._t = setTimeout(function () { if (!isOpen(g)) l.style.maxHeight = '0px'; }, animate ? d : 0);
    }
  }
  var seen = [];
  function hook() {
    document.querySelectorAll('#drawer .drawer-supplier, #drawer .drawer-section').forEach(function (g) {
      if (seen.indexOf(g) >= 0) return; seen.push(g);
      g._was = isOpen(g); apply(g, false);
      new MutationObserver(function () { var o = isOpen(g); if (o !== g._was) { g._was = o; apply(g, true); } }).observe(g, { attributes: true, attributeFilter: ['class'] });
      var l = listOf(g); if (l) new MutationObserver(function () { if (isOpen(g)) apply(g, false); }).observe(l, { childList: true });
    });
  }
  var t = 0; (function go() { hook(); if (t++ < 40) setTimeout(go, 300); })();
})();

/* v95 (Hark, 2026-11-08): STORM logo centered in the Logos and Media header bars.
   v94 (Hark, 2026-11-08): Media rows show SmugMug thumbnails (each photo series' own cover, each video's poster frame), loaded from SmugMug.
   v93 (Hark, 2026-11-08): Resource Center pages restyled to match Bin Labels (white page, blue-bar section headings, white cards, main-app tabs), STORM logo in their header bar, one-tap Download on each video.
   v92 (Hark, 2026-11-08): logos are now true vector files (PDF, SVG, EPS) plus a 6400 px PNG, each labeled on the logo page.
   v91 (Hark, 2026-11-08): Resource Center in the drawer, with two pages.
   Logos opens its own page of logos; tap one for its details, Download, and Open full size.
   Media opens its own page: Photo Series (each SmugMug folder, newest first) and Videos (each video's own SmugMug link, newest first). Nothing is hosted in the app. */
(function () {
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/logos/';
  var LOGOS = [
    { id: 'color-transparent', name: 'Color \u00b7 transparent', note: 'White STORM text. For dark backgrounds.', bg: '#0F1720' },
    { id: 'color-on-black', name: 'Color \u00b7 on black', note: 'Full color on a black background.', bg: '#000' },
    { id: 'black-text-transparent', name: 'Black text \u00b7 transparent', note: 'Black STORM text. For white or light backgrounds.', bg: 'chk' },
    { id: 'black-text-on-white', name: 'Black text \u00b7 on white', note: 'Black STORM text on a white background.', bg: '#fff' },
    { id: 'all-black-transparent', name: 'All black \u00b7 transparent', note: 'One color. For black and white printing.', bg: 'chk' },
    { id: 'all-black-on-white', name: 'All black \u00b7 on white', note: 'One color on a white background.', bg: '#fff' }
  ];
  function full(l) { return BASE + 'STORM-logo-' + l.id + '.png'; }
  function thumb(l) { return BASE + 'thumb-' + l.id + '.png?v=91'; }
  function fname(l, ext) { return 'STORM-logo-' + l.id + '.' + (ext || 'png'); }
  function fileUrl(l, ext) { return BASE + fname(l, ext) + '?v=91'; }
  var FORMATS = [['pdf', 'PDF', 'Vector. Best for printing and print shops.'], ['svg', 'SVG', 'Vector. Websites and design apps.'], ['eps', 'EPS', 'Vector. Sign, vinyl, and embroidery shops.'], ['png', 'PNG', '6400 \u00d7 1648 image. Social posts, docs, email.']];
  function bgCss(b) { return b === 'chk' ? 'background-color:#fff;background-image:linear-gradient(45deg,#E5E7EB 25%,transparent 25%,transparent 75%,#E5E7EB 75%),linear-gradient(45deg,#E5E7EB 25%,transparent 25%,transparent 75%,#E5E7EB 75%);background-size:14px 14px;background-position:0 0,7px 7px' : 'background:' + b; }
  function e$(s) { return document.getElementById(s); }
  function h(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function toast(m, err) { try { showToast(m, err); } catch (x) {} }

  var SM = 'https://optimuminfluencemedia.smugmug.com/Commercial/STORM-Basement-Waterproofing-Master-Folder/';
  var PHOTOS = [["October 2026 photo series", "October-2026-photo-series"], ["September Photo Series 2026", "Sept-2026-photo-series-"], ["August Photo Series 2026", "August-Photo-Series-2026"], ["July Photo Series 2026", "July-Photo-series-2026"], ["June 2026", "June-2026"], ["May Photo Series 2026", "May-Photo-Series-2026"], ["April 2026 photo series", "April-2026-photo-series"], ["March Photo series 2026", "March-Photo-series-2026"], ["Feb 2026 photo series", "Feb-2026-photo-series"], ["Jan 26 Photo Series", "Jan-26-Photo-Series"], ["STORM -Dec 25 Photo Series", "STORM-Nov-25-Photo-Series"], ["STORM - November 2025 Photo Series", "Storm-Nov-25"], ["Storm Oct 25 Photo Series", "Storm-Oct-25-Photo-Series"], ["STORM - September 2025", "Storm-September-2025"], ["Storm - August 2025 Photo Series", "Storm-August-Photo-Series-2025"], ["STORM - July Photo Series 2025", "STORM-July-Photo-Series-2025"], ["Storm Basement June Photo Series", "Storm-Basement-June-Photo-Series-"], ["May 2025 Photo series", "May-2025-Photo-series"], ["Storm April 2025 Photo Series", "Storm-April-Photo-Series"], ["Storm - March Photo Series 2025", "Storm-March-Photo-Series-2025"], ["Storm February 2025", "Storm-February-2025"], ["Storm/FWC - December - 105 Allen Rd", "StormFWC-December-105-Allen-Rd"], ["Storm Basement - November - 4404 Shortsville", "Storm-Basement-November-4404-Shortsville"], ["Storm Basement - October Photo Series", "Storm-Basement-October-Photo-Series"], ["Storm/FWC 135 HighStone Cir", "StormFWC-135-HighStone-Cir"], ["Storm Basement 143 Country Pl Ln", "Storm-Basement-143-Country-Pl-Ln"], ["Storm Basement 1235 Holly Rd.", "Storm-Basement-1235-Holly-Rd"], ["Storm Basement 169 Blackwell Ln", "Storm-Basement-169-Blackwell-Ln"], ["Storm Basement 637 Bangs Rd", "Storm-637-Bangs-Rd"], ["Storm Basement 39 Sandeingham Rd.", "Storm-Basement-39-Sandeingham-Rd"], ["Strom March 24 Photo Series", "Strom-March-24-Photo-Series"], ["Storm Jan Photo Sereis", "Storm-Jan-Photo-Sereis"], ["Storm Photo Series Nov 2023", "Storm-Photo-Series-Nov-2023"], ["Storm - September 2023 Photo Series", "Storm-September-2023-Photo-Series-"], ["Storm Basement Waterproofing Broadcasting Rights", "Storm-Basement-Waterproofing-Broadcasting-Rights"], ["Storm basement waterproofing Photo - 333 Long", "Storm-basement-waterproofing-Photo-333-Long-"]];
    var PCOVER = {"October-2026-photo-series":"i-Khxvk3w","Sept-2026-photo-series-":"i-jbwVP8n","August-Photo-Series-2026":"i-r2HRM8N","July-Photo-series-2026":"i-mH8vjk2","June-2026":"i-dMSpRrT","May-Photo-Series-2026":"i-8TwjR5L","April-2026-photo-series":"i-qnWFB8h","March-Photo-series-2026":"i-nKxVc6p","Feb-2026-photo-series":"i-Wmkz5zc","Jan-26-Photo-Series":"i-qfK49P8","STORM-Nov-25-Photo-Series":"i-xqh2MMK","Storm-Nov-25":"i-LccnFcq","Storm-Oct-25-Photo-Series":"i-4chw9VQ","Storm-September-2025":"i-4FxvRHZ","Storm-August-Photo-Series-2025":"i-GHfWvfG","STORM-July-Photo-Series-2025":"i-BzJK9Hm","Storm-Basement-June-Photo-Series-":"i-RQLzP4z","May-2025-Photo-series":"i-MxGBPjr","Storm-April-Photo-Series":"i-7nvqV9t","Storm-March-Photo-Series-2025":"i-8qJ5Mj7","Storm-February-2025":"i-pXNJmFc","StormFWC-December-105-Allen-Rd":"i-7TrHG6B","Storm-Basement-November-4404-Shortsville":"i-tN8Z3zV","Storm-Basement-October-Photo-Series":"i-nkNqdkn","StormFWC-135-HighStone-Cir":"i-9Sb66nr","Storm-Basement-143-Country-Pl-Ln":"i-kZvfmjx","Storm-Basement-1235-Holly-Rd":"i-wqhrLgT","Storm-Basement-169-Blackwell-Ln":"i-mxx7CDf","Storm-637-Bangs-Rd":"i-G9gnF7T","Storm-Basement-39-Sandeingham-Rd":"i-w8LFB4d","Strom-March-24-Photo-Series":"i-4fG2gZG","Storm-Jan-Photo-Sereis":"i-vdZSPNx","Storm-Photo-Series-Nov-2023":"i-nDD2s9D","Storm-September-2023-Photo-Series-":"i-M98vQqh","Storm-Basement-Waterproofing-Broadcasting-Rights":"i-T2dFMPS","Storm-basement-waterproofing-Photo-333-Long-":"i-dhWxxkg"};
  function smThumb(ic) { return ic ? 'https://optimuminfluencemedia.smugmug.com/photos/' + ic + '/0/M/' + ic + '-M.jpg' : ''; }
  var VIDEOS = [["Storm 3101 west ridge rd", "i-ZGs2C6H"], ["STORM - 121 walker lake", "i-s9hMxjH"], ["STORM video 3", "i-7R7KV3q"], ["STORM video 4", "i-9VjHsVJ"], ["STORM video 5", "i-cKCDRDj"], ["STORM video 6", "i-x9Fmtsk"], ["Storm-315 South Pearl", "i-XqhJthj"], ["Storm 5978 Marrowback Video", "i-k6dNDWs"], ["STORM video 9", "i-sWQQBqc"], ["STORM video 10", "i-jkWKC3f"], ["Storm 587 Plank Rd", "i-jdnmv4g"], ["Storm - 105 Stonehedge", "i-WfF5m92"], ["Storm - 4969 Walnut v3", "i-wkGppQ8"], ["Storm - 199 North Main", "i-vSJxmr9"], ["STORM - 25 Highwood RD F", "i-8F9CPBJ"], ["4 Dahlia Drive FULL", "i-ZRz7px3"], ["STORM video 17", "i-bZT2Tjv"], ["STORM video 18", "i-sC99pN7"], ["Storm - 37 Cliffordale par", "i-fCXjSLp"], ["STORM - 49 Browns AVE FU", "i-hz7zDFr"], ["STORM video 21", "i-FjMQ2SL"], ["STORM - 127 Canadaguia Ave", "i-nXcXFZG"], ["Storm - Client Testimonial", "i-LBKM7xP"], ["Storm Service Highlight FULL", "i-x5kdpW8"], ["STORM video 25", "i-LRBGMJq"], ["770 Monroe.v2", "i-3mQr4Q2"], ["STORM video 27", "i-8GVH29r"], ["Storm 3308_2", "i-JXw6k8t"], ["STORM video 29", "i-9CcqDzQ"], ["STORM - 282 Euler FULL", "i-ZWQZvvs"], ["Storm - 34 Georgetown Lane", "i-ptjXNBL"], ["STORM Testimonial - 4103 R", "i-X35xtwR"], ["Storm FWC_3", "i-RwgndSt"], ["STORM video 34", "i-NRjLvKv"], ["Storm 4403 Shortsville", "i-6bp2Q6J"], ["STORM video 36", "i-NGFvdkF"], ["Storm FWC-135 High stone", "i-sK2gj5q"], ["STORM - 143 Country Pl L", "i-BwBhD2m"], ["STORM video 39", "i-p6G3qV8"], ["Storm Demo Day", "i-Fkq5n9R"], ["STORM 169 Blackwell Ln", "i-HN9Jn8f"], ["STORM FULL v2", "i-N65n8D7"], ["Informational 1", "i-bDScxbN"], ["Informational 3", "i-466d3dH"], ["Informational 2", "i-xdDwwF6"], ["STORM video 46", "i-WvczVsV"], ["STORM video 47", "i-PPxCjmX"], ["STORM video 48", "i-24jTLcg"], ["STORM video 49", "i-tj7dstN"], ["STORM video 50", "i-r4CsLdX"], ["STORM video 51", "i-htQvG4t"], ["STORM video 52", "i-HsqJdkv"], ["STORM video 53", "i-TcdBZSD"], ["STORM video 54", "i-rNQpjQf"], ["STORM video 55", "i-dkMdTJ8"], ["STORM video 56", "i-p7Tm4JQ"], ["STORM video 57", "i-B2R59Hv"], ["Who is dave crawford", "i-sjZrf83"], ["STORM video 59", "i-cvMzK8N"], ["STORM video 60", "i-Ks7bLFR"], ["STORM video 61", "i-3QHJdFw"], ["STORM video 62", "i-BhccVWr"], ["STORM video 63", "i-NDvsFng"], ["STORM video 64", "i-7ZS6xsT"], ["STORM video 65", "i-hfKtjH5"], ["Storm Blooper", "i-vVkw74B"], ["Storm OIM Testimonial", "i-6SCfNLn"], ["STORM video 68", "i-gcPRz6c"], ["Storm May 25 2023", "i-dTtNHRM"], ["STORM APRIL 18", "i-gJKw9st"], ["Storm April 3 23", "i-rb48N5B"], ["Storm March 22", "i-rC9Lw5j"], ["Storm March 8", "i-QxXcgdm"], ["Storm Feb 16", "i-pstpNcZ"], ["STORM Reel", "i-zW6j8qx"], ["Storm Testimonial", "i-MPsCGjW"], ["Storm Jan 5", "i-JRKRmHN"], ["Storm Hiring", "i-wzK8Cdb"], ["Storm Basements", "i-gXZLq5q"], ["Storm I-Basement", "i-ggpVxF5"], ["Storm Nov 4", "i-QxD9j3M"], ["Storm Oct 20", "i-m8KHqsj"], ["Storm Oct 7", "i-Qm97TCj"], ["Storm Client Testimonial", "i-6mCBTN9"], ["Storm Sep 6", "i-tpBNG5N"], ["Storm", "i-mDRV6jL"]];

  var st = document.createElement('style'); st.id = 'storm-v91-css';
  st.textContent = '.res-ico { width: 20px; height: 20px; flex: none; }'
    + '#drawer-resources .drawer-item .drawer-chevron { transform: rotate(-90deg); margin-left: auto; }'
    + '#drawer-resources .drawer-item .drawer-count + .drawer-chevron { margin-left: 8px; }'
    + '#drawer-resources .drawer-item .drawer-count { margin-left: auto; }'
    + '#res-list { z-index: 110; background: #F3F4F6; } #res-view { z-index: 120; background: #F3F4F6; }'
    + '.res-title { font-weight: 700; font-size: 17px; }'
    + '.res-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }'
    + '@media (min-width: 560px) { .res-grid { grid-template-columns: 1fr 1fr; } }'
    + '.res-card { display: block; width: 100%; padding: 0; border: 1px solid #E5E7EB; border-radius: 12px; background: #fff; overflow: hidden; text-align: left; }'
    + '.res-card .res-prev { height: 96px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #E5E7EB; }'
    + '.res-card .res-prev img { display: block; max-width: 82%; max-height: 64%; object-fit: contain; }'
    + '.res-card .res-cap { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; font-size: 16px; font-weight: 600; color: #111827; }'
    + '.res-card .res-cap span { color: #9CA3AF; font-size: 20px; line-height: 1; }'
    + '.res-stage { border-radius: 12px; border: 1px solid #E5E7EB; padding: 22px 16px; display: flex; align-items: center; justify-content: center; }'
    + '.res-stage img { display: block; width: 100%; height: auto; }'
    + '.res-note { font-size: 15px; color: #6B7280; margin: 12px 2px 0; }'
    + '.res-dl { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: 54px; margin-top: 16px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; }'
    + '.res-dl svg { width: 22px; height: 22px; flex: none; }'
    + '.res-dlt { display: flex; flex-direction: column; align-items: flex-start; text-align: left; line-height: 1.2; }'
    + '.res-dlt small { font-size: 12px; font-weight: 500; opacity: .85; margin-top: 2px; }'
    + '.res-dl { justify-content: flex-start; padding: 8px 18px; }'
    + '.res-dl2 { margin-top: 10px; background: #fff; color: var(--dark); border: 1px solid #D1D5DB; }'
    + '.res-dl2 svg { stroke: var(--dark); }'
    + '.res-open { display: block; text-align: center; margin-top: 14px; font-size: 15px; font-weight: 600; color: var(--dark); }'
    + '.res-tabs { display: flex; gap: 6px; padding: 4px; background: #E5E7EB; border-radius: 10px; margin-bottom: 14px; }'
    + '.res-tab { flex: 1; min-height: 40px; border: 0; border-radius: 8px; background: transparent; font-size: 15px; font-weight: 600; color: #4B5563; }'
    + '.res-tab.on { background: #fff; color: #111827; box-shadow: 0 1px 3px rgba(0,0,0,.12); }'
    + '.res-sub { font-size: 13px; color: #6B7280; margin: 0 2px 10px; }'
    + '.res-links { background: #fff; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; }'
    + '.res-link { display: flex; align-items: center; gap: 12px; padding: 13px 14px; border-top: 1px solid #F0F1F3; color: #111827; text-decoration: none; font-size: 15px; }'
    + '.res-link:first-child { border-top: 0; } .res-link:active { background: #F3F4F6; }'
    + '.res-link .res-ln { flex: 1; min-width: 0; } .res-link .res-go { flex: none; width: 18px; height: 18px; }'
    + '@keyframes resSlideL { from { transform: translateX(-102%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }'
    + '#res-list, #res-view { background: #fff !important; }'
    + '.res-title { font-weight: 700; font-size: 17px; }'
    + '#res-list .detail-bar, #res-view .detail-bar { display: flex; align-items: center; }'
    + '.res-title { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }'
    + '#res-list .detail-bar, #res-view .detail-bar { position: relative; }'
    + '.res-hlogo { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: block; height: 28px; width: auto; max-width: 40%; object-fit: contain; pointer-events: none; }'
    + '.res-lthumb { flex: none; width: 120px; height: 62px; border-radius: 4px; display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 3px rgba(0,0,0,.18); }'
    + '.res-lthumb img { max-width: 86%; max-height: 70%; object-fit: contain; width: auto !important; height: auto !important; box-shadow: none !important; background: transparent !important; }'
    + '.res-mtabs { margin: 0 0 14px; } .res-mtabs .badge { margin-left: 6px; }'
    + '.res-mcard { cursor: default; } .res-mcard .res-ico { width: 26px; height: 26px; margin-left: 4px; }'
    + '.res-mlink { color: inherit; text-decoration: none; }'
    + '.res-mdl { flex: none; display: inline-flex; align-items: center; gap: 6px; min-height: 40px; padding: 0 14px; border-radius: 10px; background: var(--blue); color: #fff; font-size: 15px; font-weight: 700; text-decoration: none; }'
    + '.res-mdl svg { width: 18px; height: 18px; stroke: #fff; }'
    + '.res-stage { background-clip: padding-box; }'
    + '.res-mthumb { position: relative; flex: none; display: block; width: 96px; height: 64px; border-radius: 6px; overflow: hidden; background: #E5E7EB; }'
    + '.res-mthumb img { display: block; width: 100% !important; height: 100% !important; object-fit: cover; border-radius: 0 !important; box-shadow: none !important; }'
    + '.res-play { position: absolute; left: 50%; top: 50%; width: 28px; height: 28px; margin: -14px 0 0 -14px; border-radius: 999px; background: rgba(15,23,32,.65); }'
    + '.res-play:after { content: ""; position: absolute; left: 11px; top: 8px; border-style: solid; border-width: 6px 0 6px 10px; border-color: transparent transparent transparent #fff; }'
    + '.res-pg.res-in { animation: resSlideL .3s ease both; }';
  document.head.appendChild(st);

  var IMG_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';
  var MEDIA_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg>';
  var FOLDER_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#1F9BD7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>';
  var PLAY_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#1F9BD7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M10 8.5l5 3.5-5 3.5z" fill="#1F9BD7"/></svg>';
  var GO_ICO = '<svg class="res-go" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>';
  var DL_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v11"/><path d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg>';

  function addSection() {
    var dr = e$('drawer'); if (!dr) return false; if (e$('drawer-resources')) return true;
    var sec = document.createElement('div'); sec.className = 'drawer-section'; sec.id = 'drawer-resources';
    sec.innerHTML = '<button class="drawer-section-head" type="button">Resource Center <span class="drawer-chevron">&#9662;</span></button><div class="drawer-items">'
      + '<button class="drawer-item" type="button" data-res-page="logos">' + IMG_ICO + '<span class="drawer-item-name">Logos</span><span class="drawer-count">' + LOGOS.length + '</span><span class="drawer-chevron">&#9662;</span></button>'
      + '<button class="drawer-item" type="button" data-res-page="media">' + MEDIA_ICO + '<span class="drawer-item-name">Media</span><span class="drawer-chevron">&#9662;</span></button>'
      + '</div>';
    var after = e$('drawer-checklists') || e$('drawer-labels'), foot = dr.querySelector('.drawer-foot');
    if (after && after.parentNode === dr) dr.insertBefore(sec, after.nextSibling); else if (foot) dr.insertBefore(sec, foot); else dr.appendChild(sec);
    return true;
  }

  function page(id, z) {
    var v = e$(id); if (!v) { v = document.createElement('div'); v.id = id; v.className = 'detail-overlay res-pg'; document.body.appendChild(v); }
    return v;
  }
  function show(v, kind) {
    v.classList.add('open'); v.scrollTop = 0; v.classList.remove('res-in'); void v.offsetWidth; v.classList.add('res-in');
    try { history.pushState({ overlay: kind }, ''); } catch (x) {}
  }
  function bar(title) { return '<div class="detail-bar"><button class="detail-close" type="button" data-res-close aria-label="Close">&times;</button><div class="res-title">' + h(title) + '</div><img class="res-hlogo" src="' + BASE + 'STORM-logo-color-transparent.svg?v=91" alt=""></div>'; }

  function openLogos() {
    var v = page('res-list'), hh = bar('Logos') + '<div class="detail-body" style="max-width:1100px"><p class="bl-intro">Tap a logo to download it as PDF, SVG, EPS, or PNG.</p><div class="bl-cat">STORM Logo</div><div class="bl-grid">';
    LOGOS.forEach(function (l) { var p = l.name.split(' \u00b7 '); hh += '<div class="bl-card res-lcard" role="button" tabindex="0" data-res-logo="' + l.id + '"><div class="res-lthumb" style="' + bgCss(l.bg) + '"><img src="' + thumb(l) + '" alt="" loading="lazy"></div><div class="bl-info"><div class="bl-bin">' + h(p[0]) + '</div><div class="bl-name">' + h(p[1] || '') + '</div><div class="bl-state">Download files &rsaquo;</div></div></div>'; });
    v.innerHTML = hh + '</div></div>'; show(v, 'res-list');
  }
  function mediaBody(tab) {
    var vid = tab === 'videos', list = vid ? VIDEOS : PHOTOS, hh = '<div class="tabs res-mtabs"><button type="button" class="tab' + (!vid ? ' active' : '') + '" data-res-tab="photos">Photo Series <span class="badge">' + PHOTOS.length + '</span></button><button type="button" class="tab' + (vid ? ' active' : '') + '" data-res-tab="videos">Videos <span class="badge">' + VIDEOS.length + '</span></button></div>'
      + '<p class="bl-intro">' + (vid ? 'Newest first. Download saves the video to your phone. Tap the name to watch it in SmugMug.' : 'Newest first. Each series opens in SmugMug, where every photo has its own Download button.') + '</p>'
      + '<div class="bl-cat">' + (vid ? 'Videos' : 'Photo Series') + '</div><div class="bl-grid">';
    list.forEach(function (it) {
      var url = vid ? SM + 'Storm-Basement-Waterproofing/' + it[1] : SM + it[1], dl = vid ? 'https://optimuminfluencemedia.smugmug.com/photos/' + it[1] + '/0/1920D/' + it[1] + '-1920D.mp4' : '';
      var th = smThumb(vid ? it[1] : PCOVER[it[1]]);
      hh += '<div class="bl-card res-mcard">' + (th ? '<a class="res-mthumb' + (vid ? ' vid' : '') + '" href="' + url + '" target="_blank" rel="noopener"><img src="' + th + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' + (vid ? '<span class="res-play"></span>' : '') + '</a>' : (vid ? PLAY_ICO : FOLDER_ICO))
        + '<a class="bl-info res-mlink" href="' + url + '" target="_blank" rel="noopener"><div class="bl-name">' + h(it[0]) + '</div><div class="bl-state">' + (vid ? 'Watch in SmugMug' : 'Open in SmugMug') + ' &rsaquo;</div></a>'
        + (dl ? '<a class="res-mdl" href="' + dl + '" download target="_blank" rel="noopener">' + DL_ICO + 'Download</a>' : '')
        + '</div>';
    });
    return hh + '</div>';
  }
  function openMedia() {
    var v = page('res-list'); v.innerHTML = bar('Media') + '<div class="detail-body" id="res-media" style="max-width:1100px">' + mediaBody('photos') + '</div>'; show(v, 'res-list');
  }
  function openLogo(id) {
    var l = LOGOS.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    var v = page('res-view');
    v.innerHTML = bar('Logo files') + '<div class="detail-body">'
      + '<div class="res-stage" style="' + bgCss(l.bg) + '"><img src="' + fileUrl(l, 'svg') + '" alt="STORM logo, ' + h(l.name) + '"></div>'
      + '<div class="detail-name">' + h(l.name) + '</div><p class="res-note">' + h(l.note) + ' Vector files scale to any size, from a business card to a truck wrap.</p>'
      + FORMATS.map(function (f, i) { return '<button type="button" class="res-dl' + (i ? ' res-dl2' : '') + '" data-res-dl="' + l.id + '" data-res-fmt="' + f[0] + '">' + DL_ICO + '<span class="res-dlt">Download ' + f[1] + '<small>' + f[2] + '</small></span></button>'; }).join('')
      + '<a class="res-open" href="' + fileUrl(l, 'svg') + '" target="_blank" rel="noopener">Open full size</a></div>';
    show(v, 'res-view');
  }
  function top() { var a = e$('res-view'), b = e$('res-list'); if (a && a.classList.contains('open')) return a; if (b && b.classList.contains('open')) return b; return null; }
  function closeTop(fromPop) { var v = top(); if (!v) return; v.classList.remove('open'); v.innerHTML = ''; if (!fromPop) { try { history.back(); } catch (x) {} } }

  function download(id, ext) {
    var l = LOGOS.filter(function (x) { return x.id === id; })[0]; if (!l) return;
    ext = ext || 'pdf'; var url = fileUrl(l, ext), name = fname(l, ext);
    toast('Downloading ' + name);
    fetch(url, { mode: 'cors' }).then(function (r) { if (!r.ok) throw 0; return r.blob(); }).then(function (b) {
      var u = URL.createObjectURL(b), a = document.createElement('a');
      a.href = u; a.download = name; a.rel = 'noopener'; a.style.display = 'none'; document.body.appendChild(a); a.click();
      setTimeout(function () { URL.revokeObjectURL(u); if (a.parentNode) a.parentNode.removeChild(a); }, 8000);
    }).catch(function () { try { window.open(url, '_blank'); } catch (x) {} toast('Opened the file. Use your browser\'s share or save to keep it.'); });
  }

  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var rh = t.closest('#drawer-resources > .drawer-section-head');
    if (rh) { e.stopImmediatePropagation(); e.preventDefault(); rh.parentElement.classList.toggle('expanded'); return; } /* one toggle only (the app also binds section heads on load) */
    var pg = t.closest('[data-res-page]');
    if (pg) { e.stopImmediatePropagation(); e.preventDefault(); if (pg.getAttribute('data-res-page') === 'logos') openLogos(); else openMedia(); return; }
    var tb = t.closest('[data-res-tab]');
    if (tb) { e.stopImmediatePropagation(); e.preventDefault(); var mb = e$('res-media'); if (mb) { mb.innerHTML = mediaBody(tb.getAttribute('data-res-tab')); var lv = e$('res-list'); if (lv) lv.scrollTop = 0; } return; }
    var lg = t.closest('[data-res-logo]');
    if (lg) { e.stopImmediatePropagation(); e.preventDefault(); openLogo(lg.getAttribute('data-res-logo')); return; }
    var dl = t.closest('[data-res-dl]');
    if (dl) { e.stopImmediatePropagation(); e.preventDefault(); download(dl.getAttribute('data-res-dl'), dl.getAttribute('data-res-fmt')); return; }
    if (t.closest('[data-res-close]')) { e.stopImmediatePropagation(); closeTop(false); return; }
  }, true);
  window.addEventListener('popstate', function () {
    var s = history.state && history.state.overlay;
    var a = e$('res-view'), b = e$('res-list');
    if (a && a.classList.contains('open') && s !== 'res-view') { a.classList.remove('open'); a.innerHTML = ''; }
    if (b && b.classList.contains('open') && s !== 'res-list' && s !== 'res-view') { b.classList.remove('open'); b.innerHTML = ''; }
  });

  var n = 0; (function go() { if (!addSection() && n++ < 40) setTimeout(go, 150); })();
})();

/* v98 (Hark, 2026-11-08): Jobber button in the drawer footer shows the logo only (no "Open Jobber app" text), like CompanyCam */
(function () {
  var st = document.createElement('style');
  st.textContent = '.drawer-jobber[data-jobber] > span { display: none !important; }';
  document.head.appendChild(st);
  function lab() { var b = document.querySelector('.drawer-jobber[data-jobber]'); if (b && !b.getAttribute('aria-label')) b.setAttribute('aria-label', 'Open Jobber app'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', lab); else lab();
  setTimeout(lab, 1500);
})();

/* v99 (Hark, 2026-11-08): "Par" reads "Keep on hand" for the crew (display only; the sheet's Par column is unchanged) */
(function () {
  var st = document.createElement('style');
  st.textContent = 'button.par { white-space: nowrap; }';
  document.head.appendChild(st);
  var busy = false;
  function fix() {
    busy = false;
    document.querySelectorAll('button.par').forEach(function (b) {
      var t = b.textContent;
      if (t === 'Set par') b.textContent = 'Set keep on hand';
      else if (/^Par: /.test(t)) b.textContent = 'Keep on hand: ' + t.slice(5);
    });
    document.querySelectorAll('span').forEach(function (s) { if (s.childNodes.length === 1 && s.textContent === 'Par') s.textContent = 'Keep on hand'; });
    document.querySelectorAll('input.par-input').forEach(function (i) { if (i.placeholder === 'Par') i.placeholder = 'Keep'; });
  }
  function soon() { if (!busy) { busy = true; requestAnimationFrame(fix); } }
  function start() { fix(); try { new MutationObserver(soon).observe(document.body, { childList: true, subtree: true, characterData: true }); } catch (x) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* v100 (Hark, 2026-11-08): menu drawer shows no item counts (cleaner look) */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer .drawer-count, .drawer .drawer-count { display: none !important; }';
  document.head.appendChild(st);
})();

/* v101 (Hark, 2026-11-08): video Download no longer opens a blank tab that hangs. The wrapper page starts the download; the app stays put */
(function () {
  function note(msg) {
    var d = document.createElement('div');
    d.textContent = msg;
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:calc(20px + env(safe-area-inset-bottom));z-index:300;padding:12px 14px;border-radius:12px;background:#0F1720;color:#fff;font:600 15px -apple-system,Roboto,sans-serif;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transition:opacity .25s ease';
    document.body.appendChild(d); requestAnimationFrame(function () { d.style.opacity = '1'; });
    setTimeout(function () { d.style.opacity = '0'; setTimeout(function () { d.remove(); }, 300); }, 4200);
  }
  window.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a.res-mdl'); if (!a) return;
    e.preventDefault(); e.stopImmediatePropagation();
    var url = a.href, ios = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    if (window.top !== window) { try { window.top.postMessage({ storm: 'download', url: url }, '*'); } catch (x) { location.href = url; } }
    else location.href = url;
    note(ios ? 'Starting download. Tap Download if asked; it saves to Files > Downloads.' : 'Downloading video. It shows in your notifications and Downloads.');
  }, true);
})();

/* v102 (Hark, 2026-11-08): Checklists live inside the Resource Center (the old Checklists section is hidden, its rows copied in) */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer-checklists { display: none !important; } #drawer-resources img.chk-ico-img { width: 24px; height: 24px; max-width: none; object-fit: contain; flex: none; }';
  document.head.appendChild(st);
  var tries = 0;
  function move() {
    var res = document.getElementById('drawer-resources'), chk = document.getElementById('drawer-checklists');
    var box = res && res.querySelector('.drawer-items');
    if (!box || !chk) { if (++tries < 40) setTimeout(move, 250); return; }
    if (box.querySelector('[data-drawer-checklist]')) return;
    chk.querySelectorAll('[data-drawer-checklist]').forEach(function (b) {
      var c = b.cloneNode(true);
      /* v104: line icons in the same style as the camera and cart (Hilti TE-3000 jackhammer for tools, box truck for the pre check) */
      var SV = '<svg class="drawer-chk-ico" viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
      var ic = { 'tools': SV + '<path d="M3 5h4M17 5h4"/><path d="M7 3.5h10v3l-1.2 8.5H8.2L7 6.5z"/><path d="M10 15h4v2.5h-4z"/><path d="M11 17.5v3l1 2 1-2v-3"/><path d="M7.5 9C4.5 10 3.5 13 4.5 17"/></svg>',
                 'box-truck': SV + '<path d="M2 5h12v11H2z"/><path d="M14 9h4.2l3.3 4v3H14"/><circle cx="6" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/><path d="M8 16h7.5"/></svg>' }[c.getAttribute('data-drawer-checklist')], old = c.querySelector('svg');
      if (ic && old) { old.insertAdjacentHTML('beforebegin', ic); old.remove(); }
      if (!c.querySelector('.drawer-chevron')) c.insertAdjacentHTML('beforeend', '<span class="drawer-chevron">&#9662;</span>');
      box.appendChild(c);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', move); else move();
  setTimeout(move, 1800);
})();

/* v113 (Hark, 2026-11-08): store logos in the drawer redrawn as line icons in the same family as the camera, cart and Resource Center icons
   (24-unit grid, 2-unit dark stroke, round caps): each brand's mark plus its name in matching single-line letters. Replaces v106-v112. */
(function () {
  var P = {"Hilti":[60.6,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2.5\"/><path d=\"M9 9.5v5M15 9.5v5M9 12h6\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(42.05 7.50) scale(0.75)\" d=\"M0 0V12H6\" stroke-width=\"2.27\"/><path transform=\"translate(50.45 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(59.60 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/>"],"AutoZone":[98.55,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><path d=\"M2.5 17L6 7\"/><path d=\"M6.5 17L10 7\"/><path d=\"M12 7h9l-8.5 10H21\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 12L3.5 0L7 12M1.3 8H5.7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M0 0V8C0 10.2 1.5 12 3.5 12S7 10.2 7 8V0\" stroke-width=\"2.27\"/><path transform=\"translate(47.30 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(56.45 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(65.60 7.50) scale(0.75)\" d=\"M0 0H7L0 12H7\" stroke-width=\"2.27\"/><path transform=\"translate(74.75 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(83.90 7.50) scale(0.75)\" d=\"M0 12V0L7 12V0\" stroke-width=\"2.27\"/><path transform=\"translate(93.05 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/>"],"Home Depot":[112.35,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"rotate(-45 12 12)\"><path transform=\"translate(8.38 4.70) scale(0.25)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"3.00\"/><path transform=\"translate(11.25 4.70) scale(0.25)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"3.00\"/><path transform=\"translate(14.12 4.70) scale(0.25)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"3.00\"/><path transform=\"translate(3.47 9.48) scale(0.42)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.26\"/><path transform=\"translate(8.18 9.48) scale(0.42)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.26\"/><path transform=\"translate(12.88 9.48) scale(0.42)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.26\"/><path transform=\"translate(18.01 9.48) scale(0.42)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.26\"/><path transform=\"translate(5.05 16.18) scale(0.27)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.96\"/><path transform=\"translate(8.15 16.18) scale(0.27)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.96\"/><path transform=\"translate(10.99 16.18) scale(0.27)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.96\"/><path transform=\"translate(13.96 16.18) scale(0.27)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.96\"/><path transform=\"translate(17.06 16.18) scale(0.27)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.96\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(47.30 7.50) scale(0.75)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(57.20 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(70.62 7.50) scale(0.75)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.27\"/><path transform=\"translate(79.78 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(88.18 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.27\"/><path transform=\"translate(96.95 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(106.10 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/>"],"RichTech":[92.62,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><circle cx=\"7\" cy=\"12\" r=\"3.2\" fill=\"#0F1720\"/><circle cx=\"17.3\" cy=\"5.5\" r=\"2.5\"/><circle cx=\"17.3\" cy=\"18.5\" r=\"2.5\"/><path d=\"M9.8 10.4l5.3-3.4\"/><path d=\"M9.8 13.6l5.3 3.4\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0M3.5 6.5L6.8 12\" stroke-width=\"2.27\"/><path transform=\"translate(37.77 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(41.67 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(50.67 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(59.82 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(68.97 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(77.38 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(86.38 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/>"]};
  var st = document.createElement('style'); st.textContent = '.drawer-brand-ico { flex: none; display: block; }'; document.head.appendChild(st);
  function svg(k) { var W = P[k][0], w = (W * 20 / 24).toFixed(1);
    return '<svg class="drawer-brand-ico" width="' + w + '" height="20" viewBox="0 0 ' + W + ' 24" aria-hidden="true"><g fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + P[k][1] + '</g></svg>'; }
  function run() {
    var dr = document.getElementById('drawer'); if (!dr) return false;
    dr.querySelectorAll('[data-drawer-supplier], [data-drawer-labels]').forEach(function (b) {
      var k = b.getAttribute('data-drawer-supplier') || b.getAttribute('data-drawer-labels'); if (!P[k]) return;
      var old = b.querySelector(':scope > img, :scope > .drawer-brand-tile, :scope > svg.drawer-brand-ico');
      if (old && !old.hasAttribute('data-v113')) { old.insertAdjacentHTML('beforebegin', svg(k)); old.previousSibling.setAttribute('data-v113', '1'); old.remove(); }
    });
    return true;
  }
  var n = 0; (function go() { run(); if (++n < 30) setTimeout(go, 300); })();
  var dr0 = setInterval(function () { var dr = document.getElementById('drawer'); if (!dr) return; clearInterval(dr0); new MutationObserver(function () { run(); }).observe(dr, { childList: true, subtree: true }); }, 400);
})();

/* v110 (Hark, 2026-11-08): STORM logo centered in the pull-out drawer header (the X stays on the right) */
(function () {
  var st = document.createElement('style');
  st.textContent = '.drawer-head { position: relative; justify-content: center; min-height: 60px; box-sizing: border-box; }'
    + ' .drawer-head img { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); flex: none !important; max-width: calc(100% - 120px) !important; object-position: center !important; }'
    + ' .drawer-head .drawer-close { margin-left: auto; position: relative; z-index: 1; }';
  document.head.appendChild(st);
})();

/* v114 (Hark): store logos = option 7 (app-icon square + name; Home Depot uses its diagonal THE HOME DEPOT box). Restored v96 photo centering below after a stale overwrite. */
/* v96 (Hark, 2026-11-08): Item details photo auto-centering. Some product photos have blank space baked in on one side,
   so the product sat left or right of center. On open, trim the blank margins and re-pad evenly so the product is centered.
   Works for photos whose host allows it (Drive/Google); any other photo is left exactly as it was. */
(function () {
  var cache = {};
  function srcFor(u) {
    var m = /drive\.google\.com\/thumbnail\?id=([\w-]+)(?:&(?:amp;)?sz=(\w+))?/.exec(u);
    if (m) return 'https://lh3.googleusercontent.com/d/' + m[1] + '=s0';
    m = /drive\.google\.com\/(?:uc\?(?:export=\w+&)?id=|file\/d\/)([\w-]+)/.exec(u);
    if (m) return 'https://lh3.googleusercontent.com/d/' + m[1] + '=s0';
    return u;
  }
  function trim(im) {
    var w = im.naturalWidth, h = im.naturalHeight; if (!w || !h) return null;
    var c = document.createElement('canvas'); c.width = w; c.height = h;
    var x = c.getContext('2d'); x.drawImage(im, 0, 0);
    var d = x.getImageData(0, 0, w, h).data; /* throws if the host blocks it */
    function px(i, j) { var k = (j * w + i) * 4; return [d[k], d[k + 1], d[k + 2], d[k + 3]]; }
    var cs = [px(0, 0), px(w - 1, 0), px(0, h - 1), px(w - 1, h - 1)];
    var transparent = cs.every(function (p) { return p[3] < 20; });
    var bg = [0, 1, 2].map(function (n) { return Math.round((cs[0][n] + cs[1][n] + cs[2][n] + cs[3][n]) / 4); });
    if (!transparent && (bg[0] + bg[1] + bg[2]) < 600) return null; /* not a plain light background: leave it */
    var cx = new Array(w).fill(0), cy = new Array(h).fill(0), tot = 0;
    for (var j = 0; j < h; j++) for (var i = 0; i < w; i++) {
      var k = (j * w + i) * 4, on;
      if (transparent) on = d[k + 3] > 24;
      else on = d[k + 3] > 24 && (Math.abs(d[k] - bg[0]) + Math.abs(d[k + 1] - bg[1]) + Math.abs(d[k + 2] - bg[2])) > 45;
      if (on) { cx[i]++; cy[j]++; tot++; }
    }
    if (!tot) return null;
    var cut = tot * 0.002; /* ignore stray specks and dust at the edges */
    function lo(a) { var s = 0; for (var n = 0; n < a.length; n++) { s += a[n]; if (s > cut) return n; } return 0; }
    function hi(a) { var s = 0; for (var n = a.length - 1; n >= 0; n--) { s += a[n]; if (s > cut) return n; } return a.length - 1; }
    var minX = lo(cx), maxX = hi(cx), minY = lo(cy), maxY = hi(cy);
    if (maxX < 0) return null;
    var bw = maxX - minX + 1, bh = maxY - minY + 1;
    var offX = Math.abs((minX + maxX) / 2 - w / 2) / w, offY = Math.abs((minY + maxY) / 2 - h / 2) / h;
    if (offX < 0.025 && offY < 0.025) return null; /* already centered */
    var pad = Math.round(Math.max(bw, bh) * 0.06);
    var o = document.createElement('canvas'); o.width = bw + pad * 2; o.height = bh + pad * 2;
    var ox = o.getContext('2d');
    if (!transparent) { ox.fillStyle = 'rgb(' + bg.join(',') + ')'; ox.fillRect(0, 0, o.width, o.height); }
    ox.drawImage(c, minX, minY, bw, bh, pad, pad, bw, bh);
    return transparent ? o.toDataURL('image/png') : o.toDataURL('image/jpeg', 0.92);
  }
  function fix(img) {
    var orig = img.getAttribute('data-ctr-src') || img.getAttribute('src'); if (!orig || /^data:/.test(orig)) return;
    if (img.getAttribute('data-ctr') === orig) return;
    img.setAttribute('data-ctr', orig); img.setAttribute('data-ctr-src', orig);
    function apply(v) { if (v && img.getAttribute('data-ctr') === orig && img.isConnected) img.src = v; }
    if (orig in cache) { apply(cache[orig]); return; }
    var t = new Image(); t.crossOrigin = 'anonymous';
    t.onload = function () { var v = null; try { v = trim(t); } catch (e) { v = null; } cache[orig] = v; apply(v); };
    t.onerror = function () { cache[orig] = null; };
    t.src = srcFor(orig);
  }
  function scan() { document.querySelectorAll('#detail img.detail-photo').forEach(function (im) { var s = im.getAttribute('src'); if (s && !/^data:/.test(s) && im.getAttribute('data-ctr-src') !== s) { im.removeAttribute('data-ctr'); im.removeAttribute('data-ctr-src'); } fix(im); }); }
  if (typeof openDetail === 'function') { var _o = openDetail; openDetail = function () { var r = _o.apply(this, arguments); try { scan(); } catch (e) {} return r; }; }
  try { new MutationObserver(function () { try { scan(); } catch (e) {} }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();

/* v116 (Hark, 2026-11-08): drawer store rows: 20px app-icon square in the icon column, brand name (line lettering) in the name column so it lines up with the text on the rows above. Overrides the v113/v114 combined icon. */
(function () {
  var I = {"Hilti":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2.5\"/><path d=\"M9 9.5v5M15 9.5v5M9 12h6\"/></g>","AutoZone":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><path d=\"M2.5 17L6 7\"/><path d=\"M6.5 17L10 7\"/><path d=\"M12 7h9l-8.5 10H21\"/></g>","Home Depot":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"rotate(-45 12 12)\"><path transform=\"translate(8.38 4.70) scale(0.25)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"3.00\"/><path transform=\"translate(11.25 4.70) scale(0.25)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"3.00\"/><path transform=\"translate(14.12 4.70) scale(0.25)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"3.00\"/><path transform=\"translate(3.47 9.48) scale(0.42)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.26\"/><path transform=\"translate(8.18 9.48) scale(0.42)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.26\"/><path transform=\"translate(12.88 9.48) scale(0.42)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.26\"/><path transform=\"translate(18.01 9.48) scale(0.42)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.26\"/><path transform=\"translate(5.05 16.18) scale(0.27)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.96\"/><path transform=\"translate(8.15 16.18) scale(0.27)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.96\"/><path transform=\"translate(10.99 16.18) scale(0.27)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.96\"/><path transform=\"translate(13.96 16.18) scale(0.27)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.96\"/><path transform=\"translate(17.06 16.18) scale(0.27)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.96\"/></g>","RichTech":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><circle cx=\"7\" cy=\"12\" r=\"3.2\" fill=\"#0F1720\"/><circle cx=\"17.3\" cy=\"5.5\" r=\"2.5\"/><circle cx=\"17.3\" cy=\"18.5\" r=\"2.5\"/><path d=\"M9.8 10.4l5.3-3.4\"/><path d=\"M9.8 13.6l5.3 3.4\"/></g>"}, N = {"Hilti":[32.6,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(14.05 7.50) scale(0.75)\" d=\"M0 0V12H6\" stroke-width=\"2.27\"/><path transform=\"translate(22.45 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(31.60 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/>"],"AutoZone":[70.55,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 12L3.5 0L7 12M1.3 8H5.7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M0 0V8C0 10.2 1.5 12 3.5 12S7 10.2 7 8V0\" stroke-width=\"2.27\"/><path transform=\"translate(19.30 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(28.45 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(37.60 7.50) scale(0.75)\" d=\"M0 0H7L0 12H7\" stroke-width=\"2.27\"/><path transform=\"translate(46.75 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(55.90 7.50) scale(0.75)\" d=\"M0 12V0L7 12V0\" stroke-width=\"2.27\"/><path transform=\"translate(65.05 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/>"],"Home Depot":[84.35,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(19.30 7.50) scale(0.75)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(29.20 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(42.62 7.50) scale(0.75)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.27\"/><path transform=\"translate(51.77 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(60.17 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.27\"/><path transform=\"translate(68.95 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(78.10 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/>"],"RichTech":[64.62,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0M3.5 6.5L6.8 12\" stroke-width=\"2.27\"/><path transform=\"translate(9.77 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(13.67 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(22.67 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(31.82 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(40.97 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(49.37 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(58.37 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/>"]};
  var G = '<g fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
  var st = document.createElement('style');
  st.textContent = '.drawer-item .v116-ico { width: 20px; height: 20px; flex: none; display: block; } .drawer-item .drawer-item-name.v116-name { font-size: 16px !important; color: inherit !important; display: flex; align-items: center; } .v116-name svg { display: block; flex: none; }';
  document.head.appendChild(st);
  function run() {
    var dr = document.getElementById('drawer'); if (!dr) return;
    dr.querySelectorAll('[data-drawer-supplier], [data-drawer-labels]').forEach(function (b) {
      var k = b.getAttribute('data-drawer-supplier') || b.getAttribute('data-drawer-labels'); if (!I[k] || b.getAttribute('data-v116')) return;
      var old = b.querySelector(':scope > img, :scope > .drawer-brand-tile, :scope > svg.drawer-brand-ico'); var nm = b.querySelector(':scope > .drawer-item-name');
      if (!old || !nm) return;
      old.insertAdjacentHTML('beforebegin', '<svg class="v116-ico" viewBox="0 0 24 24" aria-hidden="true">' + G + I[k] + '</g></svg>');
      old.remove();
      var W = N[k][0];
      nm.classList.add('v116-name'); nm.setAttribute('aria-label', k);
      nm.innerHTML = '<svg width="' + (W * 20 / 24).toFixed(1) + '" height="20" viewBox="0 0 ' + W + ' 24" aria-hidden="true">' + G + N[k][1] + '</g></svg>';
      b.setAttribute('data-v116', '1');
    });
  }
  var n = 0; (function go() { try { run(); } catch (e) {} if (++n < 40) setTimeout(go, 250); })();
  try { new MutationObserver(function () { try { run(); } catch (e) {} }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();

/* v117 (Hark): restored v92-v116 after a stale overwrite; kept the other session's v97/v98 hi-res photos. */
/* v97 (Hark, 2026-11-08): item photos load at full original size (Drive thumbnails were capped at 400 px wide), on the list and in Item details.
   v98: 130 items use 1000-1200 px supplier photos hosted in assets/items/ (keyed by the sheet's Drive photo id; sheet untouched). */
(function () {
  var HR = {"1XrnT9bAPXX1RU7seZ4mEONpyTZq29Y7v":"hd-01","1h_mHBEokyfJSOANbdcaBepJDVNUq1qTe":"hd-02","1ZGZ_Y4YKr25dBR2xk53F8EfHBBl1NgSk":"hd-03","14HqmTfs1rrhmVy3QCODgOvtj--TrJUQI":"hd-04","1KpIKv6yfyZgGv0nHb34S9wwL4NahgZv9":"hd-05","1AzSDwkFF-SHp4TpEBj_eKFOP64MdBtME":"hd-06","1PZbP5sJcTq3OkmwE6-cYilULJ0fD_d8I":"hd-07","1toVDzZdW4IlRTJFwIlCv03xi3r-pXz1k":"hd-08","15ha65VykDoNhMBlC05dYXuCW3ZWqQKlX":"hd-09","1Vys2Ib6ncLkwRIGiU6oJVE5hBYngFwMF":"hd-10","1LnYEIBUsD56uSJQWEyT0yQa6VUwXuPAy":"hd-11","1arAsBiZghKYN2yewA4HMhlDUz6bLDWSN":"hd-12","1cNV1c0-xPh82OPKIAtdmNkgJqVYzyV4A":"hd-13","1-ItJ8PZPq8RcADn3RfEwA2ybAeo9G5Tp":"hd-14","17uI2My6rt7mLdizGoalpA8cosMzxhPkR":"hd-15","1EJVDtHG1HsuHdsZA-QNhuZfUFgI2WqJb":"hd-16","1cxuKJ_7eMKIGW-CtbhCvezwigbICPIHL":"hd-17","1lW5kiRY8HRjEKbMigu4QJZW7JyPUOEG8":"hd-18","1GZBQ6qP4w3ykUuqxq6siDodU2hT_1pD_":"hd-20","1cNt-yB1TpnfpO4nLY_B5eG62tviphMrg":"hd-21","1FGlcpjd0Y1hlciwQSoqSUc5euToiGior":"hd-22","14ugymrUnuOBFzZCCX3tQBO3sImTltJs8":"hd-23","1O7INSzGZOxVHQOtARGUAKJeUwsZM1Zcp":"hd-24","1HJ2Uho_MKS3QG5j6ivi23SezggxWYJQs":"hd-25","17wrCR-jWHjcRwEuJNY9su2Kjmlf0i46I":"hd-26","1azs_W7uToE55A3jpgYLqxygu5F0zbbUz":"hd-27","1N1ERDTjG-c24Z8qEUm4srDgqaGyrpImL":"hd-28","1DpaI5y-JVteKrNwyGHm3KES757Syd_2m":"hd-29","12CrnhKlNcqTpqlvaGA0FHCSvXe_Yk_H7":"hd-30","1jwzzmXb6X0GFJEfO1IqjfJgTkoj15EwY":"hd-31","1HwZM_yyH3t_tfOAwWCKa8tO97PtA-fob":"hd-32","1MVe1u-1T3D01QSRG2H3kLycHu_s2O4cp":"hd-33","1QXv44fpdNtWtqcPmLIpWQn0P944VkVdq":"hd-34","1SZpciVzeupyvsC_nvFGza50Wb1ascUt1":"hd-35","1YU3DPquOTdQEBONs2G5P-HTHTqn4hopb":"hd-36","1jLM3JVcR_CQfzLiqQutlQLdb5uJ6ULj6":"hd-37","1ud5SPwIdEJrBTsGC5D6LoXNgEMSzKU1z":"hd-38","1BRqUJgX1b_cf24Ym8Hd781-B74b1MTRO":"hd-39","1pGCxFyxVxtwcpwUaHczw43q9wCk0TodK":"hd-40","1MWCMCPZHD0a6MH4EyLvvPu-eXYeuXbuG":"hd-41","1EL6S0_7Xzq6fD_OZsBpINyOqQ6ZlPIot":"hd-42","1JmdR-VJGgt6bUK_CqeK0EOhIsBS6Sb8V":"hd-43","1KHuiH6YySsp_JqhFM8LlbC_gfMVEdV3w":"hd-44","1ipJ4AqheAw2sdYaiuVS-FsfkBF2fGL3N":"hd-45","1MG_zqPN2WaHfATemeoajYmKYfOF6vVGE":"hd-46","15ppQv9eQXc6-hrU-AjcdpRHdfxuHyd-n":"hd-47","1owL7R4eLZhwHPbLX49M7k-PVQ9LIoPzf":"hd-49","1CslEqB7UuQrTevsD_ycZKptdRMwmrzGW":"hd-50","17elHZpFENuqxU74qIcjjcejJAxXbdj23":"hd-51","1DuEfHpUVEv7iafrZlVTAaVC1mLYdcojk":"hd-52","1ZH_0Xvsq9UqZjh8UVwDFZOWLcrlKf4oZ":"hd-53","1gSTIDxHdEdPaGCQJEtMnwd7P6p4rrBQc":"hd-55","1UdEAV8a1NzK_-abrFN_ZpQX51Pu9S04C":"hd-56","1Z9CMnYgmvlZD-7B-C4FXZqaKZEYZucHz":"hd-57","1DyW1X3trZIPynVBPyKiysc9eciCd3cS1":"hd-58","1SHOfqAHPb7mx9azgV_lmSwEkb-C2sGQl":"hd-59","1uBWo--jYpkuFhxB4EIIs0hvhpw8JdMVQ":"hd-60","1WFMdMSJmrLg9NDSh4sWBCpVUz_KN1Sfl":"hd-61","1JQyZ0jSk3Bdfd1yf5ZfgHEfjfxdZOMJ_":"hd-62","1UVJ_gbvlCLjNDKG0YRC9yS48342nB3xz":"hd-63","1tkOVklM6sCy0biAPrv-rVo02sqhe299A":"hd-64","1GDFrN0b2xA6VXhvYDP-DLgjCJDTryMw9":"hd-65","1x2J9one3Yt9o83bHtuunAl8F0SABtBok":"hd-66","1UTmdg45MyogGrs4JVwsFKuNFbNySHj9I":"hd-67","1z88c9HJF7JRCUhgZoAjuMImGel9eO-rx":"hd-68","1BnhxgmRaUA0_okdFhDlmCs4yTxI-9sFc":"hd-69","19RLOESpknqWiIG7EqCvzDtuZ85Y1Sipu":"hd-70","13fagaKbSvDWFwLAabWyOEUZqVL0_dS-W":"hd-71","1n4Jz39krQE3UHAelqP8dqUQkcVpgTCsR":"hd-72","1yYnGnHerlJpZAdlN-oAjc0SV77eY3VEH":"hd-73","1wl1nYVz_mWNc9ZjsLgQ20U5QEO1fGzo6":"hd-74","1_GevpB20Yp_OUe2Kmo-bapkVKxsD5_ue":"hd-75","1fAiGqG4dagkDrZl3swjeGWkOwErap-OW":"hd-76","1LOsCVBxJKH2VJIdj-aOG2kg4IQIW2pTD":"hd-78","11Y8uZN_Ik_KrrmUUsZk-dCIAZRUITrmf":"hd-79","1a-Qra6a5QyxoHHoCC0_VBbFraTU0jiP_":"hd-80","1SP2ADAjNflt6iOalyD-zFlQk80dIFYHS":"hd-81","1BDg0ordap3EVg6ECUG8JLpZ-TbVsZOK5":"hd-82","1USFKt4gFkoQMuF-HuxESpK7YToiAizo2":"hd-83","1l26qL3tl8Knq65hiGnH0fZrh-l9lg0MV":"hd-84","1xFDnEmlaNmggx9iISrwmwzI9qK2bczyO":"hd-85","1IFou487ZCgew-zCQ3gE-OUbXtHi_0Lrb":"hd-86","1Xhe_xepJ4NrLKLSLkf8SsAlqkJ4FfgFr":"hd-87","1CHlRP9zH_LYu-O682blh1w-wXUgjHdxh":"hd-88","1HZlKVx_85iMDM1-VMlD8zchwBmjn8QVM":"hd-89","19fYWEb_f3Utnmstfu5gHTkBUk4N82yOO":"hd-90","1hIpLmN65dgRlgtZEUT3BFWeEbmvdEWYs":"rt-06","1VF7YeN3jP9umCCwcYd_ixIzXbk8TsL_t":"rt-10","1Xe0lLsa8SK9aBv7CVpooHahWLPtUOkJr":"rt-11","1WUa3c8xqQUHvcPHAtMLgxY5yIryUbJcN":"rt-12","16K1QfT1dLJM6k8nRJIiMFIkURSyE3_ou":"rt-13","1D7nfJTAAzizTkKwXSrooJXbrPM8gtw24":"rt-17","1EKHkaRNd0efVy4NMoD8kCngL5XC3hBq0":"rt-18","1xgt0kYVrD251W8oPv_WpqxLQFwSVaU7n":"rt-19","1LvQsAakqdhIVlAUBcHN9xuLx6sDJiS3P":"rt-21","1Up1LsS9aG_TME11MFIeQGK3wPtfR6OPA":"rt-22","12u9lyeTvIR5iAJWONWN4lhfz_yJ62gGO":"rt-23","1T-2v_XX9glQEViJEJaoRyxOezN8r8jh7":"rt-24","1SD5WNBjxeHsf5NUmnCWA1vfvCceRJbiB":"rt-25","1YZB9BDr9tK0iiV0DJfZFg34IsXuDbzzZ":"rt-29","1-NvlQKVkFfWWmlUzHHq_0p1fR3tbfvba":"rt-30","1PwDKKHlglxE2fXDh6jX4eGC6rEBnJv6s":"rt-33","1eOKnO97wGScOoM7d9IGpjOAq5juGTODm":"rt-34","1ISKFGzEdFGsChB_0tCNxjCVdIkO7ZUDY":"rt-35","18QEIeEBAvZ7Oj4rsoTYdO4befihr-URZ":"rt-36","1IE2GbitK06040mbYb0NvLHNgjlma9v7V":"rt-37","1gehecAiK-Zvwx5uitzhBQVH93XVt-NfJ":"rt-41","1Qxe9hq-KAMynlhlUShmDQm5HvSI1Rcal":"az-01","1G4DhZoMc-z1UOEw1TyusBX0LeqzaeDwQ":"az-02","1qM6kXypMoIihVpxjjL3cJS2NTifq7G5q":"az-03","1OX_qe5PiULD-F0KqexAUw-j6NQuNw305":"az-04","1YbE1-MrGs57MD_pngoRuaqsiGwzRXWDI":"az-05","1pfOAeS0OE24Q9rHBnii6qA-mRwsFdUPy":"az-06","1lI_Cp_rjf_nlnzwxOh8XcEQTDTmO6pw-":"az-07","1DppH33ATMtDAwLZ9Bj-Sis5JSD3D2FjY":"hd-91","1pg-wPvBluJyjF-Ddhdc8pmH1Cc1t73Jf":"hd-92","1aSE3FaGd3HgFRzA93GzIa2d1299RIKRV":"hd-93","1Zj6lTBArAmvXpM2CwzD9KBwoFhRbyLP9":"hd-94","1UgXIFmJ3xMElUS3hc6OHREbgqako4HEp":"hd-95","1D59nCsUpHOsQ2MkqczZk_1XykjxYuqAR":"hd-96","19cA9nnOxncwF9CgA7kB8ggtMQ5ezvRs5":"hd-97","1m-CC42iPKVAm2hVDYf9zNBnB82xOdaYn":"hd-98","1xXpjGVZXSb1Ue7MhxP3Ro4IdHJg0hbWF":"hd-99","1eO696q5Gevh4HeAHO4Q_VcA9CufEaeGW":"hd-100","1_w8SoRqOcSFziMsLdx8GYRHxE2DDu2Ry":"hd-101","1hcN6PLE98gBDvx9uc29vQOSPVS3OFMzh":"hd-102","1YZXyHEGQQCLQq3E9LJ6A5EIX8WZpsoQW":"hd-104","1mKROzot1tnGXLUkUsF1vPsy12D-NFUCK":"hi-01","1f0KS5BZ9aHn93NcK_pNT5OzF1NttwMt2":"hi-02","1-hra5yJVEWDel1smfY2l6vm6KE0fLp7q":"hi-03"};
  function hi(u) {
    var m = /^https:\/\/drive\.google\.com\/thumbnail\?id=([\w-]+)/.exec(u || '');
    if (!m) return null;
    /* v124 (Hark, 2026-11-09): Dave's own photos are back (the v98 supplier swaps showed different pictures). */
    if (HR[m[1]] && window.__v124keepSwap) return 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/items/' + HR[m[1]] + '.jpg?v=1';
    return 'https://lh3.googleusercontent.com/d/' + m[1] + '=s0';
  }
  function up(root) {
    (root.querySelectorAll ? root : document).querySelectorAll('img').forEach(function (im) {
      var s = im.getAttribute('src'), h = hi(s);
      if (h) { im.setAttribute('data-lo', s); im.onerror = function () { if (im.getAttribute('data-lo')) { var lo = im.getAttribute('data-lo'); im.removeAttribute('data-lo'); im.onerror = null; im.src = lo; } }; im.src = h; }
    });
  }
  try { up(document); new MutationObserver(function (ms) { ms.forEach(function (m) { m.addedNodes && m.addedNodes.forEach(function (n) { if (n.nodeType === 1) { if (n.tagName === 'IMG') up(n.parentNode || document); else up(n); } }); if (m.type === 'attributes' && m.target.tagName === 'IMG') { var h = hi(m.target.getAttribute('src')); if (h) m.target.src = h; } }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] }); } catch (e) {}
})();

/* v118 (Hark, 2026-11-09): checklist "Print" button opens the print options (through the app wrapper). Outside the wrapper it still opens the PDF. */
(function () {
  var wrap = false;
  window.addEventListener('message', function (e) { if (e.data && e.data.storm === 'pong') wrap = true; });
  try { if (window.top !== window) window.top.postMessage({ storm: 'ping' }, '*'); } catch (e) {}
  function relabel() { document.querySelectorAll('#chk-view a.chk-open').forEach(function (a) { if (a.textContent !== 'Print') a.textContent = 'Print'; }); }
  try { new MutationObserver(relabel).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('#chk-view a.chk-open') : null; if (!a || !wrap) return;
    var pages = Array.prototype.map.call(document.querySelectorAll('#chk-view img.chk-page'), function (im) { return im.getAttribute('data-chk-zoom') || im.src; });
    if (!pages.length) return;
    e.preventDefault(); e.stopPropagation();
    try { window.top.postMessage({ storm: 'print', pages: pages }, '*'); } catch (x) { window.open(a.href, '_blank'); }
  }, true);
})();

/* v119 (Hark, 2026-11-09): bigger icons in the pull-out drawer (20px -> 26px), all the same size so the names stay lined up */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer .drawer-item > svg, #drawer .drawer-item > .v116-ico, #drawer .drawer-item > .drawer-chk-ico, #drawer .drawer-item > .res-ico, #drawer .drawer-item > .chk-ico-img { width: 26px !important; height: 26px !important; flex: none; }'
    + '#drawer .drawer-item .v116-name svg { height: 24px !important; width: auto !important; }';
  document.head.appendChild(st);
})();

/* v120 (Hark, 2026-11-09): store names in the drawer use the same regular font as every other row (icons stay) */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer .drawer-item .drawer-item-name.v116-name { font-size: 16px !important; font-weight: 400 !important; color: #111827 !important; font-family: inherit !important; display: block; }';
  document.head.appendChild(st);
  function run() {
    document.querySelectorAll('#drawer .drawer-item .v116-name').forEach(function (nm) {
      if (nm.getAttribute('data-v120')) return;
      var k = nm.getAttribute('aria-label') || ''; if (!k) return;
      nm.textContent = k; nm.removeAttribute('aria-label'); nm.setAttribute('data-v120', '1');
    });
  }
  var n = 0; (function go() { try { run(); } catch (e) {} if (++n < 40) setTimeout(go, 250); })();
  try { new MutationObserver(function () { try { run(); } catch (e) {} }).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();

/* v121 (Hark, 2026-11-09): drawer pages slide back out the way they slid in, and the drawer comes back open right where it was.
   Covers Resource Center (Logos, Media, logo files, Checklists) and Bin Labels. Also a slightly larger drawer font. */
(function () {
  var IDS = ['labels', 'chk-view', 'lbl-detail', 'res-list', 'res-view'];
  var st = document.createElement('style');
  st.textContent = '#drawer .drawer-item, #drawer .drawer-item .drawer-item-name, #drawer .drawer-item .drawer-item-name.v116-name { font-size: 17px !important; }'
    + '.v121-ghost { position: fixed !important; inset: 0 !important; z-index: 150 !important; display: block !important; pointer-events: none !important; overflow: hidden !important; background: #fff; will-change: transform, opacity; -webkit-transform: translate3d(0,0,0); }' /* v123 */;
  document.head.appendChild(st);
  function dr() { return document.getElementById('drawer'); }
  function isOpen(el) { return el && el.classList.contains('open') && !el.classList.contains('v121-ghost'); }
  function anyOpen() { return IDS.some(function (id) { return isOpen(document.getElementById(id)); }); }
  /* ---- remember the drawer when one of its pages opens ---- */
  var saved = null;
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest || !t.closest('#drawer')) return;
    if (t.closest('[data-res-page], [data-drawer-labels], [data-drawer-checklist]')) { var d = dr(); saved = { top: d ? d.scrollTop : 0 }; }
  }, true);
  window.addEventListener('popstate', function () {
    if (!saved) return;
    setTimeout(function () {
      if (!saved || anyOpen()) return; var d = dr(); if (!d) return;
      var s = saved; saved = null;
      if (!d.classList.contains('open')) { try { openDrawer(); } catch (x) { return; } }
      d.scrollTop = s.top; requestAnimationFrame(function () { d.scrollTop = s.top; });
    }, 130);
  });
  /* ---- keep a picture of each open page so it can slide out after it closes ---- */
  var snaps = {}, timers = {};
  function snap(el) {
    if (!isOpen(el)) return;
    var c = el.cloneNode(true); c.removeAttribute('id'); c.querySelectorAll('[id]').forEach(function (n) { n.removeAttribute('id'); });
    /* v123: cloned pictures paint at once (lazy ones would show blank while sliding) */
    c.querySelectorAll('img').forEach(function (im) { im.removeAttribute('loading'); im.decoding = 'sync'; });
    snaps[el.id] = { node: c, top: el.scrollTop, w: el.clientWidth };
  }
  function later(el, ms) { clearTimeout(timers[el.id]); timers[el.id] = setTimeout(function () { snap(el); }, ms); }
  function out(id) {
    var s = snaps[id]; delete snaps[id]; if (!s) return;
    var g = s.node; g.className = (g.className || '') + ' v121-ghost'; g.classList.remove('storm-slide-in', 'res-in', 'fx-in');
    /* v123: GPU layer, laid out first, then the exact reverse of the slide-in (same .3s ease), started on the next frame so no frame is dropped */
    g.style.transform = 'translate3d(0,0,0)'; g.style.opacity = '1'; g.style.backfaceVisibility = 'hidden'; g.style.contain = 'layout paint';
    document.body.appendChild(g); g.scrollTop = s.top; void g.offsetWidth;
    requestAnimationFrame(function () {
      try {
        var a = g.animate([{ transform: 'translate3d(0,0,0)', opacity: 1 }, { transform: 'translate3d(-102%,0,0)', opacity: 0 }], { duration: 300, easing: 'ease', fill: 'forwards' });
        a.onfinish = function () { if (g.parentNode) g.remove(); };
      } catch (x) { g.remove(); }
    });
    setTimeout(function () { if (g.parentNode) g.remove(); }, 900);
  }
  var watched = {};
  var mo = new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      var el = m.target; if (!el.id || IDS.indexOf(el.id) < 0) return;
      var was = (m.oldValue || '').split(/\s+/).indexOf('open') >= 0, now = el.classList.contains('open');
      if (now && !was) { later(el, 60); setTimeout(function () { snap(el); }, 700); }
      else if (!now && was) out(el.id);
    });
  });
  function hook() {
    IDS.forEach(function (id) {
      var el = document.getElementById(id); if (!el || watched[id] === el) return; watched[id] = el;
      mo.observe(el, { attributes: true, attributeFilter: ['class'], attributeOldValue: true });
      el.addEventListener('scroll', function () { later(el, 200); }, { passive: true });
      el.addEventListener('click', function () { later(el, 250); });
      /* v122: fresh picture the instant a finger touches the page, so the slide-out always shows what was on screen */
      el.addEventListener('pointerdown', function () { clearTimeout(timers[el.id]); snap(el); }, true);
      if (isOpen(el)) later(el, 60);
    });
  }
  hook();
  try { new MutationObserver(hook).observe(document.body, { childList: true }); } catch (x) {}
})();

/* v122 (Hark, 2026-11-09): Bin Labels and Checklists open over the drawer the same way Resource Center pages do.
   The drawer stays open underneath, so closing a page (X or the phone's back) slides it out and shows the drawer exactly where it was. */
(function () {
  function e$(id) { return document.getElementById(id); }
  var PAGES = ['labels', 'lbl-detail', 'chk-view', 'res-list', 'res-view'];
  function pageOpen() { return PAGES.some(function (id) { var v = e$(id); return v && v.classList.contains('open') && !v.classList.contains('v121-ghost'); }); }
  function drawerOpen() { var d = e$('drawer'); return !!(d && d.classList.contains('open')); }
  /* keep the drawer open when a Bin Labels or Checklist row is tapped */
  var _cd = window.closeDrawer;
  if (typeof _cd === 'function') {
    window.closeDrawer = function () {
      var ev = window.event, t = ev && ev.type === 'click' && ev.target;
      if (t && t.closest && t.closest('#drawer') && t.closest('[data-drawer-labels], [data-drawer-checklist]')) return;
      return _cd.apply(this, arguments);
    };
  }
  /* phone back from Bin Labels lands on the drawer: close the page (the app only did this when the drawer was already shut) */
  window.addEventListener('popstate', function () {
    var s = history.state && history.state.overlay, v = e$('labels');
    if (v && v.classList.contains('open') && s !== 'labels' && s !== 'lbldetail') {
      v.classList.remove('open'); v.innerHTML = '';
      try { if (overlayOpen === 'labels') overlayOpen = null; } catch (x) {}
    }
    /* once every page is closed and the drawer is showing, the next back (or X) closes the drawer as usual */
    setTimeout(function () { if (drawerOpen() && !pageOpen()) { try { overlayOpen = 'drawer'; } catch (x) {} } }, 0);
  });
})();

/* v125 (Hark, 2026-11-09): Item details shows Dave's own photo, upscaled 3x (assets/items-hd/<bin>.jpg). The list keeps the normal photo. Falls back to the normal photo if the sharp one is missing. */
(function () {
  var HD = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/items-hd/';
  function sharp() {
    var bin = (typeof currentDetailBin !== 'undefined') && currentDetailBin; if (!bin) return;
    var u = HD + encodeURIComponent(bin) + '.jpg?v=1';
    document.querySelectorAll('#detail img.detail-photo').forEach(function (im) {
      if (im.getAttribute('data-hd') === bin) return;
      var prev = im.getAttribute('src');
      im.setAttribute('data-hd', bin);
      var t = new Image();
      t.onload = function () { if (im.isConnected && im.getAttribute('data-hd') === bin) { im.removeAttribute('data-ctr'); im.removeAttribute('data-ctr-src'); im.src = u; } };
      t.onerror = function () { /* keep prev */ };
      t.src = u;
    });
  }
  if (typeof openDetail === 'function') { var _o = openDetail; openDetail = function () { var r = _o.apply(this, arguments); try { document.querySelectorAll('#detail img.detail-photo').forEach(function (im) { im.removeAttribute('data-hd'); }); sharp(); setTimeout(sharp, 300); } catch (e) {} return r; }; }
})();

/* v132 (Hark, 2026-11-09): Bin Labels live inside the Resource Center (the whole Bin Labels group moves in, under Media; same rows and taps) */
(function () {
  var st = document.createElement('style');
  st.textContent = '#drawer-resources.expanded > .drawer-items { max-height: 2000px !important; }'
    + '#drawer-resources #drawer-labels { border-bottom: 0; }'
    + '#drawer-resources #drawer-labels > .drawer-section-head { padding: 12px 16px 12px 24px; font-size: 16px; font-weight: 400; color: #111827; justify-content: flex-start; gap: 10px; }'
    + '#drawer-resources #drawer-labels > .drawer-section-head .drawer-chevron { margin-left: auto; }'
    + '#drawer-resources #drawer-labels:not(.expanded) > .drawer-items { max-height: 0 !important; }'
    + '#drawer-resources #drawer-labels.expanded > .drawer-items { max-height: 600px !important; }'
    + '#drawer-resources #drawer-labels .drawer-item { padding-left: 40px; }'
    + '.lbl-ico { width: 20px; height: 20px; flex: none; }';
  document.head.appendChild(st);
  var tries = 0;
  function move() {
    var res = document.getElementById('drawer-resources'), lab = document.getElementById('drawer-labels');
    var box = res && res.querySelector(':scope > .drawer-items');
    if (!box || !lab) { if (++tries < 40) setTimeout(move, 250); return; }
    if (lab.parentNode === box) return;
    var head = lab.querySelector(':scope > .drawer-section-head');
    if (head && !head.querySelector('.lbl-ico')) head.insertAdjacentHTML('afterbegin', '<svg class="lbl-ico" viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>');
    var media = box.querySelector('[data-res-page="media"]');
    if (media && media.nextSibling) box.insertBefore(lab, media.nextSibling); else box.appendChild(lab);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { setTimeout(move, 300); }); else setTimeout(move, 300);
})();

/* v135 (Hark, 2026-11-09): scroll motion on the item list (Dave).
   - Item cards: a soft "bumper" as they come up while scrolling down (rise, slight overshoot, settle).
   - Category titles: the small white line slides in and pushes the title across the black band while it fades in,
     and the black band sweeps out to the right edge, keeping its fade.
   Only runs while the list is being scrolled down, so searching or re-rendering never re-animates what is already on screen. */
(function () {
  if (window.__stormScrollFx) return; window.__stormScrollFx = true;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var css = '#list { overflow-x: clip; }'
    + '/* v139: whole item card slides across exactly like the titles (same distance, speed, easing) */ #list .card.sfx-bump { animation: sfxCardIn 1.3s cubic-bezier(.25,.6,.2,1) both; will-change: transform, opacity; backface-visibility: hidden; }' /* v138: items slide in like the titles; no overshoot or scale, so no jello */
    + '@keyframes sfxCardIn { 0% { opacity: 0; transform: translate3d(-110px,0,0); } 15% { opacity: .15; } 100% { opacity: 1; transform: translate3d(0,0,0); } }'
    + '#list .cat-head.sfx-head { background-repeat: no-repeat; animation: sfxBand 1.3s cubic-bezier(.25,.6,.2,1) both; }'
    + '@keyframes sfxBand { 0% { background-size: 0% 100%; } 100% { background-size: 100% 100%; } }'
    + '#list .cat-head.sfx-head::before { animation: sfxLine 1.3s cubic-bezier(.25,.6,.2,1) both; }'
    + '@keyframes sfxLine { 0% { transform: translateX(-110px); opacity: 0; } 20% { opacity: 1; } 100% { transform: none; opacity: 1; } }'
    + '#list .cat-head.sfx-head > * { animation: sfxTitle 1.3s cubic-bezier(.25,.6,.2,1) both; }'
    + '@keyframes sfxTitle { 0% { transform: translateX(-110px); opacity: 0; } 15% { opacity: .15; } 100% { transform: none; opacity: 1; } }';
  var st = document.createElement('style'); st.id = 'storm-scroll-fx'; st.textContent = css; document.head.appendChild(st);
  var lastY = window.scrollY || 0, down = false, lastScroll = 0;
  window.addEventListener('scroll', function () { var y = window.scrollY || 0; down = y > lastY; lastY = y; lastScroll = Date.now(); }, { passive: true });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target; io.unobserve(el);
      var scrolling = down && (Date.now() - lastScroll < 400);
      var fromBelow = en.boundingClientRect.top > (en.rootBounds ? en.rootBounds.height * 0.55 : window.innerHeight * 0.55);
      if (!scrolling || !fromBelow) return;
      var cls = el.classList.contains('cat-head') ? 'sfx-head' : 'sfx-bump';
      el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls);
      setTimeout(function () { el.classList.remove(cls); }, 1450); /* v136: titles slide slower and farther (Dave) */
    });
  }, { rootMargin: '0px 0px 60px 0px', threshold: 0 });
  function watch() { var l = document.getElementById('list'); if (!l) return; l.querySelectorAll('.card, .cat-head').forEach(function (el) { if (!el.__sfx) { el.__sfx = 1; io.observe(el); } }); }
  function start() {
    var l = document.getElementById('list'); if (!l) { setTimeout(start, 400); return; }
    watch(); new MutationObserver(function () { watch(); }).observe(l, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* v137 (Hark, 2026-11-09, Dave): on first entry into the app, the category titles on screen play the same slide
   (white line pushes the title across, black band sweeps out) about a second after the page fades in. */
(function () {
  if (window.__stormIntroFx) return; window.__stormIntroFx = true;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var st = document.createElement('style');
  st.textContent = '#list .cat-head.sfx-pre { background-size: 0% 100% !important; background-repeat: no-repeat; } #list .cat-head.sfx-pre::before, #list .cat-head.sfx-pre > * { opacity: 0 !important; } #list .card.sfx-cpre { opacity: 0 !important; animation: none !important; }';
  document.head.appendChild(st);
  var pending = false, played = false;
  function visHeads() { var out = []; var hs = document.querySelectorAll('#list .cat-head'); var h = window.innerHeight || 800; for (var i = 0; i < hs.length; i++) { var r = hs[i].getBoundingClientRect(); if (r.bottom > 0 && r.top < h) out.push(hs[i]); } return out; }
  function visAll() { var out = []; var hs = document.querySelectorAll('#list .cat-head, #list .card'); var h = window.innerHeight || 800; for (var i = 0; i < hs.length; i++) { var r = hs[i].getBoundingClientRect(); if (r.bottom > 0 && r.top < h) out.push(hs[i]); } return out; }
  function prep() { if (!pending) return; visAll().forEach(function (el) { el.classList.add(el.classList.contains('card') ? 'sfx-cpre' : 'sfx-pre'); }); } /* v153: item cards on screen wait and slide in with their titles (Dave) */
  function play() {
    if (played) return; played = true; pending = false;
    var all = visAll();
    document.querySelectorAll('#list .cat-head.sfx-pre, #list .card.sfx-cpre').forEach(function (el) { if (all.indexOf(el) < 0) el.classList.remove('sfx-pre', 'sfx-cpre'); });
    var d = 0; all.forEach(function (el) { var card = el.classList.contains('card'), cls = card ? 'sfx-bump' : 'sfx-head'; (function (t) { setTimeout(function () { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); el.classList.remove('sfx-pre', 'sfx-cpre'); setTimeout(function () { el.classList.remove(cls); }, 1500); }, t); })(d); d += card ? 90 : 180; });
  }
  function arm(delay) { if (played || pending) return; pending = true; prep(); var l = document.getElementById('list'); if (l) new MutationObserver(prep).observe(l, { childList: true }); setTimeout(play, delay); }
  window.addEventListener('message', function (e) { var d = e.data; if (d && d.storm === 'wrapMode') arm(2100); });
  /* opened without the wrapper (no loading screen): play a second after the list first appears */
  setTimeout(function () { if (window.parent === window && !pending && !played) { (function waitList(n) { if (document.querySelector('#list .cat-head')) arm(1000); else if (n < 40) setTimeout(function () { waitList(n + 1); }, 250); })(0); } }, 300);
  setTimeout(function () { if (pending && !played) play(); }, 15000);
})();

/* v140 (Hark, 2026-11-09, Dave; redeploy): Media section titles (Photo Series, Videos) use the same title bar as the main page categories: black band fading right, white side line, white uppercase type */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v140-css';
  st.textContent = '#res-media .bl-cat { position: relative; margin: 22px -12px 8px; padding: 9px 12px 9px 28px; border: 0; border-left: 0; border-radius: 0; background: linear-gradient(90deg, #000 0%, #000 55%, rgba(0,0,0,.6) 75%, rgba(0,0,0,0) 96%); font-size: 14px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: #fff; }'
    + '#res-media .bl-cat::before { content: ""; position: absolute; left: 12px; top: 8px; bottom: 8px; width: 4px; border-radius: 2px; background: #fff; }';
  document.head.appendChild(st);
})();

/* v141 (Hark, 2026-11-10, Dave): the side menu uses the opener-button pop. The menu pops in (fade, blur clears, grows to full size) as it slides; its rows pop in from the side, one after another. Opening a section drops its rows down with the same pop (grow from 85%, blur clears, fade). */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v141-css';
  st.textContent = '#drawer { overflow-x: hidden !important; } #drawer.open { animation: drwPop .46s cubic-bezier(.22,.8,.3,1) both; transform-origin: 0 50%; }'
    + '@keyframes drwPop { 0% { opacity: 0; transform: translateX(-40%) scale(.9); filter: blur(6px); } 100% { opacity: 1; transform: none; filter: blur(0); } }'
    + '#drawer.open > * { animation: drwRow .44s cubic-bezier(.22,.8,.3,1) backwards; }'
    + '#drawer.open > :nth-child(1) { animation-delay: .08s; } #drawer.open > :nth-child(2) { animation-delay: .14s; } #drawer.open > :nth-child(3) { animation-delay: .20s; } #drawer.open > :nth-child(4) { animation-delay: .26s; } #drawer.open > :nth-child(5) { animation-delay: .32s; } #drawer.open > :nth-child(6) { animation-delay: .38s; } #drawer.open > :nth-child(n+7) { animation-delay: .44s; }'
    + '@keyframes drwRow { 0% { opacity: 0; transform: translateX(-36px) scale(.85); filter: blur(6px); } 100% { opacity: 1; transform: none; filter: blur(0); } }'
    + '#drawer .drawer-cats > *, #drawer .drawer-items > * { transform: scale(.85); transform-origin: 50% 0; filter: blur(6px); transition: opacity .42s ease, transform .42s cubic-bezier(.22,.8,.3,1), filter .42s ease; }'
    + '#drawer .drawer-supplier.open > .drawer-cats > *, #drawer .drawer-section.expanded > .drawer-items > * { transform: none; filter: blur(0); }'
    + '@media (prefers-reduced-motion: reduce) { #drawer.open, #drawer.open > * { animation: none !important; } }';
  document.head.appendChild(st);
})();

/* v142 (Hark, 2026-11-10, Dave): the side menu closes with the same pop played in reverse (rows leave bottom-up, the menu shrinks, blurs and fades as it slides away). The STORM logo is gone from the menu header. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v142-css';
  st.textContent = '.drawer-head img { display: none !important; } .drawer-head { min-height: 52px !important; }'
    + '#drawer.drw-out { animation: drwPopOut .42s cubic-bezier(.55,0,.75,.2) both; transform-origin: 0 50%; }'
    + '@keyframes drwPopOut { 0% { opacity: 1; transform: none; filter: blur(0); } 100% { opacity: 0; transform: translateX(-40%) scale(.9); filter: blur(6px); } }'
    + '#drawer.drw-out > * { animation: drwRowOut .3s cubic-bezier(.55,0,.75,.2) both; }'
    + '#drawer.drw-out > :nth-last-child(1) { animation-delay: 0s; } #drawer.drw-out > :nth-last-child(2) { animation-delay: .04s; } #drawer.drw-out > :nth-last-child(3) { animation-delay: .08s; } #drawer.drw-out > :nth-last-child(4) { animation-delay: .12s; } #drawer.drw-out > :nth-last-child(5) { animation-delay: .16s; } #drawer.drw-out > :nth-last-child(n+6) { animation-delay: .2s; }'
    + '@keyframes drwRowOut { 0% { opacity: 1; transform: none; filter: blur(0); } 100% { opacity: 0; transform: translateX(-36px) scale(.85); filter: blur(6px); } }'
    + '@media (prefers-reduced-motion: reduce) { #drawer.drw-out, #drawer.drw-out > * { animation: none !important; } }';
  document.head.appendChild(st);
  function hook() {
    var d = document.getElementById('drawer'); if (!d || d.__v142) return !!d; d.__v142 = true;
    var was = d.classList.contains('open'), tm = 0;
    new MutationObserver(function () {
      var now = d.classList.contains('open'); if (now === was) return; was = now;
      clearTimeout(tm);
      if (now) { d.classList.remove('drw-out'); return; }
      d.classList.remove('drw-out'); void d.offsetWidth; d.classList.add('drw-out');
      tm = setTimeout(function () { d.classList.remove('drw-out'); }, 460);
    }).observe(d, { attributes: true, attributeFilter: ['class'] });
    return true;
  }
  if (!hook()) document.addEventListener('DOMContentLoaded', hook);
})();

/* v143 (Hark, 2026-11-10, Dave):
   - Landing on the main screen: the buttons (menu, Job/Inventory pill, camera, cart) bounce in one after another with a springy overshoot, like his reference video.
   - Side menu is see-through frosted glass like the opener buttons, with no dark blue banner at the top; text turns white.
   - The menu's x uses the camera screen's x style (frosted square, thin white edge).
   - Category and media title bars are see-through glass instead of solid black. */
(function () {
  var G = 'rgba(15,23,32,.24)';
  var st = document.createElement('style'); st.id = 'storm-v143-css';
  st.textContent =
      '@keyframes stBounce { 0% { opacity: 0; transform: scale(0); } 45% { opacity: 1; transform: scale(1.22); } 65% { transform: scale(.9); } 82% { transform: scale(1.05); } 100% { opacity: 1; transform: none; } }'
    + 'body.st-bounce #hamburger, body.st-bounce #mode-switch .mode-pill, body.st-bounce #fab-dock > * { animation: stBounce .62s cubic-bezier(.3,.7,.4,1) backwards; }'
    + 'body.st-bounce #hamburger { animation-delay: .05s; } body.st-bounce #mode-switch .mode-pill { animation-delay: .14s; }'
    + 'body.st-bounce #fab-dock > :nth-child(1) { animation-delay: .23s; } body.st-bounce #fab-dock > :nth-child(2) { animation-delay: .32s; } body.st-bounce #fab-dock > :nth-child(3) { animation-delay: .41s; } body.st-bounce #fab-dock > :nth-child(n+4) { animation-delay: .5s; }'
    + '#drawer { background: ' + G + ' !important; -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); border-right: 1px solid rgba(255,255,255,.5); box-shadow: 8px 0 30px rgba(0,0,0,.25); color: #fff; }'
    + '#drawer .drawer-head { background: transparent !important; }'
    + '#drawer .drawer-section, #drawer .drawer-foot { border-color: rgba(255,255,255,.18) !important; }'
    + '#drawer .drawer-section-head, #drawer .drawer-item, #drawer .drawer-cat, #drawer .drawer-jobber, #drawer .drawer-items, #drawer .drawer-cats, #drawer .drawer-foot, #drawer .drawer-supplier { background: transparent !important; color: #fff !important; }'
    + 'html body #drawer .drawer-item .drawer-item-name, html body #drawer .drawer-item .drawer-item-name.v116-name, html body #drawer .drawer-cat .drawer-item-name { color: #fff !important; }'
    + '#drawer .drawer-chevron { color: rgba(255,255,255,.75) !important; }'
    + '#drawer .drawer-item:active, #drawer .drawer-cat:active, #drawer .drawer-section-head:active { background: rgba(255,255,255,.12) !important; }'
    + '#drawer .drawer-item > svg, #drawer .drawer-section-head svg { color: #fff; }'
    + '#drawer .drawer-close { width: 44px; height: 44px; padding: 0 !important; border-radius: 12px; border: 1px solid rgba(255,255,255,.5) !important; background: rgba(15,23,32,.38) !important; -webkit-backdrop-filter: blur(10px) saturate(1.4); backdrop-filter: blur(10px) saturate(1.4); box-shadow: 0 2px 10px rgba(0,0,0,.2); color: #fff !important; font-size: 26px !important; line-height: 1 !important; display: flex; align-items: center; justify-content: center; -webkit-tap-highlight-color: transparent; }'
    + '#drawer .drawer-close:active { transform: translateY(2px) scale(.96); filter: brightness(.9); }'
    + '.cat-head, #res-media .bl-cat { background: linear-gradient(90deg, rgba(15,23,32,.62) 0%, rgba(15,23,32,.5) 55%, rgba(15,23,32,.22) 78%, rgba(15,23,32,0) 96%) !important; -webkit-backdrop-filter: blur(10px) saturate(1.3); backdrop-filter: blur(10px) saturate(1.3); }'
    + '#list .cat-head.sfx-head, #list .cat-head.sfx-pre { background-repeat: no-repeat !important; }'
    + '@media (prefers-reduced-motion: reduce) { body.st-bounce * { animation: none !important; } }';
  document.head.appendChild(st);
  var done = false;
  function bounce(delay) { if (done) return; done = true; setTimeout(function () { document.body.classList.add('st-bounce'); setTimeout(function () { document.body.classList.remove('st-bounce'); }, 1400); }, delay); }
  window.addEventListener('message', function (ev) { if (ev.data && ev.data.storm === 'landed') bounce(260); });
  if (window.parent === window) { if (document.readyState === 'complete') bounce(400); else window.addEventListener('load', function () { bounce(400); }); }
})();

/* v145 (Hark, 2026-11-10, Dave): landing order. The page and logo fade in first; the Job/Inventory toggle and menu come in with the page (no bounce);
   the buttons at the bottom stay hidden, then bounce in 2 seconds later. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v146-css';
  st.textContent = 'body.st-bounce #hamburger, body.st-bounce #mode-switch .mode-pill { animation: none !important; }'
    + 'body.st-pre #fab-dock > * { opacity: 0 !important; pointer-events: none; }'
    + 'body.st-bounce2 #fab-dock > * { animation: stBounce .62s cubic-bezier(.3,.7,.4,1) backwards; }'
    + 'body.st-bounce2 #fab-dock > :nth-child(1) { animation-delay: 0s; } body.st-bounce2 #fab-dock > :nth-child(2) { animation-delay: .1s; } body.st-bounce2 #fab-dock > :nth-child(3) { animation-delay: .2s; } body.st-bounce2 #fab-dock > :nth-child(n+4) { animation-delay: .3s; }';
  document.head.appendChild(st);
  var b = document.body || document.documentElement; b.classList.add('st-pre');
  var go = false;
  function show() { if (go) return; go = true; setTimeout(function () { var bd = document.body; bd.classList.remove('st-pre'); bd.classList.add('st-bounce2'); setTimeout(function () { bd.classList.remove('st-bounce2'); }, 1300); }, 0); /* v149 (Dave): with the page and titles, not 2s later */ }
  window.addEventListener('message', function (ev) { if (ev.data && ev.data.storm === 'landed') show(); });
  if (window.parent === window) { if (document.readyState === 'complete') show(); else window.addEventListener('load', show); }
  setTimeout(function () { if (!go) document.body.classList.remove('st-pre'); }, 45000); /* safety: never leave the buttons hidden */
})();

/* v147 (Hark, 2026-11-10, Dave): side menu. No Jobber logo on the Quote Templates heading, and the Jobber logo in the menu footer
   uses a cut-out copy with no white box behind it. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v147-css';
  st.textContent = '#drawer .drawer-qt-logo { display: none !important; } #drawer .drawer-jobber[data-jobber] img { background: transparent !important; }';
  document.head.appendChild(st);
  var CLEAR = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/jobber-logo-white-open.png?v=1'; /* v150: white letters, hi-res. v164: same logo with a see-through center */
  function swap() { var i = document.querySelector('.drawer-jobber[data-jobber] img'); if (i && i.src !== CLEAR) i.src = CLEAR; }
  swap(); document.addEventListener('DOMContentLoaded', swap); setTimeout(swap, 1500);
})();

/* v148 (Hark, 2026-11-10, Dave): side-menu icons get the same look as the camera and cart buttons: white line icon on a dark glass tile
   with a thin white border and soft shadow. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v148-css';
  var SEL = '#drawer .drawer-item > svg, #drawer .drawer-item > .v116-ico, #drawer .drawer-item > .drawer-chk-ico, #drawer .drawer-item > .res-ico, #drawer .drawer-item > .chk-ico-img';
  st.textContent = SEL + ' { box-sizing: border-box !important; width: 34px !important; height: 34px !important; padding: 6px !important; border-radius: 10px !important;'
    + ' background: rgba(15,23,32,.38) !important; border: 1px solid rgba(255,255,255,.5) !important; box-shadow: 0 2px 10px rgba(0,0,0,.2) !important; color: #fff !important; object-fit: contain; }'
    + '#drawer .drawer-item > svg *, #drawer .drawer-item > .v116-ico *, #drawer .drawer-item > .drawer-chk-ico * { stroke: #fff !important; }'
    + '#drawer .drawer-item > svg [fill]:not([fill="none"]), #drawer .drawer-item > .v116-ico [fill]:not([fill="none"]), #drawer .drawer-item > .drawer-chk-ico [fill]:not([fill="none"]) { fill: #fff !important; }'
    + '#drawer .drawer-item > img.res-ico, #drawer .drawer-item > img.chk-ico-img, #drawer .drawer-item > .res-ico img, #drawer .drawer-item > .chk-ico-img img { filter: brightness(0) invert(1); }';
  document.head.appendChild(st);
})();

/* v149 (Hark, 2026-11-10, Dave): the bottom icons load at the same time as the titles, with a clean smooth fade (no bounce). */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v149-css';
  st.textContent = '@keyframes stSmooth { 0% { opacity: 0; transform: translateY(8px) scale(.96); } 100% { opacity: 1; transform: none; } }'
    + 'body.st-bounce #fab-dock > *, body.st-bounce2 #fab-dock > * { animation: stSmooth .55s cubic-bezier(.25,.8,.3,1) both !important; animation-delay: 0s !important; }';
  document.head.appendChild(st);
})();

/* v150 (Hark, 2026-11-10, Dave): menu footer: CompanyCam wording in white (icon keeps its blue), and the Bin Labels heading icon
   gets the same glass tile as the other menu icons. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v150-css';
  st.textContent = '#drawer .drawer-section-head > .lbl-ico { box-sizing: border-box !important; width: 34px !important; height: 34px !important; padding: 6px !important; border-radius: 10px !important;'
    + ' background: rgba(15,23,32,.38) !important; border: 1px solid rgba(255,255,255,.5) !important; box-shadow: 0 2px 10px rgba(0,0,0,.2) !important; margin-right: 10px; }'
    + '#drawer .drawer-section-head > .lbl-ico * { stroke: #fff !important; }';
  document.head.appendChild(st);
  var CC = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/companycam-white.png?v=1';
  function swap() { var i = document.querySelector('.drawer-jobber[data-ccam] img'); if (i && i.src !== CC) i.src = CC; }
  swap(); document.addEventListener('DOMContentLoaded', swap); setTimeout(swap, 1500);
})();

/* v151 (Hark, 2026-11-10, Dave): no glitch when a product photo opens Item details, and no flash when the photo there is tapped.
   The details photo swaps a few times while it sharpens (trimmed copy, then the HD copy), so it now holds a fixed-height box, stays hidden
   until the swaps settle, then fades in once. Photos ignore taps for selection/callout so Android doesn't flash a highlight on them. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v151-css';
  st.textContent = '#detail img.detail-photo { height: min(320px, 72vw); transition: opacity .22s ease; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; pointer-events: none; }'
    + '#detail img.detail-photo.st-wait { opacity: 0 !important; transition: none !important; }'
    + '#list img.photo, .pick-line img, .peek img { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-user-drag: none; }';
  document.head.appendChild(st);
  function hold(im) {
    if (!im || im.__stHold) return; im.__stHold = true; im.classList.add('st-wait');
    var t = null, done = false, t0 = Date.now();
    function reveal() { if (done) return; done = true; try { mo.disconnect(); } catch (e) {} im.classList.remove('st-wait'); }
    function settle() { clearTimeout(t); if (Date.now() - t0 > 1100) { reveal(); return; } t = setTimeout(function () { if (im.complete) reveal(); else settle(); }, 240); }
    var mo = new MutationObserver(settle); mo.observe(im, { attributes: true, attributeFilter: ['src'] });
    im.addEventListener('load', settle); im.addEventListener('error', reveal);
    settle(); setTimeout(reveal, 1300);
  }
  if (typeof openDetail === 'function') { var _o = openDetail; openDetail = function (bin, isSwipe) { var r = _o.apply(this, arguments); if (!isSwipe) { try { hold(document.querySelector('#detail img.detail-photo')); } catch (e) {} } return r; }; }
})();

/* v152 (Hark, 2026-11-10, Dave): the outline trace on the mode tap lined up wrong in landscape and on iPad, because the wrapper reused a logo spot
   measured at another screen size / before the main page laid out. The app now re-sends its banner logo's exact spot after the mode tap, on rotate, and when asked. */
(function () {
  function send() { try { var el = document.querySelector('header .storm-logo-lit') || document.querySelector('header img.logo'); var r = el && el.getBoundingClientRect(); if (r && r.width > 20) window.top.postMessage({ storm: 'logoPos', x: r.left, y: r.top, w: r.width, h: r.height }, '*'); } catch (e) {} }
  function burst() { send(); [40, 110, 260, 480, 900].forEach(function (t) { setTimeout(send, t); }); }
  window.addEventListener('message', function (e) { var d = e.data; if (!d) return; if (d.storm === 'wrapMode') { requestAnimationFrame(burst); } else if (d.storm === 'logoQ') { setTimeout(send, 80); setTimeout(send, 350); } });
  window.addEventListener('resize', function () { setTimeout(send, 120); });
  window.addEventListener('orientationchange', function () { setTimeout(send, 300); });
})();

/* v153 (Hark, 2026-11-10, Dave): detail windows get a Back button in the same frosted glass square as the camera and the X buttons
   (44px, 12px corners, thin white edge, white chevron). Same tap as before: it closes the window and goes back. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v153-css';
  st.textContent = '.detail-bar .detail-close.st-back { width: 44px; height: 44px; flex: none; padding: 0 !important; border-radius: 12px; border: 1px solid rgba(255,255,255,.5) !important; background: rgba(15,23,32,.38) !important; -webkit-backdrop-filter: blur(10px) saturate(1.4); backdrop-filter: blur(10px) saturate(1.4); box-shadow: 0 2px 10px rgba(0,0,0,.2); color: #fff !important; display: flex; align-items: center; justify-content: center; -webkit-tap-highlight-color: transparent; font-size: 0 !important; }'
    + '.detail-bar .detail-close.st-back svg { width: 22px; height: 22px; display: block; pointer-events: none; }'
    + '.detail-bar .detail-close.st-back:active { transform: scale(.94); }';
  document.head.appendChild(st);
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
  function fix() { document.querySelectorAll('.detail-bar .detail-close:not(.st-back)').forEach(function (b) { b.classList.add('st-back'); b.innerHTML = CHEV; b.setAttribute('aria-label', 'Back'); }); }
  fix(); try { new MutationObserver(fix).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
})();

/* v154 (Hark, 2026-11-10, Dave): tapping the Bin label in Item details fades the label in (same fade as the details window),
   and backing out plays the exact reverse. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v154-css';
  st.textContent = '@keyframes lvBgIn { from { opacity: 0; } to { opacity: 1; } } @keyframes lvBgOut { from { opacity: 1; } to { opacity: 0; } }'
    + '@keyframes lvBoxIn { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } } @keyframes lvBoxOut { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(12px) scale(.97); } }'
    + '#lbl-view.open { animation: lvBgIn .26s ease-out both; } #lbl-view.open .lbl-view-box { animation: lvBoxIn .26s ease-out both; }'
    + '#lbl-view.open.lv-out { animation: lvBgOut .26s ease-in both; pointer-events: none; } #lbl-view.open.lv-out .lbl-view-box { animation: lvBoxOut .26s ease-in both; }';
  document.head.appendChild(st);
  if (typeof lblClose === 'function') {
    var _lc = lblClose, t = null;
    lblClose = function () { var v = document.getElementById('lbl-view'); if (!v || !v.classList.contains('open')) return _lc.apply(this, arguments); if (t) return; v.classList.add('lv-out'); t = setTimeout(function () { t = null; _lc(); v.classList.remove('lv-out'); }, 250); };
  }
  if (typeof lblView === 'function') { var _lv = lblView; lblView = function () { var v = document.getElementById('lbl-view'); if (v) v.classList.remove('lv-out'); return _lv.apply(this, arguments); }; }
})();

/* v155 (Hark, 2026-11-10, Dave): the shopping cart (Order list sheet) is the same see-through frosted glass as the side menu, with white text.
   Item photos keep their white tiles; the blue Copy button and the red Clear stay as they are. */
(function () {
  var G = 'rgba(15,23,32,.24)';
  var st = document.createElement('style'); st.id = 'storm-v155-css';
  st.textContent = '#pick-sheet { background: ' + G + ' !important; -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); border-top: 1px solid rgba(255,255,255,.5); box-shadow: 0 -8px 30px rgba(0,0,0,.25) !important; color: #fff; }'
    + '#pick-sheet .pick-sheet-head, #pick-sheet .pick-sheet-head h2, #pick-sheet .pick-line-name, #pick-sheet .pick-empty, #pick-sheet .pick-qty, #pick-sheet .pick-sheet-close { color: #fff !important; }'
    + '#pick-sheet .pick-line-code { color: rgba(255,255,255,.72) !important; }'
    + '#pick-sheet .pick-line, #pick-sheet .pick-sheet-foot { border-color: rgba(255,255,255,.18) !important; }'
    + '#pick-sheet .pick-stepper { border-color: rgba(255,255,255,.5) !important; background: transparent; }'
    + '#pick-sheet .pick-step { background: rgba(255,255,255,.14) !important; color: #fff !important; }'
    + '#pick-sheet .pick-qty { background: transparent !important; border: 0; }'
    + '#pick-sheet .pick-remove { color: rgba(255,255,255,.8) !important; }'
    + '#pick-sheet .pick-open-rt, #pick-sheet .pick-open-hi { background: rgba(15,23,32,.38) !important; color: #fff !important; border: 1px solid rgba(255,255,255,.5) !important; }'
    + '#pick-sheet .pick-line img { background: #fff; }';
  document.head.appendChild(st);
})();

/* v156 (Hark, 2026-11-10, Dave): tapping Jobber or CompanyCam no longer snaps off the screen. The side menu closes, the items and titles
   on screen play the reverse of their slide-in (fade out to the left, bottom first), the banner and buttons fade, then the app opens.
   Coming back, everything slides back in the way it entered. */
(function () {
  if (typeof stormOpenApp !== 'function') return;
  var st = document.createElement('style'); st.id = 'storm-v156-css';
  st.textContent = '@keyframes stOutCard { 0% { opacity: 1; transform: translate3d(0,0,0); } 85% { opacity: .15; } 100% { opacity: 0; transform: translate3d(-110px,0,0); } }'
    + '#list .st-leave { animation: stOutCard .5s cubic-bezier(.8,.4,.75,.4) both !important; will-change: transform, opacity; }'
    + 'body.st-leaving header, body.st-leaving #fab-dock, body.st-leaving #mode-switch { opacity: 0 !important; transition: opacity .5s ease-in !important; }';
  document.head.appendChild(st);
  function vis() { var out = [], h = window.innerHeight || 800; document.querySelectorAll('#list .cat-head, #list .card').forEach(function (el) { var r = el.getBoundingClientRect(); if (r.bottom > 0 && r.top < h) out.push(el); }); return out; }
  var _open = stormOpenApp, busy = false, left = [];
  function back() {
    if (!busy) return; busy = false; document.body.classList.remove('st-leaving');
    var d = 0; left.forEach(function (el) { var card = el.classList.contains('card'), cls = card ? 'sfx-bump' : 'sfx-head'; el.classList.remove('st-leave'); el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(function () { el.classList.remove(cls); }, 1500 + d); d += card ? 60 : 120; }); left = [];
  }
  stormOpenApp = function (kind) {
    if (busy) return; busy = true; var self = this, args = arguments;
    try { if (typeof closeDrawer === 'function') closeDrawer(); } catch (e) {}
    left = vis(); var n = left.length;
    left.forEach(function (el, i) { el.style.animationDelay = Math.min(150, (n - 1 - i) * 25) + 'ms'; el.classList.add('st-leave'); setTimeout(function () { el.style.animationDelay = ''; }, 900); });
    document.body.classList.add('st-leaving');
    setTimeout(function () { _open.apply(self, args); setTimeout(function () { if (!document.hidden) back(); }, 2200); }, 620);
  };
  document.addEventListener('visibilitychange', function () { if (!document.hidden && busy) setTimeout(back, 150); });
  window.addEventListener('pageshow', function () { if (busy) setTimeout(back, 150); });
})();

/* v157 (Hark, 2026-11-10, Dave): tapping the camera button sends the bottom-right icons (cart, camera, labels) away with the reverse of
   their fade-in; closing the camera with the X brings them back with their fade-in. */
(function () {
  if (typeof openScanner !== 'function') return;
  var st = document.createElement('style'); st.id = 'storm-v157-css';
  st.textContent = '@keyframes stSmoothOut { 0% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translateY(8px) scale(.96); } }'
    + 'body.st-camhide #fab-dock > * { animation: stSmoothOut .55s cubic-bezier(.7,0,.75,.2) both !important; animation-delay: 0s !important; pointer-events: none !important; }'
    + 'body.st-camback #fab-dock > * { animation: stSmooth .55s cubic-bezier(.25,.8,.3,1) both !important; animation-delay: 0s !important; }';
  document.head.appendChild(st);
  var b = document.body, t = null, safety = null;
  function show() { if (!b.classList.contains('st-camhide')) return; b.classList.remove('st-camhide'); b.classList.remove('st-camback'); void b.offsetWidth; b.classList.add('st-camback'); clearTimeout(t); t = setTimeout(function () { b.classList.remove('st-camback'); }, 650); }
  var _os = openScanner;
  openScanner = function () { b.classList.remove('st-camback'); b.classList.add('st-camhide'); return _os.apply(this, arguments); };
  window.addEventListener('message', function (e) { var d = e.data; if (!d) return; if (d.storm === 'camClosed' || d.storm === 'scanResult') show(); }); /* v158: Done also brings them back, even on an older cached wrapper */
  window.addEventListener('focus', function () { setTimeout(function () { if (b.classList.contains('st-camhide') && document.hasFocus()) show(); }, 120); }); /* v158: back in the app means the camera is gone */
  st.id = 'storm-v157-css'; var st2 = document.createElement('style'); st2.id = 'storm-v158-css'; document.head.appendChild(st2);
})();

/* v159 (Hark, 2026-11-10, Dave): side menu has no fade. It slides in from the left and zips back off to the left. The cart's close
   (X or tap outside) is the reverse of its pop-up: it slides back down off the screen. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v159-css';
  st.textContent = '@keyframes drwSlideIn { 0% { transform: translate3d(-105%,0,0); } 100% { transform: translate3d(0,0,0); } }'
    + '@keyframes drwSlideOut { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-105%,0,0); } }'
    + '#drawer.open { animation: drwSlideIn .34s cubic-bezier(.22,.8,.3,1) both !important; opacity: 1 !important; filter: none !important; }'
    + '#drawer.drw-out { animation: drwSlideOut .3s cubic-bezier(.55,0,.8,.3) both !important; opacity: 1 !important; filter: none !important; }'
    + '#drawer.drw-out > *, #drawer.open > * { animation: none !important; opacity: 1 !important; filter: none !important; }'
    + '@keyframes cartExit { 0% { transform: translate3d(0,0,0); opacity: 1; } 100% { transform: translate3d(0,102%,0); opacity: 1; } }'
    + '#pick-sheet.fx-exit { animation: cartExit .3s cubic-bezier(.55,0,.8,.3) forwards !important; }';
  document.head.appendChild(st);
})();

/* v160 (Hark, 2026-11-10, Dave): in the cart, "Copy RichTech order" matches the "Open RichTech order page" button (dark glass, white border). */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v160-css';
  st.textContent = '#pick-sheet .pick-copy[data-pick-copy] { background: rgba(15,23,32,.38) !important; color: #fff !important; border: 1px solid rgba(255,255,255,.5) !important; box-shadow: none !important; }';
  document.head.appendChild(st);
})();

/* v161 (Hark, 2026-11-10, Dave): every Copy button in the cart (Home Depot, RichTech, Hilti, AutoZone) uses the same dark glass as Open RichTech. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v161-css';
  st.textContent = '#pick-sheet .pick-copy { background: rgba(15,23,32,.38) !important; color: #fff !important; border: 1px solid rgba(255,255,255,.5) !important; box-shadow: none !important; }';
  document.head.appendChild(st);
})();

/* v162 (Hark, 2026-11-10, Dave): items and titles slide in a pinch faster (1.3s to 1.05s), same easing so it stays smooth. */
(function () {
  var st = document.createElement('style'); st.id = 'storm-v162-css';
  st.textContent = '#list .card.sfx-bump, #list .cat-head.sfx-head, #list .cat-head.sfx-head::before, #list .cat-head.sfx-head > * { animation-duration: 1.05s !important; }';
  document.head.appendChild(st);
})();

/* v163 (Hark, 2026-11-10, Dave): every side-menu arrow shows like Products (Quote Templates and Bin Labels had lost theirs),
   white so it reads on the dark glass; long names (Box Truck Pre Check) no longer push the arrow out.
   Resource Center header pops back up after a tap like the other headers instead of staying pressed in. */
(function () {
  var CH = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-opacity='.85' stroke-width='2.6' stroke-linecap='round' stroke-linejoin='round'><path d='M9 5l7 7-7 7'/></svg>";
  var st = document.createElement('style'); st.id = 'storm-v163-css';
  st.textContent = ''
    + '#drawer #drawer-qt > .drawer-qt-head { display: flex !important; align-items: center !important; justify-content: flex-start !important; gap: 10px; }'
    + '#drawer .drawer-section > .drawer-section-head > .drawer-chevron, #drawer .drawer-item > .drawer-chevron { display: inline-block !important; visibility: visible !important; opacity: 1 !important; flex: 0 0 18px !important; width: 18px !important; min-width: 18px !important; height: 18px !important; margin-left: auto !important; font-size: 0 !important; color: transparent !important; background: url("' + CH + '") center / 18px 18px no-repeat !important; grid-column: auto !important; grid-row: auto !important; }'
    + '#drawer .drawer-item > .drawer-count + .drawer-chevron { margin-left: 8px !important; }'
    + '#drawer .drawer-section > .drawer-section-head > .drawer-chevron { transform: rotate(0deg) !important; transition: transform .38s cubic-bezier(.3,.7,.2,1) !important; }'
    + '#drawer .drawer-section.expanded > .drawer-section-head > .drawer-chevron, #drawer .drawer-supplier.open > .drawer-item > .drawer-chevron { transform: rotate(90deg) !important; }'
    + '#drawer .drawer-item > .drawer-item-name, #drawer .drawer-section-head > span:not(.drawer-chevron) { flex: 1 1 auto; min-width: 0; }'
    + '#drawer .drawer-section-head:focus, #drawer .drawer-section-head:focus-visible { outline: none !important; }'
    + '#drawer-resources > .drawer-section-head:not(.pressed) { transform: none !important; filter: none !important; box-shadow: none !important; }'
    + '@media (hover: none) { #drawer .drawer-section-head:hover:not(.pressed) { background: transparent !important; } }';
  document.head.appendChild(st);
  function release() {
    setTimeout(function () {
      document.querySelectorAll('#drawer-resources > .drawer-section-head.pressed').forEach(function (h) { h.classList.remove('pressed'); });
      var a = document.activeElement; if (a && a.closest && a.closest('#drawer-resources > .drawer-section-head')) { try { a.blur(); } catch (e) {} }
    }, 160);
  }
  ['pointerup', 'pointercancel', 'touchend', 'mouseup'].forEach(function (t) { document.addEventListener(t, release, true); });
})();

/* v164 (Hark, 2026-11-10, Dave): 
   1. Side menu opens in one smooth slide. The old .drawer transform/opacity transition was running at the same time as the v159
      slide-in animation, so the menu slid out, jumped back a little when the transition ended, then slid out again. The transition is
      off now; the slide animation alone moves the menu, in and out.
   2. Item details photo keeps its space and fades in with the details window. When it sharpens (centered copy, then the HD copy),
      the new picture cross-fades over the old one in the same box, so it never jumps or blinks.
   3-7. Every title in the Bin Labels pages (Home Depot, RichTech, AutoZone/Box Truck, Hilti), the Label details page, the Logos page
      and Media uses the main-screen category title: dark band fading right, white side line, white uppercase type.
   8. The Pull List (clipboard) is the same frosted glass as the cart, with the same glass buttons and fields, and it closes with the
      cart's slide down. Find a Job matches.
   9. A divider line between Jobber and CompanyCam in the menu footer, the same line as between the menu sections.
   10. The Jobber logo's center is see-through (assets/jobber-logo-white-open.png). */
(function () {
  var BAND = 'linear-gradient(90deg, rgba(15,23,32,.62) 0%, rgba(15,23,32,.5) 55%, rgba(15,23,32,.22) 78%, rgba(15,23,32,0) 96%)';
  var GL = 'rgba(15,23,32,.38)', G = 'rgba(15,23,32,.24)', EDGE = '1px solid rgba(255,255,255,.5)';
  var T = 'html body .detail-overlay .bl-cat, html body #res-media .bl-cat, html body #res-view .detail-body > .detail-name, html body #lbl-detail .detail-flow h2, html body #lbl-detail .detail-features h2';
  var TB = T.split(', ').map(function (s) { return s + '::before'; }).join(', ');
  var st = document.createElement('style'); st.id = 'storm-v164-css';
  st.textContent = ''
    /* 1. drawer: one slide, no competing transition */
    + 'html body #drawer, html body #drawer.open, html body #drawer.drw-out { transition: none !important; }'
    + '@keyframes drwSlideIn164 { 0% { transform: translate3d(-102%,0,0); } 100% { transform: translate3d(0,0,0); } }'
    + '@keyframes drwSlideOut164 { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-102%,0,0); } }'
    + 'html body #drawer.open { animation: drwSlideIn164 .34s cubic-bezier(.22,.8,.3,1) both !important; }'
    + 'html body #drawer.drw-out { animation: drwSlideOut164 .3s cubic-bezier(.55,0,.8,.3) both !important; }'
    /* 2. details photo */
    + 'html body #detail img.detail-photo { display: block; box-sizing: border-box; height: min(320px, 72vw) !important; max-height: none; }'
    + 'html body #detail img.detail-photo.st-wait { opacity: 1 !important; transition: opacity .26s ease-out !important; }'
    + 'html body #detail img.detail-photo.st164-pend { opacity: 0 !important; transition: none !important; }'
    + 'html body #detail img.detail-photo.st164-show { transition: opacity .26s ease-out !important; }'
    + '#detail img.st164-ghost { position: absolute; z-index: 2; margin: 0 !important; pointer-events: none; opacity: 1; transition: opacity .26s ease-out; -webkit-user-select: none; user-select: none; }'
    /* 3-7. titles = main-screen category title */
    + T + ' { position: relative !important; display: block; margin: 22px -16px 8px !important; padding: 9px 12px 9px 28px !important; border: 0 !important; border-left: 0 !important; border-radius: 0 !important;'
    + ' background: ' + BAND + ' !important; -webkit-backdrop-filter: blur(10px) saturate(1.3); backdrop-filter: blur(10px) saturate(1.3);'
    + ' font-size: 14px !important; font-weight: 800 !important; letter-spacing: .09em !important; line-height: 1.25 !important; text-transform: uppercase !important; color: #fff !important; text-shadow: none !important; }'
    + TB + ' { content: "" !important; display: block !important; position: absolute !important; left: 12px !important; top: 8px !important; bottom: 8px !important; width: 4px !important; border-radius: 2px !important; background: #fff !important; }'
    + 'html body #res-view .detail-body > .detail-name { margin-top: 18px !important; }'
    /* 8. Pull List = cart glass */
    + 'html body #pull-sheet { background: ' + G + ' !important; -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); border-top: ' + EDGE + '; box-shadow: 0 -8px 30px rgba(0,0,0,.25) !important; color: #fff; }'
    + 'html body #pull-sheet .pick-sheet-head, html body #pull-sheet .pick-sheet-head h2, html body #pull-sheet .pick-line-name, html body #pull-sheet .pick-empty, html body #pull-sheet .pick-sheet-close, html body #pull-sheet .pick-sheet-foot div { color: #fff !important; }'
    + 'html body #pull-sheet .pick-line-code, html body #pull-sheet .pull-sub { color: rgba(255,255,255,.72) !important; }'
    + 'html body #pull-sheet .pick-line, html body #pull-sheet .pick-sheet-foot { border-color: rgba(255,255,255,.18) !important; }'
    + 'html body #pull-sheet .pull-qty { background: transparent !important; border: ' + EDGE + ' !important; }'
    + 'html body #pull-sheet .pull-qty b { color: #fff !important; } html body #pull-sheet .pull-qty span { color: rgba(255,255,255,.72) !important; }'
    + 'html body #pull-sheet .pick-line img { background: #fff !important; }'
    + 'html body #pull-sheet .jc-in, html body #job-find .jc-in { background: rgba(255,255,255,.1) !important; border: ' + EDGE + ' !important; color: #fff !important; }'
    + 'html body #pull-sheet .jc-in::placeholder, html body #job-find .jc-in::placeholder { color: rgba(255,255,255,.6) !important; }'
    + 'html body #pull-sheet .jc-in:focus, html body #job-find .jc-in:focus { border-color: #fff !important; box-shadow: 0 0 0 3px rgba(255,255,255,.18) !important; }'
    + 'html body #pull-sheet .jc-in.st-need { border-color: #fca5a5 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.35) !important; }'
    + 'html body #pull-sheet .pull-save, html body #pull-sheet .pull-print, html body #pull-sheet .jc-find, html body #pull-sheet .jc-clear,'
    + ' html body #job-find .pull-print, html body #job-find .jc-clear, html body #job-find .jf-btn { background: ' + GL + ' !important; color: #fff !important; border: ' + EDGE + ' !important; box-shadow: none !important; }'
    + 'html body #pull-sheet button:disabled { opacity: .5 !important; }'
    + '@keyframes pullExit164 { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(0,102%,0); } }'
    + 'html body #pull-sheet.fx-exit { animation: pullExit164 .3s cubic-bezier(.55,0,.8,.3) forwards !important; transition: none !important; }'
    + 'html body #job-find .jf-card { background: ' + G + ' !important; -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); border: ' + EDGE + '; color: #fff; }'
    + 'html body #job-find h2, html body #job-find .jf-name, html body #job-find .jf-line, html body #job-find .jf-line b { color: #fff !important; }'
    + 'html body #job-find .jf-addr { color: rgba(255,255,255,.85) !important; } html body #job-find .jf-meta, html body #job-find .jf-empty { color: rgba(255,255,255,.7) !important; }'
    + 'html body #job-find .jf-item { background: rgba(255,255,255,.08) !important; border: 1px solid rgba(255,255,255,.3) !important; color: #fff !important; }'
    + 'html body #job-find .jf-lines, html body #job-find .jf-line { border-color: rgba(255,255,255,.18) !important; }'
    + 'html body #job-find .jf-hint { color: rgba(255,255,255,.7) !important; }'
    + 'html body #job-find .jf-x { background: ' + GL + ' !important; border: ' + EDGE + ' !important; color: #fff !important; }'
    /* 9. footer divider: same line as between the menu sections (1px solid rgba(255,255,255,.18)), full menu width */
    + 'html body #drawer .drawer-foot .st164-div { display: block; height: 0; margin: 6px -16px; border: 0; border-top: 1px solid rgba(255,255,255,.18); }';
  document.head.appendChild(st);

  /* 2. photo: show with the window, cross-fade every later swap */
  function ghost(im, oldSrc) {
    if (!oldSrc || !im.isConnected || im.classList.contains('st164-pend') || !im.offsetWidth) return;
    var g = document.createElement('img'), cs = getComputedStyle(im);
    g.className = 'st164-ghost'; g.alt = ''; g.src = oldSrc;
    ['objectFit', 'objectPosition', 'borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderRightWidth', 'borderRightStyle', 'borderRightColor', 'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor', 'borderRadius', 'backgroundColor', 'padding'].forEach(function (k) { g.style[k] = cs[k]; });
    g.style.boxSizing = 'border-box'; g.style.width = im.offsetWidth + 'px'; g.style.height = im.offsetHeight + 'px'; g.style.left = '0px'; g.style.top = '0px';
    im.parentNode.insertBefore(g, im.nextSibling);
    var a = g.getBoundingClientRect(), b = im.getBoundingClientRect();
    g.style.left = (b.left - a.left) + 'px'; g.style.top = (b.top - a.top) + 'px';
    var gone = false;
    function fade() { if (gone) return; gone = true; requestAnimationFrame(function () { g.style.opacity = '0'; setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); }, 320); }); }
    function ready() { if (im.decode) im.decode().then(fade, fade); else fade(); }
    if (im.complete && im.naturalWidth) ready(); else { im.addEventListener('load', ready, { once: true }); im.addEventListener('error', fade, { once: true }); }
    setTimeout(fade, 2500);
  }
  function watch(im) {
    if (!im || im.__st164) return; im.__st164 = true;
    im.classList.remove('st164-show');
    if (!(im.complete && im.naturalWidth)) {
      im.classList.add('st164-pend');
      var on = function () { if (!im.classList.contains('st164-pend')) return; void im.offsetWidth; im.classList.add('st164-show'); im.classList.remove('st164-pend'); };
      im.addEventListener('load', on, { once: true }); im.addEventListener('error', on, { once: true }); setTimeout(on, 1500);
    }
    new MutationObserver(function (ms) { ms.forEach(function (m) { if (m.attributeName === 'src' && m.oldValue && m.oldValue !== im.getAttribute('src')) ghost(im, m.oldValue); }); })
      .observe(im, { attributes: true, attributeFilter: ['src'], attributeOldValue: true });
  }
  function scan() { document.querySelectorAll('#detail img.detail-photo').forEach(watch); }
  if (typeof openDetail === 'function') { var _od = openDetail; openDetail = function () { var r = _od.apply(this, arguments); try { scan(); } catch (e) {} return r; }; }
  try { var d0 = document.getElementById('detail'); if (d0) new MutationObserver(function () { try { scan(); } catch (e) {} }).observe(d0, { childList: true, subtree: true }); } catch (e) {}

  /* 8. Pull List closes with the cart's slide down (X, tap outside) */
  var pass = false;
  window.addEventListener('click', function (e) {
    if (pass) return; var t = e.target; if (!t || !t.closest) return;
    var x = t.closest('#pull-sheet [data-pull-close]') || (t.id === 'pull-scrim' ? t : null); if (!x) return;
    var sh = document.getElementById('pull-sheet'); if (!sh || !sh.classList.contains('open')) return;
    e.preventDefault(); e.stopImmediatePropagation(); e.stopPropagation();
    if (sh.classList.contains('fx-exit')) return;
    var sc = document.getElementById('pull-scrim'); if (sc) sc.classList.remove('open');
    sh.classList.add('fx-exit');
    setTimeout(function () {
      sh.style.transition = 'none'; pass = true;
      try { x.click(); } catch (er) { sh.classList.remove('open'); }
      pass = false; void sh.offsetWidth; sh.classList.remove('fx-exit'); void sh.offsetWidth;
      setTimeout(function () { sh.style.transition = ''; }, 30);
    }, 310);
  }, true);

  /* 9 + 10. menu footer: divider between Jobber and CompanyCam; Jobber logo with a see-through center */
  var JOB = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/jobber-logo-white-open.png?v=1';
  function foot() {
    var j = document.querySelector('#drawer .drawer-foot .drawer-jobber[data-jobber]'), c = document.querySelector('#drawer .drawer-foot [data-ccam]');
    if (j) { var i = j.querySelector('img'); if (i && i.src !== JOB) i.src = JOB; }
    if (j && c && c.previousElementSibling === j && !(j.nextElementSibling && j.nextElementSibling.classList.contains('st164-div'))) {
      var dv = document.createElement('div'); dv.className = 'st164-div'; dv.setAttribute('aria-hidden', 'true'); j.parentNode.insertBefore(dv, c);
    }
  }
  foot(); document.addEventListener('DOMContentLoaded', foot); setTimeout(foot, 1600); setTimeout(foot, 4000);
})();

/* v165 (Hark, 2026-11-10, Dave): (1) the "ft" unit inside the quantity box sits a touch in from the edge (cards, Order list).
   (2) press and hold any + / - quantity button: a tap is still exactly one step; after 1 s held it repeats (150 ms, speeding up to 60 ms).
   Every repeat is a click on the same button, so the existing handlers (order qty, feet, cart bar, saving, v97 Job customer gate) all still run.
   Repeating stops on release / cancel / leave, when the count stops changing (gate blocked, hit 0) or when the button goes away.
   (3) Item details open with the cart's own motion (cart: transform .25s ease, 102% off-screen to 0), turned sideways so the panel
   moves to the RIGHT (in from the left edge); X, phone back and swipe-back close it with the exact reverse. The v164 photo fade stays. */
(function () {
  var st = document.createElement('style');
  st.textContent = ''
    + 'html body .card .stepper .ft-tag, html body #detail .stepper .ft-tag { position: relative; z-index: 1; margin-left: -9px !important; padding: 0 9px 0 0 !important; flex: none !important; pointer-events: none; } /* moved in 9px; box width unchanged so the card buttons keep their rows */'
    + 'html body #pick-sheet .pick-stepper .pick-qty { width: auto !important; min-width: 44px !important; padding: 0 8px !important; box-sizing: border-box !important; white-space: nowrap !important; }'
    + 'html body .step, html body .pick-step, html body [data-detail-step], html body [data-pick-inc], html body [data-pick-dec] { -webkit-touch-callout: none !important; -webkit-user-select: none !important; user-select: none !important; touch-action: manipulation !important; }';
  document.head.appendChild(st);

  var SEL = '.step, .pick-step, [data-detail-step], [data-pick-inc], [data-pick-dec]';
  var HOLD = 1000, FIRST = 150, FAST = 60, RAMP = 2000;
  var cur = null, synth = false, swallowUntil = 0;

  function keyOf(b) {
    if (b.hasAttribute('data-pick-inc')) return '#pick-sheet [data-pick-inc="' + b.getAttribute('data-pick-inc') + '"]';
    if (b.hasAttribute('data-pick-dec')) return '#pick-sheet [data-pick-dec="' + b.getAttribute('data-pick-dec') + '"]';
    if (b.hasAttribute('data-detail-step')) return '#detail [data-detail-step="' + b.getAttribute('data-detail-step') + '"]';
    var c = b.closest('.card'), act = b.getAttribute('data-act'), bin = b.getAttribute('data-bin') || (c && c.getAttribute('data-bin'));
    if (bin && act) return '.card[data-bin="' + bin + '"] .step[data-act="' + act + '"]';
    return null;
  }
  function live(h) { /* the same button, even if its card / cart line was re-drawn */
    if (h.btn && h.btn.isConnected) return h.btn;
    if (!h.key) return null;
    var n = null; try { n = document.querySelector(h.key); } catch (e) {}
    if (n) h.btn = n; return n;
  }
  function valOf(b) {
    var box = b && b.closest('.stepper, .pick-stepper'); if (!box) return null;
    var v = box.querySelector('.count, .pick-qty'); if (!v) return null;
    return v.tagName === 'INPUT' ? String(v.value) : String(v.textContent);
  }
  function isPlus(b) { return /plus|inc/i.test((b.getAttribute('data-act') || '') + (b.getAttribute('data-detail-step') || '') + (b.hasAttribute('data-pick-inc') ? 'inc' : '')); }
  function gateBlocks(b) { try { return isPlus(b) && typeof window.stormJobCustOk === 'function' && !window.stormJobCustOk(); } catch (e) { return false; } }
  function stop() { if (!cur) return; clearTimeout(cur.t); if (cur.fired) swallowUntil = Date.now() + 600; cur = null; }
  function fire(h) {
    var b = live(h); if (!b || b.disabled) return false;
    if (gateBlocks(b)) return false;
    var v = valOf(b);
    if (h.fired && v !== null && v === h.lastV) return false; /* last step changed nothing: blocked or at the limit */
    if (!isPlus(b) && v !== null && Number(String(v).replace(/[^0-9.\-]/g, '')) <= 0) return false; /* min 0 */
    h.lastV = v; h.fired++;
    synth = true; try { b.click(); } finally { synth = false; }
    return true;
  }
  function loop(h) {
    if (cur !== h) return;
    if (!fire(h)) { h.done = true; return; }
    var el = Date.now() - h.start - HOLD;
    var d = el >= RAMP ? FAST : Math.round(FIRST - (FIRST - FAST) * (el / RAMP));
    h.t = setTimeout(function () { loop(h); }, d);
  }
  document.addEventListener('pointerdown', function (e) {
    if (e.button !== undefined && e.button !== 0) return;
    var b = e.target.closest && e.target.closest(SEL); if (!b) return;
    stop();
    var h = { btn: b, key: keyOf(b), x: e.clientX, y: e.clientY, start: Date.now(), fired: 0, lastV: null };
    cur = h;
    h.t = setTimeout(function () { loop(h); }, HOLD);
  }, true);
  document.addEventListener('pointermove', function (e) { if (cur && !cur.fired && (Math.abs(e.clientX - cur.x) > 12 || Math.abs(e.clientY - cur.y) > 12)) stop(); }, true);
  ['pointerup', 'pointercancel', 'touchend', 'touchcancel'].forEach(function (t) { document.addEventListener(t, stop, true); });
  window.addEventListener('blur', function (e) { if (e.target === window) stop(); }); /* app lost focus (not a button blur) */
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });
  document.addEventListener('pointerleave', function (e) { if (cur && (e.target === cur.btn || e.target === document.documentElement)) stop(); }, true);
  document.addEventListener('pointerout', function (e) { if (!cur || e.target !== cur.btn || !cur.btn.isConnected) return; var r = e.relatedTarget, rb = r && r.closest && r.closest(SEL); if (r && (cur.btn.contains(r) || (rb && keyOf(rb) === cur.key))) return; stop(); }, true);
  /* the release after a hold must not add one more */
  window.addEventListener('click', function (e) {
    if (synth || Date.now() > swallowUntil) return;
    swallowUntil = 0;
    if (e.target.closest && e.target.closest(SEL + ', .stepper, .pick-stepper, .card, #pick-sheet, #detail')) { e.preventDefault(); e.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest(SEL)) e.preventDefault(); }, true);
  document.addEventListener('selectstart', function (e) { if (cur || (e.target.closest && e.target.closest(SEL))) e.preventDefault(); }, true);

  /* (3) details panel: cart motion, sideways */
  var dst = document.createElement('style'); dst.id = 'storm-v165-css';
  dst.textContent = '@keyframes stDetIn165 { 0% { transform: translate3d(-102%,0,0); opacity: 1; } 100% { transform: none; opacity: 1; } }'
    + '@keyframes stDetOut165 { 0% { transform: none; opacity: 1; } 100% { transform: translate3d(-102%,0,0); opacity: 1; } }'
    + 'html body #detail.detail-overlay.open.fx-in { animation: stDetIn165 .25s ease both !important; transition: none !important; }'
    /* exact reverse of ease (.25,.1,.25,1) */
    + 'html body #detail.detail-overlay.open.fx-out { animation: stDetOut165 .25s cubic-bezier(.75,0,.75,.9) both !important; transition: none !important; pointer-events: none !important; }';
  document.head.appendChild(dst);
  /* phone back / swipe-back: run the same animated close as the X instead of the instant hide. Capture runs before the base handler,
     which then finds no detail open and does nothing, so it never plays twice. */
  window.addEventListener('popstate', function () {
    try {
      if (window.overlayOpen !== 'detail' || (history.state && history.state.overlay)) return;
      var d = document.getElementById('detail'); if (!d || !d.classList.contains('open') || d.classList.contains('fx-out')) return;
      window.overlayOpen = null; /* the back already happened, so closeDetail must not go back again */
      closeDetail();
    } catch (e) {}
  }, true);
})();

/* v166 (Hark, 2026-11-10, Dave): Item details photo rides in WITH the panel instead of popping in after it.
   Cause: the details photo is a fresh <img> whose picture has to come over the network again (the item's Drive-thumbnail address,
   rewritten to the full-size copy; the browser does not reuse the list's copy because the centering step fetches the same address in
   CORS mode and the host varies on Origin). Until it arrived, the v151/v164 code held the photo at opacity 0 and then faded it up over
   .26 s, so on a phone the panel slid in blank and the photo (and its white box, which is the <img> itself) showed up after it landed.
   The v164 cross-fade copy had the same problem (another fresh <img>, so a sharper swap could flash an empty white box), and the
   in-between copies (uncentered, then centered, then sharp uncentered, then sharp centered) changed the product's size on screen.
   Now: the photo and its box are fully visible from the first frame (no opacity hold or fade). The moment an item opens, the picture
   the list card is already showing is painted into the photo's box (a canvas laid exactly over it), already framed the way the final
   centered HD photo is framed (CROP below = the v96 centering crop of each assets/items-hd photo, measured once), so it moves with the
   panel as one piece. The cover stays put while the copies swap underneath and only cross-fades (.2 s, in place) once the final framed
   picture has loaded and decoded: same box, same size, no flash, no faint state. Any later swap is covered and cross-faded the same way. */
(function () {
  var CROP = {"az-01":[0.0657,0.4264,0.9293,0.1488,0.0556,0.0595,"255,255,255"],"az-02":[0.2798,0.0168,0.3051,0.9686,0.054,0.0579,"255,255,255"],"az-03":0,"az-04":0,"az-05":0,"az-06":0,"az-07":[0.0247,0.1872,0.9465,0.6878,0.0566,0.0606,"255,255,255"],"hd-01":[0.1273,0.1818,0.6929,0.618,0.0414,0.0444,"255,255,255"],"hd-02":0,"hd-03":0,"hd-04":0,"hd-05":[0.0652,0.2803,0.6586,0.4751,0.0394,0.0422,"255,255,255"],"hd-06":[0.1091,0.3074,0.5687,0.3918,0.0343,0.0368,"255,255,255"],"hd-07":0,"hd-08":0,"hd-09":0,"hd-10":0,"hd-100":[0.0475,0.1277,0.9051,0.8598,0.0545,0.0584,"255,255,255"],"hd-101":[0.3273,0.033,0.2808,0.9269,0.052,0.0557,"255,255,255"],"hd-102":[0.1328,0.2008,0.8121,0.7662,0.0485,0.0519,"255,255,255"],"hd-103":0,"hd-104":[0.1768,0.1169,0.7667,0.849,0.0475,0.0509,"255,255,255"],"hd-11":0,"hd-12":0,"hd-13":0,"hd-14":0,"hd-15":0,"hd-16":0,"hd-17":[0.2379,0.2765,0.4742,0.6466,0.0364,0.039,"255,255,255"],"hd-18":0,"hd-19":0,"hd-20":0,"hd-21":0,"hd-22":0,"hd-23":0,"hd-24":0,"hd-25":0,"hd-26":0,"hd-27":0,"hd-28":0,"hd-29":0,"hd-30":0,"hd-31":0,"hd-32":0,"hd-33":0,"hd-34":0,"hd-35":0,"hd-36":[0.1141,0.2397,0.7939,0.6131,0.0475,0.0509,"255,255,255"],"hd-37":[0.1172,0.2511,0.7652,0.5893,0.046,0.0492,"255,255,255"],"hd-38":[0.1293,0.2543,0.7551,0.5823,0.0455,0.0487,"255,255,255"],"hd-39":[0.1313,0.243,0.753,0.6066,0.0449,0.0482,"255,255,255"],"hd-40":0,"hd-41":0,"hd-42":0,"hd-43":0,"hd-44":0,"hd-45":0,"hd-46":0,"hd-47":0,"hd-49":0,"hd-50":0,"hd-51":0,"hd-52":0,"hd-53":0,"hd-54":0,"hd-55":0,"hd-56":0,"hd-57":0,"hd-58":0,"hd-59":0,"hd-60":[0.2798,0.04,0.3182,0.9389,0.0525,0.0563,"255,255,255"],"hd-61":0,"hd-62":0,"hd-63":0,"hd-64":[0.049,0.0152,0.8631,0.8047,0.052,0.0557,"255,255,255"],"hd-65":0,"hd-66":0,"hd-67":0,"hd-68":0,"hd-69":0,"hd-70":0,"hd-71":0,"hd-72":0,"hd-73":0,"hd-74":0,"hd-75":0,"hd-76":0,"hd-77":0,"hd-78":0,"hd-79":0,"hd-80":[0.148,0.0763,0.7086,0.9167,0.0515,0.0552,"255,255,255"],"hd-81":0,"hd-82":0,"hd-83":0,"hd-84":0,"hd-85":0,"hd-86":0,"hd-87":0,"hd-88":0,"hd-89":0,"hd-90":0,"hd-91":0,"hd-92":0,"hd-93":0,"hd-94":0,"hd-95":0,"hd-96":0,"hd-97":0,"hd-98":[0.1773,0.1163,0.7662,0.8496,0.0475,0.0509,"255,255,255"],"hd-99":0,"rt-02":[0.1394,0.1364,0.3758,0.7311,0.0409,0.0438,"255,255,255"],"rt-03":0,"rt-04":[0.0788,0.0823,0.5131,0.8274,0.0465,0.0498,"255,255,255"],"rt-06":[0.104,0.2267,0.7298,0.5087,0.0439,0.0471,"255,255,255"],"rt-07":0,"rt-08":[0.0949,0.105,0.748,0.6553,0.0449,0.0482,"255,255,255"],"rt-09":[0.1586,0.1347,0.4747,0.7684,0.0429,0.046,"255,255,255"],"rt-10":[0.149,0.085,0.3091,0.8258,0.0465,0.0498,"255,255,255"],"rt-11":0,"rt-12":[0.0434,0.2587,0.7763,0.4843,0.0465,0.0498,"255,255,255"],"rt-13":[0.1672,0.0698,0.2818,0.8615,0.0485,0.0519,"255,255,255"],"rt-14":0,"rt-16":[0.0439,0.3101,0.7838,0.3799,0.047,0.0503,"255,255,255"],"rt-17":[0.0566,0.1585,0.7455,0.6786,0.0449,0.0482,"255,255,255"],"rt-18":[0.0399,0.4389,0.7924,0.1169,0.0475,0.0509,"255,255,255"],"rt-19":[0.0641,0.1764,0.7288,0.6456,0.0439,0.0471,"255,255,255"],"rt-20":[0.1485,0.3425,0.3773,0.4957,0.0278,0.0298,"255,255,255"],"rt-21":0,"rt-22":[0.0414,0.1174,0.7879,0.7532,0.0475,0.0509,"255,255,255"],"rt-23":[0.0975,0.1201,0.7662,0.678,0.046,0.0492,"255,255,255"],"rt-24":[0.0444,0.1239,0.7712,0.7419,0.0465,0.0498,"255,255,255"],"rt-25":[0.0359,0.2208,0.796,0.5644,0.048,0.0514,"255,255,255"],"rt-26":[0.1076,0.1515,0.5227,0.724,0.0404,0.0433,"255,255,255"],"rt-29":[0.0505,0.2359,0.7808,0.5611,0.047,0.0503,"255,255,255"],"rt-30":[0.0944,0.0725,0.5889,0.8512,0.0475,0.0509,"255,255,255"],"rt-33":[0.1384,0.1039,0.6616,0.7256,0.0404,0.0433,"255,255,255"],"rt-34":[0.1571,0.1261,0.4348,0.7603,0.0424,0.0455,"255,255,255"],"rt-35":[0.0652,0.1753,0.7515,0.6358,0.0449,0.0482,"255,255,255"],"rt-36":[0.1359,0.0839,0.7404,0.6802,0.0444,0.0476,"255,255,255"],"rt-37":0,"rt-38":[0.2197,0.1061,0.5056,0.7976,0.0444,0.0476,"255,255,255"],"rt-39":[0.1859,0.5103,0.1737,0.2451,0.0136,0.0146,"255,255,255"],"rt-40":[0.0944,0.0725,0.5889,0.8512,0.0475,0.0509,"255,255,255"],"rt-41":[0.1197,0.125,0.4364,0.7619,0.0424,0.0455,"255,255,255"]};
  var HDU = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/items-hd/';
  var st = document.createElement('style'); st.id = 'storm-v166-css';
  st.textContent = 'html body #detail img.detail-photo, html body #detail img.detail-photo.st-wait, html body #detail img.detail-photo.st164-pend, html body #detail img.detail-photo.st164-show { opacity: 1 !important; transition: none !important; animation: none !important; visibility: visible !important; }'
    + '#detail canvas.st166-cover { position: absolute; z-index: 3; margin: 0 !important; pointer-events: none; opacity: 1; transition: opacity .2s ease-out; box-sizing: border-box; display: block; }'
    + '#detail img.st164-ghost { display: none !important; }';
  document.head.appendChild(st);
  var BOX = ['borderTopWidth', 'borderTopStyle', 'borderTopColor', 'borderRightWidth', 'borderRightStyle', 'borderRightColor', 'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor', 'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor', 'borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius', 'backgroundColor', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'];
  function cropOf(bin) { if (!bin) return undefined; var k = [bin, String(bin).toLowerCase(), String(bin).toUpperCase()]; for (var i = 0; i < 3; i++) if (CROP.hasOwnProperty(k[i])) return CROP[k[i]]; return undefined; }
  function shown(bin, raw) { /* the same item's picture already on screen (list card / cart line), loaded */
    var best = null;
    try {
      var c = document.querySelectorAll('img');
      for (var i = 0; i < c.length; i++) {
        var im = c[i]; if (im.closest('#detail')) continue;
        var s = im.getAttribute('src'); if (!s || !(im.complete && im.naturalWidth)) continue;
        var mine = (bin && im.getAttribute('data-details') === bin) || (raw && (s === raw || im.getAttribute('data-lo') === raw));
        if (mine && (!best || im.naturalWidth > best.naturalWidth)) best = im;
      }
    } catch (e) {}
    return best;
  }
  /* canvas the size of the photo box with src drawn the way the <img> draws it (object-fit); crop = draw it as the v96-centered copy */
  function paint(im, src, crop) {
    var w = im.offsetWidth, h = im.offsetHeight; if (!w || !h || !src || !src.naturalWidth) return null;
    var cs = getComputedStyle(im), cv = document.createElement('canvas');
    cv.className = 'st166-cover'; cv.setAttribute('aria-hidden', 'true');
    BOX.forEach(function (k) { cv.style[k] = cs[k]; });
    cv.style.width = w + 'px'; cv.style.height = h + 'px';
    function n(k) { return parseFloat(cs[k]) || 0; }
    var cw = w - n('borderLeftWidth') - n('borderRightWidth') - n('paddingLeft') - n('paddingRight');
    var ch = h - n('borderTopWidth') - n('borderBottomWidth') - n('paddingTop') - n('paddingBottom'); if (cw <= 0 || ch <= 0) return null;
    var dpr = Math.min(3, window.devicePixelRatio || 1);
    cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
    var nw = src.naturalWidth, nh = src.naturalHeight, sx = 0, sy = 0, sw = nw, sh = nh, px = 0, py = 0, vw = nw, vh = nh;
    if (crop && crop.length === 7) { sx = crop[0] * nw; sy = crop[1] * nh; sw = crop[2] * nw; sh = crop[3] * nh; px = crop[4] * nw; py = crop[5] * nh; vw = sw + 2 * px; vh = sh + 2 * py; }
    var fit = cs.objectFit, k;
    if (fit === 'cover') k = Math.max(cw / vw, ch / vh); else if (fit === 'fill') k = 0; else { k = Math.min(cw / vw, ch / vh); if (fit === 'scale-down') k = Math.min(k, 1); }
    var x = cv.getContext('2d'); x.imageSmoothingQuality = 'high'; x.scale(dpr, dpr);
    var ox, oy, kx, ky;
    if (k) { kx = ky = k; ox = (cw - vw * k) / 2; oy = (ch - vh * k) / 2; } else { kx = cw / vw; ky = ch / vh; ox = oy = 0; }
    if (crop && crop.length === 7 && crop[6] !== 't') { x.fillStyle = 'rgb(' + crop[6] + ')'; x.fillRect(ox, oy, vw * kx, vh * ky); }
    x.drawImage(src, sx, sy, sw, sh, ox + px * kx, oy + py * ky, sw * kx, sh * ky);
    return cv;
  }
  function copy(cv) { var c = cv.cloneNode(false); c.width = cv.width; c.height = cv.height; c.getContext('2d').drawImage(cv, 0, 0); c.style.opacity = '1'; return c; }
  function place(im, cv) {
    cv.style.left = '0px'; cv.style.top = '0px';
    im.parentNode.insertBefore(cv, im.nextSibling);
    var a = cv.getBoundingClientRect(), b = im.getBoundingClientRect();
    cv.style.left = (b.left - a.left) + 'px'; cv.style.top = (b.top - a.top) + 'px';
  }
  function prime() {
    var bin = (typeof currentDetailBin !== 'undefined') && currentDetailBin; if (!bin) return;
    var d = document.getElementById('detail'), im = d && d.querySelector('img.detail-photo'); if (!im || im.__st166 || !im.parentNode) return;
    im.__st166 = true;
    var it = (typeof findItem === 'function') && findItem(bin), raw = it && it.photoUrl, crop = cropOf(bin), t0 = Date.now();
    var hd = HDU + encodeURIComponent(bin) + '.jpg';
    var snap = null, cover = null, tries = 0, lastUrl = '';
    function ready() { return im.complete && im.naturalWidth > 0; }
    function framed(s) { /* is this copy framed like the final photo? (otherwise a lift would change the product's size) */
      if (Date.now() - t0 > 5000 || crop === undefined) return true;
      if (crop && crop.length === 7) return /^data:/.test(s);
      return s.indexOf(hd) === 0; /* already centered: the sharp HD copy as is */
    }
    function lift() { /* the right picture is decoded underneath: fade the cover off it */
      var c = cover; cover = null; if (!c) return;
      requestAnimationFrame(function () { c.style.opacity = '0'; setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 260); });
    }
    function settle() {
      if (!im.isConnected || !ready()) return;
      var s0 = im.getAttribute('src') || '';
      var ok = function () {
        if (!im.isConnected || im.getAttribute('src') !== s0 || !ready()) return;
        if (!framed(s0) && !(/^data:/.test(s0) && lastUrl.indexOf(hd) === 0)) return;
        try { var p = paint(im, im, null); if (p) snap = p; } catch (e) {}
        lift();
      };
      if (im.decode) im.decode().then(ok, ok); else ok();
    }
    function coverNow() { if (cover || !snap || !im.isConnected) return; try { cover = copy(snap); place(im, cover); } catch (e) { cover = null; } }
    try { snap = paint(im, shown(bin, raw), crop); } catch (e) { snap = null; }
    im.classList.remove('st164-pend', 'st-wait');
    Promise.resolve().then(function () { im.classList.remove('st164-pend', 'st-wait'); });
    if (snap) coverNow(); else settle();
    new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.attributeName !== 'src') return;
        var s = im.getAttribute('src') || ''; if (!/^data:/.test(s)) lastUrl = s;
        if (m.oldValue !== s) { im.classList.remove('st164-pend', 'st-wait'); if (!cover && snap && !(ready() && framed(s))) coverNow(); settle(); }
      });
    }).observe(im, { attributes: true, attributeFilter: ['src'], attributeOldValue: true });
    lastUrl = im.getAttribute('src') || '';
    new MutationObserver(function () { if (im.parentNode) im.parentNode.querySelectorAll(':scope > img.st164-ghost').forEach(function (g) { g.remove(); }); })
      .observe(im.parentNode, { childList: true });
    im.addEventListener('load', settle);
    (function poll() { if (!im.isConnected || ++tries > 400) return; if (cover) settle(); setTimeout(poll, 60); })();
  }
  if (typeof openDetail === 'function') { var _o = openDetail; openDetail = function () { var r = _o.apply(this, arguments); try { prime(); } catch (e) {} return r; }; }
})();

/* v167 (Hark, 2026-11-10, Dave): Pull List in the approved "Truck Check" look.
   Dark sheet (#0E1621) with a blue-to-dark header: STORM logo + X, the customer's name big, the address (and Jobber # when the job
   came from Jobber), and a "Loaded on truck  N of M" bar. Every line is a rounded card with a 30px check box on the left; tap the box
   to mark the line loaded (blue box with a check, line dimmed with the name struck through). Tapping the rest of the line still opens
   the photo peek. Checks are kept on this phone only (localStorage, per customer name + address); nothing about them goes to the
   sheet or the server. The customer First / Last / Address fields, Find a Job and New Job stay right under the header, still required.
   Footer: ghost Print and blue Save Job side by side, pinned to the bottom of the sheet. The printed Pull List is unchanged. */
(function () {
  var CK = 'stormTruckCheckV1', CUST = 'stormJobCustomerV1';
  var LOGO = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/logos/STORM-logo-color-transparent.svg';
  var S = 'html body #pull-sheet.tc';
  var st = document.createElement('style'); st.id = 'storm-v167-css';
  st.textContent = ''
    + S + ' { background: #0E1621 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #1F3246 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(0,0,0,.45) !important; color: #fff !important; height: 88vh; height: 88dvh; max-height: 88dvh; }'
    + S + ' .tc-top { padding: 0 18px 12px; background: linear-gradient(180deg, #14324A 0%, #0E1621 100%); border-radius: 22px 22px 0 0; }'
    + S + ' .tc-grab { width: 42px; height: 5px; border-radius: 3px; margin: 8px auto 0; background: rgba(159,179,200,.35); }'
    + S + ' .pick-sheet-head { padding: 10px 0 0 !important; border: 0 !important; background: transparent !important; }'
    + S + ' .pick-sheet-head h2 { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }'
    + S + ' .tc-logo { display: block; height: 22px; width: auto; }'
    + S + ' .pick-sheet-close { color: #9FB3C8 !important; font-size: 30px !important; padding: 2px 4px 2px 12px !important; background: transparent !important; border: 0 !important; }'
    + S + ' .tc-name { margin-top: 14px; font-size: 24px; font-weight: 800; line-height: 1.2; color: #fff; overflow-wrap: anywhere; }'
    + S + ' .tc-name.tc-none { color: #7E93A8; font-weight: 700; font-size: 20px; }'
    + S + ' .tc-addr { margin-top: 4px; font-size: 13px; line-height: 1.35; color: #9FB3C8; overflow-wrap: anywhere; }'
    + S + ' .tc-prog { margin-top: 14px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #9FB3C8; }'
    + S + ' .tc-prog b { color: #29ABE2; font-weight: 800; }'
    + S + ' .tc-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #1E2C3B; overflow: hidden; }'
    + S + ' .tc-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: linear-gradient(90deg, #29ABE2, #5FD3FF); transition: width .25s ease; }'
    + S + ' .tc-sum { margin-top: 6px; font-size: 11.5px; color: #7E93A8; }'
    + S + '.tc-empty .tc-prog, ' + S + '.tc-empty .tc-bar, ' + S + '.tc-empty .tc-sum { display: none; }'
    /* customer fields */
    + S + ' .jc-box { padding: 4px 14px 2px !important; gap: 8px !important; }'
    + S + ' .jc-in { height: 44px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 12px !important; color: #fff !important; }'
    + S + ' .jc-in::placeholder { color: #7E93A8 !important; }'
    + S + ' .jc-in:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; }'
    + S + ' .jc-in.st-need { border-color: #fca5a5 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.3) !important; }'
    + S + ' .jc-find, ' + S + ' .jc-clear { height: 40px !important; border-radius: 12px !important; background: transparent !important; border: 1.5px solid #3B536B !important; color: #fff !important; font-size: 14.5px !important; box-shadow: none !important; }'
    /* lines */
    + S + ' .pick-lines { padding: 2px 14px 10px !important; }'
    + S + ' .pick-line { gap: 12px !important; padding: 12px !important; margin-top: 8px; border: 1px solid #1F3246 !important; border-radius: 14px !important; background: #152231 !important; transition: opacity .2s ease; }'
    + S + ' .pick-line img { width: 46px !important; height: 46px !important; flex: 0 0 46px !important; border-radius: 10px !important; background: #fff !important; object-fit: cover; }'
    + S + ' .pick-line-name { font-size: 15px !important; font-weight: 700 !important; line-height: 1.25 !important; color: #fff !important; overflow-wrap: anywhere; }'
    + S + ' .pick-line-code { font-size: 12px !important; margin-top: 3px !important; color: #7E93A8 !important; }'
    + S + ' .tc-ck { flex: 0 0 30px; width: 30px; height: 30px; margin: 0; padding: 0; border-radius: 9px; border: 2px solid #3B536B; background: transparent; color: #fff; font-size: 17px; font-weight: 900; line-height: 26px; text-align: center; font-family: inherit; -webkit-tap-highlight-color: transparent; position: relative; }'
    + S + ' .tc-ck::after { content: ""; position: absolute; inset: -9px; }' /* bigger tap area */
    + S + ' .pick-line.tc-done { opacity: .55; }'
    + S + ' .pick-line.tc-done .tc-ck { background: #29ABE2; border-color: #29ABE2; }'
    + S + ' .pick-line.tc-done .pick-line-name { text-decoration: line-through; text-decoration-thickness: 2px; }'
    + S + ' .pull-qty { width: auto !important; min-width: 44px !important; min-height: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; align-items: flex-end !important; }'
    + S + ' .pull-qty b { font-size: 22px !important; font-weight: 800 !important; line-height: 1.05 !important; color: #29ABE2 !important; }'
    + S + ' .pull-qty span { margin-top: 2px; font-size: 10px !important; font-weight: 700 !important; letter-spacing: .04em; text-transform: uppercase; color: #7E93A8 !important; }'
    + S + ' .pick-empty { color: #9FB3C8 !important; }'
    /* footer */
    + S + ' .pick-sheet-foot { position: sticky; bottom: 0; z-index: 2; margin-top: auto; display: flex !important; gap: 10px; padding: 12px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #0E1621 !important; border-top: 1px solid #1F3246 !important; }'
    + S + ' .pick-sheet-foot > div { display: none !important; }'
    + S + ' .pull-print, ' + S + ' .pull-save { flex: 1 1 0; display: block; width: auto !important; min-height: 54px !important; margin: 0 !important; border-radius: 14px !important; font-family: inherit; box-shadow: none !important; }'
    + S + ' .pull-print { order: 1; background: transparent !important; border: 1.5px solid #3B536B !important; color: #fff !important; font-size: 15px !important; font-weight: 700 !important; }'
    + S + ' .pull-save { order: 2; background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; border: 0 !important; color: #04121D !important; font-size: 16px !important; font-weight: 800 !important; }'
    + S + ' button:disabled { opacity: .5 !important; }';
  document.head.appendChild(st);

  function norm(v) { return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function cust() { try { return JSON.parse(localStorage.getItem(CUST) || '{}') || {}; } catch (e) { return {}; } }
  function jobKey() { var c = cust(); return 'c:' + norm(c.first) + '|' + norm(c.last) + '|' + norm(c.address); }
  function allChecks() { try { return JSON.parse(localStorage.getItem(CK) || '{}') || {}; } catch (e) { return {}; } }
  function checked() { var a = allChecks()[jobKey()]; return (a && Array.isArray(a.bins)) ? a.bins : []; }
  function saveChecked(bins) {
    var all = allChecks(), k = jobKey();
    if (bins.length) all[k] = { bins: bins, t: Date.now() }; else delete all[k];
    var keys = Object.keys(all).sort(function (a, b) { return (all[b].t || 0) - (all[a].t || 0); });
    keys.slice(40).forEach(function (x) { delete all[x]; }); /* keep the 40 most recent jobs */
    try { localStorage.setItem(CK, JSON.stringify(all)); } catch (e) {}
  }
  function sheet() { return document.getElementById('pull-sheet'); }

  function paintHead(sh) {
    var c = cust(), n = [String(c.first || '').trim(), String(c.last || '').trim()].filter(Boolean).join(' ');
    var nm = sh.querySelector('.tc-name'), ad = sh.querySelector('.tc-addr'); if (!nm || !ad) return;
    nm.textContent = n || 'New job'; nm.classList.toggle('tc-none', !n);
    var a = String(c.address || '').trim(), bits = [];
    if (a) bits.push(a); if (c.jobberJobNumber) bits.push('Jobber #' + c.jobberJobNumber);
    ad.textContent = bits.length ? bits.join(' · ') : 'Add the customer below';
  }
  function paintChecks(sh) {
    var on = checked(), lines = sh.querySelectorAll('.pick-line[data-pull-bin]'), done = 0;
    lines.forEach(function (ln) {
      var d = on.indexOf(ln.getAttribute('data-pull-bin')) >= 0; if (d) done++;
      ln.classList.toggle('tc-done', d);
      var b = ln.querySelector('.tc-ck'); if (b) { b.textContent = d ? '\u2713' : ''; b.setAttribute('aria-pressed', d ? 'true' : 'false'); }
    });
    var tot = lines.length, p = sh.querySelector('.tc-prog-n'), bar = sh.querySelector('.tc-bar i');
    if (p) p.innerHTML = '<b>' + done + '</b> of ' + tot;
    if (bar) bar.style.width = (tot ? Math.round(done / tot * 100) : 0) + '%';
    sh.classList.toggle('tc-empty', !tot);
  }
  function fixLabels(sh) {
    var sv = sh.querySelector('.pull-save'); if (sv && sv.textContent === 'Save Job to Sheet') sv.textContent = 'Save Job';
    var pr = sh.querySelector('.pull-print'); if (pr && pr.textContent === 'Print Pull List') pr.textContent = 'Print';
  }
  function decorate() {
    var sh = sheet(); if (!sh) return;
    sh.classList.add('tc');
    var head = sh.querySelector(':scope > .pick-sheet-head');
    if (!head || sh.querySelector(':scope > .tc-top')) return;
    var top = document.createElement('div'); top.className = 'tc-top';
    sh.insertBefore(top, head);
    var grab = document.createElement('div'); grab.className = 'tc-grab'; grab.setAttribute('aria-hidden', 'true'); top.appendChild(grab);
    top.appendChild(head);
    if (!head.querySelector('.tc-logo')) { var lg = document.createElement('img'); lg.className = 'tc-logo'; lg.alt = 'STORM'; lg.src = LOGO; head.insertBefore(lg, head.firstChild); }
    var sumEl = sh.querySelector('.pick-sheet-foot > div'), sum = sumEl ? sumEl.textContent : '';
    var x = document.createElement('div');
    x.innerHTML = '<div class="tc-name"></div><div class="tc-addr"></div>'
      + '<div class="tc-prog"><span>Loaded on truck</span><span class="tc-prog-n"></span></div><div class="tc-bar"><i></i></div>'
      + '<div class="tc-sum">' + esc(sum) + '</div>';
    while (x.firstChild) top.appendChild(x.firstChild);
    sh.querySelectorAll('.pick-line[data-pull-bin]').forEach(function (ln) {
      var code = ln.querySelector('.pick-line-code');
      if (code) { var keep = code.textContent.split(' · ').filter(function (s) { return /^Bin /.test(s) || /^\d+ [a-z]+$/i.test(s); }); if (keep.length) code.textContent = keep.join(' · '); }
      if (!ln.querySelector('.tc-ck')) { var b = document.createElement('button'); b.type = 'button'; b.className = 'tc-ck'; b.setAttribute('aria-label', 'Loaded on truck'); ln.insertBefore(b, ln.firstChild); }
    });
    fixLabels(sh); paintHead(sh); paintChecks(sh);
    var sv = sh.querySelector('.pull-save');
    if (sv && !sv.__tc) { sv.__tc = true; new MutationObserver(function () { fixLabels(sh); }).observe(sv, { childList: true, characterData: true, subtree: true }); }
  }
  function attach() {
    var sh = sheet(); if (!sh || sh.__tc167) return !!sh;
    sh.__tc167 = true;
    new MutationObserver(function () { try { decorate(); } catch (e) {} }).observe(sh, { childList: true });
    try { decorate(); } catch (e) {}
    return true;
  }
  /* tap the box: toggle loaded (does not open the photo peek) */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('#pull-sheet .tc-ck'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var ln = b.closest('[data-pull-bin]'), sh = sheet(); if (!ln || !sh) return;
    var bin = ln.getAttribute('data-pull-bin'), on = checked(), i = on.indexOf(bin);
    if (i >= 0) on.splice(i, 1); else on.push(bin);
    saveChecked(on); paintChecks(sh);
  }, true);
  /* name / address typed, New Job, or a job loaded: header and checks follow the customer */
  function later() { setTimeout(function () { var sh = sheet(); if (sh && sh.querySelector('.tc-top')) { paintHead(sh); paintChecks(sh); } }, 0); }
  document.addEventListener('input', function (e) { if (e.target && e.target.getAttribute && e.target.getAttribute('data-jc')) later(); }, true);
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('[data-jc-clear], #job-find')) later(); }, true);
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 60) return; setTimeout(poll, 250); })(); }
})();

/* v168 (Hark, 2026-11-10, Dave): side menu in the Truck Check look, same contents and line icons as before.
   Solid dark menu (#101B28) instead of glass; section titles (Products, Quote Templates, Resource Center) are small grey caps; every row
   is a rounded dark card (#152231); icons stay white line icons on dark tiles (#0E1621, 1.5px #2A4A66 border, 11px corners); All Products
   and each supplier show their item count in a blue-tinted pill. Footer: white Jobber and CompanyCam logos on one line with the divider
   between them. No white box or background behind any logo. The STORM logo stays out of the menu header, and the Quote Templates
   heading still has no Jobber logo (both as Dave asked earlier). */
(function () {
  var P = 'html body #drawer.drawer';
  var TILE = P + ' .drawer-item > svg, ' + P + ' .drawer-item > .v116-ico, ' + P + ' .drawer-item > .drawer-chk-ico, ' + P + ' .drawer-item > .res-ico, ' + P + ' .drawer-item > .chk-ico-img, ' + P + ' .drawer-section-head > .lbl-ico';
  var CARD = P + ' .drawer-item, ' + P + ' #drawer-labels > .drawer-section-head';
  function chev(c) { return 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23' + c + '\' stroke-width=\'2.6\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><path d=\'M9 5l7 7-7 7\'/></svg>") center / 16px 16px no-repeat !important'; }
  var GREY = chev('7E93A8'), BLUE = chev('29ABE2');
  var st = document.createElement('style'); st.id = 'storm-v168-css';
  st.textContent = ''
    + P + ' { width: 310px !important; max-width: 86vw !important; background: #101B28 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-right: 1px solid #1F3246 !important; box-shadow: 10px 0 34px rgba(0,0,0,.45) !important; color: #fff !important; }'
    + P + ' .drawer-head { padding: calc(14px + env(safe-area-inset-top)) 14px 4px !important; min-height: 0 !important; flex: none !important; background: transparent !important; }'
    + P + ' .drawer-close { width: 38px !important; height: 38px !important; border-radius: 11px !important; border: 1.5px solid #2A4A66 !important; background: transparent !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; color: #E6F4FC !important; font-size: 24px !important; line-height: 1 !important; }'
    + P + ' .drawer-section { border: 0 !important; padding: 0 14px; background: transparent !important; }'
    + P + ' .drawer-section .drawer-section { padding: 0; }'
    /* section titles */
    + P + ' > .drawer-section > .drawer-section-head { padding: 16px 4px 4px !important; min-height: 0 !important; background: transparent !important; border: 0 !important; font-size: 11.5px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; color: #7E93A8 !important; box-shadow: none !important; }'
    + P + ' > .drawer-section > .drawer-section-head > span:not(.drawer-chevron) { color: #7E93A8 !important; font: inherit !important; letter-spacing: inherit !important; text-transform: inherit !important; }'
    + P + ' .drawer-section > .drawer-section-head > .drawer-chevron, ' + P + ' .drawer-item > .drawer-chevron { background: ' + GREY + '; }'
    + P + ' .drawer-section.expanded > .drawer-section-head > .drawer-chevron, ' + P + ' .drawer-supplier.open > .drawer-item > .drawer-chevron { background: ' + BLUE + '; }'
    + P + ' > .drawer-section > .drawer-section-head:active, ' + P + ' > .drawer-section > .drawer-section-head.pressed { background: transparent !important; color: #9FB3C8 !important; }'
    + P + ' .drawer-items, ' + P + ' .drawer-cats, ' + P + ' .drawer-supplier { background: transparent !important; }'
    /* rows = cards */
    + CARD + ' { box-sizing: border-box !important; min-height: 50px; margin-top: 6px !important; padding: 5px 12px 5px 6px !important; gap: 12px !important; border: 1px solid #1F3246 !important; border-radius: 12px !important; background: #152231 !important; color: #fff !important; box-shadow: none !important; font-size: 15.5px !important; font-weight: 700 !important; }'
    + P + ' .drawer-item:active, ' + P + ' .drawer-item.pressed, ' + P + ' #drawer-labels > .drawer-section-head:active, ' + P + ' #drawer-labels > .drawer-section-head.pressed { background: #1B2D40 !important; }'
    + P + ' #drawer-products > .drawer-items > .drawer-item:first-child, ' + P + ' #drawer-qt .drawer-item { padding-left: 16px !important; }'
    + P + ' .drawer-item .drawer-item-name, ' + P + ' .drawer-item .drawer-item-name.v116-name { color: #fff !important; font-size: 15.5px !important; font-weight: 700 !important; line-height: 1.25 !important; }'
    + P + ' .drawer-supplier.open > .drawer-item { border-color: #29ABE2 !important; background: #163049 !important; }'
    + P + ' #drawer-labels.expanded > .drawer-section-head { border-color: #29ABE2 !important; background: #163049 !important; }'
    + P + ' #drawer-labels > .drawer-section-head { width: 100% !important; justify-content: flex-start !important; }'
    + P + ' #drawer-labels .drawer-items .drawer-item { margin-left: 16px !important; width: calc(100% - 16px) !important; }'
    /* icon tiles */
    + TILE + ' { box-sizing: border-box !important; width: 38px !important; height: 38px !important; flex: 0 0 38px !important; padding: 8px !important; margin: 0 !important; border-radius: 11px !important; background: #0E1621 !important; border: 1.5px solid #2A4A66 !important; box-shadow: none !important; color: #fff !important; }'
    /* supplier categories (open a supplier) */
    + P + ' .drawer-cat { box-sizing: border-box; margin-top: 2px !important; padding: 9px 12px 9px 62px !important; border: 0 !important; border-radius: 10px !important; background: transparent !important; color: #C9D6E3 !important; font-size: 14px !important; }'
    + P + ' .drawer-cat .drawer-item-name { color: #C9D6E3 !important; font-size: 14px !important; font-weight: 600 !important; }'
    + P + ' .drawer-cat:active, ' + P + ' .drawer-cat.pressed { background: #1B2D40 !important; }'
    /* count pills: All Products + each supplier */
    + P + ' #drawer-products > .drawer-items > .drawer-item > .drawer-count, ' + P + ' #drawer-products .drawer-supplier > .drawer-item > .drawer-count { display: inline-block !important; flex: none; min-width: 0; margin-left: auto; padding: 3px 9px; border-radius: 8px; background: rgba(41,171,226,.15) !important; color: #5FD3FF !important; font-size: 12.5px; font-weight: 800; line-height: 1.3; }'
    + P + ' #drawer-products > .drawer-items > .drawer-item:first-child > .drawer-count { margin-right: 4px; }'
    /* footer: Jobber | CompanyCam, white logos, no boxes */
    + P + ' .drawer-foot { display: flex !important; align-items: center !important; justify-content: space-between !important; flex: none !important; gap: 10px; margin: auto 14px 0 !important; padding: 12px 2px calc(16px + env(safe-area-inset-bottom)) !important; border-top: 1px solid #1F3246 !important; background: transparent !important; }'
    + P + ' .drawer-foot .drawer-jobber { width: auto !important; flex: 0 1 auto; padding: 6px 0 !important; margin: 0 !important; background: transparent !important; border: 0 !important; box-shadow: none !important; }'
    + P + ' .drawer-foot .drawer-jobber img { height: 21px !important; width: auto !important; max-width: 118px !important; object-fit: contain; background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; border-radius: 0 !important; }'
    + P + ' .drawer-foot .drawer-jobber:active, ' + P + ' .drawer-foot .drawer-jobber.pressed { background: transparent !important; opacity: .75; }'
    + P + ' .drawer-foot .st164-div { flex: none; width: 0 !important; height: 26px !important; margin: 0 !important; border: 0 !important; border-left: 1px solid #2A4A66 !important; }';
  document.head.appendChild(st);
})();

/* v169 (Hark, 2026-11-10, Dave): Inventory home in the Truck Check look. Same list, search, tabs, steppers (hold-to-repeat untouched),
   Keep on hand, Details, Add to order, Order and the Scan / Cart / Pull / Quote buttons; only the look changes.
   Dark page (#0E1621), header fades #14324A -> #0E1621, dark search box and menu tile, All Items / Needs Ordering as a dark segmented
   control with the active side blue, category titles as small grey caps with a blue-tinted count pill, every item a dark rounded card
   (#152231) with the product photo on a light tile, white name, grey bin / SKU line, the existing LOW / OUT flags as amber / red pills,
   round dark -/+ (blue +), ghost Keep on hand / Details / Add to order and a blue Order. Supplier logos on the cards use white-on-dark
   copies (assets/supplier-dark/, no white box); Hilti keeps its own red logo. "Stocked to par  X of Y lines" bar above the list,
   counted from the items on screen that have a par above 0 (on hand >= par); it hides itself when none of them has a par. */
(function () {
  var B = 'html body';
  var D = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/supplier-dark/';
  var st = document.createElement('style'); st.id = 'storm-v169-css';
  st.textContent = ''
    + B + ', html { background: #0E1621 !important; }'
    + B + ' { color: #fff; }'
    + B + ' .topbar { background: #0E1621 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-bottom: 1px solid #1F3246 !important; box-shadow: none !important; }'
    + B + ' .topbar > header { background: linear-gradient(180deg, #14324A 0%, #0E1621 100%) !important; }'
    + B + ' .toolbar { background: transparent !important; padding-bottom: 10px !important; }'
    + B + ' #hamburger.hamburger { background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; box-shadow: none !important; }'
    + B + ' #hamburger.hamburger span { background: #E6F4FC !important; }'
    + B + ' #search { background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; color: #fff !important; box-shadow: none !important; }'
    + B + ' #search::placeholder { color: #7E93A8 !important; }'
    + B + ' #search:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; outline: none !important; }'
    /* All Items / Needs Ordering = segmented control */
    + B + ' .toolbar .tabs { gap: 4px !important; padding: 4px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; }'
    + B + ' .toolbar .tab { border: 0 !important; border-radius: 11px !important; background: transparent !important; color: #9FB3C8 !important; font-weight: 800 !important; box-shadow: none !important; }'
    + B + ' .toolbar .tab.active { background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; color: #04121D !important; }'
    + B + ' .toolbar .tab .badge { background: rgba(41,171,226,.15) !important; color: #5FD3FF !important; }'
    + B + ' .toolbar .tab.active .badge { background: rgba(4,18,29,.18) !important; color: #04121D !important; }'
    /* stocked-to-par bar */
    + B + ' #tk-par { margin: 12px 14px 0; }'
    + B + ' #tk-par[hidden] { display: none !important; }'
    + B + ' #tk-par .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13.5px; color: #9FB3C8; }'
    + B + ' #tk-par .tk-row b { color: #29ABE2; font-weight: 800; }'
    + B + ' #tk-par .tk-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #1E2C3B; overflow: hidden; }'
    + B + ' #tk-par .tk-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: linear-gradient(90deg, #29ABE2, #5FD3FF); transition: width .25s ease; }'
    /* category titles */
    + B + ' #list .cat-head { margin: 22px 2px 6px !important; padding: 2px 4px !important; background: transparent !important; background-image: none !important; border: 0 !important; box-shadow: none !important; }'
    + B + ' #list .cat-head::before { display: none !important; }'
    + B + ' #list .cat-head .cat-name { color: #7E93A8 !important; font-size: 12px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; text-shadow: none !important; }'
    + B + ' #list .cat-head .cat-count { padding: 3px 9px !important; border-radius: 8px !important; background: rgba(41,171,226,.15) !important; color: #5FD3FF !important; font-size: 11.5px !important; font-weight: 800 !important; border: 0 !important; }'
    /* item cards */
    + B + ' .card { background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; box-shadow: none !important; color: #fff !important; }'
    + B + ' .card.low { box-shadow: inset 4px 0 0 #F59E0B !important; }'
    + B + ' .card.out { box-shadow: inset 4px 0 0 #EF4444 !important; }'
    + B + ' .card .photo { background: #fff !important; border: 0 !important; border-radius: 12px !important; }'
    + B + ' .card .bin { color: #C9D6E3 !important; text-transform: uppercase; font-weight: 800 !important; }'
    + B + ' .card .supplier { color: #7E93A8 !important; }'
    + B + ' .card .name { color: #fff !important; font-weight: 800 !important; }'
    + B + ' .card .sku, ' + B + ' .card .ft-note { color: #9FB3C8 !important; }'
    + B + ' .card .price { color: #fff !important; }'
    + B + ' .card .ft-line { color: #5FD3FF !important; }'
    + B + ' .card .need-qty { color: #F59E0B !important; }'
    + B + ' .flag { padding: 3px 9px !important; border-radius: 8px !important; font-size: 11.5px !important; letter-spacing: .04em; }'
    + B + ' .flag.low { background: rgba(245,158,11,.16) !important; color: #F59E0B !important; }'
    + B + ' .flag.out { background: rgba(239,68,68,.16) !important; color: #EF4444 !important; }'
    + B + ' .card .supplier-logo { background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; }'
    + B + ' img.supplier-logo[src*="1DHznKkuGyRWhuFvJplltMJVokeP2eURA"], ' + B + ' img.detail-logo[src*="1DHznKkuGyRWhuFvJplltMJVokeP2eURA"] { content: url("' + D + 'rt-dark.png"); }'
    + B + ' img.supplier-logo[src*="1il864wxNHhA_e0hf0CcbBh97LsYbWq3s"], ' + B + ' img.detail-logo[src*="1il864wxNHhA_e0hf0CcbBh97LsYbWq3s"] { content: url("' + D + 'hd-dark.png"); }'
    + B + ' img.supplier-logo[src*="1bQxJWNeUMWHnNCqakwQFb_buDEJsMIBh"], ' + B + ' img.detail-logo[src*="1bQxJWNeUMWHnNCqakwQFb_buDEJsMIBh"] { content: url("' + D + 'az-dark.png"); }'
    /* steppers + buttons on cards */
    + B + ' .card .stepper { gap: 8px !important; border: 0 !important; border-radius: 0 !important; overflow: visible !important; background: transparent !important; }'
    + B + ' .card .step { width: 46px !important; height: 46px !important; border-radius: 50% !important; border: 1.5px solid #3B536B !important; background: transparent !important; color: #E6F4FC !important; font-size: 24px !important; box-shadow: none !important; }'
    + B + ' .card .step[data-act="plus"] { border-color: #29ABE2 !important; color: #29ABE2 !important; }'
    + B + ' .card .step:active { background: #1B2D40 !important; }'
    + B + ' .card .count { width: 52px !important; height: 46px !important; background: transparent !important; color: #fff !important; font-size: 22px !important; font-weight: 800 !important; border: 0 !important; }'
    + B + ' .card .count::placeholder { color: #7E93A8 !important; }'
    + B + ' .card .ft-tag { color: #9FB3C8 !important; }'
    + B + ' .card .par, ' + B + ' .card .details-btn { background: transparent !important; border: 1.5px solid #3B536B !important; border-radius: 12px !important; color: #fff !important; box-shadow: none !important; }'
    + B + ' .card .pick-add { background: transparent !important; border: 1.5px solid #29ABE2 !important; border-radius: 12px !important; color: #5FD3FF !important; box-shadow: none !important; }'
    + B + ' .card .pick-add.in-list { background: rgba(41,171,226,.15) !important; }'
    + B + ' .card .order { background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; border: 0 !important; border-radius: 12px !important; color: #04121D !important; font-weight: 800 !important; box-shadow: none !important; }'
    /* floating buttons: Scan / Pull / Quote dark, Cart blue */
    + B + ' .fab-dock .scan-btn, ' + B + ' .fab-dock .pull-fab, ' + B + ' .fab-dock .quote-fab { background: #152231 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 1px solid #2A4A66 !important; color: #fff !important; box-shadow: 0 6px 18px rgba(0,0,0,.4) !important; }'
    + B + ' .fab-dock #cart-fab.cart-fab { background: linear-gradient(135deg, #29ABE2, #5FD3FF) !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 0 !important; color: #04121D !important; box-shadow: 0 6px 22px rgba(41,171,226,.4) !important; }'
    + B + ' .fab-dock .cart-fab-total { background: #152231 !important; border: 1px solid #1F3246; color: #fff !important; }'
    + B + ' .jobber-logo { filter: brightness(0) invert(1) !important; }'
    + B + ' .empty, ' + B + ' .loading { color: #9FB3C8 !important; background: transparent !important; }'
    + B + ' .foot { color: #7E93A8 !important; }'
    + B + ' .foot #refresh { background: transparent !important; border: 1.5px solid #3B536B !important; color: #fff !important; border-radius: 12px !important; }';
  document.head.appendChild(st);

  function paint() {
    var list = document.getElementById('list'), bar = document.getElementById('tk-par'); if (!list) return;
    if (!bar) {
      bar = document.createElement('div'); bar.id = 'tk-par'; bar.hidden = true;
      bar.innerHTML = '<div class="tk-row"><span>Stocked to par</span><span class="tk-n"></span></div><div class="tk-bar"><i></i></div>';
      list.parentNode.insertBefore(bar, list);
    }
    var seen = {}, tot = 0, ok = 0;
    list.querySelectorAll('.card[data-bin]').forEach(function (c) {
      var bin = c.getAttribute('data-bin'); if (seen[bin]) return; seen[bin] = 1;
      var it = null; try { it = findItem(bin); } catch (e) {}
      if (!it || it.par == null || !(Number(it.par) > 0)) return;
      tot++; if (Number(it.onHand) >= Number(it.par)) ok++;
    });
    bar.hidden = !tot || list.offsetParent === null;
    if (!tot) return;
    bar.querySelector('.tk-n').innerHTML = '<b>' + ok + '</b> of ' + tot + ' line' + (tot === 1 ? '' : 's');
    bar.querySelector('.tk-bar i').style.width = Math.round(ok / tot * 100) + '%';
  }
  var t = 0; function soon() { clearTimeout(t); t = setTimeout(function () { try { paint(); } catch (e) {} }, 120); }
  function attach() {
    var list = document.getElementById('list'); if (!list || list.__tk169) return !!list;
    list.__tk169 = true;
    new MutationObserver(soon).observe(list, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    soon(); return true;
  }
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 60) return; setTimeout(poll, 250); })(); }
})();

/* v170 (Hark, 2026-11-10, Dave): Item details in the Truck Check look. Same contents, same order (the -/+ and Order stay right under the
   photo, as set in v73), same swipe, close, photo ride-in, bin label tile and logo tap.
   Dark sheet (#0E1621) with the blue-to-dark top bar and a dark rounded back tile; product photo on a light rounded tile; big white name
   with a LOW / OUT pill (same rule as the list: par set and on hand at or below par / at zero); grey bin / SKU line; white-on-dark
   supplier logo (from v169); the -/+ row is a dark card with large round buttons (blue +) and a blue Order button; when the item has a
   par above 0 an "On hand X / par Y" bar sits above the count tiles (amber when low, red when out, green at or above par); count tiles,
   Flow rate and Key features are dark. Only #detail changes; Bin Labels and other pages that share the overlay class are untouched. */
(function () {
  var P = 'html body #detail.detail-overlay';
  var st = document.createElement('style'); st.id = 'storm-v170-css';
  st.textContent = ''
    + P + ' { background: #0E1621 !important; color: #fff !important; }'
    + P + ' .detail-bar { background: linear-gradient(180deg, #14324A 0%, #0E1621 100%) !important; color: #fff !important; border: 0 !important; box-shadow: none !important; }'
    + P + ' .detail-bar .detail-close.st-back { background: #152231 !important; border: 1px solid #1F3246 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; color: #E6F4FC !important; }'
    + P + ' img.detail-photo { background: #fff !important; border: 0 !important; border-radius: 14px !important; }'
    + P + ' .detail-name { color: #fff !important; font-size: 24px !important; font-weight: 800 !important; }'
    + P + ' .tk-dpill { display: inline-block; vertical-align: 4px; margin-left: 8px; padding: 3px 9px; border-radius: 8px; font-size: 12px; font-weight: 800; letter-spacing: .04em; line-height: 1.3; }'
    + P + ' .tk-dpill.low { background: rgba(245,158,11,.16); color: #F59E0B; }'
    + P + ' .tk-dpill.out { background: rgba(239,68,68,.16); color: #EF4444; }'
    + P + ' .detail-meta { color: #9FB3C8 !important; }'
    + P + ' img.detail-logo { background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; }'
    + P + ' .detail-price { color: #fff !important; }'
    + P + ' .ft-line { color: #5FD3FF !important; }'
    /* -/+ and Order */
    + P + ' .detail-body > .controls.ctl-top { margin-top: 14px !important; padding: 12px !important; gap: 12px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; }'
    + P + ' .controls .stepper { gap: 10px !important; border: 0 !important; border-radius: 0 !important; overflow: visible !important; background: transparent !important; }'
    + P + ' .controls .step { width: 56px !important; height: 56px !important; border-radius: 50% !important; border: 1.5px solid #3B536B !important; background: #0E1621 !important; color: #E6F4FC !important; font-size: 28px !important; box-shadow: none !important; }'
    + P + ' .controls .step[data-detail-step="plus"] { background: linear-gradient(135deg, #29ABE2, #5FD3FF) !important; border: 0 !important; color: #04121D !important; }'
    + P + ' .controls .count { width: 60px !important; height: 56px !important; background: transparent !important; border: 0 !important; color: #fff !important; font-size: 30px !important; font-weight: 800 !important; }'
    + P + ' .controls .ft-tag { color: #9FB3C8 !important; }'
    + P + ' .controls .order { min-height: 56px !important; border: 0 !important; border-radius: 14px !important; background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; color: #04121D !important; font-weight: 800 !important; box-shadow: none !important; }'
    /* on hand vs par */
    + P + ' .tk-dpar { margin-top: 14px; padding: 12px 14px; background: #152231; border: 1px solid #1F3246; border-radius: 14px; }'
    + P + ' .tk-dpar .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; color: #9FB3C8; }'
    + P + ' .tk-dpar .tk-row b { font-size: 20px; font-weight: 800; color: #fff; }'
    + P + ' .tk-dpar .tk-bar { height: 8px; margin-top: 8px; border-radius: 4px; background: #1E2C3B; overflow: hidden; }'
    + P + ' .tk-dpar .tk-bar i { display: block; height: 100%; border-radius: 4px; background: #22C55E; }'
    + P + ' .tk-dpar.low .tk-bar i { background: #F59E0B; } ' + P + ' .tk-dpar.out .tk-bar i { background: #EF4444; }'
    /* count tiles, flow rate, features */
    + P + ' .detail-count { background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 12px !important; color: #fff !important; }'
    + P + ' .detail-count span { color: #7E93A8 !important; }'
    + P + ' .detail-count.label-tile img { box-shadow: none !important; }'
    + P + ' .label-add { background: #29ABE2 !important; color: #04121D !important; } ' + P + ' .label-add.in { background: #22C55E !important; color: #04121D !important; }'
    + P + ' .detail-features h2, ' + P + ' .detail-flow h2 { color: #7E93A8 !important; border-left-color: #29ABE2 !important; }'
    + P + ' .detail-features li, ' + P + ' .detail-flow li, ' + P + ' .detail-features p { color: #C9D6E3 !important; }'
    + P + ' .detail-features li::marker, ' + P + ' .detail-flow li::marker { color: #29ABE2; }';
  document.head.appendChild(st);

  function dress() {
    var d = document.getElementById('detail'); if (!d || !d.classList.contains('open')) return;
    var it = null; try { it = findItem(currentDetailBin); } catch (e) {} if (!it) return;
    var nm = d.querySelector('.detail-name'), cnt = d.querySelector('.detail-counts');
    var has = it.par != null && it.onHand != null, oh = Number(it.onHand), par = Number(it.par);
    var cls = !has ? '' : (oh === 0 ? 'out' : (oh <= par ? 'low' : ''));
    if (nm && !nm.querySelector('.tk-dpill') && cls) { var p = document.createElement('span'); p.className = 'tk-dpill ' + cls; p.textContent = cls === 'out' ? 'OUT' : 'LOW'; nm.appendChild(p); }
    if (cnt && !d.querySelector('.tk-dpar') && it.par != null && par > 0) {
      var b = document.createElement('div'); b.className = 'tk-dpar' + (oh === 0 ? ' out' : (oh < par ? ' low' : ''));
      b.innerHTML = '<div class="tk-row"><span>On hand <b>' + (it.onHand == null ? '\u2014' : oh) + '</b></span><span>Keep on hand ' + par + '</span></div><div class="tk-bar"><i style="width:' + Math.min(100, Math.round((oh || 0) / par * 100)) + '%"></i></div>';
      cnt.parentNode.insertBefore(b, cnt);
    }
  }
  if (typeof openDetail === 'function') {
    var _o = openDetail;
    openDetail = function () { var r = _o.apply(this, arguments); try { dress(); } catch (e) {} return r; };
  }
})();

/* v171 (Hark, 2026-11-10, Dave): Order cart (#pick-sheet) in the Truck Check look. Same lines, -/+ (hold-to-repeat untouched), remove X,
   subtotals, Copy / Open supplier buttons, Home Depot chunk counter, Total, Clear all, close wash and photo peek.
   Dark sheet with the blue-to-dark header: STORM logo + X, "Order Cart" big, "N lines . M suppliers", and a "Reviewed  N of M" bar.
   Each supplier is a grey caps title; each line is a dark rounded card with a check box on the left: tap it to mark the line reviewed
   (blue check, line dimmed, name struck through). Review checks are kept on this phone only (localStorage, per item) and drop off when
   the item leaves the cart; nothing goes to the sheet or the server. The app has no single "Send Order" button, so each supplier's
   send action (Copy & open Home Depot, Open RichTech order page) is the blue primary and the Copy buttons are ghost. The footer
   (Total + Clear all) is pinned at the bottom. */
(function () {
  var KEY = 'stormCartReviewV1';
  var LOGO = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/logos/STORM-logo-color-transparent.svg';
  var S = 'html body #pick-sheet.tk';
  var st = document.createElement('style'); st.id = 'storm-v171-css';
  st.textContent = ''
    + S + ' { background: #0E1621 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #1F3246 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(0,0,0,.45) !important; color: #fff !important; max-height: 88vh !important; max-height: 88dvh !important; }'
    + S + ' > .pick-sheet-head { display: block !important; padding: 0 18px 12px !important; border: 0 !important; background: linear-gradient(180deg, #14324A 0%, #0E1621 100%) !important; border-radius: 22px 22px 0 0; }'
    + S + ' .tk-grab { width: 42px; height: 5px; border-radius: 3px; margin: 8px auto 0; background: rgba(159,179,200,.35); }'
    + S + ' .tk-headrow { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; }'
    + S + ' .tk-logo { display: block; height: 22px; width: auto; }'
    + S + ' .pick-sheet-head .pick-sheet-close { color: #9FB3C8 !important; font-size: 30px !important; padding: 2px 4px 2px 12px !important; background: transparent !important; border: 0 !important; }'
    + S + ' .pick-sheet-head h2 { margin: 14px 0 0 !important; font-size: 26px !important; font-weight: 800 !important; line-height: 1.2 !important; color: #fff !important; }'
    + S + ' .tk-sub { margin-top: 4px; font-size: 13px; color: #9FB3C8; }'
    + S + ' .tk-prog { margin-top: 12px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #9FB3C8; }'
    + S + ' .tk-prog b { color: #29ABE2; font-weight: 800; }'
    + S + ' .tk-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #1E2C3B; overflow: hidden; }'
    + S + ' .tk-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: linear-gradient(90deg, #29ABE2, #5FD3FF); transition: width .25s ease; }'
    + S + '.tk-none .tk-sub, ' + S + '.tk-none .tk-prog, ' + S + '.tk-none .tk-bar { display: none; }'
    /* supplier sections */
    + S + ' > .pick-sheet-head + div { padding: 0 14px !important; }'
    + S + ' > .pick-sheet-head + div > div { border-bottom: 0 !important; padding: 2px 0 12px !important; }'
    + S + ' > .pick-sheet-head + div > div > h3 { margin: 16px 4px 2px !important; font-size: 12px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; color: #7E93A8 !important; }'
    + S + ' > .pick-sheet-head + div > div > div:not(.pick-line) { color: #C9D6E3 !important; font-size: 14.5px !important; margin: 10px 4px 10px !important; }'
    + S + ' #hd-copy-counter { display: block; margin: 6px 4px 0; font-size: 12px; color: #7E93A8 !important; }'
    /* lines */
    + S + ' .pick-line { gap: 10px !important; padding: 10px !important; margin-top: 8px; border: 1px solid #1F3246 !important; border-radius: 14px !important; background: #152231 !important; transition: opacity .2s ease; }'
    + S + ' .pick-line { flex-wrap: wrap !important; align-items: center !important; row-gap: 8px !important; }'
    + S + ' .pick-line img { width: 46px !important; height: 46px !important; flex: 0 0 46px !important; border-radius: 10px !important; background: #fff !important; }'
    + S + ' .pick-line .pick-line-info { flex: 1 1 0 !important; min-width: calc(100% - 106px) !important; }'
    + S + ' .pick-line .pick-stepper { margin-left: 96px !important; }'
    + S + ' .pick-line .pick-remove { margin-left: auto !important; }'
    + S + ' .pick-line-name { font-size: 15px !important; font-weight: 700 !important; line-height: 1.25 !important; color: #fff !important; overflow-wrap: anywhere; }'
    + S + ' .pick-line-code { font-size: 12px !important; margin-top: 3px !important; color: #7E93A8 !important; }'
    + S + ' .tk-ck { flex: 0 0 30px; width: 30px; height: 30px; margin: 0; padding: 0; border-radius: 9px; border: 2px solid #3B536B; background: transparent; color: #04121D; font-size: 17px; font-weight: 900; line-height: 26px; text-align: center; font-family: inherit; -webkit-tap-highlight-color: transparent; position: relative; }'
    + S + ' .tk-ck::after { content: ""; position: absolute; inset: -9px; }'
    + S + ' .pick-line.tk-done { opacity: .6; }'
    + S + ' .pick-line.tk-done .tk-ck { background: #29ABE2; border-color: #29ABE2; }'
    + S + ' .pick-line.tk-done .pick-line-name { text-decoration: line-through; text-decoration-thickness: 2px; }'
    + S + ' .pick-stepper { gap: 4px !important; border: 0 !important; background: transparent !important; overflow: visible !important; }'
    + S + ' .pick-step { width: 34px !important; height: 34px !important; min-height: 0 !important; padding: 0 !important; border-radius: 50% !important; border: 1.5px solid #3B536B !important; background: transparent !important; color: #E6F4FC !important; font-size: 20px !important; line-height: 1 !important; box-shadow: none !important; }'
    + S + ' .pick-step[data-pick-inc] { border-color: #29ABE2 !important; color: #29ABE2 !important; }'
    + S + ' .pick-stepper .pick-qty { min-width: 34px !important; padding: 0 4px !important; color: #29ABE2 !important; font-size: 20px !important; font-weight: 800 !important; background: transparent !important; }'
    + S + ' .pick-remove { color: #7E93A8 !important; background: transparent !important; }'
    /* supplier buttons */
    + S + ' .pick-copy, ' + S + ' .pick-open-rt, ' + S + ' .pick-open-hi { min-height: 50px !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid #3B536B !important; color: #fff !important; font-weight: 700 !important; box-shadow: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }'
    + S + ' #hd-copy-btn.pick-copy, ' + S + ' .pick-open-rt, ' + S + ' .pick-open-hi { background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; border: 0 !important; color: #04121D !important; font-weight: 800 !important; }'
    /* footer */
    + S + ' .pick-sheet-foot { display: flex !important; align-items: center; gap: 12px; padding: 12px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #0E1621 !important; border-top: 1px solid #1F3246 !important; }'
    + S + ' .pick-sheet-foot > div { flex: 1 1 auto; margin: 0 !important; text-align: left !important; color: #fff !important; font-size: 20px !important; }'
    + S + ' .pick-sheet-foot .pick-clear { flex: none; width: auto !important; min-height: 50px !important; padding: 0 18px !important; margin: 0 !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid rgba(239,68,68,.6) !important; color: #F87171 !important; font-weight: 700 !important; }'
    + S + ' .pick-empty { color: #9FB3C8 !important; }';
  document.head.appendChild(st);

  function sheet() { return document.getElementById('pick-sheet'); }
  function get() { try { var a = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function put(a) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  function binOf(ln) { var b = ln.querySelector('[data-pick-remove],[data-pick-inc]'); return b ? (b.getAttribute('data-pick-remove') || b.getAttribute('data-pick-inc')) : ''; }
  function paint(sh) {
    var lines = [].slice.call(sh.querySelectorAll('.pick-line')).filter(function (l) { return binOf(l); });
    var bins = lines.map(binOf), on = get().filter(function (b) { return bins.indexOf(b) >= 0; }), done = 0;
    if (lines.length) put(on); /* drop checks for items no longer in the cart */
    lines.forEach(function (ln) {
      var d = on.indexOf(binOf(ln)) >= 0; if (d) done++;
      ln.classList.toggle('tk-done', d);
      var b = ln.querySelector('.tk-ck'); if (b) { b.textContent = d ? '\u2713' : ''; b.setAttribute('aria-pressed', d ? 'true' : 'false'); }
    });
    var sups = sh.querySelectorAll(':scope > .pick-sheet-head + div > div > h3').length;
    var sub = sh.querySelector('.tk-sub'); if (sub) sub.textContent = lines.length + ' line' + (lines.length === 1 ? '' : 's') + ' \u00b7 ' + sups + ' supplier' + (sups === 1 ? '' : 's');
    var p = sh.querySelector('.tk-prog-n'), bar = sh.querySelector('.tk-bar i');
    if (p) p.innerHTML = '<b>' + done + '</b> of ' + lines.length;
    if (bar) bar.style.width = (lines.length ? Math.round(done / lines.length * 100) : 0) + '%';
    sh.classList.toggle('tk-none', !lines.length);
  }
  function decorate() {
    var sh = sheet(); if (!sh) return;
    sh.classList.add('tk');
    var head = sh.querySelector(':scope > .pick-sheet-head'); if (!head) return;
    if (!head.querySelector('.tk-grab')) {
      var h2 = head.querySelector('h2'), x = head.querySelector('.pick-sheet-close');
      if (h2) h2.textContent = 'Order Cart';
      var g = document.createElement('div'); g.className = 'tk-grab'; g.setAttribute('aria-hidden', 'true');
      var row = document.createElement('div'); row.className = 'tk-headrow';
      var lg = document.createElement('img'); lg.className = 'tk-logo'; lg.alt = 'STORM'; lg.src = LOGO; row.appendChild(lg);
      if (x) row.appendChild(x);
      head.insertBefore(row, head.firstChild); head.insertBefore(g, row);
      var m = document.createElement('div');
      m.innerHTML = '<div class="tk-sub"></div><div class="tk-prog"><span>Reviewed</span><span class="tk-prog-n"></span></div><div class="tk-bar"><i></i></div>';
      while (m.firstChild) head.appendChild(m.firstChild);
    }
    sh.querySelectorAll('.pick-line').forEach(function (ln) {
      if (!binOf(ln) || ln.querySelector('.tk-ck')) return;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'tk-ck'; b.setAttribute('aria-label', 'Reviewed'); ln.insertBefore(b, ln.firstChild);
    });
    paint(sh);
  }
  function attach() {
    var sh = sheet(); if (!sh || sh.__tk171) return !!sh;
    sh.__tk171 = true;
    new MutationObserver(function () { try { decorate(); } catch (e) {} }).observe(sh, { childList: true });
    try { decorate(); } catch (e) {}
    return true;
  }
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('#pick-sheet .tk-ck'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var ln = b.closest('.pick-line'), sh = sheet(); if (!ln || !sh) return;
    var bin = binOf(ln), on = get(), i = on.indexOf(bin);
    if (i >= 0) on.splice(i, 1); else on.push(bin);
    put(on); paint(sh);
  }, true);
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 60) return; setTimeout(poll, 250); })(); }
})();

/* v172 (Hark, 2026-11-10, Dave): Find a Job in the Truck Check look. Same search, saved jobs, From Jobber list, job detail, Edit list,
   Print list, Back to results and close.
   Solid dark sheet (#0E1621) with the blue-to-dark top, big "Find a Job" title, dark search box, every job a dark rounded card. Saved
   jobs get a blue initials circle and, when this phone has Pull List truck checks for that customer (v167), a "Loaded on truck N of M"
   bar with an IN PROGRESS (blue) or LOADED (green) pill; jobs with no checks on this phone show neither. In a saved job, Edit list is
   the blue primary and Print list / Back to results are ghost. Nothing new is read from or written to the sheet. */
(function () {
  var J = 'html body #job-find';
  var st = document.createElement('style'); st.id = 'storm-v172-css';
  st.textContent = ''
    + J + ' { background: rgba(5,10,16,.6) !important; }'
    + J + ' .jf-card { width: min(96vw, 520px) !important; max-height: 88vh !important; max-height: 88dvh !important; padding: 0 0 14px !important; gap: 10px !important; background: #0E1621 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 1px solid #1F3246 !important; border-radius: 22px !important; box-shadow: 0 14px 40px rgba(0,0,0,.55) !important; overflow: hidden; }'
    + J + ' .jf-head { padding: 16px 16px 6px; background: linear-gradient(180deg, #14324A 0%, #0E1621 100%); }'
    + J + ' .jf-head h2 { font-size: 26px !important; font-weight: 800 !important; color: #fff !important; }'
    + J + ' .jf-x { width: 40px !important; height: 40px !important; border-radius: 12px !important; background: #152231 !important; border: 1px solid #1F3246 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; color: #E6F4FC !important; line-height: 38px !important; }'
    + J + ' .jf-q { margin: 0 14px !important; width: calc(100% - 28px) !important; box-sizing: border-box; height: 48px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; color: #fff !important; }'
    + J + ' .jf-q::placeholder { color: #7E93A8 !important; }'
    + J + ' .jf-q:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; }'
    + J + ' .jf-list { padding: 2px 14px 4px; gap: 10px !important; }'
    + J + ' .jf-item { padding: 14px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 16px !important; box-shadow: none !important; }'
    + J + ' .jf-item:active, ' + J + ' .jf-item.pressed { background: #1B2D40 !important; }'
    + J + ' .jf-name { color: #fff !important; font-size: 17px !important; font-weight: 800 !important; }'
    + J + ' .jf-addr { color: #9FB3C8 !important; }'
    + J + ' .jf-meta { color: #7E93A8 !important; }'
    + J + ' .jf-empty, ' + J + ' .jf-hint { color: #9FB3C8 !important; }'
    + J + ' .jf-sec { margin: 12px 4px 0 !important; color: #7E93A8 !important; font-size: 12px !important; letter-spacing: .1em !important; }'
    /* saved job card: initials + truck progress */
    + J + ' .jf-item.tk-sv { display: grid !important; grid-template-columns: 46px minmax(0, 1fr); column-gap: 12px; align-items: center; }'
    + J + ' .jf-item.tk-sv > .tk-av { grid-column: 1; grid-row: 1 / span 3; width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, #29ABE2, #1B6E99); color: #04121D; font-size: 16px; font-weight: 900; line-height: 46px; text-align: center; letter-spacing: .02em; }'
    + J + ' .jf-item.tk-sv > .jf-name, ' + J + ' .jf-item.tk-sv > .jf-addr, ' + J + ' .jf-item.tk-sv > .jf-meta { grid-column: 2; }'
    + J + ' .jf-item.tk-sv > .tk-jp { grid-column: 1 / -1; margin-top: 10px; }'
    + J + ' .tk-jp .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #9FB3C8; }'
    + J + ' .tk-jp .tk-row b { color: #29ABE2; font-weight: 800; }'
    + J + ' .tk-jp .tk-bar { height: 6px; margin-top: 6px; border-radius: 3px; background: #1E2C3B; overflow: hidden; }'
    + J + ' .tk-jp .tk-bar i { display: block; height: 100%; border-radius: 3px; background: linear-gradient(90deg, #29ABE2, #5FD3FF); }'
    + J + ' .tk-st { display: inline-block; vertical-align: 2px; margin-left: 8px; padding: 2px 8px; border-radius: 7px; font-size: 10.5px; font-weight: 800; letter-spacing: .05em; }'
    + J + ' .tk-st.prog { background: rgba(41,171,226,.15); color: #5FD3FF; }'
    + J + ' .tk-st.done { background: rgba(34,197,94,.15); color: #22C55E; }'
    /* job detail */
    + J + ' .jf-detail { padding: 2px 2px 0; }'
    + J + ' .jf-lines { border-top: 0 !important; margin: 12px 0 !important; }'
    + J + ' .jf-line { margin-top: 6px; padding: 10px 12px !important; background: #152231; border: 1px solid #1F3246 !important; border-radius: 12px; color: #fff !important; }'
    + J + ' .jf-line b { color: #29ABE2 !important; font-weight: 800; }'
    + J + ' .jf-btn, ' + J + ' .jf-back, ' + J + ' .jc-clear { min-height: 52px !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid #3B536B !important; color: #fff !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; font-weight: 700 !important; }'
    + J + ' .jf-btn[data-jf-edit] { background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; border: 0 !important; color: #04121D !important; font-weight: 800 !important; }';
  document.head.appendChild(st);

  function norm(v) { return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function checksFor(name, addr) {
    var all = {}; try { all = JSON.parse(localStorage.getItem('stormTruckCheckV1') || '{}') || {}; } catch (e) {}
    var n = norm(name), a = norm(addr);
    for (var k in all) {
      var m = /^c:(.*)\|(.*)\|(.*)$/.exec(k); if (!m) continue;
      if (norm(m[1] + ' ' + m[2]) === n && m[3] === a && all[k] && Array.isArray(all[k].bins)) return all[k].bins.length;
    }
    return 0;
  }
  function initials(s) { var w = String(s || '').trim().split(/\s+/).filter(Boolean); return ((w[0] || '').charAt(0) + (w.length > 1 ? w[w.length - 1].charAt(0) : '')).toUpperCase(); }
  function dress() {
    var L = document.getElementById('jf-list'); if (!L) return;
    L.querySelectorAll('.jf-item[data-jf-i]').forEach(function (b) {
      if (b.classList.contains('tk-sv')) return;
      b.classList.add('tk-sv');
      var nm = b.querySelector('.jf-name'), ad = b.querySelector('.jf-addr'), me = b.querySelector('.jf-meta');
      var name = nm ? nm.textContent : '', addr = ad ? ad.textContent : '';
      var av = document.createElement('span'); av.className = 'tk-av'; av.setAttribute('aria-hidden', 'true'); av.textContent = initials(name); b.insertBefore(av, b.firstChild);
      var lm = me && /(\d+) lines?/.exec(me.textContent), tot = lm ? +lm[1] : 0, done = Math.min(tot, checksFor(name, addr));
      if (tot && done) {
        var p = document.createElement('div'); p.className = 'tk-jp';
        p.innerHTML = '<div class="tk-row"><span>Loaded on truck</span><span><b>' + done + '</b> of ' + tot + '</span></div><div class="tk-bar"><i style="width:' + Math.round(done / tot * 100) + '%"></i></div>';
        b.appendChild(p);
        if (nm) { var s = document.createElement('span'); s.className = 'tk-st ' + (done >= tot ? 'done' : 'prog'); s.textContent = done >= tot ? 'LOADED' : 'IN PROGRESS'; nm.appendChild(s); }
      }
    });
  }
  var lo = null;
  function watch() {
    var L = document.getElementById('jf-list'); if (!L || L.__tk172) return;
    L.__tk172 = true;
    new MutationObserver(function () { try { dress(); } catch (e) {} }).observe(L, { childList: true });
    try { dress(); } catch (e) {}
  }
  new MutationObserver(function () { if (document.getElementById('job-find')) watch(); }).observe(document.body, { childList: true });
})();

/* v173 (Hark, 2026-11-10, Dave): Jobber jobs and the Jobber quote in the Truck Check look. Same Jobber data, Connect / Try again,
   Load into Pull List, quote pull, close and scroll (v114) as before.
   In Find a Job, From Jobber cards get a blue edge and a blue-tinted JOB pill; the Jobber job detail has the blue Load into Pull List,
   ghost Back. Connect to Jobber and Try again are blue. The Jobber quote is a solid dark sheet (#0E1621) with the blue-to-dark top,
   the white Jobber logo, a dark close tile, the customer big, "Pulled N items" as a green line and "Couldn't find" in amber, the
   blue Pull items button, every quote line a dark card with its photo on a light tile, and the quote total pinned as the last row. */
(function () {
  var J = 'html body #job-find', Q = 'html body #quote-sheet.quote-sheet';
  var st = document.createElement('style'); st.id = 'storm-v173-css';
  st.textContent = ''
    + J + ' .jf-item[data-jf-jb] { box-shadow: inset 4px 0 0 #29ABE2 !important; }'
    + J + ' .jf-tag { background: rgba(41,171,226,.15) !important; color: #5FD3FF !important; border-radius: 7px !important; padding: 2px 8px !important; font-size: 10.5px !important; vertical-align: 2px; margin-left: 8px !important; }'
    + J + ' .jf-btn[data-jf-jb-load], ' + J + ' .jf-btn[data-jf-connect], ' + J + ' .jf-btn[data-jf-jb-retry] { background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; border: 0 !important; color: #04121D !important; font-weight: 800 !important; }'
    + J + ' .jf-line b { white-space: nowrap; }'
    /* quote sheet */
    + Q + ' { background: #0E1621 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #1F3246 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(0,0,0,.45) !important; padding: 0 16px calc(18px + env(safe-area-inset-bottom)) !important; max-height: 88vh !important; max-height: 88dvh !important; }'
    + Q + ' .qs-logo { margin: 0 -16px !important; padding: 16px 16px 4px; background: linear-gradient(180deg, #14324A 0%, #0E1621 100%); border-radius: 22px 22px 0 0; }'
    + Q + ' .qs-head { color: #7E93A8 !important; letter-spacing: .1em !important; }'
    + Q + ' .qs-head > span:first-child { color: #5FD3FF !important; }'
    + Q + ' .qs-job { color: #9FB3C8 !important; }'
    + Q + ' .qs-x { width: 40px !important; height: 40px !important; border-radius: 12px !important; background: #152231 !important; border: 1px solid #1F3246 !important; color: #E6F4FC !important; }'
    + Q + ' .qs-cust { font-size: 24px !important; font-weight: 800 !important; color: #fff !important; margin-top: 8px !important; }'
    + Q + ' .qs-sum { color: #9FB3C8 !important; }'
    + Q + ' .qs-pull { display: inline-block; padding: 3px 10px; border-radius: 8px; background: rgba(34,197,94,.14); color: #22C55E !important; font-weight: 700; }'
    + Q + ' .qs-miss { color: #F59E0B !important; }'
    + Q + ' .qs-note { color: #C9D6E3 !important; }'
    + Q + ' .qs-btn { min-height: 52px !important; border: 0 !important; border-radius: 14px !important; background: linear-gradient(90deg, #29ABE2, #3DBDF0) !important; color: #04121D !important; font-weight: 800 !important; box-shadow: none !important; }'
    + Q + ' .qs-lines { border-top: 0 !important; margin-top: 12px !important; }'
    + Q + ' .qs-line { margin-top: 8px; padding: 12px !important; background: #152231 !important; border: 1px solid #1F3246 !important; border-radius: 14px !important; }'
    + Q + ' .qs-photo { background: #fff !important; border-radius: 10px !important; object-fit: contain !important; }'
    + Q + ' .qs-name { color: #fff !important; }'
    + Q + ' .qs-desc { color: #7E93A8 !important; }'
    + Q + ' .qs-qty { color: #29ABE2 !important; font-weight: 700; }'
    + Q + ' .qs-total { position: sticky; bottom: calc(-18px - env(safe-area-inset-bottom)); margin: 12px -16px 0 !important; padding: 14px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #0E1621 !important; border-top: 1px solid #1F3246 !important; color: #9FB3C8 !important; }'
    + Q + ' .qs-total b { color: #fff !important; font-size: 20px; }';
  document.head.appendChild(st);
})();
