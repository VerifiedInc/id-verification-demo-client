import { Link } from 'react-router-dom';

import { FCWithClassName } from '../../types';
import Tab from './Tab';

import './LinkTab.css';

interface LinkTabProps {
  to: string;
}

const LinkTab: FCWithClassName<LinkTabProps> = ({ children = null, className = undefined, to = '' }) => {
  const classNames = className ? `link-tab ${className}` : 'link-tab';
  return (
    <Tab className={classNames}><Link to={to}>{children}</Link></Tab>
  );
};

export default LinkTab;
