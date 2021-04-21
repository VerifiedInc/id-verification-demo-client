import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CredentialRequest } from '@unumid/types';
import { DemoNoPresentationDto, DemoPresentationDto, DemoPresentationRequestCreateOptions } from '@unumid/demo-types';
import UnumIDWidget from '@unumid/web-sdk';

import { config } from '../config';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import MainContent from './Layout/MainContent';
import ContentBox from './Layout/ContentBox';

import './Authentication.css';

import { verifierClient } from '../feathers';

const isDemoPresentationDto = (obj: DemoPresentationDto | DemoNoPresentationDto): obj is DemoPresentationDto =>
  !!(obj as DemoPresentationDto).presentation;

const Authentication: FC = () => {
  const {
    createPresentationRequest,
    handlePresentationShared,
    handleNoPresentationShared
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
    presentationService.on('created', (data: DemoPresentationDto | DemoNoPresentationDto) => {
      console.log('on presentation created, data', data);

      if (isDemoPresentationDto(data)) {
        handlePresentationShared(data);

        // customize this route for the specific demo if you want
        history.push('/authenticated');
      } else {
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
    ...loggedInUser,
    pushToken: loggedInUser.pushTokens[0]
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
