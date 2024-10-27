import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-homecard',
  standalone: true,
  imports: [],
  templateUrl: './homecard.component.html',
  styleUrl: './homecard.component.css'
})
export class HomecardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() path!: string;
  @Input() btnText!: string;
  @Input() imageUrl: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  goToGame() {
    if (this.authService.isLoggedIn()) {
      console.log(this.authService.isLoggedIn());
      this.router.navigate([`/juegos${this.path}`]);
    } else {
      this.router.navigate(['/login'])
    }
  }
}
