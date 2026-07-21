/* ============================================================
   ASIAN CONSULTING — interazioni
   Navbar su scroll, reveal degli elementi, headline hero animata,
   counter dei numeri quando entrano in vista.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// PRELOADER — si chiude quando il DOM è pronto (non aspetta i video)
// ============================================================
(function initPreloader(){
  const el = document.getElementById('preloader');
  if(!el) return;
  function hide(){
    el.classList.add('hidden');
    el.addEventListener('transitionend', () => el.remove(), { once: true });
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', hide);
  } else {
    // già pronto
    setTimeout(hide, 300);
  }
})();

// ============================================================
// HERO VISUAL — 3 telefoni con snap-scroll reel + flottaggio
// ============================================================
(function initHeroPhones(){
  // Clip pre-tagliate a 6s, ~300KB ciascuna — distribuiti 4 per telefono senza ripetizioni
  const CLIPS = [
    'assets/video/clip_focacceria1_sm.mp4',
    'assets/video/clip_focacceria_2_sm.mp4',
    'assets/video/clip_melody_1_sm.mp4',
    'assets/video/clip_melody_2_sm.mp4',
    'assets/video/clip_mo_ravioli1_sm.mp4',
    'assets/video/clip_mo_ravioli2_sm.mp4',
    'assets/video/clip_ravvin1_sm.mp4',
    'assets/video/clip_ravvin2_sm.mp4',
  ];

  // 8 clip su 3 telefoni: phone1=clip 0-2, phone2=clip 3-5, phone3=clip 6-7+0+3
  // Nessuna clip appare nello stesso momento sullo stesso telefono.
  // Phone3 ha solo 2 clip uniche — le alterna con la prima di phone1 e phone2
  // che in quel momento stanno mostrando clip diverse (sfasate dai CYCLE_MS diversi).
  // 3 clip per telefono = 9 slot con 8 clip uniche → solo 1 ripetizione inevitabile.
  // La clip ripetuta (CLIPS[7]) è su left e right — mai adiacenti, mai sincronizzati.
  const BUCKETS = [
    [CLIPS[0], CLIPS[1], CLIPS[2]],            // phone left:  0 1 2
    [CLIPS[3], CLIPS[4], CLIPS[5]],            // phone mid:   3 4 5  (zero overlap)
    [CLIPS[6], CLIPS[7], CLIPS[2]],            // phone right: 6 7 + 2 (unica ripetizione, mai con mid)
  ];

  const allVideos = [];

  function makeVideo(src, preload){
    const v = document.createElement('video');
    v.src = src;
    v.muted = true; v.loop = false; v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
    v.controls = false;
    v.disablePictureInPicture = true;
    v.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;';
    v.preload = preload || 'auto';
    // poster: primo frame estratto con ffmpeg — evita il nero su mobile
    const poster = src.replace('assets/video/', 'assets/img/poster_').replace('.mp4', '.jpg');
    v.poster = poster;
    return v;
  }

  function playAll(){
    allVideos.forEach(v => v.play().catch(()=>{}));
  }

  const cols = Array.from(document.querySelectorAll('#hero-visual .reel-col'));

  cols.forEach((col, phoneIdx) => {
    const track = col.querySelector('.reel-track');
    const phone = col.closest('.phone-mockup');
    const srcs  = BUCKETS[phoneIdx];

    // Crea una card per ogni clip
    srcs.forEach((src, j) => {
      const card = document.createElement('div');
      card.className = 'reel-card';
      // Il primo video parte subito, gli altri preload=none per non saturare la banda
      const v = makeVideo(src, j === 0 ? 'metadata' : 'none');
      allVideos.push(v);
      card.appendChild(v);
      track.appendChild(card);
    });

    requestAnimationFrame(() => {
      const cardH = phone.clientHeight;
      track.querySelectorAll('.reel-card').forEach(c => { c.style.height = cardH + 'px'; });

      let current = 0;
      const CYCLE_MS = [3000, 3400, 2800][phoneIdx];

      function scrollNext(){
        const nextIdx = (current + 1) % srcs.length;
        // Precarica il prossimo video appena prima dello scroll
        const nextVideo = track.querySelectorAll('.reel-card video')[nextIdx];
        if(nextVideo.preload === 'none'){ nextVideo.preload = 'auto'; nextVideo.load(); }

        current++;
        gsap.to(track, {
          y: -(current * cardH),
          duration: 0.44,
          ease: 'power2.inOut',
          onComplete(){
            // Avvia il video appena entrato in scena
            nextVideo.play().catch(()=>{});
            if(current >= srcs.length - 1){
              // Torna silenziosamente al primo senza animazione
              gsap.set(track, { y: 0 });
              current = 0;
              track.querySelectorAll('.reel-card video')[0].currentTime = 0;
              track.querySelectorAll('.reel-card video')[0].play().catch(()=>{});
            }
            setTimeout(scrollNext, CYCLE_MS);
          },
        });
      }

      const SCROLL_ORDER = [0, 2, 1];
      setTimeout(scrollNext, 2200 + SCROLL_ORDER.indexOf(phoneIdx) * 900);
    });
  });

  // flottaggio indipendente — X e Y con durate diverse per ciascun telefono,
  // così le traiettorie ellittiche non si sincronizzano mai tra loro
  const PHONES = [
    { id:'#phone-left',  rotate:-5, yBase:32, yAmp:16, xAmp: 5, yDur:2.2, xDur:3.3 },
    { id:'#phone-mid',   rotate: 0, yBase: 0, yAmp:10, xAmp: 3, yDur:3.6, xDur:2.1 },
    { id:'#phone-right', rotate: 5, yBase:32, yAmp:13, xAmp:-4, yDur:2.9, xDur:3.9 },
  ];
  PHONES.forEach(({ id, rotate, yBase, yAmp, xAmp, yDur, xDur }, i)=>{
    gsap.set(id, { rotate, y: yBase, x: 0 });
    gsap.to(id, { y: yBase - yAmp, duration: yDur, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 1.8 + i * 0.15 });
    gsap.to(id, { x: xAmp,         duration: xDur, ease:'sine.inOut', yoyo:true, repeat:-1, delay: 2.0 + i * 0.3  });
  });

  // Tenta autoplay subito (funziona su desktop e Android).
  // Su Safari iOS l'autoplay di video creati via JS è bloccato finché non c'è
  // un gesto utente: al primo touchstart rieseguiamo play() su tutti i video.
  setTimeout(playAll, 100);
  const unlock = () => { playAll(); document.removeEventListener('touchstart', unlock); };
  document.addEventListener('touchstart', unlock, { once: true, passive: true });
})();


// ---------- Navbar: sfondo solido dopo un po' di scroll ----------
const navbar = document.getElementById('navbar');
function updateNavbar(){
  if(window.scrollY > 40){ navbar.classList.add('scrolled'); }
  else{ navbar.classList.remove('scrolled'); }
}
window.addEventListener('scroll', updateNavbar);
updateNavbar();

// ============================================================
// HERO HEADLINE — split parola per parola, timing preciso
// ============================================================
// Ogni .line-inner con data-words="A,B,C" viene spezzata in tanti
// <span class="word"> quante sono le parole, per poterle animare
// una per una con un ritmo scandito invece che l'intera riga insieme.
document.querySelectorAll('#hero-headline .line-inner[data-words]').forEach((el)=>{
  const words = el.dataset.words.split(',');
  el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
});
// la riga-contenitore non deve più traslare: lo fa ogni singola parola
gsap.set('#hero-headline .line-inner', { y:'0%' });

const heroTL = gsap.timeline({ delay:0.2 });
heroTL
  .to('#hero-headline .line:nth-child(1) .word', {
    y:'0%', opacity:1, duration:0.5, ease:'power3.out', stagger:0.08,
  }, 0.15)
  .to('#hero-headline .line:nth-child(2) .word', {
    y:'0%', opacity:1, duration:0.6, ease:'power3.out', stagger:0.06,
  }, 1.1)
  .from('.hero-sub', { opacity:0, y:14, duration:0.6, ease:'power2.out' }, 2.05)
  // la parola-chiave nel sottotitolo si sottolinea con un piccolo ritardo dopo il resto del testo
  .call(()=>{ document.querySelectorAll('.hero-sub .kw').forEach(k=>k.classList.add('drawn')); }, [], 1.55)
  .from('.hero-ctas', { opacity:0, y:14, duration:0.55, ease:'power2.out' }, 1.45)
  .from('.hero-proof', { opacity:0, y:10, duration:0.5, ease:'power2.out' }, 1.65)
  // logo + barre — appare prima dei telefoni
  .from('.hero-dragon-wrap', { opacity:0, y:-10, duration:0.5, ease:'power2.out' }, 0.7)
  .from('.hero-dragon', { scale:0.6, duration:0.55, ease:'back.out(2)' }, 0.75)
  // i telefoni entrano con stagger
  .from('.phone-mockup', {
    opacity:0, scale:.88, duration:0.7, ease:'power2.out', stagger:0.12,
  }, 1.0)
  // stats entrano dopo i telefoni, una alla volta
  .from('.hero-stat', { opacity:0, y:12, duration:0.45, ease:'power2.out', stagger:0.1 }, 1.7);

// ============================================================
// TITOLI DI SEZIONE — reveal a maschera quando entrano nello scroll
// ============================================================
document.querySelectorAll('.mask-title .line-inner').forEach((el)=>{
  gsap.to(el, {
    y:'0%',
    duration:0.8,
    ease:'power4.out',
    scrollTrigger:{ trigger: el, start:'top 85%', once:true },
    onComplete:()=>{
      // la parola-chiave dentro il titolo si sottolinea appena il reveal finisce
      el.querySelectorAll('.kw').forEach(k=> k.classList.add('drawn'));
    },
  });
});

// ---------- Reveal on scroll: elementi .reveal generici (eyebrow, paragrafi, card) ----------
document.querySelectorAll('.reveal').forEach((el)=>{
  gsap.to(el, {
    opacity:1,
    y:0,
    duration:0.8,
    ease:'power2.out',
    scrollTrigger:{ trigger: el, start:'top 85%', once:true },
  });
});

// ============================================================
// FORM — submit via fetch → mailer.php
// ============================================================
(function initForm(){
  const form     = document.getElementById('contact-form');
  const btn      = document.getElementById('form-submit');
  const feedback = document.getElementById('form-feedback');
  if(!form) return;

  form.addEventListener('submit', async (e)=>{
    e.preventDefault();

    // Validazione base lato client
    const nome     = form.nome.value.trim();
    const attivita = form.attivita.value.trim();
    const email    = form.email.value.trim();
    if(!nome || !attivita || !email){
      feedback.className = 'form-feedback err';
      feedback.textContent = 'Compila nome, attività ed email per procedere.';
      return;
    }
    if(!form.privacy.checked){
      feedback.className = 'form-feedback err';
      feedback.textContent = 'Devi accettare la Privacy Policy per inviare il modulo.';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Invio in corso…';
    feedback.className = 'form-feedback';
    feedback.textContent = '';

    try {
      const res = await fetch('mailer.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          attivita,
          email,
          tel:       form.tel.value.trim(),
          messaggio: form.messaggio.value.trim(),
        }),
      });
      const data = await res.json();

      if(data.ok){
        feedback.className = 'form-feedback ok';
        feedback.textContent = 'Messaggio inviato! Ti risponderemo entro 24 ore.';
        form.reset();
      } else {
        throw new Error(data.error || 'Errore server');
      }
    } catch(err){
      feedback.className = 'form-feedback err';
      feedback.textContent = 'Qualcosa è andato storto. Riprova o scrivici direttamente.';
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Invia richiesta <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>';
    }
  });
})();

// ============================================================
// NUMERI — cascata scandita: un numero dopo l'altro, non insieme
// ============================================================
function animateCounter(el, duration){
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const obj = { val:0 };
  gsap.to(obj, {
    val: target,
    duration: duration,
    ease:'power2.out',
    onUpdate:()=>{ el.textContent = Math.round(obj.val) + suffix; },
  });
}

ScrollTrigger.create({
  trigger: '#numeri',
  start:'top 80%',
  once:true,
  onEnter:()=>{
    const items = document.querySelectorAll('.numero-item');
    const tl = gsap.timeline();
    items.forEach((item, i)=>{
      tl.to(item, {
        opacity:1, y:0, duration:0.5, ease:'back.out(1.5)',
        onStart:()=> animateCounter(item.querySelector('.val'), 0.9),
      }, i * 0.18); // ogni numero parte 0.18s dopo il precedente: ritmo scandito, non simultaneo
    });
  },
});

// ============================================================
// POPUP CTA — appare dopo aver visto il portfolio O dopo 8s
// ============================================================
(function initPopup(){
  const popup  = document.getElementById('cta-popup');
  const close  = document.getElementById('popup-close');
  const ctaBtn = document.getElementById('popup-cta');
  if(!popup) return;

  // Non mostrare se già chiuso in questa sessione
  if(sessionStorage.getItem('popup-dismissed')) return;

  let shown = false;
  function show(){
    if(shown) return;
    shown = true;
    popup.setAttribute('aria-hidden','false');
    popup.classList.add('visible');
  }

  function dismiss(){
    popup.classList.remove('visible');
    popup.setAttribute('aria-hidden','true');
    sessionStorage.setItem('popup-dismissed','1');
  }

  // Trigger 1: l'utente ha scorso oltre la fine del portfolio
  const sentinel = document.querySelector('.acc-wrap');
  if(sentinel && 'IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries)=>{
      if(entries[0].boundingClientRect.bottom < 0){ // portfolio uscito in alto = già visto
        show();
        obs.disconnect();
      }
    }, { threshold:0 });
    obs.observe(sentinel);
  }

  // Trigger 2: fallback timer 8 secondi
  setTimeout(show, 8000);

  // Chiudi con X
  close.addEventListener('click', dismiss);

  // Click sul CTA → chiudi popup e scrolla al form
  ctaBtn.addEventListener('click', ()=>{ dismiss(); });
})();

// ============================================================
// PORTFOLIO — accordion orizzontale
// ============================================================
(function initAccordion(){
  const cards = Array.from(document.querySelectorAll('.acc-card'));
  if(!cards.length) return;

  function open(card){
    cards.forEach(c => c.classList.remove('open'));
    card.classList.add('open');
  }

  // prima card aperta di default
  open(cards[0]);

  cards.forEach(card => {
    card.addEventListener('click', () => open(card));
  });

  // reveal in entrata
  ScrollTrigger.create({
    trigger: '.acc-wrap',
    start: 'top 82%',
    once: true,
    onEnter(){
      gsap.fromTo('.acc-wrap',
        { opacity:0, y:30 },
        { opacity:1, y:0, duration:0.7, ease:'power2.out' }
      );
    },
  });
})();

// ============================================================
// PROCESSO — gli step entrano uno alla volta con un ritmo preciso
// ============================================================
ScrollTrigger.create({
  trigger: '#processo .processo-list',
  start:'top 75%',
  once:true,
  onEnter:()=>{
    gsap.to('.processo-step', {
      opacity:1, y:0, duration:0.6, ease:'power2.out',
      stagger:0.22, // pausa precisa e percepibile tra uno step e il successivo
    });
  },
});
