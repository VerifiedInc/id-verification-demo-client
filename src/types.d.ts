import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FCWithClassName<P = {}> = FC<P & { className?: string }>;

// type of the object returned when authenticating with the issuer server
export interface DemoUserAuthenticationResult {
  accessToken: string;
  authentication: {
    strategy: string,
    accessToken: string;
    payload: {
      iat: number;
      exp: number;
      aud: string;
      iss: string;
      sub: string;
      jti: string;
    }
  },
  user: DemoUserWithoutPassword
}
