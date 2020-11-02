import React, { useContext, useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import Title from '../components/Title';
import { ErrorResponse } from '../domain/ErrorResponse';
import { tokenFromCode } from '../service/LoginService';
import { TokenAccess } from '../domain/TokenResponse';
import { AuthContext } from '../context/AuthContext';

interface CallbackProps {
    location: Location;
}

export default (props: CallbackProps) => {
    const { token, setToken } = useContext(AuthContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [code, setCode] = useState('');

    useEffect(() => {
        setAsLoading();
        tokenFromCode(code)
            .then((accessToken: TokenAccess) => {
                setToken(accessToken);
            })
            .then(() => {
                window.location.href = '/';
            })
            .catch(manageErrorResponse)
            .finally(() => setAsReady());
    }, [code]);

    const setAsLoading = () => setLoading(true);
    const setAsReady = () => setLoading(false);
    const manageErrorResponse = ({ message }: ErrorResponse) => setError(message);

    const retrieveCodeFromUri = (location: Location) => {
        const parameters = new URLSearchParams(location.search);
        const codeParamValue = parameters.get('code') || '';
        const codeIsNew = !!codeParamValue && (!code || codeParamValue !== code);

        if (codeIsNew) {
            setCode(codeParamValue);
        }
    };

    retrieveCodeFromUri(props.location);

    return (
        <div className="row centered">
            <div className="col centered flex-50">
                <div className="box">
                    <Title title="Callback page"/>
                    {!!error && <ErrorMessage message={error}/>}
                    {loading && (<Loading content={`Retrieving token from code ${code}`}/>)}
                    {!!token && (<Loading content={`Received token: ${token}`}/>)}
                </div>
            </div>
        </div>
    );
}
