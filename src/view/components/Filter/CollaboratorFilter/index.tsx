import { Button, Form, Select } from 'antd';

import { useCollaboratorFilter } from './useCollaboratorFilter';

interface CollaboratorFilterProps {
  onFilter: (collaboratorIds: string[]) => void;
}

export function CollaboratorFilter({ onFilter }: CollaboratorFilterProps) {
  const {
    isFetching,
    term,
    selectedCollaborators,
    handleChangeTerm,
    handleAddCollaboratorToSearch,
    handleRemoveCollaboratorToSearch,
    suggestions,
    resetFilter,
    confirmFilter,
  } = useCollaboratorFilter(onFilter);

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
            value={selectedCollaborators}
            onSearch={handleChangeTerm}
            onSelect={(value) => {
              handleAddCollaboratorToSearch(value);
            }}
            onDeselect={(value) => {
              handleRemoveCollaboratorToSearch(value);
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
