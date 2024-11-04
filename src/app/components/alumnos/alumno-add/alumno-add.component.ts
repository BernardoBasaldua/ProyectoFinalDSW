import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Alumno } from '../../../models/alumno.model';
import { AlumnoService } from '../../../services/alumno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno-add',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './alumno-add.component.html',
  styleUrl: './alumno-add.component.css'
})
export class AlumnoAddComponent implements OnInit{
  alumnos: Alumno[] = []
  nuevoAlumno: Alumno = new Alumno();

  constructor(private alumnoService:AlumnoService, private router:Router) {}

  ngOnInit(): void {
      this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.alumnoService.getAll()
      .subscribe((data) => {
        this.alumnos = data;
      },
      (error) => {
        console.error('Error al obtener los alumnos', error);
      }
    )
  }

  agregarAlumno():void {
    this.alumnoService.create(this.nuevoAlumno)
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
