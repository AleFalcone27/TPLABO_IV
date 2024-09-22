import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule } from '@angular/forms';
import { addDoc, getDocs, collection, Firestore, Timestamp } from '@angular/fire/firestore'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule 
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {

  messages!:any;
  
  chatForm: FormGroup;
  constructor(private firestore: Firestore) {
    this.chatForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  async ngOnInit(): Promise<any> {
    const col = collection(this.firestore, 'Messages');
    const messageSnapshot = await getDocs(col);
    const data = messageSnapshot.docs.map(doc => doc.data());
    this.messages = data;
    console.log(data);
  }


  async postMessage() {
    const auth = getAuth();
    let col = collection(this.firestore, 'Messages');
    const docRef = await addDoc(col, {
      message: this.chatForm.get('message')?.value,
      user: auth.currentUser?.email,
      date: Timestamp.now()
    });
    console.log(docRef);
  }


  async WriteLog() {

  }



}
