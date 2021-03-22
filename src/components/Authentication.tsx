import { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CredentialRequest } from '@unumid/types';
import { DemoNoPresentationDto, DemoPresentationDto, DemoPresentationRequestCreateOptions } from '@unumid/demo-types';
import VerifierWidget from '@unumid/web-sdk';

import { config } from '../config';

import { useActionCreators } from '../hooks/useActionCreators';
import { useTypedSelector } from '../hooks/useTypedSelector';

import MainContent from './Layout/MainContent';
import ContentBox from './Layout/ContentBox';

import './Authentication.css';
import deeplinkImgSrc from '../assets/verify-with-acme-button.png';

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
    const presentationService = verifierClient.service('presentation');
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

  const sendPushNotification = () => {
    console.log('send push notification');
  };

  const sendSms = () => {
    console.log('send sms');
  };

  const sendEmail = () => {
    console.log('send email');
  };

  const goToLogin = () => {
    history.push('/login');
  };

  if (!session) return null;

  console.log('presentationRequestUuid', request?.presentationRequestPostDto.presentationRequest.uuid);

  return (
    <div className='authentication'>
      <MainContent>
        <ContentBox>
          <VerifierWidget
            presentationRequest={request?.presentationRequestPostDto}
            createPresentationRequest={actuallyCreatePresentationRequest}
            applicationTitle='ACME'
            sendPushNotification={sendPushNotification}
            sendSms={sendSms}
            sendEmail={sendEmail}
            goToLogin={goToLogin}
            userInfo={loggedInUser}
            deeplinkImgSrc={deeplinkImgSrc}
            createInitialPresentationRequest={false}
          />
        </ContentBox>
      </MainContent>

    </div>
  );
};

export default Authentication;
