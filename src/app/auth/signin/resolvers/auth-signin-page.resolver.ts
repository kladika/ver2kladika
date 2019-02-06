import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class AuthSigninPageResolver implements Resolve<any> {

  resolve(): Promise<any> {
    return new Promise((resolve, reject) => {

      return resolve({
        seo: {
          title: 'Log in to your account',
          description: '',
          keywords: '',
          image_url: ''
        }
      });
    });
  }
}
