import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Docente } from '../../../models/docente.model';
import { DocenteService } from '../../../services/docente.service';

@Component({
  selector: 'app-docente-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent],
  templateUrl: './docente-list.component.html',
  styleUrl: './docente-list.component.css'
})
export class DocenteListComponent implements OnInit{
  docentes: Docente[] = [];

  constructor(private docenteService: DocenteService) { }

  ngOnInit(): void {
    this.obtenerDocentes();
  }

  obtenerDocentes(): void {
    this.docenteService.getAll().
      subscribe((data) => {
          this.docentes = data;
        },
        (error) => {
          console.error('Error al obtener los docentes', error);
        }
      );
  }

  public guardarItem(item: Docente) {
    this.docenteService.setItemSeleccionado(item);
  }

  eliminarDocente(id: number): void {
    this.docenteService.deleteById(id).subscribe(
      (response) => {
        console.log('Alumno eliminado:', response);
        this.obtenerDocentes(); // Refresca la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el alumno:', error);
      }
    );
  }
}
