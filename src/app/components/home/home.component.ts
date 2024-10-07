import { Component } from '@angular/core';
import { ChatComponent } from '../chat/chat.component';
import { HomecardComponent } from '../homecard/homecard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChatComponent, HomeComponent, HomecardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
