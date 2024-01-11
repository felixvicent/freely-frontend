import { Select, Typography } from 'antd';
import { SelectProps } from 'antd/lib';

import { Avatar } from '../../Avatar';

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
    >
      {collaborators?.map((collaborator) => (
        <Select.Option key={collaborator.value}>
          <div className="flex items-center gap-2">
            <Avatar.Collaborator size="small" label={collaborator.label} />
            <Typography className="text-ellipsis overflow-hidden">
              {collaborator.label}
            </Typography>
          </div>
        </Select.Option>
      ))}
    </Select>
  );
}
