import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, switchMap, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from './state/auth.reducer';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store<AuthState>) {}

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

    // return this.store.select(selectAccessToken).pipe(
    //   take(1),
    //   switchMap((accessToken) => {
    //     if (accessToken) {
    //       const clonedRequest = request.clone({
    //         setHeaders: {
    //           Authorization: 'Bearer ' + accessToken,
    //         },
    //       });
    //       return next.handle(clonedRequest);
    //     } else {
    //       return next.handle(request);
    //     }
    //   })
    // );
  }
}
