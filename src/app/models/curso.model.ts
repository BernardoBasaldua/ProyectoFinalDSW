import { Alumno } from "./alumno.model";
import { Docente } from "./docente.model";
import { Tema } from "./tema.model";

export class Curso {
    constructor() {
        this.id = 0;
        this.tema = new Tema();
        this.fechaInicio = new Date();
        this.fechaFin = new Date();
        this.docente = new Docente();
        this.precio = 0;
        this.alumnos = [new Alumno()]; //Chequear si este formato es correcto
    }

    id: number;
    tema: Tema;
    fechaInicio: Date;
    fechaFin: Date;
    docente: Docente;
    precio: number;
    alumnos: Array<Alumno>;
}