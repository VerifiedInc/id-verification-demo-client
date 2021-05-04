import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import LogoutTab from '../../../components/Header/LogoutTab';
import { store } from '../../../state';
import { PresentationActionType } from '../../../state/actionTypes/presentation';
import { PresentationRequestActionType } from '../../../state/actionTypes/presentationRequest';
import { SessionActionType } from '../../../state/actionTypes/session';
import { initialState } from '../../../state/reducers';
import { dummyDeprecatedDemoPresentationDto, dummyDemoPresentationRequestoDto, dummySession } from '../../mocks';

const mockHistory = {
  push: jest.fn()
};

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useHistory: () => mockHistory
  };
});

describe('LogoutTab component', () => {
  const component = (
    <Provider store={store}>
      <MemoryRouter>
        <LogoutTab />
      </MemoryRouter>
    </Provider>
  );

  it('displays LOGOUT text', () => {
    render(component);
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
  });

  it('resets state on click', () => {
    // set some existing state
    store.dispatch({
      type: SessionActionType.CREATE_SESSION_SUCCESS,
      payload: dummySession
    });
    store.dispatch({
      type: PresentationRequestActionType.CREATE_PRESENTATION_REQUEST_SUCCESS,
      payload: dummyDemoPresentationRequestoDto
    });
    store.dispatch({
      type: PresentationActionType.PRESENTATION_SHARED_SUCCESS,
      payload: dummyDeprecatedDemoPresentationDto
    });

    render(component);
    userEvent.click(screen.getByText('LOGOUT'));
    const state = store.getState();
    expect(state).toEqual(initialState);
  });

  it('navigates to the root route', () => {
    render(component);
    userEvent.click(screen.getByText('LOGOUT'));
    expect(mockHistory.push).toBeCalledWith('/');
  });
});
