import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore, query } from '@angular/fire/firestore'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [SnackBarOverviewExample]
})
export class RegisterComponent {

  registerForm: FormGroup;

  constructor(private router: Router, private firestore: Firestore, private snackBar: SnackBarOverviewExample) {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  Register() {
    const auth = getAuth();
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        this.snackBar.openSnackBar('Usuario creado correctamente', '😃');
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'El formato de correo electrónico es inválido';
            break;
          case 'auth/email-already-in-use':
            errorMessage = 'El correo electrónico ya está en uso';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'La operación no está permitida';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña es demasiado débil';
            break;
          default:
            errorMessage = 'Error desconocido';
        }
        this.snackBar.openSnackBar('Algo salio mal: ' + errorMessage, '😧');
      });
  }
}
