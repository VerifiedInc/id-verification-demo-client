import { FC } from 'react';

import { useLogout } from '../../hooks/useLogout';
import Tab from './Tab';

import './LogoutTab.css';

const LogoutTab: FC = () => {
  const logout = useLogout();

  return (
    <Tab className='logout-tab'><div onClick={logout}>LOGOUT</div></Tab>
  );
};

export default LogoutTab;
