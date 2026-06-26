/* ============================================================================
   yatawara.com — COSMOS  ·  global UNIVERSE backdrop  (assets/js/cosmos.js)
   ----------------------------------------------------------------------------
   The deep-space showpiece the whole site floats in. A self-init vanilla IIFE
   that appends ONE fixed, full-viewport <canvas id="cosmos"> to <body> and
   paints a cinematic, apple.com-grade scene on near-black:

     1. PARALLAX STARFIELD — 4 depth layers, hundreds of stars at varied size /
        brightness, coloured by stellar TEMPERATURE (a few hot blue-white, more
        white/yellow, many cool orange/red) with a power-law brightness spread.
        Subtle scintillation on only a subset; the ~5–8 brightest "hero" stars
        get faint 4-point diffraction spikes + a soft halo. Slow ambient drift.
     2. MILKY WAY — a soft diagonal band of denser faint stars + a faint luminous
        dust gradient (cool blue ↔ warm brown), precomputed offscreen, parallaxing
        slowest with the farthest layer. Very low opacity.
     3. NEBULA — a few very large, very soft, low-opacity radial colour blobs
        (blue / violet / teal) that slowly drift + breathe, composited additive
        at tiny alpha so headline text stays perfectly legible.
     4. PLANET CLOSEUP — a large ringed gas-giant baked offscreen, sitting partly
        off the lower-left edge BEHIND the hero: a lit limb shading through a
        terminator into shadow, soft low-contrast banding, a faint atmospheric
        rim-light, and a thin Saturn-like ring. Low opacity; drifts off-screen as
        you scroll down so it never competes with body text.
     5. COMETS — occasional (≈ every 5–9s) elegant comets: a glowing coma with a
        tapering dust tail pointing away from travel, sometimes a faint bluish ion
        tail; ~10% are larger & slower. Additive. Not a meteor shower.
     6. DEPTH PARALLAX — layers translate with window.scrollY (far layers barely
        move, near layers move more → a gentle "travel through space" feel) plus
        a subtle mouse parallax.

   Sits at z-index -1: above the CSS nebula veil (body::before, z-index -2) and
   behind all page content (z-index >= 1). pointer-events:none, aria-hidden.

   DPR-aware (capped for perf), resize-safe, requestAnimationFrame, pauses when
   document.hidden. prefers-reduced-motion → ONE static frame, no loop, no
   parallax. Star count is capped by viewport area for ~60fps. Vanilla JS, no
   libraries, no external assets.
   ========================================================================== */
(function () {
  "use strict";

  var CANVAS_ID = "cosmos";

  /* ---- palette (matches core.css tokens, RGB triples for rgba()) ---------- */
  var WHITE  = [245, 247, 250];   // --text   (frost white)
  var BLUE   = [41, 151, 255];    // --accent (Apple blue)
  var VIOLET = [169, 139, 255];   // --violet (nebula violet)
  var TEAL   = [79, 214, 230];    // --teal

  // Star colours: heavily weighted to white, faint accent stars sprinkled in.
  var STAR_COLORS = [
    WHITE, WHITE, WHITE, WHITE, WHITE, WHITE, WHITE,
    WHITE, WHITE, WHITE, WHITE, WHITE,
    BLUE, VIOLET, TEAL
  ];

  // Realistic stellar-temperature colours (Morgan–Keenan, gently desaturated so
  // they read as tints of frost-white, never as a confetti of saturated dots).
  // Weighted to a real-ish distribution: a few hot blue-white (O/B/A), more
  // white/yellow (F/G), many cool orange/red (K/M).
  var STELLAR = [
    { c: [202, 222, 255], w: 0.05 },  // O/B — blue-white (rare, hot)
    { c: [223, 235, 255], w: 0.10 },  // A   — white with a blue cast
    { c: [247, 248, 250], w: 0.20 },  // F   — pure frost white
    { c: [255, 248, 232], w: 0.22 },  // G   — sun-like warm white
    { c: [255, 232, 200], w: 0.23 },  // K   — pale orange
    { c: [255, 209, 178], w: 0.20 }   // M   — soft red-orange (faint, common)
  ];
  function pickStellar() {
    var r = Math.random(), acc = 0;
    for (var i = 0; i < STELLAR.length; i++) {
      acc += STELLAR[i].w;
      if (r <= acc) return STELLAR[i].c;
    }
    return STELLAR[2].c;
  }

  function rgba(c, a) {
    return "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + a + ")";
  }

  /* ---- self-injected CSS --------------------------------------------------- */
  function injectCSS() {
    if (document.getElementById("cosmos-css")) return;
    var s = document.createElement("style");
    s.id = "cosmos-css";
    s.textContent =
      "#" + CANVAS_ID + "{" +
        "position:fixed;inset:0;width:100%;height:100%;" +
        "z-index:-1;display:block;pointer-events:none;" +
        "opacity:0;transition:opacity 1.4s ease;" +
      "}" +
      "#" + CANVAS_ID + ".cosmos-ready{opacity:1;}";
    (document.head || document.documentElement).appendChild(s);
  }

  /* ========================================================================= */
  function boot() {
    // Don't double-mount if the script is included twice.
    if (document.getElementById(CANVAS_ID)) return;
    if (!document.body) return;

    var canvas = document.createElement("canvas");
    canvas.id = CANVAS_ID;
    canvas.setAttribute("aria-hidden", "true");
    if (!canvas.getContext) return;                       // graceful no-op
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    injectCSS();
    document.body.appendChild(canvas);

    var reduce = window.matchMedia &&
                 window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- sizing (DPR-aware, full viewport) ------------------------------- */
    var W = 0, H = 0, DPR = 1;
    function resize() {
      W = Math.max(1, window.innerWidth || document.documentElement.clientWidth);
      H = Math.max(1, window.innerHeight || document.documentElement.clientHeight);
      DPR = Math.min(2, window.devicePixelRatio || 1);    // cap DPR for perf
      canvas.width  = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);             // draw in CSS pixels
    }
    resize();

    /* ---- parallax state -------------------------------------------------- */
    // Scroll parallax: far layers barely shift, near layers shift more.
    // Mouse parallax: a tiny eased offset toward the pointer.
    var scrollY = window.scrollY || window.pageYOffset || 0;
    var mtx = 0, mty = 0;     // mouse target offset (CSS px, -1..1 scaled)
    var mx = 0, my = 0;       // eased mouse offset

    /* ---- starfield ------------------------------------------------------- */
    // Four parallax layers. Far layer: many tiny dim stars, slowest drift +
    // least scroll travel. Near layer: fewer, larger, brighter, biggest twinkle
    // + most scroll/mouse travel. Total count capped by area for ~60fps.
    var LAYERS = [
      { depth: 0.20, sizeMin: 0.4, sizeMax: 0.9, baseMin: 0.16, baseMax: 0.42, share: 0.42, scroll: 0.04, mouse: 5 },
      { depth: 0.45, sizeMin: 0.5, sizeMax: 1.2, baseMin: 0.26, baseMax: 0.60, share: 0.30, scroll: 0.10, mouse: 11 },
      { depth: 0.72, sizeMin: 0.7, sizeMax: 1.6, baseMin: 0.38, baseMax: 0.80, share: 0.18, scroll: 0.20, mouse: 19 },
      { depth: 1.00, sizeMin: 1.0, sizeMax: 2.1, baseMin: 0.50, baseMax: 1.00, share: 0.10, scroll: 0.34, mouse: 30 }
    ];

    function targetStarCount() {
      // ~1 star per 4200 px², clamped for laptop-friendly performance.
      return Math.max(90, Math.min(420, Math.round((W * H) / 4200)));
    }

    var stars = [];
    function makeStar(layer) {
      // Colour by stellar temperature; a faint chance of a pure accent star so
      // the old Apple-blue / violet / teal sparkle survives, very sparingly.
      var col = Math.random() < 0.06
              ? STAR_COLORS[12 + ((Math.random() * 3) | 0)]   // BLUE/VIOLET/TEAL
              : pickStellar();
      // Power-law-ish brightness: bias toward faint, rare bright ones. Squaring a
      // uniform draw makes "many faint, few bright"; the layer band keeps depth.
      var lum = Math.random() * Math.random();             // 0..1, skewed faint
      var base = layer.baseMin + lum * (layer.baseMax - layer.baseMin);
      // Radius tracks brightness so the bright few also read as the big few.
      var r = layer.sizeMin + (0.35 + 0.65 * lum) * (layer.sizeMax - layer.sizeMin);
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: r,
        base: base,
        layer: layer,
        col: col,
        // Scintillation on only a subset (~38%); the rest are steady.
        tw: Math.random() * Math.PI * 2,                  // twinkle phase
        tws: Math.random() < 0.38 ? (0.6 + Math.random() * 1.4) : 0,
        twa: 0.12 + Math.random() * 0.26                  // per-star twinkle depth
      };
    }
    function pickLayer() {
      var r = Math.random(), acc = 0;
      for (var L = 0; L < LAYERS.length; L++) {
        acc += LAYERS[L].share;
        if (r <= acc) return LAYERS[L];
      }
      return LAYERS[0];
    }
    function markHeroes() {
      // Promote the ~5–8 brightest, nearest stars to "hero" status: these get
      // faint 4-point diffraction spikes + a soft halo (the camera-lens look).
      for (var i = 0; i < stars.length; i++) stars[i].hero = false;
      var sorted = stars.slice().sort(function (a, b) {
        return (b.base * b.layer.depth) - (a.base * a.layer.depth);
      });
      var hn = Math.max(5, Math.min(8, Math.round(stars.length / 60)));
      for (var j = 0; j < hn && j < sorted.length; j++) {
        sorted[j].hero = true;
        sorted[j].spin = Math.random() * Math.PI;          // fixed spike rotation
      }
    }
    function seedStars() {
      stars.length = 0;
      var n = targetStarCount();
      for (var i = 0; i < n; i++) stars.push(makeStar(pickLayer()));
      markHeroes();
    }
    seedStars();
    // buildMilkyWay / buildPlanet are hoisted fn declarations; bake them after
    // resize() (already run) has set W/H/DPR. They render to offscreen canvases.
    buildMilkyWay();
    buildPlanet();

    // Ambient drift: a very slow global vector (px/sec), scaled per-layer depth.
    var DRIFT_X = 4.5, DRIFT_Y = 1.8;

    /* ---- offscreen helper ------------------------------------------------- */
    // Precompute static, expensive layers (Milky Way, planet) once per resize so
    // the per-frame loop just blits them — keeps the hot path ~60fps.
    function makeOffscreen(w, h) {
      var c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(w * DPR));
      c.height = Math.max(1, Math.round(h * DPR));
      var cx = c.getContext("2d");
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      return { canvas: c, ctx: cx, w: w, h: h };
    }

    /* ---- Milky Way band --------------------------------------------------- */
    // A soft DIAGONAL swathe: a faint luminous dust gradient (cool blue → warm
    // brown) plus a dense scatter of tiny faint stars, both baked to an offscreen
    // canvas. Parallaxes slowest, with the farthest layer. Deliberately low alpha.
    var milky = null;
    function buildMilkyWay() {
      // Build oversized so the slow parallax never reveals an edge.
      var pad = 0.18;
      var mw = W * (1 + pad * 2), mh = H * (1 + pad * 2);
      milky = makeOffscreen(mw, mh);
      milky.ox = W * pad; milky.oy = H * pad;             // offset back to 0,0
      var c = milky.ctx;
      var ang = -0.42;                                     // diagonal tilt (rad)
      var cx = mw / 2, cy = mh / 2;
      var bandH = Math.max(mw, mh) * 0.34;                 // half-thickness

      c.save();
      c.translate(cx, cy);
      c.rotate(ang);

      // luminous dust: a long band, brighter core, cool/warm dual tint, very low a.
      c.globalCompositeOperation = "lighter";
      var span = Math.max(mw, mh) * 1.3;
      var dust = c.createLinearGradient(0, -bandH, 0, bandH);
      dust.addColorStop(0.00, rgba([60, 80, 130], 0));
      dust.addColorStop(0.34, rgba([60, 80, 130], 0.05));  // cool bluish edge
      dust.addColorStop(0.50, rgba([150, 140, 150], 0.085)); // pale luminous core
      dust.addColorStop(0.66, rgba([120, 95, 80], 0.05));  // warm brown edge
      dust.addColorStop(1.00, rgba([120, 95, 80], 0));
      c.fillStyle = dust;
      c.fillRect(-span, -bandH, span * 2, bandH * 2);

      // soft brightness lobes along the band so it isn't a flat stripe
      for (var b = 0; b < 5; b++) {
        var lx = (-0.5 + b / 4) * span * 0.9;
        var lr = bandH * (0.7 + Math.random() * 0.5);
        var lg = c.createRadialGradient(lx, 0, 0, lx, 0, lr);
        var warm = Math.random() < 0.5;
        lg.addColorStop(0, rgba(warm ? [150, 120, 110] : [110, 130, 170], 0.05));
        lg.addColorStop(1, rgba(warm ? [150, 120, 110] : [110, 130, 170], 0));
        c.fillStyle = lg;
        c.beginPath();
        c.arc(lx, 0, lr, 0, Math.PI * 2);
        c.fill();
      }

      // faint dust LANES (subtractive-feel dark streaks) to give it structure
      c.globalCompositeOperation = "source-over";
      for (var d = 0; d < 3; d++) {
        var ly = (-0.3 + Math.random() * 0.6) * bandH;
        var lh = bandH * (0.05 + Math.random() * 0.06);
        var dg = c.createLinearGradient(0, ly - lh, 0, ly + lh);
        dg.addColorStop(0, "rgba(0,2,6,0)");
        dg.addColorStop(0.5, "rgba(0,2,6,0.10)");
        dg.addColorStop(1, "rgba(0,2,6,0)");
        c.fillStyle = dg;
        c.fillRect(-span, ly - lh, span * 2, lh * 2);
      }

      // dense scatter of faint stars concentrated toward the band centre
      c.globalCompositeOperation = "lighter";
      var grains = Math.round((mw * mh) / 2600);
      grains = Math.min(900, grains);
      for (var g = 0; g < grains; g++) {
        // gaussian-ish toward centre line (sum of uniforms)
        var gy = (Math.random() + Math.random() + Math.random() - 1.5) / 1.5 * bandH;
        var gx = (Math.random() - 0.5) * span * 1.4;
        var gr = Math.random() < 0.85 ? 0.4 + Math.random() * 0.5
                                      : 0.7 + Math.random() * 0.7;
        var ga = 0.10 + Math.random() * Math.random() * 0.45;
        c.fillStyle = rgba(pickStellar(), ga);
        c.beginPath();
        c.arc(gx, gy, gr, 0, Math.PI * 2);
        c.fill();
      }

      c.restore();
    }

    function drawMilkyWay() {
      if (!milky) return;
      // parallax with the farthest layer (depth ~0.20): barely moves.
      var sc = 0.03;                                       // scroll factor (slow)
      var px = -milky.ox + mx * 4;
      var py = -milky.oy - scrollY * sc + my * 4;
      // wrap vertically so very long scrolls never run past the baked band
      var span = milky.h;
      py = ((py) % span + span) % span - milky.oy;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(milky.canvas, px, py, milky.w, milky.h);
      ctx.globalAlpha = 1;
    }

    /* ---- planet closeup (centerpiece, SUBTLE) ----------------------------- */
    // A large gas-giant partly off the lower-left edge, baked once: a lit limb
    // shading into a terminator + shadow, soft low-contrast banding, a faint
    // atmospheric rim-light on the lit edge, and a thin elegant ring. Drawn at
    // low opacity, mostly off-canvas, and drifts further off as the user scrolls
    // — so it never competes with body text below the hero.
    var planet = null;
    function buildPlanet() {
      // radius scales with viewport but stays generous; cushioned by being off-edge
      var R = Math.max(W, H) * 0.46;
      var pad = R * 0.55;                                  // room for ring + glow
      var size = (R + pad) * 2;
      planet = makeOffscreen(size, size);
      planet.R = R;
      planet.cx = size / 2;
      planet.cy = size / 2;
      var c = planet.ctx;
      var cx = planet.cx, cy = planet.cy;

      // light direction (upper-right): lit limb top-right, shadow lower-left.
      var lx = 0.55, ly = -0.6;
      var llen = Math.sqrt(lx * lx + ly * ly); lx /= llen; ly /= llen;

      // base body tint — a muted warm-grey gas giant (low saturation = legible)
      var BODY = [120, 110, 132];
      var DARK = [10, 12, 22];

      c.save();
      // clip to the sphere for all surface detail
      c.beginPath();
      c.arc(cx, cy, R, 0, Math.PI * 2);
      c.clip();

      // 1) directional light gradient: lit side → terminator → shadow
      var lg = c.createRadialGradient(
        cx + lx * R * 0.55, cy + ly * R * 0.55, R * 0.05,
        cx + lx * R * 0.2,  cy + ly * R * 0.2,  R * 1.5
      );
      lg.addColorStop(0.0, rgba([165, 156, 178], 1));      // bright lit cap
      lg.addColorStop(0.35, rgba(BODY, 1));
      lg.addColorStop(0.7, rgba([54, 52, 70], 1));         // terminator
      lg.addColorStop(1.0, rgba(DARK, 1));                 // shadow side
      c.fillStyle = lg;
      c.fillRect(cx - R, cy - R, R * 2, R * 2);

      // 2) soft gas-giant banding — low-contrast horizontal belts tinted
      //    warm/cool alternately. Each belt is a vertical gradient stamped across
      //    the (clipped) disc; widths vary so it reads organic, not striped.
      c.globalCompositeOperation = "source-over";
      var bands = 9;
      var yPos = cy - R;
      for (var i = 0; i < bands; i++) {
        var th = (R * 2 / bands) * (0.6 + Math.random() * 0.8); // belt height
        var y0 = yPos, y1 = yPos + th;
        yPos = y1;
        var tint = (i % 2 === 0) ? [150, 120, 104] : [96, 104, 134];
        var ba = 0.045 + Math.random() * 0.05;             // very low contrast
        var bg = c.createLinearGradient(0, y0, 0, y1);
        bg.addColorStop(0, rgba(tint, 0));
        bg.addColorStop(0.5, rgba(tint, ba));
        bg.addColorStop(1, rgba(tint, 0));
        c.fillStyle = bg;
        c.fillRect(cx - R * 1.1, y0, R * 2.2, th);
      }

      // 3) a couple of faint darker swirls (storms) — barely-there
      for (var s = 0; s < 3; s++) {
        var sx = cx + (Math.random() - 0.3) * R * 0.8;
        var sy = cy + (Math.random() - 0.1) * R * 0.7;
        var sr = R * (0.10 + Math.random() * 0.10);
        var sg = c.createRadialGradient(sx, sy, 0, sx, sy, sr);
        sg.addColorStop(0, rgba([40, 36, 52], 0.18));
        sg.addColorStop(1, rgba([40, 36, 52], 0));
        c.fillStyle = sg;
        c.save();
        c.translate(sx, sy); c.scale(1.6, 0.7);
        c.beginPath(); c.arc(0, 0, sr, 0, Math.PI * 2); c.fill();
        c.restore();
      }

      // 4) re-darken the shadow limb so banding fades into night
      var sh = c.createRadialGradient(
        cx - lx * R * 0.9, cy - ly * R * 0.9, R * 0.2,
        cx - lx * R * 0.6, cy - ly * R * 0.6, R * 1.6
      );
      sh.addColorStop(0, rgba(DARK, 0.0));
      sh.addColorStop(0.55, rgba(DARK, 0.0));
      sh.addColorStop(1, rgba(DARK, 0.92));
      c.fillStyle = sh;
      c.fillRect(cx - R, cy - R, R * 2, R * 2);

      c.restore();                                          // drop sphere clip

      // 5) atmospheric rim-light: a thin luminous crescent on the lit edge
      c.globalCompositeOperation = "lighter";
      var rim = c.createRadialGradient(cx, cy, R * 0.93, cx, cy, R * 1.03);
      rim.addColorStop(0, rgba(BLUE, 0));
      rim.addColorStop(0.78, rgba([120, 170, 235], 0.0));
      rim.addColorStop(0.92, rgba([150, 190, 245], 0.22));
      rim.addColorStop(1, rgba(BLUE, 0));
      c.save();
      // paint the full rim crescent, then knock back its shadow half
      c.fillStyle = rim;
      c.beginPath(); c.arc(cx, cy, R * 1.04, 0, Math.PI * 2); c.fill();
      // knock back the shadow half of the rim
      c.globalCompositeOperation = "destination-out";
      var rimMask = c.createLinearGradient(
        cx - lx * R, cy - ly * R, cx + lx * R, cy + ly * R
      );
      rimMask.addColorStop(0, "rgba(0,0,0,1)");
      rimMask.addColorStop(0.5, "rgba(0,0,0,0.5)");
      rimMask.addColorStop(0.75, "rgba(0,0,0,0)");
      c.fillStyle = rimMask;
      c.beginPath(); c.arc(cx, cy, R * 1.06, 0, Math.PI * 2); c.fill();
      c.restore();

      // 6) thin elegant ring (Saturn-like), tilted. Rear arc is occluded by the
      //    sphere (clipped to OUTSIDE the disc); front arc lays over the body.
      drawRing(c, cx, cy, R);

      // a faint outer glow so the disc seats into the void softly
      c.globalCompositeOperation = "lighter";
      var halo = c.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.35);
      halo.addColorStop(0, rgba([90, 120, 170], 0.10));
      halo.addColorStop(1, rgba([90, 120, 170], 0));
      c.fillStyle = halo;
      c.beginPath(); c.arc(cx, cy, R * 1.35, 0, Math.PI * 2); c.fill();
    }

    function drawRing(c, cx, cy, R) {
      var rin = R * 1.22, rout = R * 1.92;
      var tilt = 0.28;                                      // vertical squash
      var roll = -0.18;                                     // ring plane roll
      function ringPath() {
        c.beginPath();
        c.ellipse(0, 0, rout, rout * tilt, 0, 0, Math.PI * 2);
        c.ellipse(0, 0, rin, rin * tilt, 0, 0, Math.PI * 2, true);
      }
      function ringFill() {
        var g = c.createRadialGradient(0, 0, rin, 0, 0, rout);
        g.addColorStop(0.0, rgba([180, 170, 160], 0));
        g.addColorStop(0.10, rgba([205, 197, 184], 0.18));
        g.addColorStop(0.32, rgba([150, 140, 132], 0.04)); // Cassini-ish gap
        g.addColorStop(0.52, rgba([210, 201, 188], 0.20));
        g.addColorStop(0.82, rgba([160, 152, 144], 0.10));
        g.addColorStop(1.0, rgba([160, 152, 144], 0));
        return g;
      }
      c.globalCompositeOperation = "lighter";

      // REAR half: the top of the tilted ellipse passes behind the planet.
      // Draw it everywhere, then clip away the part inside the sphere disc.
      c.save();
      c.translate(cx, cy);
      c.rotate(roll);
      // clip to OUTSIDE the (un-rolled) sphere: build an even-odd region of a big
      // rect minus the disc, in this rotated space (sphere stays a circle).
      c.beginPath();
      c.rect(-R * 3, -R * 3, R * 6, R * 6);
      c.arc(0, 0, R, 0, Math.PI * 2, true);                // hole = planet
      c.clip("evenodd");
      // only paint the rear (upper) half
      c.beginPath();
      c.rect(-R * 3, -R * 3, R * 6, R * 3);                 // upper half only
      c.clip();
      ringPath();
      c.fillStyle = ringFill();
      c.fill("evenodd");
      c.restore();

      // FRONT half: lower arc lays over the planet body, no occlusion needed.
      c.save();
      c.translate(cx, cy);
      c.rotate(roll);
      c.beginPath();
      c.rect(-R * 3, 0, R * 6, R * 3);                      // lower half only
      c.clip();
      ringPath();
      c.fillStyle = ringFill();
      c.fill("evenodd");
      c.restore();
    }

    function drawPlanet(t) {
      if (!planet) return;
      var R = planet.R;
      // Anchor the planet centre just past the lower-left corner so only its
      // upper-right shoulder shows behind the hero. As scrollY grows it slides
      // further down-left and OFF screen, clearing the text below the fold.
      var baseX = -R * 0.42;
      var baseY = H + R * 0.30;
      // very slow ambient drift + scroll exit (parallax: moves a touch with near)
      var driftX = Math.cos(t * 0.018) * 10;
      var driftY = Math.sin(t * 0.022) * 8;
      var px = baseX + driftX + mx * 12;
      var py = baseY + driftY - scrollY * 0.18 + my * 12;  // scroll → exits down

      // overall opacity: low, and it fades out as the disc's top edge drops below
      // the fold — so it gracefully clears the text below (and is a perf cutoff).
      var top = py - R;                                     // sphere top, screen px
      var fade = 1 - Math.max(0, Math.min(1, (top - H * 0.35) / (R * 0.8)));
      var alpha = 0.4 * Math.max(0, Math.min(1, fade));     // low: atmospheric
      if (alpha <= 0.01) return;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.globalCompositeOperation = "source-over";        // body is opaque-ish
      // extremely slow apparent rotation via a sub-degree skew of the blit;
      // kept tiny so baked lighting still reads as fixed to the light source.
      ctx.translate(px, py);
      ctx.rotate(Math.sin(t * 0.01) * 0.012);
      ctx.drawImage(planet.canvas, -planet.cx, -planet.cy, planet.w, planet.h);
      ctx.restore();

      // a live, faintly breathing atmosphere kiss on the lit shoulder (additive)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      var breathe = 0.10 + 0.04 * Math.sin(t * 0.4);
      var ax = px + R * 0.42, ay = py - R * 0.46;
      var ag = ctx.createRadialGradient(ax, ay, 0, ax, ay, R * 0.7);
      ag.addColorStop(0, rgba([130, 175, 240], alpha * breathe));
      ag.addColorStop(1, rgba([130, 175, 240], 0));
      ctx.fillStyle = ag;
      ctx.beginPath(); ctx.arc(ax, ay, R * 0.7, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function drawStars(t) {
      // scroll travels UP the canvas as you scroll DOWN (negative offset).
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var lay = s.layer;
        // Steady stars hold full brightness; scintillators shimmer by their own
        // depth (twa) around a near-1 mean, so twinkle is subtle, not strobing.
        var tw = s.tws ? (1 - s.twa) + s.twa * (0.5 + 0.5 * Math.sin(s.tw + t * s.tws)) : 1;
        var a = s.base * tw;
        if (a <= 0.012) continue;

        var px = s.x + mx * lay.mouse;
        var py = s.y - scrollY * lay.scroll + my * lay.mouse;
        // wrap the scrolled Y so the field stays endless during long scrolls
        var span = H + 4;
        py = ((py + 2) % span + span) % span - 2;

        // soft halo for the brighter / nearer stars
        if (s.r > 1.05) {
          var hr = s.r * 3.4;
          var grd = ctx.createRadialGradient(px, py, 0, px, py, hr);
          grd.addColorStop(0, rgba(s.col, a * 0.45));
          grd.addColorStop(1, rgba(s.col, 0));
          ctx.fillStyle = grd;
          ctx.beginPath();
          ctx.arc(px, py, hr, 0, Math.PI * 2);
          ctx.fill();
        }

        // HERO stars: a wider soft halo + faint 4-point diffraction spikes.
        if (s.hero) {
          var bloom = s.r * 7.5;
          var bg = ctx.createRadialGradient(px, py, 0, px, py, bloom);
          bg.addColorStop(0, rgba(s.col, a * 0.30));
          bg.addColorStop(0.4, rgba(s.col, a * 0.10));
          bg.addColorStop(1, rgba(s.col, 0));
          ctx.fillStyle = bg;
          ctx.beginPath();
          ctx.arc(px, py, bloom, 0, Math.PI * 2);
          ctx.fill();

          var len = s.r * 11 * (0.9 + 0.1 * tw);           // breathe with twinkle
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(s.spin || 0);
          ctx.lineCap = "round";
          for (var k = 0; k < 2; k++) {                     // 2 lines → 4 points
            ctx.rotate(Math.PI / 2);
            var sg = ctx.createLinearGradient(-len, 0, len, 0);
            sg.addColorStop(0, rgba(s.col, 0));
            sg.addColorStop(0.5, rgba(s.col, a * 0.55));
            sg.addColorStop(1, rgba(s.col, 0));
            ctx.strokeStyle = sg;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(-len, 0);
            ctx.lineTo(len, 0);
            ctx.stroke();
          }
          ctx.restore();
        }

        // crisp core
        ctx.fillStyle = rgba(s.col, Math.min(1, a));
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function updateStars(dt) {
      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        s.x += DRIFT_X * s.layer.depth * dt;
        s.y += DRIFT_Y * s.layer.depth * dt;
        // wrap base position around the viewport so the field is endless
        if (s.x > W + 2) s.x -= (W + 4);
        else if (s.x < -2) s.x += (W + 4);
        if (s.y > H + 2) s.y -= (H + 4);
        else if (s.y < -2) s.y += (H + 4);
      }
    }

    /* ---- nebula ---------------------------------------------------------- */
    // A few enormous, very soft radial blobs that slowly orbit + breathe. Drawn
    // additive at tiny alpha — they tint the void without ever washing out text.
    var nebulae = [
      { col: BLUE,   cx: 0.16, cy: 0.14, rad: 0.62, alpha: 0.060, sp: 0.013, ph: 0.0, drift: 0.05, scroll: 0.05 },
      { col: VIOLET, cx: 0.86, cy: 0.20, rad: 0.58, alpha: 0.058, sp: 0.011, ph: 2.1, drift: 0.06, scroll: 0.07 },
      { col: TEAL,   cx: 0.52, cy: 0.92, rad: 0.70, alpha: 0.044, sp: 0.009, ph: 4.0, drift: 0.04, scroll: 0.09 },
      { col: VIOLET, cx: 0.40, cy: 0.46, rad: 0.50, alpha: 0.034, sp: 0.015, ph: 1.0, drift: 0.05, scroll: 0.04 }
    ];

    function drawNebula(t) {
      var maxd = Math.max(W, H);
      for (var i = 0; i < nebulae.length; i++) {
        var n = nebulae[i];
        // slow orbital wander
        var wx = Math.cos(t * n.sp + n.ph) * n.drift;
        var wy = Math.sin(t * n.sp * 1.3 + n.ph) * n.drift;
        var cx = (n.cx + wx) * W + mx * 14;
        var cy = (n.cy + wy) * H - scrollY * n.scroll + my * 14;
        var rad = n.rad * maxd;
        // gentle breathing of brightness
        var pulse = 0.80 + 0.20 * Math.sin(t * 0.10 + n.ph);
        var a = n.alpha * pulse;

        var grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grd.addColorStop(0.0, rgba(n.col, a));
        grd.addColorStop(0.45, rgba(n.col, a * 0.35));
        grd.addColorStop(1.0, rgba(n.col, 0));
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ---- comets ---------------------------------------------------------- */
    // Proper comets, not meteors: a glowing coma (head) with a radial bloom and
    // a long tapering DUST tail that fades along its length and points away from
    // the direction of travel. Occasionally a fainter, straighter bluish ION
    // tail too. Elegant cadence — roughly one every ~5–9s; ~10% a big slow one.
    var comets = [];
    var nextComet = 0;
    function scheduleComet(t) { nextComet = t + 5 + Math.random() * 4; }   // 5–9s

    function spawnComet() {
      var majestic = Math.random() < 0.10;                 // ~10% big & slow
      var dir = Math.random() < 0.5 ? 1 : -1;              // travel L→R or R→L
      var diag = Math.max(W, H);
      var speed = majestic
        ? diag * (0.16 + Math.random() * 0.08)             // slow, stately
        : diag * (0.42 + Math.random() * 0.45);            // brisk
      // shallow-to-mid descent so it arcs gracefully across the upper sky
      var ang = (0.08 + Math.random() * 0.20) * Math.PI;   // ~14°–50°
      var size = majestic ? (3.0 + Math.random() * 1.6)
                          : (1.4 + Math.random() * 1.4);
      // head colour: cool white → faint blue; ion tail always bluish
      var col = Math.random() < 0.6 ? WHITE
              : (Math.random() < 0.5 ? [200, 222, 255] : TEAL);
      comets.push({
        x: dir > 0 ? -W * 0.08 + Math.random() * W * 0.15
                   : W * 1.08 - Math.random() * W * 0.15,
        y: H * (0.04 + Math.random() * 0.34),
        vx: Math.cos(ang) * speed * dir,
        vy: Math.sin(ang) * speed,
        life: 0,
        ttl: (majestic ? 4.5 : 2.2) + Math.random() * 1.6, // seconds visible
        len: (majestic ? 240 : 130) + Math.random() * 140, // dust tail px
        r: size,
        col: col,
        ion: Math.random() < 0.45,                         // faint ion tail?
        big: majestic
      });
    }

    function updateComets(dt) {
      for (var i = comets.length - 1; i >= 0; i--) {
        var k = comets[i];
        k.life += dt;
        k.x += k.vx * dt;
        k.y += k.vy * dt;
        var m = k.len + 40;
        if (k.life >= k.ttl ||
            k.x < -m || k.x > W + m || k.y > H + m) {
          comets.splice(i, 1);
        }
      }
    }

    function drawComet(k) {
      var p = k.life / k.ttl;                              // 0 → 1
      var a = Math.sin(Math.min(1, p) * Math.PI) * (k.big ? 0.95 : 0.85);
      if (a <= 0.012) return;
      var sp = Math.sqrt(k.vx * k.vx + k.vy * k.vy) || 1;
      var ux = k.vx / sp, uy = k.vy / sp;                  // unit velocity
      // tail points AWAY from travel (i.e. behind the head)
      var bx = -ux, by = -uy;

      // 1) DUST tail — a soft tapering wedge that fades down its length.
      //    Built as a thin triangle: wide-ish at the coma, vanishing at the tip.
      var w0 = k.r * 1.6;                                  // tail width at head
      var tipX = k.x + bx * k.len, tipY = k.y + by * k.len;
      var nx = -by, ny = bx;                               // perpendicular
      var tg = ctx.createLinearGradient(k.x, k.y, tipX, tipY);
      tg.addColorStop(0, rgba(k.col, a * 0.55));
      tg.addColorStop(0.4, rgba(k.col, a * 0.22));
      tg.addColorStop(1, rgba(k.col, 0));
      ctx.fillStyle = tg;
      ctx.beginPath();
      ctx.moveTo(k.x + nx * w0, k.y + ny * w0);
      ctx.lineTo(k.x - nx * w0, k.y - ny * w0);
      ctx.lineTo(tipX, tipY);
      ctx.closePath();
      ctx.fill();

      // 2) ION tail — fainter, narrower, bluish, slightly straighter & longer.
      if (k.ion) {
        var ilen = k.len * 1.18;
        var iTipX = k.x + bx * ilen, iTipY = k.y + by * ilen;
        var iw = k.r * 0.7;
        var ig = ctx.createLinearGradient(k.x, k.y, iTipX, iTipY);
        ig.addColorStop(0, rgba([150, 195, 255], a * 0.30));
        ig.addColorStop(0.5, rgba([120, 170, 255], a * 0.12));
        ig.addColorStop(1, rgba([120, 170, 255], 0));
        ctx.fillStyle = ig;
        ctx.beginPath();
        ctx.moveTo(k.x + nx * iw, k.y + ny * iw);
        ctx.lineTo(k.x - nx * iw, k.y - ny * iw);
        ctx.lineTo(iTipX, iTipY);
        ctx.closePath();
        ctx.fill();
      }

      // 3) COMA — bright radial glow head, with a crisp hot core.
      var coma = k.r * (k.big ? 6 : 4.5);
      var cg = ctx.createRadialGradient(k.x, k.y, 0, k.x, k.y, coma);
      cg.addColorStop(0, rgba(k.col, a));
      cg.addColorStop(0.25, rgba(k.col, a * 0.55));
      cg.addColorStop(1, rgba(k.col, 0));
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(k.x, k.y, coma, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = rgba(WHITE, Math.min(1, a));
      ctx.beginPath();
      ctx.arc(k.x, k.y, k.r * 0.9, 0, Math.PI * 2);
      ctx.fill();
    }

    /* ---- frame composition ----------------------------------------------- */
    function clear() {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.clearRect(0, 0, W, H);                          // transparent: veil shows through
    }

    function composeFrame(t) {
      clear();

      // Milky Way band (deepest, additive haze + faint baked stars)
      ctx.globalCompositeOperation = "lighter";
      drawMilkyWay();

      // nebula glow sits over the band
      drawNebula(t);

      // planet body (mostly opaque) occludes haze behind it, but stars pass
      // in front — drawPlanet manages its own composite + alpha internally.
      drawPlanet(t);

      // starfield, then comets on top
      ctx.globalCompositeOperation = "lighter";
      drawStars(t);
      for (var i = 0; i < comets.length; i++) drawComet(comets[i]);

      ctx.globalCompositeOperation = "source-over";
    }

    /* ---- STATIC frame (reduced motion) ----------------------------------- */
    function staticFrame() {
      // one calm still: nebula + starfield at a fixed twinkle phase. No loop,
      // no parallax (scrollY/mouse offsets stay at their initial values).
      mx = my = 0;
      composeFrame(3.4);
      canvas.classList.add("cosmos-ready");
    }

    /* ---- animation loop -------------------------------------------------- */
    var now = 0;                                          // seconds (shared clock)
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
      if (dt > 0.05) dt = 0.05;                           // clamp huge gaps (tab refocus)
      now += dt;

      // ease mouse parallax toward target
      mx += (mtx - mx) * Math.min(1, dt * 3);
      my += (mty - my) * Math.min(1, dt * 3);

      updateStars(dt);
      updateComets(dt);
      if (now >= nextComet) { spawnComet(); scheduleComet(now); }

      composeFrame(now);

      if (!revealed) { revealed = true; canvas.classList.add("cosmos-ready"); }
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

    /* ---- lifecycle: scroll + mouse + resize + visibility ----------------- */
    function onScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
    }
    if (!reduce) {
      window.addEventListener("scroll", onScroll, { passive: true });

      window.addEventListener("mousemove", function (e) {
        // -1..1 around centre → tiny eased offset in frame()
        mtx = (e.clientX / W - 0.5) * 2;
        mty = (e.clientY / H - 0.5) * 2;
      }, { passive: true });
    }

    var resizeRAF = 0;
    function onResize() {
      if (resizeRAF) return;
      resizeRAF = requestAnimationFrame(function () {
        resizeRAF = 0;
        resize();
        // keep star density appropriate after large viewport changes
        var want = targetStarCount();
        while (stars.length < want) stars.push(makeStar(pickLayer()));
        while (stars.length > want) stars.pop();
        markHeroes();                                      // re-pick hero set
        // rebuild precomputed static layers for the new viewport / DPR
        buildMilkyWay();
        buildPlanet();
        if (reduce) staticFrame();                        // redraw the still frame
      });
    }
    window.addEventListener("resize", onResize);

    function onVisibility() {
      if (reduce) return;
      if (document.hidden) stop();
      else { prev = 0; start(); }
    }
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- go -------------------------------------------------------------- */
    if (reduce) {
      staticFrame();                                      // single static frame, no loop
    } else {
      onScroll();                                         // sync initial scroll position
      scheduleComet(0);                                   // first comet within ~5–9s
      if (!document.hidden) start();
    }

    /* ---- expose a tiny handle (mirrors the window.AY convention) ---------- */
    try {
      window.AY = window.AY || {};
      window.AY.cosmos = {
        shoot: function () { if (!reduce) spawnComet(); },
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

/* The animated universe: the deep-space showpiece every page floats within. */
