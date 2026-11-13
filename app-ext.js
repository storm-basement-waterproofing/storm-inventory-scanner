/* v217 (Hark, 2026-11-13, Dave): the phone's Pull List tick cache is kept per server job (jb:<Jobber job id>, else the c: customer key, the same
   key as the Pull list's line cache), so a repeat customer's next job starts with no ticks. Needs app v206.
   v216 (Hark, 2026-11-13, Dave 07:28 "uncheck the green boxes it still says completed"): a Completed job's Loaded boxes are locked (greyed, a tap only
   shows a toast, nothing is sent), and a poll that left before a tap can no longer undo that tap on screen (block v214 at the end). Needs app v205.
   v215 (Hark, 2026-11-13, Dave): Ready to load on truck patched in place (no flash), photos with placeholder + fade, cached list, open straight on a job (block v214 at the end). Needs app v203.
   v214 (Hark, 2026-11-12, Dave): side menu "Staged jobs" + Loaded on truck boxes (block at the end of this file). Needs app v190 (getStagedJobs). */
/* v213 (Hark, 2026-11-12, Dave): search magnifier + camera button sit inside the search bar (block at the end of this file). */
/* v212 (Hark, 2026-11-12, Dave): Staged banner - green check only at 100% staged, otherwise a % ring coloured red -> yellow -> green (block at the end of this file). */
/* v211 (Hark, 2026-11-12, Dave): Stocked to par ring - "STOCKED" label under the % and red -> yellow -> green colour by the % (block at the end of this file). */
/* v210 (Hark, 2026-11-12 15:20, Dave): CREW VIEW SIMPLE. Only Dave and his 2 managers (Manager Login) see Inventory and Needs Ordering.
   Crew (html.storm-crew = no manager login): the top switch shows only "Staging Job", highlighted, with no Inventory half and no tap-to-switch.
   Needs Ordering is hidden. Side menu for crew: Home, Customer Search, Staging, Box Truck Check, Tool Checklist, CATEGORIES, Products by supplier,
   Resource Center (without Bin Labels), Manager Login. Hidden for crew: the Stocked to par card, Bin Labels, Receiving Orders, Quote Templates,
   old Checklists section. Hidden for everyone: the grey "Soon" rows (Truck Check, Restock, Job Wrap-up, Crew Day).
   CSS only. Nothing removed from the code, so a manager login shows the full menu again. */
(function () {
  if (document.getElementById('storm-v210-css')) return;
  var st = document.createElement('style'); st.id = 'storm-v210-css';
  var C = 'html.storm-crew body ';
  st.textContent = ''
    + '#cl-menu .cl-row.cl-soon { display: none !important; }'
    + C + '#mode-switch .cl-seg-inv { display: none !important; }'
    + C + '#mode-switch { pointer-events: none !important; }'
    + C + '#mode-switch .cl-seg-job { flex: 1 1 auto !important; width: 100% !important; background: #29A8E0 !important; color: #fff !important; border-radius: 999px !important; text-align: center !important; }'
    + C + '#tab-need, ' + C + '#need-badge { display: none !important; }'
    + C + '#cl-menu .cl-par, ' + C + '#cl-menu [data-ro199], ' + C + '#drawer-labels, ' + C + '#drawer-qt, ' + C + '#drawer-checklists { display: none !important; }';
  (document.head || document.documentElement).appendChild(st);
})();
/* v209 (Hark, 2026-11-12, Dave 11:27): Receiving Orders Scanned rows - tapping -/+, the number (number pad) or x no longer opens the camera. The rows carry data-r-scan like the Scan button, and the Scan check matched them first; it now only matches the Scan button. Pairs with app v168. */
/* v208 (Hark, 2026-11-12, Dave): Receiving Orders - a "Scanned" section pinned at the top: every bin scanned with the camera in Receiving lands there (on order or not, e.g. PVC fittings), +1 per scan, -/+ and number pad still work, moved up out of its supplier group (no duplicates). Its own "Add N to bins" button adds only the Scanned counts (same confirm sheet, manager gate, save queue, retry/offline, receipt log, Received check) and clears those rows. Bottom bar relabeled "Add counted items to On hand (N)" (same behavior: only rows with a count above 0). Receiving opens the scanner with &recv=1; the order cart is never touched. See the v208 notes in the v201 block. Pairs with app v167. */
/* v207 (Hark, 2026-11-11, Dave 21:02-21:03, batch G): How to Use the App rewritten for the app as it is now, and the animation at its top replaced by a real screen recording of the current app (assets/howto/how-to-use.mp4, muted, loops while the guide is open, tap to pause, jump-to chips). Guide in the app's look (Montserrat, #EAF0F7, 14px cards). See the v207 block at the end. Pairs with app v159. */
/* v206 (Hark, 2026-11-11, Dave approved 22:55, batch T2): Truck Check part 2 - side menu rows Box Truck Check + Tool Checklist under Receiving Orders; big Save & Submit at the bottom of each form (fieldId __submitted in the Truck Check tab, banner Submitted by NAME . time, Update submission); Past checks list (read-only getTruckCheckHistory) opening a read-only copy. See the v206 block at the end. Pairs with app v158. */
/* v205 (Hark, 2026-11-11, Dave batch H): forgiving search - typos, slang and sizes find the item; ranked best match first (flat list while searching), "Closest matches" when nothing matches; Receiving Orders add-by-search ranked the same way. See the v205 block at the end. Pairs with app v157. */
/* v204 (Hark, 2026-11-11, Dave 21:15): Insurance Certificates > Email opens a Jobber customer search (all clients incl. quotes/leads, read-only searchJobberClients) or "Skip, continue to email"; new body with a Customer information section. Pairs with app v156. */
/* v203 (Hark, 2026-11-11 21:23-21:48, Dave): Truck Check: the Box Truck Pre Check and Tool Checklist rows open fillable phone forms that save to the "Truck Check" tab (anyone can fill them in; live across phones); "View / print paper copy" keeps the PDFs. Item details swipe: photo box no longer shrinks after the slide. See the v203 block at the end. */
/* v202 (Hark, 2026-11-11 20:50-21:02, Dave batch F): supplier logos in a clear strip above the product photo; manager login switches in place (no flash/jump); Staging opens only Find a Job; side-menu Customer Search row removed; nothing peeks from the closed Categories list; no blue tap highlight; faster checklist pages; Media tiles float in; Insurance Certificates + Logos manager-only; equal-height item cards; supplier logo in the Supplier tile; photos fade in once loaded; menu button morphs to an X. See the v202 block at the end. */
/* v201 (Hark, 2026-11-11, Dave asked 19:01): Receiving Orders screen - items on order (need > 0, same rule as Needs Ordering) grouped by supplier, received counter per row (big -/+ with hold-repeat, tap for number pad, Got all, Receive all per supplier), Add item search + Scan for extras (cart never touched), confirm summary -> new on hand = current + received via updateCount (manager-only, unchanged), Received check, local receiving log (Recent receipts). Replaces the v199 placeholder and hides the Restock Soon row. See the v201 block at the end. */
/* v200 (Hark, 2026-11-11, Dave asked 18:58): quick count sheet - KEEP ON HAND and ON HAND side by side (big -/+ with hold-repeat, tap a number for a number pad, live Need + OK/LOW/OUT), one Save sends only what changed via updatePar / updateCount; replaces the v181 On hand sheet; opens from the card On hand pill, the card Keep on hand button, and Item details (Edit keep on hand | Edit on hand). Manager-only like the server; never touches the order. See the v200 block at the end. */
/* v199 (Hark, 2026-11-11, Dave fix list 10, 11, 14-tab, 15): Find a Job search field gets a one-tap clear X; Customer Search gets an X by the customer name that clears the retained customer in place (cart kept, Find a Job not reopened); side menu "Receiving Orders" row under Staging (restock icon, placeholder screen); Staging icon is a flat utility cart loaded with boxes. Pairs with app v151 (manager-only Delete job in Find a Job, search alias for SKU 100348474). See the v199 block at the end. */
/* v198 (Hark, 2026-11-11, Dave fix list 7-9): swipe left / right in Item details = next / previous item in the on-screen list order (drag + carousel slide; taps and vertical scrolls never swipe; touch + pointer); full STORM logo with blue BASEMENT WATERPROOFING in Item details and the side menu; supplier logo (transparent, no box) in the top-right of the item photo on cards and in Item details. See the v198 block at the end. */
/* v197 (Hark, 2026-11-11 19:20, Dave fix list 1-6): main-screen Category dropdown hidden (side menu keeps Categories); Stocked-to-par card + supplier chips ride in the top bar and come back on scroll up; iPad toolbar at normal size in one row; smooth mode switch; rings update in place (no flash on Add to Order / saves); Keep on hand save patches the card in place. See the v197 block at the end. */
/* v196 (Hark, 2026-11-11 15:10, Dave approved): pairs with app v148. "Pull List" reads "Customer Search" (printout: "Staging List"), top switch "Staging Job | Inventory". Checks only track the staging cart (shared + offline queue, no stock change). Big "Staged Job Complete" button at the bottom of Customer Search -> confirm sheet -> completeStaging; staged banner, checks locked, unchecked lines flagged Not staged; manager-only Unstage. How to Use guide + explainer rewritten for the new flow. See the v196 block at the end. */
/* v195 (Hark, 2026-11-11 12:35, Dave): pairs with app v147. Customer Search always in the + dock (crew + manager, first open); guide Next lands exactly on the next chapter; printed Pull List / Print Preview carry the main-screen STORM logo centered (app side); Pull List progress ring follows you as a slim bar while you scroll; Categories are a closed dropdown on the main screen and a collapsed section in the side menu. See the v195 block at the end. */
/* v194 (Hark, 2026-11-11 11:28, Dave): pairs with app v146 (Manager Login in place: no reload, video or picker). Side menu bottom rows spaced out (Jobber | CompanyCam, then Manager Login and How to Use the App as full rows; safe area from the wrapper); Insurance Certificates pages show the main-screen STORM logo centered at the top; help guide bottom spacing + new app-specific explainer. See the v194 block at the end. */
/* v193 (Hark, 2026-11-11, Dave approved): pairs with app v145 (Crew view by default, manager code). Side menu gets "Manager Login" ("Manager · Log out" once logged in); Resource Center gets Insurance Certificates (Lindsey, Suzanne: contact pages with tap-to-email); cart RichTech button is one "Order on RichTech" (copies the list, opens RichTech sign-in); guide's PIN chapter now explains the crew view and Manager Login. See the v193 block at the end. */
/* v192 (Hark, 2026-11-11, Dave): "How to Use the App" row at the bottom of the side menu opens a full-screen crew guide (numbered chapters, looping phone animation, reduced-motion frames). See the v192 block at the end. */
/* v191 (Hark, 2026-11-11, Dave): dock buttons fold into one spinning "+" (tap to flare out / suck back in; cart count on the +); Pull List "Print Preview" shows the printed sheet on screen; mode toggle reads "Stage Job". See the v191 block at the end. */
/* v190 (Hark, 2026-11-11, Dave): cart $ total pill keeps clear of the button below it (Inventory + Job, phone + iPad; big totals no longer run off the edge); "Quote" label under the quote button; blue "Customer Search" label under the Pull List / Find a Job button. See the v190 block at the end. */
/* v189 (Hark, 2026-11-11, Dave): iPad main list no longer massive (cards ~210px+, 3-5 per row, 4:3 photos, like the Details scale; phones unchanged); cart total pill under the cart button no longer overlaps the version tag; cart line totals wrap instead of being cut off. */
/* v188 (Hark, 2026-11-11, Dave): bottom-right version badge shows the real app version (was stuck at v130); no second tag. */
/* v187 (Hark, 2026-11-11, Dave): version tag in the bottom-right corner of the app (app version · ext version). */
/* v185 (Hark, 2026-11-11, Dave): Pull List keeps the footage line "Job 99 ft · Grab 1 roll (100 ft)" under the item name. */
/* v184 (Hark, 2026-11-11, Dave): footage items (FT_ITEMS: rt-18 sticks, rt-34/35/36/41 rolls) show feet on the Pull List; a check now takes whole sticks/rolls off On hand (ceil(feet / length)), not the feet number. */
function stUnits(bin, n) { n = Number(n) || 0; if (!n) return ''; try { var F = window.FT_ITEMS; if (F && F[bin] && F[bin].len) return Math.ceil(n / F[bin].len); } catch (e) {} return n; }
/* v183 (Hark, 2026-11-11): crew PIN rides on every Pull List check (setStagingCheck), incl. offline-queued taps; pairs with app v135. */
/* v181 (Hark, 2026-11-11): separate "On hand" pill on every card + bottom sheet (Inventory mode); edits On hand only, never the order. See the v181 block at the end. */
/* v182 (Hark, 2026-11-11): Staging in the side menu is live (opens Find a Job in the Pull List); Pull List checks take stock off On hand on the server.
   v180 (Hark, 2026-11-10): crew-phone sync - shared Pull List checks (Staging tab) and 2 s live updates; see the v180 notes in the v167 block and at the end. */
/* v175 (Hark, 2026-11-10, Dave: "lighten up the theme just a little"): every Truck Check navy (bg, cards, borders, header) raised about 4% lightness, e.g. #0E1621 -> #14202F, #152231 -> #1B2C3F, #1F3246 -> #253C54. Same in scan.html. */
/* EDITORS (any Hark chat or AI tool): this file is edited from more than one place. Before every save, download the newest app-ext.js from GitHub main, add your change on top of it, and keep every existing vNNN block. Never save from an older copy. */
/* STORM app extensions v1 (Hark): bin label viewer + print list, Jobber/CompanyCam app launch */
(function () { var st = document.createElement('style'); st.id = 'storm-ext-css'; st.textContent = ".fab-dock { top: auto !important; bottom: calc(46px + env(safe-area-inset-bottom)) !important; right: 14px !important; } .label-tile { position: relative; cursor: pointer; padding: 8px 10px !important; } .label-tile img { display: block; height: 54px; width: auto; max-width: 140px; border-radius: 4px; margin-top: 4px; box-shadow: 0 1px 3px rgba(0,0,0,.15); } .label-add { position: absolute; top: -8px; right: -8px; width: 28px; height: 28px; border-radius: 999px; border: 0; background: var(--blue); color: #fff; font-size: 18px; font-weight: 800; line-height: 28px; padding: 0; box-shadow: 0 2px 6px rgba(0,0,0,.25); } .label-add.in { background: #16a34a; font-size: 14px; } #lbl-view { position: fixed; inset: 0; z-index: 130; background: rgba(15,23,32,.72); display: none; align-items: center; justify-content: center; padding: 16px; } #lbl-view.open { display: flex; } .lbl-view-box { position: relative; background: #fff; border-radius: 14px; padding: 14px; width: 100%; max-width: 640px; } .lbl-view-box img { display: block; width: 100%; height: auto; border-radius: 6px; } .lbl-view-name { font-size: 16px; font-weight: 700; margin: 10px 2px 0; } .lbl-view-add { display: block; width: 100%; margin-top: 12px; min-height: 52px; border: 0; border-radius: 10px; background: var(--blue); color: #fff; font-size: 17px; font-weight: 700; } .lbl-view-add.in { background: #16a34a; } .lbl-view-x { position: absolute; top: -14px; right: -6px; width: 40px; height: 40px; border-radius: 999px; border: 0; background: #16212E; color: #fff; font-size: 24px; line-height: 1; padding: 0; } .lbl-sec { padding: 8px 16px 4px; border-top: 1px solid #E5E7EB; max-height: 34vh; overflow-y: auto; } .lbl-sec-head { display: flex; align-items: center; justify-content: space-between; } .lbl-sec-head h3 { margin: 6px 0; font-size: 16px; } .lbl-sec-clear { border: 0; background: none; color: #6B7280; font-size: 14px; padding: 6px; } .lbl-row { display: flex; align-items: center; gap: 10px; padding: 6px 0; } .lbl-row img { height: 40px; width: auto; border-radius: 3px; box-shadow: 0 1px 2px rgba(0,0,0,.2); } .lbl-row-name { flex: 1; font-size: 14px; font-weight: 600; } .lbl-row-name small { display: block; color: #6B7280; font-weight: 400; } .lbl-row-x { width: 32px; height: 32px; border: 0; border-radius: 8px; background: #F3F4F6; font-size: 20px; padding: 0; } .lbl-print { display: block; width: 100%; margin: 8px 0 6px; min-height: 48px; border: 0; border-radius: 10px; background: var(--dark); color: #fff; font-size: 16px; font-weight: 700; } #lbl-print { display: none; } @media print { body > *:not(#lbl-print) { display: none !important; } #lbl-print { display: block !important; } .lbl-pg-item { padding: 0.5in 0; text-align: center; } .lbl-pg-item img { width: 6.2in; max-width: 100%; height: auto; } .lbl-pg-break { break-after: page; page-break-after: always; } @page { size: letter; margin: 0.3in; } } .drawer-item img + .drawer-item-name { font-size: 0; color: transparent; } .drawer-ccam img { height: 26px; width: auto; max-width: 170px; object-fit: contain; }"; document.head.appendChild(st); })();
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
  var ICO = '<svg class="drawer-chk-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3.5h6v2H9z"/><path d="M8.5 11l2 2 4-4"/><path d="M8.5 17h7"/></svg>';
  function addChecklistSection() {
    var dr = e$('drawer'); if (!dr || e$('drawer-checklists')) return;
    var sec = document.createElement('div'); sec.className = 'drawer-section'; sec.id = 'drawer-checklists';
    var hh = '<button class="drawer-section-head" type="button">Checklists <span class="drawer-chevron">&#9662;</span></button><div class="drawer-items">';
    CHECKLISTS.forEach(function (c) { hh += '<button class="drawer-item" type="button" data-drawer-checklist="' + c.id + '">' + ICO + '<span class="drawer-item-name" style="font-size:16px;color:#172135">' + h(c.name) + '</span></button>'; });
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
    /* v203: Box Truck Pre Check + Tool Checklist open as fillable phone forms (paper copy one tap away) */
    var tc = false; try { tc = !!(window.stormTC203 && window.stormTC203.render(c, v, hh + '</div>')); } catch (x) { tc = false; }
    if (!tc) v.innerHTML = hh + '</div>';
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
  function closeChecklist(fromPop) { closeZoom(); var v = e$('chk-view'); if (!v || !v.classList.contains('open')) return; try { if (window.stormTC203) window.stormTC203.close(); } catch (x) {} v.classList.remove('open'); v.innerHTML = ''; if (!fromPop) { try { history.back(); } catch (x) {} } }

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
    { id: 'color-transparent', name: 'Color \u00b7 transparent', note: 'White STORM text. For dark backgrounds.', bg: '#16212E' },
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
    + '.res-card .res-cap { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; font-size: 16px; font-weight: 600; color: #172135; }'
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
    + '.res-tab.on { background: #fff; color: #172135; box-shadow: 0 1px 3px rgba(0,0,0,.12); }'
    + '.res-sub { font-size: 13px; color: #6B7280; margin: 0 2px 10px; }'
    + '.res-links { background: #fff; border: 1px solid #E5E7EB; border-radius: 12px; overflow: hidden; }'
    + '.res-link { display: flex; align-items: center; gap: 12px; padding: 13px 14px; border-top: 1px solid #F0F1F3; color: #172135; text-decoration: none; font-size: 15px; }'
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

  var IMG_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';
  var MEDIA_ICO = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 10l5-3v10l-5-3"/></svg>';
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
    d.style.cssText = 'position:fixed;left:16px;right:16px;bottom:calc(20px + env(safe-area-inset-bottom));z-index:300;padding:12px 14px;border-radius:12px;background:#16212E;color:#fff;font:600 15px -apple-system,Roboto,sans-serif;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transition:opacity .25s ease';
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
      var SV = '<svg class="drawer-chk-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
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
  var P = {"Hilti":[60.6,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2.5\"/><path d=\"M9 9.5v5M15 9.5v5M9 12h6\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(42.05 7.50) scale(0.75)\" d=\"M0 0V12H6\" stroke-width=\"2.27\"/><path transform=\"translate(50.45 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(59.60 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/>"],"AutoZone":[98.55,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><path d=\"M2.5 17L6 7\"/><path d=\"M6.5 17L10 7\"/><path d=\"M12 7h9l-8.5 10H21\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 12L3.5 0L7 12M1.3 8H5.7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M0 0V8C0 10.2 1.5 12 3.5 12S7 10.2 7 8V0\" stroke-width=\"2.27\"/><path transform=\"translate(47.30 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(56.45 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(65.60 7.50) scale(0.75)\" d=\"M0 0H7L0 12H7\" stroke-width=\"2.27\"/><path transform=\"translate(74.75 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(83.90 7.50) scale(0.75)\" d=\"M0 12V0L7 12V0\" stroke-width=\"2.27\"/><path transform=\"translate(93.05 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/>"],"Home Depot":[112.35,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"rotate(-45 12 12)\"><path transform=\"translate(8.38 4.70) scale(0.25)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"3.00\"/><path transform=\"translate(11.25 4.70) scale(0.25)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"3.00\"/><path transform=\"translate(14.12 4.70) scale(0.25)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"3.00\"/><path transform=\"translate(3.47 9.48) scale(0.42)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.26\"/><path transform=\"translate(8.18 9.48) scale(0.42)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.26\"/><path transform=\"translate(12.88 9.48) scale(0.42)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.26\"/><path transform=\"translate(18.01 9.48) scale(0.42)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.26\"/><path transform=\"translate(5.05 16.18) scale(0.27)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.96\"/><path transform=\"translate(8.15 16.18) scale(0.27)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.96\"/><path transform=\"translate(10.99 16.18) scale(0.27)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.96\"/><path transform=\"translate(13.96 16.18) scale(0.27)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.96\"/><path transform=\"translate(17.06 16.18) scale(0.27)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.96\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(38.15 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(47.30 7.50) scale(0.75)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(57.20 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(70.62 7.50) scale(0.75)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.27\"/><path transform=\"translate(79.78 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(88.18 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.27\"/><path transform=\"translate(96.95 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(106.10 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/>"],"RichTech":[92.62,"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><circle cx=\"7\" cy=\"12\" r=\"3.2\" fill=\"#16212E\"/><circle cx=\"17.3\" cy=\"5.5\" r=\"2.5\"/><circle cx=\"17.3\" cy=\"18.5\" r=\"2.5\"/><path d=\"M9.8 10.4l5.3-3.4\"/><path d=\"M9.8 13.6l5.3 3.4\"/></g><path transform=\"translate(29.00 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0M3.5 6.5L6.8 12\" stroke-width=\"2.27\"/><path transform=\"translate(37.77 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(41.67 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(50.67 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(59.82 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(68.97 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(77.38 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(86.38 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/>"]};
  var st = document.createElement('style'); st.textContent = '.drawer-brand-ico { flex: none; display: block; }'; document.head.appendChild(st);
  function svg(k) { var W = P[k][0], w = (W * 20 / 24).toFixed(1);
    return '<svg class="drawer-brand-ico" width="' + w + '" height="20" viewBox="0 0 ' + W + ' 24" aria-hidden="true"><g fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + P[k][1] + '</g></svg>'; }
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
  var I = {"Hilti":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"2.5\"/><path d=\"M9 9.5v5M15 9.5v5M9 12h6\"/></g>","AutoZone":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><path d=\"M2.5 17L6 7\"/><path d=\"M6.5 17L10 7\"/><path d=\"M12 7h9l-8.5 10H21\"/></g>","Home Depot":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"rotate(-45 12 12)\"><path transform=\"translate(8.38 4.70) scale(0.25)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"3.00\"/><path transform=\"translate(11.25 4.70) scale(0.25)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"3.00\"/><path transform=\"translate(14.12 4.70) scale(0.25)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"3.00\"/><path transform=\"translate(3.47 9.48) scale(0.42)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.26\"/><path transform=\"translate(8.18 9.48) scale(0.42)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.26\"/><path transform=\"translate(12.88 9.48) scale(0.42)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.26\"/><path transform=\"translate(18.01 9.48) scale(0.42)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.26\"/><path transform=\"translate(5.05 16.18) scale(0.27)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.96\"/><path transform=\"translate(8.15 16.18) scale(0.27)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.96\"/><path transform=\"translate(10.99 16.18) scale(0.27)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.96\"/><path transform=\"translate(13.96 16.18) scale(0.27)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.96\"/><path transform=\"translate(17.06 16.18) scale(0.27)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.96\"/></g>","RichTech":"<rect x=\"1.5\" y=\"1.5\" width=\"21\" height=\"21\" rx=\"6\"/><g transform=\"translate(12 12) scale(.62) translate(-12 -12)\" stroke-width=\"3.2\"><circle cx=\"7\" cy=\"12\" r=\"3.2\" fill=\"#16212E\"/><circle cx=\"17.3\" cy=\"5.5\" r=\"2.5\"/><circle cx=\"17.3\" cy=\"18.5\" r=\"2.5\"/><path d=\"M9.8 10.4l5.3-3.4\"/><path d=\"M9.8 13.6l5.3 3.4\"/></g>"}, N = {"Hilti":[32.6,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(14.05 7.50) scale(0.75)\" d=\"M0 0V12H6\" stroke-width=\"2.27\"/><path transform=\"translate(22.45 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(31.60 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/>"],"AutoZone":[70.55,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 12L3.5 0L7 12M1.3 8H5.7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M0 0V8C0 10.2 1.5 12 3.5 12S7 10.2 7 8V0\" stroke-width=\"2.27\"/><path transform=\"translate(19.30 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(28.45 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(37.60 7.50) scale(0.75)\" d=\"M0 0H7L0 12H7\" stroke-width=\"2.27\"/><path transform=\"translate(46.75 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(55.90 7.50) scale(0.75)\" d=\"M0 12V0L7 12V0\" stroke-width=\"2.27\"/><path transform=\"translate(65.05 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/>"],"Home Depot":[84.35,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(10.15 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(19.30 7.50) scale(0.75)\" d=\"M0 12V0L4 7L8 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(29.20 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(42.62 7.50) scale(0.75)\" d=\"M0 0V12H3C5.2 12 7 9.3 7 6S5.2 0 3 0H0Z\" stroke-width=\"2.27\"/><path transform=\"translate(51.77 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(60.17 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0\" stroke-width=\"2.27\"/><path transform=\"translate(68.95 7.50) scale(0.75)\" d=\"M3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12S7 9.3 7 6S5.5 0 3.5 0Z\" stroke-width=\"2.27\"/><path transform=\"translate(78.10 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/>"],"RichTech":[64.62,"<path transform=\"translate(1.00 7.50) scale(0.75)\" d=\"M0 12V0H3.5C5.2 0 6.5 1.4 6.5 3.25S5.2 6.5 3.5 6.5H0M3.5 6.5L6.8 12\" stroke-width=\"2.27\"/><path transform=\"translate(9.77 7.50) scale(0.75)\" d=\"M0 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(13.67 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(22.67 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/><path transform=\"translate(31.82 7.50) scale(0.75)\" d=\"M0 0H7M3.5 0V12\" stroke-width=\"2.27\"/><path transform=\"translate(40.97 7.50) scale(0.75)\" d=\"M6 0H0V12H6M0 6H5\" stroke-width=\"2.27\"/><path transform=\"translate(49.37 7.50) scale(0.75)\" d=\"M6.8 2.4C6 0.9 4.9 0 3.5 0C1.5 0 0 2.7 0 6S1.5 12 3.5 12C4.9 12 6 11.1 6.8 9.6\" stroke-width=\"2.27\"/><path transform=\"translate(58.37 7.50) scale(0.75)\" d=\"M0 0V12M7 0V12M0 6H7\" stroke-width=\"2.27\"/>"]};
  var G = '<g fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
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
  st.textContent = '#drawer .drawer-item .drawer-item-name.v116-name { font-size: 16px !important; font-weight: 400 !important; color: #172135 !important; font-family: inherit !important; display: block; }';
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
    + '#drawer-resources #drawer-labels > .drawer-section-head { padding: 12px 16px 12px 24px; font-size: 16px; font-weight: 400; color: #172135; justify-content: flex-start; gap: 10px; }'
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
    if (head && !head.querySelector('.lbl-ico')) head.insertAdjacentHTML('afterbegin', '<svg class="lbl-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>');
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
    /* v203: the bitmap covers the whole inside of the box (padding included, e.g. the 40 px supplier-logo strip) and the picture is drawn
       inside the padding, exactly where the <img> draws it; before, the content-size bitmap was stretched over the padding too (taller picture
       that then "sucked down" when the cover lifted) */
    var iw = w - n('borderLeftWidth') - n('borderRightWidth'), ih = h - n('borderTopWidth') - n('borderBottomWidth');
    cv.width = Math.round(iw * dpr); cv.height = Math.round(ih * dpr);
    var nw = src.naturalWidth, nh = src.naturalHeight, sx = 0, sy = 0, sw = nw, sh = nh, px = 0, py = 0, vw = nw, vh = nh;
    if (crop && crop.length === 7) { sx = crop[0] * nw; sy = crop[1] * nh; sw = crop[2] * nw; sh = crop[3] * nh; px = crop[4] * nw; py = crop[5] * nh; vw = sw + 2 * px; vh = sh + 2 * py; }
    var fit = cs.objectFit, k;
    if (fit === 'cover') k = Math.max(cw / vw, ch / vh); else if (fit === 'fill') k = 0; else { k = Math.min(cw / vw, ch / vh); if (fit === 'scale-down') k = Math.min(k, 1); }
    var x = cv.getContext('2d'); x.imageSmoothingQuality = 'high'; x.scale(dpr * cv.width / (iw * dpr), dpr * cv.height / (ih * dpr)); x.translate(n('paddingLeft'), n('paddingTop'));
    var ox, oy, kx, ky;
    if (k) { kx = ky = k; ox = (cw - vw * k) / 2; oy = (ch - vh * k) / 2; } else { kx = cw / vw; ky = ch / vh; ox = oy = 0; }
    if (crop && crop.length === 7 && crop[6] !== 't') { x.fillStyle = 'rgb(' + crop[6] + ')'; x.fillRect(ox, oy, vw * kx, vh * ky); }
    x.drawImage(src, sx, sy, sw, sh, ox + px * kx, oy + py * ky, sw * kx, sh * ky);
    cv.setAttribute('data-dr', [n('borderLeftWidth') + n('paddingLeft') + ox + px * kx, n('borderTopWidth') + n('paddingTop') + oy + py * ky, sw * kx, sh * ky].map(function (q) { return Math.round(q * 10) / 10; }).join(',')); /* v203: where the picture sits in the box (checks) */
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
    try { if (typeof window.stormDetailLogo198 === 'function') window.stormDetailLogo198(); } catch (e) {} /* v203: the supplier-logo strip (F1, 40 px) is in place before the first frame is painted */
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
    /* v203: the sharp photo warmed for a swipe (v198 prefetch) is the final picture itself (crop = its own centering), so painting from it
       means no size change when the cover lifts; the list card's copy is framed differently on some items (e.g. hd-08) */
    var hdw = null; try { hdw = window.__stormHd203 && window.__stormHd203[bin]; if (!(hdw && hdw.complete && hdw.naturalWidth)) hdw = null; } catch (e) { hdw = null; }
    try { snap = paint(im, hdw || shown(bin, raw), crop); } catch (e) { snap = null; }
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
   Dark sheet (#14202F) with a blue-to-dark header: STORM logo + X, the customer's name big, the address (and Jobber # when the job
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
    + S + ' { background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #E6EBF1 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(15,23,32,.10) !important; color: #0F1720 !important; height: 88vh; height: 88dvh; max-height: 88dvh; }'
    + S + ' .tc-top { padding: 0 18px 12px; background: transparent; border-radius: 22px 22px 0 0; }'
    + S + ' .tc-grab { width: 42px; height: 5px; border-radius: 3px; margin: 8px auto 0; background: rgba(15,23,32,.14); }'
    + S + ' .pick-sheet-head { padding: 10px 0 0 !important; border: 0 !important; background: transparent !important; }'
    + S + ' .pick-sheet-head h2 { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }'
    + S + ' .tc-logo { display: block; height: 22px; width: auto; }'
    + S + ' .pick-sheet-close { color: #6B7280 !important; font-size: 30px !important; padding: 2px 4px 2px 12px !important; background: transparent !important; border: 0 !important; }'
    + S + ' .tc-name { margin-top: 14px; font-size: 24px; font-weight: 800; line-height: 1.2; color: #0F1720; overflow-wrap: anywhere; }'
    + S + ' .tc-name.tc-none { color: #8A94A3; font-weight: 700; font-size: 20px; }'
    + S + ' .tc-addr { margin-top: 4px; font-size: 13px; line-height: 1.35; color: #6B7280; overflow-wrap: anywhere; }'
    + S + ' .tc-prog { margin-top: 14px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #6B7280; }'
    + S + ' .tc-prog b { color: #1FA3DC; font-weight: 800; }'
    + S + ' .tc-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #E3E8EF; overflow: hidden; }'
    + S + ' .tc-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: #29ABE2; transition: width .25s ease; }'
    + S + ' .tc-sum { margin-top: 6px; font-size: 11.5px; color: #8A94A3; }'
    + S + '.tc-empty .tc-prog, ' + S + '.tc-empty .tc-bar, ' + S + '.tc-empty .tc-sum { display: none; }'
    /* customer fields */
    + S + ' .jc-box { padding: 4px 14px 2px !important; gap: 8px !important; }'
    + S + ' .jc-in { height: 44px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 12px !important; color: #0F1720 !important; }'
    + S + ' .jc-in::placeholder { color: #8A94A3 !important; }'
    + S + ' .jc-in:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; }'
    + S + ' .jc-in.st-need { border-color: #fca5a5 !important; box-shadow: 0 0 0 3px rgba(248,113,113,.3) !important; }'
    + S + ' .jc-find, ' + S + ' .jc-clear { height: 40px !important; border-radius: 12px !important; background: transparent !important; border: 1.5px solid #D5DCE5 !important; color: #0F1720 !important; font-size: 14.5px !important; box-shadow: none !important; }'
    /* lines */
    + S + ' .pick-lines { padding: 2px 14px 10px !important; }'
    + S + ' .pick-line { gap: 12px !important; padding: 12px !important; margin-top: 8px; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; background: #FFFFFF !important; transition: opacity .2s ease; }'
    + S + ' .pick-line img { width: 46px !important; height: 46px !important; flex: 0 0 46px !important; border-radius: 10px !important; background: #fff !important; object-fit: cover; }'
    + S + ' .pick-line-name { font-size: 15px !important; font-weight: 700 !important; line-height: 1.25 !important; color: #0F1720 !important; overflow-wrap: anywhere; }'
    + S + ' .pick-line-code { font-size: 12px !important; margin-top: 3px !important; color: #8A94A3 !important; }'
    + S + ' .tc-ck { flex: 0 0 30px; width: 30px; height: 30px; margin: 0; padding: 0; border-radius: 9px; border: 2px solid #D5DCE5; background: transparent; color: #0F1720; font-size: 17px; font-weight: 900; line-height: 26px; text-align: center; font-family: inherit; -webkit-tap-highlight-color: transparent; position: relative; }'
    + S + ' .tc-ck::after { content: ""; position: absolute; inset: -9px; }' /* bigger tap area */
    + S + ' .pick-line.tc-done { opacity: .55; }'
    + S + ' .pick-line.tc-done .tc-ck { background: #29ABE2; border-color: #29ABE2; }'
    + S + ' .pick-line.tc-done .pick-line-name { text-decoration: line-through; text-decoration-thickness: 2px; }'
    + S + ' .pull-qty { width: auto !important; min-width: 44px !important; min-height: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; align-items: flex-end !important; }'
    + S + ' .pull-qty b { font-size: 22px !important; font-weight: 800 !important; line-height: 1.05 !important; color: #1FA3DC !important; }'
    + S + ' .pull-qty span { margin-top: 2px; font-size: 10px !important; font-weight: 700 !important; letter-spacing: .04em; text-transform: uppercase; color: #8A94A3 !important; }'
    + S + ' .pick-empty { color: #6B7280 !important; }'
    /* footer */
    + S + ' .pick-sheet-foot { position: sticky; bottom: 0; z-index: 2; margin-top: auto; display: flex !important; gap: 10px; padding: 12px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #EEF2F7 !important; border-top: 1px solid #E6EBF1 !important; }'
    + S + ' .pick-sheet-foot > div { display: none !important; }'
    + S + ' .pull-print, ' + S + ' .pull-save { flex: 1 1 0; display: block; width: auto !important; min-height: 54px !important; margin: 0 !important; border-radius: 14px !important; font-family: inherit; box-shadow: none !important; }'
    + S + ' .pull-print { order: 1; background: transparent !important; border: 1.5px solid #D5DCE5 !important; color: #0F1720 !important; font-size: 15px !important; font-weight: 700 !important; }'
    + S + ' .pull-save { order: 2; background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; font-size: 16px !important; font-weight: 800 !important; }'
    + S + ' button:disabled { opacity: .5 !important; }';
  document.head.appendChild(st);

  function norm(v) { return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function cust() { try { return JSON.parse(localStorage.getItem(CUST) || '{}') || {}; } catch (e) { return {}; } }
  function jobKey() { var c = cust(); return 'c:' + norm(c.first) + '|' + norm(c.last) + '|' + norm(c.address); }
  function allChecks() { try { return JSON.parse(localStorage.getItem(CK) || '{}') || {}; } catch (e) { return {}; } }
  function ckey() { return srvKey() || jobKey(); } /* v217: per job, not per customer */
  function checked() { var a = allChecks()[ckey()]; return (a && Array.isArray(a.bins)) ? a.bins : []; }
  function saveChecked(bins, k) {
    var all = allChecks(); k = k || ckey();
    if (bins.length) all[k] = { bins: bins, t: Date.now() }; else delete all[k];
    var keys = Object.keys(all).sort(function (a, b) { return (all[b].t || 0) - (all[a].t || 0); });
    keys.slice(40).forEach(function (x) { delete all[x]; }); /* keep the 40 most recent jobs */
    try { localStorage.setItem(CK, JSON.stringify(all)); } catch (e) {}
  }

  /* v180 (Hark, 2026-11-10, Dave approved 22:47): Pull List checks are shared by every crew phone.
     Each tap is written to the "Staging" tab on the server (setStagingCheck); this phone's localStorage stays as the
     offline cache, and taps made offline wait in a queue (stormStagingQueueV1) that is sent in order when the server
     answers again. Opening the Pull List (or switching job) loads its checks from the server; while it is open the
     live-sync poller (v180 block at the end of this file) reloads them whenever the change stamp moves.
     Server job key: "jb:<Jobber job id>" when the list came from Jobber, otherwise the same per-customer key used
     on this phone ("c:first|last|address"). A list with no customer stays on this phone only. */
  var QK = 'stormStagingQueueV1', DEV = 'stormDeviceNameV1';
  function srvKey() { var c = cust(); if (c.jobberJobId) return 'jb:' + String(c.jobberJobId); var k = jobKey(); return k === 'c:||' ? '' : k; }
  function custLabel() { var c = cust(); return [String(c.first || '').trim(), String(c.last || '').trim()].filter(Boolean).join(' ') + (String(c.address || '').trim() ? ' · ' + String(c.address).trim() : ''); }
  function devName() { try { return String(localStorage.getItem(DEV) || '').slice(0, 60); } catch (e) { return ''; } }
  function getQ() { try { var a = JSON.parse(localStorage.getItem(QK) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function putQ(a) { try { localStorage.setItem(QK, JSON.stringify(a.slice(-500))); } catch (e) {} }
  function hasRun() { try { return !!(window.google && google.script && google.script.run); } catch (e) { return false; } }
  /* v183 (Hark, 2026-11-11): crew PIN. Every send carries this phone's saved crew PIN (window.stormCrewPin, Index.html v135), read at
     send time so taps queued offline go out with the PIN entered later. A PIN_REQUIRED answer keeps the tap queued, opens the PIN
     sheet once, and pauses background resends (poller / 'online') until a PIN is saved or the next tap. */
  var pinWait = false;
  function pinNow() { try { return window.stormCrewPin ? window.stormCrewPin.get() : ''; } catch (e) { return ''; } }
  window.addEventListener('stormpin', function () { pinWait = false; flush(true); });
  function enqueue(op) {
    var q = getQ().filter(function (o) { return !(o.k === op.k && o.bin === op.bin); }); /* newest tap per line wins */
    q.push(op); putQ(q); flush(true);
    try { if (window.stormCrewPin) window.stormCrewPin.offerSet(); } catch (e) {}
  }
  var flushing = false;
  function flush(userTap) {
    if (flushing || !hasRun()) return;
    if (pinWait && userTap !== true) return;
    var q = getQ(); if (!q.length) return;
    var op = q[0]; flushing = true;
    google.script.run
      .withSuccessHandler(function () {
        flushing = false; pinWait = false;
        putQ(getQ().filter(function (o) { return !(o.k === op.k && o.bin === op.bin && o.t === op.t); }));
        flush(true);
      })
      .withFailureHandler(function (err) {
        flushing = false; /* stays queued; retried by the poller, 'online', or the next tap */
        /* v196: the job was staged meanwhile - this tap can never land; drop it and reload the job's marks */
        if (/STAGED_LOCKED/.test(String(err && (err.message || err)))) { putQ(getQ().filter(function (o) { return !(o.k === op.k && o.bin === op.bin && o.t === op.t); })); if (op.k === srvKey()) loadFromServer(); flush(); return; }
        try {
          if (window.stormCrewPin && window.stormCrewPin.isPinErr(err)) {
            pinWait = true;
            window.stormCrewPin.ask(function (ok) { if (ok) { pinWait = false; flush(true); } });
          } else if (window.stormCrewPin && window.stormCrewPin.isLocked(err)) { pinWait = true; try { showToast('Too many wrong PINs — wait 10 minutes', true); } catch (x) {} }
        } catch (e) {}
      })
      .setStagingCheck(op.k, op.cust, op.bin, op.name, op.qty, op.on, op.by, pinNow());
  }
  /* server rows + this phone's unsent taps -> checked bins for this job */
  function mergeServer(k, rows) {
    var on = {};
    (rows || []).forEach(function (r) { if (r && r.itemBin) on[r.itemBin] = !!r.checked; });
    getQ().forEach(function (o) { if (o.k === k) on[o.bin] = !!o.on; });
    return Object.keys(on).filter(function (b) { return on[b]; });
  }
  var loadSeq = 0, loading = false, againAfter = false;
  function loadFromServer() {
    var k = srvKey(); if (!k || !hasRun()) return;
    if (loading) { againAfter = true; return; }
    loading = true; var my = ++loadSeq;
    google.script.run
      .withSuccessHandler(function (res) {
        loading = false;
        if (res && res.jobKey) setStaged(res.jobKey, res.staged || null, res.rows); /* v196 */
        if (my === loadSeq && res && res.jobKey === k && srvKey() === k) {
          var cur = checked(), bins;
          if (!(res.rows && res.rows.length) && cur.length && !getQ().some(function (o) { return o.k === k; })) {
            /* first sync for a job checked before v180: send this phone's checks up instead of clearing them */
            var nmOf = {}, sh0 = sheet();
            if (sh0) sh0.querySelectorAll('.pick-line[data-pull-bin]').forEach(function (ln) { var n = ln.querySelector('.pick-line-name'), b = ln.querySelector('.pull-qty b'); nmOf[ln.getAttribute('data-pull-bin')] = [n ? n.textContent.trim() : '', b ? stUnits(ln.getAttribute('data-pull-bin'), parseInt(b.textContent, 10)) : '']; });
            var q0 = getQ(), now = Date.now();
            cur.forEach(function (b) { var m = nmOf[b] || ['', '']; q0.push({ k: k, cust: custLabel(), bin: b, name: m[0], qty: m[1], on: true, by: devName(), t: now }); });
            putQ(q0); flush(); bins = cur;
          } else bins = mergeServer(k, res.rows);
          if (bins.slice().sort().join('|') !== cur.slice().sort().join('|')) {
            saveChecked(bins);
            var sh = sheet(); if (sh && sh.querySelector('.tc-top')) paintChecks(sh);
          }
        }
        if (againAfter) { againAfter = false; loadFromServer(); }
      })
      .withFailureHandler(function () { loading = false; if (againAfter) { againAfter = false; } /* offline: keep the local copy */ })
      .getStaging(k);
  }
  function pullOpenNow() { var sh = sheet(); return !!(sh && sh.classList.contains('open')); }
  /* v196 (Hark, 2026-11-11, Dave approved): staged state per server job key, from getStaging / completeStaging / unstageJob.
     A staged job's boxes are locked; the v196 block at the end paints the banner, the button and the Not staged flags. */
  var STAGED = {};
  function setStaged(k, st, rows) {
    var prev = JSON.stringify(STAGED[k] || null); STAGED[k] = st ? { at: st.at, by: st.by || '', rows: rows || (STAGED[k] && STAGED[k].rows) || null } : null;
    if (st && rows) { /* the server's marks win on a staged job: drop this phone's unsent taps for it */
      var q = getQ(), q2 = q.filter(function (o) { return o.k !== k; }); if (q2.length !== q.length) putQ(q2);
      if (k === srvKey()) { var on = rows.filter(function (r) { return r.checked; }).map(function (r) { return r.itemBin; }); saveChecked(on, ckey()); var sh = sheet(); if (sh && sh.querySelector('.tc-top')) paintChecks(sh); }
    }
    if (prev !== JSON.stringify(STAGED[k] || null)) { try { window.dispatchEvent(new Event('stormstaged')); } catch (e) {} }
  }
  window.stormStagingApi = {
    key: srvKey, cust: custLabel, dev: devName, checked: checked, flush: flush, reload: loadFromServer, hasRun: hasRun,
    pending: function (k) { return getQ().filter(function (o) { return o.k === k; }).length; },
    staged: function (k) { k = k == null ? srvKey() : k; return k ? (STAGED[k] || null) : null; },
    setStaged: setStaged, units: function (bin, n) { return stUnits(bin, n); }
  };
  window.stormStagingFlush = flush;
  window.stormStagingRefresh = function () { if (pullOpenNow()) loadFromServer(); };
  window.addEventListener('online', function () { flush(); if (pullOpenNow()) loadFromServer(); });
  setTimeout(flush, 1500);
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
    var pr = sh.querySelector('.pull-print'); if (pr && (pr.textContent === 'Print Pull List' || pr.textContent === 'Print Staging List')) pr.textContent = 'Print';
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
      + '<div class="tc-prog"><span>On the staging cart</span><span class="tc-prog-n"></span></div><div class="tc-bar"><i></i></div>'
      + '<div class="tc-sum">' + esc(sum) + '</div>';
    while (x.firstChild) top.appendChild(x.firstChild);
    sh.querySelectorAll('.pick-line[data-pull-bin]').forEach(function (ln) {
      var code = ln.querySelector('.pick-line-code');
      if (code) { var keep = code.textContent.split(' · ').filter(function (s) { return /^Bin /.test(s) || /^\d+ [a-z]+$/i.test(s) || /^(Job|Grab) /.test(s); }); if (keep.length) code.textContent = keep.join(' · '); }
      if (!ln.querySelector('.tc-ck')) { var b = document.createElement('button'); b.type = 'button'; b.className = 'tc-ck'; b.setAttribute('aria-label', 'On the staging cart'); ln.insertBefore(b, ln.firstChild); }
    });
    fixLabels(sh); paintHead(sh); paintChecks(sh);
    var sv = sh.querySelector('.pull-save');
    if (sv && !sv.__tc) { sv.__tc = true; new MutationObserver(function () { fixLabels(sh); }).observe(sv, { childList: true, characterData: true, subtree: true }); }
  }
  function attach() {
    var sh = sheet(); if (!sh || sh.__tc167) return !!sh;
    sh.__tc167 = true;
    new MutationObserver(function () { try { decorate(); } catch (e) {} }).observe(sh, { childList: true });
    /* v180: opening the Pull List (v196: Customer Search) loads its checks from the server */
    var wasOpen = sh.classList.contains('open');
    new MutationObserver(function () { var o = sh.classList.contains('open'); if (o && !wasOpen) { lastKey = srvKey(); loadFromServer(); flush(); } wasOpen = o; }).observe(sh, { attributes: true, attributeFilter: ['class'] });
    if (wasOpen) loadFromServer();
    try { decorate(); } catch (e) {}
    return true;
  }
  /* tap the box: toggle loaded (does not open the photo peek) */
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('#pull-sheet .tc-ck'); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    var ln = b.closest('[data-pull-bin]'), sh = sheet(); if (!ln || !sh) return;
    if (STAGED[srvKey()]) { try { showToast('Job already staged — boxes are locked'); } catch (x) {} return; } /* v196 */
    var bin = ln.getAttribute('data-pull-bin'), on = checked(), i = on.indexOf(bin);
    if (i >= 0) on.splice(i, 1); else on.push(bin);
    saveChecked(on); paintChecks(sh);
    /* v180: share the tap with every phone (queued if offline) */
    var k = srvKey();
    if (k) {
      var nm = ln.querySelector('.pick-line-name'), qb = ln.querySelector('.pull-qty b');
      enqueue({ k: k, cust: custLabel(), bin: bin, name: nm ? nm.textContent.trim() : '', qty: qb ? stUnits(bin, parseInt(qb.textContent, 10)) : '', on: i < 0, by: devName(), t: Date.now() });
    }
  }, true);
  /* name / address typed, New Job, or a job loaded: header and checks follow the customer */
  var lastKey = null;
  function later() { setTimeout(function () { var sh = sheet(); if (sh && sh.querySelector('.tc-top')) { paintHead(sh); paintChecks(sh); } var k = srvKey(); if (k !== lastKey) { lastKey = k; clearTimeout(later.t); later.t = setTimeout(function () { if (pullOpenNow()) loadFromServer(); }, 600); } }, 0); }
  document.addEventListener('input', function (e) { if (e.target && e.target.getAttribute && e.target.getAttribute('data-jc')) later(); }, true);
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('[data-jc-clear], #job-find')) later(); }, true);
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 60) return; setTimeout(poll, 250); })(); }
})();

/* v168 (Hark, 2026-11-10, Dave): side menu in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones], same contents and line icons as before.
   Solid dark menu (#162537) instead of glass; section titles (Products, Quote Templates, Resource Center) are small grey caps; every row
   is a rounded dark card (#1B2C3F); icons stay white line icons on dark tiles (#14202F, 1.5px #2A4A66 border, 11px corners); All Products
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
    + P + ' { width: 310px !important; max-width: 86vw !important; background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-right: 1px solid #E6EBF1 !important; box-shadow: 10px 0 34px rgba(15,23,32,.10) !important; color: #0F1720 !important; }'
    + P + ' .drawer-head { padding: calc(14px + env(safe-area-inset-top)) 14px 4px !important; min-height: 0 !important; flex: none !important; background: transparent !important; }'
    + P + ' .drawer-close { width: 38px !important; height: 38px !important; border-radius: 11px !important; border: 1.5px solid #E3E8EF !important; background: transparent !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; color: #0F1720 !important; font-size: 24px !important; line-height: 1 !important; }'
    + P + ' .drawer-section { border: 0 !important; padding: 0 14px; background: transparent !important; }'
    + P + ' .drawer-section .drawer-section { padding: 0; }'
    /* section titles */
    + P + ' > .drawer-section > .drawer-section-head { padding: 16px 4px 4px !important; min-height: 0 !important; background: transparent !important; border: 0 !important; font-size: 11.5px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; color: #8A94A3 !important; box-shadow: none !important; }'
    + P + ' > .drawer-section > .drawer-section-head > span:not(.drawer-chevron) { color: #8A94A3 !important; font: inherit !important; letter-spacing: inherit !important; text-transform: inherit !important; }'
    + P + ' .drawer-section > .drawer-section-head > .drawer-chevron, ' + P + ' .drawer-item > .drawer-chevron { background: ' + GREY + '; }'
    + P + ' .drawer-section.expanded > .drawer-section-head > .drawer-chevron, ' + P + ' .drawer-supplier.open > .drawer-item > .drawer-chevron { background: ' + BLUE + '; }'
    + P + ' > .drawer-section > .drawer-section-head:active, ' + P + ' > .drawer-section > .drawer-section-head.pressed { background: transparent !important; color: #6B7280 !important; }'
    + P + ' .drawer-items, ' + P + ' .drawer-cats, ' + P + ' .drawer-supplier { background: transparent !important; }'
    /* rows = cards */
    + CARD + ' { box-sizing: border-box !important; min-height: 50px; margin-top: 6px !important; padding: 5px 12px 5px 6px !important; gap: 12px !important; border: 1px solid #E6EBF1 !important; border-radius: 12px !important; background: #FFFFFF !important; color: #0F1720 !important; box-shadow: none !important; font-size: 15.5px !important; font-weight: 700 !important; }'
    + P + ' .drawer-item:active, ' + P + ' .drawer-item.pressed, ' + P + ' #drawer-labels > .drawer-section-head:active, ' + P + ' #drawer-labels > .drawer-section-head.pressed { background: #EEF2F7 !important; }'
    + P + ' #drawer-products > .drawer-items > .drawer-item:first-child, ' + P + ' #drawer-qt .drawer-item { padding-left: 16px !important; }'
    + P + ' .drawer-item .drawer-item-name, ' + P + ' .drawer-item .drawer-item-name.v116-name { color: #0F1720 !important; font-size: 15.5px !important; font-weight: 700 !important; line-height: 1.25 !important; }'
    + P + ' .drawer-supplier.open > .drawer-item { border-color: #29ABE2 !important; background: #E6F5FC !important; }'
    + P + ' #drawer-labels.expanded > .drawer-section-head { border-color: #29ABE2 !important; background: #E6F5FC !important; }'
    + P + ' #drawer-labels > .drawer-section-head { width: 100% !important; justify-content: flex-start !important; }'
    + P + ' #drawer-labels .drawer-items .drawer-item { margin-left: 16px !important; width: calc(100% - 16px) !important; }'
    /* icon tiles */
    + TILE + ' { box-sizing: border-box !important; width: 38px !important; height: 38px !important; flex: 0 0 38px !important; padding: 8px !important; margin: 0 !important; border-radius: 11px !important; background: #EEF2F7 !important; border: 1.5px solid #E3E8EF !important; box-shadow: none !important; color: #0F1720 !important; }'
    /* supplier categories (open a supplier) */
    + P + ' .drawer-cat { box-sizing: border-box; margin-top: 2px !important; padding: 9px 12px 9px 62px !important; border: 0 !important; border-radius: 10px !important; background: transparent !important; color: #374151 !important; font-size: 14px !important; }'
    + P + ' .drawer-cat .drawer-item-name { color: #374151 !important; font-size: 14px !important; font-weight: 600 !important; }'
    + P + ' .drawer-cat:active, ' + P + ' .drawer-cat.pressed { background: #EEF2F7 !important; }'
    /* count pills: All Products + each supplier */
    + P + ' #drawer-products > .drawer-items > .drawer-item > .drawer-count, ' + P + ' #drawer-products .drawer-supplier > .drawer-item > .drawer-count { display: inline-block !important; flex: none; min-width: 0; margin-left: auto; padding: 3px 9px; border-radius: 8px; background: rgba(41,171,226,.15) !important; color: #1A8FC4 !important; font-size: 12.5px; font-weight: 800; line-height: 1.3; }'
    + P + ' #drawer-products > .drawer-items > .drawer-item:first-child > .drawer-count { margin-right: 4px; }'
    /* footer: Jobber | CompanyCam, white logos, no boxes */
    + P + ' .drawer-foot { display: flex !important; align-items: center !important; justify-content: space-between !important; flex: none !important; gap: 10px; margin: auto 14px 0 !important; padding: 12px 2px calc(16px + env(safe-area-inset-bottom)) !important; border-top: 1px solid #E6EBF1 !important; background: transparent !important; }'
    + P + ' .drawer-foot .drawer-jobber { width: auto !important; flex: 0 1 auto; padding: 6px 0 !important; margin: 0 !important; background: transparent !important; border: 0 !important; box-shadow: none !important; }'
    + P + ' .drawer-foot .drawer-jobber img { height: 21px !important; width: auto !important; max-width: 118px !important; object-fit: contain; background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; border-radius: 0 !important; }'
    + P + ' .drawer-foot .drawer-jobber:active, ' + P + ' .drawer-foot .drawer-jobber.pressed { background: transparent !important; opacity: .75; }'
    + P + ' .drawer-foot .st164-div { flex: none; width: 0 !important; height: 26px !important; margin: 0 !important; border: 0 !important; border-left: 1px solid #E3E8EF !important; }';
  document.head.appendChild(st);
})();

/* v169 (Hark, 2026-11-10, Dave): Inventory home in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]. Same list, search, tabs, steppers (hold-to-repeat untouched),
   Keep on hand, Details, Add to order, Order and the Scan / Cart / Pull / Quote buttons; only the look changes.
   Dark page (#14202F), header fades #183D5A -> #14202F, dark search box and menu tile, All Items / Needs Ordering as a dark segmented
   control with the active side blue, category titles as small grey caps with a blue-tinted count pill, every item a dark rounded card
   (#1B2C3F) with the product photo on a light tile, white name, grey bin / SKU line, the existing LOW / OUT flags as amber / red pills,
   round dark -/+ (blue +), ghost Keep on hand / Details / Add to order and a blue Order. Supplier logos on the cards use white-on-dark
   copies (assets/supplier-dark/, no white box); Hilti keeps its own red logo. "Stocked to par  X of Y lines" bar above the list,
   counted from the items on screen that have a par above 0 (on hand >= par); it hides itself when none of them has a par. */
(function () {
  var B = 'html body';
/* v174 (Hark, 2026-11-10, Dave): supplier-dark logos cleaned (no light fill inside letters, no white specks); ?v=2 busts the cache. */
  var D = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/supplier-dark/';
  var st = document.createElement('style'); st.id = 'storm-v169-css';
  st.textContent = ''
    + B + ', html { background: #EEF2F7 !important; }'
    + B + ' { color: #0F1720; }'
    + B + ' .topbar { background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-bottom: 1px solid #E6EBF1 !important; box-shadow: none !important; }'
    + B + ' .topbar > header { background: transparent !important; }'
    + B + ' .toolbar { background: transparent !important; padding-bottom: 10px !important; }'
    + B + ' #hamburger.hamburger { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; box-shadow: none !important; }'
    + B + ' #hamburger.hamburger span { background: #0F1720 !important; }'
    + B + ' #search { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; color: #0F1720 !important; box-shadow: none !important; }'
    + B + ' #search::placeholder { color: #8A94A3 !important; }'
    + B + ' #search:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; outline: none !important; }'
    /* All Items / Needs Ordering = segmented control */
    + B + ' .toolbar .tabs { gap: 4px !important; padding: 4px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; }'
    + B + ' .toolbar .tab { border: 0 !important; border-radius: 11px !important; background: transparent !important; color: #6B7280 !important; font-weight: 800 !important; box-shadow: none !important; }'
    + B + ' .toolbar .tab.active { background: #29ABE2 !important; color: #FFFFFF !important; }'
    + B + ' .toolbar .tab .badge { background: rgba(41,171,226,.15) !important; color: #1A8FC4 !important; }'
    + B + ' .toolbar .tab.active .badge { background: rgba(255,255,255,.28) !important; color: #FFFFFF !important; }'
    /* stocked-to-par bar */
    + B + ' #tk-par { margin: 12px 14px 0; }'
    + B + ' #tk-par[hidden] { display: none !important; }'
    + B + ' #tk-par .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13.5px; color: #6B7280; }'
    + B + ' #tk-par .tk-row b { color: #1FA3DC; font-weight: 800; }'
    + B + ' #tk-par .tk-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #E3E8EF; overflow: hidden; }'
    + B + ' #tk-par .tk-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: #29ABE2; transition: width .25s ease; }'
    /* category titles */
    + B + ' #list .cat-head { margin: 22px 2px 6px !important; padding: 2px 4px !important; background: transparent !important; background-image: none !important; border: 0 !important; box-shadow: none !important; }'
    + B + ' #list .cat-head::before { display: none !important; }'
    + B + ' #list .cat-head .cat-name { color: #8A94A3 !important; font-size: 12px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; text-shadow: none !important; }'
    + B + ' #list .cat-head .cat-count { padding: 3px 9px !important; border-radius: 8px !important; background: rgba(41,171,226,.15) !important; color: #1A8FC4 !important; font-size: 11.5px !important; font-weight: 800 !important; border: 0 !important; }'
    /* item cards */
    + B + ' .card { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; box-shadow: none !important; color: #0F1720 !important; }'
    + B + ' .card.low { box-shadow: inset 4px 0 0 #F59E0B !important; }'
    + B + ' .card.out { box-shadow: inset 4px 0 0 #EF4444 !important; }'
    + B + ' .card .photo { background: #fff !important; border: 0 !important; border-radius: 12px !important; }'
    + B + ' .card .bin { color: #374151 !important; text-transform: uppercase; font-weight: 800 !important; }'
    + B + ' .card .supplier { color: #8A94A3 !important; }'
    + B + ' .card .name { color: #0F1720 !important; font-weight: 800 !important; }'
    + B + ' .card .sku, ' + B + ' .card .ft-note { color: #6B7280 !important; }'
    + B + ' .card .price { color: #0F1720 !important; }'
    + B + ' .card .ft-line { color: #1A8FC4 !important; }'
    + B + ' .card .need-qty { color: #C2410C !important; }'
    + B + ' .flag { padding: 3px 9px !important; border-radius: 8px !important; font-size: 11.5px !important; letter-spacing: .04em; }'
    + B + ' .flag.low { background: rgba(245,158,11,.16) !important; color: #C2410C !important; }'
    + B + ' .flag.out { background: rgba(239,68,68,.16) !important; color: #DC2626 !important; }'
    + B + ' .card .supplier-logo { background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; }'
    /* steppers + buttons on cards */
    + B + ' .card .stepper { gap: 8px !important; border: 0 !important; border-radius: 0 !important; overflow: visible !important; background: transparent !important; }'
    + B + ' .card .step { width: 46px !important; height: 46px !important; border-radius: 50% !important; border: 1.5px solid #D5DCE5 !important; background: transparent !important; color: #0F1720 !important; font-size: 24px !important; box-shadow: none !important; }'
    + B + ' .card .step[data-act="plus"] { border-color: #29ABE2 !important; color: #1FA3DC !important; }'
    + B + ' .card .step:active { background: #EEF2F7 !important; }'
    + B + ' .card .count { width: 52px !important; height: 46px !important; background: transparent !important; color: #0F1720 !important; font-size: 22px !important; font-weight: 800 !important; border: 0 !important; }'
    + B + ' .card .count::placeholder { color: #8A94A3 !important; }'
    + B + ' .card .ft-tag { color: #6B7280 !important; }'
    + B + ' .card .par, ' + B + ' .card .details-btn { background: transparent !important; border: 1.5px solid #D5DCE5 !important; border-radius: 12px !important; color: #0F1720 !important; box-shadow: none !important; }'
    + B + ' .card .pick-add { background: transparent !important; border: 1.5px solid #29ABE2 !important; border-radius: 12px !important; color: #1A8FC4 !important; box-shadow: none !important; }'
    + B + ' .card .pick-add.in-list { background: rgba(41,171,226,.15) !important; }'
    + B + ' .card .order { background: #29ABE2 !important; border: 0 !important; border-radius: 12px !important; color: #FFFFFF !important; font-weight: 800 !important; box-shadow: none !important; }'
    /* floating buttons: Scan / Pull / Quote dark, Cart blue */
    + B + ' .fab-dock .scan-btn, ' + B + ' .fab-dock .pull-fab, ' + B + ' .fab-dock .quote-fab { background: #FFFFFF !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 1px solid #E3E8EF !important; color: #0F1720 !important; box-shadow: 0 6px 18px rgba(15,23,32,.10) !important; }'
    + B + ' .fab-dock #cart-fab.cart-fab { background: #29ABE2 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 0 !important; color: #FFFFFF !important; box-shadow: 0 6px 22px rgba(41,171,226,.4) !important; }'
    + B + ' .fab-dock .cart-fab-total { background: #FFFFFF !important; border: 1px solid #E6EBF1; color: #0F1720 !important; }'
    + B + ' .jobber-logo { filter: none !important; }'
    + B + ' .empty, ' + B + ' .loading { color: #6B7280 !important; background: transparent !important; }'
    + B + ' .foot { color: #8A94A3 !important; }'
    + B + ' .foot #refresh { background: transparent !important; border: 1.5px solid #D5DCE5 !important; color: #0F1720 !important; border-radius: 12px !important; }';
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

/* v170 (Hark, 2026-11-10, Dave): Item details in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]. Same contents, same order (the -/+ and Order stay right under the
   photo, as set in v73), same swipe, close, photo ride-in, bin label tile and logo tap.
   Dark sheet (#14202F) with the blue-to-dark top bar and a dark rounded back tile; product photo on a light rounded tile; big white name
   with a LOW / OUT pill (same rule as the list: par set and on hand at or below par / at zero); grey bin / SKU line; white-on-dark
   supplier logo (from v169); the -/+ row is a dark card with large round buttons (blue +) and a blue Order button; when the item has a
   par above 0 an "On hand X / par Y" bar sits above the count tiles (amber when low, red when out, green at or above par); count tiles,
   Flow rate and Key features are dark. Only #detail changes; Bin Labels and other pages that share the overlay class are untouched. */
(function () {
  var P = 'html body #detail.detail-overlay';
  var st = document.createElement('style'); st.id = 'storm-v170-css';
  st.textContent = ''
    + P + ' { background: #EEF2F7 !important; color: #0F1720 !important; }'
    + P + ' .detail-bar { background: transparent !important; color: #0F1720 !important; border: 0 !important; box-shadow: none !important; }'
    + P + ' .detail-bar .detail-close.st-back { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; color: #0F1720 !important; }'
    + P + ' img.detail-photo { background: #fff !important; border: 0 !important; border-radius: 14px !important; }'
    + P + ' .detail-name { color: #0F1720 !important; font-size: 24px !important; font-weight: 800 !important; }'
    + P + ' .tk-dpill { display: inline-block; vertical-align: 4px; margin-left: 8px; padding: 3px 9px; border-radius: 8px; font-size: 12px; font-weight: 800; letter-spacing: .04em; line-height: 1.3; }'
    + P + ' .tk-dpill.low { background: rgba(245,158,11,.16); color: #C2410C; }'
    + P + ' .tk-dpill.out { background: rgba(239,68,68,.16); color: #DC2626; }'
    + P + ' .detail-meta { color: #6B7280 !important; }'
    + P + ' img.detail-logo { background: transparent !important; border: 0 !important; box-shadow: none !important; padding: 0 !important; }'
    + P + ' .detail-price { color: #0F1720 !important; }'
    + P + ' .ft-line { color: #1A8FC4 !important; }'
    /* -/+ and Order */
    + P + ' .detail-body > .controls.ctl-top { margin-top: 14px !important; padding: 12px !important; gap: 12px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; }'
    + P + ' .controls .stepper { gap: 10px !important; border: 0 !important; border-radius: 0 !important; overflow: visible !important; background: transparent !important; }'
    + P + ' .controls .step { width: 56px !important; height: 56px !important; border-radius: 50% !important; border: 1.5px solid #D5DCE5 !important; background: #EEF2F7 !important; color: #0F1720 !important; font-size: 28px !important; box-shadow: none !important; }'
    + P + ' .controls .step[data-detail-step="plus"] { background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; }'
    + P + ' .controls .count { width: 60px !important; height: 56px !important; background: transparent !important; border: 0 !important; color: #0F1720 !important; font-size: 30px !important; font-weight: 800 !important; }'
    + P + ' .controls .ft-tag { color: #6B7280 !important; }'
    + P + ' .controls .order { min-height: 56px !important; border: 0 !important; border-radius: 14px !important; background: #29ABE2 !important; color: #FFFFFF !important; font-weight: 800 !important; box-shadow: none !important; }'
    /* on hand vs par */
    + P + ' .tk-dpar { margin-top: 14px; padding: 12px 14px; background: #FFFFFF; border: 1px solid #E6EBF1; border-radius: 14px; }'
    + P + ' .tk-dpar .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 13px; color: #6B7280; }'
    + P + ' .tk-dpar .tk-row b { font-size: 20px; font-weight: 800; color: #0F1720; }'
    + P + ' .tk-dpar .tk-bar { height: 8px; margin-top: 8px; border-radius: 4px; background: #E3E8EF; overflow: hidden; }'
    + P + ' .tk-dpar .tk-bar i { display: block; height: 100%; border-radius: 4px; background: #22C55E; }'
    + P + ' .tk-dpar.low .tk-bar i { background: #F59E0B; } ' + P + ' .tk-dpar.out .tk-bar i { background: #EF4444; }'
    /* count tiles, flow rate, features */
    + P + ' .detail-count { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 12px !important; color: #0F1720 !important; }'
    + P + ' .detail-count span { color: #8A94A3 !important; }'
    + P + ' .detail-count.label-tile img { box-shadow: none !important; }'
    + P + ' .label-add { background: #29ABE2 !important; color: #FFFFFF !important; } ' + P + ' .label-add.in { background: #22C55E !important; color: #FFFFFF !important; }'
    + P + ' .detail-features h2, ' + P + ' .detail-flow h2 { color: #8A94A3 !important; border-left-color: #29ABE2 !important; }'
    + P + ' .detail-features li, ' + P + ' .detail-flow li, ' + P + ' .detail-features p { color: #374151 !important; }'
    + P + ' .detail-features li::marker, ' + P + ' .detail-flow li::marker { color: #1FA3DC; }';
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

/* v171 (Hark, 2026-11-10, Dave): Order cart (#pick-sheet) in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]. Same lines, -/+ (hold-to-repeat untouched), remove X,
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
    + S + ' { background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #E6EBF1 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(15,23,32,.10) !important; color: #0F1720 !important; max-height: 88vh !important; max-height: 88dvh !important; }'
    + S + ' > .pick-sheet-head { display: block !important; padding: 0 18px 12px !important; border: 0 !important; background: transparent !important; border-radius: 22px 22px 0 0; }'
    + S + ' .tk-grab { width: 42px; height: 5px; border-radius: 3px; margin: 8px auto 0; background: rgba(15,23,32,.14); }'
    + S + ' .tk-headrow { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; }'
    + S + ' .tk-logo { display: block; height: 22px; width: auto; }'
    + S + ' .pick-sheet-head .pick-sheet-close { color: #6B7280 !important; font-size: 30px !important; padding: 2px 4px 2px 12px !important; background: transparent !important; border: 0 !important; }'
    + S + ' .pick-sheet-head h2 { margin: 14px 0 0 !important; font-size: 26px !important; font-weight: 800 !important; line-height: 1.2 !important; color: #0F1720 !important; }'
    + S + ' .tk-sub { margin-top: 4px; font-size: 13px; color: #6B7280; }'
    + S + ' .tk-prog { margin-top: 12px; display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #6B7280; }'
    + S + ' .tk-prog b { color: #1FA3DC; font-weight: 800; }'
    + S + ' .tk-bar { height: 8px; margin-top: 6px; border-radius: 4px; background: #E3E8EF; overflow: hidden; }'
    + S + ' .tk-bar i { display: block; height: 100%; width: 0; border-radius: 4px; background: #29ABE2; transition: width .25s ease; }'
    + S + '.tk-none .tk-sub, ' + S + '.tk-none .tk-prog, ' + S + '.tk-none .tk-bar { display: none; }'
    /* supplier sections */
    + S + ' > .pick-sheet-head + div { padding: 0 14px !important; }'
    + S + ' > .pick-sheet-head + div > div { border-bottom: 0 !important; padding: 2px 0 12px !important; }'
    + S + ' > .pick-sheet-head + div > div > h3 { margin: 16px 4px 2px !important; font-size: 12px !important; font-weight: 800 !important; letter-spacing: .1em !important; text-transform: uppercase !important; color: #8A94A3 !important; }'
    + S + ' > .pick-sheet-head + div > div > div:not(.pick-line) { color: #374151 !important; font-size: 14.5px !important; margin: 10px 4px 10px !important; }'
    + S + ' #hd-copy-counter { display: block; margin: 6px 4px 0; font-size: 12px; color: #8A94A3 !important; }'
    /* lines */
    + S + ' .pick-line { gap: 10px !important; padding: 10px !important; margin-top: 8px; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; background: #FFFFFF !important; transition: opacity .2s ease; }'
    + S + ' .pick-line { flex-wrap: wrap !important; align-items: center !important; row-gap: 8px !important; }'
    + S + ' .pick-line img { width: 46px !important; height: 46px !important; flex: 0 0 46px !important; border-radius: 10px !important; background: #fff !important; }'
    + S + ' .pick-line .pick-line-info { flex: 1 1 0 !important; min-width: calc(100% - 106px) !important; }'
    + S + ' .pick-line .pick-stepper { margin-left: 96px !important; }'
    + S + ' .pick-line .pick-remove { margin-left: auto !important; }'
    + S + ' .pick-line-name { font-size: 15px !important; font-weight: 700 !important; line-height: 1.25 !important; color: #0F1720 !important; overflow-wrap: anywhere; }'
    + S + ' .pick-line-code { font-size: 12px !important; margin-top: 3px !important; color: #8A94A3 !important; }'
    + S + ' .tk-ck { flex: 0 0 30px; width: 30px; height: 30px; margin: 0; padding: 0; border-radius: 9px; border: 2px solid #D5DCE5; background: transparent; color: #FFFFFF; font-size: 17px; font-weight: 900; line-height: 26px; text-align: center; font-family: inherit; -webkit-tap-highlight-color: transparent; position: relative; }'
    + S + ' .tk-ck::after { content: ""; position: absolute; inset: -9px; }'
    + S + ' .pick-line.tk-done { opacity: .6; }'
    + S + ' .pick-line.tk-done .tk-ck { background: #29ABE2; border-color: #29ABE2; }'
    + S + ' .pick-line.tk-done .pick-line-name { text-decoration: line-through; text-decoration-thickness: 2px; }'
    + S + ' .pick-stepper { gap: 4px !important; border: 0 !important; background: transparent !important; overflow: visible !important; }'
    + S + ' .pick-step { width: 34px !important; height: 34px !important; min-height: 0 !important; padding: 0 !important; border-radius: 50% !important; border: 1.5px solid #D5DCE5 !important; background: transparent !important; color: #0F1720 !important; font-size: 20px !important; line-height: 1 !important; box-shadow: none !important; }'
    + S + ' .pick-step[data-pick-inc] { border-color: #29ABE2 !important; color: #1FA3DC !important; }'
    + S + ' .pick-stepper .pick-qty { min-width: 34px !important; padding: 0 4px !important; color: #1FA3DC !important; font-size: 20px !important; font-weight: 800 !important; background: transparent !important; }'
    + S + ' .pick-remove { color: #8A94A3 !important; background: transparent !important; }'
    /* supplier buttons */
    + S + ' .pick-copy, ' + S + ' .pick-open-rt, ' + S + ' .pick-open-hi { min-height: 50px !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid #D5DCE5 !important; color: #0F1720 !important; font-weight: 700 !important; box-shadow: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }'
    + S + ' #hd-copy-btn.pick-copy, ' + S + ' .pick-open-rt, ' + S + ' .pick-open-hi { background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; font-weight: 800 !important; }'
    /* footer */
    + S + ' .pick-sheet-foot { display: flex !important; align-items: center; gap: 12px; padding: 12px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #EEF2F7 !important; border-top: 1px solid #E6EBF1 !important; }'
    + S + ' .pick-sheet-foot > div { flex: 1 1 auto; margin: 0 !important; text-align: left !important; color: #0F1720 !important; font-size: 20px !important; }'
    + S + ' .pick-sheet-foot .pick-clear { flex: none; width: auto !important; min-height: 50px !important; padding: 0 18px !important; margin: 0 !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid rgba(239,68,68,.6) !important; color: #DC2626 !important; font-weight: 700 !important; }'
    + S + ' .pick-empty { color: #6B7280 !important; }';
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

/* v172 (Hark, 2026-11-10, Dave): Find a Job in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]. Same search, saved jobs, From Jobber list, job detail, Edit list,
   Print list, Back to results and close.
   Solid dark sheet (#14202F) with the blue-to-dark top, big "Find a Job" title, dark search box, every job a dark rounded card. Saved
   jobs get a blue initials circle and, when this phone has Pull List truck checks for that customer (v167), a "Loaded on truck N of M"
   bar with an IN PROGRESS (blue) or LOADED (green) pill; jobs with no checks on this phone show neither. In a saved job, Edit list is
   the blue primary and Print list / Back to results are ghost. Nothing new is read from or written to the sheet. */
(function () {
  var J = 'html body #job-find';
  var st = document.createElement('style'); st.id = 'storm-v172-css';
  st.textContent = ''
    + J + ' { background: rgba(15,23,32,.32) !important; }'
    + J + ' .jf-card { width: min(96vw, 520px) !important; max-height: 88vh !important; max-height: 88dvh !important; padding: 0 0 14px !important; gap: 10px !important; background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border: 1px solid #E6EBF1 !important; border-radius: 22px !important; box-shadow: 0 14px 40px rgba(15,23,32,.14) !important; overflow: hidden; }'
    + J + ' .jf-head { padding: 16px 16px 6px; background: transparent; }'
    + J + ' .jf-head h2 { font-size: 26px !important; font-weight: 800 !important; color: #0F1720 !important; }'
    + J + ' .jf-x { width: 40px !important; height: 40px !important; border-radius: 12px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; color: #0F1720 !important; line-height: 38px !important; }'
    + J + ' .jf-q { margin: 0 14px !important; width: calc(100% - 28px) !important; box-sizing: border-box; height: 48px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; color: #0F1720 !important; }'
    + J + ' .jf-q::placeholder { color: #8A94A3 !important; }'
    + J + ' .jf-q:focus { border-color: #29ABE2 !important; box-shadow: 0 0 0 3px rgba(41,171,226,.22) !important; }'
    + J + ' .jf-list { padding: 2px 14px 4px; gap: 10px !important; }'
    + J + ' .jf-item { padding: 14px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 16px !important; box-shadow: none !important; }'
    + J + ' .jf-item:active, ' + J + ' .jf-item.pressed { background: #EEF2F7 !important; }'
    + J + ' .jf-name { color: #0F1720 !important; font-size: 17px !important; font-weight: 800 !important; }'
    + J + ' .jf-addr { color: #6B7280 !important; }'
    + J + ' .jf-meta { color: #8A94A3 !important; }'
    + J + ' .jf-empty, ' + J + ' .jf-hint { color: #6B7280 !important; }'
    + J + ' .jf-sec { margin: 12px 4px 0 !important; color: #8A94A3 !important; font-size: 12px !important; letter-spacing: .1em !important; }'
    /* saved job card: initials + truck progress */
    + J + ' .jf-item.tk-sv { display: grid !important; grid-template-columns: 46px minmax(0, 1fr); column-gap: 12px; align-items: center; }'
    + J + ' .jf-item.tk-sv > .tk-av { grid-column: 1; grid-row: 1 / span 3; width: 46px; height: 46px; border-radius: 50%; background: #29ABE2; color: #FFFFFF; font-size: 16px; font-weight: 900; line-height: 46px; text-align: center; letter-spacing: .02em; }'
    + J + ' .jf-item.tk-sv > .jf-name, ' + J + ' .jf-item.tk-sv > .jf-addr, ' + J + ' .jf-item.tk-sv > .jf-meta { grid-column: 2; }'
    + J + ' .jf-item.tk-sv > .tk-jp { grid-column: 1 / -1; margin-top: 10px; }'
    + J + ' .tk-jp .tk-row { display: flex; justify-content: space-between; align-items: baseline; font-size: 12.5px; color: #6B7280; }'
    + J + ' .tk-jp .tk-row b { color: #1FA3DC; font-weight: 800; }'
    + J + ' .tk-jp .tk-bar { height: 6px; margin-top: 6px; border-radius: 3px; background: #E3E8EF; overflow: hidden; }'
    + J + ' .tk-jp .tk-bar i { display: block; height: 100%; border-radius: 3px; background: #29ABE2; }'
    + J + ' .tk-st { display: inline-block; vertical-align: 2px; margin-left: 8px; padding: 2px 8px; border-radius: 7px; font-size: 10.5px; font-weight: 800; letter-spacing: .05em; }'
    + J + ' .tk-st.prog { background: rgba(41,171,226,.15); color: #1A8FC4; }'
    + J + ' .tk-st.done { background: rgba(34,197,94,.15); color: #15803D; }'
    /* job detail */
    + J + ' .jf-detail { padding: 2px 2px 0; }'
    + J + ' .jf-lines { border-top: 0 !important; margin: 12px 0 !important; }'
    + J + ' .jf-line { margin-top: 6px; padding: 10px 12px !important; background: #FFFFFF; border: 1px solid #E6EBF1 !important; border-radius: 12px; color: #0F1720 !important; }'
    + J + ' .jf-line b { color: #1FA3DC !important; font-weight: 800; }'
    + J + ' .jf-btn, ' + J + ' .jf-back, ' + J + ' .jc-clear { min-height: 52px !important; border-radius: 14px !important; background: transparent !important; border: 1.5px solid #D5DCE5 !important; color: #0F1720 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; box-shadow: none !important; font-weight: 700 !important; }'
    + J + ' .jf-btn[data-jf-edit] { background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; font-weight: 800 !important; }';
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
        p.innerHTML = '<div class="tk-row"><span>On the staging cart</span><span><b>' + done + '</b> of ' + tot + '</span></div><div class="tk-bar"><i style="width:' + Math.round(done / tot * 100) + '%"></i></div>';
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

/* v173 (Hark, 2026-11-10, Dave): Jobber jobs and the Jobber quote in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]. Same Jobber data, Connect / Try again,
   Load into Pull List, quote pull, close and scroll (v114) as before.
   In Find a Job, From Jobber cards get a blue edge and a blue-tinted JOB pill; the Jobber job detail has the blue Load into Pull List,
   ghost Back. Connect to Jobber and Try again are blue. The Jobber quote is a solid dark sheet (#14202F) with the blue-to-dark top,
   the white Jobber logo, a dark close tile, the customer big, "Pulled N items" as a green line and "Couldn't find" in amber, the
   blue Pull items button, every quote line a dark card with its photo on a light tile, and the quote total pinned as the last row. */
(function () {
  var J = 'html body #job-find', Q = 'html body #quote-sheet.quote-sheet';
  var st = document.createElement('style'); st.id = 'storm-v173-css';
  st.textContent = ''
    + J + ' .jf-item[data-jf-jb] { box-shadow: inset 4px 0 0 #29ABE2 !important; }'
    + J + ' .jf-tag { background: rgba(41,171,226,.15) !important; color: #1A8FC4 !important; border-radius: 7px !important; padding: 2px 8px !important; font-size: 10.5px !important; vertical-align: 2px; margin-left: 8px !important; }'
    + J + ' .jf-btn[data-jf-jb-load], ' + J + ' .jf-btn[data-jf-connect], ' + J + ' .jf-btn[data-jf-jb-retry] { background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; font-weight: 800 !important; }'
    + J + ' .jf-line b { white-space: nowrap; }'
    /* quote sheet */
    + Q + ' { background: #EEF2F7 !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; border-top: 1px solid #E6EBF1 !important; border-radius: 22px 22px 0 0 !important; box-shadow: 0 -10px 34px rgba(15,23,32,.10) !important; padding: 0 16px calc(18px + env(safe-area-inset-bottom)) !important; max-height: 88vh !important; max-height: 88dvh !important; }'
    + Q + ' .qs-logo { margin: 0 -16px !important; padding: 16px 16px 4px; background: transparent; border-radius: 22px 22px 0 0; }'
    + Q + ' .qs-head { color: #8A94A3 !important; letter-spacing: .1em !important; }'
    + Q + ' .qs-head > span:first-child { color: #1A8FC4 !important; }'
    + Q + ' .qs-job { color: #6B7280 !important; }'
    + Q + ' .qs-x { width: 40px !important; height: 40px !important; border-radius: 12px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; color: #0F1720 !important; }'
    + Q + ' .qs-cust { font-size: 24px !important; font-weight: 800 !important; color: #0F1720 !important; margin-top: 8px !important; }'
    + Q + ' .qs-sum { color: #6B7280 !important; }'
    + Q + ' .qs-pull { display: inline-block; padding: 3px 10px; border-radius: 8px; background: rgba(34,197,94,.14); color: #15803D !important; font-weight: 700; }'
    + Q + ' .qs-miss { color: #C2410C !important; }'
    + Q + ' .qs-note { color: #374151 !important; }'
    + Q + ' .qs-btn { min-height: 52px !important; border: 0 !important; border-radius: 14px !important; background: #29ABE2 !important; color: #FFFFFF !important; font-weight: 800 !important; box-shadow: none !important; }'
    + Q + ' .qs-lines { border-top: 0 !important; margin-top: 12px !important; }'
    + Q + ' .qs-line { margin-top: 8px; padding: 12px !important; background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; }'
    + Q + ' .qs-photo { background: #fff !important; border-radius: 10px !important; object-fit: contain !important; }'
    + Q + ' .qs-name { color: #0F1720 !important; }'
    + Q + ' .qs-desc { color: #8A94A3 !important; }'
    + Q + ' .qs-qty { color: #1FA3DC !important; font-weight: 700; }'
    + Q + ' .qs-total { position: sticky; bottom: calc(-18px - env(safe-area-inset-bottom)); margin: 12px -16px 0 !important; padding: 14px 16px calc(18px + env(safe-area-inset-bottom)) !important; background: #EEF2F7 !important; border-top: 1px solid #E6EBF1 !important; color: #6B7280 !important; }'
    + Q + ' .qs-total b { color: #0F1720 !important; font-size: 20px; }';
  document.head.appendChild(st);
})();

/* v176 (Hark, 2026-11-10, Dave: "all the links in the drawer ... are still the old UI"): Resource Center pages (Logos, Logo files,
   Media), Bin Labels and the checklists in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones]: navy page, dark cards with blue edge text, small grey caps
   section titles like the home screen, blue primary buttons. STORM header logo moved to the right so it no longer covers the title. */
(function () {
  if (document.getElementById('storm-v176-css')) return;
  var O = ['#res-list', '#res-view', '#labels', '#lbl-view', '#lbl-detail', '#chk-view'];
  function A(sfx) { return O.map(function (o) { return 'html body ' + o + sfx; }).join(', '); }
  var T2 = 'html body #res-list #res-media .bl-cat, html body #res-view .detail-body > .detail-name, html body #lbl-detail .detail-flow h2, html body #lbl-detail .detail-features h2, html body #res-media .bl-cat';
  var st = document.createElement('style'); st.id = 'storm-v176-css';
  st.textContent = ''
    + A('') + ' { background: #EEF2F7 !important; color: #0F1720 !important; }'
    + A(' .detail-bar') + ' { background: transparent !important; border-bottom: 1px solid #E6EBF1 !important; box-shadow: none !important; color: #0F1720 !important; display: flex !important; align-items: center !important; gap: 12px !important; }'
    + A(' .detail-bar > div') + ', ' + A(' .res-title') + ' { color: #0F1720 !important; font-weight: 800 !important; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + A(' .res-hlogo') + ' { position: static !important; transform: none !important; margin-left: auto !important; height: 24px !important; max-width: 38% !important; flex: none; }'
    + A(' .detail-close') + ' { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; color: #0F1720 !important; border-radius: 14px !important; box-shadow: none !important; }'
    + A(' .detail-body') + ' { background: transparent !important; color: #0F1720 !important; }'
    + A(' .bl-intro') + ', ' + A(' .res-note') + ', ' + A(' .chk-hint') + ' { color: #6B7280 !important; }'
    + A(' .bl-cat') + ' { background: none !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; padding: 18px 2px 8px !important; margin: 6px 0 4px !important; color: #6B7280 !important; font-size: 13px !important; font-weight: 800 !important; letter-spacing: 2px !important; text-transform: uppercase !important; }'
    + A(' .bl-cat::before') + ', ' + A(' .bl-cat::after') + ' { display: none !important; }'
    + A(' .bl-card') + ' { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 14px !important; box-shadow: none !important; color: #0F1720 !important; }'
    + A(' .bl-bin') + ', ' + A(' .bl-name') + ', ' + A(' .detail-name') + ' { color: #0F1720 !important; }'
    + A(' .bl-state') + ', ' + A(' .res-mlink .bl-state') + ' { color: #1FA3DC !important; font-weight: 700 !important; }'
    + A(' .bl-none') + ' { color: #6B7280 !important; }'
    + A(' .res-mthumb') + ', ' + A(' .res-lthumb') + ' { border-radius: 10px !important; }'
    + A(' .res-mthumb') + ' { background: #E3E8EF !important; }'
    + A(' .res-mdl') + ' { color: #1FA3DC !important; border-color: #29ABE2 !important; background: transparent !important; }'
    + A(' .res-mdl svg') + ' { stroke: #1FA3DC !important; }'
    + A(' .tabs') + ' { background: #FFFFFF !important; border: 1px solid #E6EBF1 !important; border-radius: 16px !important; padding: 5px !important; gap: 6px !important; }'
    + A(' .tab') + ' { background: transparent !important; border: 0 !important; color: #6B7280 !important; border-radius: 12px !important; box-shadow: none !important; }'
    + A(' .tab.active') + ' { background: #29ABE2 !important; color: #FFFFFF !important; }'
    + A(' .tab .badge') + ' { background: #E3E8EF !important; color: #1FA3DC !important; }'
    + A(' .tab.active .badge') + ' { background: rgba(255,255,255,.28) !important; color: #FFFFFF !important; }'
    + A(' .res-dl') + ' { background: #29ABE2 !important; color: #FFFFFF !important; border: 0 !important; border-radius: 14px !important; }'
    + A(' .res-dl svg') + ' { stroke: #FFFFFF !important; }'
    + A(' .res-dl.res-dl2') + ' { background: transparent !important; color: #0F1720 !important; border: 1.5px solid #D5DCE5 !important; }'
    + A(' .res-dl.res-dl2 svg') + ' { stroke: #0F1720 !important; }'
    + A(' .res-open') + ', ' + A(' .res-go') + ' { color: #1FA3DC !important; }'
    + A(' .res-stage') + ' { border: 1px solid #E6EBF1 !important; border-radius: 14px !important; }'
    + A(' .chk-open') + ' { background: #29ABE2 !important; color: #FFFFFF !important; border: 0 !important; border-radius: 14px !important; font-weight: 800 !important; }'
    + A(' .chk-page') + ' { border-radius: 12px !important; border: 1px solid #E6EBF1 !important; box-shadow: none !important; }'
    + A(' input') + ', ' + A(' select') + ' { background: #FFFFFF !important; color: #0F1720 !important; border: 1px solid #E6EBF1 !important; }'
    + T2 + ' { background: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; margin: 18px 0 6px !important; padding: 8px 2px !important; color: #6B7280 !important; font-size: 13px !important; letter-spacing: 2px !important; }'
    + T2.split(', ').map(function (x) { return x + '::before'; }).join(', ') + ' { display: none !important; content: none !important; }';
  document.head.appendChild(st);
})();

/* v177 (Hark, 2026-11-10, Dave: "same UI on the main video side"): the opening video screen (Pick your order type) in the Truck Check look [v178: restyled to the light Glow Day palette; colours named in this note are the old dark ones].
   Navy fade over the bottom of the video, small caps title, Stock as a dark tile with a blue edge, Order for Jobs as the blue primary.
   The Stock sub-line ("Orders that are for inventory") is readable again (it was white on white). Same buttons, same taps. */
(function () {
  if (document.getElementById('storm-v177-css')) return;
  var P = 'html body #mode-picker';
  var st = document.createElement('style'); st.id = 'storm-v177-css';
  st.textContent = ''
    + P + ' .picker-video-dim { background: linear-gradient(to top, #EEF2F7 0%, rgba(238,242,247,.92) 24%, rgba(238,242,247,.35) 48%, rgba(238,242,247,0) 66%) !important; }'
    + P + ' .mode-picker-title { font-size: 14px !important; font-weight: 800 !important; letter-spacing: 3px !important; color: #6B7280 !important; text-shadow: none !important; margin-bottom: 6px; }'
    + P + ' .mode-pick-btn { min-height: 66px !important; margin-top: 12px !important; border-radius: 16px !important; box-shadow: none !important; font-size: 18px !important; font-weight: 800 !important; padding: 12px 16px !important; }'
    + P + ' .mode-pick-btn[data-mode-pick="stock"] { background: #FFFFFF !important; border: 1.5px solid #29ABE2 !important; color: #0F1720 !important; outline: none !important; }'
    + P + ' .mode-pick-btn[data-mode-pick="stock"] .mode-pick-sub { color: #6B7280 !important; }'
    + P + ' .mode-pick-btn[data-mode-pick="job"] { background: #29ABE2 !important; border: 0 !important; color: #FFFFFF !important; }'
    + P + ' .mode-pick-btn[data-mode-pick="job"] .mode-pick-sub { color: rgba(255,255,255,.88) !important; }'
    + P + ' .mode-pick-btn .mode-pick-sub { font-size: 13px !important; font-weight: 600 !important; margin-top: 4px !important; }';
  document.head.appendChild(st);
})();

/* v178 (Hark, 2026-11-10, Dave): "Glow Day" light look everywhere. The Truck Check blocks above (v167-v177) keep all their behaviour
   (truck checks, cart review checks, saved-job progress, par bars) but now run on the light palette: soft blue-grey page (#EEF2F7),
   white cards with 16-18px corners and a very soft shadow, near-black titles (#0F1720), grey sub-lines (#6B7280 / #8A94A3) and
   STORM blue (#29ABE2) for rings, the active pill and primary buttons. This block adds the Glow Day pieces on top:
   - header: STORM logo in normal colours (black STORM) centred, round light-grey menu button top-left, Inventory/Job switch top-right;
   - Inventory home: white summary card with a blue ring (% of lines at par), "N of M lines full" and an orange "N low . N out" line,
     supplier pill chips (All / Home Depot / RichTech / Hilti / AutoZone, same as tapping them in the menu), and a two-column grid of
     white product cards with a count ring badge on the photo (blue when stocked, orange part ring when low, grey at 0). The -/+,
     Keep on hand, Add to order and Order stay on every card; Details is the photo tap (as before);
   - Pull List: big blue ring "3/6 LOADED", customer bold, "address . #job" grey, round check circles (light blue with a white check),
     small round photos, "x2" in blue, white Print pill + blue Save Job pill;
   - sheets (Pull List, Order Cart, quote) get the black-text STORM logo centred with a round grey close button;
   - normal supplier logos (no supplier-dark copies), normal Jobber / CompanyCam logos in the menu. */
(function () {
  if (document.getElementById('storm-v178-css')) return;
  var B = 'html body', A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var LOGO = A + 'logos/STORM-logo-black-text-transparent.svg';
  var BG = '#EEF2F7', INK = '#0F1720', MUTE = '#6B7280', MUTE2 = '#8A94A3', BLUE = '#29ABE2', CHIP = '#E4E9F0';
  var SH = '0 1px 2px rgba(15,23,32,.04), 0 6px 18px rgba(15,23,32,.06)';
  var RB = 'width: 42px !important; height: 42px !important; border-radius: 50% !important; background: ' + CHIP + ' !important; border: 0 !important; box-shadow: none !important; color: ' + INK + ' !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important;';
  var st = document.createElement('style'); st.id = 'storm-v178-css';
  st.textContent = ''
    /* page */
    + 'html, ' + B + ' { background: ' + BG + ' !important; color: ' + INK + '; }'
    + B + ' .topbar { background: ' + BG + ' !important; border-bottom: 0 !important; }'
    + B + ' .topbar > header { background: transparent !important; position: relative; }'
    /* header logo: black STORM, blue drop + sub line; no glow */
    + B + ' header .storm-logo-lit .sla-storm { filter: brightness(0) !important; }'
    + B + ' header .storm-logo-lit, ' + B + ' header .storm-logo-lit img { text-shadow: none !important; }'
    + B + ' header .storm-logo-lit .sll-back { background: transparent !important; box-shadow: none !important; }'
    + B + ' header .storm-logo-lit .sll-trace path { stroke: ' + BLUE + ' !important; }'
    + B + ' header img.logo { filter: none !important; }'
    + B + ' header .title, ' + B + ' header .sub { color: ' + INK + ' !important; text-shadow: none !important; }'
    /* round icon buttons in the corners */
    + B + ' #hamburger.hamburger { position: absolute !important; top: calc(12px + env(safe-area-inset-top)) !important; left: 14px !important; z-index: 5; ' + RB + ' }'
    + B + ' #hamburger.hamburger span { background: ' + INK + ' !important; width: 18px !important; height: 2px !important; }'
    + B + ' .toolbar .search-row { padding-left: 0 !important; gap: 0 !important; }'
    + B + ' .toolbar .search-row #search { flex: 1 1 auto; width: 100% !important; }'
    + B + ' header .storm-logo-lit { width: min(52vw, 200px) !important; filter: none !important; }'
    + B + ' #mode-switch.mode-switch { position: relative !important; top: auto !important; right: auto !important; left: auto !important; bottom: auto !important; z-index: 2; display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important; width: auto !important; min-width: 0 !important; max-width: none !important; height: 34px !important; margin: 8px auto 0 !important; padding: 0 14px 0 6px !important; border-radius: 17px !important; background: ' + CHIP + ' !important; border: 0 !important; box-shadow: none !important; color: ' + INK + ' !important; transform: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }'
    + B + ' #gd-find { position: absolute; top: calc(12px + env(safe-area-inset-top)); right: 14px; z-index: 5; display: flex; align-items: center; justify-content: center; padding: 0; ' + RB + ' -webkit-tap-highlight-color: transparent; }'
    + B + ' #gd-find svg { width: 20px; height: 20px; }'
    + B + ' #mode-switch .mode-word { color: ' + INK + ' !important; font-size: 13px !important; font-weight: 800 !important; text-shadow: none !important; opacity: 1 !important; }'
    + B + ' #mode-switch .mode-pill { background: #fff !important; border: 0 !important; box-shadow: inset 0 0 0 1.5px #CBD3DD !important; }'
    + B + ' #mode-switch.job-mode .mode-pill { background: ' + BLUE + ' !important; box-shadow: none !important; }'
    + B + ' #mode-switch .mode-knob { background: #fff !important; box-shadow: 0 1px 3px rgba(15,23,32,.25) !important; }'
    + B + ' #mode-switch:not(.job-mode) .mode-knob { background: ' + MUTE2 + ' !important; }'
    + B + ' #search { background: #fff !important; border: 0 !important; border-radius: 16px !important; box-shadow: ' + SH + ' !important; color: ' + INK + ' !important; }'
    + B + ' .toolbar .tabs { background: ' + CHIP + ' !important; border: 0 !important; border-radius: 16px !important; }'
    + B + ' .toolbar .tab { color: ' + MUTE + ' !important; }'
    + B + ' .toolbar .tab.active { background: #fff !important; color: ' + INK + ' !important; box-shadow: 0 1px 4px rgba(15,23,32,.12) !important; }'
    + B + ' .toolbar .tab .badge, ' + B + ' .toolbar .tab.active .badge { background: rgba(41,171,226,.14) !important; color: #1A8FC4 !important; }'
    /* in-app loading: same thin blue ring with rounded ends, spinning */
    + B + ' .gd-loading::before { content: ""; display: block; width: 34px; height: 34px; margin: 0 auto 10px; background: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 40 40\'><circle cx=\'20\' cy=\'20\' r=\'16\' fill=\'none\' stroke=\'%23E3E8EF\' stroke-width=\'4\'/><circle cx=\'20\' cy=\'20\' r=\'16\' fill=\'none\' stroke=\'%2329ABE2\' stroke-width=\'4\' stroke-linecap=\'round\' stroke-dasharray=\'26 101\'/></svg>") center / contain no-repeat; animation: gdSpin .9s linear infinite; }'
    + '@keyframes gdSpin { to { transform: rotate(360deg); } }'
    + B + ' .gd-loading { text-align: center !important; color: ' + MUTE + ' !important; }'
    /* home summary card */
    + B + ' #tk-par { display: none !important; }'
    + B + ' #gd-sum { display: flex; align-items: center; gap: 16px; margin: 12px 14px 0; padding: 16px; background: #fff; border-radius: 18px; box-shadow: ' + SH + '; }'
    + B + ' #gd-sum[hidden] { display: none !important; }'
    + B + ' #gd-sum .gd-ring { flex: none; width: 76px; height: 76px; }'
    + B + ' #gd-sum .gd-t1 { font-size: 17px; font-weight: 800; color: ' + INK + '; }'
    + B + ' #gd-sum .gd-t2 { margin-top: 3px; font-size: 13.5px; color: ' + MUTE + '; }'
    + B + ' #gd-sum .gd-t3 { margin-top: 3px; font-size: 13.5px; font-weight: 700; color: #C2410C; }'
    + B + ' #gd-sum .gd-t3:empty { display: none; }'
    + B + ' #gd-chips { display: flex; gap: 8px; margin: 12px 0 0; padding: 2px 14px 4px; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }'
    + B + ' #gd-chips::-webkit-scrollbar { display: none; }'
    + B + ' #gd-chips button { flex: none; height: 36px; padding: 0 15px; border-radius: 18px; border: 0; background: #fff; color: ' + INK + '; font: 700 14px/36px inherit; font-family: inherit; box-shadow: 0 1px 3px rgba(15,23,32,.08); white-space: nowrap; -webkit-tap-highlight-color: transparent; }'
    + B + ' #gd-chips button.on { background: ' + BLUE + '; color: #fff; box-shadow: 0 4px 12px rgba(41,171,226,.3); }'
    /* two-column product grid */
    + B + ' #list { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px !important; padding: 0 14px !important; align-items: start; }'
    + B + ' #list > .cat-head { grid-column: 1 / -1; margin: 14px 2px 0 !important; }'
    + B + ' #list > :not(.card):not(.cat-head) { grid-column: 1 / -1; }'
    + B + ' #list .cat-head .cat-name { color: ' + MUTE2 + ' !important; }'
    + B + ' #list .cat-head .cat-count { background: rgba(41,171,226,.12) !important; color: #1A8FC4 !important; }'
    + B + ' #list > .card { margin: 0 !important; padding: 10px !important; min-width: 0; background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; display: flex !important; flex-direction: column !important; gap: 8px !important; }'
    + B + ' #list > .card.low, ' + B + ' #list > .card.out { box-shadow: ' + SH + ' !important; }'
    + B + ' #list > .card .card-main { position: relative; display: flex !important; flex-direction: column !important; gap: 8px !important; align-items: stretch !important; padding: 0 !important; }'
    + B + ' #list > .card .photo { width: 100% !important; height: auto !important; aspect-ratio: 1 / 1; max-width: none !important; flex: none !important; margin: 0 !important; border-radius: 14px !important; background: #F6F8FB !important; object-fit: contain !important; }'
    + B + ' #list > .card .info { min-width: 0; padding: 0 2px !important; }'
    + B + ' #list > .card .info .top { position: absolute; top: 6px; left: 6px; right: 6px; display: flex !important; justify-content: space-between; align-items: flex-start; pointer-events: none; margin: 0 !important; }'
    + B + ' #list > .card .info .top .bin, ' + B + ' #list > .card .info .top .supplier { display: none !important; }'
    + B + ' #list > .card .info .top .top-right { display: flex !important; gap: 4px; align-items: center; margin-left: auto; }'
    + B + ' #list > .card .info .top .flag { display: none !important; }'
    + B + ' #list > .card .supplier-logo { height: 18px !important; width: auto !important; max-width: 64px !important; padding: 2px 5px !important; border-radius: 7px !important; background: rgba(255,255,255,.92) !important; box-shadow: 0 1px 3px rgba(15,23,32,.12) !important; }'
    + B + ' #list > .card .name { font-size: 14px !important; line-height: 1.25 !important; font-weight: 800 !important; color: ' + INK + ' !important; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; overflow-wrap: anywhere; }'
    + B + ' #list > .card .sku { margin-top: 2px !important; font-size: 12px !important; color: ' + MUTE2 + ' !important; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + B + ' #list > .card .price { font-size: 12.5px !important; color: ' + MUTE + ' !important; font-weight: 600 !important; }'
    + B + ' #list > .card .need-qty { font-size: 12px !important; color: #C2410C !important; font-weight: 700 !important; }'
    + B + ' #list > .card .ft-line, ' + B + ' #list > .card .ft-note { font-size: 12px !important; color: #1A8FC4 !important; }'
    /* count ring badge on the photo */
    + B + ' #list > .card .gd-badge { position: absolute; left: 0; top: 0; width: 100%; aspect-ratio: 1 / 1; box-sizing: border-box; padding: 6px; display: flex; align-items: flex-end; justify-content: flex-end; pointer-events: none; z-index: 1; }'
    + B + ' #list > .card .gd-badge svg { filter: drop-shadow(0 1px 3px rgba(15,23,32,.2)); }'
    + B + ' #list > .card .gd-badge svg { display: block; width: 40px; height: 40px; }'
    /* card controls, compact */
    + B + ' #list > .card .controls { display: flex !important; flex-wrap: wrap !important; gap: 6px !important; margin: 0 !important; padding: 0 !important; }'
    + B + ' #list > .card .controls .stepper { flex: 1 1 100% !important; justify-content: space-between !important; gap: 4px !important; background: ' + BG + ' !important; border-radius: 22px !important; padding: 3px !important; }'
    + B + ' #list > .card .step { width: 36px !important; height: 36px !important; border: 0 !important; border-radius: 50% !important; background: #fff !important; color: ' + INK + ' !important; font-size: 21px !important; box-shadow: 0 1px 2px rgba(15,23,32,.1) !important; }'
    + B + ' #list > .card .step[data-act="plus"] { background: ' + BLUE + ' !important; color: #fff !important; }'
    + B + ' #list > .card .count { flex: 1 1 auto; width: 40px !important; min-width: 0; height: 36px !important; font-size: 18px !important; color: ' + INK + ' !important; background: transparent !important; }'
    + B + ' #list > .card .ft-tag { color: ' + MUTE + ' !important; }'
    + B + ' #list > .card .details-btn { display: none !important; }'
    + B + ' #list > .card .par { flex: 1 1 100% !important; order: 3; min-height: 32px !important; height: auto !important; padding: 4px 8px !important; margin: 0 !important; font-size: 12px !important; font-weight: 700 !important; border: 0 !important; border-radius: 16px !important; background: ' + BG + ' !important; color: ' + MUTE + ' !important; }'
    + B + ' #list > .card .pick-add, ' + B + ' #list > .card .order { min-height: 34px !important; height: auto !important; margin: 0 !important; padding: 4px 6px !important; font-size: 12.5px !important; border-radius: 17px !important; white-space: nowrap; }'
    + B + ' #list > .card .pick-add { flex: 1 1 0 !important; order: 2; border: 1.5px solid #D5DCE5 !important; background: #fff !important; color: ' + INK + ' !important; }'
    + B + ' #list > .card .pick-add.in-list { border-color: ' + BLUE + ' !important; background: rgba(41,171,226,.1) !important; color: #1A8FC4 !important; }'
    + B + ' #list > .card .order { flex: 0 0 auto !important; order: 2; padding: 4px 12px !important; background: ' + BLUE + ' !important; color: #fff !important; border: 0 !important; }'
    + B + ' #list > .card .ft-wrap, ' + B + ' #list > .card .ft-box { flex: 1 1 100% !important; }'
    /* floating buttons: white rounds, cart blue */
    + B + ' .fab-dock .scan-btn, ' + B + ' .fab-dock .pull-fab, ' + B + ' .fab-dock .quote-fab, ' + B + ' .fab-dock .lbl-fab { background: #fff !important; border: 0 !important; color: ' + INK + ' !important; box-shadow: 0 4px 14px rgba(15,23,32,.14) !important; border-radius: 50% !important; }'
    + B + ' .fab-dock #cart-fab.cart-fab { background: ' + BLUE + ' !important; color: #fff !important; border-radius: 50% !important; box-shadow: 0 6px 18px rgba(41,171,226,.38) !important; }'
    + B + ' .fab-dock .cart-fab-total { background: #fff !important; border: 0 !important; color: ' + INK + ' !important; box-shadow: 0 1px 4px rgba(15,23,32,.14) !important; }'
    + B + ' .fab-dock .cart-fab-count, ' + B + ' .fab-dock .pull-fab-count { background: ' + BLUE + ' !important; color: #fff !important; border: 2px solid #fff !important; }'
    + B + ' .fab-dock #cart-fab .cart-fab-count { background: ' + INK + ' !important; }'
    + B + ' .foot { color: ' + MUTE2 + ' !important; }'
    + B + ' .foot #refresh { background: #fff !important; border: 0 !important; box-shadow: ' + SH + ' !important; color: ' + INK + ' !important; border-radius: 18px !important; }'
    + B + ' #ver-badge.ver-badge, ' + B + ' .ver-badge { background: #fff !important; color: ' + MUTE + ' !important; border: 0 !important; box-shadow: 0 1px 4px rgba(15,23,32,.14) !important; text-shadow: none !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }'
    /* shared sheet chrome: centred black-text logo, round grey close */
    + B + ' #pull-sheet.tc, ' + B + ' #pick-sheet.tk, ' + B + ' #quote-sheet.quote-sheet { background: ' + BG + ' !important; border-top: 0 !important; box-shadow: 0 -8px 30px rgba(15,23,32,.16) !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-head { position: relative; display: flex !important; justify-content: center !important; align-items: center !important; min-height: 42px; }'
    + B + ' #pull-sheet.tc .tc-logo, ' + B + ' #pick-sheet.tk .tk-logo { height: 26px !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-close, ' + B + ' #pick-sheet.tk .pick-sheet-head .pick-sheet-close { position: absolute; right: 0; top: 50%; transform: translateY(-50%); ' + RB + ' padding: 0 !important; font-size: 26px !important; line-height: 42px !important; text-align: center; }'
    + B + ' #pick-sheet.tk .tk-headrow { position: relative; justify-content: center !important; min-height: 42px; }'
    + B + ' #pick-sheet.tk .pick-sheet-head h2 { color: ' + INK + ' !important; text-align: left; }'
    /* Pull List */
    + B + ' #pull-sheet.tc .tc-top { text-align: center; }'
    + B + ' #pull-sheet.tc .gd-pring { display: block; width: 132px; height: 132px; margin: 14px auto 2px; }'
    + B + ' #pull-sheet.tc.tc-empty .gd-pring { display: none; }'
    + B + ' #pull-sheet.tc .tc-name { margin-top: 8px !important; font-size: 22px !important; color: ' + INK + ' !important; }'
    + B + ' #pull-sheet.tc .tc-name.tc-none { color: ' + MUTE2 + ' !important; }'
    + B + ' #pull-sheet.tc .tc-addr { color: ' + MUTE + ' !important; }'
    + B + ' #pull-sheet.tc .tc-prog, ' + B + ' #pull-sheet.tc .tc-bar { display: none !important; }'
    + B + ' #pull-sheet.tc .tc-sum { color: ' + MUTE2 + ' !important; }'
    + B + ' #pull-sheet.tc .jc-in { background: #fff !important; border: 0 !important; box-shadow: ' + SH + ' !important; color: ' + INK + ' !important; border-radius: 14px !important; }'
    + B + ' #pull-sheet.tc .jc-find, ' + B + ' #pull-sheet.tc .jc-clear { background: #fff !important; border: 0 !important; color: ' + INK + ' !important; border-radius: 20px !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #pull-sheet.tc .pick-line, ' + B + ' #pick-sheet.tk .pick-line { background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #pull-sheet.tc .pick-line img { width: 42px !important; height: 42px !important; flex: 0 0 42px !important; border-radius: 50% !important; background: #F6F8FB !important; object-fit: cover; }'
    + B + ' #pull-sheet.tc .pick-line-name, ' + B + ' #pick-sheet.tk .pick-line-name { color: ' + INK + ' !important; }'
    + B + ' #pull-sheet.tc .pick-line-code, ' + B + ' #pick-sheet.tk .pick-line-code { color: ' + MUTE2 + ' !important; }'
    + B + ' #pull-sheet.tc .tc-ck, ' + B + ' #pick-sheet.tk .tk-ck { border-radius: 50% !important; border: 2px solid #C7D0DB !important; background: #fff !important; color: #fff !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done, ' + B + ' #pick-sheet.tk .pick-line.tk-done { opacity: 1 !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done .tc-ck, ' + B + ' #pick-sheet.tk .pick-line.tk-done .tk-ck { background: #5CC3EC !important; border-color: #5CC3EC !important; color: #fff !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done .pick-line-name, ' + B + ' #pick-sheet.tk .pick-line.tk-done .pick-line-name { color: #9AA3AF !important; text-decoration: line-through !important; text-decoration-thickness: 2px !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done img, ' + B + ' #pick-sheet.tk .pick-line.tk-done img { opacity: .55; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done .pull-qty b { color: #9AA3AF !important; }'
    + B + ' #pull-sheet.tc .pull-qty b { color: ' + BLUE + ' !important; font-size: 20px !important; }'
    + B + ' #pull-sheet.tc .pull-qty.gd-x b::before { content: "\\00d7"; font-weight: 700; margin-right: 1px; }'
    + B + ' #pull-sheet.tc .pull-qty.gd-x span { display: none !important; }'
    + B + ' #pull-sheet.tc .pull-qty span { color: ' + MUTE2 + ' !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-foot { background: ' + BG + ' !important; border-top: 0 !important; }'
    + B + ' #pull-sheet.tc .pull-print { background: #fff !important; border: 1.5px solid #D5DCE5 !important; color: ' + INK + ' !important; border-radius: 27px !important; }'
    + B + ' #pull-sheet.tc .pull-save { background: ' + BLUE + ' !important; color: #fff !important; border-radius: 27px !important; box-shadow: 0 6px 16px rgba(41,171,226,.32) !important; }'
    /* Order cart */
    + B + ' #pick-sheet.tk > .pick-sheet-head { background: transparent !important; }'
    + B + ' #pick-sheet.tk .tk-sub, ' + B + ' #pick-sheet.tk .tk-prog { color: ' + MUTE + ' !important; }'
    + B + ' #pick-sheet.tk .pick-step { border: 0 !important; background: ' + BG + ' !important; color: ' + INK + ' !important; }'
    + B + ' #pick-sheet.tk .pick-step[data-pick-inc] { background: ' + BLUE + ' !important; color: #fff !important; }'
    + B + ' #pick-sheet.tk .pick-copy, ' + B + ' #pick-sheet.tk .pick-open-rt, ' + B + ' #pick-sheet.tk .pick-open-hi { border-radius: 25px !important; }'
    + B + ' #pick-sheet.tk .pick-copy { background: #fff !important; border: 1.5px solid #D5DCE5 !important; color: ' + INK + ' !important; }'
    + B + ' #pick-sheet.tk #hd-copy-btn.pick-copy, ' + B + ' #pick-sheet.tk .pick-open-rt, ' + B + ' #pick-sheet.tk .pick-open-hi { background: ' + BLUE + ' !important; border: 0 !important; color: #fff !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot { background: ' + BG + ' !important; border-top: 0 !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot > div { color: ' + INK + ' !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot .pick-clear { background: #fff !important; border-radius: 25px !important; }'
    /* Item details */
    + B + ' #detail.detail-overlay { background: ' + BG + ' !important; }'
    + B + ' #detail.detail-overlay .detail-bar { background: ' + BG + ' !important; }'
    + B + ' #detail.detail-overlay .detail-bar .detail-close.st-back, ' + B + ' #detail.detail-overlay .detail-close { ' + RB + ' }'
    + B + ' #detail.detail-overlay img.detail-photo { background: #fff !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #detail.detail-overlay .detail-body > .controls.ctl-top, ' + B + ' #detail.detail-overlay .tk-dpar, ' + B + ' #detail.detail-overlay .detail-count { background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #detail.detail-overlay .controls .step { background: ' + BG + ' !important; border: 0 !important; color: ' + INK + ' !important; }'
    + B + ' #detail.detail-overlay .controls .step[data-detail-step="plus"] { background: ' + BLUE + ' !important; color: #fff !important; }'
    + B + ' #detail.detail-overlay .controls .order { border-radius: 28px !important; }'
    + B + ' #detail.detail-overlay .tk-dpar .tk-row b { color: ' + INK + ' !important; }'
    /* side menu */
    + B + ' #drawer.drawer { background: ' + BG + ' !important; border-right: 0 !important; box-shadow: 8px 0 30px rgba(15,23,32,.16) !important; }'
    + B + ' #drawer.drawer .drawer-close { ' + RB + ' }'
    + B + ' #drawer.drawer .drawer-item, ' + B + ' #drawer.drawer #drawer-labels > .drawer-section-head { background: #fff !important; border: 0 !important; border-radius: 16px !important; box-shadow: ' + SH + ' !important; color: ' + INK + ' !important; }'
    + B + ' #drawer.drawer .drawer-item .drawer-item-name { color: ' + INK + ' !important; }'
    + B + ' #drawer.drawer .drawer-supplier.open > .drawer-item, ' + B + ' #drawer.drawer #drawer-labels.expanded > .drawer-section-head { background: #E6F5FC !important; box-shadow: inset 0 0 0 1.5px ' + BLUE + ' !important; }'
    + B + ' #drawer.drawer .drawer-item > svg, ' + B + ' #drawer.drawer .drawer-item > .v116-ico, ' + B + ' #drawer.drawer .drawer-item > .drawer-chk-ico, ' + B + ' #drawer.drawer .drawer-item > .res-ico, ' + B + ' #drawer.drawer .drawer-section-head > .lbl-ico { background: ' + BG + ' !important; border: 0 !important; border-radius: 50% !important; color: ' + INK + ' !important; stroke: ' + INK + ' !important; }'
    + B + ' #drawer.drawer .drawer-item > svg *, ' + B + ' #drawer.drawer .drawer-item > .v116-ico *, ' + B + ' #drawer.drawer .drawer-item > .drawer-chk-ico *, ' + B + ' #drawer.drawer .drawer-section-head > .lbl-ico * { stroke: ' + INK + ' !important; }'
    + B + ' #drawer.drawer .drawer-item > img { background: #fff !important; }'
    + B + ' #drawer.drawer .drawer-cat, ' + B + ' #drawer.drawer .drawer-cat .drawer-item-name { color: #374151 !important; }'
    + B + ' #drawer.drawer .drawer-foot { border-top: 1px solid #DDE3EA !important; }'
    + B + ' #drawer.drawer .drawer-foot .drawer-jobber:not(.drawer-ccam) img { content: url("' + A + 'jobber-logo-clear.png"); }'
    + B + ' #drawer.drawer .drawer-foot .drawer-ccam img { content: url("' + A + 'companycam.png"); }'
    + B + ' #drawer.drawer .drawer-foot .st164-div { border-left-color: #CBD3DD !important; }'
    + B + ' .drawer-scrim, ' + B + ' #drawer-scrim { background: rgba(15,23,32,.28) !important; }'
    /* Find a Job + Jobber quote */
    + B + ' #job-find .jf-card { background: ' + BG + ' !important; border: 0 !important; }'
    + B + ' #job-find .jf-head { background: transparent !important; }'
    + B + ' #job-find .jf-x, ' + B + ' #quote-sheet .qs-x { ' + RB + ' }'
    + B + ' #job-find .jf-q { background: #fff !important; border: 0 !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #job-find .jf-item, ' + B + ' #job-find .jf-line, ' + B + ' #quote-sheet .qs-line { background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #job-find .jf-item[data-jf-jb] { box-shadow: inset 4px 0 0 ' + BLUE + ', ' + SH + ' !important; }'
    + B + ' #job-find .jf-btn, ' + B + ' #job-find .jf-back { background: #fff !important; border: 1.5px solid #D5DCE5 !important; color: ' + INK + ' !important; border-radius: 26px !important; }'
    + B + ' #job-find .jf-btn[data-jf-edit], ' + B + ' #job-find .jf-btn[data-jf-jb-load], ' + B + ' #job-find .jf-btn[data-jf-connect], ' + B + ' #job-find .jf-btn[data-jf-jb-retry] { background: ' + BLUE + ' !important; border: 0 !important; color: #fff !important; }'
    + B + ' #job-find .tk-av { color: #fff !important; }'
    + B + ' #quote-sheet .qs-logo { background: transparent !important; }'
    + B + ' #quote-sheet .qs-logo img, ' + B + ' #quote-sheet img.qs-jobber { filter: none !important; }'
    + B + ' #quote-sheet .qs-btn { border-radius: 26px !important; color: #fff !important; }'
    + B + ' #quote-sheet .qs-total { background: ' + BG + ' !important; border-top: 0 !important; }'
    /* drawer pages */
    + B + ' #res-list .bl-card, ' + B + ' #res-view .bl-card, ' + B + ' #labels .bl-card, ' + B + ' #lbl-view .bl-card, ' + B + ' #lbl-detail .bl-card, ' + B + ' #chk-view .bl-card { background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }'
    + ['#res-list', '#res-view', '#labels', '#lbl-view', '#lbl-detail', '#chk-view'].map(function (o) { return B + ' ' + o + ' .detail-bar'; }).join(', ') + ' { background: ' + BG + ' !important; border-bottom: 0 !important; }'
    + ['#res-list', '#res-view', '#labels', '#lbl-view', '#lbl-detail', '#chk-view'].map(function (o) { return B + ' ' + o + ' .detail-close'; }).join(', ') + ' { ' + RB + ' }'
    + B + ' .res-card, ' + B + ' .res-link-card { background: #fff !important; border: 0 !important; border-radius: 18px !important; box-shadow: ' + SH + ' !important; }';
  document.head.appendChild(st);

  /* black-text STORM logo wherever the app showed the white-text one */
  function relogo(root) {
    (root || document).querySelectorAll('img[src*="STORM-logo-color-transparent"], img[src*="STORM-logo-color-on-black"]').forEach(function (im) {
      if (im.closest('.res-card, .res-view-img, .res-stage, .res-lthumb')) return; /* the Logos page still shows every logo file as it is */
      im.src = LOGO;
    });
  }

  /* ring svg: value 0..1, colour, centre text */
  function ring(size, stroke, frac, color, track, big, small) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r, on = Math.max(0, Math.min(1, frac)) * c;
    var arc = on > 0.5;
    var s = '<svg viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="#fff" stroke="' + track + '" stroke-width="' + stroke + '"/>'
      + (arc ? '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + on.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/>' : '');
    if (small) s += '<text x="50%" y="' + (size * 0.47) + '" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-weight="800" font-size="' + (size * 0.22) + '" fill="' + INK + '">' + big + '</text>'
      + '<text x="50%" y="' + (size * 0.66) + '" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-weight="800" font-size="' + (size * 0.085) + '" letter-spacing="1.5" fill="' + MUTE2 + '">' + small + '</text>';
    else s += '<text x="50%" y="52%" text-anchor="middle" dominant-baseline="middle" font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif" font-weight="800" font-size="' + (String(big).length > 2 ? size * 0.3 : size * 0.38) + '" fill="' + INK + '">' + big + '</text>';
    return s + '</svg>';
  }

  /* ---- Inventory home: summary card, supplier chips, ring badges ---- */
  var SUPS = ['All', 'Home Depot', 'RichTech', 'Hilti', 'AutoZone'];
  function curSupplier() { try { return supplier; } catch (e) { return 'All'; } }
  function home() {
    var list = document.getElementById('list'); if (!list) return;
    var sum = document.getElementById('gd-sum'), chips = document.getElementById('gd-chips');
    if (!sum) {
      sum = document.createElement('div'); sum.id = 'gd-sum'; sum.hidden = true;
      sum.innerHTML = '<div class="gd-ring"></div><div><div class="gd-t1">Stocked to par</div><div class="gd-t2"></div><div class="gd-t3"></div></div>';
      list.parentNode.insertBefore(sum, list);
    }
    if (!chips) {
      chips = document.createElement('div'); chips.id = 'gd-chips'; chips.setAttribute('role', 'tablist');
      chips.innerHTML = SUPS.map(function (s) { return '<button type="button" data-gd-sup="' + s + '">' + s + '</button>'; }).join('');
      list.parentNode.insertBefore(chips, list);
    }
    var cur = curSupplier();
    chips.querySelectorAll('[data-gd-sup]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-gd-sup') === cur); });
    var seen = {}, tot = 0, ok = 0, low = 0, out = 0;
    list.querySelectorAll('.card[data-bin]').forEach(function (c) {
      var bin = c.getAttribute('data-bin');
      var it = null; try { it = findItem(bin); } catch (e) {}
      var inp = c.querySelector('input.count'), v = inp && inp.value !== '' ? Number(inp.value) : (it && it.onHand != null ? Number(it.onHand) : null);
      var par = it && it.par != null ? Number(it.par) : 0;
      var st = v === 0 ? 'out' : (c.classList.contains('low') || (par > 0 && v != null && v < par) ? 'low' : 'ok');
      var host = c.querySelector('.card-main'), info = host && host.querySelector('.info');
      if (host && info) {
        var bd = host.querySelector(':scope > .gd-badge');
        if (!bd) { bd = document.createElement('span'); bd.className = 'gd-badge'; host.insertBefore(bd, info); }
        var key = st + '|' + v + '|' + par;
        if (bd.__k !== key && !bd.__cl) { /* v197: once the v179 ring owns this badge, this older v178 pass leaves it alone (it read the order box as on hand, so the ring flashed a wrong value) */
          bd.__k = key;
          var frac = st === 'out' ? 0 : (st === 'low' ? (par > 0 ? Math.max(.12, Math.min(.92, v / par)) : .5) : 1);
          bd.innerHTML = ring(40, 4, frac, st === 'low' ? '#F59E0B' : BLUE, st === 'out' ? '#C7CED8' : '#E3E8EF', v == null ? '\u2013' : v);
        }
      }
      if (seen[bin]) return; seen[bin] = 1;
      if (!(par > 0)) return;
      tot++;
      if (v != null && v >= par) ok++;
      if (st === 'out') out++; else if (st === 'low') low++;
    });
    var hid197 = !tot || list.offsetParent === null; if (sum.hidden !== hid197) sum.hidden = hid197; /* v197: only touch it when it changes */
    if (tot && !sum.__cl) { /* v197: v179 owns the summary ring once it has drawn it; redrawing it here flashed the top graph on Add to Order and on saves */
      var pct = Math.round(ok / tot * 100);
      sum.querySelector('.gd-ring').innerHTML = ring(76, 8, ok / tot, BLUE, '#E3E8EF', pct + '%');
      sum.querySelector('.gd-t2').textContent = ok + ' of ' + tot + ' line' + (tot === 1 ? '' : 's') + ' full';
      var bits = []; if (low) bits.push(low + ' low'); if (out) bits.push(out + ' out');
      sum.querySelector('.gd-t3').textContent = bits.join(' \u00b7 ');
    }
    var cd197 = list.offsetParent === null ? 'none' : ''; if (chips.style.display !== cd197) chips.style.display = cd197;
  }
  document.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('[data-gd-sup]'); if (!b) return;
    try { setSupplier(b.getAttribute('data-gd-sup')); } catch (x) {}
    soon();
  });
  document.addEventListener('input', function (e) { if (e.target && e.target.matches && e.target.matches('#list input.count')) soon(); }, true);
  var t = 0; function soon() { clearTimeout(t); t = setTimeout(function () { try { home(); } catch (e) {} }, 90); }

  /* loading messages ("Loading inventory...", "Loading quote...", "Loading saved jobs...", "Loading Jobber jobs...") get the spinning ring */
  var LSEL = '#loading, .jf-empty, .qs-note, .jqf-empty';
  function loaders() { document.querySelectorAll(LSEL).forEach(function (el) { el.classList.toggle('gd-loading', /^\s*Loading\b/i.test(el.textContent || '') && el.offsetParent !== null || (el.id === 'loading' && el.style.display !== 'none' && /Loading/.test(el.textContent))); }); }
  var lq = 0; new MutationObserver(function () { if (lq) return; lq = requestAnimationFrame(function () { lq = 0; try { loaders(); } catch (e) {} }); }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
  loaders();

  /* round search button top-right: brings the search box up and focuses it */
  function findBtn() {
    var hd = document.querySelector('.topbar > header'); if (!hd || document.getElementById('gd-find')) return;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'gd-find'; b.setAttribute('aria-label', 'Search');
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
    hd.appendChild(b);
    b.addEventListener('click', function () { var q = document.getElementById('search'); if (!q) return; window.scrollTo(0, 0); try { q.focus({ preventScroll: true }); } catch (e) { q.focus(); } });
  }

  /* ---- Pull List: ring + x2 ---- */
  function pull() {
    var sh = document.getElementById('pull-sheet'); if (!sh || !sh.classList.contains('tc')) return;
    relogo(sh);
    var top = sh.querySelector('.tc-top'), nm = top && top.querySelector('.tc-name'); if (!nm) return;
    var rg = top.querySelector('.gd-pring');
    if (!rg) { rg = document.createElement('div'); rg.className = 'gd-pring'; top.insertBefore(rg, nm); }
    var n = sh.querySelector('.tc-prog-n'), m = n ? /(\d+)\D+(\d+)/.exec(n.textContent) : null;
    var done = m ? +m[1] : 0, tot = m ? +m[2] : 0, key = done + '/' + tot;
    if (rg.__k !== key) { rg.__k = key; rg.innerHTML = ring(132, 11, tot ? done / tot : 0, BLUE, '#E3E8EF', key, 'LOADED'); }
    var ad = top.querySelector('.tc-addr'); if (ad && /Jobber #/.test(ad.textContent)) ad.textContent = ad.textContent.replace('Jobber #', '#');
    sh.querySelectorAll('.pull-qty').forEach(function (q) { var s = q.querySelector('span'); q.classList.toggle('gd-x', !!s && /^qty$/i.test(s.textContent.trim())); });
  }
  function watch(id, fn, flag) {
    var el = document.getElementById(id); if (!el || el[flag]) return !!el;
    el[flag] = true;
    new MutationObserver(function () { setTimeout(function () { try { fn(); } catch (e) {} }, 0); }).observe(el, { childList: true, subtree: true, characterData: true });
    try { fn(); } catch (e) {}
    return true;
  }
  function attach() {
    try { findBtn(); } catch (e) {}
    var a = watch('list', function () { soon(); }, '__gd178');
    var b = watch('pull-sheet', pull, '__gd178');
    watch('pick-sheet', function () { relogo(document.getElementById('pick-sheet')); }, '__gd178');
    return a && b;
  }
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 80) return; setTimeout(poll, 250); })(); }
  new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) { var nd = ms[i].addedNodes[j]; if (nd.nodeType === 1) relogo(nd); } }).observe(document.body, { childList: true });
  relogo();
})();

/* v179 (Hark, 2026-11-10, Dave approved the "clean" concept): Phase 1 restyle, UI only. No data, Sheet, Jobber or stock changes.
   Calm, grown-up look on top of v178 Glow Day: page #EAF0F7, white cards with ~14px corners and a soft shadow, Montserrat bold type,
   one accent (STORM blue #29A8E0), amber only for low/short, red only for out. Everything here is CSS plus small DOM additions;
   every base global and every existing button/handler is kept (originals are hidden and proxied, never removed).
   - Side menu: STORM drop logo + "Inventory", a card with the stocked-to-par ring (from items[].onHand / par), rows Home and Pull List,
     then Staging, Truck Check, Restock, Job Wrap-up, Crew Day with a grey "Soon" tag (not tappable), CATEGORIES with live counts,
     the existing sections (Products by supplier, Quote Templates, Checklists, Resource Center) under MORE, Jobber + CompanyCam, version.
   - Home: same data and behaviour; the summary ring and the photo badges read on hand from items[].onHand (v178 read the order stepper).
   - Pull List, Item details, Cart: restyled; Cart groups by supplier with a Copy pill per group (proxies the original copy buttons),
     Clear in red and the one "Copy & open RichTech" button in the foot. */
(function () {
  if (document.getElementById('storm-v179-css')) return;
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var BG = '#EAF0F7', INK = '#0F1720', MUTE = '#6B7280', MUTE2 = '#8A94A3', BLUE = '#29A8E0', BLUED = '#1A8FC4', AMBER = '#D97706', AMB = '#F59E0B', RED = '#DC2626', LINE = '#DCE4EE', TRACK = '#E1E8F0';
  var R = '14px', SH = '0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06)';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  try {
    if (!document.getElementById('cl-font')) {
      var lk = document.createElement('link'); lk.id = 'cl-font'; lk.rel = 'stylesheet';
      lk.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap';
      document.head.appendChild(lk);
    }
  } catch (e) {}
  document.body.classList.add('cl');
  var B = 'html body.cl';
  var RB = 'width: 42px !important; height: 42px !important; border-radius: 50% !important; background: #fff !important; border: 0 !important; box-shadow: ' + SH + ' !important; color: ' + INK + ' !important;';
  var ICO = {
    home: '<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
    pull: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1"/><path d="M8.5 10.5l1.5 1.5 3-3"/><path d="M8.5 16h7"/>',
    staging: '<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    truck: '<path d="M2 6h11v10H2z"/><path d="M13 9h4l4 4v3h-8"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
    restock: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>',
    wrap: '<path d="M4 7l8-4 8 4v10l-8 4-8-4z"/><path d="M4 7l8 4 8-4"/><path d="M12 11v10"/>',
    crew: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
    print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>'
  };
  function ico(k, cls) { return '<svg class="' + (cls || 'cl-ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + ICO[k] + '</svg>'; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function ring(size, stroke, frac, color, track, big, small) {
    var r = (size - stroke) / 2, c = 2 * Math.PI * r, on = Math.max(0, Math.min(1, frac)) * c, h = size / 2;
    var s = '<svg data-cl="1" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true"><circle cx="' + h + '" cy="' + h + '" r="' + r + '" fill="#fff" stroke="' + track + '" stroke-width="' + stroke + '"/>'
      + (on > 0.5 ? '<circle cx="' + h + '" cy="' + h + '" r="' + r + '" fill="none" stroke="' + color + '" stroke-width="' + stroke + '" stroke-linecap="round" stroke-dasharray="' + on.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 ' + h + ' ' + h + ')"/>' : '');
    var ff = "Montserrat,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif";
    if (small) s += '<text x="50%" y="' + (size * 0.46) + '" text-anchor="middle" dominant-baseline="middle" font-family="' + ff + '" font-weight="800" font-size="' + (size * (String(big).length > 4 ? 0.19 : 0.23)) + '" fill="' + INK + '">' + big + '</text>'
      + '<text x="50%" y="' + (size * 0.67) + '" text-anchor="middle" dominant-baseline="middle" font-family="' + ff + '" font-weight="700" font-size="' + (size * 0.09) + '" letter-spacing="1.2" fill="' + MUTE2 + '">' + small + '</text>';
    else s += '<text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" font-family="' + ff + '" font-weight="800" font-size="' + (String(big).length > 3 ? size * 0.25 : String(big).length > 2 ? size * 0.29 : size * 0.36) + '" fill="' + INK + '">' + big + '</text>';
    return s + '</svg>';
  }
  function allItems() { try { return Array.isArray(items) ? items : []; } catch (e) { return []; } }
  function find(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function isJob() { var m = document.getElementById('mode-switch'); return !!(m && m.classList.contains('job-mode')); }
  /* stocked to par, from the sheet's on-hand and par (one bin counted once) */
  function parStats() {
    var seen = {}, tot = 0, ok = 0, low = 0, out = 0;
    allItems().forEach(function (it) {
      if (!it || seen[it.bin]) return; seen[it.bin] = 1;
      var par = it.par != null ? Number(it.par) : 0; if (!(par > 0)) return;
      tot++;
      var v = it.onHand == null || it.onHand === '' ? null : Number(it.onHand);
      if (v != null && v >= par) ok++; else if (v === 0 || v == null) out++; else low++;
    });
    return { tot: tot, ok: ok, low: low, out: out, pct: tot ? Math.round(ok / tot * 100) : 0 };
  }
  function itemState(it) {
    var par = it && it.par != null ? Number(it.par) : 0, v = it && it.onHand != null && it.onHand !== '' ? Number(it.onHand) : null;
    if (v === 0) return 'out';
    if (par > 0 && v != null && v < par) return 'low';
    return v == null ? 'none' : 'ok';
  }
  function verText() { var f = document.querySelector('.foot'); var m = f ? /Inventory\s*·\s*v(\d+)/.exec(f.textContent || '') : null; return m ? 'Inventory · v' + m[1] : ''; }

  var st = document.createElement('style'); st.id = 'storm-v179-css';
  st.textContent = ''
    /* type + page */
    + B + ', ' + B + ' button, ' + B + ' input, ' + B + ' select, ' + B + ' textarea { font-family: ' + FONT + ' !important; }'
    + 'html, ' + B + ' { background: ' + BG + ' !important; color: ' + INK + '; -webkit-font-smoothing: antialiased; }'
    + B + ' .topbar { background: ' + BG + ' !important; }'
    /* header */
    + B + ' #hamburger.hamburger, ' + B + ' #gd-find { ' + RB + ' }'
    + B + ' #hamburger.hamburger span { height: 2px !important; width: 17px !important; border-radius: 2px; }'
    + B + ' header .storm-logo-lit { width: min(40vw, 156px) !important; }'
    + B + ' #mode-switch.mode-switch { position: relative !important; height: 38px !important; width: 196px !important; padding: 3px !important; gap: 0 !important; border-radius: 19px !important; background: #fff !important; box-shadow: ' + SH + ' !important; overflow: hidden; }'
    + B + ' #mode-switch .mode-word { display: none !important; }'
    + B + ' #mode-switch .mode-pill { position: absolute !important; inset: 3px !important; width: auto !important; height: auto !important; background: transparent !important; box-shadow: none !important; border: 0 !important; border-radius: 16px !important; margin: 0 !important; }'
    + B + ' #mode-switch .mode-knob { position: absolute !important; top: 0 !important; bottom: 0 !important; left: 0 !important; right: auto !important; width: 50% !important; height: auto !important; border-radius: 16px !important; background: ' + BLUE + ' !important; box-shadow: 0 2px 8px rgba(41,168,224,.30) !important; transform: translateX(100%) !important; transition: transform .32s cubic-bezier(.3,.7,.2,1) !important; }'
    + B + ' #mode-switch.job-mode .mode-knob { transform: translateX(0) !important; }'
    + B + ' #mode-switch .cl-seg { position: relative; z-index: 1; flex: 1 1 50%; text-align: center; font-size: 14px; font-weight: 700; line-height: 32px; color: ' + INK + '; transition: color .25s; pointer-events: none; }'
    + B + ' #mode-switch:not(.job-mode) .cl-seg-inv, ' + B + ' #mode-switch.job-mode .cl-seg-job { color: #fff; }'
    /* search + tabs */
    + B + ' #search { height: 44px !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; font-size: 15px !important; font-weight: 500; }'
    + B + ' .toolbar .tabs { background: ' + TRACK + ' !important; border-radius: ' + R + ' !important; padding: 3px !important; }'
    + B + ' .toolbar .tab { border-radius: 11px !important; font-weight: 600 !important; font-size: 14px !important; }'
    + B + ' .toolbar .tab.active { font-weight: 700 !important; box-shadow: 0 1px 3px rgba(15,23,32,.10) !important; }'
    + B + ' .toolbar .tab .badge, ' + B + ' .toolbar .tab.active .badge { background: rgba(41,168,224,.12) !important; color: ' + BLUED + ' !important; font-weight: 700 !important; }'
    /* summary card + chips */
    + B + ' #gd-sum { margin: 14px 14px 0 !important; padding: 16px 18px !important; gap: 18px !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #gd-sum .gd-ring { width: 74px !important; height: 74px !important; }'
    + B + ' #gd-sum .gd-t1 { font-size: 18px !important; font-weight: 800 !important; letter-spacing: -.01em; }'
    + B + ' #gd-sum .gd-t2 { font-size: 13.5px !important; font-weight: 500; }'
    + B + ' #gd-sum .gd-t3 { font-size: 13.5px !important; color: ' + AMBER + ' !important; }'
    + B + ' #gd-sum .gd-t3 .cl-out { color: ' + RED + '; }'
    + B + ' #gd-chips { gap: 8px !important; margin-top: 14px !important; }'
    + B + ' #gd-chips button { height: 36px !important; padding: 0 16px !important; border-radius: 18px !important; background: #fff !important; color: ' + INK + ' !important; font-weight: 600 !important; font-size: 14px !important; line-height: 34px !important; border: 1px solid ' + LINE + ' !important; box-shadow: none !important; }'
    + B + ' #gd-chips button.on { background: ' + BLUE + ' !important; border-color: ' + BLUE + ' !important; color: #fff !important; box-shadow: 0 2px 8px rgba(41,168,224,.28) !important; }'
    /* list + cards */
    + B + ' #list { gap: 12px !important; }'
    + B + ' #list > .cat-head { margin: 18px 2px 2px !important; }'
    + B + ' #list .cat-head .cat-name { color: ' + MUTE2 + ' !important; font-size: 12.5px !important; font-weight: 700 !important; letter-spacing: .08em !important; text-transform: uppercase; }'
    + B + ' #list .cat-head .cat-count { background: rgba(41,168,224,.12) !important; color: ' + BLUED + ' !important; font-weight: 700 !important; }'
    + B + ' #list > .card { padding: 10px 10px 12px !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; gap: 10px !important; }'
    + B + ' #list > .card .photo { border-radius: 10px !important; background: #fff !important; }'
    + B + ' #list > .card .name { font-size: 14px !important; font-weight: 700 !important; letter-spacing: -.005em; }'
    + B + ' #list > .card .sku { font-size: 12px !important; font-weight: 500; color: ' + MUTE2 + ' !important; }'
    + B + ' #list > .card .price { font-size: 12.5px !important; font-weight: 600 !important; color: ' + MUTE + ' !important; }'
    + B + ' #list > .card .need-qty { color: ' + AMBER + ' !important; font-weight: 700 !important; }'
    + B + ' #list > .card .supplier-logo { display: none !important; }'
    + B + ' #list > .card .gd-badge svg { width: 38px !important; height: 38px !important; filter: drop-shadow(0 1px 2px rgba(15,23,32,.14)) !important; }'
    + B + ' #list > .card .controls { gap: 6px !important; }'
    + B + ' #list > .card .controls .stepper { background: ' + BG + ' !important; border-radius: 12px !important; padding: 3px !important; }'
    + B + ' #list > .card .step { width: 34px !important; height: 34px !important; border-radius: 10px !important; background: #fff !important; color: ' + INK + ' !important; font-size: 19px !important; box-shadow: 0 1px 2px rgba(15,23,32,.08) !important; }'
    + B + ' #list > .card .step[data-act="plus"] { background: #fff !important; color: ' + BLUED + ' !important; }'
    + B + ' #list > .card .count { height: 34px !important; font-size: 16px !important; font-weight: 700 !important; }'
    + B + ' #list > .card .par { min-height: 28px !important; padding: 2px 6px !important; border-radius: 10px !important; background: transparent !important; color: ' + MUTE + ' !important; font-weight: 600 !important; font-size: 12px !important; text-align: left; }'
    + B + ' #list > .card .pick-add, ' + B + ' #list > .card .order { min-height: 34px !important; border-radius: 12px !important; font-weight: 700 !important; font-size: 12.5px !important; }'
    + B + ' #list > .card .pick-add { border: 1px solid ' + LINE + ' !important; }'
    + B + ' #list > .card .pick-add.in-list { border-color: rgba(41,168,224,.45) !important; background: rgba(41,168,224,.08) !important; color: ' + BLUED + ' !important; }'
    + B + ' #list > .card .order { background: ' + BLUE + ' !important; }'
    /* floating buttons */
    + B + ' .fab-dock #cart-fab.cart-fab { background: #fff !important; color: ' + INK + ' !important; box-shadow: 0 4px 16px rgba(15,23,32,.16) !important; }'
    + B + ' .fab-dock #cart-fab .cart-fab-count, ' + B + ' .fab-dock .pull-fab-count { background: ' + BLUE + ' !important; color: #fff !important; border: 2px solid #fff !important; font-weight: 700 !important; }'
    + B + ' .fab-dock .cart-fab-total { font-weight: 700 !important; }'
    + B + ' .foot #refresh { border-radius: ' + R + ' !important; font-weight: 600 !important; }'
    /* ---- side menu ---- */
    + B + ' #drawer.drawer { background: ' + BG + ' !important; border-radius: 0 22px 22px 0 !important; padding-bottom: 0 !important; }'
    + B + ' #drawer.drawer > .drawer-head { position: absolute !important; top: calc(10px + env(safe-area-inset-top)); right: 10px; z-index: 3; padding: 0 !important; margin: 0 !important; background: transparent !important; border: 0 !important; min-height: 0 !important; }'
    + B + ' #drawer.drawer > .drawer-head > img { display: none !important; }'
    + B + ' #drawer.drawer .drawer-close { width: 36px !important; height: 36px !important; border-radius: 50% !important; background: #fff !important; border: 0 !important; box-shadow: ' + SH + ' !important; color: ' + MUTE + ' !important; font-size: 22px !important; line-height: 36px !important; padding: 0 !important; }'
    + B + ' #cl-menu { padding: calc(22px + env(safe-area-inset-top)) 16px 4px; }'
    + B + ' #cl-menu .cl-brand { display: flex; flex-direction: column; align-items: center; gap: 6px; margin: 4px 0 18px; }'
    + B + ' #cl-menu .cl-lock { display: flex; align-items: center; gap: 7px; height: 30px; }'
    + B + ' #cl-menu .cl-lock .cl-drop { height: 30px; width: auto; }'
    + B + ' #cl-menu .cl-lock .cl-word { height: 22px; width: auto; filter: brightness(0); }'
    + B + ' #cl-menu .cl-lock { height: 40px; } ' + B + ' #cl-menu .cl-lock img.cl-full198 { height: 40px; width: auto; filter: none; display: block; }' /* v198: full logo, blue BASEMENT WATERPROOFING */
    + B + ' #cl-menu .cl-brand-sub { font-size: 13px; font-weight: 700; color: ' + MUTE + '; letter-spacing: .02em; }'
    + B + ' #cl-menu .cl-par { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: #fff; border-radius: ' + R + '; box-shadow: ' + SH + '; margin-bottom: 14px; }'
    + B + ' #cl-menu .cl-par[hidden] { display: none; }'
    + B + ' #cl-menu .cl-par .cl-pring { flex: none; width: 60px; height: 60px; }'
    + B + ' #cl-menu .cl-par .cl-pring svg { display: block; width: 100%; height: 100%; }'
    + B + ' #cl-menu .cl-par-t1 { font-size: 16px; font-weight: 800; color: ' + INK + '; }'
    + B + ' #cl-menu .cl-par-t2 { margin-top: 2px; font-size: 12.5px; font-weight: 500; color: ' + MUTE + '; }'
    + B + ' #cl-menu .cl-par-t3 { margin-top: 2px; font-size: 12.5px; font-weight: 700; color: ' + AMBER + '; }'
    + B + ' #cl-menu .cl-par-t3:empty { display: none; }'
    + B + ' #cl-menu .cl-par-t3 .cl-out { color: ' + RED + '; }'
    + B + ' #cl-menu .cl-row { display: flex; align-items: center; gap: 14px; width: 100%; min-height: 46px; padding: 0 12px; margin: 0 0 2px; border: 0; border-radius: 12px; background: transparent; color: ' + INK + '; font-size: 16px; font-weight: 700; text-align: left; -webkit-tap-highlight-color: transparent; }'
    + B + ' #cl-menu button.cl-row:active { background: rgba(41,168,224,.10); }'
    + B + ' #cl-menu .cl-row.cl-on { background: #fff; box-shadow: ' + SH + '; }'
    + B + ' #cl-menu .cl-row .cl-ico { flex: none; width: 24px; height: 24px; color: ' + BLUE + '; }'
    + B + ' #cl-menu .cl-row .cl-name { flex: 1 1 auto; min-width: 0; }'
    + B + ' #cl-menu .cl-row.cl-soon { color: ' + MUTE2 + '; cursor: default; pointer-events: none; }'
    + B + ' #cl-menu .cl-row.cl-soon .cl-ico { color: #A9C9DA; }'
    + B + ' #cl-menu .cl-tag { flex: none; padding: 2px 8px; border-radius: 8px; background: ' + TRACK + '; color: ' + MUTE + '; font-size: 11px; font-weight: 700; letter-spacing: .03em; }'
    + B + ' #cl-menu .cl-lbl, ' + B + ' #cl-more-lbl { margin: 18px 12px 6px; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; color: ' + MUTE2 + '; }'
    + B + ' #cl-menu .cl-cats { background: #fff; border-radius: ' + R + '; box-shadow: ' + SH + '; padding: 4px 0; }'
    + B + ' #cl-menu .cl-cat { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 42px; padding: 0 16px; border: 0; background: transparent; color: ' + INK + '; font-size: 14.5px; font-weight: 600; text-align: left; -webkit-tap-highlight-color: transparent; }'
    + B + ' #cl-menu .cl-cat + .cl-cat { border-top: 1px solid #EEF2F6; }'
    + B + ' #cl-menu .cl-cat:active { background: rgba(41,168,224,.08); }'
    + B + ' #cl-menu .cl-cat.cl-on { color: ' + BLUED + '; }'
    + B + ' #cl-menu .cl-cat span:first-child { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + B + ' #cl-menu .cl-cat .cl-n { flex: none; color: ' + MUTE2 + '; font-weight: 600; font-size: 13px; }'
    /* MORE: the existing sections as quiet rows */
    + B + ' #cl-more { margin: 0 16px; background: #fff; border-radius: ' + R + '; box-shadow: ' + SH + '; padding: 4px 0; overflow: hidden; }'
    + B + ' #cl-more > .drawer-section { margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; }'
    + B + ' #cl-more > .drawer-section + .drawer-section { border-top: 1px solid #EEF2F6 !important; }'
    + B + ' #cl-more .drawer-section-head { display: flex !important; align-items: center !important; gap: 10px !important; width: 100% !important; min-height: 44px !important; margin: 0 !important; padding: 0 16px !important; background: transparent !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; color: ' + INK + ' !important; font-size: 14.5px !important; font-weight: 700 !important; letter-spacing: 0 !important; text-transform: none !important; }'
    + B + ' #cl-more .drawer-section-head .drawer-chevron { margin-left: auto !important; color: ' + MUTE2 + ' !important; }'
    + B + ' #cl-more .drawer-section-head img.drawer-qt-logo { height: 18px !important; width: auto !important; }'
    + B + ' #cl-more .drawer-items { padding: 0 8px !important; }'
    + B + ' #cl-more .drawer-item, ' + B + ' #cl-more #drawer-labels > .drawer-section-head { min-height: 40px !important; margin: 0 0 2px !important; padding: 0 10px !important; background: transparent !important; border: 0 !important; border-radius: 10px !important; box-shadow: none !important; font-size: 14px !important; font-weight: 600 !important; }'
    + B + ' #cl-more .drawer-item .drawer-item-name { font-size: 14px !important; font-weight: 600 !important; color: ' + INK + ' !important; }'
    + B + ' #cl-more .drawer-item > svg, ' + B + ' #cl-more .drawer-item > .v116-ico, ' + B + ' #cl-more .drawer-item > .drawer-chk-ico, ' + B + ' #cl-more .drawer-item > .res-ico, ' + B + ' #cl-more .drawer-section-head > .lbl-ico { width: 20px !important; height: 20px !important; padding: 0 !important; background: transparent !important; border-radius: 0 !important; }'
    + B + ' #cl-more .drawer-item > svg *, ' + B + ' #cl-more .drawer-item > .v116-ico *, ' + B + ' #cl-more .drawer-item > .drawer-chk-ico *, ' + B + ' #cl-more .drawer-item > .res-ico *, ' + B + ' #cl-more .drawer-section-head > .lbl-ico * { stroke: ' + BLUE + ' !important; }'
    + B + ' #cl-more .drawer-count { background: transparent !important; color: ' + MUTE2 + ' !important; font-weight: 600 !important; }'
    + B + ' #cl-more .drawer-supplier.open > .drawer-item, ' + B + ' #cl-more #drawer-labels.expanded > .drawer-section-head { background: rgba(41,168,224,.08) !important; box-shadow: none !important; }'
    + B + ' #cl-more .drawer-cat { min-height: 36px !important; padding-left: 40px !important; font-size: 13.5px !important; }'
    + B + ' #drawer.drawer .drawer-foot { display: flex !important; gap: 10px !important; align-items: stretch !important; justify-content: center !important; margin: 18px 16px 0 !important; padding: 0 !important; border-top: 0 !important; }'
    + B + ' #drawer.drawer .drawer-foot .st164-div { display: none !important; }'
    + B + ' #drawer.drawer .drawer-foot .drawer-jobber { flex: 1 1 0 !important; display: flex !important; align-items: center !important; justify-content: center !important; min-height: 48px !important; margin: 0 !important; padding: 0 12px !important; background: #fff !important; border: 0 !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #drawer.drawer .drawer-foot .drawer-jobber img { height: 22px !important; width: auto !important; max-width: 100% !important; margin: 0 !important; }'
    + B + ' #drawer.drawer .drawer-foot .drawer-jobber span { display: none !important; }'
    + B + ' #cl-ver { margin: 14px 0 calc(18px + env(safe-area-inset-bottom)); text-align: center; font-size: 12px; font-weight: 600; color: ' + MUTE2 + '; }'
    /* ---- sheets: shared chrome ---- */
    + B + ' #pull-sheet.tc, ' + B + ' #pick-sheet.tk { background: ' + BG + ' !important; border-radius: 22px 22px 0 0 !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-close, ' + B + ' #pick-sheet.tk .pick-sheet-head .pick-sheet-close { width: 38px !important; height: 38px !important; line-height: 38px !important; font-size: 24px !important; background: #fff !important; box-shadow: ' + SH + ' !important; color: ' + MUTE + ' !important; }'
    + B + ' #pull-sheet.tc .tc-logo, ' + B + ' #pick-sheet.tk .tk-logo { height: 24px !important; }'
    /* Pull List */
    + B + ' #pull-sheet.tc .pick-sheet-head h2 { display: none !important; }'
    + B + ' #pull-sheet.tc .gd-pring { width: 150px !important; height: 150px !important; margin: 10px auto 4px !important; }'
    + B + ' #pull-sheet.tc .tc-name { font-size: 22px !important; font-weight: 800 !important; letter-spacing: -.01em; }'
    + B + ' #pull-sheet.tc .tc-addr { font-size: 14px !important; font-weight: 500 !important; }'
    + B + ' #pull-sheet.tc .tc-sum { font-size: 12.5px !important; font-weight: 600 !important; }'
    + B + ' #pull-sheet.tc .jc-in { height: 44px !important; border-radius: 12px !important; font-weight: 500 !important; }'
    + B + ' #pull-sheet.tc .jc-find, ' + B + ' #pull-sheet.tc .jc-clear { border-radius: 12px !important; font-weight: 700 !important; }'
    + B + ' #pull-sheet.tc .pick-line { gap: 12px !important; min-height: 64px; padding: 10px 14px !important; margin-bottom: 8px !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #pull-sheet.tc .pick-line img { width: 44px !important; height: 44px !important; flex: 0 0 44px !important; border: 1px solid #E6ECF2; background: #fff !important; }'
    + B + ' #pull-sheet.tc .pick-line-name { font-size: 15px !important; font-weight: 700 !important; }'
    + B + ' #pull-sheet.tc .pick-line-code { font-size: 12.5px !important; font-weight: 500 !important; }'
    + B + ' #pull-sheet.tc .tc-ck { width: 32px !important; height: 32px !important; flex: 0 0 32px !important; border: 2px solid #C5CFDA !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done .tc-ck { background: ' + BLUE + ' !important; border-color: ' + BLUE + ' !important; }'
    + B + ' #pull-sheet.tc .pick-line.tc-done .pick-line-name { color: ' + MUTE2 + ' !important; text-decoration-thickness: 1.5px !important; }'
    + B + ' #pull-sheet.tc .pull-qty b { color: ' + BLUED + ' !important; font-size: 19px !important; font-weight: 800 !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-foot { display: flex !important; flex-wrap: wrap !important; gap: 10px !important; }'
    + B + ' #pull-sheet.tc .pick-sheet-foot > div { flex: 1 1 100% !important; text-align: center !important; font-size: 12.5px !important; font-weight: 600 !important; color: ' + MUTE + ' !important; margin: 0 0 2px !important; }'
    + B + ' #pull-sheet.tc .pull-print, ' + B + ' #pull-sheet.tc .pull-save { flex: 1 1 0 !important; min-height: 50px !important; margin: 0 !important; border-radius: ' + R + ' !important; font-size: 16px !important; font-weight: 700 !important; }'
    + B + ' #pull-sheet.tc .pull-print { order: 1; display: flex !important; align-items: center; justify-content: center; gap: 8px; border: 1px solid ' + LINE + ' !important; box-shadow: none !important; }'
    + B + ' #pull-sheet.tc .pull-print .cl-ico { width: 20px; height: 20px; }'
    + B + ' #pull-sheet.tc .pull-save { order: 2; background: ' + BLUE + ' !important; box-shadow: 0 4px 12px rgba(41,168,224,.28) !important; }'
    /* Cart */
    + B + ' #pick-sheet.tk .tk-headrow .tk-logo { display: none !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-head { position: relative; padding-right: 0 !important; }'
    + B + ' #pick-sheet.tk .tk-headrow { min-height: 0 !important; height: 0 !important; }'
    + B + ' #pick-sheet.tk .tk-headrow .pick-sheet-close { top: 22px !important; right: 2px !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-head h2 { font-size: 26px !important; font-weight: 800 !important; letter-spacing: -.015em; margin: 6px 0 0 !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-head h2 .cl-h2-sub { display: none; }'
    + B + ' #pick-sheet.tk .tk-sub { font-size: 14px !important; font-weight: 500 !important; color: ' + MUTE + ' !important; }'
    + B + ' #pick-sheet.tk .tk-prog, ' + B + ' #pick-sheet.tk .tk-bar { display: none !important; }'
    + B + ' #pick-sheet.tk .cl-rv { position: absolute; right: 52px; top: 8px; width: 72px; height: 72px; }'
    + B + ' #pick-sheet.tk .cl-rv svg { display: block; width: 100%; height: 100%; }'
    + B + ' #pick-sheet.tk .cl-sups { display: flex; gap: 8px; overflow-x: auto; padding: 14px 0 4px; margin-top: 12px; border-top: 1px solid ' + LINE + '; scrollbar-width: none; }'
    + B + ' #pick-sheet.tk .cl-sups::-webkit-scrollbar { display: none; }'
    + B + ' #pick-sheet.tk .cl-sups button { flex: none; height: 32px; padding: 0 14px; border-radius: 16px; border: 1px solid ' + LINE + '; background: #fff; color: ' + INK + '; font-size: 12.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; -webkit-tap-highlight-color: transparent; }'
    + B + ' #pick-sheet.tk .cl-sups button:first-child { background: ' + BLUE + '; border-color: ' + BLUE + '; color: #fff; }'
    + B + ' #pick-sheet.tk .cl-grp { padding: 2px 0 10px !important; border-bottom: 0 !important; }'
    + B + ' #pick-sheet.tk .cl-grp > h3 { display: flex !important; align-items: center !important; gap: 8px; margin: 14px 2px 8px !important; font-size: 12.5px !important; font-weight: 700 !important; letter-spacing: .08em; text-transform: uppercase; color: ' + MUTE2 + ' !important; }'
    + B + ' #pick-sheet.tk .cl-grp > h3 .cl-gt { flex: 1 1 auto; min-width: 0; }'
    + B + ' #pick-sheet.tk .cl-grp > h3 .cl-gsub { margin-left: 6px; font-weight: 600; letter-spacing: 0; text-transform: none; color: ' + MUTE2 + '; }'
    + B + ' #pick-sheet.tk .cl-gbtn { flex: none; height: 30px; padding: 0 12px; border-radius: 15px; border: 1px solid ' + LINE + '; background: #fff; color: ' + INK + '; font-size: 12.5px; font-weight: 700; letter-spacing: 0; text-transform: none; -webkit-tap-highlight-color: transparent; }'
    + B + ' #pick-sheet.tk .cl-gbtn:active { background: rgba(41,168,224,.10); }'
    + B + ' #pick-sheet.tk .cl-grp > div[style*="text-align:right"] { display: none !important; }'
    + B + ' #pick-sheet.tk .cl-grp > .pick-copy, ' + B + ' #pick-sheet.tk .cl-grp > .pick-open-hi, ' + B + ' #pick-sheet.tk .cl-grp > #hd-copy-counter, ' + B + ' #pick-sheet.tk .cl-grp > .pick-open-rt { display: none !important; }'
    + B + ' #pick-sheet.tk .pick-line { gap: 10px !important; min-height: 64px; padding: 10px 12px !important; margin-bottom: 8px !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #pick-sheet.tk .pick-line { flex-wrap: nowrap !important; align-items: center !important; }'
    + B + ' #pick-sheet.tk .pick-line-info { flex: 1 1 auto !important; min-width: 0 !important; }'
    + B + ' #pick-sheet.tk .pick-line-name { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; line-height: 1.25 !important; }'
    + B + ' #pick-sheet.tk .pick-line-code { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + B + ' #pick-sheet.tk .pick-line img { width: 44px !important; height: 44px !important; flex: 0 0 44px !important; border-radius: 50% !important; border: 1px solid #E6ECF2; background: #fff !important; object-fit: contain !important; }'
    + B + ' #pick-sheet.tk .pick-line-name { font-size: 15px !important; font-weight: 700 !important; }'
    + B + ' #pick-sheet.tk .pick-line-code { font-size: 12.5px !important; font-weight: 500 !important; }'
    + B + ' #pick-sheet.tk .tk-ck { width: 26px !important; height: 26px !important; flex: 0 0 26px !important; border: 2px solid #C5CFDA !important; }'
    + B + ' #pick-sheet.tk .pick-line.tk-done .tk-ck { background: ' + BLUE + ' !important; border-color: ' + BLUE + ' !important; }'
    + B + ' #pick-sheet.tk .pick-stepper { flex: none !important; margin: 0 !important; display: flex !important; align-items: center !important; gap: 0 !important; height: 38px; padding: 0 2px !important; border: 1px solid ' + LINE + ' !important; border-radius: 19px !important; background: #fff !important; }'
    + B + ' #pick-sheet.tk .pick-step, ' + B + ' #pick-sheet.tk .pick-step[data-pick-inc] { width: 30px !important; height: 32px !important; min-width: 0 !important; padding: 0 !important; border: 0 !important; border-radius: 50% !important; background: transparent !important; color: ' + INK + ' !important; font-size: 19px !important; font-weight: 600 !important; box-shadow: none !important; }'
    + B + ' #pick-sheet.tk .pick-qty { min-width: 26px !important; text-align: center; font-size: 17px !important; font-weight: 800 !important; color: ' + INK + ' !important; }'
    + B + ' #pick-sheet.tk .pick-remove { display: none !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot { display: flex !important; flex-wrap: wrap !important; gap: 10px !important; align-items: center !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot > div { flex: 1 1 100% !important; display: flex; justify-content: space-between; text-align: left !important; font-size: 15px !important; font-weight: 700 !important; margin: 0 2px 2px !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot .pick-clear { flex: 1 1 0 !important; min-height: 50px !important; margin: 0 !important; border-radius: ' + R + ' !important; background: #fff !important; border: 1px solid ' + LINE + ' !important; color: ' + RED + ' !important; font-size: 16px !important; font-weight: 700 !important; box-shadow: none !important; }'
    + B + ' #pick-sheet.tk .pick-sheet-foot .pick-open-rt { flex: 1.8 1 0 !important; min-height: 50px !important; margin: 0 !important; border-radius: ' + R + ' !important; background: ' + BLUE + ' !important; border: 0 !important; color: #fff !important; font-size: 16px !important; font-weight: 700 !important; box-shadow: 0 4px 12px rgba(41,168,224,.28) !important; }'
    /* ---- Item details ---- */
    + B + ' #detail.detail-overlay, ' + B + ' #detail.detail-overlay .detail-bar { background: ' + BG + ' !important; }'
    + B + ' #detail.detail-overlay .detail-bar { position: relative; justify-content: center !important; min-height: 58px; border-bottom: 0 !important; box-shadow: none !important; }'
    + B + ' #detail.detail-overlay .detail-bar > div:not(.cl-dlogo) { display: none !important; }'
    + B + ' #detail.detail-overlay .detail-bar .detail-close { position: absolute !important; left: 14px; top: 50%; transform: translateY(-50%); ' + RB + ' }'
    + B + ' #detail.detail-overlay .cl-dlogo { display: flex; align-items: center; gap: 6px; height: 26px; }'
    + B + ' #detail.detail-overlay .cl-dlogo img:first-child { height: 26px; width: auto; }'
    + B + ' #detail.detail-overlay .cl-dlogo img:last-child { height: 19px; width: auto; filter: brightness(0); }'
    + B + ' #detail.detail-overlay .cl-dlogo { height: 34px; } ' + B + ' #detail.detail-overlay .cl-dlogo img.cl-full198 { height: 34px; width: auto; filter: none; display: block; }' /* v198: full logo, blue BASEMENT WATERPROOFING */
    + B + ' #detail.detail-overlay img.detail-photo, ' + B + ' #detail.detail-overlay canvas.st166-cover { border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; background: #fff !important; }'
    + B + ' #detail.detail-overlay .detail-body > .controls.ctl-top { border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; padding: 10px !important; gap: 10px !important; }'
    + B + ' #detail.detail-overlay .controls .stepper { background: ' + BG + ' !important; border-radius: 12px !important; padding: 3px !important; }'
    + B + ' #detail.detail-overlay .controls .step { border-radius: 10px !important; background: #fff !important; color: ' + INK + ' !important; box-shadow: 0 1px 2px rgba(15,23,32,.08) !important; }'
    + B + ' #detail.detail-overlay .controls .step[data-detail-step="plus"] { background: #fff !important; color: ' + BLUED + ' !important; }'
    + B + ' #detail.detail-overlay .controls .count { font-weight: 800 !important; }'
    + B + ' #detail.detail-overlay .controls .order { border-radius: 12px !important; background: ' + BLUE + ' !important; font-weight: 700 !important; }'
    + B + ' #detail.detail-overlay .detail-name { font-size: 22px !important; font-weight: 800 !important; letter-spacing: -.015em; line-height: 1.22 !important; color: ' + INK + ' !important; margin-top: 16px !important; }'
    + B + ' #detail.detail-overlay .detail-meta-wrap, ' + B + ' #detail.detail-overlay .detail-price, ' + B + ' #detail.detail-overlay .tk-dpar { display: none !important; }'
    + B + ' #detail.detail-overlay .cl-dsub { margin-top: 4px; font-size: 14px; font-weight: 500; color: ' + MUTE + '; }'
    + B + ' #detail.detail-overlay .cl-stock { display: flex; align-items: center; gap: 18px; margin-top: 14px; padding: 16px 18px; background: #fff; border-radius: ' + R + '; box-shadow: ' + SH + '; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-sring { flex: none; width: 112px; height: 112px; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-sring svg { display: block; width: 100%; height: 100%; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv { flex: 1 1 auto; min-width: 0; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv > div { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; padding: 9px 0; font-size: 15px; color: ' + MUTE + '; font-weight: 500; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv > div + div { border-top: 1px solid #EEF2F6; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv b { color: ' + INK + '; font-weight: 700; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv b.cl-amb { color: ' + AMBER + '; }'
    + B + ' #detail.detail-overlay .cl-stock .cl-kv b.cl-red { color: ' + RED + '; }'
    + B + ' #detail.detail-overlay .detail-counts { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 10px !important; margin-top: 10px !important; }'
    + B + ' #detail.detail-overlay .detail-counts > .detail-count.cl-hide { display: none !important; }'
    + B + ' #detail.detail-overlay .detail-count { min-height: 74px; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 4px; margin: 0 !important; padding: 10px 6px !important; background: #fff !important; border: 0 !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; font-size: 17px !important; font-weight: 800 !important; color: ' + INK + ' !important; text-align: center; }'
    + B + ' #detail.detail-overlay .detail-count > span { font-size: 12.5px !important; font-weight: 600 !important; color: ' + MUTE + ' !important; }'
    + B + ' #detail.detail-overlay .detail-count.label-tile img { max-height: 40px; }'
    + B + ' #detail.detail-overlay .detail-count.cl-tile-sup { font-size: 14px !important; }'
    + B + ' #detail.detail-overlay .detail-flow, ' + B + ' #detail.detail-overlay .detail-features { margin-top: 10px !important; padding: 14px 16px !important; background: #fff !important; border: 0 !important; border-radius: ' + R + ' !important; box-shadow: ' + SH + ' !important; }'
    + B + ' #detail.detail-overlay .detail-flow h2, ' + B + ' #detail.detail-overlay .detail-features h2 { margin: 0 0 6px !important; font-size: 12px !important; font-weight: 700 !important; letter-spacing: .08em; text-transform: uppercase; color: ' + MUTE2 + ' !important; }'
    + B + ' #detail.detail-overlay .detail-flow li, ' + B + ' #detail.detail-overlay .detail-features li { font-size: 14px; font-weight: 500; color: #1F2937; }';
  document.head.appendChild(st);

  /* ---- header: segmented Job | Inventory on the existing switch (same button, same tap) ---- */
  function seg() {
    var m = document.getElementById('mode-switch'); if (!m || m.querySelector('.cl-seg')) return !!m;
    var a = document.createElement('span'); a.className = 'cl-seg cl-seg-job'; a.textContent = 'Staging Job'; /* v196 (Dave): was "Stage Job" (v191), "Job" before */
    var b = document.createElement('span'); b.className = 'cl-seg cl-seg-inv'; b.textContent = 'Inventory';
    m.appendChild(a); m.appendChild(b);
    return true;
  }

  /* ---- home: summary + badges from items[].onHand ---- */
  function home() {
    var sum = document.getElementById('gd-sum');
    if (sum) {
      var s = parStats(), rg = sum.querySelector('.gd-ring');
      var key = s.tot + '|' + s.ok + '|' + s.low + '|' + s.out;
      if (s.tot && (sum.__cl !== key || !(rg && rg.querySelector('svg[data-cl]')))) {
        sum.__cl = key;
        if (rg) (window.stormSetSvg197 || function (h, x) { h.innerHTML = x; })(rg, ring(76, 8, s.ok / s.tot, BLUE, TRACK, s.pct + '%')); /* v197: update the ring in place (no new svg, no flash) */
        var t2 = sum.querySelector('.gd-t2'), t3 = sum.querySelector('.gd-t3');
        if (t2) t2.textContent = s.ok + ' of ' + s.tot + ' line' + (s.tot === 1 ? '' : 's') + ' full';
        if (t3) t3.innerHTML = [s.low ? s.low + ' low' : '', s.out ? '<span class="cl-out">' + s.out + ' out</span>' : ''].filter(Boolean).join(' \u00b7 ');
      }
    }
    document.querySelectorAll('#list .card[data-bin] .gd-badge').forEach(function (bd) {
      var c = bd.closest('.card'), it = find(c.getAttribute('data-bin')); if (!it) return;
      var stt = itemState(it), v = it.onHand == null || it.onHand === '' ? null : Number(it.onHand), par = it.par != null ? Number(it.par) : 0;
      var key = 'cl|' + stt + '|' + v + '|' + par;
      if (bd.__cl === key && bd.querySelector('svg[data-cl]')) return;
      var frac = stt === 'out' ? 0 : stt === 'low' ? (par > 0 ? Math.max(.12, Math.min(.92, v / par)) : .5) : stt === 'none' ? 0 : 1;
      (window.stormSetSvg197 || function (h, x) { h.innerHTML = x; })(bd, ring(40, 3.5, frac, stt === 'low' ? AMB : BLUE, stt === 'out' ? '#F3C9C9' : TRACK, v == null ? '\u2013' : v)); /* v197: in place */
      if (stt === 'out') { var tx = bd.querySelector('text'); if (tx) tx.setAttribute('fill', RED); }
      bd.__cl = key;
    });
  }

  /* ---- side menu ---- */
  var SOON = [['truck', 'Truck Check'], ['restock', 'Restock'], ['wrap', 'Job Wrap-up'], ['crew', 'Crew Day']];
  function menu() {
    var dr = document.getElementById('drawer'); if (!dr) return false;
    var mn = document.getElementById('cl-menu');
    if (!mn) {
      mn = document.createElement('div'); mn.id = 'cl-menu';
      mn.innerHTML = '<div class="cl-brand"><div class="cl-lock"><img class="cl-full198" src="' + A + 'logos/STORM-logo-black-text-transparent.svg" alt="STORM Basement Waterproofing"></div><div class="cl-brand-sub">Inventory</div></div>'
        + '<div class="cl-par" hidden><div class="cl-pring"></div><div><div class="cl-par-t1">Stocked to par</div><div class="cl-par-t2"></div><div class="cl-par-t3"></div></div></div>'
        + '<button type="button" class="cl-row cl-on" data-cl-go="home">' + ico('home') + '<span class="cl-name">Home</span></button>'
        + '<button type="button" class="cl-row" data-cl-go="pull">' + ico('pull') + '<span class="cl-name">Customer Search</span></button>'
        + '<button type="button" class="cl-row" data-cl-go="staging">' + ico('staging') + '<span class="cl-name">Staging</span></button>' /* v182: live (was a Soon placeholder) */
        + SOON.map(function (x) { return '<div class="cl-row cl-soon" aria-disabled="true">' + ico(x[0]) + '<span class="cl-name">' + x[1] + '</span><span class="cl-tag">Soon</span></div>'; }).join('')
        + '<div class="cl-lbl">CATEGORIES</div><div class="cl-cats"></div>'
        + '<div class="cl-lbl" id="cl-more-lbl">MORE</div>';
      var head = dr.querySelector('.drawer-head');
      dr.insertBefore(mn, head ? head.nextSibling : dr.firstChild);
      var more = document.createElement('div'); more.id = 'cl-more';
      mn.appendChild(more);
      ver();
    }
    var more2 = document.getElementById('cl-more');
    ['drawer-products', 'drawer-qt', 'drawer-checklists', 'drawer-resources'].forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec && sec.parentNode === dr) more2.appendChild(sec);
    });
    /* any other section a later block adds straight to the drawer also goes under MORE */
    Array.prototype.slice.call(dr.children).forEach(function (ch) { if (ch.classList && ch.classList.contains('drawer-section') && ch.parentNode === dr) more2.appendChild(ch); });
    var pr = document.getElementById('drawer-products'); if (pr) { var h = pr.querySelector(':scope > .drawer-section-head'); if (h && h.firstChild && h.firstChild.nodeType === 3 && /Products/.test(h.firstChild.nodeValue)) h.firstChild.nodeValue = 'Products by supplier '; }
    var ft = dr.querySelector('.drawer-foot'); if (ft && ft.parentNode === dr && ft.previousElementSibling !== mn) dr.insertBefore(ft, mn.nextSibling);
    var vv = document.getElementById('cl-ver'); if (!vv) { vv = document.createElement('div'); vv.id = 'cl-ver'; }
    if (ft && vv.previousElementSibling !== ft) ft.parentNode.insertBefore(vv, ft.nextSibling);
    ver();
    menuData();
    return true;
  }
  function ver() { var v = document.getElementById('cl-ver'), t = verText(); if (v && v.textContent !== t) v.textContent = t; }
  function curCat() { try { return category; } catch (e) { return 'All'; } }
  function curSup() { try { return supplier; } catch (e) { return 'All'; } }
  function menuData() {
    var mn = document.getElementById('cl-menu'); if (!mn) return;
    var its = allItems(); if (!its.length) return;
    var s = parStats(), pc = mn.querySelector('.cl-par');
    pc.hidden = !s.tot;
    if (s.tot) {
      var key = s.tot + '|' + s.ok + '|' + s.low + '|' + s.out;
      if (pc.__cl !== key || !pc.querySelector('svg[data-cl]')) {
        pc.__cl = key;
        pc.querySelector('.cl-pring').innerHTML = ring(60, 6, s.ok / s.tot, BLUE, TRACK, s.pct + '%');
        pc.querySelector('.cl-par-t2').textContent = s.ok + ' of ' + s.tot + ' lines full';
        pc.querySelector('.cl-par-t3').innerHTML = [s.low ? s.low + ' low' : '', s.out ? '<span class="cl-out">' + s.out + ' out</span>' : ''].filter(Boolean).join(' \u00b7 ');
      }
    }
    var counts = {}, seen = {};
    its.forEach(function (it) { if (!it || seen[it.bin]) return; seen[it.bin] = 1; var c = it.category || 'Other'; counts[c] = (counts[c] || 0) + 1; });
    var cats = Object.keys(counts).sort(function (a, b) { return a.localeCompare(b); });
    var ck = cats.map(function (c) { return c + ':' + counts[c]; }).join('|');
    var box = mn.querySelector('.cl-cats');
    if (box.__cl !== ck) {
      box.__cl = ck;
      box.innerHTML = cats.map(function (c) { return '<button type="button" class="cl-cat" data-cl-cat="' + esc(c) + '"><span>' + esc(c) + '</span><span class="cl-n">' + counts[c] + '</span></button>'; }).join('');
    }
    var cc = curCat(), cs = curSup();
    box.querySelectorAll('.cl-cat').forEach(function (b) { b.classList.toggle('cl-on', cs === 'All' && cc !== 'All' && b.getAttribute('data-cl-cat') === cc); });
    var hm = mn.querySelector('[data-cl-go="home"]'); if (hm) hm.classList.toggle('cl-on', cc === 'All');
  }
  function shut() { try { closeDrawer(); } catch (e) { var s = document.getElementById('drawer-scrim'); if (s) s.click(); } }
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var go = t.closest('#cl-menu [data-cl-go]');
    if (go) {
      e.preventDefault(); e.stopPropagation();
      var w = go.getAttribute('data-cl-go');
      shut();
      if (w === 'home') { try { setSupplier('All'); } catch (x) {} try { var q = document.getElementById('search'); if (q && q.value) { q.value = ''; q.dispatchEvent(new Event('input', { bubbles: true })); } } catch (x) {} window.scrollTo(0, 0); }
      if (w === 'pull' || w === 'staging') {
        /* v182 (Hark, 2026-11-11, Dave): Staging = Job mode, Pull List open, then Find a Job, so the crew picks a job and checks
           its lines. v196: checks only track the staging cart; Staged Job Complete takes the stock (completeStaging, app v148). */
        var stg = w === 'staging';
        var open = function () {
          var pf = document.getElementById('pull-fab'); if (pf) pf.click();
          if (stg) setTimeout(function () { var fb = document.querySelector('#pull-sheet [data-jc-find]') || document.querySelector('[data-jc-find]'); if (fb) fb.click(); }, 350);
        };
        if (!isJob()) { var ms = document.getElementById('mode-switch'); if (ms) ms.click(); setTimeout(open, 420); } else setTimeout(open, 180);
      }
      return;
    }
    var cat = t.closest('#cl-menu [data-cl-cat]');
    if (cat) {
      e.preventDefault(); e.stopPropagation();
      shut();
      try { setSupplierCategory('All', cat.getAttribute('data-cl-cat')); } catch (x) {}
      return;
    }
    if (t.closest('#hamburger')) setTimeout(function () { try { menu(); } catch (x) {} }, 0);
  }, true);

  /* ---- Pull List ---- */
  function pull() {
    var sh = document.getElementById('pull-sheet'); if (!sh) return;
    var pb = sh.querySelector('.pull-print');
    if (pb && !pb.querySelector('.cl-ico')) pb.insertAdjacentHTML('afterbegin', ico('print'));
    var rg = sh.querySelector('.gd-pring');
    if (rg) {
      var n = sh.querySelector('.tc-prog-n'), m = n ? /(\d+)\D+(\d+)/.exec(n.textContent) : null;
      var done = m ? +m[1] : 0, tot = m ? +m[2] : 0, key = 'cl' + done + '/' + tot;
      if (rg.__clk !== key || !rg.querySelector('svg[data-cl]')) { rg.innerHTML = ring(150, 11, tot ? done / tot : 0, BLUE, TRACK, done + '/' + tot, 'LOADED'); rg.__clk = key; }
    }
  }

  /* ---- Cart ---- */
  var GT = { 'Home Depot': 'hd', 'RichTech': 'rt', 'Hilti': 'hi', 'AutoZone': 'az' };
  function cart() {
    var sh = document.getElementById('pick-sheet'); if (!sh || !sh.classList.contains('tk')) return;
    var head = sh.querySelector(':scope > .pick-sheet-head'); if (!head) return;
    var h2 = head.querySelector('h2'); if (h2 && h2.textContent !== 'Cart' && /Order (Cart|list)/i.test(h2.textContent)) h2.textContent = 'Cart';
    /* reviewed ring from the existing "Reviewed N of M" */
    var pn = head.querySelector('.tk-prog-n'), m = pn ? /(\d+)\D+(\d+)/.exec(pn.textContent) : null;
    var rv = head.querySelector('.cl-rv');
    if (m && +m[2] > 0) {
      if (!rv) { rv = document.createElement('div'); rv.className = 'cl-rv'; head.appendChild(rv); }
      var k = m[1] + '/' + m[2]; if (rv.__k !== k) { rv.__k = k; rv.innerHTML = ring(72, 6, +m[1] / +m[2], BLUE, TRACK, k, 'REVIEWED'); }
    } else if (rv) rv.parentNode.removeChild(rv);
    /* groups */
    var groups = [];
    sh.querySelectorAll('h3').forEach(function (h) {
      var g = h.parentNode; if (!g || g === sh) return;
      var gt = h.querySelector('.cl-gt'), mm = gt ? [0, gt.getAttribute('data-n')] : /^\s*(Home Depot|RichTech|Hilti|AutoZone)(?![A-Za-z])/.exec(h.textContent || ''); if (!mm || !mm[1]) return;
      var name = mm[1];
      g.classList.add('cl-grp'); g.setAttribute('data-cl-sup', GT[name]);
      groups.push([name, g]);
      if (!h.querySelector('.cl-gt')) {
        var cnt = /\((\d+)\s+items?\)/.exec(h.textContent || '');
        h.innerHTML = '<span class="cl-gt" data-n="' + esc(name) + '">' + esc(name) + (cnt ? '<span class="cl-gsub">' + cnt[1] + ' item' + (cnt[1] === '1' ? '' : 's') + '</span>' : '') + '</span>';
        var sub = g.querySelector(':scope > div[style*="text-align:right"]');
        var tot = sub ? /\$[\d,]+\.\d\d/.exec(sub.textContent || '') : null;
        if (tot) h.querySelector('.cl-gsub') ? h.querySelector('.cl-gsub').insertAdjacentText('beforeend', ' \u00b7 ' + tot[0]) : null;
        var btns = [];
        if (name === 'Home Depot') btns.push(['#hd-copy-btn', /next/i.test((g.querySelector('#hd-copy-btn') || {}).textContent || '') ? 'Copy next' : 'Copy & open']);
        if (name === 'RichTech') btns.push(['__rtcopy', 'Order']); /* v193: one button - copy + open RichTech sign-in */
        if (name === 'Hilti') { btns.push(['[data-pick-copy-hi]', 'Copy']); btns.push(['[data-pick-open-hi]', 'Open cart']); }
        if (name === 'AutoZone') btns.push(['[data-pick-copy-az]', 'Copy']);
        btns.forEach(function (b) { var x = document.createElement('button'); x.type = 'button'; x.className = 'cl-gbtn'; x.setAttribute('data-cl-proxy', b[0]); x.textContent = b[1]; h.appendChild(x); });
        var ctr = g.querySelector('#hd-copy-counter'); if (ctr && /of\s*([2-9]|\d\d)/.test(ctr.textContent)) h.querySelector('.cl-gsub') && h.querySelector('.cl-gsub').insertAdjacentText('beforeend', ' \u00b7 ' + ctr.textContent);
      }
    });
    /* supplier jump chips */
    var hr = head.querySelector('.cl-sups');
    var key = groups.map(function (x) { return x[0]; }).join('|');
    if (groups.length > 1) {
      if (!hr) { hr = document.createElement('div'); hr.className = 'cl-sups'; head.appendChild(hr); }
      if (hr.__k !== key) { hr.__k = key; hr.innerHTML = groups.map(function (x) { return '<button type="button" data-cl-jump="' + GT[x[0]] + '">' + esc(x[0]) + '</button>'; }).join(''); }
    } else if (hr) hr.parentNode.removeChild(hr);
    /* foot: total line, Clear (red) + the one Copy & open RichTech */
    var foot = sh.querySelector(':scope > .pick-sheet-foot');
    var rt = sh.querySelector('.cl-grp .pick-open-rt');
    if (foot && rt) foot.appendChild(rt);
    if (foot) {
      var tl = foot.querySelector(':scope > div');
      if (tl && !tl.querySelector('.cl-tl')) { var mt = /\$[\d,]+\.\d\d/.exec(tl.textContent || ''); if (mt) tl.innerHTML = '<span class="cl-tl" style="color:' + MUTE + ';font-weight:600">Total</span><span>' + mt[0] + '</span>'; }
      var cl = foot.querySelector('.pick-clear'); if (cl && cl.textContent !== 'Clear' && /Clear all/.test(cl.textContent)) cl.textContent = 'Clear';
    }
  }
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var px = t.closest('#pick-sheet [data-cl-proxy]');
    if (px) {
      e.preventDefault(); e.stopPropagation();
      var sel = px.getAttribute('data-cl-proxy');
      if (sel === '__rtcopy') { try { if (typeof orderOnRichTech === 'function') orderOnRichTech(pickOrderText()); else copyPickOrder(); } catch (x) {} return; }
      var g = px.closest('.cl-grp'), o = (g && g.querySelector(sel)) || document.querySelector('#pick-sheet ' + sel);
      if (o) o.click();
      return;
    }
    var j = t.closest('#pick-sheet [data-cl-jump]');
    if (j) {
      var tg = document.querySelector('#pick-sheet .cl-grp[data-cl-sup="' + j.getAttribute('data-cl-jump') + '"]');
      if (tg) { var sc = tg.parentNode; try { sc.scrollTo({ top: tg.offsetTop - sc.offsetTop - 4, behavior: 'smooth' }); } catch (x) { sc.scrollTop = tg.offsetTop - sc.offsetTop; } }
    }
  }, true);

  /* ---- Item details ---- */
  function detail() {
    var d = document.getElementById('detail'); if (!d || !d.classList.contains('open')) return;
    var bar = d.querySelector('.detail-bar');
    if (bar && !bar.querySelector('.cl-dlogo')) bar.insertAdjacentHTML('beforeend', '<div class="cl-dlogo"><img class="cl-full198" src="' + A + 'logos/STORM-logo-black-text-transparent.svg" alt="STORM Basement Waterproofing"></div>');
    var body = d.querySelector('.detail-body'); if (!body) return;
    var bin = null; try { bin = currentDetailBin; } catch (e) {}
    var it = bin ? find(bin) : null; if (!it) return;
    var nm = body.querySelector('.detail-name'); if (!nm) return;
    var sub = body.querySelector('.cl-dsub');
    if (!sub || sub.__bin !== bin) {
      if (sub) sub.parentNode.removeChild(sub);
      sub = document.createElement('div'); sub.className = 'cl-dsub'; sub.__bin = bin;
      sub.textContent = [it.supplier, it.sku ? it.sku : '', it.detail || ''].filter(Boolean).join(' \u00b7 ');
      nm.parentNode.insertBefore(sub, nm.nextSibling);
    }
    var v = it.onHand == null || it.onHand === '' ? null : Number(it.onHand), par = it.par != null && it.par !== '' ? Number(it.par) : null, stt = itemState(it);
    var key = bin + '|' + v + '|' + par;
    var stock = body.querySelector('.cl-stock');
    if (!stock || stock.__k !== key) {
      if (!stock) { stock = document.createElement('div'); stock.className = 'cl-stock'; var after = body.querySelector('.ft-line') || sub; after.parentNode.insertBefore(stock, after.nextSibling); }
      stock.__k = key;
      var frac = stt === 'out' || v == null ? 0 : par > 0 ? Math.min(1, v / par) : 1;
      var col = stt === 'low' ? AMB : BLUE;
      var need = it.need != null ? Number(it.need) : (par != null && v != null ? Math.max(0, par - v) : null);
      stock.innerHTML = '<div class="cl-sring">' + ring(112, 9, frac, col, stt === 'out' ? '#F3C9C9' : TRACK, v == null ? '\u2013' : v, 'ON HAND') + '</div>'
        + '<div class="cl-kv"><div><span>Par</span><b>' + (par == null ? '\u2013' : par) + '</b></div>'
        + '<div><span>Bin</span><b>' + esc(String(it.bin).toUpperCase()) + '</b></div>'
        + '<div><span>Need</span><b class="' + (need > 0 ? (stt === 'out' ? 'cl-red' : 'cl-amb') : '') + '">' + (need == null ? '\u2013' : need) + '</b></div></div>';
      if (stt === 'out') { var tx = stock.querySelector('svg text'); if (tx) tx.setAttribute('fill', RED); }
    }
    var cts = body.querySelector('.detail-counts');
    if (cts && !cts.__cl) {
      cts.__cl = 1;
      cts.querySelectorAll('.detail-count').forEach(function (c) { var l = c.querySelector('span'); if (l && /^(On hand|Keep on hand|Par|Need)$/i.test(l.textContent.trim())) c.classList.add('cl-hide'); });
      var pt = document.createElement('div'); pt.className = 'detail-count cl-tile'; pt.innerHTML = '<span>Price</span>' + (it.price != null ? '$' + Number(it.price).toFixed(2) : '\u2013');
      var su = document.createElement('div'); su.className = 'detail-count cl-tile cl-tile-sup'; su.innerHTML = '<span>Supplier</span>' + esc(it.supplier || '\u2013');
      cts.insertBefore(su, cts.firstChild); cts.insertBefore(pt, cts.firstChild);
      if (stock && cts.previousElementSibling !== stock) stock.parentNode.insertBefore(cts, stock.nextSibling);
    }
  }

  /* ---- wiring ---- */
  function all() { try { seg(); } catch (e) {} try { home(); } catch (e) {} try { menu(); } catch (e) {} try { pull(); } catch (e) {} try { cart(); } catch (e) {} try { detail(); } catch (e) {} }
  var q = 0; function soon() { if (q) return; q = setTimeout(function () { q = 0; all(); }, 60); }
  window.stormCl179All = all; /* v198: the Item details swipe restyles the new page right away (no 60 ms unstyled frame mid-slide) */
  function obs(id, flag) {
    var el = document.getElementById(id); if (!el || el[flag]) return !!el;
    el[flag] = true;
    var o = { childList: true, subtree: true, characterData: true }; if (id === 'detail') { o.attributes = true; o.attributeFilter = ['class']; }
    new MutationObserver(soon).observe(el, o);
    return true;
  }
  function attach() {
    var ok = true;
    ['list', 'pull-sheet', 'pick-sheet', 'detail', 'drawer', 'gd-sum', 'mode-switch'].forEach(function (id) { if (!obs(id, '__cl179')) ok = false; });
    all();
    return ok && allItems().length > 0;
  }
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 120) return; setTimeout(poll, 250); })(); }
  document.addEventListener('input', function (e) { if (e.target && e.target.matches && e.target.matches('#list input.count, #detail input.count')) soon(); }, true);
  window.addEventListener('load', soon);
})();

/* v180 (Hark, 2026-11-10, Dave approved 22:47/22:48): live updates across crew phones.
   While the app is on screen (document.visibilityState 'visible') it asks the server for the change stamp (getStamp, which
   never opens the sheet) every 2 s, one call at a time. When the stamp moves (a count, a par, or a Pull List check changed on
   any phone), it pulls the items (getItems(false); the server cache is keyed by the stamp, so it is always fresh) and patches
   the changed cards in place with applyUpdate (no re-render, no scroll jump), and reloads the open Pull List's checks.
   A line the user is editing right now (focused count, open par box, a save still in flight, or touched in the last 4 s) is
   left alone. Paused while the app is hidden. Errors back off 2 s -> 5 -> 10 -> 30 s and drop back to 2 s after a success.
   Also sends any queued offline Pull List taps. */
(function () {
  if (window.__stormLive180) return; window.__stormLive180 = true;
  var DELAYS = [2000, 5000, 10000, 30000];
  var last = null, inFlight = false, timer = 0, err = 0, pulling = false, pullAgain = false, retry = false;
  var touched = {};
  function hasRun() { try { return !!(window.google && google.script && google.script.run); } catch (e) { return false; } }
  function visible() { return document.visibilityState === 'visible'; }
  function binOf(el) {
    if (!el || !el.closest) return null;
    var c = el.closest('[data-bin]'); if (c) return c.getAttribute('data-bin');
    if (el.closest('#detail')) { try { return currentDetailBin || null; } catch (e) { return null; } }
    return null;
  }
  function mark(e) { var b = binOf(e.target); if (b) touched[b] = Date.now(); }
  ['pointerdown', 'input', 'change', 'keydown', 'focusin'].forEach(function (t) { document.addEventListener(t, mark, true); });
  function busy(bin) {
    if (window.stormOnHandSheetBin && window.stormOnHandSheetBin === bin) return true; /* v181: the On hand sheet is open on this bin */
    if (Date.now() - (touched[bin] || 0) < 4000) return true;
    try { var q = saveQueues && saveQueues[bin]; if (q && (q.busy || q.pending !== null)) return true; } catch (e) {}
    var ae = document.activeElement;
    if (ae && ae.matches && ae.matches('input, textarea, select') && binOf(ae) === bin) return true;
    var card = document.querySelector('.card[data-bin="' + bin + '"]');
    if (card && card.querySelector('.par-input')) return true;
    return false;
  }
  function same(a, b) { return a === b || (a == null && b == null); }
  function pullItems() {
    if (pulling) { pullAgain = true; return; }
    pulling = true;
    google.script.run
      .withSuccessHandler(function (data) {
        pulling = false;
        try {
          (data || []).forEach(function (n) {
            if (!n || !n.bin) return;
            var cur = null; try { cur = findItem(n.bin); } catch (e) {}
            if (!cur) return; /* new rows show on the next full load */
            if (same(cur.onHand, n.onHand) && same(cur.par, n.par) && same(cur.need, n.need)) return;
            if (busy(n.bin)) return;
            applyUpdate({ bin: n.bin, onHand: n.onHand, par: n.par, need: n.need });
            try { syncDetailStepper(n.bin); } catch (e) {}
          });
        } catch (e) {}
        if (pullAgain) { pullAgain = false; pullItems(); }
      })
      .withFailureHandler(function () { pulling = false; pullAgain = false; retry = true; /* retried on the next stamp check */ })
      .getItems(false);
  }
  function changed() {
    pullItems();
    try { if (window.stormStagingRefresh) window.stormStagingRefresh(); } catch (e) {}
    try { if (window.stormTruckCheckRefresh) window.stormTruckCheckRefresh(); } catch (e) {} /* v203: an open Truck Check form picks up the other phones' boxes */
  }
  function schedule(ms) { clearTimeout(timer); timer = 0; if (visible()) timer = setTimeout(tick, ms); }
  function tick() {
    timer = 0;
    if (!visible() || inFlight || !hasRun()) { if (!hasRun()) schedule(DELAYS[DELAYS.length - 1]); return; }
    inFlight = true;
    google.script.run
      .withSuccessHandler(function (stamp) {
        inFlight = false; err = 0;
        stamp = String(stamp);
        if (retry || (last !== null && stamp !== last)) { retry = false; changed(); }
        last = stamp;
        try { if (window.stormStagingFlush) window.stormStagingFlush(); } catch (e) {}
        schedule(DELAYS[0]);
      })
      .withFailureHandler(function () {
        inFlight = false; err = Math.min(err + 1, DELAYS.length - 1);
        schedule(DELAYS[err]);
      })
      .getStamp();
  }
  document.addEventListener('visibilitychange', function () {
    if (visible()) { if (!timer && !inFlight) schedule(0); }
    else { clearTimeout(timer); timer = 0; }
  });
  window.addEventListener('online', function () { if (visible() && !inFlight) { err = 0; schedule(0); } });
  /* start once the item list has loaded */
  (function start(n) { var ok = false; try { ok = Array.isArray(items) && items.length > 0; } catch (e) {} if (ok || n > 120) schedule(DELAYS[0]); else setTimeout(function () { start(n + 1); }, 500); })(0);
})();

/* v181 (Hark, 2026-11-11, Dave asked 02:05): a separate "On hand" control so the on-hand count is never mixed up with the order amount.
   - Every item card (Inventory mode only) gets a small "On hand: N" pill ("–" when blank). Tapping it opens a bottom sheet with the
     item photo and name, a big number with − / + and a numeric box, and Save / Cancel.
   - Save only changes On hand: it.onHand = n, need recomputed, patchCard(it), then the existing saveCount(bin, n) -> updateCount path
     (same 'Saved' toast, same live-sync stamp bump). The order quantity / pick list is never touched.
   - Item details: the on-hand ring card (and an "Edit on hand" pill on it) opens the same sheet (Inventory mode only).
   - The card number box and steppers are unchanged (they still edit the order while an item is in it).
   - While the sheet is open its bin counts as "being edited", so the v180 live sync never overwrites it (see busy() in the v180 block). */
(function () {
  if (window.__stormOnHand181) return; window.__stormOnHand181 = true;
  var BLUE = '#29A8E0', BLUED = '#1A8FC4', INK = '#0F1720', MUTE = '#6B7280', MUTE2 = '#8A94A3', LINE = '#DCE4EE', BG = '#EAF0F7', AMBER = '#D97706', RED = '#DC2626';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var SH = '0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06)';
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function find(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function jobMode() { try { return typeof isJobMode === 'function' ? !!isJobMode() : false; } catch (e) { return false; } }
  function ohText(it) { return it && it.onHand != null && it.onHand !== '' ? String(it.onHand) : '\u2013'; }
  function btnHtml(it) { return '<button class="oh-btn" type="button" data-oh-bin="' + esc(it.bin) + '" aria-label="Edit on hand count">On hand: <b>' + esc(ohText(it)) + '</b></button>'; }

  var css = document.createElement('style'); css.id = 'storm-v181-css';
  css.textContent = ''
    + '.card .controls .oh-btn { flex: 1 1 100%; order: -1; display: flex; align-items: center; justify-content: center; gap: 4px; min-height: 30px; margin: 0; padding: 4px 10px; border: 1px solid rgba(41,168,224,.45); border-radius: 14px; background: #fff; color: ' + BLUED + '; font-family: ' + FONT + '; font-size: 12.5px; font-weight: 600; line-height: 1.1; -webkit-tap-highlight-color: transparent; cursor: pointer; }'
    + '.card .controls .oh-btn b { font-weight: 800; color: ' + INK + '; font-size: 13.5px; }'
    + '.card .controls .oh-btn:active { background: rgba(41,168,224,.08); }'
    + 'body.oh-job .oh-btn, body.oh-job #detail .oh-edit { display: none !important; }'
    + '#detail .cl-stock.oh-tap { cursor: pointer; flex-wrap: wrap; -webkit-tap-highlight-color: transparent; }'
    + 'body.oh-job #detail .cl-stock.oh-tap { cursor: default; }'
    + '#detail .cl-stock .oh-edit { flex: 1 1 100%; min-height: 36px; margin: 2px 0 0; padding: 6px 12px; border: 1px solid rgba(41,168,224,.45); border-radius: 14px; background: #fff; color: ' + BLUED + '; font-family: ' + FONT + '; font-size: 14px; font-weight: 700; -webkit-tap-highlight-color: transparent; }'
    + '#detail .cl-stock .oh-edit:active { background: rgba(41,168,224,.08); }'
    + '#oh-scrim { position: fixed; inset: 0; z-index: 200; background: rgba(15,23,32,.42); opacity: 0; pointer-events: none; transition: opacity .25s ease; }'
    + '#oh-scrim.open { opacity: 1; pointer-events: auto; }'
    + '#oh-sheet { position: fixed; left: 0; right: 0; bottom: 0; z-index: 201; max-width: 560px; margin: 0 auto; padding: 8px 18px calc(18px + env(safe-area-inset-bottom)); background: #fff; border-radius: 14px 14px 0 0; box-shadow: 0 -4px 24px rgba(15,23,32,.18); font-family: ' + FONT + '; color: ' + INK + '; transform: translateY(105%); transition: transform .25s ease; }'
    + '#oh-sheet.open { transform: translateY(0); }'
    + '#oh-sheet .oh-grab { width: 40px; height: 4px; margin: 0 auto 12px; border-radius: 2px; background: ' + LINE + '; }'
    + '#oh-sheet .oh-head { display: flex; align-items: center; gap: 12px; }'
    + '#oh-sheet .oh-ph { flex: none; width: 60px; height: 60px; border-radius: 10px; background: #fff; border: 1px solid #EEF2F6; object-fit: contain; }'
    + '#oh-sheet .oh-ph.oh-none { visibility: hidden; }'
    + '#oh-sheet .oh-nm { font-size: 16px; font-weight: 700; line-height: 1.25; }'
    + '#oh-sheet .oh-sub { margin-top: 2px; font-size: 12.5px; font-weight: 500; color: ' + MUTE2 + '; }'
    + '#oh-sheet .oh-lbl { margin: 18px 0 8px; text-align: center; font-size: 11.5px; font-weight: 700; letter-spacing: .1em; color: ' + MUTE2 + '; }'
    + '#oh-sheet .oh-row { display: flex; align-items: center; justify-content: center; gap: 16px; }'
    + '#oh-sheet .oh-step { flex: none; width: 56px; height: 56px; border: 0; border-radius: 14px; background: ' + BG + '; color: ' + INK + '; font-family: ' + FONT + '; font-size: 28px; font-weight: 600; line-height: 1; -webkit-tap-highlight-color: transparent; }'
    + '#oh-sheet .oh-step[data-oh-step="plus"] { color: ' + BLUED + '; }'
    + '#oh-sheet .oh-step:active { background: #DCE6F0; }'
    + '#oh-sheet .oh-num { width: 120px; height: 64px; border: 1.5px solid ' + LINE + '; border-radius: 14px; background: #fff; color: ' + INK + '; text-align: center; font-family: ' + FONT + '; font-size: 40px; font-weight: 800; -moz-appearance: textfield; }'
    + '#oh-sheet .oh-num::-webkit-outer-spin-button, #oh-sheet .oh-num::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }'
    + '#oh-sheet .oh-num:focus { outline: none; border-color: ' + BLUE + '; }'
    + '#oh-sheet .oh-num::placeholder { color: #C3CBD6; }'
    + '#oh-sheet .oh-par { margin-top: 10px; min-height: 18px; text-align: center; font-size: 13px; font-weight: 600; color: ' + MUTE + '; }'
    + '#oh-sheet .oh-par .oh-amb { color: ' + AMBER + '; } #oh-sheet .oh-par .oh-red { color: ' + RED + '; }'
    + '#oh-sheet .oh-btns { display: flex; gap: 10px; margin-top: 18px; }'
    + '#oh-sheet .oh-btns button { flex: 1 1 0; min-height: 50px; border-radius: 14px; font-family: ' + FONT + '; font-size: 16px; font-weight: 700; -webkit-tap-highlight-color: transparent; }'
    + '#oh-sheet .oh-cancel { border: 1px solid ' + LINE + '; background: #fff; color: ' + INK + '; }'
    + '#oh-sheet .oh-save { border: 0; background: ' + BLUE + '; color: #fff; }'
    + '#oh-sheet .oh-save:active { background: ' + BLUED + '; }';
  document.head.appendChild(css);

  /* ---- the sheet ---- */
  var scrim = document.createElement('div'); scrim.id = 'oh-scrim';
  var sheet = document.createElement('div'); sheet.id = 'oh-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'On hand count');
  sheet.innerHTML = '<div class="oh-grab"></div>'
    + '<div class="oh-head"><img class="oh-ph" alt=""><div><div class="oh-nm"></div><div class="oh-sub"></div></div></div>'
    + '<div class="oh-lbl">ON HAND</div>'
    + '<div class="oh-row"><button class="oh-step" type="button" data-oh-step="minus" aria-label="One less">\u2212</button>'
    + '<input class="oh-num" type="number" inputmode="numeric" pattern="[0-9]*" min="0" placeholder="\u2013" aria-label="On hand">'
    + '<button class="oh-step" type="button" data-oh-step="plus" aria-label="One more">+</button></div>'
    + '<div class="oh-par"></div>'
    + '<div class="oh-btns"><button class="oh-cancel" type="button">Cancel</button><button class="oh-save" type="button">Save</button></div>';
  function mount() { if (!scrim.parentNode) document.body.appendChild(scrim); if (!sheet.parentNode) document.body.appendChild(sheet); }
  var num = sheet.querySelector('.oh-num');
  window.stormOnHandSheetBin = null; /* read by the v180 live sync: this bin is being edited */

  function curVal() { var v = String(num.value).trim(); if (v === '') return null; var n = Math.floor(Number(v)); return isNaN(n) || n < 0 ? 0 : n; }
  function paintPar() {
    var it = find(window.stormOnHandSheetBin), el = sheet.querySelector('.oh-par'); if (!it) { el.textContent = ''; return; }
    var par = it.par != null && it.par !== '' ? Number(it.par) : null, v = curVal();
    if (par == null) { el.textContent = 'No keep-on-hand set'; return; }
    var need = v == null ? null : Math.max(0, par - v);
    el.innerHTML = 'Keep on hand ' + esc(par) + (need == null ? '' : ' \u00b7 <span class="' + (need > 0 ? (v === 0 ? 'oh-red' : 'oh-amb') : '') + '">Need ' + need + '</span>');
  }
  function photoSrc(bin, it) {
    var img = document.querySelector('#list .card[data-bin="' + bin + '"] img.photo');
    if (!img) { try { if (currentDetailBin === bin) img = document.querySelector('#detail .detail-photo'); } catch (e) {} }
    return (img && (img.currentSrc || img.getAttribute('src'))) || it.photoUrl || '';
  }
  function openSheet(bin) {
    var it = find(bin); if (!it || jobMode()) return;
    mount();
    window.stormOnHandSheetBin = bin;
    var ph = sheet.querySelector('.oh-ph'), src = photoSrc(bin, it);
    if (src) { ph.src = src; ph.classList.remove('oh-none'); } else { ph.removeAttribute('src'); ph.classList.add('oh-none'); }
    sheet.querySelector('.oh-nm').textContent = it.name || bin;
    sheet.querySelector('.oh-sub').textContent = [String(it.bin).toUpperCase(), it.supplier || ''].filter(Boolean).join(' \u00b7 ');
    num.value = it.onHand != null && it.onHand !== '' ? String(it.onHand) : '';
    paintPar();
    scrim.classList.add('open'); void sheet.offsetWidth; sheet.classList.add('open');
  }
  function closeSheet() {
    sheet.classList.remove('open'); scrim.classList.remove('open');
    try { if (document.activeElement === num) num.blur(); } catch (e) {}
    /* keep the bin protected a moment longer so a sync landing mid-close can't flicker the old value back */
    var b = window.stormOnHandSheetBin; setTimeout(function () { if (window.stormOnHandSheetBin === b && !sheet.classList.contains('open')) window.stormOnHandSheetBin = null; }, 600);
  }
  function save() {
    var bin = window.stormOnHandSheetBin, it = find(bin); if (!it) { closeSheet(); return; }
    var n = curVal();
    /* On hand only - the same steps the card box takes for an unpicked item, minus the pick-list sync */
    it.onHand = n;
    it.need = (it.onHand == null || it.par == null || it.par === '') ? null : Math.max(0, Number(it.par) - it.onHand);
    try { patchCard(it); } catch (e) {}
    try { syncDetailStepper(bin); } catch (e) {}
    closeSheet();
    saveCount(bin, n == null ? '' : String(n));
    nudgeDetail();
  }
  sheet.addEventListener('click', function (e) {
    var t = e.target;
    var st = t.closest && t.closest('[data-oh-step]');
    if (st) { var v = curVal(); v = v == null ? 0 : v; v = st.getAttribute('data-oh-step') === 'plus' ? v + 1 : Math.max(0, v - 1); num.value = String(v); paintPar(); return; }
    if (t.closest && t.closest('.oh-cancel')) { closeSheet(); return; }
    if (t.closest && t.closest('.oh-save')) { save(); return; }
  });
  num.addEventListener('input', paintPar);
  num.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); save(); } });
  scrim.addEventListener('click', closeSheet);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && sheet.classList.contains('open')) closeSheet(); });

  /* ---- buttons on cards ---- */
  try { var _ch = cardHtml; cardHtml = function (it) { var h = _ch.apply(this, arguments); try { if (it && it.bin && h.indexOf('data-oh-bin') < 0) h = h.replace('<div class="controls">', '<div class="controls">' + btnHtml(it)); } catch (e) {} return h; }; } catch (e) {}
  function refreshBtn(bin) {
    var it = find(bin); if (!it) return;
    var t = ohText(it);
    document.querySelectorAll('.oh-btn[data-oh-bin="' + bin + '"] b').forEach(function (b) { if (b.textContent !== t) b.textContent = t; });
  }
  try { var _pc = patchCard; patchCard = function (it) { var r = _pc.apply(this, arguments); try { if (it && it.bin) refreshBtn(it.bin); } catch (e) {} return r; }; } catch (e) {}
  function pass() {
    var jm = jobMode();
    if (document.body.classList.contains('oh-job') !== jm) document.body.classList.toggle('oh-job', jm);
    document.querySelectorAll('.card[data-bin] > .controls').forEach(function (c) {
      var card = c.parentNode; if (card.closest('#detail, #pick-sheet, #pull-sheet')) return;
      var bin = card.getAttribute('data-bin'), it = find(bin); if (!it) return;
      var b = c.querySelector('.oh-btn');
      if (!b) { c.insertAdjacentHTML('afterbegin', btnHtml(it)); return; }
      var bb = b.querySelector('b'), t = ohText(it); if (bb && bb.textContent !== t) bb.textContent = t;
    });
    var d = document.getElementById('detail');
    if (d && d.classList.contains('open')) {
      var stock = d.querySelector('.cl-stock');
      if (stock) {
        if (!stock.classList.contains('oh-tap')) stock.classList.add('oh-tap');
        if (!stock.querySelector('.oh-edit')) stock.insertAdjacentHTML('beforeend', '<button class="oh-edit" type="button">Edit on hand</button>');
      }
    }
  }
  function nudgeDetail() { /* the v179 ring card repaints on a class change of #detail */ var d = document.getElementById('detail'); if (d && d.classList.contains('open')) { d.classList.add('oh-t'); setTimeout(function () { d.classList.remove('oh-t'); }, 0); } }
  var pq = 0; function soon() { if (pq) return; pq = setTimeout(function () { pq = 0; try { pass(); } catch (e) {} }, 80); }
  window.stormOh181Pass = pass; /* v198: the Item details swipe runs this right away so the new page arrives finished */

  /* taps: capture phase so the base list handler never sees them */
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var b = t.closest('.oh-btn[data-oh-bin]');
    if (b) { e.preventDefault(); e.stopPropagation(); openSheet(b.getAttribute('data-oh-bin')); return; }
    var s = t.closest('#detail .cl-stock');
    if (s && !jobMode()) { var bin = null; try { bin = currentDetailBin; } catch (x) {} if (bin) { e.preventDefault(); e.stopPropagation(); openSheet(bin); } }
  }, true);

  function attach() {
    var ok = true;
    ['list', 'detail'].forEach(function (id) { var el = document.getElementById(id); if (!el) { ok = false; return; } if (el.__oh181) return; el.__oh181 = 1; var o = { childList: true, subtree: true }; if (id === 'detail') { o.attributes = true; o.attributeFilter = ['class']; } new MutationObserver(soon).observe(el, o); });
    var ms = document.getElementById('mode-switch'); if (ms && !ms.__oh181) { ms.__oh181 = 1; new MutationObserver(soon).observe(ms, { attributes: true, attributeFilter: ['class'] }); }
    soon();
    return ok;
  }
  if (!attach()) { var tries = 0; (function poll() { if (attach() || ++tries > 120) return; setTimeout(poll, 250); })(); }
  window.addEventListener('load', soon);
  window.stormOpenOnHand = openSheet;
})();

/* v187 (Hark, 2026-11-11, Dave): small version tag, bottom right, so everyone can see which version is running. */
(function () {
  var EXT = 'v196';
  function put() {
    var f = document.querySelector('.foot'), m = f && (f.textContent || '').match(/Inventory\s*\u00b7\s*(v\d+)/);
    var vb = document.getElementById('ver-badge'); if (vb) { if (m) vb.textContent = m[1]; return; } /* v188: the app's own bottom-right badge was hard-coded v130; it now shows the live footer version */
    var t = document.getElementById('st-ver'); if (!t) { t = document.createElement('div'); t.id = 'st-ver'; document.body.appendChild(t);
      var st = document.createElement('style'); st.textContent = '#st-ver{position:fixed;right:6px;bottom:calc(2px + env(safe-area-inset-bottom));z-index:2147483000;pointer-events:none;font:600 10px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:rgba(138,148,163,.85);letter-spacing:.3px}@media print{#st-ver{display:none!important}}'; document.head.appendChild(st); }
    t.textContent = (m ? m[1] : '') + (m ? ' \u00b7 ' : '') + 'ext ' + EXT;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  setTimeout(put, 1500);
})();

/* v189 (Hark, 2026-11-11, Dave): "on the iPad the items are massive" -> tablet widths (>= 700px) get smaller, more cards per row; phones keep the 2-column grid.
   "the totals overlap when it's in the shopping cart" -> the button dock sits higher so the cart total pill clears the bottom-right version tag; cart line totals wrap. */
(function () {
  if (document.getElementById('storm-v189-css')) return;
  var st = document.createElement('style'); st.id = 'storm-v189-css';
  st.textContent = '@media (min-width: 700px) { html body #list { grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)) !important; gap: 14px !important; max-width: 1240px; margin-left: auto !important; margin-right: auto !important; box-sizing: border-box; } html body #list > .card .photo { aspect-ratio: 4 / 3 !important; } html body #list > .card .gd-badge { aspect-ratio: 4 / 3 !important; } html body #list > .card .name { font-size: 15px !important; } html body #list > .card .sku { font-size: 12.5px !important; } html body #list > .card .price { font-size: 13.5px !important; } } html body .fab-dock { bottom: calc(68px + env(safe-area-inset-bottom)) !important; } html body #pick-sheet.tk .pick-line-code { white-space: normal !important; overflow: visible !important; text-overflow: clip !important; overflow-wrap: anywhere; }';
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  window.addEventListener('load', put); setTimeout(put, 1500); setTimeout(put, 4000); /* stay last, after any late style tags */
})();

/* v190 (Hark, 2026-11-11, Dave): "need to get the shopping cart totals to not go over the other icon below it" -> the cart button keeps a clear gap under it for its $ total pill (Inventory and Job, phone and iPad).
   "the lowest icon on the right to read out quote under it" -> small "Quote" label under the Jobber quote button (#quote-fab).
   "the icon that is for finishing a job ... say under it search or customer search" -> blue "Customer Search" label under the Pull List button (#pull-fab, opens Find a Job), one gentle pulse when Job mode opens.
   Labels are ::after on the buttons, so they move and hide with the dock (detail pages, open sheets). */
(function () {
  if (document.getElementById('storm-v190-css')) return;
  var st = document.createElement('style'); st.id = 'storm-v190-css';
  var D = 'html body #fab-dock.fab-dock', J = 'html body.job-on #fab-dock.fab-dock';
  st.textContent = ''
    + D + ' > * { margin-top: 0 !important; }'
    + D + ' > #cart-fab { margin-bottom: 22px !important; }'
    + D + ' > #cart-fab .cart-fab-total { left: auto !important; right: -5px !important; transform: none !important; }' /* big totals ($1,234.56) stayed centered and ran off the screen edge */
    + D + ' > #pull-fab { margin-bottom: 30px !important; overflow: visible !important; }'
    + D + ' > #quote-fab { margin-bottom: 16px !important; overflow: visible !important; }'
    + D + ' > #pull-fab::after, ' + D + ' > #quote-fab::after { position: absolute; left: 50%; top: calc(100% + 5px); transform: translateX(-50%); pointer-events: none; white-space: pre; text-align: center; font: 700 10px/1.15 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; letter-spacing: .2px; border-radius: 7px; }'
    + D + ' > #quote-fab::after { content: "Quote"; padding: 2px 7px; background: #fff; color: #0F1720; box-shadow: 0 1px 4px rgba(15,23,32,.16); }'
    + D + ' > #pull-fab::after { content: "Customer\\A Search"; padding: 3px 7px; background: #29ABE2; color: #fff; box-shadow: 0 2px 8px rgba(41,171,226,.45); }'
    + J + ' > #pull-fab::after { animation: stCsPulse 1.4s ease-out .9s 2; }'
    + '@keyframes stCsPulse { 0% { box-shadow: 0 2px 8px rgba(41,171,226,.45), 0 0 0 0 rgba(41,171,226,.55); } 70% { box-shadow: 0 2px 8px rgba(41,171,226,.45), 0 0 0 8px rgba(41,171,226,0); } 100% { box-shadow: 0 2px 8px rgba(41,171,226,.45), 0 0 0 0 rgba(41,171,226,0); } }'
    + '@media (prefers-reduced-motion: reduce) { ' + J + ' > #pull-fab::after { animation: none; } }'
    + '@media print { ' + D + ' > #pull-fab::after, ' + D + ' > #quote-fab::after { display: none; } }';
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  window.addEventListener('load', put); setTimeout(put, 1600); setTimeout(put, 4100); /* stay last, after any late style tags */
})();

/* v191 (Hark, 2026-11-11, Dave): "the icons on the right hand side should all float into one icon that is a plus symbol" -> the dock (camera, cart + $ total,
   Customer Search, Quote) folds into one white round "+" at the bottom of the dock. It spins in collapsed on load; tap = it unscrews (counter-clockwise to an x)
   and the buttons flare back out where they sit; tap again = clockwise spin and they get sucked back in. Cart count rides on the + while folded.
   "a print preview button the same as the print button" -> Pull List gets "Print Preview": the exact printed sheet on screen, with X and Print. */
(function () {
  if (window.__stormV191) return; window.__stormV191 = 1;
  var D = 'html body #fab-dock.fab-dock', P = D + ' > #st-plus.st-plus', K = D + ' > :not(#st-plus)';
  var HIDE = ['body:has(.pick-sheet.open)', 'body:has(.confirm-box.open)', 'body:has(.drawer.open)', 'body:has(#lbl-sheet.open)', 'body:has(.detail-overlay.open)', 'body.st-pre'];
  var st = document.createElement('style'); st.id = 'storm-v191-css';
  st.textContent = ''
    + P + ' { position: relative; flex: none; width: 44px; height: 44px; margin: 0 !important; padding: 0; border: 0 !important; border-radius: 50% !important; background: #fff !important; color: #0F1720 !important;'
    + ' box-shadow: 0 4px 14px rgba(15,23,32,.14) !important; display: flex; align-items: center; justify-content: center; cursor: pointer; pointer-events: auto; -webkit-tap-highlight-color: transparent; animation: none !important; }'
    + P + ' svg { width: 24px; height: 24px; display: block; transition: transform .5s cubic-bezier(.34,1.4,.5,1); transform: rotate(0deg); }'
    + D + '.st-open > #st-plus svg { transform: rotate(-135deg); }' /* counter-clockwise: unscrews to an x */
    + D + '.st-col > #st-plus svg { transition: transform .55s cubic-bezier(.5,0,.3,1.25); }' /* back clockwise to + */
    + P + '.st-spin { animation: stPlusIn .8s cubic-bezier(.3,1.3,.5,1) both !important; }'
    + '@keyframes stPlusIn { 0% { opacity: 0; transform: scale(.2) rotate(-300deg); } 60% { opacity: 1; } 100% { opacity: 1; transform: none; } }'
    + P + ' .st-plus-n { position: absolute; top: -5px; right: -5px; min-width: 20px; height: 20px; padding: 0 5px; box-sizing: border-box; border-radius: 10px; border: 2px solid #fff; background: #29ABE2; color: #fff;'
    + ' font: 700 11px/16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; pointer-events: none; transition: opacity .2s ease, transform .3s cubic-bezier(.3,1.4,.5,1); }'
    + P + ' .st-plus-n.zero, ' + D + '.st-open > #st-plus .st-plus-n { opacity: 0; transform: scale(.4); }'
    /* buttons: out = spring back to their spot, nearest first; in = pulled into the + */
    + K + ' { transition: transform .52s cubic-bezier(.34,1.5,.55,1) var(--st-do, 0s), opacity .22s ease var(--st-do, 0s) !important; }'
    + D + '.st-col > :not(#st-plus) { transform: translateY(var(--st-dy, 0px)) scale(.15) rotate(90deg) !important; opacity: 0 !important; pointer-events: none !important; animation: none !important;'
    + ' transition: transform .4s cubic-bezier(.55,0,.8,.35) var(--st-dc, 0s), opacity .3s ease-in calc(var(--st-dc, 0s) + .1s) !important; }'
    + D + '.st-col > #pull-fab::after { animation: none !important; }' /* Customer Search pulse replays when the dock opens in Job mode */
    + D + '.st-col { pointer-events: none !important; }'
    + HIDE.map(function (h) { return h + ' #fab-dock > #st-plus'; }).join(', ') + ' { pointer-events: none !important; }'
    + '@media (prefers-reduced-motion: reduce) { ' + P + ' svg { transition: none !important; } ' + P + '.st-spin { animation: stPlusFade .3s ease both !important; } '
    + K + ', ' + D + '.st-col > :not(#st-plus) { transition: opacity .2s ease !important; } ' + D + '.st-col > :not(#st-plus) { transform: none !important; } }'
    + '@keyframes stPlusFade { from { opacity: 0; } to { opacity: 1; } }'
    + '@media print { #st-plus, #st-pv { display: none !important; } }'
    /* Print Preview */
    + 'html body #pull-sheet.pick-sheet .pick-sheet-foot > button.pull-print { order: 1 !important; flex: 1 1 0 !important; min-width: 0; }'
    + 'html body #pull-sheet.pick-sheet .pick-sheet-foot > button.pull-print.st-pvb { order: 0 !important; }'
    + 'html body #pull-sheet.pick-sheet .pick-sheet-foot > button.pull-save { order: 3 !important; flex: 1 1 100% !important; }'
    + 'html body #pull-sheet.pick-sheet .pick-sheet-foot > button.pull-print, html body #pull-sheet.pick-sheet .pick-sheet-foot > button.pull-save { white-space: nowrap; }'
    + 'html body #pull-sheet .pull-print.st-pvb .st-pvi { width: 20px; height: 20px; flex: none; }'
    + '#st-pv { position: fixed; inset: 0; z-index: 2147483100; display: flex; flex-direction: column; background: #E9EEF3; opacity: 0; transition: opacity .22s ease; -webkit-text-size-adjust: 100%; }'
    + '#st-pv.on { opacity: 1; }'
    + '#st-pv .st-pv-bar { flex: none; display: flex; align-items: center; gap: 10px; padding: calc(10px + env(safe-area-inset-top)) 12px 10px; background: #fff; box-shadow: 0 1px 6px rgba(15,23,32,.12); }'
    + '#st-pv .st-pv-x { flex: none; width: 40px; height: 40px; border: 0; border-radius: 50%; background: #F1F4F8; color: #0F1720; font-size: 24px; line-height: 40px; padding: 0; cursor: pointer; }'
    + '#st-pv .st-pv-t { flex: 1; min-width: 0; font: 800 17px/1.2 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0F1720; }'
    + '#st-pv .st-pv-t span { display: block; font-size: 12px; font-weight: 600; color: #6B7280; }'
    + '#st-pv .st-pv-p { flex: none; display: flex; align-items: center; gap: 7px; height: 42px; padding: 0 18px; border: 0; border-radius: 21px; background: #29ABE2; color: #fff; font: 700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; box-shadow: 0 4px 12px rgba(41,168,224,.28); cursor: pointer; }'
    + '#st-pv .st-pv-p svg { width: 18px; height: 18px; }'
    + '#st-pv .st-pv-scroll { flex: 1; overflow: auto; -webkit-overflow-scrolling: touch; padding: 14px 0 calc(24px + env(safe-area-inset-bottom)); }'
    + '#st-pv .st-pv-fit { position: relative; margin: 0 auto; }'
    + '#st-pv .st-pv-host { position: absolute; top: 0; left: 0; width: 816px; transform-origin: 0 0; }';
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  window.addEventListener('load', put); setTimeout(put, 1700); setTimeout(put, 4200);

  var PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var open = false, plus = null, spun = false;
  function dock() { return document.getElementById('fab-dock'); }
  function kids(d) { return [].slice.call(d.children).filter(function (c) { return c !== plus && c.offsetParent !== null; }); }
  function layout() {
    var d = dock(); if (!d || !plus) return;
    if (d.lastElementChild !== plus) d.appendChild(plus); /* stays the bottom spot */
    var k = kids(d), n = k.length, py = plus.offsetTop;
    k.forEach(function (c, i) {
      var near = n - 1 - i; /* 0 = the button right above the + */
      var dy = (py - c.offsetTop) + 'px';
      if (c.style.getPropertyValue('--st-dy') !== dy) c.style.setProperty('--st-dy', dy);
      c.style.setProperty('--st-do', reduce ? '0s' : (near * 0.055) + 's');
      c.style.setProperty('--st-dc', reduce ? '0s' : (near * 0.045) + 's');
    });
  }
  function badge() {
    if (!plus) return;
    var c = document.getElementById('cart-fab-count'), n = c ? parseInt(c.textContent, 10) || 0 : 0, b = plus.querySelector('.st-plus-n');
    var t = n > 99 ? '99+' : String(n); if (b.textContent !== t) b.textContent = t;
    b.classList.toggle('zero', n <= 0);
    plus.setAttribute('aria-label', (open ? 'Close buttons' : 'Open buttons') + (n > 0 ? ' (cart: ' + n + ')' : ''));
  }
  function set(o) {
    var d = dock(); if (!d) return; open = o; layout();
    d.classList.toggle('st-open', o); d.classList.toggle('st-col', !o);
    plus.setAttribute('aria-expanded', o ? 'true' : 'false'); badge();
  }
  function spinIn() {
    if (spun || !plus) return;
    if (document.body.classList.contains('st-pre')) { setTimeout(spinIn, 120); return; }
    spun = true; plus.classList.add('st-spin'); setTimeout(function () { plus.classList.remove('st-spin'); }, 1000);
  }
  function build() {
    var d = dock(); if (!d) return false;
    if (!plus) {
      plus = document.createElement('button'); plus.type = 'button'; plus.id = 'st-plus'; plus.className = 'st-plus';
      plus.innerHTML = PLUS + '<span class="st-plus-n zero">0</span>';
      plus.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); set(!open); });
      d.classList.add('st-col');
      d.appendChild(plus); set(false);
      new MutationObserver(function () { if (d.lastElementChild !== plus) d.appendChild(plus); layout(); }).observe(d, { childList: true });
      var c = document.getElementById('cart-fab-count'); if (c) new MutationObserver(badge).observe(c, { childList: true, characterData: true, subtree: true });
      new MutationObserver(function () { setTimeout(layout, 30); }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
      window.addEventListener('resize', layout);
      setInterval(function () { layout(); badge(); }, 1500);
      spinIn();
    }
    return true;
  }
  (function go(n) { if (build() || n > 200) return; setTimeout(function () { go(n + 1); }, 100); })(0);

  /* ---- Print Preview ---- */
  var EYE = '<svg class="st-pvi cl-pv" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5"/><path d="M14 3v5h5"/><path d="M19 8l-5-5"/><circle cx="16.5" cy="16.5" r="3"/><path d="M21 21l-2.3-2.3"/></svg>';
  var PRN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>';
  function addBtn() {
    var sh = document.getElementById('pull-sheet'); if (!sh || typeof window.stormPullDoc !== 'function') return;
    var pr = sh.querySelector('.pull-print[data-pull-print]'); if (!pr || sh.querySelector('.st-pvb')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'pull-print st-pvb'; b.innerHTML = EYE + 'Print Preview';
    if (pr.disabled) { b.disabled = true; b.style.opacity = '.5'; }
    pr.insertAdjacentElement('afterend', b); /* after: older code decorates the first .pull-print */
  }
  var pv = null;
  function fit() {
    if (!pv) return;
    var host = pv.querySelector('.st-pv-host'), fitEl = pv.querySelector('.st-pv-fit'), sc = pv.querySelector('.st-pv-scroll');
    var s = Math.min(1, (sc.clientWidth - 24) / 816);
    host.style.transform = 'scale(' + s + ')';
    fitEl.style.width = (816 * s) + 'px'; fitEl.style.height = (host.offsetHeight * s) + 'px';
  }
  function closePv() { if (!pv) return; var p = pv; pv = null; p.classList.remove('on'); setTimeout(function () { if (p.parentNode) p.remove(); }, 230); }
  function openPv() {
    var doc = null; try { doc = window.stormPullDoc(); } catch (e) {} if (!doc) return;
    if (pv) pv.remove();
    pv = document.createElement('div'); pv.id = 'st-pv'; pv.setAttribute('role', 'dialog'); pv.setAttribute('aria-label', 'Print preview');
    pv.innerHTML = '<div class="st-pv-bar"><button class="st-pv-x" type="button" aria-label="Close preview">\u00d7</button><div class="st-pv-t">Print Preview<span>Staging List \u00b7 Letter</span></div>'
      + '<button class="st-pv-p" type="button">' + PRN + 'Print</button></div><div class="st-pv-scroll"><div class="st-pv-fit"><div class="st-pv-host"></div></div></div>';
    var host = pv.querySelector('.st-pv-host'), root = host.attachShadow ? host.attachShadow({ mode: 'open' }) : host;
    var css = String(doc.css || '').replace(/@page\{[^}]*\}/g, '').replace(/(^|\})body\{/g, '$1.st-paper{');
    root.innerHTML = '<style>' + css + '.st-paper{box-sizing:border-box;width:816px;min-height:1056px;padding:43px 48px;background:#fff;box-shadow:0 6px 24px rgba(15,23,32,.16);border-radius:4px}</style><div class="st-paper">' + doc.body + '</div>';
    document.body.appendChild(pv);
    pv.querySelector('.st-pv-x').addEventListener('click', closePv);
    pv.querySelector('.st-pv-p').addEventListener('click', function () { try { window.stormPullPrintNow && window.stormPullPrintNow(); } catch (e) {} });
    [].slice.call(root.querySelectorAll('img')).forEach(function (im) { im.addEventListener('load', fit); });
    fit(); void pv.offsetWidth; pv.classList.add('on'); setTimeout(fit, 300);
  }
  window.addEventListener('resize', fit);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pv) closePv(); });
  document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('.st-pvb'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (!b.disabled) openPv(); }, true);
  (function watch(n) {
    var sh = document.getElementById('pull-sheet');
    if (sh) { addBtn(); new MutationObserver(addBtn).observe(sh, { childList: true, subtree: true }); return; }
    if (n < 200) setTimeout(function () { watch(n + 1); }, 150);
  })(0);
  window.stormPrintPreview = openPv;
})();

/* v192 (Hark, 2026-11-11, Dave): "How to Use the App" at the bottom of the side menu (glass icon tile like the other rows). Tap = full-screen
   help guide for the crew: X to close, scrolls, phone + iPad. Numbered chapters (chips on top jump to each one, a bar fills as you read,
   Next button at the end of each), plain step-by-step words. Top of the guide: a looping ~10 s CSS animation of a phone (Customer Search ->
   pick a job -> items fill the Pull List -> boxes get checked -> truck); prefers-reduced-motion shows the five frames side by side instead. */
(function () {
  if (window.__stormV192) return; window.__stormV192 = 1;
  var BL = '#29ABE2', INK = '#0F1720';
  var O = '#st-help';
  var st = document.createElement('style'); st.id = 'storm-v192-css';
  st.textContent = ''
    + '#drawer .drawer-item.st-help-row { padding: 12px 0 !important; margin-top: 4px; font-weight: 600; }'
    + O + ' { position: fixed; inset: 0; z-index: 2147482000; background: #F3F6F9; color: ' + INK + '; display: none; flex-direction: column; font: 16px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; -webkit-text-size-adjust: 100%; }'
    + O + '.open { display: flex; animation: shIn .28s ease both; }'
    + '@keyframes shIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }'
    + O + ' .sh-top { flex: none; background: #fff; box-shadow: 0 1px 0 #E3E9F0, 0 6px 18px rgba(15,23,32,.06); padding: calc(10px + env(safe-area-inset-top)) 14px 0; }'
    + O + ' .sh-bar { display: flex; align-items: center; gap: 10px; max-width: 760px; margin: 0 auto; }'
    + O + ' .sh-bar h2 { flex: 1; margin: 0; font-size: 20px; font-weight: 800; }'
    + O + ' .sh-x { width: 44px; height: 44px; flex: none; border: 0; border-radius: 12px; background: ' + INK + '; color: #fff; font-size: 26px; line-height: 1; padding: 0; cursor: pointer; }'
    + O + ' .sh-chips { display: flex; gap: 8px; overflow-x: auto; padding: 10px 0 10px; max-width: 760px; margin: 0 auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }'
    + O + ' .sh-chips::-webkit-scrollbar { display: none; }'
    + O + ' .sh-chip { flex: none; display: flex; align-items: center; gap: 6px; min-height: 40px; padding: 0 12px 0 6px; border-radius: 20px; border: 1px solid #DCE4EE; background: #fff; color: ' + INK + '; font-weight: 700; font-size: 14px; line-height: 1; font-family: inherit; cursor: pointer; white-space: nowrap; }'
    + O + ' .sh-chip b { width: 28px; height: 28px; border-radius: 50%; background: #EEF3F8; color: ' + INK + '; display: flex; align-items: center; justify-content: center; font-size: 14px; }'
    + O + ' .sh-chip.on { border-color: ' + BL + '; background: #EAF7FD; } ' + O + ' .sh-chip.on b, ' + O + ' .sh-chip.seen b { background: ' + BL + '; color: #fff; }'
    + O + ' .sh-prog { height: 4px; background: #E6EDF4; margin: 0 -14px; } ' + O + ' .sh-prog i { display: block; height: 100%; width: 0; background: ' + BL + '; transition: width .15s linear; }'
    + O + ' .sh-body { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 14px 14px calc(40px + env(safe-area-inset-bottom)); }'
    + O + ' .sh-wrap { max-width: 760px; margin: 0 auto; }'
    + O + ' .sh-card { background: #fff; border-radius: 18px; padding: 18px 16px; margin-bottom: 14px; box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 8px 24px rgba(15,23,32,.07); scroll-margin-top: 10px; }'
    + O + ' .sh-card h3 { display: flex; align-items: center; gap: 10px; margin: 0 0 10px; font-size: 20px; font-weight: 800; }'
    + O + ' .sh-card h3 b { width: 36px; height: 36px; flex: none; border-radius: 50%; background: ' + BL + '; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 17px; }'
    + O + ' .sh-card p { margin: 0 0 10px; color: #3B4754; }'
    + O + ' .sh-steps { list-style: none; margin: 0; padding: 0; counter-reset: s; }'
    + O + ' .sh-steps li { position: relative; padding: 10px 0 10px 42px; border-top: 1px solid #EEF2F6; counter-increment: s; }'
    + O + ' .sh-steps li:first-child { border-top: 0; }'
    + O + ' .sh-steps li::before { content: counter(s); position: absolute; left: 0; top: 9px; width: 28px; height: 28px; border-radius: 8px; background: #EAF7FD; color: #0B6F99; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; }'
    + O + ' .sh-steps.dots li::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: ' + BL + '; left: 9px; top: 18px; }'
    + O + ' .sh-k { display: inline-block; padding: 0 7px; border-radius: 6px; background: #EEF3F8; font-weight: 700; color: ' + INK + '; white-space: nowrap; }'
    + O + ' .sh-tip { margin-top: 10px; padding: 10px 12px; border-radius: 12px; background: #EAF7FD; color: #0B4F6E; font-size: 15px; }'
    + O + ' .sh-next { display: block; width: 100%; min-height: 52px; margin-top: 14px; border: 0; border-radius: 14px; background: ' + INK + '; color: #fff; font-weight: 700; font-size: 16px; line-height: 1; font-family: inherit; cursor: pointer; }'
    + O + ' .sh-next:active, ' + O + ' .sh-chip:active, ' + O + ' .sh-x:active { transform: scale(.97); }'
    + O + ' .sh-do, ' + O + ' .sh-dont { margin: 6px 0 0; }'
    + O + ' .sh-do li::before { content: "\\2713" !important; background: #E7F7EC !important; color: #15803D !important; }'
    + O + ' .sh-dont li::before { content: "\\2715" !important; background: #FDECEC !important; color: #B42318 !important; }'
    + O + ' .sh-two { display: grid; gap: 4px 18px; } @media (min-width: 640px) { ' + O + ' .sh-two { grid-template-columns: 1fr 1fr; } }'
    + O + ' .sh-two h4 { margin: 4px 0 0; font-size: 16px; }'
    /* animated explainer */
    + O + ' .sh-anim { display: flex; flex-direction: column; align-items: center; }'
    + O + ' .sh-ph { position: relative; width: 176px; height: 300px; border-radius: 26px; background: ' + INK + '; padding: 9px; box-sizing: border-box; box-shadow: 0 10px 30px rgba(15,23,32,.22); }'
    + O + ' .sh-scr { position: relative; width: 100%; height: 100%; border-radius: 18px; background: #F3F6F9; overflow: hidden; }'
    + O + ' .sh-sc { position: absolute; inset: 0; padding: 10px 9px; box-sizing: border-box; opacity: 0; animation: shScene 10s infinite both; }'
    + O + ' .sh-sc:nth-child(2) { animation-delay: 2s; } ' + O + ' .sh-sc:nth-child(3) { animation-delay: 4s; } ' + O + ' .sh-sc:nth-child(4) { animation-delay: 6s; } ' + O + ' .sh-sc:nth-child(5) { animation-delay: 8s; }'
    + '@keyframes shScene { 0% { opacity: 0; } 2.5%, 18% { opacity: 1; } 20%, 100% { opacity: 0; } }'
    + O + ' .sh-cap { position: relative; height: 24px; margin-top: 12px; width: 100%; text-align: center; font-weight: 700; color: ' + INK + '; }'
    + O + ' .sh-cap span { position: absolute; left: 0; right: 0; opacity: 0; animation: shScene 10s infinite both; }'
    + O + ' .sh-cap span:nth-child(2) { animation-delay: 2s; } ' + O + ' .sh-cap span:nth-child(3) { animation-delay: 4s; } ' + O + ' .sh-cap span:nth-child(4) { animation-delay: 6s; } ' + O + ' .sh-cap span:nth-child(5) { animation-delay: 8s; }'
    + O + ' .m-tog { display: flex; margin: 0 auto 8px; width: 120px; border-radius: 12px; background: #fff; box-shadow: 0 1px 3px rgba(15,23,32,.12); font-size: 9px; font-weight: 800; overflow: hidden; }'
    + O + ' .m-tog span { flex: 1; text-align: center; padding: 4px 0; } ' + O + ' .m-tog span:first-child { background: ' + BL + '; color: #fff; }'
    + O + ' .m-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; } ' + O + ' .m-grid i { height: 52px; border-radius: 8px; background: #fff; box-shadow: 0 1px 2px rgba(15,23,32,.1); }'
    + O + ' .m-dock { position: absolute; right: 9px; bottom: 12px; display: flex; flex-direction: column; gap: 6px; align-items: center; }'
    + O + ' .m-btn { width: 28px; height: 28px; border-radius: 8px; background: rgba(15,23,32,.55); display: flex; align-items: center; justify-content: center; }'
    + O + ' .m-btn svg { width: 16px; height: 16px; } ' + O + ' .m-plus { width: 28px; height: 28px; border-radius: 50%; background: #fff; box-shadow: 0 2px 6px rgba(15,23,32,.2); color: ' + INK + '; font-weight: 800; display: flex; align-items: center; justify-content: center; font-size: 18px; }'
    + O + ' .m-cs { position: relative; background: ' + BL + '; } ' + O + ' .m-lbl { position: absolute; right: 34px; white-space: nowrap; font-size: 8px; font-weight: 800; color: #0B6F99; background: #fff; border-radius: 6px; padding: 1px 4px; }'
    + O + ' .m-tap { position: absolute; width: 26px; height: 26px; border-radius: 50%; background: rgba(41,171,226,.35); border: 2px solid ' + BL + '; opacity: 0; pointer-events: none; animation: shTap 10s infinite both; }'
    + '@keyframes shTap { 0%, 6% { opacity: 0; transform: scale(1.6); } 9% { opacity: 1; transform: scale(1); } 11% { transform: scale(.8); } 14% { opacity: 1; transform: scale(1); } 17%, 100% { opacity: 0; } }'
    + O + ' .m-h { font-size: 11px; font-weight: 800; margin: 2px 0 8px; } '
    + O + ' .m-job { display: block; background: #fff; border-radius: 8px; padding: 6px 7px; margin-bottom: 6px; font-size: 9px; font-weight: 700; box-shadow: 0 1px 2px rgba(15,23,32,.1); border-left: 3px solid ' + BL + '; }'
    + O + ' .m-job small { display: block; font-weight: 500; color: #6B7280; } ' + O + ' .m-job em { font-style: normal; font-size: 7.5px; background: #FFF4DB; color: #8A5A00; border-radius: 4px; padding: 0 3px; margin-left: 3px; }'
    + O + ' .m-job.pick { animation: shPick 10s infinite both; animation-delay: 2s; }'
    + '@keyframes shPick { 0%, 7% { background: #fff; } 9%, 18% { background: #D8F1FB; box-shadow: 0 0 0 2px ' + BL + '; } 20%, 100% { background: #fff; } }'
    + O + ' .m-line { display: flex; align-items: center; gap: 6px; background: #fff; border-radius: 8px; padding: 6px; margin-bottom: 6px; font-size: 9px; font-weight: 700; box-shadow: 0 1px 2px rgba(15,23,32,.1); }'
    + O + ' .m-line i { width: 20px; height: 20px; border-radius: 5px; background: #E6EDF4; flex: none; } ' + O + ' .m-line span { flex: 1; }'
    + O + ' .m-box { width: 14px; height: 14px; border-radius: 4px; border: 2px solid #B8C4D0; flex: none; position: relative; box-sizing: border-box; }'
    + O + ' .sh-sc:nth-child(3) .m-line { opacity: 0; animation: shFill 10s infinite both; }'
    + O + ' .sh-sc:nth-child(3) .m-l1 { animation-delay: 4.3s; } ' + O + ' .sh-sc:nth-child(3) .m-l2 { animation-delay: 4.7s; } ' + O + ' .sh-sc:nth-child(3) .m-l3 { animation-delay: 5.1s; } ' + O + ' .sh-sc:nth-child(3) .m-l4 { animation-delay: 5.5s; }'
    + '@keyframes shFill { 0% { opacity: 0; transform: translateX(-14px); } 3%, 100% { opacity: 1; transform: none; } }'
    + O + ' .sh-sc:nth-child(4) .m-box { animation: shBox 10s infinite both; }'
    + O + ' .m-box::after { content: ""; position: absolute; left: 3px; top: 0; width: 4px; height: 7px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg) scale(0); }'
    + O + ' .sh-sc:nth-child(4) .m-box::after { animation: shTick 10s infinite both; animation-delay: inherit; }'
    + O + ' .sh-sc:nth-child(4) .m-l1 .m-box { animation-delay: 6.3s; } ' + O + ' .sh-sc:nth-child(4) .m-l2 .m-box { animation-delay: 6.7s; } ' + O + ' .sh-sc:nth-child(4) .m-l3 .m-box { animation-delay: 7.1s; } ' + O + ' .sh-sc:nth-child(4) .m-l4 .m-box { animation-delay: 7.5s; }'
    + '@keyframes shBox { 0% { background: transparent; border-color: #B8C4D0; } 2%, 100% { background: #16A34A; border-color: #16A34A; } }'
    + '@keyframes shTick { 0% { transform: rotate(45deg) scale(0); } 2%, 100% { transform: rotate(45deg) scale(1); } }'
    + O + ' .m-road { position: absolute; left: 0; right: 0; bottom: 70px; height: 3px; background: #CBD5E1; }'
    + O + ' .m-truck { position: absolute; left: 30px; bottom: 73px; width: 96px; animation: shTruck 10s infinite both; animation-delay: 8s; }'
    + '@keyframes shTruck { 0% { transform: translateX(-120px); } 6%, 14% { transform: none; } 19%, 100% { transform: translateX(150px); } }'
    + O + ' .m-done { position: absolute; left: 0; right: 0; top: 70px; text-align: center; font-size: 12px; font-weight: 800; color: #15803D; }'
    + O + ' .sh-strip { display: none; gap: 10px; overflow-x: auto; width: 100%; padding-bottom: 4px; }'
    + O + ' .sh-strip figure { margin: 0; flex: none; text-align: center; font-size: 13px; font-weight: 700; }'
    + O + ' .sh-strip .sh-ph { width: 132px; height: 226px; padding: 7px; } ' + O + ' .sh-strip .sh-sc { opacity: 1; animation: none; transform: scale(.75); transform-origin: 0 0; width: 133%; height: 133%; }'
    + O + ' .sh-strip .m-line, ' + O + ' .sh-strip .m-box, ' + O + ' .sh-strip .m-box::after, ' + O + ' .sh-strip .m-truck, ' + O + ' .sh-strip .m-job { animation: none !important; opacity: 1 !important; }'
    + O + ' .sh-strip .m-tap { opacity: 1; animation: none; } ' + O + ' .sh-strip .m-job.pick { background: #D8F1FB; box-shadow: 0 0 0 2px ' + BL + '; }'
    + O + ' .sh-strip .sh-f3 .m-box { background: transparent !important; border-color: #B8C4D0 !important; } ' + O + ' .sh-strip .sh-f3 .m-box::after { transform: rotate(45deg) scale(0) !important; }'
    + O + ' .sh-strip .m-box { background: #16A34A; border-color: #16A34A; } ' + O + ' .sh-strip .m-box::after { transform: rotate(45deg) scale(1); }'
    + '@media (prefers-reduced-motion: reduce) { ' + O + ' .sh-ph.sh-live, ' + O + ' .sh-cap { display: none; } ' + O + ' .sh-strip { display: flex; } ' + O + '.open { animation: none; } ' + O + ' .sh-prog i { transition: none; } }';
  document.head.appendChild(st);

  function k(t) { return '<span class="sh-k">' + t + '</span>'; }
  var ICO_CLIP = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/></svg>';
  var ICO_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var ICO_CART = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.5 11h10L20 7H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>';
  var TRUCK = '<svg viewBox="0 0 96 50"><rect x="2" y="8" width="58" height="30" rx="4" fill="' + BL + '"/><path d="M60 18h18l12 12v8H60z" fill="' + INK + '"/><rect x="66" y="21" width="10" height="7" rx="1" fill="#BFE9FA"/><text x="31" y="28" text-anchor="middle" font-size="10" font-weight="800" fill="#fff" font-family="Arial,sans-serif">STORM</text><circle cx="20" cy="40" r="7" fill="' + INK + '"/><circle cx="20" cy="40" r="3" fill="#CBD5E1"/><circle cx="76" cy="40" r="7" fill="' + INK + '"/><circle cx="76" cy="40" r="3" fill="#CBD5E1"/></svg>';
  var LINES = ['Sump pump', 'Drain tile · 1 roll', 'Gravel · 12 bags', 'Vapor barrier'];
  function lines() { return LINES.map(function (n, i) { return '<div class="m-line m-l' + (i + 1) + '"><i></i><span>' + n + '</span><b class="m-box"></b></div>'; }).join(''); }
  var SCENES = [
    '<div class="m-tog"><span>Staging Job</span><span>Inventory</span></div><div class="m-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>'
      + '<div class="m-dock"><div class="m-btn">' + ICO_CAM + '</div><div class="m-btn">' + ICO_CART + '</div><div class="m-btn m-cs">' + ICO_CLIP + '<span class="m-lbl">Customer Search</span></div><div class="m-plus">&times;</div></div>'
      + '<span class="m-tap" style="right:10px;bottom:80px"></span>',
    '<div class="m-h">Find a Job</div><div class="m-job pick">Smith<small>12 Elm St · Tue</small></div><div class="m-job">Garcia<em>Not scheduled</em><small>40 Oak Ave</small></div><div class="m-job">Lee<em>Past</em><small>7 Pine Rd</small></div>'
      + '<span class="m-tap" style="left:60px;top:34px;animation-delay:2s"></span>',
    '<div class="m-h">Customer Search · Smith</div>' + lines(),
    '<div class="m-h">Customer Search · Smith</div>' + lines(),
    '<div class="m-done">&#10003; Staged Job Complete</div><div class="m-road"></div><div class="m-truck">' + TRUCK + '</div>'
  ];
  var CAPS = ['1. Tap Customer Search', '2. Pick the job', '3. Load items', '4. Check each box onto the cart', '5. Staged Job Complete'];
  function anim() {
    try { if (window.stormHelpAnim) { var nx = window.stormHelpAnim(); if (nx) return nx; } } catch (e) {} /* v194: app-specific explainer */
    var live = '<div class="sh-ph sh-live"><div class="sh-scr">' + SCENES.map(function (s) { return '<div class="sh-sc">' + s + '</div>'; }).join('') + '</div></div>'
      + '<div class="sh-cap">' + CAPS.map(function (c) { return '<span>' + c + '</span>'; }).join('') + '</div>';
    var strip = '<div class="sh-strip">' + SCENES.map(function (s, i) { return '<figure class="sh-f' + (i + 1) + '"><div class="sh-ph"><div class="sh-scr"><div class="sh-sc">' + s + '</div></div></div><figcaption>' + CAPS[i] + '</figcaption></figure>'; }).join('') + '</div>';
    return '<div class="sh-card sh-anim" aria-label="Short animation: tap Customer Search, pick the job, load items, check each box as it goes on the staging cart, tap Staged Job Complete">' + live + strip + '</div>';
  }

  /* v196 (Hark, 2026-11-11, Dave approved): chapters rewritten for the new flow: Customer Search -> load items -> check as they go on
     the staging cart -> Staged Job Complete (that is the only step that takes stock out of inventory). */
  var CH = [
    { t: 'Getting around', s: 'Getting around', h:
      '<ol class="sh-steps">'
      + '<li><b>Top switch: ' + k('Staging Job') + ' | ' + k('Inventory') + '.</b> Staging Job = getting material ready for a customer\'s job. Inventory = counting what\'s on the shelf and ordering more (managers only: tapping ' + k('Inventory') + ' asks for the manager code, then switches right there).</li>'
      + '<li><b>White round ' + k('+') + ' bottom right.</b> Tap it and the buttons pop out: Camera, Cart, ' + k('Customer Search') + ' (clipboard, always there) and ' + k('Quote') + '. Tap it again (it turns into an X) to tuck them away.</li>'
      + '<li><b>Menu ' + k('&#9776;') + ' top left.</b> Customer Search, Staging, Products by store, Quote Templates, Resources (Checklists, Bin Labels and more), Open Jobber app, CompanyCam, and this guide at the bottom.</li>'
      + '</ol><div class="sh-tip">Lost? Close what\'s open with the X in its corner. You\'re back on the main list.</div>' },
    { t: 'Customer Search: load the job', s: 'Customer Search', h:
      '<p>Pick the customer and load what the job needs. Nothing comes out of inventory here.</p><ol class="sh-steps">'
      + '<li>Flip the top switch to ' + k('Staging Job') + '.</li>'
      + '<li>Tap ' + k('+') + ', then ' + k('Customer Search') + ' (clipboard).</li>'
      + '<li>Tap ' + k('Find a Job') + '. Jobber jobs are listed, upcoming first. ' + k('Not scheduled') + ' = signed, no date yet. ' + k('Past') + ' = last 7 days. Or type the customer name or address.</li>'
      + '<li>Tap the job, then ' + k('Load items') + '. (Not in Jobber? Tap ' + k('New Job') + ' and type the name and address.)</li>'
      + '<li>Add items: tap ' + k('+ Add to order') + ' on each item you need. They go on Customer Search. If the job has a Jobber quote, ' + k('Quote') + ' &rarr; ' + k('Load items') + ' does it for you.</li>'
      + '<li>Tap ' + k('Save Job') + '.</li>'
      + '<li>Want paper? ' + k('Print Preview') + ' shows the Staging List, then ' + k('Print') + '.</li>'
      + '</ol>' },
    { t: 'Check items onto the cart', s: 'Staging cart', h:
      '<ol class="sh-steps">'
      + '<li>Open the job: ' + k('+') + ' &rarr; ' + k('Customer Search') + ' &rarr; ' + k('Find a Job') + ', tap the saved job, ' + k('Edit list') + '. (Or menu &rarr; Staging.)</li>'
      + '<li>Grab each line and put it on the staging cart.</li>'
      + '<li>Check its box when it\'s <b>on the cart</b>. The ring at the top counts what\'s on. Checking does <b>not</b> change inventory. Uncheck if it comes back off.</li>'
      + '<li>Footage items read like <b>Job 99 ft &middot; Grab 1 roll (100 ft)</b>. Grab whole rolls and sticks, never cut on the shelf.</li>'
      + '</ol><div class="sh-tip">Checks show up on the rest of the crew\'s phones too, so two people can stage the same job. No signal? Checks wait on the phone and send when it\'s back.</div>' },
    { t: 'Staged Job Complete', s: 'Complete', h:
      '<p>This is the step that takes the stock out of inventory. Do it once the cart is done.</p><ol class="sh-steps">'
      + '<li>Scroll to the bottom of Customer Search and tap the big green ' + k('Staged Job Complete') + '.</li>'
      + '<li>Check the list: every checked item and how many (footage says <b>Grab 2 rolls</b>). If some lines aren\'t checked it tells you, e.g. <b>3 items not on the cart</b>. Those don\'t come out of inventory.</li>'
      + '<li>Tap ' + k('Stage') + '. The checked items come off ' + k('On hand') + ', once.</li>'
      + '<li>The job now shows a green <b>Staged &middot; date and time</b> banner. The boxes lock, and lines that weren\'t checked say <b>Not staged</b>.</li>'
      + '<li>A job can only be staged once. Made a mistake? A manager taps ' + k('Unstage') + ' on the banner; that puts back exactly what came out.</li>'
      + '</ol><div class="sh-tip">No customer on the list? The button reads <b>Pick a customer to stage</b>. Find or type the customer first.</div>' },
    { t: 'The screens, in order', s: 'Screens', h:
      '<ol class="sh-steps">'
      + '<li><b>Find a Job</b>: pick the customer.</li>'
      + '<li><b>Customer Search</b>: what to grab for that job, a box to check for each line as it goes on the cart, and ' + k('Staged Job Complete') + ' at the bottom.</li>'
      + '<li><b>Item photo &amp; details</b>: tap an item to see what it looks like. Tap or X to go back.</li>'
      + '<li><b>Staged Job Complete?</b>: the confirm list. ' + k('Stage') + ' takes the checked items out of inventory, ' + k('Cancel') + ' goes back.</li>'
      + '<li><b>Print Preview</b>: the printed Staging List on screen. ' + k('Print') + ' prints it, X goes back.</li>'
      + '<li><b>Back</b>: X closes each screen, one at a time, back to the main list.</li>'
      + '</ol>' },
    { t: 'Camera & QR codes', s: 'Camera', h:
      '<ol class="sh-steps">'
      + '<li>Tap ' + k('+') + ', then the camera.</li>'
      + '<li>Point it at the QR code on a bin label. It beeps and shows <b>Added to cart</b>.</li>'
      + '<li>Scan the same label again to add one more. Tap the pop-up to see the cart and change amounts.</li>'
      + '<li>Tap the X at the top. What you scanned is in the app\'s cart.</li>'
      + '</ol><div class="sh-tip">Bin label stickers: menu &rarr; Resources &rarr; Bin Labels, pick the store, print. One label per bin. If a code isn\'t a STORM label, the camera says so. Nothing gets added.</div>' },
    { t: 'Crew view & Manager Login', s: 'Manager', h:
      '<ol class="sh-steps">'
      + '<li>The app opens in the <b>crew view</b>: no prices, no ordering, no count changes. No code needed.</li>'
      + '<li>Crew can browse items, use Customer Search / Find a Job, print the Staging List, scan labels, <b>check boxes as items go on the cart</b> and tap ' + k('Staged Job Complete') + ' (that takes the checked items out of inventory).</li>'
      + '<li>Prices, ' + k('On hand') + ' counts, ' + k('Keep on hand') + ', Needs Ordering, the cart, ordering and ' + k('Unstage') + ' are for Dave and the main guy: tap ' + k('Inventory') + ' on the top switch (or menu &rarr; ' + k('Manager Login') + '), type the manager code, and the app switches to Inventory with prices right there.</li>'
      + '<li>A manager phone stays logged in for 30 days. Menu &rarr; ' + k('Manager \u00b7 Log out') + ' goes straight back to the crew view (prices hidden).</li>'
      + '<li>Too many wrong codes locks it for 10 minutes.</li>'
      + '</ol>' },
    { t: 'Do & Don\'t', s: 'Do / Don\'t', h:
      '<div class="sh-two"><div><h4>Do</h4><ol class="sh-steps sh-do">'
      + '<li>Check a box only when it\'s on the staging cart.</li><li>Uncheck if it comes back off the cart.</li><li>Tap Staged Job Complete once the cart is done.</li><li>Grab whole rolls and sticks.</li><li>Save Job before you print.</li><li>Fix a count right away if the shelf doesn\'t match.</li></ol></div>'
      + '<div><h4>Don\'t</h4><ol class="sh-steps sh-dont">'
      + '<li>Don\'t check boxes ahead of time.</li><li>Don\'t tap Staged Job Complete before the cart is loaded.</li><li>Don\'t share the manager code.</li><li>Don\'t guess counts. Count the bin.</li><li>Don\'t take stuff without it being on Customer Search.</li></ol></div></div>' }
  ];

  var el = null, body = null, chips = null, bar = null;
  function build() {
    if (el) return el;
    try { if (window.stormHelpCH207) { var ch207 = window.stormHelpCH207(k); if (ch207 && ch207.length) CH = ch207; } } catch (x207) {} /* v207: chapters for the app as it is now */
    el = document.createElement('div'); el.id = 'st-help'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', 'How to Use the App');
    var top = '<div class="sh-top"><div class="sh-bar"><h2>How to Use the App</h2><button class="sh-x" type="button" data-sh-x aria-label="Close">&times;</button></div>'
      + '<div class="sh-chips">' + CH.map(function (c, i) { return '<button class="sh-chip" type="button" data-sh-go="' + i + '"><b>' + (i + 1) + '</b>' + c.s + '</button>'; }).join('') + '</div>'
      + '<div class="sh-prog"><i></i></div></div>';
    var cards = CH.map(function (c, i) {
      return '<section class="sh-card" id="sh-ch' + i + '"><h3><b>' + (i + 1) + '</b>' + c.t + '</h3>' + c.h
        + (i < CH.length - 1 ? '<button class="sh-next" type="button" data-sh-go="' + (i + 1) + '">Next: ' + CH[i + 1].t + ' &rarr;</button>' : '<button class="sh-next" type="button" data-sh-x>Done</button>') + '</section>';
    }).join('');
    el.innerHTML = top + '<div class="sh-body"><div class="sh-wrap">' + anim() + cards + '</div></div>';
    document.body.appendChild(el);
    body = el.querySelector('.sh-body'); chips = el.querySelectorAll('.sh-chip'); bar = el.querySelector('.sh-prog i');
    el.addEventListener('click', function (e) {
      var t = e.target; if (!t || !t.closest) return;
      if (t.closest('[data-sh-x]')) { close(); return; }
      var g = t.closest('[data-sh-go]'); if (g) go(+g.getAttribute('data-sh-go'));
    });
    body.addEventListener('scroll', track, { passive: true });
    return el;
  }
  /* v195 (Dave): Next lands exactly on the next chapter. offsetTop counted from the whole guide (sticky title bar + chapter chips
     included), so it overshot by that much; measure the card against the scrolling body instead, and settle again after the smooth scroll. */
  var GAP = 12, goT = 0;
  function topIn(c) { return Math.round(c.getBoundingClientRect().top - body.getBoundingClientRect().top + body.scrollTop); }
  function go(i) {
    var c = document.getElementById('sh-ch' + i); if (!c) return;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    /* the last chapters are short on a tall screen (iPad): room below them so they can still land at the top */
    var wrap = body.querySelector('.sh-wrap'), spc = body.querySelector('.sh-spc');
    if (!spc && wrap) { spc = document.createElement('div'); spc.className = 'sh-spc'; spc.setAttribute('aria-hidden', 'true'); spc.style.height = '0px'; wrap.appendChild(spc); }
    if (spc) { var cur0 = parseFloat(spc.style.height) || 0, need = (topIn(c) - GAP) - (body.scrollHeight - body.clientHeight) + cur0 + 8; spc.style.height = Math.max(cur0, need, 0) + 'px'; }
    var y = Math.max(0, Math.min(topIn(c) - GAP, body.scrollHeight - body.clientHeight));
    body.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    clearTimeout(goT);
    var settle = function (n) { goT = setTimeout(function () { var y2 = Math.max(0, Math.min(topIn(c) - GAP, body.scrollHeight - body.clientHeight)); if (Math.abs(body.scrollTop - y2) > 1) { if (n > 0 && Math.abs(body.scrollTop - y2) > 40) { settle(n - 1); return; } body.scrollTop = y2; } }, reduce ? 30 : 650); };
    settle(3);
  }
  function track() {
    var max = body.scrollHeight - body.clientHeight, y = body.scrollTop;
    bar.style.width = (max > 0 ? Math.min(100, y / max * 100) : 100) + '%';
    var cur = 0; for (var i = 0; i < CH.length; i++) { var c = document.getElementById('sh-ch' + i); if (c && topIn(c) - GAP - 40 <= y) cur = i; }
    if (y >= max - 4) cur = CH.length - 1;
    chips.forEach(function (ch, i) { ch.classList.toggle('on', i === cur); ch.classList.toggle('seen', i < cur); });
    var on = chips[cur]; if (on && on.scrollIntoView && on.dataset.cur !== '1') { chips.forEach(function (c) { c.dataset.cur = ''; }); on.dataset.cur = '1'; try { on.scrollIntoView({ block: 'nearest', inline: 'nearest' }); } catch (x) {} }
  }
  function open() { build(); var sp = body.querySelector('.sh-spc'); if (sp) sp.style.height = '0px'; body.scrollTop = 0; el.classList.add('open'); track(); }
  function close() { if (el) el.classList.remove('open'); }
  window.stormOpenHelp = open;
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && el && el.classList.contains('open')) close(); });

  var ICO = '<svg class="st-help-ico" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.6"/><path d="M12 17.2h.01"/></svg>';
  function addRow() {
    var dr = document.getElementById('drawer'); if (!dr) return false;
    if (document.getElementById('st-help-row')) return true;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'st-help-row'; b.className = 'drawer-item st-help-row';
    b.innerHTML = ICO + '<span class="drawer-item-name">How to Use the App</span>';
    var foot = dr.querySelector('.drawer-foot'); (foot || dr).appendChild(b);
    return true;
  }
  (function wait(n) { if (addRow()) return; if (n < 200) setTimeout(function () { wait(n + 1); }, 150); })(0);
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest || !t.closest('#st-help-row')) return;
    e.stopImmediatePropagation(); e.preventDefault();
    try { closeDrawer(); } catch (x) {}
    setTimeout(open, 170);
  }, true);
})();

/* v193 (Hark, 2026-11-11, Dave approved): pairs with app v145.
   1. "Manager Login" row in the side menu (lock icon, above How to Use the App) opens the manager code screen (window.stormAccess.login);
      once logged in it reads "Manager · Log out" and taps back to the crew view (stormAccess.logout). No lock screen on open (Dave, 10:46).
   2. Resource Center > Insurance Certificates: a page with two contacts (Lindsey, Alliance Group: workers comp; Suzanne, Paris-Kirwan:
      general liability & disability). Each opens a contact page with a tap-to-email button (mailto, subject prefilled). Same res-list /
      res-view pages, close button and back button as Logos / Media. */
(function () {
  if (window.__stormV193) return; window.__stormV193 = 1;
  var LOGO = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/logos/STORM-logo-color-transparent.svg?v=91';
  var SUBJ = 'Certificate of Insurance request \u2013 STORM Basement Waterproofing';
  var NOTE = 'For commercial permits (towns) and customer homes';
  var INS = [
    { id: 'lindsey', name: 'Lindsey', company: 'Alliance Group', what: 'Workers comp certificates', ask: 'workers comp', email: 'lindseym@alliance-group.net' },
    { id: 'suzanne', name: 'Suzanne', company: 'Paris-Kirwan', what: 'General liability & disability certificates', ask: 'general liability and disability', email: 'Suzannes@paris-kirwan.com' }
  ];
  function e$(x) { return document.getElementById(x); }
  function h(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var st = document.createElement('style'); st.id = 'storm-v193-css';
  st.textContent = ''
    + '#drawer .drawer-item.st-lock-row { padding: 12px 0 !important; margin-top: 4px; font-weight: 600; }'
    + '#drawer .drawer-item.st-lock-row .st-lock-who { margin-left: auto; padding: 2px 9px; border-radius: 10px; background: rgba(41,171,226,.14); color: #1F9BD7; font-size: 12px; font-weight: 700; }'
    + '.st-ins-av { flex: none; width: 46px; height: 46px; border-radius: 50%; background: #29ABE2; color: #fff; display: flex; align-items: center; justify-content: center; font: 800 19px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }'
    + '.st-ins-card { display: flex; align-items: center; gap: 12px; cursor: pointer; }'
    + '.st-ins-card .bl-info { flex: 1; min-width: 0; }'
    + '.st-ins-head { display: flex; align-items: center; gap: 14px; margin: 4px 0 6px; }'
    + '.st-ins-head .st-ins-av { width: 60px; height: 60px; font-size: 24px; }'
    + '.st-ins-head .detail-name { margin: 0 !important; }'
    + '.st-ins-co { font-size: 15px; color: #6B7280; font-weight: 600; margin-top: 2px; }'
    + '.st-ins-rows { background: #fff; border: 1px solid #E6EBF1; border-radius: 14px; overflow: hidden; margin-top: 14px; }'
    + '.st-ins-row { display: flex; gap: 12px; padding: 12px 14px; border-top: 1px solid #F0F2F5; font-size: 15px; color: #0F1720; }'
    + '.st-ins-row:first-child { border-top: 0; }'
    + '.st-ins-row > span { flex: none; width: 86px; color: #6B7280; font-weight: 600; }'
    + '.st-ins-row > b { flex: 1; min-width: 0; font-weight: 600; overflow-wrap: anywhere; -webkit-user-select: text; user-select: text; }'
    + 'a.res-dl.st-ins-mail { text-decoration: none; color: #fff; }';
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();

  var SHIELD = '<svg class="res-ico" viewBox="0 0 24 24" fill="none" stroke="#16212E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>';
  var MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  var LOCK = '<svg class="st-help-ico" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';

  /* 1. Manager Login / Manager · Log out */
  function mgr() { try { return !!(window.stormAccess && stormAccess.isMgr()); } catch (e) { return false; } }
  function addLock() {
    var dr = e$('drawer'); if (!dr) return false;
    var b = e$('st-lock-row');
    if (!b) {
      b = document.createElement('button'); b.type = 'button'; b.id = 'st-lock-row'; b.className = 'drawer-item st-lock-row';
      var foot = dr.querySelector('.drawer-foot'), help = e$('st-help-row');
      if (help && help.parentNode) help.parentNode.insertBefore(b, help); else (foot || dr).appendChild(b);
    }
    var m = mgr(); b.innerHTML = LOCK + '<span class="drawer-item-name">' + (m ? 'Manager \u00b7 Log out' : 'Manager Login') + '</span>';
    return true;
  }
  (function wait(n) { if (addLock() && e$('st-help-row')) { var b = e$('st-lock-row'), hr = e$('st-help-row'); if (b && hr && b.nextSibling !== hr && hr.parentNode) hr.parentNode.insertBefore(b, hr); return; } if (n < 200) setTimeout(function () { wait(n + 1); }, 150); })(0);
  window.addEventListener('stormaccess', addLock);

  /* 2. Insurance Certificates */
  function addIns() {
    var res = e$('drawer-resources'), box = res && res.querySelector(':scope > .drawer-items'); if (!box) return false;
    if (box.querySelector('[data-ins-page]')) return true;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'drawer-item'; b.setAttribute('data-ins-page', '1');
    b.innerHTML = SHIELD + '<span class="drawer-item-name">Insurance Certificates</span><span class="drawer-chevron">&#9662;</span>';
    box.appendChild(b);
    return true;
  }
  (function wait(n) { if (addIns()) return; if (n < 200) setTimeout(function () { wait(n + 1); }, 150); })(0);
  function page(id) { var v = e$(id); if (!v) { v = document.createElement('div'); v.id = id; v.className = 'detail-overlay res-pg'; document.body.appendChild(v); } return v; }
  function show(v, kind) { v.classList.add('open'); v.scrollTop = 0; v.classList.remove('res-in'); void v.offsetWidth; v.classList.add('res-in'); try { history.pushState({ overlay: kind }, ''); } catch (x) {} }
  function bar(t, noLogo) { return '<div class="detail-bar"><button class="detail-close" type="button" data-res-close aria-label="Close">&times;</button><div class="res-title">' + h(t) + '</div>' + (noLogo ? '' : '<img class="res-hlogo" src="' + LOGO + '" alt="">') + '</div>'; }
  /* v194 (Dave): the main screen's STORM logo (same markup as the header), centered at the top of the Insurance Certificates pages */
  function brand() { var b = ''; try { b = window.stormBrandLogoHTML ? window.stormBrandLogoHTML(true) : ''; } catch (e) {} return b ? '<div class="st-brand st-ins-brand">' + b + '</div>' : ''; }
  function av(c) { return '<span class="st-ins-av" aria-hidden="true">' + h(c.name.charAt(0)) + '</span>'; }
  function openList() {
    var v = page('res-list');
    v.innerHTML = bar('Insurance Certificates', true) + '<div class="detail-body" style="max-width:1100px">' + brand() + '<p class="bl-intro">' + h(NOTE) + '. Tap a contact to email a certificate request.</p><div class="bl-cat">Insurance Certificates</div><div class="bl-grid">'
      + INS.map(function (c) { return '<div class="bl-card st-ins-card" role="button" tabindex="0" data-ins-contact="' + c.id + '">' + av(c) + '<div class="bl-info"><div class="bl-name">' + h(c.name) + ' \u00b7 ' + h(c.company) + '</div><div class="bl-state">' + h(c.what) + ' &rsaquo;</div></div></div>'; }).join('')
      + '</div></div>';
    show(v, 'res-list');
  }
  function mailto(c) {
    var body = 'Hi ' + c.name + ',\n\nCould you please send a ' + c.ask + ' certificate of insurance for STORM Basement Waterproofing LLC?\n\nCertificate holder (name and address):\n\n\nThank you,\n';
    return 'mailto:' + c.email + '?subject=' + encodeURIComponent(SUBJ) + '&body=' + encodeURIComponent(body);
  }
  function openContact(id) {
    var c = INS.filter(function (x) { return x.id === id; })[0]; if (!c) return;
    var v = page('res-view');
    v.innerHTML = bar(c.name, true) + '<div class="detail-body">' + brand()
      + '<div class="st-ins-head">' + av(c) + '<div><div class="detail-name">' + h(c.name) + '</div><div class="st-ins-co">' + h(c.company) + '</div></div></div>'
      + '<div class="st-ins-rows"><div class="st-ins-row"><span>Request</span><b>' + h(c.what) + '</b></div><div class="st-ins-row"><span>Company</span><b>' + h(c.company) + '</b></div><div class="st-ins-row"><span>Email</span><b>' + h(c.email) + '</b></div></div>'
      + '<p class="res-note">' + h(NOTE) + '. Put the certificate holder\'s name and address in the email.</p>'
      + '<a class="res-dl st-ins-mail" href="' + h(mailto(c)) + '" target="_blank" rel="noopener">' + MAIL + '<span class="res-dlt">Email ' + h(c.name) + '<small>' + h(c.email) + '</small></span></a>'
      + '</div>';
    show(v, 'res-view');
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('#st-lock-row')) { e.stopImmediatePropagation(); e.preventDefault(); try { closeDrawer(); } catch (x) {} try { if (window.stormAccess) { if (stormAccess.isMgr()) stormAccess.logout(); else stormAccess.login(); } } catch (x) {} return; }
    if (t.closest('[data-ins-page]')) { e.stopImmediatePropagation(); e.preventDefault(); openList(); return; }
    var c = t.closest('[data-ins-contact]'); if (c) { e.stopImmediatePropagation(); e.preventDefault(); openContact(c.getAttribute('data-ins-contact')); return; }
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key !== 'Enter' && e.key !== ' ') return; var c = e.target && e.target.closest && e.target.closest('[data-ins-contact]'); if (c) { e.preventDefault(); openContact(c.getAttribute('data-ins-contact')); } });
})();

/* v194 (Hark, 2026-11-11 11:28, Dave): pairs with app v146.
   1. Side menu bottom no longer "smashed up": Jobber + CompanyCam share one row (two white buttons), Manager Login and How to Use the App are
      full-width rows under them; nothing squeezed, the menu scrolls, and it keeps clear of the iPhone home bar (the wrapper now tells the app
      how tall the notch / home bar areas are: --st-sat / --st-sab, because env() reads 0 inside the Google frames).
   2. Manager Login is in place (app v146): no reload, no video, no order-type picker.
   3. Insurance Certificates pages: the main screen's STORM logo (same header markup) centered at the top (window.stormBrandLogoHTML).
   4. How to Use the App: room at the bottom of every chapter and the Done button (safe area, iPad), guide sits above the version tag.
   5. New explainer at the top of the guide: the real app, crew view (no prices): header with the STORM logo, Stage Job | Inventory,
      white item cards with real photos and On hand pills, the + opening to camera / cart / Customer Search / Quote, Find a Job with
      Not scheduled / Past tags, the Pull List with blue x2 and check boxes, Print Preview, and the STORM truck. CSS only, 14 s loop,
      reduced-motion shows the frames side by side. */
(function () {
  if (window.__stormV194) return; window.__stormV194 = 1;
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var BL = '#29ABE2', BLD = '#1F9BD7', INK = '#0F1720', MUTE = '#6B7280', SH = '0 1px 2px rgba(15,23,32,.06), 0 6px 18px rgba(15,23,32,.08)';

  /* ---- safe area from the wrapper ---- */
  function setSafe(t, b) { var d = document.documentElement.style; d.setProperty('--st-sat', Math.max(0, +t || 0) + 'px'); d.setProperty('--st-sab', Math.max(0, +b || 0) + 'px'); }
  window.addEventListener('message', function (e) { var m = e.data; if (m && m.storm === 'safe') setSafe(m.t, m.b); });
  (function ask(n) { try { if (window.top !== window) window.top.postMessage({ storm: 'safeQ' }, '*'); } catch (e) {} if (n < 4) setTimeout(function () { ask(n + 1); }, 1500 * (n + 1)); })(0);
  window.addEventListener('orientationchange', function () { setTimeout(function () { try { window.top.postMessage({ storm: 'safeQ' }, '*'); } catch (e) {} }, 400); });

  /* ---- the main screen's logo markup ---- */
  window.stormBrandLogoHTML = function (withTrace) {
    var lg = document.querySelector('header .storm-logo-lit');
    if (lg) {
      var c = lg.cloneNode(true);
      ['flash', 'present', 'go'].forEach(function (k) { c.classList.remove(k); });
      c.removeAttribute('id'); c.setAttribute('aria-label', 'STORM Basement Waterproofing');
      Array.prototype.forEach.call(c.querySelectorAll('[id]'), function (x) { x.removeAttribute('id'); });
      if (!withTrace) Array.prototype.forEach.call(c.querySelectorAll('.sll-trace'), function (x) { x.parentNode.removeChild(x); });
      return c.outerHTML;
    }
    return '<div class="storm-logo-lit" role="img" aria-label="STORM Basement Waterproofing"><img class="sla-sub" src="' + A + 'sub.png" alt=""><img class="sla-storm" src="' + A + 'storm.png" alt=""><img class="sla-drop" src="' + A + 'drop.png" alt=""></div>';
  };

  var D = 'html body #drawer#drawer.drawer'; /* id twice: beats v179's html body.cl #drawer.drawer */
  var H = 'html body #st-help';
  var SAB = 'max(var(--st-sab, 0px), env(safe-area-inset-bottom))', SAT = 'max(var(--st-sat, 0px), env(safe-area-inset-top))';
  var css = ''
    /* 1. drawer footer */
    + D + ' { padding-bottom: calc(14px + ' + SAB + ') !important; overflow-y: auto !important; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; }'
    + D + ' .drawer-foot { display: grid !important; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important; gap: 10px !important; align-items: stretch !important; justify-content: stretch !important; flex: none !important; height: auto !important; min-height: 0 !important; margin: 18px 16px 0 !important; padding: 0 !important; border-top: 0 !important; overflow: visible !important; }'
    + D + ' .drawer-foot .st164-div { display: none !important; }'
    + D + ' .drawer-foot .drawer-jobber { grid-column: auto !important; width: auto !important; min-width: 0 !important; min-height: 52px !important; height: auto !important; flex: none !important; }'
    + D + ' .drawer-foot .drawer-jobber img { max-width: 100% !important; height: 22px !important; }'
    + D + ' .drawer-foot #st-lock-row, ' + D + ' .drawer-foot #st-help-row { grid-column: 1 / -1 !important; display: flex !important; flex-direction: row !important; align-items: center !important; gap: 12px !important; width: 100% !important; min-width: 0 !important; height: auto !important; min-height: 54px !important; margin: 0 !important; padding: 9px 14px !important; box-sizing: border-box !important; background: #fff !important; color: ' + INK + ' !important; border: 0 !important; border-radius: 14px !important; box-shadow: ' + SH + ' !important; text-align: left !important; font-size: 16px !important; font-weight: 700 !important; line-height: 1.2 !important; writing-mode: horizontal-tb !important; cursor: pointer; }'
    + D + ' .drawer-foot #st-lock-row { margin-top: 4px !important; }'
    + D + ' .drawer-foot #st-lock-row .drawer-item-name, ' + D + ' .drawer-foot #st-help-row .drawer-item-name { flex: 1 1 auto !important; min-width: 0 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; color: ' + INK + ' !important; font-size: 16px !important; font-weight: 700 !important; }'
    + D + ' .drawer-foot #st-lock-row::after, ' + D + ' .drawer-foot #st-help-row::after { content: "\\203A"; flex: none; font-size: 22px; line-height: 1; color: #9AA6B2; font-weight: 600; }'
    + D + ' .drawer-foot .st-help-ico { flex: none !important; width: 34px !important; height: 34px !important; padding: 7px !important; box-sizing: border-box !important; border-radius: 10px !important; background: #EEF3F8 !important; stroke: ' + INK + ' !important; margin: 0 !important; }'
    + D + ' .drawer-foot .st-help-ico * { stroke: ' + INK + ' !important; }'
    + D + ' .drawer-foot #st-lock-row .st-lock-who { margin-left: 0 !important; }'
    + D + ' #cl-ver { padding: 14px 0 6px !important; text-align: center; }'
    /* 3. insurance pages: main-screen logo centered at the top */
    + '.st-brand { display: flex; justify-content: center; margin: 6px 0 16px; pointer-events: none; }'
    + '.st-brand .storm-logo-lit { width: min(60vw, 220px) !important; filter: none !important; margin: 0 auto !important; cursor: default !important; animation: none !important; }'
    + '.st-brand .storm-logo-lit .sla-storm { filter: brightness(0) !important; }'
    + '.st-brand .storm-logo-lit .sll-trace { opacity: 0 !important; }'
    + '.st-brand .storm-logo-lit img { animation: none !important; }'
    + '#storm-lock .st-lock-brand { margin: 0 0 16px; } #storm-lock .st-lock-brand .storm-logo-lit { width: min(56vw, 190px) !important; }'
    /* 4. guide spacing */
    + H + ' { z-index: 2147483200 !important; height: 100% !important; }'
    + H + ' .sh-top { padding-top: calc(10px + ' + SAT + ') !important; }'
    + H + ' .sh-body { flex: 1 1 auto !important; min-height: 0 !important; overscroll-behavior: contain; padding: 14px 14px calc(84px + ' + SAB + ') !important; }'
    + H + ' .sh-card { margin-bottom: 18px !important; padding-bottom: 20px !important; overflow: visible !important; }'
    + H + ' .sh-card:last-child { margin-bottom: 0 !important; }'
    + H + ' .sh-next { margin-top: 18px !important; min-height: 54px !important; padding: 0 16px !important; line-height: 1.2 !important; white-space: normal !important; }'
    + H + ' .sh-steps li { overflow-wrap: anywhere; }'
    + H + ' .sh-k { white-space: normal !important; }'
    + '@media (min-width: 700px) { ' + H + ' .sh-body { padding-left: 24px !important; padding-right: 24px !important; } }'
    /* 5. explainer */
    + H + ' .xa { display: flex; flex-direction: column; align-items: center; }'
    + H + ' .xa-ph { position: relative; width: 214px; height: 432px; border-radius: 34px; background: ' + INK + '; padding: 9px; box-sizing: border-box; box-shadow: 0 14px 34px rgba(15,23,32,.25); flex: none; }'
    + H + ' .xa-ph::before { content: ""; position: absolute; left: 50%; top: 13px; width: 54px; height: 14px; margin-left: -27px; border-radius: 8px; background: ' + INK + '; z-index: 5; }'
    + H + ' .xa-scr { position: relative; width: 196px; height: 414px; border-radius: 26px; background: #EEF2F7; overflow: hidden; font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: ' + INK + '; }'
    + '@media (min-width: 700px) { ' + H + ' .xa-ph.xa-live { zoom: 1.2; } }'
    + H + ' .xa-sc { position: absolute; inset: 0; opacity: 0; animation: xaScene 14s infinite both; }'
    + '@keyframes xaScene { 0% { opacity: 0; } 1.6%, 12.8% { opacity: 1; } 14.3%, 100% { opacity: 0; } }'
    + H + ' .xa-cap { position: relative; height: 26px; margin-top: 14px; width: 100%; text-align: center; font-weight: 800; font-size: 15px; color: ' + INK + '; }'
    + H + ' .xa-cap span { position: absolute; left: 0; right: 0; opacity: 0; animation: xaScene 14s infinite both; }'
    /* main screen bits */
    + H + ' .xa-hd { position: relative; height: 70px; padding-top: 28px; box-sizing: border-box; }'
    + H + ' .xa-ham, ' + H + ' .xa-srch { position: absolute; top: 30px; width: 24px; height: 24px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgba(15,23,32,.14); display: flex; align-items: center; justify-content: center; }'
    + H + ' .xa-ham { left: 9px; flex-direction: column; gap: 2px; } ' + H + ' .xa-ham i { display: block; width: 10px; height: 1.6px; border-radius: 1px; background: ' + INK + '; }'
    + H + ' .xa-srch { right: 9px; } ' + H + ' .xa-srch svg { width: 11px; height: 11px; }'
    + H + ' .xa-logo { display: flex; justify-content: center; }'
    + H + ' .xa-logo .storm-logo-lit { width: 82px !important; filter: none !important; margin: 0 auto !important; animation: none !important; cursor: default !important; }'
    + H + ' .xa-logo .storm-logo-lit .sla-storm { filter: brightness(0) !important; } ' + H + ' .xa-logo .storm-logo-lit img { animation: none !important; }'
    + H + ' .xa-tog { display: flex; width: 116px; margin: 5px auto 0; padding: 2px; border-radius: 12px; background: #fff; box-shadow: 0 1px 3px rgba(15,23,32,.12); font-size: 7.5px; font-weight: 800; }'
    + H + ' .xa-tog span { flex: 1; text-align: center; padding: 3px 0; border-radius: 10px; color: ' + INK + '; } ' + H + ' .xa-tog span.on { background: ' + BL + '; color: #fff; }'
    + H + ' .xa-sbar { margin: 9px 8px 0; height: 20px; border-radius: 9px; background: #fff; box-shadow: 0 1px 2px rgba(15,23,32,.08); font-size: 7px; color: #9AA6B2; display: flex; align-items: center; padding: 0 8px; }'
    + H + ' .xa-chips { display: flex; gap: 4px; margin: 7px 8px 0; } ' + H + ' .xa-chips span { padding: 3px 7px; border-radius: 9px; background: #fff; font-size: 6.5px; font-weight: 700; box-shadow: 0 1px 2px rgba(15,23,32,.08); } ' + H + ' .xa-chips span.on { background: ' + BL + '; color: #fff; }'
    + H + ' .xa-sec { margin: 9px 10px 4px; font-size: 6.5px; font-weight: 800; letter-spacing: .1em; color: ' + MUTE + '; }'
    + H + ' .xa-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 0 8px; }'
    + H + ' .xa-card { background: #fff; border-radius: 10px; padding: 5px; box-shadow: 0 1px 3px rgba(15,23,32,.09); min-width: 0; }'
    + H + ' .xa-card .xa-im { height: 58px; border-radius: 7px; background: #fff center / contain no-repeat; }'
    + H + ' .xa-card b { display: block; margin-top: 4px; font-size: 7px; line-height: 1.2; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + H + ' .xa-card small { display: block; font-size: 6px; color: ' + MUTE + '; margin-top: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + H + ' .xa-oh { display: inline-block; margin-top: 4px; padding: 2px 6px; border-radius: 8px; background: #EAF6FC; color: #0B6F99; font-size: 6.5px; font-weight: 800; }'
    + H + ' .xa-oh.lo { background: #FFF4DB; color: #8A5A00; }'
    + H + ' .xa-add { margin-top: 4px; border: 1px solid #DCE4EE; border-radius: 7px; text-align: center; font-size: 6.5px; font-weight: 700; padding: 3px 0; }'
    + H + ' .xa-plus { position: absolute; right: 10px; bottom: 16px; width: 34px; height: 34px; border-radius: 50%; background: #fff; box-shadow: 0 3px 10px rgba(15,23,32,.22); display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 500; line-height: 1; color: ' + INK + '; z-index: 3; }'
    + H + ' .xa-plus.x { transform: rotate(45deg); }'
    + H + ' .xa-dim { position: absolute; inset: 0; background: rgba(15,23,32,.38); z-index: 2; }'
    + H + ' .xa-dock { position: absolute; right: 12px; bottom: 58px; display: flex; flex-direction: column; gap: 8px; align-items: flex-end; z-index: 3; }'
    + H + ' .xa-db { position: relative; width: 30px; height: 30px; border-radius: 50%; background: ' + INK + '; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(15,23,32,.25); animation: xaFlare 14s infinite both; }'
    + H + ' .xa-db svg { width: 15px; height: 15px; } ' + H + ' .xa-db.cs { background: ' + BL + '; }'
    + H + ' .xa-db em { position: absolute; right: 36px; top: 50%; transform: translateY(-50%); white-space: nowrap; font-style: normal; font-size: 7px; font-weight: 800; padding: 2px 6px; border-radius: 8px; background: #fff; color: ' + INK + '; box-shadow: 0 1px 3px rgba(15,23,32,.2); }'
    + H + ' .xa-db.cs em { background: ' + BL + '; color: #fff; }'
    + '@keyframes xaFlare { 0% { opacity: 0; transform: translateY(var(--dy, 40px)) scale(.3); } 2.6%, 100% { opacity: 1; transform: none; } }'
    /* sheets */
    + H + ' .xa-sheet { position: absolute; left: 0; right: 0; bottom: 0; top: 34px; background: #fff; border-radius: 16px 16px 0 0; box-shadow: 0 -4px 18px rgba(15,23,32,.16); padding: 10px 9px; box-sizing: border-box; z-index: 4; }'
    + H + ' .xa-st { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 800; margin-bottom: 7px; } ' + H + ' .xa-st i { margin-left: auto; width: 18px; height: 18px; border-radius: 6px; background: ' + INK + '; color: #fff; font-style: normal; font-size: 11px; line-height: 18px; text-align: center; }'
    + H + ' .xa-in { height: 20px; border-radius: 8px; border: 1px solid #DCE4EE; font-size: 7px; color: #9AA6B2; display: flex; align-items: center; padding: 0 7px; margin-bottom: 8px; }'
    + H + ' .xa-job { position: relative; border: 1px solid #E6EBF1; border-radius: 10px; padding: 6px 8px; margin-bottom: 6px; font-size: 8px; font-weight: 800; }'
    + H + ' .xa-job small { display: block; font-size: 6.5px; font-weight: 600; color: ' + MUTE + '; margin-top: 1px; }'
    + H + ' .xa-tag { position: absolute; right: 7px; top: 6px; font-size: 6px; font-weight: 800; padding: 2px 5px; border-radius: 6px; background: #EAF6FC; color: #0B6F99; }'
    + H + ' .xa-tag.uns { background: #FFF4DB; color: #8A5A00; } ' + H + ' .xa-tag.past { background: #EEF1F4; color: #6B7280; }'
    + H + ' .xa-job.pick { animation: xaPick 14s infinite both; animation-delay: 4s; }'
    + '@keyframes xaPick { 0%, 5.5% { background: #fff; border-color: #E6EBF1; } 6.5%, 13% { background: #EAF6FC; border-color: ' + BL + '; } 14.3%, 100% { background: #fff; border-color: #E6EBF1; } }'
    + H + ' .xa-cust { font-size: 7px; color: ' + MUTE + '; font-weight: 600; margin: -4px 0 7px; }'
    + H + ' .xa-row { display: flex; align-items: center; gap: 6px; padding: 5px 0; border-top: 1px solid #EEF2F6; font-size: 7.5px; font-weight: 700; }'
    + H + ' .xa-row:first-of-type { border-top: 0; }'
    + H + ' .xa-row .xa-ri { width: 24px; height: 24px; flex: none; border-radius: 6px; background: #fff center / contain no-repeat; box-shadow: 0 0 0 1px #EEF2F6; }'
    + H + ' .xa-row span { flex: 1; min-width: 0; line-height: 1.2; } ' + H + ' .xa-row span small { display: block; font-size: 6px; color: ' + MUTE + '; font-weight: 600; }'
    + H + ' .xa-q { flex: none; color: ' + BL + '; font-weight: 800; font-size: 9px; }'
    + H + ' .xa-box { position: relative; width: 14px; height: 14px; flex: none; border-radius: 4px; border: 2px solid #B8C4D0; box-sizing: border-box; }'
    + H + ' .xa-box::after { content: ""; position: absolute; left: 3px; top: 0; width: 4px; height: 7px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg) scale(0); }'
    + H + ' .xa-fill .xa-row { animation: xaIn 14s infinite both; }'
    + '@keyframes xaIn { 0% { opacity: 0; transform: translateX(-14px); } 2%, 100% { opacity: 1; transform: none; } }'
    + H + ' .xa-chk .xa-box { animation: xaBox 14s infinite both; } ' + H + ' .xa-chk .xa-box::after { animation: xaTick 14s infinite both; animation-delay: inherit; }'
    + '@keyframes xaBox { 0% { background: transparent; border-color: #B8C4D0; } 1.4%, 100% { background: #16A34A; border-color: #16A34A; } }'
    + '@keyframes xaTick { 0% { transform: rotate(45deg) scale(0); } 1.4%, 100% { transform: rotate(45deg) scale(1); } }'
    + H + ' .xa-btns { display: flex; gap: 5px; margin-top: 9px; } ' + H + ' .xa-btns span { flex: 1; text-align: center; font-size: 7px; font-weight: 800; padding: 6px 0; border-radius: 8px; background: #EEF3F8; } ' + H + ' .xa-btns span.pri { background: ' + BL + '; color: #fff; }'
    + H + ' .xa-save { margin-top: 5px; text-align: center; font-size: 7px; font-weight: 800; padding: 6px 0; border-radius: 8px; background: ' + INK + '; color: #fff; }'
    /* print preview */
    + H + ' .xa-pv { position: absolute; inset: 0; background: #5B6672; z-index: 4; padding: 30px 10px 10px; box-sizing: border-box; }'
    + H + ' .xa-pvb { display: flex; align-items: center; gap: 6px; color: #fff; font-size: 9px; font-weight: 800; margin-bottom: 7px; } ' + H + ' .xa-pvb i { width: 18px; height: 18px; border-radius: 6px; background: rgba(255,255,255,.2); font-style: normal; text-align: center; line-height: 18px; } ' + H + ' .xa-pvb b { margin-left: auto; padding: 4px 9px; border-radius: 8px; background: ' + BL + '; font-size: 7.5px; }'
    + H + ' .xa-paper { background: #fff; border-radius: 4px; padding: 10px 9px; box-shadow: 0 4px 14px rgba(0,0,0,.25); }'
    + H + ' .xa-paper .xa-logo { margin-bottom: 4px; } ' + H + ' .xa-paper .xa-logo .storm-logo-lit { width: 70px !important; }'
    + H + ' .xa-ph1 { font-size: 9px; font-weight: 800; text-align: center; } ' + H + ' .xa-ph2 { font-size: 6.5px; color: ' + MUTE + '; text-align: center; margin-bottom: 6px; }'
    + H + ' .xa-paper .xa-row { font-size: 7px; } ' + H + ' .xa-pf { margin-top: 6px; padding-top: 5px; border-top: 2px solid ' + BL + '; text-align: center; font-size: 6px; font-weight: 800; letter-spacing: .12em; color: ' + MUTE + '; }'
    /* truck */
    + H + ' .xa-sky { position: absolute; inset: 0; background: linear-gradient(#EAF6FC, #EEF2F7 60%); }'
    + H + ' .xa-done { position: absolute; left: 0; right: 0; top: 110px; text-align: center; font-size: 13px; font-weight: 800; color: #15803D; }'
    + H + ' .xa-done small { display: block; font-size: 8px; color: ' + MUTE + '; font-weight: 700; margin-top: 3px; }'
    + H + ' .xa-road { position: absolute; left: 0; right: 0; bottom: 120px; height: 4px; background: #CBD5E1; border-radius: 2px; }'
    + H + ' .xa-truck { position: absolute; left: 34px; bottom: 124px; width: 128px; animation: xaTruck 14s infinite both; animation-delay: 12s; }'
    + '@keyframes xaTruck { 0% { transform: translateX(-170px); } 4.5%, 9.5% { transform: none; } 13.5%, 100% { transform: translateX(210px); } }'
    /* taps */
    + H + ' .xa-tap { position: absolute; width: 26px; height: 26px; margin: -13px 0 0 -13px; border-radius: 50%; background: rgba(41,171,226,.35); border: 2px solid ' + BL + '; box-sizing: border-box; opacity: 0; pointer-events: none; z-index: 6; animation: xaTap 14s infinite both; }'
    + '@keyframes xaTap { 0% { opacity: 0; transform: scale(1.7); } 1.2% { opacity: 1; transform: scale(1); } 2% { transform: scale(.8); } 3.2% { opacity: 1; transform: scale(1); } 4.6%, 100% { opacity: 0; } }'
    /* reduced motion: frames side by side */
    + H + ' .xa-strip { display: none; gap: 12px; overflow-x: auto; width: 100%; padding: 2px 2px 6px; -webkit-overflow-scrolling: touch; }'
    + H + ' .xa-strip figure { margin: 0; flex: none; width: 140px; text-align: center; font-size: 12.5px; font-weight: 700; color: ' + INK + '; }'
    + H + ' .xa-strip .xa-ph { zoom: .654; } ' + H + ' .xa-strip figcaption { margin-top: 8px; line-height: 1.25; }'
    + H + ' .xa-strip .xa-sc, ' + H + ' .xa-strip .xa-sc * { animation: none !important; } ' + H + ' .xa-strip .xa-sc { opacity: 1; }'
    + H + ' .xa-strip .xa-tap { opacity: 1; } ' + H + ' .xa-strip .xa-job.pick { background: #EAF6FC; border-color: ' + BL + '; }'
    + H + ' .xa-strip .xa-chk .xa-box { background: #16A34A; border-color: #16A34A; } ' + H + ' .xa-strip .xa-chk .xa-box::after { transform: rotate(45deg) scale(1); }'
    + H + ' .xa-strip .xa-truck { transform: none; }'
    /* v196: Staged Job Complete scenes */
    + H + ' .xa-sj { margin-top: 8px; text-align: center; font-size: 8.5px; font-weight: 800; padding: 8px 0; border-radius: 9px; background: #15803D; color: #fff; box-shadow: 0 3px 8px rgba(21,128,61,.3); }'
    + H + ' .xa-chk .xa-box.xa-nobox, ' + H + ' .xa-strip .xa-chk .xa-box.xa-nobox { animation: none !important; background: transparent !important; border-color: #B8C4D0 !important; } ' + H + ' .xa-chk .xa-box.xa-nobox::after, ' + H + ' .xa-strip .xa-chk .xa-box.xa-nobox::after { animation: none !important; transform: rotate(45deg) scale(0) !important; }'
    + H + ' .xa-chk-done .xa-box:not(.xa-nobox) { background: #16A34A; border-color: #16A34A; } ' + H + ' .xa-chk-done .xa-box:not(.xa-nobox)::after { transform: rotate(45deg) scale(1); }'
    + H + ' .xa-staged .xa-box { opacity: .75; } ' + H + ' .xa-ns { display: inline-block; font-style: normal; margin-left: 3px; padding: 0 4px; border-radius: 6px; background: #FEF3C7; color: #92400E; font-size: 5.5px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }'
    + H + ' .xa-cfd { position: absolute; inset: 0; background: rgba(15,23,32,.4); z-index: 5; }'
    + H + ' .xa-cf { position: absolute; left: 0; right: 0; bottom: 0; z-index: 6; background: #EEF2F7; border-radius: 16px 16px 0 0; padding: 11px 9px 10px; box-sizing: border-box; }'
    + H + ' .xa-cf > b { display: block; font-size: 11px; font-weight: 800; } ' + H + ' .xa-cf > small { display: block; font-size: 7px; color: ' + MUTE + '; font-weight: 600; margin: 1px 0 6px; }'
    + H + ' .xa-cfr { display: flex; align-items: center; gap: 5px; padding: 4px 6px; margin-bottom: 3px; border-radius: 7px; background: #fff; font-size: 7px; font-weight: 700; } ' + H + ' .xa-cfr i { flex: none; width: 10px; height: 10px; border-radius: 3px; background: ' + BL + '; color: #fff; font-style: normal; font-size: 7px; line-height: 10px; text-align: center; } ' + H + ' .xa-cfr span { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } ' + H + ' .xa-cfr em { font-style: normal; color: ' + BL + '; font-weight: 800; font-size: 8px; }'
    + H + ' .xa-cfw { margin-top: 5px; padding: 5px 6px; border-radius: 7px; background: #FEF3C7; color: #92400E; font-size: 6.5px; font-weight: 700; line-height: 1.3; }'
    + H + ' .xa-cfb { display: flex; gap: 5px; margin-top: 7px; } ' + H + ' .xa-cfb span { flex: 1; text-align: center; font-size: 8px; font-weight: 800; padding: 7px 0; border-radius: 9px; border: 1px solid #D5DCE5; } ' + H + ' .xa-cfb span.go { flex: 1.5; background: #15803D; border-color: #15803D; color: #fff; }'
    + H + ' .xa-ban { display: flex; align-items: center; gap: 6px; margin: 0 0 6px; padding: 6px 7px; border-radius: 9px; background: #DCFCE7; border: 1px solid #86EFAC; color: #14532D; } ' + H + ' .xa-ban i { flex: none; width: 15px; height: 15px; border-radius: 50%; background: #16A34A; color: #fff; font-style: normal; font-size: 9px; font-weight: 900; line-height: 15px; text-align: center; } ' + H + ' .xa-ban b { display: block; font-size: 8px; font-weight: 800; } ' + H + ' .xa-ban small { display: block; font-size: 6px; font-weight: 600; color: #166534; }'
    + H + ' .xa-truck.xa-truck-sm { left: 40px; bottom: 6px; width: 92px; z-index: 7; }'
    + '@media (prefers-reduced-motion: reduce) { ' + H + ' .xa-live, ' + H + ' .xa-cap { display: none !important; } ' + H + ' .xa-strip { display: flex; } }';
  var st = document.createElement('style'); st.id = 'storm-v194-css'; st.textContent = css;
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();

  /* the manager code box shows the same STORM logo as the main screen (its old white-word logo was hard to see on the light box) */
  function lockLogo() {
    var im = document.querySelector('#storm-lock img.sl-logo'); if (!im) return !!document.querySelector('#storm-lock .st-brand');
    if (!document.querySelector('header .storm-logo-lit')) return false;
    var d = document.createElement('div'); d.className = 'st-brand st-lock-brand'; d.innerHTML = window.stormBrandLogoHTML(false);
    im.parentNode.replaceChild(d, im); return true;
  }
  (function wait(n) { if (lockLogo()) return; if (n < 200) setTimeout(function () { wait(n + 1); }, 150); })(0);

  /* keep the footer rows in order: Jobber, CompanyCam, Manager Login, How to Use the App */
  function order() {
    var f = document.querySelector('#drawer .drawer-foot'), l = document.getElementById('st-lock-row'), hr = document.getElementById('st-help-row');
    if (!f) return false;
    if (l && l.parentNode !== f) f.appendChild(l);
    if (hr && hr.parentNode !== f) f.appendChild(hr);
    if (l && hr && l.nextElementSibling !== hr) f.insertBefore(l, hr);
    return !!(l && hr);
  }
  (function wait(n) { if (order()) return; if (n < 200) setTimeout(function () { wait(n + 1); }, 150); })(0);
  window.addEventListener('stormaccess', function () { setTimeout(order, 0); });

  /* ---- 5. explainer ---- */
  var PHOTO = {
    'rt-20': 'https://drive.google.com/thumbnail?id=17UbzdG6D7yu83arBeSRG79IiwEnfnguL&sz=w400',
    'hd-05': 'https://drive.google.com/thumbnail?id=1KpIKv6yfyZgGv0nHb34S9wwL4NahgZv9&sz=w400',
    'hd-11': 'https://drive.google.com/thumbnail?id=1LnYEIBUsD56uSJQWEyT0yQa6VUwXuPAy&sz=w400',
    'hd-07': 'https://drive.google.com/thumbnail?id=1PZbP5sJcTq3OkmwE6-cYilULJ0fD_d8I&sz=w400',
    'hd-06': 'https://drive.google.com/thumbnail?id=1AzSDwkFF-SHp4TpEBj_eKFOP64MdBtME&sz=w400',
    'hd-15': 'https://drive.google.com/thumbnail?id=17uI2My6rt7mLdizGoalpA8cosMzxhPkR&sz=w400'
  };
  var DEMO = [
    { bin: 'rt-20', name: 'Sump Basin - Perforated', sku: 'SB022PF', oh: 4, q: 1 },
    { bin: 'hd-05', name: 'Concrete Mix 80 lb', sku: '100318511', oh: 156, q: 6 },
    { bin: 'hd-11', name: 'PVC Elbow 90\u00b0', sku: '203812129', oh: 15, q: 2 },
    { bin: 'hd-07', name: 'Quikrete Hydraulic Water-Stop 50 lb', sku: '100318526', oh: 3, q: 2 },
    { bin: 'hd-06', name: 'Fast-Setting Mortar 55 lb', sku: '202188453', oh: 8, q: 3 },
    { bin: 'hd-15', name: 'Heavy-Duty Clear PVC Cement 8 oz', sku: '100139307', oh: 6, q: 1 }
  ];
  function it(bin) { try { return (typeof findItem === 'function' && findItem(bin)) || null; } catch (e) { return null; } }
  function photo(bin) {
    var c = document.querySelector('#list .card[data-bin="' + bin + '"] img.photo'); if (c && c.src && /^https:/.test(c.src)) return c.src;
    var x = it(bin); if (x && x.photoUrl) return x.photoUrl;
    return PHOTO[bin] || '';
  }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function bg(u) { return u ? ' style="background-image:url(&quot;' + esc(u) + '&quot;)"' : ''; }
  function demo() { return DEMO.map(function (d) { var x = it(d.bin); return { bin: d.bin, name: (x && x.name) || d.name, sku: (x && x.sku) || d.sku, oh: d.oh, q: d.q, img: photo(d.bin) }; }); }

  var I_SRCH = '<svg viewBox="0 0 24 24" fill="none" stroke="#0F1720" stroke-width="2.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>';
  var I_CAM = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>';
  var I_CART = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.5 11h10L20 7H7"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>';
  var I_CLIP = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 3h6v3H9z"/><path d="M9 11h6M9 15h4"/></svg>';
  var I_QUOTE = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5"/><path d="M9 13h7M9 17h5"/></svg>';
  var TRUCK = '<svg viewBox="0 0 128 64" aria-hidden="true"><rect x="2" y="8" width="80" height="40" rx="5" fill="' + BL + '"/><path d="M82 20h22l18 16v12H82z" fill="' + INK + '"/><path d="M88 24h13l11 10H88z" fill="#BFE9FA"/><image href="' + A + 'drop.png" x="8" y="15" width="12" height="27"/><text x="23" y="33" font-size="13" font-weight="900" fill="#fff" font-family="Montserrat,Arial,sans-serif" textLength="52" lengthAdjust="spacingAndGlyphs">STORM</text><text x="23" y="41" font-size="4.4" font-weight="700" fill="#fff" font-family="Montserrat,Arial,sans-serif" textLength="52" lengthAdjust="spacingAndGlyphs">BASEMENT WATERPROOFING</text><circle cx="24" cy="52" r="9" fill="' + INK + '"/><circle cx="24" cy="52" r="3.6" fill="#CBD5E1"/><circle cx="102" cy="52" r="9" fill="' + INK + '"/><circle cx="102" cy="52" r="3.6" fill="#CBD5E1"/></svg>';

  function logo() { return '<div class="xa-logo">' + window.stormBrandLogoHTML(false) + '</div>'; }
  function header() { return '<div class="xa-hd"><span class="xa-ham"><i></i><i></i><i></i></span>' + logo() + '<span class="xa-srch">' + I_SRCH + '</span></div><div class="xa-tog"><span class="on">Staging Job</span><span>Inventory</span></div>'; }
  function main(d) {
    return header() + '<div class="xa-sbar">Search items, SKU, bin\u2026</div><div class="xa-chips"><span class="on">All</span><span>Home Depot</span><span>RichTech</span><span>Hilti</span></div>'
      + '<div class="xa-sec">STAGING JOB</div><div class="xa-grid">' + d.slice(0, 4).map(function (x, i) {
        return '<div class="xa-card"><div class="xa-im"' + bg(x.img) + '></div><b>' + esc(x.name) + '</b><small>SKU: ' + esc(x.sku) + '</small><span class="xa-oh' + (x.oh < 5 ? ' lo' : '') + '">On hand ' + x.oh + '</span><div class="xa-add">+ Add to order</div></div>';
      }).join('') + '</div>';
  }
  /* v196: the last demo line stays off the cart (cls 'last-off' also tags it "Not staged") */
  function rows(d, cls) { return d.map(function (x, i) { var off = i === d.length - 1 && cls !== 'nobox'; return '<div class="xa-row' + (off ? ' xa-off' : '') + '"><i class="xa-ri"' + bg(x.img) + '></i><span>' + esc(x.name) + '<small>SKU ' + esc(x.sku) + (off && cls === 'last-off' ? ' <em class="xa-ns">Not staged</em>' : '') + '</small></span><b class="xa-q">x' + x.q + '</b>' + (cls === 'nobox' ? '' : '<b class="xa-box' + (off ? ' xa-nobox' : '') + '"></b>') + '</div>'; }).join(''); }
  function scenes() {
    var d = demo();
    var dock = function (open) {
      return (open ? '<div class="xa-dim"></div><div class="xa-dock">'
        + '<span class="xa-db" style="--dy:150px;animation-delay:2.05s">' + I_CAM + '<em>Camera</em></span>'
        + '<span class="xa-db" style="--dy:112px;animation-delay:2.15s">' + I_CART + '<em>Cart</em></span>'
        + '<span class="xa-db cs" style="--dy:76px;animation-delay:2.25s">' + I_CLIP + '<em>Customer Search</em></span>'
        + '<span class="xa-db" style="--dy:38px;animation-delay:2.35s">' + I_QUOTE + '<em>Quote</em></span></div>' : '')
        + '<span class="xa-plus' + (open ? ' x' : '') + '">+</span>';
    };
    return [
      main(d) + dock(false) + '<span class="xa-tap" style="right:14px;bottom:20px;left:auto;top:auto;margin:0;animation-delay:1.05s"></span>',
      main(d) + dock(true) + '<span class="xa-tap" style="right:14px;bottom:122px;left:auto;top:auto;margin:0;animation-delay:3.0s"></span>',
      main(d) + '<div class="xa-sheet"><div class="xa-st">Find a Job<i>&times;</i></div><div class="xa-in">Customer name or address</div>'
        + '<div class="xa-job pick">Smith<small>12 Elm St \u00b7 Hilton</small><span class="xa-tag">Tue Nov 17</span></div>'
        + '<div class="xa-job">Garcia<small>40 Oak Ave \u00b7 Victor</small><span class="xa-tag uns">Not scheduled</span></div>'
        + '<div class="xa-job">Lee<small>7 Pine Rd \u00b7 Spencerport</small><span class="xa-tag past">Past \u00b7 Nov 9</span></div>'
        + '<div class="xa-job">Brown<small>88 Lake Rd \u00b7 Brockport</small><span class="xa-tag">Thu Nov 19</span></div></div>'
        + '<span class="xa-tap" style="left:60px;top:126px;animation-delay:4.85s"></span>',
      /* v196: Customer Search -> load items -> check onto the staging cart -> Staged Job Complete -> Staged */
      main(d) + '<div class="xa-sheet xa-fill"><div class="xa-st">Customer Search<i>&times;</i></div><div class="xa-cust">Smith \u00b7 12 Elm St</div>' + rows(d)
        + '<div class="xa-sj">Staged Job Complete</div><div class="xa-btns"><span>Print Preview</span><span>Print</span></div></div>',
      main(d) + '<div class="xa-sheet xa-chk"><div class="xa-st">Customer Search<i>&times;</i></div><div class="xa-cust">Smith \u00b7 12 Elm St \u00b7 on the cart</div>' + rows(d)
        + '<div class="xa-sj">Staged Job Complete</div><div class="xa-btns"><span>Print Preview</span><span>Print</span></div></div>'
        + '<span class="xa-tap" style="left:98px;top:316px;animation-delay:9.7s"></span>',
      main(d) + '<div class="xa-sheet xa-chk-done"><div class="xa-st">Customer Search<i>&times;</i></div><div class="xa-cust">Smith \u00b7 12 Elm St</div>' + rows(d) + '</div>'
        + '<div class="xa-cfd"></div><div class="xa-cf"><b>Staged Job Complete?</b><small>Smith \u00b7 12 Elm St</small>'
        + d.slice(0, 5).map(function (x) { return '<div class="xa-cfr"><i>\u2713</i><span>' + esc(x.name) + '</span><em>x' + x.q + '</em></div>'; }).join('')
        + '<div class="xa-cfw">1 item not on the cart \u2014 it won\u2019t come out of inventory</div><div class="xa-cfb"><span>Cancel</span><span class="go">Stage 5 items</span></div></div>'
        + '<span class="xa-tap" style="right:44px;left:auto;bottom:22px;top:auto;margin:0;animation-delay:11.1s"></span>',
      main(d) + '<div class="xa-sheet xa-chk-done xa-staged"><div class="xa-st">Customer Search<i>&times;</i></div><div class="xa-cust">Smith \u00b7 12 Elm St</div>'
        + '<div class="xa-ban"><i>\u2713</i><span><b>Staged \u00b7 Tue Nov 17, 7:05 AM</b><small>Checked items came out of inventory</small></span></div>' + rows(d, 'last-off') + '</div>'
        + '<div class="xa-truck xa-truck-sm">' + TRUCK + '</div>'
    ];
  }
  var CAPS = ['1. Main screen: Staging Job', '2. Tap + \u2192 Customer Search', '3. Pick the job', '4. Load items', '5. Check each box as it goes on the cart', '6. Staged Job Complete \u2192 Stage', '7. Staged \u00b7 out of inventory'];
  var CAPS_SHORT = ['Main screen', 'Tap + \u2192 Customer Search', 'Pick the job', 'Load items', 'Check onto the cart', 'Staged Job Complete', 'Staged'];
  function sc(i, h) {
    /* scene i shows from 2i s; rows and boxes carry their own delays on the same 14 s clock */
    var k = 0;
    if (i === 3) h = h.replace(/<div class="xa-row">/g, function () { k++; return '<div class="xa-row" style="animation-delay:' + (6.15 + (k - 1) * 0.3).toFixed(2) + 's">'; });
    if (i === 4) h = h.replace(/<b class="xa-box"><\/b>/g, function () { k++; return '<b class="xa-box" style="animation-delay:' + (8.3 + (k - 1) * 0.28).toFixed(2) + 's"></b>'; }); /* v196: 5 of 6 go on the cart */
    return '<div class="xa-sc" style="animation-delay:' + (i * 2) + 's">' + h + '</div>';
  }
  window.stormHelpAnim = function () {
    var S = scenes();
    var live = '<div class="xa-ph xa-live"><div class="xa-scr">' + S.map(function (h, i) { return sc(i, h); }).join('') + '</div></div>'
      + '<div class="xa-cap">' + CAPS.map(function (c, i) { return '<span style="animation-delay:' + (i * 2) + 's">' + c + '</span>'; }).join('') + '</div>';
    var strip = '<div class="xa-strip">' + S.map(function (h, i) { return '<figure><div class="xa-ph"><div class="xa-scr"><div class="xa-sc">' + h + '</div></div></div><figcaption>' + (i + 1) + '. ' + CAPS_SHORT[i] + '</figcaption></figure>'; }).join('') + '</div>';
    return '<div class="sh-card sh-anim xa" role="img" aria-label="Short animation of the app: the main screen in Staging Job, tap the plus then Customer Search, pick the job, load items, check each box as it goes on the staging cart, tap Staged Job Complete and Stage, the job shows Staged">' + live + strip + '</div>';
  };
})();

/* v195 (Hark, 2026-11-11 12:35, Dave): pairs with app v147.
   1. Customer Search (clipboard + blue label) is always one of the buttons that fly out of the "+", crew and manager, first open included
      (app v147 shows it in both modes; from Inventory it flips to Stage Job first). The dock re-measures each time it opens.
   2. How to Use the App: Next lands with the next chapter's heading right under the chapter chips (v192 go()/track() measure against the
      scrolling body now).
   3. Printed Pull List + Print Preview: main-screen STORM logo centered at the top (app v147; assets/storm-black.png + sub-print.png so it
      prints clearly on white, B&W too).
   4. Pull List: once the big "3/6 LOADED" ring scrolls away, a slim bar with a small ring, "3 of 6 loaded" and the customer stays at the top
      of the sheet (tap it to jump back up). It never sits over the check boxes or quantities of the line you are looking at: lines scroll under it.
   5. Categories: main screen gets one closed "Category" dropdown under the store chips (tap to open, tap a category or anywhere else to close,
      the closed control shows the pick). Side menu CATEGORIES is a collapsible section, closed each time the menu opens. */
(function () {
  if (window.__stormV195) return; window.__stormV195 = 1;
  var BL = '#29ABE2', INK = '#0F1720', MUTE = '#6B7280', LINE = '#E3E8EF';
  var FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var CHEV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>';
  var LAYERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2.5 8 12 13l9.5-5z"/><path d="m2.5 12.5 9.5 5 9.5-5"/><path d="m2.5 17 9.5 5 9.5-5"/></svg>';
  var GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>';
  var D = 'html body #fab-dock.fab-dock';
  var css = ''
    /* 1. Customer Search always in the dock */
    + D + ' > #pull-fab { display: flex !important; visibility: visible !important; }'
    /* 4. Pull List progress bar */
    + '#st-pbar { position: fixed; z-index: 104; display: flex; align-items: center; gap: 10px; box-sizing: border-box; height: 52px; padding: 0 14px 0 10px; background: rgba(255,255,255,.94);'
    + ' -webkit-backdrop-filter: blur(12px) saturate(1.3); backdrop-filter: blur(12px) saturate(1.3); box-shadow: 0 1px 0 ' + LINE + ', 0 6px 16px rgba(15,23,32,.08); border-radius: 18px 18px 0 0;'
    + ' font-family: inherit; color: ' + INK + '; opacity: 0; transform: translateY(-8px); pointer-events: none; transition: opacity .2s ease, transform .25s cubic-bezier(.3,1.2,.5,1); cursor: pointer; -webkit-tap-highlight-color: transparent; }'
    + '#st-pbar.on { opacity: 1; transform: none; pointer-events: auto; }'
    + '#st-pbar .pb-r { flex: none; width: 36px; height: 36px; } #st-pbar .pb-r svg { display: block; width: 36px; height: 36px; }'
    + '#st-pbar .pb-r circle.a { transition: stroke-dasharray .35s ease; }'
    + '#st-pbar .pb-t { flex: 1 1 auto; min-width: 0; line-height: 1.2; }'
    + '#st-pbar .pb-t b { display: block; font-size: 14.5px; font-weight: 800; white-space: nowrap; }'
    + '#st-pbar .pb-t span { display: block; font-size: 12px; font-weight: 600; color: ' + MUTE + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#st-pbar .pb-up { flex: none; width: 30px; height: 30px; border-radius: 50%; background: #F1F4F8; color: ' + INK + '; display: flex; align-items: center; justify-content: center; }'
    + '#st-pbar .pb-up svg { width: 18px; height: 18px; transform: rotate(180deg); }'
    + '#st-pbar.done .pb-t b { color: #0B7FB3; }'
    + '@media (prefers-reduced-motion: reduce) { #st-pbar { transition: opacity .15s ease; transform: none; } }'
    + '@media print { #st-pbar, #st-catdd { display: none !important; } }'
    /* 5a. main-screen Category dropdown */
    + '#st-catdd { position: relative; margin: 10px 14px 0; z-index: 30; font-family: inherit; }'
    + 'body.st-cd-open #fab-dock, body.st-cd-open #ver-badge { opacity: 0 !important; pointer-events: none !important; transition: opacity .18s ease; }'
    + '#st-catdd .cd-btn { display: flex; align-items: center; gap: 10px; width: 100%; height: 44px; padding: 0 12px 0 14px; box-sizing: border-box; border: 1px solid ' + LINE + '; border-radius: 14px; background: #fff; color: ' + INK + ';'
    + ' font-family: inherit; font-size: 14.5px; font-weight: 600; line-height: 1; text-align: left; box-shadow: 0 1px 3px rgba(15,23,32,.06); cursor: pointer; -webkit-tap-highlight-color: transparent; transition: border-color .2s ease, box-shadow .2s ease; }'
    + '#st-catdd .cd-btn .cd-ic { flex: none; width: 20px; height: 20px; color: ' + BL + '; } #st-catdd .cd-btn .cd-ic svg { width: 20px; height: 20px; display: block; }'
    + '#st-catdd .cd-btn .cd-k { flex: none; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: ' + MUTE + '; }'
    + '#st-catdd .cd-btn .cd-v { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-weight: 700; }'
    + '#st-catdd .cd-btn .cd-v.pick { color: #0B7FB3; }'
    + '#st-catdd .cd-btn .cd-ch { flex: none; width: 22px; height: 22px; color: ' + MUTE + '; transition: transform .3s cubic-bezier(.3,1.3,.5,1); } #st-catdd .cd-btn .cd-ch svg { width: 22px; height: 22px; display: block; }'
    + '#st-catdd.open .cd-btn { border-color: ' + BL + '; box-shadow: 0 0 0 3px rgba(41,171,226,.15); } #st-catdd.open .cd-ch { transform: rotate(180deg); }'
    + '#st-catdd .cd-pop { position: absolute; left: 0; right: 0; top: calc(100% + 6px); max-height: min(58vh, 460px); overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain;'
    + ' background: #fff; border-radius: 16px; box-shadow: 0 14px 40px rgba(15,23,32,.20), 0 0 0 1px rgba(15,23,32,.04); padding: 6px 0;'
    + ' opacity: 0; transform: translateY(-6px) scale(.98); transform-origin: 50% 0; visibility: hidden; pointer-events: none; transition: opacity .18s ease, transform .24s cubic-bezier(.3,1.2,.5,1), visibility 0s linear .24s; }'
    + '#st-catdd.open .cd-pop { opacity: 1; transform: none; visibility: visible; pointer-events: auto; transition: opacity .18s ease, transform .24s cubic-bezier(.3,1.2,.5,1), visibility 0s; }'
    + '#st-catdd .cd-o { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 44px; padding: 0 16px; box-sizing: border-box; border: 0; background: transparent; color: ' + INK + '; font-family: inherit; font-size: 14.5px; font-weight: 600; line-height: 1.25; text-align: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }'
    + '#st-catdd .cd-o + .cd-o { border-top: 1px solid #EEF2F6; }'
    + '#st-catdd .cd-o span:first-child { flex: 1 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '#st-catdd .cd-o .cd-n { flex: none; color: ' + MUTE + '; font-size: 13px; }'
    + '#st-catdd .cd-o.on { color: #0B7FB3; background: #EAF7FD; } #st-catdd .cd-o.on .cd-n { color: #0B7FB3; }'
    + '#st-catdd .cd-o:active { background: #F1F4F8; }'
    + '@media (min-width: 700px) { #st-catdd { max-width: 420px; } }'
    + '@media (prefers-reduced-motion: reduce) { #st-catdd .cd-pop, #st-catdd.open .cd-pop { transform: none; } #st-catdd .cd-ch { transition: none; } }'
    /* 5b. side menu: CATEGORIES collapsible */
    + 'html body #cl-menu .cl-lbl.st-cat-h { display: flex !important; align-items: center; gap: 12px; width: auto; margin: 14px 0 0 !important; padding: 0 14px; min-height: 46px; border-radius: 14px; background: transparent;'
    + ' color: ' + INK + ' !important; font-size: 17px !important; font-weight: 700 !important; letter-spacing: 0 !important; text-transform: none; cursor: pointer; -webkit-tap-highlight-color: transparent; }'
    + 'html body #cl-menu .cl-lbl.st-cat-h:active { background: #F1F4F8; }'
    + 'html body #cl-menu .st-cat-h .ch-ic { flex: none; width: 24px; height: 24px; color: ' + BL + '; } html body #cl-menu .st-cat-h .ch-ic svg { width: 24px; height: 24px; display: block; }'
    + 'html body #cl-menu .st-cat-h .ch-t { flex: none; }'
    + 'html body #cl-menu .st-cat-h .ch-v { flex: 1 1 auto; min-width: 0; text-align: right; font-size: 13px; font-weight: 600; color: #0B7FB3; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + 'html body #cl-menu .st-cat-h .ch-ch { flex: none; width: 20px; height: 20px; color: ' + MUTE + '; transition: transform .3s cubic-bezier(.3,1.3,.5,1); } html body #cl-menu .st-cat-h .ch-ch svg { width: 20px; height: 20px; display: block; }'
    + 'html body #cl-menu.st-cats-open .st-cat-h .ch-ch { transform: rotate(180deg); }'
    + 'html body #cl-menu .cl-cats.st-cat-b { overflow: hidden !important; transition: max-height .32s cubic-bezier(.4,0,.2,1), opacity .22s ease, margin .32s ease, padding .32s ease; margin-top: 6px; }'
    + 'html body #cl-menu:not(.st-cats-open) .cl-cats.st-cat-b { max-height: 0 !important; opacity: 0; padding-top: 0 !important; padding-bottom: 0 !important; margin-top: 0; box-shadow: none !important; pointer-events: none; }'
    + 'html body #cl-menu.st-cats-open .cl-cats.st-cat-b { opacity: 1; }'
    + '@media (prefers-reduced-motion: reduce) { html body #cl-menu .cl-cats.st-cat-b { transition: none; } }';
  var st = document.createElement('style'); st.id = 'storm-v195-css'; st.textContent = css;
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  window.addEventListener('load', put); setTimeout(put, 1800); setTimeout(put, 4300);

  /* ---- 1. dock: re-measure when the + opens so Customer Search flies out to its own spot ---- */
  document.addEventListener('click', function (e) {
    if (!(e.target && e.target.closest && e.target.closest('#st-plus'))) return;
    var pf = document.getElementById('pull-fab'); if (pf && getComputedStyle(pf).display === 'none') pf.style.setProperty('display', 'flex', 'important');
    try { window.dispatchEvent(new Event('resize')); } catch (x) {} /* v191 layout() listens to resize */
  }, true);

  /* ---- 4. Pull List progress bar ---- */
  var bar = null, barKey = '';
  function mini(done, tot) {
    var s = 36, w = 4.5, r = (s - w) / 2, c = 2 * Math.PI * r, f = tot ? Math.max(0, Math.min(1, done / tot)) : 0, on = f * c;
    return '<svg viewBox="0 0 ' + s + ' ' + s + '" aria-hidden="true"><circle cx="18" cy="18" r="' + r + '" fill="#fff" stroke="#E3E8EF" stroke-width="' + w + '"/>'
      + (on > 0.5 ? '<circle class="a" cx="18" cy="18" r="' + r + '" fill="none" stroke="' + BL + '" stroke-width="' + w + '" stroke-linecap="round" stroke-dasharray="' + on.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 18 18)"/>' : '')
      + '<text x="18" y="19" text-anchor="middle" dominant-baseline="middle" font-family="' + FONT.replace(/"/g, '') + '" font-weight="800" font-size="' + (String(done).length + String(tot).length > 3 ? 8.5 : 10) + '" fill="' + INK + '">' + done + '/' + tot + '</text></svg>';
  }
  function ensureBar() {
    if (bar) return bar;
    bar = document.createElement('div'); bar.id = 'st-pbar'; bar.setAttribute('role', 'status'); bar.setAttribute('aria-live', 'polite');
    bar.innerHTML = '<div class="pb-r"></div><div class="pb-t"><b></b><span></span></div><div class="pb-up" aria-hidden="true">' + CHEV + '</div>';
    bar.addEventListener('click', function () { var sh = document.getElementById('pull-sheet'); if (sh) { try { sh.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); } catch (x) { sh.scrollTop = 0; } } });
    document.body.appendChild(bar); return bar;
  }
  function counts(sh) {
    var n = sh.querySelector('.tc-prog-n'), m = n ? /(\d+)\D+(\d+)/.exec(n.textContent) : null;
    if (m) return [+m[1], +m[2]];
    var all = sh.querySelectorAll('.pick-lines .pick-line'), d = sh.querySelectorAll('.pick-lines .pick-line.tc-done');
    return [d.length, all.length];
  }
  function upd() {
    var sh = document.getElementById('pull-sheet');
    var ok = sh && sh.classList.contains('open') && !sh.classList.contains('tc-empty') && !document.getElementById('pull-peek') && !document.getElementById('st-pv')
      && !document.querySelector('#st-help.open') && sh.querySelector('.pick-lines .pick-line');
    var rg = ok ? (sh.querySelector('.gd-pring') || sh.querySelector('.tc-top')) : null;
    if (!rg) { if (bar) bar.classList.remove('on'); return; }
    var sr = sh.getBoundingClientRect(), rr = rg.getBoundingClientRect();
    var show = rr.bottom < sr.top + 34 && sh.scrollTop > 20;
    var b = ensureBar();
    var z = parseInt(getComputedStyle(sh).zIndex, 10); if (!isNaN(z) && b.style.zIndex !== String(z + 1)) b.style.zIndex = z + 1;
    var top = Math.max(0, sr.top), left = sr.left, width = sr.width;
    var pos = top + '|' + left + '|' + width;
    if (b.__pos !== pos) { b.__pos = pos; b.style.top = top + 'px'; b.style.left = left + 'px'; b.style.width = width + 'px'; b.style.borderRadius = sr.top <= 2 ? '0' : ''; }
    var c = counts(sh), nm = sh.querySelector('.tc-name'), name = nm && !nm.classList.contains('tc-none') ? nm.textContent.trim() : '';
    var key = c[0] + '/' + c[1] + '|' + name;
    if (key !== barKey) {
      barKey = key;
      b.querySelector('.pb-r').innerHTML = mini(c[0], c[1]);
      b.querySelector('.pb-t b').textContent = c[1] && c[0] >= c[1] ? 'All ' + c[1] + ' loaded' : c[0] + ' of ' + c[1] + ' loaded';
      b.querySelector('.pb-t span').textContent = name || 'Customer Search';
      b.classList.toggle('done', !!c[1] && c[0] >= c[1]);
      b.setAttribute('aria-label', c[0] + ' of ' + c[1] + ' lines loaded. Tap to go back to the top.');
    }
    b.classList.toggle('on', show);
  }
  var raf = 0; function soon() { if (raf) return; raf = requestAnimationFrame(function () { raf = 0; upd(); }); }
  document.addEventListener('scroll', function (e) { if (e.target && e.target.id === 'pull-sheet') soon(); }, true);
  window.addEventListener('resize', soon);
  (function watch(n) {
    var sh = document.getElementById('pull-sheet');
    if (sh) {
      new MutationObserver(soon).observe(sh, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] });
      new MutationObserver(soon).observe(document.body, { childList: true });
      setInterval(upd, 1000); return;
    }
    if (n < 300) setTimeout(function () { watch(n + 1); }, 150);
  })(0);
  window.stormPullBarUpdate = upd;

  /* ---- 5a. main-screen Category dropdown ---- */
  function its() { try { return (typeof items !== 'undefined' && items && items.length) ? items : []; } catch (e) { return []; } }
  function curCat() { try { return category; } catch (e) { return 'All'; } }
  function curSup() { try { return supplier; } catch (e) { return 'All'; } }
  var dd = null, ddKey = '';
  function catList() {
    var s = curSup(), counts = {}, seen = {};
    its().forEach(function (it) { if (!it || seen[it.bin]) return; if (s !== 'All' && it.supplier !== s) return; seen[it.bin] = 1; var c = it.category || 'Other'; counts[c] = (counts[c] || 0) + 1; });
    return { counts: counts, cats: Object.keys(counts).sort(function (a, b) { return a.localeCompare(b); }) };
  }
  function close() { document.body.classList.remove('st-cd-open'); if (dd && dd.classList.contains('open')) { dd.classList.remove('open'); dd.querySelector('.cd-btn').setAttribute('aria-expanded', 'false'); } }
  function paintDD() {
    var chips = document.getElementById('gd-chips'), list = document.getElementById('list');
    if (!chips || !list || !its().length) return;
    if (!dd) {
      dd = document.createElement('div'); dd.id = 'st-catdd';
      dd.innerHTML = '<button type="button" class="cd-btn" aria-haspopup="listbox" aria-expanded="false"><span class="cd-ic">' + LAYERS + '</span><span class="cd-k">Category</span><span class="cd-v"></span><span class="cd-ch">' + CHEV + '</span></button><div class="cd-pop" role="listbox" aria-label="Categories"></div>';
      dd.querySelector('.cd-btn').addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        var o = !dd.classList.contains('open'); paintDD(); dd.classList.toggle('open', o); document.body.classList.toggle('st-cd-open', o); this.setAttribute('aria-expanded', o ? 'true' : 'false');
        if (o) { var on = dd.querySelector('.cd-o.on'), pop = dd.querySelector('.cd-pop'); pop.scrollTop = on ? Math.max(0, on.offsetTop - 60) : 0;
          var r = dd.getBoundingClientRect(), need = r.bottom + Math.min(pop.scrollHeight, 460) + 20 - window.innerHeight; if (need > 0) { try { window.scrollBy({ top: need, behavior: reduce ? 'auto' : 'smooth' }); } catch (x) {} } }
      });
      dd.querySelector('.cd-pop').addEventListener('click', function (e) {
        var o = e.target.closest && e.target.closest('[data-cd-cat]'); if (!o) return;
        e.preventDefault(); e.stopPropagation();
        var c = o.getAttribute('data-cd-cat');
        close();
        setTimeout(function () { try { setSupplierCategory(curSup(), c); } catch (x) {} paintDD(); }, reduce ? 0 : 140);
      });
    }
    if (dd.previousElementSibling !== chips) chips.insertAdjacentElement('afterend', dd);
    var L = catList(), cc = curCat(), key = curSup() + '|' + cc + '|' + L.cats.map(function (c) { return c + ':' + L.counts[c]; }).join(',');
    if (key === ddKey) return; ddKey = key;
    var tot = 0; L.cats.forEach(function (c) { tot += L.counts[c]; });
    var v = dd.querySelector('.cd-v'); v.textContent = cc === 'All' ? 'All categories' : cc; v.classList.toggle('pick', cc !== 'All');
    dd.querySelector('.cd-pop').innerHTML = '<button type="button" class="cd-o' + (cc === 'All' ? ' on' : '') + '" role="option" data-cd-cat="All"><span>All categories</span><span class="cd-n">' + tot + '</span></button>'
      + L.cats.map(function (c) { return '<button type="button" class="cd-o' + (cc === c ? ' on' : '') + '" role="option" data-cd-cat="' + esc(c) + '"><span>' + esc(c) + '</span><span class="cd-n">' + L.counts[c] + '</span></button>'; }).join('');
  }
  /* a tap outside only closes the dropdown (it does not also press whatever was under it) */
  var swallow = 0;
  function outside(e) { return !(e.target && e.target.closest && e.target.closest('#st-catdd')); }
  document.addEventListener('click', function (e) {
    if (dd && dd.classList.contains('open') && outside(e)) { e.preventDefault(); e.stopPropagation(); close(); return; }
    if (swallow > Date.now() && outside(e)) { swallow = 0; e.preventDefault(); e.stopPropagation(); }
  }, true);
  document.addEventListener('touchstart', function (e) { if (dd && dd.classList.contains('open') && outside(e)) { swallow = Date.now() + 700; close(); } }, { capture: true, passive: true });
  document.addEventListener('touchmove', function () { if (swallow) swallow = 0; }, { capture: true, passive: true });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* ---- 5b. side menu CATEGORIES: collapsible, closed by default ---- */
  function paintMenu() {
    var mn = document.getElementById('cl-menu'); if (!mn) return;
    var box = mn.querySelector('.cl-cats'); if (!box) return;
    var lb = box.previousElementSibling; if (!lb || !lb.classList.contains('cl-lbl')) return;
    if (!lb.classList.contains('st-cat-h')) {
      lb.classList.add('st-cat-h'); lb.setAttribute('role', 'button'); lb.setAttribute('tabindex', '0'); lb.setAttribute('aria-expanded', 'false');
      lb.innerHTML = '<span class="ch-ic">' + LAYERS + '</span><span class="ch-t">Categories</span><span class="ch-v"></span><span class="ch-ch">' + CHEV + '</span>';
      box.classList.add('st-cat-b');
    }
    var cc = curCat(), v = lb.querySelector('.ch-v'), t = cc === 'All' ? '' : cc; if (v.textContent !== t) v.textContent = t;
    if (mn.classList.contains('st-cats-open')) box.style.maxHeight = box.scrollHeight + 'px';
  }
  function setMenu(o) {
    var mn = document.getElementById('cl-menu'); if (!mn) return; paintMenu();
    var box = mn.querySelector('.cl-cats.st-cat-b'), lb = mn.querySelector('.st-cat-h'); if (!box || !lb) return;
    if (o) box.style.maxHeight = box.scrollHeight + 'px';
    mn.classList.toggle('st-cats-open', o); lb.setAttribute('aria-expanded', o ? 'true' : 'false');
    if (o) setTimeout(function () { var dr = document.getElementById('drawer'); if (!dr) return; var r = lb.getBoundingClientRect(), dh = dr.getBoundingClientRect().bottom; if (r.top > dh - 220) { try { dr.scrollBy({ top: r.top - (dh - 360), behavior: reduce ? 'auto' : 'smooth' }); } catch (x) {} } }, 60);
  }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var h = t.closest('#cl-menu .st-cat-h');
    if (h) { e.preventDefault(); e.stopPropagation(); var mn = document.getElementById('cl-menu'); setMenu(!mn.classList.contains('st-cats-open')); return; }
    if (t.closest('#hamburger')) { setTimeout(function () { setMenu(false); }, 0); setTimeout(paintMenu, 120); }
  }, true);
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.classList && e.target.classList.contains('st-cat-h')) { e.preventDefault(); e.target.click(); } });

  function tick() { try { paintDD(); } catch (x) {} try { paintMenu(); } catch (x) {} }
  (function go(n) { tick(); if (n < 40) setTimeout(function () { go(n + 1); }, 250); })(0);
  setInterval(tick, 1200);
  (function watchList(n) { var l = document.getElementById('list'); if (l) { new MutationObserver(function () { setTimeout(tick, 0); }).observe(l, { childList: true }); return; } if (n < 200) setTimeout(function () { watchList(n + 1); }, 150); })(0);
})();

/* v196 (Hark, 2026-11-11 15:10, Dave approved): pairs with app v148. "Staged Job Complete".
   Customer Search checks only track what is on the staging cart (shared across phones, offline queue kept, no stock change).
   At the bottom of the Customer Search list a big "Staged Job Complete" button opens a confirm sheet: the checked items with their qty
   (footage lines read "Grab N roll(s)" / "stick(s)", the same whole units as before) and how many lines are not on the cart. Confirm ->
   completeStaging(jobKey, customer, lines, device) on the server (no code needed): it takes the checked lines off On hand once, stamps
   the job staged and refuses a second run. After that the sheet shows a green "Staged · date time" banner, the boxes are locked and
   unchecked lines carry a "Not staged" tag. Managers (stormAccess.isMgr) get "Unstage" in the banner (unstageJob + manager token puts
   back exactly what was taken). A list with no customer can't be staged: the button is disabled with "Pick a customer to stage". */
(function () {
  var S = 'html body #pull-sheet';
  var css = ''
    + S + ' .sj-wrap { padding: 6px 16px 18px; }'
    + S + ' .sj-go { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: 64px; margin: 0; border: 0; border-radius: 16px; background: #15803D; color: #fff; font-family: inherit; font-size: 18px; font-weight: 800; letter-spacing: .01em; box-shadow: 0 8px 20px rgba(21,128,61,.28); -webkit-tap-highlight-color: transparent; }'
    + S + ' .sj-go svg { width: 24px; height: 24px; flex: none; }'
    + S + ' .sj-go:active { transform: scale(.985); }'
    + S + ' .sj-go:disabled { background: #B8C4D0 !important; box-shadow: none; opacity: 1 !important; }'
    + S + ' .sj-note { margin-top: 8px; text-align: center; font-size: 13px; font-weight: 600; color: #6B7280; }'
    + S + ' .sj-banner { margin: 12px 0 2px; text-align: left; display: flex; align-items: center; gap: 10px; padding: 11px 12px; border-radius: 14px; background: #DCFCE7; border: 1.5px solid #86EFAC; color: #14532D; }'
    + S + ' .sj-banner > i { flex: none; width: 30px; height: 30px; border-radius: 50%; background: #16A34A; color: #fff; font-style: normal; font-weight: 900; font-size: 17px; line-height: 30px; text-align: center; }'
    + S + ' .sj-banner b { display: block; font-size: 15.5px; font-weight: 800; }'
    + S + ' .sj-banner small { display: block; font-size: 12px; font-weight: 600; color: #166534; margin-top: 1px; }'
    + S + ' .sj-banner > div { flex: 1; min-width: 0; }'
    + S + ' .sj-un { flex: none; min-height: 36px; padding: 0 12px; border-radius: 10px; border: 1.5px solid #15803D; background: #fff; color: #15803D; font-family: inherit; font-size: 13px; font-weight: 800; }'
    + S + ' .sj-un.sj-sure { background: #B91C1C; border-color: #B91C1C; color: #fff; }'
    + S + '.sj-locked .tc-ck { cursor: default; border-style: solid; }'
    + S + '.sj-locked .pick-line:not(.tc-done) .tc-ck { background: #F1F5F9; border-color: #E2E8F0; }'
    + S + ' .sj-not { display: inline-block; margin-top: 5px; padding: 2px 8px; border-radius: 999px; background: #FEF3C7; color: #92400E; font-size: 11px; font-weight: 800; letter-spacing: .03em; text-transform: uppercase; }'
    + S + '.sj-locked .pick-line.sj-off { opacity: 1 !important; }'
    /* confirm sheet */
    + '#sj-cf { position: fixed; inset: 0; z-index: 400; display: flex; align-items: flex-end; justify-content: center; background: rgba(15,23,32,.42); opacity: 0; transition: opacity .2s; }'
    + '#sj-cf.on { opacity: 1; }'
    + '#sj-cf .sj-card { width: min(100%, 560px); max-height: 88vh; max-height: 88dvh; display: flex; flex-direction: column; background: #EEF2F7; border-radius: 22px 22px 0 0; box-shadow: 0 -10px 34px rgba(15,23,32,.2); transform: translateY(30px); transition: transform .22s; font-family: inherit; color: #0F1720; }'
    + '#sj-cf.on .sj-card { transform: none; }'
    + '@media (min-width: 700px) { #sj-cf { align-items: center; } #sj-cf .sj-card { border-radius: 22px; } }'
    + '#sj-cf .sj-hd { padding: 18px 18px 8px; } #sj-cf .sj-hd h3 { margin: 0; font-size: 21px; font-weight: 800; } #sj-cf .sj-hd p { margin: 4px 0 0; font-size: 14px; color: #6B7280; font-weight: 600; }'
    + '#sj-cf .sj-list { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 4px 16px 6px; }'
    + '#sj-cf .sj-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; margin: 0 0 7px; border-radius: 12px; background: #fff; }'
    + '#sj-cf .sj-row i { flex: none; width: 22px; height: 22px; border-radius: 7px; background: #29ABE2; color: #fff; font-style: normal; font-weight: 900; font-size: 13px; line-height: 22px; text-align: center; }'
    + '#sj-cf .sj-row span { flex: 1; min-width: 0; font-size: 14.5px; font-weight: 700; line-height: 1.25; overflow-wrap: anywhere; }'
    + '#sj-cf .sj-row b { flex: none; font-size: 15px; font-weight: 800; color: #1FA3DC; white-space: nowrap; }'
    + '#sj-cf .sj-warn { margin: 4px 16px 0; padding: 10px 12px; border-radius: 12px; background: #FEF3C7; color: #92400E; font-size: 13.5px; font-weight: 700; }'
    + '#sj-cf .sj-err { margin: 6px 16px 0; color: #B91C1C; font-size: 13.5px; font-weight: 700; min-height: 0; }'
    + '#sj-cf .sj-ft { display: flex; gap: 10px; padding: 12px 16px calc(16px + env(safe-area-inset-bottom)); }'
    + '#sj-cf .sj-ft button { flex: 1; min-height: 54px; border-radius: 14px; font-family: inherit; font-size: 16px; font-weight: 800; }'
    + '#sj-cf .sj-no { background: transparent; border: 1.5px solid #D5DCE5; color: #0F1720; }'
    + '#sj-cf .sj-yes { flex: 1.5 !important; background: #15803D; border: 0; color: #fff; }'
    + '#sj-cf .sj-yes:disabled { opacity: .6; }';
  var st = document.createElement('style'); st.id = 'storm-v196-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 12.5l3 3 5-6"/></svg>';
  function api() { return window.stormStagingApi || null; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function toast(m, bad) { try { showToast(m, !!bad, 2600); } catch (e) {} }
  function isMgr() { try { return !!(window.stormAccess && window.stormAccess.isMgr()); } catch (e) { return false; } }
  function tok() { try { return window.stormAccess ? window.stormAccess.token() : ''; } catch (e) { return ''; } }
  function sheet() { return document.getElementById('pull-sheet'); }
  function when(ms) {
    var d = new Date(Number(ms) || Date.now());
    try { return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) + ', ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); } catch (e) { return d.toString(); }
  }
  function ft(bin) { try { return window.FT_ITEMS && window.FT_ITEMS[bin] ? window.FT_ITEMS[bin] : null; } catch (e) { return null; } }
  /* each line on the sheet: { bin, name, qty (whole units, as the server takes them), label, checked } */
  function lines(sh) {
    var a = api(), on = a ? a.checked() : [];
    return [].slice.call(sh.querySelectorAll('.pick-line[data-pull-bin]')).map(function (ln) {
      var bin = ln.getAttribute('data-pull-bin'), nm = ln.querySelector('.pick-line-name'), qb = ln.querySelector('.pull-qty b');
      var n = qb ? parseInt(qb.textContent, 10) || 0 : 0, f = ft(bin), units = a ? a.units(bin, n) : n;
      units = Number(units) || 0;
      var label = f ? 'Grab ' + units + ' ' + (units === 1 ? f.unit : f.unit + 's') : 'x' + units;
      return { bin: bin, name: nm ? nm.textContent.trim() : bin, qty: units, label: label, checked: on.indexOf(bin) >= 0 };
    });
  }

  /* ---- sheet: button / banner / locks ---- */
  var lastKey = '';
  function paint() {
    var sh = sheet(), a = api(); if (!sh || !a) return;
    var top = sh.querySelector('.tc-top'), list = sh.querySelector('.pick-lines');
    var k = a.key(), stg = k ? a.staged(k) : null, ls = list ? lines(sh) : [], nOn = ls.filter(function (l) { return l.checked; }).length;
    var mgr = isMgr();
    var key = [k, stg ? stg.at : '', nOn, ls.length, mgr ? 1 : 0, !!list, !!top].join('|');
    var wrap = sh.querySelector('.sj-wrap'), ban = sh.querySelector('.sj-banner');
    if (key === lastKey && (!list || wrap) && (!stg || ban)) return;
    lastKey = key;
    sh.classList.toggle('sj-locked', !!stg);
    /* banner */
    if (stg && top) {
      if (!ban) { ban = document.createElement('div'); ban.className = 'sj-banner'; var bar = top.querySelector('.tc-bar'); if (bar) bar.insertAdjacentElement('afterend', ban); else top.appendChild(ban); }
      ban.innerHTML = '<i>\u2713</i><div><b>Staged \u00b7 ' + esc(when(stg.at)) + '</b><small>' + (stg.by ? 'by ' + esc(stg.by) + ' \u00b7 ' : '') + 'Checked items came out of inventory</small></div>'
        + (mgr ? '<button type="button" class="sj-un" data-sj-un>Unstage</button>' : '');
    } else if (ban) ban.remove();
    /* Not staged tags */
    sh.querySelectorAll('.pick-line[data-pull-bin]').forEach(function (ln) {
      var off = !!stg && !ln.classList.contains('tc-done'), tag = ln.querySelector('.sj-not');
      ln.classList.toggle('sj-off', off);
      if (off && !tag) { var info = ln.querySelector('.pick-line-info'); if (info) info.insertAdjacentHTML('beforeend', '<span class="sj-not">Not staged</span>'); }
      else if (!off && tag) tag.remove();
    });
    /* bottom button */
    if (!list) { if (wrap) wrap.remove(); return; }
    if (!wrap) { wrap = document.createElement('div'); wrap.className = 'sj-wrap'; list.insertAdjacentElement('afterend', wrap); }
    else if (wrap.previousElementSibling !== list) list.insertAdjacentElement('afterend', wrap);
    if (stg) { wrap.innerHTML = '<div class="sj-note">Staged ' + esc(when(stg.at)) + '. ' + (mgr ? 'Unstage (top) to change it.' : 'A manager can unstage it.') + '</div>'; return; }
    var dis = !k || !nOn, note = !k ? 'Pick a customer to stage' : (!nOn ? 'Check what\u2019s on the cart first' : nOn + ' of ' + ls.length + ' on the cart \u00b7 takes them out of inventory');
    wrap.innerHTML = '<button type="button" class="sj-go" data-sj-go' + (dis ? ' disabled' : '') + '>' + CHK + 'Staged Job Complete</button><div class="sj-note">' + esc(note) + '</div>';
  }
  function soon() { clearTimeout(soon.t); soon.t = setTimeout(paint, 30); }
  window.addEventListener('stormstaged', soon);
  window.addEventListener('stormaccess', function () { lastKey = ''; soon(); });
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('#pull-sheet .tc-ck')) setTimeout(paint, 60); });
  (function watch(n) {
    var sh = sheet();
    if (sh) {
      new MutationObserver(function () { lastKey = ''; soon(); }).observe(sh, { childList: true });
      new MutationObserver(soon).observe(sh, { attributes: true, attributeFilter: ['class'] });
      setInterval(function () { var s = sheet(); if (s && s.classList.contains('open')) paint(); }, 800);
      paint(); return;
    }
    if (n < 200) setTimeout(function () { watch(n + 1); }, 150);
  })(0);

  /* ---- confirm sheet ---- */
  var cf = null, busy = false;
  function closeCf() { if (!cf || busy) return; var c = cf; cf = null; c.classList.remove('on'); setTimeout(function () { if (c.parentNode) c.remove(); }, 220); }
  function openCf() {
    var sh = sheet(), a = api(); if (!sh || !a) return;
    var k = a.key(); if (!k) { toast('Pick a customer to stage', true); return; }
    if (a.staged(k)) { toast('This job is already staged'); return; }
    var ls = lines(sh), on = ls.filter(function (l) { return l.checked; }), off = ls.length - on.length;
    if (!on.length) { toast('Check what\u2019s on the cart first', true); return; }
    if (cf) cf.remove();
    cf = document.createElement('div'); cf.id = 'sj-cf'; cf.setAttribute('role', 'dialog'); cf.setAttribute('aria-modal', 'true'); cf.setAttribute('aria-label', 'Staged Job Complete');
    var who = a.cust();
    cf.innerHTML = '<div class="sj-card"><div class="sj-hd"><h3>Staged Job Complete?</h3><p>' + esc(who || 'This job') + '</p></div>'
      + '<div class="sj-list">' + on.map(function (l) { return '<div class="sj-row"><i>\u2713</i><span>' + esc(l.name) + '</span><b>' + esc(l.label) + '</b></div>'; }).join('') + '</div>'
      + (off ? '<div class="sj-warn">' + off + ' item' + (off === 1 ? '' : 's') + ' not on the cart \u2014 ' + (off === 1 ? 'it won\u2019t' : 'they won\u2019t') + ' come out of inventory</div>' : '')
      + '<div class="sj-err" data-sj-err></div>'
      + '<div class="sj-ft"><button type="button" class="sj-no" data-sj-no>Cancel</button><button type="button" class="sj-yes" data-sj-yes>Stage ' + on.length + ' item' + (on.length === 1 ? '' : 's') + '</button></div></div>';
    cf.__job = { k: k, cust: who, lines: ls.map(function (l) { return { bin: l.bin, name: l.name, qty: l.qty, checked: l.checked }; }) };
    document.body.appendChild(cf); void cf.offsetWidth; cf.classList.add('on');
  }
  function errText(e) { return String(e && (e.message || e) || ''); }
  function confirmCf() {
    var a = api(); if (!cf || busy || !a) return;
    var job = cf.__job, yes = cf.querySelector('[data-sj-yes]'), er = cf.querySelector('[data-sj-err]');
    if (!a.hasRun()) { er.textContent = 'No connection. Try again when you have signal.'; return; }
    busy = true; yes.disabled = true; yes.textContent = 'Staging\u2026'; er.textContent = '';
    google.script.run
      .withSuccessHandler(function (res) {
        busy = false;
        var rows = (res && res.lines || []).map(function (l) { return { itemBin: l.bin, checked: !!l.checked, taken: l.taken }; });
        a.setStaged(job.k, (res && res.staged) || { at: Date.now(), by: a.dev() }, rows);
        lastKey = ''; closeCf(); paint();
        toast('Job staged \u2014 inventory updated');
      })
      .withFailureHandler(function (e) {
        busy = false; var m = errText(e);
        if (/STAGED_ALREADY/.test(m)) { closeCf(); a.reload(); toast('This job was already staged', true); return; }
        yes.disabled = false; yes.textContent = 'Try again';
        er.textContent = /NOTHING_CHECKED/.test(m) ? 'Nothing is checked yet.' : 'Couldn\u2019t stage the job. Check your signal and try again.';
      })
      .completeStaging(job.k, job.cust, job.lines, a.dev());
  }
  /* ---- Unstage (manager) ---- */
  var unBusy = false;
  function unstage(b) {
    var a = api(); if (!a || unBusy) return;
    if (!isMgr()) { try { window.stormAccess.ask(function () { lastKey = ''; paint(); }, 'Only a manager can unstage a job.'); } catch (e) {} return; }
    if (!b.classList.contains('sj-sure')) { b.classList.add('sj-sure'); b.textContent = 'Tap to confirm'; clearTimeout(b.__t); b.__t = setTimeout(function () { b.classList.remove('sj-sure'); b.textContent = 'Unstage'; }, 3500); return; }
    var k = a.key(); if (!k || !a.hasRun()) return;
    unBusy = true; b.disabled = true; b.textContent = 'Unstaging\u2026';
    google.script.run
      .withSuccessHandler(function () { unBusy = false; a.setStaged(k, null); lastKey = ''; paint(); a.reload(); toast('Unstaged \u2014 stock put back'); })
      .withFailureHandler(function (e) {
        unBusy = false; var m = errText(e); b.disabled = false; b.classList.remove('sj-sure'); b.textContent = 'Unstage';
        if (/MANAGER_REQUIRED/.test(m)) { try { window.stormAccess.expired(); } catch (x) {} lastKey = ''; paint(); return; }
        if (/NOT_STAGED/.test(m)) { a.setStaged(k, null); a.reload(); return; }
        toast('Couldn\u2019t unstage. Try again.', true);
      })
      .unstageJob(k, a.dev(), tok());
  }
  document.addEventListener('click', function (e) {
    var t = e.target && e.target.closest ? e.target : null; if (!t) return;
    var g = t.closest('#pull-sheet [data-sj-go]'); if (g) { e.preventDefault(); e.stopPropagation(); if (!g.disabled) openCf(); return; }
    var u = t.closest('#pull-sheet [data-sj-un]'); if (u) { e.preventDefault(); e.stopPropagation(); unstage(u); return; }
    if (!cf || !t.closest('#sj-cf')) return;
    if (t.closest('[data-sj-yes]')) confirmCf();
    else if (t.closest('[data-sj-no]') || t.id === 'sj-cf') closeCf();
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cf) closeCf(); });
  window.stormStagedPaint = function () { lastKey = ''; paint(); };
})();

/* v197 (Hark, 2026-11-11 19:20, Dave's fix list items 1-6 + 19:10 "take the categories icon off the main screen"):
   - The main-screen Category dropdown (#st-catdd, v195) is hidden on phone and iPad, both modes. Categories stay in the side menu.
   - Scroll up: the "Stocked to par" card (ring) and the supplier chips (#gd-sum, #gd-chips) now ride in the sticky top bar
     (#topbar > #st-follow), so they slide back on scroll up with the search bar, logo and tabs instead of only at the very top.
     The bar reveals proportionally faster so search/logo come back after the same thumb travel as before.
   - iPad / large screens (min-width 700px and min-height 560px, so no phone in any orientation): search + All Items/Needs Ordering
     share one row at normal size, the content column matches the item grid. Phone layout unchanged.
   - Mode switch: the knob slides first, the list dips out, re-renders, keeps the same item under the thumb, and fades back in.
   - Add to Order / saves: rings update in place (stormSetSvg197); the v178 pass no longer redraws the v179 ring with wrong numbers;
     a "Keep on hand" save patches the card in place instead of rebuilding all cards. */
(function () {
  if (window.__storm197) return; window.__storm197 = true;
  var reduce = false; try { reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---- in-place svg update: same structure -> copy attributes/text; otherwise replace ---- */
  window.stormSetSvg197 = function (host, html) {
    if (!host) return;
    if (host.__svg197 === html && host.firstElementChild) return;
    var old = host.firstElementChild;
    var t = document.createElement('div'); t.innerHTML = html;
    var nw = t.firstElementChild;
    function sameShape(a, b) {
      if (!a || !b || a.tagName !== b.tagName || a.children.length !== b.children.length || host.children.length !== 1) return false;
      for (var i = 0; i < a.children.length; i++) if (a.children[i].tagName !== b.children[i].tagName) return false;
      return true;
    }
    function copy(a, b) {
      var i, n = {};
      for (i = 0; i < b.attributes.length; i++) { var at = b.attributes[i]; n[at.name] = 1; if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value); }
      for (i = a.attributes.length - 1; i >= 0; i--) { if (!n[a.attributes[i].name]) a.removeAttribute(a.attributes[i].name); }
    }
    if (sameShape(old, nw)) {
      copy(old, nw);
      for (var i = 0; i < nw.children.length; i++) {
        var a = old.children[i], b = nw.children[i];
        copy(a, b);
        if (!b.children.length && a.textContent !== b.textContent) a.textContent = b.textContent;
      }
    } else host.innerHTML = html;
    host.__svg197 = html;
  };

  var css = document.createElement('style'); css.id = 'storm-v197-css';
  css.textContent = ''
    + 'html body #st-catdd { display: none !important; }' /* Dave 19:10: redundant on the main screen; side menu keeps Categories */
    + '#st-follow { display: block; }'
    + '@media (min-width: 700px) and (min-height: 560px) {'
    + '  html body #topbar > .toolbar { display: flex !important; align-items: center; gap: 12px; max-width: 1240px; margin: 0 auto; padding: 12px 14px 0 !important; box-sizing: border-box; }'
    + '  html body #topbar > .toolbar > .search-row { flex: 1 1 auto; min-width: 0; }'
    + '  html body #topbar #search { height: 42px !important; padding-top: 0 !important; padding-bottom: 0 !important; }'
    + '  html body #topbar > .toolbar > .tabs { flex: 0 0 auto; width: 380px; height: 42px !important; margin: 0 !important; padding: 3px !important; box-sizing: border-box; }'
    + '  html body #topbar .tabs > .tab { display: flex !important; align-items: center; justify-content: center; gap: 6px; white-space: nowrap; height: 36px !important; padding: 0 10px !important; font-size: 14px !important; line-height: 1 !important; }'
    + '  html body #topbar .tabs > .tab .badge { margin: 0 !important; position: static !important; }'
    + '  html body #st-follow { max-width: 1240px; margin: 0 auto; padding: 0 14px; box-sizing: border-box; }'
    + '  html body #st-follow > #gd-sum { margin: 14px 0 0 !important; }'
    + '  html body #st-follow > #gd-chips { margin: 12px 0 0 !important; padding: 2px 0 6px !important; }'
    + '}';
  (document.head || document.documentElement).appendChild(css);
  window.addEventListener('load', function () { document.head.appendChild(css); }); /* stay after late style tags */

  /* ---- 1. the summary card + supplier chips ride in the sticky top bar ---- */
  function follow() {
    var tb = document.getElementById('topbar'); if (!tb) return;
    var f = document.getElementById('st-follow');
    if (!f) { f = document.createElement('div'); f.id = 'st-follow'; tb.appendChild(f); }
    else if (f.parentNode !== tb || f.nextElementSibling) tb.appendChild(f);
    ['gd-sum', 'gd-chips', 'st-catdd'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.parentNode !== f) f.appendChild(el);
    });
    /* keep the order sum, chips, (hidden) dropdown */
    var s = document.getElementById('gd-sum'), c = document.getElementById('gd-chips'), d = document.getElementById('st-catdd');
    if (s && f.firstElementChild !== s) f.insertBefore(s, f.firstElementChild);
    if (c && s && s.nextElementSibling !== c) s.insertAdjacentElement('afterend', c);
    if (d && c && c.nextElementSibling !== d) c.insertAdjacentElement('afterend', d);
  }
  var fq = false;
  function followSoon() { if (fq) return; fq = true; Promise.resolve().then(function () { fq = false; try { follow(); } catch (e) {} }); }
  function startFollow() {
    follow();
    /* the cards/chips are (re)inserted before #list by older blocks: move them before the frame paints */
    new MutationObserver(function (ms) {
      for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) {
        var n = ms[i].addedNodes[j]; if (n.id === 'gd-sum' || n.id === 'gd-chips' || n.id === 'st-catdd') { followSoon(); return; }
      }
    }).observe(document.body, { childList: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startFollow); else startFollow();

  /* ---- 2/3. scroll: same 1:1 hide; on the way back the taller bar reveals proportionally, so search/logo return after
     the same thumb travel as before and the summary + chips come with them ---- */
  window.onScrollTopbar = onScrollTopbar = function () {
    var tb = document.getElementById('topbar');
    var y = window.scrollY || 0;
    var h = (tb && tb.offsetHeight) || 160;
    var f = document.getElementById('st-follow'), fh = f ? f.offsetHeight : 0;
    var k = Math.max(1, Math.min(2.4, h / Math.max(80, h - fh)));
    var dy = y - topbarLastY;
    topbarLastY = y;
    if (y <= 0) { topbarHide = 0; }
    else if (dy > 0) { topbarUp = 0; topbarHide = Math.min(h, topbarHide + dy); }
    else if (dy < 0) {
      topbarUp += -dy; var need = topbarHide >= h ? TOPBAR_REVEAL_DELAY : 0;
      if (topbarUp > need) topbarHide = Math.max(0, topbarHide - k * Math.min(-dy, topbarUp - need));
    }
    if (topbarHide > y) topbarHide = Math.max(0, y);
    topbarTicking = false;
    applyTopbar();
  };

  /* ---- 4. mode switch: knob first, list dips, renders once, same item stays put, fades back ---- */
  var userTap = 0, deferring = false, pendingRender = false, busy = false;
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('#mode-switch')) userTap = Date.now(); }, true);
  function anchor() {
    var tb = document.getElementById('topbar'), top = 0;
    if (tb) { var r = tb.getBoundingClientRect(); top = Math.max(0, r.bottom); }
    var cs = document.querySelectorAll('#list .card[data-bin]');
    for (var i = 0; i < cs.length; i++) { var q = cs[i].getBoundingClientRect(); if (q.bottom > top + 10) return { bin: cs[i].getAttribute('data-bin'), top: q.top }; }
    return null;
  }
  function install() {
    var _render = render;
    window.render = render = function () {
      if (deferring) { pendingRender = true; return; }
      return _render.apply(this, arguments);
    };
    var _setMode = setMode;
    window.setMode = setMode = function (m) {
      var list = document.getElementById('list');
      var fromTap = Date.now() - userTap < 400;
      var target = (m === 'stock' || m === 'job') ? m : 'stock';
      try { if (window.stormAccess && stormAccess.isCrew()) target = 'job'; } catch (e) {}
      if (!fromTap || busy || reduce || !list || list.offsetParent === null || target === appMode || !(items && items.length)) return _setMode.apply(this, arguments);
      var a = anchor(), y0 = window.scrollY || 0;
      deferring = true; pendingRender = false;
      var r;
      try { r = _setMode.apply(this, arguments); } finally { deferring = false; }
      if (!pendingRender) return r;
      busy = true;
      list.style.transition = 'opacity .2s ease';
      list.style.willChange = 'opacity';
      requestAnimationFrame(function () { list.style.opacity = '0'; });
      setTimeout(function () {
        try { _render(); } catch (e) {}
        if (a && y0 > 0) {
          var c = document.querySelector('#list .card[data-bin="' + a.bin + '"]');
          if (c) { var d = c.getBoundingClientRect().top - a.top; if (Math.abs(d) > 1) { topbarLastY += d; window.scrollTo(0, (window.scrollY || 0) + d); } }
        }
        var imgs = [].slice.call(document.querySelectorAll('#list .card img')).filter(function (im) { var q = im.getBoundingClientRect(); return q.bottom > 0 && q.top < window.innerHeight; });
        var waits = imgs.map(function (im) { return im.decode ? im.decode().catch(function () {}) : Promise.resolve(); });
        var done = false;
        function show() {
          if (done) return; done = true;
          requestAnimationFrame(function () { requestAnimationFrame(function () {
            list.style.transition = 'opacity .22s ease'; list.style.opacity = '';
            setTimeout(function () { list.style.transition = ''; list.style.willChange = ''; busy = false; }, 260);
          }); });
        }
        Promise.all(waits).then(function () { setTimeout(show, 60); }); setTimeout(show, 320);
      }, 330); /* the knob slide is .32 s: render after it so the slide never stutters */
      return r;
    };
    /* ---- 6. "Keep on hand" save: patch the card in place (no rebuild of every card) ---- */
    var _rps = renderPreservingScroll;
    window.renderPreservingScroll = renderPreservingScroll = function () {
      var ins = document.querySelectorAll('#list .card[data-bin] input.par-input');
      if (!ins.length || tab === 'need') return _rps.apply(this, arguments);
      try {
        for (var i = 0; i < ins.length; i++) {
          var card = ins[i].closest('.card'), bin = card.getAttribute('data-bin'), it = findItem(bin);
          var t = document.createElement('div'); t.innerHTML = cardHtml(it);
          var btn = t.querySelector('.par');
          if (!btn) return _rps.apply(this, arguments);
          ins[i].replaceWith(btn);
          patchCard(it);
        }
      } catch (e) { return _rps.apply(this, arguments); }
    };
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* v198 (Hark, 2026-11-11, Dave's fix list items 7-9):
   7. Item details: swipe left = next item, swipe right = previous item, in the order of the cards on screen (the list as it is
      filtered / sorted right now; falls back to the base A-Z filtered list when the item is not on screen). The finger drags the page,
      release past 60 px (or a quick flick) slides the next page in beside it (carousel, .28 s); short drags, taps and vertical scrolls
      never swipe (axis lock after 10 px); at the first / last item it rubber-bands back. Touch events (iOS Safari, Android Chrome) plus
      pointer events for mouse / pen. Defines the missing base globals slideToDetail(bin, dir) and updateTotals() (both were called by
      Index.html but never defined, so the old swipe threw); the old base touchend handler is neutralised so it can't double-fire.
   8. Item details bar + side menu: the full STORM logo with "BASEMENT WATERPROOFING" in blue
      (assets/logos/STORM-logo-black-text-transparent.svg, the same light-theme lockup as the Home header and the sheets); edited in place
      in the v179 block (cl-dlogo / cl-lock) so the old logo never paints first.
   9. Supplier logo in the top-right corner of the item photo on every card and in Item details: transparent PNGs, no box / fill
      (assets/supplier-clear/hd.png, rt.png, az.png, hi.png; made from the app's own supplier logos with the white / red box removed). */
(function () {
  if (window.__storm198) return; window.__storm198 = true;
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/';
  var SUP = { 'Home Depot': 'hd', 'RichTech': 'rt', 'AutoZone': 'az', 'Hilti': 'hi' };
  function supUrl(s) { var k = SUP[s]; return k ? A + 'supplier-clear/' + k + '.png?v=1' : ''; }
  var B = 'html body';
  var st = document.createElement('style'); st.id = 'storm-v198-css';
  st.textContent = ''
    /* 9: supplier logo on the photo, cards */
    + B + ' #list > .card .card-main { position: relative; }'
    + B + ' #list > .card .sup198 { position: absolute; top: 7px; right: 7px; z-index: 2; display: block; width: auto; height: auto; max-height: 26px; max-width: 58%; object-fit: contain; filter: drop-shadow(0 0 0.75px rgba(255,255,255,.95)) drop-shadow(0 0 1.5px rgba(255,255,255,.75)) drop-shadow(0 1px 1.5px rgba(15,23,32,.16)); pointer-events: none; background: none !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; padding: 0 !important; margin: 0 !important; -webkit-user-select: none; user-select: none; }'
    /* 9: supplier logo on the photo, Item details (placed over the photo box by measurement) */
    + B + ' #detail .detail-body { position: relative; }'
    + B + ' #detail .sup198d { position: absolute; z-index: 4; display: block; width: auto; height: auto; max-height: 34px; max-width: min(30%, 160px); object-fit: contain; filter: drop-shadow(0 0 0.75px rgba(255,255,255,.95)) drop-shadow(0 0 1.5px rgba(255,255,255,.75)) drop-shadow(0 1px 1.5px rgba(15,23,32,.16)); pointer-events: none; background: none !important; border: 0 !important; box-shadow: none !important; border-radius: 0 !important; padding: 0 !important; margin: 0 !important; -webkit-user-select: none; user-select: none; }'
    + '@media (min-width: 700px) { ' + B + ' #detail .sup198d { max-height: 40px; } }'
    /* 7: the page only pans vertically by itself; horizontal moves are ours */
    + B + ' #detail.detail-overlay { touch-action: pan-y pinch-zoom; overscroll-behavior-x: none; }'
    + B + ' #detail.sw198-drag, ' + B + ' #detail.sw198-drag * { -webkit-user-select: none !important; user-select: none !important; }'
    + '#sw198-layer { position: absolute; left: 0; right: 0; overflow: hidden; pointer-events: none; z-index: 5; }'
    + '#sw198-layer > .detail-body { position: absolute !important; box-sizing: border-box; margin: 0 !important; will-change: transform; }';
  document.head.appendChild(st);
  try { [A + 'logos/STORM-logo-black-text-transparent.svg'].concat(Object.keys(SUP).map(supUrl)).forEach(function (u) { var i = new Image(); i.src = u; }); } catch (e) {}

  function findIt(bin) { try { return findItem(bin); } catch (e) { return null; } }

  /* ---------- 9. supplier logos ---------- */
  function cardLogo(card) {
    var host = card.querySelector('.card-main'); if (!host) return;
    var it = findIt(card.getAttribute('data-bin')), u = it && supUrl(it.supplier);
    var cur = host.querySelector(':scope > img.sup198');
    if (!u) { if (cur) cur.remove(); return; }
    if (cur) { if (cur.getAttribute('src') !== u) cur.setAttribute('src', u); return; }
    var im = document.createElement('img'); im.className = 'sup198'; im.alt = it.supplier; im.setAttribute('aria-hidden', 'true'); im.decoding = 'async'; im.src = u;
    host.appendChild(im);
  }
  function allCards(root) {
    (root || document).querySelectorAll('#list > .card[data-bin]').forEach(cardLogo);
  }
  function watchList() {
    var list = document.getElementById('list'); if (!list || !window.MutationObserver) return;
    allCards();
    new MutationObserver(function (ms) {
      var hit = false;
      for (var i = 0; i < ms.length && !hit; i++) {
        var a = ms[i].addedNodes;
        for (var j = 0; j < a.length; j++) { var n = a[j]; if (n.nodeType === 1 && !(n.classList && n.classList.contains('sup198'))) { hit = true; break; } }
      }
      if (hit) allCards();
    }).observe(list, { childList: true, subtree: true });
  }

  var dRO = null;
  function placeD(im, ph) {
    if (!im.isConnected || !ph.isConnected) return;
    var body = im.parentNode, b = body.getBoundingClientRect(), r = ph.getBoundingClientRect();
    if (!r.width) return;
    var pad = Math.max(8, Math.round(r.width * 0.025));
    im.style.top = Math.round(r.top - b.top + pad) + 'px';
    im.style.right = Math.round(b.right - r.right + pad) + 'px';
  }
  function detailLogo() {
    var d = document.getElementById('detail'); if (!d || !d.classList.contains('open')) return;
    var ph = d.querySelector('.detail-body > img.detail-photo'); if (!ph) return;
    var it = findIt(currentDetailBin), u = it && supUrl(it.supplier); if (!u) return;
    var im = ph.parentNode.querySelector(':scope > img.sup198d');
    if (!im) { im = document.createElement('img'); im.className = 'sup198d'; im.alt = it.supplier; im.setAttribute('aria-hidden', 'true'); im.src = u; ph.parentNode.appendChild(im); }
    else if (im.getAttribute('src') !== u) im.setAttribute('src', u);
    placeD(im, ph);
    if (dRO) { try { dRO.disconnect(); } catch (e) {} dRO = null; }
    if (window.ResizeObserver) { dRO = new ResizeObserver(function () { placeD(im, ph); }); dRO.observe(ph); dRO.observe(ph.parentNode); }
    ph.addEventListener('load', function () { placeD(im, ph); });
  }
  window.addEventListener('resize', function () { var d = document.getElementById('detail'); var im = d && d.querySelector('img.sup198d'), ph = d && d.querySelector('img.detail-photo'); if (im && ph) placeD(im, ph); });
  window.stormDetailLogo198 = detailLogo; /* v203: v166 calls it before painting its photo cover */

  /* ---------- 7. swipe between items ---------- */
  var busy = false;
  function order() {
    var out = [], seen = {};
    document.querySelectorAll('#list > .card[data-bin]').forEach(function (c) {
      var b = c.getAttribute('data-bin'); if (!b || seen[b] || !c.getClientRects().length) return; seen[b] = 1; out.push(b);
    });
    if (out.indexOf(currentDetailBin) === -1) {
      out = [];
      try { out = filtered().sort(byName).map(function (x) { return x.bin; }); } catch (e) {}
    }
    return out;
  }
  function neighbour(dir) { /* dir -1 = next (content moves left), +1 = previous */
    var l = order(), i = l.indexOf(currentDetailBin);
    if (i === -1) return null;
    return dir < 0 ? (l[i + 1] || null) : (l[i - 1] || null);
  }
  function bodyEl() { return document.querySelector('#detail > .detail-body') || document.querySelector('#detail .detail-body'); }
  var EASE = 'cubic-bezier(.22,.8,.24,1)';
  /* openDetail(bin, true) = swap in place. The base then replaceState()s {overlay:'detail'}; when the detail was opened without its own
     history entry (the base's very first open never pushes one: overlayOpen is undefined then), that would make the next Close call
     history.back() and leave the app, so the entry's previous state is put back. */
  function swapTo(bin) {
    var prev; try { prev = history.state; } catch (e) {}
    openDetail(bin, true);
    /* finish the page now (these restyles normally run 60-80 ms later off MutationObservers) so it slides in complete */
    try { if (typeof window.stormCl179All === 'function') window.stormCl179All(); } catch (e) {}
    try { if (typeof window.stormOh181Pass === 'function') window.stormOh181Pass(); } catch (e) {}
    try { if (typeof window.stormCl179All === 'function') window.stormCl179All(); } catch (e) {}
    try { detailLogo(); } catch (e) {}
    try { if (!(prev && prev.overlay === 'detail')) history.replaceState(prev === undefined ? null : prev, ''); } catch (e) {}
  }
  function go(bin, dir, dx) {
    var d = document.getElementById('detail'), old = bodyEl();
    if (!d || !bin) return false;
    dx = dx || 0;
    if (!old || busy) { swapTo(bin); return true; }
    busy = true;
    var W = d.clientWidth || window.innerWidth, GAP = 24, r = old.getBoundingClientRect();
    /* the old page itself (not a copy: its pictures stay decoded, no blank frame) is lifted out before the new one is drawn,
       then rides out in a clipped layer beside it */
    var ghost = old; ghost.parentNode.removeChild(ghost);
    ghost.querySelectorAll('[id]').forEach(function (e) { e.removeAttribute('id'); });
    ghost.classList.remove('slide-in-from-right', 'slide-in-from-left');
    var layer = document.createElement('div'); layer.id = 'sw198-layer'; layer.setAttribute('aria-hidden', 'true');
    swapTo(bin); /* the real page for the new item (all wrappers run) */
    var nb = bodyEl(), bar = d.querySelector('.detail-bar');
    var top = Math.max(0, bar ? bar.getBoundingClientRect().bottom : 0);
    var dr = d.getBoundingClientRect(), dtop = top - dr.top + d.scrollTop;
    layer.style.top = dtop + 'px'; layer.style.height = Math.max(0, d.clientHeight - (top - dr.top)) + 'px';
    ghost.style.cssText = 'left:' + (r.left - dx - dr.left) + 'px;top:' + (r.top - top) + 'px;width:' + r.width + 'px;transition:none;transform:translateX(' + dx + 'px);opacity:1';
    layer.appendChild(ghost); d.appendChild(layer); /* inside #detail: the page's own styles apply to the copy */
    if (nb) { nb.style.transition = 'none'; nb.style.opacity = '1'; nb.style.transform = 'translateX(' + (dx - dir * (W + GAP)) + 'px)'; }
    void (nb || ghost).offsetWidth;
    var dist = Math.abs(dir * (W + GAP) - dx), ms = Math.round(Math.max(180, Math.min(300, dist / (W + GAP) * 300)));
    requestAnimationFrame(function () {
      ghost.style.transition = 'transform ' + ms + 'ms ' + EASE;
      ghost.style.transform = 'translateX(' + (dir * (W + GAP)) + 'px)';
      if (nb) { nb.style.transition = 'transform ' + ms + 'ms ' + EASE; nb.style.transform = 'translateX(0px)'; }
    });
    setTimeout(function () {
      if (layer.parentNode) layer.parentNode.removeChild(layer);
      if (nb) { nb.style.transition = ''; nb.style.transform = ''; nb.style.opacity = ''; }
      busy = false;
      try { detailLogo(); } catch (e) {}
    }, ms + 40);
    return true;
  }
  /* warm the next / previous item's pictures so a swipe lands on a drawn photo */
  var warm = {};
  function prefetch() {
    [neighbour(-1), neighbour(1)].forEach(function (bin) {
      var it = bin && findIt(bin); if (!it) return;
      var cim = null; try { cim = document.querySelector('#list > .card[data-bin="' + bin.replace(/"/g, '') + '"] img.photo'); } catch (e) {}
      if (cim && cim.loading === 'lazy') { try { cim.loading = 'eager'; } catch (e) {} } /* the list card's own copy is what the detail paints first */
      [cim && cim.getAttribute('src'), it.photoUrl, A + 'items-hd/' + encodeURIComponent(bin) + '.jpg'].forEach(function (u) {
        if (!u || warm[u]) return; warm[u] = 1;
        try { var i = new Image(); i.decoding = 'async'; i.src = u; if (i.decode) i.decode().catch(function () {}); if (u.indexOf('items-hd/') >= 0) { var HC = window.__stormHd203 = window.__stormHd203 || {}; HC[bin] = i; } } catch (e) {} /* v203: keep the sharp copy so a swipe paints the final picture from frame 1 */
      });
    });
  }
  /* public: the base swipe called this but it never existed */
  window.slideToDetail = function (bin, dir) { if (!bin) return; go(bin, dir < 0 ? -1 : 1, 0); };
  if (typeof window.updateTotals !== 'function') window.updateTotals = function () { /* base removeFromPickList called it; setPickQty already refreshes the bar, sheet and card */ try { if (typeof updateCartFab === 'function') updateCartFab(); } catch (e) {} };

  var g = null, lastSwipe = 0, HAS_TOUCH = 'ontouchstart' in window;
  function skip(t, x) {
    if (busy) return true;
    var d = document.getElementById('detail');
    if (!d || !d.classList.contains('open') || !t || !t.closest || !t.closest('#detail')) return true;
    if (t.closest('input, textarea, select, [contenteditable], .detail-bar, .stepper, canvas.lbl-zoom')) return true;
    var W = window.innerWidth; if (x < 16 || x > W - 16) return true; /* leave the browser's edge-swipe back / forward alone */
    for (var e = t; e && e !== d; e = e.parentElement) { /* anything that scrolls sideways keeps its own swipe */
      if (e.scrollWidth > e.clientWidth + 2) { var ox = getComputedStyle(e).overflowX; if (ox === 'auto' || ox === 'scroll') return true; }
    }
    return false;
  }
  function start(x, y, t, kind, id) {
    if (skip(t, x)) { g = null; return; }
    g = { x: x, y: y, t: Date.now(), kind: kind, id: id, axis: null, dx: 0, body: bodyEl(), prev: null, next: null, lx: x, lt: Date.now(), v: 0 };
  }
  function move(x, y, ev) {
    if (!g) return;
    var dx = x - g.x, dy = y - g.y;
    if (!g.axis) {
      if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return;
      if (Math.abs(dx) > Math.abs(dy) * 1.2) {
        g.axis = 'h'; g.x = x; dx = 0; /* start from here so the page doesn't jump by the slop */
        g.next = neighbour(-1); g.prev = neighbour(1);
        var d = document.getElementById('detail'); if (d) d.classList.add('sw198-drag');
        if (g.body) g.body.style.transition = 'none';
      } else { g.axis = 'v'; return; }
    }
    if (g.axis !== 'h') return;
    if (ev && ev.cancelable) ev.preventDefault();
    var has = dx < 0 ? g.next : g.prev, W = window.innerWidth;
    var shown = has ? dx : dx / (1 + Math.abs(dx) / 70) * 0.6; /* rubber band at the ends */
    g.dx = dx; var now = Date.now(); if (now > g.lt) { g.v = (x - g.lx) / (now - g.lt); g.lx = x; g.lt = now; }
    if (g.body) g.body.style.transform = 'translateX(' + Math.max(-W, Math.min(W, shown)) + 'px)';
  }
  function end(cancel) {
    var s = g; g = null; if (!s) return;
    var d = document.getElementById('detail'); if (d) d.classList.remove('sw198-drag');
    if (s.axis !== 'h') return;
    lastSwipe = Date.now();
    var dir = s.dx < 0 ? -1 : 1, bin = dir < 0 ? s.next : s.prev;
    var fast = Math.abs(s.v) > 0.45 && (s.v < 0) === (s.dx < 0) && Math.abs(s.dx) > 24;
    if (!cancel && bin && (Math.abs(s.dx) >= 60 || fast) && s.body && s.body.isConnected) {
      var cur = 0; try { cur = new DOMMatrix(getComputedStyle(s.body).transform).m41 || 0; } catch (e) { cur = s.dx; }
      go(bin, dir, cur);
      return;
    }
    if (s.body && s.body.isConnected) { /* snap back */
      s.body.style.transition = 'transform .24s ' + EASE; s.body.style.transform = 'translateX(0px)';
      setTimeout(function () { if (s.body.isConnected && !g) { s.body.style.transition = ''; s.body.style.transform = ''; } }, 260);
    }
  }
  /* the old base touchend handler on #detail would call slideToDetail too: clear its start point first (capture runs before it) */
  document.addEventListener('touchend', function () { try { window.touchStartX = null; window.touchStartY = null; } catch (e) {} }, true);
  document.addEventListener('touchstart', function (e) {
    if (e.touches.length > 1) { if (g) end(true); g = null; return; }
    var t = e.touches[0]; start(t.clientX, t.clientY, e.target, 'touch');
  }, { passive: true, capture: true });
  document.addEventListener('touchmove', function (e) {
    if (!g || g.kind !== 'touch') return;
    if (e.touches.length > 1) { end(true); return; }
    var t = e.touches[0]; move(t.clientX, t.clientY, e);
  }, { passive: false, capture: true });
  document.addEventListener('touchend', function (e) { if (g && g.kind === 'touch') end(false); }, { passive: true, capture: true });
  document.addEventListener('touchcancel', function () { if (g && g.kind === 'touch') end(true); }, { passive: true, capture: true });
  /* pointer: mouse / pen everywhere, and touch only where touch events don't exist */
  document.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'touch' && HAS_TOUCH) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    start(e.clientX, e.clientY, e.target, 'ptr', e.pointerId);
  }, true);
  document.addEventListener('pointermove', function (e) { if (g && g.kind === 'ptr' && e.pointerId === g.id) move(e.clientX, e.clientY, e); }, true);
  document.addEventListener('pointerup', function (e) { if (g && g.kind === 'ptr' && e.pointerId === g.id) end(false); }, true);
  document.addEventListener('pointercancel', function (e) { if (g && g.kind === 'ptr' && e.pointerId === g.id) end(true); }, true);
  /* a drag that ended as a swipe is not a tap on whatever was under the finger */
  document.addEventListener('click', function (e) { if (Date.now() - lastSwipe < 350 && e.target.closest && e.target.closest('#detail')) { e.preventDefault(); e.stopPropagation(); } }, true);

  function install() {
    watchList();
    if (typeof openDetail === 'function') {
      var _o = openDetail;
      openDetail = function () { var r = _o.apply(this, arguments); try { detailLogo(); } catch (e) {} setTimeout(function () { try { prefetch(); } catch (e) {} }, 120); return r; };
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install); else install();
})();

/* v199 (Hark, 2026-11-11, Dave's fix list items 10, 11, 14 (tab only), 15):
   10. Find a Job search field ("Customer name or address"): a round X inside the field, shown only while it has text. One tap empties
       it, re-runs the search for everything (same as backspacing it out) and puts the cursor back in the field. The browser's own
       search-cancel X is hidden so there is only one.
   11. Customer Search sheet: a round X next to the customer's name (only when a customer is filled in) clears the retained customer in
       place: it does exactly what New Job does (first / last / address and the Jobber link cleared), keeps every line on the cart and
       does NOT open Find a Job. The cursor lands in First name.
   14. Side menu: "Receiving Orders" row directly under Staging, with the existing restock icon. For now it opens a simple placeholder
       screen titled Receiving Orders (Back / X closes it). The real screen comes in the next batch. Nothing else in the menu changes.
   15. Staging row icon: a flat utility cart (push handle, deck, two wheels) loaded with boxes, drawn in the same 24px / 1.7 stroke /
       accent blue as the other menu icons.
   Pure overlay: no server calls, no Sheet writes, no base globals renamed. */
(function () {
  if (window.__storm199) return; window.__storm199 = true;
  try {
    var css = ''
      /* 10 */
      + 'html body #job-find .x199-q { position: relative; flex: none; margin: 0 14px; }'
      + 'html body #job-find .x199-q > .jf-q { margin: 0 !important; width: 100% !important; padding-right: 50px !important; }'
      + 'html body #job-find .jf-q::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; display: none; }'
      + 'html body .x199-x { position: absolute; top: 50%; right: 8px; width: 32px; height: 32px; margin-top: -16px; padding: 0; border: 0; border-radius: 50%; background: #E6EBF1; color: #4B5563; display: none; align-items: center; justify-content: center; cursor: pointer; -webkit-tap-highlight-color: transparent; z-index: 2; }'
      + 'html body .x199-x svg { width: 16px; height: 16px; display: block; }'
      + 'html body .x199-x:active { background: #D5DCE5; transform: scale(.94); }'
      + 'html body #job-find .x199-q.x199-has > .x199-x { display: flex; }'
      /* 11 */
      + 'html body #pull-sheet .tc-top { position: relative; }'
      + 'html body #pull-sheet .tc-top > .tc-name { padding-left: 46px; padding-right: 46px; box-sizing: border-box; }'
      + 'html body #pull-sheet .tc-top > .x199-cx { position: absolute; right: 16px; margin-top: 0; width: 34px; height: 34px; }'
      + 'html body #pull-sheet .tc-top.x199-has > .x199-cx { display: flex; }'
      /* 14: placeholder screen */
      + '#ro199 { position: fixed; inset: 0; z-index: 135; overflow-y: auto; -webkit-overflow-scrolling: touch; background: #EAF0F7; color: #0F1720; font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; transform: translateX(100%); transition: transform .26s cubic-bezier(.2,.8,.2,1); visibility: hidden; }'
      + '#ro199.open { transform: none; visibility: visible; }'
      + '#ro199 .ro-top { display: flex; align-items: center; gap: 12px; padding: calc(14px + env(safe-area-inset-top)) 16px 10px; }'
      + '#ro199 .ro-top h2 { flex: 1; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -.01em; }'
      + '#ro199 .ro-x { flex: none; width: 42px; height: 42px; border-radius: 50%; border: 0; background: #fff; color: #0F1720; font-size: 26px; line-height: 42px; padding: 0; box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06); font-family: inherit; }'
      + '#ro199 .ro-card { margin: 10px 16px; padding: 26px 18px; background: #fff; border-radius: 16px; box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06); text-align: center; max-width: 560px; }'
      + '@media (min-width: 700px) { #ro199 .ro-card { margin: 18px auto; } }'
      + '#ro199 .ro-ic { width: 56px; height: 56px; margin: 0 auto 12px; border-radius: 16px; background: #E8F5FC; color: #29A8E0; display: flex; align-items: center; justify-content: center; }'
      + '#ro199 .ro-ic svg { width: 30px; height: 30px; }'
      + '#ro199 .ro-t { font-size: 18px; font-weight: 800; }'
      + '#ro199 .ro-s { margin-top: 6px; font-size: 14.5px; font-weight: 600; color: #6B7280; line-height: 1.4; }';
    var st = document.createElement('style'); st.id = 'storm-v199-css'; st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  } catch (e) {}

  var XSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  function $(id) { return document.getElementById(id); }
  function focusEnd(el) { try { el.focus({ preventScroll: true }); } catch (e) { try { el.focus(); } catch (e2) {} } }

  /* ---------- 10. Find a Job search field clear (X) ---------- */
  function wireFind() {
    var q = $('jf-q'); if (!q || q.__x199) return;
    q.__x199 = true;
    var box = document.createElement('div'); box.className = 'x199-q';
    q.parentNode.insertBefore(box, q); box.appendChild(q);
    var x = document.createElement('button'); x.type = 'button'; x.className = 'x199-x'; x.setAttribute('data-x199-q', '1');
    x.setAttribute('aria-label', 'Clear search'); x.innerHTML = XSVG;
    box.appendChild(x);
    var sync = function () { box.classList.toggle('x199-has', !!q.value); };
    q.addEventListener('input', sync); q.addEventListener('change', sync); sync();
  }
  function clearFind() {
    var q = $('jf-q'); if (!q) return;
    q.value = '';
    try { q.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
    var b = q.parentNode; if (b && b.classList) b.classList.remove('x199-has');
    focusEnd(q);
  }

  /* ---------- 11. Customer Search: clear the retained customer in place ---------- */
  function custHas() {
    var c = {}; try { c = JSON.parse(localStorage.getItem('stormJobCustomerV1') || '{}') || {}; } catch (e) {}
    return !!(String(c.first || '').trim() || String(c.last || '').trim() || String(c.address || '').trim());
  }
  function paintCust() {
    var sh = $('pull-sheet'); if (!sh) return;
    var top = sh.querySelector('.tc-top'), nm = top && top.querySelector(':scope > .tc-name'); if (!nm) return;
    var x = top.querySelector(':scope > .x199-cx');
    if (!x) {
      x = document.createElement('button'); x.type = 'button'; x.className = 'x199-x x199-cx'; x.setAttribute('data-x199-c', '1');
      x.setAttribute('aria-label', 'Clear customer'); x.setAttribute('title', 'Clear customer'); x.innerHTML = XSVG;
      top.appendChild(x);
    }
    var has = custHas();
    if (top.classList.contains('x199-has') !== has) top.classList.toggle('x199-has', has);
    var y = Math.round(nm.offsetTop + Math.min(nm.offsetHeight, 44) / 2 - 17) + 'px';
    if (x.style.top !== y) x.style.top = y;
  }
  function clearCust() {
    var sh = $('pull-sheet'); if (!sh) return;
    var nj = sh.querySelector('[data-jc-clear]');
    if (nj) nj.click(); /* the same clear as New Job: customer + Jobber link only; cart lines stay; Find a Job is not opened */
    else {
      try { localStorage.setItem('stormJobCustomerV1', '{}'); } catch (e) {}
      sh.querySelectorAll('[data-jc]').forEach(function (i) { i.value = ''; });
    }
    setTimeout(paintCust, 0);
    var f = sh.querySelector('[data-jc="first"]'); if (f) focusEnd(f);
  }

  /* ---------- 14 + 15. side menu ---------- */
  var CART = '<path d="M3 3.5h2.2v14"/><path d="M5.2 17.5H21"/><circle cx="8.2" cy="20.1" r="1.4"/><circle cx="18" cy="20.1" r="1.4"/><rect x="7.2" y="11.2" width="5.6" height="6.3" rx=".8"/><path d="M10 11.2v1.9"/><rect x="14.8" y="13" width="5.2" height="4.5" rx=".8"/><path d="M17.4 13v1.5"/><rect x="8.1" y="5.2" width="3.8" height="3.7" rx=".8"/>';
  var RESTOCK = '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v5h-5"/>';
  function svg(inner, cls) { return '<svg class="' + (cls || 'cl-ico') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>'; }
  function upgradeMenu() {
    var sg = document.querySelector('#cl-menu [data-cl-go="staging"]'); if (!sg) return false;
    var ic = sg.querySelector('svg.cl-ico');
    if (ic && !ic.getAttribute('data-v199')) { ic.innerHTML = CART; ic.setAttribute('data-v199', 'cart'); }
    var ro = sg.parentNode.querySelector('[data-ro199]');
    if (!ro) {
      ro = document.createElement('button'); ro.type = 'button'; ro.className = 'cl-row'; ro.setAttribute('data-ro199', '1');
      ro.innerHTML = svg(RESTOCK) + '<span class="cl-name">Receiving Orders</span>';
    }
    if (sg.nextElementSibling !== ro) sg.insertAdjacentElement('afterend', ro);
    return true;
  }
  function screen() {
    var s = $('ro199');
    if (!s) {
      s = document.createElement('div'); s.id = 'ro199'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-label', 'Receiving Orders');
      s.innerHTML = '<div class="ro-top"><h2>Receiving Orders</h2><button type="button" class="ro-x" data-ro199-x aria-label="Close">\u00d7</button></div>'
        + '<div class="ro-card"><div class="ro-ic">' + svg(RESTOCK, 'ro-svg') + '</div><div class="ro-t">Receiving Orders</div>'
        + '<div class="ro-s">Coming next: check in a supplier delivery and add what arrived to On hand.</div></div>';
      document.body.appendChild(s);
    }
    return s;
  }
  var roOpen = false;
  function openRO() {
    var s = screen(); void s.offsetWidth; s.classList.add('open'); s.scrollTop = 0; roOpen = true;
    try { history.pushState({ overlay: 'ro199' }, ''); } catch (e) {}
  }
  function closeRO(viaPop) {
    var s = $('ro199'); if (!s || !roOpen) return;
    roOpen = false; s.classList.remove('open');
    if (!viaPop) { try { if (history.state && history.state.overlay === 'ro199') history.back(); } catch (e) {} }
  }
  window.addEventListener('popstate', function () { if (roOpen && !(history.state && history.state.overlay === 'ro199')) closeRO(true); });
  window.stormOpenReceiving = openRO; /* the next batch replaces the placeholder */

  /* ---------- taps (capture, ahead of the base handlers) ---------- */
  document.addEventListener('mousedown', function (e) { var t = e.target; if (t && t.closest && t.closest('[data-x199-q], [data-x199-c]')) e.preventDefault(); }, true);
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('[data-x199-q]')) { e.preventDefault(); e.stopImmediatePropagation(); clearFind(); return; }
    if (t.closest('[data-x199-c]')) { e.preventDefault(); e.stopImmediatePropagation(); clearCust(); return; }
    if (t.closest('#cl-menu [data-ro199]')) {
      e.preventDefault(); e.stopImmediatePropagation();
      try { closeDrawer(); } catch (x) { var sc = $('drawer-scrim'); if (sc) sc.click(); }
      setTimeout(openRO, 220);
      return;
    }
    if (t.closest('#ro199 [data-ro199-x]')) { e.preventDefault(); e.stopImmediatePropagation(); closeRO(false); return; }
    if (t.closest('#hamburger')) setTimeout(upgradeMenu, 20);
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && roOpen) closeRO(false); });
  document.addEventListener('input', function (e) { var t = e.target; if (t && t.getAttribute && t.getAttribute('data-jc')) paintCust(); }, true);

  /* ---------- keep it applied as the base / overlay redraw ---------- */
  var q = 0;
  function all() { q = 0; try { wireFind(); } catch (e) {} try { paintCust(); } catch (e) {} try { upgradeMenu(); } catch (e) {} }
  function soon() { if (!q) q = requestAnimationFrame(all); }
  try { new MutationObserver(soon).observe(document.body, { childList: true }); } catch (e) {}
  (function watch(n) {
    var sh = $('pull-sheet'), dr = $('drawer');
    if (sh && !sh.__o199) { sh.__o199 = true; try { new MutationObserver(soon).observe(sh, { childList: true, subtree: true }); new MutationObserver(soon).observe(sh, { attributes: true, attributeFilter: ['class'] }); } catch (e) {} }
    if (dr && !dr.__o199) { dr.__o199 = true; try { new MutationObserver(soon).observe(dr, { childList: true }); } catch (e) {} }
    all();
    if (n < 240 && (!sh || !dr || !document.querySelector('#cl-menu [data-ro199]'))) setTimeout(function () { watch(n + 1); }, 500);
  })(0);
})();

/* v200 (Hark, 2026-11-11, Dave asked 18:58 "make it easier for the user to update the keep on hand and on hand. It should be fast and quick:
   a menu that comes up with both side by side so they can easily click how many for both."):
   - One quick count sheet (#qc-sheet) replaces the v181 On hand sheet: KEEP ON HAND (par) on the left, ON HAND on the right, each a big
     number with large - / + (56px+; hold = repeat, speeding up). Tap a number = in-sheet number pad (types over the value; Backspace, Clear, Done;
     a hardware keyboard works too). Header: photo, name, bin · supplier, and a live "Need N" with an OK / LOW / OUT pill.
   - Opens from the card "On hand" pill, the card "Keep on hand" button (replaces the old inline par box in Inventory mode), the Item details
     ring card / "Edit on hand", and a new "Edit keep on hand" pill beside it. window.stormOpenOnHand(bin) and window.stormOpenCount(bin, 'par'|'oh').
   - Save sends only what changed, through the existing server functions: par -> updatePar(bin, v, token), on hand -> saveCount(bin, v) -> updateCount.
     When both changed: updatePar first, then saveCount (one 'Saved' at the end, the card never flickers back to an old value). Optimistic:
     the card is patched in place (patchCard), no list re-render. The order / cart / pick list is never touched.
   - Both server functions are manager-only (requireManager_). Without a manager login the sheet opens read-only (both columns locked) with a
     "Manager login" button; crew normally never see it, because crew stay in Staging Job mode, where the sheet stays hidden (as v181).
   - Cancel, the scrim, Escape, or a swipe down closes it without saving. While it is open (and while a par save is in flight) live sync
     leaves the bin alone (window.stormOnHandSheetBin + data-bin on the sheet, read by the v180 busy() check). */
(function () {
  if (window.__stormQuickCount200) return; window.__stormQuickCount200 = true;
  var BLUE = '#29A8E0', BLUED = '#1A8FC4', INK = '#0F1720', MUTE = '#6B7280', MUTE2 = '#8A94A3', LINE = '#DCE4EE', BG = '#EEF3F8', AMBER = '#D97706', RED = '#DC2626', GREEN = '#15803D';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function find(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function jobMode() { try { return typeof isJobMode === 'function' ? !!isJobMode() : false; } catch (e) { return false; } }
  function isMgr() { try { return !!(window.stormAccess && window.stormAccess.isMgr()); } catch (e) { return false; } }
  function tok() { try { return window.stormCrewPin ? stormCrewPin.get() : (window.stormAccess ? stormAccess.token() : ''); } catch (e) { return ''; } }
  function numOf(v) { return v == null || v === '' || isNaN(Number(v)) ? null : Math.max(0, Math.floor(Number(v))); }
  function buzz() { try { if (navigator.vibrate) navigator.vibrate(6); } catch (e) {} }

  var css = document.createElement('style'); css.id = 'storm-v200-css';
  css.textContent = ''
    + '#qc-scrim { position: fixed; inset: 0; z-index: 200; background: rgba(15,23,32,.42); opacity: 0; pointer-events: none; transition: opacity .22s ease; touch-action: none; }'
    + '#qc-scrim.open { opacity: 1; pointer-events: auto; }'
    + '#qc-sheet { position: fixed; left: 0; right: 0; bottom: 0; z-index: 201; box-sizing: border-box; max-width: 600px; margin: 0 auto; padding: 8px 16px calc(16px + env(safe-area-inset-bottom)); background: #fff; border-radius: 14px 14px 0 0; box-shadow: 0 -4px 24px rgba(15,23,32,.18); font-family: ' + FONT + '; color: ' + INK + '; transform: translateY(105%); transition: transform .24s cubic-bezier(.2,.8,.2,1); visibility: hidden; touch-action: none; -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }'
    + '#qc-sheet.open { transform: translateY(0); visibility: visible; }'
    + '#qc-sheet.qc-drag { transition: none; }'
    + '#qc-sheet * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; } #qc-sheet button { -webkit-appearance: none; appearance: none; }'
    + '#qc-sheet .qc-grab { width: 40px; height: 4px; margin: 0 auto 10px; border-radius: 2px; background: ' + LINE + '; }'
    + '#qc-sheet .qc-head { display: flex; align-items: center; gap: 12px; min-height: 56px; }'
    + '#qc-sheet .qc-ph { flex: none; width: 56px; height: 56px; border-radius: 10px; background: #fff; border: 1px solid #EEF2F6; object-fit: contain; }'
    + '#qc-sheet .qc-ph.qc-none { visibility: hidden; }'
    + '#qc-sheet .qc-ht { min-width: 0; flex: 1 1 auto; }'
    + '#qc-sheet .qc-nm { font-size: 15.5px; font-weight: 700; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }'
    + '#qc-sheet .qc-sub { margin-top: 2px; font-size: 12.5px; font-weight: 500; color: ' + MUTE2 + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#qc-sheet .qc-need { display: flex; align-items: center; justify-content: center; gap: 8px; margin: 12px 0 2px; min-height: 26px; font-size: 14px; font-weight: 700; color: ' + INK + '; }'
    + '#qc-sheet .qc-need .qc-nt { color: ' + MUTE + '; font-weight: 600; } #qc-sheet .qc-need .qc-nt b { color: ' + INK + '; font-weight: 800; }'
    + '#qc-sheet .qc-pill { display: inline-flex; align-items: center; height: 22px; padding: 0 9px; border-radius: 11px; font-size: 11.5px; font-weight: 800; letter-spacing: .06em; }'
    + '#qc-sheet .qc-pill.ok { background: #E7F6EC; color: ' + GREEN + '; } #qc-sheet .qc-pill.low { background: #FEF3E2; color: ' + AMBER + '; } #qc-sheet .qc-pill.out { background: #FDECEC; color: ' + RED + '; } #qc-sheet .qc-pill.none { background: ' + BG + '; color: ' + MUTE + '; }'
    + '#qc-sheet .qc-cols { display: flex; gap: 10px; margin-top: 10px; }'
    + '#qc-sheet .qc-col { flex: 1 1 0; min-width: 0; padding: 10px 8px 10px; border: 1.5px solid #EEF2F6; border-radius: 14px; background: #fff; transition: border-color .15s ease, background-color .15s ease; }'
    + '#qc-sheet .qc-col.qc-act { border-color: ' + BLUE + '; background: #F5FBFE; }'
    + '#qc-sheet .qc-lbl { text-align: center; font-size: 11px; font-weight: 800; letter-spacing: .1em; color: ' + MUTE2 + '; white-space: nowrap; }'
    + '#qc-sheet .qc-col.qc-act .qc-lbl { color: ' + BLUED + '; }'
    + '#qc-sheet .qc-num { display: block; width: 100%; height: 62px; margin: 6px 0 2px; padding: 0; border: 0; border-radius: 12px; background: transparent; color: ' + INK + '; font-family: ' + FONT + '; font-size: 42px; font-weight: 800; line-height: 62px; text-align: center; font-variant-numeric: tabular-nums; cursor: text; }'
    + '#qc-sheet .qc-num:active { background: ' + BG + '; } #qc-sheet .qc-num:focus, #qc-sheet .qc-num:focus-visible { outline: none; box-shadow: none; }'
    + '#qc-sheet .qc-num.qc-typing { background: ' + BG + '; }'
    + '#qc-sheet .qc-num.qc-typing::after { content: ""; display: inline-block; width: 3px; height: 34px; margin-left: 3px; vertical-align: -3px; background: ' + BLUE + '; border-radius: 2px; animation: qcblink 1s steps(1) infinite; }'
    + '@keyframes qcblink { 50% { opacity: 0; } }'
    + '#qc-sheet .qc-was { height: 16px; text-align: center; font-size: 12px; font-weight: 600; color: ' + MUTE2 + '; }'
    + '#qc-sheet .qc-row { display: flex; gap: 8px; margin-top: 6px; }'
    + '#qc-sheet .qc-step { flex: 1 1 0; min-width: 56px; height: 58px; border: 0; border-radius: 14px; background: ' + BG + '; color: ' + INK + '; font-family: ' + FONT + '; font-size: 30px; font-weight: 600; line-height: 1; touch-action: none; transition: transform .06s ease, background-color .1s ease; }'
    + '#qc-sheet .qc-step[data-qc-d="1"] { background: ' + BLUE + '; color: #fff; }'
    + '#qc-sheet .qc-step.qc-down { transform: scale(.95); background: #DCE6F0; } #qc-sheet .qc-step[data-qc-d="1"].qc-down { background: ' + BLUED + '; }'
    + '#qc-sheet .qc-col.qc-lock .qc-step { visibility: hidden; }'
    + '#qc-sheet .qc-col.qc-lock .qc-num { cursor: default; color: ' + MUTE + '; pointer-events: none; } #qc-sheet .qc-col.qc-lock .qc-num:active { background: transparent; }'
    + '#qc-sheet .qc-lk { display: none; height: 58px; margin-top: 6px; align-items: center; justify-content: center; gap: 6px; border-radius: 14px; background: ' + BG + '; color: ' + MUTE + '; font-size: 12.5px; font-weight: 700; }'
    + '#qc-sheet .qc-col.qc-lock .qc-row { display: none; } #qc-sheet .qc-col.qc-lock .qc-lk { display: flex; }'
    + '#qc-sheet .qc-pad { display: none; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; }'
    + '#qc-sheet.qc-padon .qc-pad { display: grid; } #qc-sheet.qc-padon .qc-row { display: none; }'
    + '#qc-sheet .qc-pad button { height: 50px; border: 0; border-radius: 12px; background: ' + BG + '; color: ' + INK + '; font-family: ' + FONT + '; font-size: 22px; font-weight: 700; touch-action: manipulation; }'
    + '#qc-sheet .qc-pad button:active { background: #DCE6F0; }'
    + '#qc-sheet .qc-pad .qc-k-done { background: ' + BLUE + '; color: #fff; font-size: 16px; } #qc-sheet .qc-pad .qc-k-done:active { background: ' + BLUED + '; }'
    + '#qc-sheet .qc-pad .qc-k-clr { font-size: 14px; color: ' + MUTE + '; }'
    + '#qc-sheet .qc-btns { display: flex; gap: 10px; margin-top: 14px; }'
    + '#qc-sheet .qc-btns button { flex: 1 1 0; min-height: 52px; border-radius: 14px; font-family: ' + FONT + '; font-size: 16px; font-weight: 700; touch-action: manipulation; }'
    + '#qc-sheet .qc-cancel { border: 1px solid ' + LINE + '; background: #fff; color: ' + INK + '; }'
    + '#qc-sheet .qc-save { border: 0; background: ' + BLUE + '; color: #fff; transition: opacity .15s ease; } #qc-sheet .qc-save:active { background: ' + BLUED + '; }'
    + '#qc-sheet .qc-save.qc-idle { opacity: .55; }'
    + '#qc-sheet .qc-note { display: none; margin-top: 10px; text-align: center; font-size: 12.5px; font-weight: 600; color: ' + MUTE + '; }'
    + '#qc-sheet.qc-locked .qc-note { display: block; }'
    + '@media (min-width: 700px) and (min-height: 560px) {'
    + '  #qc-sheet { padding: 10px 22px calc(20px + env(safe-area-inset-bottom)); }'
    + '  #qc-sheet .qc-ph { width: 64px; height: 64px; } #qc-sheet .qc-nm { font-size: 17px; }'
    + '  #qc-sheet .qc-cols { gap: 14px; } #qc-sheet .qc-col { padding: 14px 12px; }'
    + '  #qc-sheet .qc-lbl { font-size: 12px; } #qc-sheet .qc-num { height: 72px; line-height: 72px; font-size: 50px; }'
    + '  #qc-sheet .qc-step { height: 64px; font-size: 32px; } #qc-sheet .qc-lk { height: 64px; } #qc-sheet .qc-pad button { height: 56px; }'
    + '}'
    + '@media (max-width: 370px) { #qc-sheet { padding-left: 12px; padding-right: 12px; } #qc-sheet .qc-cols { gap: 8px; } #qc-sheet .qc-col { padding: 10px 6px; } #qc-sheet .qc-row { gap: 6px; } #qc-sheet .qc-lbl { font-size: 10.5px; letter-spacing: .07em; } }'
    /* Item details: "Edit keep on hand" | "Edit on hand" side by side */
    + '#detail .cl-stock .qc-dbtns { flex: 1 1 100%; display: flex; gap: 10px; margin: 2px 0 0; }'
    + '#detail .cl-stock .qc-dbtns > button { flex: 1 1 0 !important; min-width: 0; margin: 0 !important; white-space: nowrap; padding-left: 6px !important; padding-right: 6px !important; }'
    + '#detail .cl-stock .qc-dpar { min-height: 36px; padding: 6px 8px; border: 1px solid rgba(41,168,224,.45); border-radius: 14px; background: #fff; color: ' + BLUED + '; font-family: ' + FONT + '; font-size: 14px; font-weight: 700; -webkit-tap-highlight-color: transparent; }'
    + '#detail .cl-stock .qc-dpar:active { background: rgba(41,168,224,.08); }'
    + '@media (max-width: 370px) { #detail .cl-stock .qc-dbtns > button { font-size: 13px !important; } }'
    + 'body.oh-job #detail .qc-dpar, body.oh-job #detail .qc-dbtns { display: none !important; }';
  document.head.appendChild(css);

  var COLS = [['par', 'KEEP ON HAND', 'Keep on hand'], ['oh', 'ON HAND', 'On hand']];
  function colHtml(c) {
    return '<div class="qc-col" data-qc-col="' + c[0] + '"><div class="qc-lbl">' + c[1] + '</div>'
      + '<button class="qc-num" type="button" data-qc-num="' + c[0] + '" aria-label="' + c[2] + ', tap to type"></button>'
      + '<div class="qc-was"></div>'
      + '<div class="qc-row"><button class="qc-step" type="button" data-qc-step="' + c[0] + '" data-qc-d="-1" aria-label="' + c[2] + ' one less">\u2212</button>'
      + '<button class="qc-step" type="button" data-qc-step="' + c[0] + '" data-qc-d="1" aria-label="' + c[2] + ' one more">+</button></div>'
      + '<div class="qc-lk"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>Manager only</div></div>';
  }
  var scrim = document.createElement('div'); scrim.id = 'qc-scrim';
  var sheet = document.createElement('div'); sheet.id = 'qc-sheet'; sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', 'Keep on hand and On hand');
  sheet.innerHTML = '<div class="qc-grab"></div>'
    + '<div class="qc-head"><img class="qc-ph" alt=""><div class="qc-ht"><div class="qc-nm"></div><div class="qc-sub"></div></div></div>'
    + '<div class="qc-need" aria-live="polite"></div>'
    + '<div class="qc-cols">' + COLS.map(colHtml).join('') + '</div>'
    + '<div class="qc-pad">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(function (k) { return '<button type="button" data-qc-k="' + k + '">' + k + '</button>'; }).join('')
    + '<button type="button" class="qc-k-clr" data-qc-k="clr">Clear</button><button type="button" data-qc-k="0">0</button><button type="button" data-qc-k="bs" aria-label="Backspace">\u232b</button>'
    + '<button type="button" class="qc-k-done" data-qc-k="done" style="grid-column: 1 / -1;">Done</button></div>'
    + '<div class="qc-note">Counts and Keep on hand are for managers.</div>'
    + '<div class="qc-btns"><button class="qc-cancel" type="button">Cancel</button><button class="qc-save" type="button">Save</button></div>';
  function mount() { if (!scrim.parentNode) document.body.appendChild(scrim); if (!sheet.parentNode) document.body.appendChild(sheet); }
  function q(s) { return sheet.querySelector(s); }

  var S = null; /* { bin, par0, oh0, par, oh, typing: 'par'|'oh'|null, fresh } */
  window.stormOnHandSheetBin = window.stormOnHandSheetBin || null;
  function locked() { return !isMgr(); }
  function stateOf(par, v) { if (v == null) return 'none'; if (v === 0) return 'out'; if (par != null && par > 0 && v < par) return 'low'; return 'ok'; }
  function paint() {
    if (!S) return;
    COLS.forEach(function (c) {
      var k = c[0], col = q('[data-qc-col="' + k + '"]'), v = S[k], v0 = S[k + '0'];
      var t = v == null ? '\u2013' : String(v), n = col.querySelector('.qc-num');
      if (n.textContent !== t) n.textContent = t;
      n.classList.toggle('qc-typing', S.typing === k);
      col.classList.toggle('qc-act', S.typing === k);
      var w = col.querySelector('.qc-was'), wt = v !== v0 ? 'was ' + (v0 == null ? '\u2013' : v0) : '';
      if (w.textContent !== wt) w.textContent = wt;
      col.querySelectorAll('[data-qc-d="-1"]').forEach(function (b) { b.disabled = v == null || v <= 0; b.style.opacity = b.disabled ? '.45' : ''; });
    });
    var st = stateOf(S.par, S.oh), need = q('.qc-need');
    var lbl = { ok: 'OK', low: 'LOW', out: 'OUT', none: 'NO COUNT' }[st];
    var txt = S.par == null ? 'No keep-on-hand set' : (S.oh == null ? 'Need \u2013' : 'Need <b>' + Math.max(0, S.par - S.oh) + '</b>');
    need.innerHTML = '<span class="qc-pill ' + st + '">' + lbl + '</span><span class="qc-nt">' + txt + '</span>';
    var dirty = S.par !== S.par0 || S.oh !== S.oh0, lk = locked();
    var sv = q('.qc-save'); sv.textContent = lk ? 'Manager login' : 'Save'; sv.classList.toggle('qc-idle', !lk && !dirty);
    sheet.classList.toggle('qc-locked', lk);
    sheet.classList.toggle('qc-padon', !!S.typing);
    COLS.forEach(function (c) { q('[data-qc-col="' + c[0] + '"]').classList.toggle('qc-lock', lk); });
  }
  function photoSrc(bin, it) {
    var img = document.querySelector('#list .card[data-bin="' + bin + '"] img.photo');
    if (!img) { try { if (currentDetailBin === bin) img = document.querySelector('#detail .detail-photo'); } catch (e) {} }
    return (img && (img.currentSrc || img.getAttribute('src'))) || it.photoUrl || '';
  }
  function open(bin, focus) {
    var it = find(bin); if (!it || jobMode()) return false;
    mount();
    if (S && sheet.classList.contains('open')) stopRep();
    S = { bin: bin, par0: numOf(it.par), oh0: numOf(it.onHand), typing: null, fresh: false };
    S.par = S.par0; S.oh = S.oh0;
    window.stormOnHandSheetBin = bin;
    sheet.setAttribute('data-bin', bin); /* v180 busy(): taps in the sheet count as editing this bin */
    var ph = q('.qc-ph'), src = photoSrc(bin, it);
    if (src) { if (ph.getAttribute('src') !== src) ph.src = src; ph.classList.remove('qc-none'); } else { ph.removeAttribute('src'); ph.classList.add('qc-none'); }
    q('.qc-nm').textContent = it.name || bin;
    q('.qc-sub').textContent = [String(it.bin).toUpperCase(), it.supplier || ''].filter(Boolean).join(' \u00b7 ');
    paint();
    sheet.style.transform = '';
    scrim.classList.add('open'); void sheet.offsetWidth; sheet.classList.add('open');
    if (focus === 'par' || focus === 'oh') { var col = q('[data-qc-col="' + focus + '"]'); col.classList.add('qc-act'); setTimeout(function () { if (S && !S.typing) col.classList.remove('qc-act'); }, 700); }
    return true;
  }
  function close() {
    stopRep();
    if (S) S.typing = null;
    sheet.classList.remove('open', 'qc-padon', 'qc-drag'); scrim.classList.remove('open'); sheet.style.transform = '';
    var b = S && S.bin; S = null;
    setTimeout(function () { if (window.stormOnHandSheetBin === b && !sheet.classList.contains('open') && !inflight[b]) window.stormOnHandSheetBin = null; }, 600);
  }
  function setVal(k, v) { if (!S || locked()) return; v = v == null ? null : Math.max(0, Math.min(99999, v)); if (S[k] === v) return; S[k] = v; paint(); }
  function step(k, d) { if (!S) return; var v = S[k]; v = v == null ? 0 : v; if (d < 0 && v <= 0 && S[k] != null) return; setVal(k, Math.max(0, v + d)); buzz(); }

  /* ---- hold to repeat, speeding up ---- */
  var rep = { t: 0, k: null, d: 0, n: 0, el: null };
  function stopRep() { clearTimeout(rep.t); rep.t = 0; if (rep.el) rep.el.classList.remove('qc-down'); rep.el = null; rep.k = null; }
  function tick() {
    if (!rep.k || !S) return stopRep();
    rep.n++;
    var by = rep.n > 30 ? 5 : 1; /* after ~2.5 s of holding, jump by 5 */
    if (by > 1 && rep.d > 0) { var cur = S[rep.k] == null ? 0 : S[rep.k]; setVal(rep.k, cur + by); }
    else if (by > 1) { var c2 = S[rep.k] == null ? 0 : S[rep.k]; setVal(rep.k, Math.max(0, c2 - by)); }
    else step(rep.k, rep.d);
    if (rep.d < 0 && (S[rep.k] == null || S[rep.k] <= 0)) return stopRep();
    rep.t = setTimeout(tick, Math.max(45, Math.round(150 * Math.pow(0.9, rep.n))));
  }
  sheet.addEventListener('pointerdown', function (e) {
    var b = e.target.closest && e.target.closest('[data-qc-step]'); if (!b || !S || locked() || b.disabled) return;
    e.preventDefault(); stopRep();
    if (S.typing) { S.typing = null; paint(); }
    rep.k = b.getAttribute('data-qc-step'); rep.d = Number(b.getAttribute('data-qc-d')); rep.n = 0; rep.el = b; b.classList.add('qc-down');
    try { b.setPointerCapture(e.pointerId); } catch (x) {}
    step(rep.k, rep.d);
    rep.t = setTimeout(tick, 420);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { sheet.addEventListener(t, function () { if (rep.k) stopRep(); }); });
  sheet.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  /* ---- number pad ---- */
  function typeKey(k) {
    if (!S || !S.typing) return;
    var f = S.typing, cur = S[f];
    if (k === 'done') { S.typing = null; paint(); return; }
    if (k === 'clr') { S.fresh = false; setVal(f, null); paint(); return; }
    if (k === 'bs') { S.fresh = false; var s = cur == null ? '' : String(cur); s = s.slice(0, -1); setVal(f, s === '' ? null : Number(s)); paint(); return; }
    if (/^[0-9]$/.test(k)) { var base = S.fresh || cur == null ? '' : String(cur); S.fresh = false; var ns = (base + k).replace(/^0+(?=\d)/, ''); if (ns.length > 5) return; setVal(f, Number(ns)); paint(); }
  }
  sheet.addEventListener('click', function (e) {
    var t = e.target; if (!t.closest || !S) return;
    var st = t.closest('[data-qc-step]');
    if (st) { if (e.detail === 0 && !locked()) step(st.getAttribute('data-qc-step'), Number(st.getAttribute('data-qc-d'))); return; } /* keyboard / switch access; pointer taps are handled on pointerdown */
    var n = t.closest('[data-qc-num]');
    if (n) { if (locked()) return; var f = n.getAttribute('data-qc-num'); S.typing = S.typing === f ? null : f; S.fresh = true; paint(); return; }
    var k = t.closest('[data-qc-k]'); if (k) { typeKey(k.getAttribute('data-qc-k')); return; }
    if (t.closest('.qc-cancel')) { close(); return; }
    if (t.closest('.qc-save')) { if (locked()) { askLogin(); return; } save(); return; }
  });
  document.addEventListener('keydown', function (e) {
    if (!S || !sheet.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); if (S.typing) { S.typing = null; paint(); } else close(); return; }
    if (S.typing) {
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); typeKey(e.key); return; }
      if (e.key === 'Backspace') { e.preventDefault(); typeKey('bs'); return; }
      if (e.key === 'Enter') { e.preventDefault(); typeKey('done'); return; }
    } else if (e.key === 'Enter' && !(e.target && e.target.closest && e.target.closest('button'))) { e.preventDefault(); if (!locked()) save(); }
  }, true);
  function askLogin() {
    if (!window.stormAccess) return;
    var bin = S && S.bin;
    try { stormAccess.ask(function (ok) { if (ok && S && S.bin === bin) paint(); }, 'Counts and Keep on hand are for managers.'); } catch (e) {}
  }

  /* ---- swipe down to close ---- */
  var dg = null;
  sheet.addEventListener('touchstart', function (e) {
    if (!S || e.touches.length !== 1) return;
    if (e.target.closest && e.target.closest('[data-qc-step], .qc-pad button')) return;
    dg = { y: e.touches[0].clientY, x: e.touches[0].clientX, t: Date.now(), dy: 0, on: false };
  }, { passive: true });
  sheet.addEventListener('touchmove', function (e) {
    if (e.cancelable) e.preventDefault(); /* nothing in the sheet scrolls; never scroll the list behind it */
    if (!dg) return;
    var dy = e.touches[0].clientY - dg.y, dx = e.touches[0].clientX - dg.x;
    if (!dg.on) { if (Math.abs(dy) < 8 || Math.abs(dx) > Math.abs(dy)) return; dg.on = true; sheet.classList.add('qc-drag'); stopRep(); }
    dg.dy = Math.max(0, dy); sheet.style.transform = 'translateY(' + (dy < 0 ? dy / 6 : dy) + 'px)';
  }, { passive: false });
  function endDrag() {
    if (!dg) return; var d = dg; dg = null; if (!d.on) return;
    sheet.classList.remove('qc-drag');
    var v = d.dy / Math.max(1, Date.now() - d.t);
    if (d.dy > 90 || (d.dy > 30 && v > 0.5)) close(); else sheet.style.transform = '';
  }
  sheet.addEventListener('touchend', endDrag); sheet.addEventListener('touchcancel', endDrag);
  scrim.addEventListener('click', close);
  scrim.addEventListener('touchmove', function (e) { if (e.cancelable) e.preventDefault(); }, { passive: false });

  /* ---- save ---- */
  var inflight = {};
  function nudgeDetail() { var d = document.getElementById('detail'); if (d && d.classList.contains('open')) { d.classList.add('oh-t'); setTimeout(function () { d.classList.remove('oh-t'); }, 0); } }
  function patch(it) { try { patchCard(it); } catch (e) {} try { syncDetailStepper(it.bin); } catch (e) {} nudgeDetail(); }
  function sameItem(a, b) { return a && b && numOf(a.onHand) === numOf(b.onHand) && numOf(a.par) === numOf(b.par) && numOf(a.need) === numOf(b.need); }
  function done(bin) { delete inflight[bin]; setTimeout(function () { if (window.stormOnHandSheetBin === bin && !(S && S.bin === bin) && !inflight[bin]) window.stormOnHandSheetBin = null; }, 600); }
  function sendPar(bin, v, then) {
    inflight[bin] = true;
    google.script.run
      .withSuccessHandler(function (updated) {
        if (then) { then(); return; } /* the count save that follows returns both new values */
        done(bin);
        var it = find(bin); if (updated && it && !sameItem(it, updated)) { try { applyUpdate(updated); } catch (e) {} try { syncDetailStepper(bin); } catch (e) {} nudgeDetail(); }
        showToast('Saved');
      })
      .withFailureHandler(function (err) {
        if (window.stormCrewPin && stormCrewPin.isPinErr(err)) {
          stormCrewPin.ask(function (ok) { if (ok) sendPar(bin, v, then); else { done(bin); showToast('Not saved \u2014 manager code needed', true); try { load(); } catch (e) {} } });
          return;
        }
        done(bin);
        showToast(window.stormCrewPin && stormCrewPin.isLocked(err) ? 'Too many wrong codes \u2014 wait 10 minutes' : 'Couldn\'t save \u2014 try again', true);
        try { load(); } catch (e) {}
      })
      .updatePar(bin, v == null ? '' : String(v), tok());
  }
  function save() {
    if (!S) return;
    var bin = S.bin, it = find(bin); if (!it) { close(); return; }
    var dp = S.par !== S.par0, dc = S.oh !== S.oh0, par = S.par, oh = S.oh;
    close();
    if (!dp && !dc) return;
    /* optimistic: this card only */
    if (dp) it.par = par;
    if (dc) it.onHand = oh;
    it.need = (it.onHand == null || it.par == null || it.par === '') ? null : Math.max(0, Number(it.par) - Number(it.onHand));
    window.stormOnHandSheetBin = bin;
    patch(it);
    var sendCount = function () { done(bin); saveCount(bin, oh == null ? '' : String(oh)); };
    if (dp) sendPar(bin, par, dc ? sendCount : null); else sendCount();
  }

  /* ---- entry points (window capture: runs before the v181 document handler and the base #list handler) ---- */
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest || jobMode()) return;
    var b = t.closest('.oh-btn[data-oh-bin]');
    if (b) { if (open(b.getAttribute('data-oh-bin'), 'oh')) { e.preventDefault(); e.stopPropagation(); } return; }
    var p = t.closest('#list .card[data-bin] button.par');
    if (p) { if (open(p.closest('.card').getAttribute('data-bin'), 'par')) { e.preventDefault(); e.stopPropagation(); } return; }
    var s = t.closest('#detail .cl-stock');
    if (s) { var bin = null; try { bin = currentDetailBin; } catch (x) {} if (bin && open(bin, t.closest('.qc-dpar') ? 'par' : 'oh')) { e.preventDefault(); e.stopPropagation(); } }
  }, true);
  function addDetailBtn() {
    var d = document.getElementById('detail'); if (!d || !d.classList.contains('open')) return;
    var oe = d.querySelector('.cl-stock .oh-edit'); if (!oe || (oe.parentNode.classList.contains('qc-dbtns') && oe.parentNode.querySelector('.qc-dpar'))) return;
    var w = document.createElement('div'); w.className = 'qc-dbtns';
    w.innerHTML = '<button class="qc-dpar" type="button">Edit keep on hand</button>';
    oe.parentNode.insertBefore(w, oe); w.appendChild(oe);
  }
  var dq = 0; function soon() { if (dq) return; dq = setTimeout(function () { dq = 0; try { addDetailBtn(); } catch (e) {} }, 30); }
  (function attach(n) { var d = document.getElementById('detail'); if (!d) { if (n < 120) setTimeout(function () { attach(n + 1); }, 250); return; } new MutationObserver(soon).observe(d, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] }); soon(); })(0);
  try { var _p181 = window.stormOh181Pass; if (typeof _p181 === 'function') window.stormOh181Pass = function () { var r = _p181.apply(this, arguments); try { addDetailBtn(); } catch (e) {} return r; }; } catch (e) {}
  /* job mode switched while open: close (the sheet is Inventory-only) */
  setInterval(function () { if (S && jobMode()) close(); }, 500);

  window.stormOpenOnHand = function (bin) { return open(bin, 'oh'); };
  window.stormOpenCount = function (bin, focus) { return open(bin, focus === 'par' ? 'par' : 'oh'); };
})();

/* v201 (Hark, 2026-11-11, Dave asked 19:01 "I want that restock really bad, so when the truck arrives the user can easily add the items back
   to the inventory."): the real Receiving Orders screen (#ro201) replaces the v199 placeholder.
   - What's on order: every item with need > 0 (need = max(0, keep on hand - on hand), the same rule as Needs Ordering / the Order List),
     grouped Home Depot, RichTech, AutoZone, Hilti (then any other supplier), A-Z. Each row: photo, name, bin, "Ordered/needed N".
   - Received counter per row: big - / + (hold = repeat, speeding up, same timings as v200), tap the number for a number pad (v200 pad keys:
     types over, Clear, backspace, Done; hardware keys work). Starts at 0. "Got all" sets it to the needed qty; "Receive all" per supplier.
   - Extras: "Add item" search (name, bin, SKU) and, inside the wrapper, a Scan button that reuses openScanner. While a receiving scan is open the
     result is caught (applyCartParam / applyScansParam are wrapped for that one scan only): the scanned items are added here and the cart is
     never changed.
   - Sticky bar "Add N items to On hand" -> confirm summary (was -> new) -> for each row new on hand = current on hand + received, sent one by one
     through updateCount(bin, value, manager token) using the saveCount queue (saveQueues[bin] is held busy, any count tapped meanwhile is pumped
     after). Cards and rings update in place via applyUpdate/patchCard. "Received ✓" banner. Counts survive a reload (draft in localStorage)
     and are kept when offline or when a save fails (only the rows that saved are cleared, so nothing is added twice).
   - One receiving log line per item in localStorage stormReceivingLogV1 {t, bin, name, qty, from, to, by}; shown as "Recent receipts".
     No Sheet tab is added.
   - Permissions unchanged: updateCount is manager-only on the server. Without a manager login the list shows and counting works, but the bar
     reads "Manager login to receive" (opens the manager code screen) and nothing is sent.
   - Never places supplier orders and never touches the cart / order. The greyed "Restock · Soon" side-menu row is hidden (this replaces it).
   - Android back / Escape / X close it. window.stormOpenReceiving opens it.
   v208 (Hark, 2026-11-12, Dave: "I want those items to have a button on top of their section so I can add them to our bins ... PVC fittings
   ... not every job has these on the job listing ... scan the bins and then have a count going on them"):
   - R.scanned (bins, newest first, kept in the draft): every bin read by the camera while Receiving is open goes to the "Scanned" section
     pinned above the supplier groups, whether it is on order or not. A scan of a bin already there adds +1 (the scanner counts a label once
     per appearance; off and back = +1 more). A scanned bin is taken out of its supplier group / Also received, so it is never listed twice.
   - "Add N to bins" at the top of the section -> same confirm sheet (was -> new) limited to the Scanned rows -> same send() (updateCount,
     manager token, saveQueues hold, retry, offline, receipt log, Received banner). Saved scanned rows fold away; one still on order goes back
     to its supplier group at 0.
   - The bottom bar reads "Add counted items to On hand (N)": unchanged behavior, only rows with a count above 0 (scanned ones included).
   - The scanner is opened with &recv=1 (scan.html shows it as a receiving scan); the result is still caught here and the cart never changes. */
(function () {
  if (window.__stormReceiving201) return; window.__stormReceiving201 = true;
  var BLUE = '#29A8E0', BLUED = '#1A8FC4', INK = '#0F1720', MUTE = '#6B7280', MUTE2 = '#8A94A3', LINE = '#DCE4EE', BG = '#EEF3F8', AMBER = '#D97706', RED = '#DC2626', GREEN = '#15803D';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var ORDER = ['Home Depot', 'RichTech', 'AutoZone', 'Hilti'];
  var LOGO = { 'Home Depot': 'hd', 'RichTech': 'rt', 'AutoZone': 'az', 'Hilti': 'hi' };
  var LOG_KEY = 'stormReceivingLogV1', DRAFT_KEY = 'stormReceivingDraftV1';
  function $(id) { return document.getElementById(id); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function all() { try { return Array.isArray(items) ? items : []; } catch (e) { return []; } }
  function find(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function numOf(v) { return v == null || v === '' || isNaN(Number(v)) ? null : Math.max(0, Math.floor(Number(v))); }
  function needOf(it) { var p = numOf(it && it.par), o = numOf(it && it.onHand); return p == null || o == null ? 0 : Math.max(0, p - o); } /* = server need */
  function isMgr() { try { return !!(window.stormAccess && window.stormAccess.isMgr()); } catch (e) { return false; } }
  function tok() { try { return window.stormCrewPin ? stormCrewPin.get() : (window.stormAccess ? stormAccess.token() : ''); } catch (e) { return ''; } }
  function who() { var n = ''; try { n = localStorage.getItem('stormDeviceNameV1') || ''; } catch (e) {} return n || (isMgr() ? 'Manager' : 'Crew'); }
  function buzz() { try { if (navigator.vibrate) navigator.vibrate(6); } catch (e) {} }
  function byNm(a, b) { return String(a.name || '').localeCompare(String(b.name || ''), undefined, { numeric: true, sensitivity: 'base' }); }
  function supRank(s) { var i = ORDER.indexOf(s); return i < 0 ? 9 : i; }
  function inWrap() { try { var ao = location.ancestorOrigins; if (ao) for (var i = 0; i < ao.length; i++) if (/github\.io$/.test(ao[i])) return true; } catch (e) {} return false; }
  function photo(it) {
    var img = document.querySelector('#list .card[data-bin="' + it.bin + '"] img.photo');
    return (img && (img.currentSrc || img.getAttribute('src'))) || it.photoUrl || '';
  }

  /* ---------- css ---------- */
  var css = document.createElement('style'); css.id = 'storm-v201-css';
  var SH = 'box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06);';
  css.textContent = ''
    + '#ro201 { position: fixed; inset: 0; z-index: 135; display: flex; flex-direction: column; background: #EAF0F7; color: ' + INK + '; font-family: ' + FONT + '; transform: translateX(100%); transition: transform .26s cubic-bezier(.2,.8,.2,1); visibility: hidden; }'
    + '#ro201.open { transform: none; visibility: visible; }'
    + '#ro201 *, #ro201-pad *, #ro201-cf * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }'
    + '#ro201 button, #ro201-pad button, #ro201-cf button { -webkit-appearance: none; appearance: none; font-family: ' + FONT + '; cursor: pointer; }'
    + '#ro201 .r-top { flex: none; display: flex; align-items: center; gap: 12px; padding: calc(12px + env(safe-area-inset-top)) 16px 8px; max-width: 820px; width: 100%; margin: 0 auto; }'
    + '#ro201 .r-top h2 { flex: 1; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -.01em; }'
    + '#ro201 .r-x { flex: none; width: 42px; height: 42px; border-radius: 50%; border: 0; background: #fff; color: ' + INK + '; font-size: 26px; line-height: 42px; padding: 0; ' + SH + ' }'
    + '#ro201 .r-body { flex: 1 1 auto; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; padding: 0 16px 24px; }'
    + '#ro201 .r-in { max-width: 820px; margin: 0 auto; }'
    + '#ro201 .r-sub { margin: 0 2px 10px; font-size: 13.5px; font-weight: 600; color: ' + MUTE + '; line-height: 1.4; }'
    + '#ro201 .r-tools { position: relative; display: flex; gap: 8px; margin-bottom: 12px; }'
    + '#ro201 .r-q { flex: 1 1 auto; min-width: 0; height: 46px; padding: 0 14px 0 40px; border: 1px solid ' + LINE + '; border-radius: 14px; background: #fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2718%27 height=%2718%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%238A94A3%27 stroke-width=%272.2%27 stroke-linecap=%27round%27%3E%3Ccircle cx=%2711%27 cy=%2711%27 r=%277%27/%3E%3Cpath d=%27M20 20l-3.5-3.5%27/%3E%3C/svg%3E") 13px 50% no-repeat; font-family: ' + FONT + '; font-size: 15px; font-weight: 600; color: ' + INK + '; outline: none; -webkit-appearance: none; appearance: none; }'
    + '#ro201 .r-q:focus { border-color: ' + BLUE + '; }'
    + '#ro201 .r-q::-webkit-search-cancel-button { -webkit-appearance: none; }'
    + '#ro201 .r-scan { flex: none; display: flex; align-items: center; gap: 6px; height: 46px; padding: 0 14px; border: 0; border-radius: 14px; background: ' + BLUE + '; color: #fff; font-size: 14.5px; font-weight: 700; }'
    + '#ro201 .r-scan:active { background: ' + BLUED + '; } #ro201 .r-scan svg { width: 20px; height: 20px; }'
    + '#ro201 .r-res { position: absolute; left: 0; right: 0; top: 50px; z-index: 5; max-height: 330px; overflow-y: auto; background: #fff; border-radius: 14px; ' + SH + ' box-shadow: 0 8px 30px rgba(15,23,32,.16); display: none; }'
    + '#ro201 .r-res.on { display: block; }'
    + '#ro201 .r-hit { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 12px; border: 0; border-bottom: 1px solid #F1F4F8; background: #fff; text-align: left; color: ' + INK + '; }'
    + '#ro201 .r-hit:last-child { border-bottom: 0; } #ro201 .r-hit:active { background: ' + BG + '; }'
    + '#ro201 .r-hit img, #ro201 .r-hit .r-noimg { flex: none; width: 40px; height: 40px; border-radius: 8px; object-fit: contain; background: #fff; border: 1px solid #EEF2F6; }'
    + '#ro201 .r-hit .r-ht { min-width: 0; flex: 1; } #ro201 .r-hit .r-hn { font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201 .r-hit .r-hm { font-size: 12px; font-weight: 600; color: ' + MUTE2 + '; } #ro201 .r-hit .r-add { flex: none; font-size: 13px; font-weight: 800; color: ' + BLUED + '; }'
    + '#ro201 .r-none { padding: 14px; font-size: 13.5px; font-weight: 600; color: ' + MUTE + '; text-align: center; }'
    + '#ro201 .r-done { display: none; align-items: center; gap: 10px; margin-bottom: 12px; padding: 12px 14px; border-radius: 14px; background: #E7F6EC; color: ' + GREEN + '; font-size: 15px; font-weight: 800; }'
    + '#ro201 .r-done.on { display: flex; animation: r201in .3s ease both; } #ro201 .r-done span { font-weight: 600; color: #166534; font-size: 13.5px; }'
    + '#ro201 .r-warn { display: none; margin-bottom: 12px; padding: 12px 14px; border-radius: 14px; background: #FEF3E2; color: #92400E; font-size: 13.5px; font-weight: 700; line-height: 1.4; } #ro201 .r-warn.on { display: block; }'
    + '@keyframes r201in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }'
    /* v208: Scanned section */
    + '#ro201 .r-grp[data-r-scanned] { box-shadow: 0 0 0 2px rgba(41,168,224,.35), 0 1px 2px rgba(15,23,32,.05), 0 4px 14px rgba(15,23,32,.06); animation: r201in .3s ease both; }'
    + '#ro201 .r-sic { flex: none; width: 36px; height: 36px; border-radius: 10px; background: #E8F5FC; color: ' + BLUED + '; display: flex; align-items: center; justify-content: center; }'
    + '#ro201 .r-sic svg { width: 20px; height: 20px; }'
    + '#ro201 .r-addscan { flex: none; height: 40px; padding: 0 14px; border: 0; border-radius: 12px; background: ' + BLUE + '; color: #fff; font-size: 14px; font-weight: 800; white-space: nowrap; transition: opacity .15s ease, background-color .15s ease; }'
    + '#ro201 .r-addscan:active { background: ' + BLUED + '; } #ro201 .r-addscan.r-idle { opacity: .5; } #ro201 .r-addscan.r-lock { background: ' + INK + '; } #ro201 .r-addscan.r-busy { opacity: .75; pointer-events: none; }'
    + '#ro201 .r-row.r-new { animation: r208new .34s cubic-bezier(.2,.8,.2,1) both; }'
    + '@keyframes r208new { from { opacity: 0; transform: translateY(-8px); background: #E8F5FC; } to { opacity: 1; transform: none; } }'
    + '#ro201-cf .c-note { flex: none; margin-top: 4px; text-align: center; font-size: 12px; font-weight: 600; color: ' + MUTE2 + '; }'
    + '#ro201 .r-grp { margin-bottom: 14px; background: #fff; border-radius: 14px; ' + SH + ' overflow: hidden; transition: opacity .3s ease; }'
    + '#ro201 .r-gh { display: flex; align-items: center; gap: 10px; min-height: 56px; padding: 10px 12px 10px 14px; border-bottom: 1px solid #F1F4F8; }'
    + '#ro201 .r-gl { flex: none; height: 24px; max-width: 64px; object-fit: contain; }'
    + '#ro201 .r-gt { flex: 1; min-width: 0; } #ro201 .r-gn { font-size: 16px; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201 .r-gc { font-size: 12.5px; font-weight: 600; color: ' + MUTE2 + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201 .r-all { flex: none; height: 38px; padding: 0 14px; border: 1px solid rgba(41,168,224,.45); border-radius: 12px; background: #fff; color: ' + BLUED + '; font-size: 13.5px; font-weight: 700; white-space: nowrap; }'
    + '#ro201 .r-all:active { background: rgba(41,168,224,.08); } #ro201 .r-all.r-on { background: #E8F5FC; border-color: transparent; }'
    + '#ro201 .r-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px 10px; padding: 10px 12px 12px 14px; border-bottom: 1px solid #F1F4F8; transition: background-color .2s ease; overflow: hidden; }'
    + '#ro201 .r-row:last-child { border-bottom: 0; } #ro201 .r-row.r-got { background: #F5FBFE; } #ro201 .r-row.r-flash { background: #E8F5FC; }'
    + '#ro201 .r-row.r-ok { background: #F1FAF4; }'
    + '#ro201 .r-row.r-gone { max-height: 0 !important; padding-top: 0; padding-bottom: 0; opacity: 0; border-bottom-width: 0; transition: max-height .3s ease, padding .3s ease, opacity .2s ease; }'
    + '#ro201 .r-ph { flex: none; width: 52px; height: 52px; border-radius: 10px; background: #fff; border: 1px solid #EEF2F6; object-fit: contain; }'
    + '#ro201 .r-ph.r-nop { visibility: hidden; }'
    + '#ro201 .r-it { flex: 1 1 0; min-width: 0; }'
    + '#ro201 .r-nm { font-size: 14.5px; font-weight: 700; line-height: 1.25; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }'
    + '#ro201 .r-mt { margin-top: 3px; font-size: 12.5px; font-weight: 600; color: ' + MUTE2 + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201 .r-mt b { color: ' + INK + '; font-weight: 800; } #ro201 .r-tag { color: ' + GREEN + '; font-weight: 800; } #ro201 .r-over { color: ' + AMBER + '; font-weight: 700; }'
    + '#ro201 .r-ctl { flex: 1 1 100%; display: flex; align-items: center; gap: 8px; padding-left: 62px; }'
    + '#ro201 .r-st { flex: none; width: 58px; height: 52px; border: 0; border-radius: 14px; background: ' + BG + '; color: ' + INK + '; font-size: 28px; font-weight: 600; line-height: 1; touch-action: none; -webkit-user-select: none; user-select: none; transition: transform .06s ease, background-color .1s ease; }'
    + '#ro201 .r-st[data-d="1"] { background: ' + BLUE + '; color: #fff; }'
    + '#ro201 .r-st.r-down { transform: scale(.95); background: #DCE6F0; } #ro201 .r-st[data-d="1"].r-down { background: ' + BLUED + '; }'
    + '#ro201 .r-st:disabled { opacity: .45; }'
    + '#ro201 .r-n { flex: 1 1 0; min-width: 52px; height: 52px; border: 0; border-radius: 12px; background: transparent; color: ' + INK + '; font-size: 28px; font-weight: 800; font-variant-numeric: tabular-nums; text-align: center; padding: 0; }'
    + '#ro201 .r-n:active { background: ' + BG + '; } #ro201 .r-n.r-zero { color: #B7C1CE; } #ro201 .r-n:focus { outline: none; }'
    + '#ro201 .r-got-b { flex: none; height: 52px; padding: 0 12px; border: 1px solid ' + LINE + '; border-radius: 14px; background: #fff; color: ' + INK + '; font-size: 13.5px; font-weight: 700; white-space: nowrap; }'
    + '#ro201 .r-got-b:active { background: ' + BG + '; } #ro201 .r-got-b.r-on { border-color: transparent; background: #E8F5FC; color: ' + BLUED + '; }'
    + '#ro201 .r-rm { flex: none; width: 44px; height: 52px; border: 0; border-radius: 14px; background: transparent; color: ' + MUTE2 + '; font-size: 24px; }'
    + '#ro201 .r-empty { padding: 26px 18px; margin-bottom: 14px; background: #fff; border-radius: 14px; ' + SH + ' text-align: center; }'
    + '#ro201 .r-empty b { display: block; font-size: 16px; font-weight: 800; } #ro201 .r-empty span { display: block; margin-top: 6px; font-size: 13.5px; font-weight: 600; color: ' + MUTE + '; line-height: 1.4; }'
    + '#ro201 .r-h3 { margin: 18px 2px 8px; font-size: 12px; font-weight: 800; letter-spacing: .1em; color: ' + MUTE2 + '; }'
    + '#ro201 .r-log { background: #fff; border-radius: 14px; ' + SH + ' overflow: hidden; }'
    + '#ro201 .r-lg { display: flex; align-items: baseline; gap: 10px; padding: 10px 14px; border-bottom: 1px solid #F1F4F8; font-size: 13.5px; }'
    + '#ro201 .r-lg:last-child { border-bottom: 0; } #ro201 .r-lq { flex: none; min-width: 34px; font-weight: 800; color: ' + GREEN + '; }'
    + '#ro201 .r-ln { flex: 1; min-width: 0; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201 .r-lw { flex: none; font-size: 12px; font-weight: 600; color: ' + MUTE2 + '; white-space: nowrap; }'
    + '#ro201 .r-lnone { padding: 14px; font-size: 13.5px; font-weight: 600; color: ' + MUTE + '; text-align: center; }'
    + '#ro201 .r-bar { flex: none; padding: 10px 16px calc(12px + env(safe-area-inset-bottom)); background: rgba(234,240,247,.94); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); border-top: 1px solid #DCE4EE; }'
    + '#ro201 .r-go { display: block; width: 100%; max-width: 560px; margin: 0 auto; min-height: 54px; border: 0; border-radius: 14px; background: ' + BLUE + '; color: #fff; font-size: 16.5px; font-weight: 800; transition: opacity .15s ease, background-color .15s ease; }'
    + '#ro201 .r-go:active { background: ' + BLUED + '; } #ro201 .r-go.r-idle { opacity: .5; } #ro201 .r-go.r-lock { background: ' + INK + '; }'
    + '#ro201 .r-go.r-busy { opacity: .75; pointer-events: none; }'
    /* number pad + confirm sheets */
    + '#ro201-scrim { position: fixed; inset: 0; z-index: 210; background: rgba(15,23,32,.42); opacity: 0; pointer-events: none; transition: opacity .2s ease; }'
    + '#ro201-scrim.open { opacity: 1; pointer-events: auto; }'
    + '#ro201-pad, #ro201-cf { position: fixed; left: 0; right: 0; bottom: 0; z-index: 211; max-width: 600px; margin: 0 auto; padding: 10px 16px calc(16px + env(safe-area-inset-bottom)); background: #fff; border-radius: 14px 14px 0 0; box-shadow: 0 -4px 24px rgba(15,23,32,.18); font-family: ' + FONT + '; color: ' + INK + '; transform: translateY(105%); transition: transform .24s cubic-bezier(.2,.8,.2,1); visibility: hidden; }'
    + '#ro201-pad.open, #ro201-cf.open { transform: none; visibility: visible; }'
    + '#ro201-pad { -webkit-user-select: none; user-select: none; touch-action: manipulation; }'
    + '#ro201-pad .p-nm, #ro201-cf .c-t { font-size: 15.5px; font-weight: 800; line-height: 1.25; text-align: center; padding: 4px 8px 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }'
    + '#ro201-pad .p-sub { margin-top: 2px; text-align: center; font-size: 12.5px; font-weight: 600; color: ' + MUTE2 + '; }'
    + '#ro201-pad .p-v { margin: 8px auto 4px; height: 62px; line-height: 62px; border-radius: 12px; background: ' + BG + '; text-align: center; font-size: 42px; font-weight: 800; font-variant-numeric: tabular-nums; }'
    + '#ro201-pad .p-v::after { content: ""; display: inline-block; width: 3px; height: 34px; margin-left: 3px; vertical-align: -3px; background: ' + BLUE + '; border-radius: 2px; animation: r201blink 1s steps(1) infinite; }'
    + '@keyframes r201blink { 50% { opacity: 0; } }'
    + '#ro201-pad .p-k { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 10px; }'
    + '#ro201-pad .p-k button { height: 52px; border: 0; border-radius: 12px; background: ' + BG + '; color: ' + INK + '; font-size: 22px; font-weight: 700; }'
    + '#ro201-pad .p-k button:active { background: #DCE6F0; } #ro201-pad .p-k .p-clr { font-size: 14px; color: ' + MUTE + '; }'
    + '#ro201-pad .p-k .p-done { grid-column: 1 / -1; background: ' + BLUE + '; color: #fff; font-size: 16px; } #ro201-pad .p-k .p-done:active { background: ' + BLUED + '; }'
    + '#ro201-cf { max-height: 86vh; display: flex; flex-direction: column; }'
    + '#ro201-cf .c-t, #ro201-cf .c-s { flex: none; }'
    + '#ro201-cf .c-s { margin-top: 2px; text-align: center; font-size: 13px; font-weight: 600; color: ' + MUTE + '; }'
    + '#ro201-cf .c-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; margin: 10px 0 0; border: 1px solid #EEF2F6; border-radius: 14px; }'
    + '#ro201-cf .c-r { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-bottom: 1px solid #F1F4F8; font-size: 13.5px; }'
    + '#ro201-cf .c-r:last-child { border-bottom: 0; } #ro201-cf .c-n { flex: 1; min-width: 0; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '#ro201-cf .c-q { flex: none; font-weight: 800; color: ' + GREEN + '; min-width: 34px; text-align: right; }'
    + '#ro201-cf .c-w { flex: none; font-weight: 600; color: ' + MUTE + '; font-variant-numeric: tabular-nums; white-space: nowrap; } #ro201-cf .c-w b { color: ' + INK + '; }'
    + '#ro201-cf .c-gh { padding: 7px 12px; background: #F7F9FC; font-size: 11.5px; font-weight: 800; letter-spacing: .08em; color: ' + MUTE2 + '; border-bottom: 1px solid #F1F4F8; }'
    + '#ro201-cf .c-b { flex: none; display: flex; gap: 10px; margin-top: 14px; }'
    + '#ro201-cf .c-b button { flex: 1 1 0; min-height: 52px; border-radius: 14px; font-size: 16px; font-weight: 700; }'
    + '#ro201-cf .c-no { border: 1px solid ' + LINE + '; background: #fff; color: ' + INK + '; } #ro201-cf .c-yes { border: 0; background: ' + BLUE + '; color: #fff; } #ro201-cf .c-yes:active { background: ' + BLUED + '; }'
    + '@media (min-width: 640px) {'
    + '  #ro201 .r-body { padding: 4px 24px 28px; } #ro201 .r-top { padding-left: 24px; padding-right: 24px; }'
    + '  #ro201 .r-row { flex-wrap: nowrap; padding: 10px 14px; } #ro201 .r-ctl { flex: none; padding-left: 0; width: auto; }'
    + '  #ro201 .r-n { flex: none; width: 70px; } #ro201 .r-ph { width: 56px; height: 56px; } #ro201 .r-nm { font-size: 15.5px; }'
    + '  #ro201 .r-st { width: 62px; height: 54px; } #ro201 .r-got-b { height: 54px; }'
    + '}'
    + '@media (max-width: 370px) { #ro201 .r-body { padding: 0 12px 20px; } #ro201 .r-top { padding-left: 12px; padding-right: 12px; } #ro201 .r-ctl { padding-left: 0; gap: 6px; } #ro201 .r-st { width: 54px; } #ro201 .r-scan { padding: 0 12px; } #ro201 .r-row { padding-left: 12px; padding-right: 10px; } }'
    + '#cl-menu .cl-row[data-r201-hide] { display: none !important; }';
  document.head.appendChild(css);

  /* ---------- state ---------- */
  var R = { recv: {}, extra: [], scanned: [], rows: [], open: false, sending: false };
  function loadDraft() { try { var d = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null'); if (d && d.recv && Date.now() - (d.t || 0) < 3 * 864e5) { R.recv = d.recv; R.extra = Array.isArray(d.extra) ? d.extra : []; R.scanned = Array.isArray(d.scanned) ? d.scanned : []; } } catch (e) {} }
  function saveDraft() { try { var any = Object.keys(R.recv).some(function (b) { return R.recv[b] > 0; }); if (any) localStorage.setItem(DRAFT_KEY, JSON.stringify({ t: Date.now(), recv: R.recv, extra: R.extra, scanned: R.scanned })); else localStorage.removeItem(DRAFT_KEY); } catch (e) {} }
  function readLog() { try { var a = JSON.parse(localStorage.getItem(LOG_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function addLog(line) { var a = readLog(); a.unshift(line); if (a.length > 300) a.length = 300; try { localStorage.setItem(LOG_KEY, JSON.stringify(a)); } catch (e) {} }
  function qty(bin) { return R.recv[bin] > 0 ? R.recv[bin] : 0; }

  /* ---------- screen ---------- */
  var SCAN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10"/></svg>';
  var scr = null;
  function screen() {
    if (scr) return scr;
    scr = document.createElement('div'); scr.id = 'ro201'; scr.setAttribute('role', 'dialog'); scr.setAttribute('aria-label', 'Receiving Orders');
    scr.innerHTML = '<div class="r-top"><h2>Receiving Orders</h2><button type="button" class="r-x" data-r-x aria-label="Close">\u00d7</button></div>'
      + '<div class="r-body"><div class="r-in">'
      + '<div class="r-sub">Truck here? Count what came in, or scan bins. It gets added to On hand.</div>'
      + '<div class="r-tools"><input class="r-q" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" placeholder="Add item not on the list" aria-label="Add item">'
      + (inWrap() ? '<button type="button" class="r-scan" data-r-scan>' + SCAN + 'Scan</button>' : '')
      + '<div class="r-res" role="listbox"></div></div>'
      + '<div class="r-done" aria-live="polite"></div><div class="r-warn" aria-live="polite"></div>'
      + '<div class="r-list"></div>'
      + '<div class="r-h3">RECENT RECEIPTS</div><div class="r-log"></div>'
      + '</div></div>'
      + '<div class="r-bar"><button type="button" class="r-go" data-r-go></button></div>';
    document.body.appendChild(scr);
    return scr;
  }
  function q(s) { return scr ? scr.querySelector(s) : null; }

  function onOrder() {
    return all().filter(function (it) { return it && it.bin && needOf(it) > 0; })
      .sort(function (a, b) { return supRank(a.supplier) - supRank(b.supplier) || String(a.supplier || '').localeCompare(String(b.supplier || '')) || byNm(a, b); });
  }
  function rowHtml(it, extra) {
    var n = qty(it.bin), nd = needOf(it), src = photo(it);
    return '<div class="r-row' + (n > 0 ? ' r-got' : '') + '" data-r-bin="' + esc(it.bin) + '"' + (extra ? ' data-r-extra="1"' : '') + (extra === 'scan' ? ' data-r-scan="1"' : '') + '>'
      + (src ? '<img class="r-ph" loading="lazy" alt="" src="' + esc(src) + '">' : '<div class="r-ph r-nop"></div>')
      + '<div class="r-it"><div class="r-nm">' + esc(it.name || it.bin) + '</div><div class="r-mt">' + metaHtml(it, extra) + '</div></div>'
      + '<div class="r-ctl"><button type="button" class="r-st" data-d="-1" aria-label="One less"' + (n > 0 ? '' : ' disabled') + '>\u2212</button>'
      + '<button type="button" class="r-n' + (n ? '' : ' r-zero') + '" data-r-num aria-label="Received, tap to type">' + n + '</button>'
      + '<button type="button" class="r-st" data-d="1" aria-label="One more">+</button>'
      + (extra ? '<button type="button" class="r-rm" data-r-rm aria-label="Remove">\u00d7</button>'
               : '<button type="button" class="r-got-b' + (n === nd && nd > 0 ? ' r-on' : '') + '" data-r-gotall>Got all</button>')
      + '</div></div>';
  }
  function metaHtml(it, extra) {
    var n = qty(it.bin), nd = needOf(it), b = esc(String(it.bin).toUpperCase());
    if (extra) return b + ' \u00b7 On hand <b>' + (numOf(it.onHand) == null ? '\u2013' : numOf(it.onHand)) + '</b>' + (nd > 0 ? ' \u00b7 needed ' + nd : '');
    return b + ' \u00b7 Ordered/needed <b>' + nd + '</b>' + (n > nd ? ' \u00b7 <span class="r-over">+' + (n - nd) + ' extra</span>' : '');
  }
  function groupHead(sup, list) {
    var lg = LOGO[sup];
    return '<div class="r-gh">' + (lg ? '<img class="r-gl" alt="" src="' + BASE + 'assets/supplier-clear/' + lg + '.png">' : '')
      + '<div class="r-gt"><div class="r-gn">' + esc(sup || 'Other') + '</div><div class="r-gc">' + list.length + ' item' + (list.length === 1 ? '' : 's') + ' on order</div></div>'
      + '<button type="button" class="r-all" data-r-all="' + esc(sup) + '">Receive all</button></div>';
  }
  function build() {
    screen();
    R.scanned = R.scanned.filter(function (b, i, a) { return find(b) && a.indexOf(b) === i; }); /* v208 */
    var list = onOrder().filter(function (it) { return R.scanned.indexOf(it.bin) < 0; }), seen = {}, groups = [], gi = {};
    R.scanned.forEach(function (b) { seen[b] = 1; });
    list.forEach(function (it) { seen[it.bin] = 1; var s = it.supplier || 'Other'; if (!(s in gi)) { gi[s] = groups.length; groups.push([s, []]); } groups[gi[s]][1].push(it); });
    /* counted rows that are no longer needed (another phone counted them) stay as extras so nothing is lost */
    Object.keys(R.recv).forEach(function (b) { if (R.recv[b] > 0 && !seen[b] && R.extra.indexOf(b) < 0 && find(b)) R.extra.push(b); });
    R.extra = R.extra.filter(function (b) { return !seen[b] && find(b); });
    var h = '';
    if (R.scanned.length) h += scanGroupHtml(); /* v208: pinned at the top */
    if (!groups.length && !R.extra.length && !R.scanned.length) h += '<div class="r-empty"><b>Nothing on order right now</b><span>Every item is at its Keep on hand. Use Add item or Scan for anything else that came in.</span></div>';
    groups.forEach(function (g) { h += '<div class="r-grp" data-r-sup="' + esc(g[0]) + '">' + groupHead(g[0], g[1]) + g[1].map(function (it) { return rowHtml(it, false); }).join('') + '</div>'; });
    if (R.extra.length) h += '<div class="r-grp" data-r-sup="" data-r-extras="1"><div class="r-gh"><div class="r-gt"><div class="r-gn">Also received</div><div class="r-gc">Not on the order</div></div></div>'
      + R.extra.map(function (b) { return rowHtml(find(b), true); }).join('') + '</div>';
    q('.r-list').innerHTML = h;
    paintGroups(); paintBar(); paintLog();
  }
  /* v208: the Scanned section (pinned at the top) */
  function scanGroupHtml() {
    var k = R.scanned.length;
    return '<div class="r-grp" data-r-sup="" data-r-scanned="1"><div class="r-gh"><div class="r-sic">' + SCAN + '</div>'
      + '<div class="r-gt"><div class="r-gn">Scanned</div><div class="r-gc" data-r-scnt>' + scanSub(k) + '</div></div>'
      + '<button type="button" class="r-addscan" data-r-addscan></button></div>'
      + R.scanned.map(function (b) { return rowHtml(find(b), 'scan'); }).join('') + '</div>';
  }
  function scanSub(k) { return k + ' item' + (k === 1 ? '' : 's') + ' scanned'; }
  function scanBins() { var o = {}; R.scanned.forEach(function (b) { o[b] = 1; }); return o; }
  function paintScan() {
    var b = q('[data-r-addscan]'); if (!b || R.sending) return;
    var t = totals(scanBins()), lk = !isMgr();
    var txt = t.units ? 'Add ' + t.units + ' to bins' : 'Add to bins';
    if (b.textContent !== txt) b.textContent = txt;
    b.setAttribute('aria-label', t.units ? 'Add ' + t.units + ' scanned item' + (t.units === 1 ? '' : 's') + ' to their bins (On hand)' : 'Add scanned items to bins');
    b.classList.toggle('r-lock', lk && t.units > 0); b.classList.toggle('r-idle', !t.units);
    var c = q('[data-r-scnt]'); if (c) { var s2 = scanSub(R.scanned.length); if (c.textContent !== s2) c.textContent = s2; }
  }
  /* v208: camera reads land in Scanned. hits = { bin: count }. One rebuild for the whole batch, new rows slide in. */
  function addScanned(hits) {
    var bins = Object.keys(hits).filter(function (b) { return hits[b] > 0 && find(b); });
    if (!bins.length) return 0;
    var fresh = [], n = 0;
    bins.forEach(function (b) {
      R.recv[b] = qty(b) + hits[b]; n += hits[b];
      if (R.scanned.indexOf(b) < 0) { R.scanned.unshift(b); fresh.push(b); }
      R.extra = R.extra.filter(function (x) { return x !== b; });
    });
    saveDraft(); hideDone();
    if (fresh.length) build(); else { bins.forEach(paintRow); paintGroups(); paintBar(); }
    bins.forEach(function (b) { var el = rowEl(b); if (!el) return; el.classList.add(fresh.indexOf(b) >= 0 ? 'r-new' : 'r-flash'); setTimeout(function () { el.classList.remove('r-new'); el.classList.remove('r-flash'); }, 750); });
    var body = q('.r-body'); /* the Scanned section is the first group, right under Add item / Scan */
    if (body && body.scrollTop > 0) { try { body.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { body.scrollTop = 0; } }
    buzz();
    return n;
  }
  function rowEl(bin) { return scr && scr.querySelector('.r-row[data-r-bin="' + (window.CSS && CSS.escape ? CSS.escape(bin) : bin) + '"]'); }
  function paintRow(bin) {
    var el = rowEl(bin); if (!el) return; var it = find(bin); if (!it) return;
    var n = qty(bin), nd = needOf(it), ex = el.hasAttribute('data-r-extra');
    var num = el.querySelector('[data-r-num]'); if (num.textContent !== String(n)) num.textContent = n; num.classList.toggle('r-zero', !n);
    el.querySelector('.r-st[data-d="-1"]').disabled = n <= 0;
    el.classList.toggle('r-got', n > 0);
    var mt = el.querySelector('.r-mt'), mh = metaHtml(it, ex); if (mt.innerHTML !== mh) mt.innerHTML = mh;
    var g = el.querySelector('[data-r-gotall]'); if (g) g.classList.toggle('r-on', n === nd && nd > 0);
  }
  function paintGroups() {
    if (!scr) return;
    scr.querySelectorAll('[data-r-all]').forEach(function (b) {
      var g = b.closest('.r-grp'), rows = g.querySelectorAll('.r-row:not(.r-gone)'), full = rows.length > 0;
      rows.forEach(function (r) { var it = find(r.getAttribute('data-r-bin')); if (!it || qty(it.bin) < needOf(it)) full = false; });
      b.classList.toggle('r-on', full); b.textContent = full ? 'All received' : 'Receive all';
    });
  }
  function totals(only) { var u = 0, l = 0; Object.keys(R.recv).forEach(function (b) { if (R.recv[b] > 0 && find(b) && (!only || only[b])) { u += R.recv[b]; l++; } }); return { units: u, lines: l }; } /* v208: only = { bin: 1 } limits it (Scanned) */
  function paintBar() {
    var b = q('[data-r-go]'); if (!b || R.sending) return;
    var t = totals(), lk = !isMgr();
    var txt = lk ? 'Manager login to receive' : (t.units ? 'Add counted items to On hand (' + t.units + ')' : 'Count what arrived'); /* v208: says it only adds what was counted */
    if (b.textContent !== txt) b.textContent = txt;
    b.setAttribute('aria-label', lk ? txt : (t.units ? 'Add ' + t.units + ' counted item' + (t.units === 1 ? '' : 's') + ' to On hand. Only rows with a count above 0.' : txt));
    paintScan();
    b.classList.toggle('r-lock', lk); b.classList.toggle('r-idle', !lk && !t.units);
  }
  function fmtT(t) { try { var d = new Date(t); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function paintLog() {
    var a = readLog().slice(0, 25), el = q('.r-log'); if (!el) return;
    el.innerHTML = a.length ? a.map(function (x) { return '<div class="r-lg"><span class="r-lq">+' + esc(x.qty) + '</span><span class="r-ln">' + esc(x.name || x.bin) + '</span><span class="r-lw">' + esc(fmtT(x.t)) + ' \u00b7 ' + esc(x.by || '') + '</span></div>'; }).join('')
      : '<div class="r-lnone">Nothing received on this phone yet.</div>';
  }
  function setQty(bin, v) {
    v = Math.max(0, Math.min(9999, Math.floor(Number(v) || 0)));
    if (qty(bin) === v) return;
    if (v) R.recv[bin] = v; else delete R.recv[bin];
    paintRow(bin); paintGroups(); paintBar(); saveDraft(); hideDone();
  }
  function hideDone() { var d = q('.r-done'); if (d && d.classList.contains('on') && !R.sending) d.classList.remove('on'); }
  function warn(t) { var w = q('.r-warn'); if (!w) return; w.textContent = t || ''; w.classList.toggle('on', !!t); }

  /* ---------- open / close (Android back = popstate) ---------- */
  function openR() {
    if (R.open) return;
    loadDraft(); screen(); build(); warn(navigator.onLine === false ? 'You\u2019re offline. Count now \u2014 counts stay on this phone until you have signal.' : '');
    q('.r-done').classList.remove('on'); q('.r-q').value = ''; showRes(false);
    void scr.offsetWidth; scr.classList.add('open'); q('.r-body').scrollTop = 0; R.open = true;
    try { history.pushState({ overlay: 'ro201' }, ''); } catch (e) {}
  }
  function closeR(viaPop) {
    if (!R.open) return;
    closePad(); closeCf(); stopRep(); showRes(false);
    R.open = false; scr.classList.remove('open');
    try { var a = document.activeElement; if (a && scr.contains(a) && a.blur) a.blur(); } catch (e) {}
    if (!viaPop) { try { if (history.state && history.state.overlay === 'ro201') history.back(); } catch (e) {} }
  }
  window.addEventListener('popstate', function () { if (R.open && !(history.state && history.state.overlay === 'ro201')) closeR(true); });
  window.stormOpenReceiving = openR;
  window.stormReceiving201 = { open: function () { wire(); openR(); }, close: closeR, state: R, setQty: setQty, addExtra: function (b, n) { addExtra(b, n); }, scan: function () { wire(); startScan(); }, scanned: function (h) { wire(); return addScanned(h || {}); } }; /* v208: scanned(hits) = what a camera result does */

  /* ---------- hold to repeat (v200 timings) ---------- */
  var rep = { t: 0, bin: null, d: 0, n: 0, el: null };
  function stopRep() { clearTimeout(rep.t); rep.t = 0; if (rep.el) rep.el.classList.remove('r-down'); rep.el = null; rep.bin = null; }
  function step(bin, d) { var v = qty(bin); if (d < 0 && v <= 0) return false; setQty(bin, v + d); buzz(); return true; }
  function tick() {
    if (!rep.bin || !R.open) return stopRep();
    rep.n++;
    var by = rep.n > 30 ? 5 : 1; /* after ~2.5 s of holding, jump by 5 */
    if (!step(rep.bin, rep.d * by) && rep.d < 0) setQty(rep.bin, 0);
    if (rep.d < 0 && qty(rep.bin) <= 0) return stopRep();
    rep.t = setTimeout(tick, Math.max(45, Math.round(150 * Math.pow(0.9, rep.n))));
  }
  function wireBody(b) {
    b.addEventListener('pointerdown', function (e) {
      var s = e.target.closest && e.target.closest('.r-st'); if (!s || s.disabled || R.sending) return;
      var row = s.closest('.r-row'); if (!row) return;
      e.preventDefault(); stopRep();
      rep.bin = row.getAttribute('data-r-bin'); rep.d = Number(s.getAttribute('data-d')); rep.n = 0; rep.el = s; s.classList.add('r-down');
      try { s.setPointerCapture(e.pointerId); } catch (x) {}
      step(rep.bin, rep.d);
      rep.t = setTimeout(tick, 420);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(function (t) { b.addEventListener(t, function () { if (rep.bin) stopRep(); }); });
    b.addEventListener('contextmenu', function (e) { if (e.target.closest && e.target.closest('.r-st')) e.preventDefault(); });
  }

  /* ---------- number pad (v200 keys) ---------- */
  var scrim = null, pad = null, P = null;
  function mountSheets() {
    if (pad) return;
    scrim = document.createElement('div'); scrim.id = 'ro201-scrim';
    pad = document.createElement('div'); pad.id = 'ro201-pad'; pad.setAttribute('role', 'dialog'); pad.setAttribute('aria-label', 'Received');
    pad.innerHTML = '<div class="p-nm"></div><div class="p-sub"></div><div class="p-v" aria-live="polite"></div><div class="p-k">'
      + ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(function (k) { return '<button type="button" data-p-k="' + k + '">' + k + '</button>'; }).join('')
      + '<button type="button" class="p-clr" data-p-k="clr">Clear</button><button type="button" data-p-k="0">0</button><button type="button" data-p-k="bs" aria-label="Backspace">\u232b</button>'
      + '<button type="button" class="p-done" data-p-k="done">Done</button></div>';
    cf = document.createElement('div'); cf.id = 'ro201-cf'; cf.setAttribute('role', 'dialog'); cf.setAttribute('aria-label', 'Confirm receiving');
    document.body.appendChild(scrim); document.body.appendChild(pad); document.body.appendChild(cf);
    scrim.addEventListener('click', function () { if (P) closePad(); else closeCf(); });
    pad.addEventListener('click', function (e) { var k = e.target.closest && e.target.closest('[data-p-k]'); if (k) typeKey(k.getAttribute('data-p-k')); });
    cf.addEventListener('click', function (e) { var t = e.target; if (!t.closest) return; if (t.closest('.c-no')) closeCf(); else if (t.closest('.c-yes')) { var o = CF && CF.only; closeCf(); send(o); } });
  }
  function openPad(bin) {
    var it = find(bin); if (!it) return; mountSheets();
    P = { bin: bin, v: qty(bin), fresh: true };
    pad.querySelector('.p-nm').textContent = it.name || bin;
    pad.querySelector('.p-sub').textContent = 'Received \u00b7 ' + String(bin).toUpperCase() + (rowEl(bin) && !rowEl(bin).hasAttribute('data-r-extra') ? ' \u00b7 needed ' + needOf(it) : '');
    paintPad(); scrim.classList.add('open'); void pad.offsetWidth; pad.classList.add('open');
  }
  function paintPad() { if (P) pad.querySelector('.p-v').textContent = P.v; }
  function closePad() { if (!pad || !P) { P = null; return; } var b = P.bin, v = P.v; P = null; pad.classList.remove('open'); if (!cf.classList.contains('open')) scrim.classList.remove('open'); setQty(b, v); }
  function typeKey(k) {
    if (!P) return;
    if (k === 'done') { closePad(); return; }
    if (k === 'clr') { P.fresh = false; P.v = 0; paintPad(); return; }
    if (k === 'bs') { P.fresh = false; var s = String(P.v).slice(0, -1); P.v = s === '' ? 0 : Number(s); paintPad(); return; }
    if (/^[0-9]$/.test(k)) { var base = P.fresh || !P.v ? '' : String(P.v); P.fresh = false; var ns = (base + k).replace(/^0+(?=\d)/, ''); if (ns.length > 4) return; P.v = Number(ns); paintPad(); }
  }

  /* ---------- extras: search + scan ---------- */
  function addExtra(bin, n) {
    var it = find(bin); if (!it) return false;
    n = Math.max(1, Math.floor(Number(n) || 1));
    var el = rowEl(bin);
    if (!el) {
      if (R.extra.indexOf(bin) < 0) R.extra.push(bin);
      R.recv[bin] = qty(bin) + n; saveDraft();
      var box = q('[data-r-extras]');
      if (!box) { build(); }
      else { var t = document.createElement('div'); t.innerHTML = rowHtml(it, true); box.appendChild(t.firstChild); paintBar(); }
      el = rowEl(bin);
    } else setQty(bin, qty(bin) + n);
    if (el) { el.classList.add('r-flash'); setTimeout(function () { el.classList.remove('r-flash'); }, 700); try { el.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); } catch (e) {} }
    var e2 = q('.r-empty'); if (e2) build();
    hideDone(); buzz();
    return true;
  }
  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function search(v) {
    var w = norm(v).split(' ').filter(Boolean); if (!w.length) return [];
    var sub = all().filter(function (it) { if (!it || !it.bin) return false; var h = norm(it.name + ' ' + it.bin + ' ' + (it.sku || '') + ' ' + (it.supplier || '')); return w.every(function (x) { return h.indexOf(x) >= 0; }); })
      .sort(byNm);
    /* v205: forgiving search ranks first (typos, slang, sizes); the old every-word match stays as the fallback */
    try {
      if (window.stormSearch205) {
        var r = window.stormSearch205.rank(v), by = {}, out = [];
        all().forEach(function (it) { if (it && it.bin) by[it.bin] = it; });
        r.bins.forEach(function (b) { if (by[b]) out.push(by[b]); });
        sub.forEach(function (it) { if (r.rank[it.bin] == null) out.push(it); });
        search.near = out.length ? [] : window.stormSearch205.closest(v).map(function (b) { return by[b]; }).filter(Boolean);
        return out.slice(0, 8);
      }
    } catch (e) {}
    search.near = [];
    return sub.slice(0, 8);
  }
  function showRes(on) { var r = q('.r-res'); if (r) r.classList.toggle('on', !!on); }
  function paintRes() {
    var v = q('.r-q').value, hits = search(v), r = q('.r-res');
    if (!norm(v)) { showRes(false); return; }
    function hitHtml(it) { var src = photo(it); return '<button type="button" class="r-hit" data-r-hit="' + esc(it.bin) + '">' + (src ? '<img alt="" loading="lazy" src="' + esc(src) + '">' : '<span class="r-noimg"></span>') + '<span class="r-ht"><span class="r-hn">' + esc(it.name || it.bin) + '</span><span class="r-hm">' + esc(String(it.bin).toUpperCase()) + ' \u00b7 ' + esc(it.supplier || '') + '</span></span><span class="r-add">+ Add</span></button>'; }
    var near = (!hits.length && search.near) ? search.near : []; /* v205: closest matches when nothing matches */
    r.innerHTML = hits.length ? hits.map(hitHtml).join('')
      : '<div class="r-none">No item matches \u201c' + esc(v) + '\u201d' + (near.length ? '. Closest matches:' : '') + '</div>' + near.map(hitHtml).join('');
    showRes(true);
  }
  /* scan: reuse openScanner (wrapper camera). For this one scan the result is caught here: added as received, the cart stays as it was. */
  var scan = null;
  function cartMap() { var m = {}; try { (pickList || []).forEach(function (p) { m[p.bin] = (m[p.bin] || 0) + (Number(p.qty) || 0); }); } catch (e) {} return m; }
  function startScan() {
    if (typeof openScanner !== 'function') return;
    scan = { snap: cartMap(), t: Date.now() };
    /* v208: tell the camera page this is a receiving scan (&recv=1). The real cart still rides along as the snapshot, so if the result were
       ever not caught here the cart would only gain the scans, never lose anything. */
    var sp = window.scanCartParams, wrapped = false;
    if (typeof sp === 'function') { try { window.scanCartParams = function () { return sp.apply(this, arguments) + '&recv=1'; }; wrapped = true; } catch (e) {} }
    try { openScanner(); } catch (e) { scan = null; }
    if (wrapped) { try { window.scanCartParams = sp; } catch (e) {} }
  }
  function takeCart(text, ct) {
    try { localStorage.setItem('stormCartAppliedV1', String(ct)); } catch (e) {} /* never applied to the cart later either */
    var got = {}, snap = scan.snap, n = 0;
    String(text || '').split(',').forEach(function (s) { var a = s.split('*'), b = (a[0] || '').trim(), v = Math.floor(Number(a[1])); if (b && v > 0) got[b] = (got[b] || 0) + v; });
    var hits = {}; /* v208: everything scanned goes to the Scanned section */
    Object.keys(got).forEach(function (b) { var d = got[b] - (snap[b] || 0), it = find(b) || find(b.toLowerCase()); if (d > 0 && it) { hits[it.bin] = (hits[it.bin] || 0) + d; n += d; } });
    addScanned(hits);
    return n;
  }
  function takeScans(text) { var n = 0, hits = {}; String(text || '').split(',').forEach(function (b) { b = b.trim(); var it = b && (find(b) || find(b.toLowerCase())); if (it) { hits[it.bin] = (hits[it.bin] || 0) + 1; n++; } }); addScanned(hits); return n; } /* v208 */
  function wrapScan() {
    if (wrapScan.done) return; wrapScan.done = true;
    var _ac = window.applyCartParam, _as = window.applyScansParam;
    if (typeof _ac === 'function') window.applyCartParam = function (text, ct) { if (scan && R.open) { takeCart(text, ct); scan = null; return; } return _ac.apply(this, arguments); };
    if (typeof _as === 'function') window.applyScansParam = function (text) { if (scan && R.open) { takeScans(text); scan = null; return; } return _as.apply(this, arguments); };
  }
  try { wrapScan(); } catch (e) {}
  window.addEventListener('message', function (e) { var d = e.data; if (d && d.storm === 'camClosed' && scan) setTimeout(function () { scan = null; }, 400); });

  /* ---------- confirm + send ---------- */
  var cf = null;
  var CF = null; /* v208: { only: {bin:1} } while the confirm sheet is for the Scanned section */
  function lines(only) {
    var out = [];
    Object.keys(R.recv).forEach(function (b) { var it = find(b); if (it && R.recv[b] > 0 && (!only || only[b])) out.push(it); });
    return out.sort(function (a, b) { return supRank(a.supplier) - supRank(b.supplier) || byNm(a, b); });
  }
  function openCf(only) {
    var L = lines(only); if (!L.length) return; mountSheets();
    CF = { only: only || null };
    var t = totals(only), h = '', last = null;
    L.forEach(function (it) {
      if (it.supplier !== last) { last = it.supplier; h += '<div class="c-gh">' + esc(String(it.supplier || 'Other').toUpperCase()) + '</div>'; }
      var o = numOf(it.onHand) || 0, n = qty(it.bin);
      h += '<div class="c-r"><span class="c-q">+' + n + '</span><span class="c-n">' + esc(it.name || it.bin) + '</span><span class="c-w">' + (numOf(it.onHand) == null ? '\u2013' : o) + ' \u2192 <b>' + (o + n) + '</b></span></div>';
    });
    cf.innerHTML = '<div class="c-t">' + (only ? 'Add scanned items to bins?' : 'Add counted items to On hand?') + '</div><div class="c-s">' + t.units + ' item' + (t.units === 1 ? '' : 's') + ' \u00b7 ' + t.lines + ' line' + (t.lines === 1 ? '' : 's') + ' \u00b7 On hand was \u2192 new</div>'
      + '<div class="c-note">' + (only ? 'Only the Scanned section. Nothing else changes.' : 'Only rows with a count above 0. Rows at 0 are left alone.') + '</div>'
      + '<div class="c-list">' + h + '</div><div class="c-b"><button type="button" class="c-no">Cancel</button><button type="button" class="c-yes">' + (only ? 'Add to bins' : 'Add to On hand') + '</button></div>';
    scrim.classList.add('open'); void cf.offsetWidth; cf.classList.add('open');
  }
  function closeCf() { if (!cf || !cf.classList.contains('open')) return; cf.classList.remove('open'); if (!P) scrim.classList.remove('open'); }
  function goTap(only) {
    if (R.sending) return;
    if (!isMgr()) { try { stormAccess.ask(function () { paintBar(); }, 'Receiving adds to On hand. That\u2019s for managers.'); } catch (e) {} return; }
    if (!totals(only).units) { var r = q(only ? '[data-r-scanned] .r-row' : '.r-row'); if (r) { r.classList.add('r-flash'); setTimeout(function () { r.classList.remove('r-flash'); }, 600); } return; }
    if (navigator.onLine === false) { warn('You\u2019re offline. Your counts are kept on this phone \u2014 tap again when you have signal.'); return; }
    warn(''); openCf(only);
  }
  function send(only) {
    var L = lines(only); if (!L.length || R.sending) return;
    R.sending = true; stopRep();
    var go = (only && q('[data-r-addscan]')) || q('[data-r-go]'), done = [], i = 0, failMsg = '', tries = 0; /* v208: the button that was tapped shows the progress */
    go.classList.add('r-busy');
    function prog() { go.textContent = 'Adding ' + Math.min(i + 1, L.length) + ' of ' + L.length + '\u2026'; }
    function next() {
      if (i >= L.length) return finish();
      var it = L[i], bin = it.bin, n = qty(bin);
      if (!n) { i++; return next(); }
      var sq = null; try { sq = saveQueues[bin]; if (!sq) { sq = { busy: false, pending: null }; saveQueues[bin] = sq; } } catch (e) {}
      if (sq && sq.busy) { setTimeout(next, 250); return; } /* a count save for this bin is in flight: wait for it, then add on top */
      if (sq) sq.busy = true; /* hold the saveCount queue (and live sync) for this bin */
      var from = numOf(find(bin).onHand), to = (from || 0) + n; prog();
      google.script.run
        .withSuccessHandler(function (updated) {
          if (sq) sq.busy = false;
          tries = 0;
          addLog({ t: Date.now(), bin: bin, name: it.name || bin, qty: n, from: from, to: to, by: who(), sup: it.supplier || '' });
          delete R.recv[bin]; saveDraft();
          done.push([bin, n]);
          try { if (updated && updated.bin) applyUpdate(updated); else { it.onHand = to; it.need = needOf(it); patchCard(it); } } catch (e) {}
          try { syncDetailStepper(bin); } catch (e) {}
          markRow(bin, n);
          try { if (sq && sq.pending !== null && typeof pumpSaveQueue === 'function') pumpSaveQueue(bin); } catch (e) {}
          i++; next();
        })
        .withFailureHandler(function (err) {
          if (sq) sq.busy = false;
          var m = String(err && (err.message || err) || '');
          if (/MANAGER_REQUIRED|PIN_REQUIRED/.test(m)) { failMsg = 'Manager login expired. Log in and tap again to add the rest.'; try { stormAccess.expired(); } catch (x) {} return finish(); }
          if (/PIN_LOCKED/.test(m)) { failMsg = 'Too many wrong codes \u2014 wait 10 minutes, then tap again.'; return finish(); }
          if (++tries < 2) { setTimeout(next, 700); return; }
          failMsg = 'Couldn\u2019t save ' + (it.name || bin) + '. Check your signal and tap again \u2014 the rest are still counted here.';
          finish();
        })
        .updateCount(bin, String(to), tok());
    }
    function finish() {
      R.sending = false; go.classList.remove('r-busy'); try { var gs = q('[data-r-go]'); if (gs) gs.classList.remove('r-busy'); } catch (e) {}
      var u = done.reduce(function (s, x) { return s + x[1]; }, 0);
      var d = q('.r-done');
      if (done.length) { d.innerHTML = '\u2713 Received <span>' + u + ' item' + (u === 1 ? '' : 's') + ' added to On hand</span>'; d.classList.remove('on'); void d.offsetWidth; d.classList.add('on'); }
      warn(failMsg);
      paintBar(); paintGroups(); paintLog();
      setTimeout(settle, 900);
    }
    next();
  }
  function markRow(bin, n) {
    var el = rowEl(bin); if (!el) return; var it = find(bin);
    el.classList.remove('r-got'); el.classList.add('r-ok');
    var num = el.querySelector('[data-r-num]'); num.textContent = '0'; num.classList.add('r-zero');
    el.querySelector('.r-st[data-d="-1"]').disabled = true;
    var g = el.querySelector('[data-r-gotall]'); if (g) g.classList.remove('r-on');
    el.querySelector('.r-mt').innerHTML = esc(String(bin).toUpperCase()) + ' \u00b7 <span class="r-tag">Received +' + n + ' \u2713</span> \u00b7 On hand <b>' + (numOf(it && it.onHand) == null ? '\u2013' : numOf(it.onHand)) + '</b>';
    el.setAttribute('data-r-settle', '1');
  }
  /* rows that are now fully stocked fold away; the rest stay with their new "needed" number */
  function settle() {
    if (!scr || R.sending) return;
    scr.querySelectorAll('.r-row[data-r-settle]').forEach(function (el) {
      var bin = el.getAttribute('data-r-bin'), it = find(bin); el.removeAttribute('data-r-settle');
      if (qty(bin) > 0) { el.classList.remove('r-ok'); paintRow(bin); return; }
      if (el.hasAttribute('data-r-extra') || !it || needOf(it) <= 0) {
        var wasScan = el.hasAttribute('data-r-scan');
        el.style.maxHeight = el.offsetHeight + 'px'; void el.offsetWidth; el.classList.add('r-gone');
        setTimeout(function () {
          var g = el.closest('.r-grp'); if (el.parentNode) el.parentNode.removeChild(el);
          R.extra = R.extra.filter(function (b) { return b !== bin; });
          if (wasScan) { /* v208: saved scanned rows are cleared; one still on order returns to its supplier group at 0 */
            R.scanned = R.scanned.filter(function (b) { return b !== bin; }); saveDraft();
            if (it && needOf(it) > 0) { clearTimeout(settle.rb); settle.rb = setTimeout(function () { if (!R.sending) build(); }, 360); }
          }
          if (g && !g.querySelector('.r-row')) { g.style.opacity = '0'; setTimeout(function () { if (g.parentNode) g.parentNode.removeChild(g); if (!scr.querySelector('.r-grp')) build(); }, 300); }
          else if (g) { var c = g.querySelector('.r-gc'), k = g.querySelectorAll('.r-row').length; if (g.hasAttribute('data-r-scanned')) paintScan(); else if (c && !g.hasAttribute('data-r-extras')) c.textContent = k + ' item' + (k === 1 ? '' : 's') + ' on order'; }
          paintGroups();
        }, 320);
      } else { setTimeout(function () { el.classList.remove('r-ok'); }, 1400); }
    });
  }

  /* ---------- taps ---------- */
  function onBody(e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('[data-r-x]')) { closeR(false); return; }
    if (t.closest('[data-r-go]')) { goTap(); return; }
    if (t.closest('[data-r-addscan]')) { goTap(scanBins()); return; } /* v208 */
    if (R.sending) return;
    if (t.closest('button.r-scan[data-r-scan]')) { showRes(false); startScan(); return; } /* v209: only the Scan button opens the camera; Scanned rows also carry data-r-scan, so their -/+, number and x used to open it */
    var h = t.closest('[data-r-hit]'); if (h) { var inp = q('.r-q'); inp.value = ''; showRes(false); try { inp.blur(); } catch (x) {} addExtra(h.getAttribute('data-r-hit'), 1); return; }
    if (!t.closest('.r-tools')) showRes(false);
    var row = t.closest('.r-row'), bin = row && row.getAttribute('data-r-bin');
    if (t.closest('.r-st')) { if (e.detail === 0 && row) step(bin, Number(t.closest('.r-st').getAttribute('data-d'))); return; } /* keyboard; pointer handled on pointerdown */
    if (t.closest('[data-r-num]')) { openPad(bin); return; }
    if (t.closest('[data-r-gotall]')) { var it = find(bin); if (it) setQty(bin, qty(bin) === needOf(it) ? 0 : needOf(it)); buzz(); return; }
    if (t.closest('[data-r-rm]')) { delete R.recv[bin]; R.extra = R.extra.filter(function (b) { return b !== bin; }); R.scanned = R.scanned.filter(function (b) { return b !== bin; }); saveDraft(); build(); return; }
    var a = t.closest('[data-r-all]');
    if (a) {
      var g = a.closest('.r-grp'), rows = [].slice.call(g.querySelectorAll('.r-row:not(.r-gone)')), full = a.classList.contains('r-on');
      rows.forEach(function (r) { var b = r.getAttribute('data-r-bin'), x = find(b); if (x) setQty(b, full ? 0 : Math.max(qty(b), needOf(x))); });
      buzz(); return;
    }
  }
  function wire() {
    if (wire.done) return; wire.done = true; screen();
    scr.addEventListener('click', onBody);
    wireBody(scr);
    var inp = q('.r-q');
    inp.addEventListener('input', paintRes);
    inp.addEventListener('focus', function () { if (norm(inp.value)) paintRes(); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); var f = q('[data-r-hit]'); if (f) f.click(); } });
  }
  document.addEventListener('keydown', function (e) {
    if (!R.open) return;
    if (P) { if (/^[0-9]$/.test(e.key)) { e.preventDefault(); typeKey(e.key); } else if (e.key === 'Backspace') { e.preventDefault(); typeKey('bs'); } else if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); closePad(); } return; }
    if (e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); if (cf && cf.classList.contains('open')) closeCf(); else closeR(false); }
  }, true);
  window.addEventListener('stormaccess', function () { if (R.open) paintBar(); });
  window.addEventListener('online', function () { if (R.open) warn(''); });
  window.addEventListener('offline', function () { if (R.open) warn('You\u2019re offline. Count now \u2014 counts stay on this phone until you have signal.'); });
  /* live sync: on-hand / need changes from other phones refresh the row text in place (no rebuild) */
  setInterval(function () { if (!R.open || R.sending || !scr) return; scr.querySelectorAll('.r-row:not([data-r-settle]):not(.r-gone)').forEach(function (el) { paintRow(el.getAttribute('data-r-bin')); }); }, 2000);

  /* ---------- side menu: our row opens this screen (window capture runs before the v199 document handler); Restock Soon row hidden ---------- */
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest || !t.closest('#cl-menu [data-ro199]')) return;
    e.preventDefault(); e.stopImmediatePropagation();
    try { closeDrawer(); } catch (x) { var sc = $('drawer-scrim'); if (sc) sc.click(); }
    wire(); setTimeout(openR, 220);
  }, true);
  function hideSoon() { document.querySelectorAll('#cl-menu .cl-row.cl-soon:not([data-r201-hide])').forEach(function (r) { var n = r.querySelector('.cl-name'); if (n && /^\s*Restock\s*$/.test(n.textContent)) r.setAttribute('data-r201-hide', '1'); }); }
  var hq = 0; function soon() { if (!hq) hq = requestAnimationFrame(function () { hq = 0; try { hideSoon(); } catch (e) {} }); }
  (function watch(n) { var m = $('cl-menu') || $('drawer'); if (m && !m.__o201) { m.__o201 = true; try { new MutationObserver(soon).observe(m, { childList: true, subtree: true }); } catch (e) {} } soon(); if (n < 240 && !$('cl-menu')) setTimeout(function () { watch(n + 1); }, 500); })(0);
  window.stormOpenReceiving = function () { wire(); openR(); };
})();

/* v202 (Hark, 2026-11-11 20:50-21:02, Dave's batch F):
   F1 supplier logo sits in a clear strip at the top of the photo box (26 px cards / 40 px Item details); the product is fitted below it
      (object-fit: contain), so the logo never covers the product. One logo height for all four suppliers, wide logos capped by width, no glow.
   F2 Manager login: no flash, no jump. The code box no longer redraws itself when the server answers, and a successful login switches to the
      Manager view in place (window.stormMgrSwitch202, called by app v154): cards are patched, never rebuilt, the same item stays put on screen,
      the tabs row keeps its height.
   F3 Side menu Staging opens only Find a Job (no Customer Search sheet underneath). Picking / loading a job then brings up Customer Search.
   F4 Side menu "Customer Search" row removed (the + dock button and Staging cover it).
   F5 Categories row: nothing peeks out of the closed list, and the label beside "Categories" only shows a category the user picked there.
   F6 No blue tap highlight / long-press selection on buttons, rows, cards and headers (inputs stay selectable); focus rings only for keyboards.
   F7 Box Truck Pre Check / Tool Checklist pages: screen-size pages (checklists/*-md-N.jpg, ~1/4 of the bytes) shown in a reserved box with a
      soft placeholder, faded in once loaded; warmed in the background when the app is idle. The full-size page is still used for zoom and print.
   F8 Media (Photo Series + Videos): each tile floats in (fade + rise, staggered) as it scrolls into view, only once its thumbnail has loaded.
      Space is reserved; only the poster/thumbnail images load (no video files).
   F9 Insurance Certificates and Logos are manager-only (hidden in Crew view, re-hidden when the login runs out or on Log out). */
(function () {
  if (window.__storm202) return; window.__storm202 = true;
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var B = 'html body';
  var EASE = 'cubic-bezier(.25,.6,.2,1)';
  function mgr() { try { return !!(window.stormAccess && stormAccess.isMgr()); } catch (e) { return false; } }
  var css = ''
    /* ---- F1 cards ---- */
    + B + ' #list > .card .card-main:has(> img.sup198) > img.photo { padding-top: 26px !important; object-fit: contain !important; object-position: 50% 50% !important; }'
    + B + ' #list > .card .card-main > img.sup198 { top: 5px !important; right: 8px !important; height: 16px !important; max-height: 16px !important; width: auto !important; max-width: 52% !important; filter: none !important; }'
    + '@media (min-width: 700px) { ' + B + ' #list > .card .card-main > img.sup198 { height: 17px !important; max-height: 17px !important; } }'
    /* ---- F1 Item details (incl. the page riding in during a swipe) ---- */
    + B + ' #detail .detail-body:has(> img.sup198d) > img.detail-photo { padding-top: 40px !important; object-fit: contain !important; object-position: 50% 50% !important; }'
    + B + ' #detail .detail-body > img.sup198d { height: 24px !important; max-height: 24px !important; width: auto !important; max-width: min(42%, 170px) !important; filter: none !important; }'
    + '@media (min-width: 700px) { ' + B + ' #detail .detail-body > img.sup198d { height: 22px !important; max-height: 22px !important; } }' /* v198 places it 2.5% of the photo width (15 px) down: 15 + 22 < 40 */
    /* ---- F2 tabs row keeps its height in Crew view (the hidden Needs Ordering tab is the taller one) ---- */
    + '@media (max-width: 699px) { ' + B + ' #topbar .toolbar .tabs > .tab { min-height: 44px; } }' /* Crew view: All Items alone was 43 px, with Needs Ordering 44 px */
    /* ---- F4 ---- */
    + B + ' #cl-menu [data-cl-go="pull"] { display: none !important; }'
    /* ---- F5 closed Categories list: not one pixel, also before the accordion is set up ---- */
    + B + ' #cl-menu .cl-cats:not(.st-cat-b) { max-height: 0 !important; overflow: hidden !important; visibility: hidden !important; padding: 0 !important; margin: 0 !important; box-shadow: none !important; }'
    + B + ' #cl-menu:not(.st-cats-open) .cl-cats.st-cat-b { visibility: hidden !important; border: 0 !important; transition: max-height .32s cubic-bezier(.4,0,.2,1), opacity .22s ease, margin .32s ease, padding .32s ease, visibility 0s linear .32s !important; }'
    + B + ' #cl-menu.st-cats-open .cl-cats.st-cat-b { visibility: visible !important; transition: max-height .32s cubic-bezier(.4,0,.2,1), opacity .22s ease, margin .32s ease, padding .32s ease, visibility 0s !important; }'
    + B + ' #cl-menu:not(.f5-picked) .st-cat-h .ch-v { visibility: hidden !important; }'
    /* ---- F6 ---- */
    + 'html, body, * { -webkit-tap-highlight-color: rgba(0,0,0,0) !important; }'
    + 'button, a, [role="button"], .card, .cl-row, .cl-cat, .cl-lbl, .drawer-item, .drawer-section-head, .tab, header, .topbar, .toolbar, .detail-bar, #drawer, #cl-menu, .bl-card, #gd-chips, #gd-sum, .gd-badge, .pick-sheet-head, img'
    + ' { -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; }'
    + 'input, textarea, select, [contenteditable="true"], .sl-in, input *, textarea * { -webkit-user-select: text !important; user-select: text !important; -webkit-touch-callout: default !important; }'
    + ':focus:not(:focus-visible) { outline: none !important; }'
    + 'button:focus:not(:focus-visible), [role="button"]:focus:not(:focus-visible), .cl-row:focus:not(:focus-visible), .drawer-item:focus:not(:focus-visible) { box-shadow: none; }'
    /* ---- F7 ---- */
    + '#chk-view .f7-box { position: relative; display: block; width: 100%; aspect-ratio: 2550 / 3300; margin: 0 0 12px; border-radius: 12px; overflow: hidden; background: #fff; box-shadow: 0 1px 3px rgba(15,23,32,.08); }'
    + '#chk-view .f7-box::before { content: ""; position: absolute; inset: 0; background: linear-gradient(100deg, #F1F4F8 30%, #FAFBFD 50%, #F1F4F8 70%); background-size: 300% 100%; animation: f7Sk 1.2s linear infinite; }'
    + '#chk-view .f7-box.f7-ok::before { animation: none; opacity: 0; transition: opacity .3s ease; }'
    + '#chk-view .f7-box > img.chk-page { position: absolute; inset: 0; width: 100% !important; height: 100% !important; margin: 0 !important; object-fit: contain; opacity: 0; transition: opacity .28s ease; }'
    + '#chk-view .f7-box.f7-ok > img.chk-page { opacity: 1; }'
    + '@keyframes f7Sk { from { background-position: 100% 0; } to { background-position: -50% 0; } }'
    /* ---- F8 ---- */
    + '#res-media .res-mcard.f8-w { opacity: 0; transform: translate3d(0, 22px, 0); }'
    + '#res-media .res-mcard.f8-in { opacity: 1; transform: none; transition: opacity .55s ease, transform .7s ' + EASE + '; }'
    + '#res-media .res-mthumb img { opacity: 0; transition: opacity .3s ease; } #res-media .res-mthumb img.f8-ok { opacity: 1; }'
    + '@media (prefers-reduced-motion: reduce) { #res-media .res-mcard.f8-w { transform: none; } #res-media .res-mcard.f8-in { transition: opacity .2s ease; } }'
    /* ---- F9 ---- */
    + 'html.storm-crew [data-ins-page], html.storm-crew [data-res-page="logos"], html:not(.storm-mgr) [data-ins-page], html:not(.storm-mgr) [data-res-page="logos"] { display: none !important; }';
  var st = document.createElement('style'); st.id = 'storm-v202-css'; st.textContent = css;
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();

  /* ================= F2: manager login switches in place ================= */
  function tabsHold() {}
  function anchor() {
    var tb = document.getElementById('topbar'), top = 0;
    if (tb) { var r = tb.getBoundingClientRect(); top = Math.max(0, r.bottom); }
    var cs = document.querySelectorAll('#list > .card[data-bin]');
    /* the first card whose top is in view (the row the eye is on); else the card cut by the bar */
    for (var i = 0; i < cs.length; i++) { var q = cs[i].getBoundingClientRect(); if (q.top >= top - 1 && q.top < window.innerHeight) return { el: cs[i], top: q.top }; }
    for (var k = 0; k < cs.length; k++) { var q2 = cs[k].getBoundingClientRect(); if (q2.bottom > top + 10) return { el: cs[k], top: q2.top }; }
    return null;
  }
  function frag(html) { var t = document.createElement('div'); t.innerHTML = html; return t.firstElementChild; }
  var INFO_X = ['price', 'ft-note', 'ft-line', 'need-qty'];
  function patchOne(el, it) {
    var nw = frag(cardHtml(it)); if (!nw) return;
    var info = el.querySelector('.info'), ninfo = nw.querySelector('.info');
    if (info && ninfo) {
      var sku = info.querySelector(':scope > .sku');
      var olds = INFO_X.map(function (c) { return [].slice.call(info.querySelectorAll(':scope > .' + c)); }).reduce(function (a, b) { return a.concat(b); }, []);
      var news = [].slice.call(ninfo.children).filter(function (c) { return INFO_X.some(function (k) { return c.classList.contains(k); }); });
      var same = olds.length === news.length && olds.every(function (o, i) { return o.outerHTML === news[i].outerHTML; });
      if (!same) {
        olds.forEach(function (o) { o.remove(); });
        var at = sku || null;
        news.forEach(function (n) { if (at && at.parentNode === info) { at.insertAdjacentElement('afterend', n); at = n; } else info.appendChild(n); });
      }
    }
    var inp = el.querySelector('input.count'), ninp = nw.querySelector('input.count');
    if (inp && ninp) {
      if (document.activeElement !== inp && inp.value !== ninp.value) inp.value = ninp.value;
      if (inp.getAttribute('value') !== ninp.getAttribute('value')) inp.setAttribute('value', ninp.getAttribute('value') || '');
      if (inp.getAttribute('aria-label') !== ninp.getAttribute('aria-label')) inp.setAttribute('aria-label', ninp.getAttribute('aria-label'));
      var tag = inp.parentNode.querySelector(':scope > .ft-tag'), ntag = ninp.parentNode.querySelector(':scope > .ft-tag');
      if (tag && !ntag) tag.remove(); else if (!tag && ntag) inp.insertAdjacentElement('afterend', ntag);
    }
    var pa = el.querySelector('.pick-add'), npa = nw.querySelector('.pick-add');
    if (pa && npa) { if (pa.textContent !== npa.textContent) pa.textContent = npa.textContent; pa.classList.toggle('in-list', npa.classList.contains('in-list')); }
    try { patchCard(it); } catch (e) {}
  }
  function canPatch() {
    try {
      if (tab === 'need') return false;
      var want = filtered().map(function (x) { return x.bin; }), have = {};
      var cards = document.querySelectorAll('#list > .card[data-bin]');
      cards.forEach(function (c) { have[c.getAttribute('data-bin')] = 1; });
      if (want.length !== cards.length) return false;
      for (var i = 0; i < want.length; i++) if (!have[want[i]]) return false;
      return true;
    } catch (e) { return false; }
  }
  window.stormMgrSwitch202 = function (go, paintRole) {
    var a = anchor();
    var patch = canPatch();
    if (typeof paintRole === 'function') paintRole();
    tabsHold();
    var target = (go === 'stock' || go === 'job') ? go : null;
    if (target && target !== appMode) {
      if (patch) {
        try { savePickList(); } catch (e) {}
        appMode = target; try { localStorage.setItem('stormModeV61', target); } catch (e) {}
        try { loadPickList(); } catch (e) {}
        try { updateModeSwitch(); } catch (e) {}
      } else { try { setMode(target); } catch (e) {} }
    } else { try { updateModeSwitch(); } catch (e) {} }
    if (patch) {
      document.querySelectorAll('#list > .card[data-bin]').forEach(function (el) { var it = null; try { it = findItem(el.getAttribute('data-bin')); } catch (e) {} if (it) patchOne(el, it); });
      try { updateNeedBadge(); } catch (e) {}
      try { updateCounts(); } catch (e) {}
    } else { try { render(); } catch (e) {} }
    /* the late restyle passes run now, in this frame, so nothing pops in afterwards */
    try { if (typeof window.stormCl179All === 'function') window.stormCl179All(); } catch (e) {}
    try { if (typeof window.stormOh181Pass === 'function') window.stormOh181Pass(); } catch (e) {}
    try { if (typeof window.stormCl179All === 'function') window.stormCl179All(); } catch (e) {}
    try { if (typeof window.stormEqCards202 === 'function') window.stormEqCards202(); } catch (e) {} /* F10: card height for this mode, same frame */
    if (a) {
      var el = a.el.isConnected ? a.el : document.querySelector('#list > .card[data-bin="' + a.el.getAttribute('data-bin') + '"]');
      if (el) { var d = el.getBoundingClientRect().top - a.top; if (Math.abs(d) >= 1) { try { topbarLastY += d; } catch (e) {} window.scrollTo(0, (window.scrollY || 0) + d); } }
    }
  };
  window.addEventListener('stormaccess', function () { setTimeout(tabsHold, 0); setTimeout(gate9, 0); });

  /* ================= F3: Staging = Find a Job only ================= */
  var fromStaging = 0, picked = 0;
  function isJob() { try { return isJobMode(); } catch (e) { return false; } }
  function openFindOnly() {
    var b = document.createElement('button'); b.type = 'button'; b.setAttribute('data-jc-find', '1'); b.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;pointer-events:none';
    document.body.appendChild(b); try { b.click(); } finally { b.remove(); }
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var sg = t.closest('#cl-menu [data-cl-go="staging"]');
    if (sg) {
      e.stopImmediatePropagation(); e.preventDefault();
      try { closeDrawer(); } catch (x) {}
      fromStaging = Date.now();
      if (!isJob()) { var seg = document.querySelector('#mode-switch .cl-seg-job') || document.getElementById('mode-switch'); if (seg) seg.click(); setTimeout(openFindOnly, 420); }
      else setTimeout(openFindOnly, 90); /* v215: Find a Job starts while the menu slides away (was 200 ms after) */
      return;
    }
    if (t.closest('#job-find [data-jf-edit], #job-find [data-jf-load], #job-find [data-jf-jb-load]')) {
      picked = Date.now();
      setTimeout(function () {
        var sh = document.getElementById('pull-sheet');
        if (sh && sh.classList.contains('open')) return;
        if (document.getElementById('job-find') && document.querySelector('#job-find.on')) return; /* the pick didn't go through */
        var pf = document.getElementById('pull-fab'); if (pf) pf.click(); /* Customer Search slides up as Find a Job fades away */
      }, 60);
    }
  }, true);

  /* ================= F5: label beside Categories only for a category picked there ================= */
  function sync5() {
    var mn = document.getElementById('cl-menu'); if (!mn) return;
    var c = 'All', s = 'All'; try { c = category; s = supplier; } catch (e) {}
    if (c === 'All' || s !== 'All') mn.classList.remove('f5-picked');
  }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('#cl-menu [data-cl-cat]')) { var mn = document.getElementById('cl-menu'); if (mn) mn.classList.add('f5-picked'); setTimeout(sync5, 50); }
    else if (t.closest('#hamburger, [data-gd-sup], [data-cl-go], [data-drawer-category], [data-drawer-supplier], #tab-all')) setTimeout(sync5, 60);
  }, true);
  setInterval(sync5, 1500);

  /* ================= F7: checklist pages ================= */
  var MD = {
    'box-truck-pre-check-hd-1.jpg': 'box-truck-pre-check-md-1.jpg',
    'tool-checklist-hd-1.jpg': 'tool-checklist-md-1.jpg',
    'tool-checklist-hd-2.jpg': 'tool-checklist-md-2.jpg'
  };
  function mdOf(src) { var m = /checklists\/([^?#\/]+)/.exec(src || ''); return m && MD[m[1]] ? BASE + 'checklists/' + MD[m[1]] + '?v=1' : ''; }
  function fixChk(v) {
    v.querySelectorAll('img.chk-page:not([data-f7])').forEach(function (im) {
      im.setAttribute('data-f7', '1');
      var hi = im.getAttribute('data-chk-zoom') || im.getAttribute('src'), md = mdOf(hi);
      if (!im.getAttribute('data-chk-zoom')) im.setAttribute('data-chk-zoom', hi); /* zoom + print keep the full-size page */
      var box = document.createElement('div'); box.className = 'f7-box';
      im.parentNode.insertBefore(box, im); box.appendChild(im);
      function ok() { box.classList.add('f7-ok'); }
      im.addEventListener('load', ok); im.addEventListener('error', function () { if (md && im.src.indexOf(md) === 0 && hi) { im.src = hi; } else ok(); });
      if (md) im.src = md;
      if (im.complete && im.naturalWidth) ok();
    });
  }
  (function watchChk(n) {
    var v = document.getElementById('chk-view');
    if (v) { new MutationObserver(function () { fixChk(v); }).observe(v, { childList: true, subtree: true }); fixChk(v); return; }
    if (n < 400) setTimeout(function () { watchChk(n + 1); }, 150);
  })(0);
  /* chk-view is made on the first open: catch it the moment it is added */
  new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) { var nd = ms[i].addedNodes[j]; if (nd.id === 'chk-view') { fixChk(nd); new MutationObserver(function () { fixChk(nd); }).observe(nd, { childList: true, subtree: true }); } } }).observe(document.documentElement, { childList: true, subtree: true });
  function warm() { Object.keys(MD).forEach(function (k, i) { setTimeout(function () { var im = new Image(); im.decoding = 'async'; im.src = BASE + 'checklists/' + MD[k] + '?v=1'; }, i * 400); }); }
  setTimeout(function () { if (window.requestIdleCallback) requestIdleCallback(warm, { timeout: 8000 }); else warm(); }, 6000);

  /* ================= F8: Media tiles float in ================= */
  var q8 = [], t8 = 0, io8 = null;
  function flush8() {
    t8 = 0; var c = q8.shift(); if (!c) return;
    if (c.isConnected) { c.classList.add('f8-in'); setTimeout(function () { c.classList.remove('f8-w'); }, 20); }
    if (q8.length) t8 = setTimeout(flush8, 70);
  }
  function queue8(c) { if (c.__f8q) return; c.__f8q = 1; q8.push(c); if (!t8) t8 = setTimeout(flush8, 0); }
  function ready8(c, cb) {
    var im = c.querySelector('.res-mthumb img'); if (!im) { cb(); return; }
    var done = false; function go() { if (done) return; done = true; im.classList.add('f8-ok'); cb(); }
    if (im.complete && (im.naturalWidth || im.style.visibility === 'hidden')) { go(); return; }
    im.addEventListener('load', go); im.addEventListener('error', function () { im.style.visibility = 'hidden'; go(); }); /* a missing thumbnail: the tile comes in with its plain grey box, never a broken image */
    try { im.loading = 'eager'; } catch (e) {} /* it is on screen: fetch now */
  }
  function scan8() {
    var box = document.getElementById('res-media'); if (!box) return;
    if (!io8 && 'IntersectionObserver' in window) io8 = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (!en.isIntersecting) return; io8.unobserve(en.target); var c = en.target; ready8(c, function () { queue8(c); }); });
    }, { rootMargin: '0px 0px -24px 0px', threshold: 0.01 });
    box.querySelectorAll('.res-mcard:not([data-f8])').forEach(function (c) {
      c.setAttribute('data-f8', '1');
      if (!io8) { var im = c.querySelector('.res-mthumb img'); if (im) im.classList.add('f8-ok'); return; }
      c.classList.add('f8-w'); io8.observe(c);
    });
  }
  new MutationObserver(function () { scan8(); }).observe(document.documentElement, { childList: true, subtree: true });

  /* ================= F9: Insurance Certificates + Logos are manager-only ================= */
  var shut9 = false;
  function gate9(fromOpen) {
    if (mgr()) return;
    shut9 = false;
    ['res-list', 'res-view'].forEach(function (id) {
      var v = document.getElementById(id);
      if (v && v.classList.contains('open') && v.querySelector('[data-res-logo], .st-ins-card, .st-ins-head, .res-fmt, [data-res-dl], a[href*="/assets/logos/"]')) {
        var x = v.querySelector('[data-res-close]'); if (x) x.click(); else v.classList.remove('open');
        if (v.classList.contains('open')) { v.classList.remove('open'); v.innerHTML = ''; }
        shut9 = true;
      }
    });
  }
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (!t.closest('[data-ins-page], [data-ins-contact], [data-res-page="logos"], [data-res-logo]')) return;
    if (mgr()) return;
    e.stopImmediatePropagation(); e.preventDefault();
    try { stormAccess.ask(null, 'Insurance Certificates and Logos are for managers.'); } catch (x) {}
  }, true);
  setInterval(gate9, 5000);
  /* any other way in (old links, the back button, a page re-opened): closed before it paints */
  new MutationObserver(function () { if (mgr()) return; var a = document.getElementById('res-list'), b = document.getElementById('res-view'); if (!((a && a.classList.contains('open')) || (b && b.classList.contains('open')))) return; gate9(); if (shut9) { try { stormAccess.ask(null, 'Insurance Certificates and Logos are for managers.'); } catch (x) {} } }).observe(document.documentElement, { childList: true, subtree: true });
})();

/* v202 part 2 (Hark, 2026-11-11 21:10-21:13, Dave):
   F10 every item card in the main grid is the same height (names clamp to 2 lines, one-line meta, controls sit at the bottom; one shared
       height per mode and width, measured from the tallest card).
   F11 Item details "Supplier" tile shows the supplier's transparent logo (same files as the photo corner), sized to the text line it replaces.
   F12 main-grid photos: soft placeholder in the photo box, the picture fades + glides in once loaded and decoded; already-seen pictures never
       fade again (patches, re-renders, cache); fetched about one screen ahead.
   F13 the menu button's three lines morph to an X while the side menu is open (same timing curves as the + dock button) and back on close. */
(function () {
  if (window.__storm202b) return; window.__storm202b = true;
  var EASE = 'cubic-bezier(.25,.6,.2,1)', B = 'html body';
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/supplier-clear/';
  var SUP = { 'Home Depot': 'hd', 'RichTech': 'rt', 'AutoZone': 'az', 'Hilti': 'hi' };
  var css = ''
    /* F10 */
    + B + ' #list > .card .info .name { display: -webkit-box !important; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; overflow: hidden !important; height: calc(2 * var(--f10-lh, 17.5px)) !important; min-height: 0 !important; max-height: none !important; }'
    + B + ' #list > .card .info .sku, ' + B + ' #list > .card .info .price, ' + B + ' #list > .card .info .ft-note, ' + B + ' #list > .card .info .ft-line, ' + B + ' #list > .card .info .need-qty { white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }'
    + B + ' #list > .card { min-height: var(--f10-h, 0px) !important; }'
    + B + ' #list > .card > .controls { margin-top: auto !important; }'
    /* F11 */
    + B + ' #detail .cl-tile-sup .f11-lg { display: flex; align-items: center; justify-content: center; width: 100%; overflow: hidden; }'
    + B + ' #detail .cl-tile-sup .f11-lg img { display: block; height: 100%; width: auto; max-width: 100%; object-fit: contain; filter: none; -webkit-user-drag: none; }'
    + '.f11-sr { position: absolute !important; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }'
    /* F12 */
    + B + ' #list > .card .card-main::before { content: ""; position: absolute; left: 0; top: 0; width: var(--f12-w, 100%); height: var(--f12-h, 0px); border-radius: var(--f12-r, 12px); background: #EEF2F6; opacity: 0; pointer-events: none; transition: opacity .35s ease; z-index: 0; }'
    + B + ' #list > .card .card-main.f12-wait::before { opacity: 1; transition: none; }'
    + B + ' #list > .card .card-main > img.photo { position: relative; z-index: 1; }'
    + B + ' #list > .card .card-main > img.photo.f12-w { opacity: 0 !important; transform: translate3d(0, 10px, 0); transition: none !important; }'
    + B + ' #list > .card .card-main > img.photo.f12-in { opacity: 1; transform: none; transition: opacity .5s ease, transform .6s ' + EASE + ' !important; }'
    + B + ' #list > .card .card-main > img.photo.f12-bad { visibility: hidden; }'
    + '@media (prefers-reduced-motion: reduce) { ' + B + ' #list > .card .card-main > img.photo.f12-w { transform: none; } }'
    /* F13 */
    + B + ' #hamburger.hamburger span { transition: transform .55s cubic-bezier(.5,0,.3,1.25), opacity .3s ease; transform-origin: 50% 50%; }'
    + B + ' #hamburger.hamburger.f13-x span { transition: transform .5s cubic-bezier(.34,1.4,.5,1), opacity .2s ease; }'
    + B + ' #hamburger.hamburger.f13-x span:nth-child(1) { transform: translateY(var(--f13-d, 7px)) rotate(45deg); }'
    + B + ' #hamburger.hamburger.f13-x span:nth-child(2) { opacity: 0; transform: scaleX(.2); }'
    + B + ' #hamburger.hamburger.f13-x span:nth-child(3) { transform: translateY(calc(-1 * var(--f13-d, 7px))) rotate(-45deg); }'
    + '@media (prefers-reduced-motion: reduce) { ' + B + ' #hamburger.hamburger span { transition: none !important; } }';
  var st = document.createElement('style'); st.id = 'storm-v202b-css'; st.textContent = css;
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();

  /* ---------- F10: one card height ---------- */
  var eqQ = 0;
  function eq() {
    eqQ = 0;
    var list = document.getElementById('list'); if (!list || list.offsetParent === null) return;
    var cs = list.querySelectorAll(':scope > .card'); if (!cs.length) return;
    var nm = cs[0].querySelector('.info .name');
    if (nm) { var lh = parseFloat(getComputedStyle(nm).lineHeight); if (!(lh > 0)) lh = parseFloat(getComputedStyle(nm).fontSize) * 1.25; list.style.setProperty('--f10-lh', lh + 'px'); }
    var prev = list.style.getPropertyValue('--f10-h');
    list.style.setProperty('--f10-h', '0px');
    var mx = 0; for (var i = 0; i < cs.length; i++) { var h = cs[i].getBoundingClientRect().height; if (h > mx) mx = h; }
    var v = Math.ceil(mx) + 'px';
    list.style.setProperty('--f10-h', v);
    return prev !== v;
  }
  window.stormEqCards202 = eq;
  function eqSoon() { if (eqQ) return; eqQ = requestAnimationFrame(eq); }
  (function w(n) {
    var l = document.getElementById('list');
    if (l) {
      new MutationObserver(function () { if (!eqQ) Promise.resolve().then(eq); }).observe(l, { childList: true, subtree: true, characterData: true });
      eq(); return;
    }
    if (n < 200) setTimeout(function () { w(n + 1); }, 150);
  })(0);
  window.addEventListener('resize', eqSoon);
  window.addEventListener('stormaccess', function () { eq(); });
  try { if (document.fonts && document.fonts.ready) document.fonts.ready.then(eqSoon); } catch (e) {}
  /* ---------- F11: supplier logo in the Supplier tile ---------- */
  function f11() {
    document.querySelectorAll('#detail .cl-tile-sup:not([data-f11])').forEach(function (t) {
      var lab = t.querySelector('span'); var txt = ''; t.childNodes.forEach(function (n) { if (n.nodeType === 3) txt += n.nodeValue; });
      txt = txt.trim(); var k = SUP[txt]; t.setAttribute('data-f11', '1'); if (!k) return;
      var tn = null; t.childNodes.forEach(function (n) { if (n.nodeType === 3 && n.nodeValue.trim()) tn = n; }); if (!tn) return;
      var r = document.createRange(); r.selectNodeContents(tn); var lh = r.getBoundingClientRect().height || 20;
      var w = document.createElement('div'); w.className = 'f11-lg'; w.style.height = Math.round(lh) + 'px';
      w.innerHTML = '<img alt="" aria-hidden="true" decoding="async" src="' + BASE + k + '.png?v=1">';
      var sr = document.createElement('span'); sr.className = 'f11-sr'; sr.textContent = txt;
      tn.parentNode.replaceChild(w, tn); t.appendChild(sr);
    });
  }
  (function w(n) { var d = document.getElementById('detail'); if (d) { new MutationObserver(f11).observe(d, { childList: true, subtree: true }); f11(); return; } if (n < 200) setTimeout(function () { w(n + 1); }, 150); })(0);

  /* ---------- F12: photos fade in once, after load + decode ---------- */
  var seen = window.__f12seen = window.__f12seen || {};
  var near = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (!en.isIntersecting) return; near.unobserve(en.target); try { if (en.target.loading === 'lazy') en.target.loading = 'eager'; } catch (e) {} });
  }, { rootMargin: '100% 0px 100% 0px' }) : null;
  function boxVars() {
    var l = document.getElementById('list'), im = l && l.querySelector(':scope > .card .card-main > img.photo'); if (!im) return;
    var r = im.getBoundingClientRect(); if (!r.height) return;
    l.style.setProperty('--f12-h', Math.round(r.height) + 'px'); l.style.setProperty('--f12-w', Math.round(r.width) + 'px');
    l.style.setProperty('--f12-r', getComputedStyle(im).borderTopLeftRadius || '12px');
  }
  function done(im, host, fade) {
    seen[im.getAttribute('src')] = 1;
    if (!fade) { im.classList.remove('f12-w'); host.classList.remove('f12-wait'); return; }
    requestAnimationFrame(function () { im.classList.add('f12-in'); im.classList.remove('f12-w'); host.classList.remove('f12-wait'); setTimeout(function () { im.classList.remove('f12-in'); }, 700); });
  }
  function one(im) {
    if (im.__f12) return; im.__f12 = 1;
    var host = im.parentNode; try { im.decoding = 'async'; } catch (e) {}
    var src = im.getAttribute('src') || '';
    if (seen[src] || (im.complete && im.naturalWidth)) { seen[src] = 1; return; } /* cached / already shown: no fade, ever */
    im.classList.add('f12-w'); host.classList.add('f12-wait');
    if (near) near.observe(im);
    var fin = false;
    function ok() { if (fin) return; fin = true; var p = null; try { p = im.decode ? im.decode() : null; } catch (e) {} if (p && p.then) p.then(function () { done(im, host, true); }, function () { done(im, host, true); }); else done(im, host, true); }
    function bad() { if (fin) return; fin = true; im.classList.remove('f12-w'); im.classList.add('f12-bad'); /* placeholder stays, no broken icon */ }
    im.addEventListener('load', ok); im.addEventListener('error', bad);
    if (im.complete && im.naturalWidth) ok();
  }
  function scan12() { document.querySelectorAll('#list > .card .card-main > img.photo').forEach(one); }
  (function w(n) {
    var l = document.getElementById('list');
    if (l) { new MutationObserver(function () { scan12(); }).observe(l, { childList: true, subtree: true }); scan12(); boxVars(); setTimeout(boxVars, 600); return; }
    if (n < 200) setTimeout(function () { w(n + 1); }, 150);
  })(0);
  window.addEventListener('resize', function () { setTimeout(boxVars, 60); });

  /* ---------- F13: menu button morphs with the side menu ---------- */
  function hb() { return document.getElementById('hamburger'); }
  function dist() { var b = hb(); if (!b || b.children.length < 3) return; var a = b.children[0].getBoundingClientRect(), c = b.children[1].getBoundingClientRect(); var d = (c.top + c.height / 2) - (a.top + a.height / 2); if (d > 0) b.style.setProperty('--f13-d', d + 'px'); }
  function sync13() { var d = document.getElementById('drawer'), b = hb(); if (!d || !b) return; var o = d.classList.contains('open'); if (b.classList.contains('f13-x') !== o) { if (o) dist(); b.classList.toggle('f13-x', o); } }
  (function w(n) { var d = document.getElementById('drawer'); if (d && hb()) { new MutationObserver(sync13).observe(d, { attributes: true, attributeFilter: ['class'] }); dist(); sync13(); return; } if (n < 200) setTimeout(function () { w(n + 1); }, 150); })(0);
  document.addEventListener('click', function (e) { if (e.target && e.target.closest && e.target.closest('#hamburger')) { dist(); var b = hb(); if (b) b.classList.add('f13-x'); setTimeout(sync13, 0); setTimeout(sync13, 400); } }, true);
  window.addEventListener('popstate', function () { setTimeout(sync13, 0); setTimeout(sync13, 350); });
})();

/* v203 (Hark, 2026-11-11, Dave approved 21:23): Truck Check fillable forms. Module window.stormTruckCheck (truck-check.js, inlined), then its wiring. */
/* STORM Truck Check — fillable digital copies of the two paper sheets already in the app
   (checklists/box-truck-pre-check.pdf and checklists/tool-checklist.pdf).
   By Hark, 2026-11-11, for Dave. Inlined in app-ext.js v203 (wiring: window.stormTC203 below).

   API
     var h = window.stormTruckCheck.open(container, {
       sheet: 'truck' | 'tools',           // which paper sheet
       data: { sheet, truck, period, fields: { fieldId: { v, by, at } } },   // or a flat { fieldId: value } map
       user: 'Mike Guelli', initials: 'MG',// used by tap-to-fill on EMPLOYEE / CHECKED BY / INIT.
       assetBase: 'https://.../assets/truckcheck/',   // tool photos, logos, ProKit drawing
       onChange: function (c) {},          // c = { sheet, truck, period, fieldId, value, by, at } — one call per field
       onKey: function (k) {}              // k = { sheet, truck, period } when TRUCK # or DATE changes (load that record)
     });
     h.applyRemote(fields)  // patch values from another phone in place (never re-renders, never touches the field being typed in)
     h.setData(record)      // load a different record in place
     h.getData()            // { sheet, truck, period, fields }
     h.progress()           // { done, total }
     h.setStatus('Saved')   // tiny status pill in the header box (fixed size, no layout shift)
     h.destroy()
   Record key = sheet | truck | period, period = the sheet's DATE (YYYY-MM-DD): one record per truck per day per sheet. */
(function () {
  'use strict';
  if (window.stormTruckCheck && window.stormTruckCheck.version) return;
  var SPECS = {"truck": {"sheet": "truck", "source": "checklists/box-truck-pre-check.pdf (1 page; page image checklists/box-truck-pre-check-hd-1.jpg)", "brandHeader": {"logo": "STORM Basement Waterproofing", "title": "BOX TRUCK PRE CHECK", "subtitle": ["Isuzu Box Truck · Gas · Dually", "Six tires · 85 PSI all around"], "subtitleUnderlined": "85 PSI"}, "heading": "Box Truck Pre Check", "intro": "Check all six tires cold, before the truck rolls.", "header": [[{"id": "hdr.truck", "label": "TRUCK #", "type": "text"}, {"id": "hdr.employee", "label": "EMPLOYEE", "type": "text"}], [{"id": "hdr.date", "label": "DATE", "type": "date"}, {"id": "hdr.mileage", "label": "MILEAGE", "type": "number"}], [{"id": "hdr.jobName", "label": "JOB NAME", "type": "text"}, {"id": "hdr.jobNo", "label": "JOB #", "type": "text"}], [{"id": "hdr.reg", "label": "REGISTRATION", "type": "mdy", "parts": ["MO", "DY", "YR"]}, {"id": "hdr.insp", "label": "INSPECTION EXP", "type": "mdy", "parts": ["MO", "DY", "YR"]}]], "sections": [{"id": "tires", "title": "THE TRUCK — TOP VIEW", "legend": "COND:  G = good · OK = ok · P = poor", "diagram": {"top": "FRONT ▲", "cab": "CAB", "bottom": "REAR", "bodyLogo": "STORM Basement Waterproofing"}, "left": [{"id": "fl", "label": "FRONT LEFT", "target": "85 PSI", "fields": [{"id": "tire.fl.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.fl.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.fl.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}, {"id": "rlo", "label": "REAR LEFT OUTER", "target": "85 PSI", "fields": [{"id": "tire.rlo.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.rlo.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.rlo.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}, {"id": "rli", "label": "REAR LEFT INNER", "target": "85 PSI", "fields": [{"id": "tire.rli.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.rli.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.rli.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}], "right": [{"id": "fr", "label": "FRONT RIGHT", "target": "85 PSI", "fields": [{"id": "tire.fr.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.fr.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.fr.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}, {"id": "rro", "label": "REAR RIGHT OUTER", "target": "85 PSI", "fields": [{"id": "tire.rro.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.rro.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.rro.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}, {"id": "rri", "label": "REAR RIGHT INNER", "target": "85 PSI", "fields": [{"id": "tire.rri.actual", "label": "ACTUAL", "type": "number", "unit": "PSI"}, {"id": "tire.rri.cond", "label": "COND", "type": "choice", "options": ["G", "OK", "P"]}, {"id": "tire.rri.tread", "label": "TREAD", "type": "number", "unit": "/32"}]}]}, {"id": "windows", "title": "WINDOWS — CHECK THE GLASS", "groups": [{"id": "win.windshield", "label": "MAIN WINDSHIELD", "options": ["Good", "Chip", "Crack"]}, {"id": "win.driver", "label": "DRIVER WINDOW", "options": ["Good", "Chip", "Crack"]}, {"id": "win.passenger", "label": "PASSENGER WINDOW", "options": ["Good", "Chip", "Crack"]}]}, {"id": "lights", "title": "LIGHTS — CHECK EVERY ONE", "options": ["OK", "Out"], "columns": [[{"id": "light.lowBeam", "label": "Headlights — low beam"}, {"id": "light.turn", "label": "Turn signals (L + R)"}, {"id": "light.tail", "label": "Tail lights"}, {"id": "light.marker", "label": "Marker / clearance lights"}, {"id": "light.reverse", "label": "Reverse lights"}], [{"id": "light.highBeam", "label": "Headlights — high beam"}, {"id": "light.flashers", "label": "4-way flashers"}, {"id": "light.brake", "label": "Brake lights"}, {"id": "light.box", "label": "Box lights"}, {"id": "light.plate", "label": "License plate light"}]]}, {"id": "wrong", "title": "ANYTHING WRONG WITH THE TRUCK?", "note": "Paper grid is 4 columns x 2 rows, read left to right.", "options": [{"id": "wrong.none", "label": "Nothing wrong"}, {"id": "wrong.lowTire", "label": "Low tire"}, {"id": "wrong.flat", "label": "Flat or damage"}, {"id": "wrong.uneven", "label": "Uneven wear"}, {"id": "wrong.warning", "label": "Warning light"}, {"id": "wrong.pulls", "label": "Pulls to one side"}, {"id": "wrong.fuel", "label": "Low on fuel"}, {"id": "wrong.other", "label": "Other"}], "describe": {"id": "wrong.describe", "label": "DESCRIBE IT", "type": "text"}}], "warning": "If anything's wrong, tell Dave before the truck leaves.", "footer": [{"id": "foot.checkedBy", "label": "CHECKED BY", "type": "text"}, {"id": "foot.timeOut", "label": "TIME OUT", "type": "time"}], "footnote": "Storm Basement Waterproofing · box truck pre check."}, "tools": {"sheet": "tools", "source": "checklists/tool-checklist.pdf (2 pages; page images checklists/tool-checklist-hd-1.jpg, -hd-2.jpg)", "brandHeader": {"logo": "STORM Basement Waterproofing", "rightLogo": "HILTI", "title": "TOOL CHECKLIST"}, "heading": "Tool checklist", "intro": "Check every tool before the truck rolls.", "header": [[{"id": "hdr.truck", "label": "TRUCK #", "type": "text"}, {"id": "hdr.employee", "label": "EMPLOYEE", "type": "text"}], [{"id": "hdr.date", "label": "DATE", "type": "date"}, {"id": "hdr.jobLocation", "label": "JOB LOCATION", "type": "text"}]], "tableColumns": ["TOOL", "QTY", "ON TRUCK", "ON JOB SITE", "WORKING", "BROKEN", "INIT."], "rowFields": {"onTruck": "check", "onSite": "check", "working": "check", "broken": "check", "init": "text"}, "fieldIdPattern": "tool.<rowId>.<onTruck|onSite|working|broken|init>", "sections": [{"id": "power", "title": "POWER TOOLS", "page": 1, "rows": [{"id": "te3000", "name": "Jackhammer - Large", "model": "TE-3000", "qty": 1, "img": "tool-te3000.jpg"}, {"id": "te2000", "name": "Jackhammer - Small", "model": "TE-2000", "qty": 1, "img": "tool-te2000.jpg"}, {"id": "te2000-22", "name": "Jackhammer - Cordless", "model": "TE 2000-22", "qty": 1, "img": "tool-te2000-22.jpg"}, {"id": "te6-22", "name": "Rotary Hammer", "model": "TE 6-22", "qty": 2, "img": "tool-te6-22.jpg"}, {"id": "sid6-22", "name": "Impact Guns", "model": "SID 6-22", "qty": 2, "img": "tool-sid6-22.jpg"}, {"id": "sf6h-22", "name": "Drill / Hammer Drill", "model": "SF 6H-22", "qty": 2, "img": "tool-sf6h-22.jpg"}, {"id": "sr6-22", "name": "Recip Saw - Large", "model": "SR 6-22", "qty": 1, "img": "tool-sr6-22.jpg"}, {"id": "sl2-22", "name": "Work Light", "model": "SL 2-22 LED", "qty": 1, "img": "tool-sl2-22.jpg"}, {"id": "dsh600-22", "name": "Concrete Saw", "model": "DSH 600-22 · Truck 3 only", "qty": 1, "img": "tool-dsh600-22.jpg"}, {"id": "sr4-22", "name": "Recip Saw - Small", "model": "SR 4-22", "qty": 1, "img": "tool-sr4-22.jpg"}, {"id": "c6-22", "name": "Fast Chargers", "model": "C 6-22", "qty": 4, "img": "tool-c6-22.jpg"}, {"id": "b22-255", "name": "Battery Packs - Large", "model": "B22-255", "qty": 6, "img": "tool-b22-255.jpg"}, {"id": "b22-170", "name": "Battery Packs - Small", "model": "B22-170", "qty": 4, "img": "tool-b22-170.jpg"}, {"id": "ag5d-22", "name": "Angle Grinder 5\"", "model": "AG 5D-22", "qty": 1, "img": "tool-ag5d-22.jpg"}, {"id": "dgh-130", "name": "Resurfacing Grinder", "model": "DGH-130", "qty": 1, "img": "tool-dgh-130.jpg"}, {"id": "te70", "name": "Demo Hammer - Corded", "model": "TE-70", "qty": 1, "img": "tool-te70.jpg"}, {"id": "te60-22", "name": "Demo Hammer - Cordless", "model": "TE 60-22", "qty": 1, "img": "tool-te60-22.jpg"}]}, {"id": "dust", "title": "DUST CONTROL", "page": 2, "rows": [{"id": "aic1000e", "name": "Air Scrubber", "model": "AIC 1000 E", "qty": 1, "img": "tool-aic1000e.jpg"}, {"id": "vc150-10xe", "name": "Dust Extractor", "model": "VC 150-10 XE", "qty": 1, "img": "tool-vc150-10xe.jpg"}, {"id": "vac-hose", "name": "Vacuum Hose - Large", "model": "For dust extractor", "qty": 1, "img": "tool-vac-hose.jpg"}, {"id": "te-drs-b", "name": "Dust Removal Ends", "model": "TE-DRS-B", "qty": 2, "img": "tool-te-drs-b.jpg"}]}, {"id": "prokit-info", "type": "info", "page": 2, "img": "prokit-drawing.png", "brand": "PROKIT", "title": "Pro Kit — Modular Storage System", "lines": ["One set rides on each truck — Truck 2 and Truck 3.", "Check the cases the same as the tools."], "small": "Storm's own stack, as a line drawing."}, {"id": "prokit", "title": "PRO KIT — ON THE TRUCK", "page": 2, "rows": [{"id": "pk-trolley", "name": "ProKit Trolley", "model": "#2437388", "qty": 1, "img": "tool-pk-trolley.jpg"}, {"id": "pk-xl", "name": "XL Case", "model": "#2437389", "qty": 1, "img": "tool-pk-xl.jpg"}, {"id": "pk-large", "name": "Large Case", "model": "#2437395", "qty": 1, "img": "tool-pk-large.jpg"}, {"id": "pk-medium", "name": "Medium Case", "model": "#2437379", "qty": 1, "img": "tool-pk-medium.jpg"}, {"id": "pk-organizer", "name": "Full-size Organizer", "model": "#2437397", "qty": 1, "img": "tool-pk-organizer.jpg"}, {"id": "pkc18h", "name": "Case PKC 18-H", "model": "#2437357", "qty": 2, "img": "tool-pkc18h.jpg"}]}], "warning": {"bold": "Anything missing or broken? Tell Dave before the truck leaves.", "sub": "No guessing — if it's at a job site, mark it and move on."}, "footer": [{"id": "foot.checkedBy", "label": "CHECKED BY", "type": "text"}, {"id": "foot.timeOut", "label": "TIME OUT", "type": "time"}], "footnote": "Storm Basement Waterproofing — Hilti tool checklist.", "footnoteRepeatsOnEachPage": true}};
  var VERSION = '1.0';
  var BLUE = '#29A8E0', INK = '#0F1720', MUTE = '#6B7280', LINE = '#DCE4EE', RED = '#DC2626', AMBER = '#D97706';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var DEFAULT_ASSETS = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/truckcheck/';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function todayISO() { var d = new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function nowHM() { var d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); }
  function fmtDate(v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? (+m[2]) + '/' + (+m[3]) + '/' + m[1] : (v || ''); }
  function fmtTime(v) { var m = /^(\d{1,2}):(\d{2})/.exec(v || ''); if (!m) return v || ''; var h = +m[1], ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return h + ':' + m[2] + ' ' + ap; }

  /* ---------- styles (scoped to .stc) ---------- */
  function css() {
    if (document.getElementById('stc-css')) return;
    try {
      if (!document.getElementById('cl-font') && !document.getElementById('stc-font')) {
        var lk = document.createElement('link'); lk.id = 'stc-font'; lk.rel = 'stylesheet';
        lk.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap';
        document.head.appendChild(lk);
      }
    } catch (e) {}
    var C = [
      '.stc{font-family:' + FONT + ';color:' + INK + ';-webkit-text-size-adjust:100%;text-size-adjust:100%;-webkit-tap-highlight-color:transparent;box-sizing:border-box;max-width:1000px;margin:0 auto}',
      '.stc *,.stc *::before,.stc *::after{box-sizing:border-box}',
      '.stc button{font-family:inherit;touch-action:manipulation;-webkit-user-select:none;user-select:none;cursor:pointer;margin:0}',
      '.stc input,.stc textarea{font-family:inherit;font-size:16px;color:' + INK + ';margin:0}',
      '.stc-card{background:#fff;border-radius:14px;box-shadow:0 1px 2px rgba(15,23,32,.05),0 4px 14px rgba(15,23,32,.06);padding:16px 14px 18px;overflow:hidden}',
      /* brand header */
      '.stc-brand{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding-bottom:10px}',
      '.stc-logo{height:38px;width:auto;flex:none;display:block}',
      '.stc-brt{text-align:right;min-width:0}',
      '.stc-brt b{display:inline-block;font-weight:800;font-size:15px;letter-spacing:.01em;border-bottom:2px solid ' + INK + ';padding-bottom:1px;white-space:nowrap}',
      '.stc-brt div{font-size:11.5px;color:' + MUTE + ';font-weight:500;line-height:1.35;margin-top:3px}',
      '.stc-brt u{text-decoration:none;border-bottom:1px solid ' + MUTE + '}',
      '.stc-hilti{height:30px;width:auto;display:block;margin-left:auto}',
      '.stc-rule{height:4px;background:' + BLUE + ';margin:0 -14px 14px}',
      '.stc-h1{font-size:26px;font-weight:800;letter-spacing:-.01em;margin:0;line-height:1.15}',
      '.stc-intro{color:' + MUTE + ';font-size:13.5px;font-weight:500;margin:4px 0 12px}',
      /* header box */
      '.stc-hbox{position:relative;border:1.5px solid ' + LINE + ';border-radius:12px;display:grid;grid-template-columns:1fr 1fr;padding:2px 10px}',
      '.stc-hf{padding:8px 4px 6px;border-bottom:1px solid ' + LINE + ';min-width:0}',
      '.stc-hbox .stc-hf.c1{border-right:1px solid ' + LINE + ';padding-right:10px}',
      '.stc-hbox .stc-hf.c2{padding-left:10px}',
      '.stc-hbox .stc-hf.last{border-bottom:0}',
      '.stc-lab{display:block;font-size:10.5px;font-weight:700;letter-spacing:.06em;color:#5A6B80;text-transform:uppercase;line-height:1.2}',
      '.stc-in{display:block;width:100%;height:40px;border:0;border-bottom:1.5px solid transparent;background:transparent;padding:6px 0 4px;font-weight:600;outline:none;border-radius:0}',
      '.stc-in:focus{border-bottom-color:' + BLUE + '}',
      '.stc-in::placeholder{color:#B4BECB;font-weight:500}',
      '.stc-status{position:absolute;top:-11px;right:10px;height:20px;line-height:20px;padding:0 9px;border-radius:10px;background:#fff;border:1px solid ' + LINE + ';font-size:10.5px;font-weight:700;color:' + MUTE + ';opacity:0;transition:opacity .2s}',
      '.stc-status.on{opacity:1}',
      /* tap-to-fill date / time */
      '.stc-dt{position:relative;display:flex;align-items:center;height:40px;font-weight:600;font-size:16px;cursor:pointer}',
      '.stc-dt .stc-dtv{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.stc-dt .stc-dtv:empty::before{content:attr(data-ph);color:' + BLUE + ';font-weight:700;font-size:13px}',
      '.stc-dt input{position:absolute;inset:0;width:100%;height:100%;opacity:0;border:0;padding:0;-webkit-appearance:none;appearance:none;pointer-events:none}',
      '.stc-dt.has input{pointer-events:auto}',
      '.stc-dt .stc-now{flex:none;height:28px;padding:0 10px;border-radius:14px;border:1.5px solid ' + LINE + ';background:#fff;font-size:11.5px;font-weight:700;color:' + BLUE + ';position:relative;z-index:2;visibility:hidden}',
      '.stc-dt.has .stc-now{visibility:visible}',
      /* MO / DY / YR */
      '.stc-mdy{display:flex;align-items:flex-end;gap:5px;height:40px}',
      '.stc-mdy label{display:flex;align-items:flex-end;gap:3px;font-size:10px;font-weight:600;color:' + MUTE + ';min-width:0}',
      '.stc-mdy input{width:34px;height:30px;border:0;border-bottom:1.5px solid #9AA7B8;text-align:center;font-weight:700;padding:0;background:transparent;outline:none;border-radius:0}',
      '.stc-mdy input.yr{width:44px}',
      '.stc-mdy input:focus{border-bottom-color:' + BLUE + '}',
      /* section titles */
      '.stc-sec{margin-top:18px}',
      '.stc-st{display:flex;align-items:center;gap:8px;font-weight:800;font-size:16px;letter-spacing:.01em;margin:0 0 8px;text-transform:uppercase}',
      '.stc-st::before{content:"";flex:none;width:4px;height:18px;border-radius:2px;background:' + BLUE + '}',
      /* boxes + chips */
      '.stc-chip{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:0 4px;border:0;background:transparent;font-size:15px;font-weight:600;color:' + INK + ';text-align:left;border-radius:10px}',
      '.stc-sq{flex:none;position:relative;width:26px;height:26px;border-radius:7px;border:2px solid #9AA7B8;background:#fff;transition:background-color .12s,border-color .12s}',
      '.stc-sq::after{content:"";position:absolute;left:7px;top:2.5px;width:7px;height:13px;border:solid #fff;border-width:0 3px 3px 0;transform:rotate(45deg) scale(.4);opacity:0;transition:transform .12s,opacity .12s}',
      '.on>.stc-sq{background:' + BLUE + ';border-color:' + BLUE + '}',
      '.on.bad>.stc-sq{background:' + RED + ';border-color:' + RED + '}',
      '.on.mid>.stc-sq{background:' + AMBER + ';border-color:' + AMBER + '}',
      '.on>.stc-sq::after{opacity:1;transform:rotate(45deg) scale(1)}',
      '.stc-chip:active>.stc-sq{transform:scale(.92)}',
      /* tires */
      '.stc-tv{border:1.5px solid ' + LINE + ';border-radius:14px;padding:12px 10px 12px}',
      '.stc-tvh{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}',
      '.stc-tvh .stc-st{margin:0}',
      '.stc-leg{font-size:11.5px;color:' + MUTE + ';font-weight:500}',
      '.stc-tgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}',
      '.stc-diag{grid-column:1/-1;display:flex;justify-content:center}',
      '.stc-diag svg{width:100%;height:auto;display:block}',
      '.stc-col{display:contents}','.stc-col .gap{display:none}',
      '#stc-t-fl{grid-column:1;grid-row:2}#stc-t-fr{grid-column:2;grid-row:2}#stc-t-rlo{grid-column:1;grid-row:3}#stc-t-rro{grid-column:2;grid-row:3}#stc-t-rli{grid-column:1;grid-row:4}#stc-t-rri{grid-column:2;grid-row:4}',
      '.stc-diag svg{max-width:250px}',
      '.stc-tire{border:1.5px solid ' + LINE + ';border-radius:12px;overflow:hidden;min-width:0;background:#fff;scroll-margin-top:70px}',
      '.stc-tire h4{margin:0;background:#EEF2F6;font-size:11.5px;font-weight:800;text-align:center;padding:6px 4px;letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.stc-tb{padding:6px 9px 8px}',
      '.stc-tr{display:flex;align-items:center;gap:6px;min-height:36px}',
      '.stc-tr .stc-lab{width:46px;flex:none;font-size:10px}',
      '.stc-tgt{font-size:20px;font-weight:700;color:' + BLUE + '}',
      '.stc-tr .stc-in{height:34px;width:46px;flex:none;text-align:center;border-bottom:1.5px solid #9AA7B8;padding:4px 0 2px}',
      '.stc-tr .stc-in:focus{border-bottom-color:' + BLUE + '}',
      '.stc-unit{font-size:12px;color:' + MUTE + ';font-weight:600}',
      '.stc-cond{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;flex:1;min-width:0}',
      '.stc-tr.cnd{flex-wrap:wrap;gap:0 6px}.stc-tr.cnd .stc-lab{width:100%;padding-top:4px}.stc-tr.cnd .stc-cond{flex:1 1 100%}',
      '.stc-tv{padding:12px 8px}.stc-tb{padding:6px 8px 8px}',
      '.stc-cond .stc-chip{min-height:38px;padding:0;gap:3px;font-size:12.5px;justify-content:flex-start}',
      '.stc-cond .stc-sq{width:22px;height:22px;border-radius:6px}',
      '.stc-cond .stc-sq::after{left:5.5px;top:1.5px;width:6px;height:11px;border-width:0 2.5px 2.5px 0}',
      /* windows */
      '.stc-win{display:grid;grid-template-columns:1fr;gap:4px 16px}',
      '.stc-wg h5{margin:4px 0 0;font-size:13px;font-weight:800;letter-spacing:.02em}',
      '.stc-opts{display:grid;grid-template-columns:repeat(3,1fr);gap:0 6px}',
      /* lights */
      '.stc-lights{display:grid;grid-template-columns:1fr;gap:0 24px}',
      '.stc-lrow{display:flex;align-items:center;gap:4px;border-bottom:1px solid #EEF2F6;min-height:46px}',
      '.stc-lrow>span{flex:1;min-width:0;font-size:15px;font-weight:500}',
      '.stc-lrow .stc-chip{width:66px;flex:none}',
      /* anything wrong */
      '.stc-wrong{display:grid;grid-template-columns:1fr 1fr;gap:0 10px}',
      '.stc-wrong .stc-chip{width:100%}',
      '.stc-desc{display:flex;align-items:flex-end;gap:10px;margin-top:4px}',
      '.stc-desc .stc-lab{flex:none;padding-bottom:9px}',
      '.stc-desc textarea{flex:1;min-width:0;min-height:40px;height:40px;resize:none;border:0;border-bottom:1.5px solid #9AA7B8;padding:9px 0 6px;font-weight:600;background:transparent;outline:none;border-radius:0;line-height:1.4;overflow:hidden}',
      '.stc-desc textarea:focus{border-bottom-color:' + BLUE + '}',
      '.stc-warn{font-weight:800;font-size:15.5px;margin:20px 0 4px;padding-top:12px;border-top:1px solid ' + LINE + '}',
      '.stc-foot{display:grid;grid-template-columns:1fr 1fr;gap:6px 18px;margin-top:6px}',
      '.stc-foot .stc-hf{border:0;padding:6px 0 0}',
      '.stc-foot .stc-in,.stc-foot .stc-dt{border-bottom:1.5px solid #9AA7B8}',
      '.stc-foot .stc-in:focus{border-bottom-color:' + BLUE + '}',
      '.stc-note{font-size:11.5px;color:' + MUTE + ';margin-top:22px}',
      /* tool tables */
      '.stc-tbl{border:1.5px solid ' + LINE + ';border-radius:12px;overflow:clip}',
      '.stc-th,.stc-row{display:grid;align-items:center}',
      '.stc-th{background:#EEF2F6;font-size:10.5px;font-weight:800;letter-spacing:.03em;text-align:center;line-height:1.15;position:sticky;top:0;z-index:3}',
      '.stc-th span{padding:8px 2px}',
      '.stc-row:nth-child(odd){background:#F6F8FB}',
      '.stc-row{border-top:1px solid #E6ECF2}',
      '.stc-row img{width:40px;height:34px;object-fit:contain;display:block;margin:0 auto;mix-blend-mode:multiply}',
      '.stc-tn{min-width:0;padding:6px 4px}',
      '.stc-tn b{display:block;font-size:14.5px;font-weight:700;line-height:1.2}',
      '.stc-tn small{display:block;font-size:11.5px;color:' + MUTE + ';font-weight:500;margin-top:1px}',
      '.stc-q{text-align:center;font-weight:800;font-size:17px}',
      '.stc-cb{display:flex;align-items:center;justify-content:center;min-height:48px;width:100%;border:0;background:transparent;padding:0}',
      '.stc-init{width:100%;max-width:70px;height:36px;margin:0 auto;display:block;border:0;border-bottom:1.5px solid #B9C4D2;background:transparent;text-align:center;font-weight:700;text-transform:uppercase;outline:none;border-radius:0;padding:0}',
      '.stc-init:focus{border-bottom-color:' + BLUE + '}',
      /* wide rows (iPad / landscape) */
      '.stc.wide .stc-th,.stc.wide .stc-row{grid-template-columns:56px minmax(0,1fr) 44px repeat(4,74px) 92px}',
      '.stc.wide .stc-th .tn{text-align:left}',
      '.stc.wide .stc-th .l2,.stc.wide .stc-row .l2{display:contents}',
      /* narrow rows (phones): name line, then the five boxes under the same five headings */
      '.stc:not(.wide) .stc-th{grid-template-columns:44px minmax(0,1fr) 40px}',
      '.stc:not(.wide) .stc-th .tn{text-align:left}',
      '.stc:not(.wide) .stc-th .l2{grid-column:1/-1;display:grid;grid-template-columns:repeat(5,1fr);border-top:1px solid #DCE4EE}',
      '.stc:not(.wide) .stc-row{grid-template-columns:44px minmax(0,1fr) 40px;padding-top:2px}',
      '.stc:not(.wide) .stc-row .l2{grid-column:1/-1;display:grid;grid-template-columns:repeat(5,1fr);margin-top:-4px}',
      '.stc:not(.wide) .stc-cb{min-height:46px}',
      '.stc-info{display:flex;gap:14px;align-items:center;background:#F1F6FA;border:1.5px solid #D5E2EC;border-radius:12px;padding:12px 14px;margin-top:16px}',
      '.stc-info img{width:64px;height:auto;flex:none;mix-blend-mode:multiply}',
      '.stc-info .pk{color:#D2051E;font-weight:800;font-size:28px;line-height:1}',
      '.stc-info b{display:block;font-size:14.5px;margin:6px 0 4px}',
      '.stc-info p{margin:2px 0;color:' + MUTE + ';font-size:13px;font-weight:500}',
      '.stc-info small{display:block;color:' + MUTE + ';font-size:11px;margin-top:6px}',
      '.stc-wbox{background:#F1F6FA;border:1.5px solid #D5E2EC;border-radius:12px;padding:12px 14px;margin-top:18px}',
      '.stc-wbox b{display:block;font-size:14.5px;font-weight:800}',
      '.stc-wbox span{display:block;color:' + MUTE + ';font-size:13px;font-weight:500;margin-top:3px}',
      /* wheels */
      '.stc-wh{cursor:pointer}',
      '.stc-wh rect.t{fill:#2B3442;transition:fill .15s}',
      '.stc-wh.g rect.t{fill:#1F9D55}.stc-wh.ok rect.t{fill:' + AMBER + '}.stc-wh.p rect.t{fill:' + RED + '}',
      /* tablet layout */
      '@media (min-width:700px){',
      ' .stc-card{padding:26px 28px 26px}.stc-rule{margin:0 -28px 18px}.stc-logo{height:52px}.stc-brt b{font-size:22px}.stc-brt div{font-size:15px}.stc-hilti{height:44px}',
      ' .stc-h1{font-size:34px}.stc-intro{font-size:15px}',
      ' .stc-tgrid{grid-template-columns:200px minmax(0,1fr) 200px;gap:0 12px}',
      ' .stc-col{display:flex;flex-direction:column;gap:12px}.stc-col .gap{display:block;flex:1}',
      ' .stc-tire{grid-column:auto!important;grid-row:auto!important}',
      ' .stc-tr.cnd{flex-wrap:nowrap}.stc-tr.cnd .stc-lab{width:46px;padding-top:0}.stc-tr.cnd .stc-cond{flex:1}',
      ' .stc-tr{min-height:34px}.stc-tv{padding:14px 14px}',
      ' .stc-diag{align-self:stretch;align-items:stretch}',
      ' .stc-diag{grid-column:2;grid-row:1}.stc-col.l{grid-column:1;grid-row:1}.stc-col.r{grid-column:3;grid-row:1}',
      ' .stc-diag svg{max-width:none;width:100%;height:100%}',
      ' .stc-win{grid-template-columns:repeat(3,minmax(0,1fr));gap:4px 12px}.stc-opts{grid-template-columns:repeat(3,auto);justify-content:start;gap:0 8px}.stc-win .stc-chip{gap:5px;padding:0;font-size:14.5px}',
      ' .stc-lights{grid-template-columns:1fr 1fr}',
      ' .stc-wrong{grid-template-columns:repeat(4,1fr)}',
      '}'
    ].join('\n');
    var st = document.createElement('style'); st.id = 'stc-css'; st.textContent = C; document.head.appendChild(st);
  }

  /* ---------- tones: which picks read as bad (red) or so-so (amber) ---------- */
  function tone(fid, v) {
    if (v === 'Out' || v === 'P' || v === 'Crack' || /\.broken$/.test(fid)) return ' bad';
    if (v === 'Chip' || (v === 'OK' && /^tire\./.test(fid))) return ' mid';
    if (/^wrong\./.test(fid) && fid !== 'wrong.none') return ' bad';
    return '';
  }
  /* one-of groups: picking one clears the others */
  function exclusive(sheet, fid) {
    var m = /^tool\.(.+)\.(onTruck|onSite|working|broken)$/.exec(fid);
    if (m) return ['tool.' + m[1] + '.' + ({ onTruck: 'onSite', onSite: 'onTruck', working: 'broken', broken: 'working' })[m[2]]];
    if (fid === 'wrong.none') return SPECS.truck.sections[3].options.filter(function (o) { return o.id !== 'wrong.none'; }).map(function (o) { return o.id; });
    if (/^wrong\./.test(fid) && fid !== 'wrong.describe') return ['wrong.none'];
    return [];
  }

  /* ---------- builders ---------- */
  function chip(fid, v, label, extra) { return '<button type="button" class="stc-chip' + (extra || '') + '" data-f="' + fid + '" data-v="' + esc(v) + '" aria-pressed="false"><span class="stc-sq"></span>' + (label == null ? '' : '<span>' + esc(label) + '</span>') + '</button>'; }
  function field(f, fill) {
    var lab = '<span class="stc-lab">' + esc(f.label) + '</span>';
    if (f.type === 'date' || f.type === 'time') {
      return lab + '<label class="stc-dt" data-dt="' + f.type + '" data-f="' + f.id + '"><span class="stc-dtv" data-ph="' + (f.type === 'date' ? 'Tap for today' : 'Tap for now') + '"></span>'
        + '<input type="' + f.type + '" tabindex="-1" aria-label="' + esc(f.label) + '"><button type="button" class="stc-now" data-now="' + f.id + '">' + (f.type === 'date' ? 'Today' : 'Now') + '</button></label>';
    }
    if (f.type === 'mdy') {
      return lab + '<div class="stc-mdy">' + f.parts.map(function (p, i) {
        return '<label>' + p + '<input type="text" inputmode="numeric" pattern="[0-9]*" maxlength="' + (i === 2 ? 4 : 2) + '" class="' + (i === 2 ? 'yr' : '') + '" data-f="' + f.id + '.' + p.toLowerCase() + '" data-mdy="1" aria-label="' + esc(f.label + ' ' + p) + '"></label>';
      }).join('') + '</div>';
    }
    var num = f.type === 'number';
    return lab + '<input class="stc-in" type="text" ' + (num ? 'inputmode="numeric" pattern="[0-9]*" ' : 'autocapitalize="words" ') + 'autocomplete="off" data-f="' + f.id + '"' + (fill ? ' data-fill="' + fill + '"' : '') + ' aria-label="' + esc(f.label) + '">';
  }
  function fillFor(id) { return (id === 'hdr.employee' || id === 'foot.checkedBy') ? 'user' : ''; }
  function brand(spec, A) {
    var logo = '<img class="stc-logo" src="' + A + 'storm-logo.svg" alt="STORM Basement Waterproofing">';
    if (spec.sheet === 'tools') return '<div class="stc-brand">' + logo + '<div class="stc-brt"><img class="stc-hilti" src="' + A + 'hilti.png" alt="HILTI"><b>' + esc(spec.brandHeader.title) + '</b></div></div>';
    var s = spec.brandHeader.subtitle;
    return '<div class="stc-brand">' + logo + '<div class="stc-brt"><b>' + esc(spec.brandHeader.title) + '</b><div>' + esc(s[0]) + '<br>' + esc(s[1]).replace('85 PSI', '<u>85 PSI</u>') + '</div></div></div>';
  }
  function headerBox(spec) {
    var h = '<div class="stc-hbox"><span class="stc-status" aria-live="polite"></span>', rows = spec.header;
    rows.forEach(function (r, ri) { r.forEach(function (f, ci) { h += '<div class="stc-hf c' + (ci + 1) + (ri === rows.length - 1 ? ' last' : '') + '">' + field(f, fillFor(f.id)) + '</div>'; }); });
    return h + '</div>';
  }
  function footer(spec) {
    return '<div class="stc-foot">' + spec.footer.map(function (f) { return '<div class="stc-hf">' + field(f, fillFor(f.id)) + '</div>'; }).join('') + '</div><div class="stc-note">' + esc(spec.footnote) + '</div>';
  }
  function tireCard(t) {
    var a = t.fields[0], c = t.fields[1], r = t.fields[2];
    return '<div class="stc-tire" id="stc-t-' + t.id + '"><h4>' + esc(t.label) + '</h4><div class="stc-tb">'
      + '<div class="stc-tr"><span class="stc-lab">TARGET</span><span class="stc-tgt">' + esc(t.target) + '</span></div>'
      + '<div class="stc-tr"><span class="stc-lab">ACTUAL</span><input class="stc-in" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="3" data-f="' + a.id + '" aria-label="' + esc(t.label) + ' actual PSI"><span class="stc-unit">PSI</span></div>'
      + '<div class="stc-tr cnd"><span class="stc-lab">COND</span><div class="stc-cond">' + c.options.map(function (o) { return chip(c.id, o, o, tone(c.id, o)); }).join('') + '</div></div>'
      + '<div class="stc-tr"><span class="stc-lab">TREAD</span><input class="stc-in" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="2" data-f="' + r.id + '" aria-label="' + esc(t.label) + ' tread"><span class="stc-unit">/32</span></div>'
      + '</div></div>';
  }
  function truckSvg(A) {
    /* proportions taken from the paper top view: box 413x496 (drawn longer so the tire cards line up on a tablet), cab 387x165, front wheels beside the cab, duals outside the box */
    function wheel(id, x, y) { return '<g class="stc-wh" data-wheel="' + id + '"><rect class="t" x="' + x + '" y="' + y + '" width="30" height="36" rx="7"/><rect x="' + (x + 11) + '" y="' + (y + 9) + '" width="8" height="18" rx="4" fill="#AEB8C6"/><circle cx="' + (x + 15) + '" cy="' + (y + 18) + '" r="2" fill="#2B3442"/></g>'; }
    return '<svg viewBox="0 0 360 400" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Truck top view, tap a tire">'
      + '<text x="180" y="16" text-anchor="middle" font-size="12" font-weight="800" fill="' + INK + '" font-family="Montserrat,Arial">FRONT \u25B2</text>'
      + '<rect x="110" y="26" width="140" height="62" rx="9" fill="#E3E9F1" stroke="#2B3442" stroke-width="2"/>'
      + '<rect x="118" y="34" width="124" height="12" rx="5" fill="#BFE6F8"/>'
      + '<rect x="114" y="29" width="10" height="5" rx="2" fill="#F8C537"/><rect x="236" y="29" width="10" height="5" rx="2" fill="#F8C537"/>'
      + '<rect x="104" y="33" width="5" height="11" rx="2" fill="#2B3442"/><rect x="251" y="33" width="5" height="11" rx="2" fill="#2B3442"/>'
      + '<path d="M120 50 L120 66 M240 50 L240 66 M120 50 L240 50" stroke="#9AA7B8" stroke-width="1" fill="none"/>'
      + '<text x="180" y="78" text-anchor="middle" font-size="9" font-weight="700" fill="#5A6B80" font-family="Montserrat,Arial">CAB</text>'
      + '<rect x="105" y="91" width="150" height="279" rx="5" fill="#F6F8FB" stroke="#2B3442" stroke-width="2"/>'
      + '<image href="' + A + 'storm-logo.svg" x="118" y="196" width="124" height="32"/>'
      + '<rect x="112" y="352" width="136" height="12" rx="2" fill="none" stroke="#B9C4D2" stroke-width="1"/><path d="M180 352 v12" stroke="#B9C4D2"/>'
      + wheel('fl', 72, 36) + wheel('fr', 258, 36)
      + wheel('rli', 72, 266) + wheel('rlo', 38, 266) + wheel('rri', 258, 266) + wheel('rro', 292, 266)
      + '<text x="180" y="392" text-anchor="middle" font-size="12" font-weight="800" fill="' + INK + '" font-family="Montserrat,Arial">REAR</text>'
      + '</svg>';
  }
  function buildTruck(spec, A) {
    var s = spec.sections, tv = s[0], win = s[1], li = s[2], wr = s[3];
    var h = brand(spec, A) + '<div class="stc-rule"></div><h1 class="stc-h1">' + esc(spec.heading) + '</h1><p class="stc-intro">' + esc(spec.intro) + '</p>' + headerBox(spec);
    h += '<div class="stc-sec stc-tv"><div class="stc-tvh"><h3 class="stc-st">' + esc(tv.title) + '</h3><span class="stc-leg">' + esc(tv.legend) + '</span></div><div class="stc-tgrid">'
      + '<div class="stc-diag">' + truckSvg(A) + '</div>';
    /* phone: cards pair up left/right in paper order; tablet: left column, truck, right column like the paper */
    h += '<div class="stc-col l">' + tireCard(tv.left[0]) + '<div class="gap"></div>' + tireCard(tv.left[1]) + tireCard(tv.left[2]) + '</div>';
    h += '<div class="stc-col r">' + tireCard(tv.right[0]) + '<div class="gap"></div>' + tireCard(tv.right[1]) + tireCard(tv.right[2]) + '</div>';
    h += '</div></div>';
    h += '<div class="stc-sec"><h3 class="stc-st">' + esc(win.title) + '</h3><div class="stc-win">' + win.groups.map(function (g) {
      return '<div class="stc-wg"><h5>' + esc(g.label) + '</h5><div class="stc-opts">' + g.options.map(function (o) { return chip(g.id, o, o, tone(g.id, o)); }).join('') + '</div></div>';
    }).join('') + '</div></div>';
    h += '<div class="stc-sec"><h3 class="stc-st">' + esc(li.title) + '</h3><div class="stc-lights">' + li.columns.map(function (col) {
      return '<div>' + col.map(function (l) { return '<div class="stc-lrow"><span>' + esc(l.label) + '</span>' + li.options.map(function (o) { return chip(l.id, o, o, tone(l.id, o)); }).join('') + '</div>'; }).join('') + '</div>';
    }).join('') + '</div></div>';
    h += '<div class="stc-sec"><h3 class="stc-st">' + esc(wr.title) + '</h3><div class="stc-wrong">' + wr.options.map(function (o) { return chip(o.id, '1', o.label, tone(o.id, '1')); }).join('') + '</div>'
      + '<div class="stc-desc"><span class="stc-lab">' + esc(wr.describe.label) + '</span><textarea rows="1" data-f="' + wr.describe.id + '" aria-label="Describe it"></textarea></div></div>';
    h += '<div class="stc-warn">' + esc(spec.warning) + '</div>' + footer(spec);
    return h;
  }
  function toolTable(sec, A, cols) {
    var h = '<div class="stc-sec"><h3 class="stc-st">' + esc(sec.title) + '</h3><div class="stc-tbl"><div class="stc-th"><span></span><span class="tn">TOOL</span><span>QTY</span><div class="l2">'
      + cols.map(function (c) { return '<span>' + esc(c).replace('ON JOB SITE', 'ON JOB<br>SITE') + '</span>'; }).join('') + '</div></div>';
    sec.rows.forEach(function (r) {
      var b = 'tool.' + r.id + '.';
      h += '<div class="stc-row"><img src="' + A + r.img + '" alt="" loading="lazy" width="40" height="34"><div class="stc-tn"><b>' + esc(r.name) + '</b><small>' + esc(r.model) + '</small></div><div class="stc-q">' + r.qty + '</div><div class="l2">'
        + ['onTruck', 'onSite', 'working', 'broken'].map(function (k, i) { return '<button type="button" class="stc-cb stc-chip' + tone(b + k, '1') + '" data-f="' + b + k + '" data-v="1" aria-pressed="false" aria-label="' + esc(r.name + ' ' + cols[i]) + '"><span class="stc-sq"></span></button>'; }).join('')
        + '<div><input class="stc-init" type="text" maxlength="4" autocapitalize="characters" autocomplete="off" data-f="' + b + 'init" data-fill="initials" aria-label="' + esc(r.name) + ' initials"></div></div></div>';
    });
    return h + '</div></div>';
  }
  function buildTools(spec, A) {
    var cols = spec.tableColumns.slice(2);
    var h = brand(spec, A) + '<div class="stc-rule"></div><h1 class="stc-h1">' + esc(spec.heading) + '</h1><p class="stc-intro">' + esc(spec.intro) + '</p>' + headerBox(spec);
    spec.sections.forEach(function (sec) {
      if (sec.type === 'info') {
        h += '<div class="stc-info"><img src="' + A + sec.img + '" alt="ProKit stack line drawing"><div><div class="pk">' + esc(sec.brand) + '</div><b>' + esc(sec.title) + '</b>'
          + sec.lines.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('') + '<small>' + esc(sec.small) + '</small></div></div>';
      } else h += toolTable(sec, A, cols);
    });
    h += '<div class="stc-wbox"><b>' + esc(spec.warning.bold) + '</b><span>' + esc(spec.warning.sub) + '</span></div>' + footer(spec);
    return h;
  }

  /* ---------- field list (for progress) ---------- */
  function allFields(spec) {
    var out = [];
    spec.header.forEach(function (r) { r.forEach(function (f) { if (f.type === 'mdy') f.parts.forEach(function (p) { out.push(f.id + '.' + p.toLowerCase()); }); else out.push(f.id); }); });
    if (spec.sheet === 'truck') {
      var s = spec.sections;
      s[0].left.concat(s[0].right).forEach(function (t) { t.fields.forEach(function (f) { out.push(f.id); }); });
      s[1].groups.forEach(function (g) { out.push(g.id); });
      s[2].columns.forEach(function (c) { c.forEach(function (l) { out.push(l.id); }); });
      out.push('wrong'); out.push('wrong.describe');
    } else {
      spec.sections.forEach(function (sec) { (sec.rows || []).forEach(function (r) { ['loc', 'cond', 'init'].forEach(function (k) { out.push('tool.' + r.id + '.' + k); }); }); });
    }
    spec.footer.forEach(function (f) { out.push(f.id); });
    return out;
  }

  /* ---------- open ---------- */
  function open(container, opts) {
    opts = opts || {};
    css();
    var sheet = opts.sheet === 'tools' ? 'tools' : 'truck', spec = SPECS[sheet];
    var A = opts.assetBase || DEFAULT_ASSETS;
    var vals = {}, meta = {}, localAt = {}, timers = {}, rec = { sheet: sheet, truck: '', period: '' };
    var root = document.createElement('div');
    root.className = 'stc stc-' + sheet;
    root.innerHTML = '<div class="stc-card">' + (sheet === 'tools' ? buildTools(spec, A) : buildTruck(spec, A)) + '</div>';
    container.innerHTML = ''; container.appendChild(root);
    var statusEl = root.querySelector('.stc-status'), statusT = 0;

    function wide() { var w = root.clientWidth || container.clientWidth || window.innerWidth; root.classList.toggle('wide', w >= 600); }
    wide();
    var ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(wide); ro.observe(root); } else window.addEventListener('resize', wide);

    function els(fid) { return root.querySelectorAll('[data-f="' + fid + '"]'); }
    function paint(fid) {
      var v = vals[fid] == null ? '' : String(vals[fid]);
      Array.prototype.forEach.call(els(fid), function (el) {
        if (el.tagName === 'BUTTON') { var on = v !== '' && el.getAttribute('data-v') === v; el.classList.toggle('on', on); el.setAttribute('aria-pressed', on ? 'true' : 'false'); }
        else if (el.tagName === 'LABEL') {
          var t = el.getAttribute('data-dt');
          el.querySelector('.stc-dtv').textContent = t === 'date' ? fmtDate(v) : fmtTime(v);
          var inp = el.querySelector('input'); if (inp.value !== v) inp.value = v;
          el.classList.toggle('has', !!v);
        } else if (document.activeElement !== el && el.value !== v) { el.value = v; if (el.tagName === 'TEXTAREA') grow(el); }
      });
      var m = /^tire\.(\w+)\./.exec(fid); if (m) paintWheel(m[1]);
    }
    function paintWheel(id) {
      var g = root.querySelector('[data-wheel="' + id + '"]'); if (!g) return;
      var c = vals['tire.' + id + '.cond'];
      g.setAttribute('class', 'stc-wh' + (c === 'G' ? ' g' : c === 'OK' ? ' ok' : c === 'P' ? ' p' : ''));
    }
    function grow(t) { t.style.height = '40px'; t.style.height = Math.max(40, t.scrollHeight) + 'px'; }

    /* A change is only sent once the record has its key (TRUCK # and DATE). Taps made before that wait in pending
       and go out, with their own times, as soon as both are filled. */
    var pending = {};
    function send(fid, value, at) {
      if (typeof opts.onChange !== 'function') return;
      try { opts.onChange({ sheet: sheet, truck: rec.truck, period: rec.period, fieldId: fid, value: value, by: (meta[fid] || {}).by || opts.user || '', at: at }); } catch (e) { if (window.console) console.error(e); }
    }
    function emit(fid, value) {
      var at = Date.now(); localAt[fid] = at; meta[fid] = { by: opts.user || '', at: at };
      if (fid === 'hdr.truck' || fid === 'hdr.date') { pending[fid] = at; rekey(); return; }
      if (rec.truck && rec.period) send(fid, value, at); else pending[fid] = at;
    }
    function set(fid, value, silent) {
      value = value == null ? '' : String(value);
      if ((vals[fid] || '') === value) return;
      if (value === '') delete vals[fid]; else vals[fid] = value;
      paint(fid);
      if (!silent) emit(fid, value);
    }
    function rekey() {
      var t = (vals['hdr.truck'] || '').trim(), p = vals['hdr.date'] || '';
      var moved = t !== rec.truck || p !== rec.period, had = !!(rec.truck && rec.period);
      rec.truck = t; rec.period = p;
      if (!t || !p) return;
      if (moved && typeof opts.onKey === 'function') { try { opts.onKey({ sheet: sheet, truck: t, period: p }); } catch (e) {} }
      /* new key: send everything typed so far under it (a corrected TRUCK # or DATE carries the entries with it) */
      var ids = moved && had ? Object.keys(vals) : Object.keys(pending);
      if (moved && had) Object.keys(pending).forEach(function (k) { if (ids.indexOf(k) < 0) ids.push(k); });
      ids.forEach(function (k) { send(k, vals[k] == null ? '' : vals[k], (meta[k] || {}).at || Date.now()); });
      pending = {};
    }
    function flushText(el) {
      var fid = el.getAttribute('data-f'); clearTimeout(timers[fid]); delete timers[fid];
      var v = el.value.replace(/\s+$/, ''); if (el.classList.contains('stc-init')) v = v.toUpperCase();
      set(fid, v);
    }

    /* taps */
    function onClick(e) {
      var now = e.target.closest('[data-now]');
      if (now && root.contains(now)) {
        e.preventDefault(); e.stopPropagation();
        var lab = now.closest('[data-dt]'); set(lab.getAttribute('data-f'), lab.getAttribute('data-dt') === 'date' ? todayISO() : nowHM()); return;
      }
      var dt = e.target.closest('[data-dt]');
      if (dt && root.contains(dt) && !dt.classList.contains('has')) {
        e.preventDefault(); set(dt.getAttribute('data-f'), dt.getAttribute('data-dt') === 'date' ? todayISO() : nowHM()); return;
      }
      var wh = e.target.closest('[data-wheel]');
      if (wh && root.contains(wh)) {
        var card = root.querySelector('#stc-t-' + wh.getAttribute('data-wheel'));
        if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); var inp = card.querySelector('input'); setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (x) {} }, 350); }
        return;
      }
      var b = e.target.closest('button[data-f]');
      if (!b || !root.contains(b) || opts.readOnly) return;
      var fid = b.getAttribute('data-f'), v = b.getAttribute('data-v'), cur = vals[fid] || '';
      var next = cur === v ? '' : v;
      set(fid, next);
      if (next) exclusive(sheet, fid).forEach(function (o) { if (vals[o]) set(o, ''); });
    }
    function onInput(e) {
      var el = e.target, fid = el.getAttribute && el.getAttribute('data-f');
      if (!fid) {
        var lab = el.closest && el.closest('[data-dt]');
        if (lab && el.tagName === 'INPUT') set(lab.getAttribute('data-f'), el.value); /* native date/time picker */
        return;
      }
      if (el.getAttribute('data-mdy')) {
        el.value = el.value.replace(/\D/g, '');
        if (el.value.length >= +el.getAttribute('maxlength') || (el.maxLength === 2 && el.value.length === 2)) {
          var nx = el.parentNode.nextElementSibling; nx = nx && nx.querySelector('input'); if (nx) nx.focus();
        }
      }
      if (el.getAttribute('inputmode') === 'numeric') el.value = el.value.replace(/[^\d.]/g, '');
      if (el.tagName === 'TEXTAREA') grow(el);
      clearTimeout(timers[fid]);
      if (fid === 'hdr.truck') { delete timers[fid]; return; } /* v203: TRUCK # picks the record, so it only counts once typed (change / blur / Enter), never "1" on the way to "12" */
      timers[fid] = setTimeout(function () { flushText(el); }, 600);
    }
    function onChangeEv(e) {
      var el = e.target;
      if (el.getAttribute && el.getAttribute('data-f') && el.tagName !== 'BUTTON' && el.tagName !== 'LABEL') { flushText(el); return; }
      var lab = el.closest && el.closest('[data-dt]'); if (lab && el.tagName === 'INPUT') set(lab.getAttribute('data-f'), el.value);
    }
    /* tap an empty EMPLOYEE / CHECKED BY / INIT. box: it fills with this phone's name or initials, selected, so typing replaces it */
    function onFill(e) {
      var el = e.target, f = el.getAttribute && el.getAttribute('data-fill');
      if (!f || el.value || opts.readOnly) return;
      var v = f === 'initials' ? (opts.initials || '') : (opts.user || '');
      if (!v) return;
      el.value = v; set(el.getAttribute('data-f'), v);
      try { el.setSelectionRange(0, v.length); } catch (x) {}
    }
    function onBlur(e) { var el = e.target; if (el.getAttribute && el.getAttribute('data-f') && timers[el.getAttribute('data-f')]) flushText(el); }
    function onKeyDown(e) { if (e.key === 'Enter' && e.target.tagName === 'INPUT') { e.preventDefault(); e.target.blur(); } }
    root.addEventListener('click', onClick);
    root.addEventListener('input', onInput);
    root.addEventListener('change', onChangeEv);
    root.addEventListener('click', onFill);
    root.addEventListener('focusout', onBlur);
    root.addEventListener('keydown', onKeyDown);

    /* data */
    function load(data, isRemote) {
      data = data || {};
      var f = data.fields || data;
      Object.keys(f).forEach(function (k) {
        if (k === 'sheet' || k === 'truck' || k === 'period') return;
        var x = f[k], v = x && typeof x === 'object' ? x.v : x, at = x && typeof x === 'object' ? +x.at || 0 : 0;
        if (isRemote) {
          if (localAt[k] && at && at < localAt[k]) return;          /* our newer tap wins */
          var el = root.querySelector('[data-f="' + k + '"]');
          if (el && document.activeElement === el) return;           /* never yank a field out from under a thumb */
        }
        if (x && typeof x === 'object') meta[k] = { by: x.by || '', at: at };
        set(k, v, true);
      });
    }
    function setData(record) {
      Object.keys(vals).forEach(function (k) { delete vals[k]; paint(k); });
      record = record || {}; pending = {};
      rec.truck = record.truck || ''; rec.period = record.period || '';
      load(record, false);
      if (!vals['hdr.truck'] && rec.truck) set('hdr.truck', rec.truck, true);
      if (!vals['hdr.date'] && rec.period) set('hdr.date', rec.period, true);
      rec.truck = (vals['hdr.truck'] || '').trim(); rec.period = vals['hdr.date'] || '';
    }
    setData(opts.data);
    if (opts.readOnly) root.querySelectorAll('input,textarea').forEach(function (x) { x.readOnly = true; });

    var total = allFields(spec);
    return {
      el: root, sheet: sheet,
      applyRemote: function (fields) { load({ fields: fields || {} }, true); },
      setData: setData,
      getData: function () { var o = {}; Object.keys(vals).forEach(function (k) { o[k] = { v: vals[k], by: (meta[k] || {}).by || '', at: (meta[k] || {}).at || 0 }; }); return { sheet: sheet, truck: rec.truck, period: rec.period, fields: o }; },
      progress: function () {
        var d = 0;
        total.forEach(function (id) {
          if (id === 'wrong') { if (Object.keys(vals).some(function (k) { return /^wrong\./.test(k) && k !== 'wrong.describe'; })) d++; return; }
          var m = /^tool\.(.+)\.(loc|cond)$/.exec(id);
          if (m) { var b = 'tool.' + m[1] + '.'; if (m[2] === 'loc' ? (vals[b + 'onTruck'] || vals[b + 'onSite']) : (vals[b + 'working'] || vals[b + 'broken'])) d++; return; }
          if (vals[id]) d++;
        });
        return { done: d, total: total.length };
      },
      setStatus: function (t) { clearTimeout(statusT); statusEl.textContent = t || ''; statusEl.classList.toggle('on', !!t); if (t && /saved/i.test(t)) statusT = setTimeout(function () { statusEl.classList.remove('on'); }, 1600); },
      destroy: function () {
        Object.keys(timers).forEach(function (k) { clearTimeout(timers[k]); });
        root.querySelectorAll('[data-f]').forEach(function (el) { if (timers[el.getAttribute('data-f')]) flushText(el); });
        if (ro) ro.disconnect(); else window.removeEventListener('resize', wide);
        if (root.parentNode) root.parentNode.removeChild(root);
      }
    };
  }

  window.stormTruckCheck = { version: VERSION, specs: SPECS, open: open, today: todayISO };
})();


/* v203 wiring (Hark, 2026-11-11, Dave approved 21:23): Box Truck Pre Check and Tool Checklist open as fillable phone forms.
   - MORE / Resource Center > Checklists rows (and the old drawer rows) go through openChecklist(); the v75 code asks
     window.stormTC203.render() first, which fills #chk-view with the form (window.stormTruckCheck, above). The paper sheet
     (pages, zoom, Print) is one tap away: "View / print paper copy" (and "Fill it in on the phone" to come back).
   - One record per sheet + TRUCK # + DATE. DATE starts as today; the record loads as soon as TRUCK # is filled.
   - Every tap / typed box is queued (localStorage, survives a reload or no signal) and sent with saveTruckCheckFields,
     one call at a time, retried 2 s -> 5 -> 10 -> 30 s, on 'online' and on every live-sync stamp change.
     Anyone can fill it in (crew or manager); no manager token.
   - Live: the v180 stamp poll calls window.stormTruckCheckRefresh() when the stamp moves; the open record is re-read
     (getTruckCheck) and patched in place with applyRemote. A box with a change of ours that is queued, in flight, or newer
     than the read is left alone, and the module never touches the box being typed in. */
(function () {
  if (window.stormTC203) return;
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/';
  var AB = BASE + 'assets/truckcheck/';
  var MAP = { 'box-truck': 'truck', 'tools': 'tools' };
  var QK = 'stormTruckCheckQueueV1';
  var DELAYS = [2000, 5000, 10000, 30000];
  var cur = null, lastTruck = {}, inflight = null, retryT = 0, err = 0, flushT = 0, fetchSeq = 0;
  var lastLocal = {}, savedAt = {};
  var queue = (function () { try { var q = JSON.parse(localStorage.getItem(QK) || '{}'); return q && typeof q === 'object' ? q : {}; } catch (e) { return {}; } })();
  function persist() { try { if (Object.keys(queue).length) localStorage.setItem(QK, JSON.stringify(queue)); else localStorage.removeItem(QK); } catch (e) {} }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }
  function isMgr() { try { return !!(window.stormAccess && window.stormAccess.isMgr && window.stormAccess.isMgr()); } catch (e) { return false; } }
  function devName() { try { return String(localStorage.getItem('stormDeviceNameV1') || '').trim().slice(0, 60); } catch (e) { return ''; } }
  function who() { return devName() || (isMgr() ? 'Manager' : 'Crew'); }
  function initials(n) { return String(n || '').split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0); }).join('').slice(0, 3).toUpperCase(); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function keyOf(s, t, p) { return s + '|' + t + '|' + p; }
  function status(t) { try { if (cur && cur.h) cur.h.setStatus(t); } catch (e) {} }

  var css = document.createElement('style'); css.id = 'storm-v203-css';
  css.textContent = ''
    + '#chk-view .tc203-body { padding: 10px 12px calc(28px + env(safe-area-inset-bottom, 0px)) !important; max-width: 1000px !important; margin: 0 auto !important; box-sizing: border-box; }'
    + '#chk-view .tc203-links { display: flex; justify-content: flex-end; margin: 0 2px 8px; }'
    + '#chk-view .tc203-link { display: inline-flex; align-items: center; gap: 6px; min-height: 34px; padding: 0 12px; border: 0; border-radius: 17px; background: #fff; color: #1A8FC4; font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; font-size: 13px; font-weight: 700; box-shadow: 0 1px 2px rgba(15,23,32,.06); cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }'
    + '#chk-view .tc203-link svg { width: 16px; height: 16px; flex: none; }'
    + '#chk-view .tc203-link:active { background: rgba(41,168,224,.08); }'
    + '#chk-view .tc203-host { min-height: 60vh; }'
    + '#chk-view[data-tc203] > .detail-bar { position: sticky; top: 0; z-index: 6 !important; background: #EEF2F7 !important; }'
    + '#chk-view .stc .stc-tbl, #chk-view .stc .stc-card { overflow: visible !important; }' /* overflow: clip stopped the heading row from sticking */
    + '#chk-view .stc .stc-tbl > :first-child { border-radius: 11px 11px 0 0; } #chk-view .stc .stc-tbl > :last-child { border-radius: 0 0 11px 11px; }'
    + '#chk-view .stc .stc-th { top: var(--tc203-top, 0px) !important; z-index: 4 !important; box-shadow: 0 1px 0 #DCE4EE; }'
    /* the overlay pages' boxed white inputs (v176) are not for this form: its boxes are the paper's write-on lines */
    + 'html body #chk-view .stc input, html body #chk-view .stc textarea { background: transparent !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }'
    + 'html body #chk-view .stc .stc-hbox .stc-in { border-bottom: 1.5px solid transparent !important; }'
    + 'html body #chk-view .stc .stc-tr .stc-in, html body #chk-view .stc .stc-mdy input, html body #chk-view .stc .stc-desc textarea, html body #chk-view .stc .stc-foot .stc-in { border-bottom: 1.5px solid #9AA7B8 !important; }'
    + 'html body #chk-view .stc .stc-init { border-bottom: 1.5px solid #B9C4D2 !important; }'
    + 'html body #chk-view .stc input:focus, html body #chk-view .stc textarea:focus { border-bottom-color: #29A8E0 !important; }'
    + '@media (max-width: 380px) { html body #chk-view .stc .stc-logo { height: 30px; } html body #chk-view .stc .stc-brt b { font-size: 12.5px; } html body #chk-view .stc .stc-brt div { font-size: 10.5px; } html body #chk-view .stc .stc-hilti { height: 24px; } html body #chk-view .stc .stc-mdy { gap: 3px; } html body #chk-view .stc .stc-mdy input { width: 28px; } html body #chk-view .stc .stc-mdy input.yr { width: 36px; } }' /* the tool table's heading row sticks under the page bar, not over it */
    /* Item details swipe (Dave 21:48): the v166 photo cover is drawn edge to edge of the box (strip included), so it never takes padding */
    + 'html body #detail canvas.st166-cover { padding: 0 !important; }';
  document.head.appendChild(css);
  var PAPER_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>';
  var FORM_ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8.5 11l2 2 4-4"/><path d="M8.5 17h7"/></svg>';

  /* ---------- sending ---------- */
  function enqueue(c) {
    if (!c || !c.truck || !c.period || !c.fieldId) return;
    var k = keyOf(c.sheet, c.truck, c.period);
    var q = queue[k] || (queue[k] = { sheet: c.sheet, truck: c.truck, period: c.period, by: who(), f: {} });
    q.f[c.fieldId] = c.value == null ? '' : String(c.value); q.by = who();
    lastLocal[k + '|' + c.fieldId] = Date.now();
    persist(); status('Saving\u2026');
    clearTimeout(flushT); flushT = setTimeout(flush, 120);
  }
  function retryLater() { clearTimeout(retryT); retryT = setTimeout(function () { retryT = 0; flush(); }, DELAYS[err]); err = Math.min(err + 1, DELAYS.length - 1); }
  function flush() {
    clearTimeout(flushT); flushT = 0;
    if (inflight) return;
    var keys = Object.keys(queue); if (!keys.length) return;
    var r = run(); if (!r) { retryLater(); return; }
    var k = keys[0], q = queue[k]; delete queue[k]; persist();
    var changes = Object.keys(q.f).map(function (f) { return { fieldId: f, value: q.f[f] }; });
    inflight = { k: k, q: q };
    r.withSuccessHandler(function () {
      inflight = null; err = 0; var now = Date.now();
      Object.keys(q.f).forEach(function (f) { savedAt[k + '|' + f] = now; });
      try { localStorage.setItem(QK + '.ok', String(now)); } catch (e) {}
      if (cur && cur.key === k && !queue[k]) status('Saved');
      if (Object.keys(queue).length) flush();
    }).withFailureHandler(function () {
      inflight = null;
      /* put back what was not changed again meanwhile */
      var back = queue[k] || (queue[k] = { sheet: q.sheet, truck: q.truck, period: q.period, by: q.by, f: {} });
      Object.keys(q.f).forEach(function (f) { if (!(f in back.f)) back.f[f] = q.f[f]; });
      persist();
      if (cur && cur.key === k) status('Not saved yet \u00b7 retrying');
      retryLater();
    }).saveTruckCheckFields(q.truck, q.period, changes, q.by, q.sheet);
  }
  function busyField(k, f, since) {
    if (queue[k] && f in queue[k].f) return true;
    if (inflight && inflight.k === k && f in inflight.q.f) return true;
    return (lastLocal[k + '|' + f] || 0) >= since || (savedAt[k + '|' + f] || 0) >= since;
  }

  /* ---------- reading ---------- */
  function fetchRec() {
    if (!cur || !cur.truck || !cur.period) return;
    var r = run(); if (!r) return;
    var seq = ++fetchSeq, k = cur.key, since = Date.now(), h = cur.h;
    r.withSuccessHandler(function (res) {
      if (seq !== fetchSeq || !cur || cur.key !== k || cur.h !== h || !res || !res.fields) return;
      var out = {};
      Object.keys(res.fields).forEach(function (f) {
        if (f === '__submitted') { try { if (window.stormTC206) window.stormTC206.remote(k, res.fields[f], since); } catch (e) {} return; } /* v206: the submission, not a box on the form */
        if (f === 'hdr.truck' || f === 'hdr.date' || busyField(k, f, since)) return;
        var x = res.fields[f] || {};
        out[f] = { v: x.v == null ? '' : String(x.v), by: x.by || '', at: 0 }; /* at 0: phone clocks differ from the server's; our own changes are held back above */
      });
      try { h.applyRemote(out); } catch (e) {}
    }).withFailureHandler(function () {}).getTruckCheck(cur.truck, cur.period, cur.sheet);
  }
  window.stormTruckCheckRefresh = function () { if (Object.keys(queue).length) flush(); if (cur) fetchRec(); };
  window.addEventListener('online', function () { err = 0; flush(); if (cur) fetchRec(); });

  /* ---------- the page ---------- */
  function render(c, v, paper) {
    var sheet = MAP[c && c.id]; if (!sheet || !window.stormTruckCheck || !v) return false;
    close();
    v.setAttribute('data-tc203', c.id);
    v.innerHTML = '<div class="detail-bar"><button class="detail-close" type="button" data-chk-close aria-label="Close">&times;</button><div style="font-weight:700;font-size:17px">' + esc(c.name) + '</div></div>'
      + '<div class="detail-body tc203-body"><div class="tc203-links"><button type="button" class="tc203-link" data-tc203-paper>' + PAPER_ICO + 'View / print paper copy</button></div><div class="tc203-host"></div></div>';
    var user = devName();
    var period = window.stormTruckCheck.today(), truck = lastTruck[sheet] || '';
    cur = { c: c, v: v, paper: paper, sheet: sheet, truck: truck, period: period, key: keyOf(sheet, truck, period), h: null };
    var me = cur;
    me.h = window.stormTruckCheck.open(v.querySelector('.tc203-host'), {
      sheet: sheet, user: user, initials: initials(user), assetBase: AB,
      data: { sheet: sheet, truck: truck, period: period, fields: {} },
      onChange: function (ch) { enqueue(ch); },
      onKey: function (k) {
        if (cur !== me) return;
        me.truck = k.truck; me.period = k.period; me.key = keyOf(sheet, k.truck, k.period); lastTruck[sheet] = k.truck;
        fetchRec();
      }
    });
    function barTop() { try { var bar = v.querySelector('.detail-bar'), bs = bar && getComputedStyle(bar), hh = bar ? Math.round(bar.getBoundingClientRect().height) : 0; if (hh && (bs.position === 'sticky' || bs.position === 'fixed')) v.style.setProperty('--tc203-top', hh + 'px'); return hh; } catch (e) { return 1; } }
    if (!barTop()) requestAnimationFrame(function () { if (!barTop()) setTimeout(barTop, 400); }); /* the page is still hidden on the first call */
    if (truck) fetchRec();
    if (Object.keys(queue).length) flush();
    return true;
  }
  function close() {
    if (!cur) return;
    var c = cur; cur = null; fetchSeq++;
    try { if (c.h) { var d = c.h.getData(); if (d && d.truck) lastTruck[c.sheet] = d.truck; } } catch (e) {}
    /* destroy() sends any box still waiting on its typing pause; route it to the queue even though cur is gone */
    try { c.h && c.h.destroy(); } catch (e) {}
    try { if (c.v) c.v.removeAttribute('data-tc203'); } catch (e) {}
  }
  function showPaper(v) {
    if (!cur || cur.v !== v) return;
    var c = cur.c, paper = cur.paper; close();
    v.innerHTML = paper;
    var body = v.querySelector('.detail-body');
    if (body) body.insertAdjacentHTML('afterbegin', '<div class="tc203-links"><button type="button" class="tc203-link" data-tc203-form="' + esc(c.id) + '">' + FORM_ICO + 'Fill it in on the phone</button></div>');
    v.__tc203c = c; v.__tc203p = paper; v.scrollTop = 0;
  }
  function showForm(v) {
    var c = v.__tc203c, paper = v.__tc203p; if (!c) return;
    if (render(c, v, paper)) v.scrollTop = 0;
  }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var p = t.closest('#chk-view [data-tc203-paper]'); if (p) { e.preventDefault(); showPaper(p.closest('#chk-view')); return; }
    var f = t.closest('#chk-view [data-tc203-form]'); if (f) { e.preventDefault(); showForm(f.closest('#chk-view')); return; }
  });
  /* the app closes or reuses #chk-view without us in a few places: drop the form when its host leaves the page */
  setInterval(function () { if (cur && (!cur.v.isConnected || !cur.v.classList.contains('open') || !cur.v.contains(cur.h && cur.h.el))) close(); }, 1000);
  setTimeout(function () { if (Object.keys(queue).length) flush(); }, 4000);

  window.stormTC203 = { render: render, close: close, flush: flush, queue: function () { return JSON.parse(JSON.stringify(queue)); }, current: function () { return cur; },
    /* v206: Save & Submit sends through the same queue; who() is the name the boxes are saved under */
    enqueue: enqueue, who: who, failing: function () { return err > 0; }, busy: function (k, f) { return !!((queue[k] && f in queue[k].f) || (inflight && inflight.k === k && f in inflight.q.f)); } };
})();

/* v204 (Hark, 2026-11-11 21:15, Dave): Insurance Certificates > contact > Email no longer jumps straight to the email.
   1. Tapping "Email Lindsey" / "Email Suzanne" opens a customer search linked to Jobber (searchJobberClients on the server:
      ALL Jobber clients incl. quote/estimate-only clients and leads; name, address, phone, email). Live results, debounced, X clears.
   2. Tapping a result opens the email with that customer's name, property address, phone and email filled in.
   3. "Skip, continue to email" opens the email with blank Customer information lines.
   4. New body: no "for STORM Basement Waterproofing LLC" line; "Certificate holder" replaced by a "Customer information" section.
   Read-only: nothing is written to Jobber or the Sheet. The contact page's mailto href is rewritten to the skipped (blank) version,
   so if this block fails the button still opens a clean email. Base globals untouched. */
(function () {
  if (window.__stormV204) return; window.__stormV204 = 1;
  var SUBJ = 'Certificate of Insurance request \u2013 STORM Basement Waterproofing';
  var INS = {
    'lindseym@alliance-group.net': { name: 'Lindsey', company: 'Alliance Group', ask: 'workers comp' },
    'suzannes@paris-kirwan.com': { name: 'Suzanne', company: 'Paris-Kirwan', ask: 'general liability and disability' }
  };
  var BG = '#EAF0F7', INK = '#0F1720', MUTE = '#6B7280', LINE = '#DCE4EE', BLUE = '#29A8E0', BLUED = '#1A8FC4';
  function e$(x) { return document.getElementById(x); }
  function h(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }

  /* ---- email text ---- */
  function body(c, cu) {
    cu = cu || {};
    return 'Hi ' + c.name + ',\n\n'
      + 'Could you please send a ' + c.ask + ' certificate of insurance for the customer below?\n\n'
      + 'Customer information\n'
      + 'Name: ' + (cu.name || '') + '\n'
      + 'Property address: ' + (cu.address || '') + '\n'
      + 'Phone: ' + (cu.phone || '') + '\n'
      + 'Email: ' + (cu.email || '') + '\n\n'
      + 'Thank you,\n';
  }
  function mailto(email, c, cu) { return 'mailto:' + email + '?subject=' + encodeURIComponent(SUBJ) + '&body=' + encodeURIComponent(body(c, cu)); }
  window.stormInsMailto204 = function (email, cu) { var c = INS[String(email).toLowerCase()]; return c ? mailto(email, c, cu) : ''; }; /* harness / How to Use */
  function openMail(href) {
    /* same mechanism as the old button (a real <a target=_blank> tap), fired inside the user's tap */
    var a = document.createElement('a'); a.href = href; a.target = '_blank'; a.rel = 'noopener'; a.style.display = 'none';
    document.body.appendChild(a);
    window.__ins204last = href;
    try { a.click(); } catch (e) { try { location.href = href; } catch (x) {} }
    setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 0);
  }

  /* ---- CSS ---- */
  var I = 'html body #ins204';
  var css = ''
    + I + ' { position: fixed; inset: 0; z-index: 2147483100; display: flex; flex-direction: column; background: ' + BG + '; color: ' + INK + '; font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; opacity: 0; transform: translateY(18px); transition: opacity .2s ease, transform .24s cubic-bezier(.2,.8,.2,1); pointer-events: none; -webkit-tap-highlight-color: transparent; }'
    + I + '.open { opacity: 1; transform: none; pointer-events: auto; }'
    + I + ' .i3-top { flex: none; padding: calc(10px + max(var(--st-sat, 0px), env(safe-area-inset-top))) 16px 6px; display: flex; align-items: center; gap: 12px; max-width: 760px; width: 100%; box-sizing: border-box; margin: 0 auto; }'
    + I + ' .i3-x { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 0; background: #fff; color: ' + INK + '; box-shadow: 0 1px 3px rgba(15,23,32,.12); font-size: 24px; line-height: 1; display: flex; align-items: center; justify-content: center; cursor: pointer; padding: 0; }'
    + I + ' .i3-tt { flex: 1; min-width: 0; }'
    + I + ' .i3-tt b { display: block; font-size: 18px; font-weight: 800; line-height: 1.2; }'
    + I + ' .i3-tt small { display: block; margin-top: 2px; font-size: 13px; font-weight: 600; color: ' + MUTE + '; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + I + ' .i3-q { flex: none; max-width: 760px; width: 100%; box-sizing: border-box; margin: 0 auto; padding: 8px 16px 4px; }'
    + I + ' .i3-field { position: relative; display: flex; align-items: center; background: #fff; border: 1.5px solid ' + LINE + '; border-radius: 14px; box-shadow: 0 1px 2px rgba(15,23,32,.05); transition: border-color .15s; }'
    + I + ' .i3-field:focus-within { border-color: ' + BLUE + '; }'
    + I + ' .i3-field svg { flex: none; width: 20px; height: 20px; margin-left: 14px; }'
    + I + ' .i3-field input { flex: 1; min-width: 0; height: 50px; border: 0; outline: 0; background: transparent; padding: 0 8px 0 10px; font: 600 16px/1.2 Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: ' + INK + '; -webkit-appearance: none; appearance: none; }'
    + I + ' .i3-field input::placeholder { color: #9AA6B2; font-weight: 500; }'
    + I + ' .i3-field input::-webkit-search-cancel-button { display: none; -webkit-appearance: none; }'
    + I + ' .i3-clr { flex: none; display: none; width: 28px; height: 28px; margin-right: 11px; border-radius: 50%; border: 0; padding: 0; background: #E3E9F0; color: #4B5563; font-size: 18px; line-height: 1; align-items: center; justify-content: center; cursor: pointer; }'
    + I + ' .i3-field.has .i3-clr { display: flex; }'
    + I + ' .i3-st { min-height: 18px; padding: 8px 4px 2px; font-size: 13px; font-weight: 600; color: ' + MUTE + '; }'
    + I + ' .i3-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; overscroll-behavior: contain; }'
    + I + ' .i3-in { max-width: 760px; margin: 0 auto; padding: 6px 16px 16px; box-sizing: border-box; display: flex; flex-direction: column; gap: 10px; }'
    + I + ' .i3-r { display: block; width: 100%; text-align: left; border: 0; background: #fff; border-radius: 14px; padding: 13px 14px; box-shadow: 0 1px 2px rgba(15,23,32,.06), 0 4px 14px rgba(15,23,32,.06); color: ' + INK + '; font-family: inherit; cursor: pointer; transition: transform .12s ease, box-shadow .12s ease; }'
    + I + ' .i3-r:active, ' + I + ' .i3-r.hit { transform: scale(.985); box-shadow: 0 0 0 2px ' + BLUE + '; }'
    + I + ' .i3-n { display: flex; align-items: center; gap: 8px; font-size: 16px; font-weight: 800; line-height: 1.25; }'
    + I + ' .i3-n span { min-width: 0; overflow-wrap: anywhere; }'
    + I + ' .i3-ph { white-space: nowrap; }'
    + I + ' .i3-lead { flex: none; padding: 2px 8px; border-radius: 9px; border: 1px solid ' + LINE + '; color: ' + MUTE + '; font-size: 11px; font-weight: 700; letter-spacing: .02em; }'
    + I + ' .i3-lead { font-style: normal; }'
    + I + ' .i3-p { margin-top: 1px; font-size: 13px; font-weight: 600; color: ' + MUTE + '; overflow-wrap: anywhere; }'
    + I + ' .i3-a { margin-top: 3px; font-size: 14px; font-weight: 600; color: #374151; overflow-wrap: anywhere; }'
    + I + ' .i3-c { margin-top: 3px; font-size: 13px; font-weight: 500; color: ' + MUTE + '; overflow-wrap: anywhere; }'
    + I + ' .i3-c i { font-style: normal; color: #B6C0CC; padding: 0 6px; }'
    + I + ' .i3-em { padding: 26px 8px; text-align: center; font-size: 14px; font-weight: 600; color: ' + MUTE + '; line-height: 1.45; }'
    + I + ' mark { background: rgba(41,168,224,.16); color: inherit; border-radius: 3px; padding: 0 1px; }'
    + I + ' .i3-foot { flex: none; padding: 10px 16px calc(12px + max(var(--st-sab, 0px), env(safe-area-inset-bottom))); background: ' + BG + '; border-top: 1px solid rgba(15,23,32,.06); }'
    + I + ' .i3-skip { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; max-width: 728px; margin: 0 auto; min-height: 52px; border-radius: 14px; border: 1.5px solid ' + BLUE + '; background: #fff; color: ' + BLUED + '; font: 700 16px/1.2 Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; cursor: pointer; padding: 0 16px; box-sizing: border-box; }'
    + I + ' .i3-skip svg { width: 18px; height: 18px; flex: none; }'
    + I + ' .i3-skip:active { background: #F2F9FD; }'
    + I + ' .i3-spin { display: inline-block; width: 12px; height: 12px; margin-right: 6px; vertical-align: -1px; border: 2px solid ' + LINE + '; border-top-color: ' + BLUE + '; border-radius: 50%; animation: i3spin .7s linear infinite; }'
    + '@keyframes i3spin { to { transform: rotate(360deg); } }'
    + '@media (min-width: 700px) { ' + I + ' .i3-tt b { font-size: 20px; } ' + I + ' .i3-in { gap: 12px; } }'
    + '@media (prefers-reduced-motion: reduce) { ' + I + ' { transition: none; transform: none; } }';
  var st = document.createElement('style'); st.id = 'storm-v204-css'; st.textContent = css;
  function put() { (document.head || document.documentElement).appendChild(st); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();

  var GLASS = '<svg viewBox="0 0 24 24" fill="none" stroke="' + MUTE + '" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>';
  var MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="' + BLUED + '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

  /* ---- contact page: note text + blank-template href (fallback if this block is gone) ---- */
  function patchView() {
    var v = e$('res-view'); if (!v) return;
    var a = v.querySelector('a.st-ins-mail'); if (!a || a.getAttribute('data-ins204')) return;
    var em = String(a.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0], c = INS[em.toLowerCase()]; if (!c) return;
    a.setAttribute('data-ins204', em); a.setAttribute('href', mailto(em, c, null));
    var n = v.querySelector('.res-note'); if (n) n.textContent = 'For commercial permits (towns) and customer homes. Tap Email, then pick the customer from Jobber (or skip).';
  }
  function watch() {
    if (!document.body) return setTimeout(watch, 50);
    var mo = new MutationObserver(function () { patchView(); });
    mo.observe(document.body, { childList: true, subtree: true });
    patchView();
  }
  watch();

  /* ---- search sheet ---- */
  var cur = null, seq = 0, tmr = 0, memo = {}, lastQ = '';
  function sheet() {
    var s = e$('ins204'); if (s) return s;
    s = document.createElement('div'); s.id = 'ins204'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-modal', 'true'); s.setAttribute('aria-labelledby', 'i3-title');
    s.innerHTML = '<div class="i3-top"><button class="i3-x" type="button" data-i3-close aria-label="Close">&times;</button><div class="i3-tt"><b id="i3-title">Pick the customer</b><small id="i3-sub"></small></div></div>'
      + '<div class="i3-q"><div class="i3-field" id="i3-field">' + GLASS + '<input id="i3-in" type="search" inputmode="search" enterkeyhint="search" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Search Jobber: name, address, phone, email" aria-label="Search Jobber clients"><button class="i3-clr" type="button" data-i3-clear aria-label="Clear search">&times;</button></div><div class="i3-st" id="i3-st" aria-live="polite"></div></div>'
      + '<div class="i3-list" id="i3-list"><div class="i3-in" id="i3-res"></div></div>'
      + '<div class="i3-foot"><button class="i3-skip" type="button" data-i3-skip>' + MAIL + '<span>Skip, continue to email</span></button></div>';
    document.body.appendChild(s);
    var inp = e$('i3-in');
    inp.addEventListener('input', function () { e$('i3-field').classList.toggle('has', !!inp.value); queue(inp.value); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); clearTimeout(tmr); search(inp.value); try { inp.blur(); } catch (x) {} }
      else if (e.key === 'Escape') { e.preventDefault(); close(true); }
    });
    return s;
  }
  function stat(t) { var x = e$('i3-st'); if (x) x.innerHTML = t || ''; }
  function idle() { stat('Search every Jobber client: jobs, quotes and leads.'); e$('i3-res').innerHTML = ''; }
  function open(email) {
    var c = INS[String(email).toLowerCase()]; if (!c) return false;
    cur = { email: email, c: c };
    var s = sheet(), inp = e$('i3-in');
    e$('i3-sub').textContent = 'Email to ' + c.name + ' \u00b7 ' + c.company;
    inp.value = ''; e$('i3-field').classList.remove('has'); lastQ = ''; seq++; idle();
    e$('i3-list').scrollTop = 0;
    s.style.display = ''; void s.offsetWidth; s.classList.add('open');
    try { history.pushState({ overlay: 'res-view', ins204: 1 }, ''); } catch (x) {}
    setTimeout(function () { try { inp.focus({ preventScroll: true }); } catch (x) { try { inp.focus(); } catch (y) {} } }, 60);
    return true;
  }
  function close(viaUi) {
    var s = e$('ins204'); if (!s || !s.classList.contains('open')) return;
    s.classList.remove('open'); clearTimeout(tmr); seq++;
    try { e$('i3-in').blur(); } catch (x) {}
    if (viaUi && history.state && history.state.ins204) { try { history.back(); } catch (x) {} }
  }
  window.addEventListener('popstate', function () { if (!(history.state && history.state.ins204)) close(false); });

  function queue(q) {
    clearTimeout(tmr);
    q = String(q || '').replace(/\s+/g, ' ').trim();
    if (q.length < 2) { seq++; lastQ = ''; idle(); return; }
    if (memo[q.toLowerCase()]) { search(q); return; }
    stat('<span class="i3-spin"></span>Searching Jobber\u2026');
    tmr = setTimeout(function () { search(q); }, 300);
  }
  function search(q) {
    q = String(q || '').replace(/\s+/g, ' ').trim(); if (q.length < 2) return;
    var key = q.toLowerCase(); lastQ = q;
    if (memo[key]) { paint(q, memo[key]); return; }
    var r = run(), my = ++seq;
    if (!r) { stat(''); e$('i3-res').innerHTML = '<div class="i3-em">No connection to Jobber right now.<br>Tap Skip to write the customer in yourself.</div>'; return; }
    stat('<span class="i3-spin"></span>Searching Jobber\u2026');
    r.withSuccessHandler(function (res) {
      if (my !== seq) return;
      if (res && res.authorized && res.clients) { memo[key] = res; paint(q, res); return; }
      stat('');
      e$('i3-res').innerHTML = '<div class="i3-em">' + (res && res.authorized === false ? 'Jobber isn\u2019t connected to the app right now.' : 'Jobber didn\u2019t answer. Try again in a moment.') + '<br>Tap Skip to write the customer in yourself.</div>';
    }).withFailureHandler(function () {
      if (my !== seq) return; stat('');
      e$('i3-res').innerHTML = '<div class="i3-em">Couldn\u2019t reach Jobber. Check your signal and try again,<br>or tap Skip to write the customer in yourself.</div>';
    }).searchJobberClients(q);
  }
  function mk(t, q) {
    t = h(t); var ws = String(q).toLowerCase().split(' ').filter(function (w) { return w.length > 1; });
    ws.forEach(function (w) { var re = new RegExp('(' + h(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'); t = t.replace(re, '\u0001$1\u0002'); });
    return t.replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
  }
  var rows = [];
  function paint(q, res) {
    rows = res.clients || [];
    var n = rows.length;
    stat(n ? (n + (res.more ? '+' : '') + ' match' + (n === 1 ? '' : 'es') + ' in Jobber' + (res.more ? ' \u00b7 keep typing to narrow it down' : '')) : '');
    e$('i3-res').innerHTML = n ? rows.map(function (c, i) {
      var contact = [c.phone ? '<span class="i3-ph">' + mk(c.phone, q) + '</span>' : '', c.email ? mk(c.email, q) : ''].filter(Boolean).join('<i>\u00b7</i>');
      return '<button class="i3-r" type="button" data-i3-pick="' + i + '"><div class="i3-n"><span>' + mk(c.name || 'No name', q) + '</span>' + (c.lead ? '<em class="i3-lead">Lead</em>' : '') + '</div>'
        + (c.contact ? '<div class="i3-p">' + mk(c.contact, q) + '</div>' : '')
        + (c.address ? '<div class="i3-a">' + mk(c.address, q) + '</div>' : '') + (contact ? '<div class="i3-c">' + contact + '</div>' : '') + '</button>';
    }).join('') : '<div class="i3-em">No Jobber client matches \u201c' + h(q) + '\u201d.<br>Try part of the name, street, phone or email, or tap Skip.</div>';
  }

  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var a = t.closest('#res-view a.st-ins-mail');
    if (a) {
      var em = a.getAttribute('data-ins204') || String(a.getAttribute('href') || '').replace(/^mailto:/i, '').split('?')[0];
      if (INS[em.toLowerCase()]) { e.preventDefault(); e.stopImmediatePropagation(); open(em); }
      return;
    }
    if (!t.closest('#ins204')) return;
    if (t.closest('[data-i3-close]')) { e.preventDefault(); close(true); return; }
    if (t.closest('[data-i3-clear]')) { e.preventDefault(); var inp = e$('i3-in'); inp.value = ''; e$('i3-field').classList.remove('has'); queue(''); try { inp.focus(); } catch (x) {} return; }
    if (t.closest('[data-i3-skip]')) { e.preventDefault(); if (cur) { openMail(mailto(cur.email, cur.c, null)); setTimeout(function () { close(true); }, 250); } return; }
    var p = t.closest('[data-i3-pick]');
    if (p && cur) {
      e.preventDefault(); var cu = rows[+p.getAttribute('data-i3-pick')]; if (!cu) return;
      p.classList.add('hit');
      openMail(mailto(cur.email, cur.c, cu));
      setTimeout(function () { close(true); }, 250);
    }
  }, true);
})();

/* v205 (Hark, 2026-11-11, Dave batch H): forgiving (fuzzy) search. Typos, trade slang and size spellings find the item
   ("sump pmp", "hydralic cement", "bubbler pot", "1 1/2 pvc", "chek valve"). StormFuzzy (matcher) + STORM_SEARCH_TERMS
   (hidden terms for 145 items, looked up by SKU first, then by bin) are inlined here. window.stormSearch205:
     rank(q)    -> { bins: [best first], rank: { bin: i } }  threshold 0.6, relCut 0.2 (cached per query + item list)
     closest(q) -> [bin, ...] up to 3, threshold 0.45 (the "Closest matches" row when nothing matches)
   The index is built once and rebuilt only when a bin, name or SKU changes (not on the 2 s live-sync count patches); it is
   pre-built when the browser is idle after load and when a search box gets focus, so the first keystroke never waits.
   Index.html v157 filtered() keeps the old substring test as a fallback (Detail column, SEARCH_TAGS, SEARCH_TAGS_SKU) and
   puts ranked hits first; render() shows a flat ranked list while there is a query. Receiving Orders "Add item not on the
   list" uses the same ranking. Pairs with app v157. */
(function () {
  if (window.stormSearch205) return;

/* STORM Inventory fuzzy search (prototype, Hark 2026-11-11). No dependencies, ~6 KB.
 *
 *   var idx = StormFuzzy.buildIndex(items, searchTerms);   // items: [{bin, name, sku, ...}], searchTerms: search-terms.json object
 *   var hits = StormFuzzy.search(idx, 'sump pmp');          // [{item, bin, score}], best first, score >= 0.6
 *
 * Scoring: each query token is matched to its best token on the item (name, SKU, bin, hidden terms), each item token
 * used once. Token similarity = exact 1; prefix 0.86-1 (partial words); Damerau-Levenshtein (OSA) 1 - d/len with the
 * first letter kept; numbers match exactly. Term-only hits count 0.96 so a name hit ranks first. Item score = mean over
 * query tokens. Kept: score >= threshold (0.6) and within relCut (0.2) of the best hit, so junk tails drop away.
 */
(function (root) {
  'use strict';
  var STOP = { 'in': 1, 'inch': 1, 'inches': 1, 'x': 1, 'the': 1, 'a': 1, 'an': 1, 'of': 1, 'for': 1, 'with': 1, 'and': 1, 'to': 1, 'w': 1, 'or': 1, 'ft': 1, 'deg': 1, 'degree': 1, 'degrees': 1 };
  var UNIT = { ft: 'ft', feet: 'ft', foot: 'ft', lb: 'lb', lbs: 'lb', oz: 'oz', gal: 'gal', gallon: 'gal', gallons: 'gal', qt: 'qt', quart: 'qt', quarts: 'qt', hp: 'hp', tpi: 'tpi', amp: 'amp', amps: 'amp', mil: 'mil', ah: 'ah', pack: 'pk', pk: 'pk', piece: 'pk', pieces: 'pk', pc: 'pk', pcs: 'pk', count: 'pk', ct: 'pk', pair: 'pk' };
  var DEN = { 2: 1, 3: 1, 4: 1, 8: 1, 16: 1 };

  function fmt(v) { return String(Math.round(v * 1000) / 1000); }
  function frac(n, d) { n = +n; d = +d; return (DEN[d] && n > 0 && n < d) ? n / d : null; }

  function normalize(s) {
    s = String(s == null ? '' : s).toLowerCase();
    s = s.replace(/\u00bd/g, ' 1/2').replace(/\u00bc/g, ' 1/4').replace(/\u00be/g, ' 3/4')
      .replace(/[\u2033\u201c\u201d]/g, '"').replace(/[\u2032\u2018\u2019`]/g, "'")
      .replace(/\u00d7/g, ' x ').replace(/\u00b0/g, ' ');
    s = s.replace(/\bs\s*&\s*d\b/g, ' sd ').replace(/&/g, ' and ').replace(/\bw\//g, ' with ');
    s = s.replace(/(\d)\s*'\s*(\d)/g, '$1ft $2').replace(/(\d)\s*'/g, '$1ft ').replace(/(\d)\s*"/g, '$1 in ');
    s = s.replace(/(^|[^\d\/])11\/2(?![\d\/])/g, '$11-1/2');                       /* "11/2" typed for 1-1/2 */
    s = s.replace(/(\d+)[\s-]+(\d+)\/(\d+)(?![\d\/])/g, function (m, w, n, d) { var f = frac(n, d); return f == null ? m : ' ' + fmt(+w + f) + ' '; });
    s = s.replace(/(^|[^\d.\/])(\d+)\/(\d+)(?![\d\/])/g, function (m, p, n, d) { var f = frac(n, d); return f == null ? m : p + ' ' + fmt(f) + ' '; });
    s = s.replace(/(^|\s)\.(\d)/g, '$10.$2');                                     /* .5 -> 0.5 */
    s = s.replace(/\bpack of (\d+)/g, '$1 pk').replace(/\((\d+)\)/g, ' $1 pk ');
    s = s.replace(/\b(hd|rt|az|hi)\s*-?\s*0*(\d{1,3})\b/g, '$1$2');                  /* bins: hd-01 / hd 1 -> hd1 */
    s = s.replace(/(\d)(in|inch|inches)\b/g, '$1 in');
    s = s.replace(/(\d)\s*-?\s*([a-z]+)\b/g, function (m, d, u) { return UNIT[u] ? d + UNIT[u] : m; });
    s = s.replace(/[^a-z0-9.\s]+/g, ' ').replace(/\.(?!\d)/g, ' ').replace(/(^|[^\d])\./g, '$1 ');
    return s.replace(/\s+/g, ' ').trim();
  }
  function stem(t) {
    if (t.length < 4 || /\d/.test(t)) return t;
    if (/ies$/.test(t)) return t.slice(0, -3) + 'y';
    if (/(ss|sh|ch|x)es$/.test(t)) return t.slice(0, -2);
    if (/s$/.test(t) && !/(ss|us|is)$/.test(t)) return t.slice(0, -1);
    return t;
  }
  function tokenize(s) {
    var raw = normalize(s).split(' '), out = [], i, t;
    for (i = 0; i < raw.length; i++) { t = raw[i]; if (t && !STOP[t]) out.push(stem(t)); }
    return out;
  }

  var NUM = /^\d+(\.\d+)?$/, NUMUNIT = /^(\d+(?:\.\d+)?)([a-z]+)$/;
  /* optimal string alignment distance with cutoff */
  function osa(a, b, max) {
    var la = a.length, lb = b.length, i, j;
    if (Math.abs(la - lb) > max) return max + 1;
    var p2 = [], p = [], c = [];
    for (j = 0; j <= lb; j++) p[j] = j;
    for (i = 1; i <= la; i++) {
      c = [i]; var rowMin = i;
      for (j = 1; j <= lb; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        var v = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, p2[j - 2] + 1);
        c[j] = v; if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      p2 = p; p = c;
    }
    return p[lb];
  }
  function maxD(n) { return n <= 5 ? 1 : n <= 8 ? 2 : 3; }

  /* similarity of query token q to item token t (0..1); code = SKU/bin token (exact or prefix only) */
  function sim(q, t, code, joined) {
    if (q === t) return 1;
    var ql = q.length, tl = t.length;
    if (code) return (ql >= 4 && t.indexOf(q) === 0) ? 0.9 : 0;   /* SKU / bin: exact or a 4+ char prefix */
    if (NUM.test(q)) {                                        /* numbers: exact, or a number+unit ("80" ~ "80lb") */
      var m = NUMUNIT.exec(t); return (m && m[1] === q && m[2] !== 'pk') ? 0.85 : 0;
    }
    if (NUM.test(t) || ql < 3) return 0;
    if (t.indexOf(q) === 0) return 0.86 + 0.14 * ql / tl;     /* partial word */
    if (!joined && tl >= 4 && q.indexOf(t) === 0) return 0.75 + 0.2 * tl / ql;
    if (q[0] !== t[0] && !(q[0] === t[1] && q[1] === t[0])) return 0;
    var best = 0, L = Math.max(ql, tl), d = osa(q, t, maxD(L));
    if (d <= maxD(L)) best = 1 - d / L;
    if (ql >= 4 && tl > ql + 1) {                             /* misspelled partial word: "hydrali" ~ "hydraulic" */
      var d2 = osa(q, t.slice(0, ql), ql <= 6 ? 1 : 2);
      if (d2 <= (ql <= 6 ? 1 : 2)) best = Math.max(best, (1 - d2 / ql) * 0.92);
    }
    best *= 0.97;
    return best >= 0.7 ? best : 0;
  }

  function addTok(map, tok, w) { if (tok && !STOP[tok] && !(map[tok] >= w)) map[tok] = w; }
  function addText(map, text, w, join) {
    var toks = tokenize(text), i;
    for (i = 0; i < toks.length; i++) {
      addTok(map, toks[i], w);
      if (join && i + 1 < toks.length && !NUM.test(toks[i])) addTok(map, toks[i] + toks[i + 1], w);
    }
  }

  function buildIndex(items, terms) {
    terms = terms || {};
    var bySku = {}, k, vocab = {}, vlist = [], out = [];
    for (k in terms) if (Object.prototype.hasOwnProperty.call(terms, k) && terms[k] && terms[k].sku) bySku[String(terms[k].sku).trim()] = terms[k];
    function vid(tok, code) { var key = (code ? '#' : '') + tok; if (!(key in vocab)) { vocab[key] = vlist.length; vlist.push({ t: tok, code: code }); } return vocab[key]; }
    (items || []).forEach(function (it) {
      if (!it) return;
      var bin = String(it.bin || ''), sku = String(it.sku == null ? '' : it.sku).trim();
      var entry = (sku && bySku[sku]) || terms[bin] || terms[bin.toLowerCase()] || terms[bin.toUpperCase()] || null;
      var name = {}, term = {}, code = {};
      addText(name, it.name, 1, true);
      if (entry && entry.terms) entry.terms.forEach(function (t) { addText(term, t, 0.96, true); });
      tokenize(bin).forEach(function (t) { code[t] = 1; });
      if (sku) { code[sku.toLowerCase().replace(/[^a-z0-9]/g, '')] = 1; tokenize(sku).forEach(function (t) { code[t] = 1; }); }
      var ids = [], ws = [], seen = {};
      function put(map, isCode) { for (var t in map) { var id = vid(t, isCode); if (seen[id] == null) { seen[id] = ids.length; ids.push(id); ws.push(map[t]); } else ws[seen[id]] = Math.max(ws[seen[id]], map[t]); } }
      put(name, false); put(term, false); put(code, true);
      /* primary phrases: the item's first 3 terms (what it IS); a query that matches one word-for-word ranks first */
      var prim = [];
      if (entry && entry.terms) entry.terms.slice(0, 3).forEach(function (t) { var pt = tokenize(t); if (pt.length) prim.push(pt.map(function (x) { return vid(x, false); })); });
      out.push({ item: it, bin: bin, ids: ids, ws: ws, prim: prim, nlen: tokenize(it.name).length || 1 });
    });
    return { rows: out, vocab: vlist };
  }

  function search(index, query, opts) {
    opts = opts || {};
    var threshold = opts.threshold == null ? 0.6 : opts.threshold, relCut = opts.relCut == null ? 0.2 : opts.relCut;
    var q = tokenize(query); if (!q.length || !index) return [];
    var V = index.vocab, n = q.length, i, j, r;
    /* query-token x vocab similarity, computed once per search */
    var S = [], joins = [];
    /* v205: rows cached per token on the index, so typing "sump p", "sump pm", ... reuses the "sump" row */
    var RC = index._rc || (index._rc = { n: 0, m: {} });
    function rowFor(tok, joined) {
      var key = (joined ? '+' : '') + tok, row = RC.m[key]; if (row) return row;
      row = new Float32Array(V.length); for (var jj = 0; jj < V.length; jj++) row[jj] = sim(tok, V[jj].t, V[jj].code, joined);
      if (++RC.n > 400) { RC.m = {}; RC.n = 1; }
      RC.m[key] = row; return row;
    }
    for (i = 0; i < n; i++) S.push(rowFor(q[i], false));
    for (i = 0; i + 1 < n; i++) joins.push(rowFor(q[i] + q[i + 1], true));
    var res = [];
    for (r = 0; r < index.rows.length; r++) {
      var R = index.rows[r], used = {}, sc = new Array(n), nameHit = 0;
      /* greedy one-to-one: query tokens with the strongest match claim item tokens first */
      var order = [];
      for (i = 0; i < n; i++) { var b = 0; for (j = 0; j < R.ids.length; j++) { var v0 = S[i][R.ids[j]] * R.ws[j]; if (v0 > b) b = v0; } order.push([b, i]); }
      order.sort(function (a, c) { return c[0] - a[0]; });
      for (var o = 0; o < n; o++) {
        var qi = order[o][1], best = 0, bj = -1;
        if (order[o][0] <= 0) { sc[qi] = 0; continue; }
        for (j = 0; j < R.ids.length; j++) { if (used[j]) continue; var v = S[qi][R.ids[j]] * R.ws[j]; if (v > best) { best = v; bj = j; } }
        sc[qi] = best; if (bj >= 0) { used[bj] = 1; if (R.ws[bj] === 1 && !V[R.ids[bj]].code) nameHit++; }
      }
      for (i = 0; i + 1 < n; i++) {                           /* "back up" ~ "backup", "sump pump" ~ "sumpump" */
        var jb = 0; for (j = 0; j < R.ids.length; j++) { var vj = joins[i][R.ids[j]] * R.ws[j]; if (vj > jb) jb = vj; }
        if (jb >= 0.85 && jb > (sc[i] + sc[i + 1]) / 2) { sc[i] = Math.max(sc[i], jb); sc[i + 1] = Math.max(sc[i + 1], jb); }
      }
      var tot = 0, wsum = 0;
      for (i = 0; i < n; i++) { var w = q[i].length <= 2 && !NUM.test(q[i]) ? 0.5 : 1; tot += sc[i] * w; wsum += w; }
      var score = tot / wsum, bonus = 0;
      if (score >= threshold) {
        for (var pi = 0; pi < R.prim.length && !bonus; pi++) {
          var P = R.prim[pi]; if (P.length !== n) continue;
          var taken = {}, all = true;
          for (var pk = 0; pk < P.length && all; pk++) { var hit = -1; for (i = 0; i < n; i++) if (!taken[i] && S[i][P[pk]] >= 0.7) { hit = i; break; } if (hit < 0) all = false; else taken[hit] = 1; }
          if (all) bonus = 0.05;
        }
        res.push({ item: R.item, bin: R.bin, score: Math.round(Math.min(1, score + bonus) * 1000) / 1000, _r: score + bonus, _n: nameHit / R.nlen, _h: nameHit });
      }
    }
    res.sort(function (a, c) { return (c._r - a._r) || (c._h - a._h) || (c._n - a._n) || String(a.item.name).localeCompare(String(c.item.name)); });
    if (res.length && relCut > 0) { var top = res[0]._r; res = res.filter(function (x) { return x._r >= top - relCut; }); }
    if (opts.limit) res = res.slice(0, opts.limit);
    res.forEach(function (x) { delete x._n; delete x._h; delete x._r; });
    return res;
  }

  var api = { normalize: normalize, tokenize: tokenize, similarity: sim, buildIndex: buildIndex, search: search };
  root.StormFuzzy = api; /* v205 inline: always the browser global */
})(typeof window !== 'undefined' ? window : this);
  var TERMS205 = {"hd-01":{"sku":"319340971","terms":["ball valve","valve","valves","ballvalve","shut off valve","shutoff","1-1/2\"","1 1/2","1.5 in","1-1/2in","pvc valve","quarter turn","everbilt","sch 40","schedule 40","discharge valve","pvc","fitting"]},"hd-02":{"sku":"100350217","terms":["concrete block","block","blocks","cinder block","cinderblock","sinder block","cmu","solid block","4x8x16","4 inch block","masonry","concrete"]},"hd-03":{"sku":"202086526","terms":["lally column","lally","jack post","support pole","7'6","7 ft 6","7.5 ft","lolly column","support post","adjustable column","steel column","basement pole","column","tiger brand","post"]},"hd-04":{"sku":"202086524","terms":["lally column","lally","jack post","support pole","6'6","6 ft 6","6.5 ft","lolly column","support post","adjustable column","steel column","basement pole","column","tiger brand","post"]},"hd-05":{"sku":"100318511","terms":["concrete","concrete mix","quikrete","quickrete","quickcrete","quikcrete","80 lb","80lb","bag of concrete","concrete bag","cement mix","floor repour","re-pour","concret"]},"hd-06":{"sku":"202188453","terms":["mortar","morter","mortar mix","rapid set","rapidset","fast set","fast setting","quick set","55 lb","55lb","patching","block repair","masonry"]},"hd-07":{"sku":"100318526","terms":["hydraulic cement","hydraulic","hydralic","hydrolic","hydraulic cememt","hydro cement","water stop","waterstop","water-stop","leak plug","plug leaks","stop leaks","quikrete","quickrete","50 lb","cement"]},"hd-08":{"sku":"100003547","terms":["tar","foundation tar","black tar","tar bucket","foundation coating","foundation sealer","henry","henry 101","asphalt coating","damp proofing","dampproofing","exterior waterproofing","4.75 gal","5 gal"]},"hd-09":{"sku":"202262872","terms":["hose clamp","hose clamps","hoseclamp","worm clamp","worm gear clamp","clamp","1-3/4\"","1 3/4","1.75 in","1-3/4in","2-3/4\"","2 3/4","2.75 in","2-3/4in","clamps","band clamp","stainless clamp","stainless","size 36","everbilt","10pk"]},"hd-10":{"sku":"203811646","terms":["male adapter","male adaptor","adapter","adaptor","mpt","mip","1-1/2\"","1 1/2","1.5 in","1-1/2in","male thread","threaded adapter","pump adapter","pvc adapter","pvc","fitting","sch 40","schedule 40","charlotte"]},"hd-11":{"sku":"203812129","terms":["90","90 elbow","pvc 90","90 degree","elbow","elbows","1-1/2\"","1 1/2","1.5 in","1-1/2in","elbo","ell","quarter bend","1/4 bend","pvc","fitting","sch 40","schedule 40","charlotte"]},"hd-12":{"sku":"203812169","terms":["45","45 elbow","pvc 45","45 degree","elbow","elbows","1-1/2\"","1 1/2","1.5 in","1-1/2in","elbo","ell","eighth bend","1/8 bend","pvc","fitting","sch 40","schedule 40","charlotte"]},"hd-13":{"sku":"203393551","terms":["street 45","street elbow","street ell","st 45","45","45 degree","1-1/2\"","1 1/2","1.5 in","1-1/2in","elbow","elbows","spigot elbow","dwv","pvc","fitting","charlotte"]},"hd-14":{"sku":"202985691","terms":["primer","primmer","pvc primer","clear primer","pipe primer","cpvc","oatey","otey","prime","8 oz","pvc"]},"hd-15":{"sku":"100139307","terms":["glue","glu","pvc glue","pipe glue","clear glue","pvc cement","cement","solvent cement","heavy duty cement","oatey","otey","8 oz","pvc"]},"hd-16":{"sku":"203811389","terms":["coupling","couplings","coupler","cupling","copling","pvc coupling","1-1/2\"","1 1/2","1.5 in","1-1/2in","joiner","connector","pvc","fitting","sch 40","schedule 40","charlotte"]},"hd-17":{"sku":"202259348","terms":["22.5","22 1/2","22","22.5 degree","1/16 bend","sixteenth bend","4\"","4 in","4 inch","elbow","elbows","nds","s&d","sewer and drain","downspout","discharge","pvc","fitting","hub"]},"hd-18":{"sku":"202091036","terms":["blueskin","blue skin","blu skin","wp200","wp 200","membrane","peel and stick","self adhered","waterproofing membrane","henry","exterior waterproofing","foundation wrap","roll","36 in"]},"hd-19":{"sku":"326012655","terms":["hose nozzle","nozzle","nozle","spray nozzle","garden hose","hose sprayer","water nozzle","hose","anvil","hi vis","high visibility","washdown","cleanup"]},"hd-20":{"sku":"100318195","terms":["trowel","trowels","trowl","pool trowel","finishing trowel","blue steel","14\"","14 in","14 inch","marshalltown","marshaltown","concrete finishing","finish trowel","concrete"]},"hd-21":{"sku":"202532049","terms":["footing form","footing","footer","footer form","pier footing","post footing","column footing","lally footing","plastic form","concrete form","square foot","form"]},"hd-22":{"sku":"203156788","terms":["caulk","caulking","cauk","calk","concrete caulk","crack caulk","crack sealer","masonry caulk","polyurethane","poly caulk","sealant","loctite","pl","non sag","tube","10 oz"]},"hd-23":{"sku":"308137797","terms":["tarp","tarps","heavy duty tarp","tarpaulin","cover","dirt tarp","brown tarp","everbilt","8x10","8 x 10"]},"hd-24":{"sku":"202973825","terms":["contractor bags","contracter bags","contractor bag","trash bags","garbage bags","debris bags","black bags","bags","garbage","trash","husky","42 gal","cleanup"]},"hd-25":{"sku":"202088850","terms":["ram board","ramboard","ram","floor protection","floor protector","floor cover","protection board","temporary floor","builder paper","roll","38 in","100 ft"]},"hd-26":{"sku":"100318067","terms":["float","hand float","mag float","magnesium","magnesium float","concrete float","16\"","16 in","16 inch","finishing","marshalltown","marshaltown","concrete"]},"hd-27":{"sku":"100318204","terms":["trowel","trowels","trowl","pool trowel","finishing trowel","blue steel","16\"","16 in","16 inch","marshalltown","marshaltown","concrete finishing","finish trowel","concrete"]},"hd-28":{"sku":"314718830","terms":["oscillating blade","oscillating","oscilating","multi tool blade","multitool","multi tool","1-1/4\"","1 1/4","1.25 in","1-1/4in","osc blade","starlock","diablo","metal blade","carbide","blade","blades","3pk"]},"hd-29":{"sku":"307297834","terms":["sawzall blade","sawzall","sawzal","sawsall","recip blade","reciprocating","6\"","6 in","6 inch","reciprocating blade","saw blade","blade","blades","demo demon","demo blade","nail embedded wood","diablo","carbide","10pk"]},"hd-30":{"sku":"100015928","terms":["sawzall blade","sawzall","sawzal","sawsall","recip blade","reciprocating","6\"","6 in","6 inch","metal blade","metal cutting","18 tpi","thin kerf","milwaukee","milwakee","blade","blades","5pk"]},"hd-31":{"sku":"329846964","terms":["knife","knives","utility knife","utilty knife","folding knife","box cutter","razor knife","pocket knife","lock back","cutter","husky","3pk"]},"hd-32":{"sku":"333293856","terms":["sawzall blade","sawzall","sawzal","sawsall","recip blade","reciprocating","9\"","9 in","9 inch","thick metal","metal cutting","metal blade","diablo","carbide","blade","blades","2pk"]},"hd-33":{"sku":"100053616","terms":["self feed bit","selfeed","self feed","hole bit","boring bit","wood bit","2\"","2 in","2 inch","drill bit","bit","joist bit","milwaukee","milwakee","hole for pipe"]},"hd-34":{"sku":"203115018","terms":["switchblade","switch blade","replacement blades","self feed blades","selfeed blade","self feed bit","2\"","2 in","2 inch","bit blades","blades","milwaukee","milwakee","10 blades"]},"hd-35":{"sku":"304160491","terms":["sawzall blades","sawzall","sawzal","sawsall","blade kit","blade set","assorted blades","variety pack","demolition blades","demo blades","recip blades","reciprocating","milwaukee","milwakee","13pk"]},"hd-36":{"sku":"306587154","terms":["#8 x 2","8 x 2","deck screws","deck screw","wood screws","screws","2\"","2 in","2 inch","screw","deckmate","deck mate","star drive","torx","exterior screws"]},"hd-37":{"sku":"306587134","terms":["#9 x 2-1/2","9 x 2.5","deck screws","deck screw","wood screws","screws","2-1/2\"","2 1/2","2.5 in","2-1/2in","screw","deckmate","deck mate","star drive","torx","exterior screws"]},"hd-38":{"sku":"306587131","terms":["#9 x 3","9 x 3","deck screws","deck screw","wood screws","screws","3\"","3 in","3 inch","screw","deckmate","deck mate","star drive","torx","exterior screws"]},"hd-39":{"sku":"313573845","terms":["#10 x 4","10 x 4","deck screws","deck screw","wood screws","screws","4\"","4 in","4 inch","screw","deckmate","deck mate","star drive","square drive","exterior screws"]},"hd-40":{"sku":"312754855","terms":["1/4 x 5","deck screws","deck screw","wood screws","structural screws","lag screw","5\"","5 in","5 inch","screws","screw","deckmate","deck mate","star drive","torx","exterior screws"]},"hd-41":{"sku":"100138746","terms":["1/4 x 1-3/4","1/4 x 1.75","tapcon","tapcons","tap con","tapcon screws","1-3/4\"","1 3/4","1.75 in","1-3/4in","concrete screws","concrete screw","concrete anchors","anchor","anchors","masonry screws","blue screws","hex head","block screws","25pk"]},"hd-42":{"sku":"100114651","terms":["1/4 x 2-3/4","1/4 x 2.75","tapcon","tapcons","tap con","tapcon screws","2-3/4\"","2 3/4","2.75 in","2-3/4in","concrete screws","concrete screw","concrete anchors","anchor","anchors","masonry screws","blue screws","hex head","block screws","25pk"]},"hd-43":{"sku":"100200027","terms":["1/4 x 2-1/4","1/4 x 2.25","tapcon","tapcons","tap con","tapcon screws","2-1/4\"","2 1/4","2.25 in","2-1/4in","concrete screws","concrete screw","concrete anchors","anchor","anchors","masonry screws","blue screws","hex head","block screws","25pk"]},"hd-44":{"sku":"322254108","terms":["#8 x 1/2","lath screws","lath screw","teks","tek screws","tek","1/2\"","1/2 in",".5 in","self drilling","self tapping","sheet metal screws","truss head","drill point","screws","screw"]},"hd-45":{"sku":"203531928","terms":["zip ties","zip tie","zipties","ziptie","cable ties","cable tie","11\"","11 in","11 inch","tie wraps","ty wraps","wire ties","black zip ties","big zip ties","500pk"]},"hd-46":{"sku":"326155126","terms":["utility blades","utility blade","razor blades","knife blades","box cutter blades","replacement blades","blades","refill blades","husky","100pk"]},"hd-47":{"sku":"205644545","terms":["gloves","glove","work gloves","nitrile coated","firm grip","firmgrip","large gloves","large","grip gloves","5pk"]},"hd-49":{"sku":"301394019","terms":["safety glasses","safety glass","glasses","eye protection","eyewear","safety specs","clear glasses","bison","bison life","12pk"]},"hd-50":{"sku":"203531918","terms":["zip ties","zip tie","zipties","ziptie","cable ties","cable tie","4\"","4 in","4 inch","tie wraps","ty wraps","wire ties","small zip ties","mini zip ties","100pk"]},"hd-51":{"sku":"318101659","terms":["ear plugs","earplugs","ear plug","hearing protection","ear protection","foam plugs","plugs","milwaukee","300pk"]},"hd-52":{"sku":"205337121","terms":["n95","n 95","mask","masks","dust mask","face mask","respirator","respirators","valved mask","dust","hdx","15pk"]},"hd-53":{"sku":"302782641","terms":["trench drain","channel drain","trench grate","drain grate","grate","garage drain","driveway drain","surface drain","us trench drain","9.8 ft","kit"]},"hd-54":{"sku":"313780402","terms":["1/4 x 4","sds","sds plus","sds bit","masonry bit","concrete bit","1/4\"","1/4 in",".25 in","4\"","4 in","4 inch","hammer drill bit","drill bit","bit","bits","rebar demon","rebar","diablo","carbide"]},"hd-55":{"sku":"312593058","terms":["5/8 x 12","sds","sds plus","sds bit","masonry bit","concrete bit","5/8\"","5/8 in",".625 in","12\"","12 in","12 inch","hammer drill bit","drill bit","bit","bits","rebar demon","rebar","diablo","carbide"]},"hd-56":{"sku":"313780409","terms":["1/4 x 18","sds","sds plus","sds bit","long bit","masonry bit","1/4\"","1/4 in",".25 in","18\"","18 in","18 inch","concrete bit","hammer drill bit","drill bit","bit","bits","rebar demon","rebar","diablo","carbide"]},"hd-57":{"sku":"329189880","terms":["1/4 x 18","hammer drill bit","masonry bit","concrete bit","carbide bit","long bit","1/4\"","1/4 in",".25 in","18\"","18 in","18 inch","drill bit","bit","bits","shockwave","shock wave","milwaukee","milwakee"]},"hd-58":{"sku":"100060853","terms":["simple green","simplegreen","cleaner","degreaser","all purpose cleaner","cleaning","soap","1 gal","gallon","cleanup"]},"hd-59":{"sku":"336959960","terms":["rags","rag","shop rags","towels","towel","terry","terry towels","cloth","wipes","cleanup","hdx","100pk"]},"hd-60":{"sku":"100007602","terms":["spray bottle","spray bottles","squirt bottle","trigger sprayer","bottle","zep","32 oz","quart","mist"]},"hd-61":{"sku":"206007301","terms":["beam plate","top plate","cap plate","lally plate","column plate","post plate","lally column","lally","jack post","steel plate","plate"]},"hd-62":{"sku":"302949195","terms":["floor jack","house jack","screw jack","support jack","jack","temporary support","16\"","16 in","16 inch","shoring","vestil","support"]},"hd-63":{"sku":"300862912","terms":["barb elbow","barb fitting","hose barb","barb","nylon elbow","condensate fitting","3/4\"","3/4 in",".75 in","drain fitting","dehumidifier drain","dehu drain","aprilaire drain","90 barb","mip","elbow"]},"hd-64":{"sku":"306757968","terms":["bed risers","bed riser","risers","riser","riser blocks","furniture risers","6\"","6 in","6 inch","dehumidifier risers","dehu stand","dehu risers","lift","4pk"]},"hd-65":{"sku":"315635639","terms":["packing tape","packaging tape","clear tape","box tape","shipping tape","tape","scotch","rolls"]},"hd-66":{"sku":"310614128","terms":["threaded rod","all thread","allthread","all-thread","ready rod","redi rod","3/8\"","3/8 in",".375 in","rod","hanger rod","superstrut","3/8 rod","2 ft"]},"hd-67":{"sku":"309595895","terms":["split ring","split ring hanger","ring hanger","pipe hanger","pipe hangers","hanger","1-1/2\"","1 1/2","1.5 in","1-1/2in","hangers","hinged hanger","plumbflex","plumb flex"]},"hd-68":{"sku":"301505444","terms":["j hook","j-hook","jhook","j hooks","pipe hook","pipe hanger","1-1/2\"","1 1/2","1.5 in","1-1/2in","pipe hangers","hanger","hangers","oatey","otey","dwv"]},"hd-69":{"sku":"100372302","terms":["cap","caps","rubber cap","end cap","test cap","pipe cap","1-1/2\"","1 1/2","1.5 in","1-1/2in","flex cap","qwik cap","quick cap","fernco","ferncos","dwv","pvc"]},"hd-70":{"sku":"100372303","terms":["cap","caps","rubber cap","end cap","test cap","pipe cap","2\"","2 in","2 inch","flex cap","flexible cap","fernco","ferncos","dwv","pvc"]},"hd-71":{"sku":"312584279","terms":["rmr 141","fungicide","mold","rmr141","rmr","disinfectant","mold killer","mold spray","mold treatment","mould","mildew","antimicrobial","wall treatment","1 gal"]},"hd-72":{"sku":"338014565","terms":["rmr 86","mold remover","mold","rmr86","rmr","mold stain remover","stain remover","mould","mildew","bleach","wall treatment","1 gal"]},"hd-73":{"sku":"302469150","terms":["broom","brooms","push broom","shop broom","floor broom","sweep","24\"","24 in","24 inch","razor-back","razorback","razor back","cleanup"]},"hd-74":{"sku":"100137163","terms":["90","90 elbow","90 degree","elbow","elbows","elbo","4\"","4 in","4 inch","quarter bend","1/4 bend","nds","s&d","sewer and drain","downspout","discharge","pvc","fitting","hub"]},"hd-75":{"sku":"100192743","terms":["coupling","couplings","coupler","cupling","nds","s&d","4\"","4 in","4 inch","sewer and drain","downspout","discharge","pvc","fitting","hub"]},"hd-76":{"sku":"100377412","terms":["downspout adapter","downspout","down spout","gutter adapter","downspout connector","leader adapter","4\"","4 in","4 inch","offset adapter","adapter","adaptor","2x3","s&d","gutter"]},"hd-77":{"sku":"304162971","terms":["grate","drain grate","round grate","green grate","catch basin grate","yard drain","8\"","8 in","8 inch","reln","window well drain","bubbler pot","drain","bubbler","bubbler pot grate","bubbler grate","bubler pot","bubbler pot lid"]},"hd-78":{"sku":"304162935","terms":["bullet basin","catch basin","drain basin","basin","yard drain","reln","6\"","6 in","6 inch","window well drain","bubbler pot","bubbler","drain","bubbler pot basin","bubbler basin","bubler pot","bubbler pot 6 in"]},"hd-79":{"sku":"202280933","terms":["pipe","pipes","pvc pipe","4 in pipe","sewer and drain","s&d pipe","4\"","4 in","4 inch","d2729","thin wall","jm eagle","downspout pipe","discharge pipe","solid pipe","10 ft","pvc"]},"hd-80":{"sku":"100164403","terms":["wye","wyes","y","why","45 wye","y fitting","4\"","4 in","4 inch","nds","s&d","sewer and drain","downspout","discharge","pvc","fitting","hub"]},"hd-81":{"sku":"100111278","terms":["45","45 elbow","45 degree","elbow","elbows","elbo","4\"","4 in","4 inch","eighth bend","1/8 bend","nds","s&d","sewer and drain","downspout","discharge","pvc","fitting","hub"]},"hd-82":{"sku":"100372296","terms":["fernco","ferncos","fernco coupling","rubber coupling","flex coupling","flexible coupling","3\"","3 in","3 inch","coupling","coupler","boot","mechanical coupling","dwv","pvc"]},"hd-83":{"sku":"203393232","terms":["male adapter","male adaptor","adapter","adaptor","mpt","male thread","3\"","3 in","3 inch","threaded adapter","charlotte","dwv","pvc","fitting"]},"hd-84":{"sku":"305473567","terms":["3 x 1-1/2","3 to 1-1/2","reducer","reducing coupling","rubber reducer","flex reducer","3\"","3 in","3 inch","1-1/2\"","1 1/2","1.5 in","1-1/2in","flex coupling","fernco style","coupling","plumbflex","plumb flex","pvc"]},"hd-85":{"sku":"203391597","terms":["3 x 1-1/2","3 to 1-1/2","bushing","bushings","reducer bushing","flush bushing","3\"","3 in","3 inch","1-1/2\"","1 1/2","1.5 in","1-1/2in","reducer","charlotte","dwv","pvc","fitting"]},"hd-86":{"sku":"205995229","terms":["4 x 4","rubber coupling","flex coupling","flexible coupling","mechanical coupling","fernco style","4\"","4 in","4 inch","coupling","coupler","boot","eastman","dwv","pvc"]},"hd-87":{"sku":"203393240","terms":["male adapter","male adaptor","adapter","adaptor","mpt","male thread","4\"","4 in","4 inch","threaded adapter","charlotte","dwv","pvc","fitting"]},"hd-88":{"sku":"203393212","terms":["4 x 2","4 to 2","bushing","bushings","reducer bushing","flush bushing","4\"","4 in","4 inch","2\"","2 in","2 inch","reducer","charlotte","dwv","pvc","fitting"]},"hd-89":{"sku":"100345144","terms":["2 x 1-1/2","2 to 1-1/2","bushing","bushings","reducer bushing","flush bushing","2\"","2 in","2 inch","1-1/2\"","1 1/2","1.5 in","1-1/2in","reducer","nibco","dwv","pvc","fitting"]},"hd-90":{"sku":"305473571","terms":["4 x 1-1/2","4 to 1-1/2","reducer","reducing coupling","rubber reducer","flex reducer","4\"","4 in","4 inch","1-1/2\"","1 1/2","1.5 in","1-1/2in","flex coupling","fernco style","coupling","plumbflex","plumb flex","pvc"]},"rt-02":{"sku":"CIBOS50A","terms":["sump pump","sump pumps","sumpump","sum pump","sump","pump","pumps","primary pump","cast iron pump","submersible","pitboss","pit boss","pittboss","1/2 hp","half hp","half horse"]},"rt-03":{"sku":"PBPCICOM","terms":["battery backup","battery back up","backup pump","back up pump","backup sump","backup","back up","combo","combo kit","wifi","wi-fi","wifi pump","pitboss","pit boss","pitboss plus","sump pump","cast iron"]},"rt-04":{"sku":"RICSRHT","terms":["humidity monitor","humidity sensor","humidity","temperature","temp sensor","hygrometer","rh monitor","rh&t","smart monitor","monitor","smart outlet","wifi","alarm","wifi alarm","sensor"]},"rt-06":{"sku":"INVRIC20","terms":["backup power","back up power","battery backup","battery back up","inverter","invertor","inverter backup","power backup","power outage","ups","backup","invric20"]},"rt-07":{"sku":"PGBATBX","terms":["battery case","battery box","battery cables","cables","jumper cables","case","box","battery","backup","battery backup"]},"rt-08":{"sku":"SLA100I","terms":["battery","batteries","batt","batery","100 ah","100ah","100 amp hour","100 amp","agm","deep cycle","sla","backup battery","battery backup"]},"rt-09":{"sku":"S3033-DFC2","terms":["sump pump","sump pumps","sumpump","sum pump","sump","pump","pumps","primary pump","pro series","proseries","1/3 hp","third hp","stainless","stainless pump","submersible","s3033","dfc2"]},"rt-10":{"sku":"RICSWI19","terms":["float switch","float","floats","vertical float","pump switch","sump switch","switch","swtich","pipe mount"]},"rt-11":{"sku":"DFC2","terms":["dual float","double float","dual float switch","float switch","float","floats","controller","float controller","piggyback","dfc2","dfc","switch","swtich","pro series"]},"rt-12":{"sku":"RICSTND","terms":["pump stand","sump stand","stand","pump riser","pump base","pedestal","riser","sump pump stand","2 in"]},"rt-13":{"sku":"V150SCL","terms":["check valve","check valves","checkvalve","check valv","chek valve","chk valve","1-1/2\"","1 1/2","1.5 in","1-1/2in","check","valve","silencer","silent check","quiet check","clear check valve","double boot","pvc"]},"rt-14":{"sku":"RICWYE","terms":["wye","y","why","y connector","y fitting","dual discharge","1-1/2\"","1 1/2","1.5 in","1-1/2in","dual pump","twin pump","two pump","discharge wye","reducer","ricwye"]},"rt-16":{"sku":"QF04CAP","terms":["cleanout cap","clean out cap","cleanout","clean out","cap","flush cap","quikflo","quickflo","quick flo","quickflow","drain tile","port"]},"rt-17":{"sku":"QF04CNR","terms":["corner","corners","corner port","90 corner","drain corner","quikflo","quickflo","quick flo","quickflow","drain tile","drainage"]},"rt-18":{"sku":"QF10496HS58","terms":["drain tile","draintile","drain tiles","drainage","drain track","track","quikflo","quickflo","quick flo","quickflow","perimeter drain","interior drain","french drain","drain pipe","drainage pipe","stick","8 ft","5/8 holes","drain"]},"rt-19":{"sku":"QF04BIA","terms":["basin adapter","inlet adapter","basin inlet","crock adapter","adapter","adaptor","cleanout port","quikflo","quickflo","quick flo","quickflow","drain tile"]},"rt-20":{"sku":"SB022PF","terms":["sump basin","crock","sump pit","basin","sump liner","liner","22\"","22 in","22 inch","sump crock","pit","sump","perforated","perf basin","bucket","pump basin"]},"rt-21":{"sku":"SBRADCL1","terms":["lid","lids","sump lid","basin lid","crock lid","pit lid","cover","sump cover","pit cover","clear lid","cord hole","sump"]},"rt-22":{"sku":"AADE100W","terms":["dehumidifier","dehu","aprilaire","dehumidifiers","dehumidifer","dehumidfier","dehumdifier","dehus","aprilair","april air","aprilare","e100w","e100","wifi","wifi dehu","whole home","crawl space"]},"rt-23":{"sku":"AADE130","terms":["dehumidifier","dehu","aprilaire","dehumidifiers","dehumidifer","dehumidfier","dehumdifier","dehus","aprilair","april air","aprilare","e130","130 pint","whole home","crawl space"]},"rt-24":{"sku":"5822","terms":["hanging kit","hang kit","hanging strap","hanging straps","dehu hanger","dehumidifier hanger","ratchet","ratchet rope","eye bolts","brackets","aprilaire","aprilair","dehu","dehumidifier","5822"]},"rt-25":{"sku":"4856","terms":["condensate pump","condensate","condensation pump","dehu pump","drain pump","mini pump","pump","aprilaire","aprilair","dehu","dehumidifier","4856"]},"rt-26":{"sku":"5958","terms":["condensate pump bracket","pump bracket","condensate bracket","bracket","mount","mounting bracket","condensate","aprilaire","aprilair","dehu","5958"]},"rt-29":{"sku":"CFS600654KIT","terms":["carbon fiber","carbon fibre","carbon","cfs","carbon strap","carbon straps","wall straps","strap","crack repair","wall repair","bowing wall","wall reinforcement","kit","cfs600"]},"rt-30":{"sku":"RICBLKR125","terms":["ocher","ochre","ocre","oker","iron ocher","iron bacteria","ocher blocker","blocker","ocher treatment","orange slime","drain treatment","12.5 kg","bucket"]},"rt-33":{"sku":"FSTAPE42-ST","terms":["tape","seam tape","vapor barrier tape","liner tape","crawl space tape","crawlspace tape","4\"","4 in","4 inch","white tape","poly tape","encapsulation","vapor barrier"]},"rt-34":{"sku":"WWS20004","terms":["vapor barrier","poly","liner","woven liner","4 ft","4'","4ft liner","vapour barrier","vapor","woven liner 4ft","crawl space liner","crawlspace","crawl liner","moisture barrier","wall liner","plastic","encapsulation","14 mil","200 ft"]},"rt-35":{"sku":"CC10501","terms":["channel cove","chanel cove","cove","wall drain","drain channel","channel","15\"","15 in","15 inch","cove roll","white","225 ft","roll"]},"rt-36":{"sku":"DM80600","terms":["dimple board","dimpleboard","dimple","dimpel","dimple mat","dimple membrane","dimpled membrane","dimple drain","dimpledrain","dimple shield","wall membrane","8 ft","50 ft","roll"]},"rt-37":{"sku":"FREZFLO","terms":["freeze drain","freezflo","freeze flo","freeze flow","freezeflow","frozen discharge","1-1/2\"","1 1/2","1.5 in","1-1/2in","4\"","4 in","4 inch","freeze guard","discharge fitting","discharge line","winter","frozen line","frezflo"]},"rt-39":{"sku":"XT07501","terms":["xt fastener","xt fasteners","xt","christmas tree","x-mas tree","xmas tree","push pin","push pins","push rivet","plastic rivet","liner fastener","fasteners","pins","vapor barrier"]},"rt-41":{"sku":"WWS10008","terms":["vapor barrier","poly","liner","woven liner","8 ft","8'","8ft liner","vapour barrier","vapor","woven liner 8ft","crawl space liner","crawlspace","crawl liner","moisture barrier","wall liner","wall protection","plastic","encapsulation","14 mil","100 ft"]},"az-01":{"sku":"20A","terms":["wiper blade","wiper blades","wiper","wipers","windshield wiper","wiper bade","20\"","20 in","20 inch","bosch","icon","truck wiper","truck","box truck"]},"az-02":{"sku":"266362","terms":["fuel cleaner","fuel system cleaner","injector cleaner","fuel additive","gas treatment","techron","chevron","12 oz","oil change","truck","box truck"]},"az-03":{"sku":"120228","terms":["tire cleaner","wheel cleaner","rim cleaner","black magic","truck wash","cleaner","tire","wheel","truck","box truck"]},"az-04":{"sku":"AF850","terms":["antifreeze","anti freeze","coolant","prestone","50/50","radiator fluid","radiator","1 gal","truck","box truck"]},"az-05":{"sku":"112627","terms":["motor oil","oil","engine oil","mobil 1","mobil1","mobile 1","synthetic","5w30","5w-30","quart","1 qt","oil change","truck","box truck"]},"az-06":{"sku":"120766","terms":["motor oil","oil","engine oil","mobil 1","mobil1","mobile 1","synthetic","5w30","5w-30","5 quart","5 qt","jug","oil change","truck","box truck"]},"az-07":{"sku":"S10060XL","terms":["oil filter","oil filters","filter","engine filter","spin on","stp","s10060xl","oil change","truck","box truck"]},"hd-91":{"sku":"100348474","terms":["pvc pipe","1-1/2 pvc","1-1/2 in pvc sch 40","pipe","pipes","piping","1-1/2\"","1 1/2","1.5 in","1-1/2in","discharge pipe","sch 40","schedule 40","pvc sch 40","dwv","stick","pipe stick","10 ft","charlotte","pvc"]},"hd-92":{"sku":"313383605","terms":["hammer","hammers","hamer","claw hammer","rip claw","rip hammer","framing hammer","fiberglass","husky","20 oz"]},"hd-93":{"sku":"305227383","terms":["shovel","shovels","shovle","square shovel","square point","flat shovel","scoop","digging","razor-back","razorback","razor back","poweredge"]},"hd-94":{"sku":"305227382","terms":["shovel","shovels","shovle","round point","pointed shovel","digging shovel","spade","digging","razor-back","razorback","razor back","poweredge","super socket"]},"hd-95":{"sku":"204168129","terms":["pick","pick axe","pickaxe","mattock","matock","pick mattock","digging","husky","2.5 lb","fiberglass"]},"hd-96":{"sku":"100093815","terms":["pry bar","prybar","flat bar","wonder bar","wonderbar","crowbar","12\"","12 in","12 inch","crow bar","nail puller","bar","stanley"]},"hd-97":{"sku":"202985576","terms":["wrecking bar","crowbar","crow bar","pry bar","prybar","demo bar","24\"","24 in","24 inch","bar","dewalt","de walt"]},"hd-98":{"sku":"301024184","terms":["bit set","bits","driver bits","screwdriver bits","impact bits","phillips","torx","shockwave","shock wave","milwaukee","milwakee","45 piece","45pc"]},"hd-99":{"sku":"307766754","terms":["pump sprayer","sprayer","garden sprayer","hand sprayer","tank sprayer","pump up sprayer","chemical sprayer","mold sprayer","spray","hdx","1 gal"]},"hd-100":{"sku":"325982793","terms":["safety glasses","safety glass","glasses","eye protection","eyewear","safety specs","clear glasses","bison","bison life","ansi","48pk"]},"hd-101":{"sku":"318317591","terms":["broom","brooms","push broom","shop broom","floor broom","outdoor broom","18\"","18 in","18 inch","sweep","hdx","cleanup"]},"hd-102":{"sku":"322111515","terms":["bit set","bits","driver bits","screwdriver bits","impact bits","phillips","torx","shockwave","shock wave","milwaukee","milwakee","60 piece","60pc"]},"hd-103":{"sku":"312583734","terms":["extension cord","extension cords","extention cord","extension","ext cord","cord","cords","drop cord","power cord","outdoor cord","50 ft","14/3","14 gauge","15 amp","eastman"]},"hd-104":{"sku":"301024174","terms":["bit set","bits","drill bits","driver bits","screwdriver bits","impact bits","drill and drive","shockwave","shock wave","milwaukee","milwakee","40 piece","40pc"]},"HI-01":{"sku":"2297324","terms":["pre filter","prefilter","pre-filter","filter","filters","air cleaner","air scrubber","scrubber","dust filter","aic","aic 1000","hilti","hilty","30pk"]},"HI-02":{"sku":"2320750","terms":["main filter","hepa","hepa filter","filter","filters","air cleaner","air scrubber","scrubber","dust filter","aic","aic 1000","hilti","hilty","3pk"]},"HI-03":{"sku":"2127087","terms":["supply cord","power cord","cord","cords","hilti cord","replacement cord","breaker cord","jackhammer cord","te 2000","te2000","te-2000","hilti","hilty","13 ft","4m"]}};

  var F = window.StormFuzzy;
  if (!F || !F.buildIndex || !F.search) return;
  if (!window.STORM_SEARCH_TERMS) window.STORM_SEARCH_TERMS = TERMS205;
  var idx = null, sig = null, memo = {}, memoN = 0;
  function list() { try { return Array.isArray(items) ? items : []; } catch (e) { return []; } }
  function signature(a) {
    var s = new Array(a.length);
    for (var i = 0; i < a.length; i++) { var it = a[i]; s[i] = it ? (it.bin + '|' + it.name + '|' + (it.sku == null ? '' : it.sku)) : ''; }
    return s.join(';');
  }
  function index() {
    var a = list(), s = signature(a);
    if (s !== sig || !idx) {
      idx = F.buildIndex(a.filter(function (it) { return it && it.bin; }), window.STORM_SEARCH_TERMS || TERMS205);
      sig = s; memo = {}; memoN = 0;
    }
    return idx;
  }
  function run(q, key, opts) {
    var ix = index(), k = key + '\u0001' + q;
    if (Object.prototype.hasOwnProperty.call(memo, k)) return memo[k];
    var hits = [];
    try { hits = F.search(ix, q, opts); } catch (e) { hits = []; }
    if (memoN > 200) { memo = {}; memoN = 0; }
    memo[k] = hits; memoN++;
    return hits;
  }
  function rank(q) {
    q = String(q == null ? '' : q).trim();
    var out = { bins: [], rank: {} };
    if (!q) return out;
    var hits = run(q, 'r', { threshold: 0.6, relCut: 0.2 });
    for (var i = 0; i < hits.length; i++) { var b = hits[i].bin; if (out.rank[b] == null) { out.rank[b] = out.bins.length; out.bins.push(b); } }
    return out;
  }
  function closest(q) {
    q = String(q == null ? '' : q).trim();
    if (!q) return [];
    return run(q, 'c', { threshold: 0.45, limit: 3 }).map(function (h) { return h.bin; });
  }
  window.stormSearch205 = { rank: rank, closest: closest, warm: function () { try { index(); } catch (e) {} }, _index: index };

  /* pre-build: idle after load (and after each full load of the list), and when a search box gets focus */
  function warmUp() { /* build the index, then run a few throw-away searches so the matcher is compiled before the first real keystroke */
    if (!list().length) return; var ix = index();
    if (ix.__warm) return; ix.__warm = 1;
    ['sump pump', '1 1/2 pvc', 'chek valve', 'hydralic cement 50lb', 'tapcons 2 3/4'].forEach(function (w) { try { F.search(ix, w); F.search(ix, w, { threshold: 0.45, limit: 3 }); } catch (e) {} });
    ix._rc = null;
  }
  function warmSoon() { var f = function () { try { warmUp(); } catch (e) {} }; if (window.requestIdleCallback) requestIdleCallback(f, { timeout: 3000 }); else setTimeout(f, 600); }
  document.addEventListener('focusin', function (e) { var t = e.target; if (t && t.matches && t.matches('#search, #ro201 .r-q')) setTimeout(function () { try { warmUp(); } catch (x) {} }, 0); }, true);
  (function waitItems(n) { if (list().length) warmSoon(); else if (n < 60) setTimeout(function () { waitItems(n + 1); }, 500); })(0);
})();

/* v205 CSS: the search-results / closest-matches heads use the category head look; nothing else changes */
(function () {
  if (document.getElementById('storm-v205-css')) return;
  var st = document.createElement('style'); st.id = 'storm-v205-css';
  st.textContent = '#list > .cat-head.cat-closest .cat-count { white-space: nowrap; }'
    + '#empty.s205-near { padding-bottom: 6px !important; }';
  document.head.appendChild(st);
})();

/* v206 (Hark, 2026-11-11, Dave approved 22:55, batch T2): Truck Check, part 2. Pairs with app v158.
   1. Side menu: "Box Truck Check" and "Tool Checklist" rows right under Receiving Orders (crew + managers). Each opens the
      fillable form straight away (same path as Resource Center > Checklists, which keeps working). The old "Truck Check · Soon"
      placeholder row is hidden: it is live now.
   2. A big "Save & Submit" button at the bottom of each form. Boxes still save on every tap. Submit = one more box in the same
      record: fieldId "__submitted", value = the submitter's name, sent through the v203 queue (so any queued boxes go first and
      an offline submit waits on the phone and sends when there is signal). Banner "Submitted by NAME · time"; the button turns
      into "Update submission" (re-submit overwrites the time). Blank items: a confirm with the count, submit allowed.
   3. "Past checks" (top of the form and under the button): earlier checks newest first (date, truck #, submitted by/time or
      Not submitted, red-mark count), read with the read-only getTruckCheckHistory. Tap one: that day's form, READ-ONLY, with Back.
      Android back steps back the same way (history states ride on the 'chk' overlay state). */
(function () {
  if (window.stormTC206) return;
  var BLUE = '#29A8E0', BLUE_D = '#1A8FC4', INK = '#0F1720', MUTE = '#6B7280', RED = '#DC2626';
  var FONT = 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif';
  var AB = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/truckcheck/';
  var NAMES = { 'box-truck': 'Box Truck Pre Check', 'tools': 'Tool Checklist' };
  var SHEET_OF = { 'box-truck': 'truck', 'tools': 'tools' }, ID_OF = { truck: 'box-truck', tools: 'tools' };
  var sub = {};      /* key -> { by, at, sent, since } (what this phone knows about the record's submission) */
  var hist = {};     /* sheet -> last list from the server */
  var view = null;   /* the Past checks screen: { sheet, mode: 'list'|'ro', h } */
  function $(id) { return document.getElementById(id); }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }
  function T() { return window.stormTC203 || null; }
  function cur() { try { return T() && T().current(); } catch (e) { return null; } }
  function devName() { try { return String(localStorage.getItem('stormDeviceNameV1') || '').trim().slice(0, 60); } catch (e) { return ''; } }
  /* the v203 who-name (this phone's name, else Manager / Crew); with no phone name, the name written on the form comes first */
  function whoName(c) {
    var base = ''; try { base = T().who(); } catch (e) {}
    if (devName()) return devName();
    try { var f = c.h.getData().fields, n = ((f['foot.checkedBy'] || {}).v || (f['hdr.employee'] || {}).v || '').trim(); if (n) return n.slice(0, 60); } catch (e) {}
    return base || 'Crew';
  }
  function fmtTime(ms) { try { return new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function sameDay(ms, iso) { var d = new Date(ms), p = function (n) { return (n < 10 ? '0' : '') + n; }; return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) === iso; }
  function fmtWhen(ms, iso) {
    if (!ms) return '';
    if (iso && !sameDay(ms, iso)) { try { return new Date(ms).toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + fmtTime(ms); } catch (e) {} }
    return fmtTime(ms);
  }
  function fmtDay(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); if (!m) return iso || '';
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    var o = { weekday: 'short', month: 'short', day: 'numeric' }; if (+m[1] !== new Date().getFullYear()) o.year = 'numeric';
    try { return d.toLocaleDateString([], o); } catch (e) { return (+m[2]) + '/' + (+m[3]) + '/' + m[1]; }
  }

  /* ---------- styles ---------- */
  var css = document.createElement('style'); css.id = 'storm-v206-css';
  css.textContent = ''
    + '#cl-menu .cl-row[data-tc206-hide] { display: none !important; }'
    + '#chk-view .tc203-links { gap: 8px; flex-wrap: wrap; }'
    + '#chk-view .tc206-ban, #tc206-hist .tc206-ban { display: flex; align-items: center; gap: 12px; margin: 0 2px 10px; padding: 12px 14px; border-radius: 14px; background: #fff; border: 1.5px solid ' + BLUE + '; box-shadow: 0 1px 2px rgba(15,23,32,.05); font-family: ' + FONT + '; color: ' + INK + '; }'
    + '.tc206-ban[hidden] { display: none !important; }'
    + '.tc206-ban .tc206-ck { width: 34px; height: 34px; flex: none; border-radius: 50%; background: ' + BLUE + '; color: #fff; display: flex; align-items: center; justify-content: center; }'
    + '.tc206-ban .tc206-ck svg { width: 20px; height: 20px; }'
    + '.tc206-ban b { display: block; font-size: 15px; font-weight: 800; line-height: 1.25; }'
    + '.tc206-ban span.tc206-sub { display: block; font-size: 12.5px; font-weight: 600; color: ' + MUTE + '; margin-top: 2px; line-height: 1.3; }'
    + '.tc206-ban.wait { border-color: #D97706; } .tc206-ban.wait .tc206-ck { background: #D97706; }'
    + '.tc206-ban.none { border-color: #DCE4EE; } .tc206-ban.none .tc206-ck { background: #E5EAF0; color: ' + MUTE + '; }'
    + '#chk-view .tc206-foot { margin: 16px 2px 0; display: flex; flex-direction: column; align-items: stretch; gap: 10px; font-family: ' + FONT + '; }'
    + '#chk-view .tc206-go { display: flex; align-items: center; justify-content: center; gap: 10px; width: 100%; min-height: 58px; border: 0; border-radius: 16px; background: ' + BLUE + '; color: #fff; font-family: ' + FONT + '; font-size: 18px; font-weight: 800; letter-spacing: .01em; box-shadow: 0 2px 8px rgba(41,168,224,.35); cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }'
    + '#chk-view .tc206-go svg { width: 22px; height: 22px; flex: none; }'
    + '#chk-view .tc206-go:active { background: ' + BLUE_D + '; transform: scale(.99); }'
    + '#chk-view .tc206-go.upd { background: #fff; color: ' + BLUE_D + '; border: 2px solid ' + BLUE + '; box-shadow: none; }'
    + '#chk-view .tc206-go.upd:active { background: rgba(41,168,224,.08); }'
    + '#chk-view .tc206-fs { text-align: center; font-size: 13px; font-weight: 600; color: ' + MUTE + '; min-height: 17px; }'
    + '#chk-view .tc206-past2 { align-self: center; }'
    /* Past checks screen */
    + '#tc206-hist { position: fixed; inset: 0; z-index: 102; background: #F3F4F6; overflow-y: auto; -webkit-overflow-scrolling: touch; display: none; font-family: ' + FONT + '; color: ' + INK + '; }'
    + '#tc206-hist.open { display: block; }'
    + '#tc206-hist .th-bar { position: sticky; top: 0; z-index: 6; display: flex; align-items: center; gap: 8px; min-height: 56px; padding: 0 12px; padding-top: env(safe-area-inset-top, 0px); background: #EEF2F7; border-bottom: 1px solid #DCE4EE; }'
    + '#tc206-hist .th-back { display: inline-flex; align-items: center; gap: 2px; min-height: 40px; padding: 0 12px 0 6px; border: 0; border-radius: 20px; background: #fff; color: ' + BLUE_D + '; font-family: ' + FONT + '; font-size: 15px; font-weight: 700; box-shadow: 0 1px 2px rgba(15,23,32,.06); cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; flex: none; }'
    + '#tc206-hist .th-back svg { width: 20px; height: 20px; }'
    + '#tc206-hist .th-t { font-weight: 700; font-size: 17px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0; }'
    + '#tc206-hist .th-body { max-width: 1000px; margin: 0 auto; padding: 12px 12px calc(28px + env(safe-area-inset-bottom, 0px)); box-sizing: border-box; }'
    + '#tc206-hist .th-list { max-width: 760px; margin: 0 auto; display: flex; flex-direction: column; gap: 8px; }'
    + '#tc206-hist .th-row { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; padding: 13px 12px 13px 14px; border: 0; border-radius: 14px; background: #fff; box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 3px 10px rgba(15,23,32,.05); font-family: ' + FONT + '; color: ' + INK + '; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }'
    + '#tc206-hist .th-row:active { background: #F5FAFD; }'
    + '#tc206-hist .th-main { flex: 1; min-width: 0; }'
    + '#tc206-hist .th-d { display: flex; align-items: baseline; gap: 8px; font-size: 15.5px; font-weight: 800; }'
    + '#tc206-hist .th-d i { font-style: normal; font-weight: 700; font-size: 13px; color: ' + BLUE_D + '; white-space: nowrap; }'
    + '#tc206-hist .th-s { font-size: 13px; font-weight: 600; color: ' + MUTE + '; margin-top: 3px; line-height: 1.3; }'
    + '#tc206-hist .th-s.ok { color: #0F7A3D; } #tc206-hist .th-s.no { color: #B45309; }'
    + '#tc206-hist .th-p { flex: none; font-size: 12.5px; font-weight: 800; padding: 5px 10px; border-radius: 999px; background: #EEF2F7; color: ' + MUTE + '; white-space: nowrap; }'
    + '#tc206-hist .th-p.bad { background: #FDECEC; color: ' + RED + '; }'
    + '#tc206-hist .th-ch { width: 18px; height: 18px; flex: none; color: #A9B4C2; }'
    + '#tc206-hist .th-msg { max-width: 760px; margin: 24px auto; text-align: center; font-size: 14px; font-weight: 600; color: ' + MUTE + '; }'
    + '#tc206-hist .th-msg button { margin-top: 10px; min-height: 40px; padding: 0 18px; border: 0; border-radius: 20px; background: ' + BLUE + '; color: #fff; font-family: ' + FONT + '; font-weight: 700; font-size: 14px; }'
    + '#tc206-hist .th-ro { max-width: 1000px; margin: 0 auto 10px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: ' + MUTE + '; }'
    + '#tc206-hist .th-ro em { font-style: normal; padding: 4px 10px; border-radius: 999px; background: #E5EAF0; color: #374151; font-size: 12px; font-weight: 800; letter-spacing: .02em; }'
    + '#tc206-hist.ro .stc-card { pointer-events: none; }'
    + '#tc206-hist.ro .stc .stc-dtv:empty::before { content: "" !important; }'
    + '#tc206-hist.ro .stc-status, #tc206-hist.ro .stc [data-now] { display: none !important; }'
    + 'html body #tc206-hist .stc input, html body #tc206-hist .stc textarea { background: transparent !important; border: 0 !important; border-radius: 0 !important; box-shadow: none !important; }'
    + 'html body #tc206-hist .stc .stc-tr .stc-in, html body #tc206-hist .stc .stc-mdy input, html body #tc206-hist .stc .stc-desc textarea, html body #tc206-hist .stc .stc-foot .stc-in { border-bottom: 1.5px solid #9AA7B8 !important; }'
    + 'html body #tc206-hist .stc .stc-init { border-bottom: 1.5px solid #B9C4D2 !important; }'
    /* confirm */
    + '#tc206-cf { position: fixed; inset: 0; z-index: 110; display: flex; align-items: flex-end; justify-content: center; background: rgba(15,23,32,.45); font-family: ' + FONT + '; }'
    + '@media (min-width: 600px) { #tc206-cf { align-items: center; } }'
    + '#tc206-cf .cf-card { width: 100%; max-width: 440px; margin: 0 10px calc(10px + env(safe-area-inset-bottom, 0px)); padding: 20px 18px 16px; border-radius: 18px; background: #fff; box-shadow: 0 10px 40px rgba(15,23,32,.25); color: ' + INK + '; }'
    + '#tc206-cf h3 { margin: 0 0 6px; font-size: 18px; font-weight: 800; }'
    + '#tc206-cf p { margin: 0 0 16px; font-size: 14.5px; font-weight: 500; color: #374151; line-height: 1.4; }'
    + '#tc206-cf .cf-b { display: flex; gap: 10px; }'
    + '#tc206-cf .cf-b button { flex: 1; min-height: 50px; border-radius: 14px; font-family: ' + FONT + '; font-size: 16px; font-weight: 800; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }'
    + '#tc206-cf .cf-no { border: 2px solid #DCE4EE; background: #fff; color: ' + INK + '; }'
    + '#tc206-cf .cf-yes { border: 0; background: ' + BLUE + '; color: #fff; }';
  document.head.appendChild(css);
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var CLOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6"/><path d="M3 4v4h4"/><path d="M12 7.5V12l3 2"/></svg>';
  var SEND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>';
  var CHEV = '<svg class="th-ch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>';

  /* ---------- 1. side menu rows ---------- */
  function svg(inner) { return '<svg class="cl-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>'; }
  var ICONS = {
    'box-truck': '<path d="M2 5h12v11H2z"/><path d="M14 9h4.2l3.3 4v3H14"/><circle cx="6" cy="18" r="2"/><circle cx="17.5" cy="18" r="2"/><path d="M8 16h7.5"/>',
    'tools': '<path d="M3 5h4M17 5h4"/><path d="M7 3.5h10v3l-1.2 8.5H8.2L7 6.5z"/><path d="M10 15h4v2.5h-4z"/><path d="M11 17.5v3l1 2 1-2v-3"/><path d="M7.5 9C4.5 10 3.5 13 4.5 17"/>'
  };
  var ROWS = [['box-truck', 'Box Truck Check'], ['tools', 'Tool Checklist']];
  function menuRows() {
    var mn = $('cl-menu'); if (!mn) return false;
    var ro = mn.querySelector('[data-ro199]'); if (!ro) return false;
    var prev = ro;
    ROWS.forEach(function (x) {
      var b = mn.querySelector('[data-tc206-go="' + x[0] + '"]');
      if (!b) { b = document.createElement('button'); b.type = 'button'; b.className = 'cl-row'; b.setAttribute('data-tc206-go', x[0]); b.innerHTML = svg(ICONS[x[0]]) + '<span class="cl-name">' + x[1] + '</span>'; }
      if (prev.nextElementSibling !== b) prev.insertAdjacentElement('afterend', b);
      prev = b;
    });
    mn.querySelectorAll('.cl-row.cl-soon:not([data-tc206-hide])').forEach(function (r) { var n = r.querySelector('.cl-name'); if (n && /^\s*Truck Check\s*$/.test(n.textContent)) r.setAttribute('data-tc206-hide', '1'); });
    return true;
  }
  function openForm(id) {
    /* like Receiving Orders: the menu closes, then the form opens through the Resource Center row's own path
       (v75 openChecklist -> v203 form), so both entries open the very same form */
    try { closeDrawer(); } catch (x) { var sc = $('drawer-scrim'); if (sc) sc.click(); }
    setTimeout(function () {
      var rb = document.querySelector('#drawer-resources [data-drawer-checklist="' + id + '"]') || document.querySelector('[data-drawer-checklist="' + id + '"]');
      if (rb) rb.click();
    }, 220);
  }
  var mq = 0;
  function menuSoon() { if (!mq) mq = requestAnimationFrame(function () { mq = 0; try { menuRows(); } catch (e) {} }); }
  try { new MutationObserver(menuSoon).observe(document.body, { childList: true }); } catch (e) {}
  (function watch(n) {
    var dr = $('drawer');
    if (dr && !dr.__o206) { dr.__o206 = true; try { new MutationObserver(menuSoon).observe(dr, { childList: true, subtree: true }); } catch (e) {} }
    var done = false; try { done = menuRows(); } catch (e) {}
    if (n < 240 && (!dr || !done)) setTimeout(function () { watch(n + 1); }, 500);
  })(0);

  /* ---------- 2. Save & Submit ---------- */
  function decorate(c) {
    var v = c && c.v; if (!v || !v.querySelector('.tc203-host')) return;
    var links = v.querySelector('.tc203-links');
    if (links && !links.querySelector('[data-tc206-past]')) links.insertAdjacentHTML('afterbegin', '<button type="button" class="tc203-link" data-tc206-past>' + CLOCK + 'Past checks</button>');
    var host = v.querySelector('.tc203-host');
    if (!v.querySelector('.tc206-ban')) host.insertAdjacentHTML('beforebegin', '<div class="tc206-ban" hidden role="status" aria-live="polite"><div class="tc206-ck">' + CHECK + '</div><div><b></b><span class="tc206-sub"></span></div></div>');
    if (!v.querySelector('.tc206-foot')) host.insertAdjacentHTML('afterend', '<div class="tc206-foot"><button type="button" class="tc206-go" data-tc206-submit>' + SEND + '<span>Save &amp; Submit</span></button><div class="tc206-fs"></div><button type="button" class="tc203-link tc206-past2" data-tc206-past>' + CLOCK + 'Past checks</button></div>');
    paint();
  }
  function queued(k) { try { var q = T().queue()[k]; return q && q.f && ('__submitted' in q.f) ? q.f.__submitted : null; } catch (e) { return null; } }
  function sending(k) { try { return T().busy(k, '__submitted'); } catch (e) { return false; } }
  function state(c) {
    var k = c.key, s = sub[k], q = queued(k);
    if (q != null || (s && !s.sent && sending(k))) { var off = false; try { off = T().failing(); } catch (e) {} return { by: q != null ? q : s.by, at: s ? s.at : 0, wait: true, offline: off }; }
    if (s && !s.sent) s.sent = true;
    return s && s.by ? { by: s.by, at: s.at, wait: false } : null;
  }
  function paint() {
    var c = cur(); if (!c || !c.v) return;
    var v = c.v, ban = v.querySelector('.tc206-ban'), go = v.querySelector('[data-tc206-submit]'), fs = v.querySelector('.tc206-fs');
    if (!ban || !go) return;
    var st = c.truck && c.period ? state(c) : null;
    var title = '', subt = '';
    if (st) {
      title = 'Submitted by ' + st.by + (st.at ? ' \u00b7 ' + fmtWhen(st.at, c.period) : '');
      subt = st.wait ? (st.offline ? 'Saved on this phone \u00b7 sends when there\u2019s signal' : 'Sending\u2026') : 'Changed something? Tap Update submission.';
    }
    if (ban.hidden !== !st) ban.hidden = !st;
    ban.classList.toggle('wait', !!(st && st.wait));
    var b = ban.querySelector('b'), sp = ban.querySelector('.tc206-sub');
    if (b.textContent !== title) b.textContent = title;
    if (sp.textContent !== subt) sp.textContent = subt;
    var lbl = st ? 'Update submission' : 'Save & Submit', sl = go.querySelector('span');
    if (sl.textContent !== lbl) sl.textContent = lbl;
    go.classList.toggle('upd', !!st);
    var ft = st ? title : (c.truck ? '' : 'Fill in TRUCK # to submit');
    if (fs.textContent !== ft) fs.textContent = ft;
  }
  setInterval(function () { if (cur()) paint(); }, 600);
  /* the v203 read hands us the record's __submitted box (server time) */
  function remote(k, x, since) {
    if (!x) return;
    var s = sub[k];
    if (s && (queued(k) != null || sending(k) || (s.sentAt || 0) > since)) return; /* ours is newer than this read */
    if (x.v) sub[k] = { by: String(x.v), at: +x.at || 0, sent: true, sentAt: s ? s.sentAt : 0 };
    paint();
  }
  function confirmBox(title, text, yes, no, cb) {
    var old = $('tc206-cf'); if (old) old.remove();
    var d = document.createElement('div'); d.id = 'tc206-cf'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = '<div class="cf-card"><h3>' + esc(title) + '</h3><p>' + esc(text) + '</p><div class="cf-b">' + (no ? '<button type="button" class="cf-no">' + esc(no) + '</button>' : '') + '<button type="button" class="cf-yes">' + esc(yes) + '</button></div></div>';
    document.body.appendChild(d);
    function done(v) { d.remove(); try { cb && cb(v); } catch (e) {} }
    d.addEventListener('click', function (e) {
      if (e.target === d) { done(false); return; }
      if (e.target.closest('.cf-yes')) done(true); else if (e.target.closest('.cf-no')) done(false);
    });
    setTimeout(function () { try { d.querySelector('.cf-yes').focus({ preventScroll: true }); } catch (e) {} }, 30);
  }
  function submit() {
    var c = cur(); if (!c || !c.h) return;
    /* a box still being typed in counts: blur sends it (and a TRUCK # being typed picks the record) */
    try { var a = document.activeElement; if (a && c.v.contains(a) && a.blur) a.blur(); } catch (e) {}
    c = cur(); if (!c) return;
    if (!c.truck || !c.period) {
      confirmBox('Fill in TRUCK # first', 'The check is saved under the truck number and the date.', 'OK', '', function () {
        var t = c.v.querySelector('[data-f="hdr.truck"]'); if (t) { try { t.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} setTimeout(function () { try { t.focus({ preventScroll: true }); } catch (e) {} }, 300); }
      });
      return;
    }
    var p = { done: 0, total: 0 }; try { p = c.h.progress(); } catch (e) {}
    var blank = Math.max(0, (p.total || 0) - (p.done || 0));
    if (blank) confirmBox(blank + (blank === 1 ? ' item is' : ' items are') + ' still blank', 'You can submit now and fill ' + (blank === 1 ? 'it' : 'them') + ' in later.', 'Submit anyway', 'Go back', function (y) { if (y) send(c); });
    else send(c);
  }
  function send(c) {
    if (cur() !== c) return;
    var name = whoName(c), now = Date.now();
    sub[c.key] = { by: name, at: now, sent: false, sentAt: now };
    try { T().enqueue({ sheet: c.sheet, truck: c.truck, period: c.period, fieldId: '__submitted', value: name }); } catch (e) {}
    paint();
    try { c.v.querySelector('.tc206-ban').scrollIntoView({ block: 'nearest' }); } catch (e) {}
    var bar = c.v.querySelector('.tc206-ban'); if (bar) { bar.style.transition = 'none'; bar.style.transform = 'scale(.98)'; requestAnimationFrame(function () { bar.style.transition = 'transform .25s ease'; bar.style.transform = ''; }); }
  }

  /* ---------- 3. Past checks ---------- */
  function screenEl() {
    var s = $('tc206-hist');
    if (!s) { s = document.createElement('div'); s.id = 'tc206-hist'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-label', 'Past checks'); document.body.appendChild(s); }
    return s;
  }
  function bar(title) { return '<div class="th-bar"><button type="button" class="th-back" data-tc206-back aria-label="Back">' + BACK + 'Back</button><div class="th-t">' + esc(title) + '</div></div>'; }
  function rowHtml(sheet, c) {
    var k = sheet + '|' + c.truck + '|' + c.period, q = queued(k), s = sub[k];
    var st;
    if (q != null) st = '<div class="th-s ok">Submitted by ' + esc(q) + ' \u00b7 sending\u2026</div>';
    else if (c.submittedBy) st = '<div class="th-s ok">Submitted by ' + esc(c.submittedBy) + (c.submittedAt ? ' \u00b7 ' + esc(fmtWhen(c.submittedAt, c.period)) : '') + '</div>';
    else if (s && s.by) st = '<div class="th-s ok">Submitted by ' + esc(s.by) + ' \u00b7 ' + esc(fmtWhen(s.at, c.period)) + '</div>';
    else st = '<div class="th-s no">Not submitted</div>';
    var n = +c.problems || 0;
    return '<button type="button" class="th-row" data-tc206-open="' + esc(c.truck) + '|' + esc(c.period) + '"><div class="th-main"><div class="th-d">' + esc(fmtDay(c.period)) + '<i>Truck ' + esc(c.truck) + '</i></div>' + st + '</div>'
      + '<span class="th-p' + (n ? ' bad' : '') + '">' + (n ? n + (n === 1 ? ' problem' : ' problems') : 'No problems') + '</span>' + CHEV + '</button>';
  }
  function paintList() {
    if (!view || view.mode !== 'list') return;
    var s = screenEl(), body = s.querySelector('.th-body'); if (!body) return;
    var d = hist[view.sheet];
    if (!d) { body.innerHTML = view.err ? '<div class="th-msg">Can\u2019t load past checks right now.<br><button type="button" data-tc206-retry>Try again</button></div>' : '<div class="th-msg">Loading past checks\u2026</div>'; return; }
    if (!d.checks.length) { body.innerHTML = '<div class="th-msg">No checks yet. Submitted checks show up here.</div>'; return; }
    body.innerHTML = '<div class="th-list">' + d.checks.map(function (c) { return rowHtml(view.sheet, c); }).join('') + '</div>';
  }
  function loadList() {
    if (!view) return;
    var r = run(), sheet = view.sheet, me = view;
    if (!r) { view.err = true; paintList(); return; }
    r.withSuccessHandler(function (res) {
      if (res && res.checks) hist[sheet] = { checks: res.checks, at: Date.now() };
      if (view === me) { view.err = false; paintList(); }
    }).withFailureHandler(function () { if (view === me) { view.err = true; if (!hist[sheet]) paintList(); } }).getTruckCheckHistory(sheet, 60);
  }
  function openList(sheet, push) {
    var s = screenEl();
    dropRo();
    var id = ID_OF[sheet];
    if (!view || view.sheet !== sheet) view = { sheet: sheet, mode: 'list' }; else view.mode = 'list';
    s.classList.remove('ro');
    s.innerHTML = bar('Past checks \u00b7 ' + NAMES[id]) + '<div class="th-body"></div>';
    s.classList.add('open'); s.scrollTop = view.listTop || 0;
    paintList(); loadList();
    if (push) { try { history.pushState({ overlay: 'chk', tc206: 'list' }, ''); } catch (e) {} }
  }
  function dropRo() { if (view && view.h) { try { view.h.destroy(); } catch (e) {} view.h = null; } }
  function openRo(truck, period) {
    if (!view) return;
    var s = screenEl(), sheet = view.sheet, id = ID_OF[sheet];
    view.listTop = s.scrollTop; view.mode = 'ro';
    var c = ((hist[sheet] || {}).checks || []).filter(function (x) { return x.truck === truck && x.period === period; })[0] || { truck: truck, period: period };
    s.classList.add('ro');
    s.innerHTML = bar(NAMES[id]) + '<div class="th-body"><div class="th-ro"><em>READ ONLY</em><span>Truck ' + esc(truck) + ' \u00b7 ' + esc(fmtDay(period)) + '</span></div>'
      + '<div class="tc206-ban none"><div class="tc206-ck">' + CHECK + '</div><div><b>' + (c.submittedBy ? 'Submitted by ' + esc(c.submittedBy) + (c.submittedAt ? ' \u00b7 ' + esc(fmtWhen(c.submittedAt, period)) : '') : 'Not submitted') + '</b><span class="tc206-sub">Loading\u2026</span></div></div>'
      + '<div class="th-host"></div></div>';
    if (c.submittedBy) s.querySelector('.tc206-ban').classList.remove('none');
    s.scrollTop = 0;
    try { history.pushState({ overlay: 'chk', tc206: 'ro' }, ''); } catch (e) {}
    var me = view, r = run();
    function show(rec) {
      if (view !== me || me.mode !== 'ro' || !window.stormTruckCheck) return;
      var f = {}; Object.keys((rec && rec.fields) || {}).forEach(function (k) { if (k !== '__submitted') f[k] = rec.fields[k]; });
      var sb = rec && rec.fields && rec.fields.__submitted;
      var b = s.querySelector('.tc206-ban');
      if (sb && sb.v) { b.classList.remove('none'); b.querySelector('b').textContent = 'Submitted by ' + sb.v + (sb.at ? ' \u00b7 ' + fmtWhen(+sb.at, period) : ''); }
      b.querySelector('.tc206-sub').textContent = 'This is how the sheet was left. Nothing here can be changed.';
      dropRo();
      me.h = window.stormTruckCheck.open(s.querySelector('.th-host'), { sheet: sheet, readOnly: true, assetBase: AB, data: { sheet: sheet, truck: truck, period: period, fields: f } });
      try { me.h.el.querySelectorAll('input,textarea,button').forEach(function (x) { x.setAttribute('tabindex', '-1'); if (x.tagName !== 'BUTTON') x.readOnly = true; }); } catch (e) {}
    }
    if (!r) { s.querySelector('.tc206-sub').textContent = 'Can\u2019t load this check right now.'; return; }
    r.withSuccessHandler(show).withFailureHandler(function () { if (view === me && me.mode === 'ro') s.querySelector('.tc206-sub').textContent = 'Can\u2019t load this check right now. Go back and try again.'; }).getTruckCheck(truck, period, sheet);
  }
  function closeAll() {
    dropRo(); view = null;
    var s = $('tc206-hist'); if (s) { s.classList.remove('open', 'ro'); s.innerHTML = ''; }
  }
  function back() {
    var st = history.state;
    if (st && st.tc206) { try { history.back(); return; } catch (e) {} }
    if (view && view.mode === 'ro') openList(view.sheet, false); else closeAll();
  }
  window.addEventListener('popstate', function () {
    var st = history.state;
    if (!st || !st.tc206) { closeAll(); return; }
    if (st.tc206 === 'list' && view && view.mode === 'ro') openList(view.sheet, false);
  });
  /* the live-sync poll: a new submission from another phone shows in the open list */
  (function wrapRefresh(n) {
    var o = window.stormTruckCheckRefresh;
    if (!o) { if (n < 40) setTimeout(function () { wrapRefresh(n + 1); }, 250); return; }
    if (o.__t206) return;
    var w = function () { try { o.apply(this, arguments); } catch (e) {} if (view && view.mode === 'list') loadList(); };
    w.__t206 = true; window.stormTruckCheckRefresh = w;
  })(0);

  /* ---------- taps (window capture: ahead of the base and v75 handlers) ---------- */
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var g = t.closest('#cl-menu [data-tc206-go]');
    if (g) { e.preventDefault(); e.stopImmediatePropagation(); openForm(g.getAttribute('data-tc206-go')); return; }
    if (t.closest('#chk-view [data-tc206-submit]')) { e.preventDefault(); e.stopImmediatePropagation(); submit(); return; }
    if (t.closest('#chk-view [data-tc206-past]')) { e.preventDefault(); e.stopImmediatePropagation(); var c = cur(); if (c) openList(c.sheet, true); return; }
    if (t.closest('#tc206-hist [data-tc206-back]')) { e.preventDefault(); e.stopImmediatePropagation(); back(); return; }
    if (t.closest('#tc206-hist [data-tc206-retry]')) { e.preventDefault(); if (view) { view.err = false; paintList(); loadList(); } return; }
    var o = t.closest('#tc206-hist [data-tc206-open]');
    if (o) { e.preventDefault(); e.stopImmediatePropagation(); var a = o.getAttribute('data-tc206-open').split('|'); openRo(a[0], a[1]); return; }
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { if ($('tc206-cf')) { $('tc206-cf').remove(); e.stopImmediatePropagation(); } else if (view) { back(); e.stopImmediatePropagation(); } } }, true);
  /* the form under the list closed some other way: the list goes too */
  setInterval(function () { var v = $('chk-view'); if (view && (!v || !v.classList.contains('open'))) closeAll(); }, 1000);

  /* ---------- hook into the v203 form ---------- */
  (function hook(n) {
    var t = T();
    if (!t || !t.render) { if (n < 80) setTimeout(function () { hook(n + 1); }, 250); return; }
    if (t.render.__t206) return;
    var r0 = t.render;
    var r1 = function (c, v, paper) { var ok = r0.apply(this, arguments); if (ok) { try { decorate(cur()); } catch (e) {} } return ok; };
    r1.__t206 = true; t.render = r1;
  })(0);

  window.stormTC206 = { remote: remote, paint: paint, submit: submit, openList: function (id) { openList(SHEET_OF[id] || id, true); }, menuRows: menuRows, state: function () { return JSON.parse(JSON.stringify(sub)); }, view: function () { return view; } };
})();

/* v207 (Hark, 2026-11-11, Dave 21:02-21:03, batch G): How to Use the App rewritten for the app as it is now (v206 / app v159).
   1. The phone animation at the top is replaced by a real screen recording of the current app (crew view, real buttons and animations):
      main list + supplier chips, forgiving search, Item details + swipe, Staging -> Find a Job -> Load items -> Add to order ->
      check onto the cart, Receiving Orders, Box Truck Check -> Save & Submit. assets/howto/how-to-use.mp4 (H.264, muted, ~1 min) +
      poster. Same behaviour as the old animation: plays by itself on a silent loop while the guide is open (paused when it closes);
      the picture fades in over the poster once loaded. Tap = pause / play. "Jump to" chips seek to each part. prefers-reduced-motion:
      no autoplay, poster + play button. The file is only fetched when the guide is opened.
   2. Chapters rewritten so every step matches the app now (v192 build() reads window.stormHelpCH207 when present).
   3. Guide look matches the rest of the app: page #EAF0F7, white cards ~14px corners, accent #29A8E0, Montserrat. Layout unchanged. */
(function () {
  if (window.__stormV207) return; window.__stormV207 = 1;
  var A = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/howto/';
  var VID = A + 'how-to-use.mp4?v=207', POSTER = A + 'how-to-use-poster.jpg?v=207';
  var BL = '#29A8E0', INK = '#0F1720', PAGE = '#EAF0F7';
  var FONT = "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  var H = 'html body #st-help#st-help';
  var css = ''
    + H + ' { background: ' + PAGE + ' !important; font-family: ' + FONT + ' !important; font-size: 15px; line-height: 1.5; }'
    + H + ' .sh-top { background: #fff !important; }'
    + H + ' .sh-bar h2 { font-family: ' + FONT + '; font-weight: 800; font-size: 19px; letter-spacing: -.01em; }'
    + H + ' .sh-x { border-radius: 14px !important; }'
    + H + ' .sh-chip { font-family: ' + FONT + ' !important; font-weight: 700 !important; font-size: 13px !important; border-color: #DCE4EE !important; }'
    + H + ' .sh-chip.on { border-color: ' + BL + ' !important; background: #E6F5FC !important; }'
    + H + ' .sh-chip.on b, ' + H + ' .sh-chip.seen b { background: ' + BL + ' !important; color: #fff !important; }'
    + H + ' .sh-prog i { background: ' + BL + ' !important; }'
    + H + ' .sh-card { border-radius: 14px !important; box-shadow: 0 1px 2px rgba(15,23,32,.05), 0 6px 18px rgba(15,23,32,.06) !important; }'
    + H + ' .sh-card h3 { font-family: ' + FONT + '; font-size: 18px !important; font-weight: 800 !important; letter-spacing: -.01em; }'
    + H + ' .sh-card h3 b { width: 32px !important; height: 32px !important; font-size: 15px !important; background: ' + BL + ' !important; }'
    + H + ' .sh-card p { color: #3B4754; }'
    + H + ' .sh-steps li { padding: 9px 0 9px 40px !important; color: #24303C; }'
    + H + ' .sh-steps li::before { border-radius: 8px !important; background: #E6F5FC !important; color: #0B6F99 !important; font-family: ' + FONT + '; font-size: 13px !important; }'
    + H + ' .sh-steps.sh-do li::before { background: #E7F7EC !important; color: #15803D !important; } ' + H + ' .sh-steps.sh-dont li::before { background: #FDECEC !important; color: #B42318 !important; }'
    + H + ' .sh-k { font-family: ' + FONT + '; font-weight: 700; font-size: .92em; background: #EEF3F8; border-radius: 6px; padding: 0 6px; }'
    + H + ' .sh-tip { border-radius: 12px !important; background: #E6F5FC !important; color: #0B4F6E !important; font-size: 14px !important; }'
    + H + ' .sh-mgr { display: inline-block; margin-left: 6px; padding: 1px 7px; border-radius: 6px; background: #FFF4DB; color: #8A5A00; font-size: 11px; font-weight: 800; letter-spacing: .02em; vertical-align: 2px; white-space: nowrap; }'
    + H + ' .sh-next { border-radius: 14px !important; font-family: ' + FONT + ' !important; font-weight: 700 !important; }'
    + H + ' .sh-two h4 { font-family: ' + FONT + '; font-weight: 800; }'
    /* the recording */
    + H + ' .g207 { display: flex; flex-direction: column; align-items: center; padding: 16px 14px 18px !important; }'
    + H + ' .g207-frame { position: relative; height: min(62vh, 640px); max-width: 100%; aspect-ratio: 780 / 1688; border-radius: 26px; padding: 7px; box-sizing: border-box; background: ' + INK + '; box-shadow: 0 10px 28px rgba(15,23,32,.20); }'
    + H + ' .g207-scr { position: relative; width: 100%; height: 100%; border-radius: 20px; overflow: hidden; background: ' + PAGE + ' url("' + POSTER + '") center / cover no-repeat; -webkit-tap-highlight-color: transparent; cursor: pointer; }'
    + H + ' .g207-scr video { display: block; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .35s ease; background: transparent; }'
    + H + ' .g207-scr.on video { opacity: 1; }'
    + H + ' .g207-pp { position: absolute; left: 50%; top: 50%; width: 64px; height: 64px; margin: -32px 0 0 -32px; border: 0; border-radius: 50%; background: rgba(15,23,32,.62); display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(.9); transition: opacity .2s ease, transform .2s ease; pointer-events: none; }'
    + H + ' .g207-scr.paused .g207-pp { opacity: 1; transform: none; }'
    + H + ' .g207-pp svg { width: 28px; height: 28px; margin-left: 4px; }'
    + H + ' .g207-cap { margin: 12px 0 2px; font-weight: 800; font-size: 15px; color: ' + INK + '; text-align: center; }'
    + H + ' .g207-sub { margin: 0 0 10px; font-size: 13px; color: #5B6775; text-align: center; }'
    + H + ' .g207-jump { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 520px; }'
    + H + ' .g207-jump button { min-height: 34px; padding: 0 11px; border-radius: 17px; border: 1px solid #DCE4EE; background: #fff; color: ' + INK + '; font: 700 12.5px/1 ' + FONT + '; cursor: pointer; -webkit-tap-highlight-color: transparent; }'
    + H + ' .g207-jump button i { font-style: normal; color: #0B6F99; margin-right: 5px; font-weight: 800; }'
    + H + ' .g207-jump button.on { border-color: ' + BL + '; background: #E6F5FC; }'
    + H + ' .g207-jump button:active { transform: scale(.97); }'
    + '@media (max-height: 760px) { ' + H + ' .g207-frame { height: min(58vh, 640px); } }'
    + '@media (min-width: 700px) { ' + H + ' .g207-frame { height: min(60vh, 680px); } }';
  var st = document.createElement('style'); st.id = 'storm-v207-css'; st.textContent = css; document.head.appendChild(st);

  /* ---------- the recording ---------- */
  var PARTS = [[0, 'Main list'], [8.3, 'Search'], [12.0, 'Item details'], [21.0, 'Staging a job'], [40.3, 'Receiving Orders'], [47.0, 'Box Truck Check']];
  function mmss(t) { t = Math.floor(t); return Math.floor(t / 60) + ':' + ('0' + (t % 60)).slice(-2); }
  var PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z" fill="#fff"/></svg>';
  window.stormHelpAnim = function () {
    return '<div class="sh-card sh-anim g207" aria-label="Screen recording of the app">'
      + '<div class="g207-frame"><div class="g207-scr paused" data-g207-scr role="button" tabindex="0" aria-label="Play or pause the video">'
      + '<video muted playsinline webkit-playsinline loop preload="none" disablepictureinpicture disableremoteplayback aria-label="The app, start to finish: main list, search, item details, staging a job, receiving orders, box truck check"></video>'
      + '<span class="g207-pp">' + PLAY + '</span></div></div>'
      + '<div class="g207-cap">The real app, start to finish</div>'
      + '<div class="g207-sub">About 1 minute, no sound. Tap the video to pause.</div>'
      + '<div class="g207-jump">' + PARTS.map(function (p, i) { return '<button type="button" data-g207-t="' + p[0] + '"><i>' + mmss(p[0]) + '</i>' + p[1] + '</button>'; }).join('') + '</div>'
      + '</div>';
  };
  function reduce() { try { return window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }
  function parts() { var g = document.getElementById('st-help'); if (!g) return null; var s = g.querySelector('[data-g207-scr]'); return s ? { g: g, s: s, v: s.querySelector('video') } : null; }
  function wire(p) {
    if (p.v.__g207) return; p.v.__g207 = 1;
    var on = function () { p.s.classList.add('on'); };
    p.v.addEventListener('loadeddata', on); p.v.addEventListener('playing', function () { on(); p.s.classList.remove('paused'); });
    p.v.addEventListener('pause', function () { p.s.classList.add('paused'); });
    p.v.addEventListener('timeupdate', function () {
      var t = p.v.currentTime, cur = 0; PARTS.forEach(function (x, i) { if (t >= x[0] - 0.05) cur = i; });
      if (p.v.__cur !== cur) { p.v.__cur = cur; p.g.querySelectorAll('.g207-jump button').forEach(function (b, i) { b.classList.toggle('on', i === cur); }); }
    });
  }
  function load(p) { if (!p.v.getAttribute('src')) { p.v.setAttribute('src', VID); p.v.preload = 'auto'; try { p.v.load(); } catch (e) {} } }
  function play(p) { load(p); var r; try { r = p.v.play(); } catch (e) {} if (r && r.catch) r.catch(function () { p.s.classList.add('paused'); }); }
  function top0() { var g = document.getElementById('st-help'), b = g && g.querySelector('.sh-body'); if (b && b.scrollTop) b.scrollTop = 0; } /* v192 reset scrollTop while the guide was still hidden, so a second open came back at the old spot */
  function opened() { top0(); requestAnimationFrame(top0); var p = parts(); if (!p) return; wire(p); load(p); try { p.v.currentTime = 0; } catch (e) {} if (!reduce()) play(p); else p.s.classList.add('paused'); }
  function closed() { var p = parts(); if (p) { try { p.v.pause(); } catch (e) {} } }
  document.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var j = t.closest('#st-help [data-g207-t]');
    if (j) { var p = parts(); if (!p) return; wire(p); load(p); try { p.v.currentTime = +j.getAttribute('data-g207-t'); } catch (x) {} play(p); return; }
    var s = t.closest('#st-help [data-g207-scr]');
    if (s) { var q = parts(); if (!q) return; wire(q); if (q.v.paused) play(q); else q.v.pause(); }
  });
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target && e.target.matches && e.target.matches('#st-help [data-g207-scr]')) { e.preventDefault(); e.target.click(); } });
  (function watch(n) {
    var g = document.getElementById('st-help');
    if (!g) { if (n < 2400) setTimeout(function () { watch(n + 1); }, 250); return; }
    var was = g.classList.contains('open'); if (was) opened();
    new MutationObserver(function () { var o = g.classList.contains('open'); if (o && !was) opened(); else if (!o && was) closed(); was = o; }).observe(g, { attributes: true, attributeFilter: ['class'] });
  })(0);
  document.addEventListener('visibilitychange', function () { var p = parts(); if (!p) return; if (document.hidden) { try { p.v.pause(); } catch (e) {} } else if (p.g.classList.contains('open') && !reduce()) play(p); });

  /* ---------- chapters (v192 build() reads these) ---------- */
  window.stormHelpCH207 = function (k) {
    var M = '<span class="sh-mgr">MANAGER</span>';
    return [
      { t: 'Getting around', s: 'Getting around', h:
        '<ol class="sh-steps">'
        + '<li><b>Top switch: ' + k('Staging Job') + ' | ' + k('Inventory') + '.</b> Staging Job = getting material ready for a job. Inventory = counts, ordering and prices (manager only). The crew view always opens in Staging Job.</li>'
        + '<li><b>Stocked to par</b> card: how many items are at their keep-on-hand amount, and how many are low or out. It slides away when you scroll down and comes back when you scroll up.</li>'
        + '<li><b>Supplier chips</b> under it: ' + k('All') + ', ' + k('Home Depot') + ', ' + k('RichTech') + ', ' + k('Hilti') + ', ' + k('AutoZone') + '. Tap one to see only that supplier, ' + k('All') + ' to see everything.</li>'
        + '<li><b>Item cards</b>: photo, name, SKU and the supplier logo on top. The ring shows how many are on the shelf.</li>'
        + '<li><b>Round ' + k('+') + ' bottom right</b>: tap it and the buttons pop out: Camera, Cart (Inventory) and ' + k('Customer Search') + ' (clipboard, with the number of items on the job). Tap the X to tuck them away.</li>'
        + '<li><b>Menu ' + k('&#9776;') + ' top left</b> (it turns into an X): Home, Staging, Receiving Orders, Box Truck Check, Tool Checklist, Categories, Products by supplier, Quote Templates, Resource Center, Jobber, CompanyCam, Manager Login and this guide.</li>'
        + '</ol><div class="sh-tip">Lost? Close what\'s open with its X or back arrow. You\'re back on the main list. On an iPad it\'s the same app, just wider: search and the tabs sit in one row and more cards fit across.</div>' },
      { t: 'Search', s: 'Search', h:
        '<ol class="sh-steps">'
        + '<li>Tap ' + k('Search items, SKU, bin\u2026') + ' at the top and type. Name, SKU or bin number all work.</li>'
        + '<li>It forgives typos, shop slang and sizes: <b>sump pmp</b> finds the sump pumps, <b>1 1/2 pvc</b> finds the 1-1/2 in. pipe and fittings.</li>'
        + '<li>Best match comes first under <b>Search results</b>. Nothing matches exactly? You get <b>Closest matches</b> instead.</li>'
        + '<li>Tap the X in the search box to clear it and get the full list back.</li>'
        + '</ol>' },
      { t: 'Item details', s: 'Item details', h:
        '<ol class="sh-steps">'
        + '<li>Tap an item\'s photo to open <b>Item details</b>: big photo, on hand ring, ' + k('Keep on hand') + ', ' + k('Bin') + ', ' + k('Need') + ', and the key features.</li>'
        + '<li><b>Swipe left</b> for the next item, <b>swipe right</b> for the one before, in the same order as the list you came from.</li>'
        + '<li>The store\'s logo sits above the photo, and the <b>Supplier</b> tile shows it too, so you know where it comes from.</li>'
        + '<li>Managers also see the price and ' + k('Edit keep on hand') + ' | ' + k('Edit on hand') + ' (see Counts).' + M + '</li>'
        + '<li>Back arrow top left goes back to the list.</li>'
        + '</ol>' },
      { t: 'Staging a job', s: 'Staging', h:
        '<p>Pick the job, load what it needs, check each item as it goes on the staging cart. Nothing comes out of inventory until Staged Job Complete.</p><ol class="sh-steps">'
        + '<li>Menu &rarr; ' + k('Staging') + ' (the cart-with-boxes icon). <b>Find a Job</b> opens.</li>'
        + '<li>Saved jobs are on top. Under <b>From Jobber</b>: upcoming jobs first, ' + k('Not scheduled') + ' = signed, no date yet, ' + k('Past') + ' = last 7 days. Or type the customer name or address (the X clears it).</li>'
        + '<li>Tap the job, then ' + k('Load items') + '. If the job has a Jobber quote, its items load for you. Not in Jobber? ' + k('New Job') + ' and type the name and address.</li>'
        + '<li>Need more? Close the sheet and tap ' + k('+ Add to order') + ' on any item. The card turns to ' + k('\u2713 In order') + ' and the clipboard on the ' + k('+') + ' counts it.</li>'
        + '<li>Open the list again: ' + k('+') + ' &rarr; ' + k('Customer Search') + ' (clipboard). The ring at the top counts what\'s <b>loaded</b>.</li>'
        + '<li>Tap the circle on a line when that item is <b>on the cart</b>. It turns blue and the line is crossed off. Tap again if it comes back off.</li>'
        + '<li>Tap ' + k('Save Job') + '. Want paper? ' + k('Print Preview') + ' shows the Staging List, then ' + k('Print') + '.</li>'
        + '<li>Saved job later: Find a Job &rarr; tap it &rarr; ' + k('Edit list') + ' (or ' + k('Print list') + ').</li>'
        + '</ol><div class="sh-tip">Checks show up on the rest of the crew\'s phones too, so two people can stage the same job. No signal? Checks wait on the phone and send when it\'s back.</div>' },
      { t: 'Staged Job Complete', s: 'Complete', h:
        '<p>This is the step that takes the stock out of inventory. Do it once the cart is loaded.</p><ol class="sh-steps">'
        + '<li>At the bottom of Customer Search tap the big ' + k('Staged Job Complete') + '.</li>'
        + '<li>Check the list: every checked item and how many. Lines not checked are listed as not on the cart. Those don\'t come out of inventory.</li>'
        + '<li>Tap ' + k('Stage') + '. The checked items come off ' + k('On hand') + ', once.</li>'
        + '<li>The job shows a green <b>Staged &middot; date and time</b> banner, the circles lock, and lines that weren\'t checked say <b>Not staged</b>.</li>'
        + '<li>Mistake? A manager taps ' + k('Unstage') + ' on the banner; that puts back exactly what came out.' + M + '</li>'
        + '<li>Old saved job you don\'t need? A manager can open it in Find a Job and tap ' + k('Delete job') + '.' + M + '</li>'
        + '</ol>' },
      { t: 'Ordering & the Cart', s: 'Order', h:
        '<ol class="sh-steps">'
        + '<li>Switch to ' + k('Inventory') + '.' + M + '</li>'
        + '<li>' + k('Needs Ordering') + ' (next to ' + k('All Items') + ') lists everything below its keep-on-hand amount, by supplier, with how many to order.</li>'
        + '<li>Tap ' + k('+ Add to order') + ' on a card, or use its ' + k('\u2212') + ' / ' + k('+') + '. The card and the Cart stay in step.</li>'
        + '<li>Open the Cart: ' + k('+') + ' &rarr; Cart (shows the item count and $ total). Items are grouped by supplier with a total.</li>'
        + '<li>Tick each line as you check it. Then the supplier\'s button: ' + k('Order') + ' for RichTech copies the order and opens RichTech, ' + k('Copy &amp; open') + ' for the other stores.</li>'
        + '<li>' + k('Clear') + ' empties the Cart (it asks first).</li>'
        + '</ol>' },
      { t: 'Counts (On hand & Keep on hand)', s: 'Counts', h:
        '<ol class="sh-steps">'
        + '<li>In Inventory, tap a card\'s ' + k('On hand') + ' ring or ' + k('Keep on hand') + ' button, or ' + k('Edit on hand') + ' / ' + k('Edit keep on hand') + ' in Item details. The <b>count sheet</b> opens.' + M + '</li>'
        + '<li><b>Keep on hand</b> is on the left, <b>On hand</b> on the right. Tap ' + k('\u2212') + ' / ' + k('+') + ', or hold to count fast.</li>'
        + '<li>Tap the big number to type it on the number pad.</li>'
        + '<li>It shows <b>Need</b> and OK / LOW / OUT as you go. ' + k('Save') + ' sends only what changed. ' + k('Cancel') + ' or swipe down leaves it as it was.</li>'
        + '</ol><div class="sh-tip">Count the bin. Don\'t guess.</div>' },
      { t: 'Receiving Orders', s: 'Receiving', h:
        '<p>When a delivery shows up, count it in so On hand goes up.</p><ol class="sh-steps">'
        + '<li>Menu &rarr; ' + k('Receiving Orders') + '. Everything on order is listed by supplier with how many were ordered.</li>'
        + '<li>Count what came: ' + k('+') + ' / ' + k('\u2212') + ' (hold to go fast), or tap the number to type it.</li>'
        + '<li>All of it there? ' + k('Got all') + ' on the line, or ' + k('Receive all') + ' for the whole supplier.</li>'
        + '<li>Something extra came that isn\'t on the list? ' + k('Add item not on the list') + ' to search for it.</li>'
        + '<li>Restocking bins like PVC fittings? Tap ' + k('Scan') + ' and scan each bin label: one scan = +1 (move off and back for another). Everything you scan shows in ' + k('Scanned') + ' at the top. Tap ' + k('Add N to bins') + ' there to add just those.</li>'
        + '<li>' + k('Add counted items to On hand') + ' at the bottom adds every row with a count above 0 (rows at 0 are left alone). Check the summary, confirm. On hand goes up by what you counted. This needs a manager login (the button reads ' + k('Manager login to receive') + ' until then).' + M + '</li>'
        + '</ol>' },
      { t: 'Box Truck Check & Tool Checklist', s: 'Truck check', h:
        '<ol class="sh-steps">'
        + '<li>Menu &rarr; ' + k('Box Truck Check') + ' (right under Receiving Orders). ' + k('Tool Checklist') + ' is the row under it and works the same way.</li>'
        + '<li>Fill in ' + k('TRUCK #') + ' first. Date fills in today.</li>'
        + '<li>Tap through it: tires G / OK / P, lights OK / Out, and so on. <b>Every tap saves</b> right away and shows on other phones.</li>'
        + '<li>Done? Big ' + k('Save &amp; Submit') + ' at the bottom. If some items are blank it tells you how many: ' + k('Go back') + ' or ' + k('Submit anyway') + '.</li>'
        + '<li>Then the top says <b>Submitted by NAME &middot; time</b>. Changed something after? Tap ' + k('Update submission') + '.</li>'
        + '<li>' + k('Past checks') + ' (top and bottom) lists earlier checks. Tap one to see it, read-only.</li>'
        + '<li>' + k('View / print paper copy') + ' opens the paper form to print.</li>'
        + '</ol><div class="sh-tip">If anything\'s wrong with the truck, tell Dave before it leaves.</div>' },
      { t: 'Camera & bin labels', s: 'Camera', h:
        '<ol class="sh-steps">'
        + '<li>Tap ' + k('+') + ', then the camera.</li>'
        + '<li>Point it at the QR code on a bin label. It beeps and adds the item.</li>'
        + '<li>Scan the same label again to add one more. Tap the cart in the camera screen to see or change amounts.</li>'
        + '<li>Tap the X at the top. What you scanned is in the app.</li>'
        + '</ol><div class="sh-tip">Bin label stickers: menu &rarr; Resource Center &rarr; Bin Labels, pick the store, print. One label per bin. If a code isn\'t a STORM label, the camera says so and nothing gets added.</div>' },
      { t: 'Manager Login & manager-only', s: 'Manager', h:
        '<ol class="sh-steps">'
        + '<li>The app opens in the <b>crew view</b>: no prices, no ordering, no count changes. No code needed.</li>'
        + '<li>Crew can: browse and search, Item details, Staging (Find a Job, Customer Search, check onto the cart, ' + k('Staged Job Complete') + '), print the Staging List, scan labels, Box Truck Check and Tool Checklist, count a delivery in Receiving Orders.</li>'
        + '<li>Log in: menu &rarr; ' + k('Manager Login') + ' (or tap ' + k('Inventory') + ' on the top switch), type the code. It switches right there, prices show.</li>'
        + '<li><b>Manager only:</b> prices, ' + k('Inventory') + ' and ' + k('Needs Ordering') + ', the Cart and ordering, the count sheet, confirming Receiving Orders, ' + k('Unstage') + ', ' + k('Delete job') + ', and in Resource Center: ' + k('Insurance Certificates') + ' and ' + k('Logos') + '.</li>'
        + '<li>A manager phone stays logged in for 30 days. Menu &rarr; ' + k('Manager \u00b7 Log out') + ' goes back to the crew view. Too many wrong codes locks it for 10 minutes.</li>'
        + '</ol>'
        + '<h4 style="margin:14px 0 4px;font-size:16px;font-weight:800">Sending an insurance certificate' + M + '</h4><ol class="sh-steps">'
        + '<li>Menu &rarr; Resource Center &rarr; ' + k('Insurance Certificates') + '. Pick the agent: workers comp, or general liability &amp; disability.</li>'
        + '<li>Tap ' + k('Email') + '. Type the customer\'s name to find them in Jobber (quotes and leads too) and tap them. Or ' + k('Skip, continue to email') + '.</li>'
        + '<li>The email opens with a Customer information section filled in. Check it and send.</li>'
        + '</ol>' },
      { t: 'Do & Don\'t', s: 'Do / Don\'t', h:
        '<div class="sh-two"><div><h4>Do</h4><ol class="sh-steps sh-do">'
        + '<li>Check a line only when it\'s on the staging cart.</li><li>Tap Staged Job Complete once the cart is done.</li><li>Grab whole rolls and sticks.</li><li>Save Job before you print.</li><li>Fill in TRUCK # and Save &amp; Submit the truck check.</li><li>Count deliveries in Receiving Orders.</li></ol></div>'
        + '<div><h4>Don\'t</h4><ol class="sh-steps sh-dont">'
        + '<li>Don\'t check lines ahead of time.</li><li>Don\'t tap Staged Job Complete before the cart is loaded.</li><li>Don\'t share the manager code.</li><li>Don\'t guess counts. Count the bin.</li><li>Don\'t take stuff without it being on Customer Search.</li></ol></div></div>' }
    ];
  };
})();

/* v211 (Hark, 2026-11-12, Dave): the "Stocked to par" ring (home card + side menu) now says what the number is -
   "STOCKED" under the %, = share of item lines at or above their Keep on hand (par) - and its colour runs
   red (very low) -> yellow (middle) -> green (full), blending smoothly with the %. Only recolours/labels the ring; counts unchanged. */
(function () {
  if (window.__storm211) return; window.__storm211 = 1;
  var STOPS = [[0, [220, 38, 38]], [50, [234, 179, 8]], [100, [22, 163, 74]]];
  function col(p) {
    p = Math.max(0, Math.min(100, p));
    var a = STOPS[0], b = STOPS[1]; if (p > 50) { a = STOPS[1]; b = STOPS[2]; }
    var t = (p - a[0]) / (b[0] - a[0]);
    return 'rgb(' + a[1].map(function (v, i) { return Math.round(v + (b[1][i] - v) * t); }).join(',') + ')';
  }
  var NS = 'http://www.w3.org/2000/svg';
  function fix(host) {
    var svg = host && host.querySelector('svg'); if (!svg) return;
    var texts = svg.querySelectorAll('text'); if (!texts.length) return;
    var big = texts[0], m = /(\d+)\s*%/.exec(big.textContent || ''); if (!m) return;
    var p = +m[1], c = col(p), circ = svg.querySelectorAll('circle');
    if (circ[1] && circ[1].getAttribute('stroke') !== c) circ[1].setAttribute('stroke', c);
    var vb = (svg.getAttribute('viewBox') || '0 0 76 76').split(/\s+/), size = +vb[2] || 76;
    if (texts.length === 1) {
      big.setAttribute('y', (size * 0.45).toFixed(1));
      big.setAttribute('font-size', (size * 0.25).toFixed(1));
      var lb = document.createElementNS(NS, 'text');
      lb.setAttribute('x', '50%'); lb.setAttribute('y', (size * 0.66).toFixed(1));
      lb.setAttribute('text-anchor', 'middle'); lb.setAttribute('dominant-baseline', 'middle');
      lb.setAttribute('font-family', big.getAttribute('font-family') || 'Montserrat,sans-serif');
      lb.setAttribute('font-weight', '800'); lb.setAttribute('font-size', Math.max(6.5, size * 0.11).toFixed(1));
      lb.setAttribute('letter-spacing', '0.6'); lb.setAttribute('fill', '#6B7280');
      lb.textContent = 'STOCKED';
      svg.appendChild(lb);
    }
    host.title = p + '% of item lines are at or above their Keep on hand amount';
  }
  function run() {
    fix(document.querySelector('#gd-sum .gd-ring'));
    fix(document.querySelector('#cl-menu .cl-pring'));
  }
  var q = 0;
  function soon() { if (q) return; q = 1; (window.requestAnimationFrame || setTimeout)(function () { q = 0; run(); }); }
  function start() {
    run();
    try { new MutationObserver(soon).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['stroke'] }); } catch (e) {}
    setInterval(run, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* v212 (Hark, 2026-11-12, Dave): the "Staged" banner on Customer Search keeps its green check only when 100% of the lines were staged.
   Otherwise the check becomes a ring (same look as the Stocked to par ring) showing the % staged, coloured red -> yellow -> green like v211. */
(function () {
  if (window.__storm212) return; window.__storm212 = 1;
  var STOPS = [[0, [220, 38, 38]], [50, [234, 179, 8]], [100, [22, 163, 74]]];
  function col(p) {
    p = Math.max(0, Math.min(100, p));
    var a = STOPS[0], b = STOPS[1]; if (p > 50) { a = STOPS[1]; b = STOPS[2]; }
    var t = (p - a[0]) / (b[0] - a[0]);
    return 'rgb(' + a[1].map(function (v, i) { return Math.round(v + (b[1][i] - v) * t); }).join(',') + ')';
  }
  function ring(p) {
    var s = 36, w = 4.5, r = (s - w) / 2, c = 2 * Math.PI * r, on = p / 100 * c;
    return '<svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true"><circle cx="18" cy="18" r="' + r + '" fill="#fff" stroke="#E3E8EF" stroke-width="' + w + '"/>'
      + (on > 0.5 ? '<circle cx="18" cy="18" r="' + r + '" fill="none" stroke="' + col(p) + '" stroke-width="' + w + '" stroke-linecap="round" stroke-dasharray="' + on.toFixed(1) + ' ' + c.toFixed(1) + '" transform="rotate(-90 18 18)"/>' : '')
      + '<text x="18" y="19" text-anchor="middle" dominant-baseline="middle" font-family="Montserrat,-apple-system,Segoe UI,Roboto,sans-serif" font-weight="800" font-size="' + (p < 10 ? 10 : 9) + '" fill="#0F1720">' + p + '%</text></svg>';
  }
  var st = document.createElement('style'); st.id = 'storm-v212-css';
  st.textContent = 'html body #pull-sheet .sj-banner > i.sj212 { width: 36px !important; height: 36px !important; background: transparent !important; line-height: 0 !important; }'
    + 'html body #pull-sheet .sj-banner > i.sj212 svg { display: block; }'
    + 'html body #pull-sheet .sj-banner.sj212-part { background: #fff !important; border-color: #E3E8EF !important; color: #0F1720 !important; }'
    + 'html body #pull-sheet .sj-banner.sj212-part small { color: #6B7280 !important; }';
  (document.head || document.documentElement).appendChild(st);
  function run() {
    var sh = document.getElementById('pull-sheet'), ban = sh && sh.querySelector('.sj-banner'); if (!ban) return;
    var all = sh.querySelectorAll('.pick-line[data-pull-bin]').length, done = sh.querySelectorAll('.pick-line[data-pull-bin].tc-done').length;
    if (!all) return;
    var p = Math.round(done / all * 100), i = ban.querySelector(':scope > i'); if (!i) return;
    var full = done >= all;
    ban.classList.toggle('sj212-part', !full);
    if (full) { if (i.classList.contains('sj212')) { i.classList.remove('sj212'); i.textContent = '\u2713'; } return; }
    if (i.classList.contains('sj212') && i.__p === p) return;
    i.classList.add('sj212'); i.__p = p; i.innerHTML = ring(p);
    i.setAttribute('aria-label', p + '% of the lines were staged');
  }
  var q = 0; function soon() { if (q) return; q = 1; setTimeout(function () { q = 0; run(); }, 40); }
  function start() { run(); try { new MutationObserver(soon).observe(document.body, { childList: true, subtree: true }); } catch (e) {} setInterval(run, 1200); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

/* v213 (Hark, 2026-11-12, Dave): the search magnifier (was top-right) and the camera button (was beside the bar, v183) sit INSIDE the search bar:
   magnifier on the left (tap = focus the search), camera on the right (same scan as before). */
(function () {
  if (window.__storm213) return; window.__storm213 = 1;
  var X = 'html body.cl', st = document.createElement('style'); st.id = 'storm-v213-css';
  st.textContent = ''
    + X + ' .st213-box { position: relative; flex: 1 1 auto; min-width: 0; display: block; }'
    + X + ' .st213-box #search { width: 100% !important; box-sizing: border-box !important; padding-left: 42px !important; padding-right: 50px !important; }'
    + X + ' .st213-box #search::-webkit-search-cancel-button { display: none; }'
    + X + ' #gd-find.st213 { position: absolute !important; left: 6px !important; right: auto !important; top: 50% !important; transform: translateY(-50%) !important; width: 32px !important; height: 32px !important; margin: 0 !important; padding: 0 !important; border: 0 !important; background: transparent !important; box-shadow: none !important; color: #8A94A3 !important; z-index: 3; display: flex; align-items: center; justify-content: center; }'
    + X + ' #gd-find.st213 svg { width: 18px !important; height: 18px !important; }'
    + X + ' #storm-qr-btn.st213 { position: absolute !important; right: 5px !important; left: auto !important; bottom: auto !important; top: 50% !important; transform: translateY(-50%) !important; width: 36px !important; height: 36px !important; margin: 0 !important; border: 0 !important; border-radius: 50% !important; background: transparent !important; box-shadow: none !important; color: #0F1720 !important; z-index: 3; }'
    + X + ' #storm-qr-btn.st213:active { transform: translateY(-50%) scale(.92) !important; }';
  (document.head || document.documentElement).appendChild(st);
  function run() {
    var q = document.getElementById('search'), row = q && q.closest('.search-row'); if (!row) return;
    var box = q.parentNode.classList && q.parentNode.classList.contains('st213-box') ? q.parentNode : null;
    if (!box) { box = document.createElement('span'); box.className = 'st213-box'; q.parentNode.insertBefore(box, q); box.appendChild(q); }
    var f = document.getElementById('gd-find'); if (f && f.parentNode !== box) { f.classList.add('st213'); box.appendChild(f); }
    var c = document.getElementById('storm-qr-btn'); if (c && c.parentNode !== box) { c.classList.add('st213'); box.appendChild(c); }
  }
  function start() { run(); var n = 0, iv = setInterval(function () { run(); if (++n > 40) { clearInterval(iv); setInterval(run, 3000); } }, 250); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
  window.addEventListener('load', function () { document.head.appendChild(st); run(); });
})();

/* v214 (Hark, 2026-11-12, Dave approved 21:41): "Staged jobs" + "Loaded on truck".
   Side menu row "Staged jobs" (right under Staging) opens a full screen list of every staged job (server getStagedJobs, app v190),
   newest first, with "N of M loaded". Tap a job: its staged items, each with a big Loaded box. A tap saves through
   setStagingCheck under the key "ld:<jobKey>" so every phone sees it (refreshes every 5 s while open). Loading never moves stock. */
(function () {
  if (window.__storm214) return; window.__storm214 = 1;
  var $ = function (id) { return document.getElementById(id); };
  var HD = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/assets/items-hd/';
  var TRUCK = '<path d="M1.5 6.5h12v9h-12z"/><path d="M13.5 9.5h4l3 3v3h-7z"/><circle cx="5.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>';
  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function dev() { try { return String(localStorage.getItem('stormDeviceNameV1') || '').slice(0, 60); } catch (e) { return ''; } }
  function run() { try { return window.google && google.script && google.script.run; } catch (e) { return null; } }
  var css = ''
    + '#sj214 { position: fixed; inset: 0; z-index: 136; overflow-y: auto; -webkit-overflow-scrolling: touch; background: #EAF0F7; color: #0F1720; font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; transform: translateX(100%); transition: transform .26s cubic-bezier(.2,.8,.2,1); visibility: hidden; padding-bottom: calc(30px + env(safe-area-inset-bottom)); }'
    + '#sj214.open { transform: none; visibility: visible; }'
    + '#sj214 .s-top { position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 10px; padding: calc(14px + env(safe-area-inset-top)) 16px 10px; background: #EAF0F7; }'
    + '#sj214 .s-top h2 { flex: 1; margin: 0; font-size: 22px; font-weight: 800; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '#sj214 .s-btn { flex: none; width: 42px; height: 42px; border-radius: 50%; border: 0; background: #fff; color: #0F1720; font-size: 24px; line-height: 42px; padding: 0; box-shadow: 0 4px 14px rgba(15,23,32,.08); font-family: inherit; }'
    + '#sj214 .s-wrap { max-width: 620px; margin: 0 auto; padding: 4px 16px; }'
    + '#sj214 .s-note { padding: 30px 10px; text-align: center; color: #6B7280; font-size: 15px; font-weight: 600; line-height: 1.45; }'
    + '#sj214 .s-job { display: flex; align-items: center; gap: 14px; width: 100%; margin: 0 0 10px; padding: 14px 16px; border: 0; border-radius: 16px; background: #fff; box-shadow: 0 4px 14px rgba(15,23,32,.06); text-align: left; font-family: inherit; color: inherit; }'
    + '#sj214 .s-ring { flex: none; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12.5px; font-weight: 800; }'
    + '#sj214 .s-ring i { width: 40px; height: 40px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-style: normal; }'
    + '#sj214 .s-nm { font-size: 16.5px; font-weight: 800; line-height: 1.25; }'
    + '#sj214 .s-sub { margin-top: 3px; font-size: 13px; font-weight: 600; color: #6B7280; line-height: 1.35; }'
    + '#sj214 .s-done { color: #15803D; }'
    + '#sj214 .s-head { margin: 2px 0 12px; padding: 14px 16px; border-radius: 16px; background: #fff; box-shadow: 0 4px 14px rgba(15,23,32,.06); }'
    + '#sj214 .s-line { display: flex; align-items: center; gap: 12px; margin: 0 0 8px; padding: 10px 12px; border-radius: 14px; background: #fff; box-shadow: 0 2px 8px rgba(15,23,32,.05); }'
    + '#sj214 .s-line img { width: 48px; height: 48px; flex: none; border-radius: 10px; object-fit: contain; background: #F3F6FA; }'
    + '#sj214 .s-li { flex: 1; min-width: 0; }'
    + '#sj214 .s-ln { font-size: 15px; font-weight: 700; line-height: 1.25; }'
    + '#sj214 .s-lq { margin-top: 2px; font-size: 13px; font-weight: 600; color: #6B7280; }'
    + '#sj214 .s-box { flex: none; display: flex; flex-direction: column; align-items: center; gap: 3px; border: 0; background: none; padding: 0; font-family: inherit; color: #6B7280; font-size: 10.5px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; -webkit-tap-highlight-color: transparent; }'
    + '#sj214 .s-box b { width: 44px; height: 44px; border-radius: 12px; border: 2.5px solid #B8C4D0; background: #fff; color: #fff; display: flex; align-items: center; justify-content: center; }'
    + '#sj214 .s-box b svg { width: 26px; height: 26px; opacity: 0; }'
    + '#sj214 .s-box.on { color: #15803D; }'
    + '#sj214 .s-box.on b { border-color: #16A34A; background: #16A34A; }'
    + '#sj214 .s-box.on b svg { opacity: 1; }'
    + '#sj214 .s-line.on { background: #F0FBF3; }'
    + '#sj214 .lk216 .s-box { opacity: .55; pointer-events: none; }' /* v216: Completed job: boxes locked */
    + '#sj214 .s-err { margin: 0 0 10px; padding: 10px 12px; border-radius: 12px; background: #FEECEC; color: #B42318; font-size: 13.5px; font-weight: 700; }'
    /* v215: photo placeholder + fade-in, job-list thumbnails, skeleton rows, list <-> job slide/fade */
    + '#sj214 .ph215 { flex: none; display: block; width: 48px; height: 48px; border-radius: 10px; background: #EEF2F7; overflow: hidden; }'
    + '#sj214 .ph215 img { display: block; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity .22s ease; }'
    + '#sj214 .ph215 img.ld { opacity: 1; }'
    + '#sj214 .s-ths { display: flex; gap: 6px; margin-top: 8px; align-items: center; }'
    + '#sj214 .ph215.th { width: 30px; height: 30px; border-radius: 8px; }'
    + '#sj214 .s-ths em { font-style: normal; font-size: 12px; font-weight: 800; color: #6B7280; }'
    + '#sj214 .sk215 { pointer-events: none; }'
    + '#sj214 .s-ring.sk { background: #E3E8EF; }'
    + '#sj214 .skl { display: block; height: 11px; margin: 5px 0; border-radius: 6px; background: linear-gradient(90deg,#EEF2F7 0,#F6F8FB 50%,#EEF2F7 100%); background-size: 200% 100%; animation: sk215 1.2s ease-in-out infinite; }'
    + '@keyframes sk215 { from { background-position: 100% 0; } to { background-position: -100% 0; } }'
    + '#sj214 .in-f215 { animation: in215f .24s cubic-bezier(.2,.8,.2,1); }'
    + '#sj214 .in-b215 { animation: in215b .24s cubic-bezier(.2,.8,.2,1); }'
    + '@keyframes in215f { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }'
    + '@keyframes in215b { from { opacity: 0; transform: translateX(-24px); } to { opacity: 1; transform: none; } }'
    + '@media (prefers-reduced-motion: reduce) { #sj214 .in-f215, #sj214 .in-b215, #sj214 .skl { animation: none; } #sj214 .ph215 img { transition: none; } }';
  var st = document.createElement('style'); st.id = 'storm-v214-css'; st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  var S = { open: false, jobs: [], cur: null, busy: 0, err: '', loaded: false, timer: 0, pend: {} };
  function scr() {
    var s = $('sj214'); if (s) return s;
    s = document.createElement('div'); s.id = 'sj214'; s.setAttribute('role', 'dialog'); s.setAttribute('aria-label', 'Staged jobs');
    document.body.appendChild(s); return s;
  }
  function pct(j) { var n = j.lines.length, d = j.lines.filter(function (l) { return l.loaded; }).length; return { n: n, d: d, p: n ? d / n : 0 }; }
  function col(p) { return p >= 1 ? '#16A34A' : p > 0 ? '#29ABE2' : '#D5DDE6'; }
  function when(ms) { try { return new Date(ms).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function find(k) { for (var i = 0; i < S.jobs.length; i++) if (S.jobs[i].jobKey === k) return S.jobs[i]; return null; }
  /* v215 (Hark, 2026-11-13, Dave: "photos not populating", "Ready to load on truck flashes"): the screen is patched in place (morph below)
     instead of rebuilt every 5 s poll, so nothing blinks; the final labels (title, Ready to load / Completed) are painted in the same frame
     (Index stormSJFin203 = finished jobs), photos use the main list's photo (card image / photoUrl, then the HD copy) with a neutral
     placeholder and a fade-in, the job list is cached on the phone and shown at once, and list <-> job moves with a short slide/fade.
     Elements marked data-keep (Index's Finish / manager buttons) are left where they are. */
  var CK = 'stormStagedJobsV215', PH = {}, BAD = {};
  function fin() { try { return (window.stormSJFin203 && window.stormSJFin203()) || {}; } catch (e) { return {}; } }
  /* photo order (Dave 06:43): sheetimg photo (same lookup as Customer Search: phone cache, then getProductImages) -> main-list photo ->
     assets/items-hd/<bin>.jpg -> grey placeholder. While a sheetimg photo is being fetched the placeholder shows, then it fades in. */
  var PEND = {}, NOREF = {}, LBAD = {};
  function upd(bin) {
    [].forEach.call(document.querySelectorAll('.ph215[data-ph]'), function (sp) {
      if (sp.getAttribute('data-ph') !== bin) return; var u = photo(bin), im = sp.querySelector('img');
      if (!u) { if (im) im.remove(); return; }
      if (!im) { im = document.createElement('img'); im.alt = ''; im.decoding = 'async'; im.src = u; sp.appendChild(im); } else if (im.getAttribute('src') !== u) { im.classList.remove('ld'); im.__w215 = 0; im.src = u; }
      wire(sp);
    });
  }
  function photo(bin) {
    if (PH[bin]) return PH[bin];
    var u = '', si = null;
    if (!NOREF[bin]) { try { si = window.stormImg203 && window.stormImg203.now(bin); } catch (e) { si = null; } }
    if (si) {
      if (si.d) { PH[bin] = si.d; return si.d; }
      if (!PEND[bin]) { PEND[bin] = 1; try { window.stormImg203.get(bin, function (d) { delete PEND[bin]; if (d) PH[bin] = d; else NOREF[bin] = 1; upd(bin); }); } catch (e) { delete PEND[bin]; NOREF[bin] = 1; } }
      if (PEND[bin]) return '';
    }
    try { var im = document.querySelector('#list .card[data-bin="' + String(bin).replace(/["\\]/g, '\\$&') + '"] img'); u = im && (im.currentSrc || im.src) || ''; } catch (e) {}
    if (u && LBAD[bin] === u) u = '';
    if (!u) { var it = null; try { it = findItem(bin); } catch (e) {} var p = it && it.photoUrl; if (p && !/^sheetimg:/.test(String(p)) && LBAD[bin] !== String(p)) u = String(p); }
    if (!u && !BAD[bin]) u = HD + encodeURIComponent(bin) + '.jpg?v=1';
    if (u) PH[bin] = u; return u;
  }
  function img(bin, cls) {
    var u = photo(bin);
    return '<span class="ph215' + (cls ? ' ' + cls : '') + '" data-ph="' + esc(bin) + '">' + (u ? '<img src="' + esc(u) + '" alt="" decoding="async">' : '') + '</span>';
  }
  /* an image that answers: fade in; one that fails: drop to the next source, else keep the grey placeholder */
  function wire(root) {
    [].forEach.call(root.querySelectorAll('.ph215 img'), function (im) {
      if (im.__w215) return; im.__w215 = 1;
      function ok() { im.classList.add('ld'); }
      function bad() {
        var sp = im.parentNode, bin = sp && sp.getAttribute('data-ph'); if (!bin) return;
        var was = im.getAttribute('src') || ''; delete PH[bin];
        if (was.indexOf(HD) === 0) BAD[bin] = 1; else if (/^data:/.test(was)) NOREF[bin] = 1; else LBAD[bin] = was; /* next source in the order */
        var nx = photo(bin);
        if (nx && nx !== was) { im.src = nx; } else { BAD[bin] = 1; im.remove(); }
      }
      if (im.complete && im.naturalWidth) ok(); else if (im.complete && im.src) bad();
      im.addEventListener('load', ok); im.addEventListener('error', bad);
    });
  }
  window.stormPhoto215 = { url: photo, html: img, wire: wire };
  /* minimal DOM morph: same tag -> sync attributes/text and recurse; else replace. data-keep elements in the old tree are left alone. */
  function keep(n) { return n.nodeType === 1 && n.hasAttribute('data-keep'); }
  function morph(a, b) {
    if (a.nodeType !== b.nodeType || a.nodeName !== b.nodeName) { a.parentNode.replaceChild(b, a); return; }
    if (a.nodeType === 3) { if (a.nodeValue !== b.nodeValue) a.nodeValue = b.nodeValue; return; }
    if (a.nodeType !== 1) return;
    if (a.nodeName === 'IMG') { if (a.getAttribute('src') !== b.getAttribute('src')) { a.classList.remove('ld'); a.__w215 = 0; a.setAttribute('src', b.getAttribute('src')); } return; }
    var i, at;
    for (i = a.attributes.length - 1; i >= 0; i--) { at = a.attributes[i].name; if (!b.hasAttribute(at)) a.removeAttribute(at); }
    for (i = 0; i < b.attributes.length; i++) { at = b.attributes[i]; if (a.getAttribute(at.name) !== at.value) a.setAttribute(at.name, at.value); }
    if (a.nodeName === 'BUTTON' && a.disabled !== b.disabled) a.disabled = b.disabled;
    var ka = [].filter.call(a.childNodes, function (n) { return !keep(n); }), kb = [].slice.call(b.childNodes);
    var anchor = [].filter.call(a.childNodes, keep)[0] || null;
    for (i = 0; i < kb.length; i++) {
      if (i < ka.length) {
        var o = ka[i], n = kb[i];
        /* keyed rows: a different job / item in this slot is a replacement, not a patch */
        var oka = o.nodeType === 1 && (o.getAttribute('data-sj-job') || o.getAttribute('data-k215')), okb = n.nodeType === 1 && (n.getAttribute('data-sj-job') || n.getAttribute('data-k215'));
        if (oka !== okb) { a.replaceChild(n, o); continue; }
        morph(o, n);
      } else a.insertBefore(kb[i], anchor);
    }
    for (i = kb.length; i < ka.length; i++) ka[i].remove();
  }
  var view = '';
  function html() {
    var h = '', F = fin();
    var j = S.cur ? find(S.cur) : null;
    if (S.cur && !j && S.loaded) S.cur = null;
    if (j) {
      var c = pct(j), done = !!F[j.jobKey];
      h += '<div class="s-top"><button type="button" class="s-btn" data-sj-back aria-label="Back">\u2039</button><h2>' + esc(j.customer.split(' \u00b7 ')[0] || 'Staged job') + '</h2><button type="button" class="s-btn" data-sj-x aria-label="Close">\u00d7</button></div><div class="s-wrap' + (done ? ' lk216' : '') + '" data-v215="job">'
        + '<div class="s-head"><div class="s-sub">' + esc(j.customer.split(' \u00b7 ').slice(1).join(' \u00b7 ')) + '</div>'
        + '<div class="s-nm' + (done ? ' c196' : c.p >= 1 ? ' s-done' : '') + '" style="margin-top:6px">' + (done ? 'Completed' : c.p >= 1 ? 'All loaded on the truck' : c.d + ' of ' + c.n + ' loaded on the truck') + '</div>'
        + '<div class="s-sub">Staged ' + esc(when(j.at)) + (j.by ? ' by ' + esc(j.by) : '') + '</div></div>'
        + (S.err ? '<div class="s-err">' + esc(S.err) + '</div>' : '');
      if (!j.lines.length) h += '<div class="s-note">No staged items on this job.</div>';
      j.lines.forEach(function (l) {
        h += '<div class="s-line' + (l.loaded ? ' on' : '') + '" data-k215="' + esc(l.bin) + '">' + img(l.bin)
          + '<div class="s-li"><div class="s-ln">' + esc(l.name || l.bin) + '</div><div class="s-lq">Qty ' + esc(l.qty === '' ? '-' : l.qty) + (l.loaded && l.loadedBy ? ' \u00b7 ' + esc(l.loadedBy) : '') + '</div></div>'
          + '<button type="button" class="s-box' + (l.loaded ? ' on' : '') + '" data-sj-bin="' + esc(l.bin) + '" aria-pressed="' + (l.loaded ? 'true' : 'false') + '"><b>' + CHK + '</b>Loaded</button></div>';
      });
      h += '</div>';
      return { v: 'job:' + j.jobKey, h: h };
    }
    h += '<div class="s-top"><h2>Ready to load on truck</h2><button type="button" class="s-btn" data-sj-x aria-label="Close">\u00d7</button></div><div class="s-wrap" data-v215="list">'
      + (S.err ? '<div class="s-err">' + esc(S.err) + '</div>' : '');
    if (!S.loaded && !S.jobs.length) { for (var q = 0; q < 3; q++) h += '<div class="s-job sk215" data-k215="sk' + q + '" aria-hidden="true"><span class="s-ring sk"></span><span style="flex:1;min-width:0"><i class="skl" style="width:55%"></i><i class="skl" style="width:80%"></i><i class="skl" style="width:35%"></i></span></div>'; }
    else if (!S.jobs.length) h += '<div class="s-note">No staged jobs yet.<br>Stage a job in Customer Search and tap Staged Job Complete.</div>';
    S.jobs.forEach(function (j) {
      var c = pct(j), nm = j.customer.split(' \u00b7 ')[0] || j.jobKey, ad = j.customer.split(' \u00b7 ').slice(1).join(' \u00b7 ');
      var st = F[j.jobKey] ? ['s-sub c196', 'Completed'] : c.p >= 1 ? ['s-sub s-done', 'All loaded'] : c.d === 0 ? ['s-sub r196', 'Ready to load \u00b7 0 of ' + c.n + ' loaded'] : ['s-sub', c.d + ' of ' + c.n + ' loaded'];
      h += '<button type="button" class="s-job" data-sj-job="' + esc(j.jobKey) + '"><span class="s-ring" style="background:conic-gradient(' + col(c.p) + ' ' + Math.round(c.p * 360) + 'deg,#E3E8EF 0)"><i>' + c.d + '/' + c.n + '</i></span>'
        + '<span style="flex:1;min-width:0"><div class="s-nm">' + esc(nm) + '</div><div class="s-sub">' + (ad ? esc(ad) + '<br>' : '') + 'Staged ' + esc(when(j.at)) + '</div>'
        + '<div class="' + st[0] + '">' + st[1] + '</div>'
        + (j.lines.length ? '<span class="s-ths">' + j.lines.slice(0, 5).map(function (l) { return img(l.bin, 'th'); }).join('') + (j.lines.length > 5 ? '<em>+' + (j.lines.length - 5) + '</em>' : '') + '</span>' : '')
        + '</span></button>';
    });
    h += '</div>';
    return { v: 'list', h: h };
  }
  function render(anim) {
    var s = scr(), r = html();
    var t = document.createElement('div'); t.innerHTML = r.h;
    if (r.v !== view || !s.firstChild) {
      var back = view.indexOf('job:') === 0 && r.v === 'list';
      var was = view; view = r.v;
      [].forEach.call(s.querySelectorAll(':scope > [data-keep]'), function (k) { k.remove(); });
      s.textContent = ''; while (t.firstChild) s.appendChild(t.firstChild);
      s.scrollTop = 0;
      var w = s.querySelector('.s-wrap'); if (w && was && anim !== false) { w.classList.add(back ? 'in-b215' : 'in-f215'); setTimeout(function () { w.classList.remove('in-b215', 'in-f215'); }, 300); }
    } else {
      var y = s.scrollTop;
      var ch = [].filter.call(s.childNodes, function (n) { return !keep(n); });
      var nb = [].slice.call(t.childNodes);
      for (var i = 0; i < nb.length; i++) { if (ch[i]) morph(ch[i], nb[i]); else s.appendChild(nb[i]); }
      for (i = nb.length; i < ch.length; i++) ch[i].remove();
      if (s.scrollTop !== y) s.scrollTop = y;
    }
    wire(s);
  }
  function save() { try { localStorage.setItem(CK, JSON.stringify({ t: Date.now(), jobs: S.jobs.slice(0, 40) })); } catch (e) {} }
  try { var c0 = JSON.parse(localStorage.getItem(CK) || 'null'); if (c0 && c0.jobs && Date.now() - c0.t < 7 * 864e5) S.jobs = c0.jobs; } catch (e) {}
  var sig = '';
  function load() {
    var r = run(); if (!r) { S.err = 'Open the app with signal to see staged jobs.'; S.loaded = true; if (S.open) render(); return; }
    if (S.busy || (S.inflight && Date.now() - S.inflight < 20000)) return; /* one call at a time; a reply that never comes frees the slot after 20 s */
    S.inflight = Date.now(); var tq = S.tq || 0;
    r.withSuccessHandler(function (res) {
      S.inflight = 0;
      if (S.busy) return;
      if (tq !== (S.tq || 0)) { setTimeout(load, 400); return; } /* v216: this poll left before a Loaded tap: its answer is older than the tap, ask again */
      var jobs = (res && res.jobs) || [];
      jobs.forEach(function (j) { j.lines.forEach(function (l) { var p = S.pend[j.jobKey + '|' + l.bin]; if (p != null) l.loaded = p; }); });
      /* a seeded job (just staged on this phone) stays until the server lists it */
      (S.seed || []).forEach(function (sd) { if (Date.now() - sd.t < 20000 && !jobs.some(function (x) { return x.jobKey === sd.j.jobKey; })) jobs.unshift(sd.j); });
      var ns = JSON.stringify(jobs), ce = S.err && /signal|load/i.test(S.err);
      var wasLoaded = S.loaded; S.loaded = true; if (ce) S.err = '';
      if (ns === sig && wasLoaded && !ce) return; /* nothing changed: no repaint at all */
      jobs.forEach(function (j) { var pv = find(j.jobKey); if (!pv) return; var ix = {}; pv.lines.forEach(function (l, i) { ix[l.bin] = i; }); j.lines.sort(function (a, b) { return (a.bin in ix ? ix[a.bin] : 1e4) - (b.bin in ix ? ix[b.bin] : 1e4); }); }); /* keep the order on screen (no row shuffle) */
      ns = JSON.stringify(jobs); if (ns === sig && wasLoaded && !ce) return;
      sig = ns; S.jobs = jobs; save(); jobs.forEach(function (j) { j.lines.forEach(function (l) { photo(l.bin); }); });
      if (S.open) render();
    }).withFailureHandler(function () { S.inflight = 0; S.loaded = true; S.err = 'Couldn\u2019t load staged jobs. Check signal.'; if (S.open) render(); }).getStagedJobs();
  }

  function toast216(m) { try { showToast(m); } catch (e) {} }
  var FINMSG = 'This job is finished. A manager can remove it to start over.';
  function tap(bin) {
    var j = find(S.cur); if (!j) return;
    if (fin()[j.jobKey]) { toast216(FINMSG); return; } /* v216: a Completed job's boxes never change */
    S.tq = (S.tq || 0) + 1;
    var l = null; j.lines.forEach(function (x) { if (x.bin === bin) l = x; }); if (!l) return;
    var on = !l.loaded, key = j.jobKey + '|' + bin, r = run();
    l.loaded = on; l.loadedBy = on ? dev() : ''; S.pend[key] = on; S.err = ''; render();
    if (!r) { S.err = 'No signal. That tap wasn\u2019t saved.'; l.loaded = !on; delete S.pend[key]; render(); return; }
    S.busy++;
    r.withSuccessHandler(function () { S.busy--; delete S.pend[key]; sig = ''; save(); })
     .withFailureHandler(function (er) { S.busy--; delete S.pend[key]; l.loaded = !on; S.tq = (S.tq || 0) + 1;
       if (/JOB_FINISHED/.test(String(er && (er.message || er) || ''))) { S.err = ''; render(); toast216(FINMSG); try { if (window.stormSJLoadF203) window.stormSJLoadF203(); } catch (x) {} return; } /* v216: finished on another phone */
       S.err = 'Couldn\u2019t save that. Try again.' + (er && er.message ? ' (' + String(er.message).slice(0, 80) + ')' : ''); render(); })
     .setStagingCheck('ld:' + j.jobKey, j.customer, bin, l.name, l.qty, on, dev(), (window.stormCrewPin && window.stormCrewPin.get) ? window.stormCrewPin.get() : '');
  }
  /* open(jobKey?, seedJob?, instant?): jobKey opens straight on that job's load screen (no list first); seedJob = the job this phone just
     staged, shown at once until the server lists it; instant = no slide (something else is covering the screen and fades away) */
  function open(k, seed, instant) {
    var s = scr(); S.open = true; S.err = '';
    if (seed && seed.jobKey) { S.seed = (S.seed || []).filter(function (x) { return x.j.jobKey !== seed.jobKey; }); S.seed.push({ t: Date.now(), j: seed }); if (!find(seed.jobKey)) S.jobs.unshift(seed); }
    S.cur = (typeof k === 'string' && k) ? k : null; view = '';
    if (instant) { s.style.transition = 'none'; s.classList.add('open'); render(false); void s.offsetWidth; setTimeout(function () { s.style.removeProperty('transition'); }, 50); }
    else { render(false); void s.offsetWidth; requestAnimationFrame(function () { s.classList.add('open'); }); }
    load(); clearInterval(S.timer); S.timer = setInterval(function () { if (S.open && !document.hidden) load(); }, 5000);
  }
  function close() { var s = $('sj214'); S.open = false; clearInterval(S.timer); if (s) s.classList.remove('open'); }
  window.stormOpenStagedJobs = open;
  /* v215: Index hooks (Finish / manager tools): current job, repaint, back to the list, drop a job, refresh now */
  window.stormSJ215 = {
    cur: function () { return S.open ? S.cur : null; }, job: function (k) { return find(k); }, open: function () { return S.open; },
    paint: function () { if (S.open) render(); }, back: function () { S.cur = null; S.err = ''; if (S.open) render(); },
    drop: function (k) { S.jobs = S.jobs.filter(function (j) { return j.jobKey !== k; }); S.seed = (S.seed || []).filter(function (x) { return x.j.jobKey !== k; }); sig = ''; save(); if (S.cur === k) S.cur = null; if (S.open) render(); },
    refresh: function () { sig = ''; load(); }, prefetch: function () { if (!S.open) load(); }
  };

  /* side menu row */
  function menu() {
    var sg = document.querySelector('#cl-menu [data-cl-go="staging"]'); if (!sg) return;
    var r = sg.parentNode.querySelector('[data-sj214]');
    if (!r) {
      r = document.createElement('button'); r.type = 'button'; r.className = 'cl-row'; r.setAttribute('data-sj214', '1');
      r.innerHTML = '<svg class="cl-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + TRUCK + '</svg><span class="cl-name">Ready to load on truck</span>';
    }
    if (sg.nextElementSibling !== r) sg.insertAdjacentElement('afterend', r);
  }
  (function w(n) { try { menu(); } catch (e) {} var m = $('cl-menu'); if (m && !m.__o214) { m.__o214 = 1; try { new MutationObserver(function () { try { menu(); } catch (e) {} }).observe(m, { childList: true, subtree: true }); } catch (e) {} } if (n < 240 && !(m && m.__o214)) setTimeout(function () { w(n + 1); }, 500); })(0);

  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    if (t.closest('#cl-menu [data-sj214]')) {
      e.preventDefault(); e.stopImmediatePropagation();
      try { closeDrawer(); } catch (x) { var sc = $('drawer-scrim'); if (sc) sc.click(); }
      setTimeout(open, 90); return; /* v215: slides in while the menu slides away (was 220 ms after) */
    }
    if (!t.closest('#sj214')) { if (t.closest('#hamburger')) { setTimeout(menu, 20); try { window.stormSJ215.prefetch(); } catch (x) {} } return; } /* v215: the list is fetched while the menu slides open */
    var b;
    if (t.closest('[data-sj-x]')) { e.preventDefault(); close(); return; }
    if (t.closest('[data-sj-back]')) { e.preventDefault(); S.cur = null; S.err = ''; render(); return; }
    if ((b = t.closest('[data-sj-job]'))) { e.preventDefault(); if (b.classList.contains('sk215')) return; S.cur = b.getAttribute('data-sj-job'); S.err = ''; render(); return; }
    if ((b = t.closest('[data-sj-bin]'))) { e.preventDefault(); tap(b.getAttribute('data-sj-bin')); return; }
    if (t.closest('.lk216 .s-line')) { e.preventDefault(); toast216(FINMSG); return; } /* v216: the greyed box takes no taps; its row answers */
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && S.open) close(); });
})();
