import { render, screen, getByText, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LogRocket from 'logrocket';

import BugReport from '../../components/BugReport';

jest.mock('logrocket');

describe('BugReport', () => {
  describe('button', () => {
    it('renders a button', () => {
      render(<div id='root'><BugReport /></div>);

      const btn = screen.getByText('Report a Bug');
      expect(btn).toBeInTheDocument();
    });

    it('opens a report modal with email and message fields on click', () => {
      render(<div id='root'><BugReport /></div>);

      const btn = screen.getByText('Report a Bug');
      userEvent.click(btn);

      expect(screen.getByLabelText('Email (optional)')).toBeInTheDocument();
      expect(screen.getByLabelText('Describe the bug (in as much detail as possible)')).toBeInTheDocument();
    });

    it('captures the email and message with logrocket on submit', () => {
      render(<div id='root'><BugReport /></div>);

      const btn = screen.getByText('Report a Bug');
      userEvent.click(btn);

      const emailInput = screen.getByLabelText('Email (optional)');
      const messageInput = screen.getByLabelText('Describe the bug (in as much detail as possible)');

      userEvent.type(emailInput, 'test@unum.id');
      userEvent.type(messageInput, 'test bug report message');

      userEvent.click(screen.getByText('Submit'));

      expect(LogRocket.captureMessage).toBeCalledWith('User bug report', {
        extra: {
          email: 'test@unum.id',
          message: 'test bug report message'
        }
      });
    });

    it('closes on click on the upper right X', () => {
      render(<div id='root'><BugReport /></div>);

      const btn = screen.getByText('Report a Bug');
      userEvent.click(btn);

      userEvent.click(screen.getByText('X'));

      expect(screen.queryByText('Email (optional)')).not.toBeInTheDocument();
    });

    it('shows a success message and close button after submitting', () => {
      render(<div id='root'><BugReport /></div>);

      const btn = screen.getByText('Report a Bug');
      userEvent.click(btn);

      const emailInput = screen.getByLabelText('Email (optional)');
      const messageInput = screen.getByLabelText('Describe the bug (in as much detail as possible)');

      userEvent.type(emailInput, 'test@unum.id');
      userEvent.type(messageInput, 'test bug report message');

      userEvent.click(screen.getByText('Submit'));

      expect(screen.getByText('Your report has been submitted.')).toBeInTheDocument();
      expect(screen.getByText('Close')).toBeInTheDocument();

      userEvent.click(screen.getByText('Close'));

      expect(screen.queryByText('Your report has been submitted.')).not.toBeInTheDocument();
    });
  });
});
