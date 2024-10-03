import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { WhoAmIComponent } from './components/who-am-i/who-am-i.component';
import { CardgameComponent } from './components/cardgame/cardgame.component';
import { RickandmortyApiService } from './services/rickandmorty-api/rickandmorty-api.service';
import { TriviagameComponent } from './components/triviagame/triviagame.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'aboutus', component: WhoAmIComponent },
    { path: 'juegos/mayoromenor', component: CardgameComponent },
    { path: 'juegos/trivia', component: TriviagameComponent }
    
    
    //https://labo4-4bb6e.web.app/

    //{ path: '**', component: PageNotFoundComponent },
];
