import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardsApiService {
  private http: HttpClient;
  deck_id!: string;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public initDeck(): Observable<any> {
    return this.http.get<any>('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .pipe(
        tap((response) => {
          this.deck_id = response.deck_id;
        }),
      );
  }

  public drawNextCard(): Observable<any> {
    return this.http.get(`https://www.deckofcardsapi.com/api/deck/${this.deck_id}/draw/?count=1`)
  }
}