import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import { useStartOver } from '../hooks/useStartOver';
import MainContent from './Layout/MainContent';
import BoldFont from './Layout/BoldFont';

import './Authenticated.css';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);
  const { loggedInUser } = useTypedSelector(state => state.auth);
  const logout = useLogout();
  const startOver = useStartOver();

  if (!sharedPresentation) {
    return <Navigate to='/' />;
  }

  if (!loggedInUser) {
    return <Navigate to='/' />;
  }

  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        <h3><BoldFont>Prove verified data shared successfully!</BoldFont></h3>
        <div className='logout' onClick={logout}>Log Out</div>
        <div className='start-over' onClick={startOver}>Start Over</div>
      </MainContent>
    </div>
  );
};

export default Authenticated;
