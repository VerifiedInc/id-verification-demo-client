import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/session';
import { SessionActionType } from '../../../state/actionTypes/session';
import { SessionAction } from '../../../state/actions/session';
import { dummySession } from '../../mocks';

describe('session reducer', () => {
  it('sets the initial state by default', () => {
    const action = { type: 'dargle' };
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it(`handles actions with type ${SessionActionType.CREATE_SESSION}`, () => {
    const action: SessionAction = {
      type: SessionActionType.CREATE_SESSION
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({ isLoading: true, session: null, error: null });
  });

  it(`handles actions with type ${SessionActionType.CREATE_SESSION_SUCCESS}`, () => {
    const action: SessionAction = {
      type: SessionActionType.CREATE_SESSION_SUCCESS,
      payload: dummySession
    };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({ isLoading: false, session: dummySession, error: null });
  });

  it(`handles actions with type ${SessionActionType.CREATE_SESSION_ERROR}`, () => {
    const err = new GeneralError('error creating session');
    const action: SessionAction = {
      type: SessionActionType.CREATE_SESSION_ERROR,
      payload: err
    };
    const state = reducer({ ...initialState, isLoading: true }, action);
    expect(state).toEqual({ isLoading: false, session: null, error: err });
  });

  it('handles unrecognized actions', () => {
    const action = { type: 'dargle' } as unknown as SessionAction;
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
