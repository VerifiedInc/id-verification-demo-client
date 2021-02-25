import { render } from '@testing-library/react';

import App from '../../components/App';

describe('app', () => {
  it('doesn\'t crash', () => {
    expect(() => render(<App />)).not.toThrow();
  });
});
