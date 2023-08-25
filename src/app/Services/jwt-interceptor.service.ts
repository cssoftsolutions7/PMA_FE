import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    var currentUser = { jwtToken: '' };
    var currentUserSession = sessionStorage.getItem('userData');
    if (currentUserSession != null) {
      currentUser = JSON.parse(currentUserSession);
    }
    //To Set Header Again!
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + currentUser.jwtToken,
      },
    });
    return next.handle(req);
  }
}