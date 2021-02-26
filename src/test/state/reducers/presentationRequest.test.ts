import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/presentationRequest';
import { PresentationRequestActionType } from '../../../state/actionTypes/presentationRequest';
import { PresentationRequestAction } from '../../../state/actions/presentationRequest';
import { dummyDemoPresentationRequestoDto } from '../../mocks';

describe('presentationRequest reducer', () => {
  it('sets an initial state', () => {
    const action = { type: 'dargle' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it(`handles actions with type ${PresentationRequestActionType.CREATE_PRESENTATION_REQUEST}`, () => {
    const action: PresentationRequestAction = {
      type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ isLoading: true, request: null, error: null });
  });

  it(`handles actions with type ${PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS}`, () => {
    const action: PresentationRequestAction = {
      type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS,
      payload: dummyDemoPresentationRequestoDto
    };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({ isLoading: false, error: null, request: dummyDemoPresentationRequestoDto });
  });

  it(`handles actions with type ${PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR}`, () => {
    const err = new GeneralError('error creating presentationRequest');
    const action: PresentationRequestAction = {
      type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_ERROR,
      payload: err
    };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({ isLoading: false, error: err, request: null });
  });

  it('handles unrecognized actions', () => {
    const action = { type: 'dargle', payload: 'bargle' };
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
