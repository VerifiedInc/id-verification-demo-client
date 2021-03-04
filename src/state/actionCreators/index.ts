import { Dispatch } from 'redux';

import { resetSessionState } from './session';
import { resetPresentationState } from './presentation';
import { resetPresentationRequestState } from './presentationRequest';

export * from './session';
export * from './presentationRequest';
export * from './presentation';

export const resetState = () => (dispatch: Dispatch): void => {
  dispatch(resetPresentationState());
  dispatch(resetPresentationRequestState());
  dispatch(resetSessionState());
};
