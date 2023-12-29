import { Activity } from './Activity';
import { ClientList } from './ClientList';
import { ProjectStatus } from './ProjectStatus';

export type Project = {
  id: string;
  title: string;
  client: ClientList;
  value: number;
  estimatedDate: string;
  createdAt: string;
  activities: Activity[];
  status: ProjectStatus;
};
