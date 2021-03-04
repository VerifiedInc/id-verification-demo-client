import { Dispatch } from 'redux';

import { client } from '../../feathers';
import { SessionActionType } from '../actionTypes/session';
import { SessionAction, ResetSessionStateAction } from '../actions/session';

export const createSession = () => {
  return async (dispatch: Dispatch<SessionAction>) => {
    dispatch({ type: SessionActionType.CREATE_SESSION });

    const service = client.service('session');
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
