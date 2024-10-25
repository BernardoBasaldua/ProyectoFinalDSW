import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso } from '../../models/curso.model';
import { CursoService } from '../../services/curso.service';

@Component({
  selector: 'app-curso-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './curso-list.component.html',
  styleUrl: './curso-list.component.css'
})
export class CursoListComponent implements OnInit{
  itemActual: Curso | null = null;

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
      this.guardarItem();
  }

  guardarItem() {
    this.itemActual = this.cursoService.itemSeleccionado;
  }
}
