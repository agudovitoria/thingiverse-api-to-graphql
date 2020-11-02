import React, { useState, createContext, Context} from 'react';
import { TokenAccess } from '../domain/TokenResponse';

export interface AuthStore {
    token: string;
    setToken: (accessToken: TokenAccess) => void;
}

export const AuthContext: Context<AuthStore> = createContext({
    token: '',
    setToken: (accessToken: TokenAccess) => {
    }
});

export const AuthContextProvider = (props: React.PropsWithChildren<any>) => {
    const setToken = ({ access_token: token }: TokenAccess) => setState({
        ...state,
        token
    });

    const initialState: AuthStore = {
        token: '',
        setToken
    };

    const [state, setState] = useState(initialState);

    return (
        <AuthContext.Provider value={initialState}>
            { props.children }
        </AuthContext.Provider>
    );
};
