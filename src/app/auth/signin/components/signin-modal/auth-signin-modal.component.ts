import { Component, ViewEncapsulation } from '@angular/core';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-auth-signin-modal',
  templateUrl: './auth-signin-modal.component.html',
  styleUrls: [
    './styles/auth-signin-modal.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSigninModalComponent {

  constructor(public modalRef: BsModalRef, private authService: AuthService) {
    authService.closeModalObservable().subscribe(val => {
      if (val) {
        this.modalRef.hide();
        authService.closeModalSubject.next(false);
      }
    });
   }
   
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
