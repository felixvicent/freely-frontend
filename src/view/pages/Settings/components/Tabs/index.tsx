import { Tabs, TabsProps } from 'antd';

import { useAuth } from '../../../../../app/hooks/useAuth';

import { Collaborators } from './Collaborators';
import { Profile } from './Profile';

const ADMIN_ROUTES = ['collaborators'];

export function SettingsTabs() {
  const { hasAuthority } = useAuth();

  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Perfil de usuário',
      children: <Profile />,
    },
    {
      key: 'collaborators',
      label: 'Colaboradores',
      children: <Collaborators />,
    },
  ];

  const filteredTabs = items.filter(
    (item) => hasAuthority('COMPANY') || !ADMIN_ROUTES.includes(item.key),
  );

  return (
    <Tabs items={filteredTabs} tabPosition="left" destroyInactiveTabPane />
  );
}
