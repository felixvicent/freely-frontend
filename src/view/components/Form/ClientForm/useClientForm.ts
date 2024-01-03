import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { FetchCreateClientPayload } from '../../../../app/api/clients/post';
import { useFetchCreateClient } from '../../../../app/hooks/api/clients/useFetchCreateClient';
import { useFetchUpdateClient } from '../../../../app/hooks/api/clients/useFetchUpdateClient';
import { apiException } from '../../../../app/services/httpClient';

export interface ClientFormType {
  id: string;
  name: string;
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
    const payload: FetchCreateClientPayload['body'] = {
      name: formData.name,
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

      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client-details'] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return {
    handleSubmit,
    isLoading: isCreateClientLoading || isUpdateClientLoading,
  };
}
