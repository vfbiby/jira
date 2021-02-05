import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {user ? (
        <div>
          <div>Login success!</div>
          Username: {user?.name}
          <br />
          Token: {user.token}
        </div>
      ) : null}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id={'password'} />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
