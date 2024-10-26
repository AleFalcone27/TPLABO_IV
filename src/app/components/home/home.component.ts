import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { HomecardComponent } from '../homecard/homecard.component';
import { OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatComponent, HomeComponent, HomecardComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAdmin!: boolean;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.adminStatus$;
    this.isAdmin = this.authService.getAdminStatus();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn() && !this.authService.getAdminStatus()) {
      this.checkAdminStatus();
    }
  }

  async checkAdminStatus() {
    this.isAdmin = await this.authService.isAdmin();
  }
}
