import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { forkJoin } from 'rxjs';

import { StoreProductsService } from '../../services/products.service';
import { StoreBannersService } from '../../services/banners.service';

@Injectable()
export class HomeStorefrontPageResolver implements Resolve<any> {

  constructor(
    private productsService: StoreProductsService,
    private bannersService: StoreBannersService
  ) {}

  resolve() {
    return new Promise((resolve, reject) => {
      forkJoin(
        this.productsService.getProductsByTag('new-collection'),
        this.productsService.getProductsByTag('summer'),
        this.bannersService.getBanners()
      ).subscribe((data: any) => {
        resolve({
          new_collection: data[0],
          summer_sale: data[1],
          banners: data[2],
          seo: {
            title: 'Home',
            description: 'Your home description',
            keywords: 'your, home, keywords'
          }
        });
      });
    });
  }
}
