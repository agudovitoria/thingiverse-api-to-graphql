export class ApiConfig {
  static readonly base = 'http://localhost:8080/api';
  static readonly loginUri = `${ApiConfig.base}/login`;
  static readonly codeToTokenUri = '/exchange';
};
