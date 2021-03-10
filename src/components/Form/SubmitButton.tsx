import { FC, MouseEventHandler } from 'react';

import './SubmitButton.css';

interface SubmitButtonProps {
  handleSubmit: MouseEventHandler;
  disabled?: boolean;
  text?: string;
}

const SubmitButton: FC<SubmitButtonProps> = ({ handleSubmit, disabled = false, children = 'Submit' }) => {
  return (
    <button className='submit-button' type='submit' onClick={handleSubmit} disabled={disabled}>{children}</button>
  );
};

export default SubmitButton;
