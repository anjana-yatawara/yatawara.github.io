/* ============================================================================
   yatawara.com — VOLATILITY TICKER / HUD STRIP   (assets/js/ticker.js)
   ----------------------------------------------------------------------------
   A sleek horizontal "market memory" status strip that makes Anjana's
   volatility research feel tangible and live. Mounts inside every
   [data-component="vol-ticker"] (self-init; no-ops if absent; multiple safe).

   Cells:
     • a few assets (SPX, BTC, VIX, EUR) — value, colored delta (▲/▼), sparkline
     • a pulsing "memory α ≈ 0.27" cell  (her central finding)
     • a "regime" label  (calm · clustering · shock)

   DEFAULT = elegant SIMULATED data. Each asset evolves on a ~1.5s interval via
   a small random walk whose step size is driven by a GARCH(1,1)-style
   conditional variance (σ²ₜ = ω + α·εₜ₋₁² + β·σ²ₜ₋₁) — so quiet stretches
   beget quiet stretches and shocks cluster, exactly like real volatility.
   Occasional shocks are injected and then decay. Zero API, zero libraries.

   Accessibility / motion:
     • prefers-reduced-motion → no marquee, no value tween, no sparkline
       sweep; values still update each tick (single static frame).
     • narrow viewports auto-scroll (marquee); wide viewports wrap statically.

   See the REAL-DATA UPGRADE PATH note at the bottom of this file (optional,
   free, no-key) — kept as commented guidance only; the default stays simulated.
   ========================================================================== */
(function () {
  "use strict";

  var SELECTOR = '[data-component="vol-ticker"]';
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var prefersReduced = mq.matches;
  var TICK_MS = 1500;          // evolution cadence
  var SPARK_LEN = 28;          // history points kept per sparkline
  var STYLE_ID = "ay-ticker-styles";

  /* ----------------------------------------------------------------------------
     ASSET MODELS — plausible seeds. Each is its own GARCH-ish process.
     vol      = baseline daily-ish volatility (fraction of price)
     decimals = display precision;  sign-aware delta colouring
     For VIX (a volatility index) we let it mean-revert and treat *its* level as
     the headline regime driver — fitting, since this strip is about volatility.
     -------------------------------------------------------------------------- */
  function makeAssets() {
    return [
      { sym: "SPX", label: "S&P 500",  price: 5478.20, vol: 0.010, dec: 2, kind: "equity" },
      { sym: "BTC", label: "Bitcoin",  price: 64210.0, vol: 0.028, dec: 0, kind: "crypto" },
      { sym: "VIX", label: "Volatility", price: 13.40, vol: 0.045, dec: 2, kind: "vix", revert: 14.5 },
      { sym: "EUR", label: "EUR/USD",  price: 1.0842,  vol: 0.005, dec: 4, kind: "fx" }
    ].map(function (a) {
      // GARCH(1,1) state.  variance carried in *return* space (per-tick²).
      a.omega = a.vol * a.vol * 0.10;     // long-run floor
      a.alpha = 0.12;                      // ARCH (reaction to last shock)
      a.beta = 0.84;                       // GARCH (persistence) — α+β<1 ⇒ stationary
      a.sigma2 = a.vol * a.vol;            // current conditional variance
      a.lastEps = 0;                       // last innovation
      a.prev = a.price;                    // for delta vs. previous tick
      a.open = a.price;                    // session anchor for the % delta
      a.shock = 0;                         // transient shock overlay (decays)
      a.hist = [];                         // sparkline history
      for (var i = 0; i < SPARK_LEN; i++) a.hist.push(a.price);
      a.disp = a.price;                    // currently displayed (tweened) value
      return a;
    });
  }

  /* Gaussian innovation via Box–Muller. */
  function gauss() {
    var u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  /* One GARCH step → fractional return for this tick. */
  function stepReturn(a) {
    // conditional variance update from the previous innovation
    a.sigma2 = a.omega + a.alpha * (a.lastEps * a.lastEps) + a.beta * a.sigma2;
    var sigma = Math.sqrt(a.sigma2);
    var eps = sigma * gauss();          // this tick's innovation
    a.lastEps = eps;

    // rare shock: inject a burst that bumps variance (clustering) and decays
    if (Math.random() < 0.012) {
      var dir = Math.random() < 0.5 ? -1 : 1;
      a.shock = dir * (2.5 + Math.random() * 3.5) * sigma;
      a.sigma2 += a.shock * a.shock;    // shock feeds the variance → real clustering
    }
    var ret = eps + a.shock;
    a.shock *= 0.55;                    // sub-exponential-ish fade of the overlay
    if (Math.abs(a.shock) < 1e-9) a.shock = 0;
    return ret;
  }

  /* Advance one asset; returns its fresh delta info. */
  function evolve(a) {
    a.prev = a.price;
    var ret = stepReturn(a);

    if (a.kind === "vix") {
      // VIX: additive mean-reversion + vol-of-vol, floored.
      var pull = (a.revert - a.price) * 0.05;
      a.price = Math.max(9, a.price * (1 + ret) + pull);
    } else {
      a.price = Math.max(a.price * (1 + ret), a.price * 0.5);
    }

    a.hist.push(a.price);
    if (a.hist.length > SPARK_LEN) a.hist.shift();

    var chg = a.price - a.open;
    var pct = a.open ? (chg / a.open) * 100 : 0;
    return { abs: chg, pct: pct, up: chg >= 0 };
  }

  /* ----------------------------------------------------------------------------
     REGIME — derived from aggregate volatility state across assets + VIX level.
     This is the qualitative read-out of "how the market is remembering" now.
     -------------------------------------------------------------------------- */
  function regimeOf(assets) {
    var vix = 14;
    var energy = 0, n = 0;
    assets.forEach(function (a) {
      if (a.kind === "vix") vix = a.price;
      // normalised conditional vol relative to baseline
      energy += Math.sqrt(a.sigma2) / a.vol;
      n++;
    });
    energy /= (n || 1);
    var anyShock = assets.some(function (a) { return Math.abs(a.shock) > Math.sqrt(a.sigma2) * 0.4; });

    if (anyShock || vix > 24 || energy > 2.1) return { key: "shock", label: "shock", color: "var(--pink)" };
    if (vix > 17 || energy > 1.35) return { key: "clustering", label: "clustering", color: "var(--accent)" };
    return { key: "calm", label: "calm", color: "var(--teal)" };
  }

  /* ----------------------------------------------------------------------------
     FORMATTING
     -------------------------------------------------------------------------- */
  function fmt(v, dec) {
    return v.toLocaleString("en-US", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function fmtDelta(d, dec) {
    var arrow = d.up ? "▲" : "▼";   // ▲ / ▼
    var sign = d.up ? "+" : "−";          // + / −
    return arrow + " " + sign + Math.abs(d.pct).toFixed(2) + "%";
  }

  /* ----------------------------------------------------------------------------
     SPARKLINE — DPR-aware mini canvas, soft gradient stroke + faint area + dot.
     -------------------------------------------------------------------------- */
  function drawSpark(canvas, hist, up) {
    var ctx = canvas.getContext("2d");
    if (!ctx) return;
    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    var w = canvas.clientWidth || 64, h = canvas.clientHeight || 22;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Deep-space glass background: draw normally (source-over), no additive blending.
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, w, h);

    var n = hist.length;
    if (n < 2) return;
    var min = Infinity, max = -Infinity;
    for (var i = 0; i < n; i++) { if (hist[i] < min) min = hist[i]; if (hist[i] > max) max = hist[i]; }
    var pad = 2.5, span = (max - min) || 1;
    var X = function (i) { return pad + (i / (n - 1)) * (w - pad * 2); };
    var Y = function (v) { return h - pad - ((v - min) / span) * (h - pad * 2); };

    // Apple × Cosmos duotone — up = teal, down = pink, on glass, source-over.
    var col = up ? getVar("--teal", "#4fd6e6") : getVar("--pink", "#ff6aa6");

    // faint area fill
    ctx.beginPath();
    ctx.moveTo(X(0), Y(hist[0]));
    for (var j = 1; j < n; j++) ctx.lineTo(X(j), Y(hist[j]));
    ctx.lineTo(X(n - 1), h - pad);
    ctx.lineTo(X(0), h - pad);
    ctx.closePath();
    var grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, hexA(col, 0.22));
    grad.addColorStop(1, hexA(col, 0));
    ctx.fillStyle = grad;
    ctx.fill();

    // line — soft colored stroke (teal up / pink down)
    ctx.beginPath();
    ctx.moveTo(X(0), Y(hist[0]));
    for (var k = 1; k < n; k++) ctx.lineTo(X(k), Y(hist[k]));
    ctx.lineWidth = 1.75;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = col;
    ctx.stroke();

    // leading dot
    ctx.beginPath();
    ctx.arc(X(n - 1), Y(hist[n - 1]), 2, 0, Math.PI * 2);
    ctx.fillStyle = col;
    ctx.fill();
  }

  /* read a CSS custom property off :root, with fallback (sparklines need a real
     colour string, not a var() token, because canvas can't resolve vars). */
  var _root = document.documentElement;
  function getVar(name, fallback) {
    var v = getComputedStyle(_root).getPropertyValue(name).trim();
    return v || fallback;
  }
  /* apply an alpha to a colour that may be #rgb/#rrggbb or rgb()/rgba(). */
  function hexA(col, a) {
    col = (col || "").trim();
    if (col[0] === "#") {
      var hex = col.slice(1);
      if (hex.length === 3) hex = hex.replace(/./g, function (c) { return c + c; });
      var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
    var m = col.match(/rgba?\(([^)]+)\)/);
    if (m) {
      var p = m[1].split(",").map(function (s) { return s.trim(); });
      return "rgba(" + p[0] + "," + p[1] + "," + p[2] + "," + a + ")";
    }
    return col;
  }

  /* ----------------------------------------------------------------------------
     VALUE TWEENING — smoothly animate a numeric value to its new target.
     Reduced-motion: jump instantly.
     -------------------------------------------------------------------------- */
  function tween(asset, valueEl, to) {
    if (prefersReduced) {
      asset.disp = to;
      valueEl.textContent = fmt(to, asset.dec);
      return;
    }
    var from = asset.disp;
    var start = performance.now();
    var dur = 600;
    if (asset._raf) cancelAnimationFrame(asset._raf);
    function frame(now) {
      var t = Math.min(1, (now - start) / dur);
      var e = 1 - Math.pow(1 - t, 3);          // easeOutCubic
      var cur = from + (to - from) * e;
      asset.disp = cur;
      valueEl.textContent = fmt(cur, asset.dec);
      if (t < 1) asset._raf = requestAnimationFrame(frame);
      else asset._raf = null;
    }
    asset._raf = requestAnimationFrame(frame);
  }

  /* ----------------------------------------------------------------------------
     MOUNT — build the strip inside one element.
     -------------------------------------------------------------------------- */
  function mount(host) {
    if (host.getAttribute("data-ay-ticker") === "ready") return;
    host.setAttribute("data-ay-ticker", "ready");

    var assets = makeAssets();

    // shell
    host.classList.add("ay-ticker");
    host.setAttribute("role", "marquee");
    host.setAttribute("aria-label", "Live simulated market-volatility strip");

    var viewport = document.createElement("div");
    viewport.className = "ay-tkr-viewport";
    var track = document.createElement("div");
    track.className = "ay-tkr-track";
    viewport.appendChild(track);
    host.appendChild(viewport);

    // edge label
    var brand = document.createElement("span");
    brand.className = "ay-tkr-brand";
    brand.innerHTML = '<span class="ay-tkr-live"></span> market memory';

    // build the canonical cell set ONCE (the "primary" segment we mutate).
    var cells = {};   // sym -> { value, delta, canvas, asset }
    var segment = document.createElement("div");
    segment.className = "ay-tkr-seg";
    segment.appendChild(brand.cloneNode(true));

    assets.forEach(function (a) {
      var cell = document.createElement("div");
      cell.className = "ay-tkr-cell";
      cell.innerHTML =
        '<span class="ay-tkr-sym">' + a.sym + '</span>' +
        '<span class="ay-tkr-val">' + fmt(a.price, a.dec) + '</span>' +
        '<canvas class="ay-tkr-spark" aria-hidden="true"></canvas>' +
        '<span class="ay-tkr-delta up">▲ +0.00%</span>';
      segment.appendChild(cell);
      cells[a.sym] = {
        asset: a,
        valueEl: cell.querySelector(".ay-tkr-val"),
        deltaEl: cell.querySelector(".ay-tkr-delta"),
        canvas: cell.querySelector(".ay-tkr-spark")
      };
    });

    // memory-α cell — her signature
    var alphaCell = document.createElement("div");
    alphaCell.className = "ay-tkr-cell ay-tkr-alpha";
    alphaCell.innerHTML =
      '<span class="ay-tkr-sym alpha">memory α</span>' +
      '<span class="ay-tkr-val alphaval">≈ 0.270</span>' +
      '<span class="ay-tkr-tag">sub-exp</span>';
    segment.appendChild(alphaCell);
    var alphaValEl = alphaCell.querySelector(".alphaval");

    // regime cell
    var regimeCell = document.createElement("div");
    regimeCell.className = "ay-tkr-cell ay-tkr-regime";
    regimeCell.innerHTML =
      '<span class="ay-tkr-sym">regime</span>' +
      '<span class="ay-tkr-reg-dot"></span>' +
      '<span class="ay-tkr-reg-label">calm</span>';
    segment.appendChild(regimeCell);
    var regDot = regimeCell.querySelector(".ay-tkr-reg-dot");
    var regLabel = regimeCell.querySelector(".ay-tkr-reg-label");

    track.appendChild(segment);

    // For marquee we need a seamless loop → append a clone of the segment.
    // The clone is presentational only (aria-hidden) and never mutated; we just
    // mirror the primary cells' text/canvas into it each tick so it matches.
    var cloneSeg = segment.cloneNode(true);
    cloneSeg.setAttribute("aria-hidden", "true");
    cloneSeg.classList.add("ay-tkr-clone");
    track.appendChild(cloneSeg);
    var cloneCanvases = cloneSeg.querySelectorAll(".ay-tkr-spark");

    /* ----- marquee gating: only scroll when content overflows & motion ok ----- */
    function updateMarquee() {
      var overflow = segment.scrollWidth > viewport.clientWidth + 4;
      var animate = overflow && !prefersReduced;
      host.classList.toggle("is-marquee", animate);
      host.classList.toggle("is-static", !animate);
      if (animate) {
        // duration scales with content width for a steady, readable speed
        var dur = Math.max(18, Math.round(segment.scrollWidth / 38));
        track.style.setProperty("--tkr-dur", dur + "s");
      } else {
        track.style.removeProperty("--tkr-dur");
      }
    }

    /* ----- render one frame of the data into the DOM ----- */
    var alphaPhase = 0;
    function render() {
      assets.forEach(function (a) {
        var c = cells[a.sym];
        var d = evolve(a);

        // value (tweened)
        tween(a, c.valueEl, a.price);

        // delta
        c.deltaEl.textContent = fmtDelta(d, a.dec);
        c.deltaEl.classList.toggle("up", d.up);
        c.deltaEl.classList.toggle("down", !d.up);

        // sparkline
        drawSpark(c.canvas, a.hist, d.up);

        // flash the cell on a notable move
        if (Math.abs(a.shock) > 1e-9) {
          c.valueEl.classList.remove("ay-flash-up", "ay-flash-down");
          // force reflow so the animation can retrigger
          void c.valueEl.offsetWidth;
          c.valueEl.classList.add(d.up ? "ay-flash-up" : "ay-flash-down");
          setTimeout(function () {
            c.valueEl.classList.remove("ay-flash-up", "ay-flash-down");
          }, 700);
        }
      });

      // memory α — gently jitter around 0.27 so it feels "measured live",
      // but it's her finding, so keep it tightly pinned.
      alphaPhase += 0.6;
      var aJit = 0.270 + Math.sin(alphaPhase) * 0.004 + (Math.random() - 0.5) * 0.002;
      alphaValEl.textContent = "≈ " + aJit.toFixed(3);

      // regime
      var r = regimeOf(assets);
      regLabel.textContent = r.label;
      regimeCell.setAttribute("data-regime", r.key);
      regDot.style.background = r.color;
      // Apple × Cosmos: soft dot per regime + label dim (calm) / accent blue (active).
      regLabel.style.color = (r.key === "calm") ? "var(--dim)" : "var(--accent)";

      // mirror everything into the clone (presentational copy)
      syncClone();
    }

    function syncClone() {
      // text mirror — cheap; keeps the looping copy identical
      var srcVals = segment.querySelectorAll(".ay-tkr-val, .ay-tkr-delta, .ay-tkr-reg-label");
      var dstVals = cloneSeg.querySelectorAll(".ay-tkr-val, .ay-tkr-delta, .ay-tkr-reg-label");
      for (var i = 0; i < srcVals.length && i < dstVals.length; i++) {
        if (dstVals[i].textContent !== srcVals[i].textContent) dstVals[i].textContent = srcVals[i].textContent;
        dstVals[i].className = srcVals[i].className;
      }
      // regime dot mirror
      var srcDot = segment.querySelector(".ay-tkr-reg-dot");
      var dstDot = cloneSeg.querySelector(".ay-tkr-reg-dot");
      if (srcDot && dstDot) { dstDot.style.background = srcDot.style.background; }
      // sparkline mirror — redraw clone canvases from the same history
      var idx = 0;
      assets.forEach(function (a) {
        var cv = cloneCanvases[idx++];
        if (cv) drawSpark(cv, a.hist, a.price >= a.prev);
      });
    }

    /* ----- lifecycle ----- */
    var timer = null;
    function startLoop() {
      if (timer) return;
      render();                              // immediate first frame
      if (prefersReduced) {
        // reduced motion: still update values, just on a calmer cadence,
        // and never run the marquee.
        timer = setInterval(render, TICK_MS * 1.6);
      } else {
        timer = setInterval(render, TICK_MS);
      }
    }
    function stopLoop() { if (timer) { clearInterval(timer); timer = null; } }

    // pause when tab hidden (save cycles), resume on return
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stopLoop();
      else startLoop();
    });

    // pause marquee on hover/focus for readability (CSS does the visual pause;
    // data keeps updating).

    // resize → re-evaluate marquee + redraw sparklines crisply
    var rT;
    window.addEventListener("resize", function () {
      clearTimeout(rT);
      rT = setTimeout(function () {
        updateMarquee();
        assets.forEach(function (a) {
          var c = cells[a.sym];
          drawSpark(c.canvas, a.hist, a.price >= a.prev);
        });
        syncClone();
      }, 150);
    }, { passive: true });

    // react to a live reduced-motion preference change
    var onMQ = function () {
      prefersReduced = mq.matches;
      stopLoop();
      updateMarquee();
      startLoop();
    };
    if (mq.addEventListener) mq.addEventListener("change", onMQ);
    else if (mq.addListener) mq.addListener(onMQ);

    // go
    requestAnimationFrame(function () {
      updateMarquee();
      startLoop();
    });
  }

  /* ----------------------------------------------------------------------------
     SELF-INJECTED CSS — APPLE × COSMOS: glass strip on deep space, 1px hairline,
     soft rounded corners (var(--r-md)), Inter, soft text. Cells = glass with
     hairline dividers; sparks duotone (teal up / pink down) on glass; memory-α
     cell in accent blue; regime label dim/accent. No loud/hard/riso styling —
     translucent, restrained, soft shadows + faint glow only.
     -------------------------------------------------------------------------- */
  function injectCSS() {
    if (document.getElementById(STYLE_ID)) return;
    var css = [
      ".ay-ticker{position:relative;display:block;width:100%;overflow:hidden;",
        "border:1px solid var(--hair);border-radius:var(--r-md);",
        "background:var(--panel);color:var(--text-soft);",
        "-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);",
        "box-shadow:var(--shadow-1);font-family:var(--font-body);",
        "-webkit-mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);",
        "mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);}",

      ".ay-tkr-viewport{overflow:hidden;width:100%;}",
      ".ay-tkr-track{display:flex;width:max-content;will-change:transform;}",
      ".ay-tkr-seg{display:flex;align-items:stretch;flex:0 0 auto;}",

      // static (wide) layout: let it wrap-ish by centering a single segment,
      // hide the clone, and allow it to fill the bar.
      ".ay-ticker.is-static .ay-tkr-track{width:100%;}",
      ".ay-ticker.is-static .ay-tkr-seg{flex:1 1 auto;flex-wrap:wrap;justify-content:center;}",
      ".ay-ticker.is-static .ay-tkr-clone{display:none;}",

      // marquee (narrow) layout
      ".ay-ticker.is-marquee .ay-tkr-track{animation:ay-tkr-scroll var(--tkr-dur,30s) linear infinite;}",
      ".ay-ticker.is-marquee:hover .ay-tkr-track,.ay-ticker.is-marquee:focus-within .ay-tkr-track{animation-play-state:paused;}",
      "@keyframes ay-tkr-scroll{from{transform:translate3d(0,0,0);}to{transform:translate3d(-50%,0,0);}}",

      // cells — glass, soft hairline dividers
      ".ay-tkr-cell{display:inline-flex;align-items:center;gap:.5rem;flex:0 0 auto;",
        "padding:.5rem .9rem;white-space:nowrap;position:relative;}",
      ".ay-tkr-cell + .ay-tkr-cell::before{content:'';position:absolute;left:0;top:50%;transform:translateY(-50%);",
        "height:18px;width:1px;background:var(--hair);}",

      ".ay-tkr-sym{font-size:var(--fs-mono);letter-spacing:.06em;text-transform:uppercase;color:var(--dim);font-weight:600;}",
      ".ay-tkr-sym.alpha{color:var(--accent);}",
      ".ay-tkr-val{font-size:var(--fs-xs);color:var(--text);font-weight:500;font-variant-numeric:tabular-nums;",
        "font-feature-settings:'tnum' 1;min-width:4.6ch;text-align:right;transition:color var(--t-fast) var(--ease);}",

      // memory-α — her signature, a soft glass pill tinted accent blue
      ".ay-tkr-cell.ay-tkr-alpha{background:var(--accent-dim);border:1px solid var(--hair-2);border-radius:var(--r-md);",
        "box-shadow:var(--shadow-1);margin:.28rem .55rem;padding:.34rem .8rem;}",
      ".ay-tkr-cell.ay-tkr-alpha + .ay-tkr-cell::before,.ay-tkr-cell + .ay-tkr-cell.ay-tkr-alpha::before{display:none;}",
      ".ay-tkr-val.alphaval{color:var(--accent);font-weight:600;min-width:auto;animation:ay-tkr-pulse 2.6s ease-in-out infinite;}",

      ".ay-tkr-spark{width:64px;height:22px;display:block;}",

      ".ay-tkr-delta{font-size:var(--fs-mono);font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:.01em;min-width:7ch;}",
      ".ay-tkr-delta.up{color:var(--teal);}",
      ".ay-tkr-delta.down{color:var(--pink);}",

      // sub-exp tag inside the alpha cell — soft accent pill on glass
      ".ay-tkr-tag{font-size:.58rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);",
        "border:1px solid var(--hair-2);border-radius:var(--r-pill);padding:.08rem .5rem;background:var(--panel);}",

      // brand / live dot — soft label, accent blip with faint glow
      ".ay-tkr-brand{display:inline-flex;align-items:center;gap:.45rem;flex:0 0 auto;padding:.5rem .9rem .5rem 1rem;",
        "font-size:var(--fs-mono);font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--text-soft);}",
      ".ay-tkr-live{width:7px;height:7px;border-radius:50%;background:var(--accent);",
        "box-shadow:0 0 8px var(--accent);animation:twinkle 2s infinite;}",

      // regime — colour set inline on the dot per regimeOf(); label dim/accent (set in render)
      ".ay-tkr-regime .ay-tkr-reg-dot{width:8px;height:8px;border-radius:50%;background:var(--teal);}",
      ".ay-tkr-reg-label{font-size:var(--fs-xs);font-weight:600;letter-spacing:.02em;color:var(--dim);text-transform:lowercase;min-width:8ch;}",
      ".ay-tkr-regime[data-regime='shock'] .ay-tkr-reg-dot{animation:twinkle 0.7s infinite;}",
      ".ay-tkr-regime[data-regime='clustering'] .ay-tkr-reg-dot{animation:twinkle 1.4s infinite;}",

      // flashes on shocks — teal/pink resolve back to soft text, no text-shadow
      ".ay-flash-up{animation:ay-tkr-flash-up .7s var(--ease);}",
      ".ay-flash-down{animation:ay-tkr-flash-down .7s var(--ease);}",
      "@keyframes ay-tkr-flash-up{0%{color:var(--teal);}100%{color:var(--text);}}",
      "@keyframes ay-tkr-flash-down{0%{color:var(--pink);}100%{color:var(--text);}}",
      "@keyframes ay-tkr-pulse{0%,100%{opacity:1;}50%{opacity:.55;}}",

      // tighten on small screens
      "@media (max-width:640px){.ay-tkr-cell{gap:.4rem;padding:.45rem .7rem;}.ay-tkr-spark{width:48px;}}",

      // reduced motion: kill the marquee + pulses (values still tick via JS)
      "@media (prefers-reduced-motion:reduce){",
        ".ay-ticker .ay-tkr-track{animation:none !important;}",
        ".ay-tkr-val.alphaval,.ay-tkr-live,.ay-tkr-reg-dot{animation:none !important;}",
      "}"
    ].join("");

    var el = document.createElement("style");
    el.id = STYLE_ID;
    el.textContent = css;
    document.head.appendChild(el);
  }

  /* ----------------------------------------------------------------------------
     INIT — find every mount, no-op if none.
     -------------------------------------------------------------------------- */
  function init() {
    var hosts = document.querySelectorAll(SELECTOR);
    if (!hosts.length) return;          // graceful no-op
    injectCSS();
    Array.prototype.forEach.call(hosts, mount);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  /* ==========================================================================
     OPTIONAL — REAL-DATA UPGRADE PATH  (guidance only; DEFAULT stays simulated)
     --------------------------------------------------------------------------
     The strip above is intentionally self-contained and API-free. If you ever
     want it backed by live quotes, the cleanest *free, no-API-key* options are:

       1) Yahoo Finance public quote endpoint (no key; CORS varies, so proxy):
            https://query1.finance.yahoo.com/v8/finance/chart/%5EGSPC?interval=1m&range=1d
          Symbols: ^GSPC (SPX), BTC-USD, ^VIX, EURUSD=X.
          Yahoo blocks cross-origin browser calls, so route through a tiny proxy
          you control (Cloudflare Worker / Netlify function) that adds CORS:

            // worker.js (deploy free on Cloudflare Workers)
            export default {
              async fetch(req) {
                const u = new URL(req.url);
                const sym = u.searchParams.get("sym");                 // e.g. "BTC-USD"
                const r = await fetch(
                  "https://query1.finance.yahoo.com/v8/finance/chart/" +
                  encodeURIComponent(sym) + "?interval=1m&range=1d");
                const j = await r.json();
                const q = j?.chart?.result?.[0];
                const meta = q?.meta || {};
                const closes = (q?.indicators?.quote?.[0]?.close || []).filter(x => x != null);
                return new Response(JSON.stringify({
                  price: meta.regularMarketPrice,
                  prevClose: meta.chartPreviousClose ?? meta.previousClose,
                  hist: closes.slice(-28)
                }), { headers: { "content-type": "application/json",
                                 "access-control-allow-origin": "*",
                                 "cache-control": "max-age=30" } });
              }
            };

       2) Other no-key feeds you can mix in (often crypto-only / rate-limited):
            • Coinbase spot:  https://api.coinbase.com/v2/prices/BTC-USD/spot  (CORS-ok)
            • Binance:        https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT
            • Frankfurter FX: https://api.frankfurter.app/latest?from=EUR&to=USD (CORS-ok, daily)

     Wiring it in: replace evolve()/makeAssets() seeding with a fetch on the
     TICK_MS interval, e.g.

          async function pull(a){
            const r = await fetch(`/api/quote?sym=${a.feed}`);   // your proxy
            const j = await r.json();
            a.prev = a.price; a.price = j.price;
            if (a.open == null) a.open = j.prevClose ?? j.price;
            if (Array.isArray(j.hist) && j.hist.length) a.hist = j.hist.slice(-SPARK_LEN);
            return { abs:a.price-a.open, pct:((a.price-a.open)/a.open)*100, up:a.price>=a.open };
          }

     Keep the GARCH simulator as a graceful fallback when a fetch fails or rate-
     limits — degrade to simulated, never to a broken strip. Respect each
     provider's terms, cache aggressively (30–60s), and never ship secrets to
     the client (that's exactly why the proxy exists). Markets are mostly closed
     on weekends/overnight — the simulator keeps the HUD feeling alive 24/7,
     which is the whole point: *her research, live.*
     ========================================================================== */
})();
