import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      });

      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
