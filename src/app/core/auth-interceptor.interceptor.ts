import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newHearder=new HttpHeaders({
      Authorization: `Basic ${btoa(`'test':${'venie3gm5k6zn62b5d7j3b2p2d4i4zhbtjfhqumvugu3h4oqpbbq'}`)}`,
     "Content-Type":"application/json"
    })
    let requestWithHeader=request.clone({headers:newHearder})
    return next.handle(requestWithHeader);
  }
}
