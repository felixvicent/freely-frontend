import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { FetchCreateUserPayload } from '../../../../app/api/users/post';
import { useFetchCreateUser } from '../../../../app/hooks/api/users/useFetchCreateUser';
import { useFetchUpdateUser } from '../../../../app/hooks/api/users/useFetchUpdateUser';
import { apiException } from '../../../../app/services/httpClient';

export interface UserFormType {
  id: string;
  name: string;
  email: string;
  document: string;
  telephone: string;
}

export function useUserForm(userId?: string, onFinish?: () => void) {
  const { mutateAsync: createUser, isLoading: isCreateLoadingUser } =
    useFetchCreateUser();
  const { mutateAsync: updateUser, isLoading: isUpdateLoadingUser } =
    useFetchUpdateUser();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: UserFormType) {
    const payload: FetchCreateUserPayload['body'] = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
      telephone: formData.telephone,
    };
    try {
      if (userId) {
        await updateUser({ body: payload, path: { id: userId } });
      } else {
        await createUser({ body: payload });
      }

      queryClient.invalidateQueries({ queryKey: ['users'] });

      onFinish?.();
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return {
    isLoading: isCreateLoadingUser || isUpdateLoadingUser,
    handleSubmit,
  };
}
