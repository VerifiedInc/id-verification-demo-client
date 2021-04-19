import { render, screen } from '@testing-library/react';

import Italic from '../../../components/Layout/Italic';

describe('Italic', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<Italic><Child /></Italic>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of italic', () => {
    const Child = () => <div>test child</div>;
    render(<Italic><Child /></Italic>);
    expect(screen.getByText('test child').parentElement).toHaveClass('italic');
  });
});
