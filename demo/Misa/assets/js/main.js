// Nav scroll
const nav = document.querySelector('.nav');
if (nav) {
  const tick = () => nav.classList.toggle('filled', window.scrollY > 50);
  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

// Hamburger
const ham = document.querySelector('.hamburger');
const mob = document.querySelector('.mobile-nav');
if (ham && mob) {
  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    mob.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// Reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Booking bar date display
['checkin','checkout'].forEach(id => {
  const input = document.getElementById(id);
  if (!input) return;
  const field = input.closest('.bb-field');
  const val = field?.querySelector('.bb-val');
  if (!val) return;
  const fmt = new Intl.DateTimeFormat('it-IT', { day:'2-digit', month:'short', year:'numeric' });
  input.addEventListener('change', () => {
    if (input.value) {
      const d = new Date(input.value + 'T00:00:00');
      val.textContent = fmt.format(d);
      val.classList.add('has-value');
    } else {
      val.textContent = 'Aggiungi data';
      val.classList.remove('has-value');
    }
  });
  field.addEventListener('click', () => input.showPicker?.());
});

// Active nav
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-left a, .nav-right a').forEach(a => {
  if (a.getAttribute('href') === page) a.style.opacity = '1';
});

// ── Hero slideshow ──
const slides = document.querySelectorAll('.hero-slide');
if (slides.length) {
  let current = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    // restart zoom animation
    const img = slides[current].querySelector('img');
    img.style.animation = 'none';
    img.offsetHeight;
    img.style.animation = '';
  }

  function next() { goTo(current + 1); }

  timer = setInterval(next, 5000);

  // Pause on hover
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mouseenter', () => clearInterval(timer));
    hero.addEventListener('mouseleave', () => { timer = setInterval(next, 5000); });
  }
}

// ── Parallax (hero + fullbleed + page-hero) ──
// Parallax solo sull'hero slideshow
const heroSlides = document.querySelector('.hero-slides');
if (heroSlides) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      heroSlides.style.transform = `translateY(${window.scrollY * -0.18}px)`;
      ticking = false;
    });
  }, { passive: true });
}

// ── Animated counters ──
function animateCounter(el) {
  const raw = el.textContent.trim();
  const numMatch = raw.match(/[\d.]+/);
  if (!numMatch) return;
  const target = parseFloat(numMatch[0]);
  const isFloat = raw.includes('.');
  const suffix = raw.replace(/[\d.]+/, '');
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / duration, 1);
    // ease out expo
    const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    const val = isFloat ? (eased * target).toFixed(1) : Math.round(eased * target);
    el.textContent = val + suffix;
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-val').forEach(el => counterObs.observe(el));




// ── Camera slideshows ──
document.querySelectorAll('.camera-img').forEach(container => {
  const slides = container.querySelectorAll('.cslide');
  const dots = container.querySelectorAll('.cslide-dot');
  if (slides.length < 2) return;
  let cur = 0;

  function goTo(idx) {
    slides[cur].classList.remove('active');
    dots[cur]?.classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur]?.classList.add('active');
  }

  container.querySelector('.cslide-btn--prev')?.addEventListener('click', () => goTo(cur - 1));
  container.querySelector('.cslide-btn--next')?.addEventListener('click', () => goTo(cur + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let startX = 0;
  container.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  container.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? cur + 1 : cur - 1);
  });
});

// ── Tilt on service cards (desktop) ──
if (window.matchMedia('(pointer: fine)').matches) {
  document.querySelectorAll('.scard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - r.left) / r.width - 0.5;
      const dy = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${dy * -3}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}
