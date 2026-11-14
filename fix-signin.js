/* fix-signin v1 (Hark, 2026-11-14, Dave): manager code box - the keypad's Enter / Go / Done key drops the keyboard and logs in right away.
   - every code input gets enterkeyhint="go" (Android/iOS show a Go key on the number pad)
   - Enter (keydown, or keyup when a keyboard sends no keydown) on a code input: keyboard closes (blur) and the Log in button is pressed for you
   - "Set manager code" form: Enter in the first box moves to the second box; Enter in the second box saves
   - one press = one login (a repeat within 800 ms or while the button is busy is ignored). Crew view and everything else untouched. */
(function () {
  if (window.__stormSignin1) return; window.__stormSignin1 = 1;
  var last = 0;
  function isCode(t) { return !!(t && t.classList && t.classList.contains('sl-in') && t.closest && t.closest('#storm-lock')); }
  function hint() { var a = document.querySelectorAll('#storm-lock .sl-in'); for (var i = 0; i < a.length; i++) { if (a[i].getAttribute('enterkeyhint') !== (a[i].id === 'sl-a' && document.getElementById('sl-b') ? 'next' : 'go')) a[i].setAttribute('enterkeyhint', a[i].id === 'sl-a' && document.getElementById('sl-b') ? 'next' : 'go'); } }
  function isEnter(e) { return e.key === 'Enter' || e.keyCode === 13 || e.which === 13; }
  function go(e) {
    var t = e.target; if (!isCode(t) || !isEnter(e)) return;
    e.preventDefault(); e.stopImmediatePropagation();
    if (e.type === 'keyup' && Date.now() - last < 800) return; /* keydown already handled this press */
    var b = document.getElementById('sl-b');
    if (t.id === 'sl-a' && b && !b.value) { last = Date.now(); try { b.focus(); } catch (x) {} return; }
    if (Date.now() - last < 800) return;
    last = Date.now();
    var btn = document.querySelector('#storm-lock [data-sl-go]');
    if (!btn || btn.disabled) return;
    try { t.blur(); } catch (x) {}
    try { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); } catch (x) {}
    btn.click();
  }
  window.addEventListener('keydown', go, true);
  window.addEventListener('keyup', function (e) { if (isCode(e.target) && isEnter(e)) { if (Date.now() - last < 800) { e.preventDefault(); e.stopImmediatePropagation(); return; } go(e); } }, true);
  function watch() {
    var c = document.getElementById('sl-card'); if (!c) return false;
    hint(); new MutationObserver(hint).observe(c, { childList: true, subtree: true }); return true;
  }
  if (!watch()) document.addEventListener('DOMContentLoaded', watch);
  window.stormSignin = { v: 1 };
})();
