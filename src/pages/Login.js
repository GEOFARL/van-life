import React, { useState } from 'react';

export const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginFormData);
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
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
