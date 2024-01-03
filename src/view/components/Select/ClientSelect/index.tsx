import { Select } from 'antd';
import { SelectProps } from 'antd/lib';

import { useClientSelect } from './useClientSelect';

interface ClientSelectProps extends SelectProps<string | undefined> {}

export function ClientSelect({ ...props }: ClientSelectProps) {
  const { clients, handleChangeTerm, isFetching, searchTerm } = useClientSelect(
    props.value ?? '',
  );

  return (
    <Select
      {...props}
      showSearch
      allowClear
      autoFocus
      defaultActiveFirstOption={false}
      filterOption={false}
      placeholder="Pesquiser por nome"
      loading={isFetching}
      searchValue={searchTerm}
      onSearch={handleChangeTerm}
      options={clients?.map((client) => ({
        label: client.label,
        value: client.value,
      }))}
    />
  );
}
