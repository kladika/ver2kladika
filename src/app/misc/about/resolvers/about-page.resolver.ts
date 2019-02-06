import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class AboutPageResolver implements Resolve<any> {

  resolve(): Promise<any> {
    return new Promise((resolve, reject) => {
      return resolve({
        seo: {
          title: 'About Us',
          description: '',
          keywords: '',
          image_url: ''
        }
      });
    });
  }
}
