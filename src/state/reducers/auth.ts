import { FeathersError } from '@feathersjs/errors';
import { DemoUser } from '@unumid/demo-types';

import { AuthActionType } from '../actionTypes/auth';
import { AuthAction } from '../actions/auth';

interface AuthState {
  isLoading: boolean;
  loggedInUser: DemoUser | null;
  error: FeathersError | null;
}

export const initialState: AuthState = {
  isLoading: false,
  loggedInUser: null,
  error: null
};

const reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionType.LOCAL_STRATEGY:
      return { isLoading: true, loggedInUser: null, error: null };
    case AuthActionType.LOCAL_STRATEGY_SUCCESS:
      return { isLoading: false, loggedInUser: action.payload.user, error: null };
    case AuthActionType.LOCAL_STRATEGY_ERROR:
      return { isLoading: false, loggedInUser: null, error: action.payload };
    case AuthActionType.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
