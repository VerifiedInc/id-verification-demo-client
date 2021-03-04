import { DemoSession } from '@unumid/demo-types';

import { SessionActionType } from '../actionTypes/session';
import { ActionWithoutPayload, ActionWithPayload, FeathersErrorAction } from './base';

type CreateSessionAction = ActionWithoutPayload<SessionActionType.CREATE_SESSION>;

type CreateSessionSuccessAction = ActionWithPayload<SessionActionType.CREATE_SESSION_SUCCESS, DemoSession>;

type CreateSessionErrorAction = FeathersErrorAction<SessionActionType.CREATE_SESSION_ERROR>;

export type ResetSessionStateAction = ActionWithoutPayload<SessionActionType.RESET_SESSION_STATE>;

export type SessionAction = CreateSessionAction
  | CreateSessionSuccessAction
  | CreateSessionErrorAction
  | ResetSessionStateAction;
