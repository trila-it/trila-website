import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EventiComponent } from './pages/eventi/eventi.component';
import { EventoDetailComponent } from './pages/evento-detail/evento-detail.component';
import { FotoComponent } from './pages/foto/foto.component';
import { ContattaciComponent } from './pages/contattaci/contattaci.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'eventi', component: EventiComponent },
  { path: 'eventi/:id', component: EventoDetailComponent },
  { path: 'foto', component: FotoComponent },
  { path: 'contattaci', component: ContattaciComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
