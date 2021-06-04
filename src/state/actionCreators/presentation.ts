import { FeathersError } from '@feathersjs/errors';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated-v1';
import { Dispatch } from 'redux';

import {
  NoPresentationSharedSuccessAction,
  PresentationSharedErrorAction,
  ResetPresentationStateAction
} from '../actions/presentation';
import { PresentationActionType } from '../actionTypes/presentation';
import { login } from './auth';
import { DemoAcceptedPresentationDto, DemoDeclinedPresentationDto } from '../../types';

export const handleDeprecatedPresentationShared = (dto: DeprecatedDemoPresentationDto) => async (dispatch: Dispatch): Promise<void> => {
  const email = dto.presentation.verifiableCredentials[0].credentialSubject.userEmail;
  await login({ email, password: 'password' })(dispatch);
  dispatch({ type: PresentationActionType.PRESENTATION_SHARED_SUCCESS, payload: dto });
};

export const handleAcceptedPresentationShared = (dto: DemoAcceptedPresentationDto) => async (dispatch: Dispatch): Promise<void> => {
  const credentialSubjectString = dto.presentation.verifiableCredential[0].credentialSubject;
  const credentialSubject = JSON.parse(credentialSubjectString);
  const email = credentialSubject.userEmail;
  await login({ email, password: 'password' })(dispatch);
  dispatch({ type: PresentationActionType.PRESENTATION_SHARED_SUCCESS, payload: dto });
};

export const handleDeclinedPresentationShared = (dto: DemoDeclinedPresentationDto): NoPresentationSharedSuccessAction =>
  ({ type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS, payload: dto });

export const handleNoPresentationShared = (dto: DeprecatedDemoNoPresentationDto): NoPresentationSharedSuccessAction =>
  ({ type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS, payload: dto });

export const handlePresentationSharedError = (err: FeathersError): PresentationSharedErrorAction =>
  ({ type: PresentationActionType.PRESENTATION_SHARED_ERROR, payload: err });

export const resetPresentationState = (): ResetPresentationStateAction =>
  ({ type: PresentationActionType.RESET_PRESENTATION_STATE });
