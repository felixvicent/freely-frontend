import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Activity } from '../../../app/entities/Activity';
import { useFetchDeleteActivity } from '../../../app/hooks/api/activities/useFetchDeleteActivity';
import { useFetchDoneActivities } from '../../../app/hooks/api/activities/useFetchDoneActivities';
import { useFetchPendingActivities } from '../../../app/hooks/api/activities/useFetchPendingActivities';
import { useFetchProgressActivities } from '../../../app/hooks/api/activities/useFetchProgressActivities';
import { useFetchWaitingActivities } from '../../../app/hooks/api/activities/useFetchWaitingActivities';
import { useFetchListAllCollaborators } from '../../../app/hooks/api/collaborators/useFetchListAllCollaborators';
import { apiException } from '../../../app/services/httpClient';

export function useActivities() {
  const [isDeleteProjectModalOpen, setIsDeleteProjectModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState(false);
  const [selectedCollaborators, setSelectedCollaborators] = useState<string[]>(
    [],
  );

  const [selectedActivityToDelete, setSelectedActivityToDelete] = useState<
    Activity | undefined
  >();

  const { pendingActivities, refetch: refetchPending } =
    useFetchPendingActivities('', selectedCollaborators);

  const { waitingActivities, refetch: refetchWaiting } =
    useFetchWaitingActivities('', selectedCollaborators);

  const { progressActivities, refetch: refetchProgress } =
    useFetchProgressActivities('', selectedCollaborators);

  const { doneActivities, refetch: refetchDone } = useFetchDoneActivities(
    '',
    selectedCollaborators,
  );

  const { collaborators } = useFetchListAllCollaborators();

  const { isLoading: isRemoveActivityLoading, mutateAsync: removeActivity } =
    useFetchDeleteActivity();

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

  async function handleRemoveActivity() {
    try {
      await removeActivity({
        path: { id: selectedActivityToDelete?.id ?? '' },
      });

      handleCloseDeleteActivityModal();
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  function handleChangeCollaboratorsFilter(colaboratorId: string) {
    if (selectedCollaborators.includes(colaboratorId)) {
      setSelectedCollaborators((prevState) =>
        prevState.filter((colab) => colab !== colaboratorId),
      );
    } else {
      setSelectedCollaborators((prevState) => [...prevState, colaboratorId]);
    }
  }

  useEffect(() => {
    refetchPending();
    refetchDone();
    refetchProgress();
    refetchWaiting();
  }, [
    refetchDone,
    refetchPending,
    refetchProgress,
    refetchWaiting,
    selectedCollaborators,
  ]);

  return {
    isLoading: isRemoveActivityLoading,
    isDeleteProjectModalOpen,
    handleCloseDeleteModal,
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
    pendingActivities,
    waitingActivities,
    progressActivities,
    doneActivities,
    collaborators,
    handleChangeCollaboratorsFilter,
    selectedCollaborators,
  };
}
