import { Form, Input } from 'antd';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { LongButton } from './index';

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次输入的密码相同'));
      return;
    }
    try {
      await register(values);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
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
      <Form.Item
        label="Password"
        name="cpassword"
        rules={[{ required: true, message: 'Please confirm your password!' }]}
      >
        <Input />
      </Form.Item>
      <LongButton htmlType="submit">register</LongButton>
    </Form>
  );
};
