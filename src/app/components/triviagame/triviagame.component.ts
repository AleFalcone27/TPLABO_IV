import { Component, OnInit } from '@angular/core';
import { RickandmortyApiService } from '../../services/rickandmorty-api/rickandmorty-api.service';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
import { ScoreService } from '../../services/scores/score.service';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-triviagame',
  standalone: true,
  imports: [SnackBarOverviewExample,CommonModule, DialogComponent],
  templateUrl: './triviagame.component.html',
  styleUrl: './triviagame.component.css',
  providers: [SnackBarOverviewExample, DialogComponent]
})
export class TriviagameComponent implements OnInit{

  score: number = 0;
  options: string[] = [];
  characterList!: any;
  character!: any;
  randCharacter!: number;
  lastCharacters: number[] = [];
  characterIndex!: number;
  flag: boolean = false;
  guess: number = 0;
  guessLimit: number = 6;

  constructor(private scoreService:ScoreService, private router:Router, private dialogComponent:DialogComponent, private RickandMortyApiService:RickandmortyApiService,private snackBar: SnackBarOverviewExample) {
    this.snackBar.openSnackBar('Presiona cualquier botón para comenzar a jugar', '🎲');
  }

  ngOnInit(): void {
    this.RickandMortyApiService.getPage().subscribe((response) => {
      this.characterList = response.results;
      console.log(this.characterList);
    });
  }


  getCharacter(option: string){
    if (this.guess >= this.guessLimit) {
      this.snackBar.openSnackBar('¡Juego terminado! Has alcanzado el límite de 5 jugadas.', '🎲');
      this.endGame()
    }

    if (this.flag && option === this.character.name) {
      console.log(option,this.character.name)
      this.score++;
    } else {
      if(this.score > 0) this.score--;
    }
    this.resetGame();
    this.character = this.characterList[this.getRandomCharacter()];
    console.log(this.character);
    this.getOptions(); 
    this.flag = true;
    this.guess++;
    return this.options;
  }

  getRandomCharacter(){
    this.characterIndex = Math.floor(Math.random() * this.characterList.length)
    while(this.lastCharacters.includes(this.characterIndex)){
      this.characterIndex = Math.floor(Math.random() * this.characterList.length)
    }
    console.log(this.characterIndex)
    this.lastCharacters.push(this.characterIndex);
    return this.characterIndex;
  }

  getOptions(){
    const options = this.characterList.filter((character:any) => character.name !== this.character.name).map((character:any) => character.name);
    const randomOptions = this.shuffle(options).slice(0, 2);
    randomOptions.push(this.character.name);
    this.options = this.shuffle(randomOptions);
    return this.options;
    
  }

  resetGame(){
    this.options = [];
  }

  shuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  endGame() {
    this.dialogComponent.openDialog().afterClosed().subscribe(result => {

      this.scoreService.WriteScore(3, this.score) // Guardamos la putuacion en la base de datos

      if (result) {
        this.replay();
      } else {
        this.exit();
      }
    });
  }

  replay() {
    this.flag = false;
    this.guess = 0;
    this.score = 0;
    this.lastCharacters = [];
    this.ngOnInit();
    this.getCharacter('');
  }

  exit () {
    this.router.navigate(['/home']);
  }

}

