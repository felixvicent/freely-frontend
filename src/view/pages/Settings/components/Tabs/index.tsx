import { Tabs, TabsProps } from 'antd';

import { CollaboratorsTable } from '../../../../components/Table/CollaboratorsTable';

import { Profile } from './Profile';

export function SettingsTabs() {
  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Perfil de usuário',
      children: <Profile />,
    },
    {
      key: 'collaborators',
      label: 'Colaboradores',
      children: <CollaboratorsTable />,
    },
  ];

  return <Tabs items={items} tabPosition="left" destroyInactiveTabPane />;
}
