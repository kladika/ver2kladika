import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
    public router: Router,
    private authService: AuthService
  ) {
    this.recoverPasswordForm = formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ]))
    });
  }

  onSubmit(): void {
    const data = {
      'email': this.recoverPasswordForm.value.email
    };
    this.authService.forgot_password(data)
      .subscribe(res => {
        if (res.error) {
          console.log(res);
        } else {
          console.log(res);
          this.recoverPasswordForm.reset();
          this.success.emit(true);
          // this.router.navigate(['/login']);
        }
      });
  }
}
