import { FeathersError } from '@feathersjs/errors';
import { DemoPresentationRequestDto } from '@unumid/demo-types';

import { PresentationRequestAction } from '../actions/presentationRequest';
import { PresentationRequestActionType } from '../actionTypes/presentationRequest';

export interface PresentationRequestState {
  isLoading: boolean;
  error: FeathersError | null;
  request: DemoPresentationRequestDto | null,
}

export const initialState: PresentationRequestState = {
  isLoading: false,
  error: null,
  request: null
};

const reducer = (
  state: PresentationRequestState = initialState,
  action: PresentationRequestAction
): PresentationRequestState => {
  switch (action.type) {
    case PresentationRequestActionType.CREATE_PRESENTATION_REQUEST:
      return { isLoading: true, error: null, request: null };
    case PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS:
      return { isLoading: false, error: null, request: action.payload };
    case PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR:
      return { isLoading: false, error: action.payload, request: null };
    default:
      return state;
  }
};

export default reducer;
