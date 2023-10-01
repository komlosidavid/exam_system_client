import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import * as HydrationActions from '../actions/hydration.actions';
import { State } from '../states/auth.state';

@Injectable()
export class HydrationEffects implements OnInitEffects {
  hydrate$ = createEffect(() =>
    this.action$.pipe(
      ofType(HydrationActions.hydrateSuccess),
      map(() => {
        const storageValue = localStorage.getItem('state');
        if (storageValue) {
          try {
            const state = JSON.parse(storageValue);
            return HydrationActions.hydrateSuccess({ state });
          } catch {
            localStorage.removeItem('state');
          }
        }
        return HydrationActions.hydrateFailure();
      })
    )
  );

  serialize$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(
          HydrationActions.hydrateSuccess,
          HydrationActions.hydrateFailure
        ),
        switchMap(() => this.store),
        distinctUntilChanged(),
        tap((state) => localStorage.setItem('state', JSON.stringify(state)))
      ),
    { dispatch: false }
  );

  constructor(private action$: Actions, private store: Store<State>) {}

  ngrxOnInitEffects(): Action {
    return HydrationActions.hydrate();
  }
}
