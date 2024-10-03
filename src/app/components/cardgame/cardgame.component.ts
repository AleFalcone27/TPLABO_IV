import { Component, OnInit } from '@angular/core';
import { CardsApiService } from '../../services/cards-api/cards-api.service';
import { tap } from 'rxjs/operators';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-cardgame',
  standalone: true,
  imports: [SnackBarOverviewExample,CommonModule],
  templateUrl: './cardgame.component.html',
  styleUrl: './cardgame.component.css',
  providers :[SnackBarOverviewExample]

})
export class CardgameComponent implements OnInit {
  card!: card;
  lastCard!: card;
  guessCount: number = 0;
  score: number = 0;

  constructor(private cardsApiService: CardsApiService,private snackBar: SnackBarOverviewExample) { }

  async ngOnInit(): Promise<void> {
    this.cardsApiService.initDeck().subscribe((response) => {
      if (response && response.cards) {
        this.card = response.cards[0];
      } 
    });
  }

  drawNext(guess: string): void {
    if (this.guessCount >= 10) {
      this.snackBar.openSnackBar('Ya alcanzaste el máximo de intentos', '❌');
      return;
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
}


type card = {
  code: string,
  image: string,
  suit: string,
  value: string;
}