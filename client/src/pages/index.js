import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './login.page.js';
import RegistrationPage from './registration.page.js';
import TodosPage from './todos.page.js';

export function RenderRoutes(isAuthenticated) {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/'>
          <TodosPage />
        </Route>
        <Redirect from='*' to='/' />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
      <Route exact path='/register'>
        <RegistrationPage />
      </Route>
      <Redirect from='*' to='/login' />
    </Switch>
  );
}
