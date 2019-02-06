import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: [
    './styles/user-account-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountPageComponent {
  user: any = {};

  constructor(private route: ActivatedRoute) {
    this.user = route.snapshot.data['data'].userData;
  }
}
