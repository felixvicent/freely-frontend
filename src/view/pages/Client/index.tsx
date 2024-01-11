import { Button, Card, Col, Row, Tooltip, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ActivityStatus } from '../../../app/entities/ActivityStatus';
import { formatCurrency } from '../../../app/utils/format/formatCurrency';
import { Chart } from '../../components/Chart';
import { Container } from '../../components/Container';
import { Modal } from '../../components/Modal';

import { ActivityItem } from './components/ActivityItem';
import { useClient } from './useClient';

export function Client() {
  const {
    client,
    isLoading,
    isUpdateModalOpen,
    handleCloseUpdateModal,
    handleOpenUpdateModal,
    isLoadingDelete,
    handleRemove,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  } = useClient();

  const activitiesStatusChartData = useMemo(() => {
    const data: { status: string; total: number }[] = [];

    client?.projects.forEach((project) => {
      project.activities.forEach((activity) => {
        const previousValue =
          data.find((ac) => ac.status === activity.status)?.total ?? 0;

        const index = data.findIndex((ac) => ac.status === activity.status);

        data[index >= 0 ? index : data.length] = {
          status: activity.status,
          total: previousValue + 1,
        };
      });
    });

    return data;
  }, [client]);

  return (
    <main>
      <Container.Loading isLoading={isLoading}>
        <header className="flex items-center justify-between my-4">
          <h3 className="mb-2">Cliente</h3>
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
          <Col span={8}>
            <Card size="small" title="Indentificação" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Nome:</strong> {client?.name}
                </span>
                <span>
                  <strong>CPF/CNPJ:</strong> {client?.document}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="Contato" className="h-full">
              <div className="flex flex-col">
                <span>
                  <strong>Email:</strong> {client?.email}
                </span>
                <span>
                  <strong>Telefone:</strong> {client?.telephone}
                </span>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" title="Endereço" className="h-full">
              <div className="flex flex-col text-xs">
                <span>
                  <strong>Endereço:</strong> {client?.address.street},{' '}
                  {client?.address.number}
                </span>
                <span>
                  {client?.address.city} - {client?.address.state},{' '}
                  {client?.address.zipCode}
                </span>
                <span>
                  {client?.address.complement}
                  {client?.address.complement && ','}{' '}
                  {client?.address.reference}
                </span>
              </div>
            </Card>
          </Col>
        </Row>

        {client?.projects && client.projects.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2">Status</h3>
            <Row>
              <Col span={8}>
                <Card title="Atividades" size="small">
                  <Chart.ActivityStatus
                    activities={activitiesStatusChartData}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )}
        {client?.projects && client.projects.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-2">Projetos</h3>

            <Row gutter={16}>
              {client?.projects.map((project) => (
                <Col span={6} key={project.id}>
                  <Card
                    size="small"
                    title={
                      <Tooltip title={project.title}>
                        <Link to={`/projects/${project.id}`}>
                          {project.title}
                        </Link>
                      </Tooltip>
                    }
                    extra={
                      <Typography>
                        R$ {formatCurrency(project.value)}
                      </Typography>
                    }
                  >
                    <div className="flex flex-col">
                      {project.activities.map((activity) => (
                        <ActivityItem
                          key={activity.id}
                          activity={activity.title}
                          status={
                            // eslint-disable-next-line prettier/prettier
                            ActivityStatus[activity.status as keyof typeof ActivityStatus]
                          }
                        />
                      ))}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        <Modal.ClientForm
          isOpen={isUpdateModalOpen}
          onClose={handleCloseUpdateModal}
          title="Editando clientes"
          formProps={{
            initialValues: {
              id: client?.id ?? '',
              name: client?.name ?? '',
              document: client?.document ?? '',
              email: client?.email ?? '',
              telephone: client?.telephone ?? '',
              city: client?.address.city ?? '',
              complement: client?.address.complement ?? '',
              number: client?.address.number ?? '',
              reference: client?.address.reference ?? '',
              state: client?.address.state ?? '',
              street: client?.address.street ?? '',
              zipCode: client?.address.zipCode ?? '',
            },
          }}
        />

        <Modal.Confirm
          isLoading={isLoadingDelete}
          isOpen={isDeleteModalOpen}
          message={`Deseja realmente remover o cliente ${client?.name}`}
          onClose={handleCloseDeleteModal}
          onSubmit={handleRemove}
          title="Removendo cliente"
        />
      </Container.Loading>
    </main>
  );
}
