import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WordsApiService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
   }

   public getNextWord(): Observable<any> {
    return this.http.get<any>('https://clientes.api.greenborn.com.ar/public-random-word')
      .pipe(
        tap((response) => {
          console.log(response);
        }),
      );
  }
}
