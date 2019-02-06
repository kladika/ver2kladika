import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthSignupPageComponent } from './components/signup-page/auth-signup-page.component';
import { AuthSignupPageResolver } from './resolvers/auth-signup-page.resolver';

import { AuthSharedModule } from '../';

export const authSignupRoutes = [
  {
    path: '',
    component: AuthSignupPageComponent,
    resolve: {
      data: AuthSignupPageResolver
    }
  }
];

@NgModule({
  declarations: [
    AuthSignupPageComponent
  ],
  imports: [
    RouterModule.forChild(authSignupRoutes),
    AuthSharedModule
  ],
  providers: [
    AuthSignupPageResolver
  ]
})
export class AuthSignupModule { }
