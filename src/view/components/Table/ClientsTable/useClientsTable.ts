import { useEffect, useState } from 'react';

import { ClientParams } from '../../../../app/api/clients/get';
import { useFetchListClients } from '../../../../app/hooks/api/clients/useFetchListClients';

export function useClientsTable() {
  const [clientParams, setClientParams] = useState<ClientParams>({
    page: 0,
    size: 10,
    sort: 'name,asc',
    clientIds: [],
  });

  const { clients, isFetching, refetch } = useFetchListClients(clientParams);

  function handleChangeClientParams(clientIds: string[]) {
    setClientParams((prevState) => ({
      ...prevState,
      clientIds,
    }));
  }

  useEffect(() => {
    refetch();
  }, [clientParams, refetch]);

  return {
    clients,
    isFetching,
    handleChangeParams: setClientParams,
    clientParams,
    handleChangeClientParams,
  };
}
