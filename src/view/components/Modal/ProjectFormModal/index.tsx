import { Modal } from "antd";
import { Form } from "../../Form";
import { ProjectFormProps } from "../../Form/ProjectForm";

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formProps?: Omit<ProjectFormProps, "onCancel">;
}

export function ProjectFormModal({
  isOpen,
  onClose,
  title,
  formProps,
}: ProjectFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={title}
    >
      <Form.Project onCancel={onClose} {...formProps} />
    </Modal>
  );
}
