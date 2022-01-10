import {
  DemoPresentationRequestDto,
  DemoPresentationRequestCreateOptions,
  DemoSession,
  DemoUser,
  DemoUserCreateOptions
} from '@unumid/demo-types';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated-v1';
import { PresentationRequestPostDto } from '@unumid/types';
import {
  Presentation as DeprecatedPresentation,
  NoPresentation as DeprecatedNoPresentation
} from '@unumid/types-deprecated-v1';
import { v4 } from 'uuid';

import {
  AcceptedPresentation,
  DeclinedPresentation,
  DemoAcceptedPresentationDto,
  DemoDeclinedPresentationDto,
  DemoUserAuthenticationResult
} from '../types';

const now = new Date();
const tenMinutesFromNow = new Date(now.getTime() + 10 * 60 * 1000);
const dummyPresentationRequestUuid = v4();
const dummyVerifierDid = `did:unum:${v4()}`;
const dummyVerifierDidWithFragment = `${dummyVerifierDid}#${v4()}`;
const dummyIssuerDid = `did:unum:${v4()}`;
const dummyHolderAppUuid = v4();

export const dummySession: DemoSession = {
  uuid: v4(),
  createdAt: now,
  updatedAt: now
};

export const dummyDemoPresentationRequestCreateOptions: DemoPresentationRequestCreateOptions = {
  credentialRequests: [{
    type: 'TestCredential',
    issuers: [dummyIssuerDid],
    required: true
  }],
  metadata: { fields: { sessionUuid: v4() } }
};

export const dummyHolderAppInfo = {
  name: 'ACME, Inc. Test App',
  uriScheme: 'unumid://',
  deeplinkButtonImg: 'data:image/png;base64,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'
};

export const dummyPresentationRequestPostDto: PresentationRequestPostDto = {
  presentationRequest: {
    uuid: dummyPresentationRequestUuid,
    createdAt: now,
    updatedAt: now,
    expiresAt: tenMinutesFromNow,
    verifier: dummyVerifierDid,
    credentialRequests: [{
      type: 'TestCredential',
      issuers: [dummyIssuerDid],
      required: true
    }],
    proof: {
      created: now.toISOString(),
      signatureValue: 'dummy signature value',
      // unsignedValue: 'dummy unsigned value',
      type: 'secp256r1signature2020',
      verificationMethod: dummyVerifierDidWithFragment,
      proofPurpose: 'assertionMethod'
    },
    metadata: undefined,
    holderAppUuid: dummyHolderAppUuid,
    id: v4()
  },
  verifier: {
    name: 'test verifier',
    did: dummyVerifierDid,
    url: 'https://verifier-api.demo.unum.id/presentation'
  },
  issuers: {
    [dummyIssuerDid]: {
      did: dummyIssuerDid,
      name: 'test issuer'
    }
  },
  holderApp: dummyHolderAppInfo,
  deeplink: `acme://unumid/presentationRequest/${dummyPresentationRequestUuid}`,
  qrCode: 'data:image/png;base64,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'
};

export const dummyDemoPresentationRequestoDto: DemoPresentationRequestDto = {
  presentationRequestPostDto: dummyPresentationRequestPostDto,
  uuid: v4(),
  createdAt: now,
  updatedAt: now
};

export const dummyDeprecatedPresentation: DeprecatedPresentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  uuid: '1b42c5bd-f9e3-46ab-bf3a-1d886f712951',
  presentationRequestUuid: 'd0c0c19f-cdfb-422c-b1a1-416e5a6ab890',
  verifiableCredentials: [
    {
      id: '808befa8-cb80-41f2-a092-3a2542bde1a0',
      issuer: 'did:unum:8af05d2e-abda-466b-a70b-7c176401f520',
      type: [
        'VerifiableCredential',
        'DemoAuthCredential'
      ],
      '@context': [
        'https://www.w3.org/2018/credentials/v1'
      ],
      credentialStatus: {
        id: 'https://api.dev-unumid.org//credentialStatus/808befa8-cb80-41f2-a092-3a2542bde1a0',
        type: 'CredentialStatus'
      },
      credentialSubject: {
        id: 'did:unum:ab8cc239-c146-4d9d-8332-ac8182f94696',
        isAuthorized: true,
        userUuid: 'eef4db1a-1310-4a60-9ef8-9ee5fc32fe8a',
        userEmail: 'jacob@unum.id'
      },
      issuanceDate: new Date('2021-03-11T01:57:20.185Z'),
      proof: {
        created: '2021-03-11T01:57:20.187Z',
        signatureValue: 'AN1rKvt22FJSY8NH89MENJfibsgqTbKwH7gBUqREMP6dSK8MhMUL2WX6smvEYNccVfppR1iXoycnoRos827UPTj1brEQk9h9G',
        type: 'secp256r1Signature2020',
        verificationMethod: 'did:unum:8af05d2e-abda-466b-a70b-7c176401f520',
        proofPurpose: 'AssertionMethod'
      }
    }
  ],
  type: [
    'VerifiablePresentation'
  ],
  proof: {
    created: '2021-03-11T02:37:58.664Z',
    signatureValue: '381yXZDJeBhH2fnJH1Uy6F4FmPVsSCUiCVgDcSVWu9hGfXgctgQKHNufWmRrJ1BH4wiSbsg74mtVu7356ZuS6xqKkdizDr6s',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:9d79fab6-65d7-455d-9160-780b4c152ef6#38de59ae-d475-45b1-8d6b-38764aeec96f',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyDeprecatedDemoPresentationDto: DeprecatedDemoPresentationDto = {
  presentation: dummyDeprecatedPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};

export const dummyDeprecatedNoPresentation: DeprecatedNoPresentation = {
  holder: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
  presentationRequestUuid: '256e9461-4b65-4941-a6cd-e379276a45b4',
  type: ['NoPresentation', 'NoPresentation'],
  proof: {
    created: '2021-02-22T21:30:03.377Z',
    signatureValue: 'AN1rKvszAWeMwUW7ghrEG9BfWr7a5n9kWpvqQrW5bQKM9sCS4KDmiwX6PZidMNcYRTvwQ9RLyHELQu33TbcUPVwWEqE23wJHs',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyDeprecatedDemoNoPresentationDto: DeprecatedDemoNoPresentationDto = {
  noPresentation: dummyDeprecatedNoPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};

export const dummyUserCreateOptions: DemoUserCreateOptions = {
  email: 'test@unum.id',
  firstName: 'Gizmo',
  password: 'test'
};

export const dummyUser: DemoUser = {
  email: dummyUserCreateOptions.email,
  firstName: dummyUserCreateOptions.firstName,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  pushTokens: []
};

export const dummyLocalAuthResult: DemoUserAuthenticationResult = {
  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTUyMzQwNTksImV4cCI6MTYxNTMyMDQ1OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWJhNzFiZmYtOTVlZi00ZTY5LTkxMjEtNmEwZjcyYzY5YjFkIiwianRpIjoiMjlhMGMyODgtMzliNy00ZTY0LWEwMWQtODQ3MTEyMWNhYzkxIn0.JQfcsD4esZqIzhTFE8rr4Q3kHnBGpNsUyBKDURjkfNo',
  authentication: {
    strategy: 'local',
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2MTUyMzQwNTksImV4cCI6MTYxNTMyMDQ1OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNWJhNzFiZmYtOTVlZi00ZTY5LTkxMjEtNmEwZjcyYzY5YjFkIiwianRpIjoiMjlhMGMyODgtMzliNy00ZTY0LWEwMWQtODQ3MTEyMWNhYzkxIn0.JQfcsD4esZqIzhTFE8rr4Q3kHnBGpNsUyBKDURjkfNo',
    payload: {
      iat: now.getTime(),
      exp: now.getTime() + 24 * 60 * 60 * 1000,
      aud: 'https://yourdomain.com',
      iss: 'feathers',
      sub: v4(),
      jti: v4()
    }
  },
  user: dummyUser
};

export const dummyAcceptedPresentation: AcceptedPresentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  verifierDid: dummyVerifierDid,
  uuid: '1b42c5bd-f9e3-46ab-bf3a-1d886f712951',
  presentationRequestId: 'd0c0c19f-cdfb-422c-b1a1-416e5a6ab890',
  verifiableCredential: [
    {
      id: '808befa8-cb80-41f2-a092-3a2542bde1a0',
      issuer: 'did:unum:8af05d2e-abda-466b-a70b-7c176401f520',
      type: [
        'VerifiableCredential',
        'DemoAuthCredential'
      ],
      '@context': [
        'https://www.w3.org/2018/credentials/v1'
      ],
      credentialStatus: {
        id: 'https://api.dev-unumid.org//credentialStatus/808befa8-cb80-41f2-a092-3a2542bde1a0',
        type: 'CredentialStatus'
      },
      credentialSubject: '{"id":"did:unum:ab8cc239-c146-4d9d-8332-ac8182f94696","isAuthorized":true,"userUuid":"eef4db1a-1310-4a60-9ef8-9ee5fc32fe8a","userEmail":"jacob@unum.id"}',
      issuanceDate: new Date('2021-03-11T01:57:20.185Z'),
      proof: {
        created: '2021-03-11T01:57:20.187Z',
        signatureValue: 'AN1rKvt22FJSY8NH89MENJfibsgqTbKwH7gBUqREMP6dSK8MhMUL2WX6smvEYNccVfppR1iXoycnoRos827UPTj1brEQk9h9G',
        type: 'secp256r1Signature2020',
        verificationMethod: 'did:unum:8af05d2e-abda-466b-a70b-7c176401f520',
        proofPurpose: 'AssertionMethod'
      }
    }
  ],
  type: [
    'VerifiablePresentation'
  ],
  proof: {
    created: '2021-03-11T02:37:58.664Z',
    signatureValue: '381yXZDJeBhH2fnJH1Uy6F4FmPVsSCUiCVgDcSVWu9hGfXgctgQKHNufWmRrJ1BH4wiSbsg74mtVu7356ZuS6xqKkdizDr6s',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:9d79fab6-65d7-455d-9160-780b4c152ef6#38de59ae-d475-45b1-8d6b-38764aeec96f',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyDemoAcceptedPresentationDto: DemoAcceptedPresentationDto = {
  presentation: dummyAcceptedPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};

export const dummyDeclinedPresentation: DeclinedPresentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  verifierDid: dummyVerifierDid,
  uuid: '1b42c5bd-f9e3-46ab-bf3a-1d886f712951',
  presentationRequestId: 'd0c0c19f-cdfb-422c-b1a1-416e5a6ab890',
  type: [
    'VerifiablePresentation'
  ],
  proof: {
    created: '2021-03-11T02:37:58.664Z',
    signatureValue: '381yXZDJeBhH2fnJH1Uy6F4FmPVsSCUiCVgDcSVWu9hGfXgctgQKHNufWmRrJ1BH4wiSbsg74mtVu7356ZuS6xqKkdizDr6s',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:9d79fab6-65d7-455d-9160-780b4c152ef6#38de59ae-d475-45b1-8d6b-38764aeec96f',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyDemoDeclinedPresentationDto: DemoDeclinedPresentationDto = {
  presentation: dummyDeclinedPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};
