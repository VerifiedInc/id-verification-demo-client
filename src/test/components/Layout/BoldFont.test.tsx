import { render, screen } from '@testing-library/react';

import BoldFont from '../../../components/Layout/BoldFont';

describe('BoldFont', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<BoldFont><Child /></BoldFont>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of Bold-font', () => {
    const Child = () => <div>test child</div>;
    render(<BoldFont><Child /></BoldFont>);
    expect(screen.getByText('test child').parentElement).toHaveClass('bold-font');
  });
});
