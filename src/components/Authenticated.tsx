import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import { useStartOver } from '../hooks/useStartOver';
import MainContent from './Layout/MainContent';
import BoldFont from './Layout/BoldFont';

import './Authenticated.css';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const logout = useLogout();
  const startOver = useStartOver();

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <h3><BoldFont>Authenticated as {sharedPresentation.presentation.verifiableCredentials[0].credentialSubject.userEmail}!</BoldFont></h3>
        <div className='logout' onClick={logout}>Log Out</div>
        <div className='start-over' onClick={startOver}>Start Over</div>
      </MainContent>
    </div>
  );
};

export default Authenticated;
