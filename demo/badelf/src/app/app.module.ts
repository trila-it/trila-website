import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { EventiComponent } from './pages/eventi/eventi.component';
import { EventoDetailComponent } from './pages/evento-detail/evento-detail.component';
import { FotoComponent } from './pages/foto/foto.component';
import { ContattaciComponent } from './pages/contattaci/contattaci.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    HomeComponent,
    MenuComponent,
    EventiComponent,
    EventoDetailComponent,
    FotoComponent,
    ContattaciComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
