import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-signup-page',
  templateUrl: './auth-signup-page.component.html',
  styleUrls: [
    './styles/auth-signup-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupPageComponent {
  constructor(public router: Router, private authService: AuthService) {
    authService.loggedInObservable().subscribe(val => {
      if (val) { this.router.navigate(['/user']); }
    });
  }
}
