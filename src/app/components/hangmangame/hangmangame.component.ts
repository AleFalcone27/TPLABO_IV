import { Component, OnInit } from '@angular/core';
import { WordsApiService } from '../../services/words-api/words-api.service';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../services/scores/score.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-hangmangame',
  standalone: true,
  imports: [CommonModule, SnackBarOverviewExample, DialogComponent],
  templateUrl: './hangmangame.component.html',
  styleUrl: './hangmangame.component.css',
  providers: [SnackBarOverviewExample, DialogComponent]
})

export class HangmangameComponent implements OnInit {

  public letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  private word!: string;
  public mockWord!: string[];
  public errors: number = 0;
  public lettersStatus: { [key: string]: string } = {};
  private score: number = 0;

  constructor(private router: Router, private scoreService: ScoreService, private WordsApiService: WordsApiService, private snackBar: SnackBarOverviewExample, private dialogComponent: DialogComponent) {

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
        this.endGame();
      }
    }
    else {
      this.snackBar.openSnackBar('¡Juego terminado! Has alcanzado el límite de 7 intentos. Ganaste 0 puntos', '❌');
      this.endGame();
    }
  }

  endGame() {

    this.dialogComponent.openDialog().afterClosed().subscribe(result => {

      this.scoreService.WriteScore(2, this.score) // Guardamos la putuacion en la base de datos

      if (result) {
        this.replay();
      } else {
        this.exit();
      }
    });
  }

  eliminarDiacriticos(texto: string) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
  }

  replay() {
    this.errors = 0;
    this.score = 0;
    this.lettersStatus = {};
    this.ngOnInit();
  }

  exit() {
    this.router.navigate(['/home']);
  }
}