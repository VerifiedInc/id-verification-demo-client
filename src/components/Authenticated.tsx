import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import { useStartOver } from '../hooks/useStartOver';
import MainContent from './Layout/MainContent';
import BoldFont from './Layout/BoldFont';

import './Authenticated.css';
import { VerifiableCredential } from '@unumid/types-deprecated-v1';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const { loggedInUser } = useTypedSelector(state => state.auth);
  const logout = useLogout();
  const startOver = useStartOver();

  if (!sharedPresentation) {
    return <Navigate to='/' />;
  }

  let phone, ssn, dob;

  const vcs = (sharedPresentation.presentation as any).verifiableCredential as VerifiableCredential[];

  for (const vc of vcs) {
    const credentialSubjectString = vc.credentialSubject;
    const credentialSubject = JSON.parse(credentialSubjectString);

    if (vc.type.includes('PhoneCredential')) {
      phone = credentialSubject.phone;
    } else if (vc.type.includes('SsnCredential')) {
      ssn = credentialSubject.ssn;
    } else if (vc.type.includes('DobCredential')) {
      dob = credentialSubject.dob;
    }
  }

  console.log(`presentation: ${JSON.stringify(sharedPresentation)}\n\n\n`);

  debugger;

  // How todo conditional rendering based component variables: ssn, dob, phone?
  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <h3><BoldFont>Prove verified phone number, {phone}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>Prove verified SSN, {ssn}, shared successfully!</BoldFont></h3>
        <h3><BoldFont>Prove verified DOB, {dob}, shared successfully!</BoldFont></h3>
        <div className='logout' onClick={logout}>Log Out</div>
        <div className='start-over' onClick={startOver}>Start Over</div>
      </MainContent>
    </div>
  );
};

export default Authenticated;
