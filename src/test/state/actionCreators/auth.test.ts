import { GeneralError } from '@feathersjs/errors';
import { issuerClient } from '../../../feathers';

import { login, logout } from '../../../state/actionCreators/auth';
import { AuthActionType } from '../../../state/actionTypes/auth';
import { dummyLocalAuthResult, dummyUserCreateOptions } from '../../mocks';

jest.mock('../../../feathers');

describe('auth action creators', () => {
  describe('login', () => {
    const loginOptions = {
      email: dummyUserCreateOptions.email,
      password: dummyUserCreateOptions.password
    };

    it('returns a function', () => {
      expect(typeof login(loginOptions)).toEqual('function');
    });

    describe('the inner function', () => {
      const dispatch = jest.fn();

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`dispatches a ${AuthActionType.LOCAL_STRATEGY} action`, async () => {
        (issuerClient.authenticate as unknown as jest.Mock).mockResolvedValueOnce(dummyLocalAuthResult);
        login(loginOptions)(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: AuthActionType.LOCAL_STRATEGY });
      });

      it('authenticates the user using the local strategy', async () => {
        (issuerClient.authenticate as unknown as jest.Mock).mockResolvedValueOnce(dummyLocalAuthResult);
        await login(loginOptions)(dispatch);
        expect(issuerClient.authenticate).toBeCalledWith({ strategy: 'local', ...loginOptions });
      });

      it(`dispatches a ${AuthActionType.LOCAL_STRATEGY_SUCCESS} action on success`, async () => {
        (issuerClient.authenticate as unknown as jest.Mock).mockResolvedValueOnce(dummyLocalAuthResult);
        await login(loginOptions)(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: AuthActionType.LOCAL_STRATEGY_SUCCESS,
          payload: dummyLocalAuthResult
        });
      });

      it(`dispatches a ${AuthActionType.LOCAL_STRATEGY_ERROR} action on error`, async () => {
        const err = new GeneralError('authentication error');
        (issuerClient.authenticate as unknown as jest.Mock).mockRejectedValueOnce(err);
        await login(loginOptions)(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: AuthActionType.LOCAL_STRATEGY_ERROR,
          payload: err
        });
      });
    });
  });

  describe('logout', () => {
    it('returns a function', () => {
      expect(typeof logout()).toEqual('function');
    });

    describe('the inner function', () => {
      const dispatch = jest.fn();
      it('logs the user out', async () => {
        await logout()(dispatch);
        expect(issuerClient.logout).toBeCalled();
      });

      it(`dispatches a ${AuthActionType.LOG_OUT} action`, async () => {
        await logout()(dispatch);
        expect(dispatch).toBeCalledWith({ type: AuthActionType.LOG_OUT });
      });
    });
  });
});
