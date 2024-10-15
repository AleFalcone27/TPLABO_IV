import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { Firestore, collection, addDoc, Timestamp, snapToData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private firestore: Firestore) { }

  async WriteScore(gameID:number, score:number, userEmail:string) {
    let col = collection(this.firestore, 'Scores');
    const docRef = await addDoc(col, {
      Date: Timestamp.now(),
      GameId: gameID,
      Score: score,
      userEmail: userEmail      
    });
  }
}
