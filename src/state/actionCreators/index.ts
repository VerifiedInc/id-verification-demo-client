import { Dispatch } from 'redux';

import { resetSessionState } from './session';
import { resetPresentationState } from './presentation';
import { resetPresentationRequestState } from './presentationRequest';
import { resetUserState } from './user';
import { logout } from './auth';

export * from './session';
export * from './presentationRequest';
export * from './presentation';
export * from './user';
export * from './auth';

export const resetState = () => async (dispatch: Dispatch): Promise<void> => {
  dispatch(resetPresentationState());
  dispatch(resetPresentationRequestState());
  dispatch(resetSessionState());
  dispatch(resetUserState());
  await logout()(dispatch);
};
