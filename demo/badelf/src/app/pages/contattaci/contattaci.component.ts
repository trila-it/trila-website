import { Component } from '@angular/core';

@Component({
  selector: 'app-contattaci',
  templateUrl: './contattaci.component.html',
  styleUrls: ['./contattaci.component.css']
})
export class ContattaciComponent {
  orari = [
    { giorno: 'Lunedì', ore: 'Chiuso', chiuso: true },
    { giorno: 'Martedì', ore: 'Dalle 18:30', chiuso: false },
    { giorno: 'Mercoledì', ore: 'Dalle 18:30', chiuso: false },
    { giorno: 'Giovedì', ore: 'Dalle 18:30', chiuso: false },
    { giorno: 'Venerdì', ore: 'Dalle 18:30', chiuso: false },
    { giorno: 'Sabato', ore: 'Dalle 18:30', chiuso: false },
    { giorno: 'Domenica', ore: 'Dalle 18:30', chiuso: false },
  ];
}
