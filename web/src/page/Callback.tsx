import React, { useContext, useEffect, useState } from 'react';

import ErrorMessage from '../components/ErrorMessage';
import Loading from '../components/Loading';
import Title from '../components/Title';
import { AuthContext } from '../context/AuthContext';
import { tokenFromCode } from '../service/LoginService';

interface CallbackProps {
  location: Location;
}

export default (props: CallbackProps) => {
  const { token, setToken } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [code, setCode] = useState('');

  useEffect(() => {
    (async () => {
      setAsLoading();
      try {
        const accessToken = await tokenFromCode(code);
        setToken(accessToken);
        window.location.href = '/';
      } catch (error) {
        setError(error);
      } finally {
        setAsReady();
      }
    })();
  }, [code, setToken]);

  const setAsLoading = () => setLoading(true);
  const setAsReady = () => setLoading(false);

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
          <Title title="Callback page" />
          {!!error && <ErrorMessage message={error} />}
          {loading && <Loading content={`Retrieving token from code ${code}`} />}
          {!!token && <Loading content={`Received token: ${token}`} />}
        </div>
      </div>
    </div>
  );
};
