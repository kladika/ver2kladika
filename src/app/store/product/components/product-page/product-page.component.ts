import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AuthSigninModalComponent } from '../../../../auth';
import { AuthSignupModalComponent } from '../../../../auth';

import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: [
    './styles/product-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {
  loggedInObservable: Observable<boolean>;
  signinModal: BsModalRef;
  signupModal: BsModalRef;

  product;
  selectedImage;
  productVariantForm: FormGroup;
  productRatingForm: FormGroup;
  relatedProducts;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private authService: AuthService
  ) {
    this.loggedInObservable = authService.loggedInObservable();
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const data = routeData['data'];

      if (data && data !== null && data.product) {
        this.product = data.product;
        this.relatedProducts = this.product.related;

        if (this.product.images && this.product.images.length) {
          this.selectedImage = this.product.images[0];
        }

        this.productVariantForm = this.formBuilder.group({
          color_chooser: '#61fcc5',
          size_chooser: '7.5'
        });

        this.productRatingForm = this.formBuilder.group({
          overallRating: this.product.rate.overall
        });
      }
    });
  }

  selectImage(image): void {
    this.selectedImage = image;
  }

  openAuthModal(): void {
    console.log('openAuthModal');
    // Default option
    this.openSigninModal();
  }

  openSigninModal(): void {
    console.log('openSigninModal');
    this.signinModal = this.modalService.show(AuthSigninModalComponent);
    // Wire up signup intention from within signin modal
    this.signinModal.content.handleSignupIntention = () => {
      console.log('handling signup intention from within signin modal');
      this.signinModal.hide();
      this.openSignupModal();
    };
  }

  openSignupModal(): void {
    console.log('openSignupModal');
    this.signupModal = this.modalService.show(AuthSignupModalComponent);
    // Wire up signin intention from within signup modal
    this.signupModal.content.handleSigninIntention = () => {
      console.log('handling signin intention from within signup modal');
      this.signupModal.hide();
      this.openSigninModal();
    };
  }

  onSubmit(): void {
    console.log('Proceed to product purchase flow');
  }
}
