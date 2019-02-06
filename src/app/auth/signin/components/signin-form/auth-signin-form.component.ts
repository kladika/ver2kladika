import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-signin-form',
  templateUrl: './auth-signin-form.component.html',
  styleUrls: [
    './styles/auth-signin-form.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninFormComponent {
  signinForm: FormGroup;
  // Where to redirect the user after successful login
  @Input() redirectUrl: string;
  @Output() success = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.signinForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    this.doSignin(this.signinForm.value.email, this.signinForm.value.password, true);
  }

  doSignin(email: string, password: string, rememberMe: boolean): void {
    this.authService.signin(email, password, rememberMe)
    .subscribe(
      res => {
        this.success.emit(true);
        this.signinForm.reset();

        if (this.redirectUrl) {
          setTimeout(() => {
            return this.router.navigate([this.redirectUrl]);
          }, 500);
        }
      },
      err => {
        this.success.emit(false);
      }
    );
  }
}
