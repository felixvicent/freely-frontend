import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { CollaboratorParams } from '../../../../app/api/collaborators/get';
import { User } from '../../../../app/entities/User';
import { useFetchDeleteCollaborator } from '../../../../app/hooks/api/collaborators/useFetchDeleteCollaborator';
import { useFetchListCollaborators } from '../../../../app/hooks/api/collaborators/useFetchListCollaborators';

export function useCollaboratorsTable() {
  const queryClient = useQueryClient();

  const [selectedCollaboratorToUpdate, setSelectedCollaboratorToUpdate] =
    useState<User | undefined>();
  const [selectedCollaboratorToDelete, setSelectedCollaboratorToDelete] =
    useState<User | undefined>();

  const [collaboratorParams, setCollaboratorParams] =
    useState<CollaboratorParams>({
      page: 0,
      size: 10,
      sort: 'name,asc',
      collaboratorIds: [],
    });

  const { isLoading: isDeleteLoading, mutateAsync: fetchDelete } =
    useFetchDeleteCollaborator();

  const { collaborators, isFetching, refetch } =
    useFetchListCollaborators(collaboratorParams);

  function handleChangeCollaboratorsParams(collaboratorIds: string[]) {
    setCollaboratorParams((prevState) => ({
      ...prevState,
      collaboratorIds,
    }));
  }

  async function handleDelete() {
    try {
      if (!selectedCollaboratorToDelete) return;

      await fetchDelete({ path: { id: selectedCollaboratorToDelete?.id } });

      queryClient.invalidateQueries({ queryKey: ['collaborators'] });

      setSelectedCollaboratorToDelete(undefined);
    } catch (error) {}
  }

  function handleOpenUpdateModal(user: User) {
    setSelectedCollaboratorToUpdate(user);
  }

  function handleCloseUpdateModal() {
    setSelectedCollaboratorToUpdate(undefined);
  }

  function handleOpenDeleteModal(user: User) {
    setSelectedCollaboratorToDelete(user);
  }

  function handleCloseDeleteModal() {
    setSelectedCollaboratorToDelete(undefined);
  }

  useEffect(() => {
    refetch();
  }, [collaboratorParams, refetch]);

  return {
    collaborators,
    isFetching,
    isDeleteLoading,
    handleChangeParams: setCollaboratorParams,
    collaboratorParams,
    handleChangeCollaboratorsParams,
    selectedCollaboratorToUpdate,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    handleDelete,
    selectedCollaboratorToDelete,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
  };
}
