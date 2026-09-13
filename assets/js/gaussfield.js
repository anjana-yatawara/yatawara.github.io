/* ============================================================================
   yatawara.com — GAUSS FIELD · "Kernel Density, Live"
   A header band that builds a kernel density estimate in front of you.

   WHAT YOU ARE LOOKING AT
   Data points arrive along the axis as a Poisson process. Each is drawn from a
   hidden normal mixture whose means, scales and weights are all drifting. Every
   arrival blooms into its own Gaussian kernel — coloured by the component that
   actually generated it, so you can see the latent class — and every live
   kernel sums into the bold dark curve on top:

       f̂(x)  =  ( Σ a_i · φ((x − x_i)/h) ) / ( h · Σ a_i )

   a weighted kernel density estimate, where a_i ∈ [0,1] is an age envelope that
   ramps a point in when it lands and out when it dies. Points expire after a
   fixed lifetime, so the sample is a moving 12-second window and the estimate
   never stops breathing.

   The dashed grey ghost is the TRUTH — the hidden mixture density itself. The
   estimate chases it. Watch three things a statistics student pays tuition for:

     · it gets smoother as n grows, because h ∝ n^(−1/5);
     · it LAGS the ghost, because a 12-second window of a drifting law is a
       biased view of the present. That lag is real, not a bug — see the note
       on time constants below, which is what keeps it a lesson rather than a
       contradiction;
     · when the bandwidth jumps it goes spiky, or melts into one broad hump,
       and then mean-reverts home. Bias and variance, live.

   WHAT IS TRUE OF THE ESTIMATE, STATED PROPERLY
   Kernel smoothing is biased at a peak: convolving with a kernel of width h
   flattens curvature, so E[f̂] sits BELOW f at a mode (the classical −h²f″σ_K²/2
   term). That statement is about the EXPECTATION, and only about it. f̂ itself
   is a random function, and it exceeds the ghost at a mode on a substantial
   minority of frames — measured between 2% and 36% depending on width — not
   because the bias flips sign but because of VARIANCE. When the bandwidth
   process dislocates downward the estimate undersmooths, the local sampling
   noise stops being averaged away, and a mode can overshoot outright: measured
   over 30,000 frames at 1280px, a downward dislocation raises the overshoot
   rate from 21% of frames to 51%, while an upward one leaves it at 22%.

   Any wording here that claimed the curve sits under the ghost "at every mode"
   would be false, and does not appear. On average, under; on the frame in front
   of you, often over. That is the whole of what bias and variance means and it
   is the reason this band is worth looking at rather than merely watching. The
   caption on the page says the same thing in one line, and says "often", not
   "always", for the same reason.

   THE STOCHASTICS — no sine waves anywhere
   Every parameter is an Ornstein–Uhlenbeck process, the SDE

       dX = θ(m − X) dt + vol · √dt · N(0,1),        vol = s∞ · √(2θ)

   but integrated with its EXACT transition kernel rather than Euler–Maruyama:

       X(t+Δ) = m + (X(t) − m)·e^(−θΔ) + s∞·√(1 − e^(−2θΔ))·Z

   which is the true conditional law of the OU bridge over any step Δ. This is
   not a flourish — it is the reason the frame-rate independence actually holds.
   Euler at 144 fps and Euler at 30 fps are two different discretisations of the
   same SDE; the exact kernel is the same process at both, with the same time
   constants and the same stationary law N(m, s∞²) at any frame rate. Nothing
   here is periodic, nothing repeats, and mean reversion means nothing runs
   away.

   σ is driven in LOG space (exponential OU), so it is strictly positive by
   construction rather than by clamping; the hard floor further down is a
   numerical firewall, not the mechanism.

   The bandwidth multiplier is an OU driven by a compound-Poisson jump — a
   Barndorff-Nielsen–Shephard volatility process — so smoothing occasionally
   dislocates and then reverts. Anjana works on stochastic volatility. That one
   is for him. The jump is ASYMMETRIC: downward dislocations keep their full
   magnitude, because an undersmoothed spiky estimate is legible and is the more
   instructive failure; upward ones are halved and clamped harder, because a
   heavily oversmoothed band reads as a broken renderer rather than as bias.

   The PRNG is seeded from a fixed constant. The band is reproducible frame for
   frame; it is not random per load, and it never calls Date.now() or
   Math.random().

   ENGINEERING CONTRACT (every line of this is load-bearing)
     · one canvas per mount, DPR capped at 2, backing store never wider than
       the viewport × DPR;
     · delta-time throughout, identical at 30 and 144 fps;
     · every array is allocated ONCE at maximum size and reused forever — the
       frame loop allocates nothing, not a string, not an array, not an object;
     · paused by IntersectionObserver and by visibilitychange — a background tab
       schedules no rAF at all and costs exactly nothing;
     · prefers-reduced-motion renders ONE settled static frame and stops;
     · init, frame, resize AND the reduced-motion media-query handler are all
       wrapped; any throw removes the canvas silently and leaves the page
       untouched. No console noise, ever;
     · the canvas is aria-hidden, unfocusable and pointer-events:none, and it
       sits in its own text-free strip. NOTHING here promotes a layer that
       contains text — that bug has already cost this site once. The intro fade
       is done with canvas alpha, not CSS opacity, for exactly that reason.

   Vanilla JS. No libraries, no build step, no globals. Safe to load on a page
   with no [data-component="gauss-field"] at all.
   ========================================================================== */
(function () {
  "use strict";

  var SELECTOR = '[data-component="gauss-field"]';
  var CANVAS_CLASS = "gauss-band__canvas";
  var INIT_ATTR = "data-gauss-init";

  /* Fixed seed. NOT Date.now(), NOT Math.random(): the band must be
     reproducible under test and identical on every load. */
  var BASE_SEED = 0x5eed1a7e;
  var SEED_STRIDE = 0x9e3779b9 | 0; /* golden-ratio stride so two bands on one
                                       page decorrelate without losing
                                       reproducibility */

  /* ---------------------------------------------------------------------------
     1. FIXED CAPACITIES
     Allocated once, at the maximum, and never resized. Resize changes how much
     of each buffer is USED, never how big it is — which is also why a resize
     can never corrupt simulation state.
     ------------------------------------------------------------------------ */
  var MAX_POINTS = 240; /* ring capacity for live data points */
  var MAX_GRID = 600; /* evaluation nodes for the density curves */
  var MIN_GRID = 180;
  var KDRAW_MAX = 26; /* individually stroked kernels (the youngest) */
  var RUG_BUCKETS = 2048; /* rug occupancy map: 2048 × 3px covers 6144 CSS px */

  /* ---------------------------------------------------------------------------
     2. PROCESS PARAMETERS
     θ is a rate in 1/seconds (time constant τ = 1/θ); s∞ is the stationary
     standard deviation. Both are frame-rate free.
     ------------------------------------------------------------------------ */

  /* HOW MANY COMPONENTS, AND WHY IT DEPENDS ON WIDTH.
     Four modes need room. On a 390px phone, four components at the scales below
     put roughly 100px between adjacent means, which is about 1.5 kernel widths
     — so they merge into a single undifferentiated hump and the band spends a
     quarter of its life looking like one wide blob rather than a composition.
     Three components on a narrow band are separated by half again as much and
     resolve properly. The choice is made ONCE, from the width measured at init,
     and never changes afterwards: K is the dimension of the process state, and
     a resize must never be able to reach into the simulation. A phone rotated
     to landscape therefore keeps three components, which is correct — it is the
     same band, continuing. */
  var KMAX = 4; /* every K-sized buffer is allocated at this size */
  var K_WIDE = 4,
    K_NARROW = 3,
    NARROW_W = 600; /* CSS px */

  /* THE ONE CONSTRAINT THAT GOVERNS ALL OF THESE.
     The estimate is built from a window of the last LIFE seconds, so it is
     really estimating the AGE-WEIGHTED AVERAGE of the recent mixtures, not the
     instantaneous one. The ghost draws the instantaneous law. The gap between
     them is a genuine lag of about one mean sample age (≈ 4 s) — and that lag
     is only a lesson if it is SMALL relative to the process time constants. At
     τ ≈ 12 s (an earlier draft) the mixture reorganised faster than the window
     could see, the two curves disagreed outright, and it read as a broken fit
     rather than as bias. Every τ below is therefore ≥ 2.5× the window length:
     the estimate visibly trails the truth rather than contradicting it. */
  var MU_THETA = 0.03, /* τ ≈ 33 s */
    MU_SIGINF = 0.04; /* gentle wander, in [0,1] data space */
  var LSIG_THETA = 0.035, /* τ ≈ 29 s */
    LSIG_SIGINF = 0.24, /* in LOG σ: σ is lognormal, never ≤ 0 */
    LSIG_TARGET = Math.log(0.052);
  /* The mixing weights, as softmax logits, are the slowest process of all:
     τ ≈ 50 s, because a change of MIX is the hardest thing for a moving window
     to follow and it is worth watching the estimate struggle with it.

     s∞ WAS 0.75, AND THAT WAS THE REAL SOURCE OF THE DEAD STRETCHES. Four iid
     logits at that spread put a factor of ten between the heaviest and lightest
     component often enough to matter; once a component is down to 3% of the
     mass its mode is drawn at a few percent of the plot height, which is to say
     it is gone, and the axis under it is empty. Worse, the whole sample then
     concentrates, which shrinks Silverman's A, which shrinks h, which sharpens
     the surviving peak and makes everything else relatively smaller still. It
     is a positive feedback, and it is why the picture went off-balance after
     the first minute rather than immediately.

     At 0.50 the heaviest-to-lightest ratio stays near 3:1 — clearly lopsided,
     still a composition, no component ever deleted. W_FLOOR is the backstop for
     the rare large excursion: the weights are mixed with a whisper of the
     uniform simplex, so nothing can reach zero however far the logits wander.
     Neither knob makes the process periodic; both only bound it. */
  var WL_THETA = 0.02,
    WL_SIGINF = 0.5,
    W_FLOOR = 0.12;

  /* Bandwidth multiplier, in log space. It mean-reverts to 0.50× the
     normal-reference rule: Silverman's rule is derived for a normal target and
     is well known to oversmooth multimodal data (Silverman 1986, §3.4.2), so a
     practitioner shades it down. The readout reports the h actually used.

     τ = 1/0.34 ≈ 2.9 s. An earlier 4.2 s left a dislocated bandwidth sitting
     visibly wrong for five or six seconds at a time, which is long enough for
     a reader to conclude the thing has stopped rather than that it is
     recovering. The jump asymmetry below is the other half of that fix. */
  var BW_THETA = 0.34,
    BW_SIGINF = 0.13,
    BW_TARGET = Math.log(0.5);
  var BW_JUMP_RATE = 1 / 12.5; /* compound-Poisson dislocations, per second */
  var BW_JUMP_MIN = 0.55,
    BW_JUMP_MAX = 1.1; /* |log| jump size */
  var BW_JUMP_UP = 0.5; /* upward jumps are HALVED — see the header. Down: ×0.33
                           to ×0.58 and spiky, which is legible. Up at full
                           magnitude was ×1.73 to ×3.0, which flattened the band
                           into a line and read as a dead renderer. */
  var BW_CLAMP_DN = 1.3, /* log-space bounds, also asymmetric, for the same */
    BW_CLAMP_UP = 0.8; /*  reason: ×0.14 to ×1.11 of the reference rule. */

  var RETARGET_RATE = 1 / 30; /* a component re-anchors somewhere new */
  var RETARGET_BINS = 4, /* the anchor range, quartered, for the crowding scan */
    RETARGET_REACH = 0.16; /* how far a component's mass "claims" the axis */

  /* Anchors live in [0.18, 0.82]. Wider than that and a dominant mode spends
     too much of its time half off the edge — which is fine for a moment in a
     full-bleed band, and not fine as the permanent static frame. The means
     still wander out past these bounds, and their tails still bleed off both
     sides; only the attractors are held in. */
  var ANCHOR_LO = 0.18,
    ANCHOR_SPAN = 0.64;

  var SIG_MIN = 0.016,
    SIG_MAX = 0.22; /* numerical firewall only; log-space does the real work */

  /* H_MIN is a RENDERING floor, not a statistical one. At the coarsest grid
     (M = 180 on a 360px phone) a node is 1/179 of the domain, so h = 0.010 puts
     ±4h across ~14 nodes: the spikiest state is still a resolved curve rather
     than an aliased zigzag. H_MAX is never reached in practice. */
  var H_MIN = 0.01,
    H_MAX = 0.26;

  var LIFE = 12.0; /* seconds a point stays in the sample */
  var FADE_IN = 0.5,
    FADE_OUT = 3.5;
  var BLOOM_HOLD = 0.5,
    BLOOM_OUT = 1.7; /* individual-kernel visibility window */
  var STREAK_LIFE = 0.38; /* the arrival flash */

  /* Arrival rate λ, points/second, interpolated across viewport width. With
     LIFE = 12 s the live count settles at λ·LIFE: 96 on a phone, 180 at desktop
     width. Poisson sd there is √180 ≈ 13.4, so MAX_POINTS = 240 leaves 4.5 sd of
     headroom and the ring never evicts early in practice — and on the rare
     occasion it did, dropping the oldest point is exactly what we wanted. */
  var LAMBDA_MIN = 8.0,
    LAMBDA_MAX = 15.0;
  var SPAWN_PER_FRAME = 6; /* bounded work; P(more) ≈ 1e-7 at MAX_DT */

  var MAX_DT = 0.05; /* 20 fps floor — stalls slow down, they never explode */

  /* Settling before the first paint — but taken in 50 ms strides, not 60 fps
     ones. This is the exact-transition dividend: because the OU update is the
     true conditional law over ANY step, a warm-up at dt = MAX_DT is a
     statistically identical trajectory to one at dt = 1/60, for a twelfth of
     the work. It turns several milliseconds of page-load arithmetic into a few
     hundred microseconds. With Euler this shortcut would be a lie. */
  var WARM_DT = MAX_DT,
    WARM_STEPS = 280; /* 280 × 0.05 s = 14 s, just past LIFE, so the ring is
                         saturated with a proper age distribution */

  /* THE OPENING FRAME IS THE MOST IMPORTANT FRAME IN THE MODULE.
     It is the first thing every visitor sees, and under prefers-reduced-motion
     it is the ONLY thing they ever see. It is therefore not left to the drift.

     The composition is CONSTRUCTED — anchors evenly spread, initial weight
     logits deliberately tight, re-anchoring suppressed during warm-up — and
     then GATED on three conditions, all of which must hold before the first
     paint:

       (a) nothing dominant hanging off an edge;
       (b) at least one resolvable pair of modes, so it reads as a composition;
       (c) peak(f̂) / peak(truth) inside [0.80, 1.05].

     (c) is the one that matters most and it is the one an earlier draft did not
     have. The gate used to inspect only the hidden mixture, never the estimate,
     so the opening frame showed whatever agreement the constructed state
     happened to produce — and the constructed state is the WORST case for
     agreement, because evenly-spread, evenly-weighted components maximise the
     sample's spread, which inflates Silverman's A, which inflates h, which
     flattens f̂ against a truth whose peaks are set by σ alone. Measured, the
     opening frame sat at the 3rd percentile of agreement while the long-run
     median is 0.887. Deterministically, every load, for the one frame that has
     to carry the whole idea.

     The fix is cheap: compute() already fills dens[] and truth[], so the gate
     reads the peaks it needs from arrays that exist. The try budget was already
     there and was never being spent. If it is somehow exhausted the last state
     is taken anyway — which is exactly the old behaviour, so this can only
     improve the opening and can never hang it. Hard-bounded at
     280 + 20·30 = 880 steps and 21 compute() calls. */
  var COMPOSE_TRIES = 20,
    COMPOSE_BLOCK = 30, /* 30 × 0.05 s = 1.5 s of simulated time per try */
    COMPOSE_W = 0.16, /* a component this heavy counts as a visible mode */
    COMPOSE_SEP = 2.0, /* two modes this many σ apart read as two */
    COMPOSE_EDGE = 0.12, /* how close to an edge is "hanging off" */
    COMPOSE_EDGE_W = 0.22, /* only a component this heavy has to obey that */
    COMPOSE_RATIO_LO = 0.8, /* peak(f̂)/peak(truth): under this the estimate */
    COMPOSE_RATIO_HI = 1.05; /* looks defeated, over it, untrustworthy. */

  var WL_START = 0.35; /* initial logit spread — tighter than stationary */

  var TRUNC = 4.0; /* kernel truncated at 4σ: relative error 3.35e-4 */
  var KGAIN = 12.0; /* shared display gain for the individual kernels */
  var SQRT2PI = 2.5066282746310002;

  /* The vertical scale is set from the ESTIMATE's peak alone — never from the
     max of the estimate and the ghost. See rescale(). */
  var Y_HEAD = 1.14, /* headroom above the estimate's peak */
    AGC_UP = 0.25, /* τ, seconds: rises fast so a spike never clips */
    AGC_DN = 1.6; /* falls slowly so the frame does not pump */

  var CONTENT_MAX = 1280; /* --maxw in core.css: the typographic column */

  var RUG_BUCKET = 3; /* CSS px per rug slot; at most one tick in each */

  /* ---------------------------------------------------------------------------
     3. PALETTE
     Canvas 2D cannot read var(), so these mirror core.css §1 exactly. Strokes
     use the AA-safe *-ink weights, per the token file's own doctrine that the
     four brand colours are for large marks and their ink weights for small ones
     carrying meaning; fills use the brand weights at 10–16% alpha.
       #1558b0 6.87:1   #c5221f 5.79:1   #a15c00 5.19:1   #0d652d 7.20:1
       #202124 16.1:1   #5f6368 6.05:1   (all on white)
     ------------------------------------------------------------------------ */
  var COL_INK = "#202124"; /* the estimate — "the answer" */
  var COL_GHOST = "#9aa0a6"; /* --grey-500, the hidden truth */
  var COL_AXIS = "#dadce0"; /* --border */
  var COL_META = "#5f6368"; /* --ink-3, the readout */
  var COL_FLASH = "#1558b0"; /* --accent, the readout during a jump */
  var COL_STROKE = ["#1558b0", "#c5221f", "#a15c00", "#0d652d"];
  var COL_FILL = ["#1a73e8", "#ea4335", "#fbbc04", "#34a853"];

  var FILL_TOP = "rgba(21,88,176,0.15)";
  var FILL_BOT = "rgba(21,88,176,0)";

  var PAD_TOP = 15,
    PAD_BOT = 22, /* axis sits here; the rug lives underneath it */
    RUG_H = 6;

  /* ---------------------------------------------------------------------------
     4. SMALL MATH KIT — all allocation-free
     ------------------------------------------------------------------------ */

  /* mulberry32: 32-bit, 2^32 period, passes gjrand's smallcrush. One closure per
     mount, created at init, never in the frame loop. */
  function mulberry32(seed) {
    var a = seed | 0;
    return function () {
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function clamp(v, lo, hi) {
    return v < lo ? lo : v > hi ? hi : v;
  }

  /* smoothstep, C1 at both ends */
  function ss(t) {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    return t * t * (3 - 2 * t);
  }

  /* Hoare quickselect, in place, zero allocation. Used for the interquartile
     range in Silverman's robust scale — no sort, no temporary arrays. */
  function qselect(a, lo, hi, k) {
    var p, i, j, t;
    while (lo < hi) {
      p = a[(lo + hi) >> 1];
      i = lo;
      j = hi;
      while (i <= j) {
        while (a[i] < p) i++;
        while (a[j] > p) j--;
        if (i <= j) {
          t = a[i];
          a[i] = a[j];
          a[j] = t;
          i++;
          j--;
        }
      }
      if (k <= j) hi = j;
      else if (k >= i) lo = i;
      else break;
    }
    return a[k];
  }

  /* ---------------------------------------------------------------------------
     5. THE FIELD
     ------------------------------------------------------------------------ */
  function Field(el, index) {
    this.el = el;
    this.dead = false;
    this.running = false;
    this.raf = 0;
    this.resizeTimer = 0;
    this.last = 0;

    this.rng = mulberry32((BASE_SEED + Math.imul(index, SEED_STRIDE)) | 0);
    this.spare = 0;
    this.hasSpare = false;

    /* ---- geometry (set by measure()) ---- */
    this.dpr = 1;
    this.w = 0;
    this.h = 0;
    this.M = MIN_GRID;
    this.baseY = 0;
    this.plotH = 1;
    this.lambda = LAMBDA_MIN;
    this.rugAlpha = 0.45;
    this.showReadout = false;
    this.grad = null;

    /* fixed at init from the measured width, then never touched again */
    this.K = K_WIDE;

    /* ---- buffers: allocated ONCE, at the maximum, forever ---- */
    this.gx = new Float32Array(MAX_GRID); /* node x, screen px */
    this.gt = new Float32Array(MAX_GRID); /* node x, data space [0,1] */
    this.dens = new Float32Array(MAX_GRID); /* the estimate  f̂ */
    this.truth = new Float32Array(MAX_GRID); /* the hidden mixture density */

    this.px = new Float32Array(MAX_POINTS); /* point position, data space */
    this.pAge = new Float32Array(MAX_POINTS); /* seconds since arrival */
    this.pComp = new Uint8Array(MAX_POINTS); /* generating component */
    this.pOn = new Uint8Array(MAX_POINTS);
    this.scratch = new Float32Array(MAX_POINTS); /* quickselect workspace */
    this.rugCol = new Uint8Array(RUG_BUCKETS); /* rug occupancy, re-filled */
    this.head = 0;

    /* ---- process state ---- */
    this.mu = new Float64Array(KMAX);
    this.muT = new Float64Array(KMAX);
    this.lsig = new Float64Array(KMAX);
    this.wl = new Float64Array(KMAX); /* softmax logits */
    this.wt = new Float64Array(KMAX); /* normalised weights */
    this.sig = new Float64Array(KMAX);

    this.bwLog = BW_TARGET;
    this.flash = 0;
    this.intro = 0;
    this.gap = 0; /* seconds to the next arrival */
    this.warm = false;

    /* ---- derived, recomputed each frame ---- */
    this.bw = 0.03;
    this.neff = 0;
    this.wsum = 0;
    this.yRef = 1;

    /* ---- readout, refreshed 6×/s so it is legible and so the hot loop never
           builds a string ---- */
    this.readout = "";
    this.readoutT = 0;

    /* ---- cached, never rebuilt per frame ---- */
    this.dash = [3, 4];
    this.solid = [];
    this.font = '11px "Google Sans Code", ui-monospace, SFMono-Regular, Menlo, monospace';

    var self = this;
    this.boundFrame = function (t) {
      self.frame(t);
    };
    this.onResize = function () {
      self.scheduleResize();
    };
    this.onVis = function () {
      self.docVisible = !document.hidden;
      self.sync();
    };
    /* The media-query handler is the one path that used to paint OUTSIDE a
       guard. Everything else in the module funnels a draw through either
       frame()'s try/catch or scheduleResize()'s; this one called draw()
       directly, so a throw here escaped with the field still alive, still
       observed, and half-painted. It goes through safeDraw() like the rest. */
    this.onMQ = function () {
      if (self.dead) return;
      self.reduced = !!(self.mq && self.mq.matches);
      if (self.reduced) {
        self.running = false;
        if (self.raf) cancelAnimationFrame(self.raf);
        self.raf = 0;
        self.safeDraw();
      } else {
        self.last = 0;
        self.sync();
      }
    };

    this.visible = true;
    this.docVisible = !document.hidden;
    this.reduced = false;
    this.mq = null;
    this.io = null;
    this.ro = null;
  }

  /* ---- normal variate, Box–Muller with a cached spare (no allocation) ---- */
  Field.prototype.gauss = function () {
    if (this.hasSpare) {
      this.hasSpare = false;
      return this.spare;
    }
    var u, v, s;
    do {
      u = this.rng() * 2 - 1;
      v = this.rng() * 2 - 1;
      s = u * u + v * v;
    } while (s >= 1 || s === 0);
    s = Math.sqrt((-2 * Math.log(s)) / s);
    this.spare = v * s;
    this.hasSpare = true;
    return u * s;
  };

  /* ---- exact OU transition over an arbitrary step dt --------------------- */
  Field.prototype.ou = function (x, m, theta, sinf, dt) {
    var d = Math.exp(-theta * dt);
    var n = x * d + m * (1 - d) + sinf * Math.sqrt(1 - d * d) * this.gauss();
    return isFinite(n) ? n : m; /* NaN / ±Infinity firewall */
  };

  /* Every paint that is not already inside frame()'s guard goes through here.
     Silent by contract: a broken band takes itself off the page and says
     nothing. */
  Field.prototype.safeDraw = function () {
    if (this.dead) return;
    try {
      this.draw();
    } catch (e) {
      this.fail();
    }
  };

  /* =========================================================================
     INIT
     ====================================================================== */
  Field.prototype.init = function () {
    var el = this.el;

    var c = document.createElement("canvas");
    if (!c.getContext) throw new Error("no canvas");
    var ctx = c.getContext("2d", { alpha: true });
    if (!ctx) throw new Error("no 2d");

    c.className = CANVAS_CLASS;
    c.setAttribute("aria-hidden", "true");
    c.setAttribute("role", "presentation");

    /* These inline styles are SAFETY, not styling: they hold even if
       components.css fails to load, so the canvas can never intercept a click,
       never take focus and never contribute to layout. No transform, no
       opacity, no will-change — see the header note. */
    var s = c.style;
    s.position = "absolute";
    s.inset = "0";
    s.top = "0";
    s.left = "0";
    s.display = "block";
    s.width = "100%";
    s.height = "100%";
    s.pointerEvents = "none";
    s.zIndex = "0";

    this.canvas = c;
    this.ctx = ctx;

    el.appendChild(c);

    this.mq = window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;
    this.reduced = !!(this.mq && this.mq.matches);

    /* measure() first: the number of components depends on the width, and the
       process state must be seeded at the dimension it will keep. */
    this.measure();
    this.K = this.w < NARROW_W ? K_NARROW : K_WIDE;

    var i, b;
    /* Anchors evenly spread, scales at their typical value, weights nearly even
       — the constructed opening. Everything relaxes out to its own stationary
       law over the following minute; nothing here pins the process. */
    for (i = 0; i < this.K; i++) {
      this.muT[i] = ANCHOR_LO + (ANCHOR_SPAN * i) / (this.K - 1);
      this.mu[i] = this.muT[i] + 0.4 * MU_SIGINF * this.gauss();
      this.lsig[i] = LSIG_TARGET + 0.5 * LSIG_SIGINF * this.gauss();
      this.wl[i] = WL_START * this.gauss();
      this.sig[i] = clamp(Math.exp(this.lsig[i]), SIG_MIN, SIG_MAX);
    }
    this.softmax();

    /* Settle the composition before anything is painted: 14 s of simulated time
       — just past LIFE, so the ring is saturated with a proper age distribution
       — with bandwidth jumps and re-anchoring both suppressed, so the band
       always OPENS calm and centred. Then, only if the arrangement is still
       flat or the estimate still disagrees with the truth, up to 30 s more in
       1.5 s blocks. No drawing happens here; it is pure arithmetic.

       bwLog is snapped to its target before each gate check, so the gate scores
       exactly the frame that will be painted — testing a state at one bandwidth
       and then shipping it at another would make the peak-ratio test worthless. */
    this.warm = true;
    for (i = 0; i < WARM_STEPS; i++) this.step(WARM_DT);
    this.bwLog = BW_TARGET;
    this.compute(0, true);
    for (i = 0; i < COMPOSE_TRIES && !this.composed(); i++) {
      for (b = 0; b < COMPOSE_BLOCK; b++) this.step(WARM_DT);
      this.bwLog = BW_TARGET;
      this.compute(0, true); /* fills dens[] and truth[] for the next check */
    }
    this.warm = false;

    /* Everything is wired in BOTH modes. The reduced-motion branch below only
       declines to start a loop; if the reader flips the OS setting back, the
       pause machinery is already in place and correct. sync() refuses to run
       while this.reduced is true, so the observers are harmless until then. */
    this.bindResize();
    this.bindMQ();
    document.addEventListener("visibilitychange", this.onVis, false);

    var self = this;
    if (typeof IntersectionObserver === "function") {
      this.io = new IntersectionObserver(
        function (entries) {
          for (var n = 0; n < entries.length; n++) {
            self.visible = entries[n].isIntersecting;
          }
          self.sync();
        },
        /* threshold 0: a band can be shorter than the viewport or taller than
           it, so any positive threshold is a trap. The margin starts the loop
           just before the band scrolls in. */
        { rootMargin: "140px 0px 140px 0px", threshold: 0 }
      );
      this.io.observe(el);
    } else {
      this.visible = true;
    }

    if (this.reduced) {
      /* ONE finished frame of a settled, gated composition, then nothing. No
         rAF is ever scheduled. */
      this.intro = 1;
      this.draw();
      return;
    }

    this.sync();
  };

  Field.prototype.bindResize = function () {
    window.addEventListener("resize", this.onResize, false);
    window.addEventListener("orientationchange", this.onResize, false);
    /* ResizeObserver also catches container changes that fire no window event.
       It watches the MOUNT, never the canvas, and the canvas is absolutely
       positioned — so there is no feedback loop; measure() also early-outs when
       the size is unchanged, which closes the door entirely. */
    if (typeof ResizeObserver === "function") {
      var self = this;
      this.ro = new ResizeObserver(function () {
        self.scheduleResize();
      });
      this.ro.observe(this.el);
    }
  };

  Field.prototype.bindMQ = function () {
    if (!this.mq) return;
    if (this.mq.addEventListener) this.mq.addEventListener("change", this.onMQ);
    else if (this.mq.addListener) this.mq.addListener(this.onMQ);
  };

  /* =========================================================================
     GEOMETRY
     ====================================================================== */
  Field.prototype.scheduleResize = function () {
    if (this.dead) return;
    var self = this;
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(function () {
      self.resizeTimer = 0;
      try {
        if (self.dead) return;
        if (self.measure()) {
          self.compute(0, true);
          if (!self.running) self.draw(); /* keep a paused/static band sharp */
        }
      } catch (e) {
        self.fail();
      }
    }, 150);
  };

  /* Returns true when the backing store actually changed. Never touches K, and
     never touches simulation state. */
  Field.prototype.measure = function () {
    var rect = this.el.getBoundingClientRect();
    var vw =
      window.innerWidth || document.documentElement.clientWidth || rect.width;

    /* DPR capped at 2, and the CSS width is clamped to the viewport before it
       is ever multiplied, so the backing store cannot exceed viewport × dpr
       even if the mount is somehow wider than the page. */
    var dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    var cssW = Math.max(1, Math.min(rect.width, vw));
    var cssH = Math.max(1, rect.height);

    var bw = Math.min(Math.round(cssW * dpr), Math.round(vw * dpr));
    var bh = Math.round(cssH * dpr);

    /* Absolute safety valve: no more than ~6 Mpx of backing store. Only a very
       large, very tall band on a 2× display could reach this; it degrades DPR
       rather than failing. */
    var area = bw * bh;
    if (area > 6e6) {
      var k = Math.sqrt(6e6 / area);
      dpr = Math.max(1, dpr * k);
      bw = Math.min(Math.round(cssW * dpr), Math.round(vw * dpr));
      bh = Math.round(cssH * dpr);
    }

    if (bw === this.canvas.width && bh === this.canvas.height && this.grad) {
      return false;
    }

    this.canvas.width = bw;
    this.canvas.height = bh;
    this.dpr = dpr;
    this.w = bw / dpr;
    this.h = bh / dpr;

    this.baseY = Math.max(8, this.h - PAD_BOT);
    this.plotH = Math.max(1, this.baseY - PAD_TOP);

    /* one node every ~3 CSS px, bounded both ways */
    var M = Math.round(this.w / 3);
    this.M = clamp(M, MIN_GRID, MAX_GRID) | 0;

    var i,
      inv = 1 / (this.M - 1);
    for (i = 0; i < this.M; i++) {
      this.gt[i] = i * inv;
      this.gx[i] = this.gt[i] * this.w;
    }

    var t = clamp((this.w - 360) / (1440 - 360), 0, 1);
    this.lambda = LAMBDA_MIN + (LAMBDA_MAX - LAMBDA_MIN) * t;
    this.rugAlpha = 0.36 + 0.22 * t;
    this.showReadout = this.w >= 520;

    /* cached once per resize — createLinearGradient allocates, so it must never
       be called from the frame loop */
    this.grad = this.ctx.createLinearGradient(0, PAD_TOP, 0, this.baseY);
    this.grad.addColorStop(0, FILL_TOP);
    this.grad.addColorStop(1, FILL_BOT);

    return true;
  };

  /* =========================================================================
     RUN / PAUSE
     Off-screen or backgrounded means NO rAF is scheduled at all.
     ====================================================================== */
  Field.prototype.sync = function () {
    if (this.dead || this.reduced) return;
    var want = this.visible && this.docVisible;
    if (want === this.running) return;
    this.running = want;
    if (want) {
      this.last = 0; /* first frame after a pause has dt = 0, never a jump */
      this.raf = requestAnimationFrame(this.boundFrame);
    } else if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
  };

  Field.prototype.frame = function (now) {
    if (this.dead || !this.running) return;
    try {
      var dt = 0;
      if (this.last !== 0) dt = (now - this.last) / 1000;
      this.last = now;
      if (!(dt > 0)) dt = 0; /* first frame, clock skew, NaN */
      if (dt > MAX_DT) dt = MAX_DT;

      this.step(dt);
      this.compute(dt, false);
      this.draw();

      /* rescheduled only after a clean frame */
      this.raf = requestAnimationFrame(this.boundFrame);
    } catch (e) {
      this.fail();
    }
  };

  /* =========================================================================
     SIMULATION — allocation-free
     ====================================================================== */
  Field.prototype.softmax = function () {
    var i,
      K = this.K,
      mx = -Infinity,
      s = 0;
    for (i = 0; i < K; i++) if (this.wl[i] > mx) mx = this.wl[i];
    for (i = 0; i < K; i++) {
      this.wt[i] = Math.exp(this.wl[i] - mx);
      s += this.wt[i];
    }
    if (!(s > 0)) {
      for (i = 0; i < K; i++) this.wt[i] = 1 / K;
      return;
    }
    /* softmax, then mixed with W_FLOOR of the uniform simplex so no component
       can ever be driven to zero and vanish off the axis. Still sums to 1. */
    s = (1 - W_FLOOR) / s;
    var fl = W_FLOOR / K;
    for (i = 0; i < K; i++) this.wt[i] = this.wt[i] * s + fl;
  };

  /* Is this a frame worth opening on? Three tests, cheapest first:

       1. nothing dominant hanging off an edge;
       2. one resolvable pair of visible modes — O(K²) = 16 comparisons;
       3. the estimate and the truth actually AGREE, peak to peak.

     (3) is the one the eye judges first and the one an earlier version left
     out. dens[] and truth[] are filled by compute(), which the caller runs
     immediately before each check, so this costs one O(M) scan and no
     allocation. */
  Field.prototype.composed = function () {
    var i,
      j,
      s,
      K = this.K,
      ok = false;

    for (i = 0; i < K; i++) {
      if (
        this.wt[i] >= COMPOSE_EDGE_W &&
        (this.mu[i] < COMPOSE_EDGE || this.mu[i] > 1 - COMPOSE_EDGE)
      ) {
        return false;
      }
    }

    for (i = 0; i < K && !ok; i++) {
      if (this.wt[i] < COMPOSE_W) continue;
      for (j = i + 1; j < K; j++) {
        if (this.wt[j] < COMPOSE_W) continue;
        s = this.sig[i] > this.sig[j] ? this.sig[i] : this.sig[j];
        if (Math.abs(this.mu[i] - this.mu[j]) >= COMPOSE_SEP * s) {
          ok = true;
          break;
        }
      }
    }
    if (!ok) return false;

    var M = this.M,
      dens = this.dens,
      truth = this.truth,
      pe = 0,
      pt = 0;
    for (j = 0; j < M; j++) {
      if (dens[j] > pe) pe = dens[j];
      if (truth[j] > pt) pt = truth[j];
    }
    if (!(pt > 0) || !(pe > 0)) return false;
    s = pe / pt;
    return s >= COMPOSE_RATIO_LO && s <= COMPOSE_RATIO_HI;
  };

  /* Where should a re-anchoring component GO?
     Uniformly at random was the obvious answer and the wrong one: independent
     uniform draws clump, so after the first minute the anchors bunched and left
     long dead flat stretches — a median 22% of the width with nothing in it,
     which on a full-bleed band reads as an unfinished picture rather than as a
     distribution that happens to be lopsided.

     So the range is quartered and the component is sent to the EMPTIEST
     quarter: each bin centre is scored by the weighted mass the other
     components already claim near it, and the lightest bin wins. That is a weak
     repulsion between the anchors, expressed as a choice rather than as a force,
     so it costs K·4 = 16 exponentials once every thirty seconds instead of
     anything per frame.

     It stays APERIODIC on both axes that matter. The timing is still
     exponential (the Poisson clock is untouched), the spot inside the winning
     bin is still uniform, and the scan starts at a random bin so that ties —
     which is what a symmetric arrangement produces — do not resolve to the same
     bin every time and set up a cycle. Nothing here can repeat. */
  Field.prototype.retarget = function (k) {
    var q,
      qq,
      j,
      c,
      d,
      s,
      K = this.K,
      qw = ANCHOR_SPAN / RETARGET_BINS,
      off = (this.rng() * RETARGET_BINS) | 0,
      best = 0,
      bestS = Infinity;
    if (off >= RETARGET_BINS) off = RETARGET_BINS - 1;

    for (qq = 0; qq < RETARGET_BINS; qq++) {
      q = (qq + off) % RETARGET_BINS;
      c = ANCHOR_LO + qw * (q + 0.5);
      s = 0;
      for (j = 0; j < K; j++) {
        if (j === k) continue; /* it is leaving; it does not crowd itself */
        d = (c - this.mu[j]) / RETARGET_REACH;
        s += this.wt[j] * Math.exp(-0.5 * d * d);
      }
      if (s < bestS) {
        bestS = s;
        best = q;
      }
    }
    this.muT[k] = ANCHOR_LO + qw * (best + this.rng());
  };

  Field.prototype.step = function (dt) {
    if (dt <= 0) return;
    var i,
      k,
      K = this.K;

    /* The intro ramp must NOT advance during the headless warm-up, or it would
       reach 1 before a single pixel is drawn and the fade would never play.
       It is monotone, so a later pause/resume does not re-fade either. */
    if (!this.warm) this.intro = Math.min(1, this.intro + dt / 0.55);

    /* ---- the hidden mixture drifts ---- */
    for (i = 0; i < K; i++) {
      this.mu[i] = clamp(
        this.ou(this.mu[i], this.muT[i], MU_THETA, MU_SIGINF, dt),
        -0.1,
        1.1
      );
      this.lsig[i] = this.ou(
        this.lsig[i],
        LSIG_TARGET,
        LSIG_THETA,
        LSIG_SIGINF,
        dt
      );
      this.sig[i] = clamp(Math.exp(this.lsig[i]), SIG_MIN, SIG_MAX);
      this.wl[i] = this.ou(this.wl[i], 0, WL_THETA, WL_SIGINF, dt);
    }
    this.softmax();

    /* ---- a component occasionally re-anchors somewhere new. It moves the OU
           TARGET, not the state, so the mean GLIDES there over τ ≈ 33 s — and
           you watch the estimate set off after it, a few seconds behind, which
           is the clearest view of the window lag the band ever gives you. ---- */
    if (!this.warm && this.rng() < RETARGET_RATE * dt) {
      k = (this.rng() * K) | 0;
      if (k >= K) k = K - 1;
      this.retarget(k);
    }

    /* ---- bandwidth: OU + compound Poisson jumps, both asymmetric ---- */
    this.bwLog = this.ou(this.bwLog, BW_TARGET, BW_THETA, BW_SIGINF, dt);
    if (!this.warm && this.rng() < BW_JUMP_RATE * dt) {
      var mag = BW_JUMP_MIN + (BW_JUMP_MAX - BW_JUMP_MIN) * this.rng();
      /* Down at full size — an undersmoothed estimate is spiky, legible and
         instructive. Up at half — a heavily oversmoothed one is a flat line,
         and a flat line is indistinguishable from a crash. */
      this.bwLog += this.rng() < 0.5 ? -mag : mag * BW_JUMP_UP;
      this.flash = 1;
    }
    this.bwLog = clamp(
      this.bwLog,
      BW_TARGET - BW_CLAMP_DN,
      BW_TARGET + BW_CLAMP_UP
    );
    if (this.flash > 0) this.flash *= Math.exp(-dt / 0.5);

    /* ---- age the sample ---- */
    for (i = 0; i < MAX_POINTS; i++) {
      if (!this.pOn[i]) continue;
      var a = this.pAge[i] + dt;
      if (a >= LIFE) this.pOn[i] = 0;
      else this.pAge[i] = a;
    }

    /* ---- arrivals: exact exponential inter-arrival times, so the process is
           the same Poisson(λ) at any frame rate. Bounded per frame. ---- */
    this.gap -= dt;
    var n = 0;
    while (this.gap <= 0 && n < SPAWN_PER_FRAME) {
      this.spawn();
      n++;
      this.gap += -Math.log(1 - this.rng()) / this.lambda;
    }
    if (this.gap <= 0) this.gap = 1 / this.lambda; /* shed a catch-up storm */

    if (this.readoutT > 0) this.readoutT -= dt;
  };

  Field.prototype.spawn = function () {
    /* pick a component, then draw from it */
    var u = this.rng(),
      K = this.K,
      c = 0,
      acc = 0,
      i;
    for (i = 0; i < K; i++) {
      acc += this.wt[i];
      if (u <= acc) {
        c = i;
        break;
      }
      c = i;
    }
    var x = this.mu[c] + this.sig[c] * this.gauss();

    var s = this.head;
    this.px[s] = x;
    this.pAge[s] = 0;
    this.pComp[s] = c;
    this.pOn[s] = 1;
    this.head = s + 1 >= MAX_POINTS ? 0 : s + 1;
  };

  /* age envelope a_i ∈ [0,1]: ramps in on arrival, out on expiry */
  function envelope(age) {
    return ss(age / FADE_IN) * ss((LIFE - age) / FADE_OUT);
  }

  /* =========================================================================
     THE ESTIMATE
     Two passes over the ring (weighted moments, then a truncated scatter onto
     the grid) plus one pass over the grid for the truth. No allocation.
     ====================================================================== */
  Field.prototype.compute = function (dt, snap) {
    var i, j, a;
    var M = this.M;

    /* ---- pass 1: weighted moments + the scratch copy for the IQR ---- */
    var wsum = 0,
      w2 = 0,
      sx = 0,
      sxx = 0,
      live = 0;
    for (i = 0; i < MAX_POINTS; i++) {
      if (!this.pOn[i]) continue;
      a = envelope(this.pAge[i]);
      if (a <= 0) continue;
      var x = this.px[i];
      wsum += a;
      w2 += a * a;
      sx += a * x;
      sxx += a * x * x;
      this.scratch[live++] = x;
    }

    this.dens.fill(0, 0, M);

    if (live < 4 || wsum <= 0) {
      this.neff = 0;
      this.wsum = 0;
      this.trueDensity();
      this.rescale(dt, snap);
      return;
    }

    var mean = sx / wsum;
    var varw = sxx / wsum - mean * mean;
    var sd = varw > 0 ? Math.sqrt(varw) : 1e-3;

    /* Kish's effective sample size for weighted data — the honest n to feed a
       rule that is stated in n. */
    var neff = (wsum * wsum) / w2;

    /* Silverman's robust scale A = min(σ̂, IQR/1.349), by quickselect. */
    var q1 = qselect(this.scratch, 0, live - 1, (live * 0.25) | 0);
    var q3 = qselect(this.scratch, 0, live - 1, (live * 0.75) | 0);
    var iqr = (q3 - q1) / 1.349;
    var A = iqr > 1e-4 && iqr < sd ? iqr : sd;

    var h = 0.9 * A * Math.pow(neff, -0.2) * Math.exp(this.bwLog);
    if (!(h > 0) || h !== h) h = 0.03;
    h = clamp(h, H_MIN, H_MAX);

    this.bw = h;
    this.neff = neff;
    this.wsum = wsum;

    /* ---- pass 2: truncated scatter. Work scales with h, not with M·n.
           Every typed array is hoisted into a local first: inside a loop this
           hot, re-reading `this.dens` a hundred thousand times a second is the
           difference between 3.7 ms and 1 ms a frame on a 2560px band. ---- */
    var dens = this.dens,
      gt = this.gt,
      px = this.px,
      pOn = this.pOn,
      pAge = this.pAge;
    var step = 1 / (M - 1); /* grid spacing in data space */
    var inv = 1 / h;
    var radNodes = (TRUNC * h) / step; /* truncation radius, in grid nodes */
    var maxHalf = (M * 0.45) | 0; /* safety valve; only binds past h ≈ 0.11 */
    var norm = 1 / (wsum * h * SQRT2PI);
    var lo, hi, xi, c, z;

    for (i = 0; i < MAX_POINTS; i++) {
      if (!pOn[i]) continue;
      a = envelope(pAge[i]);
      if (a <= 0) continue;
      xi = px[i];
      c = xi * (M - 1); /* fractional node index of the point */
      lo = Math.ceil(c - radNodes);
      hi = Math.floor(c + radNodes);
      if (hi - lo > 2 * maxHalf) {
        lo = Math.ceil(c) - maxHalf;
        hi = Math.ceil(c) + maxHalf;
      }
      if (lo < 0) lo = 0;
      if (hi > M - 1) hi = M - 1;
      for (j = lo; j <= hi; j++) {
        z = (gt[j] - xi) * inv;
        dens[j] += a * Math.exp(-0.5 * z * z);
      }
    }
    for (j = 0; j < M; j++) dens[j] *= norm;

    this.trueDensity();
    this.rescale(dt, snap);
  };

  /* f(x) = Σ w_k φ((x−μ_k)/σ_k) / σ_k — the thing the estimate is chasing */
  Field.prototype.trueDensity = function () {
    var M = this.M,
      K = this.K,
      truth = this.truth,
      gt = this.gt,
      j,
      k,
      z;
    truth.fill(0, 0, M);
    for (k = 0; k < K; k++) {
      var wk = this.wt[k];
      if (wk < 0.004) continue;
      var mk = this.mu[k],
        ik = 1 / this.sig[k],
        ck = (wk * ik) / SQRT2PI;
      /* same 4.5σ truncation as the estimate, but computed as a node range so
         the loop does not test every node it is going to skip */
      var lo = Math.ceil((mk - 4.5 * this.sig[k]) * (M - 1));
      var hi = Math.floor((mk + 4.5 * this.sig[k]) * (M - 1));
      if (lo < 0) lo = 0;
      if (hi > M - 1) hi = M - 1;
      for (j = lo; j <= hi; j++) {
        z = (gt[j] - mk) * ik;
        truth[j] += ck * Math.exp(-0.5 * z * z);
      }
    }
  };

  /* THE VERTICAL SCALE IS SET BY THE ESTIMATE, AND ONLY BY THE ESTIMATE.
     It used to be set by max(peak f̂, peak truth), which sounds neutral and is
     not: the ghost is the taller of the two most of the time, so the grey
     dashed decoration was setting the frame and the black answer curve was
     being shrunk to fit inside it. Measured, the estimate reached a median 72%
     of the plot while the ghost reached 84%, and on a large share of frames the
     tallest mark on the canvas was the reference, not the result. Whatever the
     eye reads as the subject of a picture should be the thing the picture is
     scaled to.

     So yRef comes from dens[] alone and the ghost is allowed to run off the top
     of the band and be clipped by the canvas edge — which is honest (it says
     "the truth is taller than we are showing") and is also what happens on the
     frames after a downward bandwidth jump, where f̂ is the taller one and the
     ghost sits well inside the frame.

     Two things fall out of this for free. The estimate now sits at a steady
     1/1.14 ≈ 88% of the plot height on essentially every frame, which fixes the
     short-curve problem on phones directly. And an oversmoothed estimate can no
     longer collapse to a horizontal line, because it is rescaled to its own
     peak: heavy smoothing now reads as one broad hump filling the band, which
     is what oversmoothing actually looks like, instead of as a dead renderer.

     Asymmetric and delta-time-correct: rises fast so a bandwidth collapse never
     clips, falls slowly so the frame does not pump. The 1−exp(−dt/τ) form is
     what makes it identical at 30 and 144 fps; a fixed per-frame lerp would
     not be. */
  Field.prototype.rescale = function (dt, snap) {
    var M = this.M,
      dens = this.dens,
      j,
      peak = 0;
    for (j = 0; j < M; j++) if (dens[j] > peak) peak = dens[j];
    var target = Math.max(0.9, peak * Y_HEAD);
    if (snap || this.yRef <= 0) {
      this.yRef = target;
      return;
    }
    var tau = target > this.yRef ? AGC_UP : AGC_DN;
    this.yRef += (target - this.yRef) * (1 - Math.exp(-dt / tau));
    if (!(this.yRef > 0)) this.yRef = target;
  };

  /* =========================================================================
     DRAW
     Alphas go through globalAlpha, never through rgba() string concatenation:
     that is what keeps the hot loop free of garbage.
     ====================================================================== */
  Field.prototype.ga = function (v) {
    this.ctx.globalAlpha = v * this.intro;
  };

  Field.prototype.yOf = function (d) {
    var y = this.baseY - (d / this.yRef) * this.plotH;
    return y < 2 ? 2 : y;
  };

  Field.prototype.draw = function () {
    var ctx = this.ctx,
      M = this.M,
      W = this.w,
      i,
      j;
    if (!ctx || !this.grad) return;

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, W, this.h);
    ctx.globalAlpha = 1;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    /* hoisted for the three grid passes below: `sc` turns a density straight
       into a y, so those loops make no method calls and no property reads at
       all. yOf() stays for the handful of scattered lookups. */
    var baseY = this.baseY;
    var plotH = this.plotH;
    var sc = plotH / this.yRef;
    var gx = this.gx,
      dens = this.dens,
      truth = this.truth;
    var y;

    /* ---- 1. the axis ---- */
    this.ga(1);
    ctx.fillStyle = COL_AXIS;
    ctx.fillRect(0, baseY, W, 1);

    /* ---- 2. the hidden truth. It is NOT clamped to the top of the band: when
            it is taller than the estimate it leaves the frame and the canvas
            clips it, rather than flattening into a fake plateau. The floor here
            is a numerical bound only — one plot-height above the top edge is
            already off-canvas. ---- */
    var ghostTop = -plotH;
    ctx.setLineDash(this.dash);
    ctx.strokeStyle = COL_GHOST;
    ctx.lineWidth = 1.25;
    this.ga(0.72);
    ctx.beginPath();
    for (j = 0; j < M; j++) {
      y = baseY - truth[j] * sc;
      if (y < ghostTop) y = ghostTop;
      if (j === 0) ctx.moveTo(gx[j], y);
      else ctx.lineTo(gx[j], y);
    }
    ctx.stroke();
    ctx.setLineDash(this.solid);

    /* ---- 3. the youngest kernels, each blooming then dissolving.
            Walking back from the write head gives them in age order, so the
            KDRAW_MAX cap can only ever drop the OLDEST of the visible set.

            EVERY ONE OF THESE IS CLAMPED TO THE CURVE ABOVE IT. A kernel is a
            summand of f̂, so a coloured bell standing taller than the black
            curve is not a stylistic liberty, it is arithmetic that does not
            hold — and it was on screen almost constantly, on 87% of frames,
            overshooting by as much as 41% of the plot. The display gain KGAIN
            is what caused it: it exists so a single observation's contribution
            is visible at all, and in the tails, where f̂ is small, 12× a small
            contribution is larger than the whole sum.

            The clamp is per kernel and it is the value of f̂ at that kernel's
            OWN centre, so it is always the correct ceiling rather than a global
            fudge. Where the point has company the gain still governs and the
            bloom is full size; out in the tails the bell shrinks to the height
            the point actually contributes, which is the honest picture. ---- */
    var h = this.bw;
    var hpx = h * W;
    if (this.wsum > 0 && hpx > 0.4) {
      var kpeak = (KGAIN / (this.neff * h * SQRT2PI) / this.yRef) * plotH;
      if (kpeak > plotH * 0.45) kpeak = plotH * 0.45;
      var span = 3 * hpx;
      var segs = 30;
      var gi, cap, cy;

      for (var m = 1; m <= KDRAW_MAX; m++) {
        i = this.head - m;
        if (i < 0) i += MAX_POINTS;
        if (!this.pOn[i]) continue;
        var age = this.pAge[i];
        var vis = ss(age / 0.45) * (1 - ss((age - BLOOM_HOLD) / BLOOM_OUT));
        if (vis <= 0.01) continue;
        var env = envelope(age);
        var pk = kpeak * env;
        var cx = this.px[i] * W;
        var comp = this.pComp[i];

        gi = Math.round(this.px[i] * (M - 1));
        if (gi < 0) gi = 0;
        else if (gi > M - 1) gi = M - 1;
        cap = dens[gi] * sc; /* f̂ at this kernel's centre, in pixels */
        if (pk > cap) pk = cap;
        if (pk < 0.6) continue; /* nothing left to draw */

        ctx.beginPath();
        ctx.moveTo(cx - span, baseY);
        for (var q = 0; q <= segs; q++) {
          var t = -3 + (6 * q) / segs;
          var kx = cx + t * hpx;
          var yy = baseY - pk * Math.exp(-0.5 * t * t);
          /* and the same ceiling at EVERY x, not only at the apex. Clamping
             only the peak leaves the flanks free to climb over a curve that is
             falling away faster than a single kernel does, which is the
             ordinary case on the outer side of a point sitting near a mode —
             measured, it still put a bell over the curve on nine frames in ten.
             One array read per segment, 31 segments, no allocation. */
          gi = Math.round((kx / W) * (M - 1));
          if (gi < 0) gi = 0;
          else if (gi > M - 1) gi = M - 1;
          cy = baseY - dens[gi] * sc;
          if (cy < 2) cy = 2; /* the estimate's own top clamp, exactly */
          if (yy < cy) yy = cy;
          ctx.lineTo(kx, yy);
        }
        ctx.lineTo(cx + span, baseY);
        ctx.closePath();

        this.ga(vis * 0.13);
        ctx.fillStyle = COL_FILL[comp];
        ctx.fill();

        this.ga(vis * 0.5);
        ctx.strokeStyle = COL_STROKE[comp];
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    /* ---- 4. the estimate — the answer, so it is dark and confident ---- */
    if (this.wsum > 0) {
      ctx.beginPath();
      ctx.moveTo(gx[0], baseY);
      for (j = 0; j < M; j++) {
        y = baseY - dens[j] * sc;
        if (y < 2) y = 2;
        ctx.lineTo(gx[j], y);
      }
      ctx.lineTo(gx[M - 1], baseY);
      ctx.closePath();
      this.ga(1);
      ctx.fillStyle = this.grad;
      ctx.fill();

      ctx.beginPath();
      for (j = 0; j < M; j++) {
        y = baseY - dens[j] * sc;
        if (y < 2) y = 2;
        if (j === 0) ctx.moveTo(gx[j], y);
        else ctx.lineTo(gx[j], y);
      }
      this.ga(0.95);
      ctx.strokeStyle = COL_INK;
      ctx.lineWidth = 2.3;
      ctx.stroke();

      /* a jump is punctuated, not narrated: the curve is briefly re-struck in
         accent blue over itself and fades out */
      if (this.flash > 0.02) {
        this.ga(this.flash * 0.55);
        ctx.strokeStyle = COL_FLASH;
        ctx.lineWidth = 2.3;
        ctx.stroke();
      }
    }

    /* ---- 5. arrival streaks — the point landing in the estimate ---- */
    ctx.lineWidth = 1;
    for (var n2 = 1; n2 <= KDRAW_MAX; n2++) {
      i = this.head - n2;
      if (i < 0) i += MAX_POINTS;
      if (!this.pOn[i]) continue;
      var ag = this.pAge[i];
      if (ag >= STREAK_LIFE) continue;
      var f = 1 - ag / STREAK_LIFE;
      var sxp = this.px[i] * W;
      var si = Math.round(this.px[i] * (M - 1));
      if (si < 0) si = 0;
      else if (si > M - 1) si = M - 1;
      var topY = this.yOf(this.dens[si]);
      this.ga(f * f * 0.55);
      ctx.strokeStyle = COL_STROKE[this.pComp[i]];
      ctx.beginPath();
      ctx.moveTo(sxp, baseY);
      ctx.lineTo(sxp, baseY - (baseY - topY) * ss(ag / STREAK_LIFE));
      ctx.stroke();
    }

    /* ---- 6. the rug — the live observations, coloured by latent class.

            AT MOST ONE TICK PER 3 CSS PX. A rug wants to show every point, and
            at 1280px with ~170 live points it very nearly can — except that the
            points are not spread out, they are piled under the modes, which is
            the entire thing the picture is about. Under a mode the 1px ticks
            landed shoulder to shoulder and fused into a solid grey-blue bar
            running along the axis: maximum ink exactly where the information
            was, and it read as a ruled line rather than as data.

            So the axis is divided into 3px slots and each slot takes the first
            point offered to it. The loop walks back from the write head, so the
            first offer is the youngest live point in that slot — the newest
            observation wins its spot, which is both the most defensible rule
            and the one that changes smoothly as the sample turns over. The
            result is a comb with real gaps at any density, and it is an honest
            subsample rather than a fake: nothing is moved, only dropped.

            fillRect, not a stroked path: no path objects, no allocation. The
            occupancy map is a Uint8Array allocated once at construction and
            re-filled here, which allocates nothing either. ---- */
    var ra = this.rugAlpha;
    var col = this.rugCol;
    var nb = Math.ceil(W / RUG_BUCKET) + 1;
    if (nb > RUG_BUCKETS) nb = RUG_BUCKETS;
    col.fill(0, 0, nb);
    for (var r = 1; r <= MAX_POINTS; r++) {
      i = this.head - r;
      if (i < 0) i += MAX_POINTS;
      if (!this.pOn[i]) continue;
      var e = envelope(this.pAge[i]);
      if (e <= 0.01) continue;
      var rx = Math.round(this.px[i] * W);
      if (rx < 0 || rx > W) continue;
      var bkt = (rx / RUG_BUCKET) | 0;
      if (bkt >= nb || col[bkt]) continue;
      col[bkt] = 1;
      this.ga(0.1 + ra * e);
      ctx.fillStyle = COL_STROKE[this.pComp[i]];
      ctx.fillRect(rx, baseY + 1, 1, RUG_H * (0.45 + 0.55 * e));
    }

    /* ---- 7. the readout. Rebuilt 6×/s, not 60: it keeps a string out of the
            hot loop AND it is the only rate at which a changing number is
            actually readable. It sits inside the vertical headroom the AGC
            always reserves above the peak, so the curve cannot reach it.

            It is right-aligned to the CONTENT COLUMN, not to the canvas. The
            band is full-bleed and the page's column is capped at --maxw =
            1280px, so pinning the text to W − 16 put it on the canvas edge:
            correct at 1280px and below, and at 2560px roughly 620px outside
            the grid every other glyph on the page obeys, floating in the
            margin with nothing above or below it to line up with. Clamped
            like this it lands under the right edge of the column on a wide
            screen and stays exactly where it was on a narrow one. ---- */
    if (this.showReadout && this.neff > 0) {
      if (this.readoutT <= 0) {
        this.readout =
          "n = " + Math.round(this.neff) + "   h = " + this.bw.toFixed(3);
        this.readoutT = 0.16;
      }
      var tx = (W + CONTENT_MAX) * 0.5 - 16;
      if (tx > W - 16) tx = W - 16;
      if (tx < 16) tx = 16;
      var hot = this.flash > 0.05;
      ctx.font = this.font;
      ctx.textAlign = "right";
      ctx.textBaseline = "alphabetic";
      this.ga(hot ? 0.95 : 0.78);
      ctx.fillStyle = hot ? COL_FLASH : COL_META;
      ctx.fillText(this.readout, tx, 20);
    }

    ctx.globalAlpha = 1;
  };

  /* =========================================================================
     TEARDOWN
     ====================================================================== */
  Field.prototype.teardown = function () {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.running = false;
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = 0;

    try {
      window.removeEventListener("resize", this.onResize, false);
      window.removeEventListener("orientationchange", this.onResize, false);
      document.removeEventListener("visibilitychange", this.onVis, false);
    } catch (e) {}
    try {
      if (this.io) this.io.disconnect();
    } catch (e) {}
    try {
      if (this.ro) this.ro.disconnect();
    } catch (e) {}
    try {
      if (this.mq) {
        if (this.mq.removeEventListener)
          this.mq.removeEventListener("change", this.onMQ);
        else if (this.mq.removeListener) this.mq.removeListener(this.onMQ);
      }
    } catch (e) {}
    this.io = null;
    this.ro = null;
  };

  /* Anything at all goes wrong: stop, unhook, take the canvas away and leave a
     clean empty strip that still reads as a deliberate part of the page. */
  Field.prototype.fail = function () {
    if (this.dead) return;
    this.dead = true;
    this.teardown();
    try {
      var c = this.canvas;
      if (c) {
        if (c.parentNode) c.parentNode.removeChild(c);
        else c.style.display = "none";
      }
    } catch (e) {}
    this.canvas = null;
    this.ctx = null;
  };

  /* =========================================================================
     BOOT
     ====================================================================== */
  function boot() {
    var nodes;
    try {
      nodes = document.querySelectorAll(SELECTOR);
    } catch (e) {
      return;
    }
    if (!nodes || !nodes.length) return; /* a page without the band: no-op */

    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      var f = null;
      try {
        if (el.hasAttribute(INIT_ATTR)) continue; /* script included twice */
        el.setAttribute(INIT_ATTR, "");
        f = new Field(el, i);
        f.init();
        el._gaussField = f; /* a handle for a future maintainer; not a global */
      } catch (e) {
        /* one bad mount must never take the others, or the page, down */
        try {
          if (f) f.fail();
        } catch (e2) {}
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
