import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { UserParams } from '../../../../app/api/users/get';
import { User } from '../../../../app/entities/User';
import { useFetchListUsers } from '../../../../app/hooks/api/users/useFetchListUsers';
import { useFetchSuggestionUsers } from '../../../../app/hooks/api/users/useFetchSuggestionUsers';
import { useFetchToggleUserActive } from '../../../../app/hooks/api/users/useFetchToggleUserActive';

export function useUsersTable() {
  const [userParams, setUserParams] = useState<UserParams>({
    page: 0,
    size: 10,
    sort: 'name,asc',
    usersIds: [],
    status: undefined,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<User>();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User>();
  const [selectedUserToToggleActive, setSelectedUserToToggleActive] =
    useState<User>();
  const [selectedStatus, setSelectedStatus] = useState<boolean>();

  const queryClient = useQueryClient();

  const {
    users,
    isFetching: isUsersListLoading,
    refetch: refetchUsersList,
  } = useFetchListUsers(userParams);
  const {
    usersSuggestion,
    isFetching: isUsersSuggestionLoading,
    refetch: refetchUsersSuggestion,
  } = useFetchSuggestionUsers(searchTerm);
  const { isLoading: isToggleActiveLoading, mutateAsync: fetchToggleActive } =
    useFetchToggleUserActive();

  async function toggleActive() {
    if (!selectedUserToToggleActive) return;

    await fetchToggleActive({
      path: { userId: selectedUserToToggleActive?.id },
    });

    queryClient.invalidateQueries({ queryKey: ['users'] });

    setSelectedUserToToggleActive(undefined);
  }

  function handleChangeTerm(text: string) {
    setSearchTerm(text);
  }

  function confirmFilter() {
    setUserParams((prevState) => ({
      ...prevState,
      usersIds: selectedUsers,
      status: selectedStatus,
    }));
  }

  function resetFilter() {
    setSearchTerm('');
    setSelectedUsers([]);
    setSelectedStatus(undefined);
    confirmFilter();
    setUserParams({
      page: 0,
      size: 10,
      sort: 'name,asc',
      usersIds: [],
      status: undefined,
    });
  }

  function handleAddUserToSearch(value: string) {
    if (!selectedUsers.includes(value)) {
      setSelectedUsers((prevState) => [...prevState, value]);
    }
  }

  function handleRemoveUserToSearch(value: string) {
    setSelectedUsers((prevState) => prevState.filter((id) => id !== value));
  }

  function handleOpenEditUserModal(user: User) {
    setSelectedUserToUpdate(user);
  }

  function handleCloseEditUserModal() {
    setSelectedUserToUpdate(undefined);
  }

  function handleOpenRemoveUserModal(user: User) {
    setSelectedUserToDelete(user);
  }

  function handleCloseRemoveUserModal() {
    setSelectedUserToDelete(undefined);
  }

  function handleCloseToggleActiveModal() {
    setSelectedUserToToggleActive(undefined);
  }

  function handleOpenToggleActiveModal(user: User) {
    setSelectedUserToToggleActive(user);
  }

  function handleSelectStatus(status: boolean) {
    setSelectedStatus(status);
  }

  useEffect(() => {
    refetchUsersSuggestion();
  }, [searchTerm, refetchUsersSuggestion]);

  useEffect(() => {
    refetchUsersList();
  }, [userParams, refetchUsersList]);

  return {
    users,
    isUsersListLoading,
    handleChangeParams: setUserParams,
    userParams,
    handleChangeTerm,
    usersSuggestion,
    isUsersSuggestionLoading,
    searchTerm,
    confirmFilter,
    resetFilter,
    handleAddUserToSearch,
    handleRemoveUserToSearch,
    selectedUsers,
    selectedUserToUpdate,
    selectedUserToDelete,
    handleOpenEditUserModal,
    handleOpenRemoveUserModal,
    toggleActive,
    isToggleActiveLoading,
    selectedUserToToggleActive,
    handleCloseToggleActiveModal,
    handleOpenToggleActiveModal,
    handleCloseEditUserModal,
    handleCloseRemoveUserModal,
    selectedStatus,
    handleSelectStatus,
  };
}
