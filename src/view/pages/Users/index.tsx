import { Button } from 'antd';

import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';

import { useUsers } from './useUsers';

export function Users() {
  const {
    handleOpenCloseAddUserModal,
    isAddUserModalOpen,
    handleCloseAddUserModal,
  } = useUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Usuários</h1>
        <Button onClick={handleOpenCloseAddUserModal} type="primary">
          Adicionar usuário
        </Button>
      </div>

      <Table.Users />
      <Modal.ClientForm
        isOpen={isAddUserModalOpen}
        onClose={handleCloseAddUserModal}
        title="Adicionando usuário"
      />
    </div>
  );
}
