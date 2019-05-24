import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-top-navbar',
  styleUrls: ['./styles/top-navbar.styles.scss'],
  templateUrl: './top-navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TopNavbarComponent implements OnInit {
  navbarCollapsed = true;
  loggedInObservable: Observable<boolean>;
  logged_in: boolean;

  constructor(public router: Router, private authService: AuthService) {
    this.loggedInObservable = authService.loggedInObservable();
    // console.log(this.loggedInObservable);
    // console.log(JSON.parse(localStorage.getItem('user_profile')));
  }

  ngOnInit() {
  }

  logout(): void {
    const auth = JSON.stringify(localStorage.getItem('user_token'));
    if (auth) {
      this.authService.logout()
        .subscribe(
          res => {
            localStorage.removeItem('user_token');
            localStorage.removeItem('exp_date');
            localStorage.removeItem('user_profile');
            this.authService.userAuthenticated = false;
            this.authService.loggedInSubject.next(false);
            setTimeout(() => {
              return this.router.navigate(['/']);
            }, 500);
          },
          err => {
            console.log('Could\'t log out the user');
          }
        );
      } else {
        localStorage.removeItem('user_token');
        localStorage.removeItem('exp_date');
        localStorage.removeItem('user_profile');
        this.authService.userAuthenticated = false;
        this.authService.loggedInSubject.next(false);
      }
    }
}
