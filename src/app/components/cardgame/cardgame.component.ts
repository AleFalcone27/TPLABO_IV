import { Component, OnInit } from '@angular/core';
import { CardsApiService } from '../../services/cards-api/cards-api.service';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { ScoreService } from '../../services/scores/score.service';
import { Firestore, collection, addDoc, Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-cardgame',
  standalone: true,
  imports: [SnackBarOverviewExample,CommonModule,DialogComponent],
  templateUrl: './cardgame.component.html',
  styleUrl: './cardgame.component.css',
  providers :[SnackBarOverviewExample,DialogComponent]

})
export class CardgameComponent implements OnInit {
  card!: card;
  lastCard!: card;
  guessCount: number = 0;
  score: number = 0;

  constructor(private firestore:Firestore, private scoreService:ScoreService, private cardsApiService: CardsApiService,private snackBar: SnackBarOverviewExample, private dialog:MatDialog, private dialogComponent:DialogComponent) { }

  async ngOnInit(): Promise<void> {
    this.cardsApiService.initDeck().subscribe((response) => {
      if (response && response.cards) {
        this.card = response.cards[0];
      } 
    });
  }

  drawNext(guess: string): void {
    if (this.guessCount >= 10) {
      console.log(this.snackBar.openSnackBar('Ya alcanzaste el máximo de intentos', '❌'));

      this.dialogComponent.openDialog().afterClosed().subscribe(result => {
        if (result) {
          // Logica para volver a jugar
          // llamar funcion replay


          console.log('User  wants to play again');
        } else {
          // Guardar el puntaje
          // Logica para salir del juego a home
          console.log('User  wants to exit');
        }
      });
    }

    this.lastCard = { ...this.card };
    this.cardsApiService.drawNextCard().pipe(
      tap(deck => {
        this.card = deck.cards[0];

        const lastCardValue = this.NormalizeSCArds(this.lastCard.value);
        const newCardValue = this.NormalizeSCArds(this.card.value);

        if (guess === 'mayor' && newCardValue > lastCardValue) {
          this.score++;
        } else if (guess === 'menor' && newCardValue < lastCardValue) {
          this.score++;
        } else {
          if (this.score > 0 ){
            this.score--;
          }
        }
      })
    ).subscribe(() => {
      this.guessCount++;
    });
  }

  NormalizeSCArds(value: string): number {
    switch (value) {
      case 'ACE':
        return 1
      case 'JACK':
        return 11
      case 'QUEEN':
        return 12
      case 'KING':
        return 13
      default:
        return parseInt(value);
    }
  }
  async WriteLog() {
    let col = collection(this.firestore, 'Scores');
    const docRef = await addDoc(col, {
      // add controller properties
    });
  }

}


type card = {
  code: string,
  image: string,
  suit: string,
  value: string;
}