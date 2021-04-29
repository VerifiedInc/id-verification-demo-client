import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';
import { useStartOver } from '../hooks/useStartOver';

import './Declined.css';

const Declined: FC = () => {
  const { sharedNoPresentation } = useTypedSelector(state => state.presentation);
  const startOver = useStartOver();

  if (!sharedNoPresentation) {
    return <Redirect to='/' />;
  }

  return (
    <div className='declined'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout, etc */}
        <h3>You declined to authenticate.</h3>
        <div className='start-over' onClick={startOver}>Return to Authentication</div>
      </MainContent>
    </div>
  );
};

export default Declined;
