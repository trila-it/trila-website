/*!
 * Dental Clinique — animations.js
 * GSAP + ScrollTrigger — no Lenis, no cursor glow
 */

// ── LOADER ───────────────────────────────────────────────────────────────────
// Solo su index.html e pagine sede (sede-*.html)
const _page = window.location.pathname.split('/').pop() || 'index.html';
const _showLoader = _page === 'index.html' || _page === '' || _page.startsWith('sede-');

// Base path: directory della pagina corrente
const _scriptBase = window.location.href.replace(/[^/]*$/, '');

if (_showLoader) {
  // Inietta CSS loader subito nell'head
  const _loaderStyle = document.createElement('style');
  _loaderStyle.textContent = `
    #dc-loader {
      position: fixed; inset: 0; background: #fff;
      display: flex; align-items: center; justify-content: center;
      z-index: 99999;
    }
    #dc-loader .dc-wrap {
      position: relative;
      width: min(500px, 78vw);
    }
    #dc-loader .dc-wrap img {
      position: absolute; top: 0; left: 0;
      width: 100%; height: auto;
      opacity: 0;
    }
    #dc-loader .dc-wrap .dc-sizer {
      position: relative; visibility: hidden;
    }
  `;
  document.head.appendChild(_loaderStyle);
}

document.addEventListener('DOMContentLoaded', function () {
  if (!_showLoader) { initPageAnimations(); return; }

  // Crea e inserisce il loader
  const loader = document.createElement('div');
  loader.id = 'dc-loader';
  loader.innerHTML = `
    <div class="dc-wrap">
      <img class="dc-sizer"      src="${_scriptBase}img/logo_dental.svg" alt="">
      <img class="dc-dental"     src="${_scriptBase}img/logo_dental.svg" alt="Dental">
      <img class="dc-dente"      src="${_scriptBase}img/logo_dente.svg"  alt="">
      <img class="dc-clinique"   src="${_scriptBase}img/logo_clinique.svg" alt="Clinique">
    </div>
  `;
  document.body.appendChild(loader);
  document.body.style.visibility = 'visible';

  const dental   = loader.querySelector('.dc-dental');
  const dente    = loader.querySelector('.dc-dente');
  const clinique = loader.querySelector('.dc-clinique');

  gsap.set(dental,   { x: -22, opacity: 0 });
  gsap.set(clinique, { x:  22, opacity: 0 });
  gsap.set(dente,    { y:  14, scale: 0.65, opacity: 0 });

  const tl = gsap.timeline({
    delay: 0.1,
    onComplete: () => {
      gsap.to(loader.querySelector('.dc-wrap'), {
        scale: 7, opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          loader.remove();
          document.documentElement.style.overflow = '';
          initPageAnimations();
        }
      });
    }
  });

  tl.to(dente,    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.8)' })
    .to(dental,   { opacity: 1, x: 0, duration: 0.32, ease: 'power3.out' }, '-=0.12')
    .to(clinique, { opacity: 1, x: 0, duration: 0.32, ease: 'power3.out' }, '-=0.22')
    .to({}, { duration: 0.38 });
});


// ── ANIMAZIONI PAGINA (partono dopo il loader) ────────────────────────────────
function initPageAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // ── Navbar shrink on scroll ────────────────────────────────────────────────
  const nav = document.querySelector('nav');
  if (nav) {
    ScrollTrigger.create({
      start: 80,
      onEnter:     () => { nav.style.boxShadow = '0 4px 24px rgba(12,74,110,0.12)'; },
      onLeaveBack: () => { nav.style.boxShadow = ''; },
    });
  }

  // ── Hero (index.html) ──────────────────────────────────────────────────────
  const heroLight = document.querySelector('.hero-light');
  if (heroLight) {
    const badge  = heroLight.querySelector('.inline-flex');
    const h1     = heroLight.querySelector('h1');
    const p      = heroLight.querySelector('p');
    const btns   = heroLight.querySelectorAll('a.bg-brand-600, a.bg-white.border');
    const trust  = heroLight.querySelector('.mt-8');
    const imgCol = heroLight.querySelector('.relative.w-full');
    const floatCard = heroLight.querySelector('.absolute');

    const textEls = [badge, h1, p, trust].filter(Boolean);
    if (textEls.length) {
      gsap.set(textEls, { opacity: 0, y: 28 });
      gsap.set(btns, { opacity: 0, y: 16 });
      if (imgCol) gsap.set(imgCol, { opacity: 0, x: 40 });
      if (floatCard) gsap.set(floatCard, { opacity: 0, scale: 0.85 });

      const tl = gsap.timeline({ delay: 0.05 });
      tl.to(textEls, { opacity: 1, y: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out' })
        .to(btns,    { opacity: 1, y: 0, duration: 0.45, stagger: 0.09, ease: 'power3.out' }, '-=0.25');
      if (imgCol)    tl.to(imgCol,    { opacity: 1, x: 0, duration: 0.75, ease: 'power3.out' }, 0.1);
      if (floatCard) tl.to(floatCard, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.6)' }, '-=0.15');
    }
  }

  // ── Inner-page hero (sedi / trattamenti / contatti) ───────────────────────
  const innerHero = document.querySelector('section.relative.pt-44');
  if (innerHero) {
    const els = [
      innerHero.querySelector('span'),
      innerHero.querySelector('h1'),
      innerHero.querySelector('p'),
    ].filter(Boolean);
    if (els.length) {
      gsap.set(els, { opacity: 0, y: 24 });
      gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.13, ease: 'power3.out', delay: 0.1 });
    }
    const bgImg = innerHero.querySelector('.absolute img');
    if (bgImg) {
      gsap.to(bgImg, {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: innerHero, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }

  // ── Scroll reveal helper ───────────────────────────────────────────────────
  function reveal(nodeList, opts) {
    const arr = Array.from(nodeList || []);
    if (!arr.length) return;
    const cfg = Object.assign({ y: 40, duration: 0.65, ease: 'power3.out', stagger: 0.1 }, opts);
    arr.forEach((el, i) => {
      gsap.from(el, {
        opacity: 0, y: cfg.y, duration: cfg.duration, ease: cfg.ease,
        delay: cfg.stagger * i,
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
  }

  reveal(document.querySelectorAll('section h2'), { y: 22, duration: 0.55 });
  reveal(document.querySelectorAll('.group.relative.h-72'), { y: 36, stagger: 0.08 });
  reveal(document.querySelectorAll('.grid .bg-white.p-8.rounded-3xl.shadow-sm'), { y: 40, stagger: 0.13 });
  reveal(document.querySelectorAll('article.rounded-3xl'), { y: 44, stagger: 0.13 });
  reveal(document.querySelectorAll('.grid > a.rounded-3xl'), { y: 44, stagger: 0.12 });
  reveal(document.querySelectorAll('.grid > div.bg-white.p-8.rounded-3xl, .grid > div.bg-red-50'), { y: 44, stagger: 0.11 });
  reveal(document.querySelectorAll('.grid > div.bg-brand-50.p-8'), { y: 44, stagger: 0.11 });
  reveal(document.querySelectorAll('.space-y-6 > div'), { y: 32, stagger: 0.1 });
  reveal(document.querySelectorAll('footer .grid > div'), { y: 22, stagger: 0.09, duration: 0.5 });

  const formWrap = document.querySelector('form') && document.querySelector('form').closest('.bg-white');
  if (formWrap) {
    gsap.from(formWrap, {
      opacity: 0, y: 30, duration: 0.65, ease: 'power3.out',
      scrollTrigger: { trigger: formWrap, start: 'top 86%', toggleActions: 'play none none none' },
    });
  }

  // ── Counter 4.7/5 ─────────────────────────────────────────────────────────
  document.querySelectorAll('p').forEach((el) => {
    if (!el.textContent.trim().startsWith('4.7')) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 85%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: 4.7, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = obj.val.toFixed(1) + '/5'; },
        });
      },
    });
  });

  // ── Magnetic buttons ───────────────────────────────────────────────────────
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('a.bg-brand-600, a.bg-brand-500, button[type="submit"]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - (r.left + r.width  / 2)) * 0.2,
          y: (e.clientY - (r.top  + r.height / 2)) * 0.2,
          duration: 0.35, ease: 'power2.out',
        });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  // ── Card 3D tilt ──────────────────────────────────────────────────────────
  if (!window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('article.rounded-3xl, .bg-white.p-8.rounded-3xl').forEach((card) => {
      card.style.willChange = 'transform';
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        gsap.to(card, {
          rotationY:  (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2) * 5,
          rotationX: -(e.clientY - (r.top  + r.height / 2)) / (r.height / 2) * 5,
          transformPerspective: 900, duration: 0.4, ease: 'power2.out',
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'power3.out' });
      });
    });
  }

  // ── Animated underline nei link navbar ────────────────────────────────────
  document.querySelectorAll('nav a').forEach((link) => {
    link.style.position = 'relative';
    const line = document.createElement('span');
    Object.assign(line.style, {
      position: 'absolute', bottom: '-2px', left: '0',
      width: '0', height: '2px', background: '#0ea5e9',
      borderRadius: '2px', display: 'block', transition: 'width .28s ease',
    });
    link.appendChild(line);
    link.addEventListener('mouseenter', () => { line.style.width = '100%'; });
    link.addEventListener('mouseleave', () => { line.style.width = '0'; });
  });
}
