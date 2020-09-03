import React, { useCallback, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AuthForm from './auth.form';
import { CardWrapper, CardFooter, CardInlineText } from '../components/shared';
import { useRegisterUser } from '../hooks';

import AuthContext from '../contexts/authContext';

export default function () {
  const { login, error: loginError } = useContext(AuthContext);
  const { register, error } = useRegisterUser();
  const actionHandler = useCallback(
    async (evt) => {
      evt.preventDefault();
      const form = evt.target;
      const data = Object.fromEntries(new FormData(form).entries());
      console.log(data);
      if (await register(data.email, data.password)) {
        login(data.email, data.password);
      }
    },
    [register, login]
  );
  return (
    <CardWrapper>
      <AuthForm
        error={error || loginError}
        login={login}
        title='Register User'
        actionName='Register'
        actionHandler={actionHandler}></AuthForm>
      <CardFooter>
        <CardInlineText>Already have an account?</CardInlineText>
        <Link to='/login'>Login here.</Link>
      </CardFooter>
    </CardWrapper>
  );
}
