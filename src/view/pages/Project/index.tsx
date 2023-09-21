import { Button, Card, Col, List, Row, Select, Typography } from "antd";
import { Link } from "react-router-dom";
import { ActivityStatus } from "../../../app/entities/AcitivtyStatus";
import { CiTrash } from "react-icons/ci";
import { useProject } from "./useProject";
import { formatCurrency } from "../../../app/utils/format/formatCurrency";
import dayjs from "dayjs";
import { Container } from "../../components/Container";
import { RemoveModal } from "../../components/Modal/RemoveModal";
import { Modal } from "../../components/Modal";

const activitiesStatus = [
  {
    label: "Pendente",
    value: ActivityStatus.PENDING,
  },
  {
    label: "Em espera",
    value: ActivityStatus.WAITING,
  },
  {
    label: "Em andamento",
    value: ActivityStatus.PROGRESS,
  },
  {
    label: "Feito",
    value: ActivityStatus.DONE,
  },
];

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
    handleOpenDeleteActivityModal,
    isDeleteActivityModalOpen,
    selectedActivityToDelete,
    handleUpdateActivity,
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
                  <strong>Nome:</strong>{" "}
                  <Link to={`/clients/${project?.client.id}`}>{`${
                    project?.client.firstName
                  } ${project?.client.lastName ?? ""}`}</Link>
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
                  <strong>Data estimada:</strong>{" "}
                  {dayjs(project?.estimatedDate).format("DD/MM/YYYY")}
                </span>
              </div>
            </Card>
          </Col>
        </Row>

        <div className="mt-6">
          <h3 className="mb-2">Status</h3>
          <Row>
            <Col span={24}>
              <Card
                title="Atividades"
                size="small"
                bodyStyle={{ padding: "0 8px" }}
                headStyle={{ padding: 16 }}
                extra={
                  <Button onClick={handleOpenCreateActivityModal}>
                    Adicionar atividade
                  </Button>
                }
              >
                <List
                  dataSource={project?.activities}
                  renderItem={(activity) => (
                    <List.Item key={activity.id} className="!p-2">
                      <div className="flex w-full items-center justify-between">
                        <Typography.Text
                          editable={{
                            onChange: (value) => {
                              handleUpdateActivity(
                                ActivityStatus[
                                  activity.status as keyof typeof ActivityStatus
                                ],
                                value,
                                activity.id
                              );
                            },
                          }}
                        >
                          {activity.title}
                        </Typography.Text>

                        <div className="flex items-center gap-2">
                          <Select
                            className="w-[200px]"
                            value={
                              ActivityStatus[
                                activity.status as keyof typeof ActivityStatus
                              ]
                            }
                            options={activitiesStatus}
                            onChange={(status) =>
                              handleUpdateActivity(
                                status,
                                activity.title,
                                activity.id
                              )
                            }
                          ></Select>
                          <Button
                            onClick={() =>
                              handleOpenDeleteActivityModal(activity)
                            }
                            className="w-8 h-8 flex items-center justify-center p-0"
                          >
                            <CiTrash />
                          </Button>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
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
            id: project?.id ?? "",
            activities: [],
            clientId: project?.client.id ?? "",
            estimatedDate: project?.estimatedDate ?? "",
            title: project?.title ?? "",
            value: project?.value ?? 0,
          },
        }}
      />

      <Modal.ActivityForm
        isOpen={isCreateActivityModalOpen}
        onClose={handleCloseCreateActivityModal}
        title="Criando atividade"
        formProps={{ initialValues: { projectId: project?.id ?? "" } }}
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
