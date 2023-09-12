export type ProjectForm = {
  title: string;
  clientId: string;
  value: number;
  estimedDate: string;
  activities: {
    title: string;
  }[];
};
