import { Injectable } from '@angular/core';

export interface Evento {
  id: number;
  slug: string;
  titolo: string;
  data: string;
  dataBreve: string;
  orario: string;
  descrizione: string;
  descrizioneLunga: string;
  tag: string;
  imgColor: string;
  img: string;
  evidenza?: boolean;
  info?: string[];
  vertical?: boolean;
}

const galleryImages = [
  'assets/images/gallery/188900324_10159696695663958_4279221651242500597_n.jpg',
  'assets/images/gallery/b_730_47b29e83-85ea-4eed-9c1d-7556c0565352.jpg',
  'assets/images/gallery/BadElf-e-BorgoBurger0023-700x500.jpg',
  'assets/images/gallery/BadElf-e-BorgoBurger0054-700x500.jpg',
  'assets/images/gallery/BadElf-e-BorgoBurger0062-700x467.webp',
  'assets/images/gallery/hambuger-copy-1024x683.jpg',
  'assets/images/gallery/images.jpg',
  'assets/images/gallery/639c3e0d-06d2-4dfc-a389-d2eba318b55f.jpg',
  'assets/images/gallery/IMG_2596-700x500.jpg',
  'assets/images/gallery/caption.jpg',
  'assets/images/gallery/scali.jpg',
  'assets/images/gallery/band.jpg',
  'assets/images/gallery/tavoly.jpg',
];

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

@Injectable({ providedIn: 'root' })
export class EventiService {

  eventi: Evento[] = (() => {
    const imgs = shuffled(galleryImages);
    return [
    {
      id: 0,
      slug: 'st-patricks-day-2026',
      titolo: 'St. Patrick\'s Day 2026',
      data: '17 Marzo 2026',
      dataBreve: '17 Mar',
      orario: '18:00',
      descrizione: 'La notte più verde dell\'anno torna al Bad Elf. Guinness a fiumi, musica irlandese live e il pub stracolmo come piace a noi.',
      descrizioneLunga: 'La notte più verde dell\'anno torna al Bad Elf. Guinness a fiumi, musica irlandese live, decorazioni da capogiro e il pub stracolmo come piace a noi.\n\nSt. Patrick\'s al Bad Elf è diventato in pochi anni uno degli eventi più attesi di Livorno. Tre ore in fila per entrare, ma ne vale ogni secondo — come dicono quelli che ci sono stati.\n\nPrenotare il tavolo è fortemente consigliato: si riempie sempre prima del previsto.',
      tag: 'Speciale',
      imgColor: '#0d3d12',
      img: imgs[0],
      evidenza: true,
      info: ['Ingresso libero', 'Prenotazione tavolo consigliata', 'Musica live dalle 21:00']
    },
    {
      id: 1,
      slug: 'vinyl-night-70s-rock',
      titolo: 'Vinyl Night — 70s Rock',
      data: '23 Maggio 2026',
      dataBreve: '23 Mag',
      orario: '21:30',
      descrizione: 'Giradischi acceso, birra fredda. Una serata immersi nel suono analogico dei grandi classici del rock anni \'70.',
      descrizioneLunga: 'Giradischi acceso, birra fredda. Una serata immersi nel suono analogico dei grandi classici del rock anni \'70.\n\nNiente playlist digitali, niente shuffle. Solo vinile, ago e amplificatore. Led Zeppelin, Deep Purple, Pink Floyd, Black Sabbath — il meglio del decennio più rock della storia, suonato come si deve.\n\nPorta i tuoi dischi se vuoi: il DJ set è aperto alle proposte del pubblico.',
      tag: 'Musica',
      imgColor: '#2a1a0e',
      img: imgs[1],
      info: ['Ingresso libero', 'DJ set con vinile', 'Bring your vinyl']
    },
    {
      id: 2,
      slug: 'degustazione-belgio',
      titolo: 'Degustazione Belgio',
      data: '6 Giugno 2026',
      dataBreve: '6 Giu',
      orario: '19:30',
      descrizione: '6 birre belghe guidate da un esperto. Trappiste, Lambic, Saison. Posti limitati.',
      descrizioneLunga: '6 birre belghe guidate da un esperto. Trappiste, Lambic, Saison. Posti limitati.\n\nUn percorso tra gli stili più complessi e affascinanti della tradizione birraia mondiale. Dalla dolcezza monastica delle Trappiste all\'acidità selvatica delle Lambic gueuze, passando per le Saison secche e speziate.\n\nOgni birra sarà accompagnata da una scheda di degustazione e abbinata a formaggi e cioccolato selezionati.',
      tag: 'Degustazione',
      imgColor: '#1a1200',
      img: imgs[2],
      info: ['Posti limitati — prenotazione obbligatoria', '€ 25 a persona', 'Include formaggi e cioccolato']
    },
    {
      id: 3,
      slug: 'oktoberfest-night',
      titolo: 'Oktoberfest Night',
      data: '28 Settembre 2026',
      dataBreve: '28 Set',
      orario: '19:00',
      descrizione: 'Monaco è lontana ma la festa è qui. Boccali da un litro, musica bavarese e würstel a volontà.',
      descrizioneLunga: 'Monaco è lontana ma la festa è qui. Boccali da un litro, musica bavarese e würstel a volontà.\n\nOgni anno l\'Oktoberfest al Bad Elf è uno degli eventi più partecipati della stagione. Il pub si trasforma: bavarese è la parola d\'ordine — dalla birra alle decorazioni, dalla musica al cibo.\n\nMenu speciale per la serata con piatti tipici della tradizione tedesca abbinati alle migliori Märzen e Weizen della selezione.',
      tag: 'Speciale',
      imgColor: '#1a0d00',
      img: imgs[3],
      info: ['Prenotazione consigliata', 'Menu speciale bavarese', 'Musica live']
    },
    {
      id: 4,
      slug: 'cucina-indiana-popup',
      titolo: 'Cucina Indiana Pop-up',
      data: '12 Luglio 2026',
      dataBreve: '12 Lug',
      orario: '20:00',
      descrizione: 'Un sabato all\'anno la cucina cambia registro. Curry, naan e lassi abbinati alle nostre birre artigianali.',
      descrizioneLunga: 'Un sabato all\'anno la cucina cambia registro. Curry, naan e lassi abbinati alle nostre birre artigianali.\n\nUna collaborazione con uno chef ospite che porta al Bad Elf i sapori dell\'India: tikka masala, dal makhani, biryani e molto altro. Tutto abbinato alla nostra selezione di birre artigianali scelte appositamente per esaltare i profumi e le spezie della cucina indiana.\n\nPosti limitati — il pop-up è uno degli eventi più ricercati dell\'anno.',
      tag: 'Food',
      imgColor: '#1a0800',
      img: imgs[4],
      info: ['Posti limitati', 'Prenotazione obbligatoria', 'Menu fisso € 30 a persona']
    },
    {
      id: 5,
      slug: 'quiz-night',
      titolo: 'Bad Elf Quiz Night',
      data: '5 Giugno 2026',
      dataBreve: '5 Giu',
      orario: '20:30',
      descrizione: 'Squadre da 2 a 5 persone, 6 round di domande, premi in birra. La serata più intelligente (e rumorosa) del mese.',
      descrizioneLunga: 'Squadre da 2 a 5 persone, 6 round di domande, premi in birra. La serata più intelligente (e rumorosa) del mese.\n\nDomande su musica, sport, storia, cultura pop, birra e ovviamente Bad Elf. Condotta dal nostro MC, la Quiz Night è diventata un appuntamento fisso per chi vuole una serata diversa dal solito.\n\nIscrizioni al bancone il giorno stesso a partire dalle 19:30.',
      tag: 'Quiz',
      imgColor: '#0a1a2a',
      img: imgs[5],
      info: ['Squadre da 2 a 5 persone', 'Iscrizioni dal bancone dalle 19:30', 'Premi in birra']
    },
    {
      id: 6,
      slug: 'burns-night',
      titolo: 'Burns Night',
      data: '25 Gennaio 2026',
      dataBreve: '25 Gen',
      orario: '20:00',
      descrizione: 'La celebrazione scozzese del poeta Robert Burns. Haggis, whisky, bagpipes e lettura dei versi originali.',
      descrizioneLunga: 'La celebrazione scozzese del poeta Robert Burns. Haggis, whisky, bagpipes e lettura dei versi originali.\n\nIl Burns Night è una delle tradizioni scozzesi più sentite: si festeggia il 25 gennaio, anniversario della nascita del poeta nazionale Robert Burns. Al Bad Elf la celebriamo con un menu scozzese completo, una selezione speciale di single malt e l\'Address to a Haggis recitata dal vivo.\n\nUna serata unica che unisce cultura, cibo e whisky in modo che solo gli scozzesi (e noi) sappiamo fare.',
      tag: 'Cultura',
      imgColor: '#1a0a2a',
      img: imgs[6],
      info: ['Menu fisso scozzese', 'Selezione whisky speciale', 'Prenotazione obbligatoria']
    },
    {
      id: 7,
      slug: 'craft-beer-week',
      titolo: 'Craft Beer Week',
      data: '14–20 Settembre 2026',
      dataBreve: '14 Set',
      orario: 'Tutta la settimana',
      descrizione: 'Una settimana intera dedicata alla birra artigianale: tap takeover, degustazioni, birrifici ospiti e offerte speciali.',
      descrizioneLunga: 'Una settimana intera dedicata alla birra artigianale: tap takeover, degustazioni, birrifici ospiti e offerte speciali.\n\nOgni giorno una novità: lunedì tap takeover con un birrificio italiano, mercoledì degustazione guidata, venerdì meet the brewer con Q&A direttamente con chi ha creato la birra che stai bevendo, sabato maratona di stili con 12 birre diverse in rotazione.\n\nIl calendario completo della settimana sarà pubblicato sui nostri canali social.',
      tag: 'Speciale',
      imgColor: '#0a2a1a',
      img: imgs[7],
      info: ['Programma dettagliato sui social', 'Alcuni eventi a pagamento', 'Meet the Brewer venerdì sera']
    },
  ]; })();

  getAll(): Evento[] {
    return this.eventi;
  }

  getById(id: number): Evento | undefined {
    return this.eventi.find(e => e.id === id);
  }

  getEvidenza(): Evento {
    return this.eventi.find(e => e.evidenza) || this.eventi[0];
  }

  getAltri(escludi: number, limit = 3): Evento[] {
    return this.eventi.filter(e => e.id !== escludi).slice(0, limit);
  }
}
