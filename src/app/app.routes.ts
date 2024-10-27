import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { TableSurveyComponent } from './components/table-survey/table-survey.component';
import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
        path: 'home',
        loadComponent: () => import('./components/home/home.component')
            .then(m => m.HomeComponent)
    },

    {
        path: 'aboutus',
        loadComponent: () => import('./components/who-am-i/who-am-i.component')
            .then(m => m.WhoAmIComponent)
    },

    {
        path: 'juegos/mayoromenor',
        loadComponent: () => import('./components/cardgame/cardgame.component')
            .then(m => m.CardgameComponent)
    },
    {
        path: 'juegos/ahorcado',
        loadComponent: () => import('./components/hangmangame/hangmangame.component')
            .then(m => m.HangmangameComponent)
    },

    {
        path: 'juegos/trivia',
        loadComponent: () => import('./components/triviagame/triviagame.component')
            .then(m => m.TriviagameComponent)
    },

    {
        path: 'juegos/typeracer',
        loadComponent: () => import('./components/typeracergame/typeracergame.component')
            .then(m => m.TyperacerComponent)
    },

    {
        path: 'juegos/survey',
        loadComponent: () => import('./components/survey/survey.component')
            .then(m => m.SurveyComponent)
    },

    {
        path: 'juegos/table',
        loadComponent: () => import('./components/table/table.component')
            .then(m => m.TableComponent)
    },

    {
        path: 'juegos/survey/resultados',
        loadComponent: () => import('./components/table-survey/table-survey.component')
            .then(m => m.TableSurveyComponent),
        canActivate: [adminGuard]
    },

];
