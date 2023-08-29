import { Table } from "antd";
import { Client } from "../../../../app/entities/Client";
import { useFetchListClients } from "../../../../app/hooks/api/clients/useFetchListClients";

export function ClientsTable() {
  const { clients, isFetching } = useFetchListClients();

  const COLUMNS = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (_: string, client: Client) => {
        return `${client.firstName} ${client.lastName}`;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "telephone",
      key: "telephone",
    },
  ];

  return (
    <Table
      className="h-full"
      columns={COLUMNS}
      loading={isFetching}
      dataSource={clients}
    />
  );
}
