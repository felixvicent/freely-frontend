import { Activity } from "./Activity";
import { ClientList } from "./ClientList";
import { Project } from "./Project";

export type Dashboard = {
  quantityOfClients: number;
  latestClients: ClientList[];
  quantityOfProjects: number;
  latestProjects: Project[];
  quantityOfActivities: number[];
  latestActivities: Activity[];
};
