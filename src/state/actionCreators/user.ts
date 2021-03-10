import { Dispatch } from 'redux';
import { DemoUserCreateOptions } from '@unumid/demo-types';

import { issuerClient } from '../../feathers';
import { UserActionType } from '../actionTypes/user';
import { UserAction, ResetUserStateAction } from '../actions/user';
import { login } from './auth';
import { AuthAction } from '../actions/auth';

export const createUser = (options: DemoUserCreateOptions) => {
  return async (dispatch: Dispatch<UserAction | AuthAction>): Promise<void> => {
    dispatch({ type: UserActionType.CREATE_USER, payload: options });
    const service = issuerClient.service('user');
    try {
      const user = await service.create(options);
      dispatch({
        type: UserActionType.CREATE_USER_SUCCESS,
        payload: user
      });
      await login({ email: options.email, password: options.password })(dispatch);
    } catch (e) {
      dispatch({
        type: UserActionType.CREATE_USER_ERROR,
        payload: e
      });
    }
  };
};

export const resetUserState = (): ResetUserStateAction =>
  ({ type: UserActionType.RESET_USER_STATE });
