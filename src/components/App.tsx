import { FC, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { useActionCreators } from '../hooks/useActionCreators';

import AltHeader from './Header/AltHeader';
import Signup from './Signup';

const App: FC = () => {
  const { createSession } = useActionCreators();

  useEffect(() => {
    createSession();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Route exact path='/'>
          <AltHeader />
          <Signup />
        </Route>
      </BrowserRouter>
    </div>
  );
};

export default App;
