/* ============================================================================
   yatawara.com — MADNESS  ·  E N T R O P Y  (riso maximalist)
   The art-interaction layer. Vanilla, self-initialising, no libraries.
   Everything degrades gracefully + respects prefers-reduced-motion.

   Features:
     1. INK CURSOR      — flame blob (.ink-dot) trailing the pointer; grows on
                          links/buttons. Only on (pointer:fine).
     2. MARQUEE         — clone .marquee .track content once for a seamless
                          CSS translateX(-50%) loop.
     3. GLITCH          — [data-glitch] jitters briefly on hover.
     4. STICKERS        — [data-sticker] drag with pointer events + toss inertia
                          + slight rotation; stay where dropped, kept in-viewport.

   Exposes nothing required; attaches helpers to window.AY if present.
   ========================================================================== */
(function () {
  "use strict";

  /* --- guards --------------------------------------------------------------- */
  if (typeof window === "undefined" || typeof document === "undefined") return;

  var mm = typeof window.matchMedia === "function"
    ? function (q) { return window.matchMedia(q); }
    : function () { return { matches: false, addEventListener: function () {}, addListener: function () {} }; };

  var reduceMotion = mm("(prefers-reduced-motion: reduce)").matches;
  var finePointer  = mm("(pointer: fine)").matches;

  // Track reduced-motion changes so a running session can quiet down.
  var rmQuery = mm("(prefers-reduced-motion: reduce)");
  function onRM(handler) {
    if (rmQuery.addEventListener) rmQuery.addEventListener("change", handler);
    else if (rmQuery.addListener) rmQuery.addListener(handler); // legacy Safari
  }

  var clamp = function (v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; };

  /* ========================================================================
     1. INK CURSOR
     A small flame blob that lags behind the real pointer and swells when it
     hovers something interactive. Pointer-only; the CSS already hides .ink-dot
     under reduced-motion, and we skip building it entirely here too.
     ===================================================================== */
  function initInkCursor() {
    if (reduceMotion || !finePointer) return;

    var dot = document.querySelector(".ink-dot");
    if (!dot) {
      dot = document.createElement("div");
      dot.className = "ink-dot";
      dot.setAttribute("aria-hidden", "true");
      document.body.appendChild(dot);
    }

    var tx = window.innerWidth / 2, ty = window.innerHeight / 2; // target (real pointer)
    var cx = tx, cy = ty;                                        // current (rendered)
    var visible = false;
    var hovering = false;
    var raf = 0;

    function show() {
      if (!visible) { visible = true; dot.style.opacity = "1"; }
    }
    function loop() {
      // ease toward the pointer for a slight trailing lag
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      var s = hovering ? 30 : 14;
      dot.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      dot.style.width = s + "px";
      dot.style.height = s + "px";
      raf = requestAnimationFrame(loop);
    }

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
      show();
    }
    // Grow over anything clickable.
    var interactiveSel = "a, button, [role='button'], input, textarea, select, summary, label, [data-sticker], [data-glitch], .chip";
    function onOver(e) {
      var t = e.target;
      if (t && t.closest && t.closest(interactiveSel)) hovering = true;
    }
    function onOut(e) {
      var t = e.target;
      if (t && t.closest && t.closest(interactiveSel)) {
        var to = e.relatedTarget;
        if (!to || !to.closest || !to.closest(interactiveSel)) hovering = false;
      }
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    document.addEventListener("mouseleave", function () { dot.style.opacity = "0"; visible = false; });
    document.addEventListener("mouseenter", show);

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      dot.style.opacity = "0";
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    }
    // If the user switches to reduced motion mid-session, bail out cleanly.
    onRM(function (e) { if (e.matches) stop(); });

    dot.style.opacity = "0";
    raf = requestAnimationFrame(loop);
  }

  /* ========================================================================
     2. MARQUEE — duplicate inner content once so translateX(-50%) is seamless.
     Works even under reduced-motion (the CSS pauses the animation; cloning is
     harmless and keeps layout consistent).
     ===================================================================== */
  function initMarquee() {
    var tracks = document.querySelectorAll(".marquee .track");
    Array.prototype.forEach.call(tracks, function (track) {
      if (track.dataset.cloned === "1") return;
      // Wrap originals so we duplicate the whole set as one unit.
      var original = Array.prototype.slice.call(track.childNodes);
      var frag = document.createDocumentFragment();
      original.forEach(function (node) { frag.appendChild(node.cloneNode(true)); });
      track.appendChild(frag);
      track.dataset.cloned = "1";
    });
  }

  /* ========================================================================
     3. GLITCH — brief, fast jitter on hover/focus for [data-glitch].
     Prefers toggling a class driven by the `glitch-x` keyframe in core.css.
     Subtle and self-clearing so repeated hovers always re-fire.
     ===================================================================== */
  function initGlitch() {
    if (reduceMotion) return;

    // Inject the helper class once (animation lives in core.css).
    var STYLE_ID = "ay-glitch-style";
    if (!document.getElementById(STYLE_ID)) {
      var st = document.createElement("style");
      st.id = STYLE_ID;
      st.textContent =
        "[data-glitch]{position:relative}" +
        "[data-glitch].ay-glitching{animation:glitch-x .26s steps(2) 1;will-change:transform}";
      (document.head || document.documentElement).appendChild(st);
    }

    var els = document.querySelectorAll("[data-glitch]");
    Array.prototype.forEach.call(els, function (el) {
      var timer = 0;
      function fire() {
        el.classList.remove("ay-glitching");
        // force reflow so the animation restarts even on rapid re-hover
        void el.offsetWidth;
        el.classList.add("ay-glitching");
        clearTimeout(timer);
        timer = setTimeout(function () { el.classList.remove("ay-glitching"); }, 320);
      }
      el.addEventListener("pointerenter", fire);
      el.addEventListener("focus", fire);
    });
  }

  /* ========================================================================
     4. DRAGGABLE STICKERS — [data-sticker] flingable with pointer events.
     Toss inertia + slight rotation; settle where dropped; kept roughly inside
     the viewport. Under reduced-motion: still draggable, but no inertia/spin.
     ===================================================================== */
  function initStickers() {
    var els = document.querySelectorAll("[data-sticker]");
    if (!els.length) return;

    Array.prototype.forEach.call(els, function (el) { setupSticker(el, reduceMotion); });
  }

  function setupSticker(el, noMotion) {
    var x = 0, y = 0, rot = 0;          // current transform offset (from CSS layout)
    var vx = 0, vy = 0, vr = 0;         // velocity for the toss
    var dragging = false;
    var startX = 0, startY = 0, baseX = 0, baseY = 0;
    var lastX = 0, lastY = 0, lastT = 0;
    var pointerId = null;
    var raf = 0;

    // Seed rotation from any inline/computed tilt so we don't snap on grab.
    el.style.touchAction = "none";
    el.style.cursor = "grab";
    if (!el.dataset.stickerInit) {
      el.dataset.stickerInit = "1";
      el.style.willChange = "transform";
    }

    function apply() {
      el.style.transform = "translate(" + x + "px," + y + "px) rotate(" + rot + "deg)";
    }

    function clampToViewport() {
      // Keep most of the sticker on screen relative to its laid-out spot.
      var r = el.getBoundingClientRect();
      var margin = 24;
      // current on-screen left/top excluding our transform:
      var originLeft = r.left - x;
      var originTop  = r.top - y;
      var minX = -originLeft + margin - r.width;     // allow partly off left
      var maxX = window.innerWidth - originLeft - margin;
      var minY = -originTop + margin - r.height;
      var maxY = window.innerHeight - originTop - margin;
      // keep at least a sliver visible
      minX = -originLeft - r.width + margin;
      maxX = window.innerWidth - originLeft - margin;
      minY = -originTop - r.height + margin;
      maxY = window.innerHeight - originTop - margin;
      x = clamp(x, minX, maxX);
      y = clamp(y, minY, maxY);
    }

    function momentum() {
      vx *= 0.92; vy *= 0.92; vr *= 0.9;
      x += vx; y += vy; rot += vr;
      clampToViewport();
      apply();
      if (Math.abs(vx) > 0.15 || Math.abs(vy) > 0.15 || Math.abs(vr) > 0.05) {
        raf = requestAnimationFrame(momentum);
      } else {
        raf = 0;
      }
    }

    function onDown(e) {
      if (e.button != null && e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      pointerId = e.pointerId;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      baseX = x; baseY = y;
      startX = e.clientX; startY = e.clientY;
      lastX = e.clientX; lastY = e.clientY; lastT = (e.timeStamp || Date.now());
      vx = vy = vr = 0;
      el.style.cursor = "grabbing";
      el.style.zIndex = String(nextStickerZ());
      if (el.setPointerCapture) { try { el.setPointerCapture(pointerId); } catch (_) {} }
      e.preventDefault();
    }

    function onMove(e) {
      if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;
      var nx = baseX + (e.clientX - startX);
      var ny = baseY + (e.clientY - startY);
      var now = (e.timeStamp || Date.now());
      var dt = now - lastT;
      if (dt > 0) {
        var ndx = e.clientX - lastX, ndy = e.clientY - lastY;
        if (!noMotion) {
          vx = ndx; vy = ndy;
          rot = clamp(ndx * 0.4, -18, 18);   // lean into the drag direction
        }
        lastX = e.clientX; lastY = e.clientY; lastT = now;
      }
      x = nx; y = ny;
      clampToViewport();
      apply();
    }

    function onUp(e) {
      if (!dragging || (pointerId !== null && e.pointerId !== pointerId)) return;
      dragging = false;
      el.style.cursor = "grab";
      if (el.releasePointerCapture && pointerId !== null) {
        try { el.releasePointerCapture(pointerId); } catch (_) {}
      }
      pointerId = null;
      if (noMotion) { rot = 0; apply(); return; }
      // toss: clamp velocity, spin a touch, then ease back to a small resting tilt
      vx = clamp(vx, -28, 28);
      vy = clamp(vy, -28, 28);
      vr = clamp((vx) * 0.05, -3, 3);
      if (!raf) raf = requestAnimationFrame(function step() {
        momentum();
        // gently relax rotation toward a settled gentle tilt when nearly stopped
        if (!raf) { rot *= 0.6; if (Math.abs(rot) < 0.4) rot = 0; apply(); }
      });
    }

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("lostpointercapture", function () { dragging = false; el.style.cursor = "grab"; });
    // keep things on-screen if the window resizes after a toss
    window.addEventListener("resize", function () { clampToViewport(); apply(); });
  }

  var _stickerZ = 300;
  function nextStickerZ() { return ++_stickerZ; }

  /* ========================================================================
     BOOT
     ===================================================================== */
  function init() {
    try { initInkCursor(); } catch (_) {}
    try { initMarquee(); }   catch (_) {}
    try { initGlitch(); }    catch (_) {}
    try { initStickers(); }  catch (_) {}

    // Optional: expose a tiny re-scan hook for dynamically added content.
    if (window.AY && typeof window.AY === "object") {
      window.AY.madness = {
        rescan: function () {
          try { initMarquee(); } catch (_) {}
          try { initGlitch(); }  catch (_) {}
          try { initStickers(); } catch (_) {}
        }
      };
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
