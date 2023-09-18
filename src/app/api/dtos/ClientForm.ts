export type ClientForm = {
  firstName: string;
  lastName: string;
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
