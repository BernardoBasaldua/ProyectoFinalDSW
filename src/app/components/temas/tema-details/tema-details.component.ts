import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { Tema } from '../../../models/tema.model';
import { TemaService } from '../../../services/tema.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tema-details',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './tema-details.component.html',
  styleUrl: './tema-details.component.css'
})
export class TemaDetailsComponent implements OnInit{
  tema!: Tema;
  editMode = false;

  constructor(private temaService: TemaService, private router: Router) {}

  ngOnInit(): void {
      this.detallarTema();
  }

  toggleEditMode(event: Event) {
    event.preventDefault(); // Evitar la recarga de página
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.guardarTema();
    }
  }

  guardarTema() {
    this.temaService.update(this.temaService.itemSeleccionado.id, this.tema)
      .subscribe({
        next: (response) => {
          console.log('Tema modificado:', response);
          // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
          this.router.navigate(['/temas-details']);
        },
        error: (error) => {
          console.error('Error al modificar tema:', error);
        }
      })
  }

  detallarTema() {
    this.temaService.getById(this.temaService.itemSeleccionado.id)
      .subscribe((data) => {
        this.tema = data;
      },
        (error) => {
          console.error('Error al obtener detalles del tema', error)
        }
      );
  }
}
