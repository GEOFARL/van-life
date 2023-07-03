import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

export const loader = ({ request }) => {
  return new URL(request.url).searchParams.get('message');
};

export const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const message = useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('submitting');
    loginUser(loginFormData)
      .then((data) => {
        navigate('/host', { replace: true });
        setError(null);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      })
      .finally(() => setStatus('idle'));
    setLoginFormData({ email: '', password: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && !error && <h2 className="red">{message}</h2>}
      {error && <h1>{error.message}</h1>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={loginFormData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Logging in' : 'Log in'}
        </button>
      </form>
    </div>
  );
};
