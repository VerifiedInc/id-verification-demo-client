import { GeneralError } from '@feathersjs/errors';

import {
  handlePresentationShared,
  handleNoPresentationShared,
  handlePresentationSharedError,
  resetPresentationState
} from '../../../state/actionCreators/presentation';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { dummyDemoPresentationDto, dummyDemoNoPresentationDto } from '../../mocks';

describe('presentation action creators', () => {
  describe('handlePresentationShared', () => {
    it('returns a PresentationSharedSuccessAction', () => {
      const action = handlePresentationShared(dummyDemoPresentationDto);
      const expected = {
        type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
        payload: dummyDemoPresentationDto
      };
      expect(action).toEqual(expected);
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
