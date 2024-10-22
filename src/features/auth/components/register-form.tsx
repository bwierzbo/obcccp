'use client';

import { Form, Input, Button, Switch, Select } from 'antd';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';

import { useRegister, registerInputSchema } from '@/lib/auth';
import { Team } from '@/types/api';

type RegisterFormProps = {
  onSuccess: () => void;
  chooseTeam: boolean;
  setChooseTeam: (value: boolean) => void;
  teams?: Team[];
};

export const RegisterForm = ({
  onSuccess,
  chooseTeam,
  setChooseTeam,
  teams,
}: RegisterFormProps) => {
  const registering = useRegister({ onSuccess });
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  const onFinish = (values: any) => {
    registering.mutate(values);
  };

  return (
    <div>
      <Form
        name="register"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: 'Please input your First Name!' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: 'Please input your Last Name!' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
        >
          <Input placeholder="Email Address" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Switch
            checked={chooseTeam}
            onChange={setChooseTeam}
            checkedChildren="Join Existing Team"
            unCheckedChildren="Create New Team"
          />
        </Form.Item>

        {chooseTeam && teams ? (
          <Form.Item
            name="teamId"
            rules={[{ required: true, message: 'Please select a Team!' }]}
          >
            <Select placeholder="Select a team">
              {teams.map((team) => (
                <Select.Option key={team.id} value={team.id}>
                  {team.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item
            name="teamName"
            rules={[{ required: true, message: 'Please input your Team Name!' }]}
          >
            <Input placeholder="Team Name" />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={registering.isPending} block>
            Register
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'right' }}>
        <Link href={`/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`}>
          Already have an account? Log In
        </Link>
      </div>
    </div>
  );
};
