import { Button, Form, Input } from 'antd';

import { CustomInput } from '../../CustomInput';

import {
  CollaboratorFormType,
  useCollaboratorForm,
} from './useCollaboratorForm';

export interface CollaboratorFormProps {
  onCancel?: () => void;
  initialValues?: CollaboratorFormType;
  showCancel?: boolean;
}

export function CollaboratorForm({
  onCancel,
  initialValues,
  showCancel = true,
}: CollaboratorFormProps) {
  const { handleSubmit, isLoading } = useCollaboratorForm(
    initialValues?.id,
    onCancel,
  );

  return (
    <Form
      layout="vertical"
      preserve={false}
      onFinish={handleSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: 'Nome é obrigatório' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'email é obrigatório' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CPF ou CNPJ"
        name="document"
        rules={[{ required: true, message: 'CPF ou CNPJ é obrigatório' }]}
      >
        <CustomInput.CpfCnpj />
      </Form.Item>

      <Form.Item
        label="Telefone"
        name="telephone"
        rules={[{ required: true, message: 'Telefone é obrigatório' }]}
      >
        <CustomInput.Telephone />
      </Form.Item>

      <Form.Item
        label="Cargo"
        name="office"
        rules={[{ required: true, message: 'Cargo é obrigatório' }]}
      >
        <Input />
      </Form.Item>

      <div className="flex gap-4 justify-end">
        {showCancel && <Button onClick={onCancel}>Cancelar</Button>}
        <Button loading={isLoading} htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
