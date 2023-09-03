import { useEffect, useState } from "react";
import { useFetchListClients } from "../../../../app/hooks/api/clients/useFetchListClients";
import { Client } from "../../../../app/entities/Client";
import { useFetchDeleteClient } from "../../../../app/hooks/api/clients/useFetchDeleteClient";
import { useQueryClient } from "react-query";
import { ClientParams } from "../../../../app/api/clients/get";

export function useClientsTable() {
  const [clientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 10,
    sort: "firstName,asc",
    query: "",
  });

  const [selectedClientToUpdate, setSelectedClientToUpdate] = useState<
    undefined | Client
  >();
  const [selectedClientToDelete, setSelectedClientToDelete] = useState<
    undefined | Client
  >();

  const queryClient = useQueryClient();
  const { clients, isFetching, refetch } = useFetchListClients(clientParams);
  const { isLoading: isDeleteClientLoading, mutateAsync: deleteClient } =
    useFetchDeleteClient();

  function handleSetClientToUpdate(client: Client) {
    setSelectedClientToUpdate(client);
  }

  function handleCloseEditClientModal() {
    setSelectedClientToUpdate(undefined);
  }

  function handleSetClientToDelete(client: Client) {
    setSelectedClientToDelete(client);
  }

  function handleCloseDeleteClientModal() {
    setSelectedClientToDelete(undefined);
  }

  async function handleDeleteClient() {
    if (!selectedClientToDelete) return;
    await deleteClient({
      path: {
        id: selectedClientToDelete.id,
      },
    });

    queryClient.invalidateQueries({ queryKey: ["clients"] });
    handleCloseDeleteClientModal();
  }

  useEffect(() => {
    console.log("opa");
    refetch();
  }, [clientParams, refetch]);

  return {
    clients,
    isFetching,
    isEditClientModalOpen: !!selectedClientToUpdate,
    handleCloseEditClientModal,
    handleSetClientToUpdate,
    selectedClientToUpdate,
    isDeleteClientModalOpen: !!selectedClientToDelete,
    handleSetClientToDelete,
    handleCloseDeleteClientModal,
    selectedClientToDelete,
    handleDeleteClient,
    isDeleteClientLoading,
    handleChangeParams: setClientParams,
    clientParams,
  };
}
