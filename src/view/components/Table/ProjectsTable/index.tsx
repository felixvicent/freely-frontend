import { Dropdown, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { Project } from "../../../../app/entities/Project";
import { AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { useProjectsTable } from "./useProjectsTable";
import { Modal } from "../../Modal";
import { RemoveModal } from "../../Modal/RemoveModal";
import { formatCurrency } from "../../../../app/utils/formatCurrency";

export function ProjectsTable() {
  const {
    isFetching,
    projects,
    handleChangeParams,
    handleProjectToUpdate,
    isUpdateModalOpen,
    handleCloseUpdateProjectModal,
    selectedProjectsToUpdate,
    isDeleteModalOpen,
    isDeleteLoading,
    selectedProjectsToDelete,
    handleCloseDeleteProjectModal,
    handleDeleteProject,
    handleProjectToDelete,
  } = useProjectsTable();

  const COLUMNS: ColumnsType<Project> = [
    {
      title: "Título",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      render: (_: string, project: Project) => {
        return (
          <Typography>
            {project.client.firstName} {project.client.lastName}
          </Typography>
        );
      },
    },
    {
      title: "Valor",
      dataIndex: "value",
      key: "value",
      render: (value: number) => {
        return `R$ ${formatCurrency(value)}`;
      },
    },
    {
      title: "",
      width: "4rem",
      align: "center" as const,
      render: (_: string, project: Project) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: "Editar",
                  icon: <AiOutlineEdit size={18} />,
                  onClick: () => {
                    handleProjectToUpdate(project);
                  },
                },
                {
                  key: "remove",
                  label: "Remover",
                  icon: <CiTrash size={18} />,
                  onClick: () => {
                    handleProjectToDelete(project);
                  },
                },
              ],
            }}
          >
            <AiOutlineMore />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Table
        className="h-full"
        columns={COLUMNS}
        loading={isFetching}
        dataSource={projects?.content}
        rowKey="id"
        pagination={{
          current: (projects?.number ?? 0) + 1,
          pageSize: projects?.size,
          total: projects?.totalElements,
          onChange: (pageNumber: number, pageSize: number) => {
            handleChangeParams((prevState) => ({
              ...prevState,
              page: pageNumber - 1,
              size: pageSize,
            }));
          },
        }}
      />
      <Modal.ProjectForm
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateProjectModal}
        formProps={{
          initialValues: {
            clientId: selectedProjectsToUpdate?.client.id ?? "",
            estimedDate: selectedProjectsToUpdate?.estimedDate ?? "",
            id: selectedProjectsToUpdate?.id ?? "",
            title: selectedProjectsToUpdate?.title ?? "",
            value: selectedProjectsToUpdate?.value ?? 0,
          },
        }}
      />
      <RemoveModal
        isOpen={isDeleteModalOpen}
        isLoading={isDeleteLoading}
        message={`Deseja realmente remover o projeto ${selectedProjectsToDelete?.title}`}
        onClose={handleCloseDeleteProjectModal}
        onSubmit={handleDeleteProject}
        title="Remover projeto"
      />
    </>
  );
}
