import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useState
} from 'react';

import InputGroup from './Form/InputGroup';
import SubmitButton from './Form/SubmitButton';
import BoldFont from './Layout/BoldFont';

import './Register.css';
import Italic from './Layout/Italic';

import { backendClient } from '../feathers';
import { config } from '../config';
import { getFakeDob } from '../utils';

// types for global variables added by the hyperverge sdk
declare global {
  interface Window {
    HyperKycConfig?: any;
    Face?: any;
    Document?: any;
    HyperKYCModule?: any;
  }
}

interface KYCData {
  address: string;
  age: string;
  dob: string;
  gender: string;
  fullName: string;
  idType: string;
}

const makeHandler = (callback: (data: KYCData) => void) => (HyperKycResult: any) => {
  if (HyperKycResult.Cancelled) {
    // user cancelled
    console.log('hyperverge cancelled', HyperKycResult);
  } else if (HyperKycResult.Failure) {
    // fail
    console.log('hyperverge failed', HyperKycResult);
  } else if (HyperKycResult.Success) {
    // success
    console.log('hyperverge success', HyperKycResult);
    const { address, age, dateOfBirth, fullName, idType, gender } = HyperKycResult.Success.data.docListData[0].responseResult.result.details[0].fieldsExtracted;
    const proveDob = dateOfBirth.value.split('-');
    const hold = proveDob[2];
    proveDob[2] = proveDob[1];
    proveDob[1] = proveDob[0];
    proveDob[0] = hold;
    const dob = proveDob.join('-');

    // eslint-disable-next-line node/no-callback-literal
    callback({
      address,
      age,
      dob,
      fullName,
      idType,
      gender
    });

    console.log('success');
  }
};

const Register: FC = () => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };

  /**
   * calls prove auth service to send an auth url via sms
   */
  const sendProveSms = async (dob?: string) => {
    /**
     * NOTE: Maybe want to just point blank ask for the DOB in the form input and compare against the hyper verge doc scan info prior to kicking off the prove prefill flow...?
     */

    // kick off prove sms
    // TODO add auth with backend
    const proveAuthUrlService = backendClient.service('getAuthUrl');

    const responseAuthUrl = await proveAuthUrlService.create({
      mobileNumber: phone,
      dob // from the hv doc scan... will present the query params of the resultant sms link.
    });
    // TODO ensure success response
  };

  const handleDocScan: MouseEventHandler = async (e) => {
    e.preventDefault();

    // get hyperverge access token
    const hyperVergeAuthService = backendClient.service('hyperVergeAuth');
    // TODO add auth with backend service
    const responseAuth = await hyperVergeAuthService.create({});
    const accessToken = responseAuth.result.token;

    // hyperverge document scan setup
    const defaultDocumentId = 'dl';
    const defaultCountryId = 'usa';
    const transactionId = '1';
    const document2 = new window.Document(true, defaultCountryId, defaultDocumentId);
    const face = new window.Face();
    const workflow = [document2, face];
    const hyperKycConfig = new window.HyperKycConfig(accessToken, workflow, transactionId, defaultCountryId);

    const callback = (data: KYCData) => {
      sendProveSms(data.dob);
    };

    const handler = makeHandler(callback);

    window.HyperKYCModule.launch(hyperKycConfig, handler);
  };

  const handlePreFill2: MouseEventHandler = async (e) => {
    e.preventDefault();

    const urlQueryParams: string = window.location.search;
    const queryParams = new URLSearchParams(urlQueryParams);

    const verificationFingerprint = queryParams.get('vfp');
    const dob = queryParams.get('dob');
    const qPhone = queryParams.get('phone');

    // use the phone via the query params from the sms redirect from prove...
    // TODO this value should not be editable is phone is in the query param
    const mobileNumber = phone || qPhone || '4044327575';
    const fakeDob = getFakeDob(mobileNumber);

    const authPathService = backendClient.service('getAuthPath');
    // TODO add auth with backend service
    const responseAuthPath = await authPathService.create({
      verificationFingerprint
    });
    // TODO ensure success response

    const eligibilityService = backendClient.service('eligibility');
    // TODO add auth with backend service
    const responseEligibility = await eligibilityService.create({
      phoneNumber: mobileNumber,
      minTrustScore: 500
    });

    const identityService = backendClient.service('identity');
    // TODO add auth with backend service
    const responseIdentity = await identityService.create({
      dob: fakeDob,
      // dob: kyc.data.dateOfBirth, // NOTE: can't actually do this because this is after the sms link soo... need to get from query params like below
      // dob, // TODO the dob query param needs to be used, but can't because staging data is not what's on my document
      phoneNumber: mobileNumber
    });

    const { userCode, issuerDid } = responseIdentity;

    // TODO check 200 success response from backend
    // redirect to wallet client with query params for user to create DID
    window.location.href = `${config.walletClientUrl}/authenticate?userCode=${userCode}&issuer=${issuerDid}`;
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
        <SubmitButton handleSubmit={handleDocScan}><BoldFont>Documentation Scan</BoldFont></SubmitButton>&nbsp;
        <SubmitButton handleSubmit={handlePreFill2}><BoldFont>PreFill Step 2 From Mobile</BoldFont></SubmitButton>
      </form>
      <div>
        By creating an account you agree to our <a href='https://www.unumid.co/legal-materials/terms-of-service'>terms of service</a> and <a href='https://www.unumid.co/legal-materials/privacy-policy'>privacy policy</a>.
      </div>
    </div>
  );
};

export default Register;
