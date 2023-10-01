import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  selectAccessToken,
  selectRefreshToken,
} from './store/reducers/auth.reducers';
import { Store, select } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from './auth/auth.service';
import * as AuthActions from './store/actions/auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  accessToken!: string | null;
  refreshToken!: string | null;

  constructor(private store: Store, private authService: AuthService) {
    this.store.pipe(select(selectAccessToken)).subscribe((token) => {
      this.accessToken = token;
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.accessToken) {
      const clonedRequest = this.addTokenToHeader(request, this.accessToken);

      return next.handle(clonedRequest).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 403) {
            return this.handle403Error(clonedRequest, next);
          }

          return throwError(error);
        })
      );
    }

    return next.handle(request);
  }

  private addTokenToHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + token,
      },
    });
    return clonedRequest;
  }

  private handle403Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshTokenSubject.value) {
      this.store
        .pipe(
          select(selectRefreshToken),
          filter((token) => !!token),
          take(1)
        )
        .subscribe((token) => {
          this.refreshTokenSubject.next(token);
        });
      return this.authService
        .refreshAccessToken(this.refreshTokenSubject.value)
        .pipe(
          switchMap((token) => {
            this.accessToken = token.accessToken;
            this.store.dispatch(
              AuthActions.refreshTokenRequest({ token: token.accessToken })
            );
            this.refreshTokenSubject.next(null);
            const clonedRequest = this.addTokenToHeader(
              request,
              token.accessToken
            );
            return next.handle(clonedRequest);
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => !!token),
        take(1),
        switchMap((token) => {
          const clonedRequest = this.addTokenToHeader(request, token);
          return next.handle(clonedRequest);
        })
      );
    }
  }
}
