import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AuthService } from '../../../services/auth.service';
import { AuthSigninModalComponent } from '../../../signin/components/signin-modal/auth-signin-modal.component';
import { AuthSignupModalComponent } from '../../../signup/components/signup-modal/auth-signup-modal.component';

@Component({
  selector: 'app-auth-signup-form',
  templateUrl: './auth-signup-form.component.html',
  providers: [BsModalService, BsModalRef],
  styleUrls: [
    './styles/auth-signup-form.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupFormComponent {
  signupForm: FormGroup;
  usernameError: Boolean = false;
  buttonLoader: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    private authService: AuthService,
    public modalRef: BsModalRef,
    private modalService: BsModalService,
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
    this.usernameError = false;
    this.buttonLoader = true;
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
      console.log(res);
      // this.success.emit(true);
      this.signupForm.reset();
      this.buttonLoader = false;
      this.router.url === '/create-account' ? this.router.navigate(['/login']) : this.openLoginModal();
    },
    error => {
      console.log(error);
      this.buttonLoader = false;
      if (error.error.username) {this.usernameError = true; }
      // this.success.emit(false);
    }
    );
  }

  openLoginModal(): void {
    this.authService.closeModalSubject.next(true);
    this.modalService.show(AuthSigninModalComponent);
  }

}
