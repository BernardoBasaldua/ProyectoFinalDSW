import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //ponemos la url de la api
  private urlApiCurso = 'http://localhost:8080/api/cursos';
  itemSeleccionado: any;

  constructor(private http:HttpClient) {
    console.log("CursoService inicializado");  // Verificación de constructor
  }

  setItemSeleccionado(item: any) {
    this.itemSeleccionado = item;;
  }

  //------------- FUNCIÓN GET -------------------
  //Función GetAll
  public getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.urlApiCurso);
  }
  //Función Get particular (id)
  public getById(id: any): Observable<Curso> {
    return this.http.get<Curso>(`${this.urlApiCurso}/${id}`);
  }

  //------------ FUNCIÓN POST -------------------
  public create(curso: Curso): Observable<Curso> {
    console.log(curso);
    return this.http.post<Curso>(`${this.urlApiCurso}/add`, curso);
  }

  //----------- FUNCIÓN PUT --------------------
  public update(id: number, curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.urlApiCurso}/update/${id}`, curso);
  }

  //---------- FUNCIÓN DELETE ------------------
  //Delete all
  public deleteAll(): Observable<any> {
    return this.http.delete(this.urlApiCurso);
  }
  //Delete por id
  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiCurso}/delete/${id}`);
  }

  findCursosByFechaFin(fechaFin: string): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${this.urlApiCurso}/fecha-fin/${fechaFin}`);
  }

  findAlumnosByCursosVigentes(docenteId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${this.urlApiCurso}/vigentes/docente/${docenteId}/alumnos`)
  }
}

  //Función para buscar por nombre si es que existe
  /*public findByTitle(nombre: any): Observable<any> {
    return this.http.get<Curso>(`${this.urlApiCurso}?nombre=${nombre}`);
  }*/