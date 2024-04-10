import { Tabs, TabsProps } from 'antd';

import { useAuth } from '../../../../../app/hooks/useAuth';

import { Collaborators } from './Collaborators';
import { Integrations } from './Integrations';
import { Profile } from './Profile';

const ADMIN_ROUTES = ['collaborators', 'integrations'];

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
    {
      key: 'integrations',
      label: 'Integrations',
      children: <Integrations />,
    },
  ];

  const filteredTabs = items.filter(
    (item) => hasAuthority('COMPANY') || !ADMIN_ROUTES.includes(item.key),
  );

  return (
    <Tabs items={filteredTabs} tabPosition="left" destroyInactiveTabPane />
  );
}
