import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import AltHeader from '../../../components/Header/AltHeader';

describe('AltHeader', () => {
  it('renders a header with a classname of alternate-header', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Link 1').closest('header')).toHaveClass('alternate-header');
  });

  it('renders two links', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('renders a right side tab', () => {
    render(<AltHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Right side tab')).toBeInTheDocument();
  });
});
