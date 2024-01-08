import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { User } from '../../../../app/entities/User';
import { Filter } from '../../Filter';

import { useCollaboratorsTable } from './useCollaboratorsTable';

export function CollaboratorsTable() {
  const {
    collaborators,
    isFetching,
    handleChangeParams,
    handleChangeCollaboratorsParams,
  } = useCollaboratorsTable();

  const COLUMNS: ColumnsType<User> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      filterDropdown: () => (
        <Filter.Collaborator onFilter={handleChangeCollaboratorsParams} />
      ),
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
