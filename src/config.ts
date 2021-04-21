interface Config {
  verifierServerUrl: string;
  issuerServerUrl: string;
  issuerDid: string;
  env: string;
  apiKey: string;
}

const {
  REACT_APP_VERIFIER_SERVER_URL = '',
  REACT_APP_ISSUER_SERVER_URL = '',
  REACT_APP_ISSUER_DID = '',
  REACT_APP_ENV = 'development',
  REACT_APP_API_KEY = ''
} = process.env;

export const config: Config = {
  verifierServerUrl: REACT_APP_VERIFIER_SERVER_URL,
  issuerServerUrl: REACT_APP_ISSUER_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID,
  env: REACT_APP_ENV,
  apiKey: REACT_APP_API_KEY
};

console.log('config', config);
