import { Button, Form, Input } from "antd";
import { useLogin } from "./useLogin";
import { Link } from "react-router-dom";

export function Login() {
  const { handleSubmit } = useLogin();

  return (
    <div className="bg-white w-[400px] rounded p-4">
      <h2 className="mb-4 text-center text-lg">Entre na sua conta</h2>

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
        <span>Ainda não tem conta? <Link className="text-purple-700 hover:text-purple-800" to="/register">Crie agora</Link></span>

        <Form.Item className="float-right">
          <Button htmlType="submit" type="primary">
            Entrar
          </Button>
        </Form.Item>
        </div>
      </Form>
    </div>
  );
}
