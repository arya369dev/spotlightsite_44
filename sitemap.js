// ============================================================
// SPOTLIGHT — main.js
// Mobile nav toggle, cursor-follow hero glow, scroll reveal,
// contact form (front-end stub), footer year.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Hero cursor-follow spotlight glow
  var hero = document.getElementById('top');
  var heroGlow = document.getElementById('heroGlow');
  if (hero && heroGlow) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      heroGlow.style.left = (e.clientX - rect.left) + 'px';
      heroGlow.style.top = (e.clientY - rect.top) + 'px';
    });
  }

  // Scroll reveal via IntersectionObserver (robust, works in every modern browser)
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: no JS animation support — just show everything
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  // Futuristic motion graphic — drifting constellation network in the hero
  // Respects prefers-reduced-motion: static/off entirely for users who asked for less motion.
  var canvas = document.getElementById('heroCanvas');
  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext('2d');
    var heroSection = document.getElementById('top');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, nodes = [], rafId = null, running = true;
    var PALETTE = ['rgba(189,144,60,0.55)', 'rgba(173,140,238,0.5)', 'rgba(95,208,160,0.5)', 'rgba(242,166,184,0.55)'];
    var NODE_COUNT = 46;
    var LINK_DIST = 150;

    function resize() {
      var rect = heroSection.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: 1.1 + Math.random() * 1.6,
          color: PALETTE[i % PALETTE.length]
        });
      }
    }

    function step() {
      if (!running) { rafId = null; return; }
      ctx.clearRect(0, 0, W, H);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }

      // Links between nearby nodes
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.globalAlpha = (1 - dist / LINK_DIST) * 0.35;
            ctx.strokeStyle = 'rgba(35,30,44,0.5)';
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      ctx.globalAlpha = 1;
      for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
        ctx.beginPath();
        ctx.fillStyle = node.color;
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(step);
    }

    resize();
    seed();
    rafId = requestAnimationFrame(step);

    window.addEventListener('resize', function () {
      resize();
      seed();
    });

    // Pause when the hero is off-screen or the tab is hidden — saves battery/CPU
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          running = entry.isIntersecting && !document.hidden;
          if (running && !rafId) rafId = requestAnimationFrame(step);
        });
      }, { threshold: 0.05 }).observe(heroSection);
    }
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running && !rafId) rafId = requestAnimationFrame(step);
    });
  }

  // Contact form stub — replace with a real endpoint (email API / CRM) before launch
  window.handleContactSubmit = function (event) {
    event.preventDefault();
    var form = event.target;
    var button = form.querySelector('button[type="submit"]');
    var originalLabel = button.innerHTML;
    button.innerHTML = 'Sent — thank you!';
    button.disabled = true;
    // TODO: replace with a fetch() call to your email/CRM endpoint, e.g.:
    // fetch('/api/contact', { method: 'POST', body: new FormData(form) });
    setTimeout(function () {
      form.reset();
      button.innerHTML = originalLabel;
      button.disabled = false;
    }, 3000);
    return false;
  };

});
