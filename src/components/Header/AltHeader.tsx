import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons';

import Header from './Header';
import HeaderCenter from './HeaderCenter';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import Tab from './Tab';

import headerLogo from '../../assets/header-logo@2x.png';
import './AltHeader.css';

const AltHeader: FC = () => {
  return (
    <Header className='alternate-header'>
      <HeaderLeft>
        <Tab><FontAwesomeIcon icon={faBars} size='lg' title='bars' /></Tab>
      </HeaderLeft>
      <HeaderCenter><img src={headerLogo} alt='ACME, Inc.' /></HeaderCenter>
      <HeaderRight>
        <Tab><FontAwesomeIcon icon={faSearch} size='lg' title='search' /></Tab>
      </HeaderRight>
    </Header>
  );
};

export default AltHeader;
