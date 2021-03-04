import { FC } from 'react';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import LinkTab from './LinkTab';
import Tab from './Tab';
import LogoutTab from './LogoutTab';

import './PrimaryHeader.css';

const PrimaryHeader: FC = () => {
  return (
    <Header className='primary-header'>
      <HeaderLeft>
        <LinkTab to='/route1'>Link 1</LinkTab>
        <LinkTab to='/route2'>Link 2</LinkTab>
        <LogoutTab />
      </HeaderLeft>
      <HeaderCenter />
      <HeaderRight>
        <Tab>Right side tab</Tab>
      </HeaderRight>
    </Header>
  );
};

export default PrimaryHeader;
