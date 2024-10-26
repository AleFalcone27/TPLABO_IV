import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuotesApiService } from '../../services/quotes-api/quotes-api.service';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ScoreService } from '../../services/scores/score.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { IGame } from '../../interfaces/iGame';

@Component({
  selector: 'app-typeracer-game',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogComponent],
  templateUrl: './typeracergame.component.html',
  styleUrls: ['./typeracergame.component.css'],
  providers: [SnackBarOverviewExample, DialogComponent]
})
export class TyperacerComponent implements IGame {
  quote: string = ''; 
  userInput: string = ''; 
  arrayQuote: { character: string, correct: boolean | null }[] = []; 
  countdown: number = 40; 
  countdownInterval: any; 
  score: number = 0;

  @ViewChild('hiddenTextarea') hiddenTextarea!: ElementRef; 

  constructor(private router:Router, private scoreService:ScoreService, private dialogComponent:DialogComponent, private http: HttpClient, private quoteApiService: QuotesApiService, private snackBar:SnackBarOverviewExample) {}

  ngOnInit(): void {
    this.renderNewQuote();
  }

  ngAfterViewInit(): void {
    this.focusTextarea(); 
    this.startCountdown();
  }
  
  focusTextarea(): void {
    setTimeout(() => {
      this.hiddenTextarea.nativeElement.focus(); 
    }, 0); 
  }

  getRandomQuote(): void {
    this.quote = this.quoteApiService.getQuote()
    this.renderArrayQuote();
  }

  renderNewQuote(): void {
    this.getRandomQuote(); 
  }

  renderArrayQuote(): void {
    if (this.quote) { 
      this.userInput = '';
      this.arrayQuote = this.quote.split('').map((character) => ({
        character,
        correct: null
      }));
      this.arrayQuote.forEach((a)=>{  
      })
      console.log(this.arrayQuote)
      this.focusTextarea(); 
    }
  }

  onInput(): void {
    const arrayValues = this.userInput.split('');
    this.arrayQuote.forEach((quoteChar, index) => {
      const character = arrayValues[index];
      if (character == null) {
        quoteChar.correct = null; 
      } else if (character === quoteChar.character) {
        quoteChar.correct = true; 
      } else {
        quoteChar.correct = false; 
      }
    });

    if (this.arrayQuote.length === arrayValues.length) {
      this.renderNewQuote(); 
    }
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown -= 1;
      console.log(this.countdown)
      if (this.countdown <= 0) {
        this.stopCountdown(); 
      }
    }, 1000); 
  }

  stopCountdown(): void {
    clearInterval(this.countdownInterval);
    this.snackBar.openSnackBar('¡Juego terminado! Has alcanzado el límite de 40 segundos', '❌');
    this.hiddenTextarea.nativeElement.blur(); 
    this.endGame();
  }

  endGame() {
    this.score = this.arrayQuote.filter(quoteChar => quoteChar.correct).length
    this.dialogComponent.openDialog().afterClosed().subscribe(result => {

      this.scoreService.WriteScore(4, this.score) 

      if (result) {
        this.replay();
      } else {
        this.exit();
      }
    });
  }

    replay() {
      this.quote = ''; 
      this.userInput = ''; 
      this.arrayQuote = [];   
      this.score = 0;
      this.countdown = 40;
      this.ngOnInit();
      this.startCountdown()
    }

    exit() {
      this.router.navigate(['/home']);
    }

}
