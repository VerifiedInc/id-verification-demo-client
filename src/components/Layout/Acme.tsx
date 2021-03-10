import { FC } from 'react';

import './Acme.css';

export const Acme: FC = ({ children = null }) => {
  return (
    <div className='acme'>
      {children}
    </div>
  );
};

export default Acme;
