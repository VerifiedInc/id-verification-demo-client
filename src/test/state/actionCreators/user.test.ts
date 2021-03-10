import { GeneralError } from '@feathersjs/errors';

import { createUser, resetUserState } from '../../../state/actionCreators/user';
import { login } from '../../../state/actionCreators/auth';
import { UserActionType } from '../../../state/actionTypes/user';
import { dummyUser, dummyUserCreateOptions } from '../../mocks';
import { issuerClient } from '../../../feathers';

jest.mock('../../../feathers');
jest.mock('../../../state/actionCreators/auth');
const mockCreate = jest.fn();

describe('user action creators', () => {
  describe('createUser', () => {
    it('returns a function', () => {
      expect(typeof createUser(dummyUserCreateOptions)).toEqual('function');
    });

    describe('the inner function', () => {
      const dispatch = jest.fn();

      beforeEach(() => {
        (issuerClient.service as unknown as jest.Mock).mockReturnValue({ create: mockCreate });
      });

      it(`dispatches a ${UserActionType.CREATE_USER} action`, async () => {
        mockCreate.mockResolvedValueOnce(dummyUser);
        await createUser(dummyUserCreateOptions)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({
          type: UserActionType.CREATE_USER,
          payload: dummyUserCreateOptions
        });
      });

      it('creates a user', async () => {
        mockCreate.mockResolvedValueOnce(dummyUser);
        await createUser(dummyUserCreateOptions)(dispatch);
        expect(issuerClient.service).toBeCalledWith('user');
        expect(mockCreate).toBeCalledWith(dummyUserCreateOptions);
      });

      it(`dispatches a ${UserActionType.CREATE_USER_SUCCESS} action with the created user`, async () => {
        mockCreate.mockResolvedValueOnce(dummyUser);
        await createUser(dummyUserCreateOptions)(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UserActionType.CREATE_USER_SUCCESS,
          payload: dummyUser
        });
      });

      it('logs in the created user', async () => {
        mockCreate.mockResolvedValueOnce(dummyUser);
        await createUser(dummyUserCreateOptions)(dispatch);
        expect(login).toBeCalled();
      });

      it(`dispatches a ${UserActionType.CREATE_USER_ERROR} action if there is an error creating the user`, async () => {
        const err = new GeneralError('error creating user');
        mockCreate.mockRejectedValueOnce(err);
        await createUser(dummyUserCreateOptions)(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: UserActionType.CREATE_USER_ERROR,
          payload: err
        });
      });
    });
  });

  describe('resetUserState', () => {
    it('returns a ResetUserStateAction', () => {
      const action = resetUserState();
      expect(action).toEqual({ type: UserActionType.RESET_USER_STATE });
    });
  });
});
