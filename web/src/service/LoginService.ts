import axios, { AxiosInstance } from 'axios';
import { TokenAccess, TokenResponse } from '../domain/TokenResponse';
import { ApiConfig } from '../shared/ApiConfig';
import { haveToken, saveToken } from './StorageService';

const client: AxiosInstance = axios.create({ baseURL: ApiConfig.base });

export const goToAuthPage = () => window.location.href = ApiConfig.loginUri;
export const  goToMainPage =  () => window.location.href = '/';

export const login = () => {
    if (!haveToken()) {
        return goToAuthPage();
    }

    goToMainPage();
};

export const tokenFromCode = (code: string): Promise<TokenAccess> => {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.append('code', code);

    const url: string = `${ApiConfig.codeToTokenUri}?${urlSearchParams.toString()}`;

    return client.get(url)
        .then(({ data }: TokenResponse) => data)
        .then((accessToken: TokenAccess) => {
            if (!accessToken) {
                throw new Error('Invalid access token response');
            }

            saveToken(accessToken);

            return accessToken;
        });
};

