import { Modal, Typography } from "antd";

interface RemoveModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onClose: () => void;
  message: string;
  title: string;
}

export function RemoveModal({
  isLoading,
  isOpen,
  message,
  onClose,
  onSubmit,
  title,
}: RemoveModalProps) {
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
