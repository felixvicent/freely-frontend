import { toast } from "react-hot-toast";
import { FetchCreateClientPayload } from "../../../../app/api/clients/post";
import { apiException } from "../../../../app/services/httpClient";
import { useFetchCreateClient } from "../../../../app/hooks/api/clients/useFetchCreateClient";
import { useQueryClient } from "react-query";

interface ClientFormType {
  firstName: string;
  lastName: string;
  email: string;
  document: string;
  telephone: string;
  street: string;
  city: string;
  zipCode: string;
  number: string;
  state: string;
}

export function useClientForm(onFinish?: () => void) {
  const { mutateAsync: createClient, isLoading } = useFetchCreateClient();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: ClientFormType) {
    const payload: FetchCreateClientPayload = {
      body: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        document: formData.document,
        telephone: formData.telephone,
        address: {
          street: formData.street,
          number: formData.number,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
        },
      },
    };
    try {
      await createClient(payload);

      queryClient.invalidateQueries({ queryKey: ["clients"] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
