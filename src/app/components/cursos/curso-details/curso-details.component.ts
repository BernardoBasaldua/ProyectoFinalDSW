import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../../models/alumno.model';
import { Docente } from '../../../models/docente.model';
import { Tema } from '../../../models/tema.model';
import { AlumnoService } from '../../../services/alumno.service';
import { DocenteService } from '../../../services/docente.service';
import { TemaService } from '../../../services/tema.service';

@Component({
  selector: 'app-curso-details',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './curso-details.component.html',
  styleUrl: './curso-details.component.css'
})
export class CursoDetailsComponent implements OnInit{
  curso!: Curso
  temas: Tema[] = [];
  docentes: Docente[] = []
  alumnos: Alumno[] = []
  editMode = false;
  //isDropdownOpen = false;

  constructor(private cursoService: CursoService, 
    private temaService:TemaService,
    private docenteService:DocenteService, 
    private alumnoService:AlumnoService,   
    private router: Router) {}

  ngOnInit(): void {
      this.detallarCurso();
      this.obtenerTemas();
      this.obtenerAlumnos();
      this.obtenerDocentes();
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

  toggleEditMode(event: Event) {
    event.preventDefault(); // Evitar la recarga de página
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.guardarCurso();
    }
  }

  /*toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onAlumnoSelect(alumno: Alumno, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.curso.alumnos.push(alumno); // Agregar alumno seleccionado
    } else {
      this.curso.alumnos = this.curso.alumnos.filter(a => a.id !== alumno.id); // Remover alumno deseleccionado
    }
  }*/

  guardarCurso() {
    this.cursoService.update(this.cursoService.itemSeleccionado.id, this.curso)
      .subscribe({
        next: (response) => {
          console.log('Curso modificado:', response);
          // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
          this.router.navigate(['/cursos-details']);
        },
        error: (error) => {
          console.error('Error al modificar curso:', error);
        }
      })
  }

  detallarCurso() {
    this.cursoService.getById(this.cursoService.itemSeleccionado.id)
      .subscribe((data) => {
        this.curso = data;
      },
        (error) => {
          console.error('Error al obtener detalles del curso', error)
        }
      );
  }
}
