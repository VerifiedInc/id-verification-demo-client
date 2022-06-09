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
import { config } from '../config';
import { getFakeDob } from '../utils';

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

  // const urlQueryParams: string = window.location.search;
  // const queryParams = new URLSearchParams(urlQueryParams);
  // const dob = queryParams.get('dob');
  // setEmail(dob as string); // TODO update: email is being used for dob... this should be fixed.

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };

  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFirstName(e.target.value);
  };

  const handleStart: MouseEventHandler = async (e) => {
    e.preventDefault();

    debugger;
    // get hv auth token
    const hyperVergeAuthService = backendClient.service('hyperVergeAuth');
    // TODO add auth with backend service
    const responseAuth = await hyperVergeAuthService.create({});
    localStorage.setItem('authToken', responseAuth.result.token);
    debugger;

    // // kick off prove sms
    // // TODO add auth with backend
    // const proveAuthUrlService = backendClient.service('getAuthUrl');
    // const responseAuthUrl = await proveAuthUrlService.create({
    //   mobileNumber: phone
    // });
    // // TODO ensure success response
  };

  const handleDocScan: MouseEventHandler = (e) => {
    // e.preventDefault();
    localStorage.setItem('doKyc', 'true');
  };

  const mobileNumber = phone || '4044327575'; // TODO remove, added for easier testing

  const handlePreFill1: MouseEventHandler = async (e) => {
    e.preventDefault();

    /**
     * NOTE: Maybe want to just point blank ask for the DOB in the form input and compare against the hyper verge doc scan info prior to kicking off the prove prefill flow...?
     */

    // kick off prove sms
    // TODO add auth with backend
    const proveAuthUrlService = backendClient.service('getAuthUrl');
    const kyc = JSON.parse(localStorage.getItem('kycInfo') as string);

    debugger;
    const responseAuthUrl = await proveAuthUrlService.create({
      mobileNumber,
      dob: kyc.data.dateOfBirth // from the hv doc scan... will present the query params of the resultant sms link.
    });
    // TODO ensure success response
  };

  const handlePreFill2: MouseEventHandler = async (e) => {
    e.preventDefault();
    const kyc = JSON.parse(localStorage.getItem('kycInfo') as string);
    console.log(kyc.data);

    const urlQueryParams: string = window.location.search;
    const queryParams = new URLSearchParams(urlQueryParams);

    const verificationFingerprint = queryParams.get('vfp');
    const dob = queryParams.get('dob');

    const mobileNumber = phone || '4044327575'; // TODO remove, added for easier testing
    const fakeDob = getFakeDob(mobileNumber);

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
      phoneNumber: mobileNumber,
      minTrustScore: 500
    });
    debugger;

    const identityService = backendClient.service('identity');
    // TODO add auth with backend service
    const responseIdentity = await identityService.create({
      dob: fakeDob,
      // dob: kyc.data.dateOfBirth, // NOTE: can't actually do this because this is after the sms link soo... need to get from query params like below
      // dob, // TODO the dob query param needs to be used, but can't because staging data is not what's on my document
      phoneNumber: mobileNumber
    });

    const { userCode, issuerDid } = responseIdentity;

    debugger;
    // TODO check 200 success response from backend
    // redirect to wallet client with query params for user to create DID
    window.location.href = `${config.walletClientUrl}/authenticate?userCode=${userCode}&issuer=${issuerDid}`;
    debugger;
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <p>You need to (1) create an account and (2) use the Unum ID wallet to view and share credentials.</p>
      <p>
        <BoldFont>Important:</BoldFont> you will need to click the link that is in the text message sent to you. This is to confirm your mobile number as well as identity information for the identify verification step.
        This shows that Unum ID can be used <Italic>in conjunction with</Italic> an existing identity verification provider.
        We can also fully replace that system, using the technologies used here.
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
                  labelText='Phone'
                  inputId='phone'
                  type='text'
                  onChange={handlePhoneChange}
                  value={phone}
                  explainerBoldText='Use your real mobile number:'
                  explainerText='Enter this to facilitate identity verification via SMS.'
                />
                <SubmitButton handleSubmit={handleStart}><BoldFont>Start</BoldFont></SubmitButton>&nbsp;
                <SubmitButton handleSubmit={handleDocScan}><BoldFont>Documentation Scan</BoldFont></SubmitButton>&nbsp;
                <SubmitButton handleSubmit={handlePreFill1}><BoldFont>PreFill Step 1 From Desktop</BoldFont></SubmitButton>&nbsp;
                <SubmitButton handleSubmit={handlePreFill2}><BoldFont>PreFill Step 2 From Mobile</BoldFont></SubmitButton>
                <ErrorMessage>{formErrorMessage}</ErrorMessage>
              </form>
              <div>
                By creating an account you agree to our <a href='https://www.unumid.co/legal-materials/terms-of-service'>terms of service</a> and <a href='https://www.unumid.co/legal-materials/privacy-policy'>privacy policy</a>.
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
