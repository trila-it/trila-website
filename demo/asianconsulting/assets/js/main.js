/* ============================================================
   ASIAN CONSULTING — interazioni
   Navbar su scroll, reveal degli elementi, headline hero animata,
   counter dei numeri quando entrano in vista.
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// HERO VISUAL — 3 telefoni con snap-scroll reel + flottaggio
// ============================================================
(function initHeroPhones(){
  const MEDIA = [
    'assets/video/focacceria1.mp4',
    'assets/video/focacceria_2.mp4',
    'assets/video/melody_1.mp4',
    'assets/video/melody_2.mp4',
    'assets/video/mo_ravioli1.mp4',
    'assets/video/mo_ravioli2.mp4',
    'assets/video/ravvin1.mp4',
    'assets/video/ravvin2.mp4',
  ];

  function createReelCard(src){
    const card = document.createElement('div');
    card.className = 'reel-card';
    const v = document.createElement('video');
    v.src = src;
    v.autoplay = true; v.muted = true; v.loop = true; v.playsInline = true;
    v.preload = 'auto';
    v.addEventListener('pause', ()=>{ v.play().catch(()=>{}); });
    card.appendChild(v);
    return card;
  }

  // distribuisce gli 8 video sulle 3 colonne
  const cols = Array.from(document.querySelectorAll('#hero-visual .reel-col'));
  const shuffled = [...MEDIA].sort(()=> Math.random()-0.5);
  const buckets = cols.map(()=>[]);
  shuffled.forEach((src, i)=>{ buckets[i % cols.length].push(src); });

  cols.forEach((col, phoneIdx)=>{
    const track = col.querySelector('.reel-track');
    const phone = col.closest('.phone-mockup');
    const srcs  = buckets[phoneIdx];

    // costruisce le card + clone del primo per il loop seamless
    srcs.forEach(src=> track.appendChild(createReelCard(src)));
    track.appendChild(createReelCard(srcs[0]));

    requestAnimationFrame(()=>{
      const cardH = phone.clientHeight;
      track.querySelectorAll('.reel-card').forEach(card=>{
        card.style.height = cardH + 'px';
      });

      let current = 0;

      // intervalli diversi per ogni telefono → non si sincronizzano mai
      const CYCLE_MS = [2200, 2600, 2400];
      const cycleMs  = CYCLE_MS[phoneIdx];

      function scrollNext(){
        current++;
        gsap.to(track, {
          y: -(current * cardH),
          duration: 0.44,
          ease: 'power2.inOut',
          onComplete(){
            if(current >= srcs.length){
              gsap.set(track, { y: 0 });
              current = 0;
            }
            setTimeout(scrollNext, cycleMs);
          },
        });
      }

      // ordine primo scroll: left (0) → right (2) → mid (1), 1s di stacco
      const SCROLL_ORDER = [0, 2, 1];
      setTimeout(scrollNext, 2000 + SCROLL_ORDER.indexOf(phoneIdx) * 1000);
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
