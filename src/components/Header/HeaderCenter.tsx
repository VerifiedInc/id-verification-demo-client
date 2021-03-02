import { FCWithClassName } from '../../types';

import './HeaderCenter.css';

const HeaderCenter: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `header-center ${className}` : 'header-center';
  return (
    <div className={classNames}>{children}</div>
  );
};

export default HeaderCenter;
