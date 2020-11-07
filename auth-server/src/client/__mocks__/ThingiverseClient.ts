export default () => ({
  getAccessTokenFromCode: jest.fn().mockResolvedValue({}),
  validateToken: jest.fn().mockResolvedValue({}),
  getUserInfo: jest.fn().mockResolvedValue({})
});
