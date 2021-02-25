interface Config {
  serverUrl: string;
}

const {
  REACT_APP_SERVER_URL = ''
} = process.env;

export const config: Config = {
  serverUrl: REACT_APP_SERVER_URL
};
