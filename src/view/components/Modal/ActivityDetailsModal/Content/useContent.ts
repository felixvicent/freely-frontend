import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { useFetchUpdateActivityDescription } from '../../../../../app/hooks/api/activities/useFetchUpdateActivityDescription';
import { apiException } from '../../../../../app/services/httpClient';

export function useContent(activityId?: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: fetchUpdateActivityDescription } =
    useFetchUpdateActivityDescription();

  async function handleUpdateDescription(description?: string) {
    if (!activityId) return;

    try {
      await fetchUpdateActivityDescription({
        path: { activityId },
        body: { description },
      });

      queryClient.invalidateQueries(['activity-details', activityId]);
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { handleUpdateDescription };
}
