import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface GalleryItem {
  file: string;
  alt: string;
}

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
  foto: GalleryItem[] = [];
  selected: GalleryItem | null = null;
  selectedIndex = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<GalleryItem[]>('assets/images/gallery/manifest.json').subscribe(data => {
      this.foto = data;
    });
  }

  open(item: GalleryItem, index: number) {
    this.selected = item;
    this.selectedIndex = index;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.selected = null;
    document.body.style.overflow = '';
  }

  prev() {
    this.selectedIndex = (this.selectedIndex - 1 + this.foto.length) % this.foto.length;
    this.selected = this.foto[this.selectedIndex];
  }

  next() {
    this.selectedIndex = (this.selectedIndex + 1) % this.foto.length;
    this.selected = this.foto[this.selectedIndex];
  }

  getPath(file: string): string {
    return `assets/images/gallery/${file}`;
  }
}
