import { Dispatch } from 'redux';
import { DemoPresentationRequestOptions } from '@unumid/demo-types';

import { client } from '../../feathers';
import { PresentationRequestActionType } from '../actionTypes/presentationRequest';
import { ResetPresentationRequestStateAction } from '../actions/presentationRequest';

export const createPresentationRequest = (options: DemoPresentationRequestOptions) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST });

    const service = client.service('presentationRequest');
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
