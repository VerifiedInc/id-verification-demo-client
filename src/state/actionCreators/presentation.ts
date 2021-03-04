import { FeathersError } from '@feathersjs/errors';
import { DemoPresentationDto, DemoNoPresentationDto } from '@unumid/demo-types';

import {
  PresentationSharedSuccessAction,
  NoPresentationSharedSuccessAction,
  PresentationSharedErrorAction,
  ResetPresentationStateAction
} from '../actions/presentation';
import { PresentationActionType } from '../actionTypes/presentation';

export const handlePresentationShared = (dto: DemoPresentationDto): PresentationSharedSuccessAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_SUCCESS, payload: dto });

export const handleNoPresentationShared = (dto: DemoNoPresentationDto): NoPresentationSharedSuccessAction =>
  ({ type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS, payload: dto });

export const handlePresentationSharedError = (err: FeathersError): PresentationSharedErrorAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_ERROR, payload: err });

export const resetPresentationState = (): ResetPresentationStateAction =>
  ({ type: PresentationActionType.RESET_PRESENTATION_STATE });
