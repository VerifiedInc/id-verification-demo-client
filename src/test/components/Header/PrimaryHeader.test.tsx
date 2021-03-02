import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import PrimaryHeader from '../../../components/Header/PrimaryHeader';

describe('PrimaryHeader', () => {
  it('renders a header with a classname of primary-header', () => {
    render(<PrimaryHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Link 1').closest('header')).toHaveClass('primary-header');
  });

  it('renders two links', () => {
    render(<PrimaryHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('renders a right side tab', () => {
    render(<PrimaryHeader />, { wrapper: MemoryRouter });
    expect(screen.getByText('Right side tab')).toBeInTheDocument();
  });
});
