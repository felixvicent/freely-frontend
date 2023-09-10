import { Button, DatePicker, Form, Input } from "antd";
import { CustomInput } from "../../CustomInput";
import { Select } from "../../Select";
import { ProjectFormType, useProjectForm } from "./useProjectForm";
import dayjs from "dayjs";

export interface ProjectFormProps {
  onCancel?: () => void;
  initialValues?: ProjectFormType;
}

export function ProjectForm({ onCancel, initialValues }: ProjectFormProps) {
  const { handleSubmit, isLoading } = useProjectForm(
    onCancel,
    initialValues?.id
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      preserve={false}
      initialValues={{
        ...initialValues,
        estimedDate: dayjs(initialValues?.estimedDate),
      }}
    >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: "Título é obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cliente"
        name="clientId"
        rules={[{ required: true, message: "Cliente é obrigatório" }]}
      >
        <Select.Client />
      </Form.Item>
      <Form.Item
        label="Valor"
        name="value"
        rules={[{ required: true, message: "Valor é obrigatório" }]}
      >
        <CustomInput.Currency className="w-full" />
      </Form.Item>
      <Form.Item
        label="Data estimada"
        name="estimedDate"
        rules={[{ required: true, message: "Data estimada é obrigatório" }]}
      >
        <DatePicker className="w-full" format="DD/MM/YYYY" />
      </Form.Item>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button htmlType="submit" disabled={isLoading} type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
