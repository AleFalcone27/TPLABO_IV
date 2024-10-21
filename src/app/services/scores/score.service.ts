import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, query, where, getDocs, orderBy } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async WriteScore(gameID: number, score: number) {
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

  async GetScoresByGameID(gameID: number) {
    let scoresCollection = collection(this.firestore, 'Scores');
    let scoresQuery = query(
      scoresCollection,
      where('GameId', '==', gameID),
      orderBy('Score', 'desc') 
  );
    let querySnapshot = await getDocs(scoresQuery);
    let scores: { userEmail: string, score: number, date: string }[] = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let date: Date = data['Date'].toDate();
      let newDate: string = this.getDate(date);

        scores.push({
          userEmail: data['userEmail'],
          score: data['Score'],
          date: newDate
        });
    });

    return scores;
  }

  getDate(date: any): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`
  }

  GetGameCode(gameString:string):number {
    switch (gameString) {
      case 'Mayor o menor':
        return 2;
      case 'Typeracer':
        return 4;
      case 'Trivia':
        return 3;
      case 'Ahorcado':
        return 2;
      default:
        return 0;
    }
  }

}
