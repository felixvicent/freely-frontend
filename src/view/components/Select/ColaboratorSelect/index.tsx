import { Select } from 'antd';
import { SelectProps } from 'antd/lib';

import { useColaboratorSelect } from './useColaboratorSelect';

interface CollaboratorSelectProps extends SelectProps<string | undefined> {}

export function CollaboratorSelect({ ...props }: CollaboratorSelectProps) {
  const { collaborators, handleChangeTerm, isFetching, searchTerm } =
    useColaboratorSelect(props.value ?? '');

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
      options={collaborators?.map((collaborator) => ({
        label: collaborator.label,
        value: collaborator.value,
      }))}
    />
  );
}
