import feathers from '@feathersjs/client';
import rest from '@feathersjs/rest-client';
import socketio from 'socket.io-client';
import feathersSocketio from '@feathersjs/socketio-client';

import axios from 'axios';

import { config } from './config';

const verifierClient = feathers();
const issuerClient = feathers();
const backendClient = feathers();

export const verifierSocket = socketio(config.verifierServerUrl);
const issuerSocket = socketio(config.issuerServerUrl);

verifierClient.configure(feathersSocketio(verifierSocket));

issuerClient.configure(feathersSocketio(issuerSocket));
issuerClient.configure(feathers.authentication({
  storage: window.localStorage
}));

console.log(`backenServerURL: ${config.backendServerUrl}\n\n\n`);
debugger;

// const backendSocket = socketio(config.backendServerUrl);
const backendRest = rest(config.backendServerUrl);
backendClient.configure(backendRest.axios(axios));

export { verifierClient, issuerClient, backendClient };
// export { backendClient }
