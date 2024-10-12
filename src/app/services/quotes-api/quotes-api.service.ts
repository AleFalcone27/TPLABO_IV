import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuotesApiService {

  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getQuote(): Observable<any> {
    return this.http.get<any>('http://api.quotable.io/random')
      .pipe(
        tap((response) => {
          console.log(response);
        }),
      );
  }
}