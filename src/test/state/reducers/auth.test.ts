import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/auth';
import { AuthActionType } from '../../../state/actionTypes/auth';
import { AuthAction } from '../../../state/actions/auth';
import { dummyLocalAuthResult } from '../../mocks';

describe('auth reducer', () => {
  it('sets the initial state by default', () => {
    const action = { type: 'dargle' } as unknown as AuthAction;
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it(`handles actions with type ${AuthActionType.LOCAL_STRATEGY}`, () => {
    const action: AuthAction = { type: AuthActionType.LOCAL_STRATEGY };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      isLoading: true,
      loggedInUser: null,
      error: null
    });
  });

  it(`handles actions wih type ${AuthActionType.LOCAL_STRATEGY_SUCCESS}`, () => {
    const action: AuthAction = {
      type: AuthActionType.LOCAL_STRATEGY_SUCCESS,
      payload: dummyLocalAuthResult
    };
    const state = reducer({
      isLoading: true,
      loggedInUser: null,
      error: null
    }, action);
    expect(state).toEqual({
      isLoading: false,
      loggedInUser: dummyLocalAuthResult.user,
      error: null
    });
  });

  it(`handles actions with type ${AuthActionType.LOCAL_STRATEGY_ERROR}`, () => {
    const err = new GeneralError('authentication error');
    const action: AuthAction = {
      type: AuthActionType.LOCAL_STRATEGY_ERROR,
      payload: err
    };

    const state = reducer({
      isLoading: true,
      loggedInUser: null,
      error: null
    }, action);
    expect(state).toEqual({
      isLoading: false,
      loggedInUser: null,
      error: err
    });
  });

  it(`handles actions with type ${AuthActionType.LOG_OUT}`, () => {
    const action: AuthAction = { type: AuthActionType.LOG_OUT };
    const state = reducer({
      isLoading: false,
      loggedInUser: dummyLocalAuthResult.user,
      error: null
    }, action);
    expect(state).toEqual(initialState);
  });

  it('handles unrecognized actions', () => {
    const action = { type: 'dargle', payload: 'bargle' } as unknown as AuthAction;
    const state = reducer(initialState, action);
    expect(state).toEqual(initialState);
  });
});
