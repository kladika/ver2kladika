import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth/services/auth.service';

@Component({
  selector: 'app-user-account-page',
  templateUrl: './user-account-page.component.html',
  styleUrls: [
    './styles/user-account-page.styles.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountPageComponent implements OnInit {
  user: any = {};

  constructor(private route: ActivatedRoute,
              private authService: AuthService) {
  }


  ngOnInit() {
    this.getprofile();
  }

  getprofile() {
    const profile = JSON.parse(localStorage.getItem('user_profile'));
    if (profile) {
      this.user = profile;
    } else {
      this.authService.get_profile()
        .subscribe(res => {
          this.user = res;
        },
        error => {
          console.log(error);
        }
        );
      }
    }
}
