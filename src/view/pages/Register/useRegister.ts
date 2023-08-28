import { toast } from "react-hot-toast";
import { apiException } from "../../../app/services/httpClient";
import { useFetchSignUp } from "../../../app/hooks/api/auth/useFetchSignUp";
import { FetchSignUpBody } from "../../../app/api/auth/signup/post";
import { useNavigate } from "react-router-dom";

export function useRegister() {
  const { isLoading, mutateAsync: fetchRegister } = useFetchSignUp();
  const navigate = useNavigate();

  async function handleSubmit(formData: FetchSignUpBody) {
    try {
      await fetchRegister(formData);

      toast.success("Conta criada com sucesso!");

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
