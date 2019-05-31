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
      this.authService.logout()
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log('Could\'t log out the user');
          }
        );
      }
}
