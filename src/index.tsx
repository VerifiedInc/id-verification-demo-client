import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';

import 'typeface-open-sans';
import 'typeface-playfair-display';
import 'typeface-lato';

import App from './components/App';
import './index.css';

render(<Provider store={store}><App /></Provider>, document.querySelector('#root'));
