import feathers from '@feathersjs/client';
import socketio from 'socket.io-client';
import feathersSocketio from '@feathersjs/socketio-client';

import { config } from './config';

const client = feathers();

const socket = socketio(config.serverUrl);

client.configure(feathersSocketio(socket));

export { client };
