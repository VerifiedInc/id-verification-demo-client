import { DemoSession } from '@unumid/demo-types';
import { v4 } from 'uuid';

const now = new Date();

export const dummySession: DemoSession = {
  uuid: v4(),
  createdAt: now,
  updatedAt: now
};
