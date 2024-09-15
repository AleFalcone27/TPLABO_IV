import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

//@ts-ignore
import { addIcons } from "ionicons";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatCardModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  registerForm: FormGroup;
  email = '';
  password = '';

  constructor(private router: Router,private firestore: Firestore) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
   }

  LogIn() {
    const auth = getAuth();
    this.email = this.registerForm.get('email')?.value;
    this.password = this.registerForm.get('password')?.value;
    
    signInWithEmailAndPassword(auth,this.email,this.password)
    .then((userCredential) => {
      // Signed in 
      console.log(userCredential)
      this.WriteLog();
      this.router.navigate(['/home']);
      //const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }
  
  async WriteLog() {
    let col = collection(this.firestore,'UserLogs');
    const docRef = await addDoc(col, {
      email: this.registerForm.get('email')?.value,
      date: Timestamp.now()
    });
  }
}


