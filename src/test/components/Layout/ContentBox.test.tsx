import { render, screen } from '@testing-library/react';

import ContentBox from '../../../components/Layout/ContentBox';

describe('ContentBox', () => {
  it('renders children', () => {
    const Child = () => <div>test child</div>;
    render(<ContentBox><Child /></ContentBox>);
    expect(screen.getByText('test child')).toBeInTheDocument();
  });

  it('renders a div with a class of content-box', () => {
    const Child = () => <div>test child</div>;
    render(<ContentBox><Child /></ContentBox>);
    expect(screen.getByText('test child').parentElement).toHaveClass('content-box');
  });
});
