import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { User } from '../../../../app/entities/User';

import { UsersFilter } from './UsersFilter';
import { useUsersTable } from './useUsersTable';

export function UsersTable() {
  const { users, isUsersListLoading, handleChangeParams, userParams } =
    useUsersTable();

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
      title: 'Projetos',
      dataIndex: 'quantityOfProjects',
      key: 'quantityOfProjects',
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
  ];

  return (
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
  );
}
