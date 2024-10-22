'use client';

import { ReactNode, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, HomeOutlined, FileOutlined, TeamOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useLogout, useUser } from '@/lib/auth';

const { Header, Sider, Content } = Layout;

type LayoutProps = {
  children: ReactNode;
};

export const DashboardLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();
  const { data: user } = useUser();

  const menuItems = [
    { key: '/app', icon: <HomeOutlined />, label: 'Dashboard' },
    { key: '/app/discussions', icon: <FileOutlined />, label: 'Discussions' },
    { key: '/app/team', icon: <TeamOutlined />, label: 'Team' },
  ];

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => router.push('/app/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => logout.mutate({})}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu theme="dark" mode="inline" selectedKeys={[pathname || '']} items={menuItems} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />
          <div style={{ float: 'right', marginRight: 24 }}>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            {children}
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  );
};

