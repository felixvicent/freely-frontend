import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { FetchCreateUserBody } from '../../../../app/api/users/post';
import { useFetchCreateUser } from '../../../../app/hooks/api/users/useFetchCreateUser';
import { apiException } from '../../../../app/services/httpClient';

export interface UserFormType {
  id: string;
  name: string;
  email: string;
  document: string;
}

export function useUserForm(onFinish?: () => void) {
  const { mutateAsync: createClient, isLoading: isCreateLoadingUser } =
    useFetchCreateUser();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: UserFormType) {
    const payload: FetchCreateUserBody = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
    };
    try {
      await createClient(payload);

      queryClient.invalidateQueries({ queryKey: ['users'] });

      onFinish?.();
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { isCreateLoadingUser, handleSubmit };
}
