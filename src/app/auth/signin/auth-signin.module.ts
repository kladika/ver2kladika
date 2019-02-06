import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthSigninPageComponent } from './components/signin-page/auth-signin-page.component';
import { AuthSigninPageResolver } from './resolvers/auth-signin-page.resolver';

import { AuthSharedModule } from '../';

export const authSigninRoutes = [
  {
    path: '',
    component: AuthSigninPageComponent,
    resolve: {
      data: AuthSigninPageResolver
    }
  }
];

@NgModule({
  declarations: [
    AuthSigninPageComponent
  ],
  imports: [
    RouterModule.forChild(authSigninRoutes),
    AuthSharedModule
  ],
  providers: [
    AuthSigninPageResolver
  ]
})
export class AuthSigninModule { }
