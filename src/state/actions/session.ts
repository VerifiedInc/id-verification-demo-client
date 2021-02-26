import { FeathersError } from '@feathersjs/errors';
import { DemoSession } from '@unumid/demo-types';

import { SessionActionType } from '../actionTypes/session';

interface CreateSessionAction {
  type: SessionActionType.CREATE_SESSION;
}

interface CreateSessionSuccessAction {
  type: SessionActionType.CREATE_SESSION_SUCCESS;
  payload: DemoSession;
}

interface CreateSessionErrorAction {
  type: SessionActionType.CREATE_SESSION_ERROR;
  payload: FeathersError;
}

export type SessionAction = CreateSessionAction | CreateSessionSuccessAction | CreateSessionErrorAction;
