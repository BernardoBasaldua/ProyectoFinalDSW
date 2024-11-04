import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { TemaService } from '../../../services/tema.service';
import { Tema } from '../../../models/tema.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-add',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './tema-add.component.html',
  styleUrl: './tema-add.component.css'
})
export class TemaAddComponent implements OnInit{
  temas: Tema[] = []
  nuevoTema: Tema = new Tema();

  constructor(private temaService:TemaService, private router: Router) {}

  ngOnInit(): void {
      this.obtenerTemas();
  }

  obtenerTemas(): void {
    this.temaService.getAll()
      .subscribe((data) => {
        this.temas = data;
      },
      (error) => {
        console.error('Error al obtener los temas', error);
      }
    )
  }

  agregarTema():void {
    this.temaService.create(this.nuevoTema)
    .subscribe({
      next: (response) => {
        console.log('Tema agregado:', response);
        // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
        this.router.navigate(['/temas']);
      },
      error: (error) => {
        console.error('Error al agregar tema:', error);
      }
    });
  }  
}
