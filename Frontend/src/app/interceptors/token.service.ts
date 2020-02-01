import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { UserService } from '../services/user.service';
import { UtilsService } from '../services/utils.service';

const { Storage } = Plugins;

@Injectable({ providedIn: 'root' })
export class TokenService implements HttpInterceptor {

  constructor(private userSrv: UserService, private utilsSrv: UtilsService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(Storage.get({key: 'token'})).pipe(map(token => token.value)).pipe(switchMap(token => {
      if (token){
        const headers = new HttpHeaders({'x-token': token });
        const cloneRequest = req.clone({ headers });
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler.bind(this)));
      } else {
        const cloneRequest = req.clone();
        return next.handle(cloneRequest).pipe(catchError(this.errorHandler.bind(this)));
      }
    }));
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.userSrv.logout();
      this.utilsSrv.createToast('Sesión terminada, vuelve a ingresar');
    }
    return throwError(error);
  }
}