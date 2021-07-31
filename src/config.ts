interface Config {
  verifierServerUrl: string;
  issuerServerUrl: string;
  issuerDid: string;
  env: string;
  apiKey: string;
  logRocketId: string;
}

const {
  REACT_APP_VERIFIER_SERVER_URL = '',
  REACT_APP_ISSUER_SERVER_URL = '',
  REACT_APP_ISSUER_DID = '',
  REACT_APP_ENV = 'development',
  REACT_APP_API_KEY = '',
  REACT_APP_LOG_ROCKET_ID = ''
} = process.env;

export const config: Config = {
  verifierServerUrl: REACT_APP_VERIFIER_SERVER_URL,
  issuerServerUrl: REACT_APP_ISSUER_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID,
  env: REACT_APP_ENV,
  apiKey: REACT_APP_API_KEY,
  logRocketId: REACT_APP_LOG_ROCKET_ID
};

console.log('config', config);
