import { Address } from "./Address";
import { Project } from "./Project";

export type ClientPage = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  document: string;
  projects: Project[];
  address: Address;
};
