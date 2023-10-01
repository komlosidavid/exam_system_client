import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthenticationResponse } from '../../interfaces/AuthenticationResponse';
import { authReducer } from '../reducers/auth.reducers';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      exhaustMap((action) =>
        this.authService
          .onHandleAuthentication(
            action.payload.username,
            action.payload.password
          )
          .pipe(
            map((loginSuccessResponse) =>
              AuthActions.loginSuccess({ loginSuccessResponse })
            ),
            catchError((error) => of(AuthActions.loginFailure({ error })))
          )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ loginSuccessResponse }) => {
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  // LogIn: Observable<any> = createEffect(() =>
  //   this.actions.pipe(
  //     ofType(AuthActionTypes.LOGIN),
  //     map((action: LogIn) => action.payload),
  //     switchMap((payload) => {
  //       return this.authService.onHandleAuthentication(payload).pipe(
  //         map((user) => {
  //           return new LogInSuccess({
  //             token: user.accessToken,
  //             username: payload.username,
  //           });
  //         }),
  //         catchError((error) => {
  //           return of(new LogInFailure({ error: error }));
  //         })
  //       );
  //     })
  //   )
  // );

  // LogInSuccess: Observable<any> = this.actions.pipe(
  //   ofType(AuthActionTypes.LOGIN_SUCCESS),
  //   tap((action) => {
  //     console.log(action);

  //     // localStorage.setItem('token', token);
  //     // this.router.navigateByUrl('/dashboard');
  //   })
  // );

  // LogInFailure: Observable<any> = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(AuthActionTypes.LOGIN_FAILURE)
  //     ) as Observable<any>
  // );

  // LogOut: Observable<any> = createEffect(
  //   () =>
  //     this.actions.pipe(
  //       ofType(AuthActionTypes.LOGOUT),
  //       tap((user) => {
  //         localStorage.removeItem('token');
  //       })
  //     ) as Observable<any>
  // );

  // TODO: Implement SignUp effect

  // TODO: Implement SignUpSuccess effect

  // TODO: Implement SignUpFailure effect
}
