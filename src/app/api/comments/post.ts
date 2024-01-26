import { Comment } from '../../entities/Comment';
import { httpClient } from '../../services/httpClient';
import { CommentForm } from '../dtos/CommentForm';

export interface FetchCreateCommentPayload {
  body: CommentForm;
}

export async function fetchCreateComment({ body }: FetchCreateCommentPayload) {
  const { data } = await httpClient.post<Comment>('/comments', body);

  return data;
}
