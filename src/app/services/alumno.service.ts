import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Alumno } from '../models/alumno.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  //ponemos la url de la api
  private urlApiAlumno = 'http://localhost:8080/api/alumnos';
  itemSeleccionado: any;

  constructor(private http:HttpClient) {
    console.log("AlumnoService inicializado");  // Verificación de constructor
  }

  setItemSeleccionado(item: any) {
    this.itemSeleccionado = item;;
  }

  //------------- FUNCIÓN GET -------------------
  //Función GetAll
  public getAll(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.urlApiAlumno);
  }
  //Función Get particular (id)
  public getById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.urlApiAlumno}/${id}`);
  }

    //------------ FUNCIÓN POST -------------------
    public create(alumno: Alumno): Observable<Alumno> {
      console.log(alumno);
      //return <any> null;
      return this.http.post<Alumno>(`${this.urlApiAlumno}/add`, alumno); 
    }
  
    //----------- FUNCIÓN PUT --------------------
    public update(id: number, alumno: Alumno): Observable<Alumno> {
      return this.http.put<Alumno>(`${this.urlApiAlumno}/update/${id}`, alumno);
    }
  
    //---------- FUNCIÓN DELETE ------------------
    //Delete all
    public deleteAll(): Observable<any> {
      return this.http.delete(this.urlApiAlumno);
    }
    //Delete por id
    public deleteById(id: number): Observable<void> {
      return this.http.delete<void>(`${this.urlApiAlumno}/delete/${id}`);
    }
}
