import { useNavigate, useParams } from "react-router-dom";
import { useFetchProjectDetails } from "../../../app/hooks/api/projects/useFetchProjectDetails";
import { useFetchDeleteProject } from "../../../app/hooks/api/projects/useFetchDeleteProject";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiException } from "../../../app/services/httpClient";
import { useFetchDeleteActivity } from "../../../app/hooks/api/activities/useFetchDeleteActivity";
import { Activity } from "../../../app/entities/Activity";
import { useQueryClient } from "react-query";
import { ActivityStatus } from "../../../app/entities/AcitivtyStatus";
import { useFetchUpdateActivity } from "../../../app/hooks/api/activities/useFetchUpdateActivities";

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

  const { isFetching, project } = useFetchProjectDetails(projectId ?? "");

  const { isLoading, mutateAsync: removeProject } = useFetchDeleteProject();

  const { isLoading: isRemoveActivityLoading, mutateAsync: removeActivity } =
    useFetchDeleteActivity();

  const { isLoading: isUpdateActivityLoading, mutateAsync: updateActivity } =
    useFetchUpdateActivity();

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
      await removeProject({ path: { id: projectId ?? "" } });

      navigate("/projects");
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  async function handleRemoveActivity() {
    try {
      await removeActivity({
        path: { id: selectedActivityToDelete?.id ?? "" },
      });

      queryClient.invalidateQueries({ queryKey: ["project-details"] });

      handleCloseDeleteActivityModal();
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  async function handleUpdateActivity(
    status: ActivityStatus,
    title: string,
    activityId: string
  ) {
    try {
      await updateActivity({
        path: { id: activityId },
        body: { projectId: projectId ?? "", title, status },
      });

      queryClient.invalidateQueries({ queryKey: ["project-details"] });
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
  };
}
