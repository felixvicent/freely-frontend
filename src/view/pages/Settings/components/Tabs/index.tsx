import { Tabs, TabsProps } from 'antd';

import { Profile } from './Profile';

export function SettingsTabs() {
  const items: TabsProps['items'] = [
    {
      key: 'profile',
      label: 'Perfil de usuário',
      children: <Profile />,
    },
  ];

  return <Tabs items={items} tabPosition="left" destroyInactiveTabPane />;
}
