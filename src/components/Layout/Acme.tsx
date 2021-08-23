import { FC } from 'react';

import Footer from './Footer';

import './Acme.css';

export const Acme: FC = ({ children = null }) => {
  return (
    <div className='acme'>
      {children}
      <div className='spacer' />
      <Footer />
    </div>
  );
};

export default Acme;
