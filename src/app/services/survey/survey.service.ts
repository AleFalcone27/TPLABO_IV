import { Injectable,} from '@angular/core';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private firestore: Firestore, private authService:AuthService) { }

  async saveSurvey(name:string, lastName:string, age:number, phoneNumber:number, fun:number, favGame:number, comments:string ) {
    let currentUserEmail = this.authService.getCurrentUserEmail();
    this.authService.getCurrentUSername();
    let col = collection(this.firestore, 'Surveys');
    const docRef = await addDoc(col, {
      Date: Timestamp.now(),
      userEmail: currentUserEmail,    
      name: name,
      lastName: lastName,
      age: age,
      phoneNumber: phoneNumber,
      fun: fun,
      favGame: favGame,
      comments: comments
    });
  }
}
