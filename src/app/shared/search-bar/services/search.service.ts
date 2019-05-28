import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map, mergeMap } from 'rxjs/operators';

import { HttpServiceService } from '../../../http-service/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private router: Router,
              private http: HttpClient,
              private http_service: HttpServiceService) { }


  forgot_password(data): any {
    const newurl = `${this.http_service.apiURL}api/v1/users/forgot-password`;
    const httpOptions = { headers: this.http_service.headers };
    return this.http
      .post(newurl, data, httpOptions)
      .pipe(
        catchError(this.http_service.handleError())
      );
  }
}
