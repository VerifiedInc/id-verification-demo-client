import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import InputGroup, { Props } from '../../../components/Form/InputGroup';

describe('InputGroup component', () => {
  let props: Props;

  beforeEach(() => {
    props = {
      onChange: jest.fn(),
      inputId: 'test-input-id',
      labelText: 'test label',
      placeholderText: 'test placeholder',
      explainerBoldText: 'bold text',
      explainerText: 'explainer text',
      value: 'test value'
    };
  });

  it('shows the correct label', () => {
    render(<InputGroup {...props} />);
    expect(screen.getByLabelText('test label', { exact: false })).toBeDefined();
  });

  it('shows the correct placeholder', () => {
    render(<InputGroup {...props} />);
    expect(screen.getByPlaceholderText('test placeholder')).toBeDefined();
  });

  it('shows the correct value', () => {
    render(<InputGroup {...props} />);
    expect(screen.getByDisplayValue('test value')).toBeDefined();
  });

  it('shows the bold text', () => {
    render(<InputGroup {...props} />);
    expect(screen.getByText('bold text')).toBeDefined();
  });

  it('shows the explainer text', () => {
    render(<InputGroup {...props} />);
    expect(screen.getByText('explainer text')).toBeDefined();
  });

  it('does not show an asterisk if the input is not required', () => {
    render(<InputGroup {...props} />);
    expect(screen.queryByText('*')).toBeNull();
  });

  it('shows an asterisk if the input is required', () => {
    props.required = true;
    render(<InputGroup {...props} />);
    expect(screen.getByText('*')).toBeDefined();
  });

  it('disables the input correctly', () => {
    props.disabled = true;
    render(<InputGroup {...props} />);
    const input = screen.getByLabelText('test label', { exact: false }) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  it('handles change correctly', () => {
    render(<InputGroup {...props} />);
    const input = screen.getByLabelText('test label', { exact: false }) as HTMLInputElement;
    userEvent.type(input, 'a');
    expect(props.onChange).toBeCalled();
  });
});
