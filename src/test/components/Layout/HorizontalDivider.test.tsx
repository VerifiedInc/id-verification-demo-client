import { render, screen } from '@testing-library/react';

import HorizontalDivider from '../../../components/Layout/HorizontalDivider';

describe('HorizontalDivider', () => {
  it('renders text', () => {
    render(<HorizontalDivider text='test text' />);
    expect(screen.getByText('test text')).toBeInTheDocument();
  });

  it('renders a div with a class of horizontal-divider', () => {
    render(<HorizontalDivider text='test text' />);
    expect(screen.getByText('test text').closest('div')).toHaveClass('horizontal-divider');
  });
});
