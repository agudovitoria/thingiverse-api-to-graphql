jest.mock('../../config/WinstonLogger');
jest.mock('../../client/ThingiverseClient');

import { data } from '../__mocks__/LoginService';

import InvalidAccessTokenToAuthenticate from '../../domain/error/InvalidAccessTokenToAuthenticate';
import InvalidCodeToExchange from '../../domain/error/InvalidCodeToExchange';
import LoginService from '../LoginService';

describe('Login service class test', () => {

  const service: LoginService = new LoginService();
  let onGetAccessTokenFromAccess: any;
  let onValidateToken: any;
  let onGetUserInfo: any;
  
  beforeEach(() => {
    onGetAccessTokenFromAccess = jest.spyOn(service.client, 'getAccessTokenFromCode');
    onValidateToken = jest.spyOn(service.client, 'validateToken');
    onGetUserInfo = jest.spyOn(service.client, 'getUserInfo');
  });
  
  afterEach(() => {
    onGetAccessTokenFromAccess.mockRestore();
    onValidateToken.mockRestore();
    onGetUserInfo.mockRestore();
    jest.clearAllMocks();
  });

  test('It should initialize', () => {
    expect(service.logger).toBeTruthy;
    expect(service.client).toBeTruthy;

    expect(service.client.getAccessTokenFromCode).toBeTruthy;
    expect(service.client.getUserInfo).toBeTruthy;
    expect(service.client.validateToken).toBeTruthy;
    
    expect(service.login).toBeTruthy;
    expect(service.codeExchange).toBeTruthy;
    expect(service.userInfo).toBeTruthy;
  });

  test('It should throw and error when call to login method with no token', () => { 
    expect(() => service.login(data.INVALID_TOKEN)).toThrowError(new InvalidAccessTokenToAuthenticate());
  });

  test('It should call to validateToken method', () => {
    
    service.login(data.VALID_TOKEN);

    expect(onValidateToken).toHaveBeenCalled();
  });

  test('It should throw and error when call to codeExchange method with no code', () => { 
    expect(() => service.codeExchange(data.INVALID_CODE)).toThrowError(new InvalidCodeToExchange());
  });

  test('It should call to validateToken method', () => {

    service.codeExchange(data.VALID_CODE);
    
    expect(onGetAccessTokenFromAccess).toHaveBeenCalled();
  });  

  test('It should throw and error when call to userInfo method with no access token', () => { 
    expect(() => service.userInfo(data.INVALID_TOKEN)).toThrowError(new InvalidAccessTokenToAuthenticate());
  });

  test('It should call to getUserInfo method', () => {

    service.userInfo(data.VALID_TOKEN);
    
    expect(onGetUserInfo).toHaveBeenCalled();
  });  

});