import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-signup-form',
  templateUrl: './auth-signup-form.component.html',
  styleUrls: [
    './styles/auth-signup-form.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupFormComponent {
  signupForm: FormGroup;
  // Where to redirect the user after successful login
  @Input() redirectUrl: string;
  @Output() success = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.signupForm = formBuilder.group({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.required),
      newsletter: new FormControl(false),
      terms: new FormControl(false, Validators.pattern('true'))
    });
  }

  onSubmit(): void {
    const data = {
      'first_name': this.signupForm.value.first_name,
      'last_name': this.signupForm.value.last_name,
      'username': this.signupForm.value.email,
      'email': this.signupForm.value.email,
      'newsletter': this.signupForm.value.newsletter,
      'password': this.signupForm.value.password
    };
    this.Signup(data);
  }

  Signup(data) {
    this.authService.signup(data).subscribe(res => {
      this.success.emit(true);
      this.signupForm.reset();
      this.router.navigateByUrl('login');
    },
    error => {
      console.log(error);
      this.success.emit(false);
    }
    );
  }

  // doSignup(data): void {
  //   this.authService.signup(data)
  //   .subscribe(
  //     res => {
  //       this.success.emit(true);
  //       this.signupForm.reset();

  //       // if (this.redirectUrl) {
  //       //   setTimeout(() => {
  //       //     return this.router.navigate([this.redirectUrl]);
  //       //   }, 500);
  //       // }
  //     },
  //     err => {
  //       console.log('There was an ERROR while creating the account');
  //     }
  //   );
  // }
}
