import { MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from '../reducers/hydration.reducers';

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];
