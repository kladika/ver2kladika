import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-signin-page',
  templateUrl: './auth-signin-page.component.html',
  styleUrls: [
    './styles/auth-signin-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninPageComponent {
  constructor( public router: Router, private authService: AuthService) {
    authService.loggedInObservable().subscribe(val => {
      if (val) { this.router.navigate(['/user']); }
    });
  }
}
