import { Dispatch } from 'redux';

import { issuerClient } from '../../feathers';
import { AuthActionType } from '../actionTypes/auth';
import { AuthAction, LogoutAction } from '../actions/auth';
import { DemoUserAuthenticationResult } from '../../types';

export const login = (options: { email: string, password: string }) => {
  return async (dispatch: Dispatch<AuthAction>): Promise<void> => {
    dispatch({ type: AuthActionType.LOCAL_STRATEGY });
    try {
      const result = await issuerClient.authenticate({ strategy: 'local', ...options });
      dispatch({
        type: AuthActionType.LOCAL_STRATEGY_SUCCESS,
        payload: result as DemoUserAuthenticationResult
      });
    } catch (e) {
      dispatch({
        type: AuthActionType.LOCAL_STRATEGY_ERROR,
        payload: e
      });
    }
  };
};

export const logout = () => async (dispatch: Dispatch<LogoutAction>): Promise<void> => {
  await issuerClient.logout();
  dispatch({ type: AuthActionType.LOG_OUT });
};
