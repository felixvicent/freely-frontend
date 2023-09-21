import { Modal } from "antd";
import { Form } from "../../Form";
import { ActivityFormProps } from "../../Form/ActivityForm";

interface ActivityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formProps?: Omit<ActivityFormProps, "onCancel">;
}

export function ActivityFormModal({
  isOpen,
  onClose,
  title,
  formProps,
}: ActivityFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={title}
      footer={null}
      destroyOnClose
    >
      <Form.Activity onCancel={onClose} {...formProps} />
    </Modal>
  );
}
