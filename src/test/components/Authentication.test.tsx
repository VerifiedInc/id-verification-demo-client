import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { when } from 'jest-when';
import { mockUserAgent, clear } from 'jest-useragent-mock';

import Authentication from '../../components/Authentication';
import { store } from '../../state';
import { verifierClient } from '../../feathers';
import { dummyDemoPresentationRequestoDto, dummySession } from '../mocks';
import { createSession } from '../../state/actionCreators';
import deeplinkImgSrc from '../../assets/verify-with-acme-button.png';

jest.mock('../../feathers', () => ({
  verifierClient: {
    service: jest.fn()
  }
}));

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
  });

  it('creates a presentationRequest', async () => {
    await screen.findByAltText('Powered by Unum ID');
    expect(mockPresentationRequestCreate).toBeCalled();
  });

  it('listens for created presentations', async () => {
    await screen.findByAltText('Powered by Unum ID');
    expect(mockOn.mock.calls[0][0]).toEqual('created');
  });

  it('shows the web sdk widget', async () => {
    expect(await screen.findByAltText('Powered by Unum ID')).toBeInTheDocument();
  });

  it('provides an image for the deeplink button', async () => {
    mockUserAgent('iPhone');
    render(<Provider store={store}><Authentication /></Provider>);
    const deeplinkBtn = await screen.findByAltText('Verify with ACME');
    expect(deeplinkBtn).toBeInTheDocument();
    expect(deeplinkBtn).toHaveAttribute('src', deeplinkImgSrc);
  });
});
