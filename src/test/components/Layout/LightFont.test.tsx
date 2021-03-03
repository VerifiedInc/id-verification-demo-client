import { render, screen } from '@testing-library/react';

import LightFont from '../../../components/Layout/LightFont';

describe('LightFont', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<LightFont><Child /></LightFont>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of light-font', () => {
    const Child = () => <div>test child</div>;
    render(<LightFont><Child /></LightFont>);
    expect(screen.getByText('test child').parentElement).toHaveClass('light-font');
  });
});
