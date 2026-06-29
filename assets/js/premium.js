/* ============================================================
   TRILA — Premium JS
   Custom cursor, scroll progress, reveal, typed, counters
   ============================================================ */

(function () {
  'use strict';

  /* ---- Custom Cursor ---- */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring && window.innerWidth > 768) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    })();

    document.querySelectorAll('a, button, .service-item, .portfolio-card, .std-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1.8)';
        ring.style.opacity = '0.4';
        ring.style.borderColor = '#14b8a6';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.transform = 'translate(-50%, -50%) scale(1)';
        ring.style.opacity = '0.6';
        ring.style.borderColor = 'var(--grad-start)';
      });
    });
  }

  /* ---- Scroll Progress Bar ---- */
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const docH   = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / docH) * 100;
      progress.style.width = scrolled + '%';
    });
  }

  /* ---- Scroll Reveal ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---- Counter Animation ---- */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();
    (function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    })(start);
  }

  const counters = document.querySelectorAll('.counter-number');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---- Typed.js hero ---- */
  const typedEl = document.getElementById('hero-typed');
  if (typedEl && window.Typed) {
    new Typed('#hero-typed', {
      strings: ['siti web', 'web app', 'e-commerce', 'soluzioni digitali'],
      typeSpeed: 60,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      cursorChar: '|',
    });
  }

  /* ---- Smooth hover tilt on service cards ---- */
  document.querySelectorAll('.service-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
      card.style.transform = `translateY(-8px) rotateX(${y}deg) rotateY(${x}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.3s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.3s ease';
    });
  });

  /* ---- Portfolio card tilt ---- */
  document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -6;
      card.style.transform = `translateY(-12px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'box-shadow 0.3s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease, box-shadow 0.35s ease';
    });
  });

  /* ---- Staggered entrance for portfolio items ---- */
  document.querySelectorAll('.portfolio-item').forEach((item, i) => {
    item.style.transitionDelay = (i * 60) + 'ms';
  });

  /* ---- Magnetic button effect ---- */
  document.querySelectorAll('.btn-get-started, .std-btn, .header .btn-getstarted').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.3;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.3;
      btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s var(--transition-bounce, ease)';
    });
  });

})();
