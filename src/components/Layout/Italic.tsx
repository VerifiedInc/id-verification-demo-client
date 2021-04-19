import { FCWithClassName } from '../../types';
import './Italic.css';

const Italic: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `italic ${className}` : 'italic';
  return (
    <span className={classNames}>{children}</span>
  );
};

export default Italic;
