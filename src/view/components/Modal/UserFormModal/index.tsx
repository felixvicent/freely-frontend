import { Modal } from 'antd';

import { Form } from '../../Form';
import { UserFormProps } from '../../Form/UserForm';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  formProps?: Omit<UserFormProps, 'onCancel'>;
}

export function UserFormModal({
  isOpen,
  onClose,
  title,
  formProps,
}: UserFormModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      title={title}
    >
      <Form.User onCancel={onClose} {...formProps} />
    </Modal>
  );
}
