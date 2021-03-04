import { DemoPresentationRequestDto } from '@unumid/demo-types';

import { PresentationRequestActionType } from '../actionTypes/presentationRequest';
import { ActionWithoutPayload, ActionWithPayload, FeathersErrorAction } from './base';

type CreatePresentationRequestAction = ActionWithoutPayload<PresentationRequestActionType.CREATE_PRESENTATION_REQUEST>;

type CreatePresentationRequestSuccessAction = ActionWithPayload<
  PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS,
  DemoPresentationRequestDto
>;

type CreatePresentationRequestErrorAction = FeathersErrorAction<
PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR
>;

export type ResetPresentationRequestStateAction = ActionWithoutPayload<PresentationRequestActionType.RESET_PRESENTATION_REQUEST_STATE>;

export type PresentationRequestAction = CreatePresentationRequestAction
  | CreatePresentationRequestSuccessAction
  | CreatePresentationRequestErrorAction
  | ResetPresentationRequestStateAction;
