import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { AuthSigninFormComponent } from './signin/components/signin-form/auth-signin-form.component';
import { AuthSigninModalComponent } from './signin/components/signin-modal/auth-signin-modal.component';

import { AuthSignupFormComponent } from './signup/components/signup-form/auth-signup-form.component';
import { AuthSignupModalComponent } from './signup/components/signup-modal/auth-signup-modal.component';

import { AuthRecoverPasswordFormComponent } from './recover-password/components/recover-password-form/auth-recover-password-form.component';


@NgModule({
  declarations: [
    // Signin stuff
    AuthSigninFormComponent,
    AuthSigninModalComponent,
    // Signup stuff
    AuthSignupFormComponent,
    AuthSignupModalComponent,
    // Recover password stuff
    AuthRecoverPasswordFormComponent
  ],
  imports: [
    SharedModule
  ],
  entryComponents: [
    AuthSigninModalComponent,
    AuthSignupModalComponent
  ],
  exports: [
    // Signin stuff
    AuthSigninFormComponent,
    AuthSigninModalComponent,
    // Signup stuff
    AuthSignupFormComponent,
    AuthSignupModalComponent,
    // Recover password stuff
    AuthRecoverPasswordFormComponent
  ]
})
export class AuthSharedModule { }
