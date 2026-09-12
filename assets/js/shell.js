/* =============================================================================
   yatawara.com — shell.js
   The whole site engine. Vanilla JS, no dependencies, no build step, no output.

   It does exactly six things and nothing else:
     1. sticky header scroll state        -> .site-header gains .is-scrolled
     2. accessible mobile menu            -> .nav gains .is-open; aria-expanded,
                                             Escape, focus trap, icon swap
     3. restrained scroll reveal          -> html.reveal-ready, then each
                                             [data-reveal] gains .is-revealed
     4. header-aware smooth anchor scroll -> a[href^="#"]
     5. current-page highlighting         -> aria-current + .is-active
     6. a small inline icon sprite        -> [data-icon="name"], AY.icon(name)

   There is NO theme subsystem. The site has one ground: light. grow.google has
   one ground too, and that is the whole point of this design.

   CLASS CONTRACT — every name below is matched by a real rule in core.css.
   If you rename one here, rename it there in the same commit. A mismatch is
   silent: the state simply never fires, and [data-reveal] in particular can
   blank a whole page.

   Everything degrades: if this file fails to load, the page is still complete,
   readable and navigable — nothing is hidden by CSS that only JS can undo.
   Public API is documented at the bottom (window.AY).
   ========================================================================== */
(function () {
  "use strict";

  if (typeof window === "undefined" || typeof document === "undefined") return;

  var root = document.documentElement;

  /* Class contract. core.css keys off exactly these names. */
  var CLASS = {
    scrolled: "is-scrolled",     // core.css: .site-header.is-scrolled
    open: "is-open",             // core.css: .nav.is-open
    menuOpen: "is-menu-open",    // core.css: html.is-menu-open (scroll lock)
    revealReady: "reveal-ready", // core.css: html.reveal-ready [data-reveal]
    revealed: "is-revealed",     // core.css: ... [data-reveal].is-revealed
    active: "is-active"          // core.css: .nav-link.is-active
  };
  var SCROLL_AT = 8;             // px scrolled before the header changes state
  var MENU_BREAKPOINT = 940;     // px; MUST equal the CSS nav breakpoint
                                 // (core.css §10, @media (max-width: 940px))
  var ANCHOR_GAP = 12;           // px of air above an anchored heading

  /* ---------------------------------------------------------------- helpers */

  function list(nodes) {
    return nodes ? Array.prototype.slice.call(nodes) : [];
  }
  function each(nodes, fn) {
    list(nodes).forEach(fn);
  }
  function query(selector, scope) {
    return (scope || document).querySelector(selector);
  }
  function queryAll(selector, scope) {
    return list((scope || document).querySelectorAll(selector));
  }
  function pick() {
    for (var i = 0; i < arguments.length; i++) {
      var el = query(arguments[i]);
      if (el) return el;
    }
    return null;
  }
  function closest(node, selector) {
    var el = node && node.nodeType === 3 ? node.parentNode : node;
    while (el && el.nodeType === 1) {
      if (el.matches && el.matches(selector)) return el;
      el = el.parentElement;
    }
    return null;
  }
  function mq(queryString) {
    return window.matchMedia ? window.matchMedia(queryString) : null;
  }
  function onMq(media, fn) {
    if (!media) return;
    if (media.addEventListener) media.addEventListener("change", fn);
    else if (media.addListener) media.addListener(fn);
  }
  function frame(fn) {
    if (window.requestAnimationFrame) window.requestAnimationFrame(fn);
    else setTimeout(fn, 16);
  }
  /* Coalesce a burst of events (scroll, resize) into one frame of work. */
  function batched(fn) {
    var pending = false;
    return function () {
      if (pending) return;
      pending = true;
      frame(function () {
        pending = false;
        fn();
      });
    };
  }
  var reduceMotion = mq("(prefers-reduced-motion: reduce)");
  function reduced() {
    return !!(reduceMotion && reduceMotion.matches);
  }

  /* ------------------------------------------------------------ 6. icon set */

  /* Interface glyphs only. The brand/social marks are inlined directly in the
     page footer so they render with JS disabled — they are deliberately NOT
     duplicated here. One source per icon. */
  var ICONS = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 11l5 5 5-5M4 20h16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 13h6M9 17h6"/></svg>'
  };

  function icon(name) {
    return ICONS[name] || "";
  }

  /* Fills <span data-icon="mail"></span> with the matching sprite. Only ever
     writes our own static markup, and never overwrites existing content. */
  function paintIcons(scope) {
    each(queryAll("[data-icon]", scope), function (el) {
      var markup = icon(el.getAttribute("data-icon"));
      if (markup && !el.firstChild) {
        el.innerHTML = markup;
        el.setAttribute("aria-hidden", "true");
      }
    });
  }

  /* ------------------------------------------------------------- 1. header  */

  var header = null;

  function headerHeight() {
    if (!header) return 0;
    var box = header.getBoundingClientRect();
    /* A static (non-sticky) header shouldn't offset anchors. */
    var position = window.getComputedStyle ? window.getComputedStyle(header).position : "";
    if (position !== "fixed" && position !== "sticky") return 0;
    return box.height || 0;
  }
  function headerOffset() {
    var height = headerHeight();
    return height ? height + ANCHOR_GAP : 0;
  }
  function measureHeader() {
    /* Republish the MEASURED header height into the variable the stylesheet
       actually reads (core.css: --header-h drives scroll-padding-top and the
       mobile sheet's top padding). Never write a zero: a non-sticky header
       measures 0 here, and stamping that inline would defeat the CSS value.

       This is a feedback loop by design — the value we write is the value that
       sizes the thing we measure — so it only converges because core.css sizes
       the bar at calc(var(--header-h) - 1px) and the measurement includes the
       hairline. Writing only on a real change keeps it from thrashing. */
    var height = Math.round(headerHeight());
    if (height <= 0) return;
    var next = height + "px";
    if (root.style.getPropertyValue("--header-h") !== next) {
      root.style.setProperty("--header-h", next);
    }
  }

  function initHeader() {
    header = pick("[data-header]", ".site-header", "header.site-header");
    if (!header) return;

    var apply = batched(function () {
      var scrolled = (window.pageYOffset || root.scrollTop || 0) > SCROLL_AT;
      header.classList.toggle(CLASS.scrolled, scrolled);
    });
    var remeasure = batched(function () {
      measureHeader();
      var scrolled = (window.pageYOffset || root.scrollTop || 0) > SCROLL_AT;
      header.classList.toggle(CLASS.scrolled, scrolled);
    });

    measureHeader();
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", remeasure);
  }

  /* --------------------------------------------------------- 2. mobile menu */

  var menu = {
    isOpen: function () { return false; },
    open: function () {},
    close: function () {},
    toggle: function () {}
  };

  var FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    'input:not([disabled]):not([type="hidden"])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");

  function initMenu() {
    var button = pick("[data-menu-toggle]", ".nav-toggle", ".menu-toggle");
    if (!button) return;

    /* The primary nav IS the mobile sheet (core.css §10) — there is no
       separate panel to find or build. An aria-controls that points at a
       missing id is repaired below rather than trusted. */
    var controls = button.getAttribute("aria-controls");
    var panel =
      (controls && document.getElementById(controls)) ||
      pick("[data-menu]", "#mobileMenu", "#site-menu", ".site-nav", ".nav");
    if (!panel) return;

    if (!panel.id) panel.id = "mobileMenu";
    button.setAttribute("aria-controls", panel.id);
    button.setAttribute("aria-expanded", "false");

    /* Swap the hamburger for a close glyph while the sheet is open. The
       resting markup is whatever the page shipped, so a failed script leaves
       a correct, working button behind. */
    var restingIcon = button.innerHTML;
    var restingLabel = button.getAttribute("aria-label") || "Open menu";

    var raw = parseInt(
      button.getAttribute("data-menu-breakpoint") ||
        panel.getAttribute("data-menu-breakpoint"),
      10
    );
    var breakpoint = raw > 0 ? raw : MENU_BREAKPOINT;
    var open = false;
    var cachedStops = null;

    function visible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    }
    /* Computed once per open: recomputing per Tab forced a reflow on every
       keystroke inside the trap. */
    function stops() {
      if (!cachedStops) {
        cachedStops = [button].concat(queryAll(FOCUSABLE, panel).filter(visible));
      }
      return cachedStops;
    }

    function openMenu() {
      if (open) return;
      open = true;
      cachedStops = null;
      panel.classList.add(CLASS.open);
      button.classList.add(CLASS.open);
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
      button.innerHTML = icon("close") || restingIcon;
      /* The scroll lock is a CSS rule on html.is-menu-open, so there is no
         inline style to save and restore. */
      root.classList.add(CLASS.menuOpen);
      document.addEventListener("keydown", onKeydown, true);
      frame(function () {
        if (!open) return;
        cachedStops = null;
        var first = stops()[1];
        if (first) first.focus();
      });
    }

    function closeMenu(restoreFocus) {
      if (!open) return;
      open = false;
      cachedStops = null;
      var hadFocus = panel.contains(document.activeElement);
      panel.classList.remove(CLASS.open);
      button.classList.remove(CLASS.open);
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", restingLabel);
      button.innerHTML = restingIcon;
      root.classList.remove(CLASS.menuOpen);
      document.removeEventListener("keydown", onKeydown, true);
      if (restoreFocus !== false && hadFocus) button.focus();
    }

    function onKeydown(event) {
      if (!open) return;
      if (event.key === "Escape" || event.key === "Esc") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab") return;
      var items = stops();
      if (!items.length) return;
      var index = items.indexOf(document.activeElement);
      var next;
      if (event.shiftKey) next = index <= 0 ? items[items.length - 1] : items[index - 1];
      else next = index === -1 || index === items.length - 1 ? items[0] : items[index + 1];
      event.preventDefault();
      next.focus();
    }

    button.addEventListener("click", function (event) {
      event.preventDefault();
      if (open) closeMenu(true);
      else openMenu();
    });

    /* Any link inside the sheet navigates, so the sheet should get out of the
       way; a click on its own backdrop dismisses it too. */
    panel.addEventListener("click", function (event) {
      if (!open) return;
      if (event.target === panel || closest(event.target, "a[href]")) closeMenu(false);
    });

    /* Past the breakpoint the desktop nav takes over: never leave the overlay
       state (and the scroll lock) behind. */
    var wide = mq("(min-width: " + (breakpoint + 1) + "px)");
    if (wide) {
      onMq(wide, function (event) { if (event.matches) closeMenu(false); });
    } else {
      window.addEventListener("resize", batched(function () {
        if (window.innerWidth > breakpoint) closeMenu(false);
      }));
    }

    menu = {
      isOpen: function () { return open; },
      open: openMenu,
      close: function () { closeMenu(true); },
      toggle: function () { if (open) closeMenu(true); else openMenu(); }
    };
  }

  /* ------------------------------------------------------------- 3. reveal  */

  var observer = null;

  function revealNow(el) {
    el.classList.add(CLASS.revealed);
  }
  function revealAll() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    root.classList.remove(CLASS.revealReady);
    each(queryAll("[data-reveal]"), revealNow);
  }

  /* Observe any [data-reveal] inside `scope` (defaults to the document).
     Safe to call again after injecting content. */
  function reveal(scope) {
    var targets = queryAll("[data-reveal]", scope);
    if (!targets.length) return;
    if (!observer) {
      each(targets, revealNow);
      return;
    }
    each(targets, function (el) {
      if (!el.classList.contains(CLASS.revealed)) observer.observe(el);
    });
  }

  function initReveal() {
    var targets = queryAll("[data-reveal]");
    if (!targets.length) return;

    /* No observer, or the reader asked for less motion: show everything and
       never add the class the hidden state depends on. */
    if (!("IntersectionObserver" in window) || reduced()) {
      each(targets, revealNow);
      return;
    }

    /* The hidden state lives behind .reveal-ready on <html> (core.css §13), so
       a failed or blocked script can never hide content: the class is simply
       absent and [data-reveal] has no styles at all. */
    root.classList.add(CLASS.revealReady);

    var fired = false;
    var safety = setTimeout(function () {
      if (!fired) revealAll();
    }, 2000);

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          fired = true;
          clearTimeout(safety);
          revealNow(entry.target);
          if (observer) observer.unobserve(entry.target);
        });
      },
      /* threshold MUST stay 0. A block taller than the viewport can never
         reach a ratio of 0.05 — it intersects, but only ever by a sliver of
         its own height — so any positive threshold leaves the tallest
         sections on the page permanently invisible. */
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    each(targets, function (el) { observer.observe(el); });

    /* Backstop. The observer can still be skipped: a fast scroll, an anchor
       jump, a restored scroll position, or a resize that moves an element
       past the viewport without a callback. Once a block's top edge has
       passed the bottom of the viewport it must be visible, no exceptions —
       the reveal is decoration, and decoration never gets to hide content.
       This runs after the global `safety` timeout has been cleared, which
       only ever fires when NOTHING revealed. */
    var queued = false;
    function sweep() {
      queued = false;
      var pending = 0;
      each(queryAll("[data-reveal]"), function (el) {
        if (el.classList.contains(CLASS.revealed)) return;
        if (el.getBoundingClientRect().top < window.innerHeight) {
          revealNow(el);
          if (observer) observer.unobserve(el);
        } else {
          pending++;
        }
      });
      if (!pending) {
        window.removeEventListener("scroll", queueSweep);
        window.removeEventListener("resize", queueSweep);
      }
    }
    function queueSweep() {
      if (queued) return;
      queued = true;
      if (window.requestAnimationFrame) window.requestAnimationFrame(sweep);
      else setTimeout(sweep, 60);
    }
    window.addEventListener("scroll", queueSweep, { passive: true });
    window.addEventListener("resize", queueSweep, { passive: true });
    queueSweep();

    /* Printing must never lose a section that hasn't scrolled into view. */
    window.addEventListener("beforeprint", revealAll);
    onMq(reduceMotion, function (event) { if (event.matches) revealAll(); });
  }

  /* ------------------------------------------------- 4. in-page anchor jumps */

  function scrollToTarget(target) {
    var el = typeof target === "string" ? query(target) : target;
    if (!el || !el.getBoundingClientRect) return false;
    var top = el.getBoundingClientRect().top + (window.pageYOffset || 0) - headerOffset();
    if (top < 0) top = 0;
    var smooth = !reduced() && "scrollBehavior" in root.style;
    if (smooth) window.scrollTo({ top: top, behavior: "smooth" });
    else window.scrollTo(0, top);
    focusQuietly(el);
    return true;
  }

  /* Move keyboard focus to the destination without yanking the scroll. */
  function focusQuietly(el) {
    if (!el.hasAttribute("tabindex")) {
      el.setAttribute("tabindex", "-1");
      el.addEventListener("blur", function handler() {
        el.removeAttribute("tabindex");
        el.removeEventListener("blur", handler);
      });
    }
    try {
      el.focus({ preventScroll: true });
    } catch (e) {
      /* older browsers ignore the options object; focus is optional here */
    }
  }

  function anchorTarget(hash) {
    if (!hash || hash.length < 2) return null;
    var id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch (e) {
      /* keep the raw id */
    }
    return document.getElementById(id) || query('[name="' + id.replace(/"/g, '\\"') + '"]');
  }

  function initAnchors() {
    document.addEventListener("click", function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      var link = closest(event.target, "a[href]");
      if (!link || link.hasAttribute("data-no-smooth") || link.target === "_blank") return;

      var href = link.getAttribute("href");
      if (!href || href.charAt(0) !== "#" || href.length < 2) return;

      var target = anchorTarget(href);
      if (!target) return;

      /* Reduced motion: let the browser jump natively (CSS scroll-padding-top
         keeps the heading clear of the sticky header). */
      if (reduced()) return;

      event.preventDefault();
      menu.close();
      scrollToTarget(target);
      try {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      } catch (e) {
        /* file:// and sandboxed contexts can refuse history writes */
      }
    });

    /* Landing on /page#section must clear the sticky header too. */
    if (window.location.hash) {
      var landing = anchorTarget(window.location.hash);
      if (landing) {
        setTimeout(function () {
          var top = landing.getBoundingClientRect().top + (window.pageYOffset || 0) - headerOffset();
          window.scrollTo(0, top < 0 ? 0 : top);
        }, 0);
      }
    }
  }

  /* ---------------------------------------------------- 5. current-page nav */

  function normalizePath(path) {
    var p = path || "/";
    try {
      p = decodeURIComponent(p);
    } catch (e) {
      /* keep the raw path */
    }
    p = p.toLowerCase().replace(/\/index\.html?$/, "/").replace(/\.html?$/, "");
    if (p.length > 1) p = p.replace(/\/+$/, "");
    return p || "/";
  }

  function initNavState() {
    var links = [];
    each(queryAll("[data-nav] a[href], a.nav-link, .site-nav a[href]"), function (a) {
      if (links.indexOf(a) === -1 && !a.hasAttribute("data-nav-skip")) links.push(a);
    });
    if (!links.length) return;

    var here = normalizePath(window.location.pathname);
    var exact = [];
    var section = [];

    each(links, function (a) {
      var href = a.getAttribute("href") || "";
      if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;
      var url;
      try {
        url = new URL(href, window.location.href);
      } catch (e) {
        return;
      }
      if (url.origin !== window.location.origin) return;
      var path = normalizePath(url.pathname);
      if (path === here) exact.push(a);
      else if (path !== "/" && here.indexOf(path + "/") === 0) section.push(a);
    });

    var winners = exact.length ? exact : section;
    var precise = exact.length > 0;
    each(winners, function (a) {
      a.classList.add(CLASS.active);
      a.setAttribute("aria-current", precise ? "page" : "true");
    });
  }

  /* ------------------------------------------------------------- public API */

  window.AY = {
    icon: icon,
    icons: function () { return Object.keys(ICONS); },
    paintIcons: paintIcons,
    menu: {
      isOpen: function () { return menu.isOpen(); },
      open: function () { menu.open(); },
      close: function () { menu.close(); },
      toggle: function () { menu.toggle(); }
    },
    reveal: reveal,
    revealAll: revealAll,
    scrollTo: scrollToTarget,
    headerOffset: headerOffset,
    prefersReducedMotion: reduced
  };

  /* ------------------------------------------------------------------ start */

  function start() {
    paintIcons(document);
    initHeader();
    initMenu();
    initNavState();
    initReveal();
    initAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
