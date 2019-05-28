import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-home-storefront-page',
  templateUrl: './storefront-page.component.html',
  styleUrls: [
    './styles/storefront-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeStorefrontPageComponent implements OnInit {
  newCollectionProducts = [];
  summerSaleProducts = [];
  highlightedProducts = [];
  categories: any;

  constructor(private route: ActivatedRoute, private productService: StoreProductsService) {
    this.newCollectionProducts = route.snapshot.data['data'].new_collection;
    this.summerSaleProducts = route.snapshot.data['data'].summer_sale;
    this.highlightedProducts = route.snapshot.data['data'].banners;
  }

  ngOnInit(): void {
    const categories = JSON.parse(sessionStorage.getItem('categories'));
    categories ? this.categories = categories : this.get_product_types();
  }

  get_product_types() {
    this.productService.get_product_types()
      .subscribe(res => {
        this.categories = res.results;
        sessionStorage.setItem('categories', JSON.stringify(res.results));
      },
        error => {
          console.log(error);
        });
  }

}
