import { useState } from "react";

export function useClients() {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  function handleCloseAddClientModal() {
    setIsAddClientModalOpen(false);
  }

  function handleOpenCloseAddClientModal() {
    setIsAddClientModalOpen(true);
  }

  return {
    isAddClientModalOpen,
    handleCloseAddClientModal,
    handleOpenCloseAddClientModal,
  };
}
