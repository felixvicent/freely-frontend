import { ActivityStatus } from './ActivityStatus';
import { Project } from './Project';

export type Activity = {
  id: string;
  title: string;
  status: ActivityStatus;
  createdAt: string;
  project: Project;
  estimatedDate: string;
  finishedAt: string;
};
