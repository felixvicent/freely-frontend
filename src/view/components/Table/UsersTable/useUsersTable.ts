import { useEffect, useState } from 'react';

import { UserParams } from '../../../../app/api/users/get';
import { useFetchListUsers } from '../../../../app/hooks/api/users/useFetchListUsers';
import { useFetchSuggestionUsers } from '../../../../app/hooks/api/users/useFetchSuggestionUsers';

export function useUsersTable() {
  const [userParams, setUserParams] = useState<UserParams>({
    page: 0,
    size: 10,
    sort: 'name,asc',
    usersIds: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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
  };
}
