import { Dropdown, Table } from "antd";
import { Client } from "../../../../app/entities/Client";
import { AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { CiTrash } from "react-icons/ci";
import { Modal } from "../../Modal";
import { useClientsTable } from "./useClientsTable";
import { RemoveModal } from "../../Modal/RemoveModal";
import { ColumnsType } from "antd/es/table";
import { ClientFilter } from "./ClientFilter";

export function ClientsTable() {
  const {
    clients,
    isFetching,
    isEditClientModalOpen,
    handleCloseEditClientModal,
    handleSetClientToUpdate,
    selectedClientToUpdate,
    isDeleteClientModalOpen,
    handleCloseDeleteClientModal,
    handleSetClientToDelete,
    selectedClientToDelete,
    handleDeleteClient,
    isDeleteClientLoading,
    handleChangeParams,
    clientParams,
  } = useClientsTable();

  const COLUMNS: ColumnsType<Client> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (_: string, client: Client) => {
        return `${client.firstName} ${client.lastName ?? ""}`;
      },
      filterDropdown: () => <ClientFilter onFilter={handleChangeParams} />,
      filteredValue: clientParams.query ? [clientParams.query] : [],
      sorter: true,
      sortOrder:
        clientParams.sort?.split(",")[1] === "asc" ? "ascend" : "descend",
      onHeaderCell: () => ({
        onClick: () => {
          const [currentSort, currentOrder] =
            clientParams.sort?.split(",") ?? [];
          const sortBy = "firstName";
          const sortOrder =
            currentSort === sortBy
              ? currentOrder === "asc"
                ? "desc"
                : "asc"
              : "asc";

          handleChangeParams((prevState) => ({
            ...prevState,
            sort: `${sortBy},${sortOrder}`,
          }));
        },
      }),
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
    {
      title: "",
      width: "4rem",
      align: "center" as const,
      render: (_: string, client: Client) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: "edit",
                  label: "Editar",
                  icon: <AiOutlineEdit size={18} />,
                  onClick: () => {
                    handleSetClientToUpdate(client);
                  },
                },
                {
                  key: "remove",
                  label: "Remover",
                  icon: <CiTrash size={18} />,
                  onClick: () => {
                    handleSetClientToDelete(client);
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
      <Modal.ClientForm
        isOpen={isEditClientModalOpen}
        onClose={handleCloseEditClientModal}
        formProps={{
          initialValues: {
            id: selectedClientToUpdate?.id ?? "",
            firstName: selectedClientToUpdate?.firstName ?? "",
            lastName: selectedClientToUpdate?.lastName ?? "",
            email: selectedClientToUpdate?.email ?? "",
            document: selectedClientToUpdate?.document ?? "",
            telephone: selectedClientToUpdate?.telephone ?? "",
            street: selectedClientToUpdate?.address.street ?? "",
            number: selectedClientToUpdate?.address.number ?? "",
            zipCode: selectedClientToUpdate?.address.zipCode ?? "",
            city: selectedClientToUpdate?.address.city ?? "",
            state: selectedClientToUpdate?.address.state ?? "",
            complement: selectedClientToUpdate?.address.complement ?? "",
            reference: selectedClientToUpdate?.address.reference ?? "",
          },
        }}
      />
      <RemoveModal
        isOpen={isDeleteClientModalOpen}
        isLoading={isDeleteClientLoading}
        message={`Deseja realmente remover o cliente ${selectedClientToDelete?.firstName}`}
        onClose={handleCloseDeleteClientModal}
        onSubmit={handleDeleteClient}
        title="Remover cliente"
      />
    </>
  );
}
