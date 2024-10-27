import { Injectable,} from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, query, getDocs, orderBy } from '@angular/fire/firestore';
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

  async getSurveys() {
    let surveysCollection = collection(this.firestore, 'Surveys');
    let surveyQuery = query(
      surveysCollection, 
      orderBy('Date', 'desc')
    );

    let querySnapshot = await getDocs(surveyQuery);
    let surveys: { 
      comments: string, 
      favGame: string, 
      fun: number, 
      phoneNumber: string, 
      userEmail: string, 
      lastname: string,
      name: string,
      age: number, 
      date: string 
    }[] = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      let date: Date = data['Date'].toDate();
      let newDate: string = this.getDate(date);
      let stringGame:string = this.GameCodeToString(data['favGame'])
      surveys.push({
        date: newDate,    
        userEmail: data['userEmail'],
        age: data['age'],
        comments: data['comments'],
        name: data['name'],
        lastname: data['lastName'],
        favGame: stringGame,
        fun: data['fun'],
        phoneNumber: data['phoneNumber']
      });
    });

    console.log(surveys)
    return surveys;
}

  getDate(date: any): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return `${day}/${month}/${year} ${hour}:${minute}`
  }

  GameCodeToString(gameCode:number):string {
    switch (gameCode) {
      case 1:
        return 'Mayor o menor';
      case 4:
        return 'Typeracer';
      case 3:
        return 'Trivia';
      case 2:
        return 'Ahorcado';
      default:
        return 'Otro';
    }
  }

}
