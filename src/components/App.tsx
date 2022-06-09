import { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import AltHeader from './Header/AltHeader';
import PrimaryHeader from './Header/PrimaryHeader';
import Authentication from './Authentication';
import Register from './Register';
import Login from './Login';
import Unumid from './Layout/Unumid';
import Acme from './Layout/Acme';
import { verifierClient, verifierSocket } from '../feathers';
import ProveAuthUrlRedirect from './ProveAuthUrlRedirect';

const App: FC = () => {
  const { createSession } = useActionCreators();
  const { session } = useTypedSelector(state => state.session);

  useEffect(() => {
    if (!session) {
      createSession();
    }
  }, [session]);

  useEffect(() => {
    verifierSocket.on('connect', async (...args: unknown[]) => {
      console.log('verifier socket connect', args);

      // attempt to re-join the session channel
      console.log('session', session);
      if (session) {
        console.log(`joining session channel ${session.uuid}`);
        try {
          await verifierClient.service('channel').create({ channel: session.uuid });
          console.log(`joined session channel ${session.uuid}`);
        } catch (e) {
          console.error(`error joining session channel ${session.uuid}`, e);
        }
      }
    });

    verifierSocket.on('disconnect', (...args: unknown[]) => {
      console.log('verifier socket disconnect', args);
    });

    return () => {
      verifierSocket.removeAllListeners();
    };
  }, [session]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path='/'>
            <Acme>
              <AltHeader />
              <Authentication />
            </Acme>
          </Route>
          <Route path='/route1'>
            <PrimaryHeader />
          </Route> */}
          <Route
            path='/' element={
              <Unumid>
                <Register />
              </Unumid>
          }
          />
          <Route
            path='/register' element={
              <Unumid>
                <Register />
              </Unumid>
          }
          />
          {/* <Route path='/login'>
            <Unumid>
              <Login />
            </Unumid>
          </Route>
          <Route path='/authenticated'>
            <Acme>
              <AltHeader />
              <Authenticated />
            </Acme>
          </Route> */}
          <Route
            path='/proveAuth' element={
              <Acme>
                <ProveAuthUrlRedirect />
              </Acme>
          }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
