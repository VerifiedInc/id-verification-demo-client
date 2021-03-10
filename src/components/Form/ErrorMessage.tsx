import { FC } from 'react';

import './ErrorMessage.css';

const ErrorMessage: FC = ({ children = null }) =>
  <div className='error-message'>{children}</div>;

export default ErrorMessage;
