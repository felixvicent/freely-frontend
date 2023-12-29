import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

import { CustomInput } from '../../CustomInput';
import { Select } from '../../Select';

import { ProjectFormType, useProjectForm } from './useProjectForm';

export interface ProjectFormProps {
  onCancel?: () => void;
  initialValues?: ProjectFormType;
}

export function ProjectForm({ onCancel, initialValues }: ProjectFormProps) {
  const { handleSubmit, isLoading, form } = useProjectForm(
    onCancel,
    initialValues?.id,
  );

  return (
    <Form
      layout="vertical"
      onFinish={handleSubmit}
      preserve={false}
      form={form}
      initialValues={{
        ...initialValues,
        estimatedDate: dayjs(initialValues?.estimatedDate),
      }}
    >
      <Form.Item
        label="Título"
        name="title"
        rules={[{ required: true, message: 'Título é obrigatório' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cliente"
        name="clientId"
        rules={[{ required: true, message: 'Cliente é obrigatório' }]}
      >
        <Select.Client />
      </Form.Item>
      <Form.Item
        label="Valor"
        name="value"
        rules={[{ required: true, message: 'Valor é obrigatório' }]}
      >
        <CustomInput.Currency className="w-full" />
      </Form.Item>
      <Form.Item
        label="Data estimada"
        name="estimatedDate"
        rules={[{ required: true, message: 'Data estimada é obrigatório' }]}
      >
        <DatePicker className="w-full" format="DD/MM/YYYY" />
      </Form.Item>

      {!initialValues?.id && (
        <Form.List name="activities">
          {(fields, { add, remove }) => (
            <div className="w-full">
              <span className="pb-2 block">Atividades</span>
              {fields.map(({ key, name, ...field }) => (
                <div key={key} className="flex items-center gap-2 w-full">
                  <Row gutter={[8, 8]}>
                    <Col span={14}>
                      <Form.Item
                        key={key}
                        name={[name, 'title']}
                        className="flex-1"
                        {...field}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        key={key}
                        name={[name, 'estimatedDate']}
                        className="flex-1"
                        {...field}
                      >
                        <DatePicker
                          format="DD/MM/YYYY"
                          allowClear={false}
                          disabledDate={(date) =>
                            date.isAfter(
                              dayjs(form.getFieldValue('estimatedDate')),
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        className="flex items-center justify-center p-2 mb-6"
                        onClick={() => remove(name)}
                      >
                        <IoMdRemoveCircleOutline />
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}

              <Button onClick={add}>Adicionar atividade</Button>
            </div>
          )}
        </Form.List>
      )}

      <div className="flex gap-4 justify-end">
        <Button onClick={onCancel}>Cancelar</Button>
        <Button htmlType="submit" disabled={isLoading} type="primary">
          Salvar
        </Button>
      </div>
    </Form>
  );
}
