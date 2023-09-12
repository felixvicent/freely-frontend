import { Activity } from "./Activity";
import { Client } from "./Client";

export type Project = {
  id: string;
  title: string;
  client: Client;
  value: number;
  estimedDate: string;
  createdAt: string;
  activities: Activity[];
};
