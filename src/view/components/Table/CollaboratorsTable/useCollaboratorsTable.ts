import { useEffect, useState } from 'react';

import { CollaboratorParams } from '../../../../app/api/collaborators/get';
import { User } from '../../../../app/entities/User';
import { useFetchListCollaborators } from '../../../../app/hooks/api/collaborators/useFetchListCollaborators';

export function useCollaboratorsTable() {
  const [selectedCollaboratorToUpdate, setSelectedCollaboratorToUpdate] =
    useState<User | undefined>();

  const [collaboratorParams, setCollaboratorParams] =
    useState<CollaboratorParams>({
      page: 0,
      size: 10,
      sort: 'name,asc',
      collaboratorIds: [],
    });

  const { collaborators, isFetching, refetch } =
    useFetchListCollaborators(collaboratorParams);

  function handleChangeCollaboratorsParams(collaboratorIds: string[]) {
    setCollaboratorParams((prevState) => ({
      ...prevState,
      collaboratorIds,
    }));
  }

  function handleOpenUpdateModal(user: User) {
    setSelectedCollaboratorToUpdate(user);
  }

  function handleCloseUpdateModal() {
    setSelectedCollaboratorToUpdate(undefined);
  }

  useEffect(() => {
    refetch();
  }, [collaboratorParams, refetch]);

  return {
    collaborators,
    isFetching,
    handleChangeParams: setCollaboratorParams,
    collaboratorParams,
    handleChangeCollaboratorsParams,
    selectedCollaboratorToUpdate,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
  };
}
