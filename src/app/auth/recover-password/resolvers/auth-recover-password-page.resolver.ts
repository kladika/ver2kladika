import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class AuthRecoverPasswordPageResolver implements Resolve<any> {

  resolve(): Promise<any> {
    return new Promise((resolve, reject) => {

      return resolve({
        seo: {
          title: 'Recover your password',
          description: '',
          keywords: '',
          image_url: ''
        }
      });
    });
  }
}
