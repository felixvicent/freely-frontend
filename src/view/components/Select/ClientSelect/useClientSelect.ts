import { useEffect, useState } from "react";
import { useFetchSuggestionClients } from "../../../../app/hooks/api/clients/useFetchSuggestionClients";

export function useClientSelect(selectedClientId?: string) {
  const [searchTerm, setSearchTerm] = useState("");
  const [clientId, setClientId] = useState(selectedClientId);

  const { clients, isFetching, refetch } = useFetchSuggestionClients(
    searchTerm,
    clientId
  );

  function handleChangeTerm(newTerm: string) {
    setSearchTerm(newTerm);
    setClientId("");
  }

  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

  return {
    searchTerm,
    clients,
    isFetching,
    handleChangeTerm,
  };
}
