import { Component, ViewEncapsulation, AfterContentInit, ContentChild } from '@angular/core';
import { CarouselComponent } from 'ngx-bootstrap/carousel';

@Component({
  selector: 'app-stylish-carousel',
  templateUrl: './stylish-carousel.component.html',
  styleUrls: [
    './styles/stylish-carousel.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class StylishCarouselComponent implements AfterContentInit {
  @ContentChild(CarouselComponent) carousel: CarouselComponent;

  constructor() {}

  ngAfterContentInit() {
    // ContentChild is set
  }
}
