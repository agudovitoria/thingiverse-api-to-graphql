import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import Server from '../Server';

describe.skip('Server class test', () => {
  const { server }: Server = new Server();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  test('It should response with 404 when GET to root', async () => {
    const response: Response = await request(server).get('/');
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});