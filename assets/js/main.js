(function () {
  "use strict";

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme switcher ---------- */
  var THEME_KEY = "clinchy-theme";
  var themeButtons = document.querySelectorAll("[data-theme-btn]");
  function applyTheme(name) {
    if (name === "clay") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = name;
    }
    themeButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-theme-btn") === name));
    });
    try { localStorage.setItem(THEME_KEY, name); } catch (e) {}
  }
  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyTheme(btn.getAttribute("data-theme-btn"));
    });
  });
  (function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved) applyTheme(saved);
  })();

  /* ---------- Nav scroll shadow ---------- */
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu ---------- */
  var burgerBtn = document.getElementById("burger-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  var mobileCloseBtn = document.getElementById("mobile-close-btn");
  if (burgerBtn && mobileMenu) {
    var lastFocused = null;
    function getFocusable() {
      return mobileMenu.querySelectorAll('a[href], button:not([disabled])');
    }
    function openMenu() {
      lastFocused = document.activeElement;
      mobileMenu.classList.add("is-open");
      burgerBtn.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var f = getFocusable();
      if (f.length) f[0].focus();
    }
    function closeMenu() {
      mobileMenu.classList.remove("is-open");
      burgerBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }
    burgerBtn.addEventListener("click", function () {
      if (mobileMenu.classList.contains("is-open")) closeMenu(); else openMenu();
    });
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (!mobileMenu.classList.contains("is-open")) return;
      if (e.key === "Escape") { closeMenu(); return; }
      if (e.key === "Tab") {
        var f = Array.prototype.slice.call(getFocusable());
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    document.addEventListener("click", function (e) {
      if (!mobileMenu.classList.contains("is-open")) return;
      if (mobileMenu.contains(e.target) || burgerBtn.contains(e.target)) return;
      closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = (Array.prototype.indexOf.call(el.parentElement.children, el) % 6) * 60;
            setTimeout(function () { el.classList.add("is-visible"); }, delay);
            io.unobserve(el);
          }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- FAQ accordion (single-open enhancement) ---------- */
  var faqItems = document.querySelectorAll(".faq-item");
  if (faqItems.length) {
    faqItems.forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (item.open) {
          faqItems.forEach(function (other) {
            if (other !== item) other.open = false;
          });
        }
      });
    });
  }

  /* ---------- Weekly reset countdown (Monday 00:00 local) ---------- */
  var cdDays = document.getElementById("cd-days");
  if (cdDays) {
    var cdHours = document.getElementById("cd-hours");
    var cdMins = document.getElementById("cd-mins");
    var cdSecs = document.getElementById("cd-secs");
    function nextMonday() {
      var now = new Date();
      var d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
      var day = d.getDay();
      var addDays = (8 - day) % 7;
      if (addDays === 0) addDays = 7;
      if (day === 0 && now.getDay() === 0 && now.getHours() === 0 && now.getMinutes() === 0) addDays = 7;
      d.setDate(d.getDate() + addDays);
      if (now.getDay() === 1 && now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
        return now;
      }
      return d;
    }
    function tickCountdown() {
      var target = nextMonday();
      var diff = Math.max(0, target - new Date());
      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400); s -= days * 86400;
      var hours = Math.floor(s / 3600); s -= hours * 3600;
      var mins = Math.floor(s / 60); s -= mins * 60;
      cdDays.textContent = String(days);
      cdHours.textContent = String(hours).padStart(2, "0");
      cdMins.textContent = String(mins).padStart(2, "0");
      cdSecs.textContent = String(s).padStart(2, "0");
    }
    tickCountdown();
    setInterval(tickCountdown, 1000);
  }

  /* ---------- Screenshot carousel ---------- */
  var track = document.getElementById("carousel-track");
  if (track) {
    var prevBtn = document.getElementById("carousel-prev");
    var nextBtn = document.getElementById("carousel-next");
    var dotsWrap = document.getElementById("carousel-dots");
    var items = track.querySelectorAll(".carousel__item");
    var dots = [];
    items.forEach(function (_, i) {
      var d = document.createElement("span");
      d.className = "carousel__dot" + (i === 0 ? " is-active" : "");
      dotsWrap.appendChild(d);
      dots.push(d);
    });
    function scrollByItem(dir) {
      var itemWidth = items[0].getBoundingClientRect().width + 22;
      track.scrollBy({ left: dir * itemWidth, behavior: reduceMotion ? "auto" : "smooth" });
    }
    if (prevBtn) prevBtn.addEventListener("click", function () { scrollByItem(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { scrollByItem(1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { scrollByItem(1); e.preventDefault(); }
      if (e.key === "ArrowLeft") { scrollByItem(-1); e.preventDefault(); }
    });
    var updateDots = function () {
      var center = track.scrollLeft + track.clientWidth / 2;
      var closest = 0, closestDist = Infinity;
      items.forEach(function (item, i) {
        var dist = Math.abs((item.offsetLeft + item.clientWidth / 2) - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      dots.forEach(function (d, i) { d.classList.toggle("is-active", i === closest); });
    };
    var scrollTimer;
    track.addEventListener("scroll", function () {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(updateDots, 100);
    }, { passive: true });
    updateDots();
  }

  /* ---------- Confetti ---------- */
  var confettiCanvas = document.getElementById("confetti-canvas");
  function burstConfetti(originX, originY) {
    if (!confettiCanvas || reduceMotion) return;
    var ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    var colors = ["#8B6CFF", "#B49CFF", "#FF6FB5", "#FF9BD0", "#3DDC97", "#FBBF24"];
    var particles = [];
    for (var i = 0; i < 80; i++) {
      particles.push({
        x: originX, y: originY,
        vx: (Math.random() - 0.5) * 9,
        vy: -Math.random() * 9 - 3,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.3,
        life: 0
      });
    }
    var start = null;
    function frame(ts) {
      if (!start) start = ts;
      var elapsed = ts - start;
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      particles.forEach(function (p) {
        p.vy += 0.22;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vrot;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, 1 - elapsed / 1600);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });
      if (elapsed < 1700) {
        requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      }
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Interactive decay demo ---------- */
  var demoCard = document.getElementById("demo-card");
  if (demoCard) {
    var START_PRICE = 30;
    var STEP = 2;
    var FLOOR = 1;
    var TICK_MS = 30000;
    var priceEl = document.getElementById("demo-price");
    var badgeEl = document.getElementById("demo-badge");
    var progressBar = document.getElementById("demo-progress-bar");
    var nextEl = document.getElementById("demo-next");
    var ctaBtn = document.getElementById("demo-cta");
    var statusEl = document.getElementById("demo-status");
    var earnedEl = document.getElementById("demo-earned");
    var replayBtn = document.getElementById("demo-replay");
    var balanceEl = document.getElementById("demo-balance");
    var reducedControls = document.getElementById("demo-reduced-controls");
    var stepBtn = document.getElementById("demo-step-btn");

    var price = START_PRICE;
    var tickTimer = null, progressTimer = null, tickStart = 0, taken = false;

    demoCard.dataset.reducedMotion = reduceMotion ? "true" : "false";
    if (reduceMotion && reducedControls) reducedControls.hidden = false;

    function stateFor(p) {
      if (p >= 20) return { varName: "--up", badge: "Tranquille" };
      if (p >= 10) return { varName: "--warm", badge: "Normale" };
      return { varName: "--hot", badge: "Urgente 🔥" };
    }

    function render() {
      var st = stateFor(price);
      priceEl.textContent = price + " pts";
      priceEl.style.color = "var(" + st.varName + ")";
      badgeEl.textContent = st.badge;
      badgeEl.style.color = "var(" + st.varName + ")";
      ctaBtn.textContent = "Prendre · " + price + " pts";
    }

    function updateProgress() {
      var elapsed = Date.now() - tickStart;
      var remaining = Math.max(0, TICK_MS - elapsed);
      var frac = remaining / TICK_MS;
      progressBar.style.transform = "scaleX(" + frac + ")";
      nextEl.textContent = "Prochain −2 pts dans " + Math.ceil(remaining / 1000) + " s";
    }

    function decrement() {
      if (price <= FLOOR) { stopTimers(); return; }
      price -= STEP;
      if (price < FLOOR) price = FLOOR;
      render();
      if (price <= FLOOR) stopTimers();
    }

    function stopTimers() {
      clearInterval(tickTimer); clearInterval(progressTimer);
      tickTimer = null; progressTimer = null;
    }

    function startTimers() {
      if (reduceMotion) return;
      stopTimers();
      tickStart = Date.now();
      updateProgress();
      progressTimer = setInterval(updateProgress, 100);
      tickTimer = setInterval(function () {
        tickStart = Date.now();
        decrement();
      }, TICK_MS);
    }

    function takeMission() {
      if (taken) return;
      taken = true;
      stopTimers();
      ctaBtn.classList.add("is-pressed");
      setTimeout(function () { ctaBtn.classList.remove("is-pressed"); }, 160);
      var bal = parseInt(balanceEl.textContent, 10) || 0;
      bal += price;
      balanceEl.textContent = String(bal);
      earnedEl.textContent = String(price);
      statusEl.style.color = "var(--up-bright)";
      statusEl.innerHTML = "✅ Prise ! +<span id=\"demo-earned\">" + price + "</span> points";
      var rect = ctaBtn.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top + window.scrollY);
      demoCard.classList.add("is-taken");
      replayBtn.hidden = false;
    }

    function reset() {
      taken = false;
      price = START_PRICE;
      render();
      progressBar.style.transform = "scaleX(1)";
      nextEl.textContent = "Prochain −2 pts dans 30 s";
      demoCard.classList.remove("is-taken");
      replayBtn.hidden = true;
      startTimers();
    }

    ctaBtn.addEventListener("click", takeMission);
    replayBtn.addEventListener("click", reset);
    if (stepBtn) stepBtn.addEventListener("click", function () {
      if (!taken) decrement();
    });

    render();
    startTimers();
  }

  /* ---------- Clipboard helper ---------- */
  function copyText(text, btn) {
    function done(ok) {
      if (!btn) return;
      var original = btn.textContent;
      btn.textContent = ok ? "Copié ✓" : "Échec de la copie";
      setTimeout(function () { btn.textContent = original; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); done(true); } catch (e) { done(false); }
      document.body.removeChild(ta);
    }
  }
  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy-target"));
      if (target) copyText(target.textContent.trim(), btn);
    });
  });

  /* ---------- Account deletion form ---------- */
  var deletionForm = document.getElementById("deletion-form");
  if (deletionForm) {
    var emailInput = document.getElementById("deletion-email");
    var nameInput = document.getElementById("deletion-name");
    var reasonInput = document.getElementById("deletion-reason");
    var confirmInput = document.getElementById("deletion-confirm");
    var emailError = document.getElementById("deletion-email-error");
    var confirmError = document.getElementById("deletion-confirm-error");
    var successBlock = document.getElementById("deletion-success");
    var ticketEl = document.getElementById("deletion-ticket");
    var mailtoLink = document.getElementById("deletion-mailto");
    var messageBody = document.getElementById("deletion-message-body");

    function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    deletionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      var email = emailInput.value.trim();
      if (!validEmail(email)) {
        emailError.classList.add("is-visible"); ok = false;
      } else {
        emailError.classList.remove("is-visible");
      }
      if (!confirmInput.checked) {
        confirmError.classList.add("is-visible"); ok = false;
      } else {
        confirmError.classList.remove("is-visible");
      }
      if (!ok) return;

      var ticket = "CLY-" + Date.now();
      var name = nameInput.value.trim();
      var reason = reasonInput.value.trim();
      var subject = "[Suppression de compte] " + email;
      var bodyLines = [
        "Demande de suppression de compte Clinchy",
        "Numéro de demande : " + ticket,
        "Email du compte : " + email,
        "Prénom : " + (name || "(non renseigné)"),
        "Motif (optionnel) : " + (reason || "(non renseigné)"),
        "Je comprends que cette suppression est irréversible : oui"
      ];
      var body = bodyLines.join("\n");
      var mailto = "mailto:{{CONTACT_EMAIL}}?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      ticketEl.textContent = ticket;
      messageBody.textContent = "À : {{CONTACT_EMAIL}}\nObjet : " + subject + "\n\n" + body;
      mailtoLink.href = mailto;
      successBlock.classList.add("is-visible");
      successBlock.setAttribute("aria-live", "polite");
      window.location.href = mailto;
      successBlock.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

      /* Voie optionnelle : un service de formulaire tiers (Formspree, Getform, Google Forms…).
         1) Renseigne l'attribut action="{{FORM_ENDPOINT}}" du <form id="deletion-form"> dans le HTML.
         2) Supprime le "window.location.href = mailto;" ci-dessus si tu veux éviter le double envoi.
         3) Décommente le bloc ci-dessous.
      fetch(deletionForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(deletionForm)
      }).then(function (res) {
        if (!res.ok) throw new Error("network");
      }).catch(function () {
        window.location.href = mailto;
      }); */
    });
  }

  /* ---------- Contact form ---------- */
  var contactForm = document.getElementById("contact-form");
  if (contactForm) {
    var cEmail = document.getElementById("contact-email");
    var cSubject = document.getElementById("contact-subject");
    var cMessage = document.getElementById("contact-message");
    var cEmailError = document.getElementById("contact-email-error");
    var cSuccess = document.getElementById("contact-success");

    function validEmail2(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = cEmail.value.trim();
      if (!validEmail2(email)) {
        cEmailError.classList.add("is-visible");
        return;
      }
      cEmailError.classList.remove("is-visible");
      var subject = "[Support Clinchy] " + (cSubject.value.trim() || "Question");
      var body = "De : " + email + "\n\n" + cMessage.value.trim();
      var mailto = "mailto:{{CONTACT_EMAIL}}?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
      cSuccess.classList.add("is-visible");
      window.location.href = mailto;

      /* Voie optionnelle : un service de formulaire tiers (Formspree, Getform, Google Forms…).
         1) Renseigne l'attribut action="{{FORM_ENDPOINT}}" du <form id="contact-form"> dans le HTML.
         2) Supprime le "window.location.href = mailto;" ci-dessus si tu veux éviter le double envoi.
         3) Décommente le bloc ci-dessous.
      fetch(contactForm.action, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(contactForm)
      }).then(function (res) {
        if (!res.ok) throw new Error("network");
      }).catch(function () {
        window.location.href = mailto;
      }); */
    });
  }

  /* ---------- Deep link (/join/) ---------- */
  var joinCodeEl = document.getElementById("join-code");
  if (joinCodeEl) {
    var params = new URLSearchParams(window.location.search);
    var code = (params.get("code") || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
    var fallback = document.getElementById("join-fallback");
    var scheme = document.getElementById("join-scheme");
    if (code) {
      joinCodeEl.textContent = code;
      var deepLink = "clinchy://join?code=" + encodeURIComponent(code);
      if (scheme) scheme.textContent = deepLink;
      window.location.href = deepLink;
      setTimeout(function () {
        if (fallback) fallback.hidden = false;
      }, 1500);
    } else {
      joinCodeEl.textContent = "–";
      if (fallback) fallback.hidden = false;
    }
  }
})();
