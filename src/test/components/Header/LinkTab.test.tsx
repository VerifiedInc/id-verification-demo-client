import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import LinkTab from '../../../components/Header/LinkTab';

describe('LinkTab', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<LinkTab to='test'><Child /></LinkTab>, { wrapper: MemoryRouter });
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders an element with a link-tab class', () => {
    const Child = () => <div>test child</div>;
    render(<LinkTab to='test'><Child /></LinkTab>, { wrapper: MemoryRouter });
    const linkTab = screen.getByText('test child').parentElement?.parentElement;
    expect(linkTab).toBeInTheDocument();
    expect(linkTab).toHaveClass('link-tab');
  });

  it('adds custom class names', () => {
    const Child = () => <div>test child</div>;
    render(<LinkTab to='test' className='test-class'><Child /></LinkTab>, { wrapper: MemoryRouter });
    const linkTab = screen.getByText('test child').parentElement?.parentElement;
    expect(linkTab).toHaveClass('tab link-tab test-class');
  });

  it('renders a link to the to prop', () => {
    const Child = () => <div>test child</div>;
    render(<LinkTab to='test' className='test-class'><Child /></LinkTab>, { wrapper: MemoryRouter });
    const link = screen.getByText('test child').closest('a');
    expect(link).toHaveAttribute('href', '/test');
  });
});
