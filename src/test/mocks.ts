import {
  DemoPresentationRequestDto,
  DemoPresentationRequestCreateOptions,
  DemoSession,
  DemoPresentationDto,
  DemoNoPresentationDto
} from '@unumid/demo-types';
import { Presentation, NoPresentation, PresentationRequestPostDto } from '@unumid/types';
import { v4 } from 'uuid';

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
  presentationRequestUuid: '256e9461-4b65-4941-a6cd-e379276a45b4',
  proof: {
    created: '2021-02-22T11:36:34.113-0800',
    proofPurpose: 'Presentations',
    signatureValue: '381yXZEx4Z3tfBztX1o6xHbkqRija3svPYfTygUfK6uh8dHjeexaCq7nNvW17Sedd9Y93BJ9HsT17RtsCQ6NfFQomSF4pyx5',
    unsignedValue: '{"@context":["https://www.w3.org/2018/credentials/v1"],"presentationRequestUuid":"256e9461-4b65-4941-a6cd-e379276a45b4","type":["VerifiablePresentation"],"uuid":"e0d0951a-190c-4dcb-9655-092012b7f265","verifiableCredential":[{"@context":["https://www.w3.org/2018/credentials/v1"],"credentialStatus":{"id":"https://api.sandbox-unumid.org//credentialStatus/d90b1bac-4805-410b-b81f-10b96fea8e98","type":"CredentialStatus"},"credentialSubject":{"accounts":{"checking":{"accountNumber":"543888430912","routingNumber":"021000021"}},"confidence":"99%","contactInformation":{"emailAddress":"AnvilAvoider@gmail.com","homeAddress":{"city":"Desert","country":"United States","line1":"98765 Runner Rd.","state":"AZ","zip":12345},"phoneNumber":"1234567890"},"driversLicense":{"expiration":"2026-01-14T00:00:00.000Z","number":"n-123456789","state":"AZ"},"firstName":"Wile","id":"did:unum:8de4666d-9692-4762-a015-0b8b1f8e08f7","lastName":"Coyote","middleInitial":"E.","ssn4":4321,"username":"state-Montana-211"},"expirationDate":"2022-02-11T00:00:00.000Z","id":"d90b1bac-4805-410b-b81f-10b96fea8e98","issuanceDate":"2021-02-11T22:23:05.590Z","issuer":"did:unum:de9523d0-b97e-466c-80f4-ae312dd091ae","proof":{"created":"2021-02-11T22:23:05.590Z","proofPurpose":"AssertionMethod","signatureValue":"iKx1CJPw1Yog6jfUhEtzasgP3gC8AKzc9L4GXh3Zox8AYLjymu83P5SPsw4zx2JuVy7PXWYakgbDUdgS5CvH22rNcF2N9tYQ4b","type":"secp256r1Signature2020","verificationMethod":"did:unum:de9523d0-b97e-466c-80f4-ae312dd091ae"},"type":["VerifiableCredential","BankIdentityCredential"]}]}',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:8de4666d-9692-4762-a015-0b8b1f8e08f7#5ab4997a-73c2-498a-b6f1-53a6787cfd22'
  },
  type: [
    'VerifiablePresentation'
  ],
  uuid: 'e0d0951a-190c-4dcb-9655-092012b7f265',
  verifiableCredential: [
    {
      '@context': [
        'https://www.w3.org/2018/credentials/v1'
      ],
      credentialStatus: {
        id: 'https://api.sandbox-unumid.org//credentialStatus/d90b1bac-4805-410b-b81f-10b96fea8e98',
        type: 'CredentialStatus'
      },
      credentialSubject: {
        accounts: {
          checking: {
            accountNumber: '543888430912',
            routingNumber: '021000021'
          }
        },
        confidence: '99%',
        contactInformation: {
          emailAddress: 'AnvilAvoider@gmail.com',
          homeAddress: {
            city: 'Desert',
            country: 'United States',
            line1: '98765 Runner Rd.',
            state: 'AZ',
            zip: 12345
          },
          phoneNumber: '1234567890'
        },
        driversLicense: {
          expiration: '2026-01-14T00:00:00.000Z',
          number: 'n-123456789',
          state: 'AZ'
        },
        firstName: 'Wile',
        id: 'did:unum:8de4666d-9692-4762-a015-0b8b1f8e08f7',
        lastName: 'Coyote',
        middleInitial: 'E.',
        ssn4: 4321,
        username: 'state-Montana-211'
      },
      expirationDate: new Date('2022-02-11T00:00:00.000Z'),
      id: 'd90b1bac-4805-410b-b81f-10b96fea8e98',
      issuanceDate: new Date('2021-02-11T22:23:05.590Z'),
      issuer: 'did:unum:de9523d0-b97e-466c-80f4-ae312dd091ae',
      proof: {
        created: '2021-02-11T22:23:05.590Z',
        proofPurpose: 'AssertionMethod',
        signatureValue: 'iKx1CJPw1Yog6jfUhEtzasgP3gC8AKzc9L4GXh3Zox8AYLjymu83P5SPsw4zx2JuVy7PXWYakgbDUdgS5CvH22rNcF2N9tYQ4b',
        unsignedValue: '{"@context":["https://www.w3.org/2018/credentials/v1"],"credentialStatus":{"id":"https://api.sandbox-unumid.org//credentialStatus/d90b1bac-4805-410b-b81f-10b96fea8e98","type":"CredentialStatus"},"credentialSubject":{"accounts":{"checking":{"accountNumber":"543888430912","routingNumber":"021000021"}},"confidence":"99%","contactInformation":{"emailAddress":"AnvilAvoider@gmail.com","homeAddress":{"city":"Desert","country":"United States","line1":"98765 Runner Rd.","state":"AZ","zip":12345},"phoneNumber":"1234567890"},"driversLicense":{"expiration":"2026-01-14T00:00:00.000Z","number":"n-123456789","state":"AZ"},"firstName":"Wile","id":"did:unum:8de4666d-9692-4762-a015-0b8b1f8e08f7","lastName":"Coyote","middleInitial":"E.","ssn4":4321,"username":"state-Montana-211"},"expirationDate":"2022-02-11T00:00:00.000Z","id":"d90b1bac-4805-410b-b81f-10b96fea8e98","issuanceDate":"2021-02-11T22:23:05.590Z","issuer":"did:unum:de9523d0-b97e-466c-80f4-ae312dd091ae","type":["VerifiableCredential","BankIdentityCredential"]}',
        type: 'secp256r1Signature2020',
        verificationMethod: 'did:unum:de9523d0-b97e-466c-80f4-ae312dd091ae'
      },
      type: [
        'VerifiableCredential',
        'BankIdentityCredential'
      ]
    }
  ]
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
