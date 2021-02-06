import { Button, Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import { LongButton } from './index';
import React from 'react';

export const LoginScreen = () => {
  const { login, user } = useAuth();

  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? (
        <div>
          <div>Login success!</div>
          Username: {user?.name}
          <br />
          Token: {user.token}
        </div>
      ) : null}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input />
      </Form.Item>
      <LongButton htmlType="submit">login</LongButton>
    </Form>
  );
};
