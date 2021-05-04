import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { when } from 'jest-when';
import { clear } from 'jest-useragent-mock';

import Authentication from '../../components/Authentication';
import { store } from '../../state';
import { verifierClient } from '../../feathers';
import {
  dummyDemoPresentationRequestoDto,
  dummySession,
  dummyDemoAcceptedPresentationDto,
  dummyDemoDeclinedPresentationDto,
  dummyDeprecatedDemoPresentationDto,
  dummyDeprecatedDemoNoPresentationDto
} from '../mocks';
import { createSession } from '../../state/actionCreators';
import { DemoPresentationLikeDto } from '../../types';

jest.mock('../../feathers', () => ({
  verifierClient: {
    service: jest.fn()
  }
}));

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => ({ push: jest.fn() })
  };
});

describe('Authentication', () => {
  const mockSessionCreate = jest.fn();
  const mockPresentationRequestCreate = jest.fn();
  const mockOn = jest.fn();

  beforeEach(() => {
    mockSessionCreate.mockResolvedValueOnce(dummySession);
    mockPresentationRequestCreate.mockResolvedValueOnce(dummyDemoPresentationRequestoDto);

    when(verifierClient.service as unknown as jest.Mock)
      .calledWith('session').mockReturnValue({ create: mockSessionCreate })
      .calledWith('presentationRequest').mockReturnValue({ create: mockPresentationRequestCreate })
      .calledWith('presentationWebsocket').mockReturnValue({ on: mockOn, removeAllListeners: jest.fn() });

    createSession()(store.dispatch);
    render(<Provider store={store}><Authentication /></Provider>);
  });

  afterEach(() => {
    clear();
    jest.clearAllMocks();
  });

  it('creates a presentationRequest', async () => {
    await screen.findByAltText('Powered by Unum ID');
    expect(mockPresentationRequestCreate).toBeCalled();
  });

  it('listens for created presentations', async () => {
    await screen.findByAltText('Powered by Unum ID');
    expect(mockOn.mock.calls[0][0]).toEqual('created');
  });

  describe('handling presentations', () => {
    let handler: (data: DemoPresentationLikeDto) => Promise<void>;

    beforeEach(async () => {
      await screen.findByAltText('Powered by Unum ID');
      handler = mockOn.mock.calls[0][1];
    });

    it('handles a DemoAcceptedPresentationDto', async () => {
      await handler(dummyDemoAcceptedPresentationDto);
      const expected = store.getState().presentation.sharedPresentation;
      expect(expected).toEqual(dummyDemoAcceptedPresentationDto);
    });

    it('handles a DemoDeclinedPresentationDto', async () => {
      await handler(dummyDemoDeclinedPresentationDto);
      const expected = store.getState().presentation.sharedNoPresentation;
      expect(expected).toEqual(dummyDemoDeclinedPresentationDto);
    });

    it('handles a DeprecatedDemoPresentationDto', async () => {
      await handler(dummyDeprecatedDemoPresentationDto);
      const expected = store.getState().presentation.sharedPresentation;
      expect(expected).toEqual(dummyDeprecatedDemoPresentationDto);
    });

    it('handles a DemoDeprecatedNoPresentationDto', async () => {
      await handler(dummyDeprecatedDemoNoPresentationDto);
      const expected = store.getState().presentation.sharedNoPresentation;
      expect(expected).toEqual(dummyDeprecatedDemoNoPresentationDto);
    });
  });

  it('shows the web sdk widget', async () => {
    expect(await screen.findByAltText('Powered by Unum ID')).toBeInTheDocument();
  });
});
