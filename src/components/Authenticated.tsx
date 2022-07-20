import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import { useStartOver } from '../hooks/useStartOver';
import MainContent from './Layout/MainContent';
import BoldFont from './Layout/BoldFont';

import './Authenticated.css';
import { VerifiableCredential } from '@unumid/types-deprecated-v1';
import { config } from '../config';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const { loggedInUser } = useTypedSelector(state => state.auth);
  const logout = useLogout();
  const startOver = useStartOver();

  if (!sharedPresentation) {
    return <Navigate to='/' />;
  }

  let provePhone, proveSsn, proveDob, hvDob, hvAddress, hvFullName, hvGender, hvCountry, hvDocType, hvLiveliness, hvLivelinessConfidence, hvFaceMatch, hvFaceMatchConfidence;

  const vcs = (sharedPresentation.presentation as any).verifiableCredential as VerifiableCredential[];

  for (const vc of vcs) {
    const credentialSubjectString = vc.credentialSubject;
    const credentialSubject = JSON.parse(credentialSubjectString);

    if (vc.type.includes('PhoneCredential')) {
      provePhone = credentialSubject.phone;
    } else if (vc.type.includes('SsnCredential')) {
      proveSsn = credentialSubject.ssn;
    } else if (vc.type.includes('DobCredential') && vc.issuer === config.proveIssuerDid) {
      proveDob = credentialSubject.dob;
    } else if (vc.type.includes('DobCredential') && vc.issuer === config.hvIssuerDid) {
      hvDob = credentialSubject.dob;
    } else if (vc.type.includes('AddressCredential')) {
      hvAddress = credentialSubject.address;
    } else if (vc.type.includes('FullNameCredential')) {
      hvFullName = credentialSubject.fullName;
    } else if (vc.type.includes('GenderCredential')) {
      hvGender = credentialSubject.gender;
    } else if (vc.type.includes('CountryResidenceCredential') && vc.issuer === config.hvIssuerDid) {
      hvCountry = credentialSubject.country;
    } else if (vc.type.includes('GovernmentIdTypeCredential')) {
      hvDocType = credentialSubject.documentType;
    } else if (vc.type.includes('LivelinessCredential')) {
      hvLiveliness = credentialSubject.liveliness;
    } else if (vc.type.includes('LivelinessConfidenceCredential')) {
      hvLivelinessConfidence = credentialSubject.confidence;
    } else if (vc.type.includes('FacialMatchCredential')) {
      hvFaceMatch = credentialSubject.match;
    } else if (vc.type.includes('FacialMatchConfidenceCredential')) {
      hvFaceMatchConfidence = credentialSubject.confidence;
    }
  }

  console.log(`presentation: ${JSON.stringify(sharedPresentation)}\n\n\n`);

  debugger;

  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <h3><BoldFont>Prove verified phone number, {provePhone}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>Prove verified SSN, {proveSsn}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>Prove verified DOB, {proveDob}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>HyperVerge verified DOB, {hvDob}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>HyperVerge verified address, {hvAddress}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>HyperVerge verified gender, {hvGender}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>HyperVerge verified full name, {hvFullName}, shared successfully!</BoldFont></h3>
        if (hvFullName) <h3><BoldFont>HyperVerge verified full name, {hvFullName}, shared successfully!</BoldFont></h3>
        if (hvCountry) <h3><BoldFont>HyperVerge verified country of residence, {hvCountry}, shared successfully!</BoldFont></h3>
        if (hvDocType) <h3><BoldFont>HyperVerge verified document type, {hvDocType}, shared successfully!</BoldFont></h3>
        if (hvLiveliness) <h3><BoldFont>HyperVerge verified liveliness, {hvLiveliness}, shared successfully!</BoldFont></h3>
        if (hvLivelinessConfidence) <h3><BoldFont>HyperVerge verified liveliness confidence, {hvLivelinessConfidence}, shared successfully!</BoldFont></h3>
        if (hvFaceMatch) <h3><BoldFont>HyperVerge verified facial match, {hvFaceMatch}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>HyperVerge verified facial match confidence, {hvFaceMatchConfidence}, shared successfully!</BoldFont></h3>
        <div className='logout' onClick={logout}>Log Out</div>
        <div className='start-over' onClick={startOver}>Start Over</div>
      </MainContent>
    </div>
  );
};

export default Authenticated;
