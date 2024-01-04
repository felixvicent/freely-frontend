import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

import { ProjectParams } from '../../../../app/api/projects/get';
import { Project } from '../../../../app/entities/Project';
import { ProjectStatus } from '../../../../app/entities/ProjectStatus';
import { useFetchDeleteProject } from '../../../../app/hooks/api/projects/useFetchDeleteProject';
import { useFetchListProjects } from '../../../../app/hooks/api/projects/useFetchListProjects';

export function useProjectsTable() {
  const [projectParams, setProjectParams] = useState<ProjectParams>({
    page: 0,
    size: 10,
    sort: 'createdAt,desc',
    clientIds: [],
    status: [],
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

  function handleChangeStatusParams(status: ProjectStatus[]) {
    setProjectParams((prevState) => ({
      ...prevState,
      status,
    }));
  }

  function getSortOrder(key: string) {
    return projectParams.sort?.split(',')[0] === key
      ? projectParams.sort?.split(',')[1] === 'asc'
        ? 'ascend'
        : 'descend'
      : undefined;
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
    getSortOrder,
    handleChangeStatusParams,
  };
}
