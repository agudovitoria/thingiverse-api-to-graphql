import ErrorMessages from '../../shared/ErrorMessages';

export default class InvalidAccessTokenToAuthenticate extends Error {
  constructor() {
    super(ErrorMessages.INVALID_ACCESS_TOKEN_TO_AUTHENTICATE);
  }
}