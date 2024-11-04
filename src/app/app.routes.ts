import { provideRouter, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CursoAddComponent } from './components/cursos/curso-add/curso-add.component';
import { CursoListComponent } from './components/cursos/curso-list/curso-list.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CursoDetailsComponent } from './components/cursos/curso-details/curso-details.component';
import { TemaAddComponent } from './components/temas/tema-add/tema-add.component';
import { TemaDetailsComponent } from './components/temas/tema-details/tema-details.component';
import { TemaListComponent } from './components/temas/tema-list/tema-list.component';
import { DocenteAddComponent } from './components/docentes/docente-add/docente-add.component';
import { DocenteDetailsComponent } from './components/docentes/docente-details/docente-details.component';
import { DocenteListComponent } from './components/docentes/docente-list/docente-list.component';
import { AlumnoAddComponent } from './components/alumnos/alumno-add/alumno-add.component';
import { AlumnoDetailsComponent } from './components/alumnos/alumno-details/alumno-details.component';
import { AlumnoListComponent } from './components/alumnos/alumno-list/alumno-list.component';

export const routes: Routes = [
    {path: 'header', component: HeaderComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'cursos-add', component: CursoAddComponent},
    {path: 'cursos-details', component: CursoDetailsComponent},
    {path: 'cursos', component: CursoListComponent},
    {path: 'temas-add', component: TemaAddComponent},
    {path: 'temas-details', component: TemaDetailsComponent},
    {path: 'temas', component: TemaListComponent},
    {path: 'docentes-add', component: DocenteAddComponent},
    {path: 'docentes-details', component: DocenteDetailsComponent},
    {path: 'docentes', component: DocenteListComponent},
    {path: 'alumnos-add', component: AlumnoAddComponent},
    {path: 'alumnos-details', component: AlumnoDetailsComponent},
    {path: 'alumnos', component: AlumnoListComponent},
    {path: '', redirectTo: '/menu', pathMatch: 'full'}
];

/*// Bootstrap de la aplicación sin necesidad de AppModule
bootstrapApplication(CursoListComponent, {
    providers: [
      provideRouter(routes), // Proveedor de rutas
      importProvidersFrom(HttpClientModule) // Proveedor del HttpClientModule
    ]
  }).catch(err => console.error(err));
*/