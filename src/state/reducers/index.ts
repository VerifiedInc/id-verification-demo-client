import { combineReducers } from 'redux';

import sessionReducer, { initialState as sessionIntialState } from './session';
import presentationRequestReducer, { initialState as prInitialState } from './presentationRequest';
import presentationReducer, { initialState as presentationInitialState } from './presentation';
import userReducer, { initialState as userInitialState } from './user';
import authReducer, { initialState as authInitialState } from './auth';

const reducers = combineReducers({
  session: sessionReducer,
  presentationRequest: presentationRequestReducer,
  presentation: presentationReducer,
  user: userReducer,
  auth: authReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;

export const initialState: RootState = {
  session: sessionIntialState,
  presentationRequest: prInitialState,
  presentation: presentationInitialState,
  user: userInitialState,
  auth: authInitialState
};
