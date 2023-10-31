import { Modal, Typography } from 'antd';

interface ConfirmModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
  message: string;
  title: string;
}

export function ConfirmModal({
  isLoading,
  isOpen,
  message,
  onClose,
  onSubmit,
  title,
}: ConfirmModalProps) {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      onOk={onSubmit}
      closable={false}
      confirmLoading={isLoading}
      destroyOnClose
      title={title}
    >
      <Typography.Text>{message}</Typography.Text>
    </Modal>
  );
}
