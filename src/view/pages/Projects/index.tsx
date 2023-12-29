import { Button } from 'antd';

import { Modal } from '../../components/Modal';
import { Table } from '../../components/Table';

import { useProjects } from './useProjects';

export function Projects() {
  const {
    handleOpenProjectModal,
    isAddProjectModalOpen,
    handleCloseProjectModal,
  } = useProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Projetos</h1>
        <Button onClick={handleOpenProjectModal} type="primary">
          Adicionar projeto
        </Button>
      </div>

      <Table.Projects />
      <Modal.ProjectForm
        isOpen={isAddProjectModalOpen}
        onClose={handleCloseProjectModal}
        title="Adicionando projeto"
      />
    </div>
  );
}
