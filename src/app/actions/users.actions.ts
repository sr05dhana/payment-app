import { Action } from '@ngrx/store';
import { userDetails } from '../model/user-details.model';

export const ADD_USER = '[Users] Add User';
export const ADD_USER_SUCCESS = '[Users] Add User Success';
export const ADD_USER_FAIL = '[Users] Add User Fail';

export class AddUserAction implements Action {
  readonly type = ADD_USER;

  constructor(public payload: userDetails) {}
}

export class AddUserSuccessAction implements Action {
  readonly type = ADD_USER_SUCCESS;

  constructor(public payload: userDetails) {}
}

export class AddUserFailAction implements Action {
  readonly type = ADD_USER_FAIL;

  constructor(public payload: userDetails) {}
}

export type Actions =
  | AddUserAction
  | AddUserSuccessAction
  | AddUserFailAction
