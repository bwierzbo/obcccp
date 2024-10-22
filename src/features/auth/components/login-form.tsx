'use client';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useLogin, loginInputSchema } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({ onSuccess });
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  const onFinish = (values: any) => {
    login.mutate(values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please input your Email!' },
          { type: 'email', message: 'Please enter a valid email!' }
        ]}
      >
        <Input prefix={<UserOutlined/>} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link href="/auth/forgot-password" className="login-form-forgot">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" loading={login.isPending}>
          Log in
        </Button>
        Or <Link href={`/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}>
          register now!
        </Link>
      </Form.Item>
    </Form>
  );
};
