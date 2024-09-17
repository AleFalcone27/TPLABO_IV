import { Component } from '@angular/core';

@Component({
  selector: 'app-who-am-i',
  standalone: true,
  imports: [],
  templateUrl: './who-am-i.component.html',
  styleUrl: './who-am-i.component.css'
})
export class WhoAmIComponent {
  imageUrl: string = 'https://firebasestorage.googleapis.com/v0/b/labo4-4bb6e.appspot.com/o/me.jpeg?alt=media&token=82d7cc03-a635-4235-958c-8b4bb8d28bae';
}
