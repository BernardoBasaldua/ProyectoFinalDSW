import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Alumno } from '../../../models/alumno.model';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-alumno-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent],
  templateUrl: './alumno-list.component.html',
  styleUrl: './alumno-list.component.css'
})
export class AlumnoListComponent implements OnInit{
  alumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.obtenerAlumnos();
  }

  obtenerAlumnos(): void {
    this.alumnoService.getAll().
      subscribe((data) => {
          this.alumnos = data;
        },
        (error) => {
          console.error('Error al obtener los alumnos', error);
        }
      );
  }

  public guardarItem(item: Alumno) {
    this.alumnoService.setItemSeleccionado(item);
  }

  eliminarAlumno(id: number): void {
    this.alumnoService.deleteById(id).subscribe(
      (response) => {
        console.log('Alumno eliminado:', response);
        this.obtenerAlumnos(); // Refresca la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el alumno:', error);
      }
    );
  }
}
