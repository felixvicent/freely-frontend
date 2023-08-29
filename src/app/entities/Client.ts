import { Address } from "./Address";

export type Client = {
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  telephone: string;
  address: Address;
  createdAt: string;
};
