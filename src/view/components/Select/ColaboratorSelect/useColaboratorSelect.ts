import { useEffect, useState } from 'react';

import { useFetchSuggestionCollaborators } from '../../../../app/hooks/api/collaborators/useFetchSuggestionCollaborators';

export function useColaboratorSelect(selectedClientId?: string) {
  const [searchTerm, setSearchTerm] = useState('');
  const [colaboratorId, setColaboratorId] = useState(selectedClientId);

  const { collaborators, isFetching, refetch } =
    useFetchSuggestionCollaborators(searchTerm, colaboratorId);

  function handleChangeTerm(newTerm: string) {
    setSearchTerm(newTerm);
    setColaboratorId('');
  }

  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

  return {
    searchTerm,
    collaborators,
    isFetching,
    handleChangeTerm,
  };
}
