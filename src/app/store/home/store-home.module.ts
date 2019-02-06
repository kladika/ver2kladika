import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { SharedModule } from '../../shared';
import { StoreSharedModule } from '../';

import { HomeStorefrontPageComponent } from './components/storefront-page/storefront-page.component';
import { HomeStorefrontPageResolver } from './resolvers/storefront-page.resolver';

export const homeRoutes = [
  {
    path: '',
    component: HomeStorefrontPageComponent,
    resolve: {
      data: HomeStorefrontPageResolver
    }
  }
];

@NgModule({
  declarations: [
    HomeStorefrontPageComponent
  ],
  imports: [
    RouterModule.forChild(homeRoutes),
    CarouselModule,
    CommonModule,
    SharedModule,
    StoreSharedModule
  ],
  providers: [
    HomeStorefrontPageResolver
  ]
})
export class StoreHomeModule { }
