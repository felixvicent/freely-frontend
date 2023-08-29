import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useRegister } from "./useRegister";

export function RegisterForm() {
  const { handleSubmit } = useRegister();

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        label="Nome"
        name="name"
        rules={[{ required: true, message: "O nome é obrigatório" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[{ required: true, message: "O e-mail é obrigatório" }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: "A senha é obrigatória" }]}
      >
        <Input.Password />
      </Form.Item>
      <div>
        <span>
          Já tem conta?{" "}
          <Link className="text-purple-700 hover:text-purple-800" to="/login">
            Entre agora
          </Link>
        </span>

        <Form.Item className="float-right">
          <Button htmlType="submit" type="primary">
            Entrar
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
