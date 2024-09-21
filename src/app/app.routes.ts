import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { WhoAmIComponent } from './components/who-am-i/who-am-i.component';


export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'aboutus', component: WhoAmIComponent }
    
    
    //https://labo4-4bb6e.web.app/

    //{ path: '**', component: PageNotFoundComponent },
];
