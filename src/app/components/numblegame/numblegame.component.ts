import { Component, OnInit, ViewChildren, QueryList, ElementRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';


@Component({
  selector: 'app-numblegame',
  standalone: true,
  imports: [CommonModule, SnackBarOverviewExample],
  templateUrl: './numblegame.component.html',
  styleUrl: './numblegame.component.css',
  providers: [SnackBarOverviewExample]
})

export class NumblegameComponent implements OnInit {
   
  public randNum: number[] = [];
  public tries:number[] = [0,0,0,0,0];

  constructor(private snackBar: SnackBarOverviewExample){
  }

  ngOnInit(): void {
    for (let i = 0; i < 6; i++) { 
      let randomNumber:number = Math.floor(Math.random() * 9);
      this.randNum.push(randomNumber);
    }
    console.log(this.randNum)
  }

  @ViewChildren('input') inputs?: QueryList<HTMLInputElement>;


  onInputChange(index: number) {
    if (index < this.tries.length - 1) {
      this.inputs?.toArray()[index + 1].focus();
    }
    console.log(index)
  }
}
