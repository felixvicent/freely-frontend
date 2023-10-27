import { Button, Form, Input } from 'antd';

import { CustomInput } from '../../CustomInput';

import { useUserForm } from './useUserForm';

export interface UserFormProps {
  onCancel?: () => void;
  // initialValues?: ClientFormType;
}

export function UserForm({ onCancel }: UserFormProps) {
  const { handleSubmit, isCreateLoadingUser } = useUserForm(onCancel);

  return (
    <Form layout="vertical" preserve={false} onFinish={handleSubmit}>
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

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button loading={isCreateLoadingUser} htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
