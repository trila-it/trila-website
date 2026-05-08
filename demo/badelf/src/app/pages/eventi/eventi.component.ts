import { Component } from '@angular/core';
import { EventiService, Evento } from '../../services/eventi.service';

@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.component.html',
  styleUrls: ['./eventi.component.css']
})
export class EventiComponent {
  evidenza: Evento;
  altri: Evento[];

  constructor(private eventiService: EventiService) {
    this.evidenza = eventiService.getEvidenza();
    this.altri = eventiService.getAll().filter(e => !e.evidenza);
  }
}
