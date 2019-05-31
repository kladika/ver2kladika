import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AuthSigninPageComponent } from './components/signin-page/auth-signin-page.component';
import { AuthSigninPageResolver } from './resolvers/auth-signin-page.resolver';

import { AuthSharedModule } from '../';
import { AuthService } from '../services/auth.service';

export const authSigninRoutes = [
  {
    path: '',
    component: AuthSigninPageComponent,
    resolve: {
      data: AuthSigninPageResolver
    },
  }
];

@NgModule({
  declarations: [
    AuthSigninPageComponent
  ],
  imports: [
    ModalModule.forRoot(),
    RouterModule.forChild(authSigninRoutes),
    AuthSharedModule,
  ],
  providers: [
    AuthSigninPageResolver,
  ]
})
export class AuthSigninModule { }
