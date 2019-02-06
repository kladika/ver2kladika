import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';
import { UserSharedModule } from '../';

import { AuthService } from '../../auth/services/auth.service';

import { UserAccountPageComponent } from './components/account-page/user-account-page.component';
import { UserAccountPageResolver } from './resolvers/user-account-page.resolver';


export const userAccountRoutes = [
  {
    path: '',
    component: UserAccountPageComponent,
    resolve: {
      data: UserAccountPageResolver
    },
    canActivate: [ AuthService ]
  }
];

@NgModule({
  declarations: [
    UserAccountPageComponent
  ],
  imports: [
    RouterModule.forChild(userAccountRoutes),
    CommonModule,
    SharedModule,
    UserSharedModule
  ],
  providers: [
    UserAccountPageResolver
  ]
})
export class UserAccountModule { }
