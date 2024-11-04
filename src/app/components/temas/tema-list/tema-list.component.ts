import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Tema } from '../../../models/tema.model';
import { TemaService } from '../../../services/tema.service';

@Component({
  selector: 'app-tema-list',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent],
  templateUrl: './tema-list.component.html',
  styleUrl: './tema-list.component.css'
})
export class TemaListComponent implements OnInit{
  temas: Tema[] = [];

  constructor(private temaService: TemaService) { }

  ngOnInit(): void {
    this.obtenerTemas();
  }

  obtenerTemas(): void {
    this.temaService.getAll().
      subscribe((data) => {
          this.temas = data;
        },
        (error) => {
          console.error('Error al obtener los temas', error);
        }
      );
  }

  public guardarItem(item: Tema) {
    this.temaService.setItemSeleccionado(item);
  }

  eliminarTema(id: number): void {
    this.temaService.deleteById(id).subscribe(
      (response) => {
        console.log('Alumno eliminado:', response);
        this.obtenerTemas(); // Refresca la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el alumno:', error);
      }
    );
  }
}
