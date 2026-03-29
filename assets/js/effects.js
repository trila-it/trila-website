(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     LENIS – smooth scroll cinematografico
  ───────────────────────────────────────────── */
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    window._lenis = lenis;
  }

  /* ─────────────────────────────────────────────
     THREE.JS – sfondo hero 3D con particelle
  ───────────────────────────────────────────── */
  const canvas = document.getElementById('hero-canvas');
  if (canvas && typeof THREE !== 'undefined') {
    const heroSection = canvas.closest('.hero');
    const getW = () => heroSection ? heroSection.clientWidth : window.innerWidth;
    const getH = () => heroSection ? heroSection.clientHeight : window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, getW() / getH(), 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(getW(), getH());

    /* Particelle */
    const COUNT = 220;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT * 3; i++) positions[i] = (Math.random() - 0.5) * 20;
    const ptGeo = new THREE.BufferGeometry();
    ptGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({ color: 0x1f7a63, size: 0.045, transparent: true, opacity: 0.55 });
    const particles = new THREE.Points(ptGeo, ptMat);
    scene.add(particles);

    /* Sfere wireframe fluttuanti */
    const sphereData = [
      { r: 0.28, op: 0.13 }, { r: 0.20, op: 0.10 }, { r: 0.35, op: 0.09 },
      { r: 0.22, op: 0.12 }, { r: 0.18, op: 0.14 }, { r: 0.30, op: 0.08 },
    ];
    const meshes = sphereData.map(({ r, op }) => {
      const m = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r, 1),
        new THREE.MeshBasicMaterial({ color: 0x1f7a63, wireframe: true, transparent: true, opacity: op })
      );
      m.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 4 - 2);
      m.userData.vx = (Math.random() - 0.5) * 0.005;
      m.userData.vy = (Math.random() - 0.5) * 0.004;
      m.userData.rx = 0.004 + Math.random() * 0.006;
      m.userData.ry = 0.003 + Math.random() * 0.007;
      scene.add(m);
      return m;
    });

    /* Toroide centrale decorativo */
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(1.2, 0.018, 8, 60),
      new THREE.MeshBasicMaterial({ color: 0x2eb894, transparent: true, opacity: 0.08 })
    );
    torus.rotation.x = Math.PI / 3;
    torus.position.set(4, 1, -3);
    scene.add(torus);

    let mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    });

    const onResize = () => {
      camera.aspect = getW() / getH();
      camera.updateProjectionMatrix();
      renderer.setSize(getW(), getH());
    };
    window.addEventListener('resize', onResize);

    (function tick() {
      requestAnimationFrame(tick);
      const t = performance.now() * 0.001;

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;
      torus.rotation.z = t * 0.08;

      meshes.forEach(m => {
        m.rotation.x += m.userData.rx;
        m.rotation.y += m.userData.ry;
        m.position.x += m.userData.vx;
        m.position.y += m.userData.vy;
        if (Math.abs(m.position.x) > 7) m.userData.vx *= -1;
        if (Math.abs(m.position.y) > 4.5) m.userData.vy *= -1;
      });

      /* Parallax mouse */
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.025;
      camera.position.y += (-my * 0.4 - camera.position.y) * 0.025;

      renderer.render(scene, camera);
    })();
  }

  /* ─────────────────────────────────────────────
     TYPED.JS – testo hero animato
  ───────────────────────────────────────────── */
  const typedEl = document.getElementById('typed-text');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: [
        'Inizia il tuo progetto oggi.',
        'Siti web che convertono.',
        'E-commerce su misura.',
        'Web app gestionali.',
        'Soluzioni digitali concrete.',
      ],
      typeSpeed: 48,
      backSpeed: 28,
      backDelay: 2400,
      startDelay: 800,
      loop: true,
      smartBackspace: true,
    });
  }

  /* ─────────────────────────────────────────────
     GSAP – animazioni hero + ScrollTrigger
  ───────────────────────────────────────────── */
  window.addEventListener('load', () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    /* Sync Lenis + ScrollTrigger */
    if (window._lenis) {
      window._lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
    }

    /* ── Hero entrance ── */
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    /* h1 per parole (Splitting aggiunge .word) */
    const words = document.querySelectorAll('.hero h1 .word');
    if (words.length) {
      tl.from(words, { y: 50, opacity: 0, duration: 0.65, stagger: 0.055 }, 0.2);
    } else {
      tl.from('.hero h1', { y: 40, opacity: 0, duration: 0.7 }, 0.2);
    }

    tl.from('.hero p', { y: 25, opacity: 0, duration: 0.6 }, '-=0.3');
    tl.from('.hero .btn-get-started, .hero .btn-watch-video', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');

    /* ── ScrollTrigger: sezioni ── */

    /* Chi siamo */
    gsap.from('#chi-siamo .content', {
      scrollTrigger: { trigger: '#chi-siamo', start: 'top 78%' },
      x: -60, opacity: 0, duration: 0.9, ease: 'power3.out',
    });
    gsap.from('#chi-siamo .about-images', {
      scrollTrigger: { trigger: '#chi-siamo', start: 'top 78%' },
      x: 60, opacity: 0, duration: 0.9, ease: 'power3.out',
    });

    /* Client logos */
    gsap.from('.client-logo', {
      scrollTrigger: { trigger: '#clients', start: 'top 85%' },
      scale: 0.75, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.5)',
    });

    /* Servizi cards */
    gsap.from('.service-item', {
      scrollTrigger: { trigger: '#servizi', start: 'top 80%' },
      y: 70, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    });

    /* Services CTA */
    gsap.from('#servizi .std-btn', {
      scrollTrigger: { trigger: '#servizi .std-btn', start: 'top 90%' },
      scale: 0.85, opacity: 0, duration: 0.6, ease: 'back.out(1.7)',
    });

    /* Portfolio */
    gsap.from('.portfolio-item', {
      scrollTrigger: { trigger: '#lavori', start: 'top 80%' },
      y: 80, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
    });

    /* Contact info */
    gsap.from('.info-item', {
      scrollTrigger: { trigger: '#contattaci', start: 'top 80%' },
      y: 40, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out',
    });

    /* Section titles */
    document.querySelectorAll('.section-title').forEach(el => {
      gsap.from(el, {
        scrollTrigger: { trigger: el, start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.6, ease: 'power2.out',
      });
    });
  });

  /* ─────────────────────────────────────────────
     VANILLA TILT – hover 3D su card
  ───────────────────────────────────────────── */
  window.addEventListener('load', () => {
    if (typeof VanillaTilt === 'undefined') return;

    VanillaTilt.init(document.querySelectorAll('.service-item'), {
      max: 7, speed: 500, glare: true, 'max-glare': 0.13, scale: 1.02,
    });
    VanillaTilt.init(document.querySelectorAll('.portfolio-card'), {
      max: 4, speed: 400, glare: true, 'max-glare': 0.08, scale: 1.015,
    });
    VanillaTilt.init(document.querySelectorAll('.info-item'), {
      max: 6, speed: 400, scale: 1.02,
    });
  });

  /* ─────────────────────────────────────────────
     MAGNETIC BUTTONS
  ───────────────────────────────────────────── */
  document.querySelectorAll('.btn-get-started, .btn-getstarted, .std-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.23,1,0.32,1)';
    });
  });

  /* ─────────────────────────────────────────────
     CURSOR GLOW (desktop only)
  ───────────────────────────────────────────── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.id = 'cursor-dot';
    document.body.appendChild(dot);

    const ring = document.createElement('div');
    ring.id = 'cursor-ring';
    document.body.appendChild(ring);

    let rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      dot.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      rx += (e.clientX - rx) * 0.14;
      ry += (e.clientY - ry) * 0.14;
    });

    (function trackRing() {
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(trackRing);
    })();

    document.querySelectorAll('a, button, .service-item, .portfolio-card, .btn-get-started').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });
  }

})();
