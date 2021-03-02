import { FCWithClassName } from '../../types';

import './Header.css';

const Header: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `header ${className}` : 'header';
  return (
    <header className={classNames}>{children}</header>
  );
};

export default Header;
