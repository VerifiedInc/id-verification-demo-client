import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import MainContent from './Layout/MainContent';
import BoldFont from './Layout/BoldFont';

import './Authenticated.css';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const logout = useLogout();

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <h3><BoldFont>Authenticated as {sharedPresentation.presentation.verifiableCredential[0].credentialSubject.userEmail}!</BoldFont></h3>
        <div className='logout' onClick={logout}>Log Out</div>
      </MainContent>
    </div>
  );
};

export default Authenticated;
