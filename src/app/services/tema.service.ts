import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tema } from '../models/tema.model';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  //ponemos la url de la api
  private urlApiTema = 'http://localhost:8080/api/temas';
  itemSeleccionado: any;

  constructor(private http:HttpClient) {
    console.log("TemaService inicializado");  // Verificación de constructor
  }

  setItemSeleccionado(item: any) {
    this.itemSeleccionado = item;;
  }

  //------------- FUNCIÓN GET -------------------
  //Función GetAll
  public getAll(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.urlApiTema);
  }
  //Función Get particular (id)
  public getById(id: number): Observable<Tema> {
    return this.http.get<Tema>(`${this.urlApiTema}/${id}`);
  }

  //------------ FUNCIÓN POST -------------------
  public create(tema: Tema): Observable<Tema> {
    console.log(tema);
    return this.http.post<Tema>(`${this.urlApiTema}/add`, tema); 
  }

  //----------- FUNCIÓN PUT --------------------
  public update(id: number, tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(`${this.urlApiTema}/update/${id}`, tema);
  }

  //---------- FUNCIÓN DELETE ------------------
  //Delete all
  public deleteAll(): Observable<any> {
    return this.http.delete(this.urlApiTema);
  }
  //Delete por id
  public deleteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiTema}/delete/${id}`);
  }
}
