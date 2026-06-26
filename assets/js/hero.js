/* ============================================================================
   yatawara.com — LIVING HERO  ·  K A N D I N S K Y   (assets/js/hero.js)
   ----------------------------------------------------------------------------
   The art centerpiece: a generative BAUHAUS composition — "point · line · plane"
   in Kandinsky's vocabulary, painted on warm parchment. A balanced arrangement
   of floating CIRCLES (some solid in the painterly primaries, some CONCENTRIC
   RINGS, some thin outlines), a few long thin LINES (ink + one colored, diagonal,
   crossing), 1-2 ARCS, 1-2 TRIANGLES, and a scatter of small dots ("points").

   It is composed, never random noise: every element has a home position and a
   slow autonomous LIFE — it drifts on its own orbit, rotates, and "breathes"
   (radius/length pulse). The POINTER applies a gentle parallax, near elements
   sliding more than far ones. The visual MASS is biased toward the RIGHT so the
   left-side hero headline stays clearly legible.

   LOOK (source-over on parchment — NEVER additive 'lighter'):
     · painterly primaries from core.css — blue/cobalt #1840c4, red/vermilion
       #e23a26, yellow/golden #f4b81e, teal #138a7a, violet #6c3fb4
     · ink (warm black) #1a1813 for lines, outlines + the point scatter
     · flat fills + thin lines, soft and light; mass kept to the right.

   Contract (UNCHANGED): finds <canvas id="hero-canvas">, sizes to its PARENT
   (DPR-aware), handles resize, uses requestAnimationFrame, pauses on
   document.hidden, no-ops if the canvas is absent, self-injects its CSS,
   vanilla JS only.  prefers-reduced-motion → ONE static composition, no loop.
   ========================================================================== */
(function () {
  "use strict";

  var CANVAS_ID = "hero-canvas";

  /* ---- Bauhaus palette (core.css hexes; source-over on parchment) --------- */
  var INK    = [26, 24, 19];     // #1a1813  warm black — lines + points
  var BLUE   = [24, 64, 196];    // #1840c4  cobalt — the lead
  var RED     = [226, 58, 38];   // #e23a26  vermilion
  var YELLOW = [244, 184, 30];   // #f4b81e  golden
  var TEAL   = [19, 138, 122];   // #138a7a
  var VIOLET = [108, 63, 180];   // #6c3fb4

  var COLORS = [BLUE, RED, YELLOW, TEAL, VIOLET];

  function rgba(c, a) {
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }

  /* ---- self-injected CSS (identical contract: fade-in, behind text) ------- */
  function injectCSS() {
    if (document.getElementById("hero-canvas-css")) return;
    var s = document.createElement("style");
    s.id = "hero-canvas-css";
    s.textContent =
      "#" + CANVAS_ID + "{" +
        "position:absolute;inset:0;width:100%;height:100%;" +
        "display:block;z-index:0;pointer-events:none;" +
        "opacity:0;transition:opacity 1.1s ease;" +
      "}" +
      "#" + CANVAS_ID + ".hero-canvas-ready{opacity:1;}";
    (document.head || document.documentElement).appendChild(s);
  }

  /* ========================================================================= */
  function boot() {
    var canvas = document.getElementById(CANVAS_ID);
    if (!canvas || !canvas.getContext) return;          // graceful no-op
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    injectCSS();

    var parent = canvas.parentElement || canvas;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var finePointer = window.matchMedia("(pointer: fine)").matches;

    /* ---- sizing (DPR-aware, sized to parent) ----------------------------- */
    var W = 0, H = 0, DPR = 1;
    function resize() {
      var r = parent.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      DPR = Math.min(2, window.devicePixelRatio || 1);   // cap DPR for perf
      canvas.width  = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);            // draw in CSS pixels
    }
    resize();

    /* ---- the composition --------------------------------------------------
       Positions are stored in NORMALIZED coords: x,y in [0,1] across the field,
       sizes as a fraction of min(W,H) ("unit"). This keeps the arrangement
       intact at every aspect ratio + DPR. The composition is hand-placed and
       biased RIGHT (most x > 0.5) so the left stays open for the headline.

       Each element carries:
         · a static "home" (hx,hy)
         · an orbit (drift) — small ellipse it travels, own speed/phase
         · a rotation rate (for rings/lines/triangles/arcs)
         · a breathe rate (radius / length / alpha pulse)
         · a parallax DEPTH in [0,1] — how strongly the pointer moves it
       The drift amplitudes are tiny so the picture reads as ONE composition
       that is quietly alive, not a swarm.
       --------------------------------------------------------------------- */
    function rgb(p) {
      // small reusable "random but fixed" jitter from a phase, kept in [-1,1]
      return Math.sin(p * 12.9898) * 0.5 + Math.sin(p * 4.1414) * 0.5;
    }

    // --- CIRCLES (solid / ring / outline). Sizes ~ fraction of unit. -------
    var circles = [
      // the lead: a large cobalt solid, upper-right anchor
      { hx:0.70, hy:0.34, r:0.150, kind:"solid",  col:BLUE,   a:0.92,
        orbX:0.012, orbY:0.016, orbS:0.060, orbP:0.4, brR:0.05, brS:0.31, depth:0.55 },
      // vermilion concentric rings, mid-right
      { hx:0.86, hy:0.60, r:0.115, kind:"rings",  col:RED,    a:0.95, rings:4,
        orbX:0.018, orbY:0.012, orbS:0.045, orbP:2.1, brR:0.07, brS:0.23, depth:0.85 },
      // golden solid, smaller, lower-right — warm counterweight
      { hx:0.62, hy:0.74, r:0.072, kind:"solid",  col:YELLOW, a:0.96,
        orbX:0.020, orbY:0.014, orbS:0.052, orbP:3.7, brR:0.06, brS:0.37, depth:0.95 },
      // teal thin outline ring, floating high-right
      { hx:0.92, hy:0.22, r:0.090, kind:"outline",col:TEAL,   a:0.90,
        orbX:0.022, orbY:0.018, orbS:0.040, orbP:1.2, brR:0.08, brS:0.27, depth:1.0 },
      // violet concentric rings, smaller, tucked center-right
      { hx:0.54, hy:0.50, r:0.058, kind:"rings",  col:VIOLET, a:0.88, rings:3,
        orbX:0.016, orbY:0.020, orbS:0.048, orbP:5.0, brR:0.07, brS:0.33, depth:0.7 },
      // an ink outline ring overlapping the cobalt (Kandinsky "halo")
      { hx:0.66, hy:0.30, r:0.205, kind:"outline",col:INK,    a:0.55,
        orbX:0.010, orbY:0.012, orbS:0.058, orbP:0.9, brR:0.04, brS:0.19, depth:0.45 },
      // a single small blue solid drifted toward center as a bridge to the text
      { hx:0.44, hy:0.66, r:0.030, kind:"solid",  col:BLUE,   a:0.80,
        orbX:0.018, orbY:0.016, orbS:0.044, orbP:2.7, brR:0.09, brS:0.41, depth:0.6 },
      // yellow ring outline, top-center-right accent
      { hx:0.78, hy:0.14, r:0.045, kind:"outline",col:YELLOW, a:0.85,
        orbX:0.020, orbY:0.022, orbS:0.038, orbP:4.4, brR:0.10, brS:0.29, depth:0.9 }
    ];

    // --- LINES (long, thin, crossing). Endpoints in normalized coords; each
    //     spins slowly about its midpoint + breathes its length. -------------
    var lines = [
      // long ink diagonal sweeping up-right across the field
      { mx:0.66, my:0.50, len:1.30, ang:-0.62, col:INK,  w:0.0028, a:0.80,
        rot:0.013, brL:0.05, brS:0.21, depth:0.5 },
      // a crossing ink diagonal, shallower
      { mx:0.72, my:0.46, len:1.05, ang: 0.42, col:INK,  w:0.0020, a:0.65,
        rot:-0.010, brL:0.06, brS:0.27, depth:0.6 },
      // one COLORED line — cobalt — steeper, anchoring the right
      { mx:0.82, my:0.52, len:0.95, ang: 1.18, col:BLUE, w:0.0034, a:0.85,
        rot:0.016, brL:0.07, brS:0.33, depth:0.8 }
    ];

    // --- ARCS (open strokes). Drawn as part of a ring's circumference. ------
    var arcs = [
      // a wide red arc cradling the lower-right
      { hx:0.80, hy:0.78, r:0.190, a0:-0.30, a1:1.45, col:RED,  w:0.0030, a:0.75,
        rot:0.011, brR:0.05, brS:0.24, depth:0.7 },
      // a smaller ink arc up high
      { hx:0.74, hy:0.20, r:0.120, a0:2.5,  a1:4.4,  col:INK,  w:0.0022, a:0.6,
        rot:-0.014, brR:0.07, brS:0.30, depth:0.85 }
    ];

    // --- TRIANGLES (thin outlines). Stored as a base point, size + rotation. -
    var triangles = [
      // a teal triangle, mid-right, slowly turning
      { hx:0.88, hy:0.42, r:0.085, col:TEAL,   a:0.80, w:0.0026,
        rot:0.018, brR:0.06, brS:0.35, depth:0.95 },
      // a small ink triangle lower, for rhythm
      { hx:0.58, hy:0.86, r:0.050, col:INK,    a:0.55, w:0.0020,
        rot:-0.022, brR:0.08, brS:0.40, depth:0.65 }
    ];

    // --- POINTS (the scatter of small dots). Placed by a fixed pseudo-random
    //     walk, weighted toward the right; each twinkles + drifts faintly. ---
    var POINT_N = 26;
    var points = [];
    (function buildPoints() {
      for (var i = 0; i < POINT_N; i++) {
        var p = i * 1.37 + 0.5;
        // bias x to the right: base 0.42 + up to ~0.55
        var nx = 0.42 + (rgb(p) * 0.5 + 0.5) * 0.55;
        var ny = 0.10 + (rgb(p + 7.3) * 0.5 + 0.5) * 0.82;
        var col = (i % 5 === 0) ? COLORS[(i / 5 | 0) % COLORS.length] : INK;
        points.push({
          hx: nx, hy: ny,
          r: 0.004 + (rgb(p + 2.1) * 0.5 + 0.5) * 0.010,
          col: col,
          a: 0.45 + (rgb(p + 4.9) * 0.5 + 0.5) * 0.45,
          tw: 0.18 + (rgb(p + 1.1) * 0.5 + 0.5) * 0.5,    // twinkle speed
          ph: p,                                          // twinkle phase
          orb: 0.010 + (rgb(p + 3.3) * 0.5 + 0.5) * 0.012,
          orbS: 0.20 + (rgb(p + 6.6) * 0.5 + 0.5) * 0.4,
          depth: 0.5 + (rgb(p + 8.8) * 0.5 + 0.5) * 0.5
        });
      }
    })();

    /* ---- view: maps normalized coords → screen --------------------------
       We anchor the composition to a square of side = min(W,H) ("unit"),
       centered a touch RIGHT + below middle, so the arrangement holds its
       proportions and its mass stays clear of the left headline.
       --------------------------------------------------------------------- */
    var view = { unit: 1, ox: 0, oy: 0 };
    function computeView() {
      view.unit = Math.min(W, H);
      // place the [0,1] field so its center sits right-of-middle.
      // field width == view.unit; we offset its origin so center.x ≈ 0.60·W.
      view.ox = (W * 0.60) - view.unit * 0.5;
      view.oy = (H * 0.54) - view.unit * 0.5;
    }
    computeView();

    function sx(nx) { return view.ox + nx * view.unit; }
    function sy(ny) { return view.oy + ny * view.unit; }
    function su(nr) { return nr * view.unit; }

    /* ---- pointer reactivity (gentle parallax) ---------------------------
       Canvas is pointer-events:none so hero text stays clickable; we listen
       on the parent (which sits behind the text). Pointer in [-0.5,0.5] maps
       to a small, smoothed parallax offset; each element shifts by its own
       depth so the field gains a layered, dimensional drift.
       --------------------------------------------------------------------- */
    var PARALLAX = 0.05;               // max shift as fraction of unit
    var par = { x: 0, y: 0 };
    var parTarget = { x: 0, y: 0 };
    function pointerPos(e) {
      var r = canvas.getBoundingClientRect();
      var t = (e.touches && e.touches[0]) ? e.touches[0] : e;
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    }
    function applyPointer(e) {
      var p = pointerPos(e);
      var nx = Math.max(0, Math.min(1, p.x / (W || 1)));
      var ny = Math.max(0, Math.min(1, p.y / (H || 1)));
      parTarget.x = (nx - 0.5);       // [-0.5, 0.5]
      parTarget.y = (ny - 0.5);
    }
    function onMove(e) { applyPointer(e); }
    function onLeave() { parTarget.x = 0; parTarget.y = 0; }
    if (finePointer && !reduce) {
      parent.addEventListener("mousemove", onMove, { passive: true });
      parent.addEventListener("mouseleave", onLeave, { passive: true });
    }
    if (!reduce) {
      parent.addEventListener("pointerdown", applyPointer, { passive: true });
      parent.addEventListener("touchstart", onMove, { passive: true });
    }

    /* ---- per-element animated transform ---------------------------------
       Returns the live screen center for an element at time t, folding in its
       autonomous orbit + the pointer parallax (scaled by depth). Static when
       reduced (t held fixed, parallax zero).
       --------------------------------------------------------------------- */
    function liveCenter(el, t) {
      var ox = Math.cos(t * el.orbS + el.orbP) * (el.orbX != null ? el.orbX : el.orb);
      var oy = Math.sin(t * el.orbS + el.orbP * 1.3) * (el.orbY != null ? el.orbY : el.orb);
      var px = sx(el.hx) + su(ox) + par.x * PARALLAX * view.unit * el.depth;
      var py = sy(el.hy) + su(oy) + par.y * PARALLAX * view.unit * el.depth;
      return { x: px, y: py };
    }
    // live radius / length with a gentle breathe
    function breatheR(el, t) {
      return 1 + Math.sin(t * el.brS + el.hx * 9) * el.brR;
    }

    /* ---- drawing primitives --------------------------------------------- */
    function drawCircle(el, t) {
      var c = liveCenter(el, t);
      var r = su(el.r) * breatheR(el, t);
      if (r <= 0) return;
      if (el.kind === "solid") {
        ctx.globalAlpha = el.a;
        ctx.fillStyle = rgba(el.col, 1);
        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.fill();
      } else if (el.kind === "outline") {
        ctx.globalAlpha = el.a;
        ctx.strokeStyle = rgba(el.col, 1);
        ctx.lineWidth = Math.max(1, su(0.004));
        ctx.beginPath();
        ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
        ctx.stroke();
      } else { // rings (concentric)
        var n = el.rings || 3;
        ctx.lineWidth = Math.max(1, su(0.005));
        for (var i = 0; i < n; i++) {
          var rr = r * (1 - i / n);
          if (rr <= 0) continue;
          // alternate solid-filled innermost on some, else stroke rings
          if (i === n - 1) {
            ctx.globalAlpha = el.a;
            ctx.fillStyle = rgba(el.col, 1);
            ctx.beginPath();
            ctx.arc(c.x, c.y, rr, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.globalAlpha = el.a * (0.55 + 0.45 * (i % 2));
            ctx.strokeStyle = rgba(el.col, 1);
            ctx.beginPath();
            ctx.arc(c.x, c.y, rr, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      }
    }

    function drawLine(el, t) {
      var c = liveCenter(el, t);
      var ang = el.ang + t * el.rot;
      var len = su(el.len) * (1 + Math.sin(t * el.brS + el.mx * 7) * el.brL);
      var hx = Math.cos(ang) * len / 2;
      var hy = Math.sin(ang) * len / 2;
      ctx.globalAlpha = el.a;
      ctx.strokeStyle = rgba(el.col, 1);
      ctx.lineWidth = Math.max(1, su(el.w));
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(c.x - hx, c.y - hy);
      ctx.lineTo(c.x + hx, c.y + hy);
      ctx.stroke();
    }

    function drawArc(el, t) {
      var c = liveCenter(el, t);
      var r = su(el.r) * breatheR(el, t);
      if (r <= 0) return;
      var spin = t * el.rot;
      ctx.globalAlpha = el.a;
      ctx.strokeStyle = rgba(el.col, 1);
      ctx.lineWidth = Math.max(1, su(el.w));
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, el.a0 + spin, el.a1 + spin);
      ctx.stroke();
    }

    function drawTriangle(el, t) {
      var c = liveCenter(el, t);
      var r = su(el.r) * breatheR(el, t);
      if (r <= 0) return;
      var spin = el.hx * 6 + t * el.rot;
      ctx.globalAlpha = el.a;
      ctx.strokeStyle = rgba(el.col, 1);
      ctx.lineWidth = Math.max(1, su(el.w));
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (var i = 0; i < 3; i++) {
        var aa = spin + i * (Math.PI * 2 / 3) - Math.PI / 2;
        var x = c.x + Math.cos(aa) * r;
        var y = c.y + Math.sin(aa) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    }

    function drawPoint(el, t) {
      var c = liveCenter(el, t);
      var r = Math.max(0.75, su(el.r));
      var a = el.a * (0.6 + 0.4 * Math.sin(t * el.tw + el.ph));
      if (a <= 0) return;
      ctx.globalAlpha = a;
      ctx.fillStyle = rgba(el.col, 1);
      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ---- compose one full frame -----------------------------------------
       Draw order = back to front: faint points + thin lines/arcs behind, the
       big planes (circles) reading as the foreground mass on the right.
       --------------------------------------------------------------------- */
    function compose(t) {
      var i;
      // 1) the point scatter (behind)
      for (i = 0; i < points.length; i++) drawPoint(points[i], t);
      // 2) lines (long, crossing)
      for (i = 0; i < lines.length; i++) drawLine(lines[i], t);
      // 3) arcs
      for (i = 0; i < arcs.length; i++) drawArc(arcs[i], t);
      // 4) triangles
      for (i = 0; i < triangles.length; i++) drawTriangle(triangles[i], t);
      // 5) circles (the foreground planes / rings)
      for (i = 0; i < circles.length; i++) drawCircle(circles[i], t);
      ctx.globalAlpha = 1;
    }

    /* ---- frame composition (transparent → parchment shows through) ------- */
    function clear() {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";   // flat color on paper
    }

    /* ---- STATIC frame (reduced motion) ----------------------------------
       One fully-resolved composition at a fixed time: no loop, no drift, no
       parallax. The arrangement itself carries the interest.
       --------------------------------------------------------------------- */
    function staticFrame() {
      par.x = 0; par.y = 0;
      clear();
      compose(0);                              // canonical pose at t = 0
      canvas.classList.add("hero-canvas-ready");
    }

    /* ---- animation loop -------------------------------------------------- */
    var now = 0;                              // seconds (shared clock)
    var prev = 0;
    var running = false;
    var rafId = 0;
    var revealed = false;

    function frame(ts) {
      if (!running) return;
      var tSec = ts / 1000;
      if (!prev) prev = tSec;
      var dt = tSec - prev;
      prev = tSec;
      if (dt > 0.05) dt = 0.05;              // clamp huge gaps (tab refocus)
      now += dt;

      // smooth pointer parallax toward target (frame-rate independent-ish)
      var k = Math.min(1, dt * 2.2);
      par.x += (parTarget.x - par.x) * k;
      par.y += (parTarget.y - par.y) * k;

      clear();
      compose(now);

      if (!revealed) { revealed = true; canvas.classList.add("hero-canvas-ready"); }
      rafId = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce) return;
      running = true; prev = 0;
      rafId = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    /* ---- lifecycle: resize + visibility ---------------------------------- */
    var resizeRAF = 0;
    function onResize() {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(function () {
        resizeRAF = 0;
        resize();
        computeView();
        if (reduce) staticFrame();           // redraw the still composition
      });
    }
    window.addEventListener("resize", onResize);
    if (window.ResizeObserver) {
      try { new ResizeObserver(onResize).observe(parent); } catch (e) {}
    }

    function onVisibility() {
      if (reduce) return;
      if (document.hidden) stop();
      else { prev = 0; start(); }
    }
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- go -------------------------------------------------------------- */
    if (reduce) {
      staticFrame();                          // single static composition, no loop
    } else {
      if (!document.hidden) start();
    }

    /* ---- expose a tiny handle (optional, mirrors window.AY convention) ---
       .pulse() re-centers the parallax; .params() reads live state. */
    try {
      window.AY = window.AY || {};
      window.AY.hero = {
        nudge: function (x, y) {
          if (reduce) return;
          if (x != null) parTarget.x = Math.max(-0.5, Math.min(0.5, x));
          if (y != null) parTarget.y = Math.max(-0.5, Math.min(0.5, y));
        },
        params: function () {
          return { t: now, parallax: { x: par.x, y: par.y },
                   elements: circles.length + lines.length + arcs.length +
                             triangles.length + points.length };
        },
        stop: stop,
        start: start
      };
    } catch (e) {}
  }

  /* ---- init (defer-safe) --------------------------------------------------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
