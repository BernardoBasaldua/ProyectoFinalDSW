import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Docente } from '../../../models/docente.model';
import { DocenteService } from '../../../services/docente.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-add',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './docente-add.component.html',
  styleUrl: './docente-add.component.css'
})
export class DocenteAddComponent implements OnInit{
  docentes: Docente[] = []
  nuevoDocente: Docente = new Docente();

  constructor(private docenteService:DocenteService, private router:Router) {}

  ngOnInit(): void {
      this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.docenteService.getAll()
      .subscribe((data) => {
        this.docentes = data;
      },
      (error) => {
        console.error('Error al obtener los alumnos', error);
      }
    )
  }

  agregarDocente():void {
    this.docenteService.create(this.nuevoDocente)
      .subscribe({
        next: (response) => {
          console.log('Docente agregado:', response);
          this.router.navigate(['/docentes']);
        },
        error: (error) => {
          console.error('Error al agregar docente:', error);
        }
      });
  }

  agregarAlumno():void {
    this.docenteService.create(this.nuevoDocente)
      .subscribe({
        next: (response) => {
          console.log('Alumno agregado:', response);
          // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
          this.router.navigate(['/alumnos']);
        },
        error: (error) => {
          console.error('Error al agregar alumno:', error);
        }
      });
  }
}
