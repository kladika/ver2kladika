// Inspired on: http://brianflove.com/2016/10/23/angular2-breadcrumb-using-router/

import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, switchMap } from 'rxjs/operators';

import { BreadcrumbsService } from './breadcrumbs.service';

@Directive({
  selector: '[appBreadcrumbs]'
})

export class BreadcrumbsDirective implements OnInit, OnDestroy {
  _routerSubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private breadcrumbsService: BreadcrumbsService
  ) {}

  ngOnInit(): void {
    this._routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) { route = route.firstChild; }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe((event) => {
        if (event['data'] && event['data'].breadcrumbs) {
          this.breadcrumbsService.setBreadcrumbs(event['data'].breadcrumbs);
        } else {
          // Empty breadcrumbs
          this.breadcrumbsService.setBreadcrumbs([]);
        }
      });
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }
}
