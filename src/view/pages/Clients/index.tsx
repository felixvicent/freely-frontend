import { Button } from "antd";
import { ClientsTable } from "../../components/Table/ClientsTable";
import { useClients } from "./useClients";
import { Modal } from "../../components/Modal";

export function Clients() {
  const {
    handleOpenCloseAddClientModal,
    isAddClientModalOpen,
    handleCloseAddClientModal,
  } = useClients();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Clientes</h1>
        <Button onClick={handleOpenCloseAddClientModal} type="primary">
          Adicionar cliente
        </Button>
      </div>

      <ClientsTable />
      <Modal.ClientForm
        isOpen={isAddClientModalOpen}
        onClose={handleCloseAddClientModal}
        title="Adicionando cliente"
      />
    </div>
  );
}
