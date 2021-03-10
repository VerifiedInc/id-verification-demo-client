import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { useLogout } from '../hooks/useLogout';
import MainContent from './Layout/MainContent';

import './Declined.css';

const Declined: FC = () => {
  const { sharedNoPresentation } = useTypedSelector(state => state.presentation);
  const logout = useLogout();

  if (!sharedNoPresentation) {
    return <Redirect to='/' />;
  }

  return (
    <div className='declined'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout, etc */}
        Declined
        <div className='start-over' onClick={logout}>Return to Authentication</div>
      </MainContent>
    </div>
  );
};

export default Declined;
