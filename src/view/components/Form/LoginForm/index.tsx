import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useLogin } from "./useLogin";

export function LoginForm() {
  const { handleSubmit, isLoading } = useLogin();

  return (
    <Form layout="vertical" onFinish={handleSubmit}>
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
          Ainda não tem conta?{" "}
          <Link
            className="text-purple-700 hover:text-purple-800"
            to="/register"
          >
            Crie agora
          </Link>
        </span>

        <Form.Item className="float-right">
          <Button htmlType="submit" type="primary" disabled={isLoading}>
            Entrar
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
