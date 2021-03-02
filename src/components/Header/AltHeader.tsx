import { FC } from 'react';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import LinkTab from './LinkTab';
import Tab from './Tab';

import './AltHeader.css';

const AltHeader: FC = () => {
  return (
    <Header className='alternate-header'>
      <HeaderLeft>
        <LinkTab to='/route1'>Link 1</LinkTab>
        <LinkTab to='/route2'>Link 2</LinkTab>
      </HeaderLeft>
      <HeaderCenter />
      <HeaderRight>
        <Tab>Right side tab</Tab>
      </HeaderRight>
    </Header>
  );
};

export default AltHeader;
