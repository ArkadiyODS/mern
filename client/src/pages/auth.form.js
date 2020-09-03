import React from 'react';
import { AuthFormWrapper, InputField, ErrorBanner } from '../components/shared';

export default function (props) {
  return (
    <AuthFormWrapper>
      <h4>{props.title}</h4>
      <ErrorBanner show={!!props.error}>{props.error}</ErrorBanner>
      <form onSubmit={props.actionHandler}>
        <InputField>
          <input
            id='email'
            type='text'
            name='email'
            pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            className='validate'
            required
            value={undefined}
          />
          <label htmlFor='email'>Email</label>
          <span className='helper-text' data-error='Wrong email'></span>
        </InputField>
        <InputField>
          <input
            id='password'
            className='validate'
            type='password'
            name='password'
            required
            value={undefined}
          />
          <label htmlFor='password'>Password</label>
          <span
            className='helper-text'
            data-error='Password cannot be empty'></span>
        </InputField>
        <button
          className={`btn waves-effect waves-light ${
            props.loading ? 'disabled' : ''
          }`}
          type='submit'>
          {props.actionName}
        </button>
      </form>
    </AuthFormWrapper>
  );
}
