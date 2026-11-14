/* fix-search v1 (Hark, 2026-11-14, Dave): search aliases. Dave's ~21.7k search phrases for 145 bins
   (search-names.json, same folder; {bin: "phrase|phrase|..."}) make the item search find an item by any of
   its phrases or a close partial ("aic filter", "2297324", "8ft crawl liner").
   - Loaded after first paint (idle after load) and prefetched when a search box gets focus; until it lands the
     search works exactly as before (names, SKU, bin, hidden terms).
   - Wraps window.stormSearch205.rank (app-ext v205), which Index filtered() and Receiving "Add item" use.
     Order: items whose phrase equals the query exactly, then the existing ranked hits (names/terms, unchanged
     order), then other phrase hits (all words in one phrase first, then words spread across its phrases; most-used
     first; at most 8 extra when names already found something, 15 when not).
   - Matching: every query word (2+ chars, or a number) must start a word in the item's phrases. Precomputed
     per item: one joined lowercase string + the phrase list. Results memoised per query. */
(function () {
  if (window.stormAlias1) return;
  var SRC = 'https://storm-basement-waterproofing.github.io/storm-inventory-scanner/search-names.json?v=1';
  var DATA = null, req = null, memo = {}, memoN = 0, lastSig = '';
  function norm(s) { return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim(); }
  function prep1(ph0) {
    var ph = String(ph0 || '').split('|').map(norm).filter(Boolean), set = {};
    ph.forEach(function (p) { set[p] = 1; });
    return { j: ' ' + ph.join(' \n ') + ' ', ph: ph.map(function (p) { return ' ' + p + ' '; }), set: set };
  }
  /* built in small slices so loading the phrases never blocks a frame */
  function prep(raw, cb) {
    var keys = Object.keys(raw), out = {}, i = 0;
    (function step() {
      var t = Date.now();
      while (i < keys.length && Date.now() - t < 8) { out[keys[i].toLowerCase()] = prep1(raw[keys[i]]); i++; }
      if (i < keys.length) setTimeout(step, 0); else cb(out);
    })();
  }
  function load() {
    if (req) return req;
    if (!window.fetch) return null;
    req = fetch(SRC, { credentials: 'omit' }).then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (raw) {
        var done = function (D) {
          DATA = D; memo = {}; memoN = 0; window.stormAlias1.ready = true;
          try { var el = document.getElementById('search'); if (el && el.value.trim()) el.dispatchEvent(new Event('input', { bubbles: true })); } catch (e) {}
          try { var a = document.activeElement; if (a && a !== document.getElementById('search') && a.tagName === 'INPUT' && a.value && a.value.trim()) a.dispatchEvent(new Event('input', { bubbles: true })); } catch (e2) {}
        };
        prep(raw, done);
      })
      .catch(function () { req = null; });
    return req;
  }
  function binMap() {
    var a = []; try { a = Array.isArray(items) ? items : []; } catch (e) { a = []; }
    var m = {}, sig = a.length + ':';
    for (var i = 0; i < a.length; i++) { var it = a[i]; if (it && it.bin) { m[String(it.bin).toLowerCase()] = String(it.bin); sig += it.bin + ','; } }
    if (sig !== lastSig) { lastSig = sig; memo = {}; memoN = 0; }
    return m;
  }
  /* -> [{bin, s}] best first; s 3 = exact phrase, 2 = all words in one phrase (whole words), 1.5 = one phrase (partial), 1 = spread */
  function aliasHits(q) {
    if (!DATA) return [];
    var nq = norm(q); if (nq.length < 2) return [];
    var toks = nq.split(' ').filter(function (t) { return t.length >= 2 || /^\d$/.test(t); });
    if (!toks.length) return [];
    var bm = binMap(), key = nq;
    if (Object.prototype.hasOwnProperty.call(memo, key)) return memo[key];
    var res = [];
    for (var b in DATA) {
      if (!bm[b]) continue;
      var D = DATA[b], i, ok = true;
      for (i = 0; i < toks.length; i++) if (D.j.indexOf(' ' + toks[i]) < 0) { ok = false; break; }
      if (!ok) continue;
      var s = 1, c = 0;
      for (var p = 0; p < D.ph.length; p++) {
        var P = D.ph[p], all = true, whole = true;
        for (i = 0; i < toks.length; i++) { if (P.indexOf(' ' + toks[i]) < 0) { all = false; break; } if (P.indexOf(' ' + toks[i] + ' ') < 0) whole = false; }
        if (all) { c++; s = Math.max(s, whole ? 2 : 1.5); }
      }
      if (D.set[nq]) s = 3;
      res.push({ bin: bm[b], s: s, c: c });
    }
    /* best tier first; within a tier, the item whose phrases use these words most often */
    res.sort(function (x, y) { return (y.s - x.s) || (y.c - x.c); });
    if (memoN > 300) { memo = {}; memoN = 0; }
    memo[key] = res; memoN++;
    return res;
  }
  function wrap() {
    var S = window.stormSearch205;
    if (!S || S._alias1) return !!S;
    var orig = S.rank;
    S.rank = function (q) {
      var base = orig.apply(this, arguments);
      var hits; try { hits = aliasHits(q); } catch (e) { hits = []; }
      if (!hits.length) return base;
      var bins = [], rank = {};
      function add(b) { if (rank[b] == null) { rank[b] = bins.length; bins.push(b); } }
      hits.forEach(function (h) { if (h.s === 3) add(h.bin); });
      (base && base.bins || []).forEach(add);
      /* keep the list clean: at most 8 extra phrase-only items when the names already found something, 15 when not */
      var cap = bins.length + (bins.length ? 8 : 15);
      hits.forEach(function (h) { if (bins.length < cap) add(h.bin); });
      return { bins: bins, rank: rank };
    };
    S._alias1 = true;
    return true;
  }
  window.stormAlias1 = { hits: aliasHits, load: load, ready: false };
  if (!wrap()) { var n = 0, t = setInterval(function () { if (wrap() || ++n > 40) clearInterval(t); }, 250); }
  document.addEventListener('focusin', function (e) { var t = e.target; if (t && t.tagName === 'INPUT' && (t.id === 'search' || t.type === 'search' || /r-q/.test(t.className || ''))) load(); }, true);
  function later() { if (window.requestIdleCallback) requestIdleCallback(function () { load(); }, { timeout: 4000 }); else setTimeout(load, 2500); }
  if (document.readyState === 'complete') setTimeout(later, 1500); else window.addEventListener('load', function () { setTimeout(later, 1500); });
})();
