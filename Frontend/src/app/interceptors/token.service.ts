import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TokenService implements HttpInterceptor {

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVkOTQxNmYxY2VlODY2MTljMDVjZjUzNSIsIm5vbWJyZSI6IkxhdXJhIEdhbGxlZ28iLCJlbWFpbCI6ImwuZ2FsbGVnb0BnbWFpbC5jb20iLCJhdmF0YXIiOiJhdjIucG5nIn0sImlhdCI6MTU3NjcyMzQ5OCwiZXhwIjoxNTc2ODA5ODk4fQ.oWdm0D-p49tzsTDTsqcBqOubXRToIq0IVSbdsngeOjY';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({'x-token': this.token });
    const cloneRequest = req.clone({ headers });
    return next.handle(cloneRequest).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}