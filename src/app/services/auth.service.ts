import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: object | null;
  auth!:AngularFireAuth

  constructor() {}

  public isLoggedIn(){
    const auth = getAuth()
    console.log(auth.currentUser);
    return this.user = auth.currentUser
  }
 
  LogOut(){
    //modificar esto
    const auth = getAuth()
    signOut(auth)
    console.log(auth.currentUser);
  }
  
    


}