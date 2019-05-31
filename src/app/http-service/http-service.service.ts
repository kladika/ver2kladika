import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public apiURL = 'http://kladika.herokuapp.com/';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public token = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });

  constructor(public http: HttpClient) { }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(error as T);
    };
  }

}
