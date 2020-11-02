import { Request, Response } from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import axiosDebugLog from 'axios-debug-log';
import debug from 'debug';
import qs from 'qs';
import url from 'url';
import { StatusCodes } from 'http-status-codes';

const config: DotenvConfigOutput = dotenv.config();

if (!!config?.error) {
  throw new Error(`💥 Invalid .env file or cannot parse due to ${config?.error?.message}`);
}

const {
  THINGIVERSE_URI: base_url,
  THINGIVERSE_API_URI: api_base_url,
  CLIENT_ID: client_id,
  CLIENT_SECRET: client_secret
} = process.env;

const thingiverse = axios.create({ baseURL: base_url });
const thingiverseLogger = debug('thingiverse');
axiosDebugLog.addLogger(thingiverse, thingiverseLogger);

const thingiverseApi = axios.create({ baseURL: api_base_url });
const thingiverseApiLogger = debug('thingiverseApi');
axiosDebugLog.addLogger(thingiverseApi, thingiverseApiLogger);

const getQueryParametersFromRequest = (request: Request): any => url.parse(request.url, true).query;
const getQueryParameterFromRequest = (request: Request, parameter: string): string => getQueryParametersFromRequest(request)[parameter];

// AUTHORIZATION PROCESS

//====================================================
// Step 1. Direct users to request Thingiverse access
//====================================================

const getAuthorizeUrl = (): string => {
  const url: URL = new URL(`${base_url}/login/oauth/authorize`);

  url.searchParams.append('client_id', client_id || '');

  return url.toString();
};

//====================================================
// Step 3. Exchange code for an access token
//====================================================

// A. Exchange code
const getAccessTokenFromCode = (code: string): Promise<any> => {
  const errorMessage = 'Not valid access token response from auth server';

  if (!code) {
    throw new Error('Not code found to use for access token');
  }

  const url: string = '/login/oauth/access_token';
  const data: string = qs.stringify({
    client_id,
    client_secret,
    code
  });

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  return thingiverse.post(url, data, config)
    .then((response: AxiosResponse) => {
      if (response.status !== StatusCodes.OK) {
        throw new Error(errorMessage);
      }

      return extractTokenFromResponse(response);
    });
};

const extractTokenFromResponse = (response: AxiosResponse) => {
  const invalidTokenResponse = (splitted: any) => (!(splitted instanceof Array) || splitted.length !== 3);
  const regexp: RegExp = /^access_token=([0-9a-f]{32})&token_type=(.*)$/gi;
  const splitted = regexp.exec(response.data);

  if (!splitted || invalidTokenResponse(splitted)) {
    throw new Error('Invalid code exchange token response');
  }

  const access_token: string = splitted[1];

  return { access_token };
};

// B. Validate token
const validateToken = (accessToken: string): Promise<any> => {
  const url: URL = new URL(`${base_url}/login/oauth/tokeninfo`);

  if (!accessToken) {
    throw new Error('💥  Not access token found');
  }

  url.searchParams.append('access_token', accessToken);

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain'
    }
  };

  return fetch(url.toString(), options)
    .then(result => {
      console.log('Reponse', result);
      return result.json();
    });
};

//====================================================
// Step 4. Use the access token to access the API
//====================================================
const getUserInfo = (accessToken: string) => {
  const url: string = '/users/me';
  const config: AxiosRequestConfig = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  };

  return thingiverseApi.get(url, config);
};

// ===================================================
// Login endpoints
// ===================================================

export const login = (request: Request, response: Response) => {
  const token: string | undefined = request?.headers?.authorization;

  if (!!token) {
    return validateToken(token);
  }

  console.log('⛔️  Not found token on request, Redirecting to auth page');

  response.redirect(getAuthorizeUrl());
};

export const codeExchange = (request: Request, response: Response) => {
  const message = 'Invalid code or no data to exchange';
  const code: string = getQueryParameterFromRequest(request, 'code');

  if (!code) {
    return response.status(StatusCodes.BAD_REQUEST).send({ message });
  }

  return getAccessTokenFromCode(code)
    .then((accessToken) => response.status(StatusCodes.OK).send(accessToken))
    .catch(({ message }: Error) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message }));
};

export const userInfo = (request: Request, response: Response) => {
  const message = 'Invalid access token or no data to authenticate';
  const accessToken: string = getQueryParameterFromRequest(request, 'accessToken');

  if (!accessToken) {
    return response.status(StatusCodes.BAD_REQUEST).send({ message });
  }

  return getUserInfo(accessToken)
    .then(({ data }: AxiosResponse) => data)
    .then((userInfo: any) => response.status(StatusCodes.OK).send(userInfo))
    .catch(({ message }: AxiosError) => response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message }));
};
