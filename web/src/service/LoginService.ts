import axios from 'axios';

import { TokenAccess } from '../domain/TokenResponse';
import { haveToken, saveToken } from './StorageService';

const { REACT_APP_THINGIVERSE_LOGIN_URL, REACT_APP_THINGIVERSE_EXCHANGE_CODE_URL } = process.env;

export const goToAuthPage = () =>
  (window.location.href = REACT_APP_THINGIVERSE_LOGIN_URL || '/error');
export const goToMainPage = () => (window.location.href = '/');

export const login = () => {
  const wasTokenSaved = haveToken();
  if (!wasTokenSaved) {
    return goToAuthPage();
  }

  goToMainPage();
};

export const tokenFromCode = async (code: string): Promise<TokenAccess> => {
  const urlSearchParams: URLSearchParams = new URLSearchParams();
  urlSearchParams.append('code', code);

  const url: string = `${REACT_APP_THINGIVERSE_EXCHANGE_CODE_URL}?${urlSearchParams.toString()}`;

  const accessToken: TokenAccess = await axios.get(url);

  debugger;
  if (!accessToken) {
    throw new Error('Invalid access token response');
  }

  saveToken(accessToken);

  return accessToken;
};
