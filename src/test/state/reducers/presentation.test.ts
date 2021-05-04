import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/presentation';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { PresentationAction } from '../../../state/actions/presentation';
import { dummyDeprecatedDemoPresentationDto, dummyDeprecatedDemoNoPresentationDto } from '../../mocks';

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
      payload: dummyDeprecatedDemoPresentationDto
    };

    const state = reducer(initialState, action);
    const expected = {
      sharedPresentation: dummyDeprecatedDemoPresentationDto,
      sharedNoPresentation: null,
      error: null
    };
    expect(state).toEqual(expected);
  });

  it(`handles actions with type ${PresentationActionType.NOPRESENTATION_SHARED_SUCCESS}`, () => {
    const action: PresentationAction = {
      type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
      payload: dummyDeprecatedDemoNoPresentationDto
    };

    const state = reducer(initialState, action);
    const expected = {
      sharedPresentation: null,
      sharedNoPresentation: dummyDeprecatedDemoNoPresentationDto,
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
      sharedPresentation: dummyDeprecatedDemoPresentationDto
    }, action);
    expect(state).toEqual(initialState);
  });
});
