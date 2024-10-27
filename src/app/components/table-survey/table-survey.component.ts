import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey/survey.service';

@Component({
  selector: 'app-table-survey',
  standalone: true,
  imports: [CommonModule, MatTableModule, FormsModule],
  templateUrl: './table-survey.component.html',
  styleUrl: './table-survey.component.css'
})
export class TableSurveyComponent implements OnInit{

  dataSource: any[] = [];
  displayedColumns: string[] = ['Usuario','Nombre', 'Apellido' ,'Edad', 'JuegoFavorito', 'Diversion', 'Telefono', 'Comentarios', 'Fecha'];

  constructor(private surrveyService: SurveyService) {
  }
  
  async ngOnInit(): Promise<void> {
    this.surrveyService.getSurveys();
    this.dataSource = await this.surrveyService.getSurveys();
    console.log('a')
  }
}
