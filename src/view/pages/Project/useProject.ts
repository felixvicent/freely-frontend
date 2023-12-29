import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import { ActivityStatus } from '../../../app/entities/AcitivtyStatus';
import { Activity } from '../../../app/entities/Activity';
import { ProjectStatus } from '../../../app/entities/ProjectStatus';
import { useFetchDeleteActivity } from '../../../app/hooks/api/activities/useFetchDeleteActivity';
import { useFetchDoneActivities } from '../../../app/hooks/api/activities/useFetchDoneActivities';
import { useFetchPendingActivities } from '../../../app/hooks/api/activities/useFetchPendingActivities';
import { useFetchProgressActivities } from '../../../app/hooks/api/activities/useFetchProgressActivities';
import { useFetchUpdateActivity } from '../../../app/hooks/api/activities/useFetchUpdateActivities';
import { useFetchWaitingActivities } from '../../../app/hooks/api/activities/useFetchWaitingActivities';
import { useFetchDeleteProject } from '../../../app/hooks/api/projects/useFetchDeleteProject';
import { useFetchProjectDetails } from '../../../app/hooks/api/projects/useFetchProjectDetails';
import { useFetchUpdateProjectStatus } from '../../../app/hooks/api/projects/useFetchUpdateProjectStatus';
import { apiException } from '../../../app/services/httpClient';

export function useProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);

  const [selectedActivityToDelete, setSelectedActivityToDelete] = useState<
    Activity | undefined
  >();

  const { isFetching, project } = useFetchProjectDetails(projectId ?? '');

  const { pendingActivities } = useFetchPendingActivities(projectId ?? '');

  const { waitingActivities } = useFetchWaitingActivities(projectId ?? '');

  const { progressActivities } = useFetchProgressActivities(projectId ?? '');

  const { doneActivities } = useFetchDoneActivities(projectId ?? '');

  const { isLoading, mutateAsync: removeProject } = useFetchDeleteProject();

  const { isLoading: isRemoveActivityLoading, mutateAsync: removeActivity } =
    useFetchDeleteActivity();

  const { isLoading: isUpdateActivityLoading, mutateAsync: updateActivity } =
    useFetchUpdateActivity();

  const {
    isLoading: isUpdateProjectStatusLoading,
    mutateAsync: updateProjectStatus,
  } = useFetchUpdateProjectStatus();

  function handleCloseDeleteModal() {
    setIsDeleteProjectModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteProjectModalOpen(true);
  }

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true);
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false);
  }

  function handleCloseCreateActivityModal() {
    setIsCreateActivityModalOpen(false);
  }

  function handleOpenCreateActivityModal() {
    setIsCreateActivityModalOpen(true);
  }

  function handleOpenDeleteActivityModal(activity: Activity) {
    setSelectedActivityToDelete(activity);
  }

  function handleCloseDeleteActivityModal() {
    setSelectedActivityToDelete(undefined);
  }

  async function handleRemove() {
    try {
      await removeProject({ path: { id: projectId ?? '' } });

      navigate('/projects');
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  async function handleRemoveActivity() {
    try {
      await removeActivity({
        path: { id: selectedActivityToDelete?.id ?? '' },
      });

      queryClient.invalidateQueries({ queryKey: ['project-details'] });

      handleCloseDeleteActivityModal();
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  async function handleUpdateActivity(
    status: ActivityStatus,
    title: string,
    activityId: string,
  ) {
    try {
      await updateActivity({
        path: { id: activityId },
        body: { projectId: projectId ?? '', title, status, estimatedDate: '' },
      });

      queryClient.invalidateQueries({ queryKey: ['project-details'] });
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  async function handleUpdateProjectStatus(status: ProjectStatus) {
    try {
      await updateProjectStatus({
        body: {
          status,
        },
        path: { id: projectId ?? '' },
      });

      queryClient.invalidateQueries({ queryKey: ['project-details'] });
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return {
    isLoading:
      isFetching ||
      isUpdateActivityLoading ||
      isLoading ||
      isRemoveActivityLoading,
    project,
    isDeleteProjectModalOpen,
    handleCloseDeleteModal,
    handleRemove,
    handleOpenDeleteModal,
    isUpdateModalOpen,
    handleCloseUpdateModal,
    handleOpenUpdateModal,
    isCreateActivityModalOpen,
    handleCloseCreateActivityModal,
    handleOpenCreateActivityModal,
    handleRemoveActivity,
    handleCloseDeleteActivityModal,
    handleOpenDeleteActivityModal,
    isDeleteActivityModalOpen: !!selectedActivityToDelete,
    selectedActivityToDelete,
    handleUpdateActivity,
    pendingActivities,
    waitingActivities,
    progressActivities,
    doneActivities,
    isUpdateProjectStatusLoading,
    handleUpdateProjectStatus,
  };
}
