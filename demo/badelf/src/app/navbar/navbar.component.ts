import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;
  scrolled = false;

  constructor(private router: Router) {}

  get isHome(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  get forceScrolled(): boolean {
    return this.router.url.startsWith('/eventi') || this.router.url.startsWith('/foto') || this.router.url.startsWith('/contattaci');
  }

  get transparentLogo(): string {
    return this.isHome ? 'assets/images/logo_home.png' : 'assets/images/logo.png';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 60;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }
}
