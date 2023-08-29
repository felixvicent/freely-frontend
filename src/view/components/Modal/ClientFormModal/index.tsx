import { Modal } from "antd";
import { Form } from "../../Form";

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ClientFormModal({
  isOpen,
  onClose,
  title,
}: ClientFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={title}
    >
      <Form.Client onCancel={onClose} />
    </Modal>
  );
}
