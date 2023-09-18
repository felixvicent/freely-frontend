import { useEffect, useState } from "react";
import { useFetchListClients } from "../../../../app/hooks/api/clients/useFetchListClients";
import { ClientList } from "../../../../app/entities/ClientList";
import { ClientParams } from "../../../../app/api/clients/get";

export function useClientsTable() {
  const [clientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 10,
    sort: "firstName,asc",
    query: "",
  });

  const [selectedClientToUpdate, setSelectedClientToUpdate] = useState<
    undefined | ClientList
  >();

  const { clients, isFetching, refetch } = useFetchListClients(clientParams);

  function handleSetClientToUpdate(client: ClientList) {
    setSelectedClientToUpdate(client);
  }

  function handleCloseEditClientModal() {
    setSelectedClientToUpdate(undefined);
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
    handleChangeParams: setClientParams,
    clientParams,
  };
}
