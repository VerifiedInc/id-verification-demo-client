import { FC, ChangeEventHandler } from 'react';

import Required from './Required';
import './InputGroup.css';
import BoldFont from '../Layout/BoldFont';

export interface Props {
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputId: string;
  labelText: string;
  placeholderText?: string;
  explainerText?: string;
  explainerBoldText?: string;
  value: string;
  required?: boolean;
  type?: string;
  autoCapitalize?: string;
}

const InputGroup: FC<Props> = ({
  disabled = false,
  onChange,
  inputId,
  labelText,
  placeholderText = labelText,
  explainerText,
  explainerBoldText,
  value,
  required = false,
  type = 'text',
  autoCapitalize = 'none'
}) => (
  <div className='input-group'>
    <label htmlFor={inputId}>
      <div>
        <div className='input-group-label'>{required && <Required />}<BoldFont>{labelText}</BoldFont></div>
        <input
          type={type}
          id={inputId}
          onChange={onChange}
          placeholder={placeholderText}
          value={value}
          disabled={disabled}
          autoCapitalize={autoCapitalize}
        />
      </div>
      <div className='input-explainer'>
        <BoldFont>{explainerBoldText}&nbsp;</BoldFont>
        {explainerText}
      </div>
    </label>
  </div>
);

export default InputGroup;
