import { FC } from 'react';

import { useLogout } from '../../hooks/useLogout';
import Tab from './Tab';

const LogoutTab: FC = () => {
  const logout = useLogout();

  return (
    <Tab><div onClick={logout}>LOGOUT</div></Tab>
  );
};

export default LogoutTab;
