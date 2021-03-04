import { resetState } from '../../../state/actionCreators';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { PresentationRequestActionType } from '../../../state/actionTypes/presentationRequest';
import { SessionActionType } from '../../../state/actionTypes/session';

describe('combined action creators', () => {
  describe('resetState', () => {
    const dispatch = jest.fn();

    beforeEach(() => {
      resetState()(dispatch);
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
  });
});
