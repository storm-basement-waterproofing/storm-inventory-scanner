/* fix-jobprint.js (Hark, 2026-11-14, Dave's fix list batch 2, items 14-16: printing from a customer / job).
   Overlay only. Read-only server calls that already exist (getStaging, getJobberQuote, getJobberQuoteAmounts for managers). No server change,
   nothing written anywhere.
   14. A customer / job (the Customer Search card from fix-custcard.js through window.stormCustCard.addAction, or, until that card is live,
       the Find a Job job page) gets a Print button. Print always opens a preview first.
   15. The preview lets you pick what prints: Staging list, Loading materials list (Ready to load on truck) or Jobber quote. Same layout as
       the Pull list printout (fix-print v2), in black and white: logo, customer / address / Job #, photo, item + SKU + bin, qty, boxes.
       Print goes through the wrapper's existing printPull hand-off (Letter paper).
   16. Every customer in the Customer Search (Find a Job) results gets the same three print buttons under it; each opens the preview on
       that printout. */
(function () {
  if (window.__fixJobPrint) return; window.__fixJobPrint = 1;
  var BASE = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/', LOGO = BASE + 'assets/logos/STORM-logo-black-text-transparent.svg', HD = BASE + 'assets/items-hd/';
  var EZ = 'cubic-bezier(.32,.72,0,1)', NAVY = '#1B2735', BLUE = '#29ABE2';
  function E(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(m, bad) { try { showToast(m, !!bad); } catch (e) {} }
  function run() { try { return (window.google && google.script && google.script.run) ? google.script.run : null; } catch (e) { return null; } }
  function item(bin) { try { return findItem(bin); } catch (e) { return null; } }
  function mgr() { try { return !!(window.stormAccess && stormAccess.isMgr()); } catch (e) { return false; } }
  function tok() { try { return window.stormAccess ? stormAccess.token() : ''; } catch (e) { return ''; } }
  function norm(v) { return String(v || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function ftLen(bin) { try { return (typeof isFtItem === 'function' && isFtItem(bin) && window.FT_ITEMS) ? FT_ITEMS[bin].len : (typeof FT_ITEMS !== 'undefined' && FT_ITEMS[bin] ? FT_ITEMS[bin].len : 0); } catch (e) { return 0; } }
  function photo(bin) {
    var u = ''; try { u = window.stormPhoto215 ? stormPhoto215.url(bin) : ''; } catch (e) {}
    if (!u) { var it = item(bin), p = it && it.photoUrl; if (p && !/^sheetimg:/.test(String(p))) u = String(p); }
    return u || HD + encodeURIComponent(bin) + '.jpg?v=1';
  }
  function when(ms) { if (!ms) return ''; try { return new Date(ms).toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }); } catch (e) { return ''; } }
  function day(iso) { var d = new Date(iso); if (!iso || isNaN(d)) return ''; try { return d.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', year: 'numeric' }); } catch (e) { return ''; } }
  function money(n) { if (n == null || n === '' || isNaN(Number(n))) return ''; var v = Number(n); return (v < 0 ? '-$' : '$') + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  var PRINTER = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>';
  var CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  var KINDS = [
    { id: 'stage', tab: 'Staging list', btn: 'Print staging list', title: 'Staging list', sub: 'Staging list' },
    { id: 'load', tab: 'Loading list', btn: 'Print loading list', title: 'Loading materials \u00b7 Ready to load on truck', sub: 'Loading materials \u00b7 Ready to load on truck' },
    { id: 'quote', tab: 'Jobber quote', btn: 'Print Jobber quote', title: 'Jobber quote', sub: 'Jobber quote' }
  ];
  function kind(id) { for (var i = 0; i < KINDS.length; i++) if (KINDS[i].id === id) return KINDS[i]; return KINDS[0]; }

  /* ---------- a job, from whichever screen asked ---------- */
  function addrOf(c) { c = c || {}; var a = c.address || {}; return [a.street1, a.street2, a.city, a.province, a.postalCode].filter(function (x) { return String(x || '').trim(); }).join(', '); }
  function nameOf(c) { c = c || {}; var n = [c.firstName, c.lastName].filter(Boolean).join(' '); return n || c.companyName || ''; }
  /* raw Find a Job row (saved job from searchJobs, or a Jobber job from getJobberJobs) -> J */
  function fromRow(j, isJobber) {
    if (!j) return null;
    if (isJobber) {
      var c = j.client || {};
      return { kind: 'jobber', jobberId: j.id || '', key: j.id ? 'jb:' + j.id : '', name: nameOf(c), addr: addrOf(c), jobNo: j.jobNumber || '', title: j.title || '', when: j.startAt || '', items: null,
        contact: [c.phone, c.email].filter(Boolean).join(' \u00b7 ') };
    }
    var key = j.jobberJobId ? 'jb:' + j.jobberJobId : ('c:' + norm(j.first) + '|' + norm(j.last) + '|' + norm(j.address)).slice(0, 200);
    return { kind: 'saved', jobberId: j.jobberJobId || '', key: key, name: [j.first, j.last].filter(Boolean).join(' '), addr: j.address || '', jobNo: j.jobberJobNumber || '', title: j.jobberTitle || '', when: '', items: j.items || [], contact: '' };
  }
  /* the fix-custcard ctx -> J */
  function fromCtx(x) {
    if (!x) return null;
    var J = fromRow(x.job, x.kind === 'jobber') || { kind: x.kind || 'saved', jobberId: '', key: '', name: '', addr: '', jobNo: '', title: '', when: '', items: null, contact: '' };
    if (x.key) J.key = x.key; if (x.name) J.name = x.name; if (x.address) J.addr = x.address; if (x.jobNumber) J.jobNo = x.jobNumber;
    if (x.items && x.items.length) J.items = x.items;
    return J;
  }

  /* ---------- data (read-only calls, cached for this page) ---------- */
  var CACHE = {};
  function call(fn, args, cb) {
    var R = run(); if (!R) { cb(null, 'offline'); return; }
    var done = false; function fin(v, e) { if (done) return; done = true; cb(v, e); }
    setTimeout(function () { fin(null, 'timeout'); }, 20000);
    try { R.withSuccessHandler(function (v) { fin(v, null); }).withFailureHandler(function (e) { fin(null, String(e && (e.message || e) || 'error')); })[fn].apply(null, args); } catch (e) { fin(null, 'error'); }
  }
  function load(J, cb) {
    var c = CACHE[J.key + '|' + J.jobberId];
    if (c && Date.now() - c.t < 60000 && c.left === 0) { cb(c); return; }
    c = CACHE[J.key + '|' + J.jobberId] = { t: Date.now(), left: 0, st: null, ld: null, q: null, qs: J.jobberId ? 'loading' : 'none', am: null, cbs: [cb] };
    function one() { if (--c.left === 0) c.cbs.forEach(function (f) { try { f(c); } catch (e) {} }); }
    if (J.key) {
      c.left += 2;
      call('getStaging', [J.key], function (v) { if (v && v.jobKey === J.key) c.st = v; one(); });
      call('getStaging', ['ld:' + J.key], function (v) { if (v && v.jobKey === 'ld:' + J.key) c.ld = v; one(); });
    }
    if (J.jobberId) {
      c.left++;
      call('getJobberQuote', [J.jobberId, tok()], function (v, e) {
        if (v && v.authorized === false) c.qs = 'unauthorized';
        else if (v && v.error) { c.qs = 'error'; c.qerr = v.error; }
        else if (v && v.quote) { c.qs = 'ready'; c.q = v.quote; }
        else if (v) c.qs = 'none'; else { c.qs = 'error'; c.qerr = e; }
        one();
      });
      if (mgr()) { c.left++; call('getJobberQuoteAmounts', [J.jobberId, tok()], function (v) { if (v && v.amounts) c.am = v.amounts; one(); }); }
    }
    if (!c.left) { c.left = 1; one(); }
  }
  /* what this job should have: this phone's Pull list when it is this job, else the saved job's items, else the Jobber quote matched to bins */
  function planned(J, c) {
    var out = [], missing = [], seen = {};
    function add(bin, qty, feet) {
      if (!bin || seen[bin]) return; var it = item(bin); if (!it) return; seen[bin] = 1;
      out.push({ bin: bin, name: it.name || bin, qty: qty, feet: feet || null });
    }
    var cur = ''; try { cur = window.stormStagingApi ? stormStagingApi.key() : ''; } catch (e) {}
    var pl = null; try { pl = (typeof pickList !== 'undefined' && cur && cur === J.key) ? pickList : null; } catch (e) {}
    if (pl && pl.length) { pl.forEach(function (p) { if (p && p.qty > 0) add(p.bin, p.qty, p.feet); }); return { lines: out, missing: missing, from: 'pull' }; }
    if (J.items && J.items.length) { J.items.forEach(function (p) { if (p && p.qty > 0) add(p.bin, p.qty, p.feet); }); return { lines: out, missing: missing, from: 'saved' }; }
    if (c.q && window.stormQuoteMatch) {
      (c.q.lines || []).forEach(function (ln) {
        var q = Number(ln.quantity) || 0; if (q <= 0) return;
        var m = {}; try { m = stormQuoteMatch(ln) || {}; } catch (e) {}
        if (m.skip) return;
        if (!m.bins || !m.bins.length) { missing.push({ name: ln.name || 'Item', qty: q }); return; }
        m.bins.forEach(function (b) { var L = ftLen(b); if (L) add(b, Math.ceil(q / L), q); else add(b, q); });
      });
      return { lines: out, missing: missing, from: 'quote' };
    }
    return { lines: out, missing: missing, from: '' };
  }
  function rowsOf(v) { var o = {}; ((v && v.rows) || []).forEach(function (r) { if (r && r.itemBin && r.itemBin !== '__done__') o[r.itemBin] = r; }); return o; }
  function build(J, c) {
    var P = planned(J, c), st = c.st, by = rowsOf(st), ld = rowsOf(c.ld), staged = st && st.staged && st.staged.at ? st.staged : null, lines;
    if (staged) { /* a staged job: the server's list is the list (what was staged) */
      lines = Object.keys(by).map(function (b) { var r = by[b], p = null; P.lines.forEach(function (x) { if (x.bin === b) p = x; }); return { bin: b, name: r.itemName || (item(b) || {}).name || b, qty: r.qty === '' || r.qty == null ? (p ? p.qty : '') : r.qty, feet: p ? p.feet : null, pulled: !!r.checked }; });
      lines = lines.filter(function (l) { return l.pulled; });
    } else {
      lines = P.lines.map(function (l) { var r = by[l.bin]; return { bin: l.bin, name: l.name, qty: l.qty, feet: l.feet, pulled: !!(r && r.checked) }; });
      Object.keys(by).forEach(function (b) { if (!P.lines.some(function (l) { return l.bin === b; }) && by[b].checked) lines.push({ bin: b, name: by[b].itemName || b, qty: by[b].qty, feet: null, pulled: true }); });
    }
    lines.forEach(function (l) { l.loaded = !!(ld[l.bin] && ld[l.bin].checked); });
    var done = ((c.ld && c.ld.rows) || []).some(function (r) { return r && r.itemBin === '__done__' && r.checked; });
    return { lines: lines, missing: P.missing, staged: staged, done: done, from: P.from };
  }

  /* ---------- the printed sheets (black and white; same CSS on screen and on paper) ---------- */
  var DC = '.jpd { font-family: Montserrat, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; color: #000; font-size: 12px; line-height: 1.3; }'
    + ' .jpd * { box-sizing: border-box; }'
    + ' .jpd .jphd { text-align: center; padding: 0 0 10px; border-bottom: 2px solid #000; margin: 0 0 12px; }'
    + ' .jpd .jphd img { display: block; height: 46px; width: auto; max-width: 70%; margin: 0 auto 6px; }'
    + ' .jpd .jphd .jptt { font-size: 11px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; color: #222; }'
    + ' .jpd .jpcu { display: flex; align-items: center; gap: 12px; margin: 0 0 14px; padding: 12px 14px; border: 1.5px solid #000; border-radius: 14px; break-inside: avoid; page-break-inside: avoid; }'
    + ' .jpd .jpci { flex: 1; min-width: 0; } .jpd .jpnm { font-size: 19px; font-weight: 800; line-height: 1.15; } .jpd .jpad { margin-top: 2px; font-size: 12.5px; font-weight: 600; color: #222; }'
    + ' .jpd .jpmt { margin-top: 5px; font-size: 11px; font-weight: 600; color: #444; } .jpd .jpmt b { color: #000; }'
    + ' .jpd .jpct { flex: none; text-align: center; min-width: 62px; } .jpd .jpct b { display: block; font-size: 20px; font-weight: 800; line-height: 1; } .jpd .jpct span { display: block; margin-top: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: #333; white-space: nowrap; }'
    + ' .jpd table { width: 100%; border-collapse: separate; border-spacing: 0 6px; table-layout: fixed; }'
    + ' .jpd th { padding: 0 6px 2px; font-size: 9.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #333; text-align: left; }'
    + ' .jpd th.jpc, .jpd td.jpc { text-align: center; } .jpd col.jpwp { width: 52px; } .jpd col.jpwq { width: 62px; } .jpd col.jpwb { width: 76px; }'
    + ' .jpd td { padding: 6px; vertical-align: middle; background: #fff; border-top: 1.5px solid #000; border-bottom: 1.5px solid #000; }'
    + ' .jpd td:first-child { border-left: 1.5px solid #000; border-radius: 12px 0 0 12px; } .jpd td:last-child { border-right: 1.5px solid #000; border-radius: 0 12px 12px 0; }'
    + ' .jpd tr { break-inside: avoid; page-break-inside: avoid; } .jpd thead { display: table-header-group; }'
    + ' .jpd .jpph { display: block; width: 40px; height: 40px; border-radius: 8px; background: #fff; overflow: hidden; } .jpd .jpph img { display: block; width: 100%; height: 100%; object-fit: contain; }'
    + ' .jpd .jpin { font-size: 12.5px; font-weight: 700; overflow-wrap: anywhere; } .jpd .jpsk { margin-top: 2px; font-size: 10.5px; font-weight: 600; color: #444; overflow-wrap: anywhere; }'
    + ' .jpd .jpds { margin-top: 2px; font-size: 10.5px; font-weight: 500; color: #333; white-space: pre-wrap; overflow-wrap: anywhere; }'
    + ' .jpd .jpq { font-size: 15px; font-weight: 800; } .jpd .jpq small { display: block; font-size: 9.5px; font-weight: 700; color: #444; }'
    + ' .jpd .jpcb { display: inline-block; width: 26px; height: 26px; border-radius: 7px; border: 2.5px solid #000; background: #fff; vertical-align: middle; -webkit-print-color-adjust: exact; print-color-adjust: exact; }'
    + ' .jpd .jpcb svg { display: none; width: 100%; height: 100%; } .jpd .jpcb.on { background: #000; } .jpd .jpcb.on svg { display: block; }'
    + ' .jpd .jpmiss { margin-top: 10px; border: 1.5px dashed #000; border-radius: 10px; padding: 8px 11px; break-inside: avoid; page-break-inside: avoid; }'
    + ' .jpd .jpmiss b.t { display: block; font-size: 10.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 4px; }'
    + ' .jpd .jpmiss div { display: flex; gap: 10px; padding: 3px 0; border-top: 1px solid #bbb; } .jpd .jpmiss div:first-of-type { border-top: 0; } .jpd .jpmiss div span { flex: none; min-width: 40px; font-weight: 800; }'
    + ' .jpd .jpnote { margin: 10px 0; padding: 12px; border: 1.5px solid #000; border-radius: 10px; font-size: 12.5px; font-weight: 700; text-align: center; }'
    + ' .jpd .jptot { margin: 8px 0 0 auto; width: 260px; font-size: 12px; break-inside: avoid; page-break-inside: avoid; } .jpd .jptot div { display: flex; justify-content: space-between; padding: 4px 8px; }'
    + ' .jpd .jptot .g { border-top: 2px solid #000; font-size: 14px; font-weight: 800; padding-top: 6px; }'
    + ' .jpd .jpsign { display: flex; gap: 18px; align-items: flex-end; margin-top: 14px; break-inside: avoid; page-break-inside: avoid; } .jpd .jpsign > div { flex: 1; } .jpd .jpsign > div + div { flex: none; width: 170px; }'
    + ' .jpd .jpsl { height: 58px; border-bottom: 1.5px solid #000; display: flex; align-items: flex-end; padding: 0 4px 4px; font-weight: 700; } .jpd .jpsl img { max-height: 54px; max-width: 100%; object-fit: contain; display: block; }'
    + ' .jpd .jpk { display: block; margin-top: 4px; font-size: 9.5px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #333; }'
    + ' .jpd .jpsg { display: flex; gap: 18px; margin-top: 18px; font-size: 11px; font-weight: 700; color: #222; } .jpd .jpsg span { flex: 1; border-top: 1px solid #000; padding-top: 4px; }'
    + ' .jpd .jpft { display: flex; justify-content: space-between; gap: 10px; margin-top: 12px; padding-top: 8px; border-top: 1px solid #000; font-size: 10px; font-weight: 600; color: #333; }';
  var PAGE = '@page { size: letter portrait; margin: 0.45in 0.45in 0.5in; } html, body { margin: 0 !important; padding: 0 !important; background: #fff !important; }';

  function head(K, J, meta, counts) {
    return '<div class="jphd"><img src="' + LOGO + '" alt="STORM Basement Waterproofing"><div class="jptt">' + E(K.title) + '</div></div>'
      + '<div class="jpcu"><div class="jpci"><div class="jpnm">' + E(J.name || 'Customer') + '</div>' + (J.addr ? '<div class="jpad">' + E(J.addr) + '</div>' : '')
      + (meta ? '<div class="jpmt">' + meta + '</div>' : '') + '</div>' + (counts || '') + '</div>';
  }
  function foot(left) { return '<div class="jpft"><span>STORM Basement Waterproofing</span><span>' + left + '</span><span>Printed ' + E(when(Date.now())) + '</span></div>'; }
  function qtyCell(l) {
    var q = l.qty == null || l.qty === '' ? '\u2013' : l.qty;
    return '<td class="jpc"><span class="jpq">' + E(q) + (l.feet ? '<small>' + E(l.feet) + ' ft</small>' : '') + '</span></td>';
  }
  function itemCells(l) {
    var it = item(l.bin) || {}, sku = it.sku ? 'SKU ' + it.sku : '';
    return '<td><span class="jpph"><img src="' + E(photo(l.bin)) + '" alt=""></span></td><td><div class="jpin">' + E(l.name || it.name || l.bin) + '</div><div class="jpsk">' + E([sku, 'Bin ' + String(l.bin).toUpperCase()].filter(Boolean).join(' \u00b7 ')) + '</div></td>';
  }
  function jobMeta(J, B) {
    return [J.jobNo ? 'Job <b>#' + E(J.jobNo) + '</b>' : '', J.title ? E(J.title) : '', B ? (B.staged ? 'Staged <b>' + E(when(B.staged.at)) + '</b>' + (B.staged.by ? ' by ' + E(B.staged.by) : '') : 'Not staged yet') : '', B && B.done ? '<b>Completed</b>' : ''].filter(Boolean).join(' \u00b7 ');
  }
  function count(n, d, label) { return '<div class="jpct"><b>' + d + '/' + n + '</b><span>' + E(label) + '</span></div>'; }
  function docStage(J, c) {
    var K = kind('stage'), B = build(J, c), L = B.lines, n = L.length, d = L.filter(function (l) { return l.pulled; }).length;
    var h = '<div class="jpd">' + head(K, J, jobMeta(J, B), n ? count(n, d, 'Staged') : '');
    if (!n) h += '<div class="jpnote">' + (c.qs === 'loading' ? 'Loading\u2026' : J.jobberId && c.qs !== 'ready' && !(J.items && J.items.length) ? 'No staging list yet. ' + quoteWhy(c) : 'No items on this job\u2019s list yet.') + '</div>';
    else {
      h += '<table><colgroup><col class="jpwp"><col><col class="jpwq"><col class="jpwb"></colgroup><thead><tr><th></th><th>Item</th><th class="jpc">Qty</th><th class="jpc">Staged</th></tr></thead><tbody>';
      L.forEach(function (l) { h += '<tr>' + itemCells(l) + qtyCell(l) + '<td class="jpc"><span class="jpcb' + (l.pulled ? ' on' : '') + '">' + CHK + '</span></td></tr>'; });
      h += '</tbody></table>';
    }
    if (B.missing.length) { h += '<div class="jpmiss"><b class="t">On the quote, not in our app</b>'; B.missing.forEach(function (m) { h += '<div><span>\u00d7 ' + E(m.qty) + '</span><b>' + E(m.name) + '</b></div>'; }); h += '</div>'; }
    return h + '<div class="jpsg"><span>Staged by</span><span>Date</span></div>' + foot(n ? d + ' of ' + n + ' staged' : '') + '</div>';
  }
  function docLoad(J, c) {
    var K = kind('load'), B = build(J, c), L = B.lines, n = L.length, d = L.filter(function (l) { return l.loaded; }).length;
    var h = '<div class="jpd">' + head(K, J, jobMeta(J, B), n ? count(n, d, 'Loaded') : '');
    if (!B.staged && n) h += '<div class="jpnote">Not staged yet \u2014 this is the planned list. It goes on Ready to load on truck once it\u2019s staged.</div>';
    if (!n) h += '<div class="jpnote">' + (c.qs === 'loading' ? 'Loading\u2026' : 'Nothing to load yet for this job.') + '</div>';
    else {
      h += '<table><colgroup><col class="jpwp"><col><col class="jpwq"><col class="jpwb"></colgroup><thead><tr><th></th><th>Item</th><th class="jpc">Qty</th><th class="jpc">Loaded on truck</th></tr></thead><tbody>';
      L.forEach(function (l) { h += '<tr>' + itemCells(l) + qtyCell(l) + '<td class="jpc"><span class="jpcb' + (l.loaded ? ' on' : '') + '">' + CHK + '</span></td></tr>'; });
      h += '</tbody></table>';
    }
    return h + '<div class="jpsg"><span>Loaded by</span><span>Truck #</span><span>Date</span></div>' + foot(n ? d + ' of ' + n + ' loaded' : '') + '</div>';
  }
  function quoteWhy(c) {
    if (!PV.J || !PV.J.jobberId) return 'This job isn\u2019t linked to a Jobber job, so there\u2019s no Jobber quote to print.';
    return c.qs === 'none' ? 'There\u2019s no quote in Jobber for this job.' : c.qs === 'unauthorized' ? 'The app isn\u2019t connected to Jobber right now.' : c.qs === 'loading' ? 'Loading\u2026'
      : c.qs === 'error' ? 'Couldn\u2019t load the Jobber quote' + (c.qerr ? ' (' + E(String(c.qerr).slice(0, 100)) + ')' : '') + '. Check signal and try again.' : 'This job isn\u2019t linked to a Jobber job.';
  }
  function docQuote(J, c) {
    var K = kind('quote'), q = c.q, am = c.am;
    var meta = [J.jobNo ? 'Job <b>#' + E(J.jobNo) + '</b>' : '', q && q.quoteNumber ? 'Quote <b>#' + E(q.quoteNumber) + '</b>' : '', q && q.title ? E(q.title) : J.title ? E(J.title) : '', J.when && day(J.when) ? 'Visit <b>' + E(day(J.when)) + '</b>' : ''].filter(Boolean).join(' \u00b7 ');
    var h = '<div class="jpd">' + head(K, J, meta + (J.contact ? '<br>' + E(J.contact) : ''), '');
    if (!J.jobberId || c.qs !== 'ready' || !q) return h + '<div class="jpnote">' + quoteWhy(c) + '</div>' + foot('') + '</div>';
    var L = q.lines || [];
    if (!L.length) h += '<div class="jpnote">This quote has no line items in Jobber.</div>';
    else {
      h += '<table><colgroup><col><col class="jpwq"></colgroup><thead><tr><th>Item</th><th class="jpc">Qty</th></tr></thead><tbody>';
      L.forEach(function (ln) { h += '<tr><td><div class="jpin">' + E(String(ln.name || 'Item').trim()) + '</div>' + (ln.description ? '<div class="jpds">' + E(String(ln.description).trim()) + '</div>' : '') + '</td><td class="jpc"><span class="jpq">' + E(ln.quantity == null ? '\u2013' : Math.round(Number(ln.quantity) * 100) / 100) + '</span></td></tr>'; });
      h += '</tbody></table>';
    }
    if (am) { /* managers only (the server checks the manager code): same total / deposit / signature as Print quotes & materials */
      var tot = am.total != null ? am.total : q.total, st = String(am.status || '').toLowerCase(), sig = am.sig && /^data:image\//i.test(am.sig) ? am.sig : '';
      var dt = am.signedAt && (sig || st === 'approved' || st === 'converted') ? day(am.signedAt) : '';
      h += '<div class="jptot"><div class="g"><span>Job total</span><b>' + (tot != null ? E(money(tot)) : '\u2014') + '</b></div><div><span>Required deposit</span><b>' + (am.deposit == null ? '\u2014' : Number(am.deposit) ? E(money(am.deposit)) : 'None') + '</b></div></div>'
        + '<div class="jpsign"><div><div class="jpsl">' + (sig ? '<img src="' + sig + '" alt="Customer signature">' : '') + '</div><span class="jpk">Customer signature' + (J.name ? ' \u00b7 ' + E(J.name) : '') + '</span></div>'
        + '<div><div class="jpsl">' + (dt ? 'Signed ' + E(dt) : '') + '</div><span class="jpk">Date signed</span></div></div>';
    }
    return h + foot(L.length + ' line' + (L.length === 1 ? '' : 's')) + '</div>';
  }
  function doc(id, J, c) { return id === 'load' ? docLoad(J, c) : id === 'quote' ? docQuote(J, c) : docStage(J, c); }

  /* ---------- look ---------- */
  var H = 'html:not(#jpx):not(#jpy):not(#jpz) body ';
  var css = ''
    + '#jp14 { position: fixed; inset: 0; z-index: 2147483647; display: flex; flex-direction: column; background: #EAF0F7; font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif; color: #0F1720;'
    + ' opacity: 0; transform: translate3d(0,24px,0); transition: opacity .26s ' + EZ + ', transform .26s ' + EZ + '; }'
    + '#jp14.in { opacity: 1; transform: none; }'
    + '#jp14 .tb { flex: none; display: flex; align-items: center; gap: 10px; padding: calc(12px + env(safe-area-inset-top)) 16px 8px; }'
    + '#jp14 .tb h2 { flex: 1; min-width: 0; margin: 0; font-size: 20px; font-weight: 800; } #jp14 .tb h2 small { display: block; font-size: 12px; font-weight: 700; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + H + '#jp14 .tb button { flex: none; width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid ' + NAVY + ' !important; background: #fff !important; color: #0F1720 !important; -webkit-text-fill-color: #0F1720 !important; font: inherit; font-size: 24px; line-height: 38px; padding: 0; box-shadow: none !important; }'
    + '#jp14 .seg { flex: none; display: flex; gap: 4px; margin: 0 12px 8px; padding: 4px; border-radius: 16px; background: #fff; border: 1.5px solid ' + NAVY + '; }'
    + H + '#jp14 .seg button { flex: 1 1 0; min-width: 0; min-height: 42px; padding: 4px 6px; border: 0 !important; border-radius: 12px; background: transparent !important; color: ' + NAVY + ' !important; -webkit-text-fill-color: ' + NAVY + ' !important;'
    + ' font: inherit; font-size: 13px; font-weight: 800; line-height: 1.15; box-shadow: none !important; transition: background-color .2s ease, color .2s ease; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }'
    + H + '#jp14 .seg button.on { background: ' + NAVY + ' !important; color: #fff !important; -webkit-text-fill-color: #fff !important; }'
    + '#jp14 .pg { flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch; padding: 4px 12px 16px; overscroll-behavior: contain; }'
    + '#jp14 .sheet { max-width: 8.5in; margin: 0 auto; background: #fff; border-radius: 6px; padding: 22px 16px; box-shadow: 0 10px 30px rgba(15,23,32,.18); transition: opacity .18s ease; }'
    + '#jp14 .sheet.fade { opacity: 0; }'
    + '#jp14 .ld:empty { display: none; } #jp14 .ld { text-align: center; margin: 0 0 8px; font-size: 12px; font-weight: 700; color: #6B7280; min-height: 16px; }'
    + '#jp14 .bt { flex: none; display: flex; gap: 10px; padding: 10px 16px calc(14px + env(safe-area-inset-bottom)); background: #EAF0F7; }'
    + H + '#jp14 .bt button { flex: 1 1 0; display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 48px; border-radius: 24px; font: inherit; font-size: 14.5px; font-weight: 800; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease, opacity .2s ease; }'
    + H + '#jp14 .bt button[data-jp-x] { flex: 0 0 34%; background: #fff !important; color: ' + NAVY + ' !important; -webkit-text-fill-color: ' + NAVY + ' !important; border: 1.5px solid ' + NAVY + ' !important; box-shadow: none !important; }'
    + H + '#jp14 .bt button[data-jp-go] { background: ' + BLUE + ' !important; color: #fff !important; -webkit-text-fill-color: #fff !important; border: 0 !important; box-shadow: 0 4px 14px rgba(41,171,226,.25) !important; }'
    + H + '#jp14 .bt button[data-jp-go][disabled] { opacity: .45; }'
    + H + '#jp14 .bt button svg, ' + H + '#jp14 .bt button svg * { stroke: currentColor !important; fill: none !important; }'
    + 'html body #jp14 .bt button:active { transform: scale(.96); }'
    + '#jp14 ' + DC.replace(/\} \./g, '} #jp14 .')
    + '@media (max-width: 560px) { #jp14 .pg { padding: 4px 8px 14px; } #jp14 .sheet { padding: 16px 10px; }'
    + ' #jp14 .jpd col.jpwp { width: 44px; } #jp14 .jpd col.jpwq { width: 46px; } #jp14 .jpd col.jpwb { width: 62px; } #jp14 .jpd td { padding: 5px 4px; } #jp14 .jpd th { padding: 0 3px 2px; font-size: 8.5px; letter-spacing: .04em; }'
    + ' #jp14 .jpd .jpph { width: 36px; height: 36px; } #jp14 .jpd .jpin { font-size: 12px; } #jp14 .jpd .jpsk { font-size: 10px; } #jp14 .jpd .jpcb { width: 24px; height: 24px; }'
    + ' #jp14 .jpd .jpcu { padding: 10px; gap: 8px; } #jp14 .jpd .jpnm { font-size: 17px; } #jp14 .jpd .jptot { width: 100%; } #jp14 .jpd .jpsign > div + div { width: 120px; } #jp14 .jpd .jpft { flex-wrap: wrap; } }'
    + '#jp-print-root { display: none; }'
    + '@media print { html:not(#jpa):not(#jpb):not(#jpc) body > *:not(#jp-print-root) { display: none !important; } html:not(#jpa):not(#jpb):not(#jpc) body > #jp-print-root { display: block !important; } }'
    + '@media (prefers-reduced-motion: reduce) { #jp14, #jp14 .sheet { transition: none !important; } }'
    /* 14: Print button on the job (card slot / Find a Job job page) */
    + H + '.jp-pr { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; min-height: 48px; margin: 10px 0 0; border-radius: 24px; background: #fff !important; color: ' + NAVY + ' !important; -webkit-text-fill-color: ' + NAVY + ' !important;'
    + ' border: 1.5px solid ' + NAVY + ' !important; box-shadow: none !important; font: inherit; font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif; font-size: 15px; font-weight: 800; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease; }'
    + H + '.jp-pr svg, ' + H + '.jp-pr svg * { stroke: ' + NAVY + ' !important; fill: none !important; }'
    + 'html body .jp-pr:active { transform: scale(.97); }'
    + H + '#job-find .jf-detail .jf-acts [data-jf-print] { display: none !important; }' /* the old saved-job "Print list" is covered by Print > Staging list */
    /* 16: three print buttons under every customer in the results */
    + '#job-find .jp16 { display: flex; gap: 6px; margin: -2px 0 12px; padding: 0 2px; }'
    + H + '#job-find .jp16 button { flex: 1 1 0; min-width: 0; display: inline-flex; align-items: center; justify-content: center; gap: 5px; min-height: 36px; padding: 0 6px; border-radius: 18px;'
    + ' background: #fff !important; color: ' + NAVY + ' !important; -webkit-text-fill-color: ' + NAVY + ' !important; border: 1.25px solid #9AA7B4 !important; box-shadow: none !important; font: inherit; font-family: Montserrat, -apple-system, "Segoe UI", Roboto, sans-serif;'
    + ' font-size: 11.5px; font-weight: 800; white-space: nowrap; cursor: pointer; touch-action: manipulation; -webkit-tap-highlight-color: transparent; transition: transform .12s ease; }'
    + H + '#job-find .jp16 button svg { width: 14px; height: 14px; flex: none; } ' + H + '#job-find .jp16 button svg, ' + H + '#job-find .jp16 button svg * { stroke: ' + NAVY + ' !important; fill: none !important; }'
    + 'html body #job-find .jp16 button:active { transform: scale(.96); }';
  var stl = document.createElement('style'); stl.id = 'fix-jobprint-css'; stl.textContent = css; (document.head || document.documentElement).appendChild(stl);

  /* ---------- preview ---------- */
  var PV = { J: null, k: 'stage', c: null, gen: 0 };
  function paint(fade) {
    var o = document.getElementById('jp14'); if (!o || !PV.J) return;
    var K = kind(PV.k), c = PV.c || { qs: PV.J.jobberId ? 'loading' : 'none' };
    [].forEach.call(o.querySelectorAll('.seg button'), function (b) { var on = b.getAttribute('data-jp-k') === PV.k; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    o.querySelector('.tb small').textContent = K.sub + ' \u00b7 Letter';
    var go = o.querySelector('[data-jp-go]'); go.innerHTML = PRINTER + E(K.btn); go.disabled = !PV.c;
    o.querySelector('.ld').textContent = PV.c ? '' : 'Getting the latest from the office\u2026';
    var sh = o.querySelector('.sheet'), h = doc(PV.k, PV.J, c);
    if (!fade) { if (sh.innerHTML !== h) sh.innerHTML = h; return; }
    sh.classList.add('fade'); var g = PV.gen;
    setTimeout(function () { if (g !== PV.gen) return; sh.innerHTML = h; o.querySelector('.pg').scrollTop = 0; requestAnimationFrame(function () { sh.classList.remove('fade'); }); }, 170);
  }
  function open(J, k) {
    if (!J) { T('Couldn\u2019t read this job.', true); return; }
    var o = document.getElementById('jp14'); if (o) o.remove();
    PV.J = J; PV.k = k || 'stage'; PV.c = null; var g = ++PV.gen;
    o = document.createElement('div'); o.id = 'jp14'; o.className = 'dk-skip'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-modal', 'true'); o.setAttribute('aria-label', 'Print preview');
    o.innerHTML = '<div class="tb"><h2>Print preview<small></small></h2><button type="button" data-jp-x aria-label="Close">\u00d7</button></div>'
      + '<div class="seg" role="group" aria-label="What to print">' + KINDS.map(function (x) { return '<button type="button" data-jp-k="' + x.id + '">' + E(x.tab) + '</button>'; }).join('') + '</div>'
      + '<div class="pg"><div class="ld"></div><div class="sheet"></div></div>'
      + '<div class="bt"><button type="button" data-jp-x>Close</button><button type="button" data-jp-go></button></div>';
    document.body.appendChild(o); paint(false); void o.offsetWidth; requestAnimationFrame(function () { o.classList.add('in'); });
    load(J, function (c) { if (g !== PV.gen || !o.isConnected) return; PV.c = c; paint(false); });
  }
  function close() { var o = document.getElementById('jp14'); if (!o) return; PV.gen++; o.classList.remove('in'); setTimeout(function () { o.remove(); }, 270); }
  function send(body) {
    var css2 = PAGE + ' ' + DC;
    if (window.top !== window) { try { window.top.postMessage({ storm: 'printPull', css: css2, body: body }, '*'); return; } catch (e) {} }
    var root = document.getElementById('jp-print-root'); if (!root) { root = document.createElement('div'); root.id = 'jp-print-root'; document.body.appendChild(root); }
    root.innerHTML = '<style>@media print{' + css2 + '}</style>' + body;
    var ims = root.querySelectorAll('img'), left = ims.length, fired = false;
    function go() { if (fired) return; fired = true; setTimeout(function () { try { window.print(); } catch (e) { T('Printing is not available here', true); } }, 80); }
    if (!left) go(); [].forEach.call(ims, function (im) { if (im.complete) { if (--left === 0) go(); } else im.onload = im.onerror = function () { if (--left === 0) go(); }; });
    setTimeout(go, 4000);
  }
  var busy = 0;
  window.addEventListener('click', function (e) {
    var t = e.target; if (!t || !t.closest) return;
    var o = t.closest('#jp14');
    if (o) {
      e.stopImmediatePropagation();
      var b;
      if (t.closest('[data-jp-x]')) { e.preventDefault(); close(); return; }
      if ((b = t.closest('[data-jp-k]'))) { e.preventDefault(); var k = b.getAttribute('data-jp-k'); if (k !== PV.k) { PV.k = k; paint(true); } return; }
      if (t.closest('[data-jp-go]')) { e.preventDefault(); if (!PV.c || busy) return; busy = 1; setTimeout(function () { busy = 0; }, 2500); send(doc(PV.k, PV.J, PV.c)); return; }
      return;
    }
    var p = t.closest('[data-jp-open]');
    if (p) { e.preventDefault(); e.stopImmediatePropagation(); open(p.__jpJ ? p.__jpJ() : null, p.getAttribute('data-jp-open') || 'stage'); }
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && document.getElementById('jp14')) { e.stopImmediatePropagation(); close(); } }, true);
  /* phone Back closes the preview first */
  window.addEventListener('popstate', function () { if (document.getElementById('jp14')) close(); });

  function btn(label, k, getJ, cls) {
    var b = document.createElement('button'); b.type = 'button'; b.className = cls; b.setAttribute('data-jp-open', k); b.innerHTML = PRINTER + E(label); b.__jpJ = getJ; return b;
  }

  /* ---------- 14: on the customer card (fix-custcard hook), else on the Find a Job job page ---------- */
  var hooked = false;
  function hook() {
    if (hooked || !window.stormCustCard || typeof stormCustCard.addAction !== 'function') return hooked;
    hooked = true;
    stormCustCard.addAction(function (ctx) { var J = fromCtx(ctx); return btn('Print\u2026', 'stage', function () { return J; }, 'jp-pr dk-skip'); });
    return true;
  }
  var rowsApi = function () { try { return window.stormJF14 ? stormJF14() : null; } catch (e) { return null; } };
  function detailJob(d) {
    var R = rowsApi(); if (!R) return null; var b;
    if ((b = d.querySelector('[data-jf-jb-load]'))) return fromRow(R.jobber[+b.getAttribute('data-jf-jb-load')], true);
    if ((b = d.querySelector('[data-jf-edit], [data-jf-print]'))) return fromRow(R.saved[+(b.getAttribute('data-jf-edit') || b.getAttribute('data-jf-print'))], false);
    return null;
  }
  function placeFind() {
    var L = document.getElementById('jf-list'); if (!L) return;
    var R = rowsApi(); if (!R) return;
    /* 14 fallback: Find a Job job page, until the customer card is live */
    var d = L.querySelector('.jf-detail');
    if (d && !hook() && !d.querySelector('.jp-pr')) {
      var acts = d.querySelector('.jf-acts'); var J = detailJob(d);
      if (acts && J) acts.insertAdjacentElement('afterend', btn('Print\u2026', 'stage', function () { return J; }, 'jp-pr dk-skip'));
    }
    /* 16: three print buttons under every result */
    [].forEach.call(L.querySelectorAll('.jf-item[data-jf-i], .jf-item[data-jf-jb]'), function (row) {
      var nx = row.nextElementSibling; if (nx && nx.classList.contains('jp16')) return;
      var isJb = row.hasAttribute('data-jf-jb'), i = +row.getAttribute(isJb ? 'data-jf-jb' : 'data-jf-i');
      var get = function () { var R2 = rowsApi(); return R2 ? fromRow((isJb ? R2.jobber : R2.saved)[i], isJb) : null; };
      var w = document.createElement('div'); w.className = 'jp16 dk-skip'; w.setAttribute('role', 'group'); w.setAttribute('aria-label', 'Print for this customer');
      w.appendChild(btn('Staging', 'stage', get, '')); w.appendChild(btn('Loading', 'load', get, '')); w.appendChild(btn('Quote', 'quote', get, ''));
      [].forEach.call(w.children, function (b, n) { b.setAttribute('aria-label', ['Print staging list', 'Print loading materials list', 'Print Jobber quote'][n]); });
      row.insertAdjacentElement('afterend', w);
    });
  }
  var q = 0; function soon() { if (q) return; q = requestAnimationFrame(function () { q = 0; try { hook(); placeFind(); } catch (e) {} }); }
  (function watch(n) {
    var jf = document.getElementById('jf-list') || document.getElementById('job-find');
    if (jf && !jf.__jp14 && window.MutationObserver) { jf.__jp14 = 1; new MutationObserver(soon).observe(jf, { childList: true, subtree: true }); }
    soon(); if (n < 240) setTimeout(function () { watch(n + 1); }, 500);
  })(0);
  if (window.MutationObserver) new MutationObserver(function (ms) { for (var i = 0; i < ms.length; i++) for (var j = 0; j < ms[i].addedNodes.length; j++) { var x = ms[i].addedNodes[j]; if (x.nodeType === 1 && (x.id === 'job-find' || x.id === 'jf-list' || (x.querySelector && x.querySelector('#jf-list')))) { if (x.__jp14 === 1) x.__jp14 = 0; setTimeout(function () { var jf = document.getElementById('jf-list'); if (jf && !jf.__jp14) { jf.__jp14 = 1; new MutationObserver(soon).observe(jf, { childList: true, subtree: true }); } soon(); }, 0); } } }).observe(document.body || document.documentElement, { childList: true });
  document.addEventListener('storm-custcard-open', soon);

  window.stormJobPrint = { v: 1, open: function (x, k) { open(x && x.job !== undefined ? fromCtx(x) : x, k); }, fromRow: fromRow, fromCtx: fromCtx, doc: function (k, J, c) { return doc(k, J, c); } };
})();
