import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../../state';
import Login, { ErrorMessages } from '../../components/Login';
import { AuthActionType } from '../../state/actionTypes/auth';
import { dummyLocalAuthResult, dummyUser } from '../mocks';
import { resetState } from '../../state/actionCreators';
import { issuerClient } from '../../feathers';

jest.mock('../../feathers');

describe('Login', () => {
  const component = <Provider store={store}><MemoryRouter><Login /></MemoryRouter></Provider>;

  afterEach(async () => {
    await resetState()(store.dispatch);
  });

  it('redirects to the authentication page if there is a logged in user', () => {
    store.dispatch({ type: AuthActionType.LOCAL_STRATEGY_SUCCESS, payload: dummyLocalAuthResult });
    render(component);
    expect(screen.queryByText('Log In')).not.toBeInTheDocument();
  });

  it('shows email and password inputs', () => {
    render(component);
    expect(screen.getByLabelText('Email', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: false })).toBeInTheDocument();
  });

  it('shows a login button', () => {
    render(component);
    const button = screen.getByRole('button');

    // is a submit button
    expect(button).toHaveAttribute('type', 'submit');

    // starts out disabled
    expect(button).toBeDisabled();

    // is enabled by entering email
    userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
    expect(button).toBeEnabled();
  });

  it('shows a link to the register page', () => {
    render(component);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/register');
  });

  describe('logging in', () => {
    it('shows an error message if the email is invalid', () => {
      render(component);
      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'asdf');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText(ErrorMessages.INVALID_EMAIL)).toBeInTheDocument();
    });

    it('shows an error messge if logging in fails', async () => {
      (issuerClient.authenticate as unknown as jest.Mock).mockRejectedValueOnce(new Error('login failed'));

      render(component);

      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
      userEvent.click(screen.getByRole('button'));

      expect(await screen.findByText(ErrorMessages.LOGIN_ERROR)).toBeInTheDocument();
    });

    it('logs in the user', async () => {
      (issuerClient.authenticate as unknown as jest.Mock).mockResolvedValue(dummyLocalAuthResult);

      render(component);

      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
      userEvent.click(screen.getByRole('button'));

      await waitForElementToBeRemoved(screen.queryAllByText('Log In'));
      expect(store.getState().auth.loggedInUser).toEqual(dummyUser);
    });
  });
});
