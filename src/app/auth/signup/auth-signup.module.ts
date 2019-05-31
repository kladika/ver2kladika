import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AuthSignupPageComponent } from './components/signup-page/auth-signup-page.component';
import { AuthSignupPageResolver } from './resolvers/auth-signup-page.resolver';

import { AuthSharedModule } from '../';
import { AuthService } from '../services/auth.service';

export const authSignupRoutes = [
  {
    path: '',
    component: AuthSignupPageComponent,
    resolve: {
      data: AuthSignupPageResolver
    },
  }
];

@NgModule({
  declarations: [
    AuthSignupPageComponent
  ],
  imports: [
    ModalModule.forRoot(),
    RouterModule.forChild(authSignupRoutes),
    AuthSharedModule
  ],
  providers: [
    AuthSignupPageResolver
  ]
})
export class AuthSignupModule { }
