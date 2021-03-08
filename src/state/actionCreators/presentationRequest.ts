import { Dispatch } from 'redux';
import { DemoPresentationRequestCreateOptions } from '@unumid/demo-types';

import { verifierClient } from '../../feathers';
import { PresentationRequestActionType } from '../actionTypes/presentationRequest';
import { ResetPresentationRequestStateAction } from '../actions/presentationRequest';

export const createPresentationRequest = (options: DemoPresentationRequestCreateOptions) => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch({ type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST });

    const service = verifierClient.service('presentationRequest');
    try {
      const response = await service.create(options);
      dispatch({
        type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS,
        payload: response
      });
    } catch (e) {
      dispatch({
        type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR,
        payload: e
      });
    }
  };
};

export const resetPresentationRequestState = (): ResetPresentationRequestStateAction =>
  ({ type: PresentationRequestActionType.RESET_PRESENTATION_REQUEST_STATE });
