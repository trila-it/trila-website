/* ═══════════════════════════════════════
   DATI REALI – CENTRO KINETICS EMPOLI
═══════════════════════════════════════ */

const services = [
  {
    icon: '🏋️',
    name: 'Personal Training',
    description: 'Lezioni individuali one-to-one con David Caponi. Programma d\'allenamento completamente personalizzato in base ai tuoi obiettivi, condizione fisica e disponibilità di tempo.',
    tag: 'One-to-one'
  },
  {
    icon: '🏃',
    name: 'Mini Gruppi',
    description: 'Allenamento in piccoli gruppi per chi preferisce un\'atmosfera più dinamica, mantenendo comunque un\'attenzione personalizzata da parte dell\'istruttore.',
    tag: 'Massima attenzione'
  },
  {
    icon: '🧘',
    name: 'Pilates',
    description: 'Lezioni di Pilates mat e attrezzato. Ideali per il rinforzo del core, il miglioramento della postura e la flessibilità. Adatto a tutti i livelli.',
    tag: 'Postura & Core'
  },
  {
    icon: '⚡',
    name: 'Bodytec',
    description: 'Allenamento con elettrostimolazione muscolare (EMS). In soli 20 minuti equivale a ore di palestra tradizionale. Efficace per tonificazione e dimagrimento.',
    tag: 'EMS Training'
  },
  {
    icon: '🔗',
    name: 'Kinesis',
    description: 'Sistema di allenamento funzionale che utilizza cavi e carrucole per esercizi in movimento tridimensionale. Migliora stabilità, coordinazione e forza funzionale.',
    tag: 'Allenamento funzionale'
  },
  {
    icon: '🔄',
    name: 'Circuit Training',
    description: 'Allenamento a circuito ad alta intensità per migliorare la resistenza cardiovascolare, bruciare calorie e tonificare i muscoli in modo efficiente.',
    tag: 'Cardio & Tono'
  },
  {
    icon: '🧍',
    name: 'Ginnastica Posturale',
    description: 'Esercizi specifici per la correzione dei difetti posturali. Indicata per dolori alla schiena, scoliosi, ipercifosi e piede piatto. Metodo Bricot.',
    tag: 'Posturologia'
  },
  {
    icon: '⚖️',
    name: 'Dimagrimento Attivo',
    description: 'Programma specifico per la perdita di peso attraverso l\'esercizio fisico mirato e consigli nutrizionali. Risultati concreti e duraturi nel tempo.',
    tag: 'Perdita di peso'
  },
  {
    icon: '🏅',
    name: 'Preparazione Atletica',
    description: 'Potenziamento sportivo personalizzato per atleti amatoriali e agonisti. Forza, velocità, resistenza ed esplosività per ogni disciplina sportiva.',
    tag: 'Sport performance'
  },
  {
    icon: '🫀',
    name: 'Fitness & Benessere',
    description: 'Programmi per il benessere globale della persona: riduzione dello stress, miglioramento dell\'umore, prevenzione delle patologie legate alla sedentarietà.',
    tag: 'Salute & Mente'
  },
  {
    icon: '🦴',
    name: 'Riabilitazione',
    description: 'Percorsi riabilitativi post-infortunio e post-operatori in collaborazione con il medico curante. Rieducazione motoria progressiva e sicura.',
    tag: 'Recupero funzionale'
  },
  {
    icon: '🌸',
    name: 'Rimedi anti-Cellulite',
    description: 'Programma combinato di esercizi mirati, massaggi drenanti e consigli alimentari per combattere efficacemente la cellulite e migliorare il microcircolo.',
    tag: 'Benessere femminile'
  }
];

/* ─── ATTIVITÀ TABS ─── */
const attivitaData = {
  bodytec: {
    title: 'Bodytec – EMS Training',
    img: 'images/bodytec-1.png',
    desc: 'Il Bodytec è un sistema di allenamento con elettrostimolazione muscolare (EMS) che permette di attivare fino al 90% delle fibre muscolari in soli 20 minuti. Ideale per chi ha poco tempo ma vuole risultati concreti su tonificazione, forza e riduzione del grasso localizzato.',
    punti: [
      '20 minuti equivalgono a 3 ore di palestra tradizionale',
      'Attivazione profonda di tutti i gruppi muscolari',
      'Efficace per dimagrimento e tonificazione',
      'Adatto a qualsiasi età e condizione fisica',
      'Supervisione costante del trainer certificato'
    ]
  },
  pilates: {
    title: 'Pilates',
    img: 'images/1.jpg',
    desc: 'Il Pilates di Centro Kinetics è proposto sia nella versione Mat (a corpo libero) sia con attrezzi specifici (Reformer, Cadillac). Un metodo completo per rafforzare il core, migliorare la postura, aumentare la flessibilità e ridurre i dolori muscolo-scheletrici.',
    punti: [
      'Lezioni individuali e in mini gruppi',
      'Pilates mat e con attrezzi (Reformer)',
      'Ideale per mal di schiena e problemi posturali',
      'Workshop con istruttori certificati Pilates Italia',
      'Adatto a gravidanza e post-parto'
    ]
  },
  kinesis: {
    title: 'Kinesis',
    img: 'images/kinesis.png',
    desc: 'Il sistema Kinesis di Technogym permette movimenti liberi e tridimensionali attraverso un sistema di cavi e carrucole. Sviluppa la forza funzionale, la stabilità articolare e la coordinazione motoria, riproducendo i movimenti naturali del corpo nella vita quotidiana e nello sport.',
    punti: [
      'Allenamento funzionale tridimensionale',
      'Migliora stabilità, forza e coordinazione',
      'Ideale per atleti e riabilitazione',
      'Personalizzabile per ogni livello',
      'Technogym – partner ufficiale'
    ]
  },
  circuit: {
    title: 'Circuit Training',
    img: 'images/inaugurazione7.jpg',
    desc: 'Il Circuit Training di Centro Kinetics è un allenamento a stazioni ad alta intensità che combina esercizi cardiovascolari e di forza. Bruci calorie, aumenti la resistenza e toifichi il corpo in modo efficiente e divertente.',
    punti: [
      'Alta intensità, risultati rapidi',
      'Combinazione cardio + forza',
      'Sessioni da 45-60 minuti',
      'Adatto a tutti i livelli con varianti',
      'Aumenta metabolismo e brucia grassi'
    ]
  },
  posturale: {
    title: 'Ginnastica Posturale',
    img: 'images/inaugurazione2.jpg',
    desc: 'La Ginnastica Posturale segue il metodo Bricot e si basa sulla valutazione e rieducazione della postura globale. David Caponi, diplomato in riprogrammazione posturale, individua le cause dei tuoi dolori e costruisce un percorso su misura per correggerli.',
    punti: [
      'Metodo Bricot – Diploma di riprogrammazione posturale',
      'Tratta mal di schiena, scoliosi, dorso curvo',
      'Ginnastica per il piede piatto',
      'Esercizi per anziani e adulti',
      'Programma pre e post-parto'
    ]
  }
};

/* ─── OBIETTIVI ─── */
const obiettivi = [
  {
    icon: '⚖️',
    title: 'Come dimagrire',
    desc: 'Strategie concrete e personalizzate per perdere peso in modo sano e duraturo, combinando esercizio fisico mirato e corrette abitudini alimentari.',
  },
  {
    icon: '🧬',
    title: 'Che tipo sei?',
    desc: 'Scopri il tuo somatotipo e il programma di allenamento più efficace per la tua morfologia corporea. Test gratuito con David Caponi.',
  },
  {
    icon: '📊',
    title: 'Calcola il tuo peso ideale',
    desc: 'Analisi della composizione corporea con bioimpedenziometria vettoriale (Akern). Scopri il tuo peso ideale, massa grassa e massa magra.',
  },
  {
    icon: '🌿',
    title: 'Fitness e benessere',
    desc: 'Combatti ansia e depressione con il movimento. L\'attività fisica regolare migliora l\'umore, riduce lo stress e aumenta la qualità della vita.',
  },
  {
    icon: '🌸',
    title: 'Rimedi contro la cellulite',
    desc: 'Programma integrato di esercizio fisico, drenaggio linfatico e consigli alimentari per ridurre la cellulite e migliorare il microcircolo.',
  },
  {
    icon: '✨',
    title: 'Giovani più a lungo',
    desc: 'L\'esercizio fisico come medicina: mantieni la massa muscolare, la densità ossea e la vitalità anche con il passare degli anni.',
  },
  {
    icon: '🥗',
    title: 'Errori alimentari',
    desc: 'Scopri gli errori più comuni a tavola che sabotano i tuoi obiettivi fitness. Consigli pratici di un professionista del benessere.',
  },
  {
    icon: '🏃',
    title: 'Allenamento sportivo',
    desc: 'Preparazione atletica specifica per ogni disciplina sportiva. Forza, velocità, resistenza ed esplosività per portare le tue performance al livello successivo.',
  }
];

/* ─── GALLERY ─── */
const galleryImages = [
  { src: 'images/8.jpg',  alt: 'Centro Kinetics Empoli' },
  { src: 'images/10.jpg', alt: 'Palestra Centro Kinetics' },
  { src: 'images/11.jpg', alt: 'Attività Centro Kinetics' },
  { src: 'images/12.jpg', alt: 'Centro Kinetics' },
  { src: 'images/1.jpg',  alt: 'Personal Training Empoli' },
  { src: 'images/3.jpg',  alt: 'Fitness Empoli' },
  { src: 'images/4.jpg',  alt: 'Ginnastica Centro Kinetics' },
  { src: 'images/6.jpg',  alt: 'Pilates Centro Kinetics' },
  { src: 'images/7.jpg',  alt: 'Centro Kinetics' },
  { src: 'images/inaugurazione2.jpg', alt: 'Inaugurazione Centro Kinetics' },
  { src: 'images/inaugurazione3.jpg', alt: 'Centro Kinetics apertura' },
  { src: 'images/inaugurazione7.jpg', alt: 'Centro Kinetics team' }
];

/* ─── TESTIMONIANZE ─── */
const testimonials = [
  {
    name: 'Marco B.',
    label: 'Cliente – Personal Training',
    color: '#65a30d',
    text: 'David è un professionista eccezionale. Ha costruito per me un programma di allenamento personalizzato che mi ha permesso di perdere 12 kg in 4 mesi, senza mai sentirmi a disagio o in difficoltà. Lo consiglio a tutti.'
  },
  {
    name: 'Giulia M.',
    label: 'Cliente – Pilates',
    color: '#0891b2',
    text: 'Ho iniziato il Pilates per i dolori alla schiena e dopo soli due mesi di lezioni ho già notato un miglioramento enorme. David è molto preciso e attento alla postura di ogni cliente.'
  },
  {
    name: 'Roberto T.',
    label: 'Cliente – Ginnastica Posturale',
    color: '#7c3aed',
    text: 'Soffrivo di scoliosi da anni. Con il percorso di ginnastica posturale al Centro Kinetics ho finalmente trovato beneficio concreto. Un centro serio e professionale, punto di riferimento ad Empoli.'
  },
  {
    name: 'Anna R.',
    label: 'Cliente – Bodytec',
    color: '#be185d',
    text: 'Il Bodytec è incredibile: 20 minuti di allenamento ed esci sentendoti come se avessi fatto 2 ore di palestra. David è sempre disponibile e sa motivare al massimo. Centro fantastico!'
  },
  {
    name: 'Luca F.',
    label: 'Atleta – Preparazione atletica',
    color: '#d97706',
    text: 'Mi sono affidato a David per la preparazione atletica calcistica. Professionalità, competenza e grande umanità. Ho migliorato la mia resistenza e la forza esplosiva in modo significativo.'
  },
  {
    name: 'Chiara P.',
    label: 'Cliente – Dimagrimento',
    color: '#0d9488',
    text: 'Centro pulito, moderno e soprattutto con un personal trainer preparatissimo. Ho raggiunto il mio peso forma e mi sono iscritta anche al corso di Kinesis. Ambiente familiare e stimolante.'
  }
];

/* ─── CV DAVID CAPONI ─── */
const cvTimeline = [
  { year: '2000', text: '<strong>Diploma ISEF</strong> in Educazione Fisica – Università degli studi di Firenze' },
  { year: '2000/01', text: 'Corso di <strong>perfezionamento in Wellness, Fitness e Personal Training</strong> – I.S.E.F. Firenze' },
  { year: '2001', text: 'Corso professionale <strong>Pancafit I° e II° livello</strong> – Palestra Time Out, Firenze' },
  { year: 'Mag 2001', text: '<strong>Iscrizione all\'Albo U.N.C.</strong> (Unione Nazionale Chinesiologi)' },
  { year: '2003/04', text: 'Corso <strong>Personal Trainer ISSA</strong>' },
  { year: '2005', text: '<strong>Certificazione Personal Trainer ISSA "CFT2"</strong> – Convention ISSA, Bellaria' },
  { year: '2005–08', text: '<strong>Scuola di Osteopatia S.I.O.T.E.M.A</strong> – Istituto Dante Alighieri, Firenze' },
  { year: '2009', text: 'Corso di <strong>Posturologia – metodo Bricot</strong>. Diploma di Riprogrammazione Posturale' },
  { year: '2011', text: 'Corso di <strong>Kinesiologia Applicata (IKG)</strong>: Touch for Health 1 & 2. <strong>Pilates Italia</strong>: Workshop Essential Matwork (Claudia Fink)' },
  { year: '2013', text: 'Corso <strong>Primo Soccorso BLS</strong>. I° Convention Technogym. Seminari Small Group Training e Wellness Coach. Corso <strong>Analisi composizione corporea AKERN</strong> (bioimpedenziometria vettoriale)' },
  { year: '2014', text: '<strong>Pilates Italia</strong>: Intensive Matwork Plus (Milano). <strong>A.T.S.</strong>: Specialista in Esercizio Correttivo. Corso <strong>Kinesiotaping</strong>. Intensivo Reformer. XVI Convention ISSA (Rimini). Certificazione di qualità Network ISSA' },
  { year: '2015', text: 'XVII Convention ISSA. <strong>Certificate TRIGGER POINT PERFORMANCE</strong> – Myofascial Compression Technique' },
  { year: 'Annuale', text: 'Convention Personal Trainer ISSA per <strong>rinnovo certificazione ISSA CFT2</strong>' }
];


/* ═══════════════════════════════════════
   RENDER SERVIZI
═══════════════════════════════════════ */
const servicesContainer = document.getElementById('services-container');
services.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'service-card reveal';
  card.style.transitionDelay = `${(i % 4) * 0.07}s`;
  card.innerHTML = `
    <div class="service-icon">${s.icon}</div>
    <h4>${s.name}</h4>
    <p>${s.description}</p>
    <span class="service-tag">${s.tag}</span>
  `;
  servicesContainer.appendChild(card);
});


/* ═══════════════════════════════════════
   RENDER ATTIVITÀ TABS
═══════════════════════════════════════ */
const attivitaContent = document.getElementById('attivita-content');
Object.entries(attivitaData).forEach(([key, data]) => {
  const panel = document.createElement('div');
  panel.className = `tab-panel${key === 'bodytec' ? ' active' : ''}`;
  panel.setAttribute('data-tab', key);
  panel.innerHTML = `
    <img src="${data.img}" alt="${data.title}" loading="lazy">
    <div class="tab-panel-text reveal">
      <h4>${data.title}</h4>
      <p>${data.desc}</p>
      <ul>
        ${data.punti.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <a href="#contatti" class="btn primary" style="margin-top:2rem">Richiedi informazioni</a>
    </div>
  `;
  attivitaContent.appendChild(panel);
});

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.querySelector(`.tab-panel[data-tab="${tab}"]`);
    if (panel) {
      panel.classList.add('active');
      // Trigger reveal on newly visible elements
      panel.querySelectorAll('.reveal').forEach(el => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 50);
      });
    }
  });
});


/* ═══════════════════════════════════════
   RENDER OBIETTIVI
═══════════════════════════════════════ */
const obiettiviContainer = document.getElementById('obiettivi-container');
obiettivi.forEach((o, i) => {
  const card = document.createElement('div');
  card.className = 'obiettivo-card reveal';
  card.style.transitionDelay = `${(i % 4) * 0.07}s`;
  card.innerHTML = `
    <div class="obiettivo-icon">${o.icon}</div>
    <h4>${o.title}</h4>
    <p>${o.desc}</p>
  `;
  obiettiviContainer.appendChild(card);
});


/* ═══════════════════════════════════════
   RENDER GALLERY
═══════════════════════════════════════ */
const galleryGrid = document.getElementById('gallery-grid');
galleryImages.forEach(img => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  item.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="lazy">`;
  item.addEventListener('click', () => openLightbox(img.src, img.alt));
  galleryGrid.appendChild(item);
});


/* ═══════════════════════════════════════
   LIGHTBOX
═══════════════════════════════════════ */
function openLightbox(src, alt) {
  const lb = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox-img').alt = alt;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ═══════════════════════════════════════
   RENDER TESTIMONIANZE
═══════════════════════════════════════ */
const testimonialsContainer = document.getElementById('testimonials-container');
testimonials.forEach((t, i) => {
  const initials = t.name.split(' ').map(n => n[0]).join('');
  const card = document.createElement('div');
  card.className = 'testimonial-card reveal';
  card.style.transitionDelay = `${(i % 3) * 0.1}s`;
  card.innerHTML = `
    <div class="stars">
      ${Array(5).fill('<svg width="16" height="16" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>').join('')}
    </div>
    <p>"${t.text}"</p>
    <div class="testimonial-author">
      <div class="author-avatar" style="background:${t.color}">${initials}</div>
      <div>
        <strong>${t.name}</strong>
        <span>${t.label}</span>
      </div>
    </div>
  `;
  testimonialsContainer.appendChild(card);
});


/* ═══════════════════════════════════════
   RENDER CV DAVID CAPONI
═══════════════════════════════════════ */
const cvContainer = document.getElementById('cv-container');
cvTimeline.forEach(item => {
  cvContainer.innerHTML += `
    <div class="cv-item">
      <span class="cv-year">${item.year}</span>
      <p>${item.text}</p>
    </div>
  `;
});

function toggleCV() {
  const cv  = document.getElementById('cv-full');
  const btn = document.getElementById('cv-toggle-btn');
  const isOpen = cv.classList.toggle('open');
  btn.innerHTML = isOpen
    ? `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7"/></svg> Chiudi curriculum`
    : `<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> Leggi il curriculum completo`;
}


/* ═══════════════════════════════════════
   HERO SLIDESHOW
═══════════════════════════════════════ */
(function initSlideshow() {
  const slides    = document.querySelectorAll('.hero-slideshow .slide');
  const dotsWrap  = document.getElementById('slide-dots');
  if (!slides.length) return;

  let current = 0;

  // Crea dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slide-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(n) {
    slides[current].classList.remove('active');
    slides[current].style.position = 'absolute';
    dotsWrap.children[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    slides[current].style.position = 'relative';
    dotsWrap.children[current].classList.add('active');
  }

  setInterval(() => goTo(current + 1), 3500);
})();


/* ═══════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});


/* ═══════════════════════════════════════
   NAVBAR SCROLL
═══════════════════════════════════════ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ═══════════════════════════════════════
   INTERSECTION OBSERVER – REVEAL
═══════════════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════
   ACTIVE NAV ON SCROLL
═══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color      = isActive ? 'var(--green-dark)' : '';
        link.style.background = isActive ? 'var(--green-bg)' : '';
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObserver.observe(s));


/* ═══════════════════════════════════════
   SMOOTH SCROLL
═══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ═══════════════════════════════════════
   FORM SUBMIT
═══════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const btn     = e.target.querySelector('button[type="submit"]');
  const success = document.getElementById('form-success');
  btn.textContent = 'Invio in corso...';
  btn.disabled = true;
  setTimeout(() => {
    e.target.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    btn.style.display = 'none';
    success.classList.add('visible');
  }, 1200);
}
