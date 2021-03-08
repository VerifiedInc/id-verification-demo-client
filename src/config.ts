interface Config {
  verifierServerUrl: string;
  issuerServerUrl: string;
  issuerDid: string;
}

const {
  REACT_APP_VERIFIER_SERVER_URL = '',
  REACT_APP_ISSUER_SERVER_URL = '',
  REACT_APP_ISSUER_DID = ''
} = process.env;

export const config: Config = {
  verifierServerUrl: REACT_APP_VERIFIER_SERVER_URL,
  issuerServerUrl: REACT_APP_ISSUER_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID
};
