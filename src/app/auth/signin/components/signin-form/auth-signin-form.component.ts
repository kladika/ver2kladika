import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit } from '@angular/core';
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
export class AuthSigninFormComponent implements OnInit {
  signinForm: FormGroup;
  // Where to redirect the user after successful login
  @Input() redirectUrl: string;
  @Output() success = new EventEmitter();
  error: string;
  buttonLoader: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
  ) {
    authService.loggedInObservable().subscribe(val => {
      if (val && this.router.url === '/login') { this.router.navigate(['/user']);  console.log('seen'); }
    });

    this.signinForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {

  }

  onSubmit(): void {
    this.buttonLoader = true;
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
    const body = `username=${data.email}&password=${data.password}&grant_type=${'password'}&client_id=${this.authService.clientId}`;
    // console.log(body);
    this.authService.get_token(body)
    .subscribe(
      res => {
        console.log(res);
        this.signinForm.reset();
        this.authService.loggedInSubject.next(true);
        this.buttonLoader = false;
        this.router.url === '/login' ? this.router.navigate(['/user']) : this.authService.closeModalSubject.next(true);
      },
      error => {
        console.log(error);
        this.buttonLoader = false;
        this.error = error.statusText;
        this.success.emit(false);
      }
    );
  }

}
