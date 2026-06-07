/* ===== BOIA BOAT — interactions ===== */
const HAS_GSAP  = typeof gsap !== 'undefined';
const LenisCtor = typeof Lenis !== 'undefined' ? Lenis : window.Lenis;
const HAS_LENIS = typeof LenisCtor !== 'undefined';

if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);

/* ---- Lenis smooth scroll (optional) ---- */
let lenis = null;
if (HAS_LENIS && HAS_GSAP){
  lenis = new LenisCtor({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
}

/* ---- Anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -10 });
    else target.scrollIntoView({ behavior: 'smooth' });
    closeMenu();
  });
});

/* ---- Loader (always closes, even if CDNs fail) ---- */
let loaderDone = false;
function hideLoader(){
  if (loaderDone) return;
  loaderDone = true;
  document.body.classList.add('loaded');
  const loader = document.getElementById('loader');
  if (HAS_GSAP){
    gsap.timeline({ onComplete: () => loader && (loader.style.display = 'none') })
      .to('.loader__logo img', { opacity: 1, scale: 1, rotate: 0, duration: 1, ease: 'back.out(1.7)' })
      .to('.loader__ring', { opacity: .9, duration: .4 }, '-=.7')
      .to('.loader__word', { y: 0, duration: .7, stagger: .12, ease: 'power3.out' }, '-=.4')
      .to('.loader__bar span', { width: '100%', duration: .9, ease: 'power2.inOut' }, '-=.5')
      .to('.loader__logo', { scale: .8, opacity: 0, duration: .5, ease: 'power2.in' }, '+=.1')
      .to('.loader__inner, .loader__bar', { opacity: 0, y: -20, duration: .4 }, '<')
      .to('.loader', { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'power4.inOut' }, '-=.2')
      .add(introAnim, '-=.5');
  } else {
    if (loader) loader.style.display = 'none';
    introAnim();
  }
}
window.addEventListener('load', hideLoader);
// safety net: never let the loader hang
setTimeout(hideLoader, 1500);

/* ---- Hero intro ---- */
function introAnim(){
  // split hero title into words
  document.querySelectorAll('.hero__title [data-split]').forEach(line => {
    line.innerHTML = line.textContent.trim().split(' ')
      .map(w => `<span class="word">${w}</span>`).join(' ');
  });
  if (!HAS_GSAP){
    document.querySelectorAll('.hero__title .word').forEach(w => w.style.transform = 'none');
    return;
  }
  gsap.timeline()
    .to('.hero__title .word', { y: 0, duration: 1, stagger: .07, ease: 'power4.out' })
    .from('.hero__eyebrow', { y: 30, opacity: 0, duration: .8 }, '-=.8')
    .from('.hero__sub, .hero__actions', { y: 30, opacity: 0, duration: .8, stagger: .12 }, '-=.6')
    .from('.hero__meta div, .hero__scroll', { opacity: 0, y: 20, duration: .7, stagger: .1 }, '-=.5');
}

if (HAS_GSAP){
  /* ---- Hero parallax bg ---- */
  gsap.to('.hero__bg img', {
    yPercent: 18, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  /* ---- Generic reveal ---- */
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* ---- Section titles: clip-reveal "marea" ---- */
  gsap.utils.toArray('h2').forEach(h => {
    gsap.fromTo(h,
      { clipPath: 'inset(0 0 100% 0)', y: 20 },
      { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.1, ease: 'power4.out',
        scrollTrigger: { trigger: h, start: 'top 85%' } });
  });

  /* ---- Tour cards: ogni card animata al proprio ingresso ---- */
  gsap.utils.toArray('.tour').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: .95 },
      { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out', delay: i * .1,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      });
  });

  /* ---- How cards: ogni card animata al proprio ingresso ---- */
  gsap.utils.toArray('.how__card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: i * .12,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      });
  });

  /* ---- Gallery: clip + scale a cascata ---- */
  gsap.utils.toArray('.gallery__item').forEach((item, i) => {
    gsap.fromTo(item,
      { clipPath: 'inset(100% 0 0 0)', scale: 1.1 },
      { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.1, ease: 'power4.out',
        delay: (i % 3) * .08,
        scrollTrigger: { trigger: item, start: 'top 90%' } });
  });

  /* ---- Onde: leggero scroll-parallax ---- */
  gsap.utils.toArray('.waves svg').forEach(svg => {
    gsap.fromTo(svg, { yPercent: 0 }, {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: svg.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---- Parallax images inside wraps ---- */
  gsap.utils.toArray('[data-parallax] img').forEach(img => {
    gsap.fromTo(img, { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* ---- Marquee (loop infinito) — GSAP prende il posto del CSS ---- */
  const track = document.querySelector('.marquee__track');
  if (track){
    track.classList.add('js-anim');
    gsap.fromTo(track,
      { xPercent: 0 },
      { xPercent: -50, ease: 'none', duration: 24, repeat: -1 }
    );
  }

  /* ---- Nav scrolled state ---- */
  ScrollTrigger.create({
    start: 'top -60',
    onUpdate: self => document.getElementById('nav').classList.toggle('scrolled', self.scroll() > 60)
  });
} else {
  /* ---- Fallback: reveal everything immediately ---- */
  document.querySelectorAll('[data-reveal]').forEach(el => {
    el.style.opacity = 1; el.style.transform = 'none';
  });
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ---- Mobile menu ---- */
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
function closeMenu(){ burger.classList.remove('open'); menu.classList.remove('open'); }
burger.addEventListener('click', () => {
  burger.classList.toggle('open'); menu.classList.toggle('open');
});

/* ---- Custom cursor + magnetic ---- */
const cursor = document.getElementById('cursor');
if (window.matchMedia('(hover:hover)').matches){
  let cx = 0, cy = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  function loop(){
    cx += (tx - cx) * .18; cy += (ty - cy) * .18;
    cursor.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  if (HAS_GSAP) document.querySelectorAll('[data-magnetic]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const mx = e.clientX - (r.left + r.width / 2);
      const my = e.clientY - (r.top + r.height / 2);
      gsap.to(el, { x: mx * .3, y: my * .4, duration: .5, ease: 'power3.out' });
    });
    el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.4)' }));
  });
}

/* ---- Form (demo) ---- */
const formThanks = { it: 'Grazie! Ti ricontattiamo presto', en: 'Thank you! We\'ll be in touch soon', de: 'Danke! Wir melden uns bald' };
document.querySelector('.contact__form').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const lang = localStorage.getItem('bb_lang') || 'it';
  btn.textContent = (formThanks[lang] || formThanks.it) + ' ✓';
  btn.style.background = 'var(--sea)';
  e.target.reset();
  setTimeout(() => { btn.setAttribute('data-i18n','form_submit'); if(typeof applyLang==='function') applyLang(lang); btn.style.background = ''; }, 3500);
});
