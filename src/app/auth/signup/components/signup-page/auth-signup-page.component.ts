import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-auth-signup-page',
  templateUrl: './auth-signup-page.component.html',
  styleUrls: [
    './styles/auth-signup-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupPageComponent {
  constructor() { }

  redirectAccount(): void {
    console.log('Do facebook signup');
  }
}
