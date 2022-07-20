import { FC } from 'react';
import { Credential, Presentation } from '@unumid/types';
import { DemoPresentationDto } from '@unumid/demo-types';

// These 'Deprecated-' types are to reflect that we can't control what version of the mobile sdk a user might have.
// Older versions will share these types.
import {
  Presentation as DeprecatedPresentation,
  NoPresentation as DeprecatedNoPresentation
} from '@unumid/types-deprecated-v1';

import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated-v1';

// eslint-disable-next-line @typescript-eslint/ban-types
export type FCWithClassName<P = {}> = FC<P & { className?: string }>;

// type of the object returned when authenticating with the issuer server
export interface DemoUserAuthenticationResult {
  accessToken: string;
  authentication: {
    strategy: string,
    accessToken: string;
    payload: {
      iat: number;
      exp: number;
      aud: string;
      iss: string;
      sub: string;
      jti: string;
    }
  },
  user: DemoUser
}

// Type shared by a holder using the latest sdk version when a user declines to share credentials
export interface DeclinedPresentation extends Presentation {
  verifiableCredential?: never[];
}

// Type shared by a holder using the latest sdk version when a user shares credentials.
export interface AcceptedPresentation extends Presentation {
  verifiableCredential: Credential[];
}

// Type emitted by the server when an AcceptedPresentation is verified.
export interface DemoAcceptedPresentationDto extends DemoPresentationDto {
  presentation: AcceptedPresentation;
}

// Type emitted by the server when a DeclinedPresentation is verified.
export interface DemoDeclinedPresentationDto extends DemoPresentationDto {
  presentation: DeclinedPresentation;
}

// Encapsulates all of the possible types shared by a holder.
export type PresentationLike = Presentation | DeprecatedPresentation | DeprecatedNoPresentation;

// Encapsulates all of the possible types emitted by the server when a holder shares.
export type DemoPresentationLikeDto = DemoPresentationDto | DeprecatedDemoNoPresentationDto | DeprecatedDemoPresentationDto;

export interface HvConfidence {
  value: string; // i.e. "yes"
  confidence: string; // i.e. "high"
}

export interface HvFaceMatchData {
  responseResult: {
    result: {
      details: {
        match: HvConfidence
      };
    }
  }
}

export interface HvFaceData {
  fullFaceImagePath: string; // base64 encoded image
  responseResult: {
    result: {
      details: {
        liveFace: HvConfidence
      }
    }
  }
}

export interface HvDocField {
  value: string;
}

export interface HvDocFields {
  address: HvDocField;
  dateOfBirth: HvDocField; // value in the format "dD-mM-YYYY" as of 6/23/2022
  fullName: HvDocField;
  gender: HvDocField;
}

export interface HvDocData {
  docImagePath: string; // base64 encoded image
  documentId: string; // i.e. 'dl', really more of doc type
  responseResult: {
    result: {
      details: Array<{
        fieldsExtracted: HvDocFields
      }>
    }
  }
}

export interface HvDocScanData {
  faceMatchData: HvFaceMatchData;
  faceData: HvFaceData;
  docListData: Array<HvDocData>;
  selectedCountryId: string; // i.e. "usa"
}
