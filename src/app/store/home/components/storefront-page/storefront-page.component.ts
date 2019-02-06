import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-storefront-page',
  templateUrl: './storefront-page.component.html',
  styleUrls: [
    './styles/storefront-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeStorefrontPageComponent {
  newCollectionProducts = [];
  summerSaleProducts = [];
  highlightedProducts = [];

  constructor(private route: ActivatedRoute) {
    this.newCollectionProducts = route.snapshot.data['data'].new_collection;
    this.summerSaleProducts = route.snapshot.data['data'].summer_sale;
    this.highlightedProducts = route.snapshot.data['data'].banners;
  }
}
