/* ============================================================================
   yatawara.com — SHELL
   The site's nervous system: boot sequence, command palette (Cmd/Ctrl-K),
   theme, scroll progress + reveal, system HUD, magnetic UI, view transitions,
   easter eggs. Dependency-free. Exposes window.AY for other modules.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var EMAIL = "ayatawara@csub.edu";

  /* ---------- icon set ---------- */
  var ICON = {
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    arrow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19"/></svg>',
    moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    term:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>',
    bot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="8" width="16" height="11" rx="3"/><path d="M12 3v3M8 13h.01M16 13h.01M9 19v2M15 19v2"/></svg>',
    mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    github:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.3-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9 9 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5.1.3.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.3 10.3 0 0 0 22 12.3C22 6.6 17.5 2 12 2Z"/></svg>',
    scholar:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 1 8l11 6 9-4.9V16h2V8L12 2Z"/><path d="M5 13.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8Z"/></svg>',
    orcid:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8.3 7.4a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8ZM7.5 10.3H9v6.3H7.5v-6.3Zm3 0h2.9c2.8 0 4 2 4 3.1 0 1.7-1.3 3.2-4 3.2h-2.9v-6.3Zm1.5 1.3v3.7h1.3c1.8 0 2.5-.9 2.5-1.9 0-1.1-.8-1.8-2.5-1.8H12Z"/></svg>',
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21H17v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9V9Z"/></svg>',
    play:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5-13-7.5Z"/></svg>',
    ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M21 3l-9 9M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>',
    dice:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01"/></svg>',
    code:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>',
    page:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4M9 13h6M9 17h6"/></svg>',
    chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M7 14l3-4 3 3 5-7"/></svg>',
    copy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
  };
  function svg(name){ return ICON[name] || ""; }

  /* ---------- nav model (single source of truth for palette + mobile) ---------- */
  var NAV = [
    { label:"Home",         href:"/index.html",        icon:"term",  keys:"home start" },
    { label:"Research",     href:"/research.html",     icon:"chart", keys:"volatility garch econometrics memory papers" },
    { label:"Publications", href:"/publications.html", icon:"page",  keys:"papers articles journals" },
    { label:"Teaching",     href:"/teaching.html",     icon:"page",  keys:"courses classes students math 3200 4200" },
    { label:"Consulting",   href:"/consulting.html",   icon:"chart", keys:"services dashboards hire data science" },
    { label:"KernelStats",  href:"/kernelstats.html",  icon:"code",  keys:"software stats platform free tool" },
    { label:"Games",        href:"/games/index.html",  icon:"play",  keys:"play arcade sigma basco continuous" },
    { label:"CV",           href:"/cv.html",           icon:"page",  keys:"resume curriculum vitae" },
    { label:"Blog",         href:"/blog.html",         icon:"page",  keys:"writing posts essays" }
  ];

  var SOCIAL = [
    { label:"GitHub",         href:"https://github.com/anjana-yatawara", icon:"github" },
    { label:"Google Scholar", href:"https://scholar.google.com/citations?user=n5WtVd0AAAAJ&hl=en&oi=ao", icon:"scholar" },
    { label:"ORCID",          href:"https://orcid.org/0009-0007-8506-7763", icon:"orcid" },
    { label:"LinkedIn",       href:"https://www.linkedin.com/in/anjana-yatawara", icon:"linkedin" }
  ];

  /* ====================================================================== *
   *  THEME
   * ====================================================================== */
  function getTheme(){ return document.documentElement.getAttribute("data-theme") || "dark"; }
  function setTheme(t, persist){
    document.documentElement.setAttribute("data-theme", t);
    if (persist !== false) { try { localStorage.setItem("ay-theme", t); } catch(e){} }
    document.querySelectorAll("[data-theme-icon]").forEach(function(el){
      el.innerHTML = t === "light" ? svg("moon") : svg("sun");
    });
  }
  function toggleTheme(){
    var next = getTheme() === "light" ? "dark" : "light";
    if (document.startViewTransition && !prefersReduced) document.startViewTransition(function(){ setTheme(next); });
    else setTheme(next);
  }

  /* ====================================================================== *
   *  HEADER: scrolled state, active link, mobile menu
   * ====================================================================== */
  function initHeader(){
    var header = document.querySelector(".site-header");
    if (header){
      var onScroll = function(){ header.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll(); window.addEventListener("scroll", onScroll, { passive:true });
    }
    // active link
    var path = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav-link").forEach(function(a){
      var href = (a.getAttribute("href")||"").replace(/index\.html$/, "").replace(/\/$/, "") || "/";
      if (href === path) a.classList.add("active");
    });
    // theme buttons
    document.querySelectorAll("[data-theme-toggle]").forEach(function(btn){
      btn.addEventListener("click", toggleTheme);
    });
    setTheme(getTheme(), false);

    // build mobile menu
    var menu = document.createElement("div");
    menu.className = "mobile-menu"; menu.id = "mobileMenu";
    var html = "";
    NAV.forEach(function(n, i){
      html += '<a class="m-link" href="'+n.href+'"><span class="idx">0'+(i+1)+'</span>'+n.label+'</a>';
    });
    html += '<div class="m-socials">';
    SOCIAL.forEach(function(s){ html += '<a href="'+s.href+'" target="_blank" rel="noopener" aria-label="'+s.label+'">'+svg(s.icon)+'</a>'; });
    html += '<a href="mailto:'+EMAIL+'" aria-label="Email">'+svg("mail")+'</a></div>';
    menu.innerHTML = html;
    document.body.appendChild(menu);

    var toggle = document.querySelector(".nav-toggle");
    function closeMenu(){ menu.classList.remove("open"); if(toggle) toggle.setAttribute("aria-expanded","false"); document.body.style.overflow=""; }
    if (toggle){
      toggle.addEventListener("click", function(){
        var open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        document.body.style.overflow = open ? "hidden" : "";
      });
    }
    menu.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeMenu); });
  }

  /* ====================================================================== *
   *  COMMAND PALETTE
   * ====================================================================== */
  var cmdk = { open:false, items:[], filtered:[], idx:0, el:null, input:null, list:null };

  function buildCommands(){
    var cmds = [];
    NAV.forEach(function(n){ cmds.push({ group:"Navigate", title:n.label, sub:n.href, icon:n.icon, keys:n.keys, run:function(){ go(n.href); } }); });

    cmds.push({ group:"Actions", title:"Ask Yatta Jr.", sub:"Anjana's AI assistant", icon:"bot", keys:"ai ask question chat yatta", run:function(){ AY.ask(""); } });
    cmds.push({ group:"Actions", title:"Toggle theme", sub:"Switch light / dark", icon:"sun", keys:"dark light mode theme", run:function(){ toggleTheme(); }, keep:true });
    cmds.push({ group:"Actions", title:"Copy email", sub:EMAIL, icon:"copy", keys:"contact mail address", run:function(){ copy(EMAIL, "email copied"); } });
    cmds.push({ group:"Actions", title:"Download CV", sub:"PDF", icon:"page", keys:"resume cv pdf download", run:function(){ window.open("/assets/Yatawara_CV.pdf","_blank"); } });
    cmds.push({ group:"Actions", title:"Surprise me", sub:"Jump somewhere random", icon:"dice", keys:"random lucky", run:function(){ go(NAV[1 + Math.floor(Math.random()*(NAV.length-1))].href); } });

    cmds.push({ group:"Play", title:"Acts of the Continuous", sub:"MATH 3200 study game", icon:"play", keys:"game study probability", run:function(){ go("/games/acts_of_the_continuous.html"); } });
    cmds.push({ group:"Play", title:"Sigma Strike", sub:"Defend the distribution", icon:"play", keys:"game shooter outliers", run:function(){ go("/games/sigma-strike.html"); } });
    cmds.push({ group:"Play", title:"Revenge of the Basco", sub:"One-tap chaos", icon:"play", keys:"game flappy fire", run:function(){ go("/games/revenge-of-the-basco.html"); } });

    cmds.push({ group:"External", title:"KernelStats", sub:"kernelstats.com — free stats platform", icon:"ext", keys:"software app tool", run:function(){ window.open("https://kernelstats.com","_blank"); } });
    SOCIAL.forEach(function(s){ cmds.push({ group:"External", title:s.label, sub:s.href.replace(/^https?:\/\//,""), icon:s.icon, keys:"social profile link", run:function(){ window.open(s.href,"_blank"); } }); });
    cmds.push({ group:"External", title:"View source", sub:"GitHub repository", icon:"github", keys:"code repo source", run:function(){ window.open("https://github.com/anjana-yatawara","_blank"); } });
    return cmds;
  }

  function go(href){
    if (document.startViewTransition && !prefersReduced){ location.href = href; }
    else { location.href = href; }
  }

  function buildCmdkDom(){
    var bd = document.createElement("div");
    bd.className = "cmdk-backdrop"; bd.id = "cmdk";
    bd.innerHTML =
      '<div class="cmdk" role="dialog" aria-modal="true" aria-label="Command palette">' +
        '<div class="cmdk-input-row">' +
          '<span class="prompt">&gt;</span>' +
          '<input class="cmdk-input" type="text" autocomplete="off" spellcheck="false" placeholder="Search, run a command, or ask anything…" aria-label="Command input">' +
          '<span class="cmdk-esc">ESC</span>' +
        '</div>' +
        '<div class="cmdk-list" role="listbox"></div>' +
        '<div class="cmdk-foot"><span><span class="k">↑</span><span class="k">↓</span> navigate</span><span><span class="k">↵</span> select</span><span><span class="k">esc</span> close</span><span style="margin-left:auto">type to <b style="color:var(--green)">ask</b></span></div>' +
      '</div>';
    document.body.appendChild(bd);
    cmdk.el = bd;
    cmdk.input = bd.querySelector(".cmdk-input");
    cmdk.list = bd.querySelector(".cmdk-list");
    cmdk.items = buildCommands();

    bd.addEventListener("click", function(e){ if (e.target === bd) closeCmdk(); });
    bd.querySelector(".cmdk-esc").addEventListener("click", closeCmdk);
    cmdk.input.addEventListener("input", function(){ renderCmdk(cmdk.input.value); });
    cmdk.input.addEventListener("keydown", onCmdkKey);
  }

  function score(item, q){
    var hay = (item.title + " " + (item.sub||"") + " " + (item.keys||"") + " " + item.group).toLowerCase();
    q = q.toLowerCase().trim();
    if (!q) return 1;
    if (item.title.toLowerCase().indexOf(q) === 0) return 100;
    if (hay.indexOf(q) !== -1) return 50;
    // subsequence (fuzzy)
    var qi = 0; for (var i=0;i<hay.length && qi<q.length;i++){ if (hay[i]===q[qi]) qi++; }
    return qi === q.length ? 10 : 0;
  }

  function renderCmdk(q){
    q = q || "";
    var matched = cmdk.items.map(function(it){ return { it:it, s:score(it,q) }; })
                            .filter(function(x){ return x.s>0; })
                            .sort(function(a,b){ return b.s-a.s; })
                            .map(function(x){ return x.it; });
    cmdk.filtered = [];
    var html = "";
    // ask suggestion when there's free text
    var qt = q.trim();
    if (qt && !/^(home|research|publication|teaching|consulting|kernel|games?|cv|blog)/i.test(qt)) {
      html += '<div class="cmdk-group-label">Ask my work</div>';
      html += cmdkItemHtml({ title:'Ask: "'+escapeHtml(qt)+'"', sub:"Answer from Anjana's research concierge", icon:"bot" }, 0);
      cmdk.filtered.push({ run:function(){ AY.ask(qt); } });
    }
    var groups = {};
    matched.forEach(function(it){ (groups[it.group] = groups[it.group]||[]).push(it); });
    Object.keys(groups).forEach(function(g){
      html += '<div class="cmdk-group-label">'+g+'</div>';
      groups[g].forEach(function(it){
        var i = cmdk.filtered.length;
        html += cmdkItemHtml(it, i);
        cmdk.filtered.push(it);
      });
    });
    if (!cmdk.filtered.length) html = '<div class="cmdk-empty">no matches — press ↵ to ask</div>';
    cmdk.list.innerHTML = html;
    cmdk.idx = 0; highlight();
    Array.prototype.forEach.call(cmdk.list.querySelectorAll(".cmdk-item"), function(node, i){
      node.addEventListener("click", function(){ exec(i); });
      node.addEventListener("mousemove", function(){ cmdk.idx = i; highlight(); });
    });
  }
  function cmdkItemHtml(it, i){
    return '<div class="cmdk-item" role="option" data-i="'+i+'">' +
        '<span class="ci-ico">'+svg(it.icon)+'</span>' +
        '<span class="ci-main"><span class="ci-title">'+it.title+'</span>'+(it.sub?'<span class="ci-sub"> · '+it.sub+'</span>':'')+'</span>' +
        (it.hint?'<span class="ci-hint">'+it.hint+'</span>':'') +
      '</div>';
  }
  function highlight(){
    var nodes = cmdk.list.querySelectorAll(".cmdk-item");
    nodes.forEach(function(n,i){ n.classList.toggle("active", i===cmdk.idx); });
    if (nodes[cmdk.idx]) nodes[cmdk.idx].scrollIntoView({ block:"nearest" });
  }
  function exec(i){
    var it = cmdk.filtered[i]; if (!it) return;
    var keep = it.keep;
    if (!keep) closeCmdk();
    if (it.run) it.run();
    if (keep) renderCmdk(cmdk.input.value);
  }
  function onCmdkKey(e){
    if (e.key === "ArrowDown"){ e.preventDefault(); cmdk.idx = Math.min(cmdk.idx+1, cmdk.filtered.length-1); highlight(); }
    else if (e.key === "ArrowUp"){ e.preventDefault(); cmdk.idx = Math.max(cmdk.idx-1, 0); highlight(); }
    else if (e.key === "Enter"){
      e.preventDefault();
      if (cmdk.filtered[cmdk.idx]) exec(cmdk.idx);
      else if (cmdk.input.value.trim()){ var q=cmdk.input.value.trim(); closeCmdk(); AY.ask(q); }
    }
    else if (e.key === "Escape"){ e.preventDefault(); closeCmdk(); }
  }
  function openCmdk(prefill){
    if (!cmdk.el) buildCmdkDom();
    cmdk.open = true; cmdk.el.classList.add("open");
    cmdk.input.value = prefill || "";
    renderCmdk(cmdk.input.value);
    setTimeout(function(){ cmdk.input.focus(); }, 30);
  }
  function closeCmdk(){ if (cmdk.el){ cmdk.open=false; cmdk.el.classList.remove("open"); } }

  /* ====================================================================== *
   *  ASK bridge  — routes to ask-console if present, else home page
   * ====================================================================== */
  function ask(q){
    var console = document.querySelector('[data-component="ask-console"]');
    if (console){
      window.dispatchEvent(new CustomEvent("ay:ask", { detail:{ q:q } }));
      console.scrollIntoView({ behavior: prefersReduced ? "auto":"smooth", block:"center" });
    } else {
      location.href = "/index.html?ask=" + encodeURIComponent(q || "");
    }
  }

  /* ====================================================================== *
   *  GLOBAL HOTKEYS
   * ====================================================================== */
  function initHotkeys(){
    document.addEventListener("keydown", function(e){
      var k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === "k"){ e.preventDefault(); cmdk.open ? closeCmdk() : openCmdk(); return; }
      var typing = /^(input|textarea|select)$/i.test(e.target.tagName) || e.target.isContentEditable;
      if (!typing && k === "/" && !cmdk.open){ e.preventDefault(); openCmdk(); }
    });
    document.querySelectorAll("[data-cmdk-open]").forEach(function(b){
      b.addEventListener("click", function(){ openCmdk(); });
    });
  }

  /* ====================================================================== *
   *  SCROLL PROGRESS + REVEAL
   * ====================================================================== */
  function initScroll(){
    var bar = document.createElement("div"); bar.className = "scroll-progress"; document.body.appendChild(bar);
    var tick = function(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h>0 ? (window.scrollY/h*100):0) + "%";
    };
    tick(); window.addEventListener("scroll", tick, { passive:true }); window.addEventListener("resize", tick);

    var reveals = document.querySelectorAll("[data-reveal]");
    if (prefersReduced || !("IntersectionObserver" in window)){
      reveals.forEach(function(el){ el.classList.add("in"); }); return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin:"0px 0px -8% 0px", threshold:0.08 });
    reveals.forEach(function(el){ io.observe(el); });
  }

  /* ====================================================================== *
   *  MAGNETIC + CARD SPOTLIGHT
   * ====================================================================== */
  function initPointerFx(){
    if (!finePointer || prefersReduced) return;
    document.querySelectorAll("[data-magnetic]").forEach(function(el){
      el.addEventListener("mousemove", function(e){
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width/2) * 0.25;
        var y = (e.clientY - r.top - r.height/2) * 0.35;
        el.style.transform = "translate("+x+"px,"+y+"px)";
      });
      el.addEventListener("mouseleave", function(){ el.style.transform=""; });
    });
    document.querySelectorAll(".card.spot").forEach(function(card){
      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX-r.left)+"px");
        card.style.setProperty("--my", (e.clientY-r.top)+"px");
      });
    });
  }

  /* ====================================================================== *
   *  SYSTEM HUD  (live clock + status)
   * ====================================================================== */
  function initHud(){
    if (document.querySelector(".hud")) return;
    var hud = document.createElement("div"); hud.className = "hud";
    hud.innerHTML =
      '<span class="hud-cell"><span class="live-dot"></span><b>kernel</b> online</span>' +
      '<span class="hud-cell" id="hudClock">--:--:--</span>';
    document.body.appendChild(hud);
    var clock = hud.querySelector("#hudClock");
    var t = function(){
      var d = new Date();
      var p = function(n){ return (n<10?"0":"")+n; };
      clock.textContent = p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds())+" PST".replace("PST", Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop().slice(0,3).toUpperCase());
    };
    t(); setInterval(t, 1000);
  }

  /* ====================================================================== *
   *  BOOT SEQUENCE  (once per session)
   * ====================================================================== */
  function initBoot(done){
    var seen; try { seen = sessionStorage.getItem("ay-booted"); } catch(e){}
    if (seen || prefersReduced){ done(); return; }
    try { sessionStorage.setItem("ay-booted","1"); } catch(e){}

    var boot = document.createElement("div"); boot.className = "boot";
    boot.innerHTML =
      '<div class="boot-inner">' +
        '<div class="boot-logo"><span class="glyph">AY</span><span>yatawara<span style="color:var(--dim)">.com</span></span></div>' +
        '<div class="boot-lines" id="bootLines"></div>' +
        '<div class="boot-bar"><i id="bootBar"></i></div>' +
        '<div class="boot-skip">press any key to skip →</div>' +
      '</div>';
    document.body.appendChild(boot);
    document.body.style.overflow = "hidden";

    var lines = [
      'initializing <span class="accent">computational interface</span>…',
      'loading volatility-memory kernel  <span class="ok">[α ≈ 0.27]</span>',
      'mounting research // teaching // play modules  <span class="ok">ok</span>',
      'calibrating sub-exponential decay  <span class="ok">ok</span>',
      'system ready. <span class="accent">welcome.</span>'
    ];
    var box = boot.querySelector("#bootLines"), bar = boot.querySelector("#bootBar");
    var i = 0, finished = false;
    function finish(){
      if (finished) return; finished = true;
      boot.classList.add("done"); document.body.style.overflow = "";
      setTimeout(function(){ boot.remove(); }, 650);
      done();
    }
    function step(){
      if (i < lines.length){
        var ln = document.createElement("div"); ln.className = "ln show"; ln.innerHTML = "&gt; " + lines[i];
        box.appendChild(ln);
        bar.style.width = Math.round((i+1)/lines.length*100) + "%";
        i++; setTimeout(step, 260);
      } else { setTimeout(finish, 420); }
    }
    step();
    var skip = function(){ finish(); window.removeEventListener("keydown", skip); boot.removeEventListener("click", skip); };
    window.addEventListener("keydown", skip); boot.addEventListener("click", skip);
  }

  /* ====================================================================== *
   *  EASTER EGG — Konami
   * ====================================================================== */
  function initKonami(){
    var seq = [38,38,40,40,37,39,37,39,66,65], pos = 0;
    document.addEventListener("keydown", function(e){
      pos = (e.keyCode === seq[pos]) ? pos+1 : (e.keyCode === seq[0] ? 1 : 0);
      if (pos === seq.length){ pos = 0; location.href = "/games/sigma-strike.html"; }
    });
  }

  /* ---------- utils ---------- */
  function copy(text, msg){
    if (navigator.clipboard){ navigator.clipboard.writeText(text).then(function(){ toast(msg||"copied"); }); }
    else toast(text);
  }
  function toast(msg){
    var t = document.createElement("div"); t.textContent = msg;
    t.style.cssText = "position:fixed;left:50%;bottom:28px;transform:translateX(-50%);z-index:200;background:var(--bg-2);border:1px solid var(--border-2);color:var(--text);font-family:var(--font-mono);font-size:.75rem;padding:.6rem 1rem;border-radius:10px;box-shadow:var(--shadow-2);opacity:0;transition:opacity .25s";
    document.body.appendChild(t); requestAnimationFrame(function(){ t.style.opacity="1"; });
    setTimeout(function(){ t.style.opacity="0"; setTimeout(function(){ t.remove(); }, 300); }, 1600);
  }
  function escapeHtml(s){ return String(s).replace(/[&<>"]/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]; }); }

  /* ---------- public API ---------- */
  window.AY = {
    openCmdk: openCmdk, closeCmdk: closeCmdk,
    setTheme: setTheme, toggleTheme: toggleTheme,
    ask: ask, toast: toast, copy: copy, icon: svg
  };

  /* ---------- boot it all ---------- */
  function start(){
    initHeader(); initHotkeys(); initScroll(); initPointerFx(); initHud(); initKonami();
    // surface ?ask= on load (home page)
    try {
      var p = new URLSearchParams(location.search);
      if (p.has("ask")) setTimeout(function(){ AY.ask(p.get("ask")); }, 400);
    } catch(e){}
  }
  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", function(){ initBoot(start); });
  } else { initBoot(start); }
})();
