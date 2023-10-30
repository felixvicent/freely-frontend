import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FetchActiveAccountBody } from '../../../../app/api/auth/active-account/post';
import { useFetchActiveAccount } from '../../../../app/hooks/api/auth/useFetchActiveAccount';
import { useAuth } from '../../../../app/hooks/useAuth';
import { apiException } from '../../../../app/services/httpClient';
import { getUrlParam } from '../../../../app/utils/url/getUrlParams';

export function useActiveAccount() {
  const { isLoading, mutateAsync: fetchActiveAccount } =
    useFetchActiveAccount();

  const navigate = useNavigate();

  const { signin } = useAuth();

  async function handleSubmit(formData: FetchActiveAccountBody) {
    const code = getUrlParam('code');

    if (!code) return;

    try {
      const { token } = await fetchActiveAccount({
        password: formData.password,
        code,
      });

      signin(token);

      navigate('/');
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
