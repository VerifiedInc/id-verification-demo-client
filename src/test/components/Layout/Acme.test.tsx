import { render, screen } from '@testing-library/react';

import Acme from '../../../components/Layout/Acme';

describe('Acme', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<Acme><Child /></Acme>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of acme', () => {
    const Child = () => <div>test child</div>;
    render(<Acme><Child /></Acme>);
    expect(screen.getByText('test child').parentElement).toHaveClass('acme');
  });
});
