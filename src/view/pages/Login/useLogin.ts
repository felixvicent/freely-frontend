import { toast } from "react-hot-toast";
import { FetchSignInBody } from "../../../app/api/auth/signin/post";
import { useFetchSignIn } from "../../../app/hooks/api/auth/useFetchSignIn";
import { apiException } from "../../../app/services/httpClient";

export function useLogin() {
  const { isLoading, mutateAsync: fetchLogin } = useFetchSignIn();

  async function handleSubmit(formData: FetchSignInBody) {
    try {
      await fetchLogin(formData);
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
