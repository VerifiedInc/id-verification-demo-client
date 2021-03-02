import { render, screen } from '@testing-library/react';

import HeaderRight from '../../../components/Header/HeaderRight';

describe('HeaderRight component', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderRight><Child /></HeaderRight>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a header element with a header-right class', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderRight><Child /></HeaderRight>);
    const component = screen.getByText('test child').parentElement;
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass('header-right');
  });

  it('adds custom class names', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderRight className='test-class'><Child /></HeaderRight>);
    const header = screen.getByText('test child').parentElement;
    expect(header).toHaveClass('header-right test-class');
  });
});
