
import { useState, FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './HeaderLeft.css';

const HeaderLeft: FC = ({ children = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabsClassName = isOpen ? 'header-left-tabs header-left-tabs-open' : 'header-left-tabs header-left-tabs-closed';
  return (
    <div className='header-left'>
      <FontAwesomeIcon
        className='header-left-hamburger'
        icon={faBars}
        size='lg'
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={tabsClassName}>
        {children}
      </div>
    </div>
  );
};

export default HeaderLeft;
