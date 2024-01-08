import { Dropdown, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AiOutlineEdit, AiOutlineMore } from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';

import { User } from '../../../../app/entities/User';
import { Filter } from '../../Filter';
import { Modal } from '../../Modal';

import { useCollaboratorsTable } from './useCollaboratorsTable';

export function CollaboratorsTable() {
  const {
    collaborators,
    isFetching,
    handleChangeParams,
    handleChangeCollaboratorsParams,
    handleCloseUpdateModal,
    handleOpenUpdateModal,
    selectedCollaboratorToUpdate,
    collaboratorParams,
  } = useCollaboratorsTable();

  const COLUMNS: ColumnsType<User> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Filter.Collaborator onFilter={handleChangeCollaboratorsParams} />
      ),
      filteredValue: collaboratorParams.collaboratorIds,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Cargo',
      dataIndex: 'office',
      key: 'office',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (value: boolean) => (
        <Tag color={value ? 'green' : 'red'}>{value ? 'Ativo' : 'Inativo'}</Tag>
      ),
    },
    {
      title: '',
      width: '4rem',
      align: 'center' as const,
      render: (_: string, user: User) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'edit',
                label: 'Editar',
                icon: <AiOutlineEdit size={18} />,
                onClick: () => handleOpenUpdateModal(user),
              },
              {
                key: 'remove',
                label: 'Remover',
                icon: <CiTrash size={18} />,
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
        dataSource={collaborators?.content}
        rowKey="id"
        pagination={{
          current: (collaborators?.number ?? 0) + 1,
          pageSize: collaborators?.size,
          total: collaborators?.totalElements,
          onChange: (pageNumber: number, pageSize: number) => {
            handleChangeParams((prevState) => ({
              ...prevState,
              page: pageNumber - 1,
              size: pageSize,
            }));
          },
        }}
      />
      <Modal.CollaboratorForm
        isOpen={!!selectedCollaboratorToUpdate}
        onClose={handleCloseUpdateModal}
        title="Editando colaborador"
        formProps={{
          initialValues: {
            name: selectedCollaboratorToUpdate?.name ?? '',
            document: selectedCollaboratorToUpdate?.document ?? '',
            email: selectedCollaboratorToUpdate?.email ?? '',
            office: selectedCollaboratorToUpdate?.office ?? '',
            telephone: selectedCollaboratorToUpdate?.telephone ?? '',
            id: selectedCollaboratorToUpdate?.id ?? '',
          },
        }}
      />
    </>
  );
}
