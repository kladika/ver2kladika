import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler,
    HttpRequest, HttpErrorResponse, HttpClient
} from '@angular/common/http';
import { throwError, Observable, BehaviorSubject, of, } from 'rxjs';
import { catchError, filter, take, switchMap, map, finalize, mergeMap } from 'rxjs/operators';

import { AuthService } from '../auth/services/auth.service';
import { HttpServiceService } from '../http-service/http-service.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    refreshTokenError = false;

    constructor(public http: HttpClient, public authService: AuthService, public apiServie: HttpServiceService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    // 401 errors are most likely going to be because we have an expired token that we need to refresh.
                    if (req.url.includes('/o/')) {
                        this.authService.logout().subscribe();
                        return throwError(error);
                    }
                    if (this.refreshTokenInProgress) {
                        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
                        // which means the new token is ready and we can retry the request again
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
                        this.refreshTokenSubject.next(null);
                        return this.refreshAccessToken().pipe(
                            switchMap((success: boolean) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                            // for the next time the token needs to be refreshed
                            finalize(() => this.refreshTokenInProgress = false)
                        );
                    }
                } else {
                    this.authService.logout().subscribe();
                    return throwError(error);
                }
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        const token = JSON.parse(localStorage.getItem('user_token'));
        const data = `grant_type=${'refresh_token'}&refresh_token=${token.refresh_token}&client_id=${this.authService.clientId}`;
        const newurl = `${this.apiServie.apiURL}/o/token/`;
        const httpOptions = { headers: this.authService.tokenHeaders };
        return this.http.post<any>(newurl, data, httpOptions).pipe(map(res => {
            console.log(res);
            localStorage.setItem('user_token', JSON.stringify(res));
        }),
            catchError(err => {
            this.refreshTokenError = true;
            this.authService.logout().subscribe();
            return throwError(err);
            }));
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        const token = JSON.parse(localStorage.getItem('user_token'));
        if (!token) {
            return request;
        }
        // If you are calling an outside domain then do not add the token.
        else if (request.url.includes('/o/')) {
            console.log('auth req');
            return request;
        } else if (token) {
            return request.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token.access_token
                }
            });
        } else {
            return request;
        }
        }
    }

// add this lines to module.ts providers

// {
//     provide: HTTP_INTERCEPTORS,
//         useClass: AuthInterceptor,
//             multi: true
// }
