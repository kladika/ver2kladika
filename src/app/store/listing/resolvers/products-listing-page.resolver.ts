import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { forkJoin } from 'rxjs';

import { StoreProductsService } from '../../services/products.service';

@Injectable()
export class ProductsListingPageResolver implements Resolve<any> {

  constructor(
    private productsService: StoreProductsService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    let category_slug;
    let tag_slug;

    if (route.url[0] && (route.url[0].path === 'tag')) {
      tag_slug = route.params['slug'];
    } else if (route.url[0] && (route.url[0].path === 'category')) {
      category_slug = route.params['slug'];
    }

    return new Promise((resolve, reject) => {
      if (category_slug) {
        // If the user is requesting products under a specific category
        forkJoin(
          this.productsService.getProductsByCategory(category_slug)
        ).subscribe((data: any) => {
          resolve({
            products: data[0],
            breadcrumbs: [
              { url: '/', label: 'HOME' },
              { url: '/products/category/' + category_slug, label: category_slug }
            ],
            seo: {
              title: category_slug + ' Category Products Listing',
              description: 'Your product listing description',
              keywords: 'your, product, listing, keywords'
            }
          });
        });
      } else if (tag_slug) {
        // If the user is requesting products under a specific tag
        forkJoin(
          this.productsService.getProductsByTag(tag_slug)
        ).subscribe((data: any) => {
          resolve({
            products: data[0],
            breadcrumbs: [
              { url: '/', label: 'HOME' },
              { url: '/products/tag/' + tag_slug, label: tag_slug }
            ],
            seo: {
              title: tag_slug + ' Tag Products Listing',
              description: 'Your product listing description',
              keywords: 'your, product, listing, keywords'
            }
          });
        });
      } else {
        // Default option, when the user requests all products
        forkJoin(
          this.productsService.getProducts()
        ).subscribe((data: any) => {
          resolve({
            products: data[0].items,
            breadcrumbs: [
              { url: '/', label: 'HOME' },
              { url: '/products', label: 'ALL products' }
            ],
            seo: {
              title: 'Products Listing',
              description: 'Your product listing description',
              keywords: 'your, product, listing, keywords'
            }
          });
        });
      }
    });
  }
}
