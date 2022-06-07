import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';
import { useStartOver } from '../hooks/useStartOver';

import './Declined.css';

const Declined: FC = () => {
  const { sharedNoPresentation } = useTypedSelector(state => state.presentation);
  const startOver = useStartOver();

  // if (!sharedNoPresentation) {
  //   return <Navigate to='/' />;
  // }

  const urlQueryParams: string = window.location.search;
  const queryParams = new URLSearchParams(urlQueryParams);
  const vfp = queryParams.get('vfp');
  window.location.href = `http://device.staging.payfone.com/fortified/2015/06/01/continueAuth?vfp=${vfp}`;

  return (
    <div className='declined'>
      <MainContent>
        <h3>You declined to authenticate.</h3>
        <div className='start-over' onClick={startOver}>Return to Authentication</div>
      </MainContent>
    </div>
  );
};

export default Declined;
