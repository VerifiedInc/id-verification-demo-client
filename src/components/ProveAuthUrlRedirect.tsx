import { FC } from 'react';

import './ProveAuthUrlRedirect.css';
import { config } from '../config';

const ProveAuthUrlRedirect: FC = () => {
  const urlQueryParams: string = window.location.search;
  const queryParams = new URLSearchParams(urlQueryParams);
  const vfp = queryParams.get('vfp');
  window.location.href = `${config.proveAuthUrl}/fortified/2015/06/01/continueAuth?vfp=${vfp}`;

  return (
    <div className='proveAuthUrlRedirect' />
  );
};

export default ProveAuthUrlRedirect;
