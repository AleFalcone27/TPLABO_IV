import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { ScoreService } from '../../services/scores/score.service';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  games = ['Typeracer','Mayor o menor', 'Ahorcado', 'Trivia']
  selectedGame: string = '';
  dataSource: any[] = [];
  displayedColumns: string[] = ['Usuario', 'Puntuación', 'Fecha'];

  constructor(private scoreService: ScoreService) {
  }

  async applyFilter(){
    console.log(this.selectedGame)
    this.dataSource = await this.scoreService.GetScoresByGameID(this.scoreService.GetGameCode(this.selectedGame));
  }
}
