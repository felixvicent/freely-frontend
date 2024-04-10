import { UserPropertyDomain } from './UserPropertyDomain';

export type UserProperty = {
  id: string;
  domain: UserPropertyDomain;
  key: string;
  value: string;
};
