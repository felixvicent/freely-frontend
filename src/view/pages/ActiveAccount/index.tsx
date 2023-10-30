import { Form } from '../../components/Form';

export function ActiveAccount() {
  return (
    <div className="bg-white w-[400px] rounded p-4">
      <h2 className="mb-4 text-center text-lg">Defina sua senha</h2>

      <Form.ActiveAccount />
    </div>
  );
}
