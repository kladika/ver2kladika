import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { SharedModule } from '../../shared';
import { AuthSharedModule } from '../../auth';
import { StoreSharedModule } from '../';

import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductPageResolver } from './resolvers/product-page.resolver';

export const productRoutes = [
  {
    path: '',
    component: ProductPageComponent,
    resolve: {
      data: ProductPageResolver
    }
  }
];

@NgModule({
  declarations: [
    ProductPageComponent
  ],
  imports: [
    // Angular Modules
    RouterModule.forChild(productRoutes),
    CommonModule,
    // ngx Modules
    CarouselModule,
    ButtonsModule,
    ModalModule.forRoot(),
    // Our Modules
    SharedModule,
    AuthSharedModule,
    StoreSharedModule
  ],
  providers: [
    ProductPageResolver
  ]
})
export class StoreProductModule { }
