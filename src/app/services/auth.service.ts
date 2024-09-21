import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!: object | null;
  auth!:Auth

  constructor() {}

  public isLoggedIn(){
    this.auth = getAuth()
    return this.auth.currentUser;
  }
 
  LogOut(){
    signOut(this.auth)
  }

}