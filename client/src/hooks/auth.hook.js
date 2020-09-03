import { useState, useCallback } from 'react';

const LOGIN_URL = '/api/auth/login';
const REGISTER_USER_URL = '/api/auth/register';
const BASE_API_URL = '/api';

const baseHeaders = new Headers({
  'Content-Type': 'application/json',
});

export function useRegisterUser() {
  const [error, setError] = useState('');
  const register = useCallback(
    async (email, password) => {
      setError('');
      try {
        const resp = await fetch(REGISTER_USER_URL, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ email, password }),
        });
        if (!resp.ok) {
          const data = await resp.json();
          throw new Error(data.message || 'Something went wrong');
        }
        return true;
      } catch (err) {
        setError(err.message);
        console.log('[ERROR]: ', err.message);
        return false;
      }
    },
    [setError]
  );
  return { register, error };
}

export function useHttp() {
  const initialToken = localStorage.getItem('token');

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(null);
  const [authenticated, setAuthenticated] = useState(!!initialToken);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async (email, password) => {
      setError('');
      setLoading(true);
      try {
        const resp = await fetch(LOGIN_URL, {
          method: 'POST',
          headers: baseHeaders,
          body: JSON.stringify({ email, password }),
        });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.message || 'Something went wrong');
        }
        const { token, userId } = data;
        setToken(token);
        localStorage.setItem('token', token);
        setUserId(userId);
        setAuthenticated(true);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.log('[ERROR]: ', err.message);
      }
    },
    [setToken, setAuthenticated, setUserId]
  );

  const logout = useCallback(() => {
    setToken(null);
    setAuthenticated(null);
    setUserId(null);
    localStorage.removeItem('token');
  }, [setToken, setAuthenticated, setUserId]);

  const request = useCallback(
    async (
      url,
      method = 'GET',
      headers = baseHeaders,
      body = null,
      baseUrl = BASE_API_URL
    ) => {
      headers.append('Athorization', `Bearer ${token}`);
      setLoading(true);
      try {
        const resp = fetch(`${baseUrl}${url}`, { method, headers, body });
        const data = await resp.json();
        if (!resp.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }
        setLoading(false);
        return data;
      } catch (err) {
        console.log('[ERROR]: ', err.message);
        setLoading(false);
        throw err;
      }
    },
    [token]
  );

  return {
    authenticated,
    token,
    userId,
    error,
    loading,
    request,
    login,
    logout,
  };
}
