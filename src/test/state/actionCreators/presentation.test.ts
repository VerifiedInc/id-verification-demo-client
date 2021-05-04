import { GeneralError } from '@feathersjs/errors';

import {
  handleAcceptedPresentationShared,
  handleDeclinedPresentationShared,
  handleDeprecatedPresentationShared,
  handleNoPresentationShared,
  handlePresentationSharedError,
  resetPresentationState
} from '../../../state/actionCreators/presentation';
import { login } from '../../../state/actionCreators/auth';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { dummyDeprecatedDemoPresentationDto, dummyDeprecatedDemoNoPresentationDto, dummyDemoAcceptedPresentationDto, dummyDemoDeclinedPresentationDto } from '../../mocks';

jest.mock('../../../state/actionCreators/auth');
describe('presentation action creators', () => {
  describe('handleDeprecatedPresentationShared', () => {
    it('logs the user in', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValueOnce(mockInnerLogin);
      const dispatch = jest.fn();

      await handleDeprecatedPresentationShared(dummyDeprecatedDemoPresentationDto)(dispatch);
      const expected = {
        email: dummyDeprecatedDemoPresentationDto.presentation.verifiableCredentials[0].credentialSubject.userEmail,
        password: 'password'
      };
      expect(login).toBeCalledWith(expected);
      expect(mockInnerLogin).toBeCalled();
    });

    it('dispatches a PresentationSharedSuccessAction', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValueOnce(mockInnerLogin);
      const dispatch = jest.fn();

      await handleDeprecatedPresentationShared(dummyDeprecatedDemoPresentationDto)(dispatch);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
        payload: dummyDeprecatedDemoPresentationDto
      };
      expect(dispatch).toBeCalledWith(expected);
    });
  });

  describe('handleAcceptedPresentationShared', () => {
    it('logs the user in', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValueOnce(mockInnerLogin);
      const dispatch = jest.fn();

      await handleAcceptedPresentationShared(dummyDemoAcceptedPresentationDto)(dispatch);
      const expected = {
        email: 'jacob@unum.id',
        password: 'password'
      };
      expect(login).toBeCalledWith(expected);
      expect(mockInnerLogin).toBeCalledWith(dispatch);
    });

    it('dispatches a PresentationSharedSuccessAction', async () => {
      const mockInnerLogin = jest.fn();
      (login as jest.Mock).mockReturnValueOnce(mockInnerLogin);
      const dispatch = jest.fn();
      await handleAcceptedPresentationShared(dummyDemoAcceptedPresentationDto)(dispatch);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
        payload: dummyDemoAcceptedPresentationDto
      };
      expect(dispatch).toBeCalledWith(expected);
    });
  });

  describe('handleDeclinedPresentationShared', () => {
    it('returns a NoPresentationSharedSuccessAction', () => {
      const action = handleDeclinedPresentationShared(dummyDemoDeclinedPresentationDto);
      const expected = {
        type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
        payload: dummyDemoDeclinedPresentationDto
      };
      expect(action).toEqual(expected);
    });
  });

  describe('handleNoPresentationShared', () => {
    it('returns a NoPresentationSharedSuccessAction', () => {
      const action = handleNoPresentationShared(dummyDeprecatedDemoNoPresentationDto);
      const expected = {
        type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
        payload: dummyDeprecatedDemoNoPresentationDto
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
