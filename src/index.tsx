import { render } from 'react-dom';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';

import 'typeface-open-sans';
import 'typeface-playfair-display';
import 'typeface-lato';

import { store } from './state';
import App from './components/App';
import './index.css';
import { config } from './config';

LogRocket.init(config.logRocketId);

render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
