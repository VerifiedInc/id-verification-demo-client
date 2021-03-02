import { render, screen } from '@testing-library/react';

import HeaderCenter from '../../../components/Header/HeaderCenter';

describe('HeaderCenter component', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderCenter><Child /></HeaderCenter>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a header element with a header-center class', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderCenter><Child /></HeaderCenter>);
    const component = screen.getByText('test child').parentElement;
    expect(component).toBeInTheDocument();
    expect(component).toHaveClass('header-center');
  });

  it('adds custom class names', () => {
    const Child = () => <div>test child</div>;
    render(<HeaderCenter className='test-class'><Child /></HeaderCenter>);
    const header = screen.getByText('test child').parentElement;
    expect(header).toHaveClass('header-center test-class');
  });
});
