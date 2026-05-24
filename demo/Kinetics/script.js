/* ═══════════════════════════════════════
   DATI
═══════════════════════════════════════ */
const services = [
  {
    icon: '🦴',
    name: 'Fisioterapia',
    description: 'Trattamenti manuali e strumentali per la gestione del dolore acuto e cronico, recupero della mobilità e della funzionalità articolare.',
    tag: 'Trattamento manuale'
  },
  {
    icon: '🏃',
    name: 'Riabilitazione Sportiva',
    description: 'Percorsi riabilitativi specifici per atleti: recupero post-infortuni, prevenzione delle recidive e ottimizzazione della performance.',
    tag: 'Sport & Performance'
  },
  {
    icon: '⚡',
    name: 'Tecarterapia',
    description: 'Terapia con radiofrequenza capacitiva e resistiva che stimola la rigenerazione tissutale e accelera i processi naturali di guarigione.',
    tag: 'Fisioterapia strumentale'
  },
  {
    icon: '💥',
    name: 'Onde d\'Urto',
    description: 'Trattamento non invasivo per tendinopatie, calcificazioni e condizioni croniche. Efficace su spalla, gomito, ginocchio e tallone.',
    tag: 'Terapia strumentale'
  },
  {
    icon: '🧍',
    name: 'Posturologia',
    description: 'Valutazione e rieducazione della postura globale del corpo. Analisi dei compensi posturali e trattamento delle cause primarie.',
    tag: 'Valutazione & Rieducazione'
  },
  {
    icon: '👐',
    name: 'Osteopatia',
    description: 'Approccio olistico al movimento e alle disfunzioni somatiche. Tecniche di mobilizzazione dolce per ripristinare l\'equilibrio corporeo.',
    tag: 'Medicina olistica'
  },
  {
    icon: '🔆',
    name: 'Laser Terapia',
    description: 'Laser ad alta potenza di classe IV per effetti antinfiammatori, analgesici e biostimolanti profondi su tessuti molli e articolazioni.',
    tag: 'Alta tecnologia'
  },
  {
    icon: '💆',
    name: 'Massoterapia',
    description: 'Massaggi terapeutici e decontratturanti eseguiti da terapisti specializzati. Riduzione del dolore muscolare e del tensione tissutale.',
    tag: 'Trattamento manuale'
  },
  {
    icon: '🧘',
    name: 'Pilates Riabilitativo',
    description: 'Rieducazione funzionale attraverso il metodo Pilates. Rinforzo del core, miglioramento della stabilità e della propriocezione.',
    tag: 'Rieducazione funzionale'
  },
  {
    icon: '🏋️',
    name: 'Rieducazione Funzionale',
    description: 'Percorsi di rinforzo muscolare progressivo e rieducazione al gesto sportivo. Recupero completo della funzionalità motoria.',
    tag: 'Esercizio terapeutico'
  },
  {
    icon: '❄️',
    name: 'Crioterapia',
    description: 'Applicazione terapeutica del freddo per ridurre l\'infiammazione acuta, il gonfiore e il dolore post-traumatico o post-operatorio.',
    tag: 'Terapia fisica'
  },
  {
    icon: '🔊',
    name: 'Ultrasuoni',
    description: 'Terapia con onde sonore ad alta frequenza per il trattamento di contratture, cicatrici aderenziali e patologie tendinee croniche.',
    tag: 'Fisioterapia strumentale'
  }
];

const technologies = [
  {
    icon: '⚡',
    name: 'Tecarterapia',
    desc: 'Radiofrequenza capacitiva/resistiva per rigenerazione profonda dei tessuti.'
  },
  {
    icon: '💥',
    name: 'Onde d\'Urto',
    desc: 'Onde meccaniche focalizzate su aree cronicamente infiammate.'
  },
  {
    icon: '🔆',
    name: 'Laser Classe IV',
    desc: 'Alta potenza per azione antinfiammatoria e biostimolante in profondità.'
  },
  {
    icon: '❄️',
    name: 'Crioterapia',
    desc: 'Freddo controllato per infiammazioni acute e recupero sportivo rapido.'
  },
  {
    icon: '🔊',
    name: 'Ultrasuoni',
    desc: 'Onde sonore terapeutiche per tendinopatie e aderenze cicatriziali.'
  },
  {
    icon: '📊',
    name: 'Analisi Posturale',
    desc: 'Baropodometria e stabilometria computerizzata per la valutazione posturale.'
  }
];

const specialists = [
  {
    name: 'David Caponi',
    role: 'Personal Trainer I.S.S.A. – CFT2',
    description: 'Professore di Educazione Fisica, chinesiologo e posturologo. Specializzato in esercizio correttivo, postura, Pilates e preparazione atletica personalizzata. Oltre 15 anni di esperienza clinica e sportiva.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800&auto=format&fit=crop&crop=face'
  },
  {
    name: 'Dott.ssa Laura Bianchi',
    role: 'Fisioterapista & Posturologa',
    description: 'Specializzata nella valutazione posturale globale e nella rieducazione funzionale. Master in fisioterapia muscoloscheletrica. Esperta in trattamento di patologie della colonna vertebrale.',
    image: 'https://images.unsplash.com/photo-1594824475317-df7fddb7f1d8?q=80&w=800&auto=format&fit=crop&crop=face'
  },
  {
    name: 'Dott. Andrea Conti',
    role: 'Fisioterapista Ortopedico',
    description: 'Esperto in recupero post-trauma e riabilitazione sportiva. Formazione specialistica presso centri di eccellenza europei. Collabora con società sportive professionistiche.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop&crop=face'
  },
  {
    name: 'Dott.ssa Sofia Romano',
    role: 'Osteopata D.O.',
    description: 'Diplomata in Osteopatia con formazione quinquennale. Specializzata in disfunzioni cranio-sacrali, viscerali e strutturali. Approccio dolce e olistico per tutte le fasce d\'età.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop&crop=face'
  }
];

const testimonials = [
  {
    name: 'Marco T.',
    label: 'Paziente – Riabilitazione ginocchio',
    color: '#65a30d',
    text: 'Dopo l\'operazione al legamento crociato anteriore ero preoccupato per i tempi di recupero. Il team del Centro Kinetics mi ha seguito con grande professionalità. Sono tornato in campo in 5 mesi.'
  },
  {
    name: 'Giulia P.',
    label: 'Paziente – Cervicalgia cronica',
    color: '#0891b2',
    text: 'Soffro di cervicalgia da anni e ho provato molte soluzioni. Qui ho trovato finalmente un approccio personalizzato che ha dato risultati concreti. Lo staff è gentile e molto competente.'
  },
  {
    name: 'Roberto M.',
    label: 'Atleta amatoriale – Tendinite',
    color: '#7c3aed',
    text: 'Le onde d\'urto hanno risolto la mia tendinite achillea che mi tormentava da quasi un anno. Quattro sedute e ho ripreso ad allenarmi. Risultati incredibili, consiglio vivamente.'
  },
  {
    name: 'Anna S.',
    label: 'Paziente – Posturologia',
    color: '#be185d',
    text: 'David Caponi ha individuato subito le cause del mio mal di schiena attraverso una valutazione posturale approfondita. Il percorso di Pilates riabilitativo ha cambiato la mia vita quotidiana.'
  },
  {
    name: 'Luca B.',
    label: 'Ciclista – Lombalgia',
    color: '#d97706',
    text: 'Centro moderno, attrezzato e con personale davvero qualificato. La Tecarterapia combinata con il lavoro manuale ha risolto la mia lombalgia in pochissime sedute. Tornerò sicuramente.'
  },
  {
    name: 'Chiara F.',
    label: 'Mamma – Rieducazione post-parto',
    color: '#0d9488',
    text: 'Ho scelto il Centro Kinetics per la rieducazione del pavimento pelvico post-parto. Professionalità, discrezione e risultati eccellenti. Un team di cui mi fido completamente.'
  }
];

const faqs = [
  {
    q: 'È necessaria la prescrizione medica per accedere alle terapie?',
    a: 'Per la maggior parte dei trattamenti fisioterapici non è necessaria una prescrizione medica. Per alcune prestazioni convenzionate con il SSN, o per accedere al rimborso dell\'assicurazione sanitaria, potrebbe essere richiesta. Vi consigliamo di contattarci per valutare il vostro caso specifico.'
  },
  {
    q: 'Quanto dura una seduta di fisioterapia?',
    a: 'La durata varia in base al tipo di trattamento: una seduta standard dura tra i 30 e i 60 minuti. Le prime valutazioni sono solitamente più lunghe (60-90 min) per permettere un\'analisi completa del problema. Il fisioterapista definirà il programma di trattamento personalizzato durante il primo incontro.'
  },
  {
    q: 'Quante sedute sono necessarie per risolvere il mio problema?',
    a: 'Il numero di sedute dipende dalla natura e dalla gravità del problema. Patologie acute possono richiedere 3-6 sedute, mentre condizioni croniche o post-chirurgiche possono necessitare di percorsi più lunghi. Dopo la valutazione iniziale, il terapeuta vi fornirà una stima realistica dei tempi di recupero.'
  },
  {
    q: 'Accettate convenzioni con assicurazioni sanitarie?',
    a: 'Sì, collaboriamo con le principali assicurazioni sanitarie integrative. Vi invitiamo a contattarci o a verificare direttamente con la vostra compagnia assicurativa la copertura prevista. Emettiamo regolare documentazione fiscale per il rimborso delle spese.'
  },
  {
    q: 'Come mi devo preparare alla prima visita?',
    a: 'Porta con te eventuali referti medici, lastre o risonanze magnetiche relative al problema da trattare. Indossa abiti comodi che permettano di accedere facilmente alla zona da trattare. Non è necessaria alcuna altra preparazione specifica.'
  },
  {
    q: 'Offrite trattamenti anche per bambini e anziani?',
    a: 'Certamente. Il nostro team è formato per trattare pazienti di tutte le fasce d\'età, dai bambini agli anziani. Adattiamo le tecniche e l\'approccio alle specifiche esigenze di ogni paziente, garantendo sempre massima sicurezza ed efficacia.'
  },
  {
    q: 'È possibile prenotare online?',
    a: 'Sì, potete compilare il form di contatto sul nostro sito oppure chiamarci direttamente al numero +39 0586 000000. Rispondiamo a tutte le richieste entro 24 ore nei giorni feriali. Per urgenze, è disponibile anche il contatto WhatsApp.'
  }
];


/* ═══════════════════════════════════════
   RENDER SERVIZI
═══════════════════════════════════════ */
const servicesContainer = document.getElementById('services-container');
services.forEach((s, i) => {
  const card = document.createElement('div');
  card.className = 'service-card reveal';
  card.style.transitionDelay = `${(i % 4) * 0.08}s`;
  card.innerHTML = `
    <div class="service-icon">${s.icon}</div>
    <h4>${s.name}</h4>
    <p>${s.description}</p>
    <span class="service-tag">${s.tag}</span>
  `;
  servicesContainer.appendChild(card);
});


/* ═══════════════════════════════════════
   RENDER TECNOLOGIE
═══════════════════════════════════════ */
const techContainer = document.getElementById('tech-container');
technologies.forEach(t => {
  techContainer.innerHTML += `
    <div class="tech-item">
      <div class="tech-item-icon">${t.icon}</div>
      <strong>${t.name}</strong>
      <span>${t.desc}</span>
    </div>
  `;
});


/* ═══════════════════════════════════════
   RENDER TEAM
═══════════════════════════════════════ */
const teamContainer = document.getElementById('team-container');
specialists.forEach((p, i) => {
  const card = document.createElement('div');
  card.className = 'team-card reveal';
  card.style.transitionDelay = `${i * 0.1}s`;
  card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" loading="lazy">
    <div class="team-card-body">
      <h4>${p.name}</h4>
      <p class="role">${p.role}</p>
      <p class="description">${p.description}</p>
    </div>
  `;
  teamContainer.appendChild(card);
});


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
      <div class="author-avatar" style="background: ${t.color}">${initials}</div>
      <div>
        <strong>${t.name}</strong>
        <span>${t.label}</span>
      </div>
    </div>
  `;
  testimonialsContainer.appendChild(card);
});


/* ═══════════════════════════════════════
   RENDER FAQ
═══════════════════════════════════════ */
const faqContainer = document.getElementById('faq-container');
faqs.forEach((faq, i) => {
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.innerHTML = `
    <div class="faq-question">
      <span>${faq.q}</span>
      <div class="faq-chevron">
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#6b7280" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>
    <div class="faq-answer">
      <div class="faq-answer-inner">${faq.a}</div>
    </div>
  `;

  const question = item.querySelector('.faq-question');
  const answer   = item.querySelector('.faq-answer');
  const inner    = item.querySelector('.faq-answer-inner');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    // Chiudi tutti
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-answer').style.maxHeight = null;
    });
    // Apri questo se era chiuso
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = inner.scrollHeight + 'px';
    }
  });

  faqContainer.appendChild(item);
});


/* ═══════════════════════════════════════
   HAMBURGER MENU
═══════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Chiudi menu al click sui link
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
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════
   COUNTER ANIMATION (sezione numeri)
═══════════════════════════════════════ */
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const update   = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString('it-IT') + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));


/* ═══════════════════════════════════════
   FORM SUBMIT
═══════════════════════════════════════ */
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  const btn     = form.querySelector('button[type="submit"]');

  // Simula invio
  btn.textContent = 'Invio in corso...';
  btn.disabled    = true;

  setTimeout(() => {
    form.querySelectorAll('input, select, textarea').forEach(f => f.value = '');
    btn.style.display   = 'none';
    success.classList.add('visible');
  }, 1200);
}


/* ═══════════════════════════════════════
   SMOOTH SCROLL SU TUTTI I LINK ANCORA
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
   ACTIVE NAV LINK ON SCROLL
═══════════════════════════════════════ */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('nav a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}`
          ? 'var(--green-dark)'
          : '';
        link.style.background = link.getAttribute('href') === `#${id}`
          ? 'var(--green-bg)'
          : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
