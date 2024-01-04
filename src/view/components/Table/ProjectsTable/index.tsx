import { Dropdown, Table, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { Project } from '../../../../app/entities/Project';
import { ProjectStatus } from '../../../../app/entities/ProjectStatus';
import { formatCurrency } from '../../../../app/utils/format/formatCurrency';
import { getProjectLabelByStatus } from '../../../../app/utils/labels/getProjectLabelByStatus';
import { Filter } from '../../Filter';
import { Modal } from '../../Modal';

import { useProjectsTable } from './useProjectsTable';

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
    handleChangeClientParams,
    getSortOrder,
    handleChangeStatusParams,
  } = useProjectsTable();

  const COLUMNS: ColumnsType<Project> = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
      render: (value: string, project: Project) => (
        <Link to={`/projects/${project.id}`}>{value}</Link>
      ),
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (_: string, project: Project) => (
        <Typography>{project.client.name}</Typography>
      ),
      filterDropdown: <Filter.Client onFilter={handleChangeClientParams} />,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (value: number) => `R$ ${formatCurrency(value)}`,
      sorter: true,
      sortOrder: getSortOrder('value'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ProjectStatus) => getProjectLabelByStatus(status),
      filterDropdown: (
        <Filter.ProjectStatus onFilter={handleChangeStatusParams} />
      ),
    },
    {
      title: 'Data de criação',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => dayjs(value).format('DD/MM/YYYY'),
      sorter: true,
      sortOrder: getSortOrder('createdAt'),
    },
    {
      title: '',
      width: '4rem',
      align: 'center' as const,
      render: (_: string, project: Project) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Editar',
                icon: <AiOutlineEdit size={18} />,
                onClick: () => {
                  handleProjectToUpdate(project);
                },
              },
              {
                key: 'remove',
                label: 'Remover',
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
      ),
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
        onChange={(_, __, sorter) => {
          if (!(sorter instanceof Array)) {
            handleChangeParams((prevState) => ({
              ...prevState,
              sort: `${sorter.columnKey},${
                sorter.order === 'descend' ? 'desc' : 'asc' ?? 'asc'
              }`,
            }));
          }
        }}
      />
      <Modal.ProjectForm
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateProjectModal}
        formProps={{
          initialValues: {
            clientId: selectedProjectsToUpdate?.client.id ?? '',
            estimatedDate: selectedProjectsToUpdate?.estimatedDate ?? '',
            id: selectedProjectsToUpdate?.id ?? '',
            title: selectedProjectsToUpdate?.title ?? '',
            value: selectedProjectsToUpdate?.value ?? 0,
            activities: selectedProjectsToUpdate?.activities ?? [],
          },
        }}
      />
      <Modal.Confirm
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
