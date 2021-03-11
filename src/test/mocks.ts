import {
  DemoPresentationRequestDto,
  DemoPresentationRequestCreateOptions,
  DemoSession,
  DemoPresentationDto,
  DemoNoPresentationDto,
  DemoUserWithoutPassword,
  DemoUserCreateOptions
} from '@unumid/demo-types';
import { Presentation, NoPresentation, PresentationRequestPostDto } from '@unumid/types';
import { v4 } from 'uuid';

import { DemoUserAuthenticationResult } from '../types';

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
    issuers: [dummyIssuerDid]
  }],
  metadata: { sessionUuid: v4() }
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
      issuers: [dummyIssuerDid]
    }],
    proof: {
      created: now.toISOString(),
      signatureValue: 'dummy signature value',
      unsignedValue: 'dummy unsigned value',
      type: 'secp256r1signature2020',
      verificationMethod: dummyVerifierDidWithFragment,
      proofPurpose: 'assertionMethod'
    },
    metadata: {},
    holderAppUuid: dummyHolderAppUuid
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
  deeplink: `acme://unumid/presentationRequest/${dummyPresentationRequestUuid}`,
  qrCode: 'data:image/png;base64,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'
};

export const dummyDemoPresentationRequestoDto: DemoPresentationRequestDto = {
  presentationRequestPostDto: dummyPresentationRequestPostDto,
  uuid: v4(),
  createdAt: now,
  updatedAt: now
};

export const dummyPresentation: Presentation = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  uuid: '1b42c5bd-f9e3-46ab-bf3a-1d886f712951',
  presentationRequestUuid: 'd0c0c19f-cdfb-422c-b1a1-416e5a6ab890',
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
        unsignedValue: '{"@context":["https://www.w3.org/2018/credentials/v1"],"credentialStatus":{"id":"https://api.dev-unumid.org//credentialStatus/808befa8-cb80-41f2-a092-3a2542bde1a0","type":"CredentialStatus"},"credentialSubject":{"id":"did:unum:ab8cc239-c146-4d9d-8332-ac8182f94696","isAuthorized":true,"userEmail":"jacob@unum.id","userUuid":"eef4db1a-1310-4a60-9ef8-9ee5fc32fe8a"},"id":"808befa8-cb80-41f2-a092-3a2542bde1a0","issuanceDate":"2021-03-11T01:57:20.185Z","issuer":"did:unum:8af05d2e-abda-466b-a70b-7c176401f520","type":["VerifiableCredential","DemoAuthCredential"]}',
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
    proofPurpose: 'assertionMethod',
    unsignedValue: '{"@context":["https://www.w3.org/2018/credentials/v1"],"presentationRequestUuid":"d0c0c19f-cdfb-422c-b1a1-416e5a6ab890","type":["VerifiablePresentation"],"uuid":"1b42c5bd-f9e3-46ab-bf3a-1d886f712951","verifiableCredential":[{"@context":["https://www.w3.org/2018/credentials/v1"],"credentialStatus":{"id":"https://api.dev-unumid.org//credentialStatus/808befa8-cb80-41f2-a092-3a2542bde1a0","type":"CredentialStatus"},"credentialSubject":{"id":"did:unum:ab8cc239-c146-4d9d-8332-ac8182f94696","isAuthorized":true,"userEmail":"jacob@unum.id","userUuid":"eef4db1a-1310-4a60-9ef8-9ee5fc32fe8a"},"id":"808befa8-cb80-41f2-a092-3a2542bde1a0","issuanceDate":"2021-03-11T01:57:20.185Z","issuer":"did:unum:8af05d2e-abda-466b-a70b-7c176401f520","proof":{"created":"2021-03-11T01:57:20.187Z","proofPurpose":"AssertionMethod","signatureValue":"AN1rKvt22FJSY8NH89MENJfibsgqTbKwH7gBUqREMP6dSK8MhMUL2WX6smvEYNccVfppR1iXoycnoRos827UPTj1brEQk9h9G","type":"secp256r1Signature2020","unsignedValue":"{\\"@context\\":[\\"https://www.w3.org/2018/credentials/v1\\"],\\"credentialStatus\\":{\\"id\\":\\"https://api.dev-unumid.org//credentialStatus/808befa8-cb80-41f2-a092-3a2542bde1a0\\",\\"type\\":\\"CredentialStatus\\"},\\"credentialSubject\\":{\\"id\\":\\"did:unum:ab8cc239-c146-4d9d-8332-ac8182f94696\\",\\"isAuthorized\\":true,\\"userEmail\\":\\"jacob@unum.id\\",\\"userUuid\\":\\"eef4db1a-1310-4a60-9ef8-9ee5fc32fe8a\\"},\\"id\\":\\"808befa8-cb80-41f2-a092-3a2542bde1a0\\",\\"issuanceDate\\":\\"2021-03-11T01:57:20.185Z\\",\\"issuer\\":\\"did:unum:8af05d2e-abda-466b-a70b-7c176401f520\\",\\"type\\":[\\"VerifiableCredential\\",\\"DemoAuthCredential\\"]}","verificationMethod":"did:unum:8af05d2e-abda-466b-a70b-7c176401f520"},"type":["VerifiableCredential","DemoAuthCredential"]}]}'
  }
};

export const dummyDemoPresentationDto: DemoPresentationDto = {
  presentation: dummyPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};

export const dummyNoPresentation: NoPresentation = {
  holder: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
  presentationRequestUuid: '256e9461-4b65-4941-a6cd-e379276a45b4',
  type: ['NoPresentation', 'NoPresentation'],
  proof: {
    created: '2021-02-22T21:30:03.377Z',
    signatureValue: 'AN1rKvszAWeMwUW7ghrEG9BfWr7a5n9kWpvqQrW5bQKM9sCS4KDmiwX6PZidMNcYRTvwQ9RLyHELQu33TbcUPVwWEqE23wJHs',
    unsignedValue: '{"holder":"did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03","presentationRequestUuid":"256e9461-4b65-4941-a6cd-e379276a45b4","type":["NoPresentation","NoPresentation"]}',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:5b329cd1-4832-448c-8d7d-08f49e3c6c6d#bab80ad2-08ad-44e7-8549-3d10dd6f7c03',
    proofPurpose: 'assertionMethod'
  }
};

export const dummyDemoNoPresentationDto: DemoNoPresentationDto = {
  noPresentation: dummyNoPresentation,
  uuid: v4(),
  createdAt: now,
  updatedAt: now,
  isVerified: true
};

export const dummyUserCreateOptions: DemoUserCreateOptions = {
  email: 'test@unum.id',
  password: 'test'
};

export const dummyUser: DemoUserWithoutPassword = {
  email: dummyUserCreateOptions.email,
  uuid: v4(),
  createdAt: now,
  updatedAt: now
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
