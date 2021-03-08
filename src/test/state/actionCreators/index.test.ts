import { issuerClient } from '../../../feathers';
import { resetState } from '../../../state/actionCreators';
import { AuthActionType } from '../../../state/actionTypes/auth';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { PresentationRequestActionType } from '../../../state/actionTypes/presentationRequest';
import { SessionActionType } from '../../../state/actionTypes/session';
import { UserActionType } from '../../../state/actionTypes/user';

jest.mock('../../../feathers');
describe('combined action creators', () => {
  describe('resetState', () => {
    const dispatch = jest.fn();

    beforeEach(async () => {
      await resetState()(dispatch);
    });
    it('dispatches a ResetPresentationAction', () => {
      expect(dispatch).toBeCalledWith({ type: PresentationRequestActionType.RESET_PRESENTATION_REQUEST_STATE });
    });

    it('dispatches a ResetPresentationStateAction', () => {
      expect(dispatch).toBeCalledWith({ type: PresentationActionType.RESET_PRESENTATION_STATE });
    });

    it('dispatches a ResetSessionStateAction', () => {
      expect(dispatch).toBeCalledWith({ type: SessionActionType.RESET_SESSION_STATE });
    });

    it('dispatches a ResetUserStateAction', () => {
      expect(dispatch).toBeCalledWith({ type: UserActionType.RESET_USER_STATE });
    });

    it('logs out the user and dispatches a LogoutAction', () => {
      expect(dispatch).toBeCalledWith({ type: AuthActionType.LOG_OUT });
      expect(issuerClient.logout).toBeCalled();
    });
  });
});
