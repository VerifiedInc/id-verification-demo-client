import { GeneralError } from '@feathersjs/errors';

import {
  handlePresentationShared,
  handleNoPresentationShared,
  handlePresentationSharedError,
  resetPresentationState
} from '../../../state/actionCreators/presentation';
import { login } from '../../../state/actionCreators/auth';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { dummyDemoPresentationDto, dummyDemoNoPresentationDto } from '../../mocks';

jest.mock('../../../state/actionCreators/auth');
describe('presentation action creators', () => {
  describe('handlePresentationShared', () => {
    it('logs the user in', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValue(mockInnerLogin);
      const dispatch = jest.fn();
      await handlePresentationShared(dummyDemoPresentationDto)(dispatch);

      expect(mockInnerLogin).toBeCalled();
    });

    it('dispatches a PresentationSharedSuccessAction', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValue(mockInnerLogin);
      const dispatch = jest.fn();
      await handlePresentationShared(dummyDemoPresentationDto)(dispatch);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
        payload: dummyDemoPresentationDto
      };
      expect(dispatch).toBeCalledWith(expected);
    });
  });

  describe('handleNoPresentationShared', () => {
    it('returns a NoPresentationSharedSuccessAction', () => {
      const action = handleNoPresentationShared(dummyDemoNoPresentationDto);
      const expected = {
        type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
        payload: dummyDemoNoPresentationDto
      };
      expect(action).toEqual(expected);
    });
  });

  describe('handlePresentationSharedError', () => {
    it('returns a PresentationSharedErrorAction', () => {
      const err = new GeneralError('error sharing presentation');
      const action = handlePresentationSharedError(err);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_ERROR,
        payload: err
      };
      expect(action).toEqual(expected);
    });
  });

  describe('resetPresentationState', () => {
    it('returns a ResetPresentationStateAction', () => {
      const action = resetPresentationState();
      expect(action).toEqual({ type: PresentationActionType.RESET_PRESENTATION_STATE });
    });
  });
});
