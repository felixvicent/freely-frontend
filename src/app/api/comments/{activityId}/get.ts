import { Comment } from '../../../entities/Comment';
import { apiException, httpClient } from '../../../services/httpClient';

interface FetchActivityCommentsPayload {
  path: {
    activityId: string;
  };
}

export async function fetchActivityComments({
  path,
}: FetchActivityCommentsPayload) {
  try {
    const { data } = await httpClient.get<Comment[]>(
      `/comments/${path.activityId}`,
    );

    return data;
  } catch (error) {
    throw apiException(error);
  }
}
