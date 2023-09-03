import { Modal } from "antd";
import { Form } from "../../Form";
import { ClientFormProps } from "../../Form/ClientForm";

interface ClientFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formProps?: Omit<ClientFormProps, "onCancel">;
}

export function ClientFormModal({
  isOpen,
  onClose,
  title,
  formProps,
}: ClientFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={title}
    >
      <Form.Client onCancel={onClose} {...formProps} />
    </Modal>
  );
}
