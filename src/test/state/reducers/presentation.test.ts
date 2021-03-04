import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/presentation';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { PresentationAction } from '../../../state/actions/presentation';
import { dummyDemoPresentationDto, dummyDemoNoPresentationDto } from '../../mocks';

describe('presentationReducer', () => {
  it('sets an initial state', () => {
    const action = { type: 'dargle' } as unknown as PresentationAction;
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('handles unrecognized actions', () => {
    const action = { type: 'dargle' } as unknown as PresentationAction;
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it(`handles actions with type ${PresentationActionType.PRESENTATION_SHARED_SUCCESS}`, () => {
    const action: PresentationAction = {
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoPresentationDto
    };

    const state = reducer(initialState, action);
    const expected = {
      sharedPresentation: dummyDemoPresentationDto,
      sharedNoPresentation: null,
      error: null
    };
    expect(state).toEqual(expected);
  });

  it(`handles actions with type ${PresentationActionType.NOPRESENTATION_SHARED_SUCCESS}`, () => {
    const action: PresentationAction = {
      type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoNoPresentationDto
    };

    const state = reducer(initialState, action);
    const expected = {
      sharedPresentation: null,
      sharedNoPresentation: dummyDemoNoPresentationDto,
      error: null
    };
    expect(state).toEqual(expected);
  });

  it(`handles actions with type ${PresentationActionType.PRESENTATION_SHARED_ERROR}`, () => {
    const err = new GeneralError('error sharing presentation');
    const action: PresentationAction = {
      type: PresentationActionType.PRESENTATION_SHARED_ERROR,
      payload: err
    };

    const state = reducer(initialState, action);
    const expected = {
      sharedPresentation: null,
      sharedNoPresentation: null,
      error: err
    };
    expect(state).toEqual(expected);
  });

  it(`handles actions with type ${PresentationActionType.RESET_PRESENTATION_STATE}`, () => {
    const action: PresentationAction = {
      type: PresentationActionType.RESET_PRESENTATION_STATE
    };

    const state = reducer({
      ...initialState,
      sharedPresentation: dummyDemoPresentationDto
    }, action);
    expect(state).toEqual(initialState);
  });
});
