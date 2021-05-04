import { FeathersError } from '@feathersjs/errors';
import { DemoPresentationDto } from '@unumid/demo-types';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated';

import { PresentationAction } from '../actions/presentation';
import { PresentationActionType } from '../actionTypes/presentation';

export interface PresentationState {
  sharedPresentation: DeprecatedDemoPresentationDto | DemoPresentationDto | null;
  sharedNoPresentation: DeprecatedDemoNoPresentationDto | DemoPresentationDto | null;
  error: FeathersError | null;
}

export const initialState:PresentationState = {
  sharedPresentation: null,
  sharedNoPresentation: null,
  error: null
};

const reducer = (
  state: PresentationState = initialState,
  action: PresentationAction
): PresentationState => {
  switch (action.type) {
    case PresentationActionType.PRESENTATION_SHARED_SUCCESS:
      return { sharedPresentation: action.payload, sharedNoPresentation: null, error: null };
    case PresentationActionType.NOPRESENTATION_SHARED_SUCCESS:
      return { sharedPresentation: null, sharedNoPresentation: action.payload, error: null };
    case PresentationActionType.PRESENTATION_SHARED_ERROR:
      return { sharedPresentation: null, sharedNoPresentation: null, error: action.payload };
    case PresentationActionType.RESET_PRESENTATION_STATE:
      return initialState;
    default: return state;
  }
};

export default reducer;
