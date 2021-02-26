import { combineReducers } from 'redux';

import sessionReducer from './session';
import presentationRequestReducer from './presentationRequest';

const reducers = combineReducers({
  session: sessionReducer,
  presentationRequest: presentationRequestReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
