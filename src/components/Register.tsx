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
import { HvDocScanData } from '../types';

import { KYCData as _KYCData } from '@unumid/id-verification-types';

interface KYCData extends Omit<_KYCData, 'docImage' | 'fullFaceImage'> {
  docImage?: string;
  fullFaceImage?: string;

}

// types for global variables added by the hyperverge sdk
declare global {
  interface Window {
    HyperKycConfig?: any;
    Face?: any;
    Document?: any;
    HyperKYCModule?: any;
  }
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

    const hvDocScanData: HvDocScanData = HyperKycResult.Success.data;
    const docCountryId = hvDocScanData.selectedCountryId;

    const faceMatchData = hvDocScanData.faceMatchData.responseResult.result.details.match;
    const faceMatch = faceMatchData.value;
    const faceMatchConfidence = faceMatchData.confidence;

    const faceData = hvDocScanData.faceData;
    // const fullFaceImage = faceData.fullFaceImagePath;
    const liveFace = faceData.responseResult.result.details.liveFace.value;
    const liveFaceConfidence = faceData.responseResult.result.details.liveFace.confidence;

    const docData = hvDocScanData.docListData[0];
    // const docImage = docData.docImagePath;
    const docType = docData.documentId;
    const { address, dateOfBirth, fullName, gender } = docData.responseResult.result.details[0].fieldsExtracted;
    debugger;
    /**
     * Reformat the DOB from the HV document scan.
     * dateOfBirthday was taking the format MM-DD-YYYY from HV, but as of 6/23 was updated to dD-mM-YYYY.
     * and Prove needs it in the format YYYY-MM-DD, so just turning it in that here
     */
    const proveDob = dateOfBirth.value.split('-');

    // loop through the split data array and ensure all values have at least 2 digits
    for (let i = 0; i < proveDob.length; i++) {
      if (proveDob[i].length < 2) {
        proveDob[i] = '0' + proveDob[i];
      }
    }

    // shift values to fit desired format; this was working when HV was returning in format MM-DD-YYYY
    // const hold = proveDob[2];
    // proveDob[2] = proveDob[1];
    // proveDob[1] = proveDob[0];
    // proveDob[0] = hold;

    // shift values to fit desired format; having to deal with new format of DD-MM-YYYY
    const hold = proveDob[2];
    proveDob[2] = proveDob[0];
    proveDob[0] = hold;

    // now should be in YYYY-MM-DD format
    const dob = proveDob.join('-');

    debugger;
    // eslint-disable-next-line node/no-callback-literal
    callback({
      address: address.value,
      dob,
      fullName: fullName.value,
      gender: gender.value,
      // docImage,
      docType,
      docCountryId,
      // fullFaceImage,
      liveFace,
      liveFaceConfidence,
      faceMatch,
      faceMatchConfidence
    });

    console.log('success');
  }
};

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

    // TODO check 200 success response from backend
    // redirect to wallet client with query params for user to create DID
    console.log('deeplinkurl', config.deeplinkServerUrl);
    window.location.href = `${config.deeplinkServerUrl}/authenticate?userCode=${userCode}&issuer=${issuerDid}`;
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
  const sendHvDocScanData = async (data: KYCData): Promise<string> => {
    // TODO add auth with backend
    const hvService = backendClient.service('hyperVerge');

    const response = await hvService.create(data);
    // TODO ensure success response

    return response.userCode;
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

    // hyperverge document scan setup
    const defaultDocumentId = 'dl';
    const defaultCountryId = 'usa';
    const transactionId = `${v1()}`;
    const documentHv = new window.Document(true, defaultCountryId, defaultDocumentId);
    const face = new window.Face();
    const workflow = [documentHv, face];
    const hyperKycConfig = new window.HyperKycConfig(accessToken, workflow, transactionId, defaultCountryId);

    const callback = async (data: KYCData) => {
      const userCode = await sendHvDocScanData(data);
      sendProveSms(userCode, data.dob);
    };

    const handler = makeHandler(callback);

    window.HyperKYCModule.launch(hyperKycConfig, handler);
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
      </form>
      <div>
        By creating an account you agree to our <a href='https://www.unumid.co/legal-materials/terms-of-service'>terms of service</a> and <a href='https://www.unumid.co/legal-materials/privacy-policy'>privacy policy</a>.
      </div>
    </div>
  );
};

export default Register;
