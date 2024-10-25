import { Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CursoAddComponent } from './components/curso-add/curso-add.component';
import { CursoListComponent } from './components/curso-list/curso-list.component';

export const routes: Routes = [
    {path: 'header', component: HeaderComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'add', component: CursoAddComponent},
    {path: 'cursos', component: CursoListComponent},
    {path: '', redirectTo: '/menu', pathMatch: 'full'}
];
