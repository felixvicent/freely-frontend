import { Button, Form, Input } from 'antd';

import { useIntegrationAsaas } from './useIntegrationAsaas';

export function IntegrationAsaasForm() {
  const { handleSubmit, isLoading, form } = useIntegrationAsaas();

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <Form.Item label="Chave da API" name="apiKey">
        <Input />
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
