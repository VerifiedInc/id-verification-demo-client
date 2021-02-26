import { FeathersError } from '@feathersjs/errors';

export interface Action<T extends string = any, P = any> {
  type: T,
  payload?: P;
}

export type ActionWithoutPayload<T extends string> = Omit<Action<T>, 'payload'>;

export interface ActionWithPayload<T extends string, P = any> extends Action<T, P> {
  payload: P;
}

export type FeathersErrorAction<T extends string> = ActionWithPayload<T, FeathersError>;
