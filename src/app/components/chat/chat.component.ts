import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { addDoc, getDocs, collection, Firestore, query,orderBy } from '@angular/fire/firestore'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { user } from '@angular/fire/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  messages!: any;

  chatForm: FormGroup;
  constructor(public authService: AuthService,private firestore: Firestore, private appRef: ApplicationRef) {
    this.chatForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<any> {
    const col = collection(this.firestore, 'Messages');
    const q = query(col, orderBy('date', 'asc'));
    const messageSnapshot = await getDocs(q);
    const data = messageSnapshot.docs.map(doc => doc.data());
    this.messages = data;
    console.log(data);
  }


  async postMessage() {
    console.log('a');
    const auth = getAuth();
    const fechaActual = new Date();
    let col = collection(this.firestore, 'Messages');
    const docRef = await addDoc(col, {
      message: this.chatForm.get('message')?.value,
      user: auth.currentUser?.email?.split('@')[0],
      date: `${fechaActual.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${fechaActual.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`
    }).then((p) => {
      this.ngOnInit();
      this.chatForm.get('message')?.reset();
    })
  }
}
