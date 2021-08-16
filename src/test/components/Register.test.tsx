import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';

import Register from '../../components/Register';
import { store } from '../../state';
import { SessionActionType } from '../../state/actionTypes/session';
import { dummyLocalAuthResult, dummySession, dummyUser } from '../mocks';
import { issuerClient } from '../../feathers';

jest.mock('../../feathers');

describe('Register', () => {
  const component = <Provider store={store}><MemoryRouter><Register /></MemoryRouter></Provider>;

  it('shows the first registration step', () => {
    render(component);
    expect(screen.getByText('1.', { exact: false })).toBeInTheDocument();
  });

  it('shows email, password, first name, and phone inputs', () => {
    render(component);
    expect(screen.getByLabelText('Email', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Password', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('First Name', { exact: false })).toBeInTheDocument();
    expect(screen.getByLabelText('Phone', { exact: false })).toBeInTheDocument();
  });

  it('shows a register button', () => {
    render(component);
    const button = screen.getByRole('button') as HTMLButtonElement;

    // is a submit button
    expect(button).toHaveAttribute('type', 'submit');

    // starts out disabled
    expect(button).toBeDisabled();

    // is enabled by entering email
    userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
    expect(button).toBeEnabled();
  });

  it('shows links to the terms, privacy policy, and login page', () => {
    render(component);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://unum.id/terms-of-service.html');
    expect(links[1]).toHaveAttribute('href', 'https://unum.id/privacy-policy.html');
    expect(links[2]).toHaveAttribute('href', '/login');
  });

  describe('submitting the form', () => {
    const mockCreateUser = jest.fn();

    it('shows an error message if the email is invalid', () => {
      render(component);

      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'asdf');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('The following fields are invalid: Email')).toBeInTheDocument();
    });

    it('shows an error message if the phone is invalid', () => {
      render(component);

      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
      userEvent.type(screen.getByLabelText('Phone', { exact: false }), 'asdf');
      userEvent.click(screen.getByRole('button'));
      expect(screen.getByText('The following fields are invalid: Phone')).toBeInTheDocument();
    });

    it('creates and logs in a user and shows them step 2', async () => {
      mockCreateUser.mockResolvedValueOnce(dummyUser);
      (issuerClient.service as unknown as jest.Mock).mockReturnValue({ create: mockCreateUser });
      (issuerClient.authenticate as jest.Mock).mockResolvedValueOnce(dummyLocalAuthResult);

      render(component);

      userEvent.type(screen.getByLabelText('Email', { exact: false }), 'test@unum.id');
      userEvent.click(screen.getByRole('button'));
      await screen.findByText('2.', { exact: false });

      expect(mockCreateUser).toBeCalled();
      expect(issuerClient.authenticate).toBeCalled();
    });
  });
});
