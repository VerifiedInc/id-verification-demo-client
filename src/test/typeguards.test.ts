import {
  isAcceptedPresentation,
  isDeclinedPresentation,
  isDemoAcceptedPresentationDto,
  isDemoDeclinedPresentationDto,
  isDeprecatedNoPresentation,
  isDeprecatedPresentation,
  isPresentation,
  isDeprecatedDemoNoPresentationDto,
  isDeprecatedDemoPresentationDto,
  isDemoPresentationDto
} from '../typeguards';
import {
  dummyAcceptedPresentation,
  dummyDeclinedPresentation,
  dummyDeprecatedPresentation,
  dummyDeprecatedNoPresentation,
  dummyDemoAcceptedPresentationDto,
  dummyDemoDeclinedPresentationDto,
  dummyDeprecatedDemoPresentationDto,
  dummyDeprecatedDemoNoPresentationDto
} from './mocks';

describe('typeguards', () => {
  describe('isAcceptedPresentation', () => {
    it('returns true for an AcceptedPresentation', () => {
      expect(isAcceptedPresentation(dummyAcceptedPresentation)).toBe(true);
    });

    it('returns false for a DeclinedPresentation', () => {
      expect(isAcceptedPresentation(dummyDeclinedPresentation)).toBe(false);
    });
  });

  describe('isDeclinedPresentation', () => {
    it('returns true for a DeclinedPresentation', () => {
      expect(isDeclinedPresentation(dummyDeclinedPresentation)).toBe(true);
    });

    it('returns false for an AcceptedPresentation', () => {
      expect(isDeclinedPresentation(dummyAcceptedPresentation)).toBe(false);
    });
  });

  describe('isDemoAcceptedPresentationDto', () => {
    it('returns true for a DemoAcceptedPresentationDto', () => {
      expect(isDemoAcceptedPresentationDto(dummyDemoAcceptedPresentationDto)).toBe(true);
    });

    it('returns false for a DemoDeclinedPresentationDto', () => {
      expect(isDemoAcceptedPresentationDto(dummyDemoDeclinedPresentationDto)).toBe(false);
    });
  });

  describe('isDemoDeclinedPresentationDto', () => {
    it('returns true for a DemoDeclinedPresentationDto', () => {
      expect(isDemoDeclinedPresentationDto(dummyDemoDeclinedPresentationDto)).toBe(true);
    });
    it('returns false for a DemoAcceptedPresentationDto', () => {
      expect(isDemoDeclinedPresentationDto(dummyDemoAcceptedPresentationDto)).toBe(false);
    });
  });

  describe('isDeprecatedNoPresentation', () => {
    it('returns true for a DeprecatedNoPresentation', () => {
      expect(isDeprecatedNoPresentation(dummyDeprecatedNoPresentation)).toBe(true);
    });

    it('returns false for a DeprecatedPresentation', () => {
      expect(isDeprecatedNoPresentation(dummyDeprecatedPresentation)).toBe(false);
    });

    it('returns false for an AcceptedPresentation', () => {
      expect(isDeprecatedNoPresentation(dummyAcceptedPresentation)).toBe(false);
    });

    it('returns false for a DeclinedPresentation', () => {
      expect(isDeprecatedNoPresentation(dummyDeclinedPresentation)).toBe(false);
    });
  });

  describe('isDeprecatedPresentation', () => {
    it('returns true for a DeprecatedPresentation', () => {
      expect(isDeprecatedPresentation(dummyDeprecatedPresentation)).toBe(true);
    });

    it('returns false for a DeprecatedNoPresentation', () => {
      expect(isDeprecatedPresentation(dummyDeprecatedNoPresentation)).toBe(false);
    });

    it('returns false for an AcceptedPresentation', () => {
      expect(isDeprecatedPresentation(dummyAcceptedPresentation)).toBe(false);
    });

    it('returns false for a DeclinedPresentation', () => {
      expect(isDeprecatedPresentation(dummyDeclinedPresentation)).toBe(false);
    });
  });

  describe('isPresentation', () => {
    it('returns true for an AcceptedPresentation', () => {
      expect(isPresentation(dummyAcceptedPresentation)).toBe(true);
    });

    it('returns true for a DeclinedPresentation', () => {
      expect(isPresentation(dummyDeclinedPresentation)).toBe(true);
    });

    it('returns false for a DeprecatedPresentation', () => {
      expect(isPresentation(dummyDeprecatedPresentation)).toBe(false);
    });

    it('returns false for a DeprecatedNoPresentation', () => {
      expect(isPresentation(dummyDeprecatedNoPresentation)).toBe(false);
    });
  });

  describe('isDeprecatedDemoNoPresentationDto', () => {
    it('returns true for a DeprecatedDemoNoPresentationDto', () => {
      expect(isDeprecatedDemoNoPresentationDto(dummyDeprecatedDemoNoPresentationDto)).toBe(true);
    });

    it('returns false for a DeprecatedDemoPresentationDto', () => {
      expect(isDeprecatedDemoNoPresentationDto(dummyDeprecatedDemoPresentationDto)).toBe(false);
    });

    it('returns false for a DemoAcceptedPresentationDto', () => {
      expect(isDeprecatedDemoNoPresentationDto(dummyDemoAcceptedPresentationDto)).toBe(false);
    });

    it('returns false for a DemoDeclinedPresentationDto', () => {
      expect(isDeprecatedDemoNoPresentationDto(dummyDemoDeclinedPresentationDto)).toBe(false);
    });
  });

  describe('isDeprecatedDemoPresentationDto', () => {
    it('returns true for a DeprecatedDemoPresentationDto', () => {
      expect(isDeprecatedDemoPresentationDto(dummyDeprecatedDemoPresentationDto)).toBe(true);
    });

    it('returns false for a DeprecatedDemoNoPresentationDto', () => {
      expect(isDeprecatedDemoPresentationDto(dummyDeprecatedDemoNoPresentationDto)).toBe(false);
    });

    it('returns false for a DemoAcceptedPresentationDto', () => {
      expect(isDeprecatedDemoPresentationDto(dummyDemoAcceptedPresentationDto)).toBe(false);
    });

    it('returns false for a DemoDeclinedPresentationDto', () => {
      expect(isDeprecatedDemoPresentationDto(dummyDemoDeclinedPresentationDto)).toBe(false);
    });
  });

  describe('isDemoPresentationDto', () => {
    it('returns true for a DemoAcceptedPresentationDto', () => {
      expect(isDemoPresentationDto(dummyDemoAcceptedPresentationDto)).toBe(true);
    });

    it('returns true for a DemoDeclinedPresentationDto', () => {
      expect(isDemoPresentationDto(dummyDemoDeclinedPresentationDto)).toBe(true);
    });

    it('returns false for a DeprecatedDemoPresentationDto', () => {
      expect(isDemoPresentationDto(dummyDeprecatedDemoPresentationDto)).toBe(false);
    });

    it('returns false for a DeprecatedDemoNoPresentationDto', () => {
      expect(isDemoPresentationDto(dummyDeprecatedDemoNoPresentationDto)).toBe(false);
    });
  });
});
