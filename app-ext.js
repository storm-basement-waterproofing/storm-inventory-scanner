/* STORM app extensions v1 (Hark): bin label viewer + print list, Jobber/CompanyCam app launch */
(function () { var st = document.createElement('style'); st.id = 'storm-ext-css'; st.textContent = ".fab-dock { top: auto !important; bottom: calc(46px + env(safe-area-inset-bottom)) !important; right: 14px !important; } .label-tile { position: relative; cursor: pointer; padding: 8px 10px !important; } .label-tile img { display: block; height: 54px; width: auto; max-width: 140px; border-radius: 4px; margin-top: 4px; box-shadow: 0 1px 3px rgba(0,0,0,.15); } .label-add { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 999px; border: 0; background: var(--blue); color: #fff; font-size: 18px; font-weight: 800; line-height: 28px; padding: 0; box-shadow: 0 2px 6px rgba(0,0,0,.25); } .label-add.in { background: #16a34a; font-size: 14px; } #lbl-view { position: fixed; inset: 0; z-index: 130; background: rgba(15,23,32,.72); display: none; align-items: center; justify-content: center; padding: 16px; } #lbl-view.open { display: flex; } .lbl-view-box { position: relative; background: #fff; border-radius: 14px; padding: 14px; width: 100%; max-width: 640px; } .lbl-view-box img { display: block; width: 100%; height: auto; border-radius: 6px; } .lbl-view-name { font-size: 16px; font-weight: 700; margin: 10px 2px 0; } .lbl-view-add { display: block; width: 100%; margin-top: 12px; min-height: 52px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; } .lbl-view-add.in { background: #16a34a; } .lbl-view-x { position: absolute; top: -14px; right: -6px; width: 40px; height: 40px; border-radius: 999px; border: 0; background: #0F1720; color: #fff; font-size: 24px; line-height: 1; padding: 0; } .lbl-sec { padding: 8px 16px 4px; border-top: 1px solid #E5E7EB; max-height: 34vh; overflow-y: auto; } .lbl-sec-head { display: flex; align-items: center; justify-content: space-between; } .lbl-sec-head h3 { margin: 6px 0; font-size: 16px; } .lbl-sec-clear { border: 0; background: none; color: #6B7280; font-size: 14px; padding: 6px; } .lbl-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; } .lbl-row img { height: 40px; width: auto; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,.2); } .lbl-row-name { flex: 1; font-size: 14px; font-weight: 600; } .lbl-row-name small { display: block; color: #6B7280; font-weight: 400; } .lbl-row-x { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #F3F4F6; font-size: 20px; padding: 0; } .lbl-print { display: block; width: 100%; margin: 8px 0 6px; min-height: 48px; border: 0; border-radius: 10px; background: var(--dark); color: #fff; font-size: 16px; font-weight: 700; } #lbl-print { display: none; } @media print { body > *:not(#lbl-print) { display: none !important; } #lbl-print { display: block !important; } .lbl-pg-item { padding: 0.5in 0; text-align: center; } .lbl-pg-item img { width: 6.2in; max-width: 100%; height: auto; } .lbl-pg-break { break-after: page; page-break-after: always; } @page { size: letter; margin: 0.3in; } } .drawer-item img + .drawer-item-name { font-size: 0; color: transparent; } .drawer-ccam img { height: 26px; width: auto; max-width: 170px; object-fit: contain; }"; document.head.appendChild(st); })();
var LBL_BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/labels/'; var LBL_KEY = 'stormLabelPrintV1'; function lblList() { try { var a = JSON.parse(localStorage.getItem(LBL_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } } function lblSave(a) { try { localStorage.setItem(LBL_KEY, JSON.stringify(a)); } catch (e) {} } function lblUrl(bin) { return LBL_BASE + encodeURIComponent(bin) + '.jpg?v=1'; } function lblHas(bin) { return lblList().indexOf(bin) >= 0; } function lblToggle(bin, forceAdd) { var a = lblList(), i = a.indexOf(bin); if (i >= 0 && !forceAdd) { a.splice(i, 1); lblSave(a); try { showToast('Label removed from print list'); } catch (e) {} } else if (i < 0) { a.push(bin); lblSave(a); try { showToast('Bin label added to print list'); } catch (e) {} } lblSync(); } function lblSync() { var on = function (b) { return lblHas(b); }; document.querySelectorAll('[data-label-add]').forEach(function (b) { var x = on(b.getAttribute('data-label-add')); b.classList.toggle('in', x); b.innerHTML = x ? '&#10003;' : '+'; b.setAttribute('aria-label', x ? 'In print list' : 'Add label to print list'); }); var vb = document.getElementById('lbl-view-add'); if (vb) { var x2 = on(vb.getAttribute('data-bin')); vb.textContent = x2 ? '\u2713 In print list \u00b7 tap to remove' : '+ Add to print list'; vb.classList.toggle('in', x2); } try { if ($('pick-sheet').classList.contains('open')) renderPickSheet(); } catch (e) {} } function lblTile() { var it = currentDetailBin && findItem(currentDetailBin); var row = document.querySelector('#detail .detail-counts'); if (!it || !row || row.querySelector('.label-tile')) return; var d = document.createElement('div'); d.className = 'detail-count label-tile'; d.setAttribute('data-label-view', it.bin); d.innerHTML = '<span>Bin label</span><img src="' + lblUrl(it.bin) + '" alt="Bin label for ' + esc(it.name) + '"><button class="label-add" type="button" data-label-add="' + esc(it.bin) + '">+</button>'; d.querySelector('img').onerror = function () { d.style.display = 'none'; }; row.appendChild(d); lblSync(); } var _lblOpenDetail = openDetail; openDetail = function () { var r = _lblOpenDetail.apply(this, arguments); try { lblTile(); } catch (e) {} return r; }; function lblView(bin) { var it = findItem(bin); if (!it) return; var v = document.getElementById('lbl-view'); if (!v) { v = document.createElement('div'); v.id = 'lbl-view'; document.body.appendChild(v); } v.innerHTML = '<div class="lbl-view-box"><button class="lbl-view-x" type="button" data-lbl-close aria-label="Close">&times;</button><img src="' + lblUrl(bin) + '" alt=""><div class="lbl-view-name">' + esc(it.name) + '</div><button id="lbl-view-add" class="lbl-view-add" type="button" data-bin="' + esc(bin) + '">+ Add to print list</button></div>'; v.classList.add('open'); lblSync(); } function lblClose() { var v = document.getElementById('lbl-view'); if (v) v.classList.remove('open'); } document.addEventListener('click', function (e) { var t = e.target; var add = t.closest && t.closest('[data-label-add]'); if (add) { e.stopPropagation(); lblToggle(add.getAttribute('data-label-add')); return; } var va = t.closest && t.closest('#lbl-view-add'); if (va) { e.stopPropagation(); lblToggle(va.getAttribute('data-bin')); return; } if (t.closest && (t.closest('[data-lbl-close]') || t.id === 'lbl-view')) { e.stopPropagation(); lblClose(); return; } var tv = t.closest && t.closest('[data-label-view]'); if (tv) { e.stopPropagation(); lblView(tv.getAttribute('data-label-view')); return; } var rm = t.closest && t.closest('[data-lbl-rm]'); if (rm) { e.stopPropagation(); e.preventDefault(); lblToggle(rm.getAttribute('data-lbl-rm')); return; } if (t.closest && t.closest('[data-lbl-clear]')) { e.stopPropagation(); e.preventDefault(); lblSave([]); lblSync(); return; } if (t.closest && t.closest('[data-lbl-print]')) { e.stopPropagation(); e.preventDefault(); lblPrint(); return; } }, false); var _lblRender = renderPickSheet; renderPickSheet = function () { var r = _lblRender.apply(this, arguments); try { var a = lblList(); var el = $('pick-sheet'); if (!a.length || !el) return r; var h = '<div class="lbl-sec"><div class="lbl-sec-head"><h3>Bin labels to print (' + a.length + ')</h3><button type="button" class="lbl-sec-clear" data-lbl-clear>Clear</button></div>'; a.forEach(function (b) { var it = findItem(b); h += '<div class="lbl-row"><img src="' + lblUrl(b) + '" alt=""><div class="lbl-row-name">' + esc(it ? it.name : b) + '<small>' + esc(b) + '</small></div><button type="button" class="lbl-row-x" data-lbl-rm="' + esc(b) + '" aria-label="Remove">&times;</button></div>'; }); h += '<button type="button" class="lbl-print" data-lbl-print>Print ' + a.length + ' label' + (a.length === 1 ? '' : 's') + '</button></div>'; var tmp = document.createElement('div'); tmp.innerHTML = h; var sec = tmp.firstChild; var foot = el.querySelector('.pick-sheet-foot'); if (foot) el.insertBefore(sec, foot); else el.appendChild(sec); var em = el.querySelector('.pick-empty'); if (em) em.style.display = 'none'; } catch (e) {} return r; }; function lblPrint() { var a = lblList(); if (!a.length) return; var p = document.getElementById('lbl-print'); if (!p) { p = document.createElement('div'); p.id = 'lbl-print'; document.body.appendChild(p); } var h = ''; a.forEach(function (b, i) { h += '<div class="lbl-pg-item"><img src="' + lblUrl(b) + '" alt=""></div>' + (i % 2 === 1 && i < a.length - 1 ? '<div class="lbl-pg-break"></div>' : ''); }); p.innerHTML = h; var imgs = p.querySelectorAll('img'), left = imgs.length, done = false; function go() { if (done) return; done = true; try { window.print(); } catch (e) { try { showToast('Printing is blocked here. Use Bin Labels in the menu.', true); } catch (x) {} } } imgs.forEach(function (im) { if (im.complete) { if (--left === 0) setTimeout(go, 50); } else { im.onload = im.onerror = function () { if (--left === 0) setTimeout(go, 50); }; } }); setTimeout(go, 6000); }

function stormOpenApp(kind) { var ua = navigator.userAgent || ''; var isAndroid = /Android/i.test(ua); var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); var A = kind === 'cc' ? { pkg: 'com.agilx.companycam', ios: 'ccam://search', store: 'https://apps.apple.com/us/app/companycam/id960043499', web: 'https://app.companycam.com/' } : { pkg: 'com.getjobber.jobber', ios: 'jobber://', store: 'https://apps.apple.com/us/app/jobber-field-service-software/id1014146758', web: (typeof JOBBER_URL !== 'undefined' ? JOBBER_URL : 'https://secure.getjobber.com/') }; var play = 'https://play.google.com/store/apps/details?id=' + A.pkg; var url = isAndroid ? (kind === 'cc' ? 'intent://search#Intent;scheme=ccam;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end' : 'intent://#Intent;scheme=jobber;package=' + A.pkg + ';S.browser_fallback_url=' + encodeURIComponent(play) + ';end') : (isIOS ? A.ios : A.web); if (!isIOS) { var w = null; try { w = window.open(url, '_blank'); } catch (e) {} if (!w && isAndroid) { try { window.top.location.href = url; } catch (e) { location.href = url; } } return; } var left = false; var onHide = function () { if (document.hidden) left = true; }; document.addEventListener('visibilitychange', onHide); window.addEventListener('blur', function () { left = true; }, { once: true }); var a = document.createElement('a'); a.href = url; a.target = '_top'; a.rel = 'noopener'; a.style.display = 'none'; document.body.appendChild(a); try { a.click(); } catch (e) { try { window.open(url, '_blank'); } catch (x) {} } setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 500); if (isIOS) { setTimeout(function () { document.removeEventListener('visibilitychange', onHide); if (!left && !document.hidden) { try { window.open(A.store, '_blank'); } catch (e) {} } }, 1800); } } document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-jobber], [data-ccam]'); if (!b) return; e.preventDefault(); e.stopPropagation(); stormOpenApp(b.hasAttribute('data-ccam') ? 'cc' : 'jobber'); }, true);
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
  + '#detail.open.fx-out { animation: fxDetailOut .2s ease-in both; pointer-events: none; }'
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
    /* v79 (2026-11-07, Dave's reorganize) */ 'rt-13': 'Check Valves', 'rt-34': 'Vapor Barrier / Waterproofing Membrane', 'rt-41': 'Vapor Barrier / Waterproofing Membrane', 'rt-36': 'Vapor Barrier / Waterproofing Membrane', 'rt-29': 'CFS Carbon Fiber',
    /* v85 (2026-11-08, Dave's 15-point list) */ 'rt-14': 'Pumps & Accessories', 'hd-63': 'AprilAire Accessories', 'hd-77': 'Exterior Discharge', 'hd-78': 'Exterior Discharge', 'hd-79': 'Exterior Discharge', 'rt-37': 'Exterior Discharge', 'rt-35': 'Vapor Barrier / Waterproofing Membrane', 'hd-08': 'Vapor Barrier / Waterproofing Membrane', 'hd-18': 'Vapor Barrier / Waterproofing Membrane' };
  var SUFFIX = { 'hd-103': ' (15AMP)', 'hi-03': ' (TE-2000)' }; /* v85: Dave's description adds */
  var RENAME = { 'Power & Backup': 'Battery Backup', 'Sump Basins & Liners': 'Sump Basins & Lids', 'Wall Treatments': 'Vapor Barrier / Waterproofing Membrane', 'Vapor Barrier': 'Vapor Barrier / Waterproofing Membrane', 'Pumps': 'Pumps & Accessories' };
  function fix() { if (!items || !items.forEach) return; items.forEach(function (it) { var b = (it.bin || '').toLowerCase(); if (BY_BIN[b]) it.category = BY_BIN[b]; else if (/hanging\s*strap/i.test(it.name || '')) it.category = 'AprilAire Accessories'; else if ((it.supplier === 'Hilti' || /^hi-/.test(b)) && /cord/i.test(it.name || '')) it.category = 'Extension Cords'; else if (RENAME[it.category]) it.category = RENAME[it.category]; var sx = SUFFIX[b]; if (sx && it.name && it.name.slice(-sx.length) !== sx) it.name += sx; }); }
  var want = ['Sump Basins & Lids', 'Pumps & Accessories', 'Battery Backup', 'Check Valves', 'Switches & Floats', 'High Water Alarms', 'Dehumidifiers', 'AprilAire Accessories', 'Extension Cords', 'Drainage', 'Exterior Discharge', 'Vapor Barrier / Waterproofing Membrane', 'CFS Carbon Fiber'];
  var rest = CATEGORY_ORDER.filter(function (c) { return want.indexOf(c) < 0 && !RENAME[c] && !/^PVC & Fittings .{1,3}Other sizes$/.test(c); });
  /* set order inside a category (listed bins first, in this order; everything else stays A to Z after them) */
  var RANK = {}; ['rt-20', 'rt-21', 'rt-10', 'rt-11', 'rt-13', 'hd-103', 'HILTI-CORD', 'rt-18', 'rt-17', 'rt-19', 'rt-16', 'rt-34', 'rt-41', 'rt-36', 'rt-35', 'hd-08', 'hd-18'].forEach(function (b, i) { RANK[b] = i + 1; });
  function rk(it) { var b = (it.bin || '').toLowerCase(); if (RANK[b]) return RANK[b]; if (it.category === 'Extension Cords' && /^hi-/.test(b)) return RANK['HILTI-CORD']; return 0; }
  if (typeof byName === 'function') { var _bn = byName; byName = function (a, b) { if (a && b && a.category === b.category) { var x = rk(a), y = rk(b); if (x || y) { if (!x) return 1; if (!y) return -1; return x - y; } } return _bn(a, b); }; }
  CATEGORY_ORDER.length = 0; want.concat(rest).forEach(function (c) { CATEGORY_ORDER.push(c); });
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
    try { window.top.postMessage({ storm: 'scan', q: q }, '*'); } catch (e) { return _os.apply(this, arguments); }
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

/* v107 (Hark, 2026-11-08): store logos in the drawer are line tracings of the real logos (outlines only, dark line like the Resource Center icons). Replaces the v106 simple icons. */
(function () {
  /* v108: smoother tracing (4x upsample, blur, curve fit) and a finer line */
  var P = {"AutoZone":[1555,166,"M1487.0 92.3Q1483.8 93.0 1477.0 93.0L1477.0 93.0Q1470.2 93.0 1468.4 92.3L1468.4 92.3Q1468.5 90.5 1470.2 87.6L1470.2 87.6Q1472.0 84.8 1475.8 80.3L1475.8 80.3Q1479.5 75.9 1482.6 74.3L1482.6 74.3Q1485.8 72.8 1489.0 73.0L1489.0 73.0Q1491.1 74.8 1491.6 75.8L1491.6 75.8Q1492.0 76.8 1491.9 79.0L1491.9 79.0Q1491.8 81.2 1487.0 92.3L1487.0 92.3ZM1263.0 73.3Q1264.6 75.0 1264.9 76.1L1264.9 76.1Q1265.2 77.2 1264.5 81.0L1264.5 81.0Q1263.8 84.8 1261.2 90.6L1261.2 90.6Q1258.6 96.5 1254.2 104.4L1254.2 104.4Q1249.8 112.2 1248.0 114.6L1248.0 114.6Q1246.2 117.0 1243.1 119.9L1243.1 119.9Q1240.0 122.9 1237.4 123.5L1237.4 123.5Q1234.8 124.2 1231.3 123.5L1231.3 123.5L1229.1 119.5Q1230.0 113.8 1233.1 106.6L1233.1 106.6Q1236.1 99.5 1238.9 94.5L1238.9 94.5Q1241.7 89.5 1245.2 84.6L1245.2 84.6Q1248.6 79.8 1250.6 77.8L1250.6 77.8Q1252.5 75.9 1255.2 74.4L1255.2 74.4Q1258.0 72.9 1263.0 73.3L1263.0 73.3ZM1013.5 73.3L1015.8 76.0Q1015.7 81.5 1014.1 85.6L1014.1 85.6Q1012.6 89.8 1006.9 100.4L1006.9 100.4Q1001.3 111.0 999.1 114.1L999.1 114.1Q996.9 117.2 994.2 119.9L994.2 119.9Q991.5 122.5 989.6 123.2L989.6 123.2Q987.8 124.0 982.3 123.5L982.3 123.5L979.8 119.8Q981.0 113.0 982.7 108.8L982.7 108.8Q984.4 104.5 988.7 96.6L988.7 96.6Q993.0 88.8 995.9 84.6L995.9 84.6Q998.9 80.5 1001.4 78.0L1001.4 78.0Q1004.0 75.4 1006.4 74.2L1006.4 74.2Q1008.8 72.9 1013.5 73.3L1013.5 73.3ZM724.9 48.0Q723.4 52.8 704.4 85.9L704.4 85.9Q701.5 87.0 693.1 87.0L693.1 87.0Q684.8 87.0 682.9 86.3L682.9 86.3L682.7 85.0Q701.8 51.0 704.9 47.8L704.9 47.8Q708.0 44.6 710.2 43.7L710.2 43.7Q712.5 42.8 716.0 42.8L716.0 42.8Q719.5 42.8 721.4 43.8L721.4 43.8Q723.2 44.8 724.9 48.0L724.9 48.0ZM1382.3 46.2L1381.6 45.5L1382.6 42.1L1381.2 41.1Q1346.8 41.0 1344.6 41.7L1344.6 41.7Q1277.9 158.0 1278.0 159.3L1278.0 159.3Q1317.0 159.7 1320.0 158.9L1320.0 158.9Q1362.4 85.2 1365.0 82.6L1365.0 82.6Q1367.5 80.0 1369.8 79.4L1369.8 79.4Q1372.0 78.8 1373.4 79.0L1373.4 79.0Q1374.8 79.2 1376.0 80.1L1376.0 80.1Q1377.3 81.0 1378.1 82.8L1378.1 82.8Q1378.8 84.5 1378.6 85.8L1378.6 85.8Q1378.4 87.0 1338.2 158.7L1338.2 158.7Q1340.5 159.7 1379.9 159.2L1379.9 159.2Q1429.5 72.5 1430.1 70.5L1430.1 70.5Q1430.7 68.5 1430.7 64.5L1430.7 64.5Q1430.6 60.5 1429.6 57.6L1429.6 57.6Q1428.6 54.8 1426.8 51.9L1426.8 51.9Q1425.0 49.0 1421.3 45.9L1421.3 45.9Q1417.5 42.8 1412.9 41.4L1412.9 41.4Q1408.2 40.0 1404.1 40.0L1404.1 40.0Q1400.0 40.0 1397.4 40.6L1397.4 40.6Q1394.8 41.1 1382.3 46.2L1382.3 46.2ZM891.5 40.5Q852.5 40.0 849.6 40.9L849.6 40.9Q804.8 118.2 802.8 120.6L802.8 120.6Q800.8 122.9 797.8 123.9L797.8 123.9Q794.8 124.8 792.8 124.3L792.8 124.3Q790.8 123.8 789.6 122.8L789.6 122.8Q788.4 121.7 788.1 120.7L788.1 120.7Q787.9 119.8 788.5 118.0L788.5 118.0Q789.1 116.2 832.8 41.1L832.8 41.1Q830.5 40.0 790.8 40.5L790.8 40.5Q741.3 124.0 740.2 126.9L740.2 126.9Q739.2 129.8 739.0 132.5L739.0 132.5Q738.8 135.2 739.1 137.5L739.1 137.5Q739.4 139.8 740.7 142.4L740.7 142.4Q742.0 145.0 744.8 147.8L744.8 147.8Q747.5 150.6 751.0 152.6L751.0 152.6Q754.5 154.5 760.8 156.5L760.8 156.5Q767.0 158.5 770.9 159.1L770.9 159.1Q774.8 159.7 782.2 159.7L782.2 159.7Q789.8 159.7 796.2 158.6L796.2 158.6Q802.8 157.5 809.0 155.3L809.0 155.3Q815.2 153.2 820.4 150.2L820.4 150.2Q825.5 147.2 830.2 142.6L830.2 142.6Q835.0 138.0 836.7 135.6L836.7 135.6Q838.3 133.2 864.7 88.2L864.7 88.2Q891.0 43.2 891.5 40.5L891.5 40.5ZM1518.8 117.3L1477.8 117.1Q1466.5 128.7 1461.5 130.9L1461.5 130.9Q1459.0 130.2 1457.1 128.0L1457.1 128.0Q1457.0 120.2 1458.3 116.0L1458.3 116.0Q1459.6 111.8 1461.5 109.8L1461.5 109.8Q1521.2 109.7 1524.1 108.7L1524.1 108.7Q1530.5 93.8 1532.5 86.5L1532.5 86.5Q1534.5 79.2 1535.1 75.5L1535.1 75.5Q1535.7 71.8 1535.7 66.8L1535.7 66.8Q1535.7 61.8 1535.1 58.8L1535.1 58.8Q1534.5 55.8 1533.1 52.4L1533.1 52.4Q1531.7 49.0 1529.2 45.9L1529.2 45.9Q1526.7 42.9 1523.4 40.6L1523.4 40.6Q1520.0 38.4 1514.6 36.7L1514.6 36.7Q1509.2 35.1 1502.4 35.1L1502.4 35.1Q1495.5 35.0 1492.1 35.6L1492.1 35.6Q1488.8 36.1 1483.5 37.7L1483.5 37.7Q1478.2 39.3 1472.2 42.4L1472.2 42.4Q1466.2 45.4 1460.2 49.9L1460.2 49.9Q1454.2 54.4 1451.7 56.9L1451.7 56.9Q1449.1 59.5 1443.4 66.6L1443.4 66.6Q1437.8 73.8 1433.4 81.2L1433.4 81.2Q1429.1 88.8 1425.7 97.0L1425.7 97.0Q1422.3 105.2 1420.2 112.1L1420.2 112.1Q1418.2 119.0 1417.2 125.8L1417.2 125.8Q1416.3 132.5 1416.7 137.6L1416.7 137.6Q1417.1 142.8 1418.5 146.6L1418.5 146.6Q1419.8 150.5 1422.0 153.5L1422.0 153.5Q1424.2 156.5 1428.2 159.0L1428.2 159.0Q1432.2 161.5 1437.4 163.1L1437.4 163.1Q1442.5 164.6 1451.5 164.6L1451.5 164.6Q1460.5 164.6 1466.8 163.0L1466.8 163.0Q1473.0 161.5 1478.0 159.3L1478.0 159.3Q1483.0 157.1 1488.5 153.5L1488.5 153.5Q1494.0 149.9 1499.2 144.8L1499.2 144.8Q1504.4 139.8 1509.0 134.0L1509.0 134.0Q1513.5 128.2 1516.2 123.8L1516.2 123.8Q1519.0 119.3 1518.8 117.3L1518.8 117.3ZM1291.1 39.5Q1287.5 37.5 1283.0 36.3Q1278.5 35.0 1271.9 35.0Q1265.2 35.0 1259.8 36.2Q1254.2 37.3 1248.5 39.6Q1242.8 41.9 1237.9 44.8Q1233.0 47.7 1228.0 51.7Q1223.0 55.8 1218.2 61.0Q1213.3 66.2 1209.4 71.8Q1205.5 77.2 1201.9 83.8Q1198.3 90.2 1195.3 97.9Q1192.3 105.5 1190.2 113.1Q1188.1 120.8 1187.6 127.9Q1187.0 135.0 1187.6 138.9Q1188.2 142.8 1189.9 146.8Q1191.5 150.8 1194.4 154.1Q1197.2 157.4 1201.5 159.7Q1205.8 162.1 1210.9 163.4Q1216.0 164.7 1223.0 164.7Q1230.0 164.7 1233.1 164.2Q1236.2 163.6 1241.9 161.9Q1247.5 160.2 1252.6 157.7Q1257.8 155.2 1263.1 151.3Q1268.5 147.4 1272.7 143.2Q1276.9 139.0 1281.5 132.9Q1286.1 126.8 1290.2 119.5Q1294.3 112.2 1297.9 103.5Q1301.5 94.8 1303.6 87.2Q1305.6 79.8 1306.2 73.5Q1306.7 67.2 1306.1 62.9Q1305.5 58.5 1303.7 53.9Q1301.8 49.2 1298.3 45.4Q1294.8 41.5 1291.1 39.5ZM1042.6 39.7Q1039.8 38.0 1034.5 36.5Q1029.2 35.0 1022.6 35.0Q1016.0 35.1 1010.4 36.2Q1004.8 37.4 999.2 39.6Q993.8 41.8 989.0 44.6Q984.2 47.3 978.8 51.7Q973.3 56.1 968.4 61.5Q963.5 67.0 959.9 72.1Q956.3 77.2 952.4 84.4Q948.6 91.5 945.9 98.2Q943.2 105.0 941.2 112.4Q939.1 119.8 938.6 123.1Q938.0 126.5 938.0 131.5Q938.0 136.5 938.6 139.9Q939.2 143.2 940.9 147.4Q942.6 151.5 945.3 154.5Q948.0 157.4 951.3 159.5Q954.5 161.5 959.9 163.1Q965.2 164.7 973.1 164.7Q981.0 164.7 986.2 163.6Q991.5 162.5 995.6 161.1Q999.8 159.6 1004.4 157.3Q1009.0 155.0 1015.2 150.2Q1021.5 145.4 1026.2 140.2Q1031.0 135.0 1034.7 129.8Q1038.4 124.5 1042.4 117.0Q1046.4 109.5 1049.5 101.8Q1052.5 94.0 1054.6 86.0Q1056.6 78.0 1056.9 72.5Q1057.2 67.0 1056.4 61.4Q1055.5 55.8 1053.5 51.6Q1051.5 47.5 1048.5 44.5Q1045.5 41.4 1042.6 39.7ZM957.7 25.3Q914.5 25.0 913.2 25.6L913.2 25.6Q911.8 26.3 885.1 71.9L885.1 71.9Q858.3 117.5 856.4 121.6L856.4 121.6Q854.5 125.8 853.7 129.4L853.7 129.4Q853.0 133.0 853.7 136.9L853.7 136.9Q854.4 140.8 856.7 145.0L856.7 145.0Q859.0 149.2 860.5 151.2L860.5 151.2Q862.1 153.2 863.9 154.6L863.9 154.6Q865.8 156.0 868.0 157.2L868.0 157.2Q870.2 158.4 872.9 159.0L872.9 159.0Q875.5 159.7 890.1 159.7L890.1 159.7Q904.8 159.7 906.1 159.0L906.1 159.0Q907.5 158.2 924.1 129.3L924.1 129.3Q922.2 128.3 903.3 128.1L903.3 128.1L901.1 126.2Q901.6 123.5 915.0 100.8L915.0 100.8Q928.4 78.0 929.7 77.3L929.7 77.3Q931.0 76.5 940.8 76.5L940.8 76.5Q950.5 76.5 952.9 75.8L952.9 75.8Q971.3 44.8 971.3 43.7L971.3 43.7Q970.2 43.1 961.1 43.0L961.1 43.0Q952.0 43.0 950.1 42.1L950.1 42.1Q950.3 40.0 958.0 27.0L958.0 27.0L957.7 25.3ZM1538.1 8.8L1539.5 7.8Q1542.0 8.3 1543.7 9.8L1543.7 9.8L1543.8 11.7L1542.2 12.9L1538.8 12.7L1537.8 11.2L1538.1 8.8ZM1536.8 6.3Q1536.0 8.3 1536.3 20.6L1536.3 20.6L1537.4 20.6L1538.0 16.1L1539.5 15.1Q1541.3 16.3 1544.4 20.9L1544.4 20.9L1545.8 21.2L1544.0 15.8L1546.6 11.8L1546.2 8.3Q1542.2 6.1 1536.8 6.3L1536.8 6.3ZM1540.5 2.9Q1543.0 2.9 1545.0 3.8Q1547.0 4.8 1548.4 6.3Q1549.8 7.8 1550.8 10.1Q1551.7 12.5 1551.8 13.8Q1551.8 15.0 1550.9 17.5Q1550.0 20.0 1548.4 21.7Q1546.8 23.4 1545.4 24.1Q1544.0 24.8 1541.9 24.9Q1539.8 25.1 1537.9 24.6Q1536.0 24.1 1533.9 22.3Q1531.9 20.5 1530.9 18.6Q1530.0 16.8 1529.9 14.4Q1529.8 12.0 1530.5 10.2Q1531.2 8.5 1533.0 6.5Q1534.8 4.6 1536.4 3.8Q1538.0 3.0 1540.5 2.9ZM1535.0 26.3L1546.2 26.3Q1550.7 23.2 1552.1 21.1L1552.1 21.1Q1553.4 19.0 1553.7 16.1L1553.7 16.1Q1554.0 13.2 1553.7 11.1L1553.7 11.1Q1553.4 9.0 1551.8 6.7L1551.8 6.7Q1550.2 4.3 1548.0 2.9L1548.0 2.9Q1545.8 1.5 1540.9 1.4L1540.9 1.4Q1536.0 1.4 1533.8 2.7L1533.8 2.7Q1531.6 3.9 1530.0 6.1L1530.0 6.1Q1528.3 8.2 1527.7 10.8L1527.7 10.8Q1527.0 13.2 1527.6 16.1L1527.6 16.1Q1528.1 19.0 1529.2 20.8L1529.2 20.8Q1530.3 22.5 1535.0 26.3L1535.0 26.3ZM1251.1 0.3L1123.7 0.3Q1103.4 35.7 1103.5 37.3L1103.5 37.3Q1161.2 37.8 1162.8 38.2L1162.8 38.2L1162.9 39.2Q1057.5 117.1 1045.9 136.9L1045.9 136.9Q1034.3 156.8 1033.8 159.1L1033.8 159.1Q1036.2 159.7 1096.9 159.7L1096.9 159.7Q1157.5 159.8 1160.7 159.1L1160.7 159.1L1180.9 124.3L1180.8 122.8Q1125.8 122.2 1124.2 121.8L1124.2 121.8L1124.0 120.8Q1225.7 44.5 1251.1 0.3L1251.1 0.3ZM595.2 159.3L639.9 159.4Q659.1 126.5 660.8 125.0L660.8 125.0L679.7 124.8L681.5 126.0Q664.3 157.2 664.3 159.4L664.3 159.4Q706.0 159.7 708.7 159.0L708.7 159.0Q776.0 40.2 776.9 37.5L776.9 37.5Q777.7 34.8 777.7 29.8L777.7 29.8Q777.7 24.8 776.6 21.9L776.6 21.9Q775.6 19.0 773.9 16.5L773.9 16.5Q772.1 14.0 767.7 10.6L767.7 10.6Q763.2 7.2 756.5 4.7L756.5 4.7Q749.8 2.2 744.4 1.1L744.4 1.1Q739.0 0.0 729.4 0.0L729.4 0.0Q719.8 0.0 714.0 1.1L714.0 1.1Q708.2 2.2 702.4 4.2L702.4 4.2Q696.5 6.1 692.9 7.8L692.9 7.8Q689.2 9.5 684.4 12.8L684.4 12.8Q679.5 16.1 675.5 20.1L675.5 20.1Q671.6 24.0 669.3 27.3L669.3 27.3Q667.1 30.5 631.7 92.9L631.7 92.9Q596.3 155.2 595.2 159.3L595.2 159.3ZM667.5 0.2Q664.3 0.0 663.6 0.4L663.6 0.4Q663.0 0.8 573.7 158.2L573.7 158.2L574.1 159.4L577.7 158.9Q664.0 7.8 667.5 0.2L667.5 0.2ZM640.3 0.2Q631.8 0.0 630.2 0.6L630.2 0.6Q541.4 156.8 541.1 159.4L541.1 159.4L549.0 159.7Q551.3 158.0 594.2 82.6L594.2 82.6Q637.2 7.2 640.3 0.2L640.3 0.2ZM609.3 0.2Q593.0 0.0 591.4 0.6L591.4 0.6Q502.4 156.8 502.1 159.4L502.1 159.4Q517.2 159.7 518.6 158.9L518.6 158.9Q520.0 158.0 563.8 81.2L563.8 81.2Q607.6 4.5 609.3 0.2L609.3 0.2ZM575.0 0.2Q547.3 0.0 545.4 0.6L545.4 0.6L455.9 158.2L456.4 159.4Q482.5 159.7 484.0 159.0L484.0 159.0Q485.6 158.2 528.7 82.7L528.7 82.7Q571.8 7.2 575.0 0.2L575.0 0.2ZM533.2 0.2L486.4 0.5Q397.3 157.0 397.0 159.3L397.0 159.3Q440.8 159.7 443.6 158.7L443.6 158.7Q530.8 6.0 533.2 0.2L533.2 0.2ZM476.0 0.2L413.6 0.5Q325.2 155.8 324.2 159.3L324.2 159.3Q383.2 159.7 386.3 158.7L386.3 158.7Q473.4 6.2 476.0 0.2L476.0 0.2ZM404.9 0.2L329.0 0.3Q240.2 156.2 239.5 159.3L239.5 159.3Q312.0 159.7 315.2 158.7L315.2 158.7Q402.4 6.0 404.9 0.2L404.9 0.2ZM1.2 158.7Q4.0 159.7 231.0 159.5L231.0 159.5Q235.3 153.2 321.7 0.5L321.7 0.5L1.5 0.2L1.2 158.7Z"],"Home Depot":[838,206,"M192.3 194.8L191.1 196.0L192.3 197.4L193.6 196.0L192.3 194.8ZM191.2 187.5Q194.5 188.0 196.8 190.0L196.8 190.0L195.1 191.0Q194.5 192.3 194.6 194.8L194.6 194.8L196.7 196.1L194.5 198.3L190.2 198.1L187.6 195.3L187.7 194.5L189.4 194.3Q189.7 193.0 189.3 191.4L189.3 191.4L187.6 191.7L187.6 190.5L191.2 187.5ZM223.5 202.4Q224.8 203.0 490.9 202.7L490.9 202.7Q491.7 201.2 491.7 186.2L491.7 186.2Q491.7 171.3 491.3 169.9L491.3 169.9Q490.0 169.3 358.1 169.2L358.1 169.2Q226.2 169.1 223.8 169.6L223.8 169.6Q223.1 171.0 223.0 185.9L223.0 185.9Q223.0 200.8 223.5 202.4L223.5 202.4ZM3.7 165.9Q3.0 169.0 3.0 184.5L3.0 184.5Q3.0 200.0 3.7 202.0L3.7 202.0Q37.2 202.5 39.9 201.8L39.9 201.8L40.5 200.0Q39.3 198.0 23.0 181.8L23.0 181.8Q6.8 165.7 5.0 165.2L5.0 165.2L3.7 165.9ZM117.7 192.7L116.5 193.3L115.4 192.9Q113.7 187.5 106.3 180.1L106.3 180.1Q99.0 172.8 97.9 172.0L97.9 172.0Q96.8 171.3 92.9 170.4L92.9 170.4L92.4 169.0Q93.5 167.3 95.9 166.1L95.9 166.1Q98.2 164.9 101.9 164.9L101.9 164.9Q105.5 164.9 109.0 166.7L109.0 166.7Q112.5 168.5 114.5 170.2L114.5 170.2Q116.5 172.0 118.1 174.4L118.1 174.4Q119.6 176.8 120.3 179.2L120.3 179.2Q121.0 181.8 120.8 184.4L120.8 184.4Q120.6 187.0 117.7 192.7L117.7 192.7ZM139.3 156.7Q145.2 161.6 146.3 163.8L146.3 163.8Q144.7 166.2 139.0 170.8L139.0 170.8L137.4 169.2Q138.7 164.2 137.8 158.3L137.8 158.3L139.3 156.7ZM125.1 150.5L127.5 150.9L134.7 158.5L134.4 160.1Q133.0 160.5 126.6 158.9L126.6 158.9Q124.7 152.2 125.1 150.5L125.1 150.5ZM112.0 148.8L113.5 148.6L136.9 171.8L137.1 173.2Q136.2 174.8 128.5 181.8L128.5 181.8L126.7 181.4Q125.3 177.3 116.5 168.6L116.5 168.6Q107.8 160.0 104.1 158.5L104.1 158.5L104.4 156.3L112.0 148.8ZM115.1 146.2Q119.9 140.5 122.0 139.5L122.0 139.5Q123.8 140.5 128.5 146.7L128.5 146.7L127.0 148.1Q121.8 147.0 116.8 148.1L116.8 148.1L115.5 147.6L115.1 146.2ZM132.3 128.5Q135.0 129.3 144.4 138.7L144.4 138.7Q153.8 148.2 158.4 150.1L158.4 150.1L158.6 151.5Q157.6 153.2 149.2 161.3L149.2 161.3L147.4 161.1Q144.9 156.5 136.7 148.4L136.7 148.4Q128.5 140.3 124.1 138.4L124.1 138.4Q125.1 135.5 132.3 128.5L132.3 128.5ZM40.5 121.3L42.2 121.1L43.8 122.5Q43.6 127.2 44.1 128.1L44.1 128.1Q44.5 129.0 60.1 144.6L60.1 144.6Q75.8 160.2 77.0 161.0L77.0 161.0Q78.2 161.9 83.0 161.8L83.0 161.8L84.5 163.3Q84.4 165.0 83.5 166.4L83.5 166.4Q82.5 167.8 66.0 183.6L66.0 183.6L64.3 183.9L62.7 182.9L62.0 176.5Q49.2 163.4 47.0 162.7L47.0 162.7L42.8 165.7L40.5 164.9L39.2 162.8L42.2 158.2Q41.3 155.8 35.3 149.7L35.3 149.7Q29.2 143.6 28.4 143.3L28.4 143.3Q27.5 143.0 23.8 143.5L23.8 143.5L22.0 142.0Q22.0 140.0 22.8 138.9L22.8 138.9Q23.6 137.8 40.5 121.3L40.5 121.3ZM135.2 126.0Q137.8 123.0 139.6 122.0L139.6 122.0Q141.5 120.9 149.7 120.9L149.7 120.9Q150.0 112.0 151.0 110.0L151.0 110.0Q152.0 108.0 153.8 106.9L153.8 106.9L155.0 107.8Q156.0 111.2 164.5 120.0L164.5 120.0Q173.0 128.7 177.7 130.4L177.7 130.4L178.6 132.0Q175.5 134.8 172.5 135.4L172.5 135.4Q169.5 136.1 167.2 135.8L167.2 135.8Q165.0 135.4 156.6 131.2L156.6 131.2Q153.1 138.2 152.0 139.4L152.0 139.4Q151.0 140.6 149.3 141.1L149.3 141.1L148.1 140.2Q147.8 136.8 146.9 135.4L146.9 135.4Q146.0 134.0 143.1 131.3L143.1 131.3Q140.2 128.7 135.8 127.7L135.8 127.7L135.2 126.0ZM60.0 100.8Q61.7 101.8 62.3 102.8L62.3 102.8Q62.8 103.8 63.1 106.0L63.1 106.0Q63.3 108.2 64.4 109.9L64.4 109.9Q65.5 111.5 80.3 126.2L80.3 126.2Q95.0 140.9 96.4 141.7L96.4 141.7Q97.8 142.6 99.8 142.6L99.8 142.6Q101.8 142.7 102.6 143.2L102.6 143.2Q103.5 143.8 104.9 145.8L104.9 145.8L104.2 147.4Q95.5 151.9 93.1 152.4L93.1 152.4Q90.8 152.9 88.2 152.9L88.2 152.9Q85.8 152.9 80.9 151.5L80.9 151.5Q76.0 150.0 72.6 148.1L72.6 148.1Q69.2 146.1 65.2 142.3L65.2 142.3Q61.2 138.5 59.0 135.1L59.0 135.1Q56.7 131.8 55.4 128.9L55.4 128.9Q54.2 126.0 53.5 123.0L53.5 123.0Q52.8 120.0 52.8 117.5L52.8 117.5Q52.8 115.0 53.4 112.2L53.4 112.2Q54.1 109.5 56.2 105.6L56.2 105.6Q58.3 101.8 60.0 100.8L60.0 100.8ZM778.1 95.8Q779.0 98.5 779.0 108.9L779.0 108.9Q779.0 119.2 778.3 121.9L778.3 121.9Q777.7 124.5 776.7 126.4L776.7 126.4Q775.7 128.2 772.6 131.3L772.6 131.3Q769.5 134.4 767.1 135.5L767.1 135.5Q764.8 136.7 761.8 137.2L761.8 137.2Q758.8 137.7 756.8 137.5L756.8 137.5Q754.8 137.4 752.8 136.6L752.8 136.6Q750.8 135.8 748.9 133.8L748.9 133.8Q747.1 131.8 746.0 128.0L746.0 128.0Q744.8 124.2 744.9 120.8L744.9 120.8Q744.9 117.2 745.5 114.8L745.5 114.8Q746.1 112.2 747.1 110.5L747.1 110.5Q748.0 108.8 749.4 107.4L749.4 107.4Q750.8 106.0 754.4 104.2L754.4 104.2Q758.0 102.3 778.1 95.8L778.1 95.8ZM103.3 92.8Q106.0 92.9 109.6 94.8L109.6 94.8Q113.2 96.7 119.9 102.8L119.9 102.8Q126.5 108.8 128.0 109.4L128.0 109.4Q129.5 109.9 135.5 110.0L135.5 110.0L136.7 111.8Q135.9 114.0 131.6 118.4L131.6 118.4Q127.2 122.7 125.2 123.8L125.2 123.8L123.8 123.5L122.6 122.0Q122.7 116.2 121.8 114.1L121.8 114.1Q120.8 112.0 112.6 103.5L112.6 103.5Q104.3 95.0 103.3 92.8L103.3 92.8ZM168.7 92.3L170.7 93.0Q172.0 97.8 173.6 100.7L173.6 100.7Q175.2 103.7 178.0 106.9L178.0 106.9Q180.9 110.0 182.8 113.8L182.8 113.8Q184.6 117.5 184.5 120.6L184.5 120.6Q184.5 123.8 183.8 125.6L183.8 125.6Q183.1 127.5 181.0 129.8L181.0 129.8L179.3 129.0Q177.4 124.3 169.7 116.5L169.7 116.5Q162.0 108.8 160.9 107.9L160.9 107.9Q159.8 107.1 156.8 106.4L156.8 106.4L155.7 105.2L156.5 103.4Q160.0 101.5 166.3 100.4L166.3 100.4L165.0 96.0L168.7 92.3ZM108.0 142.5Q106.0 141.2 105.5 140.5L105.5 140.5Q105.1 139.8 105.0 137.8L105.0 137.8Q104.9 135.8 104.3 134.6L104.3 134.6Q103.7 133.5 88.4 118.0L88.4 118.0Q73.0 102.5 71.6 101.6L71.6 101.6Q70.2 100.7 68.2 100.7L68.2 100.7Q66.2 100.7 64.3 99.7L64.3 99.7L63.2 97.5Q64.5 95.5 66.4 94.3L66.4 94.3Q68.2 93.1 71.0 92.1L71.0 92.1Q73.8 91.0 78.8 90.9L78.8 90.9Q83.8 90.7 88.6 92.3L88.6 92.3Q93.5 94.0 98.7 98.0L98.7 98.0Q104.0 102.0 105.9 104.3L105.9 104.3Q107.9 106.5 109.9 109.6L109.9 109.6Q111.9 112.8 113.4 117.2L113.4 117.2Q114.9 121.8 114.9 126.1L114.9 126.1Q114.8 130.5 114.0 133.0L114.0 133.0Q113.3 135.5 111.5 138.6L111.5 138.6Q109.7 141.7 108.0 142.5L108.0 142.5ZM25.0 80.6L26.4 80.6Q27.4 81.8 30.5 90.0L30.5 90.0L29.7 91.6Q27.2 90.9 21.9 85.2L21.9 85.2L22.2 83.2L25.0 80.6ZM181.1 79.5L183.8 76.8L185.8 76.6Q191.9 82.5 192.6 85.0L192.6 85.0L190.5 85.8Q186.2 83.5 184.3 83.0L184.3 83.0Q182.3 82.5 181.0 81.2L181.0 81.2L181.1 79.5ZM34.0 71.6Q36.4 72.1 45.3 81.1L45.3 81.1Q54.3 90.2 58.4 92.1L58.4 92.1Q57.8 94.7 49.5 102.5L49.5 102.5L47.7 102.4Q46.2 98.2 27.6 79.7L27.6 79.7Q28.1 77.2 34.0 71.6L34.0 71.6ZM36.7 68.8L39.3 66.0L41.2 65.8Q46.9 71.2 47.5 73.7L47.5 73.7L45.7 74.3Q37.5 71.3 36.5 70.2L36.5 70.2L36.7 68.8ZM452.2 62.1Q455.0 65.0 455.9 67.6L455.9 67.6Q456.8 70.2 457.4 75.0L457.4 75.0Q458.0 79.8 458.0 95.8L458.0 95.8Q458.0 111.8 457.4 115.9L457.4 115.9Q456.8 120.0 456.2 122.0L456.2 122.0Q455.5 124.0 454.6 125.3L454.6 125.3Q453.7 126.7 452.3 127.5L452.3 127.5Q451.0 128.4 449.5 128.7L449.5 128.7Q448.0 129.0 442.8 127.1L442.8 127.1Q440.2 122.8 439.5 119.8L439.5 119.8Q438.8 116.8 438.3 110.1L438.3 110.1Q437.8 103.5 437.8 95.0L437.8 95.0Q437.8 86.5 438.3 79.4L438.3 79.4Q438.9 72.2 440.4 68.1L440.4 68.1Q441.9 64.0 443.1 63.0L443.1 63.0Q444.2 62.0 445.9 61.6L445.9 61.6Q447.5 61.3 452.2 62.1L452.2 62.1ZM54.5 54.2L54.3 57.2Q58.0 61.5 64.4 67.7L64.4 67.7Q70.8 73.9 72.7 74.7L72.7 74.7L74.5 74.3L74.9 71.5Q72.2 68.2 68.0 64.4L68.0 64.4L63.6 64.8L63.2 63.7L64.2 61.0Q63.4 59.5 57.8 54.0L57.8 54.0L54.5 54.2ZM64.0 42.0L65.3 42.6Q66.3 45.8 74.3 53.9L74.3 53.9Q82.2 62.0 85.9 63.5L85.9 63.5L86.6 64.8Q85.2 67.2 80.5 71.5L80.5 71.5Q75.7 75.7 74.0 78.0L74.0 78.0Q72.2 80.2 69.6 82.8L69.6 82.8Q67.0 85.4 65.0 86.4L65.0 86.4L63.8 85.7Q62.5 82.2 56.5 76.0L56.5 76.0Q50.4 69.8 48.2 67.9L48.2 67.9Q46.0 65.9 42.8 65.1L42.8 65.1L42.2 64.0Q43.3 62.0 47.0 58.3L47.0 58.3Q50.8 54.5 52.1 53.7L52.1 53.7Q53.5 52.8 57.0 48.7L57.0 48.7Q60.5 44.5 64.0 42.0L64.0 42.0ZM100.8 37.9Q104.0 40.0 107.2 44.2L107.2 44.2Q104.0 48.5 100.5 51.0L100.5 51.0L99.2 49.2Q100.4 44.2 99.4 39.0L99.4 39.0L100.8 37.9ZM431.1 39.3Q427.0 40.5 422.6 42.8Q418.2 45.2 414.8 48.7Q411.3 52.2 408.7 57.0Q406.1 61.8 404.6 67.0Q403.1 72.2 402.2 81.9Q401.3 91.5 401.7 102.4Q402.1 113.2 403.1 119.0Q404.2 124.8 405.9 129.2Q407.6 133.8 409.5 136.6Q411.3 139.5 414.3 142.4Q417.2 145.3 421.0 147.3Q424.8 149.3 428.5 150.4Q432.2 151.6 435.9 152.2Q439.5 152.7 447.8 152.7Q456.0 152.7 459.4 152.2Q462.8 151.6 467.5 150.0Q472.2 148.4 475.2 146.6Q478.2 144.7 482.1 140.4Q486.0 136.0 488.2 131.6Q490.3 127.2 492.0 121.1Q493.6 115.0 494.2 109.4Q494.7 103.8 494.7 94.4Q494.7 85.0 493.6 76.1Q492.5 67.2 491.3 63.6Q490.2 60.0 488.3 56.5Q486.5 53.0 483.0 49.1Q479.5 45.3 477.0 43.8Q474.5 42.3 470.6 40.7Q466.8 39.2 460.5 38.2Q454.2 37.1 448.8 37.0Q443.2 37.0 439.2 37.6Q435.2 38.1 431.1 39.3ZM395.7 37.3Q388.0 37.1 384.0 38.3L384.0 38.3Q380.0 39.6 376.8 41.9L376.8 41.9Q373.6 44.3 366.8 54.0L366.8 54.0Q365.8 52.5 365.7 41.5L365.7 41.5L364.5 40.2Q333.0 40.0 330.4 41.3L330.4 41.3Q330.3 146.8 331.3 149.5L331.3 149.5Q363.5 150.0 366.4 148.9L366.4 148.9Q366.8 88.8 367.4 85.5L367.4 85.5Q368.0 82.2 369.6 79.4L369.6 79.4Q371.1 76.5 373.3 74.9L373.3 74.9Q375.5 73.3 379.9 72.0L379.9 72.0Q384.2 70.8 389.4 71.1L389.4 71.1Q394.5 71.4 396.4 70.4L396.4 70.4Q396.7 39.8 395.7 37.3L395.7 37.3ZM820.7 36.7Q820.1 41.5 820.9 47.3L820.9 47.3L822.1 47.3L823.8 44.7L827.0 47.7L830.4 45.2L832.1 47.3L833.5 47.1Q834.0 38.5 833.2 36.5L833.2 36.5L830.1 36.4L827.2 40.4L824.0 36.3L820.7 36.7ZM810.3 36.2L809.3 37.7L811.7 40.3L812.1 46.5L813.7 47.7Q814.7 46.5 815.0 40.5L815.0 40.5L817.3 38.4L817.5 37.1Q816.0 36.1 810.3 36.2L810.3 36.2ZM726.9 75.0L745.9 75.2Q746.7 73.7 747.0 69.9L747.0 69.9Q747.3 66.0 748.7 62.8L748.7 62.8Q750.0 59.5 752.0 57.5L752.0 57.5Q754.0 55.5 757.2 54.4L757.2 54.4Q760.5 53.3 764.2 53.3L764.2 53.3Q768.0 53.4 771.6 55.0L771.6 55.0Q775.2 56.6 777.0 59.4L777.0 59.4Q778.7 62.2 779.2 66.4L779.2 66.4Q779.7 70.5 778.3 76.5L778.3 76.5Q774.5 79.8 771.8 81.0L771.8 81.0Q769.0 82.2 754.9 86.5L754.9 86.5Q740.8 90.8 737.6 92.8L737.6 92.8Q734.5 94.8 731.9 97.5L731.9 97.5Q729.3 100.2 728.1 102.2L728.1 102.2Q727.0 104.2 725.6 108.2L725.6 108.2Q724.3 112.2 723.9 116.4L723.9 116.4Q723.5 120.5 724.3 127.4L724.3 127.4Q725.2 134.2 726.6 137.6L726.6 137.6Q728.0 141.0 729.9 143.6L729.9 143.6Q731.8 146.2 734.2 148.2L734.2 148.2Q736.5 150.2 739.8 151.7L739.8 151.7Q743.0 153.1 745.6 153.8L745.6 153.8Q748.2 154.4 753.9 154.5L753.9 154.5Q759.5 154.5 761.9 153.9L761.9 153.9Q764.2 153.3 767.4 151.9L767.4 151.9Q770.5 150.5 779.7 143.5L779.7 143.5Q783.8 148.9 786.3 150.5L786.3 150.5Q788.8 152.2 793.0 152.7L793.0 152.7Q797.2 153.2 807.2 152.1L807.2 152.1Q808.7 149.8 808.6 136.6L808.6 136.6L807.7 136.0Q804.2 137.3 802.0 137.2L802.0 137.2Q800.3 135.7 799.9 134.6L799.9 134.6Q799.6 133.5 799.5 100.5L799.5 100.5Q799.5 67.5 799.0 62.5L799.0 62.5Q798.6 57.5 797.2 53.8L797.2 53.8Q795.9 50.0 794.1 47.5L794.1 47.5Q792.2 45.0 789.5 42.9L789.5 42.9Q786.8 40.7 782.2 39.1L782.2 39.1Q777.8 37.4 773.4 36.7L773.4 36.7Q769.0 36.0 764.1 36.0L764.1 36.0Q759.2 36.0 754.9 36.7L754.9 36.7Q750.5 37.4 747.0 38.5L747.0 38.5Q743.5 39.7 739.1 42.8L739.1 42.8Q734.8 46.0 732.2 49.8L732.2 49.8Q729.7 53.5 728.5 57.6L728.5 57.6Q727.2 61.8 726.8 64.9L726.8 64.9Q726.3 68.0 726.9 75.0L726.9 75.0ZM690.3 47.6L689.3 46.2L689.0 41.0L687.5 39.4Q671.5 39.3 669.0 40.5L669.0 40.5L669.0 150.5L670.0 151.4Q685.8 151.7 688.7 150.4L688.7 150.4Q689.0 79.5 689.5 76.8L689.5 76.8Q690.0 74.0 691.9 69.8L691.9 69.8Q693.9 65.5 696.1 63.3L696.1 63.3Q698.2 61.1 700.0 59.9L700.0 59.9Q701.8 58.7 704.1 58.0L704.1 58.0Q706.5 57.3 712.7 57.4L712.7 57.4Q719.0 57.5 720.4 56.9L720.4 56.9Q720.7 40.2 720.5 39.4L720.5 39.4Q720.3 38.5 719.6 37.9L719.6 37.9Q719.0 37.3 717.0 36.7L717.0 36.7Q715.0 36.1 712.5 36.0L712.5 36.0Q710.0 36.0 706.8 36.7L706.8 36.7Q703.5 37.5 700.5 39.2L700.5 39.2Q697.5 40.9 690.3 47.6L690.3 47.6ZM127.0 35.0L128.5 35.2L129.7 36.5Q129.4 41.0 130.0 42.0L130.0 42.0Q130.6 43.0 146.0 58.5L146.0 58.5Q161.5 74.0 164.2 75.9L164.2 75.9L168.7 75.6L170.6 77.5Q168.5 81.7 160.9 89.2L160.9 89.2Q153.2 96.7 150.3 97.9L150.3 97.9L148.1 96.0Q148.6 92.2 148.2 91.3L148.2 91.3Q147.8 90.3 136.6 78.9L136.6 78.9Q125.4 67.6 123.6 66.6L123.6 66.6Q124.5 69.5 133.7 86.6L133.7 86.6Q142.9 103.8 143.3 106.0L143.3 106.0L142.0 107.3Q136.2 105.2 113.6 93.9L113.6 93.9Q91.0 82.7 89.5 82.4L89.5 82.4Q88.0 82.1 83.8 83.3L83.8 83.3L81.9 81.2Q83.6 77.5 98.2 63.7L98.2 63.7Q117.5 72.5 120.4 73.0L120.4 73.0L110.1 52.0Q111.3 50.0 117.3 43.9L117.3 43.9Q123.3 37.8 127.0 35.0L127.0 35.0ZM263.0 67.2L260.9 65.7Q260.8 35.2 261.2 33.6L261.2 33.6Q262.5 32.7 267.0 32.8L267.0 32.8Q271.5 32.8 273.2 33.4L273.2 33.4Q275.0 34.0 277.3 36.1L277.3 36.1Q279.6 38.2 280.6 40.8L280.6 40.8Q281.6 43.2 281.8 49.1L281.8 49.1Q282.0 55.0 281.4 57.1L281.4 57.1Q280.8 59.2 279.1 61.7L279.1 61.7Q277.5 64.2 275.5 65.3L275.5 65.3Q273.5 66.4 263.0 67.2L263.0 67.2ZM87.4 31.7L89.5 31.9L96.3 39.2L96.1 40.6Q94.5 41.1 88.6 39.7L88.6 39.7Q86.9 33.3 87.4 31.7L87.4 31.7ZM75.5 30.1Q77.6 30.6 98.4 51.8L98.4 51.8L97.9 54.5L90.8 61.1L89.2 60.9Q87.4 56.8 80.3 49.5L80.3 49.5Q73.2 42.3 67.6 39.2L67.6 39.2L67.6 38.0Q69.1 36.0 75.5 30.1L75.5 30.1ZM90.3 27.5L89.0 29.2Q84.2 28.5 79.3 29.6L79.3 29.6L77.9 28.2Q79.5 25.8 84.2 21.8L84.2 21.8Q87.2 23.6 90.3 27.5L90.3 27.5ZM168.6 17.9L170.3 17.2Q172.0 18.0 177.4 23.1L177.4 23.1Q182.7 28.3 184.7 30.6L184.7 30.6Q186.7 33.0 186.9 34.7L186.9 34.7L186.1 36.1L184.2 36.6Q178.2 34.4 175.9 34.4L175.9 34.4Q173.5 34.3 172.3 33.5L172.3 33.5Q171.1 32.7 170.6 31.9L170.6 31.9Q170.1 31.0 169.9 28.1L169.9 28.1Q169.8 25.2 167.9 20.5L167.9 20.5L168.6 17.9ZM146.5 15.0L148.0 14.8Q150.2 16.5 190.6 57.5L190.6 57.5L190.5 59.0Q175.2 74.3 173.5 74.7L173.5 74.7L171.9 73.9Q171.2 72.2 171.8 69.0L171.8 69.0Q170.7 66.8 155.7 51.6L155.7 51.6Q140.8 36.5 137.2 33.7L137.2 33.7L133.0 34.2L131.2 33.0L130.9 31.2Q132.0 29.2 146.5 15.0L146.5 15.0ZM621.5 7.1L620.0 9.0L619.6 38.2Q617.7 39.2 605.5 39.4L605.5 39.4L604.2 40.5Q604.0 54.0 604.7 55.8L604.7 55.8Q606.5 56.5 618.0 56.6L618.0 56.6L619.9 58.5Q620.0 134.0 620.6 137.1L620.6 137.1Q621.1 140.2 622.0 142.4L622.0 142.4Q622.8 144.5 623.9 145.9L623.9 145.9Q625.0 147.2 626.6 148.5L626.6 148.5Q628.2 149.7 630.9 150.9L630.9 150.9Q633.5 152.1 638.9 152.8L638.9 152.8Q644.2 153.4 650.0 152.9L650.0 152.9Q655.8 152.5 656.8 151.9L656.8 151.9Q657.9 151.4 658.4 150.6L658.4 150.6Q658.9 149.7 658.6 135.6L658.6 135.6Q655.2 134.3 650.0 134.3L650.0 134.3Q644.8 134.2 643.6 133.5L643.6 133.5Q642.5 132.7 641.7 130.9L641.7 130.9Q640.9 129.0 640.7 94.8L640.7 94.8Q640.5 60.5 641.1 57.8L641.1 57.8Q642.5 56.8 649.6 56.6L649.6 56.6Q656.8 56.5 658.8 55.8L658.8 55.8Q659.5 53.8 659.4 41.0L659.4 41.0L657.5 39.3Q643.2 39.2 641.1 38.2L641.1 38.2Q640.5 33.5 640.6 21.4L640.6 21.4Q640.7 9.3 640.0 7.7L640.0 7.7Q638.0 7.0 621.5 7.1L621.5 7.1ZM223.3 5.8Q223.1 148.2 223.8 149.5L223.8 149.5Q225.5 150.0 242.2 149.9L242.2 149.9Q259.0 149.9 260.3 149.1L260.3 149.1Q260.7 147.5 261.1 96.0L261.1 96.0Q263.2 94.8 272.4 94.8L272.4 94.8Q281.5 94.7 285.5 94.1L285.5 94.1Q289.5 93.5 294.0 92.0L294.0 92.0Q298.5 90.4 303.4 87.3L303.4 87.3Q308.2 84.2 311.9 79.7L311.9 79.7Q315.5 75.2 317.5 70.1L317.5 70.1Q319.5 65.0 320.5 58.4L320.5 58.4Q321.5 51.8 321.0 45.1L321.0 45.1Q320.6 38.5 319.2 33.8L319.2 33.8Q317.7 29.0 315.1 24.1L315.1 24.1Q312.4 19.2 308.6 15.5L308.6 15.5Q304.8 11.8 300.0 9.5L300.0 9.5Q295.2 7.2 290.4 6.1L290.4 6.1Q285.5 5.0 255.0 5.1L255.0 5.1Q224.5 5.1 223.3 5.8L223.3 5.8ZM509.6 3.4L509.1 4.5Q541.3 69.5 544.0 76.2L544.0 76.2Q541.2 82.8 523.9 115.8L523.9 115.8Q506.6 148.8 506.3 150.9L506.3 150.9Q508.2 151.7 516.6 151.7L516.6 151.7Q525.0 151.7 528.1 150.7L528.1 150.7Q554.6 98.8 556.0 97.7L556.0 97.7Q557.7 99.3 583.6 150.7L583.6 150.7Q586.2 151.7 606.4 151.4L606.4 151.4Q606.5 149.2 589.5 116.9L589.5 116.9Q572.6 84.5 568.8 76.0L568.8 76.0Q570.0 72.5 586.8 39.4L586.8 39.4Q603.7 6.2 604.2 3.6L604.2 3.6Q602.5 3.0 593.7 3.0L593.7 3.0Q585.0 3.0 582.5 3.9L582.5 3.9Q559.5 50.5 557.0 52.9L557.0 52.9Q555.3 51.2 532.1 4.1L532.1 4.1Q529.8 3.0 509.6 3.4L509.6 3.4ZM201.9 3.3Q171.0 3.1 170.2 3.6L170.2 3.6Q170.5 4.8 175.5 10.8L175.5 10.8L175.5 12.2L174.5 13.5Q172.5 13.9 170.0 13.0L170.0 13.0Q167.5 12.1 164.6 12.0L164.6 12.0Q161.8 11.8 153.8 14.2L153.8 14.2L151.6 13.0L150.8 11.0Q156.3 4.8 156.5 3.6L156.5 3.6L155.7 3.1L3.7 3.5Q3.0 6.2 3.3 156.4L3.3 156.4Q5.3 156.0 11.4 150.0L11.4 150.0Q17.5 144.0 19.5 143.3L19.5 143.3L21.2 143.9L21.9 145.5Q21.4 149.0 21.7 149.9L21.7 149.9Q22.0 150.7 38.3 167.2L38.3 167.2Q54.5 183.6 55.5 184.0L55.5 184.0Q56.5 184.5 60.5 183.9L60.5 183.9L62.2 185.0Q62.3 186.5 61.8 187.6L61.8 187.6Q61.3 188.8 55.7 194.5L55.7 194.5Q50.1 200.2 49.4 201.7L49.4 201.7L50.3 202.4L102.6 202.2L103.1 201.0Q102.0 199.2 93.7 191.0L93.7 191.0Q85.5 182.7 81.3 181.0L81.3 181.0Q82.5 178.0 85.4 175.1L85.4 175.1Q88.3 172.3 90.2 171.3L90.2 171.3Q92.2 172.3 114.1 194.5L114.1 194.5L114.2 196.5L110.4 201.2L111.0 202.3L202.0 202.0Q202.7 199.5 202.6 110.5L202.6 110.5L201.2 109.8Q195.2 115.4 192.8 115.9L192.8 115.9Q190.1 110.2 171.1 90.5L171.1 90.5Q171.8 88.8 174.4 86.1L174.4 86.1Q177.0 83.5 179.5 82.6L179.5 82.6Q199.8 102.4 201.5 103.3L201.5 103.3L202.5 102.5Q202.7 49.8 202.1 48.9L202.1 48.9Q201.0 49.1 194.2 54.8L194.2 54.8L192.3 53.9L191.1 51.8Q193.7 44.0 193.7 41.4L193.7 41.4Q193.7 38.8 192.6 35.6L192.6 35.6Q191.6 32.5 191.9 30.3L191.9 30.3L193.3 29.1L194.8 29.2Q201.0 34.5 202.1 34.6L202.1 34.6Q202.7 33.7 202.7 19.6L202.7 19.6Q202.7 5.5 201.9 3.3L201.9 3.3Z"],"RichTech":[1572,472,"M1143.0 298.0L1144.0 297.0Q1170.2 296.8 1172.5 297.4L1172.5 297.4Q1174.8 297.9 1176.2 299.0L1176.2 299.0Q1177.7 300.0 1178.9 301.6L1178.9 301.6Q1180.1 303.2 1180.4 304.8L1180.4 304.8Q1180.7 306.2 1180.6 309.2L1180.6 309.2Q1180.4 312.2 1178.6 314.6L1178.6 314.6Q1176.7 317.0 1173.2 318.3L1173.2 318.3Q1169.8 319.6 1144.0 319.7L1144.0 319.7Q1142.8 317.5 1143.0 298.0L1143.0 298.0ZM636.6 297.2Q654.5 296.8 657.5 297.4L657.5 297.4Q660.5 298.0 665.8 300.5L665.8 300.5Q671.0 303.0 673.7 305.9L673.7 305.9Q676.5 308.8 677.5 310.8L677.5 310.8Q678.6 312.8 679.7 316.4L679.7 316.4Q680.9 320.0 680.9 325.6L680.9 325.6Q680.9 331.2 678.7 336.6L678.7 336.6Q676.6 342.0 673.0 345.5L673.0 345.5Q669.5 349.1 666.2 350.8L666.2 350.8Q663.0 352.5 660.0 353.2L660.0 353.2Q657.0 353.9 650.8 354.5L650.8 354.5Q644.5 355.0 641.1 355.0L641.1 355.0Q637.8 354.9 636.0 353.9L636.0 353.9Q635.6 298.8 636.6 297.2L636.6 297.2ZM1264.3 285.8Q1263.0 288.8 1263.0 325.2L1263.0 325.2Q1263.0 361.8 1264.8 365.3L1264.8 365.3Q1270.5 366.7 1274.1 365.1L1274.1 365.1Q1275.7 361.5 1275.7 326.0L1275.7 326.0Q1275.7 290.5 1275.4 289.0L1275.4 289.0Q1275.1 287.5 1273.5 285.5L1273.5 285.5Q1267.5 284.8 1264.3 285.8L1264.3 285.8ZM406.1 285.7Q405.0 288.0 405.0 325.0L405.0 325.0Q405.0 362.0 406.5 365.2L406.5 365.2Q412.8 366.7 415.8 365.2L415.8 365.2Q417.0 361.8 417.1 326.4L417.1 326.4Q417.2 291.0 417.0 289.1L417.0 289.1Q416.8 287.3 415.7 285.5L415.7 285.5Q409.2 284.8 406.1 285.7L406.1 285.7ZM1131.8 285.7Q1130.4 287.8 1130.2 289.0L1130.2 289.0Q1130.0 290.2 1130.0 325.8L1130.0 325.8Q1130.0 361.2 1130.6 363.0L1130.6 363.0Q1131.2 364.7 1132.6 365.6L1132.6 365.6Q1134.0 366.5 1135.8 366.6L1135.8 366.6Q1137.5 366.6 1139.1 366.0L1139.1 366.0Q1140.7 365.3 1141.6 364.2L1141.6 364.2Q1142.4 363.0 1142.6 348.6L1142.6 348.6Q1142.8 334.2 1143.4 332.4L1143.4 332.4Q1145.2 331.8 1154.1 331.9L1154.1 331.9Q1163.0 332.1 1163.9 332.8L1163.9 332.8Q1164.8 333.5 1175.8 348.9L1175.8 348.9Q1186.8 364.2 1188.6 365.2L1188.6 365.2Q1190.5 366.1 1193.5 366.4L1193.5 366.4Q1196.5 366.7 1198.5 366.1L1198.5 366.1L1199.7 364.0Q1198.9 361.2 1178.3 331.3L1178.3 331.3Q1179.1 329.7 1183.5 326.5L1183.5 326.5Q1187.8 323.2 1189.4 321.0L1189.4 321.0Q1191.0 318.8 1191.8 316.6L1191.8 316.6Q1192.6 314.5 1193.0 311.5L1193.0 311.5Q1193.4 308.5 1193.0 304.8L1193.0 304.8Q1192.6 301.0 1189.8 296.5L1189.8 296.5Q1187.1 292.0 1184.1 289.9L1184.1 289.9Q1181.0 287.8 1177.2 286.4L1177.2 286.4Q1173.5 285.1 1155.0 284.8L1155.0 284.8Q1136.5 284.5 1131.8 285.7L1131.8 285.7ZM1067.0 285.3Q1062.0 284.6 1034.9 284.7L1034.9 284.7Q1007.8 284.8 1006.4 285.1L1006.4 285.1Q1005.0 285.5 1004.2 286.5L1004.2 286.5Q1003.3 287.5 1003.2 293.2L1003.2 293.2L1005.8 296.4Q1027.5 296.8 1029.8 298.5L1029.8 298.5Q1030.0 362.8 1030.3 363.9L1030.3 363.9Q1030.7 365.0 1031.6 365.7L1031.6 365.7Q1032.5 366.4 1034.5 366.5L1034.5 366.5Q1036.5 366.7 1038.0 366.3L1038.0 366.3Q1039.5 365.9 1040.4 365.2L1040.4 365.2Q1041.2 364.5 1041.6 363.4L1041.6 363.4Q1041.9 362.2 1042.0 298.3L1042.0 298.3Q1044.2 296.8 1066.2 296.3L1066.2 296.3Q1068.2 294.5 1068.6 293.0L1068.6 293.0Q1068.9 291.5 1068.8 289.3L1068.8 289.3Q1068.6 287.0 1067.0 285.3L1067.0 285.3ZM824.0 286.3Q821.8 285.0 819.1 284.9L819.1 284.9Q816.5 284.9 814.1 285.7L814.1 285.7Q812.8 288.0 812.6 309.9L812.6 309.9Q812.5 331.8 812.2 335.8L812.2 335.8Q811.8 339.8 810.7 342.8L810.7 342.8Q809.5 345.8 807.4 348.5L807.4 348.5Q805.2 351.2 802.6 352.8L802.6 352.8Q800.0 354.3 794.5 354.8L794.5 354.8Q789.0 355.2 786.5 355.0L786.5 355.0Q784.0 354.8 781.2 353.3L781.2 353.3Q778.5 351.8 776.9 350.1L776.9 350.1Q775.2 348.5 773.7 345.9L773.7 345.9Q772.2 343.2 771.3 338.5L771.3 338.5Q770.5 333.8 770.4 311.0L770.4 311.0Q770.2 288.2 769.7 287.2L769.7 287.2Q769.2 286.1 768.2 285.5L768.2 285.5Q767.2 285.0 764.9 284.8L764.9 284.8Q762.5 284.5 761.0 285.0L761.0 285.0Q759.5 285.5 758.9 286.3L758.9 286.3Q758.3 287.0 757.9 288.4L757.9 288.4Q757.6 289.8 757.8 313.0L757.8 313.0Q758.0 336.2 758.8 340.4L758.8 340.4Q759.5 344.5 762.1 349.6L762.1 349.6Q764.6 354.8 768.7 358.6L768.7 358.6Q772.8 362.5 775.5 363.9L775.5 363.9Q778.2 365.4 781.8 366.5L781.8 366.5Q785.2 367.6 791.6 367.6L791.6 367.6Q798.0 367.5 801.6 366.3L801.6 366.3Q805.2 365.2 808.2 363.5L808.2 363.5Q811.2 361.8 815.2 357.8L815.2 357.8Q819.1 353.8 820.7 350.4L820.7 350.4Q822.2 347.0 823.4 343.2L823.4 343.2Q824.6 339.5 824.7 314.4L824.7 314.4Q824.7 289.2 824.0 286.3L824.0 286.3ZM624.3 285.5Q623.0 289.2 623.0 325.5L623.0 325.5Q623.0 361.8 623.4 363.2L623.4 363.2Q623.7 364.7 624.5 365.4L624.5 365.4Q625.3 366.1 626.4 366.4L626.4 366.4Q627.5 366.7 639.9 366.7L639.9 366.7Q652.2 366.7 658.4 365.6L658.4 365.6Q664.5 364.5 669.8 362.2L669.8 362.2Q675.0 359.8 678.3 357.1L678.3 357.1Q681.6 354.4 684.6 350.8L684.6 350.8Q687.5 347.2 688.9 344.6L688.9 344.6Q690.4 342.0 692.0 337.1L692.0 337.1Q693.6 332.2 693.6 325.6L693.6 325.6Q693.6 319.0 692.3 314.8L692.3 314.8Q691.0 310.5 689.3 307.2L689.3 307.2Q687.6 304.0 685.0 300.6L685.0 300.6Q682.5 297.3 679.7 295.0L679.7 295.0Q677.0 292.8 672.6 290.4L672.6 290.4Q668.2 287.9 666.0 287.1L666.0 287.1Q663.8 286.3 658.4 285.5L658.4 285.5Q653.0 284.8 641.8 284.6L641.8 284.6Q630.5 284.5 624.3 285.5L624.3 285.5ZM488.1 285.6Q486.6 289.8 486.7 325.4L486.7 325.4Q486.8 361.0 487.7 364.9L487.7 364.9Q490.8 366.4 492.8 366.5L492.8 366.5Q494.8 366.6 496.1 366.0L496.1 366.0Q497.5 365.3 498.1 364.2L498.1 364.2Q498.7 363.0 498.8 337.2L498.8 337.2Q498.8 311.5 499.8 309.4L499.8 309.4Q542.3 363.7 543.4 364.6L543.4 364.6Q544.5 365.5 546.4 366.0L546.4 366.0Q548.2 366.6 552.7 365.3L552.7 365.3Q554.0 362.5 554.1 327.0L554.1 327.0Q554.2 291.5 553.1 286.0L553.1 286.0Q551.0 284.8 548.8 284.7L548.8 284.7Q546.5 284.6 545.0 285.1L545.0 285.1Q543.5 285.5 542.8 286.5L542.8 286.5Q542.1 287.5 541.7 340.9L541.7 340.9L540.7 341.4Q498.0 286.8 497.0 286.0L497.0 286.0Q496.0 285.2 494.6 284.9L494.6 284.9Q493.2 284.6 488.1 285.6L488.1 285.6ZM1345.5 286.3Q1344.5 291.0 1344.7 327.0L1344.7 327.0Q1344.8 363.0 1346.3 365.5L1346.3 365.5Q1350.2 366.7 1374.0 366.7L1374.0 366.7Q1397.8 366.7 1399.2 366.4L1399.2 366.4Q1400.7 366.1 1401.8 365.1L1401.8 365.1Q1402.8 364.2 1403.3 363.1L1403.3 363.1Q1403.7 362.0 1403.6 360.1L1403.6 360.1Q1403.6 358.2 1403.0 357.2L1403.0 357.2Q1402.4 356.1 1401.4 355.6L1401.4 355.6Q1400.5 355.0 1381.5 355.0L1381.5 355.0Q1362.5 355.0 1358.5 354.4L1358.5 354.4Q1357.0 351.8 1357.0 341.5L1357.0 341.5Q1357.1 331.2 1358.1 329.4L1358.1 329.4Q1360.2 328.8 1375.2 328.7L1375.2 328.7Q1390.2 328.6 1393.2 326.7L1393.2 326.7Q1394.2 322.2 1393.5 319.0L1393.5 319.0Q1390.5 317.1 1358.1 316.5L1358.1 316.5Q1357.0 314.2 1357.5 297.8L1357.5 297.8Q1360.0 296.8 1379.4 296.7L1379.4 296.7Q1398.8 296.6 1399.9 295.8L1399.9 295.8Q1401.0 295.0 1401.5 293.6L1401.5 293.6Q1401.9 292.2 1401.8 289.9L1401.8 289.9Q1401.6 287.5 1400.8 286.4L1400.8 286.4Q1400.0 285.4 1398.0 284.8L1398.0 284.8Q1396.0 284.3 1371.5 284.7L1371.5 284.7Q1347.0 285.1 1345.5 286.3L1345.5 286.3ZM1462.8 346.4L1460.4 349.0Q1460.4 355.2 1460.9 356.7L1460.9 356.7Q1461.4 358.2 1463.9 360.2L1463.9 360.2Q1466.5 362.2 1470.5 363.8L1470.5 363.8Q1474.5 365.4 1479.5 366.5L1479.5 366.5Q1484.5 367.7 1490.5 367.7L1490.5 367.7Q1496.5 367.6 1502.0 366.0L1502.0 366.0Q1507.5 364.4 1510.2 362.6L1510.2 362.6Q1513.0 360.9 1515.1 358.7L1515.1 358.7Q1517.3 356.5 1518.8 353.8L1518.8 353.8Q1520.4 351.0 1521.0 348.2L1521.0 348.2Q1521.7 345.5 1521.7 343.1L1521.7 343.1Q1521.7 340.8 1521.1 338.2L1521.1 338.2Q1520.5 335.8 1518.2 332.4L1518.2 332.4Q1516.0 329.0 1512.1 326.1L1512.1 326.1Q1508.2 323.2 1505.0 321.8L1505.0 321.8Q1501.8 320.3 1492.4 317.5L1492.4 317.5Q1483.0 314.7 1481.0 313.6L1481.0 313.6Q1479.0 312.5 1477.2 310.5L1477.2 310.5Q1475.5 308.5 1475.4 306.0L1475.4 306.0Q1475.3 303.5 1475.8 302.2L1475.8 302.2Q1476.4 301.0 1477.8 299.6L1477.8 299.6Q1479.2 298.3 1483.2 297.0L1483.2 297.0Q1487.2 295.8 1491.5 295.8L1491.5 295.8Q1495.8 295.8 1498.5 296.4L1498.5 296.4Q1501.2 297.0 1514.5 302.6L1514.5 302.6L1516.7 300.5Q1517.1 294.2 1516.6 292.9L1516.6 292.9Q1516.2 291.5 1515.3 290.7L1515.3 290.7Q1514.5 289.9 1512.4 288.6L1512.4 288.6Q1510.2 287.4 1504.8 285.7L1504.8 285.7Q1499.2 284.0 1490.9 284.1L1490.9 284.1Q1482.5 284.1 1477.8 285.9L1477.8 285.9Q1473.0 287.7 1470.9 289.4L1470.9 289.4Q1468.8 291.1 1467.3 292.9L1467.3 292.9Q1465.8 294.8 1464.4 297.4L1464.4 297.4Q1463.1 300.0 1462.9 303.0L1462.9 303.0Q1462.8 306.0 1463.1 309.5L1463.1 309.5Q1463.5 313.0 1465.8 316.2L1465.8 316.2Q1468.1 319.4 1471.3 321.7L1471.3 321.7Q1474.5 324.1 1478.0 325.7L1478.0 325.7Q1481.5 327.3 1490.8 330.1L1490.8 330.1Q1500.0 332.9 1502.4 334.2L1502.4 334.2Q1504.8 335.4 1506.7 337.7L1506.7 337.7Q1508.6 340.0 1508.6 343.1L1508.6 343.1Q1508.7 346.2 1507.4 348.4L1507.4 348.4Q1506.1 350.5 1504.4 351.8L1504.4 351.8Q1502.8 353.0 1500.4 353.9L1500.4 353.9Q1498.0 354.8 1494.4 355.2L1494.4 355.2Q1490.8 355.5 1486.5 355.2L1486.5 355.2Q1482.2 354.9 1477.4 353.3L1477.4 353.3Q1472.5 351.7 1468.6 349.2L1468.6 349.2Q1464.8 346.8 1462.8 346.4L1462.8 346.4ZM888.3 346.1L886.1 348.3Q886.1 355.5 887.3 357.5L887.3 357.5Q888.5 359.5 893.4 362.1L893.4 362.1Q898.2 364.6 904.1 366.2L904.1 366.2Q910.0 367.7 917.1 367.6L917.1 367.6Q924.2 367.4 928.0 366.3L928.0 366.3Q931.8 365.2 934.6 363.6L934.6 363.6Q937.5 362.0 940.5 359.1L940.5 359.1Q943.5 356.2 944.6 354.5L944.6 354.5Q945.7 352.8 946.7 350.0L946.7 350.0Q947.6 347.2 947.8 345.0L947.8 345.0Q948.0 342.8 947.6 340.1L947.6 340.1Q947.1 337.5 945.3 334.0L945.3 334.0Q943.5 330.5 941.1 328.2L941.1 328.2Q938.8 325.9 933.5 323.2L933.5 323.2Q928.2 320.5 917.8 317.1L917.8 317.1Q907.2 313.7 904.8 311.6L904.8 311.6Q902.3 309.5 901.6 308.1L901.6 308.1Q901.0 306.8 901.0 305.6L901.0 305.6Q901.0 304.5 901.8 302.8L901.8 302.8Q902.6 301.0 903.8 299.8L903.8 299.8Q905.0 298.5 906.4 297.8L906.4 297.8Q907.8 297.0 910.4 296.4L910.4 296.4Q913.0 295.8 917.5 295.8L917.5 295.8Q922.0 295.8 925.0 296.4L925.0 296.4Q928.0 296.9 933.4 299.6L933.4 299.6Q938.8 302.3 941.2 302.6L941.2 302.6L943.3 300.2Q943.4 294.5 942.9 293.0L942.9 293.0Q942.4 291.5 941.7 290.7L941.7 290.7Q941.0 289.9 935.7 287.6L935.7 287.6Q930.5 285.2 928.1 284.6L928.1 284.6Q925.8 284.0 917.1 284.1L917.1 284.1Q908.5 284.1 906.2 284.7L906.2 284.7Q904.0 285.4 901.4 286.7L901.4 286.7Q898.8 288.1 895.1 291.8L895.1 291.8Q891.4 295.5 889.8 300.1L889.8 300.1Q888.3 304.8 889.3 309.2L889.3 309.2Q890.3 313.8 892.6 316.9L892.6 316.9Q894.8 320.0 898.0 322.3L898.0 322.3Q901.2 324.5 904.1 325.9L904.1 325.9Q907.0 327.2 916.9 330.1L916.9 330.1Q926.8 333.0 928.9 334.2L928.9 334.2Q931.0 335.4 932.9 337.7L932.9 337.7Q934.8 340.0 934.8 343.2L934.8 343.2Q934.8 346.5 933.5 348.6L933.5 348.6Q932.2 350.7 930.1 352.1L930.1 352.1Q928.0 353.5 926.0 354.2L926.0 354.2Q924.0 354.9 915.9 354.9L915.9 354.9Q907.8 354.9 904.1 353.7L904.1 353.7Q900.5 352.5 895.8 349.5L895.8 349.5Q891.0 346.6 888.3 346.1L888.3 346.1ZM371.1 111.3Q374.0 109.8 399.9 109.8L399.9 109.8Q425.8 109.8 431.5 110.3L431.5 110.3Q437.2 110.9 441.6 112.5L441.6 112.5Q446.0 114.1 448.0 115.3L448.0 115.3Q450.0 116.6 452.4 119.0L452.4 119.0Q454.8 121.5 456.8 125.8L456.8 125.8Q458.7 130.0 459.1 133.1L459.1 133.1Q459.5 136.2 459.2 140.4L459.2 140.4Q459.0 144.5 457.7 148.2L457.7 148.2Q456.5 152.0 454.5 154.7L454.5 154.7Q452.4 157.4 450.1 159.3L450.1 159.3Q447.8 161.1 445.0 162.4L445.0 162.4Q442.2 163.6 438.1 164.7L438.1 164.7Q434.0 165.9 372.0 165.8L372.0 165.8Q370.8 163.2 371.1 111.3L371.1 111.3ZM1439.1 93.6Q1438.0 97.2 1438.0 174.9L1438.0 174.9Q1438.0 252.5 1438.7 255.7L1438.7 255.7Q1443.2 257.2 1447.1 257.2L1447.1 257.2Q1451.0 257.2 1454.2 256.4L1454.2 256.4Q1455.7 254.2 1456.0 249.9L1456.0 249.9Q1456.2 245.5 1456.1 213.0L1456.1 213.0Q1455.9 180.5 1457.0 178.3L1457.0 178.3Q1547.2 177.8 1549.9 178.3L1549.9 178.3Q1551.0 180.5 1551.1 217.2L1551.1 217.2Q1551.2 254.0 1552.3 256.1L1552.3 256.1Q1554.5 256.9 1559.0 257.1L1559.0 257.1Q1563.5 257.2 1567.5 256.3L1567.5 256.3Q1568.5 254.7 1568.6 175.9L1568.6 175.9Q1568.7 97.0 1568.1 94.1L1568.1 94.1Q1565.0 92.8 1559.8 92.8L1559.8 92.8Q1554.5 92.8 1553.4 93.1L1553.4 93.1Q1552.3 93.5 1551.7 94.4L1551.7 94.4Q1551.2 95.3 1551.1 126.3L1551.1 126.3Q1551.0 157.2 1549.9 159.7L1549.9 159.7Q1459.2 160.0 1456.3 158.9L1456.3 158.9Q1455.8 154.5 1456.0 127.1L1456.0 127.1Q1456.2 99.8 1456.0 97.5L1456.0 97.5Q1455.7 95.3 1455.1 94.4L1455.1 94.4Q1454.5 93.5 1453.5 93.1L1453.5 93.1Q1452.5 92.8 1447.1 92.8L1447.1 92.8Q1441.8 92.8 1439.1 93.6L1439.1 93.6ZM1115.8 255.2Q1117.8 256.6 1119.9 256.9L1119.9 256.9Q1122.0 257.2 1173.9 257.2L1173.9 257.2Q1225.8 257.2 1230.2 256.3L1230.2 256.3Q1231.7 253.5 1231.7 248.5L1231.7 248.5Q1231.7 243.5 1230.8 241.1L1230.8 241.1Q1228.8 239.9 1182.6 239.8L1182.6 239.8Q1136.5 239.7 1134.1 238.5L1134.1 238.5Q1133.6 233.8 1133.6 207.0L1133.6 207.0Q1133.6 180.2 1134.6 178.2L1134.6 178.2Q1208.0 177.7 1210.8 176.2L1210.8 176.2Q1211.7 172.5 1211.6 167.8L1211.6 167.8Q1211.5 163.0 1210.9 162.1L1210.9 162.1Q1210.2 161.2 1208.9 160.6L1208.9 160.6Q1207.5 160.1 1172.2 160.2L1172.2 160.2Q1137.0 160.2 1134.6 159.6L1134.6 159.6Q1133.6 157.2 1134.0 110.8L1134.0 110.8Q1136.8 109.8 1180.9 109.7L1180.9 109.7Q1225.0 109.6 1227.3 108.2L1227.3 108.2Q1228.4 104.8 1228.3 100.6L1228.3 100.6Q1228.2 96.5 1227.8 95.4L1227.8 95.4Q1227.5 94.3 1226.7 93.7L1226.7 93.7Q1226.0 93.2 1224.5 93.0L1224.5 93.0Q1223.0 92.8 1172.0 92.8L1172.0 92.8Q1121.0 92.8 1118.9 93.2L1118.9 93.2Q1116.8 93.7 1116.0 94.6L1116.0 94.6Q1115.3 95.5 1115.2 173.8L1115.2 173.8Q1115.0 252.0 1115.8 255.2L1115.8 255.2ZM948.3 93.3Q946.1 96.2 946.1 100.6L946.1 100.6Q946.0 105.0 946.5 106.5L946.5 106.5Q947.0 108.0 948.0 108.8L948.0 108.8Q949.0 109.5 974.1 109.6L974.1 109.6Q999.2 109.8 1000.1 110.0L1000.1 110.0Q1001.0 110.2 1002.3 111.5L1002.3 111.5Q1002.8 253.5 1004.1 256.1L1004.1 256.1Q1006.8 257.1 1010.6 257.2L1010.6 257.2Q1014.5 257.2 1016.7 256.8L1016.7 256.8Q1019.0 256.4 1019.8 255.7L1019.8 255.7Q1020.6 255.0 1020.8 253.9L1020.8 253.9Q1021.0 252.8 1021.2 111.5L1021.2 111.5Q1023.0 110.1 1048.8 109.8L1048.8 109.8Q1074.5 109.6 1075.4 108.9L1075.4 108.9Q1076.3 108.2 1076.7 107.0L1076.7 107.0Q1077.1 105.8 1077.1 100.5L1077.1 100.5Q1077.0 95.3 1076.2 94.3L1076.2 94.3Q1075.5 93.4 1073.9 93.1L1073.9 93.1Q1072.2 92.8 1013.9 92.6L1013.9 92.6Q955.5 92.5 948.3 93.3L948.3 93.3ZM778.1 93.5Q776.8 96.5 776.6 173.0L776.6 173.0Q776.5 249.5 777.7 255.9L777.7 255.9Q781.0 257.3 785.9 257.2L785.9 257.2Q790.8 257.2 792.1 256.7L792.1 256.7Q793.5 256.3 794.1 255.4L794.1 255.4Q794.6 254.5 794.7 217.6L794.7 217.6Q794.8 180.8 795.6 178.2L795.6 178.2Q885.8 177.8 888.7 178.3L888.7 178.3Q890.0 180.8 890.1 217.6L890.1 217.6Q890.1 254.5 891.8 256.5L891.8 256.5Q896.0 257.2 899.6 257.2L899.6 257.2Q903.2 257.2 904.8 256.6L904.8 256.6Q906.4 256.1 907.0 255.3L907.0 255.3Q907.5 254.5 907.6 176.0L907.6 176.0Q907.7 97.5 906.9 94.3L906.9 94.3Q903.5 92.8 899.1 92.7L899.1 92.7Q894.8 92.5 893.1 92.9L893.1 92.9Q891.5 93.3 890.8 94.3L890.8 94.3Q890.0 95.3 890.0 126.3L890.0 126.3Q890.0 157.2 888.9 159.7L888.9 159.7Q797.8 160.0 795.6 159.5L795.6 159.5Q794.8 157.5 794.6 126.4L794.6 126.4Q794.5 95.3 793.8 94.3L793.8 94.3Q793.0 93.3 791.2 93.0L791.2 93.0Q789.5 92.6 784.9 92.7L784.9 92.7Q780.2 92.8 778.1 93.5L778.1 93.5ZM535.0 93.6Q533.3 97.8 533.4 175.1L533.4 175.1Q533.5 252.5 533.9 253.9L533.9 253.9Q534.3 255.2 535.1 255.9L535.1 255.9Q536.0 256.6 541.0 256.9L541.0 256.9Q546.0 257.2 550.5 256.1L550.5 256.1Q551.9 252.5 552.0 175.1L552.0 175.1Q552.0 97.8 551.7 96.4L551.7 96.4Q551.4 95.0 550.4 94.1L550.4 94.1Q549.5 93.3 544.4 92.9L544.4 92.9Q539.2 92.5 535.0 93.6L535.0 93.6ZM353.8 93.7Q352.5 97.0 352.5 174.6L352.5 174.6Q352.5 252.2 353.4 255.7L353.4 255.7Q356.0 256.9 360.8 257.0L360.8 257.0Q365.5 257.1 367.2 256.7L367.2 256.7Q369.0 256.4 369.8 255.3L369.8 255.3Q370.6 254.2 370.7 220.5L370.7 220.5Q370.8 186.8 371.4 184.4L371.4 184.4Q373.8 183.8 420.5 184.1L420.5 184.1Q422.3 185.8 446.7 220.6L446.7 220.6Q471.1 255.4 473.4 256.3L473.4 256.3Q475.8 257.2 481.1 257.3L481.1 257.3Q486.5 257.5 489.9 256.5L489.9 256.5Q490.7 254.5 490.3 253.1L490.3 253.1Q489.8 251.8 442.5 183.0L442.5 183.0L443.5 181.2Q449.5 179.5 452.9 177.9L452.9 177.9Q456.2 176.2 460.9 172.9L460.9 172.9Q465.5 169.5 468.6 165.4L468.6 165.4Q471.8 161.2 474.1 156.0L474.1 156.0Q476.4 150.8 477.1 146.4L477.1 146.4Q477.7 142.0 477.7 137.1L477.7 137.1Q477.7 132.2 477.2 128.9L477.2 128.9Q476.6 125.5 475.0 121.2L475.0 121.2Q473.3 117.0 470.7 113.0L470.7 113.0Q468.1 109.0 464.7 105.8L464.7 105.8Q461.2 102.6 458.0 100.6L458.0 100.6Q454.8 98.6 452.0 97.4L452.0 97.4Q449.2 96.1 443.9 94.6L443.9 94.6Q438.5 93.1 398.6 92.8L398.6 92.8Q358.8 92.5 353.8 93.7L353.8 93.7ZM1395.7 226.5Q1394.0 225.8 1392.9 226.0L1392.9 226.0Q1391.8 226.2 1388.4 228.6L1388.4 228.6Q1385.0 231.0 1380.5 233.5L1380.5 233.5Q1376.0 235.9 1368.5 238.4L1368.5 238.4Q1361.0 240.9 1357.4 241.4L1357.4 241.4Q1353.8 242.0 1344.8 242.0L1344.8 242.0Q1335.8 242.0 1329.2 240.4L1329.2 240.4Q1322.8 238.8 1317.5 236.4L1317.5 236.4Q1312.2 234.0 1308.8 231.7L1308.8 231.7Q1305.2 229.4 1299.9 224.2L1299.9 224.2Q1294.5 219.0 1290.6 212.6L1290.6 212.6Q1286.7 206.2 1284.3 200.0L1284.3 200.0Q1281.9 193.8 1280.8 187.4L1280.8 187.4Q1279.8 181.0 1279.8 175.6L1279.8 175.6Q1279.8 170.2 1280.8 163.2L1280.8 163.2Q1281.8 156.2 1283.0 152.8L1283.0 152.8Q1284.1 149.2 1286.6 144.0L1286.6 144.0Q1289.1 138.8 1291.7 135.0L1291.7 135.0Q1294.2 131.2 1298.6 126.8L1298.6 126.8Q1303.0 122.3 1305.2 120.6L1305.2 120.6Q1307.5 118.8 1312.5 116.0L1312.5 116.0Q1317.5 113.2 1324.1 111.1L1324.1 111.1Q1330.8 109.0 1334.8 108.4L1334.8 108.4Q1338.8 107.8 1344.9 107.8L1344.9 107.8Q1351.0 107.8 1355.1 108.3L1355.1 108.3Q1359.2 108.9 1363.8 110.0L1363.8 110.0Q1368.2 111.1 1378.5 116.0L1378.5 116.0Q1388.8 120.9 1391.0 121.1L1391.0 121.1L1392.5 119.7Q1392.7 107.0 1392.3 105.5L1392.3 105.5Q1391.9 104.0 1390.4 102.6L1390.4 102.6Q1389.0 101.2 1383.9 98.7L1383.9 98.7Q1378.8 96.1 1370.6 93.6L1370.6 93.6Q1362.5 91.2 1358.2 90.6L1358.2 90.6Q1354.0 90.1 1344.9 90.0L1344.9 90.0Q1335.8 90.0 1331.5 90.6L1331.5 90.6Q1327.2 91.1 1319.9 93.4L1319.9 93.4Q1312.5 95.7 1307.4 98.2L1307.4 98.2Q1302.2 100.7 1298.6 103.2L1298.6 103.2Q1295.0 105.6 1289.2 110.7L1289.2 110.7Q1283.5 115.8 1278.1 123.1L1278.1 123.1Q1272.8 130.5 1269.6 137.1L1269.6 137.1Q1266.5 143.8 1264.3 152.1L1264.3 152.1Q1262.1 160.5 1261.5 165.2L1261.5 165.2Q1261.0 170.0 1261.0 175.4L1261.0 175.4Q1261.0 180.8 1262.6 190.1L1262.6 190.1Q1264.2 199.5 1267.0 206.6L1267.0 206.6Q1269.7 213.8 1273.9 220.5L1273.9 220.5Q1278.0 227.2 1284.1 233.9L1284.1 233.9Q1290.2 240.5 1296.2 244.8L1296.2 244.8Q1302.2 249.0 1310.6 252.7L1310.6 252.7Q1319.0 256.5 1327.2 258.1L1327.2 258.1Q1335.5 259.7 1344.5 259.7L1344.5 259.7Q1353.5 259.7 1362.6 258.1L1362.6 258.1Q1371.8 256.5 1378.1 253.9L1378.1 253.9Q1384.5 251.3 1388.4 248.9L1388.4 248.9Q1392.2 246.6 1393.8 245.2L1393.8 245.2Q1395.4 243.8 1396.1 242.0L1396.1 242.0Q1396.7 240.2 1396.7 234.5L1396.7 234.5Q1396.7 228.8 1395.7 226.5L1395.7 226.5ZM734.4 226.6Q732.8 225.8 731.6 226.0L731.6 226.0Q730.5 226.2 726.9 228.8L726.9 228.8Q723.2 231.5 718.1 234.1L718.1 234.1Q713.0 236.7 708.5 238.2L708.5 238.2Q704.0 239.8 698.9 240.8L698.9 240.8Q693.8 241.9 684.5 241.9L684.5 241.9Q675.2 241.9 668.1 240.3L668.1 240.3Q661.0 238.7 653.8 234.9L653.8 234.9Q646.5 231.1 642.7 228.1L642.7 228.1Q638.8 225.1 636.4 222.4L636.4 222.4Q633.9 219.8 631.0 215.6L631.0 215.6Q628.1 211.5 626.1 207.5L626.1 207.5Q624.1 203.5 622.5 199.2L622.5 199.2Q621.0 195.0 619.9 190.6L619.9 190.6Q618.9 186.2 618.9 175.8L618.9 175.8Q618.8 165.2 619.9 160.2L619.9 160.2Q621.0 155.2 622.5 150.9L622.5 150.9Q624.0 146.5 626.4 141.9L626.4 141.9Q628.8 137.2 630.9 134.2L630.9 134.2Q633.1 131.2 637.5 126.7L637.5 126.7Q642.0 122.1 645.6 119.5L645.6 119.5Q649.2 116.9 655.2 114.0L655.2 114.0Q661.2 111.1 665.5 110.0L665.5 110.0Q669.8 108.9 673.5 108.4L673.5 108.4Q677.2 107.8 683.5 107.8L683.5 107.8Q689.8 107.8 694.0 108.3L694.0 108.3Q698.2 108.9 702.8 110.1L702.8 110.1Q707.2 111.3 713.1 113.8L713.1 113.8Q719.0 116.2 723.5 118.7L723.5 118.7Q728.0 121.2 730.0 121.0L730.0 121.0Q731.5 119.2 731.6 113.1L731.6 113.1Q731.7 107.0 731.3 105.6L731.3 105.6Q730.9 104.3 729.1 102.7L729.1 102.7Q727.2 101.1 722.5 98.6L722.5 98.6Q717.8 96.1 709.6 93.7L709.6 93.7Q701.5 91.2 697.4 90.6L697.4 90.6Q693.2 90.1 684.4 90.0L684.4 90.0Q675.5 90.0 670.8 90.6L670.8 90.6Q666.0 91.2 658.1 93.7L658.1 93.7Q650.2 96.2 646.0 98.3L646.0 98.3Q641.8 100.3 638.5 102.4L638.5 102.4Q635.2 104.5 631.9 107.2L631.9 107.2Q628.5 109.8 624.8 113.5L624.8 113.5Q621.0 117.2 617.0 122.5L617.0 122.5Q613.0 127.8 609.2 135.2L609.2 135.2Q605.5 142.8 603.3 150.8L603.3 150.8Q601.1 158.8 600.6 162.8L600.6 162.8Q600.0 166.8 600.0 174.1L600.0 174.1Q600.0 181.5 600.6 186.6L600.6 186.6Q601.1 191.8 603.8 200.4L603.8 200.4Q606.4 209.0 609.0 214.2L609.0 214.2Q611.6 219.5 614.1 223.4L614.1 223.4Q616.5 227.2 622.3 233.4L622.3 233.4Q628.0 239.5 632.8 243.1L632.8 243.1Q637.5 246.7 644.0 250.2L644.0 250.2Q650.5 253.7 658.5 256.2L658.5 256.2Q666.5 258.6 671.1 259.2L671.1 259.2Q675.8 259.7 683.6 259.7L683.6 259.7Q691.5 259.8 696.6 259.2L696.6 259.2Q701.8 258.6 706.0 257.5L706.0 257.5Q710.2 256.5 714.5 254.9L714.5 254.9Q718.8 253.3 725.9 249.1L725.9 249.1Q733.0 245.0 734.0 243.0L734.0 243.0Q735.0 241.0 735.1 234.9L735.1 234.9Q735.2 228.8 734.4 226.6L734.4 226.6ZM150.4 123.0Q130.4 149.8 128.3 152.0L128.3 152.0Q126.2 154.2 123.8 155.4L123.8 155.4Q119.5 153.3 115.8 152.2L115.8 152.2Q112.0 151.2 105.2 150.1L105.2 150.1Q98.5 149.0 90.0 149.0L90.0 149.0Q81.5 149.0 74.4 150.1L74.4 150.1Q67.2 151.1 59.0 154.7L59.0 154.7Q50.8 158.3 47.5 159.9L47.5 159.9Q44.2 161.6 40.2 164.4L40.2 164.4Q36.2 167.1 29.6 173.6L29.6 173.6Q23.0 180.0 18.4 187.0L18.4 187.0Q13.7 194.0 11.4 198.9L11.4 198.9Q9.0 203.8 6.0 214.0L6.0 214.0Q3.1 224.2 3.0 235.8L3.0 235.8Q3.0 247.2 5.7 257.2L5.7 257.2Q8.4 267.2 10.9 272.2L10.9 272.2Q13.3 277.2 16.0 281.6L16.0 281.6Q18.7 286.0 22.1 290.5L22.1 290.5Q25.5 295.0 30.2 299.3L30.2 299.3Q34.8 303.7 42.5 308.7L42.5 308.7Q50.2 313.7 56.8 316.6L56.8 316.6Q63.2 319.5 73.1 321.5L73.1 321.5Q83.0 323.4 91.2 323.3L91.2 323.3Q99.5 323.1 108.8 321.3L108.8 321.3Q118.0 319.5 124.0 316.2L124.0 316.2Q126.9 317.5 150.5 348.5L150.5 348.5Q149.8 351.0 147.0 355.8L147.0 355.8Q144.1 360.5 142.2 365.1L142.2 365.1Q140.2 369.8 138.7 376.1L138.7 376.1Q137.1 382.5 136.8 387.5L136.8 387.5Q136.5 392.5 136.8 398.2L136.8 398.2Q137.1 404.0 138.2 409.0L138.2 409.0Q139.2 414.0 140.9 418.5L140.9 418.5Q142.6 423.0 144.9 427.5L144.9 427.5Q147.2 432.0 150.1 436.0L150.1 436.0Q153.0 440.0 156.6 444.1L156.6 444.1Q160.3 448.2 164.5 451.5L164.5 451.5Q168.8 454.9 172.9 457.5L172.9 457.5Q177.0 460.0 183.8 462.8L183.8 462.8Q190.5 465.6 195.4 466.6L195.4 466.6Q200.2 467.7 206.5 468.1L206.5 468.1Q212.8 468.5 218.2 468.1L218.2 468.1Q223.8 467.6 228.4 466.6L228.4 466.6Q233.0 465.5 239.5 462.9L239.5 462.9Q246.0 460.3 251.4 456.8L251.4 456.8Q256.8 453.3 262.7 447.8L262.7 447.8Q268.6 442.2 273.0 436.0L273.0 436.0Q277.5 429.8 281.0 421.1L281.0 421.1Q284.5 412.5 285.6 406.8L285.6 406.8Q286.7 401.0 286.9 396.9L286.9 396.9Q287.2 392.8 286.4 386.1L286.4 386.1Q285.6 379.5 283.9 373.2L283.9 373.2Q282.1 367.0 278.5 359.9L278.5 359.9Q274.8 352.8 272.6 349.5L272.6 349.5Q270.3 346.2 268.0 343.8L268.0 343.8Q265.7 341.2 260.2 336.5L260.2 336.5Q254.8 331.8 249.5 328.7L249.5 328.7Q244.2 325.6 237.0 322.9L237.0 322.9Q229.8 320.2 224.1 319.2L224.1 319.2Q218.5 318.1 209.6 318.6L209.6 318.6Q200.8 319.1 197.1 319.7L197.1 319.7Q193.5 320.3 189.8 321.6L189.8 321.6Q186.0 322.8 183.0 322.8L183.0 322.8Q161.0 295.2 160.3 293.9L160.3 293.9Q159.6 292.5 159.7 291.2L159.7 291.2Q159.9 290.0 161.1 287.4L161.1 287.4Q162.3 284.8 166.3 278.4L166.3 278.4Q170.3 272.0 172.9 264.8L172.9 264.8Q175.5 257.5 176.1 254.9L176.1 254.9Q176.7 252.2 177.0 241.4L177.0 241.4Q177.3 230.5 177.0 224.0L177.0 224.0Q176.7 217.5 175.8 214.4L175.8 214.4Q174.8 211.2 173.0 206.8L173.0 206.8Q171.2 202.2 165.3 192.4L165.3 192.4Q159.3 182.5 158.9 180.5L158.9 180.5Q167.2 168.0 183.0 148.7L183.0 148.7Q185.2 148.7 192.6 150.7L192.6 150.7Q200.0 152.7 211.5 152.7L211.5 152.7Q223.0 152.6 227.8 151.6L227.8 151.6Q232.5 150.5 238.9 147.9L238.9 147.9Q245.2 145.3 252.0 140.7L252.0 140.7Q258.8 136.2 265.0 129.9L265.0 129.9Q271.2 123.5 275.8 115.6L275.8 115.6Q280.4 107.8 282.5 101.8L282.5 101.8Q284.6 95.8 285.7 88.8L285.7 88.8Q286.7 81.8 286.7 78.2L286.7 78.2Q286.7 74.8 285.7 67.8L285.7 67.8Q284.7 60.8 282.3 54.0L282.3 54.0Q279.9 47.2 276.1 40.8L276.1 40.8Q272.3 34.2 267.4 28.7L267.4 28.7Q262.5 23.1 257.5 19.2L257.5 19.2Q252.5 15.3 245.6 11.7L245.6 11.7Q238.8 8.1 234.5 6.6L234.5 6.6Q230.2 5.2 224.8 4.2L224.8 4.2Q219.2 3.1 212.5 3.1L212.5 3.1Q205.8 3.0 198.9 4.2L198.9 4.2Q192.0 5.3 185.4 7.9L185.4 7.9Q178.8 10.5 174.4 13.0L174.4 13.0Q170.0 15.6 165.9 18.6L165.9 18.6Q161.8 21.7 159.4 24.0L159.4 24.0Q157.1 26.2 153.6 30.4L153.6 30.4Q150.2 34.5 147.6 38.9L147.6 38.9Q144.9 43.2 142.3 49.1L142.3 49.1Q139.7 55.0 138.5 59.8L138.5 59.8Q137.2 64.5 136.6 69.1L136.6 69.1Q136.1 73.8 136.6 82.4L136.6 82.4Q137.1 91.0 138.6 96.6L138.6 96.6Q140.1 102.2 141.6 106.0L141.6 106.0Q143.2 109.8 150.4 123.0L150.4 123.0ZM61.2 155.7Q54.5 158.4 46.4 163.3Q38.3 168.2 34.8 171.2Q31.2 174.3 28.0 177.8Q24.7 181.3 20.1 188.1Q15.5 195.0 12.8 200.2Q10.2 205.5 7.6 215.4Q5.1 225.2 5.0 236.6Q5.0 248.0 6.7 254.4Q8.4 260.8 11.8 268.8Q15.2 276.8 17.7 280.8Q20.2 284.8 23.5 288.9Q26.8 293.0 31.5 297.5Q36.3 302.1 44.0 307.2Q51.8 312.3 57.6 314.9Q63.5 317.5 71.9 319.1Q80.2 320.7 90.4 320.7Q100.5 320.7 108.9 319.1Q117.2 317.5 119.8 316.0Q122.2 314.6 126.4 313.4Q130.5 312.1 134.6 309.5Q138.7 306.9 144.6 302.1Q150.5 297.4 154.7 292.3Q158.9 287.2 163.4 279.6Q167.9 272.0 171.2 262.4Q174.5 252.8 174.9 248.6Q175.2 244.5 175.3 236.4Q175.4 228.2 175.0 224.4Q174.5 220.5 173.0 214.6Q171.5 208.8 167.9 201.4Q164.4 194.0 159.8 186.9Q155.2 179.8 148.5 173.5Q141.8 167.3 134.2 162.7Q126.8 158.1 119.4 155.7Q112.0 153.2 104.9 152.1Q97.8 151.1 90.0 151.0Q82.2 151.0 75.1 152.1Q68.0 153.1 61.2 155.7Z"],"Hilti":[1600,377,"M1384.3 90.1Q1487.2 89.8 1490.6 91.3L1490.6 91.3Q1491.0 282.8 1489.5 286.3L1489.5 286.3Q1386.5 286.7 1383.1 285.0L1383.1 285.0Q1382.8 93.8 1384.3 90.1L1384.3 90.1ZM909.8 91.8L911.0 90.1L1357.0 89.9L1359.0 93.0L1358.9 179.0L1355.8 181.0L1189.1 181.2Q1188.0 183.5 1188.0 233.4L1188.0 233.4Q1188.0 283.2 1187.1 286.1L1187.1 286.1L1082.8 286.7L1080.8 283.5L1080.3 181.7L911.0 180.7Q909.8 177.8 909.8 91.8L909.8 91.8ZM664.1 91.0Q667.0 89.8 770.3 90.4L770.3 90.4Q771.0 193.2 772.3 195.6L772.3 195.6L993.9 196.1Q995.0 198.8 994.6 285.7L994.6 285.7Q991.5 286.8 665.0 286.4L665.0 286.4Q663.8 283.0 664.1 91.0L664.1 91.0ZM533.0 90.2Q636.0 89.8 638.7 90.8L638.7 90.8Q639.0 283.2 637.9 286.4L637.9 286.4Q535.2 286.7 532.1 285.2L532.1 285.2Q531.8 93.5 533.0 90.2L533.0 90.2ZM107.0 91.0Q109.8 89.8 212.5 90.0L212.5 90.0Q214.0 92.8 214.0 139.7L214.0 139.7L215.5 141.7L399.9 141.4Q400.7 139.7 400.7 116.1L400.7 116.1Q400.8 92.5 402.0 90.0L402.0 90.0L506.5 90.1Q508.0 93.5 507.6 285.2L507.6 285.2Q504.5 286.7 402.0 286.5L402.0 286.5Q400.8 284.0 400.7 237.3L400.7 237.3L399.2 235.1L214.8 235.3Q214.0 237.0 214.0 260.4L214.0 260.4Q214.0 283.8 212.5 286.4L212.5 286.4L108.0 286.5Q106.8 283.2 107.0 91.0L107.0 91.0ZM0.1 0.8Q0.0 374.5 0.8 376.7L0.8 376.7Q1595.5 376.8 1597.7 375.9L1597.7 375.9Q1597.8 2.2 1596.9 0.1L1596.9 0.1Q2.2 0.0 0.1 0.8L0.1 0.8Z"]};
  var st = document.createElement('style'); st.textContent = '.drawer-brand-ico { flex: none; display: block; overflow: visible;  } /* v111: blue glow removed (Dave) */ .drawer-brand-tile { flex: none; display: inline-flex; align-items: center; justify-content: center; width: 92px; height: 30px; border-radius: 9px; background: #F3F4F6; border: 1px solid #E5E7EB; box-shadow: 0 1px 2px rgba(15,23,32,.06); transition: transform .15s ease, background .15s ease; } .drawer-item:active .drawer-brand-tile { transform: scale(.94); background: #E5E7EB; } /* v112: app-icon tiles, same gray as the count chips */'; document.head.appendChild(st);
  function svg(k) { var W = P[k][0], H = P[k][1], w = Math.min(80, 17 * W / H), h = w * H / W;
    return '<span class="drawer-brand-tile"><svg class="drawer-brand-ico" width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true"><path d="' + P[k][2] + '" fill="none" stroke="#0F1720" stroke-width="0.8" vector-effect="non-scaling-stroke" stroke-linejoin="round" shape-rendering="geometricPrecision"/></svg></span>'; }
  function run() {
    var dr = document.getElementById('drawer'); if (!dr) return false;
    dr.querySelectorAll('[data-drawer-supplier] > img, [data-drawer-labels] > img').forEach(function (im) {
      var b = im.parentNode, k = b.getAttribute('data-drawer-supplier') || b.getAttribute('data-drawer-labels');
      if (P[k]) { im.insertAdjacentHTML('beforebegin', svg(k)); im.remove(); }
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
