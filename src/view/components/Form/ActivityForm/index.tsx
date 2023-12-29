import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

import { ActivityFormType, useActivityForm } from './useActivityForm';

export interface ActivityFormProps {
  onCancel?: () => void;
  initialValues?: ActivityFormType;
}

export function ActivityForm({ onCancel, initialValues }: ActivityFormProps) {
  const { handleSubmit, form } = useActivityForm(
    initialValues?.projectId ?? '',
    onCancel,
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      preserve={false}
      form={form}
    >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: 'Título é obrigatório' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="estimatedDate"
        label="Data estimada"
        rules={[{ required: true, message: 'Data estimada é obrigatória' }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          className="w-full"
          allowClear={false}
          disabledDate={(date) =>
            date.isAfter(dayjs(initialValues?.projectEstimatedDate))
          }
        />
      </Form.Item>

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button htmlType="submit" type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
