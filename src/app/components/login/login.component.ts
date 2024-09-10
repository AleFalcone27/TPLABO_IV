import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
//@ts-ignore
import { addIcons } from "ionicons";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }

  LogIn() {
    if(this.userExists()){
      this.router.navigateByUrl('/home');
    }
  }

  userExists(){
    // Hacer la validacion de inicion de session
    return true;
  }
  
  
}
