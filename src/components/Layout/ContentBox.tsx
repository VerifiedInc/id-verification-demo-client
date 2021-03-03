import { FC } from 'react';
import './ContentBox.css';

const ContentBox: FC = ({ children = null }) => (
  <div className='content-box'>
    {children}
  </div>
);

export default ContentBox;
