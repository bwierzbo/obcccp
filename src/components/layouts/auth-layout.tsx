'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout, Typography, Spin, Card, Image } from 'antd';
import { useUser } from '@/lib/auth';

const { Content } = Layout;
const { Title } = Typography;

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const user = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/auth/login';
  const title = isLoginPage
    ? 'Log in to your account'
    : 'Register your account';

  useEffect(() => {
    if (user.data) {
      router.replace('/app');
    }
  }, [user.data, router]);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card style={{ width: 400, textAlign: 'center' }}>
            <Image
              src="/logo.svg"
              alt="Workflow"
              preview={false}
              style={{ height: 96, marginBottom: 24 }}
            />
            <Title level={2}>{title}</Title>
            {children}
          </Card>
        </Content>
      </ErrorBoundary>
    </Layout>
  );
};
