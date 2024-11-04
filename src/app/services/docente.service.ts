import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Docente } from '../models/docente.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  //ponemos la url de la api
  private urlApiDocente = 'http://localhost:8080/api/docentes';
  itemSeleccionado: any;

  constructor(private http:HttpClient) {
    console.log("DocenteService inicializado");  // Verificación de constructor
  }

  setItemSeleccionado(item: any) {
    this.itemSeleccionado = item;;
  }

  //------------- FUNCIÓN GET -------------------
  //Función GetAll
  public getAll(): Observable<Docente[]> {
    return this.http.get<Docente[]>(this.urlApiDocente);
  }
  //Función Get particular (id)
  public getById(id: number): Observable<Docente> {
    return this.http.get<Docente>(`${this.urlApiDocente}/${id}`);
  }

  //------------ FUNCIÓN POST -------------------
  public create(docente: Docente): Observable<Docente> {
    console.log(docente);
    return this.http.post<Docente>(`${this.urlApiDocente}/add`, docente); 
  }

  //----------- FUNCIÓN PUT --------------------
  public update(id: number, docente: Docente): Observable<Docente> {
    return this.http.put<Docente>(`${this.urlApiDocente}/update/${id}`, docente);
  }

  //---------- FUNCIÓN DELETE ------------------
  //Delete all
  public deleteAll(): Observable<any> {
    return this.http.delete(this.urlApiDocente);
  }
  //Delete por id
  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiDocente}/delete/${id}`);
  }
}
