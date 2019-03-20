import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from './../environments/environment';

import { rootRoutes } from './app.routes';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { RemoveSpacesPipe } from './custom-pipe/remove-spaces.pipe';
import { CacheMapService } from './cache-service/cache-map.service';
import { CachingInterceptor } from './http-interceptors/caching-interceptor';
import { LoggingInterceptor } from './http-interceptors/logging-interceptor';
import { httpInterceptorProviders } from './http-interceptors';
import { StoreProductsService } from './store/services/products.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    HttpClientModule,
    RouterModule.forRoot(rootRoutes, {
      // enableTracing :true, // For debugging
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabled',
      useHash: false
    }),
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    TransferHttpCacheModule
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: APP_BASE_HREF, useValue: `${environment.BASE_URL}` },
    StoreProductsService,
    httpInterceptorProviders,
    CacheMapService,
    { provide: Cache, useClass: CacheMapService },
  ]
})
export class AppModule {}
