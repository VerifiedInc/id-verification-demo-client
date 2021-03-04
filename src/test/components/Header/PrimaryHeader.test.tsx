import { screen, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PrimaryHeader from '../../../components/Header/PrimaryHeader';
import { store } from '../../../state';

describe('PrimaryHeader', () => {
  const component = <Provider store={store}><MemoryRouter><PrimaryHeader /></MemoryRouter></Provider>;
  it('renders a header with a classname of primary-header', () => {
    render(component);
    expect(screen.getByText('Link 1').closest('header')).toHaveClass('primary-header');
  });

  it('renders two links', () => {
    render(component);
    expect(screen.getByText('Link 1')).toBeInTheDocument();
    expect(screen.getByText('Link 2')).toBeInTheDocument();
  });

  it('renders a Logout tab', () => {
    render(component);
    expect(screen.getByText('LOGOUT')).toBeInTheDocument();
  });

  it('renders a right side tab', () => {
    render(component);
    expect(screen.getByText('Right side tab')).toBeInTheDocument();
  });
});
