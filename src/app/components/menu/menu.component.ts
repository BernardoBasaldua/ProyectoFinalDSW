import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import { Curso } from '../../models/curso.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit{
  data: any = []

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
      this.llenarData();
  }

  public llenarData() {
    this.cursoService.getAll()
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      })
  }

  public guardarItem(item: Curso) {
    this.cursoService.setItemSeleccionado(item);
  }
}
