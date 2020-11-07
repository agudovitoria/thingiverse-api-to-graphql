import ErrorMessages from '../../shared/ErrorMessages';

export default class NotValidAccessTokenOnResponse extends Error { 
  constructor() { 
    super(ErrorMessages.NOT_VALID_ACCESS_TOKEN_RESPONSE);
  }
}