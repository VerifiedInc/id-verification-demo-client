import { ActionWithoutPayload, ActionWithPayload, FeathersErrorAction } from './base';
import { AuthActionType } from '../actionTypes/auth';
import { DemoUserAuthenticationResult } from '../../types';

export type LocalStrategyAction = ActionWithoutPayload<AuthActionType.LOCAL_STRATEGY>;

export type LocalStrategySuccessAction = ActionWithPayload<
  AuthActionType.LOCAL_STRATEGY_SUCCESS,
  DemoUserAuthenticationResult
>;

export type LocalStrategyErrorAction = FeathersErrorAction<AuthActionType.LOCAL_STRATEGY_ERROR>;

export type LogoutAction = ActionWithoutPayload<AuthActionType.LOG_OUT>;

export type AuthAction = LocalStrategyAction
  | LocalStrategySuccessAction
  | LocalStrategyErrorAction
  | LogoutAction;
