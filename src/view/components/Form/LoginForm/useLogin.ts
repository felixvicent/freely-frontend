import { toast } from 'react-hot-toast';

import { FetchSignInBody } from '../../../../app/api/auth/signin/post';
import { useFetchSignIn } from '../../../../app/hooks/api/auth/useFetchSignIn';
import { useAuth } from '../../../../app/hooks/useAuth';
import { apiException } from '../../../../app/services/httpClient';

export function useLogin() {
  const { isLoading, mutateAsync: fetchLogin } = useFetchSignIn();

  const { signin } = useAuth();

  async function handleSubmit(formData: FetchSignInBody) {
    try {
      const { token } = await fetchLogin(formData);

      signin(token);
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
