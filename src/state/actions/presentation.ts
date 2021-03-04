import { DemoPresentationDto, DemoNoPresentationDto } from '@unumid/demo-types';

import { PresentationActionType } from '../actionTypes/presentation';
import { ActionWithoutPayload, ActionWithPayload, FeathersErrorAction } from './base';

export type PresentationSharedSuccessAction = ActionWithPayload<
  PresentationActionType.PRESENTATION_SHARED_SUCCESS,
  DemoPresentationDto
>;

export type NoPresentationSharedSuccessAction = ActionWithPayload<
  PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
  DemoNoPresentationDto
>;

export type PresentationSharedErrorAction = FeathersErrorAction<PresentationActionType.PRESENTATION_SHARED_ERROR>;

export type ResetPresentationStateAction = ActionWithoutPayload<PresentationActionType.RESET_PRESENTATION_STATE>;

export type PresentationAction = PresentationSharedSuccessAction
  | NoPresentationSharedSuccessAction
  | PresentationSharedErrorAction
  | ResetPresentationStateAction;
