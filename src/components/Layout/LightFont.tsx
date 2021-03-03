import { FCWithClassName } from '../../types';
import './LightFont.css';

const FontLight: FCWithClassName = ({ children = null, className = undefined }) => {
  const classNames = className ? `light-font ${className}` : 'light-font';
  return (
    <span className={classNames}>{children}</span>
  );
};

export default FontLight;
