import ErrorMessages from '../../shared/ErrorMessages';

export default class InvalidCodeToExchange extends Error {
  constructor() {
    super(ErrorMessages.INVALID_CODE_TO_EXCHANGE);
  }
}