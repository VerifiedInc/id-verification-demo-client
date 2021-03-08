import { Dispatch } from 'redux';

import { verifierClient } from '../../feathers';
import { SessionActionType } from '../actionTypes/session';
import { SessionAction, ResetSessionStateAction } from '../actions/session';

export const createSession = () => {
  return async (dispatch: Dispatch<SessionAction>): Promise<void> => {
    dispatch({ type: SessionActionType.CREATE_SESSION });

    const service = verifierClient.service('session');
    try {
      const session = await service.create({});
      dispatch({
        type: SessionActionType.CREATE_SESSION_SUCCESS,
        payload: session
      });
    } catch (e) {
      dispatch({
        type: SessionActionType.CREATE_SESSION_ERROR,
        payload: e
      });
    }
  };
};

export const resetSessionState = (): ResetSessionStateAction =>
  ({ type: SessionActionType.RESET_SESSION_STATE });
