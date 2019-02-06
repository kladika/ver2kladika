import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';

@Injectable()
export class StoreBannersService {

  constructor(
    private http: HttpClient,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {}

  getBanners(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseHref + '/assets/data/banners.json')
      .subscribe(
        data => {
          resolve(data);
        },
        err => {
          reject();
        }
      );
    });
  }
}
