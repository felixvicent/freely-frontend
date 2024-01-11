import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

import { ActivityStatus } from '../../../../app/entities/ActivityStatus';
import { useFetchActivityDetails } from '../../../../app/hooks/api/activities/useFetchActivityDetails';
import { useFetchUpdateActivity } from '../../../../app/hooks/api/activities/useFetchUpdateActivities';
import { getQueryToInvalidate } from '../../../../app/utils/activities/getQueryToInvalidate';

export function useActivityDetailsModal(activityId: string, isOpen: boolean) {
  const { activity, isFetching, refetch } = useFetchActivityDetails(activityId);
  const { isLoading: isUpdateActivityStatusLoading, mutateAsync } =
    useFetchUpdateActivity();

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
      queryClient.invalidateQueries(['acitivity-details']);
    } catch (error) {}
  }

  useEffect(() => {
    if (isOpen) {
      refetch();
    }
  }, [refetch, isOpen]);

  return {
    activity,
    isLoading: isFetching || isUpdateActivityStatusLoading,
    handleChangeStatus,
  };
}
