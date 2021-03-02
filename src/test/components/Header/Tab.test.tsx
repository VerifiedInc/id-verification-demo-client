import { render, screen } from '@testing-library/react';

import Tab from '../../../components/Header/Tab';

describe('Tab component', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<Tab><Child /></Tab>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div element with a tab class', () => {
    const Child = () => <div>test child</div>;
    render(<Tab><Child /></Tab>);
    const tab = screen.getByText('test child').parentElement;
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveClass('tab');
  });

  it('adds custom class names', () => {
    const Child = () => <div>test child</div>;
    render(<Tab className='test-class'><Child /></Tab>);
    const tab = screen.getByText('test child').parentElement;
    expect(tab).toHaveClass('tab test-class');
  });
});
