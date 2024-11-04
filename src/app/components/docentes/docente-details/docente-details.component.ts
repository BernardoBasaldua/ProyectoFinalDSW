import { Component, OnInit } from '@angular/core';
import { Docente } from '../../../models/docente.model';
import { DocenteService } from '../../../services/docente.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { NavHeaderComponent } from '../../nav-header/nav-header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-docente-details',
  standalone: true,
  imports: [HttpClientModule, RouterLink, CommonModule, NavHeaderComponent, FormsModule],
  templateUrl: './docente-details.component.html',
  styleUrl: './docente-details.component.css'
})
export class DocenteDetailsComponent implements OnInit{
  docente!: Docente;
  editMode = false;

  constructor(private docenteService: DocenteService, private router: Router) {}

  ngOnInit(): void {
      this.detallarDocente();
  }

  toggleEditMode(event: Event) {
    event.preventDefault(); // Evitar la recarga de página
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.guardarDocente();
    }
  }

  guardarDocente() {
    this.docenteService.update(this.docenteService.itemSeleccionado.id, this.docente)
      .subscribe({
        next: (response) => {
          console.log('Docente modificado:', response);
          // Redirecciona a la lista de alumnos o muestra un mensaje de éxito
          this.router.navigate(['/docentes-details']);
        },
        error: (error) => {
          console.error('Error al modificar docente:', error);
        }
      })
  }

  detallarDocente() {
    this.docenteService.getById(this.docenteService.itemSeleccionado.id)
      .subscribe((data) => {
        this.docente = data;
      },
        (error) => {
          console.error('Error al obtener detalles del docente', error)
        }
      );
  }
}
