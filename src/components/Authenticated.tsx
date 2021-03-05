import { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { useTypedSelector } from '../hooks/useTypedSelector';
import MainContent from './Layout/MainContent';

import './Authenticated.css';

const Authenticated: FC = () => {
  const { sharedPresentation } = useTypedSelector(state => state.presentation);

  if (!sharedPresentation) {
    return <Redirect to='/' />;
  }

  return (
    <div className='authenticated'>
      <MainContent>
        {/* customize this with branding for the specific demo, better styling/layout/content, etc */}
        Authenticated
      </MainContent>
    </div>
  );
};

export default Authenticated;
