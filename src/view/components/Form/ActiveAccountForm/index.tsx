import { Button, Form, Input } from 'antd';

import { useActiveAccount } from './useActiveAccount';

export function ActiveAccountForm() {
  const { handleSubmit, isLoading } = useActiveAccount();

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, min: 6 }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirmar senha"
        name="passwordConfirm"
        rules={[
          { required: true, message: 'A senha é obrigatória' },
          ({ getFieldValue }) => ({
            validator(_, value: string) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Senhas não batem'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <div>
        <Form.Item className="float-right">
          <Button htmlType="submit" type="primary" disabled={isLoading}>
            Salvar
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
