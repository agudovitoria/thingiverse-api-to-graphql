import { Logger } from 'winston';

import WinstonLogger from '../config/WinstonLogger';
import InvalidAccessTokenToAuthenticate from '../domain/error/InvalidAccessTokenToAuthenticate';
import InvalidCodeToExchange from '../domain/error/InvalidCodeToExchange';
import ThingiverseClient from '../client/ThingiverseClient';

export default class LoginService {

  logger: Logger;
  client: ThingiverseClient;

  constructor() {
    this.logger = new WinstonLogger()?.logger;
    this.client = new ThingiverseClient();
  }

  login(token: string) {
    if (!token) {
      throw new InvalidAccessTokenToAuthenticate();
    }

    return this.client.validateToken(token);
  }

  codeExchange(code: string) {
    if (!code) {
      throw new InvalidCodeToExchange();
    }

    return this.client.getAccessTokenFromCode(code);
  }

  userInfo(accessToken: string) {

    if (!accessToken) {
      throw new InvalidAccessTokenToAuthenticate();
    }

    return this.client.getUserInfo(accessToken);
  }
}
