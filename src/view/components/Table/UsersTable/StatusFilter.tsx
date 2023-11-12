import { Button, Form, Select } from 'antd';

import { useUsersTable } from './useUsersTable';

const STATUS_OPTIONS = [
  {
    value: true,
    label: 'Ativo',
  },
  {
    value: false,
    label: 'Inativo',
  },
];

export function StatusFilter() {
  const { resetFilter, confirmFilter, selectedStatus, handleSelectStatus } =
    useUsersTable();

  return (
    <div className="p-2 w-[300px]">
      <Form layout="vertical">
        <Form.Item>
          <span>Status:</span>
          <Select
            value={selectedStatus}
            options={STATUS_OPTIONS}
            allowClear
            onSelect={handleSelectStatus}
          />
        </Form.Item>
      </Form>

      <div className="flex justify-between mt-2">
        <Button size="small" onClick={resetFilter}>
          Limprar filtros
        </Button>
        <Button size="small" onClick={confirmFilter} type="primary">
          Filtrar
        </Button>
      </div>
    </div>
  );
}
