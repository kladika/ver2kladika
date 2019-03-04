import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

import { forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpServiceService } from '../../http-service/http-service.service';

@Injectable()
export class StoreProductsService {

  constructor(
    private http: HttpClient,
    private http_service: HttpServiceService,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {}

  getProduct(slug: string): Promise<any> {
    console.log(slug);
    return new Promise((resolve, reject) => {
      const product = this.http.get(this.baseHref + '/assets/data/products.json')
        .pipe(
          map((data: any) => {
            return data.items.find((product: any) => product.slug === slug);
          })
        );

      const product_details = this.http.get(this.baseHref + '/assets/data/product-extra-details.json');

      forkJoin(
        product,
        product_details
      ).subscribe(
        data => {
          if (data[0] && data[1]) {
            resolve(Object.assign({}, data[0], data[1]));
          } else {
            reject();
          }
        },
        err => {
          reject();
        },
      );
    });
  }

  getProducts(): Promise<any> {
    const newurl = `${this.http_service.apiURL}api/v1/products/`;
    return new Promise((resolve, reject) => {
      this.http.get(newurl, { headers: this.http_service.headers })
        .subscribe(
          data => {
            resolve(data);
          },
          error => reject(error)
        );
    });
  }
// this.http.get(this.baseHref + '/assets/data/products.json')
//   .subscribe(
//     data => resolve(data),
//     err => reject()
//   )
  get_product_types(): any {
    const newurl = `${this.http_service.apiURL}api/v1/product-types/`;
    return this.http.get(newurl, { headers: this.http_service.headers });
  }

  getProductsByCategory(cat_id: string): Promise<any> {
    console.log(cat_id);
    const newurl = `${this.http_service.apiURL}api/v1/products/?type=` + cat_id;
    return new Promise((resolve, reject) => {
      this.http.get(newurl, {headers: this.http_service.headers})
      .subscribe(
        data => resolve(data),
        err => reject(err)
      );
    });
  }

  getProductsByTag(tag: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseHref + '/assets/data/products.json')
      .pipe(
        map((products: any) => {
          return products.items.filter((product: any) => product.tag === tag);
        })
      )
      .subscribe(
        data => resolve(data),
        err => reject()
      );
    });
  }
}
