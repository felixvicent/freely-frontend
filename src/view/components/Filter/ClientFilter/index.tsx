import { Button, Form, Select } from 'antd';

import { useClientFilter } from './useClientFilter';

interface ClientFilterProps {
  onFilter: (clientIds: string[]) => void;
}

export function ClientFilter({ onFilter }: ClientFilterProps) {
  const {
    isFetching,
    term,
    selectedClients,
    handleChangeTerm,
    handleAddClientToSearch,
    handleRemoveClientToSearch,
    suggestions,
    resetFilter,
    confirmFilter,
  } = useClientFilter(onFilter);

  return (
    <div className="p-2 w-[300px]">
      <Form layout="vertical">
        <Form.Item>
          <span>Cliente:</span>
          <Select
            showSearch
            allowClear
            autoFocus
            defaultActiveFirstOption={false}
            filterOption={false}
            mode="multiple"
            autoClearSearchValue
            placeholder="Pesquise por nome"
            loading={isFetching}
            searchValue={term}
            value={selectedClients}
            onSearch={handleChangeTerm}
            onSelect={(value) => {
              handleAddClientToSearch(value);
            }}
            onDeselect={(value) => {
              handleRemoveClientToSearch(value);
            }}
            options={suggestions?.map((user) => ({
              label: user.label,
              value: user.value,
            }))}
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
