import { Form } from 'antd';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { useFetchCreateActivities } from '../../../../app/hooks/api/activities/useFetchCreateActivities';
import { apiException } from '../../../../app/services/httpClient';

export interface ActivityFormType {
  title?: string;
  projectId: string;
  projectEstimatedDate: string;
  estimatedDate?: string;
}

export function useActivityForm(projectId: string, onFinish?: () => void) {
  const { isLoading, mutateAsync } = useFetchCreateActivities();

  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: ActivityFormType) {
    try {
      await mutateAsync({
        body: {
          title: formData.title ?? '',
          projectId,
          estimatedDate: formData.estimatedDate ?? '',
        },
      });

      queryClient.invalidateQueries({ queryKey: ['project-details'] });
      queryClient.invalidateQueries({ queryKey: ['pending-activities'] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading, form };
}
