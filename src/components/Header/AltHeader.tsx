import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import Tab from './Tab';

import './AltHeader.css';

const AltHeader: FC = () => {
  return (
    <Header className='alternate-header'>
      <HeaderLeft>
        <Tab><FontAwesomeIcon icon={faBars} size='lg' title='bars' /></Tab>
      </HeaderLeft>
      <HeaderCenter><h1>ACME, Inc.</h1></HeaderCenter>
      <HeaderRight>
        <Tab><FontAwesomeIcon icon={faSearch} size='lg' title='search' /></Tab>
      </HeaderRight>
    </Header>
  );
};

export default AltHeader;
