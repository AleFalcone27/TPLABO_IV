import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { WhoAmIComponent } from './components/who-am-i/who-am-i.component';
import { CardgameComponent } from './components/cardgame/cardgame.component';
import { TriviagameComponent } from './components/triviagame/triviagame.component';
import { HangmangameComponent } from './components/hangmangame/hangmangame.component';
import { TyperacerComponent } from './components/typeracergame/typeracergame.component';
import { SurveyComponent } from './components/survey/survey.component';
import { TableComponent } from './components/table/table.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'aboutus', component: WhoAmIComponent },
    { path: 'juegos/mayoromenor', component: CardgameComponent },
    { path: 'juegos/trivia', component: TriviagameComponent },
    { path: 'juegos/ahorcado', component: HangmangameComponent },
    { path: 'juegos/typeracer', component: TyperacerComponent },
    { path: 'juegos/survey', component: SurveyComponent },
    { path: 'juegos/table', component: TableComponent }
    //{ path: '**', component: PageNotFoundComponent },
];
