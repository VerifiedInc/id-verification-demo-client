import { render, screen } from '@testing-library/react';

import Header from '../../../components/Header/Header';

describe('Header component', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<Header><Child /></Header>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a header element with a header class', () => {
    const Child = () => <div>test child</div>;
    render(<Header><Child /></Header>);
    const header = screen.getByText('test child').closest('header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass('header');
  });

  it('adds custom class names', () => {
    const Child = () => <div>test child</div>;
    render(<Header className='test-class'><Child /></Header>);
    const header = screen.getByText('test child').closest('header');
    expect(header).toHaveClass('header test-class');
  });
});
