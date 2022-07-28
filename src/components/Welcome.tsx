import { FC, MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import BoldFont from './Layout/BoldFont';

import './Authenticated.css';
import SubmitButton from './Form/SubmitButton';
import Italic from './Layout/Italic';

const Authenticated: FC = () => {
  const history = useNavigate();

  const goToAcmeRequest: MouseEventHandler = (e) => {
    e.preventDefault();

    console.log('goToAcmeRequest');
    history('/request');
  };

  return (
    <div className='welcome'>
      <h1>Welcome!</h1>
      <p>Thanks for signing up.</p>
      <p>
        <BoldFont>But Really:</BoldFont> thanks for using this demo. This page is just a place holder for the continuation of a signup flow, to allow for Unum ID's web wallet to give the context back to customer.
        <p>
          If you would like to continue with the demonstration, <BoldFont>please click the button below to go to the third party, ACME's, request for credentials page</BoldFont> to then use your newly minted credentials.
          This shows that Unum ID can be used <Italic>with any other</Italic> participating third party in our network.
        </p>
      </p>
      <form>
        <SubmitButton handleSubmit={goToAcmeRequest}><BoldFont>ACME Credential Request</BoldFont></SubmitButton>&nbsp;
      </form>
    </div>
  );
};

export default Authenticated;
