import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import validator from 'validator';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActionCreators } from '../hooks/useActionCreators';
import InputGroup from './Form/InputGroup';
import SubmitButton from './Form/SubmitButton';
import ErrorMessage from './Form/ErrorMessage';
import { Link, Redirect } from 'react-router-dom';
import BoldFont from './Layout/BoldFont';

export enum ErrorMessages {
  INVALID_EMAIL = 'Email is invalid.',
  LOGIN_ERROR = 'Error logging in.'
}

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useActionCreators();
  const { loggedInUser, error: authError } = useTypedSelector(state => state.auth);
  const password = 'password';

  if (loggedInUser) {
    return <Redirect to='/' />;
  }

  if (authError && errorMessage !== ErrorMessages.LOGIN_ERROR) {
    setErrorMessage(ErrorMessages.LOGIN_ERROR);
  }

  const handleSubmit: MouseEventHandler = (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setErrorMessage(ErrorMessages.INVALID_EMAIL);
      return;
    }
    login({ email, password });
  };

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className='login'>
      <h1>Log In</h1>
      <form>
        <InputGroup
          required
          labelText='Email'
          inputId='email'
          type='text'
          onChange={handleEmailChange}
          value={email}
          explainerText='This is the email you registered with'
        />
        <InputGroup
          required
          disabled
          labelText='Password'
          inputId='password'
          type='text'
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onChange={() => {}}
          value='••••••••'
          explainerBoldText='For demo purposes only:'
          explainerText='This password is hard coded'
        />
        <SubmitButton
          handleSubmit={handleSubmit}
          disabled={!email}
        >
          <BoldFont>Log In</BoldFont>
        </SubmitButton>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <div className='register-link'>
          Don&apos;t have an account yet? <Link to='/register'>Register here.</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
