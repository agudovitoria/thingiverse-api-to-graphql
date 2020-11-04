import request, { Response } from 'supertest';
import { StatusCodes } from 'http-status-codes';
import Server from '../src/domain/Server';

describe('Server class test', () => {
  const { server }: Server = new Server();
  
  afterAll(() => server.close());

  test('It should response with 404 when GET to root', async () => {
    const response: Response = await request(server).get('/');
    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});