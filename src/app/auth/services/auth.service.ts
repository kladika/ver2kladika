import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Location } from '@angular/common';
import { HttpServiceService } from '../../http-service/http-service.service';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class AuthService implements CanActivate {
  loggedInSubject: BehaviorSubject<boolean>;
  userAuthenticated = false;
  call_check = false;
  public token = new HttpHeaders({ 'Content-type': 'application/x-www-form-urlencoded' });

  constructor(private router: Router,
              private http: HttpClient,
              private location: Location,
              private http_service: HttpServiceService) {
    // this.token_refresh();
    this.loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Here you should check if your user is logged in then return true, else return false and redirect him to login page
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }

    return this.isAuthenticated();
  }

  loggedInObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }



  isAuthenticated(): boolean {
    const auth = JSON.parse(localStorage.getItem('user_token'));
    const exp_time = localStorage.getItem('exp_date');
    // console.log(auth);
    // console.log(exp_time);    //  && !this.call_check
    if (auth !== null && exp_time !== null) {
      this.userAuthenticated = true;
    //   this.call_check = true;
    //   if (moment().format() > moment(exp_time).format()) {
    //     this.userAuthenticated = true;
    //     console.log(this.userAuthenticated);
    //   } else if (moment(exp_time).subtract(1, 'hours').format() < moment().format() && moment(exp_time).format() > moment().format()) {
    //     this.http_service.token_refresh().subscribe(res => { this.userAuthenticated = true; }, error => { this.clear_login_details(); });
    //   } else {
    //     this.userAuthenticated = false;
    //     localStorage.removeItem('user_token');
    //     localStorage.removeItem('exp_date');
    //   }
    // } else if (this.call_check) {
    //   this.userAuthenticated = true;
    } else {
      this.userAuthenticated = false;
      localStorage.removeItem('user_token');
      localStorage.removeItem('exp_date');
    }
    return this.userAuthenticated;
  }

  clear_login_details() {
    localStorage.removeItem('user_token');
    localStorage.removeItem('exp_date');
    localStorage.removeItem('user_profile');
    localStorage.removeItem('categories');
    this.userAuthenticated = false;
    this.loggedInSubject.next(false);
  }

  signup(data: any): any {
    const newurl = `${this.http_service.apiURL}api/v1/users/`;
    const httpOptions = { headers: this.http_service.headers};
    return this.http
      .post(newurl, data, httpOptions)
      .pipe(map(res => {
        const user_data = {'username': data.username, 'password': data.password};
        return this.get_token(user_data);
      }));
  }

  get_token(data): any {
    const newurl = `${this.http_service.apiURL}o/token/`;
    const httpOptions = { headers: this.token};
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
    const data = `grant_type=${'refresh_token'}&refresh_token=${auth.refresh_token}&client_id=${'lxM7IDGzgY43lAwFLK6QLr2nazEpgEwK5upShF8y'}`;
    const newurl = `${this.http_service.apiURL}o/token/`;
    const httpOptions = { headers: this.token };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe((map(res => {
        console.log(res);
        localStorage.setItem('user_token', JSON.stringify(res));
        return res;
      })));
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
    const auth = JSON.parse(localStorage.getItem('user_token'));
    const data = `token=${auth.access_token}&client_id=${'lxM7IDGzgY43lAwFLK6QLr2nazEpgEwK5upShF8y'}`;
    const newurl = `${this.http_service.apiURL}o/revoke_token/`;
    const httpOptions = { headers: this.token };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe(
        map(res => {
          console.log(res);
          return res;
        })
      );
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
