import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { HttpServiceService } from '../../http-service/http-service.service';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class AuthService implements CanActivate {
  loggedInSubject: BehaviorSubject<boolean>;
  closeModalSubject: BehaviorSubject<boolean>;
  userAuthenticated = false;
  call_check = false;
  public tokenHeaders = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });
  public clientId = 'lxM7IDGzgY43lAwFLK6QLr2nazEpgEwK5upShF8y';
  constructor(private router: Router,
              private http: HttpClient,
              private location: Location,
              private http_service: HttpServiceService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    this.closeModalSubject = new BehaviorSubject<boolean>(false);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Here you should check if your user is logged in then return true, else return false and redirect him to login page
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
    return true;
  }

  loggedInObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  closeModalObservable(): Observable<boolean> {
    return this.closeModalSubject.asObservable();
  }

  isAuthenticated(): boolean {
    const auth = JSON.parse(localStorage.getItem('user_token'));
    auth ? this.userAuthenticated = true : this.userAuthenticated = false;
    return this.userAuthenticated;
  }

  signup(data: any): any {
    const newurl = `${this.http_service.apiURL}api/v1/users/`;
    const httpOptions = { headers: this.http_service.headers};
    return this.http
      .post(newurl, data, httpOptions)
      .pipe(
      //   map(res => {
      //   const user_data = {'username': data.username, 'password': data.password};
      //   return this.get_token(user_data);
      // })
      );
  }

  get_token(data): any {
    const newurl = `${this.http_service.apiURL}o/token/`;
    const httpOptions = { headers: this.tokenHeaders};
    return this.http
      .post<any>(newurl, data, httpOptions)
      .pipe(mergeMap(res => {
        // save token
        localStorage.setItem('user_token', JSON.stringify(res));
        localStorage.setItem('exp_date', moment().add(res.expires_in / 3600, 'hours').format());
        return this.get_profile();
      }));
  }

  token_refresh(): any {
    const auth = JSON.parse(localStorage.getItem('user_token'));
    // tslint:disable-next-line:max-line-length
    const data = `grant_type=${'refresh_token'}&refresh_token=${auth.refresh_token}&client_id=${this.clientId}`;
    const newurl = `${this.http_service.apiURL}o/token/`;
    const httpOptions = { headers: this.tokenHeaders };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe((map(res => {
        console.log(res);
        localStorage.setItem('user_token', JSON.stringify(res));
        return res;
      })), catchError(this.http_service.handleError()));
  }

  get_profile(): any {
    const auth = JSON.parse(localStorage.getItem('user_token'));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + auth.access_token });
    const newurl = `${this.http_service.apiURL}api/v1/users/me/profile/`;
    return this.http
      .get(newurl, { headers: headers })
      .pipe(map(res => {
        localStorage.setItem('user_profile', JSON.stringify(res));
        return res;
      }));
  }


  logout(): any {
    console.log('log out seen');
    const auth = JSON.parse(localStorage.getItem('user_token'));
    if (auth) {
      const data = `token=${auth.access_token}&client_id=${this.clientId}`;
      const newurl = `${this.http_service.apiURL}o/revoke_token/`;
      const httpOptions = { headers: this.tokenHeaders };
      return this.http
        .post(newurl, data, httpOptions)
        .pipe(
          map(res => {
            localStorage.clear();
            if (this.router.url === '/user') { this.router.navigate(['']); }
            this.loggedInSubject.next(false);
            return res;
          })
        );
    } else {
      localStorage.clear();
      this.loggedInSubject.next(false);
      if (this.router.url === '/user') { this.router.navigate(['']); }
      return throwError('credentials');
    }
  }

  forgot_password(data): any {
    const newurl = `${this.http_service.apiURL}api/v1/users/forgot-password`;
    const httpOptions = { headers: this.http_service.headers };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe(
        catchError(this.http_service.handleError())
      );
  }

}
