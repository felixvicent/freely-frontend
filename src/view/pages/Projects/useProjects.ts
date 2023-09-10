import { useState } from "react";

export function useProjects() {
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  function handleOpenProjectModal() {
    setIsAddProjectModalOpen(true);
  }

  function handleCloseProjectModal() {
    setIsAddProjectModalOpen(false);
  }

  return {
    handleOpenProjectModal,
    isAddProjectModalOpen,
    handleCloseProjectModal,
  };
}
