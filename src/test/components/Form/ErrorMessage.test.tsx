import { render, screen } from '@testing-library/react';

import ErrorMessage from '../../../components/Form/ErrorMessage';

describe('ErrorMessage', () => {
  it('renders a div with className error-message', () => {
    render(<ErrorMessage>test error</ErrorMessage>);
    expect(screen.getByText('test error')).toHaveClass('error-message');
  });
});
