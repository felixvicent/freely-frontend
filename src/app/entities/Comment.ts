import { User } from './User';

export type Comment = {
  id: string;
  comment: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};
