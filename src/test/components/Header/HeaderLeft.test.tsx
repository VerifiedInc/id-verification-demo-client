import { render, screen } from '@testing-library/react';

import HeaderLeft from '../../../components/Header/HeaderLeft';

describe('HeaderLeft component', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderLeft><Child /></HeaderLeft>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a header element with a header-left class', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderLeft><Child /></HeaderLeft>);
    const component = screen.getByText('test child').parentElement?.parentElement;
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass('header-left');
  });
});
