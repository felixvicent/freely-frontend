import { useMutation } from 'react-query';

import { fetchCreatePayment } from '../../../api/payment/post';

export function useFetchCreatePayment() {
  const { data, mutateAsync, isLoading } = useMutation({
    mutationFn: fetchCreatePayment,
  });

  return { data, mutateAsync, isLoading };
}
