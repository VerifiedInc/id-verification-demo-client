import { FeathersError } from '@feathersjs/errors';
import { DemoUserCreateOptions, DemoUser } from '@unumid/demo-types';

import { UserAction } from '../actions/user';
import { UserActionType } from '../actionTypes/user';

export interface UserState {
  isLoading: boolean;
  error: FeathersError | null;
  userOptions: DemoUserCreateOptions | null;
  createdUser: DemoUser | null;
}

export const initialState: UserState = {
  isLoading: false,
  error: null,
  userOptions: null,
  createdUser: null
};

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case UserActionType.CREATE_USER:
      return {
        isLoading: true,
        userOptions: action.payload,
        error: null,
        createdUser: null
      };
    case UserActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        createdUser: action.payload
      };
    case UserActionType.CREATE_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        createdUser: null
      };
    case UserActionType.RESET_USER_STATE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
