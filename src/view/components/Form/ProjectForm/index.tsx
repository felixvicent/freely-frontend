import { Button, DatePicker, Form, Input } from "antd";
import { CustomInput } from "../../CustomInput";
import { Select } from "../../Select";
import { ProjectFormType, useProjectForm } from "./useProjectForm";
import dayjs from "dayjs";
import { IoMdRemoveCircleOutline } from "react-icons/io";

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

      <Form.List name="activities">
        {(fields, { add, remove }) => (
          <div className="w-full">
            <label className="pb-2 block">Atividades</label>
            {fields.map(({ key, name, ...field }) => (
              <div key={key} className="flex items-center gap-2 w-full">
                <Form.Item
                  key={key}
                  name={[name, "title"]}
                  className="flex-1"
                  {...field}
                >
                  <Input />
                </Form.Item>
                <Button
                  className="flex items-center justify-center p-2 mb-6"
                  onClick={() => remove(name)}
                >
                  <IoMdRemoveCircleOutline />
                </Button>
              </div>
            ))}

            <Button onClick={add}>Adicionar atividade</Button>
          </div>
        )}
      </Form.List>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button htmlType="submit" disabled={isLoading} type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
