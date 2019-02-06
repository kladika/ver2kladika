import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SharedModule } from '../../shared';
import { StoreSharedModule } from '../';

import { ProductsListingPageComponent } from './components/products-listing-page/products-listing-page.component';
import { ProductsListingPageResolver } from './resolvers/products-listing-page.resolver';

export const storeListingRoutes = [
  {
    path: '',
    component: ProductsListingPageComponent,
    resolve: {
      data: ProductsListingPageResolver
    }
  },
  {
    path: 'category/:slug',
    component: ProductsListingPageComponent,
    resolve: {
      data: ProductsListingPageResolver
    }
  },
  {
    path: 'tag/:slug',
    component: ProductsListingPageComponent,
    resolve: {
      data: ProductsListingPageResolver
    }
  }
];

@NgModule({
  declarations: [
    ProductsListingPageComponent
  ],
  imports: [
    RouterModule.forChild(storeListingRoutes),
    CommonModule,
    SharedModule,
    StoreSharedModule,
    BsDropdownModule.forRoot(),
    ButtonsModule
  ],
  providers: [
    ProductsListingPageResolver
  ]
})
export class StoreListingModule { }
