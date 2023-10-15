import {
  Button, Card, Col, Row,
} from 'antd';
import dayjs from 'dayjs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';

import { ActivityStatus } from '../../../app/entities/AcitivtyStatus';
import { formatCurrency } from '../../../app/utils/format/formatCurrency';
import { Container } from '../../components/Container';
import { Drop } from '../../components/Drop';
import { Modal } from '../../components/Modal';
import { RemoveModal } from '../../components/Modal/RemoveModal';

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
  } = useProject();

  return (
    <main>
      <Container.Loading isLoading={isLoading}>
        <header className="flex items-center justify-between my-4">
          <h3 className="mb-2">Projeto</h3>
          <div className="flex items-center gap-2">
            <Button onClick={handleOpenUpdateModal}>Editar</Button>
            <Button
              onClick={handleOpenDeleteModal}
              className="bg-red-500 hover:!bg-red-600"
              type="primary"
            >
              Remover
            </Button>
          </div>
        </header>
        <Row gutter={16} align="stretch">
          <Col span={12}>
            <Card size="small" title="Cliente" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Nome:</strong>
                  {' '}
                  <Link to={`/clients/${project?.client.id}`}>
                    {`${project?.client.firstName} ${project?.client.lastName ?? ''}`}
                  </Link>
                </span>

                <span>
                  <strong>Email:</strong>
                  {' '}
                  {project?.client.email}
                </span>
                <span>
                  <strong>Telefone:</strong>
                  {' '}
                  {project?.client.telephone}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card size="small" title="Dados" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Título:</strong>
                  {' '}
                  {project?.title}
                </span>
                <span>
                  <strong>Valor:</strong>
                  {' '}
                  R$
                  {' '}
                  {formatCurrency(project?.value)}
                </span>
                <span>
                  <strong>Data estimada:</strong>
                  {' '}
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
                extra={(
                  <Button onClick={handleOpenCreateActivityModal}>
                    Adicionar atividade
                  </Button>
                )}
              >
                <DndProvider backend={HTML5Backend}>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Drop.Activities
                        projectId={project?.id ?? ''}
                        activities={project?.activities.filter(
                          (activity) => activity.status === ActivityStatus.PENDING,
                        )}
                        isLoading={isLoading}
                        status={ActivityStatus.PENDING}
                        title="Pendentes"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        projectId={project?.id ?? ''}
                        activities={project?.activities.filter(
                          (activity) => activity.status === ActivityStatus.WAITING,
                        )}
                        isLoading={isLoading}
                        status={ActivityStatus.WAITING}
                        title="Pendentes"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        projectId={project?.id ?? ''}
                        activities={project?.activities.filter(
                          (activity) => activity.status === ActivityStatus.PROGRESS,
                        )}
                        isLoading={isLoading}
                        status={ActivityStatus.PROGRESS}
                        title="Pendentes"
                      />
                    </Col>
                    <Col span={6}>
                      <Drop.Activities
                        projectId={project?.id ?? ''}
                        activities={project?.activities.filter(
                          (activity) => activity.status === ActivityStatus.DONE,
                        )}
                        isLoading={isLoading}
                        status={ActivityStatus.DONE}
                        title="Pendentes"
                      />
                    </Col>
                  </Row>
                </DndProvider>
              </Card>
            </Col>
          </Row>
        </div>
      </Container.Loading>
      <RemoveModal
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
        formProps={{ initialValues: { projectId: project?.id ?? '' } }}
      />

      <RemoveModal
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
