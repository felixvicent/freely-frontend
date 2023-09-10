import { useQueryClient } from "react-query";
import { FetchCreateProjectPayload } from "../../../../app/api/projects/post";
import { useFetchCreateProject } from "../../../../app/hooks/api/projects/useFetchCreateProject";
import { toast } from "react-hot-toast";
import { apiException } from "../../../../app/services/httpClient";
import { useFetchUpdateProject } from "../../../../app/hooks/api/projects/useFetchUpdateProject";

export interface ProjectFormType {
  id: string;
  title: string;
  clientId: string;
  value: number;
  estimedDate: string;
}

export function useProjectForm(onFinish?: () => void, projectId?: string) {
  const queryClient = useQueryClient();

  const { mutateAsync: createProject, isLoading: isCreateProjectLoading } =
    useFetchCreateProject();
  const { mutateAsync: updateProject, isLoading: isUpdateProjectLoading } =
    useFetchUpdateProject();

  async function handleSubmit(formData: ProjectFormType) {
    const payload: FetchCreateProjectPayload["body"] = {
      title: formData.title,
      clientId: formData.clientId,
      estimedDate: formData.estimedDate,
      value: formData.value,
    };
    try {
      if (projectId) {
        await updateProject({
          body: payload,
          path: {
            id: projectId,
          },
        });
      } else {
        await createProject({
          body: payload,
        });
      }

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      if (onFinish) {
        onFinish();
      }
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }
  return {
    handleSubmit,
    isLoading: isCreateProjectLoading || isUpdateProjectLoading,
  };
}
