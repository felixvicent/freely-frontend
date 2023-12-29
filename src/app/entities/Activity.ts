import { Project } from './Project';

export type Activity = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  project: Project;
  estimatedDate: string;
  finishedAt: string;
};
