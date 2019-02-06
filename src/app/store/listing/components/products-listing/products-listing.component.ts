import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-products-listing',
  templateUrl: './products-listing.component.html',
  styleUrls: [
    './styles/products-listing.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProductsListingComponent {
  @Input() items;
}
