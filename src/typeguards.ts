import { DemoPresentationDto } from '@unumid/demo-types';
import {
  DemoPresentationDto as DeprecatedDemoPresentationDto,
  DemoNoPresentationDto as DeprecatedDemoNoPresentationDto
} from '@unumid/demo-types-deprecated-v1';
import { Presentation } from '@unumid/types';
import {
  NoPresentation as DeprecatedNoPresentation,
  Presentation as DeprecatedPresentation
} from '@unumid/types-deprecated-v1';

import {
  AcceptedPresentation,
  DeclinedPresentation,
  DemoAcceptedPresentationDto,
  DemoDeclinedPresentationDto,
  DemoPresentationLikeDto,
  PresentationLike
} from './types';

/**
 * Typeguard to determine if a Presentation is an AcceptedPresentation.
 * Returns true if the presentation has a non-empty verifiableCredential array.
 */
export function isAcceptedPresentation (presentation: Presentation): presentation is AcceptedPresentation {
  return !!(presentation.verifiableCredential && presentation.verifiableCredential.length > 0);
}

/**
 * Typeguard to determine if a Presentation is a DeclinedPresentation.
 * Returns true if the presentation either does not have a verifiableCredential array,
 * or if it is empty.
 */
export function isDeclinedPresentation (presentation: Presentation): presentation is DeclinedPresentation {
  return !!(!presentation.verifiableCredential || presentation.verifiableCredential.length === 0);
}

/**
 * Typeguard to determine if a DemoPresentationDto is a DemoAcceptedPresentationDto.
 * Returns true if the presentation field is an AcceptedPresentation.
 */
export function isDemoAcceptedPresentationDto (dto: DemoPresentationDto): dto is DemoAcceptedPresentationDto {
  return isAcceptedPresentation(dto.presentation);
}

/**
 * Typeguard to determine if a DemoPresentationDto is a DemoDeclinedPresentationDto.
 * Returns true if the presentation field is a DeclinedPresentation.
 */
export function isDemoDeclinedPresentationDto (dto: DemoPresentationDto): dto is DemoDeclinedPresentationDto {
  return isDeclinedPresentation(dto.presentation);
}

/**
 * Typeguard to determine if a PresentationLike object is a deprecated NoPresentation.
 * Returns true if the first element in the type array is 'NoPresentation'.
 */
export function isDeprecatedNoPresentation (presentationLike: PresentationLike): presentationLike is DeprecatedNoPresentation {
  // unique among PresentationLike objects, the deprecated NoPresentation will always have 'NoPresentation' as the first element in its type array.
  return (presentationLike as DeprecatedNoPresentation).type[0] === 'NoPresentation';
}

/**
 * Typeguard to determine if a PresentationLike object is a deprecated Presentation.
 * Returns true if:
 * - it's not a deprecated NoPresentation and
 * - it includes a verifiableCredentials field

 */
export function isDeprecatedPresentation (presentationLike: PresentationLike): presentationLike is DeprecatedPresentation {
  // if it's a DeprecatedNoPresentation, it's not a DeprecatedPresentation
  if (isDeprecatedNoPresentation(presentationLike)) {
    return false;
  }

  // the DeprecatedPresentation always includes a plural verifiableCredentials property
  if ((presentationLike as DeprecatedPresentation).verifiableCredentials) {
    return true;
  }

  return false;
}

/**
 * Typeguard to determine if a PresentationLike object is a Presentation.
 * Returns true if it is not a deprecated NoPresentation or deprecated Presentation.
 */
export function isPresentation (presentationLike: PresentationLike): presentationLike is Presentation {
  // if it's a DeprecatedNoPresentation, it's not a Presentation
  if (isDeprecatedNoPresentation(presentationLike)) {
    return false;
  }

  // if it's a DeprecatedPresentation, it's not a Presentation
  if (isDeprecatedPresentation(presentationLike)) {
    return false;
  }

  return true;
}

/**
 * Typeguard to determine if a DemoPresentationLikeDto object is a DeprecatedDemoNoPresentationDto.
 * Returns true if it has a noPresentation field.
 */
export function isDeprecatedDemoNoPresentationDto (dto: DemoPresentationLikeDto): dto is DeprecatedDemoNoPresentationDto {
  // only the DeprecatedDemoNoPresentationDto has a noPresentation property
  return !!(dto as DeprecatedDemoNoPresentationDto).noPresentation;
}

/**
 * Typeguard to determine if a DemoPresentationLikeDto object is a DeprecatedDemoPresentationDto.
 * Returns true if it is not a DeprecatedDemoNoPresentationDto and the presentation field is a DeprecatedPresentation.
 */
export function isDeprecatedDemoPresentationDto (dto: DemoPresentationLikeDto): dto is DeprecatedDemoPresentationDto {
  // if it's a DeprecatedDemoNoPresentationDto it's not a DeprecatedDemoPresentationDto
  if (isDeprecatedDemoNoPresentationDto(dto)) {
    return false;
  }

  // if the presentation property is a DeprecatedPresentation, it's a DeprecatedDemoPresentationDto
  return isDeprecatedPresentation(dto.presentation);
}

/**
 * Typeguard to determine if a DemoPresentationLikeDto is a DemoPresentationDto.
 * Returns true if it has a presentation field that is a Presentation.
 */
export function isDemoPresentationDto (dto: DemoPresentationLikeDto): dto is DemoPresentationDto {
  // if it's a DeprecatedDemoNoPresentationDto it's not a DemoPresentationDto
  if (isDeprecatedDemoNoPresentationDto(dto)) {
    return false;
  }

  // if the presentation property is a Presentation, it's a DemoPresentationDto
  return isPresentation(dto.presentation);
}
