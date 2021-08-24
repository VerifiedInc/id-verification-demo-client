import { FCWithClassName } from '../../types';
import { useIsMobile } from '../../hooks/useIsMobile';

import './HeaderRight.css';

const HeaderRight: FCWithClassName = ({ children = null, className = undefined }) => {
  const isMobile = useIsMobile();
  const classNames = className ? `header-right ${className}` : 'header-right';
  return (
    <div className={classNames}>{isMobile ? null : children}</div>
  );
};

export default HeaderRight;
