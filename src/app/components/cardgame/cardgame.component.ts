import { Component, OnInit } from '@angular/core';
import { CardsApiService } from '../../services/cards-api/cards-api.service';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../dialog/dialog.component';
import { ScoreService } from '../../services/scores/score.service';
import { Router } from '@angular/router';
import { IGame } from '../../interfaces/iGame';

@Component({
  selector: 'app-cardgame',
  standalone: true,
  imports: [SnackBarOverviewExample, CommonModule, DialogComponent],
  templateUrl: './cardgame.component.html',
  styleUrl: './cardgame.component.css',
  providers: [SnackBarOverviewExample, DialogComponent]

})
export class CardgameComponent implements OnInit, IGame {
  card!: card;
  lastCard!: card;
  guessCount: number = 0;
  score: number = 0;

  constructor(private router: Router, private scoreService: ScoreService, private cardsApiService: CardsApiService, private snackBar: SnackBarOverviewExample, private dialog: MatDialog, private dialogComponent: DialogComponent) { }

  async ngOnInit(): Promise<void> {
    this.cardsApiService.initDeck().subscribe((response) => {
      if (response && response.cards) {
        this.card = response.cards[0];
      }
    });
  }

  drawNext(guess: string): void {
    if (this.guessCount >= 10) {
      this.endGame()
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
          if (this.score > 0) {
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

  endGame() {
    console.log(this.snackBar.openSnackBar('Ya alcanzaste el máximo de intentos', '❌'));

    this.dialogComponent.openDialog().afterClosed().subscribe(result => {

      this.scoreService.WriteScore(1, this.score) // Guardamos la putuacion en la base de datos

      if (result) {
        this.replay();
      } else {
        this.exit();
      }
    });
  }

  replay() {
    this.guessCount = 0;
    this.score = 0;
    this.drawNext('');
  }

  exit() {
    this.router.navigate(['/home']);
  }

}


type card = {
  code: string,
  image: string,
  suit: string,
  value: string;
}