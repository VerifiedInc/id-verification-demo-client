/* eslint-disable react/jsx-closing-tag-location */
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useState,
  useEffect
} from 'react';

import InputGroup from './Form/InputGroup';
import SubmitButton from './Form/SubmitButton';
import BoldFont from './Layout/BoldFont';

import './Register.css';
import Italic from './Layout/Italic';
import { v1 } from 'uuid';

import { backendClient } from '../feathers';
import { config } from '../config';
import { useSearchParams } from 'react-router-dom';

import { KYCData as _KYCData, HvClientResponse, HyperVergeResponse } from '@unumid/id-verification-types';

declare global {
  interface Window {
    HyperKycConfig?: any;
    Face?: any;
    Document?: any;
    HyperKYCModule?: any;
  }
}

const makeHvHandler = (callback: (data: HvClientResponse) => void) => (HyperKycResult: any) => {
  switch (HyperKycResult.status) {
    case 'user_cancelled':
      // user cancelled
      console.log('hyperverge cancelled', HyperKycResult);
      break;
    case 'error':
      // failure
      console.log('hyperverge error', HyperKycResult);
      break;
    case 'auto_approved':
    case 'auto_declined':
    case 'needs_review':
      // workflow success
      break;
  }

  debugger;
  // eslint-disable-next-line node/no-callback-literal
  callback(
    HyperKycResult
  );

  console.log('success');
  // }
};

/**
 * Redirect to deeplink router to handle subjectDidAssociation
 * @param userCode
 * @param issuerDid
 */
function redirectToDeeplinkRouter (userCode: string, issuerDid: string) {
  debugger;
  const baseUrl = window.location.origin;
  console.log('baseUrl', baseUrl);
  console.log('deeplinkurl', config.deeplinkServerUrl);
  console.log('userCode', userCode);
  window.location.href = `${config.deeplinkServerUrl}/${config.holderAppUuid}/subjectDidAssociation?userCode=${userCode}&issuer=${issuerDid}&issuerCallback=${baseUrl}/welcome`;
}

const handlePreFill = async (verificationFingerprint: string, mobileNumber: string, userCodeParam?: string | null, dob?: string | null) => {
  console.log('\n\nhandlePrefill');

  try {
    const authPathService = backendClient.service('getAuthPath');
    // TODO add auth with backend service
    const responseAuthPath = await authPathService.create({
      verificationFingerprint
    });
  } catch (e) {
    console.error('error with auth path', e);
    window.alert('Error interfacing with Prove Prefill service. Please try again.');
  }

  try {
    const eligibilityService = backendClient.service('eligibility');
    // TODO add auth with backend service
    const responseEligibility = await eligibilityService.create({
      phoneNumber: mobileNumber,
      minTrustScore: 500
    });

    debugger;

    if (!responseEligibility?.response?.eligibility) {
      console.log('phone not eligible');
      window.alert('The provided phone number is not eligible for use with this demo');
      return;
    }
  } catch (e) {
    console.log('eligibility error', e);
    window.alert('The provided phone number is not eligible for use with this demo');
  }

  try {
    const identityService = backendClient.service('identity');
    // TODO add auth with backend service
    const responseIdentity = await identityService.create({
      dob, // using the dob from the sms result query params, which originates via the HV doc scan
      phoneNumber: mobileNumber,
      userCode: userCodeParam // using the user code from the sms result query params, which originates via the HV doc scan
    });

    const { userCode, issuerDid } = responseIdentity;

    debugger;
    console.log('responseIdentity', responseIdentity);

    // TODO check 200 success response from backend
    // redirect to wallet client with query params for user to create DID
    redirectToDeeplinkRouter(userCode, issuerDid);
  } catch (e) {
    console.log('identity error', e);
    window.alert('Error interfacing with Prove Prefill service. Please try again.');
  }
};

const Register: FC = () => {
  const [phone, setPhone] = useState('');
  const [searchParams] = useSearchParams();
  const vfpParam = searchParams.get('vfp');
  const dobParam = searchParams.get('dob');
  const phoneParam = searchParams.get('phone');
  const userCodeParam = searchParams.get('userCode');

  useEffect(() => {
    if (vfpParam && phoneParam) {
      handlePreFill(vfpParam, phoneParam, userCodeParam, dobParam);
    }
  }, [vfpParam, dobParam, phoneParam, userCodeParam]);

  const handlePhoneChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhone(e.target.value);
  };

  /**
   * calls the hvService to persist the data on a user entity for credential issuance later.
   * the service creates a user and returns the userCode for linking to the prove prefill data
   */
  const sendHvDocScanData = async (data: HvClientResponse): Promise<HyperVergeResponse> => {
    // TODO add auth with backend
    const hvService = backendClient.service('hyperVerge');

    const response = await hvService.create(data);
    // TODO ensure success response

    return response;
  };

  /**
   * calls prove auth service to send an auth url via sms
   */
  const sendProveSms = async (userCode: string, dob?: string) => {
    /**
     * NOTE: Maybe want to just point blank ask for the DOB in the form input and compare against the hyper verge doc scan info prior to kicking off the prove prefill flow...?
     */

    // kick off prove sms
    // TODO add auth with backend
    const proveAuthUrlService = backendClient.service('getAuthUrl');

    const responseAuthUrl = await proveAuthUrlService.create({
      mobileNumber: phone,
      dob, // from the hv doc scan... will present the query params of the resultant sms link.
      userCode
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

    const transactionId = `${v1()}`;
    // const workflowId = 'global_workflow';
    const workflowId = 'workflow_cMLdsoq'; // any US doc type. Also, pretty sure HB made this always skip any potential review step
    const hyperKycConfig = new window.HyperKycConfig(accessToken, workflowId, transactionId);

    const callback = async (data: HvClientResponse) => {
      const { userCode, dob } = await sendHvDocScanData(data);

      debugger;
      if (config.proveEnabled) {
        // kick off Prove InstantLink sms
        sendProveSms(userCode, dob);
      } else {
        // redirect to the deeplink router with the userCode and issuer did
        redirectToDeeplinkRouter(userCode, config.hvIssuerDid);
      }
    };

    const hvHandler = makeHvHandler(callback);

    window.HyperKYCModule.launch(hyperKycConfig, hvHandler);
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <p>You need to (1) create an account and (2) use the Unum ID wallet to view and share credentials.</p>
      {config.proveEnabled
        ? <p>
          <BoldFont>Important:</BoldFont> you will need a government issued document and a phone number that can receive text messages. This is to confirm your mobile number as well as identity information for the identify verification step.
        </p>
        : <p>A government issued document is needed for the identity verification.</p>}
      This demo is meant to exemplify that Unum ID can be used <Italic>in conjunction with</Italic> an existing identity verification provider.
      We can also fully replace that system, using the technologies used here.
      <form>
        <h2>1. Create Account</h2>
        {config.proveEnabled
          ? <InputGroup
              required
              labelText='Phone'
              inputId='phone'
              type='text'
              onChange={handlePhoneChange}
              value={phone}
              explainerBoldText='Use your real mobile number:'
              explainerText='Enter this to facilitate identity verification via SMS.'
            />
          : ''}
        <SubmitButton handleSubmit={handleDocScan}><BoldFont>Documentation Scan</BoldFont></SubmitButton>&nbsp;
      </form>
      <div>
        By creating an account you agree to our <a href='https://www.unumid.co/legal-materials/terms-of-service'>terms of service</a> and <a href='https://www.unumid.co/legal-materials/privacy-policy'>privacy policy</a>.
      </div>
    </div>
  );
};

export default Register;
