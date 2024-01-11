import {
  Button,
  Card,
  Col,
  Dropdown,
  MenuProps,
  Row,
  Select,
  Avatar as AvatarAntd,
} from 'antd';
import dayjs from 'dayjs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { AiOutlineMore } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import { ActivityStatus } from '../../../app/entities/ActivityStatus';
import { ProjectStatus } from '../../../app/entities/ProjectStatus';
import { formatCurrency } from '../../../app/utils/format/formatCurrency';
import { getProjectLabelByStatus } from '../../../app/utils/labels/getProjectLabelByStatus';
import { Avatar } from '../../components/Avatar';
import { Container } from '../../components/Container';
import { Drop } from '../../components/Drop';
import { Modal } from '../../components/Modal';

import { useProject } from './useProject';

export function Project() {
  const {
    isLoading,
    project,
    isDeleteProjectModalOpen,
    handleCloseDeleteModal,
    handleRemove,
    handleOpenDeleteModal,
    isUpdateModalOpen,
    handleCloseUpdateModal,
    handleOpenUpdateModal,
    handleCloseCreateActivityModal,
    handleOpenCreateActivityModal,
    isCreateActivityModalOpen,
    handleRemoveActivity,
    handleCloseDeleteActivityModal,
    isDeleteActivityModalOpen,
    selectedActivityToDelete,
    pendingActivities,
    waitingActivities,
    progressActivities,
    doneActivities,
    isUpdateProjectStatusLoading,
    handleUpdateProjectStatus,
    collaborators,
    selectedCollaborators,
    handleChangeCollaboratorsFilter,
  } = useProject();

  const items: MenuProps['items'] = [
    {
      label: 'Editar',
      onClick: handleOpenUpdateModal,
      key: 'edit',
    },
    {
      label: 'Remover',
      onClick: handleOpenDeleteModal,
      key: 'remove',
    },
  ];

  return (
    <main>
      <Container.Loading isLoading={isLoading}>
        <header className="flex items-center justify-between my-4">
          <h3 className="mb-2">Projeto</h3>
          <div className="flex items-center gap-2">
            <Select
              className="w-52 text-right"
              value={project?.status}
              loading={isUpdateProjectStatusLoading}
              bordered={false}
              options={Object.values(ProjectStatus).map((status) => ({
                label: getProjectLabelByStatus(status),
                value: status,
              }))}
              onChange={(value: ProjectStatus) =>
                handleUpdateProjectStatus(value)
              }
            />

            <Dropdown menu={{ items }} trigger={['click']}>
              <Button type="link">
                <AiOutlineMore />
              </Button>
            </Dropdown>
          </div>
        </header>
        <Row gutter={16} align="stretch">
          <Col span={12}>
            <Card size="small" title="Cliente" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Nome:</strong>{' '}
                  <Link to={`/clients/${project?.client.id}`}>
                    {project?.client.name}
                  </Link>
                </span>

                <span>
                  <strong>Email:</strong> {project?.client.email}
                </span>
                <span>
                  <strong>Telefone:</strong> {project?.client.telephone}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="Dados" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Título:</strong> {project?.title}
                </span>
                <span>
                  <strong>Valor:</strong> R$ {formatCurrency(project?.value)}
                </span>
                <span>
                  <strong>Data estimada:</strong>{' '}
                  {dayjs(project?.estimatedDate).format('DD/MM/YYYY')}
                </span>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="mt-6">
          <Row>
            <Col span={24}>
              <Card
                title="Atividades"
                size="small"
                bodyStyle={{ padding: '0 8px, 8px' }}
                headStyle={{ padding: 8, borderBottom: 'none' }}
                extra={
                  <Button onClick={handleOpenCreateActivityModal}>
                    Adicionar atividade
                  </Button>
                }
              >
                <div>
                  <AvatarAntd.Group
                    className="p-2 flex gap-2 justify-end"
                    maxCount={5}
                  >
                    {collaborators?.map((collaborator) => (
                      <Avatar.Collaborator
                        role={collaborator.role}
                        key={collaborator.id}
                        onClick={() =>
                          handleChangeCollaboratorsFilter(collaborator.id)
                        }
                        className={`cursor-pointer ${
                          selectedCollaborators.includes(collaborator.id)
                            ? '!border-purple-700 border'
                            : ''
                        }`}
                        size="large"
                        label={collaborator.name}
                      />
                    ))}
                  </AvatarAntd.Group>
                </div>
                <DndProvider backend={HTML5Backend}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Drop.Activities
                        activities={pendingActivities}
                        isLoading={isLoading}
                        status={ActivityStatus.PENDING}
                        title="Pendentes"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        activities={waitingActivities}
                        isLoading={isLoading}
                        status={ActivityStatus.WAITING}
                        title="Esperando"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        activities={progressActivities}
                        isLoading={isLoading}
                        status={ActivityStatus.PROGRESS}
                        title="Em andamento"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        activities={doneActivities}
                        isLoading={isLoading}
                        status={ActivityStatus.DONE}
                        title="Finalizadas"
                      />
                    </Col>
                  </Row>
                </DndProvider>
              </Card>
            </Col>
          </Row>
        </div>
      </Container.Loading>
      <Modal.Confirm
        isLoading={isLoading}
        isOpen={isDeleteProjectModalOpen}
        message={`Deseja realmente remover o projeto ${project?.title}`}
        onClose={handleCloseDeleteModal}
        onSubmit={handleRemove}
        title="Removendo cliente"
      />
      <Modal.ProjectForm
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        formProps={{
          initialValues: {
            id: project?.id ?? '',
            activities: [],
            clientId: project?.client.id ?? '',
            estimatedDate: project?.estimatedDate ?? '',
            title: project?.title ?? '',
            value: project?.value ?? 0,
          },
        }}
      />

      <Modal.ActivityForm
        isOpen={isCreateActivityModalOpen}
        onClose={handleCloseCreateActivityModal}
        title="Criando atividade"
        formProps={{
          initialValues: {
            projectId: project?.id ?? '',
            projectEstimatedDate: project?.estimatedDate ?? '',
          },
        }}
      />

      <Modal.Confirm
        isLoading={isLoading}
        isOpen={isDeleteActivityModalOpen}
        message={`Deseja realmente remover a atividade ${selectedActivityToDelete?.title}`}
        onClose={handleCloseDeleteActivityModal}
        onSubmit={handleRemoveActivity}
        title="Removendo atividade"
      />
    </main>
  );
}
