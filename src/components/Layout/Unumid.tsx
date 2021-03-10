import { FC } from 'react';

import './Unumid.css';

export const Unumid: FC = ({ children = null }) => {
  return (
    <div className='unum-id'>
      {children}
    </div>
  );
};

export default Unumid;
