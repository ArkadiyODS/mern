import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './auth.form';
import { CardWrapper, CardFooter, CardInlineText } from '../components/shared';

import AuthContext from '../contexts/authContext';

export default function () {
  const { error, login, loading } = useContext(AuthContext);

  const actionHandler = async (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const data = Object.fromEntries(new FormData(form).entries());
    console.log(data);
    login(data.email, data.password);
  };
  return (
    <CardWrapper>
      <AuthForm
        error={error}
        login={login}
        loading={loading}
        title='Login'
        actionName='Login'
        actionHandler={actionHandler}></AuthForm>
      <CardFooter>
        <CardInlineText>Don't have an account?</CardInlineText>
        <Link to='/register'>Register here.</Link>
      </CardFooter>
    </CardWrapper>
  );
}
