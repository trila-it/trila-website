import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventiService, Evento as EventoService } from '../services/eventi.service';

export interface Evento {
  id: number;
  titolo: string;
  data: string;
  orario: string;
  descrizione: string;
  tag: string;
  imgColor: string;
  vertical?: boolean;
}

export interface Birra {
  nome: string;
  stile: string;
  provenienza: string;
  desc: string;
  abv: string;
}

export interface Recensione {
  nome: string;
  testo: string;
  stelle: number;
  data: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private eventiService: EventiService) {}

  get eventoEvidenza(): EventoService { return this.eventiService.getEvidenza(); }
  get prossimiEventi(): EventoService[] { return this.eventiService.getAltri(-1, 4); }

  birre: Birra[] = [
    { nome: 'Guinness Draught', stile: 'Stout', provenienza: 'Irlanda', desc: 'La regina delle stout. Cremosa, tostata, con sentori di caffè e cioccolato fondente.', abv: '4.2%' },
    { nome: 'IPA del Mese', stile: 'India Pale Ale', provenienza: 'Italia', desc: 'Rotazione mensile con le migliori IPA artigianali italiane. Luppolate, amare, aromatiche.', abv: '6.5%' },
    { nome: 'Chimay Blue', stile: 'Trappista', provenienza: 'Belgio', desc: 'Birra trappista prodotta dai monaci di Scourmont. Scura, complessa, con note di frutta e spezie.', abv: '9%' },
    { nome: 'Punk IPA', stile: 'IPA', provenienza: 'Scozia', desc: 'BrewDog al massimo. Agrumi tropicali, pino, scorza d\'arancia. Post-modern classic.', abv: '5.6%' },
    { nome: 'Birra Pompa Inglese', stile: 'Cask Ale', provenienza: 'UK', desc: 'Spillata a pompa inglese come da tradizione. Non filtrata, non pastorizzata, viva.', abv: '4.0%' },
  ];

  birraAttiva = 0;
  private sliderInterval: any;


  recensioni: Recensione[] = [
    { nome: 'Marco T.', testo: 'Il posto giusto per chi ama la birra vera. Selezione incredibile, staff preparatissimo. L\'hamburger con la Guinness è una combo da non perdere.', stelle: 5, data: 'Marzo 2026' },
    { nome: 'Giulia R.', testo: 'Atmosfera assurda, sembra di stare in un pub di Londra ma sei a Livorno sui canali. Ci torno ogni volta che posso.', stelle: 5, data: 'Febbraio 2026' },
    { nome: 'Andrea M.', testo: 'St. Patrick\'s qui è una cosa seria. Tre ore in fila per entrare ma ne vale ogni secondo. Già prenotato per il prossimo anno.', stelle: 5, data: 'Marzo 2026' },
    { nome: 'Sara L.', testo: 'Pulled pork perfetto, birre eccellenti e musica che non rompe le scatole. Raro trovare tutto insieme. Torneremo presto.', stelle: 5, data: 'Aprile 2026' },
    { nome: 'Luca P.', testo: 'Ho provato la pompa inglese per la prima volta qui. Esperienza. Lo staff ha spiegato tutto con passione genuina. Rispetto.', stelle: 5, data: 'Gennaio 2026' },
    { nome: 'Federica B.', testo: 'Ogni volta che ho ospiti da fuori Livorno li porto qui. Non hanno mai deluso. La selezione di birre belghe è semplicemente fuori categoria.', stelle: 5, data: 'Aprile 2026' },
  ];

  recensioneAttiva = 0;
  private recensioniInterval: any;

  orari = [
    { giorno: 'Lunedì', ore: 'Chiuso' },
    { giorno: 'Martedì', ore: '18:00 – 02:00' },
    { giorno: 'Mercoledì', ore: '18:00 – 02:00' },
    { giorno: 'Giovedì', ore: '18:00 – 02:00' },
    { giorno: 'Venerdì', ore: '18:00 – 03:00' },
    { giorno: 'Sabato', ore: '17:00 – 03:00' },
    { giorno: 'Domenica', ore: '17:00 – 01:00' },
  ];

  ngOnInit() {
    this.sliderInterval = setInterval(() => {
      this.birraAttiva = (this.birraAttiva + 1) % this.birre.length;
    }, 4000);

    this.recensioniInterval = setInterval(() => {
      this.recensioneAttiva = (this.recensioneAttiva + 1) % this.recensioni.length;
    }, 5000);
  }

  ngOnDestroy() {
    clearInterval(this.sliderInterval);
    clearInterval(this.recensioniInterval);
  }

  setBirra(i: number) {
    this.birraAttiva = i;
  }

  setRecensione(i: number) {
    this.recensioneAttiva = i;
  }

  get starsArray() {
    return Array(5).fill(0);
  }
}
