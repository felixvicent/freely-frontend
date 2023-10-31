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
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<User>();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User>();
  const [selectedUserToToggleActive, setSelectedUserToToggleActive] =
    useState<User>();

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
    setUserParams((prevState) => ({ ...prevState, usersIds: selectedUsers }));
  }

  function resetFilter() {
    setSearchTerm('');
    setSelectedUsers([]);
    confirmFilter();
    setUserParams({
      page: 0,
      size: 10,
      sort: 'name,asc',
      usersIds: [],
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

  function handleOpenRemoveUserModal(user: User) {
    setSelectedUserToDelete(user);
  }

  function handleCloseToggleActiveModal() {
    setSelectedUserToToggleActive(undefined);
  }

  function handleOpenToggleActiveModal(user: User) {
    setSelectedUserToToggleActive(user);
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
  };
}
