import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackBarOverviewExample } from '../snack-bar/snack-bar.component';
import { SurveyService } from '../../services/survey/survey.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,SnackBarOverviewExample],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css',
  providers: [SnackBarOverviewExample]
})
export class SurveyComponent {

  form!: FormGroup;
  games = ['TypeRacer','Trivia','Mayor o menor','Ahorcado'];
  gameCodes = {
    'TypeRacer': 4,
    'Trivia': 3,
    'Mayor o menor': 1,
    'Ahorcado': 2
  };

  constructor(private router:Router, public snackBar:SnackBarOverviewExample, private surveyService:SurveyService) {

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      age: new FormControl("", [Validators.min(18), Validators.max(99),Validators.required]),
      lastName: new FormControl("", [Validators.pattern('^[a-z-A-Z]+$'),Validators.required]),
      name: new FormControl("", [Validators.pattern('^[a-z-A-Z]+$'),Validators.required]),
      phoneNumber: new FormControl("", [Validators.minLength(8), Validators.maxLength(10), Validators.required, Validators.pattern('^[0-9]+$')]),
      rating: new FormControl("", [Validators.required]),
      favGame: new FormControl("", [Validators.required]),
      comments: new FormControl("", [Validators.maxLength(100),Validators.minLength(10),Validators.required])
    });
  }

  get lastName() {
    return this.form.get('lastName');
  }
  get name() {
    return this.form.get('name');
  }
  get age() {
    return this.form.get('age');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber')
  }
  get rating() {
    return this.form.get('rating')
  }
  get favGame() {
    return this.form.get('favGame');
  }
  get comments(){
    return this.form.get('comments');
  }

  sendForm() {
    if (this.form.valid) {

      console.log(this.form.value);
      const favGameCode = this.gameCodes[this.form.value.favGame as keyof typeof this.gameCodes];
      
      this.surveyService.saveSurvey(
        this.form.get('name')?.value,
        this.form.get('lastName')?.value,
        this.form.get('age')?.value,
        this.form.get('phoneNumber')?.value,
        this.form.get('rating')?.value,
        favGameCode,
        this.form.get('comments')?.value
      )

      this.snackBar.openSnackBar('Tu respuesta fue guardada correctamente, ¡Gracias!', '✅')

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2000);

    } else {
      this.snackBar.openSnackBar('El formulario esta incompleto. Revisalo y volve a enviar', '✅')
    }
  }
}
