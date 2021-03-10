import { FC, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Authenticated from './Authenticated';
import Declined from './Declined';

import AltHeader from './Header/AltHeader';
import PrimaryHeader from './Header/PrimaryHeader';
import Authentication from './Authentication';
import Register from './Register';
import Login from './Login';
import Unumid from './Layout/Unumid';
import Acme from './Layout/Acme';

const App: FC = () => {
  const { createSession } = useActionCreators();
  const { session } = useTypedSelector(state => state.session);

  useEffect(() => {
    if (!session) {
      createSession();
    }
  }, [session]);

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          <Acme>
            <AltHeader />
            <Authentication />
          </Acme>
        </Route>
        <Route path='/route1'>
          <PrimaryHeader />
        </Route>
        <Route path='/register'>
          <Unumid>
            <Register />
          </Unumid>
        </Route>
        <Route path='/login'>
          <Unumid>
            <Login />
          </Unumid>
        </Route>
        <Route path='/authenticated'>
          <PrimaryHeader />
          <Authenticated />
        </Route>
        <Route path='/declined'>
          <AltHeader />
          <Declined />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
