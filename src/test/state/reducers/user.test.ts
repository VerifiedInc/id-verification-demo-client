import { GeneralError } from '@feathersjs/errors';

import reducer, { initialState } from '../../../state/reducers/user';
import { UserActionType } from '../../../state/actionTypes/user';
import { UserAction } from '../../../state/actions/user';
import { dummyUser, dummyUserCreateOptions } from '../../mocks';

describe('user reducer', () => {
  it('sets the initial state by default', () => {
    const action = { type: 'dargle' } as unknown as UserAction;
    const state = reducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it(`handles actions with type ${UserActionType.CREATE_USER}`, () => {
    const action: UserAction = {
      type: UserActionType.CREATE_USER,
      payload: dummyUserCreateOptions
    };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      isLoading: true,
      userOptions: dummyUserCreateOptions,
      error: null,
      createdUser: null
    });
  });

  it(`handles actions with type ${UserActionType.CREATE_USER_SUCCESS}`, () => {
    const action: UserAction = {
      type: UserActionType.CREATE_USER_SUCCESS,
      payload: dummyUser
    };
    const state = reducer({
      ...initialState,
      isLoading: true,
      userOptions: dummyUserCreateOptions
    }, action);
    expect(state).toEqual({
      isLoading: false,
      userOptions: dummyUserCreateOptions,
      error: null,
      createdUser: dummyUser
    });
  });

  it(`handles actions with type ${UserActionType.CREATE_USER_ERROR}`, () => {
    const err = new GeneralError('error creating user');
    const action: UserAction = {
      type: UserActionType.CREATE_USER_ERROR,
      payload: err
    };
    const state = reducer({
      ...initialState,
      isLoading: true,
      userOptions: dummyUserCreateOptions
    }, action);
    expect(state).toEqual({
      isLoading: false,
      userOptions: dummyUserCreateOptions,
      error: err,
      createdUser: null
    });
  });

  it(`handles actions with type ${UserActionType.RESET_USER_STATE}`, () => {
    const action: UserAction = {
      type: UserActionType.RESET_USER_STATE
    };
    const state = reducer({
      ...initialState,
      isLoading: false,
      userOptions: dummyUserCreateOptions,
      createdUser: dummyUser
    }, action);
    expect(state).toEqual(initialState);
  });
});
