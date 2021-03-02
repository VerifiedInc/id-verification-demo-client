import { BrowserRouter } from 'react-router-dom';

// import AltHeader from './Header/AltHeader';
import PrimaryHeader from './Header/PrimaryHeader';

const App = () => (
  <div>
    <BrowserRouter>
      {/* <AltHeader /> */}
      <PrimaryHeader />
    </BrowserRouter>
  </div>
);

export default App;
