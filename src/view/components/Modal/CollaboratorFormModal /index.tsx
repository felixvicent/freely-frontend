import { Modal } from 'antd';

import { Form } from '../../Form';
import { CollaboratorFormProps } from '../../Form/CollaboratorForm';

interface CollaboratorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formProps?: Omit<CollaboratorFormProps, 'onCancel'>;
}

export function CollaboratorFormModal({
  isOpen,
  onClose,
  title,
  formProps,
}: CollaboratorFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={title}
    >
      <Form.Collaborators onCancel={onClose} {...formProps} />
    </Modal>
  );
}
