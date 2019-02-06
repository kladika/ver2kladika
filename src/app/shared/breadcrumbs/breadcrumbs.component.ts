// Inspired on: http://brianflove.com/2016/10/23/angular2-breadcrumb-using-router/

import { Component, ViewEncapsulation } from '@angular/core';

import { Observable } from 'rxjs';

import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  styleUrls: [ './styles/breadcrumbs.styles.scss' ],
  templateUrl: './breadcrumbs.component.html',
  encapsulation: ViewEncapsulation.None
})

export class BreadcrumbsComponent {
  breadcrumbsObservable: Observable<boolean>;

  constructor(private breadcrumbsService: BreadcrumbsService) {
    this.breadcrumbsObservable = breadcrumbsService.breadcrumbsObservable();
  }
}
