import { FeathersError } from '@feathersjs/errors';
import { DemoPresentationRequestDto } from '@unumid/demo-types';

import { PresentationRequestActionType } from '../actionTypes/presentationRequest';
import { ActionWithoutPayload, ActionWithPayload } from './base';

type CreatePresentationRequestAction = ActionWithoutPayload<PresentationRequestActionType.CREATE_PRESENTATION_REQUEST>;

type CreatePresentationRequestSuccessAction = ActionWithPayload<
  PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS,
  DemoPresentationRequestDto
>;

type CreatePresentationRequestErrorAction = ActionWithPayload<
  PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR,
  FeathersError
>;

export type PresentationRequestAction = CreatePresentationRequestAction
  | CreatePresentationRequestSuccessAction
  | CreatePresentationRequestErrorAction;
