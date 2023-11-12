import { Dropdown, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import {
  AiOutlineEdit,
  AiOutlineLock,
  AiOutlineMore,
  AiOutlineUnlock,
} from 'react-icons/ai';
import { CiTrash } from 'react-icons/ci';

import { User } from '../../../../app/entities/User';
import { Modal } from '../../Modal';

import { StatusFilter } from './StatusFilter';
import { UsersFilter } from './UsersFilter';
import { useUsersTable } from './useUsersTable';

export function UsersTable() {
  const {
    users,
    isUsersListLoading,
    handleChangeParams,
    userParams,
    handleOpenEditUserModal,
    handleOpenRemoveUserModal,
    isToggleActiveLoading,
    selectedUserToToggleActive,
    handleCloseToggleActiveModal,
    toggleActive,
    handleOpenToggleActiveModal,
    selectedUserToUpdate,
    handleCloseEditUserModal,
    handleCloseRemoveUserModal,
    selectedUserToDelete,
  } = useUsersTable();

  const COLUMNS: ColumnsType<User> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => <UsersFilter />,
      filteredValue: userParams.usersIds,
      sorter: true,
      sortOrder:
        userParams.sort?.split(',')[1] === 'asc' ? 'ascend' : 'descend',
      onHeaderCell: () => ({
        onClick: () => {
          const [currentSort, currentOrder] = userParams.sort?.split(',') ?? [];
          const sortBy = 'name';
          const sortOrder =
            // eslint-disable-next-line no-nested-ternary
            currentSort === sortBy
              ? currentOrder === 'asc'
                ? 'desc'
                : 'asc'
              : 'asc';

          handleChangeParams((prevState) => ({
            ...prevState,
            sort: `${sortBy},${sortOrder}`,
          }));
        },
      }),
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (value: boolean) => (
        <Tag color={value ? 'green' : 'red'}>{value ? 'Ativo' : 'Inativo'}</Tag>
      ),
      filterDropdown: () => <StatusFilter />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Telefone',
      dataIndex: 'telephone',
      key: 'telephone',
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
                onClick: () => {
                  handleOpenEditUserModal(user);
                },
              },
              {
                key: 'toggleActive',
                label: user.active ? 'Desativar' : 'Ativar',
                icon: user.active ? (
                  <AiOutlineLock size={18} />
                ) : (
                  <AiOutlineUnlock size={18} />
                ),
                onClick: () => {
                  handleOpenToggleActiveModal(user);
                },
              },
              {
                key: 'remove',
                label: 'Remover',
                icon: <CiTrash size={18} />,
                onClick: () => {
                  handleOpenRemoveUserModal(user);
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
        loading={isUsersListLoading}
        dataSource={users?.content}
        rowKey="id"
        pagination={{
          current: (users?.number ?? 0) + 1,
          pageSize: users?.size,
          total: users?.totalElements,
          onChange: (pageNumber: number, pageSize: number) => {
            handleChangeParams((prevState) => ({
              ...prevState,
              page: pageNumber - 1,
              size: pageSize,
            }));
          },
        }}
      />
      <Modal.Confirm
        isLoading={isToggleActiveLoading}
        isOpen={!!selectedUserToToggleActive}
        // eslint-disable-next-line prettier/prettier
        message={`Deseja ${selectedUserToToggleActive?.active ? 'desativar' : 'ativar'
          // eslint-disable-next-line prettier/prettier
          } o usuário ${selectedUserToToggleActive?.name}`}
        onClose={handleCloseToggleActiveModal}
        onSubmit={toggleActive}
        // eslint-disable-next-line prettier/prettier
        title={`${selectedUserToToggleActive?.active ? 'Desativar' : 'Ativar'
          // eslint-disable-next-line prettier/prettier
          } usuário`}
      />

      <Modal.Confirm
        isLoading={isToggleActiveLoading}
        isOpen={!!selectedUserToDelete}
        message={`Deseja realmente remover o usuário ${selectedUserToDelete?.name} e todos os seus dados?`}
        onClose={handleCloseRemoveUserModal}
        onSubmit={toggleActive}
        title={`Removendo usuário o usuário ${selectedUserToDelete?.name}`}
      />

      <Modal.UserForm
        isOpen={!!selectedUserToUpdate}
        onClose={handleCloseEditUserModal}
        title="Editando usuário"
        formProps={{
          initialValues: {
            id: selectedUserToUpdate?.id ?? '',
            name: selectedUserToUpdate?.name ?? '',
            email: selectedUserToUpdate?.email ?? '',
            document: selectedUserToUpdate?.document ?? '',
            telephone: selectedUserToUpdate?.telephone ?? '',
          },
        }}
      />
    </>
  );
}
