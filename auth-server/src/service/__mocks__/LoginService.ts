import winstonLoggerMock from '../../config/__mocks__/WinstonLogger';
import thingiverseClientMock from '../../client/__mocks__/ThingiverseClient';

export const data = {
  VALID_TOKEN: 'f-a-k-e-a-c-c-e-s-s-t-o-k-e-n',
  INVALID_TOKEN: '',
  VALID_CODE: 'f-a-k-e-c-o-d-e',
  INVALID_CODE: '',
  VALID_USER_INFO: {
    fullName: 'Fake User Info',
    user: 'fakeUserName',
    email: 'fakeusername@fakehost.com'
  },
  INVALID_USER_INFO: {}
};

export default () => ({
  logger: winstonLoggerMock(),
  client: thingiverseClientMock(),
  login:jest.fn(),
  codeExchange: jest.fn(),
  userInfo: jest.fn()
});
