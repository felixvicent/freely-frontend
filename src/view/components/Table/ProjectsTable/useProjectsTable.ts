import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { ProjectParams } from '../../../../app/api/projects/get';
import { Project } from '../../../../app/entities/Project';
import { useFetchDeleteProject } from '../../../../app/hooks/api/projects/useFetchDeleteProject';
import { useFetchListProjects } from '../../../../app/hooks/api/projects/useFetchListProjects';

export function useProjectsTable() {
  const [projectParams, setProjectParams] = useState<ProjectParams>({
    page: 0,
    size: 10,
    sort: 'createdAt,asc',
    clientIds: [],
  });
  const [selectedProjectsToUpdate, setSelectedProjectsToUpdate] =
    useState<Project>();
  const [selectedProjectsToDelete, setSelectedProjectsToDelete] =
    useState<Project>();

  const queryClient = useQueryClient();

  const { projects, isFetching, refetch } = useFetchListProjects(projectParams);
  const { isLoading, mutateAsync: deleteProject } = useFetchDeleteProject();

  function handleCloseDeleteProjectModal() {
    setSelectedProjectsToDelete(undefined);
  }

  async function handleDeleteProject() {
    if (selectedProjectsToDelete) {
      await deleteProject({ path: { id: selectedProjectsToDelete.id } });

      queryClient.invalidateQueries({ queryKey: ['projects'] });
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

  function handleChangeClientParams(clientIds: string[]) {
    setProjectParams((prevState) => ({
      ...prevState,
      clientIds,
    }));
  }

  useEffect(() => {
    refetch();
  }, [projectParams, refetch]);

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
    handleChangeClientParams,
  };
}
