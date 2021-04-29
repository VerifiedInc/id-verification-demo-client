import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Authenticated from '../../components/Authenticated';
import { store } from '../../state';
import { PresentationActionType } from '../../state/actionTypes/presentation';
import { dummyDemoPresentationDto, dummyPresentation } from '../mocks';

describe('Authenticated component', () => {
  const component = (
    <Provider store={store} >
      <MemoryRouter>
        <Authenticated />
      </MemoryRouter>
    </Provider>
  );

  it('redirects if there is no Presentation in state', async () => {
    render(component);
    expect(screen.queryByText('Authenticated')).not.toBeInTheDocument();
  });

  it('displays Authenticated if there is a presentation in state', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoPresentationDto
    });

    render(component);
    expect(screen.getByText(`Authenticated as ${dummyPresentation.verifiableCredentials[0].credentialSubject.userEmail}!`)).toBeInTheDocument();
  });

  it('displays Log Out link', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoPresentationDto
    });

    render(component);
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  it('displays Start Over link', () => {
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDemoPresentationDto
    });

    render(component);
    expect(screen.getByText('Start Over')).toBeInTheDocument();
  });
});
