import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { CursoService } from '../../../services/curso.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NavHeaderComponent } from "../../nav-header/nav-header.component";

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.css'
})
export class CursoListComponent implements OnInit{
  cursos: Curso[] = [];

  constructor(private cursoService: CursoService) { }

  ngOnInit(): void {
    this.obtenerCursos();
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
}
