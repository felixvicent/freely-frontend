import { useNavigate, useParams } from "react-router-dom";
import { useFetchClientDetails } from "../../../app/hooks/api/clients/useFetchClientDetails";
import { useState } from "react";
import { useFetchDeleteClient } from "../../../app/hooks/api/clients/useFetchDeleteClient";
import toast from "react-hot-toast";
import { apiException } from "../../../app/services/httpClient";

export function useClient() {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { clientId } = useParams();
  const navigate = useNavigate();

  const { client, isFetching } = useFetchClientDetails(clientId ?? "");
  const { isLoading, mutateAsync: handleRemoveClient } = useFetchDeleteClient();

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true);
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false);
  }

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleRemove() {
    try {
      await handleRemoveClient({ path: { id: clientId ?? "" } });

      navigate("/clients");
    } catch (error) {
      console.log(error);
      toast.error(apiException(error).message);
    }
  }

  return {
    client,
    isLoading: isFetching,
    isUpdateModalOpen,
    handleOpenUpdateModal,
    handleCloseUpdateModal,
    isLoadingDelete: isLoading,
    handleRemove,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
  };
}
