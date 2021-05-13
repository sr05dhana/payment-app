import {
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { userDetails } from '../model/user-details.model';
import * as collection from '../actions/users.actions';


export interface State {
    loaded: boolean;
    loading: boolean;
    userDetails: userDetails[],
}

const initialState: State = {
    loaded: false,
    loading: false,
    userDetails: [],
}

export function reducer(
    state = initialState,
    action: collection.Actions
): State {
    switch (action.type) {
        case collection.ADD_USER: {
            const user = action.payload;
            return { ...state, loaded: true, loading: false, userDetails: [...state.userDetails, user] };
        }

        case collection.ADD_USER_SUCCESS:

        case collection.ADD_USER_FAIL:
            return { ...state, loading: false, loaded: false };

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getUsers = (state: State) => state.userDetails;
