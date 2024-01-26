import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { useFetchActivityDetails } from '../../../../app/hooks/api/activities/useFetchActivityDetails';
import { useFetchUpdateActivity } from '../../../../app/hooks/api/activities/useFetchUpdateActivities';
import { useFetchUpdateActivityResponsible } from '../../../../app/hooks/api/activities/useFetchUpdateActivityResponsible';
import { apiException } from '../../../../app/services/httpClient';
import { getQueryToInvalidate } from '../../../../app/utils/activities/getQueryToInvalidate';

export function useActivityDetailsModal(activityId: string, isOpen: boolean) {
  const {
    activity,
    isFetching: isActivityLoading,
    refetch: refetchActivity,
  } = useFetchActivityDetails(activityId);
  const { isLoading: isUpdateActivityStatusLoading, mutateAsync } =
    useFetchUpdateActivity();
  const {
    isLoading: isUpdateActivityResponsibleLoading,
    mutateAsync: fetchUpdateActivityResponsible,
  } = useFetchUpdateActivityResponsible();

  const queryClient = useQueryClient();

  async function handleChangeStatus(status: ActivityStatus) {
    try {
      await mutateAsync({
        body: {
          estimatedDate: activity?.estimatedDate ?? '',
          projectId: activity?.project.id ?? '',
          title: activity?.title ?? '',
          status,
        },
        path: {
          id: activityId,
        },
      });

      queryClient.invalidateQueries({
        queryKey: [
          getQueryToInvalidate(
            ActivityStatus[activity?.status as keyof typeof ActivityStatus],
          ),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          getQueryToInvalidate(
            ActivityStatus[status as keyof typeof ActivityStatus],
          ),
        ],
      });
      queryClient.invalidateQueries(['activity-details', activityId]);
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  async function handleUpdateActivityResponsible(responsibleId?: string) {
    try {
      await fetchUpdateActivityResponsible({
        body: {
          responsibleId,
        },
        path: {
          activityId,
        },
      });

      queryClient.invalidateQueries(['activity-details']);
      queryClient.invalidateQueries({
        queryKey: [
          getQueryToInvalidate(
            ActivityStatus[activity?.status as keyof typeof ActivityStatus],
          ),
        ],
      });
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  useEffect(() => {
    if (isOpen) {
      refetchActivity();
    }
  }, [refetchActivity, isOpen, activityId]);

  return {
    activity,
    isUpdateActivityStatusLoading,
    handleChangeStatus,
    handleUpdateActivityResponsible,
    isUpdateActivityResponsibleLoading,
    isActivityLoading,
  };
}
