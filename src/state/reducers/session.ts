import { FeathersError } from '@feathersjs/errors';
import { DemoSession } from '@unumid/demo-types';

import { Action } from '../actions/base';
import { SessionActionType } from '../actionTypes/session';

export interface SessionState {
  isLoading: boolean;
  error: FeathersError | null;
  session: DemoSession | null;
}

export const initialState: SessionState = {
  isLoading: false,
  error: null,
  session: null
};

const reducer = (
  state: SessionState = initialState,
  action: Action
) => {
  switch (action.type) {
    case SessionActionType.CREATE_SESSION:
      return { isLoading: true, error: null, session: null };
    case SessionActionType.CREATE_SESSION_SUCCESS:
      return { isLoading: false, error: null, session: action.payload };
    case SessionActionType.CREATE_SESSION_ERROR:
      return { isLoading: false, error: action.payload, session: null };
    default:
      return state;
  }
};

export default reducer;
