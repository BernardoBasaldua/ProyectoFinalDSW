import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  //ponemos la url de la api
  private urlApiCurso = 'http://localhost:8080/api/curso';
  itemSeleccionado: any;

  constructor(private http:HttpClient) { }

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
  //Función para buscar por nombre si es que existe
  /*public findByTitle(nombre: any): Observable<any> {
    return this.http.get<Curso>(`${this.urlApiCurso}?nombre=${nombre}`);
  }*/

    //------------ FUNCIÓN POST -------------------
  public create(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.urlApiCurso}`, data, {responseType: 'text'}); //Estás especificando que la respuesta sea de tipo 'text', lo cual es útil si esperas una respuesta simple (como un mensaje o código de confirmación). Si en el futuro cambias esto, podrías ajustar a otro tipo (e.g., json).
  }

  //----------- FUNCIÓN PUT --------------------
  public update(id: any, data: Curso): Observable<any> {
    const bodyData = {
      "id": id,
      "tema": data.tema,
      "fechaInicio": data.fechaInicio,
      "fechaFin": data.fechaFin,
      "docente": data.docente,
      "precio": data.precio,
      "alumnos": data.alumnos //AL array de alumnos lo estás asignando desde data.alumnos y lo estás enviando en el cuerpo de la solicitud como parte de bodyData, por lo que no hay que declarar nada especial de tipo array
    };

    return this.http.put(`${this.urlApiCurso}`, bodyData, {responseType: 'text'});
  }

  //---------- FUNCIÓN DELETE ------------------
  //Delete all
  public deleteAll(): Observable<any> {
    return this.http.delete(this.urlApiCurso);
  }
  //Delete por id
  public deleteById(id: any): Observable<any> {
    return this.http.delete(`${this.urlApiCurso}/delete/${id}`, {responseType: 'text'});
  }
}
