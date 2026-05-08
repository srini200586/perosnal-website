(function () {
  "use strict";

  var nav = document.getElementById("site-nav");
  var toggle = document.querySelector(".nav-toggle");
  var yearEl = document.getElementById("year");
  var toTop = document.getElementById("to-top");
  var siteHeader = document.getElementById("site-header");
  var rotateEl = document.getElementById("hero-rotate");
  var rotatePhrases = [
    "AEMaaCS · Headless · MSM",
    "SAFe Product Owner & Manager",
    "Enterprise AEM · GenAI delivery",
  ];
  var rotateIndex = 0;
  var rotateTimer;

  function setNavOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.classList.toggle("is-active", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!nav.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (window.matchMedia("(max-width: 767px)").matches) {
          setNavOpen(false);
        }
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setNavOpen(false);
      }
    });
    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setNavOpen(false);
      }
    });
  }

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function tickRotate() {
    if (!rotateEl) return;
    rotateEl.textContent = rotatePhrases[rotateIndex];
    rotateIndex = (rotateIndex + 1) % rotatePhrases.length;
  }

  if (rotateEl) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rotateEl.textContent = rotatePhrases[0];
    } else {
      tickRotate();
      rotateTimer = window.setInterval(tickRotate, 2800);
      window.addEventListener(
        "beforeunload",
        function () {
          if (rotateTimer) window.clearInterval(rotateTimer);
        },
        { once: true },
      );
    }
  }

  function onScrollUi() {
    var y = window.scrollY;
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", y > 16);
    }
    if (toTop) {
      toTop.classList.toggle("is-visible", y > 420);
    }
  }

  window.addEventListener("scroll", onScrollUi, { passive: true });
  onScrollUi();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var sections = document.querySelectorAll("main section[id]:not(#hero)");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  function onNavScroll() {
    var y = window.scrollY + 120;
    var current = "";
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var h = sec.offsetHeight;
      if (y >= top && y < top + h) {
        current = sec.getAttribute("id") || "";
      }
    });
    navLinks.forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href || href === "#") return;
      var id = href.slice(1);
      if (id === current) {
        a.setAttribute("aria-current", "page");
      } else {
        a.removeAttribute("aria-current");
      }
    });
  }

  if (sections.length && navLinks.length) {
    window.addEventListener("scroll", onNavScroll, { passive: true });
    onNavScroll();
  }
})();
