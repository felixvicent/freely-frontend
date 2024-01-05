import { useState } from 'react';

export function useCollaborators() {
  const [isCreateCollaboratorModalOpen, setIsCreateCollaboratorModalOpen] =
    useState(false);

  function handleOpenModal() {
    setIsCreateCollaboratorModalOpen(true);
  }

  function handleCloseModal() {
    setIsCreateCollaboratorModalOpen(false);
  }

  return { isCreateCollaboratorModalOpen, handleOpenModal, handleCloseModal };
}
