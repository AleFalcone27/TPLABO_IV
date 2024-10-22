import { Component, OnInit, ApplicationRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { addDoc, getDocs, collection, Firestore, query, orderBy, Timestamp } from '@angular/fire/firestore'
import { getAuth } from "firebase/auth";
import { user } from '@angular/fire/auth';
import { AuthService } from '../../services/auth/auth.service';

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
  constructor(public authService: AuthService, private firestore: Firestore, private appRef: ApplicationRef) {
    this.chatForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<any> {
    const col = collection(this.firestore, 'Messages');
    const q = query(col, orderBy('date', 'asc'));
    const messageSnapshot = await getDocs(q);
    this.messages = messageSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: this.formatDate(data['date'])
      };
    });
  }

  formatDate(date: Date | Timestamp | any): string {
    let dateObject: Date;
    dateObject = new Date(date.seconds * 1000);
    return `${dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}`;
  }

  async postMessage() {
    console.log('a');
    const auth = getAuth();
    const fechaActual = new Date();
    let col = collection(this.firestore, 'Messages');
    const docRef = await addDoc(col, {
      message: this.chatForm.get('message')?.value,
      user: auth.currentUser?.email?.split('@')[0],
      date: Timestamp.fromDate(fechaActual)
    }).then((p) => {
      this.ngOnInit();
      this.chatForm.get('message')?.reset();
    })
  }
}