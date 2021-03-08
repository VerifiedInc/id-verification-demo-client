import { Dispatch } from 'redux';
import { DemoUserCreateOptions } from '@unumid/demo-types';

import { verifierClient } from '../../feathers';
import { UserActionType } from '../actionTypes/user';
import { UserAction, ResetUserStateAction } from '../actions/user';

export const createUser = (options: DemoUserCreateOptions) => {
  return async (dispatch: Dispatch<UserAction>): Promise<void> => {
    dispatch({ type: UserActionType.CREATE_USER, payload: options });
    const service = verifierClient.service('user');
    try {
      const user = await service.create(options);
      dispatch({
        type: UserActionType.CREATE_USER_SUCCESS,
        payload: user
      });
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
