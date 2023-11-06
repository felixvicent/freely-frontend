import { Button, Form, Input } from 'antd';

import { CustomInput } from '../../CustomInput';

import { UserFormType, useUserForm } from './useUserForm';

export interface UserFormProps {
  onCancel?: () => void;
  initialValues?: UserFormType;
}

export function UserForm({ onCancel, initialValues }: UserFormProps) {
  const { handleSubmit, isLoading } = useUserForm(initialValues?.id, onCancel);

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

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button loading={isLoading} htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
