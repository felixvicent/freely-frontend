import { Button, Form, Select } from 'antd';

import { useUsersTable } from './useUsersTable';

export function UsersFilter() {
  const {
    searchTerm,
    isUsersSuggestionLoading,
    handleChangeTerm,
    usersSuggestion,
    resetFilter,
    confirmFilter,
    handleAddUserToSearch,
    handleRemoveUserToSearch,
    selectedUsers,
  } = useUsersTable();

  return (
    <div className="p-2 w-[300px]">
      <Form layout="vertical">
        <Form.Item>
          <span>Usuário:</span>
          <Select
            showSearch
            allowClear
            autoFocus
            defaultActiveFirstOption={false}
            filterOption={false}
            mode="multiple"
            autoClearSearchValue
            placeholder="Pesquise por nome ou email"
            loading={isUsersSuggestionLoading}
            searchValue={searchTerm}
            value={selectedUsers}
            onSearch={handleChangeTerm}
            onSelect={(value) => {
              handleAddUserToSearch(value);
            }}
            onDeselect={(value) => {
              handleRemoveUserToSearch(value);
            }}
            options={usersSuggestion?.map((user) => ({
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
