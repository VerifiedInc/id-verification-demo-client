import { GeneralError } from '@feathersjs/errors';

import { createSession, resetSessionState } from '../../../state/actionCreators/session';
import { SessionActionType } from '../../../state/actionTypes/session';
import { dummySession } from '../../mocks';
import { verifierClient } from '../../../feathers';

jest.mock('../../../feathers');
const mockCreate = jest.fn();

describe('session action creators', () => {
  describe('createSession', () => {
    it('returns a function', () => {
      expect(typeof createSession()).toEqual('function');
    });

    describe('the inner function', () => {
      const dispatch = jest.fn();

      beforeEach(() => {
        (verifierClient.service as unknown as jest.Mock).mockReturnValue({ create: mockCreate });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`dispatches a ${SessionActionType.CREATE_SESSION} action`, async () => {
        mockCreate.mockResolvedValueOnce(dummySession);
        await createSession()(dispatch);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: SessionActionType.CREATE_SESSION });
      });

      it('creates a session', async () => {
        mockCreate.mockResolvedValueOnce(dummySession);
        await createSession()(dispatch);
        expect(verifierClient.service).toBeCalledWith('session');
        expect(mockCreate).toBeCalled();
      });

      it(`dispatches a ${SessionActionType.CREATE_SESSION_SUCCESS} action with the created session`, async () => {
        mockCreate.mockResolvedValueOnce(dummySession);
        await createSession()(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: SessionActionType.CREATE_SESSION_SUCCESS,
          payload: dummySession
        });
      });

      it(`dispatches a ${SessionActionType.CREATE_SESSION_ERROR} action if there is an error creating the session`, async () => {
        const err = new GeneralError('error creating session');
        mockCreate.mockRejectedValueOnce(err);
        await createSession()(dispatch);
        expect(dispatch.mock.calls[1][0]).toEqual({
          type: SessionActionType.CREATE_SESSION_ERROR,
          payload: err
        });
      });
    });
  });

  describe('resetSessionState', () => {
    it('returns a ResetSessionStateAction', () => {
      const action = resetSessionState();
      expect(action).toEqual({ type: SessionActionType.RESET_SESSION_STATE });
    });
  });
});
