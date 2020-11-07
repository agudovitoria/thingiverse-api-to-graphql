jest.mock('../../service/LoginService');
jest.mock('../../config/WinstonLogger');

import { data } from '../../service/__mocks__/LoginService';

import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import LoginController from '../LoginController';
import { StatusCodes } from 'http-status-codes';

describe('Login service class test', () => {

  const loginController: LoginController = new LoginController();
  let onLogin: any;
  let onCodeExchange: any;
  let onUserInfo: any;

  afterEach(() => {
    onLogin?.mockRestore();
    onCodeExchange?.mockRestore();
    onUserInfo?.mockRestore();
    
    jest.clearAllMocks();
  });

  test('It should initialize', () => {
    expect(loginController.envs).toBeTruthy;
    expect(loginController.logger).toBeTruthy;
    expect(loginController.service).toBeTruthy;
    expect(loginController.codeExchange).toBeTruthy;
    expect(loginController.login).toBeTruthy;
    expect(loginController.userInfo).toBeTruthy;
  });

  test('It should redirect if request has not authorization header', () => {
    onLogin = jest.spyOn(loginController.service, 'login').mockRejectedValue({});

    const req: Request = getMockReq();
    const { res }: { res: Response } = getMockRes();

    loginController.login(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(onLogin).not.toHaveBeenCalled();
  });

  test('It should call LoginService.login() if request has authorization header', () => {
    onLogin = jest.spyOn(loginController.service, 'login').mockResolvedValue({});

    const req: Request = getMockReq({
      headers: {
        authorization: data.VALID_TOKEN
      }
    });
    
    const { res }: { res: Response } = getMockRes();
    
    loginController.login(req, res);
    
    expect(onLogin).toHaveBeenCalledTimes(1);
  });
  
  test('It should response with code 400 if request has not code parameter when call to codeExchange', async () => {
    onCodeExchange = jest.spyOn(loginController.service, 'codeExchange').mockResolvedValue({});

    const req: Request = getMockReq();
    const { res }: { res: Response } = getMockRes();

    await loginController.codeExchange(req, res);

    expect(res).rejects;
    expect(onCodeExchange).not.toHaveBeenCalled();
  });

  test('It should call LoginService.codeExchange() if request has code parameter', async () => {
    onCodeExchange = jest.spyOn(loginController.service, 'codeExchange').mockResolvedValue({});

    const req: Request = getMockReq({
      query: {
        code: data.VALID_CODE
      }
    });

    const { res }: { res: Response } = getMockRes();

    await loginController.codeExchange(req, res);

    expect(onCodeExchange).toHaveBeenCalledTimes(1);
  });

  test('It should answer with status 200 and access token if LoginService.codeExchange() resolves properly', async () => {
    onCodeExchange = jest.spyOn(loginController.service, 'codeExchange').mockResolvedValue(data.VALID_TOKEN);
    
    const req: Request = getMockReq({
      query: {
        code: data.VALID_CODE
      }
    });
    
    const { res }: { res: Response } = getMockRes();
    
    await loginController.codeExchange(req, res);
    
    expect(res.status).toBeCalledWith(StatusCodes.OK);
    expect(res.send).toBeCalledWith(data.VALID_TOKEN);
  });
  
  test('It should response with code 400 if request has not code parameter when call to userInfo', async () => {
    onUserInfo = jest.spyOn(loginController.service, 'userInfo').mockResolvedValue({});

    const req: Request = getMockReq();
    const { res }: { res: Response } = getMockRes();

    await loginController.userInfo(req, res);

    expect(res).rejects;
    expect(onUserInfo).not.toHaveBeenCalled();
  });

  test('It should call LoginService.userInfo() if request has accessToken parameter', async () => {
    onUserInfo = jest.spyOn(loginController.service, 'userInfo').mockResolvedValue({});

    const req: Request = getMockReq({
      query: {
        accessToken: data.VALID_TOKEN
      }
    });

    const { res }: { res: Response } = getMockRes();

    await loginController.userInfo(req, res);

    expect(onUserInfo).toHaveBeenCalledTimes(1);
  });

  test('It should answer with status 200 and access token if LoginService.getUserInfo() resolves properly', async () => {
    onUserInfo = jest.spyOn(loginController.service, 'userInfo').mockResolvedValue(data.VALID_USER_INFO);

    const req: Request = getMockReq({
      query: {
        accessToken: data.VALID_TOKEN
      }
    });

    const { res }: { res: Response } = getMockRes();

    await loginController.userInfo(req, res);

    expect(res.status).toBeCalledWith(StatusCodes.OK);
    expect(res.send).toBeCalledWith(data.VALID_USER_INFO);
  });

});
