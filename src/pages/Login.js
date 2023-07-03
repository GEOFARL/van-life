import React from 'react';
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from 'react-router-dom';
import { loginUser } from '../api';
import { Response } from 'miragejs';

export const loader = ({ request }) => {
  return new URL(request.url).searchParams.get('message');
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  let redirectTo = new URL(request.url).searchParams.get('redirectTo');
  if (!redirectTo) {
    redirectTo = '/host';
  }

  try {
    await loginUser({ email, password });
  } catch (err) {
    return err.message;
  }
  localStorage.setItem('loggedIn', true);
  const response = redirect(redirectTo);
  response.body = true;
  return response;
};

export const Login = () => {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const navigation = useNavigation();

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h2 className="red">{message}</h2>}
      {!(errorMessage instanceof Response) && (
        <h4 className="red">{errorMessage}</h4>
      )}
      <Form method="post" className="login-form" replace>
        <input type="email" name="email" placeholder="Email address" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit" disabled={navigation.state === 'submitting'}>
          {navigation.state === 'submitting' ? 'Logging in' : 'Log in'}
        </button>
      </Form>
    </div>
  );
};
