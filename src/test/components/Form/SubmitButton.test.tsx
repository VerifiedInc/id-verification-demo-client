import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SubmitButton from '../../../components/Form/SubmitButton';

describe('SubmitButton', () => {
  const handleSubmit = jest.fn();

  afterEach(() => {
    handleSubmit.mockClear();
  });

  it('renders a button with type submit', () => {
    render(<SubmitButton handleSubmit={handleSubmit} />);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('renders children', () => {
    render(<SubmitButton handleSubmit={handleSubmit}>test</SubmitButton>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('handles submit', () => {
    render(<SubmitButton handleSubmit={handleSubmit} />);
    userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toBeCalled();
  });
});
