import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { UserService } from '../../services/user.service';

@Injectable()
export class UserAccountPageResolver implements Resolve<any> {

  constructor(private userDataService: UserService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      const seo = {
        title: 'Account',
        description: 'Your account description',
        keywords: 'your, account, keywords'
      };

      this.userDataService.getAccountData()
      .then((userData: any) =>
        resolve({
          userData: userData,
          seo: seo
        }));
    });
  }
}
