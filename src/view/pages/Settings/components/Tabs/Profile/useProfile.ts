import { useFetchMe } from '../../../../../../app/hooks/api/users/useFetchMe';

export function useProfile() {
  const { user } = useFetchMe();

  return {
    user,
  };
}
