import { useState } from "react";
import { ProjectParams } from "../../../../app/api/projects/get";
import { useFetchListProjects } from "../../../../app/hooks/api/projects/useFetchListProjects";
import { Project } from "../../../../app/entities/Project";
import { useFetchDeleteProject } from "../../../../app/hooks/api/projects/useFetchDeleteProject";
import { useQueryClient } from "react-query";

export function useProjectsTable() {
  const [projectParams, setProjectParams] = useState<ProjectParams>({
    page: 0,
    size: 10,
    sort: "createdAt,asc",
  });
  const [selectedProjectsToUpdate, setSelectedProjectsToUpdate] =
    useState<Project>();
  const [selectedProjectsToDelete, setSelectedProjectsToDelete] =
    useState<Project>();

  const queryClient = useQueryClient();

  const { projects, isFetching } = useFetchListProjects(projectParams);
  const { isLoading, mutateAsync: deleteProject } = useFetchDeleteProject();

  async function handleDeleteProject() {
    if (selectedProjectsToDelete) {
      await deleteProject({ path: { id: selectedProjectsToDelete.id } });

      queryClient.invalidateQueries({ queryKey: ["projects"] });
      handleCloseDeleteProjectModal();
    }
  }

  function handleProjectToUpdate(project: Project | undefined) {
    setSelectedProjectsToUpdate(project);
  }

  function handleProjectToDelete(project: Project | undefined) {
    setSelectedProjectsToDelete(project);
  }

  function handleCloseUpdateProjectModal() {
    setSelectedProjectsToUpdate(undefined);
  }

  function handleCloseDeleteProjectModal() {
    setSelectedProjectsToDelete(undefined);
  }

  return {
    isFetching,
    projects,
    handleChangeParams: setProjectParams,
    isUpdateModalOpen: !!selectedProjectsToUpdate,
    handleProjectToUpdate,
    handleCloseUpdateProjectModal,
    selectedProjectsToUpdate,
    isDeleteModalOpen: !!selectedProjectsToDelete,
    isDeleteLoading: isLoading,
    selectedProjectsToDelete,
    handleCloseDeleteProjectModal,
    handleDeleteProject,
    handleProjectToDelete,
  };
}
