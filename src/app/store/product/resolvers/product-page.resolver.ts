import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { StoreProductsService } from '../../services/products.service';

@Injectable()
export class ProductPageResolver implements Resolve<any> {

  constructor(private productsService: StoreProductsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const product_slug = route.params['slug'];

    return new Promise((resolve, reject) => {
      if (product_slug) {
        this.productsService.getProduct(product_slug)
        .then(
          (product: any) => {
            console.log(product),
            resolve({
              product: product,
              breadcrumbs: [
                { url: '/', label: 'HOME' },
                { url: '/product/category/2/' + product.category, label: product.category },
                { url: '/product/2/' + product.title, label: product.title }
              ],
              seo: {
                title: 'Product name',
                description: 'Your product description',
                keywords: 'your, product, keywords'
              }
            });
          },
          err => {
            resolve({
              seo: {
                title: 'No product found',
                robots: 'noindex, nofollow'
              }
            });
          }
        );
      } else {
        resolve(null);
      }
    });
  }
}
