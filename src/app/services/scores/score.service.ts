import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, Timestamp, snapToData } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private firestore: Firestore, private authService:AuthService) { }

  async WriteScore(gameID:number, score:number) {
    let currentUserEmail = this.authService.getCurrentUserEmail();
    this.authService.getCurrentUSername();
    let col = collection(this.firestore, 'Scores');
    const docRef = await addDoc(col, {
      Date: Timestamp.now(),
      GameId: gameID,
      Score: score,
      userEmail: currentUserEmail       
    });
  }
}
