import { useEffect, useState } from 'react';

import { useFetchSuggestionCollaborators } from '../../../../app/hooks/api/collaborators/useFetchSuggestionCollaborators';

export function useCollaboratorFilter(onFilter: (clientIds: string[]) => void) {
  const [term, setTerm] = useState('');
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(
    [],
  );

  const {
    collaborators: suggestions,
    isFetching,
    refetch,
  } = useFetchSuggestionCollaborators(term);

  function handleAddCollaboratorToSearch(value: string) {
    if (!selectedCollaborators.includes(value)) {
      setSelectedCollaborators((prevState) => [...prevState, value]);
    }
  }

  function handleRemoveCollaboratorToSearch(value: string) {
    setSelectedCollaborators((prevState) =>
      prevState.filter((id) => id !== value),
    );
  }

  function handleChangeTerm(text: string) {
    setTerm(text);
  }

  function confirmFilter() {
    onFilter(selectedCollaborators);
  }

  function resetFilter() {
    setTerm('');
    setSelectedCollaborators([]);
    onFilter([]);
  }

  useEffect(() => {
    refetch();
  }, [term, refetch]);

  return {
    suggestions,
    isFetching,
    handleChangeTerm,
    term,
    selectedCollaborators,
    handleAddCollaboratorToSearch,
    handleRemoveCollaboratorToSearch,
    confirmFilter,
    resetFilter,
  };
}
