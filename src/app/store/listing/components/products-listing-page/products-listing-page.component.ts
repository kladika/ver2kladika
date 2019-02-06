import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-listing-page',
  templateUrl: './products-listing-page.component.html',
  styleUrls: [
    './styles/products-listing-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class ProductsListingPageComponent implements OnInit {
  products = [];
  productsFiltersForm: FormGroup;
  category_slug;
  tag_slug;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      const listing_path = this.route.snapshot.url[0]; // this can either be 'tag' or 'category'

      if (listing_path && listing_path.path === 'tag') {
        this.tag_slug = this.route.snapshot.params['slug'];
      } else if (listing_path && listing_path.path === 'category') {
        this.category_slug = this.route.snapshot.params['slug'];
      }

      this.products = this.route.snapshot.data['data'].products;
    });

    const color_options_group = new FormGroup({
      _fc9961: new FormControl(false),
      _007bff: new FormControl(false),
      _6610f2: new FormControl(true),
      _6f42c1: new FormControl(false),
      _e83e8c: new FormControl(false),
      _dc3545: new FormControl(false),
      _ffc107: new FormControl(false),
      _28a745: new FormControl(false),
      _20c997: new FormControl(false),
      _17a2b8: new FormControl(false),
      _343a40: new FormControl(false),
      _61fcc5: new FormControl(true),
      _fc61ad: new FormControl(false),
      _ffffff: new FormControl(true),
      _6c757d: new FormControl(false)
    });

    const size_options_group = new FormGroup({
      _7: new FormControl(true),
      _7_5: new FormControl(true),
      _8: new FormControl(true),
      _8_5: new FormControl(false),
      _9: new FormControl(false),
      _9_5: new FormControl(false),
      _10: new FormControl(false),
      _10_5: new FormControl(false),
      _11: new FormControl(false)
    });

    this.productsFiltersForm = this.formBuilder.group({
      color_filter: color_options_group,
      size_filter: size_options_group
    });
  }
}
