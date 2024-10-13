import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuotesApiService } from '../../services/quotes-api/quotes-api.service';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-typeracer-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './typeracergame.component.html',
  styleUrls: ['./typeracergame.component.css'],
  providers: [SnackBarOverviewExample]
})
export class TyperacerComponent {
  quote: string = ''; 
  userInput: string = ''; 
  arrayQuote: { character: string, correct: boolean | null }[] = []; 
  countdown: number = 60; 
  countdownInterval: any; 
  score: number = 0;

  @ViewChild('hiddenTextarea') hiddenTextarea!: ElementRef; 

  constructor(private http: HttpClient, private quoteApiService: QuotesApiService, private snackBar:SnackBarOverviewExample) {}

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
    this.quoteApiService.getQuote().subscribe((response) => {
      if (response && response.content) {
        this.quote = response.content;
        this.renderArrayQuote();
      } else {
        this.quote = 'Error: No se pudo cargar la cita'; 
      }
    });
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
    this.snackBar.openSnackBar('¡Juego terminado! Has alcanzado el límite de 7 intentos. Ganaste 0 puntos', '❌');
  }
}
