import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Firestore, collection, addDoc, Timestamp, snapToData } from '@angular/fire/firestore';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';

//@ts-ignore
import { addIcons } from "ionicons";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [SnackBarOverviewExample]
})
export class LoginComponent {

  imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/labo4-4bb6e.appspot.com/o/joystick_1f579-fe0f.ico?alt=media&token=fb4151b2-dea8-4270-9423-f8ec59de49fc';
  registerForm: FormGroup;
  email = '';
  password = '';

  constructor(private router: Router, private firestore: Firestore, private snackBar: SnackBarOverviewExample) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  LogIn() {
    const auth = getAuth();
    this.email = this.registerForm.get('email')?.value;
    this.password = this.registerForm.get('password')?.value;

    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in 
        this.snackBar.openSnackBar('Iniciaste sesion correctamente', '✅');
        this.WriteLog();
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  async WriteLog() {
    let col = collection(this.firestore, 'UserLogs');
    const docRef = await addDoc(col, {
      email: this.registerForm.get('email')?.value,
      date: Timestamp.now()
    });
  }

  MockLogin(email: String, password: String) {
    this.registerForm.patchValue({
      email: email,
      password: password
    });
  }
}


