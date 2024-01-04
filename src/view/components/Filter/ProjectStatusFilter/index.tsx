import { Button, Form, Select } from 'antd';

import { ProjectStatus } from '../../../../app/entities/ProjectStatus';
import { getProjectLabelByStatus } from '../../../../app/utils/labels/getProjectLabelByStatus';

import { useProjectStatusFilter } from './useProjectStatusFilter';

interface ProjectStatusFilterProps {
  onFilter: (status: ProjectStatus[]) => void;
}

export function ProjectStatusFilter({ onFilter }: ProjectStatusFilterProps) {
  const {
    confirmFilter,
    handleAddStatusToSearch,
    handleRemoveStatusToSearch,
    resetFilter,
    selectedStatus,
  } = useProjectStatusFilter(onFilter);

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
            value={selectedStatus}
            onSelect={(value) => {
              handleAddStatusToSearch(value);
            }}
            onDeselect={(value) => {
              handleRemoveStatusToSearch(value);
            }}
            options={Object.values(ProjectStatus).map((status) => ({
              label: getProjectLabelByStatus(status),
              value: status,
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
