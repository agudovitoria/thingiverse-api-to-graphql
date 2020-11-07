import ErrorMessages from '../../shared/ErrorMessages';

export default class InvalidAccessToken extends Error { 
  constructor() { 
    super(ErrorMessages.INVALID_ACCESS_TOKEN_ON_CODE_EXCHANGE);
  }
}