import feathers from '@feathersjs/client';
import socketio from 'socket.io-client';
import feathersSocketio from '@feathersjs/socketio-client';

import { config } from './config';

const verifierClient = feathers();
const issuerClient = feathers();

const verifierSocket = socketio(config.verifierServerUrl);
const issuerSocket = socketio(config.issuerServerUrl);

verifierClient.configure(feathersSocketio(verifierSocket));

issuerClient.configure(feathersSocketio(issuerSocket));
issuerClient.configure(feathers.authentication({
  storage: window.localStorage
}));

export { verifierClient, issuerClient };
