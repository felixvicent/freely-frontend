import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { useState } from 'react';
import {
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
  AiOutlineUser,
  AiOutlineProject,
  AiOutlineSetting,
} from 'react-icons/ai';
import { CiLogout } from 'react-icons/ci';
import { FiHome, FiUsers } from 'react-icons/fi';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';

import { useAuth } from '../../app/hooks/useAuth';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const { signout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout className="h-full">
      <Layout.Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <div className="flex items-center justify-center py-4">
          <Link
            to="/"
            className={`font-extrabold
            ${collapsed ? 'text-base' : 'text-3xl'}
             text-purple-700 hover:text-purple-700`}
          >
            Freely
          </Link>
        </div>
        <Menu
          selectedKeys={[`/${location.pathname.split('/')[1]}`]}
          items={[
            {
              key: '/',
              icon: <FiHome />,
              label: 'Home',
              onClick: () => navigate('/'),
            },
            {
              key: '/clients',
              icon: <FiUsers />,
              label: 'Clientes',
              onClick: () => navigate('/clients'),
            },
            {
              key: '/projects',
              icon: <AiOutlineProject />,
              label: 'Projetos',
              onClick: () => navigate('/projects'),
            },
            {
              key: '/settings',
              icon: <AiOutlineSetting />,
              label: 'Configurações',
              onClick: () => navigate('/settings'),
            },
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="bg-white px-4 flex items-center justify-between">
          <Button
            type="text"
            icon={
              collapsed ? (
                <AiOutlineMenuUnfold size={20} className="text-purple-700" />
              ) : (
                <AiOutlineMenuFold size={20} className="text-purple-700" />
              )
            }
            onClick={() => setCollapsed((prevState) => !prevState)}
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: 'settings',
                  label: 'Configurações',
                  icon: <AiOutlineSetting />,
                  onClick: () => navigate('/settings'),
                },
                {
                  key: 'logout',
                  label: 'Sair',
                  icon: <CiLogout />,
                  onClick: signout,
                },
              ],
            }}
          >
            <Avatar className="cursor-pointer">
              <AiOutlineUser />
            </Avatar>
          </Dropdown>
        </Layout.Header>
        <Layout.Content className="h-full p-6">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
