import { useMutation } from "react-query";
import { fetchSignIn } from "../../../api/auth/signin/post";

export function useFetchSignIn() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchSignIn,
  });

  return { data, mutateAsync, isLoading };
}
