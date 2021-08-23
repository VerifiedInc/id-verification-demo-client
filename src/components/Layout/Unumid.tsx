import { FC } from 'react';
import Footer from './Footer';

import './Unumid.css';

export const Unumid: FC = ({ children = null }) => {
  return (
    <div className='unum-id'>
      <div className='unum-id-inner'>
        {children}
      </div>
      <div className='spacer' />
      <Footer />
    </div>
  );
};

export default Unumid;
