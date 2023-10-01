import { createAction, props } from '@ngrx/store';
import { State } from '../states/auth.state';

export const hydrate = createAction('[Hydration] Hydrate');

export const hydrateSuccess = createAction(
  '[Hydration] Hydrate Success',
  props<{ state: State }>()
);

export const hydrateFailure = createAction('[Hydration] Hydrate Failure');