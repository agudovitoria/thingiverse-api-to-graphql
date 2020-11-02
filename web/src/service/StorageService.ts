import { TokenAccess } from '../domain/TokenResponse';

const TOKEN_KEY = 'access_token';

export const haveToken = (): boolean => !!sessionStorage.getItem(TOKEN_KEY);

export const saveToken = ({ access_token }: TokenAccess): void => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.setItem(TOKEN_KEY, access_token);
};

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
