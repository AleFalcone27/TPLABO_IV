import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RickandmortyApiService {

  private http: HttpClient;
  private randPageNum!: number;
  characterPage!: any;


  constructor(http: HttpClient) {
    this.http = http;
  };

  public getPage(): Observable<any> {
    this.randPageNum = Math.floor(Math.random() * 42);
    return this.http.get<any>(`https://rickandmortyapi.com/api/character/?page=${this.randPageNum}`)
      .pipe(
        tap((response) => {
          this.characterPage = response;
        }),
      );
  }
}
