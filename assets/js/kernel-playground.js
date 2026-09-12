/* ============================================================================
   yatawara.com — MEMORY-KERNEL PLAYGROUND
   An interactive decay simulator for the central finding of "The Shape of
   Volatility Memory": markets forget sub-exponentially.

   The user drags two parameters of the stretched-exponential memory kernel
       w(τ) = exp( -(τ / T)^α )
   and watches it against the pure exponential reference (α = 1). Two live
   readouts make the headline tangible: the HALF-LIFE (τ where w = 0.5) stays
   small as α drops, while the TIME-TO-LAST-1% (τ where w = 0.01) explodes — the
   blog's "first half of a memory disappears in ~5 days; the last 1% can linger
   a year (and then some)."

   Self-contained: injects its own CSS, self-inits on DOMContentLoaded, no-ops
   gracefully with 0 mounts and supports many. Vanilla JS, no libraries, no math
   libs — exp/pow/log are the platform's; everything else is computed here.

   LOOK: v8 Google. The figure is mounted ONLY inside the design system's one
   dark band (.section-ink), and the injected CSS below reads that band's own
   tokens — --surface-raised / --surface-sunken / --band-bg / --border* /
   --ink* / --accent — so there is nothing left for a page to re-theme in a
   <style> block of its own. Flat panel, hairline rules, no blur and no glow;
   the curve in the band's link blue, the exponential reference in the band's
   yellow, white / green markers. source-over.
   (Math / contract / readouts / reduced-motion all unchanged.)
   ========================================================================== */
(function () {
  "use strict";

  var SELECTOR = '[data-component="kernel-playground"]';
  var STYLE_ID = "kp-styles";

  /* ---- math constants (no math lib) ---- */
  var LN2 = Math.log(2); // 0.693147…
  var LN100 = Math.log(100); // ln(1/0.01) = 4.60517…
  var DAY = 1;
  var MONTH = 30.4375; // days
  var YEAR = 365.25; // days

  /* ---- parameter domain ---------------------------------------------------
     α ∈ [0.10, 1.00] — shape. <1 = sub-exponential (heavy tail). 1 = exponential.
     T  = timescale (days). DEFAULT chosen so that at the empirical market value
     α ≈ 0.27 the half-life lands at ~5 days (T·(ln2)^(1/α) ≈ 5 ⇒ T ≈ 19.4),
     exactly echoing the essay. At that T the 1% tail balloons to ~15 years,
     which is the whole point — the tail, not the half-life, is what explodes. */
  var ALPHA_MIN = 0.1,
    ALPHA_MAX = 1.0;
  var T_MIN = 2,
    T_MAX = 90;
  var ALPHA_MARKETS = 0.27;
  var T_DEFAULT = 19.4;

  /* ---- palette. Canvas 2D cannot read CSS var()s, so these mirror the
         .section-ink token hexes (components.css §1) the rest of the widget
         resolves through var(). The well is --band-bg #202124; every value
         below is measured against it:
           #8ab4f8 7.6:1   #fdd663 11.6:1   #f5f7fa 16.0:1   #81c995 8.2:1
           dim #bdc1c6 8.9:1   faint #9aa0a6 6.1:1                        */
  var COL = {
    stretch: "#8ab4f8", // --ink-band-link — stretched-exponential (the finding)
    expo: "#fdd663", // --yellow-ink — pure exponential reference (α = 1), dashed
    half: "#f5f7fa", // near-white — w = 0.5 marker
    tail: "#81c995", // --green-ink — w = 0.01 marker
    grid: "rgba(255,255,255,0.09)", // hairline gridline
    gridStrong: "rgba(255,255,255,0.20)", // emphasized gridline
    axis: "rgba(255,255,255,0.34)", // hairline axis
    ink: "#f5f7fa",
    dim: "#bdc1c6", // --grey-400 — axis labels
    faint: "#9aa0a6" // --grey-500 — tick labels
  };

  // Canvas 2D cannot resolve CSS var() in ctx.font — use a concrete stack that
  // mirrors --font-body, including Google's own declared fallback.
  var MONO = '"Google Sans Text", Arial, Helvetica, sans-serif';

  var prefersReduced = false;
  try {
    prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {}

  /* ====================================================================== *
   *  KERNEL MATH
   * ====================================================================== */

  // Stretched exponential weight at lag τ (days).
  function weight(tau, T, alpha) {
    if (tau <= 0) return 1;
    return Math.exp(-Math.pow(tau / T, alpha));
  }

  // Closed-form inverse: τ where w(τ) = level, i.e. (τ/T)^α = ln(1/level).
  //   τ = T · ( ln(1/level) )^(1/α)
  function tauAtLevel(level, T, alpha) {
    return T * Math.pow(Math.log(1 / level), 1 / alpha);
  }
  function halfLife(T, alpha) {
    return T * Math.pow(LN2, 1 / alpha);
  } // level = 0.5
  function tail1pct(T, alpha) {
    return T * Math.pow(LN100, 1 / alpha);
  } // level = 0.01

  /* ====================================================================== *
   *  FORMATTING
   * ====================================================================== */

  // Human-readable duration from a value in days — minutes → hours → days →
  // months → years, with sensible significant figures.
  function fmtDuration(d) {
    if (!isFinite(d) || d < 0) return "—";
    if (d < 1 / 24) {
      var min = Math.round(d * 1440);
      return min + " min";
    }
    if (d < 1) {
      var hr = d * 24;
      return (hr < 10 ? hr.toFixed(1) : Math.round(hr)) + " hr";
    }
    if (d < 90) {
      return (d < 10 ? d.toFixed(1) : Math.round(d)) + " days";
    }
    if (d < 2 * YEAR) {
      var mo = d / MONTH;
      return (mo < 10 ? mo.toFixed(1) : Math.round(mo)) + " months";
    }
    var yr = d / YEAR;
    return (yr < 10 ? yr.toFixed(1) : Math.round(yr)) + " years";
  }

  // Compact unit for the readout sub-label (so the metaphor reads cleanly).
  function fmtDays(d) {
    if (!isFinite(d)) return "—";
    if (d >= 1000) return Math.round(d).toLocaleString() + " days";
    if (d >= 100) return Math.round(d) + " days";
    if (d >= 10) return d.toFixed(0) + " days";
    return d.toFixed(2) + " days";
  }

  /* ====================================================================== *
   *  CSS  (self-injected once)
   * ====================================================================== */
  function injectCSS() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      ".kp{position:relative;background:var(--surface-raised);border:1px solid var(--border-soft);border-radius:var(--r-lg,24px);padding:clamp(1rem,3vw,1.6rem);overflow:hidden;font-family:var(--font-body,Arial,Helvetica,sans-serif)}",
      ".kp>*{position:relative}",
      // header
      ".kp-head{display:flex;align-items:baseline;justify-content:space-between;gap:.75rem;flex-wrap:wrap;margin-bottom:1rem}",
      ".kp-eyebrow{font-family:var(--font-code,ui-monospace,monospace);font-size:.62rem;letter-spacing:.06em;color:var(--ink-3);display:flex;align-items:center;gap:.5rem;background:var(--surface-sunken);border:1px solid var(--border-soft);padding:.34em .8em;border-radius:var(--r-pill,32px)}",
      ".kp-eyebrow .kp-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:kp-pulse 2.4s infinite}",
      ".kp-eq{font-family:var(--font-code,ui-monospace,monospace);font-size:clamp(.66rem,1.6vw,.78rem);color:var(--ink-3);white-space:nowrap}",
      ".kp-eq b{color:var(--accent);font-weight:600}",
      ".kp-eq .kp-a{color:var(--accent)}",
      // canvas — the well is the band ground, so it reads as recessed inside
      // the panel and the canvas palette above keeps its measured contrast.
      ".kp-canvas-wrap{position:relative;width:100%;border:1px solid var(--border-soft);border-radius:var(--r-md,16px);background:var(--band-bg);overflow:hidden}",
      ".kp-canvas-wrap canvas{display:block;width:100%;height:auto;touch-action:none;cursor:crosshair}",
      // legend
      ".kp-legend{display:flex;flex-wrap:wrap;gap:.4rem .9rem;margin-top:1rem;font-family:var(--font-code,ui-monospace,monospace);font-size:.64rem;color:var(--ink-3)}",
      ".kp-legend span{display:inline-flex;align-items:center;gap:.4rem;white-space:nowrap}",
      ".kp-legend i{width:16px;height:0;border-top-width:2px;border-top-style:solid;display:inline-block}",
      ".kp-legend i.dash{border-top-style:dashed}",
      ".kp-legend i.dot{width:9px;height:9px;border:0;border-radius:50%}",
      // controls grid
      ".kp-controls{display:grid;grid-template-columns:1fr;gap:1.1rem;margin-top:1.15rem}",
      "@media(min-width:680px){.kp-controls{grid-template-columns:1fr 1fr}}",
      ".kp-ctrl-label{display:flex;align-items:baseline;justify-content:space-between;gap:.5rem;margin-bottom:.55rem}",
      ".kp-ctrl-label .kp-name{font-family:var(--font-code,ui-monospace,monospace);font-size:.64rem;letter-spacing:.04em;color:var(--ink-3)}",
      ".kp-ctrl-label .kp-val{font-family:var(--font-code,ui-monospace,monospace);font-size:.92rem;font-weight:600;color:var(--ink);font-variant-numeric:tabular-nums}",
      ".kp-ctrl-label .kp-val small{color:var(--ink-3);font-weight:400;font-size:.7em;margin-left:.15em}",
      // range slider — hairline rail, accent fill, plain white pill thumb
      ".kp-range{-webkit-appearance:none;appearance:none;width:100%;height:26px;background:transparent;cursor:pointer;margin:0;display:block}",
      ".kp-range:focus{outline:none}",
      ".kp-range:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:var(--r-pill,32px)}",
      // track — webkit reads the element background (set inline as a sized gradient);
      // the track itself stays transparent so that fill shows through.
      ".kp-range::-webkit-slider-runnable-track{height:6px;border-radius:var(--r-pill,32px);background:transparent}",
      ".kp-range::-moz-range-track{height:6px;border-radius:var(--r-pill,32px);background:var(--border)}",
      ".kp-range::-moz-range-progress{height:6px;border-radius:var(--r-pill,32px);background:var(--accent)}",
      // thumb (webkit)
      ".kp-range::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;margin-top:-6px;border-radius:50%;background:var(--white);border:1px solid var(--border-strong);transition:transform .15s var(--ease,ease)}",
      ".kp-range:active::-webkit-slider-thumb{transform:scale(1.12)}",
      // thumb (firefox)
      ".kp-range::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--white);border:1px solid var(--border-strong);transition:transform .15s var(--ease,ease)}",
      ".kp-range:active::-moz-range-thumb{transform:scale(1.12)}",
      ".kp-ticks{display:flex;justify-content:space-between;font-family:var(--font-code,ui-monospace,monospace);font-size:.58rem;color:var(--ink-3);margin-top:.45rem;letter-spacing:.02em}",
      // quick-set buttons — outlined pill at rest, solid brand blue when active.
      // The active fill is --blue and NOT --accent: on the ink band --accent is
      // the light link blue, and white on it is 2.1:1. White on --blue is 4.5:1.
      ".kp-presets{display:flex;flex-wrap:wrap;gap:.6rem;margin-top:1.3rem}",
      ".kp-btn{font-family:var(--font-display,Arial,Helvetica,sans-serif);font-size:.78rem;font-weight:500;letter-spacing:0;padding:.55rem 1.1rem;border-radius:var(--r-pill,32px);border:1px solid var(--border-control);background:transparent;color:var(--ink-2);cursor:pointer;transition:background .2s var(--ease,ease),border-color .2s,color .2s}",
      ".kp-btn:hover{background:var(--surface-sunken);border-color:var(--border-strong);color:var(--ink)}",
      ".kp-btn:focus-visible{outline:2px solid var(--accent);outline-offset:3px}",
      ".kp-btn.kp-active{color:var(--white);background:var(--blue);border-color:var(--blue)}",
      ".kp-btn.kp-exp.kp-active{color:var(--white);background:var(--blue);border-color:var(--blue)}",
      ".kp-btn.kp-mkt.kp-active{color:var(--white);background:var(--blue);border-color:var(--blue)}",
      // readouts — flat wells, hairline, one accent edge. NOT a stat tile: the
      // numerals are live simulator output and stay at reading size.
      ".kp-readouts{display:grid;grid-template-columns:1fr;gap:1rem;margin-top:1.3rem}",
      "@media(min-width:520px){.kp-readouts{grid-template-columns:1fr 1fr}}",
      ".kp-stat{position:relative;border:1px solid var(--border-soft);border-left-width:3px;border-radius:var(--r-md,16px);padding:.85rem 1rem;background:var(--surface-sunken);overflow:hidden}",
      ".kp-stat.kp-stat-half{border-left-color:var(--accent)}",
      ".kp-stat.kp-stat-tail{border-left-color:var(--green-ink)}",
      ".kp-stat .kp-stat-label{font-family:var(--font-code,ui-monospace,monospace);font-size:.6rem;letter-spacing:.04em;color:var(--ink-3);display:flex;align-items:center;gap:.4rem}",
      ".kp-stat .kp-stat-label i{width:8px;height:8px;border-radius:50%;flex:none}",
      ".kp-stat .kp-stat-num{font-family:var(--font-display,Arial,Helvetica,sans-serif);font-size:clamp(1.25rem,3vw,1.5rem);font-weight:500;line-height:1.15;margin-top:.25rem;color:var(--ink);font-variant-numeric:tabular-nums}",
      ".kp-stat .kp-stat-sub{font-family:var(--font-code,ui-monospace,monospace);font-size:.64rem;color:var(--ink-3);margin-top:.2rem}",
      // narrative line
      ".kp-note{margin-top:1.2rem;padding-top:1rem;border-top:1px solid var(--border-soft);font-size:.9rem;line-height:1.6;color:var(--ink-2)}",
      ".kp-note b{color:var(--ink);font-weight:600}",
      ".kp-note .kp-amp{color:var(--accent);font-weight:600}",
      "@keyframes kp-pulse{0%,100%{opacity:1}50%{opacity:.25}}",
      // reduced motion: kill the eyebrow pulse + thumb transitions
      "@media(prefers-reduced-motion:reduce){.kp *{transition-duration:.001ms!important;animation:none!important}}"
    ].join("\n");
    var el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  /* ====================================================================== *
   *  DOM SCAFFOLD
   * ====================================================================== */
  function uid() {
    return "kp" + Math.random().toString(36).slice(2, 8);
  }

  function buildDOM(mount) {
    var id = uid();
    mount.classList.add("kp");
    mount.setAttribute("role", "group");
    mount.setAttribute("aria-label", "Interactive memory-kernel decay simulator");
    mount.innerHTML =
      '<div class="kp-head">' +
      '<div class="kp-eyebrow"><span class="kp-dot"></span>memory-kernel · live</div>' +
      '<div class="kp-eq">w(τ) = exp( − (τ / <b>T</b>)<sup><span class="kp-a">α</span></sup> )</div>' +
      "</div>" +
      '<div class="kp-canvas-wrap"><canvas id="' +
      id +
      '-cv" role="img" aria-label="Plot of the stretched-exponential memory kernel versus the pure exponential, decay weight against lag in days"></canvas></div>' +
      '<div class="kp-legend">' +
      '<span><i style="border-color:' +
      COL.stretch +
      '"></i>stretched (α<1)</span>' +
      '<span><i class="dash" style="border-color:' +
      COL.expo +
      '"></i>exponential (α=1)</span>' +
      '<span><i class="dot" style="background:' +
      COL.half +
      '"></i>half-life</span>' +
      '<span><i class="dot" style="background:' +
      COL.tail +
      '"></i>last 1%</span>' +
      "</div>" +
      '<div class="kp-controls">' +
      // alpha
      '<div class="kp-ctrl">' +
      '<div class="kp-ctrl-label"><span class="kp-name">α — shape</span><span class="kp-val" id="' +
      id +
      '-av">0.27</span></div>' +
      '<input class="kp-range" id="' +
      id +
      '-as" type="range" min="' +
      ALPHA_MIN +
      '" max="' +
      ALPHA_MAX +
      '" step="0.01" value="' +
      ALPHA_MARKETS +
      '" aria-label="Shape parameter alpha" aria-valuetext="0.27">' +
      '<div class="kp-ticks"><span>0.10 heavy tail</span><span>1.00 exponential</span></div>' +
      "</div>" +
      // T
      '<div class="kp-ctrl">' +
      '<div class="kp-ctrl-label"><span class="kp-name">T — timescale</span><span class="kp-val" id="' +
      id +
      '-tv">19<small>days</small></span></div>' +
      '<input class="kp-range" id="' +
      id +
      '-ts" type="range" min="' +
      T_MIN +
      '" max="' +
      T_MAX +
      '" step="0.1" value="' +
      T_DEFAULT +
      '" aria-label="Timescale T in days" aria-valuetext="19 days">' +
      '<div class="kp-ticks"><span>' +
      T_MIN +
      "d</span><span>" +
      T_MAX +
      "d</span></div>" +
      "</div>" +
      "</div>" +
      '<div class="kp-presets">' +
      '<button class="kp-btn kp-exp" type="button" id="' +
      id +
      '-pe">Exponential (α=1)</button>' +
      '<button class="kp-btn kp-mkt" type="button" id="' +
      id +
      '-pm">Markets (α=0.27)</button>' +
      "</div>" +
      '<div class="kp-readouts">' +
      '<div class="kp-stat kp-stat-half"><div class="kp-stat-label"><i style="background:' +
      COL.half +
      '"></i>half-life · w = 0.5</div><div class="kp-stat-num" id="' +
      id +
      '-hl">5.0 days</div><div class="kp-stat-sub" id="' +
      id +
      '-hls">τ = 5.0 days</div></div>' +
      '<div class="kp-stat kp-stat-tail"><div class="kp-stat-label"><i style="background:' +
      COL.tail +
      '"></i>time to last 1% · w = 0.01</div><div class="kp-stat-num" id="' +
      id +
      '-tl">15 years</div><div class="kp-stat-sub" id="' +
      id +
      '-tls">τ = 5,560 days</div></div>' +
      "</div>" +
      '<p class="kp-note" id="' +
      id +
      '-note"></p>';

    return {
      id: id,
      root: mount,
      canvas: mount.querySelector("#" + id + "-cv"),
      av: mount.querySelector("#" + id + "-av"),
      tv: mount.querySelector("#" + id + "-tv"),
      as: mount.querySelector("#" + id + "-as"),
      ts: mount.querySelector("#" + id + "-ts"),
      pe: mount.querySelector("#" + id + "-pe"),
      pm: mount.querySelector("#" + id + "-pm"),
      hl: mount.querySelector("#" + id + "-hl"),
      hls: mount.querySelector("#" + id + "-hls"),
      tl: mount.querySelector("#" + id + "-tl"),
      tls: mount.querySelector("#" + id + "-tls"),
      note: mount.querySelector("#" + id + "-note")
    };
  }

  /* ====================================================================== *
   *  INSTANCE
   * ====================================================================== */
  function initInstance(mount) {
    if (mount.__kpDone) return;
    mount.__kpDone = true;

    var els = buildDOM(mount);
    var canvas = els.canvas;
    var ctx = canvas.getContext("2d");
    if (!ctx) return; // ancient browser — leave the controls; bail on plotting

    // Live (target) params + animated (displayed) params.
    var target = { alpha: ALPHA_MARKETS, T: T_DEFAULT };
    var shown = { alpha: ALPHA_MARKETS, T: T_DEFAULT };

    // Fixed lag window for the plot, in days. Wide enough that even the
    // exponential reference clearly reaches the floor, and the sub-exponential
    // tail is visibly still hugging it.
    var TAU_MAX = 120; // days on the x-axis
    var dpr = 1;
    var cw = 0,
      ch = 0; // CSS pixels of the canvas box
    var pad = { l: 46, r: 14, t: 14, b: 34 }; // plot insets (CSS px)

    /* ---------- sizing (DPR-aware) ---------- */
    function resize() {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 3));
      var wrap = canvas.parentNode;
      cw = Math.max(240, wrap.clientWidth);
      // Responsive aspect ratio: a touch taller on narrow screens.
      var ratio = cw < 460 ? 0.74 : cw < 720 ? 0.56 : 0.46;
      ch = Math.round(cw * ratio);
      ch = Math.max(200, Math.min(ch, 380));
      canvas.style.width = cw + "px";
      canvas.style.height = ch + "px";
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      // pad scales slightly with size so labels never crowd on mobile
      pad.l = cw < 460 ? 40 : 46;
      pad.b = cw < 460 ? 30 : 34;
      draw();
    }

    /* ---------- coordinate transforms ---------- */
    function plotW() {
      return cw - pad.l - pad.r;
    }
    function plotH() {
      return ch - pad.t - pad.b;
    }
    function X(tau) {
      return pad.l + (tau / TAU_MAX) * plotW();
    } // linear days
    function Y(w) {
      return pad.t + (1 - w) * plotH();
    } // 0..1 weight

    /* ---------- drawing ---------- */
    function clear() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // 1 unit = 1 CSS px
      ctx.clearRect(0, 0, cw, ch);
    }

    function drawGrid() {
      ctx.lineWidth = 1;
      ctx.font = "10px " + MONO;
      ctx.textBaseline = "middle";

      // horizontal gridlines at weights 0, .25, .5, .75, 1 (+ emphasize .5/.01)
      var wLines = [0, 0.25, 0.5, 0.75, 1];
      for (var i = 0; i < wLines.length; i++) {
        var w = wLines[i];
        var y = Y(w);
        ctx.strokeStyle = w === 0.5 ? COL.gridStrong : COL.grid;
        ctx.beginPath();
        ctx.moveTo(pad.l, y + 0.5);
        ctx.lineTo(cw - pad.r, y + 0.5);
        ctx.stroke();
        ctx.fillStyle = COL.faint;
        ctx.textAlign = "right";
        ctx.fillText(w.toFixed(2), pad.l - 8, y);
      }
      // dotted 1% reference line (the tail floor)
      var y01 = Y(0.01);
      ctx.save();
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.beginPath();
      ctx.moveTo(pad.l, y01 + 0.5);
      ctx.lineTo(cw - pad.r, y01 + 0.5);
      ctx.stroke();
      ctx.restore();

      // vertical gridlines (days)
      var step = TAU_MAX <= 60 ? 10 : 20;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (var d = 0; d <= TAU_MAX + 0.5; d += step) {
        var x = X(d);
        ctx.strokeStyle = d === 0 ? COL.axis : COL.grid;
        ctx.beginPath();
        ctx.moveTo(x + 0.5, pad.t);
        ctx.lineTo(x + 0.5, ch - pad.b);
        ctx.stroke();
        ctx.fillStyle = COL.faint;
        ctx.fillText(String(d), x, ch - pad.b + 7);
      }

      // axes
      ctx.strokeStyle = COL.axis;
      ctx.beginPath();
      ctx.moveTo(pad.l + 0.5, pad.t);
      ctx.lineTo(pad.l + 0.5, ch - pad.b + 0.5);
      ctx.lineTo(cw - pad.r, ch - pad.b + 0.5);
      ctx.stroke();

      // axis labels
      ctx.fillStyle = COL.dim;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillText("τ — lag (days)", pad.l + plotW() / 2, ch - 13);

      ctx.save();
      ctx.translate(13, pad.t + plotH() / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = COL.dim;
      ctx.fillText("memory weight  w", 0, 0);
      ctx.restore();
    }

    // Sample a kernel curve as a poly-line and stroke it.
    function strokeCurve(T, alpha, stroke, lineWidth, dash, fillUnder, glow) {
      var N = Math.max(120, Math.round(plotW())); // ~1 sample/px
      ctx.save();
      if (dash) ctx.setLineDash(dash);
      ctx.lineWidth = lineWidth;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      if (fillUnder) {
        ctx.beginPath();
        ctx.moveTo(X(0), Y(0));
        for (var k = 0; k <= N; k++) {
          var t2 = (k / N) * TAU_MAX;
          ctx.lineTo(X(t2), Y(weight(t2, T, alpha)));
        }
        ctx.lineTo(X(TAU_MAX), Y(0));
        ctx.closePath();
        var g = ctx.createLinearGradient(0, pad.t, 0, ch - pad.b);
        g.addColorStop(0, "rgba(138,180,248,0.20)");
        g.addColorStop(0.5, "rgba(138,180,248,0.07)");
        g.addColorStop(1, "rgba(138,180,248,0.01)");
        ctx.fillStyle = g;
        ctx.fill();
      }

      ctx.beginPath();
      for (var i = 0; i <= N; i++) {
        var tau = (i / N) * TAU_MAX;
        var x = X(tau),
          y = Y(weight(tau, T, alpha));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = stroke;
      // Source-over on the dark well — no additive glow; the curve is a clean,
      // flat line. (glow arg retained for signature compat, unused.)
      void glow;
      ctx.stroke();
      ctx.restore();
    }

    // A marker where the live curve crosses a given weight level.
    function drawMarker(level, T, alpha, color, label) {
      var tau = tauAtLevel(level, T, alpha);
      if (!isFinite(tau)) return;
      // only draw if it lands inside the visible window
      if (tau < 0 || tau > TAU_MAX) {
        // off-chart: draw an arrow hint at the right edge on the level line
        var yEdge = Y(level);
        ctx.save();
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.moveTo(cw - pad.r - 9, yEdge - 5);
        ctx.lineTo(cw - pad.r - 1, yEdge);
        ctx.lineTo(cw - pad.r - 9, yEdge + 5);
        ctx.closePath();
        ctx.fill();
        ctx.font = "9px " + MONO;
        ctx.textAlign = "right";
        ctx.textBaseline = "bottom";
        ctx.fillText(label + " → off-chart", cw - pad.r - 12, yEdge - 2);
        ctx.restore();
        return;
      }
      var x = X(tau),
        y = Y(level);
      ctx.save();
      // drop line to x-axis
      ctx.setLineDash([2, 3]);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(x + 0.5, y);
      ctx.lineTo(x + 0.5, ch - pad.b);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      // marker dot (source-over on the dark well)
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 4.2, 0, Math.PI * 2);
      ctx.fill();
      // thin ring in the well's own colour lifts the dot off the gridlines
      ctx.strokeStyle = "rgba(32,33,36,0.92)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(x, y, 4.2, 0, Math.PI * 2);
      ctx.stroke();
      // label
      ctx.font = "10px " + MONO;
      ctx.fillStyle = color;
      ctx.textBaseline = "bottom";
      var lx = x + 7,
        align = "left";
      if (lx > cw - pad.r - 60) {
        lx = x - 7;
        align = "right";
      }
      ctx.textAlign = align;
      ctx.fillText(label, lx, y - 4);
      ctx.fillStyle = COL.dim;
      ctx.fillText(fmtDuration(tau), lx, y + 13);
      ctx.restore();
    }

    function draw() {
      if (!cw) return;
      clear();
      drawGrid();
      // pure exponential reference (yellow, dashed) — SAME T so contrast is α.
      strokeCurve(shown.T, 1, COL.expo, 1.8, [6, 5], false);
      // the live stretched-exponential — bold blue line + faint blue fill.
      strokeCurve(shown.T, shown.alpha, COL.stretch, 3.2, null, true, null);
      // markers on the live curve
      drawMarker(0.5, shown.T, shown.alpha, COL.half, "w=0.5");
      drawMarker(0.01, shown.T, shown.alpha, COL.tail, "w=0.01");
    }

    /* ---------- readouts + narrative ---------- */
    function updateReadouts() {
      var a = target.alpha,
        T = target.T;
      var hl = halfLife(T, a);
      var tl = tail1pct(T, a);
      els.av.textContent = a.toFixed(2);
      els.as.setAttribute("aria-valuetext", a.toFixed(2));
      els.tv.innerHTML = Math.round(T) + "<small>days</small>";
      els.ts.setAttribute("aria-valuetext", Math.round(T) + " days");
      els.hl.textContent = fmtDuration(hl);
      els.hls.textContent = "τ = " + fmtDays(hl);
      els.tl.textContent = fmtDuration(tl);
      els.tls.textContent = "τ = " + fmtDays(tl);

      // slider fill (webkit track gets a left-anchored gradient overlay)
      paintTrack(els.as, ALPHA_MIN, ALPHA_MAX, a);
      paintTrack(els.ts, T_MIN, T_MAX, T);

      // preset active states
      var isExp = Math.abs(a - 1) < 0.005;
      var isMkt = Math.abs(a - ALPHA_MARKETS) < 0.005 && Math.abs(T - T_DEFAULT) < 0.2;
      els.pe.classList.toggle("kp-active", isExp);
      els.pm.classList.toggle("kp-active", isMkt);

      // narrative: how many times longer the tail is vs the half-life
      var ratio = tl / hl;
      var ratioTxt = ratio >= 100 ? Math.round(ratio).toLocaleString() : ratio.toFixed(0);
      var msg;
      if (isExp || a > 0.92) {
        msg =
          "At <b>α = " +
          a.toFixed(2) +
          "</b> memory is essentially exponential: the last 1% clears only <b>" +
          ratioTxt +
          "×</b> after the half-life. Things fade on schedule.";
      } else {
        msg =
          "At <b>α = " +
          a.toFixed(2) +
          "</b> the half of a memory is gone in <b>" +
          fmtDuration(hl) +
          "</b> — but the last 1% lingers <span class='kp-amp'>" +
          ratioTxt +
          "×</span> longer, ~<b>" +
          fmtDuration(tl) +
          "</b>. Drop α and the half-life barely moves while the tail explodes.";
      }
      els.note.innerHTML = msg;
    }

    // Paint the left-of-thumb fill on the range track. The webkit track is set
    // transparent in CSS, so we layer the fill as a centered, 6px-tall background
    // on the <input> itself: a solid accent progress bar over a faint hairline
    // rail. Firefox additionally colours ::-moz-range-progress (see CSS).
    function paintTrack(input, min, max, val) {
      var pct = ((val - min) / (max - min)) * 100;
      pct = pct < 0 ? 0 : pct > 100 ? 100 : pct;
      input.style.background =
        "var(--accent) left center / " +
        pct +
        "% 6px no-repeat, " +
        "var(--border) left center / 100% 6px no-repeat";
      input.style.borderRadius = "32px";
    }

    /* ---------- animation between states ---------- */
    var raf = null;
    var anim = null; // {from,to,t0,dur}

    function setParams(alpha, T, animate) {
      target.alpha = clamp(alpha, ALPHA_MIN, ALPHA_MAX);
      target.T = clamp(T, T_MIN, T_MAX);
      // keep sliders in sync if changed programmatically
      if (Math.abs(parseFloat(els.as.value) - target.alpha) > 1e-6) els.as.value = target.alpha;
      if (Math.abs(parseFloat(els.ts.value) - target.T) > 1e-6) els.ts.value = target.T;
      updateReadouts();

      if (!animate || prefersReduced) {
        shown.alpha = target.alpha;
        shown.T = target.T;
        draw();
        return;
      }
      anim = {
        fromA: shown.alpha,
        fromT: shown.T,
        toA: target.alpha,
        toT: target.T,
        t0: now(),
        dur: 420
      };
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function tick() {
      raf = null;
      if (!anim) return;
      var p = (now() - anim.t0) / anim.dur;
      if (p >= 1) {
        shown.alpha = anim.toA;
        shown.T = anim.toT;
        anim = null;
        draw();
        return;
      }
      var e = easeOutCubic(p);
      shown.alpha = anim.fromA + (anim.toA - anim.fromA) * e;
      shown.T = anim.fromT + (anim.toT - anim.fromT) * e;
      draw();
      raf = requestAnimationFrame(tick);
    }

    /* ---------- live drag: snappy redraw, no tween while dragging ---------- */
    function onAlpha() {
      setParams(parseFloat(els.as.value), target.T, false);
    }
    function onT() {
      setParams(target.alpha, parseFloat(els.ts.value), false);
    }
    els.as.addEventListener("input", onAlpha);
    els.ts.addEventListener("input", onT);

    // Quick-set buttons animate (a satisfying transition between regimes).
    els.pe.addEventListener("click", function () {
      setParams(1.0, target.T, true);
    });
    els.pm.addEventListener("click", function () {
      setParams(ALPHA_MARKETS, T_DEFAULT, true);
    });

    /* ---------- resize handling ---------- */
    var ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(function () {
        resize();
      });
      ro.observe(canvas.parentNode);
    } else {
      window.addEventListener("resize", resize);
    }
    // pause/resume nicety: nothing animates continuously, but redraw on return
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) draw();
    });

    /* ---------- go ---------- */
    updateReadouts();
    // size after layout settles (fonts/flex), then once more next frame for DPR
    resize();
    requestAnimationFrame(resize);

    // expose a tiny handle for debugging / the blog page if it wants it
    mount.__kp = {
      set: function (a, T) {
        setParams(a, T == null ? target.T : T, true);
      },
      redraw: draw
    };
  }

  /* ====================================================================== *
   *  UTILS
   * ====================================================================== */
  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }
  function easeOutCubic(p) {
    var u = 1 - p;
    return 1 - u * u * u;
  }
  function now() {
    return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
  }

  /* ====================================================================== *
   *  BOOT  (self-init; safe for 0 or many mounts)
   * ====================================================================== */
  function boot() {
    var mounts = document.querySelectorAll(SELECTOR);
    if (!mounts.length) return; // graceful no-op
    injectCSS();
    for (var i = 0; i < mounts.length; i++) {
      try {
        initInstance(mounts[i]);
      } catch (e) {
        if (window.console && console.warn) console.warn("[kernel-playground] init failed:", e);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
