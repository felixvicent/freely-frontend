import { Card, Spin } from 'antd';

import { Form } from '../../../../../components/Form';

import { useProfile } from './useProfile';

export function Profile() {
  const { user } = useProfile();

  return (
    <Card>
      <h3 className="mb-4 text-xl">Perfil de usuário</h3>

      {!user ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <Form.User
          initialValues={{
            document: user?.document ?? '',
            email: user?.email ?? '',
            id: user?.id ?? '',
            name: user?.name ?? '',
            telephone: user?.telephone ?? '',
          }}
          showCancel={false}
        />
      )}
    </Card>
  );
}
