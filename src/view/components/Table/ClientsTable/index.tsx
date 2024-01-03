import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

import { ClientList } from '../../../../app/entities/ClientList';
import { Filter } from '../../Filter';

import { useClientsTable } from './useClientsTable';

export function ClientsTable() {
  const {
    clients,
    isFetching,
    handleChangeParams,
    clientParams,
    handleChangeClientParams,
  } = useClientsTable();

  const COLUMNS: ColumnsType<ClientList> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      render: (_: string, client: ClientList) => (
        <Link to={`/clients/${client.id}`}>{client.name}</Link>
      ),
      filterDropdown: () => (
        <Filter.Client onFilter={handleChangeClientParams} />
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
      loading={isFetching}
      dataSource={clients?.content}
      rowKey="id"
      pagination={{
        current: (clients?.number ?? 0) + 1,
        pageSize: clients?.size,
        total: clients?.totalElements,
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
