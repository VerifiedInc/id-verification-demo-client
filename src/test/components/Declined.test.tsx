import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import Declined from '../../components/Declined';
import { store } from '../../state';
import { PresentationActionType } from '../../state/actionTypes/presentation';
import { dummyDeprecatedDemoNoPresentationDto } from '../mocks';

describe('Declined component', () => {
  const component = (
    <Provider store={store}>
      <MemoryRouter>
        <Declined />
      </MemoryRouter>
    </Provider>
  );

  it('redirects if there is no Presentation in state', async () => {
    render(component);
    expect(screen.queryByText('Declined', { exact: false })).not.toBeInTheDocument();
  });

  it('displays Declined if there is a presentation in state', () => {
    store.dispatch({
      type: PresentationActionType.NOPRESENTATION_SHARED_SUCCESS,
      payload: dummyDeprecatedDemoNoPresentationDto
    });

    render(component);
    expect(screen.getByText('You declined to authenticate.')).toBeInTheDocument();
  });
});
