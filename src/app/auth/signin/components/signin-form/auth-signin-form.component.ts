import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-auth-signin-form',
  templateUrl: './auth-signin-form.component.html',
  styleUrls: [
    './styles/auth-signin-form.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninFormComponent implements OnInit {
  signinForm: FormGroup;
  // Where to redirect the user after successful login
  @Input() redirectUrl: string;
  @Output() success = new EventEmitter();
  error: string;
  loggedInObservable: Observable<boolean>;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
  ) {
    this.signinForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.loggedInObservable = this.authService.loggedInObservable();
    // console.log(this.loggedInObservable);

    if (this.loggedInObservable) {
      this.router.navigate(['/user']);
    }
  }

  onSubmit(): void {
    this.error = '';
    const data = {
      'email': this.signinForm.value.email,
      'password': this.signinForm.value.password
    };
    const date = new Date();
    this.Signin(data);
  }

  Signin(data): void {
    // tslint:disable-next-line:max-line-length
    const body = `username=${data.email}&password=${data.password}&grant_type=${'password'}&client_id=${'lxM7IDGzgY43lAwFLK6QLr2nazEpgEwK5upShF8y'}`;
    // console.log(body);
    this.authService.get_token(body)
    .subscribe(
      res => {
        console.log(res);
        this.signinForm.reset();
        this.success.emit(true);
        this.authService.userAuthenticated = true;
        this.authService.loggedInSubject.next(true);
        this.router.navigate(['/user']);
      },
      error => {
          this.error = error.statusText;
          this.success.emit(false);
      }
    );
  }



}
