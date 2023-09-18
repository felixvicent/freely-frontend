import { Activity } from "./Activity";
import { ClientList } from "./ClientList";

export type Project = {
  id: string;
  title: string;
  client: ClientList;
  value: number;
  estimedDate: string;
  createdAt: string;
  activities: Activity[];
};
