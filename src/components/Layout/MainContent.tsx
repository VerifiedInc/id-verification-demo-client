import { FC } from 'react';
import './MainContent.css';

const MainContent: FC = ({ children = null }) => (
  <div className='main-content'>
    {children}
  </div>
);

export default MainContent;
