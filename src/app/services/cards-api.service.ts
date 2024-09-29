import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService implements OnInit{

  constructor() { }


  async ngOnInit(): Promise<any> {
   
    let data = await fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')

    console.log(data);
  }


}
