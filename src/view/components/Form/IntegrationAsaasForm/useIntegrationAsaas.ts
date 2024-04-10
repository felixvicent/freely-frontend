import { useForm } from 'antd/es/form/Form';
import { toast } from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { useFetchGetIntegrationAsass } from '../../../../app/hooks/api/integrations/asaas/useFetchGetIntegrationAsass';
import { useFetchSaveIntegrationAsaas } from '../../../../app/hooks/api/integrations/asaas/useSaveIntegrationAsaas';
import { apiException } from '../../../../app/services/httpClient';

export interface IntegrationAsaasForm {
  apiKey: string;
}

export function useIntegrationAsaas() {
  const queryClient = useQueryClient();
  const [form] = useForm();

  const { isLoading, mutateAsync: saveIntegrationAsaas } =
    useFetchSaveIntegrationAsaas();

  const { property } = useFetchGetIntegrationAsass();

  form.setFieldValue('apiKey', property?.value);

  async function handleSubmit(formData: IntegrationAsaasForm) {
    try {
      await saveIntegrationAsaas({
        body: {
          apiKey: formData.apiKey,
        },
      });

      queryClient.invalidateQueries({ queryKey: 'integration-asaas' });
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading, form };
}
