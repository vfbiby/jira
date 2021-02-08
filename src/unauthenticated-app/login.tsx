import { Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import { LongButton } from './index';
import React from 'react';
import { useAsync } from 'utilities/use-async';
import { useDocumentTitle } from 'utilities';

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });

  useDocumentTitle('登录页面', false);

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values)).catch(onError);
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
      <LongButton loading={isLoading} htmlType="submit">
        login
      </LongButton>
    </Form>
  );
};
