import { Form } from "../../components/Form";

export function Login() {
  return (
    <div className="bg-white w-[400px] rounded p-4">
      <h2 className="mb-4 text-center text-lg">Entre na sua conta</h2>

      <Form.Login />
    </div>
  );
}
