import { Component, Inject, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './styles/app.scss' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if ((isPlatformServer(this.platformId)) || (!(evt instanceof NavigationEnd))) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
