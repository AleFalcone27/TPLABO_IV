import { Component, OnInit } from '@angular/core';
import { WordsApiService } from '../../services/words-api/words-api.service';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hangmangame',
  standalone: true,
  imports: [CommonModule, SnackBarOverviewExample],
  templateUrl: './hangmangame.component.html',
  styleUrl: './hangmangame.component.css',
  providers: [SnackBarOverviewExample]
})

export class HangmangameComponent implements OnInit {

  public letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  private word!: string;
  public mockWord!: string[];
  public errors: number = 0;
  public lettersStatus: { [key: string]: string } = {};
  private score: number = 0;

  constructor(private WordsApiService: WordsApiService, private snackBar: SnackBarOverviewExample) {

  }

  ngOnInit(): void {
    this.WordsApiService.getNextWord().subscribe((word) => {
      this.word = word[0];
      this.mockWord = new Array(this.word.length).fill('_');
    });
  }

  keyPressed(letter: string) {
    if (this.errors < 6) {
      let wordArray = this.word.split('');
      let encontrado = false;
      for (let i = 0; i < wordArray.length; i++) {
        if (this.eliminarDiacriticos(wordArray[i]) === letter.toLowerCase()) {
          this.mockWord[i] = letter.toUpperCase();
          encontrado = true;
        }
      }
      if (!encontrado) {
        this.errors++;
      }
      this.lettersStatus[letter] = encontrado ? 'encontrada' : 'no-encontrada';
      if (this.word.toUpperCase() == this.mockWord.join('')) {
        this.score = 10;
        this.snackBar.openSnackBar('¡Juego terminado! . Ganaste 10 puntos', '✅');
      }
    }
    else {
      this.snackBar.openSnackBar('¡Juego terminado! Has alcanzado el límite de 7 intentos. Ganaste 0 puntos', '❌');
    }
  }

  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

}