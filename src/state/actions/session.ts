import { FeathersError } from '@feathersjs/errors';
import { DemoSession } from '@unumid/demo-types';

import { SessionActionType } from '../actionTypes/session';
import { ActionWithoutPayload, ActionWithPayload } from './base';

type CreateSessionAction = ActionWithoutPayload<SessionActionType.CREATE_SESSION>;

type CreateSessionSuccessAction = ActionWithPayload<SessionActionType.CREATE_SESSION_SUCCESS, DemoSession>;

type CreateSessionErrorAction = ActionWithPayload<SessionActionType.CREATE_SESSION_ERROR, FeathersError>;

export type SessionAction = CreateSessionAction | CreateSessionSuccessAction | CreateSessionErrorAction;
