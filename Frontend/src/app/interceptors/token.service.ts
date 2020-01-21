import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class TokenService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Storage.get({key: 'token'})).pipe(map(token => token.value)).pipe(switchMap(token => {
      if (token){
        const headers = new HttpHeaders({'x-token': token });
        const cloneRequest = req.clone({ headers });
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler));
      } else {
        const cloneRequest = req.clone();
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler));
      }
    }));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}