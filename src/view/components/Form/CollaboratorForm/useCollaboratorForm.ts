import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';

import { FetchCreateCollaboratorPayload } from '../../../../app/api/collaborators/post';
import { useFetchCreateCollaborator } from '../../../../app/hooks/api/collaborators/useFetchCreateCollaborator';
import { useFetchUpdateCollaborator } from '../../../../app/hooks/api/collaborators/useFetchUpdateCollaborator';
import { apiException } from '../../../../app/services/httpClient';

export interface CollaboratorFormType {
  id: string;
  name: string;
  email: string;
  document: string;
  telephone: string;
  office: string;
}

export function useCollaboratorForm(userId?: string, onFinish?: () => void) {
  const {
    mutateAsync: createCollaborator,
    isLoading: isCreateLoadingCollaborator,
  } = useFetchCreateCollaborator();

  const {
    mutateAsync: updateCollaborator,
    isLoading: isUpdateLoadingCollaborator,
  } = useFetchUpdateCollaborator();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: CollaboratorFormType) {
    const payload: FetchCreateCollaboratorPayload['body'] = {
      name: formData.name,
      email: formData.email,
      document: formData.document,
      telephone: formData.telephone,
      office: formData.office,
    };
    try {
      if (userId) {
        await updateCollaborator({ body: payload, path: { id: userId } });
      } else {
        await createCollaborator({ body: payload });
      }

      queryClient.invalidateQueries({ queryKey: ['collaborators'] });

      onFinish?.();
    } catch (error) {
      toast.error(apiException(error).message);
    }
  }

  return {
    isLoading: isCreateLoadingCollaborator || isUpdateLoadingCollaborator,
    handleSubmit,
  };
}
