import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homecard',
  standalone: true,
  imports: [],
  templateUrl: './homecard.component.html',
  styleUrl: './homecard.component.css'
})
export class HomecardComponent {
  @Input() title!:string;
  @Input() description!:string;
  @Input() path!:string;
  @Input() btnText!:string;

  constructor(private router: Router){
  }

  goToGame() {
    this.router.navigate([`/juegos${this.path}`]);
  }
}
