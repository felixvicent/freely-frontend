import { Button, Col, Form, Input, Row } from "antd";
import { CustomInput } from "../../CustomInput";
import { Select } from "../../Select";
import { ClientFormType, useClientForm } from "./useClientForm";

export interface ClientFormProps {
  onCancel?: () => void;
  initialValues?: ClientFormType;
}

export function ClientForm({ onCancel, initialValues }: ClientFormProps) {
  const { handleSubmit, isLoading } = useClientForm(
    onCancel,
    initialValues?.id
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      preserve={false}
      initialValues={initialValues}
    >
      <Form.Item
        label="Nome"
        name="firstName"
        rules={[{ required: true, message: "Nome é obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Sobrenome"
        name="lastName"
        rules={[{ required: true, message: "Sobrenome é obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "email é obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="CPF ou CNPJ"
        name="document"
        rules={[{ required: true, message: "CPF ou CNPJ é obrigatório" }]}
      >
        <CustomInput.CpfCnpj />
      </Form.Item>
      <Form.Item
        label="Telefone"
        name="telephone"
        rules={[{ required: true, message: "Telefone é obrigatório" }]}
      >
        <CustomInput.Telephone />
      </Form.Item>
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Endereço"
            name="street"
            rules={[{ required: true, message: "Endereço é obrigatório" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Número"
            name="number"
            rules={[{ required: true, message: "Número é obrigatório" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="CEP"
            name="zipCode"
            rules={[{ required: true, message: "CEP é obrigatório" }]}
          >
            <CustomInput.Cep />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Cidade"
            name="city"
            rules={[{ required: true, message: "Cidade é obrigatório" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Estado"
            name="state"
            rules={[{ required: true, message: "Estado é obrigatório" }]}
          >
            <Select.State />
          </Form.Item>
        </Col>
      </Row>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button disabled={isLoading} htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
