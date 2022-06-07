import feathers, { rest } from '@feathersjs/client';
import feathersRestClient from '@feathersjs/rest-client';
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

const backendSocket = socketio(config.backendServerUrl);
backendClient.configure(feathersSocketio(backendSocket));

export { verifierClient, issuerClient, backendClient };
