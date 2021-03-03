import { FC } from 'react';

import LightFont from './LightFont';

import './HorizontalDivider.css';

const HorizontalDivider: FC<{ text?: string }> = ({ text = 'OR' }) => (
  <div className='horizontal-divider'>
    <hr className='left' />
    <h2><LightFont>{text}</LightFont></h2>
    <hr className='right' />
  </div>
);

export default HorizontalDivider;
