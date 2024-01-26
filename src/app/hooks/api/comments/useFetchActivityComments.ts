import { useQuery } from 'react-query';

import { fetchActivityComments } from '../../../api/comments/{activityId}/get';

export function useFetchActivityComments(activityId: string) {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['activity-comments', activityId],
    queryFn: () => fetchActivityComments({ path: { activityId } }),
  });

  return { comments: data, isFetching, refetch };
}
