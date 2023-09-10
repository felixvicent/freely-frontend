import { Button } from "antd";
import { useClients } from "./useClients";
import { Modal } from "../../components/Modal";
import { Table } from "../../components/Table";

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

      <Table.Clients />
      <Modal.ClientForm
        isOpen={isAddClientModalOpen}
        onClose={handleCloseAddClientModal}
        title="Adicionando cliente"
      />
    </div>
  );
}
