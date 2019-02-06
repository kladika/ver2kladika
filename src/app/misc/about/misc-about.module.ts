import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutPageComponent } from './components/about-page/about-page.component';
import { AboutPageResolver } from './resolvers/about-page.resolver';

export const miscAboutRoutes = [
  {
    path: '',
    component: AboutPageComponent,
    resolve: {
      data: AboutPageResolver
    }
  }
];

@NgModule({
  declarations: [
    AboutPageComponent
  ],
  imports: [
    RouterModule.forChild(miscAboutRoutes),
    CommonModule
  ],
  providers: [
    AboutPageResolver
  ]
})
export class MiscAboutModule { }
