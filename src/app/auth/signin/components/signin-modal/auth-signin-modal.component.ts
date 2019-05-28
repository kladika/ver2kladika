import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-auth-signin-modal',
  templateUrl: './auth-signin-modal.component.html',
  styleUrls: [
    './styles/auth-signin-modal.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninModalComponent {

  constructor(public modalRef: BsModalRef) { }

  handleSignupIntention(): void {
    console.log('Default behavior - AuthSigninModalComponent - handleSignupIntention()');
  }

  handleSocialSigninIntention(): void {
    console.log('Default behavior - AuthSigninModalComponent - handleSocialSigninIntention()');
  }

  signinSuccess(success) {
    console.log(success);
    if (success) {
      this.modalRef.hide();
    }
  }
}
