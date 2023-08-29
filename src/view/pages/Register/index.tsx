import { Form } from "../../components/Form";

export function Register() {
  return (
    <div className="bg-white w-[400px] rounded p-4">
      <h2 className="mb-4 text-center text-lg">Crie sua conta</h2>

      <Form.Register />
    </div>
  );
}
