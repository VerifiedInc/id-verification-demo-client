import { render, screen } from '@testing-library/react';

import Footer from '../../../components/Layout/Footer';

describe('footer', () => {
  it('renders a bug report button', () => {
    render(<div id='root'><Footer /></div>);

    expect(screen.getByText('Report a Bug')).toBeInTheDocument();
  });
});
