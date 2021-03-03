interface Config {
  serverUrl: string;
  issuerDid: string;
}

const {
  REACT_APP_SERVER_URL = '',
  REACT_APP_ISSUER_DID = ''
} = process.env;

export const config: Config = {
  serverUrl: REACT_APP_SERVER_URL,
  issuerDid: REACT_APP_ISSUER_DID
};
