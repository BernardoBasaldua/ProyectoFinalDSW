import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from "../../nav-header/nav-header.component";
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../../models/alumno.model';
import { DocenteService } from '../../../services/docente.service';
import { Docente } from '../../../models/docente.model';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.css'
})
export class CursoListComponent implements OnInit{
  cursos: Curso[] = [];

  fechaFinBusqueda: string = ''; // Para almacenar la fecha de búsqueda

  alumnosVigentes: Alumno[] = [];
  docentes: Docente[] = [];
  docenteId: number | null = null; // Para almacenar el ID del docente seleccionado


  constructor(private cursoService: CursoService, private docenteService:DocenteService) { }

  ngOnInit(): void {
    this.obtenerCursos();
    this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.docenteService.getAll()
      .subscribe((data) => {
        this.docentes = data;
      },
      (error) => {
        console.error('Error al obtener los docentes', error);
      }
    )
  }

  obtenerCursos(): void {
    this.cursoService.getAll().
      subscribe((data) => {
          this.cursos = data;
        },
        (error) => {
          console.error('Error al obtener los cursos', error);
        }
      );
  }

  public guardarItem(item: Curso) {
    this.cursoService.setItemSeleccionado(item);
  }

  eliminarCurso(id: number): void {
    this.cursoService.deleteById(id).subscribe(
      (response) => {
        console.log('Alumno eliminado:', response);
        this.obtenerCursos(); // Refresca la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el alumno:', error);
      }
    );
  }

  buscarCursosPorFechaFin() {
    if (this.fechaFinBusqueda) {
      this.cursoService.findCursosByFechaFin(this.fechaFinBusqueda).subscribe(
        (data) => {
          this.cursos = data;
        },
        (error) => {
          console.error('Error al buscar cursos por fecha de fin:', error);
        }
      );
    }
  }

  findAlumnosByDocente(): void {
    if (this.docenteId !== null) {
      this.cursoService.findAlumnosByCursosVigentes(this.docenteId).subscribe(
        (data) => {
          this.alumnosVigentes = data;
        },
        (error) => {
          console.error('Error al obtener alumnos vigentes:', error);
        }
      );
    }
  }
}
