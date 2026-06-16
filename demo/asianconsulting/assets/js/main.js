/* ============================================================
   ASIAN CONSULTING — interazioni
   Navbar su scroll, reveal degli elementi, headline hero animata,
   counter dei numeri quando entrano in vista.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// HERO VISUAL — colonne di reel che scorrono in loop verticale
// infinito, ciascuna a velocità/direzione propria.
// ============================================================
(function initHeroReels(){
  // 8 video disponibili = esattamente questi 8, usati una sola volta ciascuno,
  // niente duplicati nella scena. Se ne aggiungi altri, mettili qui.
  const MEDIA = [
    { type:'video', src:'assets/video/focacceria1.mp4' },
    { type:'video', src:'assets/video/focacceria_2.mp4' },
    { type:'video', src:'assets/video/melody_1.mp4' },
    { type:'video', src:'assets/video/melody_2.mp4' },
    { type:'video', src:'assets/video/mo_ravioli1.mp4' },
    { type:'video', src:'assets/video/mo_ravioli2.mp4' },
    { type:'video', src:'assets/video/ravvin1.mp4' },
    { type:'video', src:'assets/video/ravvin2.mp4' },
  ];

  function createReelCard(media){
    const card = document.createElement('div');
    card.className = 'reel-card';

    let el;
    if(media.type === 'video'){
      el = document.createElement('video');
      el.src = media.src;
      el.autoplay = true; el.muted = true; el.loop = true; el.playsInline = true;
      el.preload = 'auto';
      // se per qualche motivo l'autoplay si blocca/sospende, riprova
      el.addEventListener('pause', ()=>{ el.play().catch(()=>{}); });
    } else {
      el = document.createElement('img');
      el.src = media.src;
      el.loading = 'lazy';
    }
    card.appendChild(el);
    return card;
  }

  // distribuisce gli 8 video unici sulle 3 colonne SENZA ripetizioni tra colonne:
  // ogni video appare una volta sola in tutta la scena. Le colonne avranno quindi
  // lunghezze diverse (3/3/2 con 8 video), il loop resta corretto comunque.
  const cols = Array.from(document.querySelectorAll('#hero-visual .reel-col'));
  const shuffled = [...MEDIA].sort(()=> Math.random()-0.5);
  const buckets = cols.map(()=>[]);
  shuffled.forEach((media, i)=>{ buckets[i % cols.length].push(media); });

  cols.forEach((col, i)=>{
    const track = col.querySelector('.reel-track');
    const dir = parseInt(col.dataset.dir, 10);
    const speed = parseFloat(col.dataset.speed);
    const sequence = buckets[i];

    // due copie della stessa sequenza = loop senza giunte visibili,
    // ma ogni video resta unico ALL'INTERNO della colonna (non si ripete vicino a sé stesso)
    [0,1].forEach(()=>{
      sequence.forEach((media)=>{
        track.appendChild(createReelCard(media));
      });
    });

    requestAnimationFrame(()=>{
      const halfHeight = track.scrollHeight / 2;
      if(dir === 1){
        gsap.fromTo(track, { y:-halfHeight }, { y:0, duration:speed, ease:'none', repeat:-1 });
      } else {
        gsap.fromTo(track, { y:0 }, { y:-halfHeight, duration:speed, ease:'none', repeat:-1 });
      }
    });
  });
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
  // parole della prima riga, una dopo l'altra con un ritmo netto
  .to('#hero-headline .line:nth-child(1) .word', {
    y:'0%', opacity:1, duration:0.55, ease:'back.out(1.6)', stagger:0.09,
  }, 0.15)
  // pausa marcata: la seconda riga arriva solo dopo che la prima si è fermata del tutto
  .to('#hero-headline .line:nth-child(2) .word', {
    y:'0%', opacity:1, duration:0.55, ease:'back.out(1.6)', stagger:0.07,
  }, 1.35)
  .from('.hero-sub', { opacity:0, y:14, duration:0.6, ease:'power2.out' }, 2.05)
  // la parola-chiave nel sottotitolo si sottolinea con un piccolo ritardo dopo il resto del testo
  .call(()=>{ document.querySelectorAll('.hero-sub .kw').forEach(k=>k.classList.add('drawn')); }, [], 1.55)
  .from('.hero-ctas', { opacity:0, y:14, duration:0.55, ease:'power2.out' }, 1.45)
  .from('.hero-proof', { opacity:0, y:10, duration:0.5, ease:'power2.out' }, 1.65)
  .from('.reel-card', {
    opacity:0, y:20, scale:.94, duration:0.5, ease:'power2.out',
    stagger:{ each:0.025, from:'random' },
  }, 1.0);

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
