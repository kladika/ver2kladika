import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthRecoverPasswordPageComponent } from './components/recover-password-page/auth-recover-password-page.component';
import { AuthRecoverPasswordPageResolver } from './resolvers/auth-recover-password-page.resolver';

import { AuthSharedModule } from '../';

export const authRecoverPasswordRoutes = [
  {
    path: '',
    component: AuthRecoverPasswordPageComponent,
    resolve: {
      data: AuthRecoverPasswordPageResolver
    }
  }
];

@NgModule({
  declarations: [
    AuthRecoverPasswordPageComponent
  ],
  imports: [
    RouterModule.forChild(authRecoverPasswordRoutes),
    AuthSharedModule
  ],
  providers: [
    AuthRecoverPasswordPageResolver
  ]
})
export class AuthRecoverPasswordModule { }
