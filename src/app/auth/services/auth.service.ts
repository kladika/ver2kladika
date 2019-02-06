import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable()
export class AuthService implements CanActivate {
  loggedInSubject: BehaviorSubject<boolean>;

  // MOCK:  Define a variable to store the user state. Don't use in production.
  //        You should call your own stateless API instead (and no need to store the user state)
  userAuthenticated = false;

  constructor(private router: Router,private http:HttpClient) {
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
  mysignup(data){
    return this.http.post("http://localhost:8000/api/users/",data)
  }

  isAuthenticated(): boolean {
    // EXAMPLE: Call your API and check if the user is authenticated
    // return this.userApi.isAuthenticated();

    // MOCK: Don't use in production. Call your own API (as the example above)
    return this.userAuthenticated;
  }

  signup(name: string, email: string, password: string, newsletter: boolean): Observable<any> {
    // EXAMPLE: Call your API and create the user in the database
    // return this.userApi.create({ email: email, password: password, name: name, newsletter: newsletter });

    // MOCK: Simulate the observable returned by the API
    const signupObservable = of(true);
    return signupObservable;
  }

  signin(email: string, password: string, rememberMe: boolean): Observable<any> {
    // EXAMPLE: Call your API and signin the user
    // const signinObservable = this.userApi.login({ email: email, password: password }, false, rememberMe);

    // MOCK: Simulate the observable returned by the API
    const signinObservable = of(true);
    signinObservable.subscribe(
      res => {
        this.userAuthenticated = res;
        this.loggedInSubject.next(res);
      }
    );

    return signinObservable;
  }

  logout(): Observable<any> {
    // EXAMPLE: Call your API and logout the user
    // const logoutObservable = this.userApi.logout();

    // MOCK: Simulate the observable returned by the API
    const logoutObservable = of(false);
    logoutObservable.subscribe(
      res => {
        this.userAuthenticated = res;
        this.loggedInSubject.next(res);
      },
      err => {
        console.log('Logout ERROR', err);
      }
    );

    return logoutObservable;
  }
}
