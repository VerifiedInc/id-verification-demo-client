import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CredentialRequest } from '@unumid/types';
import { DemoPresentationRequestCreateOptions } from '@unumid/demo-types';
import UnumIDWidget from '@unumid/react-web-sdk';

import { config } from '../config';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import MainContent from './Layout/MainContent';
import ContentBox from './Layout/ContentBox';

import './Authentication.css';

import { verifierClient } from '../feathers';
import {
  isDemoAcceptedPresentationDto,
  isDemoDeclinedPresentationDto,
  isDemoPresentationDto,
  isDeprecatedDemoNoPresentationDto,
  isDeprecatedDemoPresentationDto
} from '../typeguards';
import { DemoPresentationLikeDto } from '../types';

const Authentication: FC = () => {
  const {
    createPresentationRequest,
    handleDeprecatedPresentationShared,
    handleNoPresentationShared,
    handleAcceptedPresentationShared,
    handleDeclinedPresentationShared
  } = useActionCreators();

  const history = useHistory();
  const { session } = useTypedSelector(state => state.session);
  const { request } = useTypedSelector(state => state.presentationRequest);
  const { loggedInUser } = useTypedSelector(state => state.auth);

  const actuallyCreatePresentationRequest = () => {
    if (!session) return;

    // customize these values for the specific demo (or not)
    const credentialRequests: CredentialRequest[] = [{
      type: 'DemoAuthCredential',
      required: true,
      issuers: [config.issuerDid]
    }];

    const presentationRequestOptions: DemoPresentationRequestCreateOptions = {
      credentialRequests,
      metadata: { sessionUuid: session.uuid }
    };

    createPresentationRequest(presentationRequestOptions);
  };

  useEffect(() => {
    actuallyCreatePresentationRequest();
  }, [session]);

  useEffect(() => {
    if (!request?.presentationRequestPostDto) {
      return;
    }

    // now that we've created the request, listen for a presentation
    const presentationService = verifierClient.service('presentationWebsocket');
    presentationService.on('created', async (data: DemoPresentationLikeDto) => {
      console.log('on presentation created, data', data);

      // handle current cases
      if (isDemoPresentationDto(data)) {
        // handle accepted
        if (isDemoAcceptedPresentationDto(data)) {
          await handleAcceptedPresentationShared(data);

          history.push('/authenticated');
        }

        // handle declined
        if (isDemoDeclinedPresentationDto(data)) {
          handleDeclinedPresentationShared(data);
        }
      }

      // handle deprecated presentation
      if (isDeprecatedDemoPresentationDto(data)) {
        await handleDeprecatedPresentationShared(data);

        history.push('/authenticated');
      }

      // handle deprecated noPresentation
      if (isDeprecatedDemoNoPresentationDto(data)) {
        handleNoPresentationShared(data);

        history.push('/declined');
      }
    });

    return () => {
      presentationService.removeAllListeners();
    };
  }, [request?.presentationRequestPostDto]);

  const goToLogin = () => {
    console.log('goToLogin');
    history.push('/login');
  };

  if (!session) return null;

  const userInfo = loggedInUser && {
    email: loggedInUser.email,
    phone: loggedInUser.phone,
    pushToken: loggedInUser.pushTokens.map(pt => ({ provider: pt.provider, value: pt.value }))
  };

  return (
    <div className='authentication'>
      <MainContent>
        <ContentBox>
          <UnumIDWidget
            env={config.env}
            apiKey={config.apiKey}
            presentationRequest={request?.presentationRequestPostDto}
            createPresentationRequest={actuallyCreatePresentationRequest}
            goToLogin={goToLogin}
            userInfo={userInfo}
            createInitialPresentationRequest={false}
          />
        </ContentBox>
      </MainContent>

    </div>
  );
};

export default Authentication;
