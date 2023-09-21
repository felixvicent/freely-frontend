import toast from "react-hot-toast";
import { useFetchCreateActivities } from "../../../../app/hooks/api/activities/useFetchCreateActivities";
import { apiException } from "../../../../app/services/httpClient";
import { useQueryClient } from "react-query";

export interface ActivityFormType {
  title?: string;
  projectId: string;
}

export function useActivityForm(projectId: string, onFinish?: () => void) {
  const { isLoading, mutateAsync } = useFetchCreateActivities();

  const queryClient = useQueryClient();

  async function handleSubmit(formData: ActivityFormType) {
    try {
      await mutateAsync({ body: { title: formData.title ?? "", projectId } });

      queryClient.invalidateQueries({ queryKey: ["project-details"] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return { handleSubmit, isLoading };
}
