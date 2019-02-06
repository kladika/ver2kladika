import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-recover-password-form',
  templateUrl: './auth-recover-password-form.component.html',
  styleUrls: [
    './styles/auth-recover-password-form.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthRecoverPasswordFormComponent {
  recoverPasswordForm: FormGroup;
  // Where to redirect the user after successful login
  @Input() redirectUrl: string;
  @Output() success = new EventEmitter();

  constructor(
    public formBuilder: FormBuilder,
    public router: Router
  ) {
    this.recoverPasswordForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ]))
    });
  }

  onSubmit(): void {
    console.log('Recovering password ...');

    this.success.emit(true);
    this.recoverPasswordForm.reset();

    if (this.redirectUrl) {
      setTimeout(() => {
        return this.router.navigate([this.redirectUrl]);
      }, 1000);
    }
  }
}
