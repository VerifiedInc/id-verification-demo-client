import { FCWithClassName } from '../../types';
import './BoldFont.css';

const BoldFont: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `bold-font ${className}` : 'bold-font';
  return (
    <span className={classNames}>{children}</span>
  );
};

export default BoldFont;
