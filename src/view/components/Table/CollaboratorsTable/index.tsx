import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { User } from '../../../../app/entities/User';

import { useCollaboratorsTable } from './useCollaboratorsTable';

export function CollaboratorsTable() {
  const { collaborators, isFetching, handleChangeParams, clientParams } =
    useCollaboratorsTable();

  const COLUMNS: ColumnsType<User> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, collaborator: User) => (
        <Link to={`/clients/${collaborator.id}`}>{collaborator.name}</Link>
      ),
      filteredValue: clientParams.clientIds,
      sorter: true,
      sortOrder:
        clientParams.sort?.split(',')[1] === 'asc' ? 'ascend' : 'descend',
      onHeaderCell: () => ({
        onClick: () => {
          const [currentSort, currentOrder] =
            clientParams.sort?.split(',') ?? [];
          const sortBy = 'firstName';
          const sortOrder =
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (value: boolean) => (
        <Tag color={value ? 'green' : 'red'}>{value ? 'Ativo' : 'Inativo'}</Tag>
      ),
    },
  ];

  return (
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
  );
}
