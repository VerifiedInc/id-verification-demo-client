import { DemoUserCreateOptions, DemoUserWithoutPassword } from '@unumid/demo-types';

import { UserActionType } from '../actionTypes/user';
import { ActionWithoutPayload, ActionWithPayload, FeathersErrorAction } from './base';

type CreateUserAction = ActionWithPayload<UserActionType.CREATE_USER, DemoUserCreateOptions>;

type CreateUserSuccessAction = ActionWithPayload<UserActionType.CREATE_USER_SUCCESS, DemoUserWithoutPassword>;

type CreateUserErrorAction = FeathersErrorAction<UserActionType.CREATE_USER_ERROR>;

export type ResetUserStateAction = ActionWithoutPayload<UserActionType.RESET_USER_STATE>;

export type UserAction = CreateUserAction
  | CreateUserSuccessAction
  | CreateUserErrorAction
  | ResetUserStateAction;
