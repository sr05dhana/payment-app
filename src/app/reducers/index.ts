import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromUsers from './users.reducer';

export interface State {
  userDetails: fromUsers.State;
}

export const reducers: ActionReducerMap<State,any> = {
  userDetails: fromUsers.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

