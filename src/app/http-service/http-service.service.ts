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

  token_refresh(): any {
    const auth = JSON.parse(localStorage.getItem('user_token'));
    // tslint:disable-next-line:max-line-length
    const data = `grant_type=${'refresh_token'}&refresh_token=${auth.refresh_token}&client_id=${'lxM7IDGzgY43lAwFLK6QLr2nazEpgEwK5upShF8y'}`;
    const newurl = `${this.apiURL}o/token/`;
    const httpOptions = { headers: this.token };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe((map(res => {
        console.log(res);
        localStorage.setItem('user_token', JSON.stringify(res));
        return res;
      })));
  }

}
