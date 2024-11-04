import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterOutlet, RouterLink, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'ProyectoFinal2';

  currentTitle: string = 'TRABAJO PRÁCTICO FINAL - DESARROLLO DE SOFTWARE';
  showSubtitle: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      if (this.router.url.includes('menu')) {
        this.currentTitle = 'TRABAJO PRÁCTICO FINAL - DESARROLLO DE SOFTWARE';
        this.showSubtitle = true;
      } else if (this.router.url.includes('cursos')) {
        this.currentTitle = 'Cursos';
        this.showSubtitle = false;
      } else if (this.router.url.includes('temas')) {
        this.currentTitle = 'Temas';
        this.showSubtitle = false;
      } else if (this.router.url.includes('alumnos')) {
        this.currentTitle = 'Alumnos';
        this.showSubtitle = false;
      } else if (this.router.url.includes('docentes')) {
        this.currentTitle = 'Docentes';
        this.showSubtitle = false;
      }
    });
  }
}
