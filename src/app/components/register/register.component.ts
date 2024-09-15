import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addDoc, collection, Firestore, query} from '@angular/fire/firestore'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;

    constructor(private router: Router,private firestore: Firestore) {
      this.registerForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
      });
    }

    Register() {
      const auth = getAuth();
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      
      createUserWithEmailAndPassword(auth,email,password)
      .then((result) => {
        console.log('User created successfully:', result);
        this.router.navigate(['/home']);
      })
    }


}
