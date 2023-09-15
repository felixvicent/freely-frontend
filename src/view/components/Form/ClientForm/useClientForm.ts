import { toast } from "react-hot-toast";
import { FetchCreateClientPayload } from "../../../../app/api/clients/post";
import { apiException } from "../../../../app/services/httpClient";
import { useFetchCreateClient } from "../../../../app/hooks/api/clients/useFetchCreateClient";
import { useQueryClient } from "react-query";
import { useFetchUpdateClient } from "../../../../app/hooks/api/clients/useFetchUpdateClient";

export interface ClientFormType {
  id: string;
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
  complement: string;
  reference: string;
}

export function useClientForm(onFinish?: () => void, clientId?: string) {
  const { mutateAsync: createClient, isLoading: isCreateClientLoading } =
    useFetchCreateClient();
  const { mutateAsync: updateClient, isLoading: isUpdateClientLoading } =
    useFetchUpdateClient();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: ClientFormType) {
    const payload: FetchCreateClientPayload["body"] = {
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
        complement: formData.complement,
        reference: formData.reference,
      },
    };
    try {
      if (clientId) {
        await updateClient({
          body: payload,
          path: {
            id: clientId,
          },
        });
      } else {
        await createClient({
          body: payload,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["clients"] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return {
    handleSubmit,
    isLoading: isCreateClientLoading || isUpdateClientLoading,
  };
}
