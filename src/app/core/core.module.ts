import { NgModule } from '@angular/core';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

// Core components
import { Error404PageComponent } from './404/error-404-page.component';
import { FooterComponent } from './footer/footer.component';
import { SEODirective } from './seo/seo.directive';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

// Required modules
import { SharedModule } from '../shared';

import { AuthService } from '../auth/services/auth.service';
import { BreadcrumbsService } from '../shared/breadcrumbs/breadcrumbs.service';


@NgModule({
  declarations: [
    TopNavbarComponent,
    FooterComponent,
    Error404PageComponent,
    SEODirective
  ],
  imports: [
    SharedModule,
    CollapseModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ],
  providers: [
    AuthService,
    BreadcrumbsService
  ],
  exports: [
    TopNavbarComponent,
    FooterComponent,
    Error404PageComponent,
    SEODirective,
    // Re-exportable modules
    LoadingBarHttpClientModule,
    LoadingBarRouterModule
  ]
})
export class CoreModule { }
