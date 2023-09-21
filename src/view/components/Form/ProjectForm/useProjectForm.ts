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
  estimatedDate: string;
  activities: {
    title: string;
  }[];
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
      estimatedDate: formData.estimatedDate,
      value: formData.value,
      activities: formData.activities
        ? formData.activities.map((activity) => ({
            title: activity.title,
          }))
        : [],
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
      queryClient.invalidateQueries({ queryKey: ["project-details"] });

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
