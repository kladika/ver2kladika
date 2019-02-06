import { Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { filter, map, switchMap, distinct } from 'rxjs/operators';

@Directive({
  selector: '[appSeo]'
})

export class SEODirective implements OnInit, OnDestroy {
  _routerSubscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title
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
        switchMap(route => route.data),
        distinct()
      )
      .subscribe(event => {
        if (event['data'] && event['data'].seo) {
          const seo_data = event['data'].seo;

          // If there is no SEO data set default values
          const title = seo_data.title ? seo_data.title : 'Default Title';
          const description = seo_data.description ? seo_data.description : 'Default Description';
          const keywords = seo_data.keywords ? seo_data.keywords : 'Default Keywords';
          // While in development mode keep robots with noindex to prevent Google from indexing a work in progress site
          const robots = seo_data.robots ? seo_data.robots : 'noindex, nofollow, noimageindex';

          this.title.setTitle(title);

          this.meta.updateTag({ name: 'description', content: description }, 'name=\'description\'');
          this.meta.updateTag({ name: 'keywords', content: keywords }, 'name=\'keywords\'');
          this.meta.updateTag({ name: 'robots', content: robots }, 'name=\'robots\'');

          // You can add more meta tags here for example social metas:
          // If you want to use this tags, you need to define them in the index.html file such as:
          // <meta name="twitter:title" content="">


          // Twitter
          // this.meta.updateTag({ name: 'twitter:title', content: title }, 'name=\'twitter:title\'');
          // this.meta.updateTag({ name: 'twitter:description', content: description }, 'name=\'twitter:description\'');
          // this.meta.updateTag({ name: 'twitter:image', content: tw_image_url }, 'name=\'twitter:image\'');

          // Facebook
          // this.meta.updateTag({ property: 'og:title', content: title }, 'property=\'og:title\'');
          // this.meta.updateTag({ property: 'og:description', content: description }, 'property=\'og:description\'');
          // this.meta.updateTag({ property: 'og:image', content: fb_image_url }, 'property=\'og:image\'');

          // Schema
          // this.meta.updateTag({ name: 'DC.title', content: title }, 'name=\'DC.title\'');
          // this.meta.updateTag({ name: 'DC.description', content: description }, 'name=\'DC.description\'');

        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this._routerSubscription) {
      this._routerSubscription.unsubscribe();
    }
  }
}
