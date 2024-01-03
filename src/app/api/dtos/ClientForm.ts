export type ClientForm = {
  name: string;
  email: string;
  telephone: string;
  document: string;
  address: {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    state: string;
    complement: string;
    reference: string;
  };
};
