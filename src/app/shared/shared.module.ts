import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CarouselModule } from 'ngx-bootstrap/carousel';

import { BackgroundImageComponent } from './background-image/background-image.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { BreadcrumbsDirective } from './breadcrumbs/breadcrumbs.directive';
import { ColorRadioButtonDirective } from './color-radio-button/color-radio-button.directive';
import { FillContainerComponent } from './fill-container/fill-container.component';
import { PercentageBarRatingComponent } from './percentage-bar-rating/percentage-bar-rating.component';
import { PreloadImageComponent } from './preload-image/preload-image.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { StylishCarouselComponent } from './stylish-carousel/stylish-carousel.component';

@NgModule({
  declarations: [
    // Shared components
    BackgroundImageComponent,
    BreadcrumbsComponent,
    BreadcrumbsDirective,
    ColorRadioButtonDirective,
    FillContainerComponent,
    PercentageBarRatingComponent,
    PreloadImageComponent,
    SearchBarComponent,
    StarRatingComponent,
    StylishCarouselComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CarouselModule.forRoot()
  ],
  exports: [
    // Shared components
    BackgroundImageComponent,
    BreadcrumbsComponent,
    BreadcrumbsDirective,
    ColorRadioButtonDirective,
    FillContainerComponent,
    PercentageBarRatingComponent,
    PreloadImageComponent,
    SearchBarComponent,
    StarRatingComponent,
    StylishCarouselComponent,
    // Re-export these modules to prevent repeated imports (see: https://angular.io/guide/ngmodule#re-exporting-other-modules)
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
