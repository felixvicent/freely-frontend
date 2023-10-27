import { useState } from 'react';

export function useUsers() {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  function handleCloseAddUserModal() {
    setIsAddUserModalOpen(false);
  }

  function handleOpenCloseAddUserModal() {
    setIsAddUserModalOpen(true);
  }

  return {
    isAddUserModalOpen,
    handleCloseAddUserModal,
    handleOpenCloseAddUserModal,
  };
}
