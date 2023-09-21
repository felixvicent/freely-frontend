import { Button, Form, Input } from "antd";
import { ActivityFormType, useActivityForm } from "./useActivityForm";

export interface ActivityFormProps {
  onCancel?: () => void;
  initialValues?: ActivityFormType;
}

export function ActivityForm({ onCancel, initialValues }: ActivityFormProps) {
  const { handleSubmit } = useActivityForm(
    initialValues?.projectId ?? "",
    onCancel
  );

  return (
    <Form layout="vertical" onFinish={handleSubmit} preserve={false}>
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: "Título é obrigatório" }]}
      >
        <Input />
      </Form.Item>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
