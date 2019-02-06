import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-top-navbar',
  styleUrls: ['./styles/top-navbar.styles.scss'],
  templateUrl: './top-navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TopNavbarComponent {
  navbarCollapsed = true;
  loggedInObservable: Observable<boolean>;

  constructor(public router: Router, private authService: AuthService) {
    this.loggedInObservable = authService.loggedInObservable();
  }

  logout(): void {
    this.authService.logout()
    .subscribe(
      res => {
        setTimeout(() => {
          return this.router.navigate(['/']);
        }, 500);
      },
      err => {
        console.log('Could\'t log out the user');
      }
    );
  }
}
