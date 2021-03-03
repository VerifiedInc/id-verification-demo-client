import { render, screen } from '@testing-library/react';

import MainContent from '../../../components/Layout/MainContent';

describe('MainContent', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<MainContent><Child /></MainContent>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of main-content', () => {
    const Child = () => <div>test child</div>;
    render(<MainContent><Child /></MainContent>);
    expect(screen.getByText('test child').parentElement).toHaveClass('main-content');
  });
});
