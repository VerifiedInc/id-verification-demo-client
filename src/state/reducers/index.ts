import { combineReducers } from 'redux';

import sessionReducer from './session';

const reducers = combineReducers({
  session: sessionReducer
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
