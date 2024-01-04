import { useEffect, useState } from 'react';

import { ClientParams } from '../../../../app/api/clients/get';
import { useFetchListCollaborators } from '../../../../app/hooks/api/collaborators/useFetchListCollaborators';

export function useCollaboratorsTable() {
  const [collaboratorParams, setCollaboratorParams] = useState<ClientParams>({
    page: 0,
    size: 10,
    sort: 'name,asc',
    clientIds: [],
  });

  const { collaborators, isFetching, refetch } =
    useFetchListCollaborators(collaboratorParams);

  function handleChangeClientParams(clientIds: string[]) {
    setCollaboratorParams((prevState) => ({
      ...prevState,
      clientIds,
    }));
  }

  useEffect(() => {
    refetch();
  }, [collaboratorParams, refetch]);

  return {
    collaborators,
    isFetching,
    handleChangeParams: setCollaboratorParams,
    clientParams: collaboratorParams,
    handleChangeClientParams,
  };
}
