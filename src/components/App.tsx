import { DemoNoPresentationDto, DemoPresentationDto } from '@unumid/demo-types';
import { FC, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { client } from '../feathers';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import AltHeader from './Header/AltHeader';
import PrimaryHeader from './Header/PrimaryHeader';
import Signup from './Signup';

const isDemoPresentationDto = (obj: DemoPresentationDto | DemoNoPresentationDto): obj is DemoPresentationDto =>
  !!(obj as DemoPresentationDto).presentation;

const App: FC = () => {
  const { createSession, handlePresentationShared, handleNoPresentationShared } = useActionCreators();
  const { session } = useTypedSelector(state => state.session);

  useEffect(() => {
    if (!session) {
      createSession();
    }
  }, [session]);

  useEffect(() => {
    const presentationService = client.service('presentation');
    presentationService.on('created', (data: DemoPresentationDto | DemoNoPresentationDto) => {
      console.log('on presentation created, data', data);

      if (isDemoPresentationDto(data)) {
        handlePresentationShared(data);
      } else {
        handleNoPresentationShared(data);
      }
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          <AltHeader />
          <Signup />
        </Route>
        <Route path='/route1'>
          <PrimaryHeader />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
