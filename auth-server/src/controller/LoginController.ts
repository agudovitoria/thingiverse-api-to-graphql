import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Logger } from 'winston';
import WinstonLogger from '../config/WinstonLogger';
import { AxiosError } from 'axios';
import LoginService from "../service/LoginService";
import EnvironmentVariablesManager from '../shared/EnvironmentVariablesManager';
import ErrorMessages from '../shared/ErrorMessages';

export default class LoginController {
  logger: Logger;
  service: LoginService;
  envs: EnvironmentVariablesManager;

  constructor() {
    this.logger = new WinstonLogger()?.logger;
    this.service = new LoginService();
    this.envs = new EnvironmentVariablesManager();
  }

  login(request: Request, response: Response) {
    const token: string = this.extractTokenFromRequest(request);

    if (!token) {
      return response.redirect(this.getAuthorizeUrl());
    }

    this.service.login(token);
  }

  codeExchange(request: Request, response: Response) {
    const code: string = <string>request?.query?.code;

    if (!code) {
      return response.status(StatusCodes.BAD_REQUEST)
        .send({ message: ErrorMessages.INVALID_CODE_TO_EXCHANGE });
    }

    const accessTokenObtained = this.service.codeExchange(code);

    accessTokenObtained
      .then((accessToken) => response.status(StatusCodes.OK).send(accessToken))
      .catch(({ message }: Error) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message }));
  }

  userInfo(request: Request, response: Response) {
    const accessToken: string = <string>request?.query?.accessToken;

    if (!accessToken) {
      return response.status(StatusCodes.BAD_REQUEST)
        .send({ message: ErrorMessages.INVALID_ACCESS_TOKEN_TO_AUTHENTICATE });
    }

    this.service.userInfo(accessToken)
      .then((userInfo: any) => response.status(StatusCodes.OK).send(userInfo))
      .catch(({ message }: AxiosError) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message }));
  }

  private getAuthorizeUrl(): string {
    const baseUrl: string = this.envs.getEnvByName('base_url');
    const loginRedirectUrl: string = this.envs.getEnvByName('login_redirect_url');
    const clientId: string = this.envs.getEnvByName('client_id');

    const url: URL = new URL(`${baseUrl}${loginRedirectUrl}`);

    url.searchParams.append('client_id', clientId);

    return url.toString();
  };

  private extractTokenFromRequest(request: Request): string {
    return request?.headers?.authorization || '';
  }
}