import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosDebugLog from 'axios-debug-log';
import debug, { Debugger } from 'debug';
import { StatusCodes } from 'http-status-codes';
import qs from 'qs';
import InvalidAccessToken from '../domain/error/InvalidAccessToken';
import NotValidAccessTokenOnResponse from '../domain/error/NotValidAccessTokenOnResponse';
import EnvironmentVariablesManager from '../shared/EnvironmentVariablesManager';

export default class ThingiverseClient {
  private envs: EnvironmentVariablesManager;

  private thingiverse: AxiosInstance;
  private thingiverseLogger: Debugger;
  private thingiverseApi: AxiosInstance;
  private thingiverseApiLogger: Debugger;

  constructor() {
    this.envs = new EnvironmentVariablesManager();

    const baseUrl: string = this.envs.getEnvByName('base_url');
    const apiBaseUrl: string = this.envs.getEnvByName('api_base_url');

    this.thingiverse = axios.create({ baseURL: baseUrl });
    this.thingiverseLogger = debug('thingiverse');
    this.thingiverseApi = axios.create({ baseURL: apiBaseUrl });
    this.thingiverseApiLogger = debug('thingiverseApi');

    axiosDebugLog.addLogger(this.thingiverse, this.thingiverseLogger);
    axiosDebugLog.addLogger(this.thingiverseApi, this.thingiverseApiLogger);
  }

  getAccessTokenFromCode(code: string): Promise<any> {
    const clientId: string = this.envs.getEnvByName('client_id');
    const clientSecret: string = this.envs.getEnvByName('client_secret');
    const url: string = this.envs.getEnvByName('access_token_from_code_url');
    
    const data: string = qs.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code
    });
    
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    
    return this.thingiverse.post(url, data, config)
    .then((response: AxiosResponse) => {
      if (response.status !== StatusCodes.OK) {
        throw new NotValidAccessTokenOnResponse();
      }
      
      return this.extractTokenFromResponse(response);
    });
  };
  
  validateToken(accessToken: string): Promise<any> {
    
    const validateTokenUrl: string = this.envs.getEnvByName('validate_token_url');
    const tokenAccess: string = qs.stringify({'access_token': accessToken});
    const url: string = `${validateTokenUrl}?${tokenAccess}`;

    return this.thingiverse.post(url)
      .then(({ data }: AxiosResponse) => data);
  };

  getUserInfo(accessToken: string): Promise<any> {
    const url: string = this.envs.getEnvByName('user_info_url');
    
    const config: AxiosRequestConfig = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };

    return this.thingiverseApi.get(url, config)
    .then(({ data }: AxiosResponse) => data);
  };

  private extractTokenFromResponse(response: AxiosResponse) {
    const invalidTokenResponse = (splitted: any) => (!(splitted instanceof Array) || splitted.length !== 3);
    const regexp: RegExp = /^access_token=([0-9a-f]{32})&token_type=(.*)$/gi;
    const splitted = regexp.exec(response.data);
  
    if (!splitted || invalidTokenResponse(splitted)) {
      throw new InvalidAccessToken();
    }
  
    const access_token: string = splitted[1];
  
    return { access_token };
  };
}