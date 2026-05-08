import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventiService, Evento } from '../../services/eventi.service';

@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {
  evento: Evento | undefined;
  correlati: Evento[] = [];

  constructor(
    private route: ActivatedRoute,
    private eventiService: EventiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.evento = this.eventiService.getById(id);
      this.correlati = this.eventiService.getAltri(id, 3);
    });
  }

  getDescLines(): string[] {
    return this.evento?.descrizioneLunga.split('\n\n') || [];
  }
}
