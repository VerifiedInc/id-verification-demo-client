import { screen, render } from '@testing-library/react';

import AltHeader from '../../../components/Header/AltHeader';

describe('AltHeader', () => {
  it('renders a header with a classname of alternate-header and the Acme logo', () => {
    render(<AltHeader />);
    expect(screen.getByAltText('ACME, Inc.').closest('header')).toHaveClass('alternate-header');
  });

  it('renders bars and search icons', () => {
    render(<AltHeader />);
    expect(screen.getByTitle('bars')).toBeInTheDocument();
    expect(screen.getByTitle('search')).toBeInTheDocument();
  });
});
