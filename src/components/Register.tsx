import { ChangeEventHandler, FC, MouseEventHandler, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import validator from 'validator';

import InputGroup from './Form/InputGroup';
import SubmitButton from './Form/SubmitButton';
import ErrorMessage from './Form/ErrorMessage';
import BoldFont from './Layout/BoldFont';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import './Register.css';
import Italic from './Layout/Italic';

import axios from 'axios';
import { backendClient } from '../feathers';

const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password] = useState('password');
  const [formErrorMessage, setFormErrorMessage] = useState('');

  const { createUser } = useActionCreators();
  const { loggedInUser, error: loginError } = useTypedSelector(state => state.auth);
  const { error: userError } = useTypedSelector(state => state.user);

  if (userError && !formErrorMessage) {
    console.error('error creating user account', userError);
    setFormErrorMessage('Error creating account');
  }

  if (loginError && !formErrorMessage) {
    console.error('error logging in', loginError);
    setFormErrorMessage('Error logging in');
  }

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };

  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };

  const handleSubmit: MouseEventHandler = async (e) => {
    // e.preventDefault();

    // const invalidFields = [];
    // if (!validator.isEmail(email)) {
    //   invalidFields.push('Email');
    // }

    // if (phone && !validator.isMobilePhone(phone)) {
    //   invalidFields.push('Phone');
    // }

    // if (invalidFields.length > 0) {
    //   setFormErrorMessage(`The following fields are invalid: ${invalidFields.join(', ')}`);
    //   return;
    // }

    // createUser({ email, password, phone, firstName });

    // auth with hyper verge NOTE: NEED TO GET THE AUTH TOKEN FROM BACKEND
    // debugger;
    // const response = await axios.post('https://auth.hyperverge.co/login', {
    //   appId: 'f5q5lt',
    //   appKey: 'i9043jskn7ljwtgczjvq',
    //   expiry: 300
    // });
    // localStorage.setItem('authToken', response.data.result.token);

    localStorage.setItem('doKyc', 'true');
  };

  const handleUndo: MouseEventHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem('doKyc');
    localStorage.removeItem('authToken');
  };

  const handlePreFill: MouseEventHandler = async (e) => {
    e.preventDefault();
    const kyc = JSON.parse(localStorage.getItem('kycInfo') as string);
    console.log(kyc.data);

    // const [searchParams, setSearchParams] = useSearchParams();
    // const verificationFingerprint = searchParams.get('vfp');
    const urlQueryParams: string = window.location.search;
    const queryParams = new URLSearchParams(urlQueryParams);
    const verificationFingerprint = queryParams.get('vfp');
    // const verificationFingerprint = '4d4751775a446b314f4759745a6a513359693030597a526c4c546c6c4f5459744f4449785a5445354d3252684f4755316644413d3a121a9448d3567789b564295f8a195ec96b16aeebf8283ad33ba6dc73cc98cc25';
    debugger;
    const authPathService = backendClient.service('getAuthPath');
    // TODO add auth with backend service
    const responseAuthPath = await authPathService.create({
      verificationFingerprint
    });
    debugger;
    // TODO ensure success response

    const eligibilityService = backendClient.service('eligibility');
    // TODO add auth with backend service
    const responseEligibility = await eligibilityService.create({
      phoneNumber: '14044327575', // TODO get from form input
      minTrustScore: 500
    });
    debugger;

    const identityService = backendClient.service('identity');
    // TODO add auth with backend service
    const responseIdentity = await identityService.create({
      dob: '1979-05-23', // TODO get from HyperVerge
      phoneNumber: '14044327575' // TODO get from form input
    });
    debugger;
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <p>You need to (1) create an account and (2) install the ACME app from the app store.</p>
      <p>
        <BoldFont>Important:</BoldFont> the email and password here simulate what ACME already has in place, prior to implementing Unum ID.
        This shows that Unum ID can be used <Italic>on top of</Italic> an existing account system for additional authentication factors.
        It can also fully replace that system, thereby eliminating passwords altogether.
        We generally recommend a gradual transition from legacy password systems to a fully passwordless approach.
      </p>
      {
        loggedInUser
          ? (
            <>
              <h2>2. Install ACME App</h2>
              <p>
                Great, you're registered! Now, install the ACME app for <a href='https://apps.apple.com/us/app/acme-unum-id/id1557576599'>iOS</a> or <a href='https://play.google.com/store/apps/details?id=org.unumid.acmedemokotlin.sandbox&hl=en_GB&gl=US'>Android</a>.
              </p>
              <p>
                You can get there by clicking the links above, scanning the QR Code below, or searching "ACME Unum ID" on the app stores.
                The app will ask you for your permission to send push notifications.&nbsp;
                <BoldFont>This is optional, </BoldFont>
                but it will allow you to see how users can authenticate with push notifications.
              </p>
              <p>
                When you&apos;re logged in to the ACME app,
                click the button below to continue the demo.
              </p>
              <Link to='/'><button type='button'>Continue</button></Link>
            </>
            )
          : (
            <>
              <form>
                <h2>1. Create Account</h2>
                <InputGroup
                  required
                  labelText='Email'
                  inputId='email'
                  type='text'
                  onChange={handleEmailChange}
                  value={email}
                  disabled={false}
                  explainerBoldText='Use a real email:'
                  explainerText='This is where we&apos;ll send your installation link'
                />

                <InputGroup
                  required
                  labelText='Password'
                  inputId='password'
                  type='password'
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  onChange={() => { }}
                  value={password}
                  disabled
                  explainerBoldText='This password is not checked'
                />

                <InputGroup
                  required
                  labelText='First Name'
                  inputId='first-name'
                  type='text'
                  onChange={handleFirstNameChange}
                  value={firstName}
                  disabled={false}
                  explainerBoldText='Your first name:'
                  explainerText='We&apos;ll display this to show you when you&apos;ve authenticated'
                />

                <InputGroup
                  labelText='Phone'
                  inputId='phone'
                  type='text'
                  onChange={handlePhoneChange}
                  value={phone}
                  explainerBoldText='Optional:'
                  explainerText='Enter this to see how users can authenticate with links sent by SMS.'
                />
                <SubmitButton handleSubmit={handleSubmit}><BoldFont>KYC</BoldFont></SubmitButton>
                <SubmitButton handleSubmit={handleUndo}><BoldFont>Stop KYC</BoldFont></SubmitButton>
                <SubmitButton handleSubmit={handlePreFill}><BoldFont>Start PreFill</BoldFont></SubmitButton>
                <ErrorMessage>{formErrorMessage}</ErrorMessage>
              </form>
              <div>
                By creating an account you agree to our <a href='https://unum.id/terms-of-service.html'>terms of service</a> and <a href='https://unum.id/privacy-policy.html'>privacy policy</a>.
              </div>
              <div className='login-link'>
                Already registered?&nbsp;<Link to='/login'>Log in here.</Link>
              </div>
            </>
            )
      }
    </div>
  );
};

export default Register;
