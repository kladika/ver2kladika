import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared';

import { ProductsListingComponent } from './listing/components/products-listing/products-listing.component';

import { StoreBannersService } from './services/banners.service';
import { StoreProductsService } from './services/products.service';
import { RemoveSpacesPipe } from '../custom-pipe/remove-spaces.pipe';

@NgModule({
  declarations: [
    RemoveSpacesPipe,
    ProductsListingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    StoreBannersService,
    StoreProductsService
  ],
  exports: [
    ProductsListingComponent
  ]
})
export class StoreSharedModule { }
