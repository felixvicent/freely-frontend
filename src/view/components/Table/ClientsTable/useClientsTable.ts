import { useEffect, useState } from "react";
import { useFetchListClients } from "../../../../app/hooks/api/clients/useFetchListClients";
import { ClientParams } from "../../../../app/api/clients/get";

export function useClientsTable() {
  const [clientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 10,
    sort: "firstName,asc",
    query: "",
  });

  const { clients, isFetching, refetch } = useFetchListClients(clientParams);

  useEffect(() => {
    refetch();
  }, [clientParams, refetch]);

  return {
    clients,
    isFetching,
    handleChangeParams: setClientParams,
    clientParams,
  };
}
