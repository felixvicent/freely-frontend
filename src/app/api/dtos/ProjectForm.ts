export type ProjectForm = {
  title: string;
  clientId: string;
  value: number;
  estimatedDate: string;
  activities: {
    title: string;
  }[];
};
