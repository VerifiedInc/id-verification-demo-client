import { FCWithClassName } from '../../types';

import './Tab.css';

const Tab: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `tab ${className}` : 'tab';
  return (
    <div className={classNames}>{children}</div>
  );
};

export default Tab;
