import { render, screen } from '@testing-library/react';

import Unumid from '../../../components/Layout/Unumid';

describe('Unumid', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<Unumid><Child /></Unumid>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of unum-id', () => {
    const Child = () => <div>test child</div>;
    render(<Unumid><Child /></Unumid>);
    expect(screen.getByText('test child').parentElement).toHaveClass('unum-id');
  });
});
