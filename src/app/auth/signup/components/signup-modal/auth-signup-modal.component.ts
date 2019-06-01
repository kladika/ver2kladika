import { Component, ViewEncapsulation } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../services/auth.service';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-auth-signup-modal',
  templateUrl: './auth-signup-modal.component.html',
  styleUrls: [
    './styles/auth-signup-modal.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupModalComponent {

  constructor(public modalRef: BsModalRef, private authService: AuthService) {
    authService.closeModalObservable().subscribe(res => {
      if (res) { this.modalRef.hide(); authService.closeModalSubject.next(false); }
    });
   }

  handleSigninIntention(): void {
    console.log('Default behavior - AuthSignupModalComponent - handleSigninIntention()');
  }

  handleSocialSignupIntention(): void {
    console.log('Default behavior - AuthSignupModalComponent - handleSocialSignupIntention()');
  }

  signupSuccess(success) {
    if (success) {
      this.modalRef.hide();
    }
  }
}
