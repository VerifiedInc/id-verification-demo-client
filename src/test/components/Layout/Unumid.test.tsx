import { render, screen } from '@testing-library/react';

import Unumid from '../../../components/Layout/Unumid';

describe('Unumid', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<div id='root'><Unumid><Child /></Unumid></div>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of unum-id', () => {
    const Child = () => <div>test child</div>;
    render(<div id='root'><Unumid><Child /></Unumid></div>);
    expect(screen.getByText('test child').parentElement?.parentElement).toHaveClass('unum-id');
  });

  it('renders footer with bug report button', () => {
    render(<div id='root'><Unumid /></div>);
    expect(screen.getByText('Report a Bug')).toBeInTheDocument();
  });
});
