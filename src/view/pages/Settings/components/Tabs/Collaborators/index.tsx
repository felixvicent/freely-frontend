import { Button, Card } from 'antd';

import { Modal } from '../../../../../components/Modal';
import { Table } from '../../../../../components/Table';

import { useCollaborators } from './useCollaborators';

export function Collaborators() {
  const { handleOpenModal, handleCloseModal, isCreateCollaboratorModalOpen } =
    useCollaborators();

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Colaboradores</h1>
        <Button onClick={handleOpenModal} type="primary">
          Adicionar colaborador
        </Button>
      </div>
      <Table.Collaborators />

      <Modal.CollaboratorForm
        isOpen={isCreateCollaboratorModalOpen}
        onClose={handleCloseModal}
        title="Criando colaborador"
      />
    </Card>
  );
}
