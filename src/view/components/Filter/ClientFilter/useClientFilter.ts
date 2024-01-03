import { useEffect, useState } from 'react';

import { useFetchSuggestionClients } from '../../../../app/hooks/api/clients/useFetchSuggestionClients';

export function useClientFilter(onFilter: (clientIds: string[]) => void) {
  const [term, setTerm] = useState('');
  const [selectedClients, setSelectedClients] = useState<string[]>([]);

  const {
    clients: suggestions,
    isFetching,
    refetch,
  } = useFetchSuggestionClients(term);

  function handleAddClientToSearch(value: string) {
    if (!selectedClients.includes(value)) {
      setSelectedClients((prevState) => [...prevState, value]);
    }
  }

  function handleRemoveClientToSearch(value: string) {
    setSelectedClients((prevState) => prevState.filter((id) => id !== value));
  }

  function handleChangeTerm(text: string) {
    setTerm(text);
  }

  function confirmFilter() {
    onFilter(selectedClients);
  }

  function resetFilter() {
    setTerm('');
    setSelectedClients([]);
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
    selectedClients,
    handleAddClientToSearch,
    handleRemoveClientToSearch,
    confirmFilter,
    resetFilter,
  };
}
