/* ==========================================================================
   MATH 4210 simulation engine
   book-myst/sims/_engine.js

   Dependency free. Zero external requests. Canvas based. Loaded by every
   sims/chNN-<slug>.html via a sibling relative <script src="_engine.js">.

   A sim file is a thin wrapper: it links _engine.css, includes this file,
   and calls Sim.mount({ ... }) with a declarative config. Authoring spec
   and a complete example per primitive: _planning/10-sim-spec.md

   PRIMITIVES
     scatter-drag  draggable scatter, live least-squares fit, live readouts
     sliders       parameter sliders bound to a live plot
     sampling      draw 1 / draw 1000, accumulating sampling distribution
     resample      permutation or bootstrap animator with a null distribution
     curve         curve / band overlay plotter with toggles

   MATH 3219 additions (the block below section 10 in this file)
     bars          categorical distribution as a bar chart + sliders
     tokens        text strip cut into token chips, id under each chip
     quantize      number line of representable levels, value, error
     vectors2d     two draggable arrows, angle arc, cosine readout

   All user-visible strings come from {en, es} pairs. ?lang=es picks Spanish.
   ========================================================================== */

(function (global) {
  'use strict';

  /* ======================================================================
     1. Stats library (shared by every widget)
     ====================================================================== */

  var Stats = {
    /* Seedable RNG (mulberry32): a "reset" is reproducible. */
    rng: function (seed) {
      var a = (seed === undefined ? 20250718 : seed) >>> 0;
      var f = function () {
        a |= 0; a = (a + 0x6D2B79F5) | 0;
        var t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
      f.reset = function () { a = (seed === undefined ? 20250718 : seed) >>> 0; };
      /* Standard normal via Box-Muller. */
      f.normal = function (mu, sd) {
        var u = 0, v = 0;
        while (u === 0) { u = f(); }
        while (v === 0) { v = f(); }
        var z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
        return (mu === undefined ? 0 : mu) + (sd === undefined ? 1 : sd) * z;
      };
      /* Bernoulli / binomial: covers coin tosses. */
      f.bernoulli = function (p) { return f() < p ? 1 : 0; };
      f.binomial = function (n, p) {
        var k = 0;
        for (var i = 0; i < n; i++) { if (f() < p) { k++; } }
        return k;
      };
      f.poisson = function (lambda) {
        var L = Math.exp(-lambda), k = 0, prod = 1;
        do { k++; prod *= f(); } while (prod > L);
        return k - 1;
      };
      f.int = function (n) { return Math.floor(f() * n); };
      f.pick = function (arr) { return arr[f.int(arr.length)]; };
      /* Fisher-Yates on a copy. */
      f.shuffle = function (arr) {
        var a2 = arr.slice();
        for (var i = a2.length - 1; i > 0; i--) {
          var j = f.int(i + 1), t = a2[i]; a2[i] = a2[j]; a2[j] = t;
        }
        return a2;
      };
      /* Resample with replacement (bootstrap). Returns indices. */
      f.bootIndices = function (n) {
        var out = [];
        for (var i = 0; i < n; i++) { out.push(f.int(n)); }
        return out;
      };
      return f;
    },

    mean: function (v) {
      if (!v.length) { return NaN; }
      var s = 0;
      for (var i = 0; i < v.length; i++) { s += v[i]; }
      return s / v.length;
    },

    /* Sample variance / sd, denominator n-1. */
    variance: function (v) {
      if (v.length < 2) { return NaN; }
      var m = Stats.mean(v), s = 0;
      for (var i = 0; i < v.length; i++) { var d = v[i] - m; s += d * d; }
      return s / (v.length - 1);
    },

    sd: function (v) { return Math.sqrt(Stats.variance(v)); },

    /* Least squares fit of y on x. Returns the full inference bundle. */
    lsFit: function (x, y) {
      var n = Math.min(x.length, y.length);
      if (n < 2) {
        return { n: n, slope: NaN, intercept: NaN, r: NaN, r2: NaN,
                 sse: NaN, sst: NaN, ssr: NaN, mse: NaN, se: NaN,
                 seSlope: NaN, tSlope: NaN, fitted: [], residuals: [] };
      }
      var mx = Stats.mean(x.slice(0, n)), my = Stats.mean(y.slice(0, n));
      var sxx = 0, sxy = 0, syy = 0, i, dx, dy;
      for (i = 0; i < n; i++) {
        dx = x[i] - mx; dy = y[i] - my;
        sxx += dx * dx; sxy += dx * dy; syy += dy * dy;
      }
      var slope = sxx === 0 ? NaN : sxy / sxx;
      var intercept = my - slope * mx;
      var fitted = [], residuals = [], sse = 0;
      for (i = 0; i < n; i++) {
        var yh = intercept + slope * x[i];
        fitted.push(yh);
        var e = y[i] - yh;
        residuals.push(e);
        sse += e * e;
      }
      var sst = syy, ssr = sst - sse;
      var df = n - 2;
      var mse = df > 0 ? sse / df : NaN;
      var seSlope = (df > 0 && sxx > 0) ? Math.sqrt(mse / sxx) : NaN;
      var r = (sxx > 0 && syy > 0) ? sxy / Math.sqrt(sxx * syy) : NaN;
      return {
        n: n, slope: slope, intercept: intercept,
        r: r, r2: sst > 0 ? ssr / sst : NaN,
        sse: sse, sst: sst, ssr: ssr, mse: mse,
        se: Math.sqrt(mse), seSlope: seSlope,
        tSlope: seSlope > 0 ? slope / seSlope : NaN,
        df: df, meanX: mx, meanY: my, sxx: sxx,
        fitted: fitted, residuals: residuals,
        predict: function (xv) { return intercept + slope * xv; }
      };
    },

    corr: function (x, y) { return Stats.lsFit(x, y).r; },

    /* Sorted-copy quantile, linear interpolation (R type 7). */
    quantile: function (v, p) {
      if (!v.length) { return NaN; }
      var s = v.slice().sort(function (a, b) { return a - b; });
      var h = (s.length - 1) * p;
      var lo = Math.floor(h), hi = Math.ceil(h);
      return s[lo] + (h - lo) * (s[hi] - s[lo]);
    },

    /* Standard normal quantile. Acklam's rational approximation,
       |relative error| < 1.15e-9 over the open unit interval. */
    qnorm: function (p) {
      if (p <= 0) { return -Infinity; }
      if (p >= 1) { return Infinity; }
      var a = [-3.969683028665376e+01, 2.209460984245205e+02,
               -2.759285104469687e+02, 1.383577518672690e+02,
               -3.066479806614716e+01, 2.506628277459239e+00];
      var b = [-5.447609879822406e+01, 1.615858368580409e+02,
               -1.556989798598866e+02, 6.680131188771972e+01,
               -1.328068155288572e+01];
      var c = [-7.784894002430293e-03, -3.223964580411365e-01,
               -2.400758277161838e+00, -2.549732539343734e+00,
                4.374664141464968e+00, 2.938163982698783e+00];
      var d = [7.784695709041462e-03, 3.224671290700398e-01,
               2.445134137142996e+00, 3.754408661907416e+00];
      var pl = 0.02425, q, r;
      if (p < pl) {
        q = Math.sqrt(-2 * Math.log(p));
        return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
               ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
      }
      if (p > 1 - pl) {
        q = Math.sqrt(-2 * Math.log(1 - p));
        return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
      }
      q = p - 0.5; r = q * q;
      return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q /
             (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
    },

    /* Standard normal density and cdf (cdf via Abramowitz-Stegun 7.1.26). */
    dnorm: function (z) { return Math.exp(-0.5 * z * z) / Math.sqrt(2 * Math.PI); },

    pnorm: function (z) {
      var s = z < 0 ? -1 : 1, x = Math.abs(z) / Math.SQRT2;
      var t = 1 / (1 + 0.3275911 * x);
      var y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t
                    - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
      return 0.5 * (1 + s * y);
    },

    /* Student t quantile. Cornish-Fisher expansion off qnorm; accurate to
       about 1e-4 for df >= 5, which is well past plotting resolution. */
    qt: function (p, df) {
      if (df <= 0) { return NaN; }
      if (df > 3000) { return Stats.qnorm(p); }
      var z = Stats.qnorm(p), z2 = z * z;
      var g1 = (z2 * z + z) / 4;
      var g2 = (5 * z2 * z2 * z + 16 * z2 * z + 3 * z) / 96;
      var g3 = (3 * z2 * z2 * z2 * z + 19 * z2 * z2 * z + 17 * z2 * z - 15 * z) / 384;
      var g4 = (79 * Math.pow(z, 9) + 776 * Math.pow(z, 7) + 1482 * z2 * z2 * z
                - 1920 * z2 * z - 945 * z) / 92160;
      return z + g1 / df + g2 / (df * df) + g3 / Math.pow(df, 3) + g4 / Math.pow(df, 4);
    },

    /* Two-sided t tail probability, by numeric integration of the t density.
       Enough for a p-value readout. */
    pt2: function (t, df) {
      t = Math.abs(t);
      var steps = 600, hi = t + 40, h = (hi - t) / steps, s = 0;
      var lg = function (a) {  /* log gamma, Lanczos */
        var g = [76.18009172947146, -86.50532032941677, 24.01409824083091,
                 -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5];
        var xx = a, yy = a, tmp = xx + 5.5;
        tmp -= (xx + 0.5) * Math.log(tmp);
        var ser = 1.000000000190015;
        for (var j = 0; j < 6; j++) { ser += g[j] / ++yy; }
        return -tmp + Math.log(2.5066282746310005 * ser / xx);
      };
      var lc = lg((df + 1) / 2) - lg(df / 2) - 0.5 * Math.log(df * Math.PI);
      var dens = function (u) {
        return Math.exp(lc - ((df + 1) / 2) * Math.log(1 + u * u / df));
      };
      for (var i = 0; i <= steps; i++) {
        var u = t + i * h, w = (i === 0 || i === steps) ? 1 : (i % 2 ? 4 : 2);
        s += w * dens(u);
      }
      return Math.min(1, 2 * (s * h / 3));
    },

    /* Equal-width histogram. Returns {breaks, counts, width, max}. */
    histogram: function (v, lo, hi, bins) {
      bins = bins || 30;
      var counts = new Array(bins), i;
      for (i = 0; i < bins; i++) { counts[i] = 0; }
      var w = (hi - lo) / bins;
      for (i = 0; i < v.length; i++) {
        var k = Math.floor((v[i] - lo) / w);
        if (k === bins) { k = bins - 1; }        /* right edge lands in */
        if (k >= 0 && k < bins) { counts[k]++; }
      }
      var mx = 0;
      for (i = 0; i < bins; i++) { if (counts[i] > mx) { mx = counts[i]; } }
      return { lo: lo, hi: hi, bins: bins, width: w, counts: counts, max: mx };
    },

    /* "Nice" axis ticks. */
    ticks: function (lo, hi, target) {
      target = target || 6;
      var span = hi - lo;
      if (!(span > 0)) { return [lo]; }
      var raw = span / target;
      var mag = Math.pow(10, Math.floor(Math.log(raw) / Math.LN10));
      var norm = raw / mag;
      var step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
      var out = [], t = Math.ceil(lo / step) * step;
      for (; t <= hi + step * 1e-6; t += step) {
        out.push(Math.abs(t) < step * 1e-6 ? 0 : t);
      }
      return out;
    },

    extent: function (v, pad) {
      var lo = Infinity, hi = -Infinity;
      for (var i = 0; i < v.length; i++) {
        if (v[i] < lo) { lo = v[i]; }
        if (v[i] > hi) { hi = v[i]; }
      }
      if (!isFinite(lo)) { return [0, 1]; }
      var p = (hi - lo) * (pad === undefined ? 0.08 : pad);
      if (p === 0) { p = Math.abs(hi) * 0.1 || 1; }
      return [lo - p, hi + p];
    }
  };

  /* ======================================================================
     2. Language
     ====================================================================== */

  function detectLang(explicit) {
    if (explicit && explicit !== 'auto') { return explicit; }
    try {
      var q = new URLSearchParams(global.location.search).get('lang');
      if (q === 'es' || q === 'en') { return q; }
    } catch (e) { /* no URLSearchParams: fall through */ }
    return 'en';
  }

  /* Engine chrome strings. A config's own {en, es} pairs override nothing
     here; these are the shared buttons and stat labels. */
  var LABELS = {
    drawOne:    { en: 'Draw a sample',   es: 'Tomar una muestra' },
    drawMany:   { en: 'Draw 1000',       es: 'Tomar 1000' },
    shuffleOne: { en: 'Shuffle once',    es: 'Barajar una vez' },
    resampleOne:{ en: 'Resample once',   es: 'Remuestrear una vez' },
    runMany:    { en: 'Run 1000',        es: 'Correr 1000' },
    reset:      { en: 'Reset',           es: 'Reiniciar' },
    samples:    { en: 'Samples',         es: 'Muestras' },
    meanOf:     { en: 'Mean',            es: 'Media' },
    sdOf:       { en: 'SD',              es: 'DE' },
    last:       { en: 'Last draw',       es: 'Ultimo' },
    observed:   { en: 'Observed',        es: 'Observado' },
    pValue:     { en: 'p-value',         es: 'valor p' },
    slope:      { en: 'Slope',           es: 'Pendiente' },
    intercept:  { en: 'Intercept',       es: 'Intercepto' },
    correlation:{ en: 'r',               es: 'r' },
    r2:         { en: 'R-squared',       es: 'R-cuadrado' },
    sse:        { en: 'SSE',             es: 'SCE' },
    seSlope:    { en: 'SE(slope)',       es: 'EE(pend.)' },
    tStat:      { en: 't',               es: 't' },
    dragHint:   { en: 'Drag any point. Arrow keys move the selected point.',
                  es: 'Arrastra cualquier punto. Las flechas mueven el punto seleccionado.' },
    plotLabel:  { en: 'Interactive plot', es: 'Grafico interactivo' },
    atLeastAs:  { en: 'at least as extreme as observed',
                  es: 'al menos tan extremo como lo observado' }
  };

  function t(key, lang) {
    var e = LABELS[key];
    return e ? (e[lang] || e.en) : key;
  }

  /* Resolve a value that may be a plain string or an {en, es} pair. */
  function str(v, lang) {
    if (v === null || v === undefined) { return ''; }
    if (typeof v === 'string') { return v; }
    return v[lang] || v.en || '';
  }

  /* ======================================================================
     3. Theme
     ====================================================================== */

  /* prefers-color-scheme is the default (set in CSS). If this sim is framed
     by a book page on the same origin, mirror that page's html.dark class so
     the sim follows the book's own theme toggle. Same-origin only; any
     failure silently leaves the media query in charge. */
  function wireTheme() {
    var root = document.documentElement;
    function apply(isDark) {
      root.classList.toggle('sim-dark', !!isDark);
      root.classList.toggle('sim-light', !isDark);
      redrawAll();
    }
    try {
      if (global.parent && global.parent !== global) {
        var pdoc = global.parent.document;          /* throws if cross-origin */
        var pel = pdoc.documentElement;
        var read = function () { return pel.classList.contains('dark'); };
        if (pel.classList.contains('dark') || pel.classList.contains('light')) {
          apply(read());
        }
        var mo = new global.parent.MutationObserver(function () { apply(read()); });
        mo.observe(pel, { attributes: true, attributeFilter: ['class'] });
        return;
      }
    } catch (e) { /* cross-origin or no parent: media query stays in charge */ }
    if (global.matchMedia) {
      var mq = global.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () { redrawAll(); };
      if (mq.addEventListener) { mq.addEventListener('change', onChange); }
      else if (mq.addListener) { mq.addListener(onChange); }
    }
  }

  /* Palette is read from CSS custom properties, so _engine.css stays the
     single source of truth for color. */
  function palette() {
    var cs = getComputedStyle(document.documentElement);
    var get = function (n, fb) {
      var v = cs.getPropertyValue(n);
      return (v && v.trim()) || fb;
    };
    return {
      bg:       get('--sim-bg', '#ffffff'),
      surface:  get('--sim-surface', '#f5f5f7'),
      text:     get('--sim-text', '#111113'),
      text2:    get('--sim-text-2', '#2b2b2e'),
      hairline: get('--sim-hairline', '#d2d2d7'),
      accent:   get('--sim-accent', '#0b5fcc'),
      accent2:  get('--sim-accent-2', '#8a5300'),
      grid:     get('--sim-grid', '#e6e6ea')
    };
  }

  /* ======================================================================
     4. Plot surface (canvas, DPR aware, container responsive)
     ====================================================================== */

  var instances = [];
  function redrawAll() {
    for (var i = 0; i < instances.length; i++) {
      try { instances[i](); } catch (e) { /* keep other sims alive */ }
    }
  }

  function Plot(wrap, opts) {
    opts = opts || {};
    var canvas = document.createElement('canvas');
    canvas.className = 'sim-canvas';
    if (opts.focusable) { canvas.tabIndex = 0; }
    canvas.setAttribute('role', 'img');
    if (opts.ariaLabel) { canvas.setAttribute('aria-label', opts.ariaLabel); }
    wrap.appendChild(canvas);

    var self = {
      canvas: canvas,
      ctx: canvas.getContext('2d'),
      w: 300, h: 200,
      pad: { l: 44, r: 12, t: 12, b: 34 },
      xr: [0, 1], yr: [0, 1],
      pal: palette()
    };

    /* Aspect ratio: taller (relatively) on narrow screens so a phone plot
       is not a letterbox slit. */
    self.resize = function () {
      var cssW = wrap.clientWidth || 300;
      var ratio = opts.ratio || (cssW < 420 ? 0.86 : cssW < 640 ? 0.66 : 0.56);
      var cssH = Math.max(opts.minHeight || 150, Math.round(cssW * ratio));
      if (opts.maxHeight) { cssH = Math.min(cssH, opts.maxHeight); }
      var dpr = global.devicePixelRatio || 1;
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      self.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      self.w = cssW; self.h = cssH;
      /* Tighter gutters on a phone. */
      self.pad = cssW < 420
        ? { l: 36, r: 8, t: 10, b: 28 }
        : { l: 46, r: 12, t: 12, b: 34 };
      if (opts.noYAxis) { self.pad.l = cssW < 420 ? 10 : 14; }
    };

    self.setRanges = function (xr, yr) { self.xr = xr; self.yr = yr; };

    self.px = function (x) {
      var f = (x - self.xr[0]) / (self.xr[1] - self.xr[0]);
      return self.pad.l + f * (self.w - self.pad.l - self.pad.r);
    };
    self.py = function (y) {
      var f = (y - self.yr[0]) / (self.yr[1] - self.yr[0]);
      return self.h - self.pad.b - f * (self.h - self.pad.t - self.pad.b);
    };
    /* Inverse maps, for dragging. */
    self.ux = function (px) {
      var f = (px - self.pad.l) / (self.w - self.pad.l - self.pad.r);
      return self.xr[0] + f * (self.xr[1] - self.xr[0]);
    };
    self.uy = function (py) {
      var f = (self.h - self.pad.b - py) / (self.h - self.pad.t - self.pad.b);
      return self.yr[0] + f * (self.yr[1] - self.yr[0]);
    };

    self.clear = function () {
      self.pal = palette();
      self.ctx.clearRect(0, 0, self.w, self.h);
      self.ctx.fillStyle = self.pal.surface;
      self.ctx.fillRect(0, 0, self.w, self.h);
    };

    self.fmt = function (v) {
      var a = Math.abs(v);
      if (a === 0) { return '0'; }
      if (a >= 1000 || a < 0.01) { return v.toExponential(0); }
      if (a >= 100) { return v.toFixed(0); }
      if (a >= 10) { return v.toFixed(a % 1 === 0 ? 0 : 1); }
      return v.toFixed(a % 1 === 0 ? 0 : 2);
    };

    /* Axes with light gridlines and nice ticks. */
    self.axes = function (o) {
      o = o || {};
      var c = self.ctx, p = self.pal;
      var small = self.w < 420;
      c.font = (small ? 10 : 11) + 'px ' + '-apple-system, "Segoe UI", Roboto, sans-serif';
      c.lineWidth = 1;

      var xt = Stats.ticks(self.xr[0], self.xr[1], small ? 4 : 6);
      var yt = Stats.ticks(self.yr[0], self.yr[1], small ? 4 : 5);
      var i, X, Y;

      c.strokeStyle = p.grid;
      c.beginPath();
      for (i = 0; i < xt.length; i++) {
        X = Math.round(self.px(xt[i])) + 0.5;
        c.moveTo(X, self.pad.t); c.lineTo(X, self.h - self.pad.b);
      }
      if (!o.noYGrid) {
        for (i = 0; i < yt.length; i++) {
          Y = Math.round(self.py(yt[i])) + 0.5;
          c.moveTo(self.pad.l, Y); c.lineTo(self.w - self.pad.r, Y);
        }
      }
      c.stroke();

      c.strokeStyle = p.hairline;
      c.beginPath();
      c.moveTo(self.pad.l, self.h - self.pad.b + 0.5);
      c.lineTo(self.w - self.pad.r, self.h - self.pad.b + 0.5);
      if (!o.noYAxisLine) {
        c.moveTo(self.pad.l + 0.5, self.pad.t);
        c.lineTo(self.pad.l + 0.5, self.h - self.pad.b);
      }
      c.stroke();

      c.fillStyle = p.text2;
      c.textAlign = 'center'; c.textBaseline = 'top';
      for (i = 0; i < xt.length; i++) {
        c.fillText(self.fmt(xt[i]), self.px(xt[i]), self.h - self.pad.b + 5);
      }
      if (!o.noYLabels) {
        c.textAlign = 'right'; c.textBaseline = 'middle';
        for (i = 0; i < yt.length; i++) {
          c.fillText(self.fmt(yt[i]), self.pad.l - 5, self.py(yt[i]));
        }
      }

      if (o.xLabel) {
        c.textAlign = 'center'; c.textBaseline = 'bottom';
        c.fillStyle = p.text2;
        c.font = '600 ' + (small ? 10 : 11) + 'px -apple-system, "Segoe UI", Roboto, sans-serif';
        c.fillText(o.xLabel, self.pad.l + (self.w - self.pad.l - self.pad.r) / 2, self.h - 1);
      }
      if (o.yLabel && !small) {
        c.save();
        c.translate(9, self.pad.t + (self.h - self.pad.t - self.pad.b) / 2);
        c.rotate(-Math.PI / 2);
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillStyle = p.text2;
        c.fillText(o.yLabel, 0, 0);
        c.restore();
      }
    };

    self.points = function (xs, ys, o) {
      o = o || {};
      var c = self.ctx, r = o.r || (self.w < 420 ? 5 : 6);
      c.fillStyle = o.fill || self.pal.text;
      c.strokeStyle = o.stroke || self.pal.bg;
      c.lineWidth = o.lineWidth === undefined ? 1.5 : o.lineWidth;
      for (var i = 0; i < xs.length; i++) {
        var rr = (o.activeIndex === i) ? r + 3 : r;
        c.beginPath();
        c.arc(self.px(xs[i]), self.py(ys[i]), rr, 0, 2 * Math.PI);
        c.fill();
        if (c.lineWidth > 0) { c.stroke(); }
      }
    };

    self.line = function (x0, y0, x1, y1, o) {
      o = o || {};
      var c = self.ctx;
      c.save();
      c.strokeStyle = o.color || self.pal.accent;
      c.lineWidth = o.width || 2.5;
      if (o.dash) { c.setLineDash(o.dash); }
      c.beginPath();
      c.moveTo(self.px(x0), self.py(y0));
      c.lineTo(self.px(x1), self.py(y1));
      c.stroke();
      c.restore();
    };

    /* Sample a function across the x range and stroke it. */
    self.curve = function (fn, o) {
      o = o || {};
      var c = self.ctx, n = o.steps || 220, started = false;
      c.save();
      c.strokeStyle = o.color || self.pal.accent;
      c.lineWidth = o.width || 2.5;
      if (o.dash) { c.setLineDash(o.dash); }
      c.beginPath();
      for (var i = 0; i <= n; i++) {
        var x = self.xr[0] + (i / n) * (self.xr[1] - self.xr[0]);
        var y = fn(x);
        if (!isFinite(y)) { started = false; continue; }
        var X = self.px(x), Y = self.py(y);
        /* Clamp wild values so a vertical asymptote does not smear. */
        if (Y < self.pad.t - 2000 || Y > self.h + 2000) { started = false; continue; }
        if (!started) { c.moveTo(X, Y); started = true; } else { c.lineTo(X, Y); }
      }
      c.stroke();
      c.restore();
    };

    /* Filled band between two functions. */
    self.band = function (loFn, hiFn, o) {
      o = o || {};
      var c = self.ctx, n = o.steps || 160, i, x;
      c.save();
      c.globalAlpha = o.alpha === undefined ? 0.14 : o.alpha;
      c.fillStyle = o.color || self.pal.accent;
      c.beginPath();
      for (i = 0; i <= n; i++) {
        x = self.xr[0] + (i / n) * (self.xr[1] - self.xr[0]);
        var Y = self.py(hiFn(x));
        if (i === 0) { c.moveTo(self.px(x), Y); } else { c.lineTo(self.px(x), Y); }
      }
      for (i = n; i >= 0; i--) {
        x = self.xr[0] + (i / n) * (self.xr[1] - self.xr[0]);
        c.lineTo(self.px(x), self.py(loFn(x)));
      }
      c.closePath();
      c.fill();
      c.restore();
    };

    /* Vertical residual sticks from points to a line. */
    self.residuals = function (xs, ys, predict, o) {
      o = o || {};
      var c = self.ctx;
      c.save();
      c.strokeStyle = o.color || self.pal.accent2;
      c.lineWidth = o.width || 1.5;
      c.setLineDash(o.dash || [3, 3]);
      c.beginPath();
      for (var i = 0; i < xs.length; i++) {
        c.moveTo(self.px(xs[i]), self.py(ys[i]));
        c.lineTo(self.px(xs[i]), self.py(predict(xs[i])));
      }
      c.stroke();
      c.restore();
    };

    /* Histogram bars from a Stats.histogram result. */
    self.bars = function (hist, o) {
      o = o || {};
      var c = self.ctx, i;
      var scaleMax = o.max || hist.max || 1;
      for (i = 0; i < hist.bins; i++) {
        if (!hist.counts[i]) { continue; }
        var x0 = hist.lo + i * hist.width, x1 = x0 + hist.width;
        var X0 = self.px(x0), X1 = self.px(x1);
        var frac = hist.counts[i] / scaleMax;
        var Y = self.py(self.yr[0] + frac * (self.yr[1] - self.yr[0]));
        var base = self.py(self.yr[0]);
        var inTail = o.tail ? o.tail(x0 + hist.width / 2) : false;
        c.fillStyle = inTail ? (o.tailColor || self.pal.accent2)
                             : (o.color || self.pal.accent);
        c.globalAlpha = inTail ? 0.95 : 0.75;
        c.fillRect(X0 + 0.5, Y, Math.max(1, X1 - X0 - 1), base - Y);
      }
      c.globalAlpha = 1;
    };

    /* A labelled vertical marker (observed statistic, true value). */
    self.marker = function (x, o) {
      o = o || {};
      var c = self.ctx, X = Math.round(self.px(x)) + 0.5;
      c.save();
      c.strokeStyle = o.color || self.pal.accent2;
      c.lineWidth = o.width || 2;
      if (o.dash) { c.setLineDash(o.dash); }
      c.beginPath();
      c.moveTo(X, self.pad.t); c.lineTo(X, self.h - self.pad.b);
      c.stroke();
      if (o.label) {
        c.setLineDash([]);
        c.font = '600 ' + (self.w < 420 ? 10 : 11) + 'px -apple-system, "Segoe UI", Roboto, sans-serif';
        var tw = c.measureText(o.label).width;
        var lx = Math.min(Math.max(X, self.pad.l + tw / 2 + 2),
                          self.w - self.pad.r - tw / 2 - 2);
        c.fillStyle = self.pal.bg;
        c.fillRect(lx - tw / 2 - 3, self.pad.t + 1, tw + 6, 14);
        c.fillStyle = o.color || self.pal.accent2;
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillText(o.label, lx, self.pad.t + 2);
      }
      c.restore();
    };

    /* Pointer position in CSS pixels. */
    self.pos = function (ev) {
      var r = canvas.getBoundingClientRect();
      return { x: ev.clientX - r.left, y: ev.clientY - r.top };
    };

    return self;
  }

  /* ======================================================================
     5. DOM helpers
     ====================================================================== */

  function el(tag, cls, parent) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (parent) { parent.appendChild(n); }
    return n;
  }

  function shell(cfg, lang) {
    var host = document.getElementById(cfg.mount || 'sim') || document.body;
    var root = el('div', 'sim-root', host);
    var title = str(cfg.title, lang);
    if (title) {
      var h = el('h1', 'sim-title', root);
      h.textContent = title;
    }
    return root;
  }

  function statBlock(root, defs, lang) {
    var wrap = el('div', 'sim-readouts', root);
    var live = el('div', 'sim-sr', root);
    live.setAttribute('aria-live', 'polite');
    live.setAttribute('aria-atomic', 'true');
    var cells = {};
    defs.forEach(function (d) {
      var cell = el('div', 'sim-stat' + (d.accent === 2 ? ' is-accent-2'
                                       : d.accent ? ' is-accent' : ''), wrap);
      var lab = el('span', 'sim-stat-label', cell);
      lab.textContent = str(d.label, lang);
      var val = el('span', 'sim-stat-value', cell);
      val.textContent = '--';
      cells[d.id] = { label: str(d.label, lang), value: val };
    });
    return {
      set: function (id, text) {
        if (cells[id]) { cells[id].value.textContent = text; }
      },
      announce: function () {
        var parts = [];
        for (var k in cells) {
          if (Object.prototype.hasOwnProperty.call(cells, k)) {
            parts.push(cells[k].label + ' ' + cells[k].value.textContent);
          }
        }
        live.textContent = parts.join(', ');
      }
    };
  }

  function sliderBlock(root, params, lang, onChange) {
    var wrap = el('div', 'sim-controls', root);
    var state = {};
    params.forEach(function (p) {
      state[p.id] = p.value === undefined ? (p.min + p.max) / 2 : p.value;
      var row = el('div', 'sim-slider-row', wrap);
      var lab = el('label', 'sim-slider-label', row);
      var out = el('span', 'sim-slider-value', row);
      var inp = el('input', null, row);
      var id = 'sl-' + p.id + '-' + Math.random().toString(36).slice(2, 7);
      inp.type = 'range';
      inp.id = id;
      inp.min = p.min; inp.max = p.max;
      inp.step = p.step === undefined ? (p.max - p.min) / 100 : p.step;
      inp.value = state[p.id];
      lab.textContent = str(p.label, lang);
      lab.setAttribute('for', id);
      var digits = p.digits === undefined ? 2 : p.digits;
      var show = function () {
        out.textContent = Number(state[p.id]).toFixed(digits) + (p.unit || '');
        /* Native range already exposes value; give AT a readable one. */
        inp.setAttribute('aria-valuetext', out.textContent);
      };
      inp.addEventListener('input', function () {
        state[p.id] = parseFloat(inp.value);
        show();
        onChange();
      });
      show();
    });
    return state;
  }

  function buttonBlock(root, defs) {
    var wrap = el('div', 'sim-buttons', root);
    defs.forEach(function (d) {
      var b = el('button', 'sim-btn' + (d.secondary ? ' is-secondary' : ''), wrap);
      b.type = 'button';
      b.textContent = d.text;
      b.addEventListener('click', d.onClick);
      if (d.ariaLabel) { b.setAttribute('aria-label', d.ariaLabel); }
    });
    return wrap;
  }

  function captionBlock(root, cfg, lang, extra) {
    var text = str(cfg.caption, lang);
    if (!text && !extra) { return; }
    var c = el('div', 'sim-caption', root);
    if (text) {
      /* Blank-line separated paragraphs; **bold** is the only markup. */
      text.split(/\n\s*\n/).forEach(function (para) {
        var p = el('p', null, c);
        var bits = para.split(/\*\*/);
        bits.forEach(function (b, i) {
          if (i % 2) { var s = el('strong', null, p); s.textContent = b; }
          else if (b) { p.appendChild(document.createTextNode(b)); }
        });
      });
    }
    if (extra) { var pe = el('p', null, c); pe.textContent = extra; }
  }

  /* Wire a resize observer + register for global (theme) redraws. */
  function wireDraw(plot, draw) {
    var run = function () { plot.resize(); draw(); };
    instances.push(run);
    if (global.ResizeObserver) {
      var ro = new ResizeObserver(function () { run(); });
      ro.observe(plot.canvas.parentNode);
    } else {
      global.addEventListener('resize', run);
    }
    run();
    return run;
  }

  /* ======================================================================
     6. Primitive: scatter-drag
     ====================================================================== */

  function scatterDrag(cfg, lang) {
    var root = shell(cfg, lang);
    var wrap = el('div', 'sim-plot-wrap', root);

    var pts = cfg.points.map(function (p) { return { x: p.x, y: p.y }; });
    var original = pts.map(function (p) { return { x: p.x, y: p.y }; });

    var xr = cfg.xRange || Stats.extent(pts.map(function (p) { return p.x; }), 0.12);
    var yr = cfg.yRange || Stats.extent(pts.map(function (p) { return p.y; }), 0.12);

    var plot = Plot(wrap, {
      focusable: true,
      ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang)
    });
    plot.setRanges(xr, yr);

    var readoutDefs = (cfg.readouts || ['slope', 'intercept', 'r', 'r2']).map(function (r) {
      if (typeof r === 'string') {
        var key = r === 'r' ? 'correlation' : r;
        return { id: r, label: t(key, lang), accent: r === 'slope' ? 1 : 0 };
      }
      return r;
    });
    var stats = statBlock(root, readoutDefs, lang);

    var active = -1;   /* selected point, for keyboard */

    function fit() {
      return Stats.lsFit(pts.map(function (p) { return p.x; }),
                         pts.map(function (p) { return p.y; }));
    }

    function draw() {
      var f = fit();
      plot.clear();
      plot.axes({
        xLabel: str(cfg.xLabel, lang),
        yLabel: str(cfg.yLabel, lang)
      });
      if (cfg.showResiduals !== false && isFinite(f.slope)) {
        plot.residuals(pts.map(function (p) { return p.x; }),
                       pts.map(function (p) { return p.y; }), f.predict);
      }
      if (cfg.showLine !== false && isFinite(f.slope)) {
        plot.line(xr[0], f.predict(xr[0]), xr[1], f.predict(xr[1]),
                  { color: plot.pal.accent, width: 2.5 });
      }
      if (cfg.showMeanLines) {
        plot.line(xr[0], f.meanY, xr[1], f.meanY,
                  { color: plot.pal.text2, width: 1, dash: [4, 4] });
      }
      plot.points(pts.map(function (p) { return p.x; }),
                  pts.map(function (p) { return p.y; }),
                  { fill: plot.pal.text, activeIndex: active });

      readoutDefs.forEach(function (d) {
        var v;
        if (typeof d.compute === 'function') { v = d.compute(f, pts); }
        else {
          v = { slope: f.slope, intercept: f.intercept, r: f.r, r2: f.r2,
                sse: f.sse, seSlope: f.seSlope, tStat: f.tSlope, n: f.n }[d.id];
        }
        var digits = d.digits === undefined ? (d.id === 'sse' ? 1 : 3) : d.digits;
        stats.set(d.id, (v === undefined || v === null || !isFinite(v))
          ? '--' : Number(v).toFixed(digits));
      });
      stats.announce();
      if (typeof cfg.onUpdate === 'function') { cfg.onUpdate(f, pts); }
    }

    var redraw = wireDraw(plot, draw);

    /* ---- pointer drag (one code path for mouse, pen and touch) ---- */
    var dragging = -1;

    function nearest(px, py) {
      var best = -1, bd = Infinity;
      for (var i = 0; i < pts.length; i++) {
        var dx = plot.px(pts[i].x) - px, dy = plot.py(pts[i].y) - py;
        var d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = i; }
      }
      /* 22px grab radius: a fingertip does not have to be precise. */
      return bd <= 22 * 22 ? best : -1;
    }

    function clampPt(p) {
      p.x = Math.min(xr[1], Math.max(xr[0], p.x));
      p.y = Math.min(yr[1], Math.max(yr[0], p.y));
      if (cfg.lockX) { p.x = original[dragging >= 0 ? dragging : 0].x; }
    }

    plot.canvas.addEventListener('pointerdown', function (ev) {
      var q = plot.pos(ev);
      var i = nearest(q.x, q.y);
      if (i < 0) { return; }
      dragging = i; active = i;
      plot.canvas.setPointerCapture(ev.pointerId);
      ev.preventDefault();
      draw();
    });

    plot.canvas.addEventListener('pointermove', function (ev) {
      if (dragging < 0) { return; }
      var q = plot.pos(ev);
      var p = pts[dragging];
      if (!cfg.lockX) { p.x = plot.ux(q.x); }
      p.y = plot.uy(q.y);
      clampPt(p);
      ev.preventDefault();
      draw();
    });

    function endDrag(ev) {
      if (dragging < 0) { return; }
      dragging = -1;
      if (ev && ev.pointerId !== undefined && plot.canvas.hasPointerCapture &&
          plot.canvas.hasPointerCapture(ev.pointerId)) {
        plot.canvas.releasePointerCapture(ev.pointerId);
      }
      draw();
    }
    plot.canvas.addEventListener('pointerup', endDrag);
    plot.canvas.addEventListener('pointercancel', endDrag);

    /* ---- keyboard: Tab to the plot, arrows move, Tab cycles points ---- */
    plot.canvas.addEventListener('keydown', function (ev) {
      var stepX = (xr[1] - xr[0]) / 50, stepY = (yr[1] - yr[0]) / 50;
      var k = ev.key;
      if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
        if (active < 0) { active = 0; }
        var p = pts[active];
        if (k === 'ArrowLeft' && !cfg.lockX) { p.x -= stepX; }
        if (k === 'ArrowRight' && !cfg.lockX) { p.x += stepX; }
        if (k === 'ArrowUp') { p.y += stepY; }
        if (k === 'ArrowDown') { p.y -= stepY; }
        clampPt(p);
        ev.preventDefault();
        draw();
      } else if (k === 'n' || k === 'N' || k === ' ') {
        active = (active + 1) % pts.length;
        ev.preventDefault();
        draw();
      }
    });

    var btns = [{
      text: t('reset', lang), secondary: true,
      onClick: function () {
        pts = original.map(function (p) { return { x: p.x, y: p.y }; });
        active = -1;
        draw();
      }
    }];
    buttonBlock(root, btns);
    captionBlock(root, cfg, lang, t('dragHint', lang));
    redraw();
  }

  /* ======================================================================
     7. Primitive: sliders bound to a live plot
     ====================================================================== */

  function sliderSim(cfg, lang) {
    var root = shell(cfg, lang);
    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, { ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang) });

    var xr = cfg.xRange || [0, 10];
    var yr = cfg.yRange || [0, 10];
    plot.setRanges(xr, yr);

    var data = cfg.points || null;
    var readoutDefs = cfg.readouts || [];
    var stats = readoutDefs.length ? statBlock(root, readoutDefs, lang) : null;

    var params;   /* filled after sliderBlock, used inside draw */

    function draw() {
      plot.clear();
      plot.axes({ xLabel: str(cfg.xLabel, lang), yLabel: str(cfg.yLabel, lang) });

      if (data) {
        plot.points(data.map(function (p) { return p.x; }),
                    data.map(function (p) { return p.y; }),
                    { fill: plot.pal.text, r: 5 });
      }
      if (typeof cfg.residualsFrom === 'function' && data) {
        plot.residuals(data.map(function (p) { return p.x; }),
                       data.map(function (p) { return p.y; }),
                       function (x) { return cfg.residualsFrom(params, x); });
      }
      (cfg.curves || []).forEach(function (cv) {
        plot.curve(function (x) { return cv.fn(params, x); }, {
          color: cv.accent === 2 ? plot.pal.accent2 : plot.pal.accent,
          dash: cv.dash, width: cv.width
        });
      });
      (cfg.bands || []).forEach(function (bd) {
        plot.band(function (x) { return bd.lo(params, x); },
                  function (x) { return bd.hi(params, x); },
                  { color: bd.accent === 2 ? plot.pal.accent2 : plot.pal.accent,
                    alpha: bd.alpha });
      });

      if (stats) {
        readoutDefs.forEach(function (d) {
          var v = d.compute(params, data);
          stats.set(d.id, typeof v === 'string' ? v
            : (isFinite(v) ? Number(v).toFixed(d.digits === undefined ? 2 : d.digits) : '--'));
        });
        stats.announce();
      }
    }

    params = sliderBlock(root, cfg.params, lang, function () { draw(); });
    var defaults = {};
    cfg.params.forEach(function (p) {
      defaults[p.id] = p.value === undefined ? (p.min + p.max) / 2 : p.value;
    });

    buttonBlock(root, [{
      text: t('reset', lang), secondary: true,
      onClick: function () {
        var inputs = root.querySelectorAll('input[type="range"]');
        cfg.params.forEach(function (p, i) {
          params[p.id] = defaults[p.id];
          if (inputs[i]) {
            inputs[i].value = defaults[p.id];
            inputs[i].dispatchEvent(new Event('input'));
          }
        });
      }
    }]);

    captionBlock(root, cfg, lang);
    wireDraw(plot, draw);
  }

  /* ======================================================================
     8. Primitive: repeated sampling
     Covers coin tosses, binomial demos, the sampling distribution of any
     statistic, and the CLT.
     ====================================================================== */

  function samplingSim(cfg, lang) {
    var root = shell(cfg, lang);

    /* Optional top panel showing the most recent sample. */
    var lastWrap = null, lastPlot = null;
    if (cfg.showLastSample) {
      lastWrap = el('div', 'sim-plot-wrap', root);
      lastPlot = Plot(lastWrap, { ratio: 0.34, minHeight: 96, noYAxis: true,
                                  ariaLabel: t('last', lang) });
    }

    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, { ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang) });

    var rng = Stats.rng(cfg.seed);
    var draws = [];
    var lastSample = null;

    var xr = cfg.xRange || [0, 1];
    plot.setRanges(xr, [0, 1.06]);

    var defs = cfg.readouts || [
      { id: 'n',    label: t('samples', lang) },
      { id: 'mean', label: t('meanOf', lang), accent: 1, digits: 3 },
      { id: 'sd',   label: t('sdOf', lang), digits: 3 },
      { id: 'last', label: t('last', lang), digits: 3 }
    ];
    var stats = statBlock(root, defs, lang);

    function drawOne() {
      var out = cfg.draw(rng);
      /* A draw may return a bare statistic, or {stat, sample}. */
      if (out && typeof out === 'object' && 'stat' in out) {
        lastSample = out.sample || null;
        return out.stat;
      }
      return out;
    }

    function drawLastPanel() {
      if (!lastPlot) { return; }
      lastPlot.clear();
      lastPlot.setRanges(cfg.sampleRange || xr, [0, 1]);
      lastPlot.axes({ noYGrid: true, noYLabels: true, noYAxisLine: true });
      if (lastSample && lastSample.length) {
        var jitter = Stats.rng(7);
        var xs = [], ys = [];
        for (var i = 0; i < lastSample.length; i++) {
          xs.push(lastSample[i]);
          ys.push(0.25 + jitter() * 0.5);
        }
        lastPlot.points(xs, ys, { r: 4, fill: lastPlot.pal.accent2, lineWidth: 0 });
      }
    }

    function draw() {
      plot.clear();
      var bins = cfg.bins || (plot.w < 420 ? 22 : 34);
      var hist = Stats.histogram(draws, xr[0], xr[1], bins);
      plot.setRanges(xr, [0, 1.06]);
      plot.axes({ xLabel: str(cfg.xLabel, lang), noYLabels: true,
                  noYGrid: true, noYAxisLine: true });

      if (draws.length) {
        plot.bars(hist, {
          max: hist.max,
          color: plot.pal.accent,
          tail: cfg.tail ? function (v) { return cfg.tail(v); } : null,
          tailColor: plot.pal.accent2
        });
      }

      /* Optional normal reference curve, scaled to the histogram. */
      if (cfg.showNormal && draws.length > 30) {
        var m = Stats.mean(draws), s = Stats.sd(draws);
        if (s > 0) {
          var peak = Stats.dnorm(0) / s;
          plot.curve(function (x) {
            return 1.02 * (Stats.dnorm((x - m) / s) / s) / peak;
          }, { color: plot.pal.accent2, width: 2, dash: [5, 4] });
        }
      }

      if (cfg.trueValue !== undefined) {
        plot.marker(cfg.trueValue, {
          color: plot.pal.accent2, dash: [4, 3],
          label: str(cfg.trueValueLabel, lang) || undefined
        });
      }

      var m2 = Stats.mean(draws), s2 = Stats.sd(draws);
      defs.forEach(function (d) {
        var v;
        if (typeof d.compute === 'function') { v = d.compute(draws); }
        else if (d.id === 'n') { stats.set('n', String(draws.length)); return; }
        else if (d.id === 'mean') { v = m2; }
        else if (d.id === 'sd') { v = s2; }
        else if (d.id === 'last') { v = draws.length ? draws[draws.length - 1] : NaN; }
        var digits = d.digits === undefined ? 3 : d.digits;
        stats.set(d.id, (v === undefined || v === null || !isFinite(v))
          ? '--' : Number(v).toFixed(digits));
      });
      stats.announce();
      drawLastPanel();
    }

    var redraw = wireDraw(plot, draw);
    if (lastPlot) { wireDraw(lastPlot, function () { drawLastPanel(); }); }

    buttonBlock(root, [
      { text: str(cfg.drawOneLabel, lang) || t('drawOne', lang),
        onClick: function () { draws.push(drawOne()); redraw(); } },
      { text: str(cfg.drawManyLabel, lang) || t('drawMany', lang),
        onClick: function () {
          var k = cfg.manyCount || 1000;
          for (var i = 0; i < k; i++) { draws.push(drawOne()); }
          redraw();
        } },
      { text: t('reset', lang), secondary: true,
        onClick: function () {
          draws = []; lastSample = null; rng.reset(); redraw();
        } }
    ]);

    captionBlock(root, cfg, lang);
    redraw();
  }

  /* ======================================================================
     9. Primitive: resampling / shuffling animator
     mode 'permutation' -> shuffle labels, build a null distribution
     mode 'bootstrap'   -> resample rows with replacement
     ====================================================================== */

  function resampleSim(cfg, lang) {
    var root = shell(cfg, lang);
    var mode = cfg.mode || 'permutation';

    /* Top panel: the data, with the current shuffle/resample visible. */
    var topWrap = el('div', 'sim-plot-wrap', root);
    var top = Plot(topWrap, { ratio: 0.5, minHeight: 130,
                              ariaLabel: str(cfg.dataAriaLabel, lang) || t('plotLabel', lang) });

    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, { ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang) });

    var rng = Stats.rng(cfg.seed);
    var data = cfg.data;                       /* {x:[], y:[]} */
    var n = data.x.length;
    var observed = (cfg.observed !== undefined)
      ? cfg.observed : cfg.stat(data.x, data.y);

    var current = { x: data.x.slice(), y: data.y.slice() };
    var draws = [];

    var xrTop = cfg.xRange || Stats.extent(data.x, 0.12);
    var yrTop = cfg.yRange || Stats.extent(data.y, 0.12);

    var statRange = cfg.statRange ||
      [-Math.abs(observed) * 2.4 - 1e-9, Math.abs(observed) * 2.4 + 1e-9];

    var defs = cfg.readouts || [
      { id: 'obs',  label: t('observed', lang), accent: 2, digits: 3 },
      { id: 'n',    label: t('samples', lang) },
      { id: 'last', label: t('last', lang), digits: 3 },
      { id: 'p',    label: t('pValue', lang), accent: 1, digits: 4 }
    ];
    var stats = statBlock(root, defs, lang);

    function pValue() {
      if (!draws.length) { return NaN; }
      var k = 0, a = Math.abs(observed);
      for (var i = 0; i < draws.length; i++) {
        if (cfg.oneSided ? draws[i] >= observed : Math.abs(draws[i]) >= a) { k++; }
      }
      /* Add-one estimator: never reports an impossible p of exactly 0. */
      return (k + 1) / (draws.length + 1);
    }

    function drawTop() {
      top.clear();
      top.setRanges(xrTop, yrTop);
      top.axes({ xLabel: str(cfg.xLabel, lang), yLabel: str(cfg.yLabel, lang) });
      top.points(current.x, current.y, { fill: top.pal.text, r: 5 });
      if (cfg.showFit !== false) {
        var f = Stats.lsFit(current.x, current.y);
        if (isFinite(f.slope)) {
          top.line(xrTop[0], f.predict(xrTop[0]), xrTop[1], f.predict(xrTop[1]),
                   { color: top.pal.accent, width: 2 });
        }
      }
    }

    function drawHist() {
      plot.clear();
      plot.setRanges(statRange, [0, 1.06]);
      var bins = cfg.bins || (plot.w < 420 ? 22 : 34);
      var hist = Stats.histogram(draws, statRange[0], statRange[1], bins);
      plot.axes({ xLabel: str(cfg.statLabel, lang), noYLabels: true,
                  noYGrid: true, noYAxisLine: true });
      if (draws.length) {
        var a = Math.abs(observed);
        plot.bars(hist, {
          max: hist.max,
          color: plot.pal.accent,
          tail: function (v) {
            return cfg.oneSided ? v >= observed : Math.abs(v) >= a;
          },
          tailColor: plot.pal.accent2
        });
      }
      plot.marker(observed, {
        color: plot.pal.accent2, width: 2.5,
        label: str(cfg.observedLabel, lang) || t('observed', lang)
      });

      defs.forEach(function (d) {
        var v;
        if (typeof d.compute === 'function') { v = d.compute(draws, observed); }
        else if (d.id === 'n') { stats.set('n', String(draws.length)); return; }
        else if (d.id === 'obs') { v = observed; }
        else if (d.id === 'last') { v = draws.length ? draws[draws.length - 1] : NaN; }
        else if (d.id === 'p') { v = pValue(); }
        var digits = d.digits === undefined ? 3 : d.digits;
        stats.set(d.id, (v === undefined || v === null || !isFinite(v))
          ? '--' : Number(v).toFixed(digits));
      });
      stats.announce();
    }

    function draw() { drawTop(); drawHist(); }

    function oneRep(record) {
      if (mode === 'bootstrap') {
        var idx = rng.bootIndices(n), bx = [], by = [];
        for (var i = 0; i < n; i++) { bx.push(data.x[idx[i]]); by.push(data.y[idx[i]]); }
        current = { x: bx, y: by };
      } else {
        current = { x: data.x.slice(), y: rng.shuffle(data.y) };
      }
      var s = cfg.stat(current.x, current.y);
      if (record !== false) { draws.push(s); }
      return s;
    }

    var topRedraw = wireDraw(top, drawTop);
    var histRedraw = wireDraw(plot, drawHist);
    function redraw() { topRedraw(); histRedraw(); }

    /* One visible rep, animated in a few frames so the shuffle is seen.
       Honors prefers-reduced-motion by collapsing to a single step. */
    var animating = false;
    function animatedRep() {
      if (animating) { return; }
      var reduce = global.matchMedia &&
                   global.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) { oneRep(); redraw(); return; }
      animating = true;
      var frames = 5, i = 0;
      var step = function () {
        i++;
        if (i < frames) {
          /* intermediate scrambles, not recorded */
          oneRep(false);
          drawTop();
          global.setTimeout(step, 60);
        } else {
          oneRep(true);
          redraw();
          animating = false;
        }
      };
      step();
    }

    buttonBlock(root, [
      { text: mode === 'bootstrap' ? t('resampleOne', lang) : t('shuffleOne', lang),
        onClick: animatedRep },
      { text: t('runMany', lang),
        onClick: function () {
          var k = cfg.manyCount || 1000;
          for (var i = 0; i < k; i++) { oneRep(); }
          redraw();
        } },
      { text: t('reset', lang), secondary: true,
        onClick: function () {
          draws = []; rng.reset();
          current = { x: data.x.slice(), y: data.y.slice() };
          redraw();
        } }
    ]);

    captionBlock(root, cfg, lang);
    redraw();
  }

  /* ======================================================================
     10. Primitive: curve overlay plotter
     ====================================================================== */

  function curveSim(cfg, lang) {
    var root = shell(cfg, lang);
    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, { ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang) });

    var xr = cfg.xRange || [0, 10];
    var yr = cfg.yRange || [0, 10];
    plot.setRanges(xr, yr);

    var shown = (cfg.curves || []).map(function (c) {
      return c.on === undefined ? true : !!c.on;
    });

    function draw() {
      plot.clear();
      plot.axes({ xLabel: str(cfg.xLabel, lang), yLabel: str(cfg.yLabel, lang) });

      (cfg.bands || []).forEach(function (bd) {
        plot.band(bd.lo, bd.hi, {
          color: bd.accent === 2 ? plot.pal.accent2 : plot.pal.accent,
          alpha: bd.alpha
        });
      });
      if (cfg.points) {
        plot.points(cfg.points.map(function (p) { return p.x; }),
                    cfg.points.map(function (p) { return p.y; }),
                    { fill: plot.pal.text, r: 5 });
      }
      (cfg.curves || []).forEach(function (cv, i) {
        if (!shown[i]) { return; }
        plot.curve(cv.fn, {
          color: cv.accent === 2 ? plot.pal.accent2 : plot.pal.accent,
          dash: cv.dash, width: cv.width
        });
      });

      /* Legend, drawn in the plot so it never costs layout height. */
      var c = plot.ctx, small = plot.w < 420;
      c.font = (small ? 10 : 11) + 'px -apple-system, "Segoe UI", Roboto, sans-serif';
      var y = plot.pad.t + 6;
      (cfg.curves || []).forEach(function (cv, i) {
        if (!shown[i]) { return; }
        var label = str(cv.label, lang);
        if (!label) { return; }
        var col = cv.accent === 2 ? plot.pal.accent2 : plot.pal.accent;
        var x = plot.w - plot.pad.r - 8;
        var tw = c.measureText(label).width;
        c.fillStyle = plot.pal.surface;
        c.globalAlpha = 0.85;
        c.fillRect(x - tw - 26, y - 2, tw + 28, 15);
        c.globalAlpha = 1;
        c.strokeStyle = col; c.lineWidth = 2.5;
        c.save();
        if (cv.dash) { c.setLineDash(cv.dash); }
        c.beginPath(); c.moveTo(x - tw - 22, y + 6); c.lineTo(x - tw - 6, y + 6); c.stroke();
        c.restore();
        c.fillStyle = plot.pal.text;
        c.textAlign = 'right'; c.textBaseline = 'top';
        c.fillText(label, x - 2, y);
        y += 17;
      });
    }

    var redraw = wireDraw(plot, draw);

    /* Toggle buttons, one per curve marked toggleable. */
    var toggles = [];
    (cfg.curves || []).forEach(function (cv, i) {
      if (!cv.toggle) { return; }
      toggles.push({
        text: str(cv.label, lang), secondary: true,
        onClick: function () { shown[i] = !shown[i]; redraw(); }
      });
    });
    if (toggles.length) { buttonBlock(root, toggles); }

    captionBlock(root, cfg, lang);
    redraw();
  }


  /* ======================================================================
     ===== MATH 3219 additions - language-model primitives =====

     Everything from here down is ADDITIVE. No line above this point was
     touched, so the 58 MATH 4210 sims keep working against this file
     exactly as they did before.

     Four new primitives:
       bars       a categorical distribution as a bar chart, driven by
                  sliders through a transform hook. Carries softmax,
                  temperature, parameter anatomy, retrieval scores and
                  subgroup accuracy.
       tokens     a text strip cut into coloured token chips, each chip
                  carrying its integer vocabulary id underneath.
       quantize   a number line of representable levels, the true value,
                  the snapped value, and the rounding error as a labelled
                  segment.
       vectors2d  two draggable arrows from the origin with the angle arc
                  and readouts for dot, both lengths, cosine and angle.

     They reuse the closure helpers above: shell, Plot, sliderBlock,
     statBlock, buttonBlock, captionBlock, wireDraw, palette, str, el, t,
     Stats, and the instances list that redrawAll walks on a theme change.

     New DOM (the token chips, the annotation line) is styled inline from
     palette() rather than from a class, because a sim page links only
     _engine.css and that file is a verbatim copy that stays unedited.
     The inline styles are re-applied on every draw, so the theme toggle
     keeps working.

     ASCII only, like the rest of this file. Spanish is written without
     diacritics, matching LABELS above.
     ====================================================================== */

  /* --- chrome strings, appended to LABELS rather than replacing it ------ */

  LABELS.tokenCount   = { en: 'Tokens',             es: 'Tokens' };
  LABELS.charCount    = { en: 'Characters',         es: 'Caracteres' };
  LABELS.charsPerTok  = { en: 'Characters / token', es: 'Caracteres / token' };
  LABELS.tokenHint    = {
    en: 'Each chip is one token. The number above a chip is its position in the ' +
        'text, and the number below it is its id in the model vocabulary.',
    es: 'Cada ficha es un token. El numero de arriba es su posicion en el texto, ' +
        'y el de abajo es su id en el vocabulario del modelo.'
  };
  LABELS.levels       = { en: 'Levels (2^bits)',    es: 'Niveles (2^bits)' };
  LABELS.stepSize     = { en: 'Gap between levels', es: 'Paso entre niveles' };
  LABELS.trueValue    = { en: 'True value',         es: 'Valor real' };
  LABELS.snappedValue = { en: 'Snapped value',      es: 'Valor redondeado' };
  LABELS.roundError   = { en: 'Rounding error',     es: 'Error de redondeo' };
  LABELS.relError     = { en: 'Error / |value|',    es: 'Error / |valor|' };
  LABELS.zoomNote     = { en: 'Zoom on the true value', es: 'Acercamiento al valor real' };
  LABELS.fullScale    = { en: 'Whole scale',        es: 'Escala completa' };
  LABELS.quantHint    = {
    en: 'Raise the scale maximum while the true value stays where it is: the levels ' +
        'spread apart and the error grows. That is what one outlier does to a whole tensor.',
    es: 'Sube el maximo de la escala mientras el valor real se queda donde esta: los ' +
        'niveles se separan y el error crece. Eso es lo que un solo valor extremo le ' +
        'hace a todo un tensor.'
  };
  LABELS.dotProduct   = { en: 'Dot product',        es: 'Producto punto' };
  LABELS.lenA         = { en: 'Length |a|',         es: 'Longitud |a|' };
  LABELS.lenB         = { en: 'Length |b|',         es: 'Longitud |b|' };
  LABELS.cosine       = { en: 'Cosine',             es: 'Coseno' };
  LABELS.angleDeg     = { en: 'Angle (degrees)',    es: 'Angulo (grados)' };
  LABELS.vectorHint   = {
    en: 'Drag either arrow tip. Arrow keys move the selected arrow, and n switches arrows.',
    es: 'Arrastra la punta de cualquier flecha. Las flechas del teclado mueven la flecha ' +
        'seleccionada, y la tecla n cambia de flecha.'
  };
  LABELS.showingEvery = { en: 'showing every ',     es: 'mostrando cada ' };
  LABELS.nthLevel     = { en: 'th level',           es: '-esimo nivel' };

  /* --- fonts, matching the strings already used inside Plot ------------- */

  var SANS_STACK = '-apple-system, "Segoe UI", Roboto, sans-serif';
  var MONO_STACK = 'ui-monospace, SFMono-Regular, Menlo, Consolas, ' +
                   '"Liberation Mono", monospace';

  /* --- Okabe-Ito, for the places that need more than two accents --------
     The engine's own two accents stay the default, so a MATH 3219 sim
     looks like every other sim in the book. The series below is used only
     where separate categories have to be told apart, and it never carries
     meaning on its own: every bar keeps its text label and every token
     chip keeps its id.

     Okabe-Ito yellow #F0E442 is deliberately not in the cycle. Against the
     light plot surface #f5f5f7 its contrast ratio is about 1.3, which is
     not legible. It stays available by name. Every entry can be overridden
     from CSS with --sim-ok-<name>. */

  var OKABE_ITO = {
    blue:       '#0072B2',
    orange:     '#E69F00',
    green:      '#009E73',
    vermillion: '#D55E00',
    sky:        '#56B4E9',
    yellow:     '#F0E442',
    purple:     '#CC79A7',
    grey:       '#999999'
  };
  var OKABE_CYCLE = ['blue', 'orange', 'green', 'vermillion', 'sky', 'purple', 'grey'];

  function accentSeries() {
    var cs = null;
    try { cs = getComputedStyle(document.documentElement); } catch (e) { cs = null; }
    return OKABE_CYCLE.map(function (name) {
      var v = cs ? cs.getPropertyValue('--sim-ok-' + name) : '';
      return (v && v.trim()) || OKABE_ITO[name];
    });
  }

  /* #rrggbb (or #rgb) to rgba(), for chip fills that sit behind text. */
  function hexToRgba(hex, alpha) {
    var h = String(hex || '').trim().replace('#', '');
    if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
    if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) { return hex; }
    var r = parseInt(h.slice(0, 2), 16),
        g = parseInt(h.slice(2, 4), 16),
        b = parseInt(h.slice(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }

  /* Relative luminance (WCAG 2.x), used only to decide how strong a chip
     tint has to be against the current background. */
  function luminance(hex) {
    var h = String(hex || '').trim().replace('#', '');
    if (h.length === 3) { h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; }
    if (h.length !== 6 || /[^0-9a-fA-F]/.test(h)) { return 1; }
    var ch = [0, 2, 4].map(function (i) {
      var v = parseInt(h.slice(i, i + 2), 16) / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
  }

  function isDarkTheme(pal) { return luminance(pal.bg) < 0.4; }

  /* A token is printed as the author wrote it, except that characters
     which would otherwise be invisible are shown as escapes. The token
     ":\n" is a real entry in Qwen's vocabulary and it has to be readable
     on a bar label. */
  function escapeToken(s) {
    if (s === null || s === undefined) { return ''; }
    return String(s).replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t');
  }

  /* Fixed-point text that does not quietly round a small number to 0. */
  function numText(v, digits) {
    if (typeof v === 'string') { return v; }
    if (v === undefined || v === null || !isFinite(v)) { return '--'; }
    var a = Math.abs(v);
    if (a !== 0 && (a < 1e-4 || a >= 1e7)) { return v.toExponential(2); }
    return v.toFixed(digits === undefined ? 4 : digits);
  }

  function pctText(v, digits) {
    if (!isFinite(v)) { return '--'; }
    return (v * 100).toFixed(digits === undefined ? 1 : digits) + '%';
  }

  /* Significant figures, for a label drawn on a canvas where a fixed number
     of decimals would print a small quantity as "-0.00". The full-precision
     value is always in the readout below the plot; this is display only. */
  function sigText(v, sig) {
    if (typeof v === 'string') { return v; }
    if (v === undefined || v === null || !isFinite(v)) { return '--'; }
    if (v === 0) { return '0'; }
    var s = sig === undefined ? 4 : sig;
    var a = Math.abs(v);
    if (a < 1e-4 || a >= 1e7) { return v.toExponential(Math.max(0, s - 1)); }
    var d = Math.max(0, s - 1 - Math.floor(Math.log(a) / Math.LN10));
    return v.toFixed(Math.min(12, d));
  }

  /* Decimal places that make a window of this width readable. */
  function digitsForSpan(span) {
    if (!(span > 0)) { return 4; }
    var d = Math.ceil(-Math.log(span) / Math.LN10) + 2;
    return Math.max(2, Math.min(8, d));
  }

  /* A one-line note above a plot. Styled inline and restyled on every
     draw, so it follows the theme without a class in _engine.css. */
  function noteLine(root) {
    var n = el('div', 'sim-note', root);
    n.setAttribute('aria-live', 'polite');
    return {
      node: n,
      set: function (text, pal, accent) {
        n.textContent = text || '';
        n.style.margin = '0 0 8px';
        n.style.fontSize = '0.875rem';
        n.style.lineHeight = '1.45';
        n.style.fontWeight = '500';
        n.style.color = accent ? pal.accent2 : pal.text2;
      }
    };
  }

  /* Move sliders from code and let sliderBlock's own handler run, so the
     displayed value, the aria-valuetext and the state stay in step. This
     is the pattern the sliders primitive already uses for Reset. */
  function setSliders(root, paramDefs, state, obj) {
    var inputs = root.querySelectorAll('input[type="range"]');
    paramDefs.forEach(function (pd, i) {
      if (obj[pd.id] === undefined) { return; }
      state[pd.id] = obj[pd.id];
      if (inputs[i]) {
        inputs[i].value = obj[pd.id];
        inputs[i].dispatchEvent(new Event('input'));
      }
    });
  }

  function defaultsOf(paramDefs) {
    var d = {};
    paramDefs.forEach(function (p) {
      d[p.id] = p.value === undefined ? (p.min + p.max) / 2 : p.value;
    });
    return d;
  }

  /* ======================================================================
     12. Primitive: bars
     A categorical distribution as a bar chart, driven by sliders.

       Sim.mount({
         type: 'bars',
         title: {en, es},
         items: [{label: "' Paris'", value: 17.2173}, ...],
         params: [{id:'T', label:{en,es}, min:0.1, max:2.5, step:0.05,
                   value:1, digits:2}],
         transform: function (items, p) { return [{label, value}, ...]; },
         yLabel: {en, es},
         yFormat: 'percent' | 'number',
         readouts: [{id, label:{en,es}, digits, compute(items, p, plotted)}],
         annotations: [{id, label:{en,es}, compute(items, p, plotted)}],
         caption: {en, es}
       });

     transform() and every compute() receive cfg.items UNCHANGED as the
     first argument, exactly as the build plan specifies, so a readout
     that recomputes from the raw logits gets the raw logits. The
     transformed, plotted list arrives as a third argument for the
     readouts that want it (entropy, the mass held by the top bar).

     A note for whoever writes ch04 and ch05: a softmax taken over the
     eight logits in the file is a softmax over eight tokens, not over the
     151,936 in the vocabulary, and it will not equal the published
     full-vocabulary percentages. Say which one the sim is showing.

     Other options: sort 'desc' | 'asc', maxBars, yMin, yMax, colorBy
     'cycle' (Okabe-Ito, one colour per category; the default is a single
     accent, which is right for a distribution), barColor, showValues
     false, valueDigits, xLabel, ratio, ariaLabel.
     ====================================================================== */

  function barsSim(cfg, lang) {
    var root = shell(cfg, lang);
    var note = (cfg.annotations && cfg.annotations.length) ? noteLine(root) : null;
    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, {
      ratio: cfg.ratio,
      ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang)
    });

    var rawItems = cfg.items || [];
    var isPct = cfg.yFormat === 'percent';
    var readoutDefs = cfg.readouts || [];
    var stats = readoutDefs.length ? statBlock(root, readoutDefs, lang) : null;
    var paramDefs = cfg.params || [];
    var params = {};
    var series = accentSeries();

    function plotted() {
      var list = (typeof cfg.transform === 'function')
        ? cfg.transform(rawItems, params) : rawItems;
      if (!list || !list.length) { return []; }
      var out = [], i;
      for (i = 0; i < list.length; i++) {
        var d = list[i];
        if (!d) { continue; }
        out.push({
          label: escapeToken(str(d.label, lang)),
          value: Number(d.value),
          color: d.color,
          accent: d.accent
        });
      }
      if (cfg.sort === 'desc') {
        out.sort(function (a, b) { return b.value - a.value; });
      } else if (cfg.sort === 'asc') {
        out.sort(function (a, b) { return a.value - b.value; });
      }
      if (cfg.maxBars && out.length > cfg.maxBars) { out = out.slice(0, cfg.maxBars); }
      return out;
    }

    function tickText(v) {
      return isPct ? (v * 100).toFixed(0) + '%' : plot.fmt(v);
    }
    function valueText(v) {
      if (!isFinite(v)) { return '--'; }
      return isPct ? pctText(v, cfg.valueDigits === undefined ? 1 : cfg.valueDigits)
                   : numText(v, cfg.valueDigits === undefined ? 2 : cfg.valueDigits);
    }

    function draw() {
      var list = plotted();
      var n = list.length;
      var c = plot.ctx, i;
      plot.clear();
      var p = plot.pal;
      var small = plot.w < 420;
      var fs = small ? 10 : 11;
      var monoFont = fs + 'px ' + MONO_STACK;
      var sansFont = fs + 'px ' + SANS_STACK;

      /* ---- vertical range: 0 stays in view, so every bar has a base --- */
      var lo = 0, hi = 0;
      for (i = 0; i < n; i++) {
        var v0 = list[i].value;
        if (isFinite(v0)) {
          if (v0 < lo) { lo = v0; }
          if (v0 > hi) { hi = v0; }
        }
      }
      if (cfg.yMax !== undefined) { hi = cfg.yMax; }
      else {
        hi = hi + (hi - lo) * 0.12;
        if (isPct && hi > 1) { hi = 1; }
      }
      if (cfg.yMin !== undefined) { lo = cfg.yMin; }
      else if (lo < 0) { lo = lo - (hi - lo) * 0.06; }
      if (!(hi > lo)) { hi = lo + 1; }

      /* ---- how much room the category labels need -------------------- */
      c.font = monoFont;
      var maxLabelW = 0;
      for (i = 0; i < n; i++) {
        var lw = c.measureText(list[i].label).width;
        if (lw > maxLabelW) { maxLabelW = lw; }
      }
      var innerW0 = plot.w - plot.pad.l - plot.pad.r;
      var slot0 = n ? innerW0 / n : innerW0;
      var rot = 0;
      if (maxLabelW > slot0 - 6) { rot = (maxLabelW > slot0 * 2) ? 90 : 45; }
      var labelRoom;
      if (rot === 0) { labelRoom = fs + 8; }
      else if (rot === 45) { labelRoom = Math.min(plot.h * 0.42, maxLabelW * 0.71 + 10); }
      else { labelRoom = Math.min(plot.h * 0.45, maxLabelW + 10); }
      plot.pad.b = Math.round(labelRoom + (str(cfg.xLabel, lang) ? fs + 8 : 6) + 6);
      if (plot.pad.b > plot.h * 0.6) { plot.pad.b = Math.round(plot.h * 0.6); }

      plot.setRanges([0, Math.max(1, n)], [lo, hi]);

      var innerW = plot.w - plot.pad.l - plot.pad.r;
      var slot = innerW / Math.max(1, n);
      var barW = Math.max(2, Math.min(slot * 0.74, 72));
      var zeroY = (lo <= 0 && hi >= 0) ? plot.py(0) : plot.py(lo);

      /* ---- gridlines, baseline, y axis ------------------------------- */
      var yt = Stats.ticks(lo, hi, small ? 4 : 5);
      c.lineWidth = 1;
      c.strokeStyle = p.grid;
      c.beginPath();
      for (i = 0; i < yt.length; i++) {
        var Y = Math.round(plot.py(yt[i])) + 0.5;
        c.moveTo(plot.pad.l, Y); c.lineTo(plot.w - plot.pad.r, Y);
      }
      c.stroke();

      c.strokeStyle = p.hairline;
      c.beginPath();
      c.moveTo(plot.pad.l, Math.round(zeroY) + 0.5);
      c.lineTo(plot.w - plot.pad.r, Math.round(zeroY) + 0.5);
      c.moveTo(plot.pad.l + 0.5, plot.pad.t);
      c.lineTo(plot.pad.l + 0.5, plot.h - plot.pad.b);
      c.stroke();

      c.font = sansFont;
      c.fillStyle = p.text2;
      c.textAlign = 'right'; c.textBaseline = 'middle';
      for (i = 0; i < yt.length; i++) {
        c.fillText(tickText(yt[i]), plot.pad.l - 5, plot.py(yt[i]));
      }

      /* ---- the bars -------------------------------------------------- */
      for (i = 0; i < n; i++) {
        var d = list[i];
        var v = isFinite(d.value) ? d.value : 0;
        var cx = plot.pad.l + (i + 0.5) * slot;
        var Yv = plot.py(Math.min(Math.max(v, lo), hi));
        var top = Math.min(Yv, zeroY);
        var hgt = Math.max(1, Math.abs(zeroY - Yv));
        var col = d.color ||
          (d.accent === 2 ? p.accent2 :
           d.accent === 1 ? p.accent :
           cfg.colorBy === 'cycle' ? series[i % series.length] :
           (cfg.barColor || p.accent));
        var x0 = Math.round(cx - barW / 2);
        var bw = Math.max(2, Math.round(barW));
        c.fillStyle = col;
        c.globalAlpha = 0.88;
        c.fillRect(x0, top, bw, hgt);
        c.globalAlpha = 1;
        c.strokeStyle = col;
        c.lineWidth = 1;
        c.strokeRect(x0 + 0.5, Math.round(top) + 0.5, bw - 1, Math.max(1, Math.round(hgt) - 1));

        if (cfg.showValues !== false && slot >= 30) {
          c.font = sansFont;
          c.fillStyle = p.text;
          c.textAlign = 'center';
          if (v >= 0) {
            c.textBaseline = 'bottom';
            c.fillText(valueText(v), cx, Math.max(plot.pad.t + 11, top - 3));
          } else {
            c.textBaseline = 'top';
            c.fillText(valueText(v), cx, Math.min(plot.h - plot.pad.b - 12, top + hgt + 3));
          }
        }

        /* Category labels are quoted token strings, so they are set in
           monospace, and they rotate as soon as a bar is narrower than
           its own label. */
        c.font = monoFont;
        c.fillStyle = p.text2;
        var ly = plot.h - plot.pad.b + 6;
        if (rot === 0) {
          c.textAlign = 'center'; c.textBaseline = 'top';
          c.fillText(d.label, cx, ly);
        } else {
          c.save();
          c.translate(cx, ly + 2);
          c.rotate(-rot * Math.PI / 180);
          c.textAlign = 'right'; c.textBaseline = 'middle';
          c.fillText(d.label, 0, 0);
          c.restore();
        }
      }

      /* ---- axis titles ----------------------------------------------- */
      var yLab = str(cfg.yLabel, lang);
      if (yLab && !small) {
        c.save();
        c.translate(9, plot.pad.t + (plot.h - plot.pad.t - plot.pad.b) / 2);
        c.rotate(-Math.PI / 2);
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillStyle = p.text2;
        c.font = '600 ' + fs + 'px ' + SANS_STACK;
        c.fillText(yLab, 0, 0);
        c.restore();
      }
      var xLab = str(cfg.xLabel, lang);
      if (xLab) {
        c.textAlign = 'center'; c.textBaseline = 'bottom';
        c.fillStyle = p.text2;
        c.font = '600 ' + fs + 'px ' + SANS_STACK;
        c.fillText(xLab, plot.pad.l + innerW / 2, plot.h - 1);
      }

      /* ---- annotations, readouts, text alternative ------------------- */
      if (note) {
        var parts = [];
        cfg.annotations.forEach(function (a) {
          var lab = str(a.label, lang);
          var txt = (typeof a.compute === 'function')
            ? a.compute(rawItems, params, list) : lab;
          if (txt === undefined || txt === null) { return; }
          parts.push((typeof a.compute === 'function' && lab)
            ? lab + ': ' + txt : String(txt));
        });
        note.set(parts.join('   |   '), p, cfg.annotationAccent !== false);
      }

      if (stats) {
        readoutDefs.forEach(function (rd) {
          var val = (typeof rd.compute === 'function')
            ? rd.compute(rawItems, params, list) : undefined;
          if (typeof val === 'string') { stats.set(rd.id, val); return; }
          if (rd.format === 'percent') { stats.set(rd.id, pctText(val, rd.digits)); return; }
          stats.set(rd.id, (val === undefined || val === null || !isFinite(val))
            ? '--' : Number(val).toFixed(rd.digits === undefined ? 3 : rd.digits));
        });
        stats.announce();
      }

      var alt = [];
      for (i = 0; i < Math.min(n, 8); i++) {
        alt.push(list[i].label + ' ' + valueText(list[i].value));
      }
      plot.canvas.setAttribute('aria-label',
        (str(cfg.ariaLabel, lang) || t('plotLabel', lang)) +
        (alt.length ? '. ' + alt.join(', ') + (n > 8 ? ', +' + (n - 8) : '') : ''));
    }

    if (paramDefs.length) {
      params = sliderBlock(root, paramDefs, lang, function () { draw(); });
      var startValues = defaultsOf(paramDefs);
      buttonBlock(root, [{
        text: t('reset', lang), secondary: true,
        onClick: function () { setSliders(root, paramDefs, params, startValues); }
      }]);
    }

    captionBlock(root, cfg, lang);
    wireDraw(plot, draw);
  }

  /* ======================================================================
     13. Primitive: tokens
     A text strip cut into coloured chips, one chip per token, with the
     integer vocabulary id under every chip.

       Sim.mount({
         type: 'tokens',
         title: {en, es},
         examples: [{text: 'Bakersfield',
                     pieces: ['B', 'akers', 'field'],
                     ids: [33, 8312, 2566]}, ...],
         caption: {en, es}
       });

     Colour cycles across the chips so the cut points are obvious, and it
     never carries the meaning by itself: the position sits above each
     chip and the id sits below it. An id that was not recorded prints as
     "?", never as a guess.
     ====================================================================== */

  function tokensSim(cfg, lang) {
    var root = shell(cfg, lang);
    var examples = (cfg.examples || []).filter(function (e) { return !!e; });
    var idx = 0;

    var strip = el('div', 'sim-token-strip', root);
    var srcLine = el('div', 'sim-token-source', strip);
    var chipRow = el('div', 'sim-token-chips', strip);
    chipRow.setAttribute('role', 'list');

    var defs = cfg.readouts || [
      { id: 'tokens', label: t('tokenCount', lang), accent: 1 },
      { id: 'chars',  label: t('charCount', lang) },
      { id: 'cpt',    label: t('charsPerTok', lang), accent: 2, digits: 2 }
    ];
    var stats = statBlock(root, defs, lang);
    var series = accentSeries();
    var btnWrap = null;

    function currentExample() {
      return examples[idx] || { text: '', pieces: [], ids: [] };
    }

    function render() {
      var pal = palette();
      var dark = isDarkTheme(pal);
      var ex = currentExample();
      var pieces = ex.pieces || [];
      var ids = ex.ids || [];
      var text = (ex.text === undefined || ex.text === null)
        ? pieces.join('') : String(ex.text);

      strip.style.background = pal.surface;
      strip.style.border = '1px solid ' + pal.hairline;
      strip.style.borderRadius = '10px';
      strip.style.padding = '12px';

      srcLine.textContent = escapeToken(text);
      srcLine.style.fontFamily = MONO_STACK;
      srcLine.style.fontSize = '0.9375rem';
      srcLine.style.color = pal.text2;
      srcLine.style.whiteSpace = 'pre-wrap';
      srcLine.style.wordBreak = 'break-word';
      srcLine.style.margin = '0 0 10px';
      srcLine.style.paddingBottom = '8px';
      srcLine.style.borderBottom = '1px solid ' + pal.hairline;

      chipRow.style.display = 'flex';
      chipRow.style.flexWrap = 'wrap';
      chipRow.style.gap = '6px';
      chipRow.style.alignItems = 'flex-end';

      while (chipRow.firstChild) { chipRow.removeChild(chipRow.firstChild); }

      for (var i = 0; i < pieces.length; i++) {
        var col = series[i % series.length];
        var hasId = ids && ids[i] !== undefined && ids[i] !== null;
        var chip = el('span', 'sim-token-chip', chipRow);
        chip.setAttribute('role', 'listitem');
        chip.style.display = 'inline-flex';
        chip.style.flexDirection = 'column';
        chip.style.alignItems = 'center';
        chip.style.gap = '1px';
        chip.style.padding = '4px 7px';
        chip.style.borderRadius = '8px';
        chip.style.border = '1px solid ' + col;
        chip.style.background = hexToRgba(col, dark ? 0.26 : 0.14);
        chip.style.minWidth = '0';

        var pos = el('span', 'sim-token-index', chip);
        pos.textContent = String(i + 1);
        pos.style.fontFamily = SANS_STACK;
        pos.style.fontSize = '0.625rem';
        pos.style.lineHeight = '1.1';
        pos.style.color = pal.text2;

        var piece = el('span', 'sim-token-piece', chip);
        piece.style.fontFamily = MONO_STACK;
        piece.style.fontSize = '0.9375rem';
        piece.style.fontWeight = '600';
        piece.style.lineHeight = '1.25';
        piece.style.color = pal.text;
        piece.style.whiteSpace = 'pre';
        /* Many tokens begin with a space, and that space is part of the
           token. It is drawn as a rule under the blank rather than as a
           substitute character, so the text a screen reader reads is still
           the token itself. */
        var raw = escapeToken(pieces[i]);
        var runs = /^( *)([\s\S]*?)( *)$/.exec(raw) || ['', '', raw, ''];
        [runs[1], runs[2], runs[3]].forEach(function (part, j) {
          if (!part) { return; }
          var sp = el('span', null, piece);
          sp.textContent = part;
          if (j !== 1) {
            sp.style.borderBottom = '2px solid ' + col;
            sp.style.opacity = '0.75';
          }
        });

        var idEl = el('span', 'sim-token-id', chip);
        idEl.textContent = hasId ? String(ids[i]) : '?';
        idEl.style.fontFamily = MONO_STACK;
        idEl.style.fontSize = '0.6875rem';
        idEl.style.lineHeight = '1.2';
        idEl.style.fontVariantNumeric = 'tabular-nums';
        idEl.style.color = pal.text2;

        chip.setAttribute('title', "'" + raw + "'");
        chip.setAttribute('aria-label',
          'token ' + (i + 1) + ', "' + raw + '", ' +
          (hasId ? 'id ' + ids[i] : 'id not recorded'));
      }

      var nTok = pieces.length;
      var nChar = text.length;
      stats.set('tokens', String(nTok));
      stats.set('chars', String(nChar));
      stats.set('cpt', nTok ? (nChar / nTok).toFixed(2) : '--');
      defs.forEach(function (d) {
        if (typeof d.compute !== 'function') { return; }
        var v = d.compute(ex, idx);
        stats.set(d.id, typeof v === 'string' ? v
          : (isFinite(v) ? Number(v).toFixed(d.digits === undefined ? 2 : d.digits) : '--'));
      });
      stats.announce();

      if (btnWrap && btnWrap.childNodes) {
        for (var k = 0; k < btnWrap.childNodes.length; k++) {
          var b = btnWrap.childNodes[k];
          if (!b || b.className === undefined) { continue; }
          b.className = 'sim-btn' + (k === idx ? '' : ' is-secondary');
          if (b.setAttribute) { b.setAttribute('aria-pressed', k === idx ? 'true' : 'false'); }
        }
      }
    }

    if (examples.length > 1) {
      btnWrap = buttonBlock(root, examples.map(function (ex, i) {
        var label = str(ex.label, lang) ||
          escapeToken(ex.text === undefined ? (ex.pieces || []).join('') : ex.text);
        if (label.length > 22) { label = label.slice(0, 21) + '...'; }
        return {
          text: label,
          secondary: i !== 0,
          onClick: function () { idx = i; render(); }
        };
      }));
    }

    /* A theme change calls every entry in instances. This sim draws no
       canvas, so it registers its restyle directly instead of going
       through wireDraw. */
    instances.push(render);

    captionBlock(root, cfg, lang, t('tokenHint', lang));
    render();
  }

  /* ======================================================================
     14. Primitive: quantize
     A number line of the levels a fixed bit width can represent, the true
     value, the level it snaps to, and the error between them.

       Sim.mount({
         type: 'quantize',
         title: {en, es},
         value: -0.02697754,
         params: [{id:'bits', ...}, {id:'scaleMax', ...}],
         presets: [{label:{en,es}, set:{bits:4, scaleMax:1.2265625}}],
         caption: {en, es}
       });

     The scheme is the symmetric integer quantizer the lab script uses:
     with b bits the codes run from -(2^(b-1) - 1) to +(2^(b-1) - 1), the
     gap between levels is scaleMax / (2^(b-1) - 1), and the value is
     rounded to the nearest code. Nothing is hard coded here: the snapped
     value and the error are computed from the value and the two sliders,
     which is why dragging scaleMax from a tensor-wide maximum down to a
     block maximum reproduces the measured blockwise result instead of
     asserting it.

     Two panels: the whole scale, where the levels are visibly spent on a
     range nothing occupies, and a zoom on the true value, where the
     snapped value and the error segment are readable.
     ====================================================================== */

  function quantizeSim(cfg, lang) {
    var root = shell(cfg, lang);
    var value = (cfg.value === undefined) ? 0 : Number(cfg.value);

    var fullWrap = el('div', 'sim-plot-wrap', root);
    var full = Plot(fullWrap, {
      ratio: 0.32, minHeight: 150, maxHeight: 240, noYAxis: true,
      ariaLabel: str(cfg.fullAriaLabel, lang) || t('fullScale', lang)
    });
    var zoomWrap = el('div', 'sim-plot-wrap', root);
    var zoom = Plot(zoomWrap, {
      ratio: 0.32, minHeight: 150, maxHeight: 240, noYAxis: true,
      ariaLabel: str(cfg.zoomAriaLabel, lang) || t('zoomNote', lang)
    });

    var paramDefs = cfg.params || [
      { id: 'bits', label: { en: 'Bits per number', es: 'Bits por numero' },
        min: 2, max: 8, step: 1, value: 4, digits: 0 },
      { id: 'scaleMax', label: { en: 'Scale maximum', es: 'Maximo de la escala' },
        min: 0.05, max: 1.5, step: 0.0001, value: 1, digits: 4 }
    ];
    var params = {};

    var defs = cfg.readouts || [
      { id: 'levels',  label: t('levels', lang) },
      { id: 'step',    label: t('stepSize', lang), digits: 6 },
      { id: 'snapped', label: t('snappedValue', lang), accent: 1, digits: 8 },
      { id: 'err',     label: t('roundError', lang), accent: 2, digits: 8 },
      { id: 'rel',     label: t('relError', lang), digits: 1 }
    ];
    var stats = statBlock(root, defs, lang);

    function quant() {
      var bits = Math.max(2, Math.round(params.bits === undefined ? 4 : params.bits));
      var sMax = Math.abs(params.scaleMax === undefined ? 1 : params.scaleMax);
      if (!(sMax > 0)) { sMax = 1e-9; }
      var qmax = Math.pow(2, bits - 1) - 1;
      if (qmax < 1) { qmax = 1; }
      var step = sMax / qmax;
      var code = Math.round(value / step);
      if (code > qmax) { code = qmax; }
      if (code < -qmax) { code = -qmax; }
      var snapped = code * step;
      return {
        bits: bits, sMax: sMax, qmax: qmax, step: step, code: code,
        snapped: snapped, err: snapped - value, levels: Math.pow(2, bits)
      };
    }

    /* One panel. Rows are laid out from a fixed block so that nothing
       overlaps at any width: error label, error segment, true-value
       label, true-value dot, the axis with its levels, the axis numbers,
       then the snapped label. */
    function drawPanel(plot, q, xr, isFull) {
      var c = plot.ctx, p = plot.pal;
      plot.clear();
      plot.setRanges(xr, [0, 1]);
      var small = plot.w < 420;
      var fs = small ? 10 : 11;
      var block = 122;
      var innerH = plot.h - plot.pad.t - plot.pad.b;
      var top = plot.pad.t + Math.max(0, (innerH - block) / 2);
      var errLabelY = top + 2;
      var errSegY = top + 22;
      var trueLabelY = top + 36;
      var dotY = top + 60;
      var axisY = Math.round(top + 78) + 0.5;
      var numY = axisY + 12;
      var snapLabelY = axisY + 28;
      var span = xr[1] - xr[0];
      var dg = digitsForSpan(span);

      c.lineWidth = 1;
      c.strokeStyle = p.hairline;
      c.beginPath();
      c.moveTo(plot.pad.l, axisY);
      c.lineTo(plot.w - plot.pad.r, axisY);
      c.stroke();

      /* the representable levels */
      var kLo = Math.ceil(xr[0] / q.step), kHi = Math.floor(xr[1] / q.step);
      if (kLo < -q.qmax) { kLo = -q.qmax; }
      if (kHi > q.qmax) { kHi = q.qmax; }
      var count = kHi - kLo + 1;
      var every = 1;
      if (count > 600) { every = Math.ceil(count / 600); }
      var dense = count > 1 && (plot.w - plot.pad.l - plot.pad.r) / count < 3;
      c.strokeStyle = p.text2;
      c.globalAlpha = dense ? 0.45 : 0.9;
      c.beginPath();
      for (var k = kLo; k <= kHi; k += every) {
        var X = Math.round(plot.px(k * q.step)) + 0.5;
        var tall = (k === 0) ? 11 : 6;
        c.moveTo(X, axisY - tall); c.lineTo(X, axisY + tall);
      }
      c.stroke();
      c.globalAlpha = 1;

      /* axis numbers */
      c.font = fs + 'px ' + SANS_STACK;
      c.fillStyle = p.text2;
      c.textAlign = 'center'; c.textBaseline = 'top';
      var at = Stats.ticks(xr[0], xr[1], small ? 3 : 5);
      for (var i = 0; i < at.length; i++) {
        c.fillText(numText(at[i], dg), plot.px(at[i]), numY);
      }

      var Xt = plot.px(value), Xs = plot.px(q.snapped);

      /* the error, as a labelled segment with a stem down to each end */
      c.save();
      c.strokeStyle = p.text2;
      c.globalAlpha = 0.55;
      c.setLineDash([3, 3]);
      c.lineWidth = 1;
      c.beginPath();
      c.moveTo(Xt, errSegY); c.lineTo(Xt, dotY);
      c.moveTo(Xs, errSegY); c.lineTo(Xs, axisY);
      c.stroke();
      c.restore();

      c.strokeStyle = p.accent2;
      c.lineWidth = 2;
      c.beginPath();
      c.moveTo(Xt, errSegY); c.lineTo(Xs, errSegY);
      c.moveTo(Xt, errSegY - 5); c.lineTo(Xt, errSegY + 5);
      c.moveTo(Xs, errSegY - 5); c.lineTo(Xs, errSegY + 5);
      c.stroke();

      /* the snapped value: a square turned on its point, on the line */
      c.save();
      c.translate(Xs, axisY);
      c.rotate(Math.PI / 4);
      c.fillStyle = p.bg;
      c.strokeStyle = p.accent;
      c.lineWidth = 2.5;
      c.fillRect(-5, -5, 10, 10);
      c.strokeRect(-5, -5, 10, 10);
      c.restore();

      /* the true value: a filled dot above the line */
      c.fillStyle = p.accent2;
      c.beginPath();
      c.arc(Xt, dotY, 5, 0, 2 * Math.PI);
      c.fill();
      c.strokeStyle = p.bg;
      c.lineWidth = 1.5;
      c.stroke();

      /* labels, clamped so none of them runs off the panel */
      function place(text, x, y, color) {
        c.font = '600 ' + fs + 'px ' + SANS_STACK;
        var tw = c.measureText(text).width;
        var lx = Math.min(Math.max(x, plot.pad.l + tw / 2 + 2),
                          plot.w - plot.pad.r - tw / 2 - 2);
        c.fillStyle = p.bg;
        c.globalAlpha = 0.88;
        c.fillRect(lx - tw / 2 - 3, y - 1, tw + 6, fs + 5);
        c.globalAlpha = 1;
        c.fillStyle = color;
        c.textAlign = 'center'; c.textBaseline = 'top';
        c.fillText(text, lx, y);
      }
      place(t('roundError', lang) + ' ' + sigText(q.err, 4),
            (Xt + Xs) / 2, errLabelY, p.accent2);
      place(t('trueValue', lang) + ' ' + sigText(value, 4), Xt, trueLabelY, p.accent2);
      place(t('snappedValue', lang) + ' ' + sigText(q.snapped, 4), Xs, snapLabelY, p.accent);

      c.font = fs + 'px ' + SANS_STACK;
      c.fillStyle = p.text2;
      c.textAlign = 'left'; c.textBaseline = 'top';
      if (every > 1) {
        c.fillText(t('showingEvery', lang) + every + t('nthLevel', lang),
                   plot.pad.l, plot.pad.t);
      }
      c.textAlign = 'right';
      c.fillText(isFull ? t('fullScale', lang) : t('zoomNote', lang),
                 plot.w - plot.pad.r, plot.pad.t);
    }

    function drawFull() {
      var q = quant();
      drawPanel(full, q, [-q.sMax * 1.08, q.sMax * 1.08], true);
      full.canvas.setAttribute('aria-label',
        (str(cfg.fullAriaLabel, lang) || t('fullScale', lang)) + '. ' +
        t('levels', lang) + ' ' + q.levels + ', ' +
        t('stepSize', lang) + ' ' + numText(q.step, 6) + ', ' +
        t('trueValue', lang) + ' ' + numText(value, 8) + ', ' +
        t('snappedValue', lang) + ' ' + numText(q.snapped, 8));
    }

    function drawZoom() {
      var q = quant();
      var half = Math.max(1.8 * q.step, 3 * Math.abs(q.err),
                          1.5 * Math.abs(value), 1e-7);
      drawPanel(zoom, q, [value - half, value + half], false);
      zoom.canvas.setAttribute('aria-label',
        (str(cfg.zoomAriaLabel, lang) || t('zoomNote', lang)) + '. ' +
        t('roundError', lang) + ' ' + numText(q.err, 8));
    }

    function readouts() {
      var q = quant();
      defs.forEach(function (d) {
        var v;
        if (typeof d.compute === 'function') { v = d.compute(q, params, value); }
        else if (d.id === 'levels') { stats.set('levels', String(q.levels)); return; }
        else if (d.id === 'step') { v = q.step; }
        else if (d.id === 'snapped') { v = q.snapped; }
        else if (d.id === 'err') { v = q.err; }
        else if (d.id === 'rel') {
          stats.set('rel', value === 0 ? '--'
            : pctText(Math.abs(q.err) / Math.abs(value),
                      d.digits === undefined ? 1 : d.digits));
          return;
        }
        if (typeof v === 'string') { stats.set(d.id, v); return; }
        stats.set(d.id, numText(v, d.digits === undefined ? 6 : d.digits));
      });
      stats.announce();
    }

    function drawBoth() { drawFull(); drawZoom(); readouts(); }

    params = sliderBlock(root, paramDefs, lang, drawBoth);
    var startValues = defaultsOf(paramDefs);

    var btns = [];
    (cfg.presets || []).forEach(function (ps) {
      btns.push({
        text: str(ps.label, lang), secondary: true,
        onClick: function () {
          setSliders(root, paramDefs, params, ps.set || {});
          drawBoth();
        }
      });
    });
    btns.push({
      text: t('reset', lang), secondary: true,
      onClick: function () {
        setSliders(root, paramDefs, params, startValues);
        drawBoth();
      }
    });
    buttonBlock(root, btns);

    captionBlock(root, cfg, lang, t('quantHint', lang));

    wireDraw(full, function () { drawFull(); readouts(); });
    wireDraw(zoom, drawZoom);
  }

  /* ======================================================================
     15. Primitive: vectors2d
     Two draggable arrows from the origin, with the angle between them and
     readouts for the dot product, both lengths, the cosine and the angle.

       Sim.mount({
         type: 'vectors2d',
         title: {en, es},
         a: {x: 3, y: 4}, b: {x: 4, y: 3},
         range: [-6, 6],
         snap: 0.25,
         presets: [{label:{en,es}, b:{x:6, y:8}}],
         caption: {en, es}
       });

     The pixel scale is forced to be equal on both axes, so a right angle
     looks like a right angle and the arc is a real arc. Tips snap to a
     grid, 0.25 by default, so that b can be dragged to exactly twice a
     and the cosine reads exactly 1. That is the lesson, and a free drag
     would give 0.9998 instead.
     ====================================================================== */

  function vectorsSim(cfg, lang) {
    var root = shell(cfg, lang);
    var wrap = el('div', 'sim-plot-wrap', root);
    var plot = Plot(wrap, {
      focusable: true,
      /* Squarish, but capped: the pixel scale is equal on both axes, so an
         uncapped wide screen would spend 800px of height on two arrows. */
      ratio: cfg.ratio === undefined ? 0.80 : cfg.ratio,
      minHeight: cfg.minHeight === undefined ? 300 : cfg.minHeight,
      maxHeight: cfg.maxHeight === undefined ? 560 : cfg.maxHeight,
      ariaLabel: str(cfg.ariaLabel, lang) || t('plotLabel', lang)
    });

    var range = cfg.range || [-6, 6];
    var yRange = cfg.yRange || range;
    var snap = cfg.snap === undefined ? 0.25 : cfg.snap;
    var nameA = str(cfg.labelA, lang) || 'a';
    var nameB = str(cfg.labelB, lang) || 'b';

    var start = [
      { x: (cfg.a && cfg.a.x) || 0, y: (cfg.a && cfg.a.y) || 0 },
      { x: (cfg.b && cfg.b.x) || 0, y: (cfg.b && cfg.b.y) || 0 }
    ];
    var vecs = start.map(function (v) { return { x: v.x, y: v.y }; });
    var active = 1;

    var defs = cfg.readouts || [
      { id: 'dot', label: t('dotProduct', lang), accent: 1, digits: 4 },
      { id: 'la',  label: t('lenA', lang), digits: 4 },
      { id: 'lb',  label: t('lenB', lang), digits: 4 },
      { id: 'cos', label: t('cosine', lang), accent: 2, digits: 4 },
      { id: 'ang', label: t('angleDeg', lang), digits: 2 }
    ];
    var stats = statBlock(root, defs, lang);

    function geometry() {
      var a = vecs[0], b = vecs[1];
      var dot = a.x * b.x + a.y * b.y;
      var la = Math.sqrt(a.x * a.x + a.y * a.y);
      var lb = Math.sqrt(b.x * b.x + b.y * b.y);
      var cos = (la > 0 && lb > 0) ? dot / (la * lb) : NaN;
      var clamped = isFinite(cos) ? Math.min(1, Math.max(-1, cos)) : NaN;
      return {
        dot: dot, la: la, lb: lb, cos: cos,
        ang: isFinite(clamped) ? Math.acos(clamped) * 180 / Math.PI : NaN
      };
    }

    /* Equal pixels per unit on both axes, with the requested window always
       inside the visible one. */
    function isotropic() {
      var innerW = plot.w - plot.pad.l - plot.pad.r;
      var innerH = plot.h - plot.pad.t - plot.pad.b;
      var spanX = range[1] - range[0], spanY = yRange[1] - yRange[0];
      if (!(spanX > 0)) { spanX = 1; }
      if (!(spanY > 0)) { spanY = 1; }
      var unit = Math.min(innerW / spanX, innerH / spanY);
      if (!(unit > 0)) { unit = 1; }
      var cx = (range[0] + range[1]) / 2, cy = (yRange[0] + yRange[1]) / 2;
      plot.setRanges([cx - innerW / unit / 2, cx + innerW / unit / 2],
                     [cy - innerH / unit / 2, cy + innerH / unit / 2]);
    }

    function arrow(c, ox, oy, X, Y, color, dash, label, isActive, pal) {
      c.save();
      c.strokeStyle = color;
      c.lineWidth = 3;
      c.lineCap = 'round';
      if (dash) { c.setLineDash(dash); }
      c.beginPath();
      c.moveTo(ox, oy); c.lineTo(X, Y);
      c.stroke();
      c.restore();

      var dx = X - ox, dy = Y - oy;
      var len = Math.sqrt(dx * dx + dy * dy);
      if (len > 1) {
        var ux = dx / len, uy = dy / len;
        var head = Math.min(14, len * 0.4);
        c.save();
        c.fillStyle = color;
        c.beginPath();
        c.moveTo(X, Y);
        c.lineTo(X - head * ux + head * 0.42 * uy, Y - head * uy - head * 0.42 * ux);
        c.lineTo(X - head * ux - head * 0.42 * uy, Y - head * uy + head * 0.42 * ux);
        c.closePath();
        c.fill();
        c.restore();
      }

      if (isActive) {
        c.save();
        c.strokeStyle = color;
        c.lineWidth = 1.5;
        c.globalAlpha = 0.65;
        c.beginPath();
        c.arc(X, Y, 13, 0, 2 * Math.PI);
        c.stroke();
        c.restore();
      }

      c.font = '700 13px ' + SANS_STACK;
      var tw = c.measureText(label).width;
      var lx = X + (dx >= 0 ? 12 : -12 - tw);
      var ly = Y + (dy >= 0 ? 8 : -20);
      lx = Math.min(Math.max(lx, plot.pad.l + 2), plot.w - plot.pad.r - tw - 2);
      ly = Math.min(Math.max(ly, plot.pad.t + 2), plot.h - plot.pad.b - 16);
      c.fillStyle = pal.bg;
      c.globalAlpha = 0.85;
      c.fillRect(lx - 3, ly - 1, tw + 6, 17);
      c.globalAlpha = 1;
      c.fillStyle = color;
      c.textAlign = 'left'; c.textBaseline = 'top';
      c.fillText(label, lx, ly);
    }

    function draw() {
      isotropic();
      plot.clear();
      var c = plot.ctx, p = plot.pal;
      plot.axes({ xLabel: str(cfg.xLabel, lang), yLabel: str(cfg.yLabel, lang) });

      /* the two axes through the origin, so directions stay readable */
      c.save();
      c.strokeStyle = p.hairline;
      c.lineWidth = 1.5;
      c.beginPath();
      c.moveTo(plot.pad.l, Math.round(plot.py(0)) + 0.5);
      c.lineTo(plot.w - plot.pad.r, Math.round(plot.py(0)) + 0.5);
      c.moveTo(Math.round(plot.px(0)) + 0.5, plot.pad.t);
      c.lineTo(Math.round(plot.px(0)) + 0.5, plot.h - plot.pad.b);
      c.stroke();
      c.restore();

      var ox = plot.px(0), oy = plot.py(0);
      var Ax = plot.px(vecs[0].x), Ay = plot.py(vecs[0].y);
      var Bx = plot.px(vecs[1].x), By = plot.py(vecs[1].y);
      var g = geometry();

      /* the angle arc, drawn in pixel space so it is a true circular arc */
      var lenA = Math.sqrt((Ax - ox) * (Ax - ox) + (Ay - oy) * (Ay - oy));
      var lenB = Math.sqrt((Bx - ox) * (Bx - ox) + (By - oy) * (By - oy));
      if (lenA > 8 && lenB > 8 && isFinite(g.ang)) {
        var angA = Math.atan2(Ay - oy, Ax - ox);
        var angB = Math.atan2(By - oy, Bx - ox);
        var d = angB - angA;
        while (d > Math.PI) { d -= 2 * Math.PI; }
        while (d <= -Math.PI) { d += 2 * Math.PI; }
        var r = Math.min(38, lenA * 0.55, lenB * 0.55);
        c.save();
        c.strokeStyle = p.text2;
        c.lineWidth = 1.5;
        c.beginPath();
        c.arc(ox, oy, r, angA, angA + d, d < 0);
        c.stroke();
        c.restore();

        /* On a small angle the bisector runs along both arrows, so the
           label box is opaque and sits clear of the arc. */
        var mid = angA + d / 2;
        var label = g.ang.toFixed(1) + ' deg';
        c.font = '600 12px ' + SANS_STACK;
        var tw = c.measureText(label).width;
        var out = r + (Math.abs(g.ang) < 30 ? 30 : 20);
        var lx = ox + Math.cos(mid) * out - tw / 2;
        var ly = oy + Math.sin(mid) * out - 7;
        lx = Math.min(Math.max(lx, plot.pad.l + 2), plot.w - plot.pad.r - tw - 2);
        ly = Math.min(Math.max(ly, plot.pad.t + 2), plot.h - plot.pad.b - 15);
        c.fillStyle = p.bg;
        c.fillRect(lx - 3, ly - 1, tw + 6, 16);
        c.fillStyle = p.text;
        c.textAlign = 'left'; c.textBaseline = 'top';
        c.fillText(label, lx, ly);
      }

      /* a is solid in accent 1, b is dashed in accent 2, and both carry
         their name at the tip, so the pair is never told apart by colour
         alone. */
      arrow(c, ox, oy, Ax, Ay, p.accent, null, nameA, active === 0, p);
      arrow(c, ox, oy, Bx, By, p.accent2, [7, 4], nameB, active === 1, p);

      c.fillStyle = p.text;
      c.beginPath();
      c.arc(ox, oy, 3, 0, 2 * Math.PI);
      c.fill();

      defs.forEach(function (d) {
        var v;
        if (typeof d.compute === 'function') { v = d.compute(vecs[0], vecs[1], g); }
        else { v = g[d.id]; }
        if (typeof v === 'string') { stats.set(d.id, v); return; }
        stats.set(d.id, (v === undefined || v === null || !isFinite(v))
          ? '--' : Number(v).toFixed(d.digits === undefined ? 4 : d.digits));
      });
      stats.announce();

      plot.canvas.setAttribute('aria-label',
        (str(cfg.ariaLabel, lang) || t('plotLabel', lang)) + '. ' +
        nameA + ' = (' + numText(vecs[0].x, 2) + ', ' + numText(vecs[0].y, 2) + '), ' +
        nameB + ' = (' + numText(vecs[1].x, 2) + ', ' + numText(vecs[1].y, 2) + '), ' +
        t('cosine', lang) + ' ' + numText(g.cos, 4) + ', ' +
        t('angleDeg', lang) + ' ' + numText(g.ang, 2));
    }

    var redraw = wireDraw(plot, draw);

    function snapTo(v) {
      if (!(snap > 0)) { return v; }
      return Math.round(v / snap) * snap;
    }
    function clampVec(v) {
      v.x = Math.min(range[1], Math.max(range[0], snapTo(v.x)));
      v.y = Math.min(yRange[1], Math.max(yRange[0], snapTo(v.y)));
    }

    var dragging = -1;
    function nearestTip(px, py) {
      var best = -1, bd = Infinity;
      for (var i = 0; i < vecs.length; i++) {
        var dx = plot.px(vecs[i].x) - px, dy = plot.py(vecs[i].y) - py;
        var d2 = dx * dx + dy * dy;
        if (d2 < bd) { bd = d2; best = i; }
      }
      /* 26px grab radius: a fingertip does not have to be precise. */
      return bd <= 26 * 26 ? best : -1;
    }

    plot.canvas.addEventListener('pointerdown', function (ev) {
      var q = plot.pos(ev);
      var i = nearestTip(q.x, q.y);
      if (i < 0) { return; }
      dragging = i; active = i;
      plot.canvas.setPointerCapture(ev.pointerId);
      ev.preventDefault();
      draw();
    });

    plot.canvas.addEventListener('pointermove', function (ev) {
      if (dragging < 0) { return; }
      var q = plot.pos(ev);
      vecs[dragging].x = plot.ux(q.x);
      vecs[dragging].y = plot.uy(q.y);
      clampVec(vecs[dragging]);
      ev.preventDefault();
      draw();
    });

    function endDrag(ev) {
      if (dragging < 0) { return; }
      dragging = -1;
      if (ev && ev.pointerId !== undefined && plot.canvas.hasPointerCapture &&
          plot.canvas.hasPointerCapture(ev.pointerId)) {
        plot.canvas.releasePointerCapture(ev.pointerId);
      }
      draw();
    }
    plot.canvas.addEventListener('pointerup', endDrag);
    plot.canvas.addEventListener('pointercancel', endDrag);

    plot.canvas.addEventListener('keydown', function (ev) {
      var k = ev.key;
      var stp = snap > 0 ? snap : (range[1] - range[0]) / 40;
      if (k === 'ArrowLeft' || k === 'ArrowRight' || k === 'ArrowUp' || k === 'ArrowDown') {
        var v = vecs[active];
        if (k === 'ArrowLeft') { v.x -= stp; }
        if (k === 'ArrowRight') { v.x += stp; }
        if (k === 'ArrowUp') { v.y += stp; }
        if (k === 'ArrowDown') { v.y -= stp; }
        clampVec(v);
        ev.preventDefault();
        draw();
      } else if (k === 'n' || k === 'N' || k === ' ') {
        active = (active + 1) % vecs.length;
        ev.preventDefault();
        draw();
      }
    });

    var btns = [];
    (cfg.presets || []).forEach(function (ps) {
      btns.push({
        text: str(ps.label, lang), secondary: true,
        onClick: function () {
          if (ps.a) { vecs[0] = { x: ps.a.x, y: ps.a.y }; }
          if (ps.b) { vecs[1] = { x: ps.b.x, y: ps.b.y }; }
          clampVec(vecs[0]); clampVec(vecs[1]);
          draw();
        }
      });
    });
    btns.push({
      text: t('reset', lang), secondary: true,
      onClick: function () {
        vecs = start.map(function (v) { return { x: v.x, y: v.y }; });
        active = 1;
        draw();
      }
    });
    buttonBlock(root, btns);

    captionBlock(root, cfg, lang, t('vectorHint', lang));
    redraw();
  }

  /* ===== end MATH 3219 additions ======================================= */

  /* ======================================================================
     11. Public entry point
     ====================================================================== */

  var BUILDERS = {
    'scatter-drag': scatterDrag,
    'sliders': sliderSim,
    'sampling': samplingSim,
    'resample': resampleSim,
    'curve': curveSim
  };

  /* ===== MATH 3219 additions - language-model primitives ===== */
  BUILDERS.bars = barsSim;
  BUILDERS.tokens = tokensSim;
  BUILDERS.quantize = quantizeSim;
  BUILDERS.vectors2d = vectorsSim;

  var Sim = {
    Stats: Stats,
    LABELS: LABELS,
    version: '1.0.0',

    mount: function (cfg) {
      var lang = detectLang(cfg.lang);
      document.documentElement.setAttribute('lang', lang);
      var build = BUILDERS[cfg.type];
      if (!build) {
        var host = document.getElementById(cfg.mount || 'sim') || document.body;
        host.textContent = 'Unknown sim type: ' + cfg.type;
        return;
      }
      var start = function () {
        wireTheme();
        build(cfg, lang);
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
      } else {
        start();
      }
    }
  };

  global.Sim = Sim;
}(typeof window !== 'undefined' ? window : this));
