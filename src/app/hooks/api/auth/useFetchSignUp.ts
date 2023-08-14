import { useMutation } from "react-query";
import { fetchSignUp } from "../../../api/auth/signup/post";

export function useFetchSignUp() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchSignUp,
  });

  return { data, mutateAsync, isLoading };
}
