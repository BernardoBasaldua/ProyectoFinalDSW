import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Alumno } from '../../../models/alumno.model';
import { AlumnoService } from '../../../services/alumno.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alumno-details',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './alumno-details.component.html',
  styleUrl: './alumno-details.component.css'
})
export class AlumnoDetailsComponent implements OnInit{
  alumno!: Alumno;
  editMode = false;

  constructor(private alumnoService: AlumnoService, private router: Router) {}

  ngOnInit(): void {
      this.detallarAlumno();
  }

  toggleEditMode(event: Event) {
    event.preventDefault(); // Evitar la recarga de página
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.guardarAlumno();
    }
  }

  guardarAlumno() {
    this.alumnoService.update(this.alumnoService.itemSeleccionado.id, this.alumno)
      .subscribe({
        next: (response) => {
          console.log('Alumno modificado:', response);
          // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
          this.router.navigate(['/alumnos-details']);
        },
        error: (error) => {
          console.error('Error al modificar alumno:', error);
        }
      })
  }

  detallarAlumno() {
    this.alumnoService.getById(this.alumnoService.itemSeleccionado.id)
      .subscribe((data) => {
        this.alumno = data;
      },
        (error) => {
          console.error('Error al obtener detalles del alumno', error)
        }
      );
  }

  /*
  eliminarAlumno(id: number): void {
    this.alumnoService.deleteById(id).subscribe(
      (response) => {
        console.log('Alumno eliminado:', response);
        this.router.navigate(['/alumnos']);
      },
      (error) => {
        console.error('Error al eliminar el alumno:', error);
      }
    );
  }*/
}
