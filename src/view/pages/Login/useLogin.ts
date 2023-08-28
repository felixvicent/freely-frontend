import { toast } from "react-hot-toast";
import { FetchSignInBody } from "../../../app/api/auth/signin/post";
import { useFetchSignIn } from "../../../app/hooks/api/auth/useFetchSignIn";
import { apiException } from "../../../app/services/httpClient";
import { useAuth } from "../../../app/hooks/useAuth";

export function useLogin() {
  const { isLoading, mutateAsync: fetchLogin } = useFetchSignIn();

  const { signin } = useAuth();

  async function handleSubmit(formData: FetchSignInBody) {
    try {
      const {
        token: { token },
      } = await fetchLogin(formData);

      signin(token);
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
