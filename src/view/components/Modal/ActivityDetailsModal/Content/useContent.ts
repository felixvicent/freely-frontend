import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { useFetchUpdateActivityDescription } from '../../../../../app/hooks/api/activities/useFetchUpdateActivityDescription';
import { useFetchActivityComments } from '../../../../../app/hooks/api/comments/useFetchActivityComments';
import { useFetchCreateComments } from '../../../../../app/hooks/api/comments/useFetchCreateComments';
import { apiException } from '../../../../../app/services/httpClient';

export function useContent(activityId?: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: fetchUpdateActivityDescription } =
    useFetchUpdateActivityDescription();

  const { mutateAsync: fetchCreateComment, isLoading: isCreateCommentLoading } =
    useFetchCreateComments();

  const { comments, isFetching: isCommentsLoading } = useFetchActivityComments(
    activityId ?? '',
  );

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

  async function handleCreateComment(comment?: string) {
    if (!activityId) return;

    try {
      await fetchCreateComment({
        body: { comment: comment ?? '', activityId },
      });

      queryClient.invalidateQueries(['activity-comments', activityId]);
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return {
    handleUpdateDescription,
    isCreateCommentLoading,
    handleCreateComment,
    isCommentsLoading,
    comments,
  };
}
