import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-signin-page',
  templateUrl: './auth-signin-page.component.html',
  styleUrls: [
    './styles/auth-signin-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninPageComponent {
  constructor() { }

  redirectAccount(): void {
    console.log('Do facebook login');
  }
}
