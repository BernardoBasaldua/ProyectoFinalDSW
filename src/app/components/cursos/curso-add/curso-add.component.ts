import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Tema } from '../../../models/tema.model';
import { Docente } from '../../../models/docente.model';
import { Alumno } from '../../../models/alumno.model';
import { TemaService } from '../../../services/tema.service';
import { DocenteService } from '../../../services/docente.service';
import { AlumnoService } from '../../../services/alumno.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-curso-add',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './curso-add.component.html',
  styleUrl: './curso-add.component.css'
})
export class CursoAddComponent implements OnInit{
  //necesito hacer los services de los demas modelos para poder importarlos aca y poder usar los select con sus datos
  isDropdownOpen = false;
  curso!: Curso;
  temas: Tema[] = [];
  docentes: Docente[] = []
  alumnos: Alumno[] = []
  nuevoCurso: Curso = new Curso();

  constructor(
    private temaService:TemaService, 
    private docenteService:DocenteService, 
    private alumnoService:AlumnoService, 
    private cursoService:CursoService, 
    private router: Router, 
  ) {}

  ngOnInit(): void {
      this.obtenerTemas();
      this.obtenerDocentes();
      this.obtenerAlumnos();
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

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onAlumnoSelect(alumno: Alumno, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.curso.alumnos.push(alumno); // Agregar alumno seleccionado
    } else {
      this.curso.alumnos = this.curso.alumnos.filter(a => a.id !== alumno.id); // Remover alumno deseleccionado
    }
  }

  agregarCurso() {
    this.cursoService.create(this.nuevoCurso)
    .subscribe({
      next: (response) => {
        console.log('Curso agregado:', response);
        // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
        this.router.navigate(['/cursos']);
      },
      error: (error) => {
        console.error('Error al agregar curso:', error);
      }
    });
  }
}


/*this.nuevoCurso.alumnos = this.nuevoCurso.alumnos.map(alumno => {
        const fechaFormateada = this.datePipe.transform(alumno.fechaNacimiento, 'yyyy-MM-dd');
        return { ...alumno, fechaNacimiento: fechaFormateada };
    });*/